# Vex Home Directory Structure (.vex)

**Version:** 0.1.0
**Last Updated:** November 2025

This document outlines the structure and management of the `.vex` directory (typically located at `~/.vex` or `%USERPROFILE%\.vex`), which serves as the global storage for Vex tools, packages, and build caches.

---

## Table of Contents

1. [Overview](#overview)
2. [Directory Layout](#directory-layout)
3. [Binaries (`bin/`)](#binaries-bin)
4. [Source Code (`src/`)](#source-code-src)
5. [Build Cache (`cache/`)](#build-cache-cache)
6. [Git Cache (`git/`)](#git-cache-git)
7. [Registry Index (`index/`)](#registry-index-index)
8. [Configuration](#configuration)

---

## Overview

The `.vex` directory is the central hub for the Vex ecosystem on a developer's machine. It is designed to:

-   Store globally installed binaries (similar to `$GOPATH/bin` or `~/.cargo/bin`).
-   Cache dependency source code to enable offline builds and deduplication.
-   Cache compiled artifacts to speed up builds across different projects.
-   Manage git repositories efficiently.

---

## Directory Layout

```text
~/.vex/
├── bin/                        # Globally installed executables
├── src/                        # Unpacked source code of dependencies
│   ├── github.com/
│   │   └── user/
│   │       └── repo/
│   │           └── v1.0.0/     # Versioned source tree
│   └── gitlab.com/
├── git/                        # Bare git repositories (download cache)
│   └── github.com/
│       └── user/
│           └── repo.git/       # Bare repo
├── cache/                      # Global build artifacts (ccache style)
│   ├── objects/                # Compiled .o/.a files hashed by content/flags
│   └── downloads/              # Temporary download location
├── index/                      # Registry metadata (if using a central registry)
└── config.json                 # Global user configuration
```

---

## Binaries (`bin/`)

This directory contains compiled executables installed via `vex install`.

-   **Path**: Users should add this directory to their system `PATH`.
-   **Content**: Statically linked binaries (or binaries with RPATH set).
-   **Naming**: Matches the binary name specified in the package's `vex.json`.

**Example:**
```bash
~/.vex/bin/
├── vex-fmt       # Code formatter
├── vex-lsp       # Language server
└── my-cli-tool   # User installed tool
```

---

## Source Code (`src/`)

This directory contains the **checked-out, read-only** source code of dependencies. Vex compiles dependencies directly from here.

### Structure

The structure follows the remote URL pattern to avoid conflicts and ensure uniqueness.

`~/.vex/src/{provider}/{owner}/{repo}/{version}/`

**Example:**
```text
~/.vex/src/
└── github.com/
    └── mapletechnologies/
        └── vex-std/
            ├── v0.1.0/
            │   ├── vex.json
            │   └── src/
            └── v0.2.0/
                ├── vex.json
                └── src/
```

### Versioning Strategy

-   **SemVer**: Directories are named exactly after the resolved version tag (e.g., `v1.2.3`).
-   **Branches/Commits**: If a dependency points to a specific branch or commit hash, the directory name reflects that (e.g., `master-a1b2c3d`).
-   **Immutability**: Contents inside a version directory are treated as immutable. If `vex` detects modification, it may issue a warning or re-download.

---

## Git Cache (`git/`)

To avoid re-downloading the entire history for every version of the same package, Vex maintains **bare git repositories**.

-   **Purpose**: Acts as a local mirror.
-   **Mechanism**:
    1.  When `github.com/user/repo` is requested, Vex checks `~/.vex/git/github.com/user/repo.git`.
    2.  If missing, it clones as a bare repo.
    3.  If present, it runs `git fetch` to update refs.
    4.  The specific version (tag/commit) is then `git worktree add`ed or `git checkout-index`ed into the target `src/` directory.

This significantly speeds up fetching multiple versions of the same package.

---

## Build Cache (`cache/`)

A global cache for compiled object files, similar to `ccache` or `sccache`.

### Structure

```text
~/.vex/cache/
└── objects/
    ├── ab/
    │   └── ab1234567890abcdef...  (hashed filename)
    └── cd/
        └── ...
```

### Hashing Strategy

The hash key for a cached object is derived from:
1.  Source file content (SHA-256).
2.  Compiler flags and environment variables.
3.  Target architecture and OS.
4.  Vex compiler version.

If a project needs to compile `std/math` v1.0.0 with the default release profile, Vex checks this global cache. If found, it skips compilation, even if it's a different project.

---

## Registry Index (`index/`)

(Planned for future)

Stores metadata about available packages to allow fast searching (`vex search`) and dependency resolution without downloading full git repos.

-   Could be a sparse git checkout (like Cargo) or a local database (SQLite).

---

## Configuration (`config.json`)

Global settings for the Vex toolchain.

```json
{
  "user": {
    "name": "Maple Technologies",
    "email": "dev@mapletechnologies.com"
  },
  "net": {
    "proxy": "",
    "offline": false,
    "git-fetch-with-cli": true
  },
  "build": {
    "jobs": 8,
    "target-dir": "vex-builds"
  },
  "registry": {
    "default": "https://registry.vex-lang.org"
  }
}
```

---

## Maintenance

### `vex clean`

A command to manage the size of `.vex`.

-   `vex clean --cache`: Clears `cache/objects`.
-   `vex clean --src`: Removes unused source directories (garbage collection based on access time).
-   `vex clean --all`: Wipes everything except `bin` and `config.json`.
