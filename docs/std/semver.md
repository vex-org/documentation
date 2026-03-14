# semver

The `semver` module parses, compares, and matches semantic versions.

## Usage

```vex
let v1 = Version.parse("1.0.0-alpha.1+build.metadata")
let v2 = Version.parse("1.0.0")

if v1.lt(&v2) {
    $println("v1 is older than v2")
}

$println(v1.major)
$println(v1.minor)
$println(v1.patch)
```

## Current Surface

- `Version.parse(input: string): Version`
- `Version(major, minor, patch): Version`
- public fields: `major`, `minor`, `patch`, `pre`, `build`, `valid`
- comparison helpers: `lt`, `gt`, `eq`, `lte`, `gte`
- mutating helpers: `bumpMajor`, `bumpMinor`, `bumpPatch`
- version requirements via `VersionReq.parse(...)`

This page intentionally documents the tested surface from `lib/std/semver/tests/basic.test.vx`, rather than accessor-style examples like `v1.major()` or `parse(...).unwrap()` that do not match the current Vex API.
