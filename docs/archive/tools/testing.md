# Testing Infrastructure

**Core Language Specification**  
**Version:** 0.1.2  
**Status:** ✅ Implemented

Vex includes a first-class testing framework inspired by Go (`vex test`).

---

## 1. Test Files

Tests reside in files ending with `_test.vx` or `.test.vx` alongside your source code.

```vex
// math_test.vx
import { add } from "./math";
import { T } from "testing";

export fn TestAdd(t: &T!) {
    if add(2, 2) != 4 {
        t.error("2 + 2 should be 4");
    }
}
```

- **Function Name**: Must start with `Test`.
- **Signature**: Must take `t: &T!`.

---

## 2. Running Tests

Use the CLI:

```bash
vex test ./...        # recursive
vex test .           # current package
vex test -v          # verbose
```

---

## 3. Benchmarks

Benchmarks measure performance.

```vex
import { B } from "testing";

export fn BenchmarkAdd(b: &B!) {
    for i in 0..b.n {
        add(2, 2);
    }
}
```

Run with `vex test -bench .`.

---

## 4. Assertions

While Vex promotes simple `if` checks, the `testing` library provides assertions:

```vex
import { assert } from "testing";

export fn TestSimple(t: &T!) {
    assert.equal(t, 2 + 2, 4);
}
```
