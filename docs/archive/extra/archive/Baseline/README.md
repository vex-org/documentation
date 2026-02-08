# Baseline Features - Index

**Version:** 0.1.2  
**Last Updated:** November 24, 2025

This directory contains detailed documentation for Vex's baseline features - the fundamental building blocks that form the foundation of the language.

## Feature Categories

### 1. Literals and Types

- **[01. Literals](01_literals.md)** - Integer, float, boolean, string, byte literals
- **[02. Primitive Types](02_primitive_types.md)** - i8-i128, u8-u128, f32-f64, bool, string

### 2. Operators

- **[03. Arithmetic Operators](03_arithmetic_ops.md)** - `+`, `-`, `*`, `/`, `%`
- **[04. Comparison Operators](04_comparison_ops.md)** - `==`, `!=`, `<`, `<=`, `>`, `>=`
- **[05. Logical Operators](05_logical_ops.md)** - `&&`, `||`, `!`
- **[06. Bitwise Operators](06_bitwise_ops.md)** - `&`, `|`, `^`, `~`, `<<`, `>>`

### 3. Variables and Control Flow

- **[07. Variables](07_variables.md)** - `let`, `let!`, `const`, shadowing
- **[08. If Statements](08_if_statements.md)** - `if`, `elif`, `else`
- **[09. While Loops](09_while_loops.md)** - `while`, `break`, `continue`
- **[10. For Loops](10_for_loops.md)** - `for..in`, ranges, iteration

### 4. Functions and Data Structures

- **[11. Functions](11_functions.md)** - Function declarations, parameters, returns
- **[12. Strings](12_strings.md)** - String operations, f-strings
- **[13. Arrays](13_arrays.md)** - Array literals, indexing
- **[14. Basic Structs](14_struct_basic.md)** - Struct definition, field access

### 5. Advanced Basics

- **[15. Methods](15_methods.md)** - Instance and static methods
- **[16. Enums](16_enums.md)** - Enum variants, matching
- **[17. Match Expressions](17_match_simple.md)** - Pattern matching basics
- **[18. References](18_references.md)** - Reference types, borrowing
- **[19. Return Statements](19_return_statement.md)** - Early return, control flow
- **[20. Assert](20_assert.md)** - Testing and validation

## Documentation Structure

Each baseline feature document includes:

### Standard Sections

1. **Overview** - Brief description and purpose
2. **Syntax** - Grammar and usage patterns
3. **Examples** - Code examples with explanations
4. **Implementation** - AST/Codegen details with Rust code
5. **Test Reference** - Link to corresponding test file
6. **See Also** - Related features and specifications

### Code References

All documents include:

- **AST Definition:** Location in `vex-ast/`
- **Codegen:** Implementation in `vex-compiler/`
- **Specification:** Link to formal spec
- **Test File:** Corresponding test in `Specifications/Tests/00_base_feats/`

## Feature Status

All baseline features are:

- ✅ **Implemented** - Working in compiler
- ✅ **Tested** - Have corresponding test files
- ✅ **Documented** - Covered in specifications

## Relationship to Specifications

Baseline features are extracted from:

- **Lexical Structure:** `Specifications/02_Lexical_Structure.md`
- **Type System:** `Specifications/03_Type_System.md`
- **Variables:** `Specifications/04_Variables_and_Constants.md`
- **Functions:** `Specifications/05_Functions_and_Methods.md`
- **Control Flow:** `Specifications/06_Control_Flow.md`
- **Structs:** `Specifications/07_Structs_and_Data_Types.md`
- **Enums:** `Specifications/08_Enums.md`

## Usage

These documents serve as:

1. **Learning Resources** - For developers learning Vex
2. **Reference Guides** - Quick lookup for syntax and behavior
3. **Implementation Specs** - Details for compiler developers
4. **Test Documentation** - Explains what each test validates

## Testing

Run all baseline tests:

```bash
./Specifications/Tests/run_tests.sh 00_base_feats
```

Run individual feature test:

```bash
vex run Specifications/Tests/00_base_feats/01_literals.vx
vex run Specifications/Tests/00_base_feats/03_arithmetic_ops.vx
```

## Implementation Notes

### Type System Foundation

- Integer arithmetic uses LLVM's integer operations
- Floating-point follows IEEE 754 standard
- Boolean values are i1 or i8 in LLVM
- Strings are {i8\*, i64} structs

### Memory Model

- Primitives are stack-allocated
- Strings are heap-allocated (planned)
- Arrays are stack or heap depending on size
- References use LLVM pointer types

### Compilation Pipeline

1. **Lexer** → Tokenizes source
2. **Parser** → Builds AST
3. **Codegen** → Emits LLVM IR
4. **LLVM** → Optimizes and generates machine code

## See Also

- **Advanced Features:** `Specifications/` (Generics, Traits, Contracts)
- **Standard Library:** `Specifications/16_Standard_Library.md`
- **Language Reference:** `docs/REFERENCE.md`
- **Project Status:** `docs/PROJECT_STATUS.md`
