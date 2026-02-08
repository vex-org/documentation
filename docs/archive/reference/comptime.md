# Compile Time Execution (Comptime)

**Status:** In Development  
**Last Updated:** January 7, 2026

---

## 1. Overview

Vex provides powerful compile-time metaprogramming capabilities through `$`-prefixed builtins. All comptime operations are evaluated during compilation, producing zero runtime overhead.

### Design Principles

1. **Zero Runtime Cost**: All `$` operations resolve at compile time
2. **Type Safety**: Comptime operations are fully type-checked
3. **Predictability**: No hidden magic - explicit is better than implicit
4. **Consistency**: All builtins use `$camelCase` naming convention

---

## 2. Naming Convention

All compiler builtins use `$camelCase`:

```vex
$sizeOf<T>()      // ✅ Correct
$sizeof<T>()      // ❌ Deprecated (but supported for compatibility)
$size_of<T>()     // ❌ Wrong
```

### Categories

| Prefix | Purpose | Example |
|--------|---------|---------|
| `$is*` | Type predicates | `$isStruct<T>()` |
| `$field*` | Field operations | `$fieldGet(obj, "x")` |
| `$type*` | Type operations | `$typeName<T>()` |
| `$*Of` | Size/alignment queries | `$sizeOf<T>()` |

---

## 3. Type Introspection

### 3.1 Size and Alignment

```vex
/// Returns the size of type T in bytes
$sizeOf<T>(): u64

/// Returns the alignment requirement of type T in bytes
$alignOf<T>(): u64

/// Returns the offset of a field within a struct (in bytes)
$offsetOf<T>("fieldName"): u64
```

**Example:**
```vex
struct Point { x: f64, y: f64 }

let size = $sizeOf<Point>();        // 16
let align = $alignOf<Point>();      // 8
let offset = $offsetOf<Point>("y"); // 8
```

### 3.2 Type Names

```vex
/// Returns the fully qualified type name as a string
$typeName<T>(): str

/// Returns the short type name (without generics)
$typeBaseName<T>(): str
```

**Example:**
```vex
$typeName<Vec<i32>>()      // "Vec<i32>"
$typeBaseName<Vec<i32>>()  // "Vec"
$typeName<i32>()           // "i32"
```

### 3.3 Type Predicates

```vex
/// Check if T is a struct type
$isStruct<T>(): bool

/// Check if T is an enum type
$isEnum<T>(): bool

/// Check if T is a primitive type (i32, f64, bool, etc.)
$isPrimitive<T>(): bool

/// Check if T is a pointer type
$isPointer<T>(): bool

/// Check if T is a reference type
$isReference<T>(): bool

/// Check if T is an array type
$isArray<T>(): bool

/// Check if T is a tuple type
$isTuple<T>(): bool

/// Check if T is a function type
$isFunction<T>(): bool

/// Check if T is a generic type
$isGeneric<T>(): bool

/// Check if T is Copy (can be trivially copied)
$isCopy<T>(): bool

/// Check if T needs drop (has destructor)
$needsDrop<T>(): bool
```

**Example:**
```vex
fn process<T>(value: T) {
    $if $isPrimitive<T>() {
        // Fast path for primitives
        println("Primitive: {}", value);
    } $elif $isStruct<T>() {
        // Handle structs
        println("Struct with {} fields", $fieldCount<T>());
    } $else {
        // Generic fallback
        println("Other type: {}", $typeName<T>());
    }
}
```

### 3.4 Default Values

```vex
/// Returns the default value for type T
/// Primitives: i32→0, bool→false, f64→0.0, str→""
/// Structs: zero-initialized or calls Default impl
$default<T>(): T

/// Check if type T has a default value
$hasDefault<T>(): bool
```

**Example:**
```vex
fn create_array<T>(): [T; 10] {
    let! arr: [T; 10] = $default<[T; 10]>();
    arr
}

// Zero-initialize a struct
let point = $default<Point>();  // Point { x: 0.0, y: 0.0 }
```

### 3.5 Type Comparison

```vex
/// Check if two types are exactly the same
$sameType<A, B>(): bool

/// Check if T implements a trait
$implements<T, Trait>(): bool

/// Check if T can be converted to U
$convertible<T, U>(): bool
```

**Example:**
```vex
$if $sameType<T, i32>() {
    // T is exactly i32
}

$if $implements<T, $Clone>() {
    let copy = value.clone();
}
```

