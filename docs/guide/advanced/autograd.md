# Automatic Differentiation

Vex currently exposes forward-mode automatic differentiation through an autograd block and four intrinsic helpers:

- `@param(expr)` seeds a value with gradient `1`
- `@val(dual)` reads the primal value
- `@grad(dual)` reads the tangent
- `@detach(dual)` clears gradient tracking

The `@{ ... }` block is still part of the language surface. It evaluates the block and returns the final autograd value.

## Core Example

```vex
fn main(): i32 {
    let result = @{
        let x = @param(3.0)
        x * x + 2.0 * x + 1.0
    }

    $println("value = ", @val(result))
    $println("grad = ", @grad(result))
    return 0
}
```

For the example above, the primal value is `16` and the gradient is `8`.

## Direct Intrinsic Use

You can also use the intrinsics directly without wrapping everything in a larger block:

```vex
fn main(): i32 {
    let x = @param(2.0)
    let y = Math.sin(x)

    $println("sin(2.0) = ", @val(y))
    $println("d/dx sin(2.0) = ", @grad(y))
    return 0
}
```

Current examples and compiler paths use the `Math.*` namespace for trig and transcendental functions rather than `$sin`, `$cos`, `$exp`, or `$log`.

## Supported Pattern Today

The implementation is forward-mode dual-number AD.

```vex
let x = @param(2.0)
let y = @param(3.0)
let z = x * y

$println("value = ", @val(z))
$println("grad = ", @grad(z))
```

When more than one input is seeded with `@param`, the current surface returns the directional derivative along the seeded tangent vector. In the example above, `@grad(z)` is `5`, not a pair of separate partial derivatives.

If you need separate partials, run separate passes and seed one input at a time.

## Detaching Values

`@detach` preserves the value and clears the gradient component.

```vex
fn main(): i32 {
    let x = @param(3.0)
    let frozen = @detach(x)

    $println("value = ", @val(frozen))
    $println("grad = ", @grad(frozen))
    return 0
}
```

## Math Functions

The current examples and compiler support autograd through ordinary arithmetic plus the math namespace.

```vex
fn main(): i32 {
    let result = @{
        let x = @param(4.0)
        Math.sqrt(x) + Math.log(x) + Math.exp(x)
    }

    $println("value = ", @val(result))
    $println("grad = ", @grad(result))
    return 0
}
```

Common working paths in the current tree include:

- `Math.sin`
- `Math.cos`
- `Math.exp`
- `Math.log`
- `Math.sqrt`

## What To Rely On

Use this page as the current contract for non-stdlib autograd syntax:

- Prefer `@param`, `@val`, `@grad`, and `@detach`
- Treat `$param`, `$val`, `$grad`, and `$detach` as legacy aliases, not the documented primary form
- Use `Math.*` calls for differentiable math operations
- Keep autograd scopes small and explicit so the seeded derivative path is obvious

## Related

- [SIMD](/guide/simd/)
- [GPU Programming](/guide/gpu/)
- [Builtins](/guide/advanced/builtins)
