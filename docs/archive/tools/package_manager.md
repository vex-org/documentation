# Package Manager

**Version:** 0.2.0
**Last Updated:** November 28, 2025

This document describes Vex's package manager (`vex-pm`), which provides dependency management, project initialization, and build coordination for Vex projects.

---

## Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Manifest File (vex.json)](#manifest-file-vexjson)
4. [Lock File (vex.lock)](#lock-file-vexlock)
5. [CLI Commands](#cli-commands)
6. [Module Commands](#module-commands)
7. [Workspace Support](#workspace-support)
8. [Environment Variables](#environment-variables)
9. [Dependency Resolution](#dependency-resolution)
10. [Platform-Specific Code](#platform-specific-code)
11. [Build Integration](#build-integration)

---

## Overview

Vex's package manager is fully integrated into the `vex` command-line tool. It follows a Go-style decentralized, Git-based approach with Minimum Version Selection (MVS).

### Key Features

- **Decentralized**: No central package registry - uses Git repositories directly
- **Go-style**: MVS resolution, `vex mod` commands, workspace support
- **Fast**: Parallel downloads with global caching
- **Secure**: SHA-256 checksums and lock files
- **Platform-aware**: Automatic selection of platform-specific implementations
- **Workspace**: Monorepo support via `workspace` field in vex.json
- **Proxy support**: Enterprise-ready with VEX_PROXY environment variable

### Philosophy

_"Go Modules'in sadeliği, Cargo'nun gücü, Zig'in platform awareness'ı"_

---

## Project Structure

Vex projects follow a conventional directory structure:

```
my-project/
├── vex.json          # Project manifest
├── vex.lock          # Lock file (generated)
├── native/           # Native C Codes
├── src/
│   ├── lib.vx        # Library entry point
│   ├── main.vx       # Executable entry point (optional)
│   └── mod.vx        # Module declarations
├── tests/            # Test files
├── examples/         # Example code
└── vex-builds/       # Build artifacts (generated)
```

### Entry Points

- **Library**: `src/lib.vx` (default main entry)
- **Module**: `src/mod.vx` (alternative if no lib.vx)
- **Executable**: `src/main.vx` or specified in `vex.json`
- **Custom**: Configurable via `main` field in manifest

**Import Resolution**:

```vex
// Package name import uses "main" field from vex.json
import { abs } from "math";
// → Resolves to: vex-libs/std/math/src/lib.vx (from vex.json)

// Direct file import bypasses vex.json
import { sin } from "math/native.vxc";
// → Resolves to: vex-libs/std/math/src/native.vxc

// Relative imports (within module files)
import { helper } from "./utils.vx";
// → Resolves relative to current file
```

**Priority Order**:

1. `vex.json` → `main` field value
2. `src/lib.vx` (if exists)
3. `src/mod.vx` (if exists)
4. Error: No entry point found

---

## Manifest File (vex.json)

The `vex.json` file describes your project and its dependencies:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A Vex project",
  "authors": ["Your Name <you@example.com>"],
  "license": "MIT",
  "repository": "https://github.com/user/my-project",

  "dependencies": {
    "local-lib": "v1.2.0"
  },

  "main": "src/lib.vx",

  "bin": {
    "my-app": "src/main.vx",
    "cli-tool": "src/cli.vx"
  },

  "testing": {
    "dir": "tests",
    "pattern": "*.test.vx",
    "timeout": 30,
    "parallel": true
  },

  "targets": {
    "default": "x64",
    "supported": ["x64", "arm64", "wasm"]
  },

  "profiles": {
    "development": {
      "optimizationLevel": 0,
      "debugSymbols": true
    },
    "production": {
      "optimizationLevel": 3,
      "debugSymbols": false
    }
  },

  "native": {
    "sources": ["native/src/helper.c"],
    "libraries": ["ssl", "crypto"],
    "search_paths": ["/usr/local/lib"],
    "static_libs": ["./vendor/libmylib.a"],
    "cflags": ["-O3", "-Wall", "-fPIC"],
    "include_dirs": ["vendor/include", "../../../vex-runtime/c"]
  },

  "vex": {
    "borrowChecker": "strict"
  }
}
```

### Dependency Specification

Dependencies can be local or Git-based (Go-style):

```json
{
  "dependencies": {
    "local-lib": "v1.2.3",
    "github.com/user/utils": "v1.2.0",
    "github.com/user/http": "v2.0.0",
    "gitlab.com/org/pkg": "latest"
  }
}
```

**Supported formats:**

- `"v1.2.3"` - Exact version
- `"latest"` - Latest available version
- Git URLs: `github.com/user/repo`, `gitlab.com/org/repo`, `bitbucket.org/team/repo`

### Workspace Configuration

For monorepo/multi-package projects, use the `workspace` field:

```json
{
  "name": "my-monorepo",
  "version": "1.0.0",
  "workspace": {
    "members": ["packages/core", "packages/utils", "apps/web"],
    "replace": [
      {
        "from": "github.com/external/lib",
        "to": "./packages/local-lib"
      }
    ],
    "exclude": ["packages/deprecated/*"]
  }
}
```

**Workspace Fields:**

- `members`: List of member module paths (relative)
- `replace`: Development-time module replacements
- `exclude`: Glob patterns to exclude

### Native Dependencies

For C/C++ integration:

```json
{
  "native": {
    "sources": ["native/src/implementation.c"],
    "libraries": ["ssl", "zlib"],
    "search_paths": ["/usr/local/lib", "/opt/homebrew/lib"],
    "static_libs": ["./vendor/libcustom.a"],
    "cflags": ["-O3", "-Wall", "-fPIC", "-std=c11"],
    "include_dirs": ["path/to/headers", "../../../vex-runtime/c"]
  }
}
```

**Field Descriptions**:

- `sources`: C/C++ files to compile
- `libraries`: System libraries to link (e.g., `m`, `ssl`)
- `search_paths`: Library search directories
- `static_libs`: Static library files (.a)
- `cflags`: C compiler flags
- `include_dirs`: Header include directories

### Complete Field Reference

| Field          | Type   | Required | Description                         |
| -------------- | ------ | -------- | ----------------------------------- |
| `name`         | string | ✅       | Package name                        |
| `version`      | string | ✅       | Semantic version (e.g., "1.0.0")    |
| `description`  | string | ❌       | Package description                 |
| `authors`      | array  | ❌       | Author names and emails             |
| `license`      | string | ❌       | License identifier (e.g., "MIT")    |
| `repository`   | string | ❌       | Repository URL                      |
| `dependencies` | object | ❌       | Package dependencies                |
| `main`         | string | ❌       | Entry point (default: `src/lib.vx`) |
| `bin`          | object | ❌       | Binary targets                      |
| `testing`      | object | ❌       | Test configuration                  |
| `targets`      | object | ❌       | Platform configuration              |
| `profiles`     | object | ❌       | Build profiles                      |
| `native`       | object | ❌       | C/C++ integration config            |
| `vex`          | object | ❌       | Vex-specific settings               |
| `workspace`    | object | ❌       | Monorepo workspace config           |

**Workspace Structure**:

```json
{
  "workspace": {
    "members": ["packages/core", "packages/utils"],
    "replace": [{ "from": "github.com/old/pkg", "to": "./local-pkg" }],
    "exclude": ["deprecated/*"]
  }
}
```

**Targets Structure**:

```json
{
  "targets": {
    "default": "x64",
    "supported": ["x64", "arm64", "wasm", "wasi"]
  }
}
```

**Profiles Structure**:

```json
{
  "profiles": {
    "development": {
      "optimizationLevel": 0,
      "debugSymbols": true,
      "memProfiling": false,
      "cpuProfiling": false
    },
    "production": {
      "optimizationLevel": 3,
      "debugSymbols": false
    }
  }
}
```

**Vex Config Structure**:

```json
{
  "vex": {
    "borrowChecker": "strict" // or "permissive"
  }
}
```

**Testing Config Structure**:

```json
{
  "testing": {
    "dir": "tests", // Test directory (informational)
    "pattern": "**/*.test.vx", // Glob pattern from project root (default)
    "timeout": 30, // Test timeout in seconds (optional)
    "parallel": true // Run tests in parallel (default: true)
  }
}
```

**Test File Naming Convention**:

- Test files MUST follow the `*.test.vx` pattern
- Examples:
  - `basic.test.vx`
  - `integration.test.vx`
  - `unit.test.vx`
- **Pattern Search**: Uses glob from project root (`**/*.test.vx`)
- Custom patterns can be specified via `testing.pattern`

---

## Lock File (vex.lock)

The `vex.lock` file ensures reproducible builds by locking exact dependency versions:

```json
{
  "version": "1.0",
  "packages": {
    "github.com/user/math-lib": {
      "version": "v1.2.3",
      "checksum": "abc123...",
      "dependencies": {}
    },
    "github.com/user/http-client": {
      "version": "v2.1.0",
      "checksum": "def456...",
      "dependencies": {
        "github.com/user/math-lib": "v1.2.3"
      }
    }
  }
}
```

Lock files are automatically generated and should be committed to version control.

---

## CLI Commands

### Project Initialization

```bash
# Create new project
vex new my-project

# Initialize in existing directory
vex init
```

### Dependency Management

```bash
# Add a dependency
vex add github.com/user/math-lib@v1.2.0
vex add github.com/user/utils          # latest version

# Remove a dependency
vex remove github.com/user/math-lib

# List all dependencies
vex list

# Update all dependencies
vex update

# Clean build cache
vex clean
```

---

## Module Commands

Go-style module management commands:

### vex mod tidy

Remove unused dependencies and add missing ones:

```bash
vex mod tidy
```

This command:

1. Scans all `.vx` files for import statements
2. Removes dependencies not used in code
3. Adds missing dependencies found in imports
4. Updates `vex.lock`

### vex mod verify

Verify dependencies match recorded checksums:

```bash
vex mod verify
```

### vex mod download

Download all dependencies to cache:

```bash
vex mod download
```

### vex mod graph

Print dependency tree:

```bash
vex mod graph

# Output:
📦 my-project
   ├── github.com/user/utils @ v1.2.0
   └── github.com/user/http @ v2.0.0
```

### vex mod why

Explain why a package is needed:

```bash
vex mod why github.com/user/utils

# Output:
📦 github.com/user/utils is a direct dependency
   Imported in:
     • src/main.vx
     • src/lib.vx
```

---

## Workspace Support

Workspace allows managing multiple related modules in a single repository (monorepo).

### Initialize Workspace

```bash
# Initialize workspace in existing project
vex workspace init
```

### Add Members

```bash
# Add a module to workspace
vex workspace add packages/core
vex workspace add packages/utils

# Creates vex.json in member if missing
```

### List Members

```bash
vex workspace list

# Output:
📦 Workspace: my-monorepo

   ✓ core (packages/core)
   ✓ utils (packages/utils)

   Replacements:
     github.com/old/pkg => ./packages/local
```

### Sync Workspace

Tidy all workspace members:

```bash
vex workspace sync
```

### Replace Directive

Override external dependencies with local modules:

```bash
vex workspace replace github.com/external/lib ./packages/local-lib
```

This is useful for:

- Local development of forked dependencies
- Testing changes before publishing
- Corporate forks of public packages

---

## Environment Variables

Configure package manager behavior via environment variables:

### VEX_PROXY

Module proxy server(s), comma-separated:

```bash
export VEX_PROXY="https://proxy.company.com,direct"
```

Values:

- URL: Proxy server to try first
- `direct`: Download directly from source
- `off`: Disable network access

### VEX_NOPROXY

Modules that should bypass proxy (glob patterns):

```bash
export VEX_NOPROXY="github.com/myorg/*,*.internal.com"
```

### VEX_PRIVATE

Private modules (never sent to proxy):

```bash
export VEX_PRIVATE="github.com/mycompany/*"
```

### VEX_SUMDB

Checksum database URL:

```bash
export VEX_SUMDB="sum.vex-lang.org"
```

### VEX_CACHE

Override default cache directory:

```bash
export VEX_CACHE="/custom/path/to/cache"
```

Default: `~/.vex/cache`

### VEX_OFFLINE

Enable offline mode (use only cached packages):

```bash
export VEX_OFFLINE=1
```

### VEX_NOSUMDB

Disable checksum database verification:

```bash
export VEX_NOSUMDB=1
```

### View Configuration

```bash
vex env

# Output:
📦 Vex Environment Configuration

VEX_PROXY=https://proxy.company.com,direct
VEX_NOPROXY=github.com/myorg/*
VEX_SUMDB=(not set)
VEX_CACHE=(not set)
VEX_PRIVATE=github.com/mycompany/*
VEX_NOSUMDB=false
VEX_OFFLINE=false
```

### Building and Running

```bash
# Build project
vex build

# Build with specific profile
vex build --release

# Run executable
vex run

# Run specific binary
vex run --bin my-app

# Run example
vex run --example demo

# CI build (locked dependencies)
vex build --locked
```

### Development

```bash
# Check project
vex check

# Format code
vex format

# Run tests (discovers *.test.vx files)
vex test

# Run specific test file
vex test tests/basic.test.vx

# Run tests with timeout
vex test --timeout 60

# Run tests sequentially (no parallel)
vex test --no-parallel

# Generate documentation
vex doc
```

---

## Dependency Resolution

Vex uses **Minimum Version Selection (MVS)** - the same algorithm as Go modules:

### MVS Algorithm

MVS selects the **minimum version** that satisfies all requirements:

1. **Collect**: Gather all version requirements from all modules
2. **Select**: Choose minimum version that satisfies all constraints
3. **Download**: Fetch packages in parallel to global cache
4. **Verify**: Check SHA-256 checksums against `vex.lock`
5. **Link**: Generate build configuration

### Why MVS?

- **Deterministic**: Same input always produces same output
- **Simple**: No complex version range resolution
- **Fast**: Linear time algorithm
- **Reproducible**: Lock file ensures exact versions

### Version Selection Example

```
Module A requires: github.com/user/lib >= v1.2.0
Module B requires: github.com/user/lib >= v1.4.0
Module C requires: github.com/user/lib >= v1.3.0

MVS selects: v1.4.0 (minimum version satisfying all)
```

### Conflict Resolution

When version conflicts occur, Vex follows these rules:

1. Prefer already resolved versions
2. Choose highest compatible version
3. Fail with clear error message if impossible

---

## Platform-Specific Code

Vex supports platform-specific implementations using file suffixes:

### Priority Order

1. `{file}.testing.vx` (when running tests)
2. `{file}.{os}.{arch}.vx` (most specific)
3. `{file}.{arch}.vx` (architecture-specific)
4. `{file}.{os}.vx` (OS-specific)
5. `{file}.vx` (generic fallback)

### Supported Platforms

**Architectures:**

- `x64` - x86-64
- `arm64` - ARM64/AArch64
- `wasm` - WebAssembly
- `wasi` - WASI
- `riscv64` - RISC-V 64-bit

**Operating Systems:**

- `linux` - Linux
- `macos` - macOS
- `windows` - Windows
- `freebsd` - FreeBSD
- `openbsd` - OpenBSD

### Example

```
src/
├── crypto.vx           # Generic implementation
├── crypto.x64.vx       # x86-64 with SIMD
├── crypto.arm64.vx     # ARM64 with NEON
├── crypto.wasm.vx      # WebAssembly version
└── crypto.testing.vx   # Test mocks
```

---

## Testing

### Test Discovery

Vex automatically discovers test files using the pattern specified in `vex.json`.

**Default Pattern**: `*.test.vx`

**Directory Structure**:

```
my-project/
├── vex.json
├── src/
│   └── lib.vx
└── tests/
    ├── basic.test.vx
    ├── integration.test.vx
    └── unit.test.vx
```

### Test File Naming

**Required Pattern**: Files must end with `.test.vx`

**Examples**:

```
✅ basic.test.vx
✅ user_auth.test.vx
✅ api_integration.test.vx
❌ basic_test.vx       (missing .test before .vx)
❌ test_basic.vx       (wrong position)
❌ basic.vx            (missing .test)
```

### Test Configuration

```json
{
  "testing": {
    "dir": "tests",
    "pattern": "*.test.vx",
    "timeout": 30,
    "parallel": true
  }
}
```

**Fields**:

- `dir`: Directory containing test files (default: `"tests"`)
- `pattern`: Glob pattern for test files (default: `"*.test.vx"`)
- `timeout`: Maximum execution time per test in seconds (optional)
- `parallel`: Run tests in parallel (default: `true`)

### Running Tests

**Discover and run all tests**:

```bash
vex test
```

**Run specific test file**:

```bash
vex test tests/basic.test.vx
```

**Run with custom timeout**:

```bash
vex test --timeout 60
```

**Run sequentially**:

```bash
vex test --no-parallel
```

### Test Organization

**Unit Tests**: Test individual functions/modules

```
tests/
├── math.test.vx
├── string.test.vx
└── utils.test.vx
```

**Integration Tests**: Test module interactions

```
tests/
├── api_integration.test.vx
├── db_integration.test.vx
└── workflow.test.vx
```

**Mixed Structure**:

```
tests/
├── unit/
│   ├── math.test.vx
│   └── string.test.vx
└── integration/
    ├── api.test.vx
    └── db.test.vx
```

### Platform-Specific Tests

Tests can also use platform-specific files:

```
tests/
├── io.test.vx              # Generic tests
├── io.test.macos.vx        # macOS-specific tests
└── io.test.linux.vx        # Linux-specific tests
```

**Priority**:

1. `test.{os}.{arch}.vx`
2. `test.{arch}.vx`
3. `test.{os}.vx`
4. `test.vx`

---

## Build Integration

### Automatic Resolution

When building, Vex automatically:

1. **Reads** `vex.json` and `vex.lock`
2. **Downloads** dependencies to `~/.vex/cache/`
3. **Verifies** checksums
4. **Generates** build configuration
5. **Compiles** with proper include paths and linking

### Cache Location

- **Global cache**: `~/.vex/cache/`
- **Git cache**: `~/.vex/cache/git/`
- **Project builds**: `vex-builds/`
- **Lock file**: `vex.lock`

### Global Directory Structure

```
~/.vex/
├── cache/                    # Package cache
│   ├── git/                  # Cloned repositories
│   │   └── github.com/
│   │       └── user/
│   │           └── repo/
│   └── packages/             # Extracted packages
│
├── sumdb/                    # Checksum database cache
│   └── sum.vex-lang.org/
│
├── bin/                      # Global binaries (vex install)
│   ├── vex-fmt
│   └── vex-lint
│
└── env                       # Environment config
```

### Build Profiles

Configure optimization levels and flags:

```json
{
  "profiles": {
    "debug": {
      "opt-level": 0,
      "debug": true
    },
    "release": {
      "opt-level": 3,
      "lto": true
    }
  }
}
```

### Native Library Integration

Link with system libraries:

```json
{
  "native": {
    "libs": ["ssl", "crypto", "z"],
    "include": ["/usr/local/include"],
    "flags": ["-O3", "-march=native"]
  }
}
```

---

## Command Reference

| Command                             | Description                      |
| ----------------------------------- | -------------------------------- |
| `vex new <name>`                    | Create new project               |
| `vex init`                          | Initialize in existing directory |
| `vex add <pkg>`                     | Add dependency                   |
| `vex remove <pkg>`                  | Remove dependency                |
| `vex list`                          | List dependencies                |
| `vex update`                        | Update dependencies              |
| `vex clean`                         | Clean cache                      |
| `vex build`                         | Build project                    |
| `vex run`                           | Run project                      |
| `vex test`                          | Run tests                        |
| `vex check`                         | Check syntax                     |
| `vex format`                        | Format code                      |
| `vex mod tidy`                      | Tidy dependencies                |
| `vex mod verify`                    | Verify checksums                 |
| `vex mod download`                  | Download dependencies            |
| `vex mod graph`                     | Show dependency tree             |
| `vex mod why <pkg>`                 | Explain dependency               |
| `vex workspace init`                | Initialize workspace             |
| `vex workspace add <path>`          | Add workspace member             |
| `vex workspace remove <path>`       | Remove workspace member          |
| `vex workspace list`                | List workspace members           |
| `vex workspace sync`                | Sync all members                 |
| `vex workspace replace <from> <to>` | Add replace directive            |
| `vex env`                           | Show environment config          |

---

**Previous**: [18_Raw_Pointers_and_FFI.md](./18_Raw_Pointers_and_FFI.md)

**Maintained by**: Vex Language Team
