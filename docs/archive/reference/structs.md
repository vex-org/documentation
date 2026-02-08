# Structs and Data Types

**Core Language Specification**  
**Version:** 0.1.3  
**Status:** ✅ Implemented

Structs are the primary composite data type in Vex. They follow a C/Go-style layout (nominal typing) with support for metadata tags and **field visibility control**.

---

## 1. Struct Definitions

Structs are declared with the `struct` keyword. Fields must have explicit types.

```vex
struct User {
    id: u64,
    username: string,
    email: string,
    is_active: bool,
}
```

### Advanced Syntax (Parser Supported)

Vex supports inline policies (`with`) and contract implementations (`impl`).

```vex
struct User 
    with Serializable, Debug
    impl Display, Hash
{
    // ...
}
```

### Struct Tags (Go-style)
Vex uses backtick strings for metadata, commonly used for serialization.
```vex
struct Product {
    id: i32       `json:"id"`,
    name: string  `json:"name"`,
}
```

### Tuple & Unit Structs
```vex
struct Color(u8, u8, u8);
struct Unit;
```

---

## 2. Field Visibility

Vex uses **C++-style section labels** to control field access. This provides encapsulation without per-field keywords.

### Visibility Levels

| Level | Syntax | Read Access | Write Access |
|-------|--------|-------------|--------------|
| **Private** | `private:` | Only methods | Only methods |
| **Readonly** | `readonly:` | Everyone | Only methods |
| **Public** | `public:` | Everyone | Everyone |

### Default Visibility

Fields without a visibility label are **private by default**.

```vex
struct Config {
    secret: string,     // private (default)
    
    public:
    name: string        // public
}
```

### Section-Based Syntax

Visibility labels apply to all following fields until the next label:

```vex
export struct User {
    private:
    password_hash: string,
    session_token: string,
    
    readonly:
    id: i64,
    created_at: u64,
    
    public:
    name: string,
    email: string
}
```

### Access Rules

**Private fields:**
- Only accessible via `self` in methods
- Cannot be read or written from outside

**Readonly fields:**
- Readable from anywhere
- Writable only via `self` in methods

**Public fields:**
- Full access from anywhere

### Example with Methods

```vex
export struct BankAccount {
    private:
    balance: f64,
    
    readonly:
    account_number: string,
    
    public:
    owner_name: string
}

// Method can access private fields via self
fn (self: &BankAccount) get_balance(): f64 {
    return self.balance
}

// Mutable method can modify private fields
fn (self: &BankAccount!) deposit(amount: f64) {
    self.balance += amount
}

fn main(): i32 {
    let! account = BankAccount {
        balance: 1000.0,
        account_number: "12345",
        owner_name: "Alice"
    }
    
    // ✅ OK: public field
    account.owner_name = "Bob"
    
    // ✅ OK: readonly field (read)
    $println(account.account_number)
    
    // ❌ ERROR: readonly field (write)
    // account.account_number = "99999"
    
    // ❌ ERROR: private field
    // $println(account.balance)
    
    // ✅ OK: access via method
    $println(account.get_balance())
    account.deposit(500.0)
    
    return 0
}
```

### Error Messages

The compiler provides helpful error messages:

```
[type-error] Error: field `password_hash` of struct `User` is private
[type-error] Error: cannot assign to readonly field `id` of struct `User`
```

---

## 3. Instantiation

```vex
let user = User {
    id: 1,
    username: "alice",
    email: "alice@vex.com",
    is_active: true,
}
```

> **Note:** All fields (including private) can be set during struct literal initialization.

---

## 4. Methods

Vex supports both **Inline Methods** (inside struct) and **External Methods** (Go-style).

### Inline Methods
```vex
struct Counter {
    count: i32,

    fn (self: &Counter!) inc() {
        self.count += 1
    }
}
```

### External Methods (UFCS)
Useful for extending types or keeping data clean.

```vex
fn (self: &Counter) value(): i32 {
    return self.count
}
```

Calls: `counter.inc()` or `counter.value()`


---

## 5. Memory Layout
- **Alignment**: Fields are naturally aligned (e.g. `u64` on 8-byte boundary).
- **Ordering**: Compiler may reorder fields in the future to minimize padding (currently C-compatible order).
- **Size**: Sum of fields + padding.

```vex
struct A {
    a: u8,   // 1 byte
    // 3 bytes padding
    b: u32,  // 4 bytes
}
// Sizeof(A) = 8
```