---

## 4. Struct Reflection

### 4.1 Field Information

```vex
/// Returns the number of fields in a struct
$fieldCount<T>(): u64

/// Returns an array of field names
$fieldNames<T>(): [str]

/// Returns the type name of a field
$fieldType<T>("fieldName"): str

/// Check if struct has a field with given name
$hasField<T>("fieldName"): bool
```

**Example:**
```vex
struct User {
    id: i64,
    name: str,
    active: bool
}

$fieldCount<User>()           // 3
$fieldNames<User>()           // ["id", "name", "active"]
$fieldType<User>("name")      // "str"
$hasField<User>("email")      // false
```

### 4.2 Field Access (Runtime)

```vex
/// Get field value by name (runtime operation, comptime-generated)
$fieldGet<T>(obj: &T, "fieldName"): FieldType

/// Set field value by name (runtime operation, comptime-generated)
$fieldSet<T>(obj: &T!, "fieldName", value: FieldType)

/// Get field as pointer
$fieldPtr<T>(obj: &T, "fieldName"): *FieldType
```

**Example:**
```vex
let user = User { id: 1, name: "Alice", active: true };

let name = $fieldGet(&user, "name");  // "Alice"
$fieldSet(&user!, "active", false);   // user.active = false
```

### 4.3 Struct Tags (Metadata)

**Tag Syntax:**
```vex
struct User {
    id: i64 `json:"user_id" db:"primary_key"`,
    name: str `json:"name" validate:"required,min=2"`,
    password: str `json:"-"`,  // Skip in JSON
}
```

**Accessing Tags via $typeInfo (comptime only):**
```vex
// $typeInfo is a compiler intrinsic - no import needed
// Can ONLY be used inside $for loops (compile-time iteration)

// Iterate fields with their tags
$for f in $typeInfo<User>().fields {
    $println("Field: ", f.name, " type: ", f.type_name);
    
    // Iterate tags for each field
    $for t in f.tags {
        $println("  tag: ", t.key, " = ", t.value);
    }
}

// With let bindings
$for f in $typeInfo<User>().fields {
    let field_name = f.name;
    let field_type = f.type_name;
    
    $for t in f.tags {
        let tag_key = t.key;
        let tag_value = t.value;
        $println(tag_key, ": ", tag_value);
    }
}
```

**Output:**
```
Field: id type: I64
  tag: json = user_id
  tag: db = primary_key
Field: name type: String
  tag: json = name
  tag: validate = required,min=2
Field: password type: String
  tag: json = -
```

> **Note:** `$typeInfo<T>()` is compile-time only. It cannot be stored in variables or used at runtime. The iteration is unrolled at compile time, generating specialized code for each field.

**Direct Tag Intrinsics (also available):**
```vex
// Get tag value for a field (returns empty string if not found)
let json_name = $fieldTag<User>("id", "json");  // "user_id"

// Check if field has a specific tag
let has_db = $hasFieldTag<User>("id", "db");    // true

// Get all tags for a field as comma-separated string
let all_tags = $fieldTags<User>("id");          // "json:user_id,db:primary_key"
```

---

## 5. Enum Reflection

### 5.1 Variant Information

```vex
/// Returns the number of variants in an enum
$variantCount<T>(): u64

/// Returns an array of variant names
$variantNames<T>(): [str]

/// Check if enum has a variant with given name
$hasVariant<T>("variantName"): bool

/// Get discriminant value of a variant
$variantDiscriminant<T>("variantName"): i64

/// Get payload type of a variant (returns type name as string)
$variantPayload<T>("variantName"): str

/// Check if variant has payload data
$variantHasPayload<T>("variantName"): bool
```

**Example:**
```vex
enum Status {
    Pending,
    Active,
    Completed(i32),
    Failed(str)
}

$variantCount<Status>()                    // 4
$variantNames<Status>()                    // ["Pending", "Active", "Completed", "Failed"]
$hasVariant<Status>("Active")              // true
$variantDiscriminant<Status>("Pending")    // 0
```

---

## 6. Compile-Time Arithmetic

### 6.1 Basic Arithmetic

