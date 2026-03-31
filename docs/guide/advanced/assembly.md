# Inline Assembly

Vex supports `asm!(...)` expressions for low-level and freestanding code. The current parser accepts the builtin-style operand helpers shown on this page.

## Current Syntax

```vex
unsafe {
    asm!("nop")
}
```

Operands and options are passed as builtin-style helpers inside the `asm!(...)` call.

## Operand Helpers

The parser currently recognizes these forms:

- `$asmIn("constraint", value)`
- `$asmOut("constraint", place)`
- `$asmLateOut("constraint", place)`
- `$asmInOut("constraint", place)`
- `$asmInLateOut("constraint", place)`
- `$asmOpt("pure", "nomem", ...)`
- `$asmClobber("memory", "cc", ...)`

## Basic Example

```vex
fn main() {
    let x: i64 = 20
    let! result: i64 = 0

    unsafe {
        asm!("nop", $asmIn("r", x))
        asm!("mov $0, 0", $asmOut("=r", result))
        asm!("nop", $asmOpt("pure", "nomem"))
    }

    $print(result)
}
```

This is the same builtin-style surface used by current example code.

## Outputs and Wildcards

Output helpers accept either a destination or `_` when you want to discard the result:

```vex
unsafe {
    asm!("nop", $asmLateOut("=r", _))
}
```

## Clobbers and Options

```vex
unsafe {
    asm!(
        "nop",
        $asmOpt("pure", "nomem", "nostack"),
        $asmClobber("memory", "cc")
    )
}
```

The exact accepted constraint strings and option combinations still depend on backend support, target, and codegen path. Keep inline asm minimal and target-specific.

## Legacy Syntax Note

Older `in(...)`, `out(...)`, and similar Rust-style operand forms are no longer the documented surface here. Use the `$asmIn` and `$asmOut` family instead.

## Guidance

1. Keep `asm!` inside `unsafe` blocks.
2. Prefer higher-level intrinsics or stdlib APIs when they exist.
3. Use the narrowest possible constraints and the fewest clobbers needed.
4. Treat inline assembly as target-specific code, not portable application logic.

## Related

- [Freestanding](/guide/freestanding)
- [Unsafe](/guide/advanced/unsafe)
- [Builtins](/guide/advanced/builtins)
