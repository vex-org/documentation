# Vex Compile-Time Reflection

Vex provides powerful compile-time reflection capabilities that enable zero-overhead serialization, deserialization, and generic programming. All reflection happens at compile time - no runtime overhead.

## Features Summary

| Feature | Syntax | Returns |
|---------|--------|---------|
| Field iteration | `$for f in $typeInfo<T>().fields` | Unrolls loop |
| Field name | `f.name` | `string` |
| Field type | `f.type_name` | `string` |
| Tag value | `f.tag("key")` | `string` (empty if not found) |
| Tag check | `f.has_tag("key")` | `bool` |
| Has field | `has_field<T>("name")` | `bool` |
| Tag iteration | `$for t in f.tags` | Unrolls nested loop |
| Tag key | `t.key` | `string` |
| Tag value | `t.value` | `string` |
| Type name | `typeof(expr)` | `string` |

## Struct Tags

Vex uses Go-style backtick tags for metadata:

```vex
struct User {
    id: i32 `json:"user_id" db:"primary_key"`,
    name: string `json:"name" db:"varchar(255)"`,
    active: bool `json:"is_active"`
}
```

---

## Example: JSON Serializer

```vex
import { $typeInfo } from "reflect"

fn to_json<T>(obj: &T): string {
    let! result = "{";
    let! first = true;
    
    $for f in $typeInfo<T>().fields {
        let json_key = f.tag("json");
        
        // Skip fields without json tag
        $if json_key != "" {
            if !first {
                result = result + ", ";
            }
            first = false;
            
            // Get field value (pseudo-code, field_get would be needed)
            let value = field_get(obj, f.name);
            
            $if f.type_name == "string" {
                result = result + "\"" + json_key + "\": \"" + value + "\"";
            }
            $if f.type_name == "i32" {
                result = result + "\"" + json_key + "\": " + value.to_string();
            }
            $if f.type_name == "bool" {
                if value {
                    result = result + "\"" + json_key + "\": true";
                } else {
                    result = result + "\"" + json_key + "\": false";
                }
            }
        }
    }
    
    return result + "}";
}

// Usage:
let user = User { id: 1, name: "Alice", active: true };
let json = to_json(&user);
// Output: {"user_id": 1, "name": "Alice", "is_active": true}
```

---

## Example: YAML Serializer

```vex
fn to_yaml<T>(obj: &T): string {
    let! result = "";
    
    $for f in $typeInfo<T>().fields {
        let yaml_key = f.tag("yaml");
        let key = $if yaml_key != "" { yaml_key } else { f.name };
        
        let value = field_get(obj, f.name);
        result = result + key + ": " + format_value(value) + "\n";
    }
    
    return result;
}
```

---

## Example: Database ORM

```vex
struct Product {
    sku: string `db:"sku" pk:"true"`,
    name: string `db:"product_name"`,
    price: f64 `db:"price"`
}

fn create_table<T>(): string {
    let! sql = "CREATE TABLE (";
    
    $for f in $typeInfo<T>().fields {
        let col_name = f.tag("db");
        $if col_name != "" {
            let col_type = $if f.type_name == "string" { "TEXT" }
                      else $if f.type_name == "i32" { "INTEGER" }
                      else $if f.type_name == "f64" { "REAL" }
                      else { "BLOB" };
            
            sql = sql + col_name + " " + col_type;
            
            $if f.has_tag("pk") {
                sql = sql + " PRIMARY KEY";
            }
            sql = sql + ", ";
        }
    }
    
    return sql + ")";
}
```

---

## Example: Type-Based Function Dispatch

```vex
fn process<T>(value: T) {
    // Branches are eliminated at compile time
    $if typeof(value) == "i32" {
        println("Processing integer: ", value);
    }
    $if typeof(value) == "string" {
        println("Processing string: ", value);
    }
    $if typeof(value) == "bool" {
        println("Processing boolean: ", value);
    }
}

// LLVM will only compile the matching branch
process(42);       // Only "Processing integer" branch exists
process("hello");  // Only "Processing string" branch exists
```

---

## Example: Validation with Tags

```vex
struct UserInput {
    email: string `validate:"email" required:"true"`,
    age: i32 `validate:"range(0,150)"`,
    name: string `validate:"min_len(2)" required:"true"`
}

fn validate<T>(obj: &T): Result<(), string> {
    $for f in $typeInfo<T>().fields {
        let value = field_get(obj, f.name);
        
        $if f.has_tag("required") {
            $if f.type_name == "String" {
                if value.is_empty() {
                    return Err(f.name + " is required");
                }
            }
        }
        
        // More validation logic based on tags...
    }
    
    return Ok(());
}
```

---

## Implementation Notes

1. **Zero Runtime Overhead**: All `$for` and `$if` are evaluated at compile time. The generated code contains only the necessary branches.

2. **Type Safety**: `typeof()` comparisons are compile-time constants, enabling LLVM to eliminate dead code.

3. **Tag Storage**: Tags are stored in `struct_metadata` HashMap during parsing, accessed via `ComptimeFieldContext`.

4. **Nested Iteration**: `$for t in f.tags` creates a nested `ComptimeTagContext` that coexists with the outer `ComptimeFieldContext`.