```vex
/// Compile-time power
$constPow(base, exp): i64       // or alias: $pow

/// Compile-time absolute value
$constAbs(value): i64           // or alias: $abs

/// Compile-time minimum of two values
$constMin(a, b): i64            // or alias: $min

/// Compile-time maximum of two values
$constMax(a, b): i64            // or alias: $max

/// Compile-time clamp to range
$constClamp(value, min, max): i64  // or alias: $clamp
```

**Example:**
```vex
const LOOKUP_SIZE = $constPow(2, 10);  // 1024
const ABSOLUTE = $constAbs(-42);       // 42
const BOUNDED = $constClamp(50, 0, 100);  // 50
```

### 6.2 Math Functions

```vex
/// Compile-time integer log base 2
$constLog2(value): i64          // or alias: $log2

/// Compile-time integer square root
$constSqrt(value): i64          // or alias: $sqrt

/// Compile-time greatest common divisor
$constGcd(a, b): i64            // or alias: $gcd

/// Compile-time least common multiple
$constLcm(a, b): i64            // or alias: $lcm
```

**Example:**
```vex
const LOG_SIZE = $constLog2(1024);  // 10
const SQRT_VAL = $constSqrt(100);   // 10
const GCD = $constGcd(48, 18);      // 6
```

### 6.3 Bit Operations

```vex
/// Check if value is power of 2
$isPowerOf2(value): bool        // or alias: $isPowerOfTwo

/// Next power of 2 >= value
$nextPowerOf2(value): i64       // or alias: $nextPow2

/// Count set bits (population count)
$bitCount(value): i64           // or alias: $popcount

/// Count leading zeros
$leadingZeros(value): i64       // or alias: $clz

/// Count trailing zeros
$trailingZeros(value): i64      // or alias: $ctz
```

**Example:**
```vex
$if $isPowerOf2(BUFFER_SIZE) {
    // Use efficient bit masking
}

const ALIGNED_SIZE = $nextPowerOf2(513);  // 1024
const BITS = $bitCount(0xFF);             // 8
```

---

## 7. Compile-Time Control Flow

### 7.1 Conditional Compilation

```vex
/// Compile-time if - branches are eliminated at compile time
$if <condition> {
    // Included if condition is true
} $elif <condition2> {
    // Included if condition2 is true
} $else {
    // Fallback
}
```

**Rules:**
- Conditions must be comptime-evaluable
- Only the matching branch is compiled
- Other branches are completely eliminated (no type checking)

**Example:**
```vex
fn serialize<T>(value: &T): str {
    $if $isPrimitive<T>() {
        return value.toString();
    } $elif $isStruct<T>() {
        return serializeStruct(value);
    } $elif $isEnum<T>() {
        return serializeEnum(value);
    } $else {
        $compileError("Cannot serialize type: " + $typeName<T>());
    }
}
```

### 7.2 Compile-Time Loops

```vex
/// Iterate over struct fields at compile time
$for field in $fields<T>() {
    // field.name: str
    // field.type: str
    // field.index: u64
    // field.tag(key): str
    // field.hasTag(key): bool
}

/// Iterate over enum variants at compile time
$for variant in $variants<T>() {
    // variant.name: str
    // variant.index: u64
    // variant.discriminant: i64
}

/// Compile-time range iteration
$for i in 0..N {
    // i is compile-time constant
}

/// Compile-time while loop (condition must be comptime-evaluable)
$while <condition> {
    // Body is unrolled at compile time
    // Use with caution - infinite loops will hang compilation
}
```

**Example - Zero-Cost JSON Serializer:**
```vex
fn toJson<T>(obj: &T): str {
    let! result = "{";
    let! first = true;
    
    $for field in $fields<T>() {
        let jsonKey = field.tag("json");
        
        $if jsonKey != "-" {
            if !first { result = result + ", "; }
            first = false;
            
            let key = $if jsonKey != "" { jsonKey } $else { field.name };
            let value = $fieldGet(obj, field.name);
            
            $if field.type == "str" {
                result = result + "\"" + key + "\": \"" + value + "\"";
            } $elif field.type == "i32" || field.type == "i64" {
                result = result + "\"" + key + "\": " + value.toString();
            } $elif field.type == "bool" {
                result = result + "\"" + key + "\": " + (if value { "true" } else { "false" });
            } $elif $isStruct<field.type>() {
                result = result + "\"" + key + "\": " + toJson(&value);
            }
        }
    }
    
    return result + "}";
}
```

---

## 8. Compile-Time Assertions and Errors

### 8.1 Static Assertions

