# CLI applications

The `cli` package provides a deterministic command schema, typed argv parser,
generated help, action dispatch and fallible prompt helpers. Parsing does not
use a process-global registry.

## Build a command tree

```vex
import { App, Arg, CliError, Command, Context, Flag } from "cli";
import { args as processArgs } from "sys/args";

fn build(context: &Context): Result<(), CliError> {
    let jobs = match context.getInt("jobs") {
        Ok(Some(value)) => value,
        Ok(None) => 1,
        Err(cliErr) => return Err(cliErr),
    };
    $println("workers: " + jobs.toString());
    return Ok(());
}

fn main(): i32 {
    let app = App.new("tool")
        .version("1.0.0")
        .about("Build projects")
        .flag(Flag.boolean("verbose", "v").persistent(true))
        .addCommand(
            Command.new("build")
                .alias("b")
                .arg(Arg.new("input").required(true))
                .flag(
                    Flag.integer("jobs", "j")
                        .env("TOOL_JOBS")
                        .defaultValue("4")
                )
                .action(build)
        );

    match app.run(processArgs()) {
        Ok(_) => return 0,
        Err(cliErr) => {
            $eprintln(cliErr.toString());
            return 1;
        }
    }
}
```

`-h`/`--help` and `--version` are application controls. `-v` is intentionally
available to the schema for conventional verbose flags.

## Flags and arguments

Flag constructors are:

- `Flag.boolean(name, short)`;
- `Flag.stringValue(name, short)`;
- `Flag.integer(name, short)`;
- `Flag.count(name, short)`.

Flags support `alias`, `required`, `defaultValue`, `env`, `persistent`,
`repeatable`, `possibleValue`, `validator`, `conflictsWith`, and
`requiresFlag`. Boolean flags accept positive and `--no-...` spellings.
Value-less short flags can be clustered, while a value-taking short flag
consumes the token suffix or next argv value.

Arguments support `required`, `defaultValue`, `env`, `possibleValue`,
`validator`, and a final `variadic` argument. `--` terminates option parsing.

Resolution precedence is command line, then non-empty environment value, then
explicit default. `Context.wasProvided` remains true only for actual
command-line occurrences.

Boolean absence is not converted into a fake `false`. Handle `Ok(None)` or add
`.defaultValue("false")` when the schema requires a resolved value.

## Parse once or prepare

`App.parse(&argv)` validates the complete schema and returns a `Context`
without printing or running an action. Repeated parsers should validate once:

```vex
let prepared = match app.prepare() {
    Ok(value) => value,
    Err(cliErr) => return Err(cliErr),
};

let first = prepared.parse(&firstArgv);
let second = prepared.parse(&secondArgv);
```

`PreparedApp` also provides `run`, `helpText`, and `helpTextFor`.

## Typed context access

Use `getBool`, `getInt`, `getString`, `getStrings`, `getCount`, `getArg`, and
`getArgs`. Repeatable and variadic accessors preserve input order. Command and
flag aliases always resolve to canonical names in the context.

## Deterministic help

`helpText()` renders root help. `helpTextFor(&argv)` resolves aliases and
renders the selected canonical command path. Output is ANSI-free and includes
aliases, argument/value shapes, possible values, env/default/required
metadata, relationships and inherited persistent flags.

## Prompts and terminal style

`input`, `confirm`, and `choose` return `Result<_, IoError>`. Empty/default and
malformed/error states are not conflated. `choose` borrows its option vector.
Prompt output is ANSI-free; the explicit `style` functions are opt-in when the
application knows color output is appropriate.

## Current advanced boundary

The production-signed core covers schema, parsing, help and dispatch. Shell
completion, hidden/deprecated migration metadata, typo suggestions,
schema-generated man pages and explicit config-file integration are staged on
the same command model. They are not silently emulated by ambient global
configuration.
