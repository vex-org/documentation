# Platform Support

Vex runs on macOS, Linux, FreeBSD, and experimentally on Windows. This page describes platform-specific behavior, requirements, and limitations.

## Platform Matrix

| Platform    | Architecture          | Status       | Notes                                                  |
| ----------- | --------------------- | ------------ | ------------------------------------------------------ |
| **macOS**   | ARM64 (Apple Silicon) | Production   | Primary development target                             |
| **macOS**   | x86_64 (Intel)        | Production   | Full support                                           |
| **Linux**   | x86_64                | Production   | glibc 2.17+ or musl                                    |
| **Linux**   | ARM64 (aarch64)       | Production   | Raspberry Pi 4+, AWS Graviton                          |
| **FreeBSD** | x86_64                | Beta         | kqueue poller, some syscall differences                |
| **Windows** | x86_64                | Beta         | MSVC toolchain, IOCP poller, path handling differences |
| **WASM**    | wasm32                | Experimental | Browser playground, limited stdlib                     |

## macOS

### Requirements

- macOS 12 (Monterey) or later
- Xcode Command Line Tools (`xcode-select --install`)
- Optional: Homebrew for LLVM development

### Installation

```bash
# Download prebuilt binary
curl -LO https://github.com/meftunca/vex/releases/latest/download/vex-macos-arm64.tar.gz
tar xzf vex-macos-arm64.tar.gz
sudo cp vex /usr/local/bin/

# Or build from source
git clone https://github.com/meftunca/vex
cd vex
cargo build --release
```

### Platform-Specific Features

- **Metal GPU backend:** Native Apple GPU support for `graph fn`
- **CoreML backend:** Apple Neural Engine for ML inference
- **kqueue poller:** Native async I/O event notification
- **Grand Central Dispatch:** Optional GCD-backed scheduler
- **Code signing:** Not required for development; required for distribution

### Known Limitations

- iOS support is not yet available (requires交叉编译 toolchain)
- Some syscall numbers differ between ARM64 and x86_64

## Linux

### Requirements

- Kernel 4.15+ (for io_uring support)
- glibc 2.17+ or musl 1.2+
- Optional: CUDA Toolkit for GPU, ROCm for AMD GPU

### Installation

```bash
# Debian/Ubuntu
wget https://github.com/meftunca/vex/releases/latest/download/vex-linux-x86_64.deb
sudo dpkg -i vex-linux-x86_64.deb

# Or download tarball
curl -LO https://github.com/meftunca/vex/releases/latest/download/vex-linux-x86_64.tar.gz
tar xzf vex-linux-x86_64.tar.gz
sudo cp vex /usr/local/bin/
```

### Platform-Specific Features

- **epoll poller:** High-performance async I/O (default)
- **io_uring poller:** Next-gen async I/O on kernel 5.1+
- **CUDA backend:** NVIDIA GPU support
- **ROCm backend:** AMD GPU support
- **Vulkan backend:** Cross-vendor GPU compute
- **OpenVINO backend:** Intel accelerator support

### musl Support

Statically linked binaries using musl libc:

```bash
vex compile --target x86_64-unknown-linux-musl main.vx
# Produces a fully static binary with no runtime dependencies
```

## FreeBSD

### Requirements

- FreeBSD 13.0 or later

### Platform-Specific Features

- **kqueue poller:** Native async I/O
- **Capsicum:** Optional capability-based sandboxing

### Known Limitations

- CUDA/ROCm not tested on FreeBSD
- Some syscalls differ from Linux (documented in platform layer)
- Binary compatibility is limited to same FreeBSD major version

### Building from Source

```bash
git clone https://github.com/meftunca/vex
cd vex
cargo build --release
# Runtime builds with clang from ports/pkg
```

## Windows

### Requirements

- Windows 10 (build 1809+) or Windows Server 2019+
- Visual Studio Build Tools 2022 (for MSVC linker) or MinGW-w64
- Windows SDK 10.0.19041+

### Installation (MSVC)

```powershell
# Download prebuilt
Invoke-WebRequest -Uri "https://github.com/meftunca/vex/releases/latest/download/vex-windows-x86_64.zip" -OutFile vex.zip
Expand-Archive vex.zip -DestinationPath C:\vex
# Add C:\vex to PATH
```

### Platform-Specific Features

- **IOCP (I/O Completion Ports):** Async I/O backend
- **MSVC toolchain:** Primary Windows target (link.exe)
- **MinGW-w64:** Alternative GCC-based toolchain

### Known Limitations

- Path handling: Uses `\\` or `/` (both accepted, `/` recommended for portability)
- Fork is not available (`vex.Process` uses CreateProcess)
- Some sys module functions have different behavior
- Signal handling differs from POSIX
- GPU backends: CUDA supported, Metal and CoreML not available

### Path Conventions

```vex
// Cross-platform path construction
let config = Path.join(baseDir, "config.toml")     // Uses / or \\ per platform
let home = Path.home()                              // /home/user or C:\\Users\\user

// Always use Path module, never hardcode separators
// CORRECT:
let path = Path.join("data", "output.json")
// WRONG:
let path = "data/output.json"    // won't work on Windows
```

## WASM (WebAssembly)

Experimental target for browser playground.

### Limitations

- No filesystem access (use virtual FS in playground)
- No networking (use browser APIs)
- Limited to single-threaded execution
- stdlib is a subset (no `vex.Process`, no `io` beyond console)

```bash
vex compile --target wasm32-unknown-unknown main.vx
# Produces main.wasm for browser loading
```

## Detecting Platform at Compile Time

```vex
#if target_os == "macos"
    fn getDataDir(): string { return "~/Library/Application Support/myapp" }
#elif target_os == "linux"
    fn getDataDir(): string { return "~/.local/share/myapp" }
#elif target_os == "windows"
    fn getDataDir(): string { return Path.join(env("APPDATA").unwrap(), "myapp") }
#else
    #error("Unsupported platform")
#endif
```

## Detecting Platform at Runtime

```vex
import * as sys from "sys"

fn getPlatformInfo(): string {
    let os = sys.os()           // "macos", "linux", "freebsd", "windows"
    let arch = sys.arch()       // "x86_64", "arm64"
    let cores = sys.cpuCount()
    return f"{os}-{arch} ({cores} cores)"
}
```

## Best Practices

1. Use the `Path` module for all path operations -- never hardcode `/` or `\\`.
2. Use `#if target_os` for platform-specific code rather than runtime checks.
3. Test on all target platforms in CI (GitHub Actions supports macOS, Linux, Windows).
4. Use `sys.os()` for logging and diagnostics, not for core logic -- prefer compile-time dispatch.
5. When using `extern "C"`, check that the C library is available on all target platforms.
6. For GPU code, provide a CPU fallback path for platforms without GPU support.
