# Standard Library: IO

The `std/io` module provides basic input and output primitives. Currently, these are implemented as compiler builtins but exposed through this module path.

## Functions

### `print`
```vex
fn print(s: string)
```
Prints a string to standard output without a trailing newline.

**Example:**
```vex
import { print } from "io";
print("Hello, ");
print("World!");
// Output: Hello, World!
```

---

### `println`
```vex
fn println(s: string)
```
Prints a string to standard output with a trailing newline.

**Example:**
```vex
import { println } from "io";
println("Hello");
println("World");
// Output:
// Hello
// World
```

---

### `readln`
```vex
fn readln(): string
```
Reads a line from standard input, including the newline character.

**Example:**
```vex
import { println, readln } from "io";
print("Enter your name: ");
let name = readln();
println("Hello, " + name);
```

---

### `eprint`
```vex
fn eprint(s: string)
```
Prints a string to standard error without a trailing newline.

---

### `eprintln`
```vex
fn eprintln(s: string)
```
Prints a string to standard error with a trailing newline.
