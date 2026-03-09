# testing — Test Framework

Go-style testing framework with benchmarks and assertions.

## Writing Tests

Test files end with `.test.vx` and test functions use the `test` naming convention:

```rust
import { expect_eq, expect_ne, expect_true } from "testing";

test fn test_addition() {
    expect_eq(2 + 2, 4);
    expect_ne(2 + 2, 5);
    expect_true(10 > 5);
}

test fn test_string_concatenation() {
    let hello = "Hello, " + "Vex!";
    expect_eq(hello, "Hello, Vex!");
}
```

## Benchmarks

```rust
bench fn bench_sort(b: &Bench) {
    let! arr = [5, 3, 8, 1, 9, 2, 7, 4, 6, 10];
    b.run(fn() {
        sort(&arr);
    });
}
```

## Running Tests

```bash
vex test tests/basic.test.vx           # Run specific test file
vex test tests/                        # Run all tests in directory
./test_all.sh                          # Run entire test suite
```
