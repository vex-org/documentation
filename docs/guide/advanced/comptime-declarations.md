# Structural Declaration Generation

Vex can generate declarations without generating source text. A module
generator returns compiler-owned `DeclSet` data composed from typed `DeclExpr`,
`DeclPattern`, and `DeclConstraint` plans. The compiler lowers those plans
directly to ordinary HIR.

This is the supported alternative to token streams, textual templates,
synthetic ASTs, and Rust-style procedural macros.

## Generator trigger

A top-level function is an eager module generator when it is:

- declared `const`;
- non-generic;
- parameterless; and
- declared to return `DeclSet`.

Parameterized or generic functions returning `DeclSet` may be called as
helpers, but they are not discovered as module roots.

```vex
const fn deriveModule(): DeclSet {
    let input = #DeclExpr.param<i32>("classify.input", "input", 0)
    let body = #DeclExpr.matchValue(
        input,
        [#DeclExpr.value(0), #DeclExpr.value(1)],
        [#DeclExpr.value(10), #DeclExpr.value(20)],
        #DeclExpr.add(input, #DeclExpr.value(40)),
    )

    return #DeclSet.addFunction(
        #DeclSet.empty(),
        "classify.function",
        "generatedClassify",
        body,
        false,
    )
}

fn probe(value: i32): i32 {
    return generatedClassify(value)
}
```

`generatedClassify` is available to ordinary name resolution, inference,
linting, LSP analysis, monomorphization, fusion, and native codegen after the
module expansion snapshot is sealed.

## Stable role and presentation name

Every generated declaration or local has two different names:

- **role** is its stable structural identity inside the generator invocation;
- **name** is the spelling presented to Vex source and diagnostics.

```vex
#DeclSet.addFunction(
    set,
    "codec.decode.function", // stable role
    "decodeUser",            // presentation name
    body,
    true,
)
```

Changing a presentation name does not redefine structural identity. Reusing a
role for two different declarations in one invocation is rejected. Roles
should be deterministic and derived from semantic structure, not iteration
addresses, hash-map order, or host-global counters.

## Declaration builders

The current accepted surface can emit:

| Family | Builders |
| --- | --- |
| Functions and constants | `addConstFunction`, `addConst`, `addFunction`, `addFunctionWhere` |
| Types | `addTypeAlias`, `addStruct`, `addGenericStruct`, `addEnum`, `addGenericEnum` |
| Methods | `addValueMethod`, `addRefMethod`, `addRefMutMethod`, `addStaticMethod`, plus their `Where` forms |
| Conformance | `addContractImpl`, `addAssociatedTypeImpl` |

The returned `DeclSet` is immutable: each builder accepts a set and returns the
extended set. A declaration is committed only after its exact types,
constraints, body, ownership behavior, and structural identity validate.

## Expression plans

`DeclExpr` is a closed typed expression algebra, not a string builder.

| Purpose | Builders |
| --- | --- |
| Values and parameters | `value`, `param`, `paramType` |
| Locals | `local`, `localMut`, `bind`, `assign` |
| Scalar/control | `add`, `lessThan`, `ifElse`, `block` |
| Loops | `whileLoop`, `forEach`, `breakLoop`, `continueLoop` |
| Matching | `matchValue`, `matchPattern` |
| Calls and results | `call`, `returnValue` |
| Aggregates | `aggregate` |

Each plan carries an exact Vex type. Builders reject unresolved types, missing
fields, invalid calls, out-of-scope locals, illegal mutation, result-type
drift, and ownership-invalid paths before native codegen.

Mutable generated locals must be explicit:

```vex
let counter = #DeclExpr.localMut<i64>("counter.local", "counter")
let initialize = #DeclExpr.bind(counter, #DeclExpr.value(0i64), body)
```

`#DeclExpr.assign` accepts only a local created with mutation capability and
only while that hygienic local is in scope.

## Typed patterns

`DeclPattern` supports exact scalar, enum, tuple, struct, reference, binding,
and or-pattern construction:

