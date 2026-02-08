# Chapter 5: Ownership & Memory

Vex does not use a Garbage Collector (GC). Instead, it uses a **Borrow Checker** similar to Rust to ensure memory safety at compile time.

## 2.1 The Rules of Ownership

1.  Each value in Vex has a variable that's called its **owner**.
2.  There can only be one owner at a time.
3.  When the owner goes out of scope, the value will be dropped (freed).

```vex
{
    let s = "hello"; // s is valid from here
    
    // do stuff with s
    
} // s goes out of scope here, memory is freed
```

## 2.2 Borrowing

You can pass references to values without transferring ownership. This is called **borrowing**.

### Immutable References (`&T`)
You can have infinite immutable references to a value.

```vex
fn print_len(s: &string) {
    $println(s.len());
}

fn main(): i32 {
    let s1 = "hello";
    print_len(&s1); // Lend s1 to print_len
    print_len(&s1); // Works again!
    return 0;
}
```

### Mutable References (`&T!`)
You can have **only one** mutable reference at a time.

```vex
fn append_world(s: &string!) {
    s.push_str(" world");
}

fn main(): i32 {
    let! s = "hello";
    append_world(&s!); // Note: &s! syntax
    return 0;
}
```

> **The `!` Rule**: Just like `let!`, mutable references use `&T!` (read "ref bang T") instead of `&mut T`.

## 2.3 The "No Aliasing + Mutation" Rule

You cannot have a mutable reference while you have other references (mutable or immutable).

```vex
let! x = 10;
let r1 = &x;
let r2 = &x;     // OK: Multiple immutable borrows
// let r3 = &x!; // ERROR: Cannot borrow mutably while immutable borrows exist
```

## 2.4 Defer

For manual resource management (like files), Vex uses the Go-style `defer` keyword.

```vex
fn process_file() {
    let f = open("data.txt");
    defer close(f); // Guaranteed to run when function exits
    
    // ... work with f ...
}
```
