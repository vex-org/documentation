# Architecture

This section explains how Vex source moves through the compiler and where the major subsystems live in the repository.

## Pipeline Overview

```text
source (.vx)
  -> lexer
  -> parser / syntax tree
  -> HIR lowering
  -> type inference + borrow analysis + semantic checks
  -> codegen path selection
    -> LLVM/native path
    -> SIR path for data-parallel graphs
  -> link / JIT / run / test integration
```

The important split is that Vex has both:

- a native LLVM-oriented path for ordinary systems code
- a SIR path for tensor-, SIMD-, and graph-oriented lowering

## Major Crates

```text
crates/
  vex-lexer         tokenization
  vex-parser        syntax parsing and recovery
  vex-syntax        syntax node definitions
  vex-hir           semantic IR, inference, borrow checking
  vex-sir           Silicon IR graphs and backend lowering
  vex-diagnostics   diagnostics formatting and reporting
  vex-compiler      main codegen pipeline and prelude/runtime integration
```

## Front End

### `vex-lexer`

Responsible for turning source text into tokens.

### `vex-parser`

Builds the syntax tree and handles recovery from malformed input well enough to support diagnostics and tooling.

### `vex-hir`

This is where most language semantics become concrete:

- name resolution
- type inference
- pattern handling
- borrow and move analysis
- enum/result/option semantics

## Native Codegen Path

The native path in `vex-compiler` lowers checked HIR into LLVM IR and from there into object code, linked executables, or JIT-executed code depending on the command path.

This path is used for ordinary systems programming, CLI tools, servers, runtime code, and general application code.

## SIR Path

`vex-sir` handles data-parallel graph lowering for tensor- and array-oriented computation. It is the basis for:

- SIMD-friendly expression lowering
- graph fusion
- compute backends such as SPIR-V, WGSL, and Metal
- graph/runtime dispatch decisions for heterogeneous execution

If you are working on vectorized operators, tensors, masks, or GPU-facing computation, this is the path to understand.

## Runtime and Tooling

Outside the language crates, the repository also includes:

- runtime support under `lib/runtime/`
- CLI tooling under `tools/vex-cli/`
- editor/LSP tooling under `tools/vex-lsp/`
- formatter and supporting developer tools under `tools/`

## Where to Start Reading

- Start in [Guide](/guide/introduction) if you want language semantics.
- Start in [CLI Reference](/references/vex-cli-reference) if you want execution and command behavior.
- Start in [GPU & SIR](/guide/gpu/) and [SIMD](/guide/simd/) if you care about the graph path.

## Architecture Pages

- [Compiler Pipeline](/architecture/compiler-pipeline): source to HIR to native/SIR lowering
- [SIR & Backends](/architecture/sir-and-backends): graph path, backend maturity, and acceleration routing
- [Runtime & Tooling](/architecture/runtime-and-tooling): runtime model, CLI, tests, docs, and editor tooling

## Lexer (vex-lexer)

