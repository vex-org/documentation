# Vex Documentation Engine (`vex-doc`)

**Status:** Final Draft v1.2 (Release Candidate)
**Goal:** Modular, Multi-lingual, Extensible Documentation Engine for the Vex Ecosystem.

---

## 1. Vision and Architecture

`vex-doc` is designed as a **Data Pipeline**, not a monolithic HTML generator. Its core purpose is to parse semantic data and comments from Vex source code with high fidelity and expose them to community-written "Composer" tools.

### Core Components

1.  **Core (Rust):** Scans source code, builds AST, parses comments, performs type checking and **symbol resolution (linking)**, and produces a "DocModel" (JSON).
2.  **Protocol (JSON Stream):** Standard data contract between Core and Composer.
3.  **Composer (External):** Consumes JSON data and produces final output (HTML, OpenAPI, PDF, Markdown, etc.).

---

## 2. Comment Syntax and Tags

Vex uses block comment style (`/** ... */`). Tags start with `@` and fall into three categories.

### Standard Tags (Processed by Core)

These tags are specially handled by Vex Core and mapped to specific fields in the JSON output.

| Tag | Description | JSON Field |
| :--- | :--- | :--- |
| `@param <name> - <desc>` | Defines a function parameter. | `params: []` |
| `@return <desc>` | Describes return value. | `returns` |
| `@throws <type>` | Document errors. | `throws` |
| `@deprecated <msg>` | Marks symbol as deprecated. | `deprecated` |
| `@since <ver>` | Version introduced. | `since` |
| `@see <link>` | Links to another resource. | `links` (Resolved ID) |
| `@example` | Code example. | `examples` |

### General Tags (Passed Through)

Common tags for web frameworks or APIs. Vex stores these in a `tags` map.

- `@route GET /api/v1/...`
- `@auth Bearer`
- `@internal`

### Custom Tags (User Defined)

Vex Parser supports **any tag** starting with `@`. This allows library authors to define their own semantics.

**Example:** ORM Library tags:
```vex
/**
 * @db:table users
 * @db:index email_idx
 */
struct User { ... }
```

---

## 3. Data Protocol (JSON Schema)

When `vex doc` runs, Vex Compiler emits a JSON stream to `stdout`. This schema is the "Single Source of Truth" for all Composers.

```json
{
  "version": "1.0",
  "project": {
    "name": "vex-std",
    "version": "0.1.2"
  },
  "registry": {
    // Symbol Map (Critical for Linking)
    "std.io.println": { "kind": "fn", "file": "io.vx", "line": 45 }
  },
  "modules": [
    {
      "name": "io",
      "items": [
        {
          "kind": "fn",
          "name": "println",
          "signature": "fn println(args: ...any)",
          "docs": {
            "summary": "Prints to standard output",
            "params": [],
            "tags": {
               "internal": "true" 
            }
          }
        }
      ]
    }
  ]
}
```

---

## 4. Diagnostics

The Core module audits documentation quality and reports issues:

1.  **Tag Mismatch (Warn):** `@param id` documented but function has no `id` argument.
2.  **Broken Link (Warn):** `@see UnknownSymbol` cannot be resolved.
3.  **Missing Docs (Info):** Public symbol lacks documentation.

---

## 5. Composers

Composers are independent tools that read the DocModel stream.

**Example: OpenAPI Composer**
Reads `@route`, `@method`, `@body` tags from Vex structs/functions and generates `openapi.yaml`.

**Example: HTML Composer**
Default composer using Tera/Askama templates to generate a static website (like Rustdoc).