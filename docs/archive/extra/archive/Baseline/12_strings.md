# Strings

**Baseline Feature**  
**Version:** 0.1.2  
**Status:** ✅ Implemented  
**Test:** `00_base_feats/12_strings.vx`

## Overview

Strings in Vex are UTF-8 encoded, immutable text sequences. They are managed by a smart reference-counting system (COW-friendly) ensuring memory safety without manual management.

## String Literals

### Basic Strings
Enclosed in double quotes.

```vex
let greeting = "Hello, World!";
let path = "C:\\Windows\\System32";
```

### F-Strings (Interpolation)
Prefix with `f` to embed expressions.

```vex
let name = "Alice";
let score = 100;
let msg = f"Player {name} scored {score} points.";
```

## String Operations

### Concatenation (`+`)
Join strings using the `+` operator.

```vex
let first = "Hello";
let second = "World";
let combined = first + " " + second; // "Hello World"
```

### Equality & Comparison
Strings compare by value (content comparison).

```vex
let s1 = "apple";
let s2 = "apple";
(s1 == s2); // True
("a" < "b");  // True (Lexicographical)
```

### Slicing
Use range syntax to get substrings.

```vex
let text = "Hello World";
let sub = text[0..5]; // "Hello"
```

## Standard Library Methods

Vex Strings come with a rich set of built-in methods (defined in `prelude`).

> [!NOTE]
> String methods use **camelCase** naming convention.

### Inspection
| Method | Return | Description |
| :--- | :--- | :--- |
| `.()` | `u64` | Byte length of string |
| `.isEmpty()` | `bool` | Returns true if length is 0 |
| `.contains(str)` | `bool` | True if substring exists |
| `.startsWith(str)` | `bool` | True if starts with prefix |
| `.endsWith(str)` | `bool` | True if ends with suffix |
| `.indexOf(str)` | `Option<u64>` | Index of first occurrence |

```vex
let url = "https://vex-lang.org";
if url.startsWith("https") {
    ("Secure URL");
}
```

### Transformation
These methods return a **new** string (original is immutable).

| Method | Description |
| :--- | :--- |
| `.toUpper()` | Converts to UPPERCASE |
| `.toLower()` | Converts to lowercase |
| `.trim()` | Removes whitespace from both ends |
| `.trimStart()` | Removes leading whitespace |
| `.trimEnd()` | Removes trailing whitespace |
| `.replace(old, new)` | Replaces all occurrences |
| `.repeat(n)` | Repeats string n times |

```vex
let dirty = "  Hello  ";
let clean = dirty.trim().toUpper(); // "HELLO"

let shout = "Go! ".repeat(3); // "Go! Go! Go! "
```

## Implementation Details

### Memory Layout
Strings are smart pointers to a reference-counted allocation.

```rust
// 16-Byte Stack Footprint
struct String {
    ptr: ptr,       // 8 bytes (Pointer to data)
    len: u32,       // 4 bytes (Length)
    internal: u32   // 4 bytes (Flags/Padding)
}
```

### C Integration
Strings can be converted to/from raw C strings for FFI.

```vex
let s = "Vex";
let c_ptr = s.asCStr(); // Unsafe raw pointer
```