```vex
/// Assert a condition at compile time
$staticAssert(<condition>, "error message")

/// Trigger a compile error unconditionally
$compileError("error message")

/// Trigger a compile warning
$compileWarning("warning message")
```

**Example:**
```vex
fn alignedCopy<T>(src: &T, dst: &T!) {
    $staticAssert($alignOf<T>() >= 8, "Type must be 8-byte aligned");
    $staticAssert($sizeOf<T>() <= 64, "Type too large for aligned copy");
    
    // ... implementation
}
```

### 8.2 Debug Helpers

```vex
/// Print type information at compile time
$debugType<T>()

/// Print expression value at compile time (if evaluable)
$debugExpr(expr)
```

---

## 9. Code Generation

### 9.1 String Operations

```vex
/// Convert expression/identifier to string literal
$stringify(expr): str

/// Concatenate identifiers to form a new identifier
$concatIdents(a, b, ...): ident

/// Convert string to identifier
$ident("name"): ident
```

**Example:**
```vex
// Generate getter/setter for each field
$for field in $fields<T>() {
    fn $concatIdents("get", field.name)<T>(self: &T): field.type {
        return $fieldGet(self, field.name);
    }
    
    fn $concatIdents("set", field.name)<T>(self: &T!, value: field.type) {
        $fieldSet(self, field.name, value);
    }
}
```

### 9.2 File Inclusion

```vex
/// Include file contents as string literal
$includeStr("path/to/file.txt"): str

/// Include file contents as byte array
$includeBytes("path/to/file.bin"): [u8]

/// Include and parse Vex code from file
$include("path/to/code.vx")
```

**Example:**
```vex
// Embed SQL schema at compile time
const SCHEMA: str = $includeStr("schema.sql");

// Embed binary resource
const ICON: [u8] = $includeBytes("icon.png");
```

### 9.3 Environment Variables

```vex
/// Read environment variable at compile time
$env("VAR_NAME"): str

/// Read with default value
$envOr("VAR_NAME", "default"): str

/// Check if environment variable is set
$hasEnv("VAR_NAME"): bool
```

**Example:**
```vex
const VERSION: str = $envOr("BUILD_VERSION", "dev");
const DEBUG: bool = $env("DEBUG") == "1";

$if $hasEnv("FEATURE_X") {
    // Compile with feature X
}
```

---

## 10. Advanced: Const Evaluation

### 10.1 Const Blocks

```vex
/// Force compile-time evaluation of an expression
$const {
    // All code here is evaluated at compile time
    // Result is embedded as a constant
}
```

**Example:**
```vex
// Compile-time computed lookup table
const SIN_TABLE: [f64; 360] = $const {
    let! table: [f64; 360] = [0.0; 360];
    for i in 0..360 {
        table[i] = sin(i as f64 * PI / 180.0);
    }
    table
};
```

### 10.2 Const Functions

```vex
/// Mark function as const-evaluable
const fn factorial(n: u64): u64 {
    if n <= 1 { 1 } else { n * factorial(n - 1) }
}

// Can be used in const contexts
const FACT_10: u64 = factorial(10);  // Computed at compile time
```

---

## 11. Implementation Phases

### Phase 1: Core Type Introspection ✅
- [x] `$sizeOf<T>()` / `$sizeof<T>()`
- [x] `$alignOf<T>()` / `$alignof<T>()`
- [x] `$typeName<T>()`
- [x] `$drop(value)`

### Phase 2: Type Predicates ✅
- [x] `$isStruct<T>()`
- [x] `$isEnum<T>()`
- [x] `$isPrimitive<T>()`
- [x] `$isInteger<T>()`
- [x] `$isFloat<T>()`
- [x] `$isSigned<T>()`
- [x] `$isPointer<T>()`
- [x] `$isReference<T>()` ✨ NEW
- [x] `$isFunction<T>()` ✨ NEW
- [x] `$isGeneric<T>()` ✨ NEW
- [x] `$isArray<T>()`
- [x] `$isTuple<T>()`
- [x] `$isSlice<T>()` ✨ NEW
- [x] `$isOption<T>()` ✨ NEW
- [x] `$isResult<T>()` ✨ NEW
- [x] `$isCopy<T>()`
- [x] `$needsDrop<T>()`
- [x] `$sameType<A, B>()`
- [x] `$implements<T, Trait>()`

