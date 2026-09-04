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
- parse errors expose `kind()`, `position()`, `invalidByte()`, and `message()`
- `Version(major, minor, patch): Version`
- public fields: `major`, `minor`, `patch`, `pre`, `build`, `valid`
- comparison helpers: `lt`, `gt`, `eq`, `lte`, `gte`
- mutating helpers: `bumpMajor`, `bumpMinor`, `bumpPatch`
- version requirements via `VersionReq.parse(...)` / `tryParse(...)`
- typed `ComparatorOp` values rather than operator spelling strings

Requirement syntax includes exact and ordered comparators, caret, tilde,
comma-separated AND, `*`/`x`/`X`, bare partials (`1`, `1.2`) and component
wildcards (`1.*`, `1.2.x`). `||` separates OR clauses. Space-delimited hyphen
ranges are structural sugar: `1.2.3 - 2.3.4` includes both full endpoints,
`1.2 - 2.3` expands to `>=1.2.0, <2.4.0`, and `1 - 2` expands to
`>=1.0.0, <3.0.0`.

`VersionReq` stores OR clauses as `ComparatorSet` values and stores typed
`Comparator` values inside each set. Matching therefore never reparses or
dispatches on source strings. Stable-only ranges do not admit arbitrary
prereleases: the same OR clause must explicitly contain a prerelease comparator
on the candidate's major/minor/patch tuple.

Parsing is single-pass over borrowed views. Precedence comparison walks
prerelease identifiers directly and allocates no split vectors. Typed failures
are produced by the same parse, with exact byte positions and no error-string
allocation. On the 2026-08-23 Apple M2 Max O3 baseline, simple parse is 12.81
ns, SSO metadata parse 25.60–27.70 ns, core comparison 2.07 ns, prerelease
comparison 13.16 ns, two-comparator matching 6.36 ns, and matching through a
second OR clause 14.06 ns. Parsing AND/OR/hyphen requirements into their owned
structural form takes 156.99–224.36 ns. Full `Version.toString` is 54.52 ns
after direct builder serialization; these hot rows allocate zero bytes. Full
owned metadata remains a visible materialization path.

The grammar is intentionally explicit rather than an open-ended npm clone.
Unsupported ecosystem-specific spellings return `VersionReqParseError` instead
of being guessed. This page documents the tested surface from
`lib/std/semver/tests`, rather than accessor-style examples like `v1.major()`
or `parse(...).unwrap()` that do not match the current Vex API.
