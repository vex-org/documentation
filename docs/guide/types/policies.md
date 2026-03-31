# Policies

Policies are a language feature for attaching reusable field metadata to structs.

They are not traits, contracts, or mixins. A policy describes metadata keys for named fields, and a struct applies that metadata with `with`.

## Basic Policy

```vex
policy APIModel {
    id `json:"id"`,
    name `json:"name"`
}

struct User with APIModel {
    public:
    id: i32,
    name: string,
}
```

The policy does not create fields. The target struct must still declare `id` and `name`.

## Multiple Policies

```vex
policy JSONModel {
    id `json:"id"`
}

policy DatabaseModel {
    id `db:"user_id"`
}

struct User with JSONModel, DatabaseModel {
    id: i32,
}
```

Policies can be stacked on the same struct.

## Policy Inheritance

Policies can inherit from other policies with `with`.

```vex
policy BaseModel {
    id `db:"id" indexed:"true"`
}

policy APIModel with BaseModel {
    id `json:"id"`
    name `json:"name"`
}

struct User with APIModel {
    id: i32,
    name: string,
}
```

This gives the struct the merged metadata from both the parent and child policy.

## Override Rules

Inline field tags on the struct override policy-provided tags.

```vex
policy APIModel {
    id `json:"id" db:"user_id"`
    name `json:"name" validate:"required"`
}

struct User with APIModel {
    id: i32 `json:"userId"`,
    name: string `validate:"minlength:3"`,
}
```

The effective metadata for `User.id` uses `json:"userId"`, not `json:"id"`.

When multiple policies provide the same metadata key, later-applied metadata wins.

## Validation Rules

The current compiler validates several policy failure modes:

- unknown parent policy names
- unknown applied policy names
- missing struct fields required by a policy
- circular policy inheritance

So this is a real type-checked language feature, not just passive documentation syntax.

## Comptime Reflection

Policies become visible through the normal compile-time reflection path.

```vex
policy APIModel {
    id `json:"id"`,
    name `json:"name"`
}

struct User with APIModel {
    id: i32 `json:"userId"`
    name: string
}

fn main(): i32 {
    $for f in #typeInfo<User>().fields {
        $println(
            f.name,
            " -> json:",
            f.tag("json")
        )
    }
    return 0
}
```

This makes policies useful for:

- serialization metadata
- schema generation
- validation metadata
- compile-time code generation

## When To Use Policies

Use a policy when you need the same metadata shape applied across multiple structs.

Do not use a policy when you are trying to share behavior or methods. Policies only carry metadata.

## Related

- [Structs](/guide/types/structs)
- [Comptime](/guide/advanced/comptime)
- [Builtins](/guide/advanced/builtins)
