# vex-doc Reference

This document describes `vex-doc` — the documentation generator for Vex projects.

---

## Purpose

`vex-doc` generates API documentation from Vex source files (`.vx`). It supports:

- **JSON** — Machine-readable documentation model
- **Markdown** — Single-page human-readable docs
- **Multi-page** — Per-type pages with index
- **VitePress** — Multi-page + sidebar.json + config.mts
- **Docusaurus** — Multi-page + sidebars.js + _category_.json

---

## Command Usage

```bash
# Single-page markdown (default)
vex doc src/main.vx

# JSON output
vex doc --format json src/main.vx

# Multi-page to directory
vex doc --format multipage -o docs/api src/

# VitePress-ready docs
vex doc --format vitepress -o docs/api src/

# Docusaurus-ready docs
vex doc --format docusaurus -o docs/api src/
```

### CLI Flags

| Flag | Description | Default |
|------|-------------|---------|
| `INPUT` | Source file or directory | required |
| `-o, --output` | Output file or directory | stdout / `docs/api` |
| `-f, --format` | Output format | `markdown` |
| `--json` | Shorthand for `--format json` | — |

### Supported Formats

| Format | Output | Use Case |
|--------|--------|----------|
| `json` | Single JSON file | CI/CD pipelines, custom renderers |
| `markdown` / `md` | Single .md file | README integration, quick preview |
| `multipage` | Directory of .md files | Static site hosting |
| `vitepress` | .md + .vitepress/ config | VitePress documentation sites |
| `docusaurus` | .md + sidebars.js | Docusaurus documentation sites |

---

## Architecture

### Pipeline

```
.vx source → Parser (Rowan CST) → Generator → DocModel (JSON) → Composer
                                                                    ↓
                                                    ┌───────────────┼───────────────┐
                                                    ↓               ↓               ↓
                                               Markdown       VitePress       Docusaurus
                                             (single page)   (multi-page)    (multi-page)
```

### Crate Structure

```
tools/vex-doc/src/
├── lib.rs              # Public API: generate_json_model(), generate_markdown_content()
├── generator.rs        # Raw Rowan CST → DocModel extraction (core engine)
├── doc_model.rs        # Data model: DocItem, DocType, FieldItem, GenericParam, etc.
├── markdown.rs         # Single-page markdown composer
├── multi_page.rs       # Multi-page + VitePress + Docusaurus composers
├── parser.rs           # Doc comment parser (@param, @return, @example, etc.)
├── naming.rs           # Name resolution utilities
└── rowan_generator.rs  # Thin delegate to generator.rs
```

---

## DocModel Schema

The `DocModel` is the central data structure passed from generator to composers.

### DocItem Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String` | Unique identifier (e.g., `Point`, `Point.new`) |
| `kind` | `String` | Item kind: `fn`, `struct`, `enum`, `contract`, `const`, `type`, `policy` |
| `name` | `String` | Display name (e.g., `Point.new`) |
| `location` | `Location` | Source file, line, col, end_line, end_col |
| `signature` | `String` | Full signature string |
| `docs` | `ParsedComment` | Parsed doc comments (summary, details, @param, @return, etc.) |
| `parent_id` | `Option<String>` | Parent type for methods (e.g., `"Point"`) |
| `relations` | `Vec<String>` | Contract implementations |
| `params` | `Vec<TypedParam>` | Function parameters with types |
| `return_type` | `Option<DocType>` | Return type |
| `fields` | `Vec<FieldItem>` | Struct fields (name, type, visibility, doc, tag) |
| `variants` | `Vec<VariantItem>` | Enum variants (name, payload types, doc) |
| `receiver` | `Option<ReceiverInfo>` | Method receiver (self_name, type_name, is_ref, is_mut) |
| `visibility` | `Option<String>` | `"export"`, `"public"`, `"private"` |
| `generic_params` | `Vec<GenericParam>` | Type parameters with bounds and defaults |
| `where_clauses` | `Vec<WhereClause>` | Where clause predicates |
| `is_async` | `Option<bool>` | Async function flag |
| `is_gpu` | `Option<bool>` | GPU function flag |
| `is_unsafe` | `Option<bool>` | Unsafe function flag |
| `is_const` | `Option<bool>` | Const function flag |