### Phase 3: Struct Reflection ✅
- [x] `$fields<T>()` iterator (in $for loops)
- [x] `$typeInfo<T>().fields` iterator with tag support
- [x] `f.name`, `f.type_name` field properties
- [x] `f.tags` nested iterator with `t.key`, `t.value`
- [x] `$fieldCount<T>()`
- [x] `$fieldNames<T>()` (returns comma-separated string)
- [x] `$hasField<T>("name")`
- [x] `$fieldType<T>("name")`
- [x] `$fieldGet(obj, "name")` - dynamic field access
- [x] `$fieldSet(obj, "name", value)` - dynamic field mutation
- [x] `$fieldTag<T>("field", "tag")` - get specific tag value
- [x] `$hasFieldTag<T>("field", "tag")` - check if tag exists
- [x] `$fieldTags<T>("field")` - get all tags as string
- [x] `$offsetOf<T>("field")` ✨ NEW - byte offset of field
- [x] `$typeBaseName<T>()` ✨ NEW - type name without generics

### Phase 4: Compile-Time Control Flow ✅
- [x] `$if` / `$elif` / `$else`
- [x] `$for i in range` (0..N, 0..=N)
- [x] `$for field in $fields<T>()`
- [x] `$staticAssert(cond, msg)`
- [x] `$compileError(msg)`

### Phase 5: Enum Reflection ✅
- [x] `$variantCount<T>()`
- [x] `$variantNames<T>()`
- [x] `$variants<T>()` iterator with `v.name`, `v.index`
- [x] `$hasVariant<T>("name")`
- [x] `$variantDiscriminant<T>("name")`
- [x] `$variantPayload<T>("name")` ✨ NEW - get variant payload type
- [x] `$variantHasPayload<T>("name")` ✨ NEW - check if variant has payload

### Phase 6: Code Generation ✅
- [x] `$stringify(expr)`
- [x] `$concat(...)`
- [x] `$env("VAR")`
- [x] `$includeStr("path")`
- [x] `$includeBytes("path")`
- [x] `$concatIdents(...)` - concatenate identifiers
- [x] `$envOr("VAR", "default")` - env with fallback
- [x] `$hasEnv("VAR")` - check if env exists
- [x] `$compileWarning(msg)` ✨ NEW - emit compile-time warning
- [x] `$debugType<T>()` ✨ NEW - print type info at compile time
- [x] `$debugExpr(expr)` ✨ NEW - print expression and value at compile time
- [x] `$warning(msg)` - emit compile-time warning (alias)
- [x] `$compileLog(msg)` - print message at compile time

### Phase 7: Const Evaluation ✅
- [x] `$const { ... }` blocks - compile-time expression evaluation
- [x] `const fn` functions - parser and HIR support ✨ NEW
- [x] Compile-time arithmetic (complex expressions) ✨ NEW

### Phase 8: Compile-Time Arithmetic ✅ NEW
- [x] `$constPow(a, b)` / `$pow` - power
- [x] `$constAbs(n)` / `$abs` - absolute value
- [x] `$constMin(a, b)` / `$min` - minimum
- [x] `$constMax(a, b)` / `$max` - maximum
- [x] `$constClamp(v, min, max)` / `$clamp` - clamp to range
- [x] `$constLog2(n)` / `$log2` - integer log2
- [x] `$constSqrt(n)` / `$sqrt` - integer square root
- [x] `$constGcd(a, b)` / `$gcd` - greatest common divisor
- [x] `$constLcm(a, b)` / `$lcm` - least common multiple
- [x] `$isPowerOf2(n)` - check if power of 2
- [x] `$nextPowerOf2(n)` / `$nextPow2` - next power of 2
- [x] `$bitCount(n)` / `$popcount` - count set bits
- [x] `$leadingZeros(n)` / `$clz` - count leading zeros
- [x] `$trailingZeros(n)` / `$ctz` - count trailing zeros

### Phase 9: Default Values & Type Construction ✅
- [x] `$default<T>()` ✨ NEW - get default value for type
- [x] `$hasDefault<T>()` ✨ NEW - check if type has default
- [x] `$zeroed<T>()` ✨ NEW - zero-initialized value

