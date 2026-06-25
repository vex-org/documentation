# Project v0.0.0

## Overview

**Structs:** [`SentinelError`](#SentinelError) · [`StdError`](#StdError)

**Functions:** [`newError`](#newError) · [`newErrorCode`](#newErrorCode) · [`newErrorKind`](#newErrorKind) · [`newErrorf`](#newErrorf) · [`wrap`](#wrap) · [`wrapf`](#wrapf) · [`unwrapMsg`](#unwrapMsg) · [`wrapSentinel`](#wrapSentinel) · [`unwrap`](#unwrap) · [`rootCause`](#rootCause) · [`chain`](#chain) · [`chainDepth`](#chainDepth) · [`fromSentinel`](#fromSentinel) · [`withPrefix`](#withPrefix) · [`withSuffix`](#withSuffix) · [`join`](#join) · [`is`](#is) · [`is`](#is) · [`is`](#is) · [`equals`](#equals) · [`isEqual`](#isEqual) · [`contains`](#contains) · [`getMessage`](#getMessage) · [`getCode`](#getCode) · [`getKind`](#getKind) · [`hasCode`](#hasCode) · [`isWrapped`](#isWrapped) · [`toString`](#toString) · [`join2`](#join2) · [`join3`](#join3) · [`ok`](#ok) · [`err`](#err) · [`errFrom`](#errFrom) · [`ErrNotFound`](#ErrNotFound) · [`ErrPermission`](#ErrPermission) · [`ErrTimeout`](#ErrTimeout) · [`ErrCanceled`](#ErrCanceled) · [`ErrClosed`](#ErrClosed) · [`ErrEOF`](#ErrEOF) · [`ErrInvalidArg`](#ErrInvalidArg) · [`ErrNotSupported`](#ErrNotSupported) · [`ErrExists`](#ErrExists) · [`ErrConnRefused`](#ErrConnRefused) · [`CODE_NOT_FOUND`](#CODE_NOT_FOUND) · [`CODE_PERMISSION`](#CODE_PERMISSION) · [`CODE_TIMEOUT`](#CODE_TIMEOUT) · [`CODE_CANCELED`](#CODE_CANCELED) · [`CODE_CLOSED`](#CODE_CLOSED) · [`CODE_EOF`](#CODE_EOF) · [`CODE_INVALID_ARG`](#CODE_INVALID_ARG) · [`CODE_NOT_SUPPORTED`](#CODE_NOT_SUPPORTED) · [`CODE_EXISTS`](#CODE_EXISTS) · [`CODE_CONN_REFUSED`](#CODE_CONN_REFUSED) · [`KIND_OTHER`](#KIND_OTHER) · [`KIND_NOT_FOUND`](#KIND_NOT_FOUND) · [`KIND_PERMISSION_DENIED`](#KIND_PERMISSION_DENIED) · [`KIND_TIMED_OUT`](#KIND_TIMED_OUT) · [`KIND_CANCELED`](#KIND_CANCELED) · [`KIND_CLOSED`](#KIND_CLOSED) · [`KIND_EOF`](#KIND_EOF) · [`KIND_INVALID_INPUT`](#KIND_INVALID_INPUT) · [`KIND_UNSUPPORTED`](#KIND_UNSUPPORTED) · [`KIND_ALREADY_EXISTS`](#KIND_ALREADY_EXISTS) · [`KIND_CONN_REFUSED`](#KIND_CONN_REFUSED) · [`kindFromCode`](#kindFromCode) · [`codeFromKind`](#codeFromKind) · [`codeFromMsg`](#codeFromMsg)

## Structs

### <a id="SentinelError"></a>`SentinelError` `🔓 export`

&gt; 📄 `lib.vx` L12-15

```vex
export struct SentinelError
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `msg` | `string` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `message`[↗](#SentinelError.message) | `export fn (self: &SentinelError) message(): string` |  |
| `equals`[↗](#SentinelError.equals) | `export fn (self: &SentinelError) equals(other: &Se` |  |

---

### <a id="StdError"></a>`StdError` `🔓 export`

&gt; 📄 `lib.vx` L30-36

```vex
export struct StdError
```

Standard error implementation with optional wrapped error

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `msg` | `string` | 🔓 public |  |
| `code` | `i32` | 🔓 public |  |
| `wrapped` | `i64` | 🔓 public |  |
| `hasWrapped` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `drop`[↗](#StdError.drop) | `export fn (self: &StdError!) drop()` |  |
| `clone`[↗](#StdError.clone) | `export fn (self: &StdError) clone(): StdError` |  |
| `message`[↗](#StdError.message) | `export fn (self: &StdError) message(): string` |  |
| `code`[↗](#StdError.code) | `export fn (self: &StdError) code(): i32` |  |
| `cause`[↗](#StdError.cause) | `export fn (self: &StdError) cause(): Option&lt;StdErr` |  |
| `StdError.new`[↗](#StdError.new) | `export fn StdError.new(msg: string): StdError` |  |
| `StdError.newWithCode`[↗](#StdError.newWithCode) | `export fn StdError.newWithCode(msg: string, code: ` |  |
| `StdError.newWithKind`[↗](#StdError.newWithKind) | `export fn StdError.newWithKind(msg: string, kind: ` |  |
| `StdError.newFormatted`[↗](#StdError.newFormatted) | `export fn StdError.newFormatted(format: string, ar` |  |

---

## Functions

### <a id="newError"></a>`newError` `🔓 export`

&gt; 📄 `lib.vx` L127-129

```vex
export fn newError(msg: string): StdError
```

Create a new error with message

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `msg` | `string` |  |

**Returns:** `StdError`

---

### <a id="newErrorCode"></a>`newErrorCode` `🔓 export`

&gt; 📄 `lib.vx` L133-135

```vex
export fn newErrorCode(msg: string, code: i32): StdError
```

Create a new error with message and code

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `msg` | `string` |  |
| `code` | `i32` |  |

**Returns:** `StdError`

---

### <a id="newErrorKind"></a>`newErrorKind` `🔓 export`

&gt; 📄 `lib.vx` L139-141

```vex
export fn newErrorKind(msg: string, kind: i32): StdError
```

Create a new error with message and semantic kind.

Kind is mapped to the canonical error code constants.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `msg` | `string` |  |
| `kind` | `i32` |  |

**Returns:** `StdError`

---

### <a id="newErrorf"></a>`newErrorf` `🔓 export`

&gt; 📄 `lib.vx` L144-146

```vex
export fn newErrorf(format: string, arg: string): StdError
```

Create a new error with formatted message (simple version)

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `format` | `string` |  |
| `arg` | `string` |  |

**Returns:** `StdError`

---

### <a id="wrap"></a>`wrap` `🔓 export`

&gt; 📄 `lib.vx` L154-166

```vex
export fn wrap(err: StdError, msg: string): StdError
```

Wrap an error with additional context

Returns a new error that wraps the original

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err` | `StdError` |  |
| `msg` | `string` |  |

**Returns:** `StdError`

---

### <a id="wrapf"></a>`wrapf` `🔓 export`

&gt; 📄 `lib.vx` L169-171

```vex
export fn wrapf(err: StdError, format: string, arg: string): StdError
```

Wrap an error with formatted message

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err` | `StdError` |  |
| `format` | `string` |  |
| `arg` | `string` |  |

**Returns:** `StdError`

---

### <a id="unwrapMsg"></a>`unwrapMsg` `🔓 export`

&gt; 📄 `lib.vx` L175-185

```vex
export fn unwrapMsg(err: &StdError): string
```

Unwrap returns the underlying error message if wrapped

For Vex, we return the original message portion

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err` | `&StdError` |  |

**Returns:** `string`

---

### <a id="wrapSentinel"></a>`wrapSentinel` `🔓 export`

&gt; 📄 `lib.vx` L188-190

```vex
export fn wrapSentinel(s: SentinelError, msg: string): StdError
```

wrapSentinel wraps sentinel error with additional context message

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `SentinelError` |  |
| `msg` | `string` |  |

**Returns:** `StdError`

---

### <a id="unwrap"></a>`unwrap` `🔓 export`

&gt; 📄 `lib.vx` L193-200

```vex
export fn unwrap(err: StdError): Option<StdError>
```

unwrap returns Option wrapped error

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err` | `StdError` |  |

**Returns:** `Option&lt;StdError&gt;`

---

### <a id="rootCause"></a>`rootCause` `🔓 export`

&gt; 📄 `lib.vx` L203-217

```vex
export fn rootCause(err: StdError): StdError
```

rootCause traverses error chain and returns the original error

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err` | `StdError` |  |

**Returns:** `StdError`

---

### <a id="chain"></a>`chain` `🔓 export`

&gt; 📄 `lib.vx` L220-236

```vex
export fn chain(err: StdError): string
```

chain formats the error chain as a diagnostic string

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err` | `StdError` |  |

**Returns:** `string`

---

### <a id="chainDepth"></a>`chainDepth` `🔓 export`

&gt; 📄 `lib.vx` L239-255

```vex
export fn chainDepth(err: StdError): i32
```

chainDepth returns levels of wrapping

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err` | `StdError` |  |

**Returns:** `i32`

---

### <a id="fromSentinel"></a>`fromSentinel` `🔓 export`

&gt; 📄 `lib.vx` L258-265

```vex
export fn fromSentinel(s: SentinelError): StdError
```

fromSentinel builds StdError from SentinelError

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `SentinelError` |  |

**Returns:** `StdError`

---

### <a id="withPrefix"></a>`withPrefix` `🔓 export`

&gt; 📄 `lib.vx` L268-272

```vex
export fn withPrefix(err: StdError, prefix: string): StdError
```

withPrefix prepends a prefix to error message

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err` | `StdError` |  |
| `prefix` | `string` |  |

**Returns:** `StdError`

---

### <a id="withSuffix"></a>`withSuffix` `🔓 export`

&gt; 📄 `lib.vx` L275-279

```vex
export fn withSuffix(err: StdError, suffix: string): StdError
```

withSuffix appends a suffix to error message

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err` | `StdError` |  |
| `suffix` | `string` |  |

**Returns:** `StdError`

---

### <a id="join"></a>`join` `🔓 export`

&gt; 📄 `lib.vx` L282-298

```vex
export fn join(errors: &Vec<StdError>, sep: string): StdError
```

join combines multiple errors with separator

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `errors` | `&Vec&lt;StdError&gt;` |  |
| `sep` | `string` |  |

**Returns:** `StdError`

---

### <a id="is"></a>`is` `🔓 export`

&gt; 📄 `lib.vx` L305-318

```vex
export fn is(err: &StdError, targetCode: i32): bool
```

Check if err matches target error code

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err` | `&StdError` |  |
| `targetCode` | `i32` |  |

**Returns:** `bool`

---

### <a id="is"></a>`is` `🔓 export`

&gt; 📄 `lib.vx` L321-338

```vex
export fn is(err: &StdError, target: &SentinelError): bool
```

Check if err matches target SentinelError

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err` | `&StdError` |  |
| `target` | `&SentinelError` |  |

**Returns:** `bool`

---

### <a id="is"></a>`is` `🔓 export`

&gt; 📄 `lib.vx` L341-343

```vex
export fn is(err: &StdError, target: SentinelError): bool
```

Check if err matches target SentinelError by value

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err` | `&StdError` |  |
| `target` | `SentinelError` |  |

**Returns:** `bool`

---

### <a id="equals"></a>`equals` `🔓 export`

&gt; 📄 `lib.vx` L346-348

```vex
export fn equals(err1: &StdError, err2: &StdError): bool
```

Check if two errors are equal (same message and code)

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err1` | `&StdError` |  |
| `err2` | `&StdError` |  |

**Returns:** `bool`

---

### <a id="isEqual"></a>`isEqual` `🔓 export`

&gt; 📄 `lib.vx` L351-353

```vex
export fn isEqual(err1: &StdError, err2: &StdError): bool
```

Check if two errors are equal

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err1` | `&StdError` |  |
| `err2` | `&StdError` |  |

**Returns:** `bool`

---

### <a id="contains"></a>`contains` `🔓 export`

&gt; 📄 `lib.vx` L356-379

```vex
export fn contains(err: &StdError, substring: string): bool
```

Check if error message contains a substring

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err` | `&StdError` |  |
| `substring` | `string` |  |

**Returns:** `bool`

---

### <a id="getMessage"></a>`getMessage` `🔓 export`

&gt; 📄 `lib.vx` L386-388

```vex
export fn getMessage(err: &StdError): string
```

Get error message

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err` | `&StdError` |  |

**Returns:** `string`

---

### <a id="getCode"></a>`getCode` `🔓 export`

&gt; 📄 `lib.vx` L391-393

```vex
export fn getCode(err: &StdError): i32
```

Get error code

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err` | `&StdError` |  |

**Returns:** `i32`

---

### <a id="getKind"></a>`getKind` `🔓 export`

&gt; 📄 `lib.vx` L397-399

```vex
export fn getKind(err: &StdError): i32
```

Get normalized semantic kind for an error code.

Unknown codes are mapped to KIND_OTHER.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err` | `&StdError` |  |

**Returns:** `i32`

---

### <a id="hasCode"></a>`hasCode` `🔓 export`

&gt; 📄 `lib.vx` L402-404

```vex
export fn hasCode(err: &StdError, code: i32): bool
```

Check if error has a specific code

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err` | `&StdError` |  |
| `code` | `i32` |  |

**Returns:** `bool`

---

### <a id="isWrapped"></a>`isWrapped` `🔓 export`

&gt; 📄 `lib.vx` L407-409

```vex
export fn isWrapped(err: &StdError): bool
```

Check if error is wrapped

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err` | `&StdError` |  |

**Returns:** `bool`

---

### <a id="toString"></a>`toString` `🔓 export`

&gt; 📄 `lib.vx` L412-417

```vex
export fn toString(err: &StdError): string
```

Get string representation of error

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err` | `&StdError` |  |

**Returns:** `string`

---

### <a id="join2"></a>`join2` `🔓 export`

&gt; 📄 `lib.vx` L425-436

```vex
export fn join2(err1: StdError, err2: StdError): StdError
```

Join two errors into one

Returns error with combined message

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err1` | `StdError` |  |
| `err2` | `StdError` |  |

**Returns:** `StdError`

---

### <a id="join3"></a>`join3` `🔓 export`

&gt; 📄 `lib.vx` L439-449

```vex
export fn join3(err1: StdError, err2: StdError, err3: StdError): StdError
```

Join three errors into one

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `err1` | `StdError` |  |
| `err2` | `StdError` |  |
| `err3` | `StdError` |  |

**Returns:** `StdError`

---

### <a id="ok"></a>`ok` `🔓 export`

&gt; 📄 `lib.vx` L455-457

```vex
export fn ok(val: T): Result<T, StdError>
```

**Type Parameters:**

- `T`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `val` | `T` |  |

**Returns:** `Result&lt;T, StdError&gt;`

---

### <a id="err"></a>`err` `🔓 export`

&gt; 📄 `lib.vx` L459-461

```vex
export fn err(msg: string): Result<T, StdError>
```

**Type Parameters:**

- `T`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `msg` | `string` |  |

**Returns:** `Result&lt;T, StdError&gt;`

---

### <a id="errFrom"></a>`errFrom` `🔓 export`

&gt; 📄 `lib.vx` L463-465

```vex
export fn errFrom(s: SentinelError): Result<T, StdError>
```

**Type Parameters:**

- `T`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `SentinelError` |  |

**Returns:** `Result&lt;T, StdError&gt;`

---

### <a id="ErrNotFound"></a>`ErrNotFound` `🔓 export`

&gt; 📄 `lib.vx` L471-473

```vex
export fn ErrNotFound(): SentinelError
```

**Returns:** `SentinelError`

---

### <a id="ErrPermission"></a>`ErrPermission` `🔓 export`

&gt; 📄 `lib.vx` L475-477

```vex
export fn ErrPermission(): SentinelError
```

**Returns:** `SentinelError`

---

### <a id="ErrTimeout"></a>`ErrTimeout` `🔓 export`

&gt; 📄 `lib.vx` L479-481

```vex
export fn ErrTimeout(): SentinelError
```

**Returns:** `SentinelError`

---

### <a id="ErrCanceled"></a>`ErrCanceled` `🔓 export`

&gt; 📄 `lib.vx` L483-485

```vex
export fn ErrCanceled(): SentinelError
```

**Returns:** `SentinelError`

---

### <a id="ErrClosed"></a>`ErrClosed` `🔓 export`

&gt; 📄 `lib.vx` L487-489

```vex
export fn ErrClosed(): SentinelError
```

**Returns:** `SentinelError`

---

### <a id="ErrEOF"></a>`ErrEOF` `🔓 export`

&gt; 📄 `lib.vx` L491-493

```vex
export fn ErrEOF(): SentinelError
```

**Returns:** `SentinelError`

---

### <a id="ErrInvalidArg"></a>`ErrInvalidArg` `🔓 export`

&gt; 📄 `lib.vx` L495-497

```vex
export fn ErrInvalidArg(): SentinelError
```

**Returns:** `SentinelError`

---

### <a id="ErrNotSupported"></a>`ErrNotSupported` `🔓 export`

&gt; 📄 `lib.vx` L499-501

```vex
export fn ErrNotSupported(): SentinelError
```

**Returns:** `SentinelError`

---

### <a id="ErrExists"></a>`ErrExists` `🔓 export`

&gt; 📄 `lib.vx` L503-505

```vex
export fn ErrExists(): SentinelError
```

**Returns:** `SentinelError`

---

### <a id="ErrConnRefused"></a>`ErrConnRefused` `🔓 export`

&gt; 📄 `lib.vx` L507-509

```vex
export fn ErrConnRefused(): SentinelError
```

**Returns:** `SentinelError`

---

### <a id="CODE_NOT_FOUND"></a>`CODE_NOT_FOUND` `🔓 export`

&gt; 📄 `lib.vx` L515-515

```vex
export fn CODE_NOT_FOUND(): i32
```

**Returns:** `i32`

---

### <a id="CODE_PERMISSION"></a>`CODE_PERMISSION` `🔓 export`

&gt; 📄 `lib.vx` L516-516

```vex
export fn CODE_PERMISSION(): i32
```

**Returns:** `i32`

---

### <a id="CODE_TIMEOUT"></a>`CODE_TIMEOUT` `🔓 export`

&gt; 📄 `lib.vx` L517-517

```vex
export fn CODE_TIMEOUT(): i32
```

**Returns:** `i32`

---

### <a id="CODE_CANCELED"></a>`CODE_CANCELED` `🔓 export`

&gt; 📄 `lib.vx` L518-518

```vex
export fn CODE_CANCELED(): i32
```

**Returns:** `i32`

---

### <a id="CODE_CLOSED"></a>`CODE_CLOSED` `🔓 export`

&gt; 📄 `lib.vx` L519-519

```vex
export fn CODE_CLOSED(): i32
```

**Returns:** `i32`

---

### <a id="CODE_EOF"></a>`CODE_EOF` `🔓 export`

&gt; 📄 `lib.vx` L520-520

```vex
export fn CODE_EOF(): i32
```

**Returns:** `i32`

---

### <a id="CODE_INVALID_ARG"></a>`CODE_INVALID_ARG` `🔓 export`

&gt; 📄 `lib.vx` L521-521

```vex
export fn CODE_INVALID_ARG(): i32
```

**Returns:** `i32`

---

### <a id="CODE_NOT_SUPPORTED"></a>`CODE_NOT_SUPPORTED` `🔓 export`

&gt; 📄 `lib.vx` L522-522

```vex
export fn CODE_NOT_SUPPORTED(): i32
```

**Returns:** `i32`

---

### <a id="CODE_EXISTS"></a>`CODE_EXISTS` `🔓 export`

&gt; 📄 `lib.vx` L523-523

```vex
export fn CODE_EXISTS(): i32
```

**Returns:** `i32`

---

### <a id="CODE_CONN_REFUSED"></a>`CODE_CONN_REFUSED` `🔓 export`

&gt; 📄 `lib.vx` L524-524

```vex
export fn CODE_CONN_REFUSED(): i32
```

**Returns:** `i32`

---

### <a id="KIND_OTHER"></a>`KIND_OTHER` `🔓 export`

&gt; 📄 `lib.vx` L530-530

```vex
export fn KIND_OTHER(): i32
```

**Returns:** `i32`

---

### <a id="KIND_NOT_FOUND"></a>`KIND_NOT_FOUND` `🔓 export`

&gt; 📄 `lib.vx` L531-531

```vex
export fn KIND_NOT_FOUND(): i32
```

**Returns:** `i32`

---

### <a id="KIND_PERMISSION_DENIED"></a>`KIND_PERMISSION_DENIED` `🔓 export`

&gt; 📄 `lib.vx` L532-532

```vex
export fn KIND_PERMISSION_DENIED(): i32
```

**Returns:** `i32`

---

### <a id="KIND_TIMED_OUT"></a>`KIND_TIMED_OUT` `🔓 export`

&gt; 📄 `lib.vx` L533-533

```vex
export fn KIND_TIMED_OUT(): i32
```

**Returns:** `i32`

---

### <a id="KIND_CANCELED"></a>`KIND_CANCELED` `🔓 export`

&gt; 📄 `lib.vx` L534-534

```vex
export fn KIND_CANCELED(): i32
```

**Returns:** `i32`

---

### <a id="KIND_CLOSED"></a>`KIND_CLOSED` `🔓 export`

&gt; 📄 `lib.vx` L535-535

```vex
export fn KIND_CLOSED(): i32
```

**Returns:** `i32`

---

### <a id="KIND_EOF"></a>`KIND_EOF` `🔓 export`

&gt; 📄 `lib.vx` L536-536

```vex
export fn KIND_EOF(): i32
```

**Returns:** `i32`

---

### <a id="KIND_INVALID_INPUT"></a>`KIND_INVALID_INPUT` `🔓 export`

&gt; 📄 `lib.vx` L537-537

```vex
export fn KIND_INVALID_INPUT(): i32
```

**Returns:** `i32`

---

### <a id="KIND_UNSUPPORTED"></a>`KIND_UNSUPPORTED` `🔓 export`

&gt; 📄 `lib.vx` L538-538

```vex
export fn KIND_UNSUPPORTED(): i32
```

**Returns:** `i32`

---

### <a id="KIND_ALREADY_EXISTS"></a>`KIND_ALREADY_EXISTS` `🔓 export`

&gt; 📄 `lib.vx` L539-539

```vex
export fn KIND_ALREADY_EXISTS(): i32
```

**Returns:** `i32`

---

### <a id="KIND_CONN_REFUSED"></a>`KIND_CONN_REFUSED` `🔓 export`

&gt; 📄 `lib.vx` L540-540

```vex
export fn KIND_CONN_REFUSED(): i32
```

**Returns:** `i32`

---

### <a id="kindFromCode"></a>`kindFromCode` `🔓 export`

&gt; 📄 `lib.vx` L543-555

```vex
export fn kindFromCode(code: i32): i32
```

Map code -&gt; semantic error kind.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `code` | `i32` |  |

**Returns:** `i32`

---

### <a id="codeFromKind"></a>`codeFromKind` `🔓 export`

&gt; 📄 `lib.vx` L558-570

```vex
export fn codeFromKind(kind: i32): i32
```

Map semantic kind -&gt; canonical code.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `kind` | `i32` |  |

**Returns:** `i32`

---

### <a id="codeFromMsg"></a>`codeFromMsg`

&gt; 📄 `lib.vx` L572-584

```vex
fn codeFromMsg(msg: string): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `msg` | `string` |  |

**Returns:** `i32`

---

---

*Generated by vex-doc v2.0 • 2026-07-06*
