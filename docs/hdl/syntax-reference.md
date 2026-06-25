---
layout: doc
title: Syntax Reference
---

# VexHDL Syntax Reference

This document serves as the formal syntax and type reference for the VexHDL language. It outlines every type, declaration, and module structure verified by the VexHDL compiler.

---

## 1. Type System

VexHDL separates data types into **Scalar Types** (representing values) and **Signal Types** (representing hardware nets/registers).

### 1.1 Scalar Types
Scalar types represent logic values, integers, and fixed-point values:

| Type | Syntax | Description | Example |
| :--- | :--- | :--- | :--- |
| **Boolean** | `Bool` | 1-bit boolean flag (`true`/`false`) | `let active: Bool = true;` |
| **Unsigned Integer** | `U<N>` | Unsigned bit-vector of width `N` | `let count: U<8> = 0;` |
| **Signed Integer** | `I<N>` | Two's-complement signed bit-vector of width `N` | `let temp: I<16> = -45;` |
| **Fixed Point** | `F<N, M>` | Fixed-point number of width `N` with `M` fractional bits | `let ratio: F<16, 8> = 1.5;` |
| **String** | `Str` | Simulation-only string type (primarily for logging) | `let name: Str = "UART";` |
| **Custom** | `CustomName` | A type alias declared via `type` keyword | `let s: State = State::IDLE;` |

### 1.2 Signal Types
Signal types wraps scalar types to specify physical hardware properties (routing wires vs. memory cells):

* **`Wire(Option<Width>)`**: Represents a combinational wire/net. If width is omitted, it defaults to a 1-bit signal.
* **`Reg(Option<Width>, Option<Depth>)`**: Represents a sequential storage element (registers or multi-word memories).
  * `Reg(Some(8), None)`: An 8-bit register.
  * `Reg(Some(16), Some(1024))`: A memory array of 1024 words, each 16 bits wide (RAM block).
* **`Tri(Width)`**: Represents a tri-state bus capable of driving high-impedance `Z` states.

### 1.3 Compound Types
* **Arrays**: Declared using the syntax `[T; N]` where `T` is a type and `N` is a constant width expression.
  ```vexhdl
  let data_bus: [U<8>; 4]; // An array of four 8-bit unsigned values
  ```
* **Type Aliases**: Declared using the `type` keyword.
  ```vexhdl
  type Byte = U<8>;
  export type Word = U<16>;
  ```

---

## 2. Structs and Enums

### 2.1 Structs
Structs are collection of named fields of different types. They can be exported to other files using the `export` keyword.
```vexhdl
export struct Pixel {
    r: U<8>,
    g: U<8>,
    b: U<8>,
}

// Instantiate struct literal
let p: Pixel = Pixel { r: 255, g: 0, b: 0 };
```

### 2.2 Enums
Enums are user-defined types containing a set of named variants.
```vexhdl
export enum State {
    IDLE,
    INIT,
    RUN,
    DONE,
}
```
> [!IMPORTANT]
> To access enum variants, you must use double-colon scoping: `State::IDLE`, `State::RUN`. Raw variant names are not allowed.

---

## 3. Module Declarations (`graph`)

A hardware module is defined using the `graph` keyword (or its alias `module`). A module is composed of compile-time constants (parameters), port mappings, and internal logic.

```vexhdl
export graph shift_register #(
    DEPTH: Param<U<32>> = 4, // Compile-time generic parameters
)(
    clk: In,                 // 1-bit input clock
    rst: In,                 // 1-bit input reset
    d_in: In<Bool>,          // 1-bit data input
    d_out: Out<Bool>,        // 1-bit data output
) {
    // Internal registers
    let! regs: [Bool; DEPTH] = {DEPTH{false}};

    on(PosEdge(clk)) {
        if rst {
            regs <- {DEPTH{false}};
        } else {
            // Shift operations
            regs[0] <- d_in;
            for i in 1..DEPTH {
                regs[i] <- regs[i-1];
            }
        }
    }

    d_out = regs[DEPTH-1];
}
```

### 3.1 Port Directions
* **`In` / `In<T>`**: Read-only input port.
* **`Out` / `Out<T>`**: Write-only output port (except within the module body driving it).
* **`InOut<T>`**: Bidirectional port (tri-state buffer driver).

---

## 4. Signal Declarations

VexHDL uses different declaration keywords to ensure compile-time safety and prevent multiple-driver issues.

### 4.1 `let` (Combinational Wires)
* Declares a combinational net.
* Must be assigned using `=` (blocking assignment).
* Values update instantaneously when any input changes.
```vexhdl
let op_add: U<8> = val_a + val_b;
```

### 4.2 `let!` (Sequential Registers)
* Declares a sequential memory element (Flip-Flops or RAM).
* Must be driven only inside `on(...)` process blocks.
* Must be assigned using `<-` (non-blocking assignment).
```vexhdl
let! state: State = State::IDLE;
```

### 4.3 `param` (Local Constants)
* Declares local compile-time constants.
```vexhdl
param BAUD_RATE: U<32> = 115200;
```
