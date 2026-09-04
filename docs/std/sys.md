# sys — typed hosted-system boundaries

`sys` provides process identity and control, environment access, command-line
arguments, and hosted OS facts. It is target-routed and opt-in: VexArch and the
prelude remain freestanding when `sys` is not imported.

```vex
import { argView, getEnv, parentPid, pid, platform } from "sys";

$println("target: ", platform());
$println("pid: ", pid());

match parentPid() {
    Result.Ok(Some(parent)) => $println("parent: ", parent),
    Result.Ok(None) => $println("no exposed parent"),
    Result.Err(err) => $println(err),
}

match getEnv("HOME") {
    Result.Ok(Some(home)) => $println(home),
    Result.Ok(None) => $println("HOME is missing"),
    Result.Err(err) => $println(err),
}

match argView(0 as usize) {
    Some(program) => $println(program),
    None => { /* the host supplied no argv[0] */ },
}
```

## Process control

`ProcessId` is a nonzero `u32` identity. `ExitStatus` preserves normal exit and
signal termination as different variants.

| API | Contract |
|---|---|
| `pid()` | Allocation-free current `ProcessId`. |
| `parentPid()` | `Result<Option<ProcessId>, ProcessError>`. |
| `exit(code)`, `abort()` | Immediate termination without Vex destructor unwinding. |
| `execReplace(file, args)` | PATH-based process-image replacement; success never returns. |
| `runShell(command)` | Shell execution with normalized `ExitStatus`; do not concatenate untrusted input. |
| `unsafe forkProcess()` | True POSIX fork; the parent receives an owned `Child`, while Windows reports `Unsupported`. |
| `Command.new(program).arg(value)` | Fluent owned builder; arguments are never shell-concatenated. |
| `Command.spawn()`, `Command.status()` | Shell-free spawn, or spawn plus blocking wait. |
| `Child.id()` | Typed nonzero child identity. |
| `Child.tryWait()`, `Child.wait()` | Poll or reap; completed status is cached. |
| `Child.kill()` | Request termination; follow with `wait()` to reap and observe status. |

`ProcessId` is identity-only. There is intentionally no safe raw-PID wait
surface: `Command.spawn()` and the parent branch of `forkProcess()` each
produce one owned `Child`, so polling, reaping and killing cannot race a second
capability after PID reuse.

`forkProcess` is unsafe because a multithreaded child may call only
async-signal-safe operations before `execReplace`. The package does not emulate
fork on Windows with incompatible semantics.

Normal process creation uses `Command`, not `runShell`:

```vex
import { Command } from "sys";

let command = Command.new("tool".toString())
    .arg("--output".toString())
    .arg("path with spaces".toString());

match command.status() {
    Result.Ok(status) if status.success() => { /* completed */ },
    Result.Ok(status) => $println("child failed: ", status),
    Result.Err(err) => $println("spawn failed: ", err),
}
```

POSIX routes through `posix_spawnp`, so no managed Vex operation runs in a
post-fork child. Windows uses `CreateProcessW` and exact inverse CRT quoting.
Dropping a Windows child closes its native handle. POSIX callers explicitly
`wait`—including after `kill`—because drop never blocks or kills an independent
process.

## Environment

```vex
import { getEnv, setEnv, unsetEnv } from "sys";

match getEnv("APP_MODE") {
    Result.Ok(Some(value)) => $println(value),
    Result.Ok(None) => $println("not configured"),
    Result.Err(err) => $println(err),
}

unsafe {
    let _ = setEnv("APP_MODE", "production");
    let _ = unsetEnv("OLD_APP_MODE");
}
```

`getEnv(key: str)` returns `Result<Option<string>, EnvError>`, so missing and
present-empty variables remain distinct. Common short keys do not allocate;
present values are owned Strings. `setEnv` and `unsetEnv` are unsafe because
environment storage is process-global and foreign code may access it without
Vex synchronization.

Repeated queries can use `getEnvInto(key, destination)`. It replaces reusable
`Vec<u8>` storage, clears it on missing/error, and allocates nothing after an
adequate reserve. Native providers receive the exact writable capacity and
never append a hidden terminator beyond the returned byte count.

## Arguments and ownership

| API | Ownership |
|---|---|
| `argCount()` | Process argument count as `usize`. |
| `argView(index)`, `programNameView()` | Zero-copy process-lifetime `str` views. |
| `argViews()` | Allocates only Vec index storage; argument bytes are borrowed. |
| `arg(index)`, `args()`, `programName()` | Independent owned snapshots. |
| `argInto(index, destination)` | Reusable byte snapshot; clears on `None`. |

Invalid indices return `None`, never an invented empty string.

## Platform facts

`platform()` and `arch()` are zero-cost compile-target facts. Hosted queries
return typed results:

- `logicalCpuCount(): Result<usize, SysError>`
- `pageSize(): Result<usize, SysError>`
- `hostname(): Result<string, SysError>`
- `currentDir(): Result<string, SysError>`
- `currentDirInto(destination): Result<usize, SysError>`
- `currentExe(): Result<string, SysError>`
- `currentExeInto(destination): Result<usize, SysError>`
- `homeDir(): Result<Option<string>, EnvError>`
- `tempDir(): Result<Option<string>, EnvError>`

No API silently substitutes `/tmp`, `.`, or another plausible path after an OS
failure. `currentExe` is the OS-reported snapshot, not a canonical path or a
security-stable executable identity.

## Target status

macOS carries the full native-tested provider. Linux carries the POSIX provider
and passes cross-target semantic/strict-lint gates. Windows uses UTF-16 native
APIs for environment, cwd and hostname, Toolhelp for parent PID, and
`CreateProcessW` for shell-free child ownership; POSIX fork is unsupported by
design. Native Linux and Windows execution remain release gates,
so cross-target compilation is not presented as native certification.
Targets without a `native.<os>.vxc` provider fail at compilation; `sys` never
reuses a guessed POSIX/Darwin ABI as a generic compatibility fallback.

## Performance baseline

Apple M2 Max, release `-O3`, bounded 100 ms sample on 2026-08-26: `pid` 2.60 ns
and `argView(0)` 14.04 ns. Reusable `argInto`, `getEnvInto`, `hostnameInto`,
`currentDirInto`, and `currentExeInto` measure 20.65 ns, 808.67 ns, 402.41 ns,
13.12 us, and 26.01 ns respectively. Their owned counterparts measure 58.86
ns, 1.58 us, 403.49 ns, 13.03 us, and 107.47 ns. Cwd remains dominated by
`getcwd`; owned APIs still promise snapshots rather than allocation-free
execution. Shell-free `/usr/bin/true` spawn plus wait measures 1.44 ms and is
dominated by native process creation rather than Vex argument dispatch.

```bash
vex lint --standard-library lib/std/sys --deny-warnings
vex lint --standard-library --target aarch64-unknown-linux-gnu lib/std/sys --deny-warnings
vex lint --standard-library --target x86_64-pc-windows-msvc lib/std/sys --deny-warnings
vex test -O0 lib/std/sys/tests
vex test -O3 lib/std/sys/tests
vex test -O3 --bench --benchtime 300ms lib/std/sys/tests/bench.test.vx
```
