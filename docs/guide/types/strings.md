# Strings and Literals — Text Manipulation

Vex has a powerful, two-tier string system designed for both performance and safety. It distinguishes between **borrowed string views** (`str`) and **owned, heap-allocated strings** (`String`).

::: tip Prelude Types
Both `String` and `str` are **prelude types** — available in all Vex programs without any `import`.
:::

## str — Borrowed String View

`str` (also known as `VexStr`) is a light-weight, non-owning view of a UTF-8 string.

-   **Fixed Size**: Always 16 bytes (pointer + length).
-   **No Allocation**: Points to memory owned by something else (literals, heap strings, stack buffers).
-   **Cheap to Copy**: Implements `$Copy`—passing it around is nearly instantaneous.
-   **Literals**: All string literals in Vex (e.g., `"hello"`) are of type `str`.

```vex
let s: str = "Hello, Vex!"   // Literal is a 'str'
let part = s[0..5]          // Slicing returns a new 'str' view ("Hello")
```

## String — Owned Omni-String

`String` (also known as `VexString`) is Vex’s growable, heap-allocated string type. It features the **Omni-String** design, optimized for density and speed.

-   **SSO (Small String Optimization)**: Strings up to 12 bytes are stored directly in the struct, avoiding heap allocation entirely.
-   **Reference Counting**: Large strings use VUMM for zero-copy cloning and sharing.
-   **C Compatibility**: Heap strings are null-terminated, making them 100% C ABI compatible.
-   **Prefix-based Sorting**: Stores the first 4 bytes (Big-Endian) in the struct for ultra-fast comparison and sorting without cache misses.

```vex
let! owned = "Hello".to_string();  // Promote 'str' to 'String'
owned.append(" World");            // Growably append
```

## Common Operations

### Conversion

| Operation | Description |
|-----------|-------------|
| `"literal".to_string()` | Converts a borrowed `str` to an owned `String` (allocates). |
| `owned.as_ptr()` | Returns a standard C-string pointer (`ptr`). |
| `owned.cstr()` | Alias for `as_ptr()`. |

### Concatenation

Use the `+` operator or `append()` method.

```vex
let s3 = str1 + str2;     // Returns a new String
owned.append(str_view);   // In-place mutation (if unique)
```

### Slicing

Slicing always returns a `str` view, regardless of whether the source is a `String` or another `str`.

```vex
let view = owned[start..end];
```

### Searching and Filtering

| Method | Description |
|--------|-------------|
| `len()` | Returns the length in bytes. |
| `is_empty()` | Returns `true` if length is 0. |
| `starts_with(prefix)` | Returns `true` if it starts with the prefix. |
| `ends_with(suffix)` | Returns `true` if it ends with the suffix. |
| `contains(needle)` | SIMD-accelerated substring search. |
| `indexOf(needle)` | Returns the byte offset of the match. |

### Case Conversion

| Method | Description |
|--------|-------------|
| `toUpper()` | Returns a new `String` in UPPERCASE. |
| `toLower()` | Returns a new `String` in lowercase. |

### Trimming

Trimming is **zero-copy** — it returns a new `str` view pointing into the original data.

| Method | Description |
|--------|-------------|
| `trimStart()` | Removes leading whitespace. |
| `trimEnd()` | Removes trailing whitespace. |
| `trim()` | Removes both leading and trailing whitespace. |

## Advanced String Internals

Vex strings use a 16-byte layout:
1.  **Tagged Length (4 bytes)**: Contains length and flags (Large, ASCII, VUMM tag).
2.  **Prefix (4 bytes)**: First 4 bytes of data for fast sorting.
3.  **Payload (8 bytes)**: Inline data (if SSO) or heap pointer.

This density allows 4 strings to fit in a single CPU cache line, making Vex exceptionally fast at path-heavy tasks like routing or JSON parsing.

## See Also

-   [Vec\<T\>](./vec) — Dynamic collections
-   [Enums](./enums) — String-based variants
-   [FFI](../ffi) — Passing strings to C
