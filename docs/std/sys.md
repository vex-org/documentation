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
| `unsafe forkProcess()` | True POSIX fork; Windows reports `Unsupported`. |
| `wait(process)`, `tryWait(process)` | Blocking reap or a single nonblocking poll. |

`forkProcess` is unsafe because a multithreaded child may call only
async-signal-safe operations before `execReplace`. The package does not emulate
fork on Windows with incompatible semantics.

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

## Arguments and ownership

| API | Ownership |
|---|---|
| `argCount()` | Process argument count as `usize`. |
| `argView(index)`, `programNameView()` | Zero-copy process-lifetime `str` views. |
| `argViews()` | Allocates only Vec index storage; argument bytes are borrowed. |
| `arg(index)`, `args()`, `programName()` | Independent owned snapshots. |

Invalid indices return `None`, never an invented empty string.

## Platform facts

`platform()` and `arch()` are zero-cost compile-target facts. Hosted queries
return typed results:

- `logicalCpuCount(): Result<usize, SysError>`
- `pageSize(): Result<usize, SysError>`
- `hostname(): Result<string, SysError>`
- `currentDir(): Result<string, SysError>`
- `homeDir(): Result<Option<string>, EnvError>`
- `tempDir(): Result<Option<string>, EnvError>`

No API silently substitutes `/tmp`, `.`, or another plausible path after an OS
failure.

## Target status

macOS carries the full native-tested provider. Linux carries the POSIX provider
and passes cross-target semantic/strict-lint gates. Windows uses UTF-16 native
APIs for environment, cwd and hostname, Toolhelp for parent PID, and CRT wide
process APIs for replacement and shell execution; POSIX fork/wait are
unsupported by design. Native Linux and Windows execution remain release gates,
so cross-target compilation is not presented as native certification.
Targets without a `native.<os>.vxc` provider fail at compilation; `sys` never
reuses a guessed POSIX/Darwin ABI as a generic compatibility fallback.

## Performance baseline

Apple M2 Max, release `-O3`, 2026-08-17: `pid` 2.14 ns, `argView(0)` 7.45 ns,
owned `arg(0)` 37.16 ns, owned ~2.5 KiB PATH lookup 349 ns, hostname 401 ns,
and current directory 8.28 us. The cwd case is dominated by the host `getcwd`
boundary.

```bash
vex lint lib/std/sys --deny-warnings
vex test -O0 lib/std/sys/tests
vex test -O3 lib/std/sys/tests
vex test -O3 --bench --benchtime 300ms lib/std/sys/tests/bench.test.vx
```
