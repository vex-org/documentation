# unicode

`unicode` is Vex's Unicode 15.1 scalar-property and caseless-matching package.
It uses the same freestanding, generated VexArch engine as the built-in `char`
and `string` APIs, so category and casing semantics have one source of truth.
No ICU or libc dependency is introduced.

## Character properties

```vex
import {
    category,
    isAlphabetic,
    isDigit,
    isLowercase,
    isPunctuation,
    isUppercase,
    isWhitespace,
    CAT_LU
} from "unicode";

$assert(isAlphabetic('Ω'), "Greek omega is alphabetic");
$assert(isWhitespace('\u{2003}'), "EM SPACE is whitespace");
$assert(category('A') == CAT_LU, "exact General_Category");
```

`isAlphabetic`, `isUppercase`, and `isLowercase` use the normative properties
from Unicode's
[`DerivedCoreProperties.txt`](https://www.unicode.org/Public/15.1.0/ucd/DerivedCoreProperties.txt).
They are not approximated from `General_Category`; this distinction matters for
combining marks and enclosed letters.

`category(char)` returns an exact `CAT_*` General_Category identifier. The
package exports the letter, mark, number, punctuation, symbol, separator,
control, surrogate, private-use, and unassigned category constants.

## Simple case mapping

```vex
import { toLower, toUpper } from "unicode";

$assert(toLower('Ş') == 'ş', "one-scalar lowercase mapping");
$assert(toUpper('ω') == 'Ω', "one-scalar uppercase mapping");
```

These APIs accept and return one `char`, so they deliberately implement Unicode
simple casing only. They never pretend a multi-scalar mapping fits in a scalar.

## Full case folding

Use full folding to create keys for Unicode caseless comparison:

```vex
import { caseFold, caseFoldTurkic } from "unicode";

$assert(caseFold("Straße") == caseFold("STRASSE"), "full fold expands ß");
$assert(caseFold("\u{FB03}") == "ffi", "ligature expands to three scalars");
$assert(caseFoldTurkic("Iİ") == "ıi", "explicit Turkic overrides");
```

`caseFold` implements the Unicode 15.1 `C + F` mappings from the official
[`CaseFolding.txt`](https://www.unicode.org/Public/15.1.0/ucd/CaseFolding.txt).
`caseFoldTurkic` applies its two `T` overrides. Folding is not lowercasing and
does not preserve normalization forms; normalization is a separate API layer.
Both functions return an owned `string`, making their allocation effect visible.

## Runtime and performance model

- Scalar property and simple-case queries allocate nothing.
- ASCII queries take constant-time table-free paths.
- Non-ASCII category and derived-property queries use compact page directories
  followed by bounded binary searches.
- Full fold mappings store sorted scalar keys and up to three packed output
  scalars; a scalar-page directory bounds the default-fold binary search.
- Runtime fusion includes only reachable Unicode lookup families and tables;
  programs that do not use them carry none of the data.
- ASCII folding uses the dedicated `toLowerAscii()` primitive on both borrowed
  `str` views and owned `string` values. It preserves non-ASCII bytes and does
  not pull the unrelated Unicode simple-case table into the fused program.

The package benchmark suite measures scalar queries with `0 B/op` and
`0 allocs/op` separately from owning fold operations. On the 2026-08-10 macOS
arm64 development machine, the 10-byte ASCII SSO fold measured about 1.62 µs
with zero allocations; an expanding non-ASCII fold measured about 11.2 µs,
72 bytes, and two allocations. These are regression baselines, not portable
performance guarantees. The expanding path also has a 100,000-iteration
AddressSanitizer stress gate.

Full context/locale-sensitive upper/lower/title casing, normalization, and
extended grapheme segmentation remain separate production milestones and are
not silently approximated by the current API.
