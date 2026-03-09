# Regex API (`regex`)

## `Regex` — Compiled Pattern

| Method | Description |
|--------|-------------|
| `Regex.new(pattern)` | Compile pattern with default flags |
| `Regex.compile(pattern, flags)` | Compile with explicit flags (`"i"`, `"m"`, `"s"`) |
| `Regex.invalid()` | Create an invalid/empty regex sentinel |
| `.test(text): bool` | Check if pattern matches anywhere in text |
| `.isMatch(text): bool` | Check if pattern matches the full text |
| `.exec(text, &match): bool` | Execute and capture groups |
| `.valid` | Check if compilation succeeded |
| `.source` | Original pattern string |
| `.groupCount` | Number of capture groups |

## `Match` — Captured Result

| Method | Description |
|--------|-------------|
| `Match.new()` | Create empty match |
| `.value(): string` | Full match text (group 0) |
| `.group(i): Option<string>` | Get capture group by index |
| `.groupCount(): i32` | Number of capture groups (excluding group 0) |
| `.start(): i32` | Start position of full match |
| `.end(): i32` | End position of full match |

## Flags

| Flag | Inline | Description |
|------|--------|-------------|
| `"i"` | `(?i)` | Case-insensitive matching |
| `"m"` | `(?m)` | Multiline (`^` and `$` match line boundaries) |
| `"s"` | `(?s)` | Dot-all (`.` matches `\n`) |

## Examples

```rust
import { Regex, Match } from "regex";

// Case-insensitive
let re = Regex.compile("hello", "i");
re.test("Hello World");  // true

// Capture groups
let re = Regex.new("(\\w+)@(\\w+)\\.(\\w+)");
let! m = Match.new();
if re.exec("user@example.com", &m) {
    println("User: {m.group(1)}");    // "user"
    println("Domain: {m.group(2)}");  // "example"
    println("TLD: {m.group(3)}");     // "com"
}

// Free functions
import { test, exec } from "regex";
test(&re, "some text");
```
