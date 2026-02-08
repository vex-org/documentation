# Hello, World!

Let's write your first Vex program.

## 1. Create a Project

Vex manages code in **workspaces**. Let's create a new one:

```bash
mkdir hello-vex
cd hello-vex
vex init
```

This creates a `vex.mod` file and a `src` directory.

## 2. Writing Code

Open `src/main.vx` in your editor.

```vex
fn main(): i32 {
    let name = "World";
    println(f"Hello, {name}!");
    return 0;
}
```

### Anatomy of the Program
- **`fn main(): i32`**: The entry point. Must return an integer exit code (0 for success).
- **`let name`**: Declares an immutable variable.
- **`f"..."`**: An interpolated format string (f-string).
- **`println`**: A standard library function (implicitly imported from `std/io`).

## 3. Running

Run the program using the CLI:

```bash
vex run
```

You should see:
```
Compiling hello-vex v0.1.0...
Running target/debug/hello-vex
Hello, World!
```
