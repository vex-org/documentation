# unicode

`unicode` is Vex's Unicode 15.1 property, casing, normalization, and text-boundary package.
It uses the same freestanding, generated VexArch engine as the built-in `char`
and `string` APIs, so category and casing semantics have one source of truth.
No ICU or libc dependency is introduced.

## Character properties

```vex
import {
    category,
    isAlphabetic,
    isDigit,
    isLetter,
    isMark,
    isNumber,
    isLowercase,
    isPunctuation,
    isUppercase,
    isWhitespace,
    CAT_LU
} from "unicode";

$assert(isAlphabetic('Ω'), "Greek omega is alphabetic");
$assert(isWhitespace('\u{2003}'), "EM SPACE is whitespace");
$assert(category('A') == CAT_LU, "exact General_Category");
$assert(isLetter('Ω') && isMark('\u{0301}'), "exact category groups");
$assert(isNumber('\u{2160}'), "letter-number category");
```

`isAlphabetic`, `isUppercase`, and `isLowercase` use the normative properties
from Unicode's
[`DerivedCoreProperties.txt`](https://www.unicode.org/Public/15.1.0/ucd/DerivedCoreProperties.txt).
They are not approximated from `General_Category`; this distinction matters for
combining marks and enclosed letters.

`category(char)` returns an exact `CAT_*` General_Category identifier. The
package exports the letter, mark, number, punctuation, symbol, separator,
control, surrogate, private-use, and unassigned category constants.

The convenience predicates `isLetter`, `isMark`, `isNumber`, `isSeparator`,
`isSymbol`, `isControl`, `isFormat`, `isPrivateUse`, `isAssigned`,
`isTitlecase`, and `isGraphic` group those exact categories without allocating.
`isLetter` is intentionally narrower than `isAlphabetic`: the latter is a
normative derived property and includes some combining marks.

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

For reusable output, `caseFoldInto(value, builder)` and
`caseFoldTurkicInto(value, builder)` append into an existing `StringBuilder`:

```vex
import { caseFoldInto } from "unicode";
import { StringBuilder } from "strings";

let! output = StringBuilder(64 as usize);
output.writeStr("key=");
caseFoldInto("Straße", &output!);
$assert(output.toString() == "key=strasse");
```

This form preserves the same malformed-input and Unicode mapping semantics but
lets parsers, indexes and protocol writers reuse capacity across operations.

## Normalization

Use `NormalizationForm.NFC`, `.NFD`, `.NFKC`, or `.NFKD` explicitly; Vex never
normalizes text implicitly:

```vex
import {
    NormalizationForm,
    NormalizationWorkspace,
    isNormalized,
    normalize,
    normalizeInto
} from "unicode";
import { StringBuilder } from "strings";

$assert(normalize("e\u{0301}", NormalizationForm.NFC) == "\u{00E9}");
$assert(normalize("\u{FB01}", NormalizationForm.NFKD) == "fi");
$assert(isNormalized("\u{00E9}", NormalizationForm.NFC));

let! output = StringBuilder(64 as usize);
let! workspace = NormalizationWorkspace.new(32 as usize);
normalizeInto("Cafe\u{0301}", NormalizationForm.NFC, &output!, &workspace!);
```

`normalize` returns an owned `string`. `normalizeInto` appends to the supplied
builder and retains the workspace's scalar capacity across calls; reset output
only when your protocol or parser wants a new record. `normalizationQuickCheck`
returns `NormalizationQuickCheck.Yes`, `.No`, or `.Maybe` without allocating.
`isNormalized` resolves `Maybe` exactly rather than treating it as Yes.

The implementation follows UAX #15 canonical ordering and blocking rules.
Hangul decomposition/composition is arithmetic. Other CCC, Quick_Check,
decomposition and composition facts come from checksum-pinned Unicode 15.1
`UnicodeData.txt`, `DerivedNormalizationProps.txt`, and
`CompositionExclusions.txt`; there is no ICU/libc dependency. Ten generated
shards execute all 19,074 official `NormalizationTest.txt` rows at both O0 and
O3.

## Extended grapheme clusters

Use grapheme APIs when a UI, editor, cursor or text algorithm needs
user-perceived characters rather than Unicode scalars or UTF-8 bytes:

```vex
import {
    graphemeCount,
    graphemeIndices,
    graphemes,
    isGraphemeBoundary
} from "unicode";

$assert(graphemeCount("👩‍💻!") == 2 as usize, "emoji ZWJ cluster plus punctuation");

let! clusters = graphemes("a\u{0301}b");
match clusters.next() {
    Some(cluster) => { $assert(cluster == "a\u{0301}"); },
    None => { $panic("missing cluster"); },
}

$assert(isGraphemeBoundary("a\u{0301}b", 3 as usize), "UTF-8 byte boundary");
```

`graphemes` returns allocation-free borrowed `str` views.
`graphemeIndices` returns `Grapheme` values with `text()`, `start()`, `end()`
and `len()` accessors; offsets are UTF-8 bytes in the original input.
`graphemeCount` and `isGraphemeBoundary` use the same Unicode 15.1 state
machine.

The implementation covers UAX #29 GB3–GB13, including Hangul clusters,
regional-indicator pairing, emoji Extended_Pictographic/ZWJ sequences and the
Unicode 15.1 GB9c Indic conjunct rule. GCB, Extended_Pictographic and InCB are
read together from one checksum-pinned VexArch table. The checked-in official
`GraphemeBreakTest.txt` fixture validates all 1,187 Unicode 15.1 rows.
Malformed UTF-8 consumes one byte as U+FFFD, matching the prelude `Chars`
iterator and guaranteeing bounded progress.

## Runtime and performance model

- Scalar property and simple-case queries allocate nothing.
- ASCII queries take constant-time table-free paths.
- Non-ASCII category and derived-property queries use compact page directories
  followed by bounded binary searches.
- Full fold mappings store sorted scalar keys and up to three packed output
  scalars; a scalar-page directory bounds the default-fold binary search.
- Extended grapheme segmentation reads one packed property word per non-ASCII
  scalar and returns borrowed views without copying or allocating.
- Pure ASCII grapheme count uses a fused `[u8; 16]`/`Mask<16>` scan and handles
  CRLF as the only multi-byte ASCII cluster.
- ASCII normalization and Quick_Check use the same fixed-array SIMD proof.
- Normalization lookup families are page-bounded and runtime-fused only when
  reachable. The reusable form performs no steady-state allocation.
- Runtime fusion includes only reachable Unicode lookup families and tables;
  programs that do not use them carry none of the data.
- ASCII folding uses the dedicated `toLowerAscii()` primitive on both borrowed
  `str` views and owned `string` values. It preserves non-ASCII bytes and does
  not pull the unrelated Unicode simple-case table into the fused program.

On the 2026-08-18 Apple M2 Max, the optimizer-safe O3 `BenchCtx.iter` baseline
is 2.14 ns for ASCII Alphabetic, 9.72 ns for non-ASCII Alphabetic and
15–16.5 ns for non-ASCII simple casing. Grapheme count is 6.20 ns / 19.2 GB/s
for 128 ASCII bytes, 154 ns / 186 MB/s for combining text and 354 ns /
313 MB/s for emoji-ZWJ text. All grapheme rows report `0 B/op` and
`0 allocs/op`. Normalization Quick_Check reaches 4.37 ns / 27.3 GB/s for 128
ASCII bytes, while reusable combining NFC is 403 ns / 52.1 MB/s, both at
`0 B/op` and `0 allocs/op`. These are host-specific regression baselines, not portable
guarantees. The expanding case-fold path also has an AddressSanitizer gate.

Full context/locale-sensitive upper/lower/title casing and word/sentence
segmentation remain separate production milestones and are not
silently approximated by the current API.
