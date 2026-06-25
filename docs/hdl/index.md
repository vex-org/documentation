---
layout: doc
title: VexHDL Overview
description: The Modern, Hardware-Safety-First Hardware Description Ecosystem
---

# VexHDL: The Modern, Hardware-Safety-First Hardware Description Ecosystem

VexHDL is a next-generation Hardware Description Language (HDL) and Development Ecosystem designed to replace the verbosity, unsafe paradigms, and poor developer experience (DX) of traditional hardware design (Verilog, VHDL). 

By pairing a Rust-inspired compiler backend (`vex-hdl-compiler`) with a lightweight, glassmorphic desktop IDE (`Vex Studio`), VexHDL delivers compile-time safety checks, a built-in interactive simulator, and automatic board synthesis out of the box.

---

## 🚀 Key Value Propositions (VexHDL vs. Legacy HDLs)

### 1. Compile-Time Safety via V-VUMM (Value & Usage Memory Manager)
Traditional hardware design allows dangerous race conditions and driver conflicts that are only caught during expensive physical hardware runs. VexHDL adapts the memory-safety concepts of software languages (like Rust) to signals:
* **Multiple Driver Protection (`E023`):** Ensures a wire or register is driven by exactly one process or assignment at compile-time.
* **Unintentional Latch Prevention (`W002`):** Statically checks combinational processes to guarantee signals are assigned along all possible execution branches (preventing unwanted storage cells).
* **Clock Domain Crossing Protection (`W004`):** Bidirectionally detects unsynchronized signals moving across different clock frequencies and enforces synchronizers.

### 2. Modern Package & IP Management (`vex-pm`)
No more copying and pasting file lists or manually adjusting simulation paths. `vex-pm` provides Cargo-like package dependency resolution, local and remote IP registries, version locking, and clean modular imports:
```vexhdl
import { uart_tx } from "@std/uart";
```

### 3. Integrated, Zero-Friction Tauri IDE (Vex Studio)
A single, lightweight desktop environment that bundles:
* **Rich Monaco Editor:** Real-time diagnostics, hover values, autocompletions, and structural error checking.
* **Canvas Waveform Viewer:** High-performance signal transition visualizer directly connected to the simulator.
* **Schematic Viewer:** Instantly renders the gate/cell-level design schematic compiled through Yosys.
* **Timing Analyzer:** Highlights worst-slack critical timing paths using SDF delays.

---

## 💻 Code Example: Parameterized Counter

VexHDL provides a clean separation between compile-time generic parameters (`#(...)`) and physical ports, enforcing registers (`let!`) vs. wires (`let`):

```vexhdl
// A parameterized up-counter module
export graph counter #(
    WIDTH: Param<U<32>> = 8, // Compile-time generic parameter
)(
    clk: In,                 // 1-bit input clock
    rst: In,                 // 1-bit input active-high reset
    en: In<Bool>,            // 1-bit input enable signal
    count: Out<U<WIDTH>>,    // Output bus of width 'WIDTH'
) {
    // 1. Declare a sequential register (Flip-Flop)
    let! r_count: U<WIDTH> = 0;

    // 2. Describe the clock-edge-triggered behavior
    // PosEdge(rst) in the trigger list makes the reset ASYNCHRONOUS.
    on(PosEdge(clk), PosEdge(rst)) {
        if rst {
            r_count <- 0;               // Non-blocking assignment (<-)
        } else if en {
            r_count <- r_count + 1;     // Increment
        }
    }

    // 3. Drive output port with continuous combinational assignment
    count = r_count;                    // Blocking assignment (=)
}
```

---

## 🔌 Legacy Interoperability (Verilog & VHDL Transpilers)
You don't need to rewrite your legacy IP blocks. VexHDL supports bidirectional bridging:
* **Extern Imports:** Directly import external modules and route simulations automatically to external runners (Vivado XSim, ModelSim).
* **Code generation targets:** VexHDL compiles down to synthesizable Verilog, VHDL, and gate-level BLIF.

```vexhdl
extern "verilog" from "ip_cores/fifo_mem.v" {
    module fifo_mem #(
        DATA_WIDTH: U32 = 8,
    )(
        clk: Input,
        data_in: Input[DATA_WIDTH],
        data_out: Output[DATA_WIDTH],
    );
}
```

---

## 📈 Commercial & Monetization Model
VexHDL is built with an open-core commercialization roadmap:
* **Community Edition (Free):** Local compiling, package manager, and synthesis utilizing open-source FPGA toolchains (Yosys, nextpnr, openFPGALoader).
* **Pro Edition ($29 - $49/mo):** Cloud-scale simulation, team collaboration, advanced timing analyses, and schematic export features.
* **Enterprise Edition (Custom):** Specialized certification lines (ISO 26262 / DO-254), on-premise deployments, and 24/7 priority support.
* **Tapeout Marketplace:** Automatic integration with chip fabrication pipelines (e.g. TinyTapeout / SkyWater 130nm) with a flat commission per ordered chip.
