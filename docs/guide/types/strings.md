# Strings

Vex uses two string-facing types in normal code:

- `str`: a borrowed string view
- `string`: an owned string value

Both are available from the prelude. You do not need an `import`.

## `str` vs `string`

Use `str` when you only need to read text. Use `string` when you need to return, store, concatenate, or otherwise own the result.

```vex
fn greet(name: str): string {
	return "Hello, " + name;
}

fn main(): i32 {
	let label: str = "vex";
	let message: string = greet(label);
	println(message);
	return 0;
}
```

In current Vex docs, prefer the lowercase spelling `string`. Some older tests in the repository still use `String` while naming is being normalized.

## Literals and cheap reads

String literals are the easiest way to produce text:

```vex
let site = "vex.dev";
let prefix = "https://";
let full = prefix + site;
```

Common read-only operations are available directly on string values used throughout the repo:

```vex
let url = "https://example.com/api/v1/users";

let ok_prefix = url.starts_with("https://");
let ok_suffix = url.ends_with("users");
let has_api = url.contains("/api/");
let idx = url.indexOf("example");
```

## Conversions and formatting

Vex code typically converts non-string values with `.toString()`:

```vex
let count = 42;
let line = "count=" + count.toString();
println(line);
```

That pattern is used broadly in the examples and standard library tests.

## Common operations

### Concatenation

The `+` operator is the most common way to build new owned strings:

```vex
let part1 = "Hello, ";
let part2 = "World!";
let combined = part1 + part2;
```

### Search

```vex
let haystack = "Lorem ipsum dolor sit amet";

let found = haystack.contains("amet");
let pos = haystack.indexOf("ipsum");
```

### Trimming and case conversion

```vex
let padded = "    hello world    ";
let trimmed = padded.trim();
let upper = trimmed.toUpper();
let lower = upper.toLower();
```

### Repeat

```vex
let token: string = "ab";
let repeated = token.repeat(4);
```

## Ownership guidance

- Accept `str` in APIs that only inspect text.
- Return `string` when you create a fresh value.
- Use concatenation and `.toString()` for straightforward text building.
- Reach for template literals when you need multi-line structured output.

## Internal model

Vex's owned `string` uses the compact omni-string layout described in the language internals. The important user-facing fact is simpler: short strings stay cheap, and the language keeps common string operations ergonomic.

## See also

- [Template Literals](../basics/template-literals)
- [`Vec<T>`](./vec)
- [FFI](../ffi)
