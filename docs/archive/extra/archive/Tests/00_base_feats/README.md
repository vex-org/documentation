# Base Features Tests

This directory contains tests for the most fundamental features of the Vex language, from simplest to more complex. These tests do NOT include advanced type system features (generics, traits, etc.).

## Test Categories

### 1. Literals (01)

- Integer literals (decimal, hex, binary, octal)
- Float literals
- Boolean literals
- String literals
- Character literals

### 2. Primitive Types (02)

- Signed integers: i8, i16, i32, i64
- Unsigned integers: u8, u16, u32, u64
- Floating point: f32, f64
- Boolean: bool

### 3. Operators (03-06)

- **Arithmetic** (03): +, -, \*, /, %, negation
- **Comparison** (04): ==, !=, <, <=, >, >=
- **Logical** (05): &&, ||, !
- **Bitwise** (06): &, |, ^, ~, <<, >>

### 4. Variables (07)

- Immutable variables: `let`
- Mutable variables: `let!`
- Constants: `const`
- Type annotations
- Shadowing

### 5. Control Flow (08-10, 17, 19)

- **If statements** (08): if, elif, else
- **While loops** (09): while, break, continue
- **For loops** (10): for..in, ranges, break, continue
- **Match expressions** (17): pattern matching on values
- **Return statements** (19): early return, multiple return points

### 6. Functions (11)

- Function declarations
- Parameters and return types
- Function calls
- Implicit returns

### 7. Data Structures (12-14, 16)

- **Strings** (12): string literals, comparison
- **Arrays** (13): array literals, indexing
- **Structs** (14): struct definition, field access
- **Enums** (16): enum variants, matching

### 8. Methods (15)

- Instance methods
- Static methods

### 9. Memory Basics (18)

- References (&)
- Reference parameters

### 10. Testing (20)

- Assert statements
- Test messages

## Test Order

Tests are numbered from simplest to most complex:

1. Start with literals and types
2. Progress to operators
3. Add variables and control flow
4. Introduce functions
5. Add data structures
6. Finally, methods and references

## Running Tests

Run all base feature tests:

```bash
./Specifications/Tests/run_tests.sh 00_base_feats
```

Run a specific test:

```bash
vex run Specifications/Tests/00_base_feats/01_literals.vx
```

## Notes

- All tests use `()` for validation
- Tests print success messages
- Return 0 on success
- These tests cover only pre-type-system features
- Generic types, traits, contracts are in other test directories
