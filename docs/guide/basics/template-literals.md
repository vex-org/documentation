---
title: "Template Literals"
description: "Compiler-integrated multi-line string templates with interpolation, loops, and conditionals."
---

# Template Literals

Template literals use backticks and embed normal Vex expressions with `&#123;&#123; ... &#125;&#125;`. They are useful for HTML, config files, text reports, prompts, and generated source.

```vex
let name = "Vex Developer";
let basic = `Hello {{ name }}`;
println(basic);
```

## Basic interpolation

Anything inside `&#123;&#123; ... &#125;&#125;` is evaluated as Vex code:

```vex
let name = "Vex Developer";
let active = true;

let html = `
        <h1>Hello World</h1>
        <p>Welcome, {{ name }}!</p>
        <div>
        Status: {{ if active { "Active!" } else { "Inactive." } }}
        </div>
`;
```

If an interpolated value is not already text, the compiler uses the normal string conversion path, so `.toString()` remains the mental model to keep in mind.

## Control flow blocks

Template literals also support block-style control flow with `&#123;&#123; if ... &#125;&#125;`, `&#123;&#123; else &#125;&#125;`, `&#123;&#123; for ... in ... &#125;&#125;`, and `&#123;&#123; end &#125;&#125;`.

```vex
struct User {
        public:
        name: string,
        age: i32,
        admin: bool,
}

let users = [
        User { name: "Alice", age: 30, admin: true },
        User { name: "Bob", age: 25, admin: false }
];

let page = `
<ul>
    {{ for u in users }}
        {{ if u.admin }}
            <li><strong>Admin: {{ u.name }}</strong></li>
        {{ else }}
            <li>User: {{ u.name }}</li>
        {{ end }}
    {{ end }}
</ul>
`;
```

This is the syntax used by the current repository examples.

## What templates are good for

- HTML fragments
- CLI reports and status pages
- Generated config or source text
- Structured logs with readable formatting

## Compile-time checking

Template literals are parsed by the compiler, not by a separate runtime template engine. That means unknown names or invalid expressions fail like normal Vex code during compilation.

## Escaping

To output a literal `&#123;&#123;`, escape it with a backslash:

```vex
let example = `Escaped example: \{{ not_parsed \}}`;
```

## Notes

- Backticks preserve multi-line layout.
- You can mix plain text, inline expressions, loops, and branches in one template.
- Template literals are a text-construction feature, not a replacement for module-level code generation or macros.
