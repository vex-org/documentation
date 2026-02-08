# Workspace Management

**Version:** 0.1.0
**Last Updated:** November 2025

This document describes the workspace mechanism in Vex, designed to facilitate the management of multiple related packages within a single repository (monorepo) or for local development of interdependent packages.

---

## Table of Contents

1. [Overview](#overview)
2. [Workspace Configuration (vex.workspace)](#workspace-configuration-vexworkspace)
3. [Directory Structure](#directory-structure)
4. [Dependency Resolution](#dependency-resolution)
5. [Build Artifacts](#build-artifacts)
6. [CLI Behavior](#cli-behavior)

---

## Overview

A **Workspace** is a collection of one or more Vex packages that share:

1.  **Dependency Resolution**: A single `vex.lock` file at the workspace root ensures all packages use compatible versions of shared dependencies.
2.  **Build Directory**: A shared `vex-builds` directory to avoid redundant compilations and save disk space.
3.  **Configuration**: Shared profiles and compiler settings.

This system is inspired by Rust's Cargo Workspaces and Go's Multi-Module Workspaces.

### Key Benefits

-   **Monorepo Support**: Easily manage large projects split into multiple libraries and binaries.
-   **Local Development**: Simultaneously develop a library and an application that uses it without publishing intermediate versions.
-   **Unified Tooling**: Run tests across all packages with a single command.

---

## Workspace Configuration (vex.workspace)

A workspace is defined by a `vex.workspace` file at the root of the directory structure. This file is in JSON format, consistent with `vex.json`.

### File Format

```json
{
  "workspace": {
    "members": [
      "core",
      "net",
      "cli",
      "tools/*"
    ],
    "exclude": [
      "tools/experimental"
    ],
    "default-members": [
      "cli"
    ]
  },
  "profiles": {
    "development": {
      "optimizationLevel": 0
    },
    "release": {
      "optimizationLevel": 3,
      "lto": true
    }
  }
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `members` | array | List of directories or glob patterns containing `vex.json` files. |
| `exclude` | array | List of directories or glob patterns to exclude from the workspace. |
| `default-members` | array | Packages to build/test by default if none are specified. |
| `profiles` | object | Shared build profiles (overrides package-level profiles). |

---

## Directory Structure

A typical workspace layout looks like this:

```
my-monorepo/
├── vex.workspace       # Workspace definition
├── vex.lock            # Unified lock file
├── vex-builds/         # Shared build artifacts
├── core/
│   ├── vex.json        # Package manifest (name: "my-core")
│   └── src/
├── net/
│   ├── vex.json        # Package manifest (name: "my-net")
│   └── src/
└── cli/
    ├── vex.json        # Package manifest (name: "my-cli")
    └── src/
```

In this example:
-   `my-cli` can depend on `my-core` and `my-net`.
-   Since they are in the same workspace, Vex will resolve these dependencies to the local paths automatically, ignoring version requirements in `vex.json` that might point to a registry, provided the local version is compatible.

---

## Dependency Resolution

### Single Lock File

The workspace maintains a single `vex.lock` file at the workspace root. This ensures that if `core` and `net` both depend on `external-lib`, they both use the exact same version of `external-lib`.

### Local Path Overrides

Within a workspace, dependencies between member packages are resolved to their local directory paths.

**Example:**

`cli/vex.json`:
```json
{
  "dependencies": {
    "my-core": "1.0.0"
  }
}
```

If `my-core` is a member of the workspace and its `vex.json` declares `name: "my-core"`, Vex will ignore the registry and link directly to the `core/` directory.

### External Overrides (Patching)

You can override dependencies for the entire workspace using a `patch` section in `vex.workspace`. This is useful for testing against a local fork of an external library.

```json
{
  "patch": {
    "github.com/user/some-lib": {
      "path": "../local-forks/some-lib"
    }
  }
}
```

---

## Build Artifacts

All packages in the workspace output their build artifacts to a single `vex-builds` directory at the workspace root.

```
vex-builds/
├── debug/
│   ├── my-core.a
│   ├── my-net.a
│   └── my-cli      (executable)
└── release/
    └── ...
```

This sharing allows:
-   **Incremental Builds**: If `core` is updated, `cli` only needs to relink, not recompile unchanged dependencies.
-   **Disk Space Efficiency**: Shared dependencies are compiled once.

---

## CLI Behavior

When running `vex` commands inside a workspace:

### `vex build`

-   **Root**: Builds all packages defined in `default-members` (or all members if not specified).
-   **Subdirectory**: If run inside `cli/`, builds only `my-cli` and its dependencies.
-   **Flags**:
    -   `--workspace`: Build all packages in the workspace.
    -   `--package <name>` / `-p <name>`: Build a specific package.
    -   `--exclude <name>`: Exclude a package from the build.

### `vex test`

-   **Root**: Runs tests for all workspace members.
-   **Subdirectory**: Runs tests for the current package.
-   **Flags**:
    -   `--workspace`: Test all packages.

### `vex run`

-   Must specify which binary to run if there are multiple.
-   `vex run -p my-cli`

### `vex new`

-   `vex new lib my-lib`: Creates a new package directory and adds it to `vex.workspace` members automatically if created inside a workspace root.

---

## Best Practices

1.  **Shared Configuration**: Put common compiler flags and profiles in `vex.workspace` to ensure consistency.
2.  **CI/CD**: Run `vex test --workspace` in CI to ensure changes in one package don't break others.
3.  **Versioning**: While packages can have independent versions, it's often easier to keep workspace members versioned together (e.g., all at 1.0.0) if they are tightly coupled.
