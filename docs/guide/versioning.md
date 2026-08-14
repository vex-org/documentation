# Versioning and Stability

Vex is pre-1.0. Version numbers describe compiler releases, not a promise that every documented feature is production-ready.

## Current release

The compiler version used for this documentation pass is `0.4.0-rc.39`. Always verify the binary you are using:

~~~bash
vex --version
~~~

The [language status matrix](/guide/language-status) is the source of truth for the current maturity of language and runtime features.

## Version policy

Vex follows a SemVer-inspired policy. Before 1.0, minor releases may contain breaking language, compiler, or standard-library changes.

| Change | Typical release level | Pre-1.0 expectation |
| --- | --- | --- |
| Backward-compatible bug fix | Patch | Still verify generated code and runtime behavior. |
| New or changed feature | Minor | May require source changes. |
| Major compatibility break | Major | Reserved for broad migrations, but not the only possible breaking change before 1.0. |

Release candidates should be treated as testable snapshots. Pin the compiler in CI and record the target platform when reporting a result.

## Stability labels

- **Verified:** The syntax or behavior is supported by the current compiler checks or a maintained implementation path.
- **Experimental:** The compiler accepts the surface, but runtime, backend, or library behavior is still changing.
- **Partial:** The main surface exists, while important integration or edge cases remain unfinished.
- **Planned:** The concept is documented for direction only and should not be used as current syntax.

These labels are more precise than a single stable/unstable tier because a feature can be compiler-complete while its runtime support is incomplete.

## Upgrading safely

1. Read the changelog and compare the compiler version with `vex --version`.
2. Run `vex lint` on the project before and after upgrading.
3. Run the project's tests on every target platform it supports.
4. Recheck pages marked Experimental or Partial in the language-status matrix.
5. Keep a small set of representative source examples in CI.

Design notes and old migration documents may describe intended syntax. They are not authoritative when they disagree with compiler checks or the current language guide.

## Reporting a compatibility problem

Include the compiler version, platform, command, source file, and complete diagnostic. If the problem is in the compiler or bundled runtime rather than the user program, record it in the repository issue tracker and link the report from the relevant documentation page.
