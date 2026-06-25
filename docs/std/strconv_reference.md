# Project v0.0.0

## Overview

**Structs:** [`ParseError`](#ParseError)

**Enums:** [`ParseErrorKind`](#ParseErrorKind) · [`ParseResult`](#ParseResult)

**Functions:** [`negPow10`](#negPow10) · [`posPow10`](#posPow10) · [`parseInt64`](#parseInt64) · [`parseUInt64`](#parseUInt64) · [`parseInt32`](#parseInt32) · [`parseUInt32`](#parseUInt32) · [`parseInt16`](#parseInt16) · [`parseInt8`](#parseInt8) · [`parseFloat64`](#parseFloat64) · [`parseFloat32`](#parseFloat32) · [`parseHex`](#parseHex) · [`parseBinary`](#parseBinary) · [`parseBool`](#parseBool) · [`parseInt`](#parseInt) · [`parseFloat`](#parseFloat) · [`parseBoolStr`](#parseBoolStr) · [`heap`](#heap) · [`formatInt64`](#formatInt64) · [`formatUInt64`](#formatUInt64) · [`formatInt32`](#formatInt32) · [`formatUInt32`](#formatUInt32) · [`formatHex`](#formatHex) · [`formatHexUpper`](#formatHexUpper) · [`formatHexPrefix`](#formatHexPrefix) · [`formatBinary`](#formatBinary) · [`formatFloat64`](#formatFloat64) · [`formatFloat32`](#formatFloat32) · [`formatBool`](#formatBool) · [`cstrToString`](#cstrToString) · [`intToString`](#intToString) · [`floatToString`](#floatToString) · [`boolToString`](#boolToString) · [`formatInt`](#formatInt) · [`formatFloat`](#formatFloat)

**Constants:** [`D`](#D) · [`HX`](#HX) · [`HU`](#HU)

## Constants

### <a id="D"></a>`D`

&gt; 📄 `format.vx` L24-35

```vex
const D: [u8; 200]=[
    48,48, 48,49, 48,50, 48,51, 48,52, 48,53, 48,54, 48,55, 48,56, 48,57,
    49,48, 49,49, 49,50, 49,51, 49,52, 49,53, 49,54, 49,55, 49,56, 49,57,
    50,48, 50,49, 50,50, 50,51, 50,52, 50,53, 50,54, 50,55, 50,56, 50,57,
    51,48, 51,49, 51,50, 51,51, 51,52, 51,53, 51,54, 51,55, 51,56, 51,57,
    52,48, 52,49, 52,50, 52,51, 52,52, 52,53, 52,54, 52,55, 52,56, 52,57,
    53,48, 53,49, 53,50, 53,51, 53,52, 53,53, 53,54, 53,55, 53,56, 53,57,
    54,48, 54,49, 54,50, 54,51, 54,52, 54,53, 54,54, 54,55, 54,56, 54,57,
    55,48, 55,49, 55,50, 55,51, 55,52, 55,53, 55,54, 55,55, 55,56, 55,57,
    56,48, 56,49, 56,50, 56,51, 56,52, 56,53, 56,54, 56,55, 56,56, 56,57,
    57,48, 57,49, 57,50, 57,51, 57,52, 57,53, 57,54, 57,55, 57,56, 57,57
];
```

**Returns:** `[u8; 200]=[
    48,48, 48,49, 48,50, 48,51, 48,52, 48,53, 48,54, 48,55, 48,56, 48,57,
    49,48, 49,49, 49,50, 49,51, 49,52, 49,53, 49,54, 49,55, 49,56, 49,57,
    50,48, 50,49, 50,50, 50,51, 50,52, 50,53, 50,54, 50,55, 50,56, 50,57,
    51,48, 51,49, 51,50, 51,51, 51,52, 51,53, 51,54, 51,55, 51,56, 51,57,
    52,48, 52,49, 52,50, 52,51, 52,52, 52,53, 52,54, 52,55, 52,56, 52,57,
    53,48, 53,49, 53,50, 53,51, 53,52, 53,53, 53,54, 53,55, 53,56, 53,57,
    54,48, 54,49, 54,50, 54,51, 54,52, 54,53, 54,54, 54,55, 54,56, 54,57,
    55,48, 55,49, 55,50, 55,51, 55,52, 55,53, 55,54, 55,55, 55,56, 55,57,
    56,48, 56,49, 56,50, 56,51, 56,52, 56,53, 56,54, 56,55, 56,56, 56,57,
    57,48, 57,49, 57,50, 57,51, 57,52, 57,53, 57,54, 57,55, 57,56, 57,57
];`

---

### <a id="HX"></a>`HX`

&gt; 📄 `format.vx` L119-119

```vex
const HX: [u8; 16]=[48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102];
```

**Returns:** `[u8; 16]=[48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102];`

---

### <a id="HU"></a>`HU`

&gt; 📄 `format.vx` L120-120

```vex
const HU: [u8; 16]=[48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70];
```

**Returns:** `[u8; 16]=[48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70];`

---

## Structs

### <a id="ParseError"></a>`ParseError` `🔓 export`

&gt; 📄 `errors.vx` L30-39

```vex
export struct ParseError
```

Detailed error information for parse failures

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `kind` | `ParseErrorKind` | 🔒 private | What kind of error occurred |
| `position` | `i64` | 🔒 private | Position in string where error occurred (0-indexed) |
| `invalidChar` | `u8` | 🔒 private | The invalid character (if applicable) |
| `message` | `*u8` | 🔒 private | Human-readable error message |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `ParseError.empty`[↗](#ParseError.empty) | `export fn ParseError.empty(): ParseError` | Create an empty input error |
| `ParseError.null`[↗](#ParseError.null) | `export fn ParseError.null(): ParseError` | Create a null pointer error |
| `ParseError.invalidChar`[↗](#ParseError.invalidChar) | `export fn ParseError.invalidChar(pos: i64, ch: u8)` | Create an invalid character error |
| `ParseError.overflow`[↗](#ParseError.overflow) | `export fn ParseError.overflow(pos: i64): ParseErro` | Create an overflow error |
| `ParseError.underflow`[↗](#ParseError.underflow) | `export fn ParseError.underflow(pos: i64): ParseErr` | Create an underflow error |
| `ParseError.invalidFormat`[↗](#ParseError.invalidFormat) | `export fn ParseError.invalidFormat(pos: i64, msg: ` | Create an invalid format error |
| `isKind`[↗](#ParseError.isKind) | `export fn (self: &ParseError) isKind(kind: ParseEr` | Check if error is of a specific kind |
| `code`[↗](#ParseError.code) | `export fn (self: &ParseError) code(): i32` | Get error code for FFI/interop |

---

## Enums

### <a id="ParseErrorKind"></a>`ParseErrorKind` `🔓 export`

&gt; 📄 `errors.vx` L10-23

```vex
export enum ParseErrorKind
```

Categories of parse errors

**Variants:**

- `Empty` — Input string is empty
- `InvalidChar` — Invalid character encountered
- `Overflow` — Value overflows target type
- `Underflow` — Value underflows target type (negative overflow)
- `InvalidFormat` — Invalid format (e.g., multiple decimal points)
- `NullPointer` — Null pointer passed

---

### <a id="ParseResult"></a>`ParseResult` `🔓 export`

&gt; 📄 `parse.vx` L17-20

```vex
export enum ParseResult<T>
```

**Variants:**

- `Ok`
- `Err`

**Type Parameters:**

- `T`

---

## Functions

### <a id="negPow10"></a>`negPow10`

&gt; 📄 `parse.vx` L24-32

```vex
fn negPow10(n: i32): f64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `n` | `i32` |  |

**Returns:** `f64`

---

### <a id="posPow10"></a>`posPow10`

&gt; 📄 `parse.vx` L34-42

```vex
fn posPow10(n: i32): f64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `n` | `i32` |  |

**Returns:** `f64`

---

### <a id="parseInt64"></a>`parseInt64` `🔓 export`

&gt; 📄 `parse.vx` L49-112

```vex
export fn parseInt64(s: *u8): ParseResult<i64>
```

Parse i64 — single-pass greedy pair accumulation.

First digit consumed alone, then pairs of 2 greedily.
Overflow checked only when digit count exceeds 18.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `*u8` |  |

**Returns:** `ParseResult&lt;i64&gt;`

---

### <a id="parseUInt64"></a>`parseUInt64` `🔓 export`

&gt; 📄 `parse.vx` L116-160

```vex
export fn parseUInt64(s: *u8): ParseResult<u64>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `*u8` |  |

**Returns:** `ParseResult&lt;u64&gt;`

---

### <a id="parseInt32"></a>`parseInt32` `🔓 export`

&gt; 📄 `parse.vx` L164-175

```vex
export fn parseInt32(s: *u8): ParseResult<i32>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `*u8` |  |

**Returns:** `ParseResult&lt;i32&gt;`

---

### <a id="parseUInt32"></a>`parseUInt32` `🔓 export`

&gt; 📄 `parse.vx` L177-188

```vex
export fn parseUInt32(s: *u8): ParseResult<u32>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `*u8` |  |

**Returns:** `ParseResult&lt;u32&gt;`

---

### <a id="parseInt16"></a>`parseInt16` `🔓 export`

&gt; 📄 `parse.vx` L190-201

```vex
export fn parseInt16(s: *u8): ParseResult<i16>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `*u8` |  |

**Returns:** `ParseResult&lt;i16&gt;`

---

### <a id="parseInt8"></a>`parseInt8` `🔓 export`

&gt; 📄 `parse.vx` L203-214

```vex
export fn parseInt8(s: *u8): ParseResult<i8>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `*u8` |  |

**Returns:** `ParseResult&lt;i8&gt;`

---

### <a id="parseFloat64"></a>`parseFloat64` `🔓 export`

&gt; 📄 `parse.vx` L218-285

```vex
export fn parseFloat64(s: *u8): ParseResult<f64>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `*u8` |  |

**Returns:** `ParseResult&lt;f64&gt;`

---

### <a id="parseFloat32"></a>`parseFloat32` `🔓 export`

&gt; 📄 `parse.vx` L287-293

```vex
export fn parseFloat32(s: *u8): ParseResult<f32>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `*u8` |  |

**Returns:** `ParseResult&lt;f32&gt;`

---

### <a id="parseHex"></a>`parseHex` `🔓 export`

&gt; 📄 `parse.vx` L297-330

```vex
export fn parseHex(s: *u8): ParseResult<u64>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `*u8` |  |

**Returns:** `ParseResult&lt;u64&gt;`

---

### <a id="parseBinary"></a>`parseBinary` `🔓 export`

&gt; 📄 `parse.vx` L334-364

```vex
export fn parseBinary(s: *u8): ParseResult<u64>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `*u8` |  |

**Returns:** `ParseResult&lt;u64&gt;`

---

### <a id="parseBool"></a>`parseBool` `🔓 export`

&gt; 📄 `parse.vx` L368-408

```vex
export fn parseBool(s: *u8): ParseResult<bool>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `*u8` |  |

**Returns:** `ParseResult&lt;bool&gt;`

---

### <a id="parseInt"></a>`parseInt` `🔓 export`

&gt; 📄 `parse.vx` L414-416

```vex
export fn parseInt(s: str): ParseResult<i64>
```

Parse a string into a signed 64-bit integer.

Returns a ParseResult containing the parsed i64 or ParseError.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `str` |  |

**Returns:** `ParseResult&lt;i64&gt;`

---

### <a id="parseFloat"></a>`parseFloat` `🔓 export`

&gt; 📄 `parse.vx` L420-422

```vex
export fn parseFloat(s: str): ParseResult<f64>
```

Parse a string into a 64-bit floating point number.

Returns a ParseResult containing the parsed f64 or ParseError.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `str` |  |

**Returns:** `ParseResult&lt;f64&gt;`

---

### <a id="parseBoolStr"></a>`parseBoolStr` `🔓 export`

&gt; 📄 `parse.vx` L426-428

```vex
export fn parseBoolStr(s: str): ParseResult<bool>
```

Parse a string into a boolean value.

Supports "true", "false", "1", "0", "yes", "no".

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `str` |  |

**Returns:** `ParseResult&lt;bool&gt;`

---

### <a id="heap"></a>`heap`

&gt; 📄 `format.vx` L42-48

```vex
fn heap(src: *u8, len: i32): *u8
```

Copy len bytes from stack buffer to heap via copy

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `src` | `*u8` |  |
| `len` | `i32` |  |

**Returns:** `*u8`

---

### <a id="formatInt64"></a>`formatInt64` `🔓 export`

&gt; 📄 `format.vx` L56-85

```vex
export fn formatInt64(value: i64): *u8
```

Format i64 to decimal string.

Schreiber backward-write + const lookup table — zero div-10/mod-10.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `i64` |  |

**Returns:** `*u8`

---

### <a id="formatUInt64"></a>`formatUInt64` `🔓 export`

&gt; 📄 `format.vx` L88-110

```vex
export fn formatUInt64(value: u64): *u8
```

Format u64 to decimal string

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `u64` |  |

**Returns:** `*u8`

---

### <a id="formatInt32"></a>`formatInt32` `🔓 export`

&gt; 📄 `format.vx` L112-112

```vex
export fn formatInt32(value: i32): *u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `i32` |  |

**Returns:** `*u8`

---

### <a id="formatUInt32"></a>`formatUInt32` `🔓 export`

&gt; 📄 `format.vx` L113-113

```vex
export fn formatUInt32(value: u32): *u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `u32` |  |

**Returns:** `*u8`

---

### <a id="formatHex"></a>`formatHex` `🔓 export`

&gt; 📄 `format.vx` L122-132

```vex
export fn formatHex(value: u64): *u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `u64` |  |

**Returns:** `*u8`

---

### <a id="formatHexUpper"></a>`formatHexUpper` `🔓 export`

&gt; 📄 `format.vx` L134-144

```vex
export fn formatHexUpper(value: u64): *u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `u64` |  |

**Returns:** `*u8`

---

### <a id="formatHexPrefix"></a>`formatHexPrefix` `🔓 export`

&gt; 📄 `format.vx` L146-161

```vex
export fn formatHexPrefix(value: u64): *u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `u64` |  |

**Returns:** `*u8`

---

### <a id="formatBinary"></a>`formatBinary` `🔓 export`

&gt; 📄 `format.vx` L167-177

```vex
export fn formatBinary(value: u64): *u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `u64` |  |

**Returns:** `*u8`

---

### <a id="formatFloat64"></a>`formatFloat64` `🔓 export`

&gt; 📄 `format.vx` L183-238

```vex
export fn formatFloat64(value: f64, precision: i32): *u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `f64` |  |
| `precision` | `i32` |  |

**Returns:** `*u8`

---

### <a id="formatFloat32"></a>`formatFloat32` `🔓 export`

&gt; 📄 `format.vx` L240-242

```vex
export fn formatFloat32(value: f32, precision: i32): *u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `f32` |  |
| `precision` | `i32` |  |

**Returns:** `*u8`

---

### <a id="formatBool"></a>`formatBool` `🔓 export`

&gt; 📄 `format.vx` L248-251

```vex
export fn formatBool(value: bool): *u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `bool` |  |

**Returns:** `*u8`

---

### <a id="cstrToString"></a>`cstrToString`

&gt; 📄 `format.vx` L261-265

```vex
fn cstrToString(raw: *u8): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `raw` | `*u8` |  |

**Returns:** `string`

---

### <a id="intToString"></a>`intToString` `🔓 export`

&gt; 📄 `format.vx` L268-270

```vex
export fn intToString(value: i64): string
```

Convert an i64 integer to an owned Vex string.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `i64` |  |

**Returns:** `string`

---

### <a id="floatToString"></a>`floatToString` `🔓 export`

&gt; 📄 `format.vx` L273-275

```vex
export fn floatToString(value: f64): string
```

Convert an f64 float to an owned Vex string with default 6 decimal precision.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `f64` |  |

**Returns:** `string`

---

### <a id="boolToString"></a>`boolToString` `🔓 export`

&gt; 📄 `format.vx` L278-280

```vex
export fn boolToString(value: bool): string
```

Convert a boolean to an owned Vex string ("true" or "false").

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `bool` |  |

**Returns:** `string`

---

### <a id="formatInt"></a>`formatInt` `🔓 export`

&gt; 📄 `format.vx` L283-285

```vex
export fn formatInt(value: i64): string
```

Format an i64 integer to an owned Vex string.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `i64` |  |

**Returns:** `string`

---

### <a id="formatFloat"></a>`formatFloat` `🔓 export`

&gt; 📄 `format.vx` L288-290

```vex
export fn formatFloat(value: f64, precision: i32): string
```

Format an f64 float to an owned Vex string with the specified decimal precision.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `f64` |  |
| `precision` | `i32` |  |

**Returns:** `string`

---

---

*Generated by vex-doc v2.0 • 2026-07-06*
