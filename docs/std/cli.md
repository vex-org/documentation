# cli

The `cli` module provides a powerful set of tools to craft robust command-line applications and parse complex script arguments effortlessly.

## Command-Line Parser

Instead of manually iterating over `sys.args()`, the CLI module offers a strict schema-driven approach. You define your Commands, Flags, and Arguments, and `cli` handles the parsing, validation, and auto-generated Help menus.

```rust
import { Application, Command, Flag } from "cli";

fn main() {
    let! app = Application.new("my_tool", "A super fast Vex utility");

    app.addFlag(Flag.new("verbose", "v").description("Enable verbose output").bool());
    app.addFlag(Flag.new("port", "p").description("Port to listen on").int().default(8080));

    let parsed = app.parse(sys.args()).unwrap();

    if parsed.getBool("verbose") {
        println("Verbose mode is enabled!");
    }

    let port = parsed.getInt("port");
    println("Using port: {port}");
}
```

## Features

- **Subcommands**: Deeply nested subcommands (e.g. `tool db migrate`).
- **Data Typed Flags**: Booleans, Integers, Floats, and Strings. Automatic parsing and type checking.
- **Required & Default Constraints**: Define if a user _must_ provide an argument, or fallback to a default cleanly.
- **Auto-generated Help**: Running `tool --help` instantly computes and prints an aligned, colorized usage menu based on your registered schema.
- **Zero-Allocation Tracking**: Uses string views and offsets rather than allocating heavily for each parsed switch.