### Phase 10: Advanced Compile-Time Evaluation
- [x] `$while` ✨ NEW - compile-time while loops (basic support)
- [x] `$eval(expr)` - compile-time expression evaluation (supports binary ops, unary, casts)
- [x] `$constEval(expr)` - strict compile-time evaluation
- [x] Binary expression evaluation - `$eval(10 + 20)`, `$eval(a * b + c * d)`
- [x] Bitwise operations at compile-time - `&`, `|`, `^`, `<<`, `>>`
- [x] `$constLen($constArray(...))` - length of nested const arrays
- [x] Float binary expressions - `$eval(3.14 * 2.0)`
- [x] Bool binary expressions - comparisons and logical ops

**Note:** Full const fn execution (`$constCall`) requires an interpreter and is planned for a future release.

---

## 12. Examples

### Zero-Cost JSON Serializer

```vex
fn toJson<T>(obj: &T): str {
    $if $isPrimitive<T>() {
        return primitiveToJson(obj);
    }
    
    let! result = "{";
    let! first = true;
    
    $for field in $fields<T>() {
        let jsonKey = field.tag("json");
        $if jsonKey != "-" {
            if !first { result = result + ", "; }
            first = false;
            
            let key = $if jsonKey != "" { jsonKey } $else { field.name };
            result = result + "\"" + key + "\": " + toJson(&$fieldGet(obj, field.name));
        }
    }
    
    return result + "}";
}
```

### Type-Safe ORM

```vex
fn createTable<T>(): str {
    $staticAssert($isStruct<T>(), "createTable requires a struct type");
    
    let tableName = $fieldTag<T>("__struct__", "table");
    let! sql = "CREATE TABLE " + tableName + " (";
    
    $for field in $fields<T>() {
        let colName = field.tag("db");
        $if colName != "" {
            let colType = $if field.type == "str" { "TEXT" }
                     $elif field.type == "i32" { "INTEGER" }
                     $elif field.type == "i64" { "BIGINT" }
                     $elif field.type == "f64" { "REAL" }
                     $elif field.type == "bool" { "BOOLEAN" }
                     $else { "BLOB" };
            
            sql = sql + colName + " " + colType;
            
            $if field.hasTag("pk") {
                sql = sql + " PRIMARY KEY";
            }
            $if field.hasTag("notnull") {
                sql = sql + " NOT NULL";
            }
            sql = sql + ", ";
        }
    }
    
    return sql.trimEnd(", ") + ")";
}
```

### Validation Framework

```vex
fn validate<T>(obj: &T): Result<(), Vec<str>> {
    let! errors: Vec<str> = Vec.new();
    
    $for field in $fields<T>() {
        let value = $fieldGet(obj, field.name);
        
        $if field.hasTag("required") {
            $if field.type == "str" {
                if value.isEmpty() {
                    errors.push(field.name + " is required");
                }
            }
        }
        
        $if field.hasTag("minLen") {
            let minLen = field.tag("minLen").parseInt().unwrap();
            $if field.type == "str" {
                if value.len() < minLen {
                    errors.push(field.name + " must be at least " + minLen.toString() + " chars");
                }
            }
        }
        
        $if field.hasTag("range") {
            let range = field.tag("range");  // e.g., "0,100"
            // Parse and validate range...
        }
    }
    
    if errors.isEmpty() { Ok(()) } else { Err(errors) }
}
```

---

## 13. Backward Compatibility

The following legacy names are supported but deprecated:

| Deprecated | Preferred |
|------------|-----------|
| `$sizeof` | `$sizeOf` |
| `$alignof` | `$alignOf` |
| `$typeof` | `$typeName` |

**Note:** `$typeInfo<T>().fields` is the preferred way to iterate struct fields with full tag support. `$fields<T>()` is simpler but doesn't include tag metadata.

Deprecation warnings will be emitted when legacy names are used.

---

## 14. Error Messages

Comptime errors should be clear and actionable:

```
error[E0501]: compile-time assertion failed
  --> src/main.vx:15:5
   |
15 |     $staticAssert($sizeOf<T>() <= 64, "Type too large");
   |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   |
   = note: $sizeOf<MyStruct>() = 128, but maximum is 64
   = help: consider boxing large fields or splitting the struct
```

```
error[E0502]: cannot evaluate at compile time
  --> src/main.vx:20:15
   |
20 |     $if runtime_value > 0 {
   |         ^^^^^^^^^^^^^ not a compile-time constant
   |
   = note: $if conditions must be evaluable at compile time
   = help: use regular `if` for runtime conditions
```