### GenericParam

| Field | Type | Description |
|-------|------|-------------|
| `name` | `String` | Parameter name (e.g., `T`) |
| `bounds` | `Vec<String>` | Contract bounds (e.g., `["Display", "Clone"]`) |
| `default` | `Option<String>` | Default type (e.g., `"i32"`) |
| `is_const` | `bool` | Whether this is a const generic |
| `const_type` | `Option<String>` | Type for const params (e.g., `"usize"`) |

### TypedParam

| Field | Type | Description |
|-------|------|-------------|
| `name` | `String` | Parameter name |
| `ty` | `DocType` | Type information |
| `default_value` | `Option<String>` | Default value expression |
| `is_variadic` | `bool` | Whether parameter is variadic (`...`) |

---

## Doc Comment Syntax

`vex-doc` recognizes the following doc comment tags:

```vex
/// Summary line
///
/// Detailed description paragraph.
///
/// @param name - Parameter description
/// @return Description of return value
/// @example
/// let x = Point.new(1.0, 2.0);
/// @deprecated Use NewThing instead
/// @see OtherType
/// @throws ErrorType - When something fails
/// @since 1.2.0
/// @note Important information
```

### Supported Tags

| Tag | Description |
|-----|-------------|
| `@param` | Parameter documentation |
| `@return` / `@returns` | Return value description |
| `@example` | Code example block |
| `@deprecated` | Deprecation notice |
| `@see` | Cross-reference |
| `@throws` / `@raises` | Error documentation |
| `@since` | Version introduced |
| `@note` | Additional notes |
| `@link` | Inline reference to another item |

---

## Generator Details

### CST Traversal Strategy

The generator uses **raw Rowan CST traversal** (not typed AST wrappers) because:

1. The typed AST wrappers had SyntaxKind mismatches (`FUNCTION` vs `NODE_FUNCTION`)
2. Type extraction needed to handle both keyword tokens (`KW_I32`) and node types (`NODE_PATH_TYPE`)
3. Receiver patterns in Vex (`fn (self: &Type) method()`) require custom traversal

### Key Helper Functions

| Function | Purpose |
|----------|---------|
| `get_fn_name()` | Extracts function name, handling receivers and qualified names (`Vec.new`) |
| `get_type_text_any()` | Extracts type text after `:` — handles both keyword tokens and type nodes |
| `extract_return_type()` | Finds return type after `R_PAREN → COLON` |
| `extract_receiver()` | Parses `NODE_RECEIVER` for self name, type, ref/mut |
| `extract_type_params()` | Extracts generic params with bounds from `NODE_TYPE_PARAMS` |
| `extract_where_clauses()` | Extracts where predicates from `NODE_WHERE_CLAUSE` |
| `extract_fn_flags()` | Detects `async`, `gpu`, `unsafe`, `const` keywords before `fn` |
| `extract_default_value()` | Parses `= expr` for param/type param defaults |

---

## Multi-Page Output Structure

```
output_dir/
├── index.md                    # API overview with cross-links
├── container.md                # One page per struct
├── shape.md                    # One page per enum  
├── iterator.md                 # One page per contract
├── functions.md                # All standalone functions
├── constants.md                # All constants (if any)
├── types.md                    # All type aliases (if any)
│
├── .vitepress/                 # VitePress only
│   ├── sidebar.json            # Auto-generated sidebar
│   └── config.mts              # Ready-to-use VitePress config
│
├── sidebars.js                 # Docusaurus only
└── _category_.json             # Docusaurus only
```

---

## Extension Points

| What | Where |
|------|-------|
| Add new item kind | `generator.rs` — add `SyntaxKind::NODE_*` match + extractor |
| Add new DocItem field | `doc_model.rs` — add field, update all initializers in `generator.rs` |
| Add new doc tag | `parser.rs` — add tag pattern matching |
| New output format | `multi_page.rs` — add `generate_*()` function, wire in `doc.rs` CLI |
| Custom page template | `multi_page.rs` — modify `generate_type_page()` / `generate_category_page()` |

---

## Related References

- [vex-cli Reference](./vex-cli-reference.md)
- [vex-pm Reference](./vex-pm-reference.md)
