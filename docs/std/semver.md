# semver

The `semver` module parses, compares, and matches strict Semantic Versioning
2.0 values using borrowed input and typed comparator semantics.

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

- `Version.parse(input: str): Version`
- `Version.tryParse(input: str): Result<Version, VersionParseError>`
- `Version(major, minor, patch): Version`
- public fields: `major`, `minor`, `patch`, `pre`, `build`, `valid`
- comparison helpers: `lt`, `gt`, `eq`, `lte`, `gte`
- mutating helpers: `bumpMajor`, `bumpMinor`, `bumpPatch`
- version requirements via `VersionReq.parse(...)` / `tryParse(...)`
- typed `ComparatorOp` values rather than operator spelling strings

Requirement syntax includes exact and ordered comparators, caret, tilde,
comma-separated AND, `*`/`x`/`X`, bare partials (`1`, `1.2`) and component
wildcards (`1.*`, `1.2.x`). Stable-only ranges do not admit arbitrary
prereleases: a requirement must explicitly contain a prerelease comparator on
the same major/minor/patch tuple.

Parsing is single-pass over borrowed views. Precedence comparison walks
prerelease identifiers directly and allocates no split vectors. On the
2026-08-17 Apple M2 Max O3 baseline, simple parse is roughly 15–17 ns, SSO
metadata parse 28–32 ns, core comparison 1.5 ns, prerelease comparison 14 ns,
and two-comparator matching 6–7 ns. Long owned metadata remains a visible
one-allocation path.

OR and hyphen ranges are not silently interpreted as npm syntax. They remain a
future explicit grammar decision. This page documents the tested surface from
`lib/std/semver/tests`, rather than accessor-style examples like `v1.major()`
or `parse(...).unwrap()` that do not match the current Vex API.
