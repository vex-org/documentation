# unicode

The `unicode` module provides extensive tooling for querying Unicode character properties, converting case, and classifying tokens. It powers Vex's core compiler features (like lexing) and offers high-performance Unicode validation for applications.

## Performance Story

Unlike many standard libraries that depend on massive, multi-megabyte C libraries (like ICU) for Unicode operations, Vex implements its own **highly compressed, generated tables** directly in Vex code. Operations use binary search to quickly traverse these tables, mapping characters to their properties or folded cases in a matter of nanoseconds.

When dealing with ASCII-range characters, `unicode` uses a **zero-table fast path**, achieving completely free (0ns/op) bounds checks via compiler inlining.

**Metrics:**
- **ASCII Letter/Number Check:** `0.00 ns/op` (Inlined branch)
- **Unicode Alphabetic Query:** `1,216 ns/op` (822k ops/s)
- **ASCII toUpper/toLower:** `0.00 ns/op`
- **Unicode Case Folding:** `1,534 ns/op` (650k ops/s)

## Usage

You can import properties directly from `unicode`:

```rust
import { 
    isAlphabetic, 
    isDigit, 
    isWhitespace, 
    isLowercase,
    isUppercase,
    category,
    toLower,
    toUpper
} from "unicode/char";
```

### Character Categories

Query the exact `General_Category` using the `category` function, which maps back to the `CAT_*` constants.

```rust
import { category, CAT_LU, CAT_LL } from "unicode";

let cp = 'A';
if category(cp) == CAT_LU {
    println("Uppercase Letter!");
}
```

Available category categories follow the Unicode Standard:
* **Letter**: `CAT_LU` (Uppercase), `CAT_LL` (Lowercase), `CAT_LT` (Titlecase), `CAT_LM` (Modifier), `CAT_LO` (Other)
* **Number**: `CAT_ND` (Decimal), `CAT_NL` (Letter), `CAT_NO` (Other)
* **Punctuation**: `CAT_PC`, `CAT_PD`, `CAT_PE`, `CAT_PF`, `CAT_PI`, `CAT_PO`, `CAT_PS`
* **Symbol**: `CAT_SM` (Math), `CAT_SC` (Currency), `CAT_SK` (Modifier), `CAT_SO` (Other)
* **Whitespace**: `CAT_ZS` (Space), `CAT_ZL` (Line), `CAT_ZP` (Paragraph)
* **Control**: `CAT_CC` (Control), `CAT_CF` (Format), `CAT_CN` (Unassigned), `CAT_CO` (Private)

### Validation Functions

Vex provides simple boolean returns for common subsets of characters:

```rust
let smiley = '😀';
isAlphabetic(smiley);  // false
isUppercase('H');      // true
isLowercase('h');      // true
isDigit('5');          // true
isWhitespace('\n');    // true
isPunctuation(',');    // true
```

### Case Mapping

Use `toLower` and `toUpper` to do Simple Case Folding over a single `char` Code Point.

```rust
let folded = toLower('Ü');
let upper = toUpper('ñ');
```

For full strings or byte buffers, look at `string` where the vectorizer speeds up bulk ASCII manipulation.