```vex
enum Choice { First, Second, Other }

const fn deriveChoiceMatcher(): DeclSet {
    let input = #DeclExpr.param<Choice>("choice.input", "input", 0)
    let variants = #Type.info<Choice>().variants
    let accepted = #DeclPattern.anyOf([
        #DeclPattern.variantUnit(variants[0]),
        #DeclPattern.variantUnit(variants[1]),
    ])
    let body = #DeclExpr.matchPattern(
        input,
        [accepted],
        [#DeclExpr.value(true)],
        #DeclExpr.value(false),
    )

    return #DeclSet.addFunction(
        #DeclSet.empty(),
        "choice.accepted.function",
        "isGeneratedChoiceAccepted",
        body,
        false,
    )
}
```

Available pattern builders are `wildcard`, `value`, `bind`, `ref`, `refMut`,
`tuple`, `structFields`, `variantUnit`, `variant`, `variantStruct`, and
`anyOf`.

Important invariants:

- literal patterns preserve their exact signed/unsigned integer or bool type;
- enum variants and fields use reflected semantic identity, not their names;
- `anyOf` requires at least two refutable alternatives of one exact type;
- every or-pattern alternative must expose the same hygienic binding contract;
- moved payloads, borrowed payloads, and remainder cleanup use ordinary Vex
  ownership rules.

## Generic constraints

Generated generic callables can attach exact contract requirements with
`#DeclConstraint.contract` and a `Where` builder.

```vex
let marker = #DeclConstraint.contract<Marker<i64>>(parameter.ty)
let stable = #DeclConstraint.contract<Stable>(parameter.ty)

return #DeclSet.addFunctionWhere(
    #DeclSet.empty(),
    "generated.checked.function",
    "generatedChecked",
    body,
    false,
    [marker, stable],
)
```

Requirements retain contract identity and generic arguments. Duplicate exact
requirements are idempotent. Ordinary Vex conformance inference decides
whether a concrete type satisfies them.

Conjunctions of exact requirements are supported. Arbitrary disjunction,
negation, compound-subject predicates, and user-defined type-set algebra are
not part of the accepted V2 surface.

## Identity, hygiene, and provenance

Generated identities are derived from the generator, invocation owner, stable
module site, structural role, and declaration ordinal. They do not depend on a
backend symbol spelling.

The compiler preserves:

- the generator definition and invocation ancestry;
- exact source and reflected declaration identities;
- reminted generic type and const binders;
- hygienic local roles and lexical scope;
- sealed inference and ownership facts used by every consumer.

Diagnostics, lint, LSP, and native compilation consume the same expansion
snapshot. A declaration accepted by one consumer cannot be reconstructed from
names differently by another.

## Invocation authority

`DeclSet`, `DeclExpr`, `DeclPattern`, and `DeclConstraint` are compiler-owned
semantic values. `#DeclSet.empty()` and the transform builders work only while
the compiler is executing an authorized module generator. Ordinary const
evaluation cannot manufacture or persist a declaration set.

Helper functions called by the active generator inherit that exact invocation
authority. Their generated values remain bound to the invocation and cannot be
published through an unrelated persistent const result.

## Codegen and fusion

Generated functions are not printed, reparsed, or compiled into a side
bitcode file. Their typed HIR and sealed inference facts enter the normal
callable registry directly. Consequently:

- source and generated calls share monomorphization;
- VexArch and std calls remain visible to whole-module fusion and inlining;
- generated allocations and drops use the normal VUMM/Valence path;
- normal reachability and dead-code elimination remove unused generated work;
- ABI and target checks are identical to handwritten declarations.

## Fail-closed rules

A generator fails compilation when it attempts to:

- use transform builders outside an authorized invocation;
- duplicate or drift a stable structural role;
- construct unresolved, semantic-only, or target-unavailable runtime types;
- refer to a field, variant, method, or contract by a mismatched identity;
- leak a generated local outside its lexical scope;
- violate mutability, borrow, move, drop, or result-type rules;
- create an or-pattern with incompatible bindings;
- introduce a generator cycle or exceed evaluation/expansion quotas.

There is no source-string fallback and no best-effort declaration emission.

## Related

- [Compile-Time Evaluation](/guide/advanced/comptime)
- [Builtins and Intrinsics](/guide/advanced/builtins)
- [Generics](/guide/types/generics)
- [Contracts](/guide/types/contracts)
- [Pattern Matching](/guide/types/pattern-matching)
- [Comptime Pipeline Architecture](/architecture/comptime-pipeline)
