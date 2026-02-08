# Vex Language - Architecture Deep Dive

**Version:** 0.2.0
**Last Updated:** Kasım 9, 2025

This document provides detailed architectural information about Vex's implementation.

## 🏛️ System Architecture

### Compiler Architecture

```
vex-cli/
├── main.rs              # CLI entry point
└── commands/            # Command implementations
    ├── run.rs          # File execution
    ├── compile.rs      # Compilation
    ├── format.rs       # Code formatting
    └── pm.rs           # Package management

vex-lexer/              # Tokenization
└── src/lib.rs          # Logos-based lexer

vex-parser/             # Syntax Analysis
├── src/
│   ├── lib.rs          # Public API
│   └── parser/         # Parser modules

vex-ast/                # Abstract Syntax Tree
└── src/lib.rs          # AST definitions

vex-compiler/           # Code Generation

vex-runtime/            # C Runtime
├── c/                  # C implementation
└── src/                # Rust FFI bindings
```

### Data Flow

```
Source Code (.vx)
       ↓
    Tokenization
       ↓
   Syntax Parsing
       ↓
  Abstract Syntax Tree
       ↓
   Borrow Checking
       ↓
   Type Checking
       ↓
   LLVM IR Generation
       ↓
   Optimization
       ↓
   Machine Code
       ↓
   Executable Binary
```

## 🔍 Detailed Component Analysis

### Span Tracking System

The compiler maintains precise source location tracking for accurate diagnostics:

#### Span Recording (Parser Layer)

- Every AST node has an optional `span_id: Option<String>` field
- Parser records span IDs via `span_map.generate_id()` during tokenization
- SpanMap stores mappings from span IDs to (file, line, column, length)
- Spans are serialization-skipped (`#[serde(skip)]`) to avoid overhead

#### Span Preservation (Compiler Layer)

- Generic substitution preserves span_id during type instantiation
- Closure generation extracts spans from expression bodies
- All compiler phases maintain span information through transformations

#### Span Resolution (Diagnostics Layer)

- Borrow checker diagnostics resolve spans via `span_map.get(span_id)`
- Linter rules (dead_code, naming_convention, unreachable_code, unused_variables) use span_map
- Fallback to `Span::unknown()` only when span unavailable (edge cases)
- All critical diagnostic paths use actual source locations

**Implementation Status:** ✅ Complete
- 0 `span_id: None` usages
- 31 `Span::unknown()` usages (20 legitimate fallbacks, 9 edge cases, 2 tests)
- All major diagnostics span-aware

### Borrow Checker Architecture

The borrow checker implements a 4-phase analysis:

#### Phase 1: Immutability Analysis

- Enforces `let` vs `let!` semantics
- Tracks variable mutability throughout scope
- Prevents immutable variable mutations

#### Phase 2: Move Semantics

- Prevents use-after-move violations
- Tracks value ownership transfers
- Implements ownership semantics

#### Phase 3: Borrow Rules

- Enforces reference aliasing rules
- Prevents mutable/immutable reference conflicts
- Validates reference lifetimes within functions

#### Phase 4: Lifetime Analysis

- Tracks reference validity across scopes
- Prevents dangling references
- Validates complex lifetime relationships

### Code Generation Strategy

#### AST Visitor Pattern

- `ASTCodeGen` trait for node traversal
- Separate compilation for each AST node type
- Modular codegen architecture

#### Type System Integration

- LLVM type mapping for Vex types
- Generic instantiation support
- Trait method resolution

#### Memory Management

- Stack allocation for locals
- Heap allocation for collections
- Automatic cleanup via ownership

### Runtime Architecture

#### C Runtime Design

- High-performance C implementation
- SIMD-optimized operations
- Lock-free data structures

#### Async Runtime

- Event-driven architecture
- Goroutine scheduling
- Channel-based communication

#### Memory Allocator

- Custom allocator for Vex types
- Size-class based allocation
- Efficient deallocation

## 📊 Performance Characteristics

### Compilation Speed

- Fast incremental compilation
- Efficient LLVM optimization
- Minimal memory usage

### Runtime Performance

- Zero-cost abstractions
- SIMD acceleration
- Efficient memory management

### Memory Usage

- Minimal runtime overhead
- Stack-based locals
- Efficient heap allocation

## 🔧 Development Workflow

### Code Organization

- Modular crate structure
- Clear separation of concerns
- Comprehensive testing

### Quality Assurance

- 100% test coverage target
- Static analysis tools
- Performance benchmarking

### Continuous Integration

- Automated testing
- Documentation updates
- Release automation

---

_This file is automatically updated by scripts/update_docs.sh_