The lexer uses [Logos](https://github.com/maciejhirsz/logos) for high-performance tokenization.

### Token Types

```rust
#[derive(Logos, Debug, Clone, PartialEq)]
pub enum Token {
    // Keywords
    #[token("fn")] Fn,
    #[token("let")] Let,
    #[token("let!")] LetMut,
    #[token("if")] If,
    #[token("else")] Else,
    // ...

    // Literals
    #[regex(r"[0-9]+", parse_int)]
    IntLiteral(i64),

    #[regex(r#""[^"]*""#, parse_string)]
    StringLiteral(String),

    // Identifiers
    #[regex(r"[a-zA-Z_][a-zA-Z0-9_]*")]
    Identifier,
}
```

### Automatic Semicolon Insertion

```rust
fn insert_semicolons(tokens: Vec<Token>) -> Vec<Token> {
    // Insert semicolons at newlines when:
    // - Previous token can end a statement
    // - Next token can start a statement
    // - Not inside brackets/parens
}
```

## Parser (vex-parser)

Built on Rowan for lossless syntax trees with error recovery.

### Syntax Kinds

```rust
#[derive(Clone, Copy, PartialEq, Eq, Hash)]
pub enum SyntaxKind {
    // Expressions
    BinaryExpr,
    UnaryExpr,
    CallExpr,
    IndexExpr,
    FieldExpr,

    // Statements
    LetStmt,
    ExprStmt,
    ReturnStmt,

    // Items
    FnDef,
    StructDef,
    EnumDef,
    NODE_CONTRACT_IMPL,
    NODE_CONTRACT,

    // Types
    PathType,
    RefType,
    ArrayType,
    FnType,

    // Patterns
    IdentPat,
    TuplePat,
    StructPat,

    // Tokens
    Ident,
    IntLit,
    StringLit,
    // ...
}
```

### Error Recovery

```rust
fn parse_block(&mut self) -> Block {
    self.expect(T!['{']);

    let mut stmts = vec![];
    while !self.at(T!['}']) && !self.at_end() {
        match self.parse_stmt() {
            Ok(stmt) => stmts.push(stmt),
            Err(e) => {
                self.error(e);
                self.recover_to(&[T!['}'], T![;]]);
            }
        }
    }

    self.expect(T!['}']);
    Block { stmts }
}
```

## HIR (vex-hir)

High-level IR with semantic information, powered by Salsa for incremental computation.

### Type System

```rust
pub enum Ty {
    // Primitives
    Int(IntTy),    // i8, i16, i32, i64, i128
    Uint(UintTy),  // u8, u16, u32, u64, u128
    Float(FloatTy), // f16, f32, f64
    Bool,
    Char,
    Str,
    Never,
    Unit,

    // Compound
    Tuple(Vec<Ty>),
    Array(Box<Ty>, usize),
    Slice(Box<Ty>),
    Ref(Box<Ty>, Mutability, Lifetime),
    Ptr(Box<Ty>, Mutability),

    // User-defined
    Adt(AdtId, Substs),
    Fn(FnSig),
    Closure(ClosureId, Substs),

    // Inference
    Infer(InferTy),
    Error,
}
```

### Borrow Checker

The borrow checker implements Polonius-style Non-Lexical Lifetimes (NLL).

```rust
pub struct BorrowChecker {
    cfg: ControlFlowGraph,
    facts: AllFacts,
    regions: RegionInference,
}

impl BorrowChecker {
    pub fn check(&mut self) -> Vec<BorrowError> {
        // Phase 1: Build control flow graph
        self.build_cfg();

        // Phase 2: Compute liveness
        self.compute_liveness();

        // Phase 3: Compute regions
        self.compute_regions();

        // Phase 4: Check borrows
        self.check_borrows()
    }
}
```

#### Four-Phase Analysis

1. **Immutability Check**: Verify `let` vs `let!` usage
2. **Move Analysis**: Track ownership transfers
3. **Borrow Analysis**: Verify borrowing rules
4. **Lifetime Analysis**: NLL region inference

### VUMM (Vex Unified Memory Model)

Automatic memory strategy selection.

```rust
pub enum BoxKind {
    Unique,     // Single owner
    SharedRc,   // Reference counted (single-thread)
    AtomicArc,  // Atomic ref counted (multi-thread)
    Unknown,    // Not yet determined
}

pub struct VummAnalysis {
    kinds: HashMap<ExprId, BoxKind>,
}

impl VummAnalysis {
    pub fn analyze(&mut self, hir: &Hir) {
        // Phase 1: Escape analysis
        self.escape_analysis();

        // Phase 2: Clone analysis
        self.clone_analysis();

        // Phase 3: Thread analysis
        self.thread_analysis();

        // Phase 4: Kind decision
        self.decide_kinds();

        // Phase 5: Elision optimization
        self.optimize_elisions();
    }
}
```

## SIR (Silicon IR)

Intermediate representation for GPU compute.

### Node Types

```rust
pub enum SirNode {
    // Data
    Constant(Value),
    Parameter(usize),
    Tensor(Shape, DType),

    // Arithmetic
    Add(NodeId, NodeId),
    Sub(NodeId, NodeId),
    Mul(NodeId, NodeId),
    Div(NodeId, NodeId),

    // Tensor ops
    MatMul(NodeId, NodeId),
    Transpose(NodeId),
    Reshape(NodeId, Shape),

    // Control flow
    If(NodeId, NodeId, NodeId),
    Loop(NodeId, NodeId),

    // Parallel
    ParallelFor(Range, NodeId),
    Reduce(NodeId, ReduceOp),
    Scan(NodeId, ScanOp),
}
```

### Backends

```rust
pub trait Backend {
    fn compile(&self, graph: &SirGraph) -> CompiledKernel;
    fn execute(&self, kernel: &CompiledKernel, inputs: &[Tensor]) -> Vec<Tensor>;
}

pub struct SpirVBackend;   // Vulkan
pub struct WgslBackend;    // WebGPU
pub struct MetalBackend;   // Apple Silicon
pub struct ScalarBackend;  // CPU fallback
pub struct SimdBackend;    // CPU SIMD
```

### Automatic Differentiation

```rust
pub struct Autograd {
    forward_graph: SirGraph,
    backward_graph: SirGraph,
    adjoints: HashMap<NodeId, NodeId>,
}

impl Autograd {
    pub fn backward(&mut self, output: NodeId) -> SirGraph {
        // Reverse-mode automatic differentiation
        self.adjoints.insert(output, self.constant(1.0));

        for node in self.forward_graph.reverse_postorder() {
            let adjoint = self.adjoints[&node];

            match &self.forward_graph[node] {
                SirNode.Add(a, b) => {
                    self.accumulate_adjoint(*a, adjoint);
                    self.accumulate_adjoint(*b, adjoint);
                },
                SirNode.Mul(a, b) => {
                    self.accumulate_adjoint(*a, self.mul(adjoint, *b));
                    self.accumulate_adjoint(*b, self.mul(adjoint, *a));
                },
                // ... other ops
            }
        }

        self.backward_graph.clone()
    }
}
```

## Runtime

### C Runtime Layer

```
lib/runtime/
├── runtime/
│   └── src/
│       ├── alloc/
│       │   ├── slab.c      # Slab allocator
│       │   ├── arena.c     # Arena allocator
│       │   └── vumm.c      # VUMM runtime support
│       ├── platform/
│       │   ├── syscall.c   # Raw syscalls
│       │   └── thread.c    # Threading primitives
│       └── core/
│           ├── panic.c     # Panic handling
│           └── print.c     # Basic I/O
```

### Slab Allocator

```c
typedef struct slab {
    void* memory;
    size_t object_size;
    size_t capacity;
    uint64_t* bitmap;
    struct slab* next;
} slab_t;

typedef struct slab_cache {
    slab_t* partial;
    slab_t* full;
    slab_t* empty;
    size_t object_size;
    pthread_mutex_t lock;
} slab_cache_t;
```

### Thread-Local Caching

```c
typedef struct thread_cache {
    void* free_list[SIZE_CLASSES];
    size_t free_count[SIZE_CLASSES];
} thread_cache_t;

__thread thread_cache_t* tlc = NULL;
```

## Diagnostics (vex-diagnostics)

Rich error reporting with source locations.

```rust
pub struct Diagnostic {
    severity: Severity,
    message: String,
    span: Span,
    labels: Vec<Label>,
    notes: Vec<String>,
    suggestions: Vec<Suggestion>,
}

impl Diagnostic {
    pub fn emit(&self, source: &str) {
        // Pretty-print error with source context
        // Colored output, underlines, suggestions
    }
}
```

### Example Output

```
error[E0382]: borrow of moved value: `data`
  --> src/main.vx:10:20
   |
8  |     let data = vec![1, 2, 3];
   |         ---- move occurs because `data` has type `Vec<i32>`
9  |     consume(data);
   |             ---- value moved here
10 |     println(data);
   |             ^^^^ value borrowed here after move
   |
help: consider cloning the value if you need to use it again
   |
9  |     consume(data.clone());
   |                 ++++++++
```

## Build System Integration

### Incremental Compilation

```rust
#[salsa::query_group(CompilerDatabase)]
pub trait Compiler {
    #[salsa::input]
    fn source(&self, file: FileId) -> Arc<String>;

    fn tokens(&self, file: FileId) -> Arc<Vec<Token>>;
    fn syntax(&self, file: FileId) -> Arc<SyntaxTree>;
    fn hir(&self, file: FileId) -> Arc<Hir>;
    fn types(&self, file: FileId) -> Arc<TypeInfo>;
}
```

### Parallel Compilation

```rust
pub fn compile_crate(files: Vec<FileId>) -> Result<(), Error> {
    // Parse all files in parallel
    let parsed: Vec<_> = files
        .par_iter()
        .map(|f| parse(f))
        .collect();

    // Type check with dependency ordering
    let sorted = topological_sort(&parsed);
    for batch in sorted {
        batch.par_iter().for_each(|f| type_check(f));
    }

    // Generate code
    files.par_iter().for_each(|f| codegen(f));

    Ok(())
}
```

## Next Steps

- [Language Reference](/reference) - Complete syntax reference
- [Contributing](/contributing) - How to contribute
- [API Documentation](/api) - Internal API docs
