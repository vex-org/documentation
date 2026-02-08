# Freestanding Mode

Vex supports freestanding compilation for bare-metal environments, operating systems, bootloaders, and embedded systems - all without a standard library.

## What is Freestanding?

Freestanding mode compiles Vex code without:
- Standard library (`std`)
- Operating system
- Dynamic memory allocation (by default)
- Runtime support

This enables:
- OS kernels and Bootloaders
- Embedded firmware
- UEFI applications

## Enabling Freestanding

### Code Configuration

```vex
// Use no_std and no_main keywords
no_std        // Don't link standard library
no_main       // Don't expect a standard main function

// Required: Panic handler function
fn panic_handler(info: &PanicInfo): never {
    loop {}
}

// Entry point (name depends on target)
export extern "C" fn _start(): never {
    // Your code here
    loop {}
}
```

## Core Library

In freestanding mode, you have access to `core` (a subset of `std`):

```vex
// No imports needed for builtin contracts like $Add, $Eq
// Primitive types and basic constructs are always available
```

## Memory Management

### Global State

Global variables are declared at the top level using `let` or `let!`:

```vex
// Global buffers
let BUFFER: [u8; 4096] = [0; 4096]
let! COUNTER: u32 = 0
```

## Hardware Access

### Port I/O (x86)

```vex
// Output byte to port
fn outb(port: u16, value: u8) {
    unsafe {
        asm!(
            "out dx, al",
            in("dx") port,
            in("al") value
        )
    }
}
```

### Memory-Mapped I/O (MMIO)

```vex
struct UART {
    base: usize
}

fn (self: &UART) write_byte(byte: u8) {
    let addr = self.base + 0x00
    let ptr = addr as *u8!
    
    unsafe {
        // Direct pointer write
        *ptr = byte
    }
}
```

## Inline Assembly

```vex
fn read_cr3(): u64 {
    let value: u64
    unsafe {
        asm!(
            "mov {}, cr3",
            out(reg) value
        )
    }
    return value
}
```

## VGA Text Mode Example

```vex
const VGA_BUFFER: usize = 0xb8000

struct VgaWriter {
    public:
    column: usize,
    row: usize,
    color: u8
}

fn (self: &VgaWriter!) write_byte(byte: u8) {
    let pos = self.row * 80 + self.column
    let ptr = (VGA_BUFFER + pos * 2) as *u16!
    
    unsafe {
        // Direct write to VGA memory
        *ptr = (self.color as u16) << 8 | byte as u16
    }
    self.column += 1
}
```

## Best Practices

1.  **Use `repr(C)`** for structures shared with hardware or other languages.
2.  **Use `let` at top level** for global state variables.
3.  **Manual Memory Management**: In freestanding environments, you are responsible for memory layout.

## Next Steps

- [FFI](/guide/ffi) - Interoperability details
- [Inline Assembly](/guide/advanced/assembly) - Detailed asm syntax
- [Memory Safety](/guide/memory/borrowing) - Borrowing rules in bare-metal
