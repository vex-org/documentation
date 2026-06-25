---
layout: doc
title: Design Examples
---

# VexHDL Design Examples

This document provides complete, production-grade, and compiler-verified VexHDL design examples for common hardware components.

---

## 1. FIFO (First-In, First-Out) Buffer

A synchronous FIFO buffer with status flags (`full`, `empty`) and word count tracker:

```vexhdl
export graph fifo #(
    DATA_WIDTH: Param<U32> = 8,
    DEPTH: Param<U32> = 16,
)(
    clk: In,
    rst: In,
    wr_en: In,
    rd_en: In,
    data_in: In<U<DATA_WIDTH>>,
    data_out: Out<U<DATA_WIDTH>>,
    full: Out,
    empty: Out,
    count: Out<U<8>>,
) {
    // 1. Declare RAM array of registers
    let! mem: [U<DATA_WIDTH>; DEPTH] = {DEPTH{0}};

    // 2. Read/Write pointers
    let! wr_ptr: U<4> = 0;
    let! rd_ptr: U<4> = 0;
    let! r_count: U<5> = 0;

    on(PosEdge(clk), PosEdge(rst)) {
        if rst {
            wr_ptr  <- 0;
            rd_ptr  <- 0;
            r_count <- 0;
        } else {
            // Write sequence
            if (wr_en && (r_count < DEPTH)) {
                mem[wr_ptr] <- data_in;
                wr_ptr      <- wr_ptr + 1;
            }
            // Read sequence
            if (rd_en && (r_count > 0)) {
                rd_ptr <- rd_ptr + 1;
            }

            // Track count based on simultaneous read/write
            if (wr_en && !rd_en && (r_count < DEPTH)) {
                r_count <- r_count + 1;
            } else if (!wr_en && rd_en && (r_count > 0)) {
                r_count <- r_count - 1;
            }
        }
    }

    // 3. Drive outputs combinational
    data_out = mem[rd_ptr];
    full     = (r_count == DEPTH);
    empty    = (r_count == 0);
    count    = r_count[4:0]; // Slice 5-bit to 5-bit
}
```

---

## 2. UART TX Controller

A simple UART Transmitter module matching standard baud-rate timing configurations:

```vexhdl
export enum TxState {
    IDLE,
    START_BIT,
    DATA_BITS,
    STOP_BIT,
}

export graph uart_tx #(
    CLK_FREQ: Param<U32> = 50_000_000,
    BAUD_RATE: Param<U32> = 115_200,
)(
    clk: In,
    rst: In,
    tx_start: In,
    tx_data: In<U<8>>,
    tx_active: Out,
    tx_out: Out,
    tx_done: Out,
) {
    param CLKS_PER_BIT: U32 = CLK_FREQ / BAUD_RATE;

    let! state: TxState = TxState::IDLE;
    let! clk_count: U<16> = 0;
    let! bit_index: U<3> = 0;
    let! data_reg: U<8> = 0;
    let! r_tx_out: Bool = true;
    let! r_active: Bool = false;
    let! r_done: Bool = false;

    on(PosEdge(clk), PosEdge(rst)) {
        if rst {
            state     <- TxState::IDLE;
            clk_count <- 0;
            bit_index <- 0;
            r_tx_out  <- true;
            r_active  <- false;
            r_done    <- false;
        } else {
            match (state) {
                TxState::IDLE => {
                    r_tx_out <- true;
                    r_done   <- false;
                    clk_count <- 0;
                    bit_index <- 0;

                    if tx_start {
                        data_reg <- tx_data;
                        r_active <- true;
                        state    <- TxState::START_BIT;
                    } else {
                        r_active <- false;
                    }
                }
                TxState::START_BIT => {
                    r_tx_out <- false; // Start bit is low

                    if (clk_count < CLKS_PER_BIT - 1) {
                        clk_count <- clk_count + 1;
                    } else {
                        clk_count <- 0;
                        state     <- TxState::DATA_BITS;
                    }
                }
                TxState::DATA_BITS => {
                    r_tx_out <- data_reg[bit_index];

                    if (clk_count < CLKS_PER_BIT - 1) {
                        clk_count <- clk_count + 1;
                    } else {
                        clk_count <- 0;
                        if (bit_index < 7) {
                            bit_index <- bit_index + 1;
                        } else {
                            bit_index <- 0;
                            state     <- TxState::STOP_BIT;
                        }
                    }
                }
                TxState::STOP_BIT => {
                    r_tx_out <- true; // Stop bit is high

                    if (clk_count < CLKS_PER_BIT - 1) {
                        clk_count <- clk_count + 1;
                    } else {
                        clk_count <- 0;
                        r_done    <- true;
                        r_active  <- false;
                        state     <- TxState::IDLE;
                    }
                }
            }
        }
    }

    tx_out    = r_tx_out;
    tx_active = r_active;
    tx_done   = r_done;
}
```

---

## 3. AXI-Lite Slave Interface

A basic memory-mapped read/write register bank interfacing with standard processor buses:

```vexhdl
export graph axi_lite_slave #(
    ADDR_WIDTH: Param<U32> = 8,
    DATA_WIDTH: Param<U32> = 32,
)(
    clk: In,
    rst: In,
    // Write Address Channel
    awaddr: In<U<ADDR_WIDTH>>,
    awvalid: In,
    awready: Out,
    // Write Data Channel
    wdata: In<U<DATA_WIDTH>>,
    wvalid: In,
    wready: Out,
    // Write Response Channel
    bvalid: Out,
    bready: In,
    // Read Address Channel
    araddr: In<U<ADDR_WIDTH>>,
    arvalid: In,
    arready: Out,
    // Read Data Channel
    rdata: Out<U<DATA_WIDTH>>,
    rvalid: Out,
    rready: In,
) {
    // 4 general-purpose registers
    let! reg0: U<DATA_WIDTH> = 0;
    let! reg1: U<DATA_WIDTH> = 0;
    let! reg2: U<DATA_WIDTH> = 0;
    let! reg3: U<DATA_WIDTH> = 0;

    let! r_awready: Bool = false;
    let! r_wready: Bool = false;
    let! r_bvalid: Bool = false;
    let! r_arready: Bool = false;
    let! r_rvalid: Bool = false;
    let! r_rdata: U<DATA_WIDTH> = 0;

    on(PosEdge(clk), PosEdge(rst)) {
        if rst {
            reg0      <- 0;
            reg1      <- 0;
            reg2      <- 0;
            reg3      <- 0;
            r_awready <- false;
            r_wready  <- false;
            r_bvalid  <- false;
            r_arready <- false;
            r_rvalid  <- false;
            r_rdata   <- 0;
        } else {
            // Write handshake
            if (awvalid && wvalid && !r_awready && !r_wready) {
                r_awready <- true;
                r_wready  <- true;

                // Write to selected register (lower 4 addresses)
                case (awaddr[3:2]) {
                    2'b00   => reg0 <- wdata;
                    2'b01   => reg1 <- wdata;
                    2'b10   => reg2 <- wdata;
                    2'b11   => reg3 <- wdata;
                    default => {}
                }
            } else {
                r_awready <- false;
                r_wready  <- false;
            }

            // Write response
            if (awvalid && wvalid && !r_bvalid) {
                r_bvalid <- true;
            } else if (bready && r_bvalid) {
                r_bvalid <- false;
            }

            // Read handshake
            if (arvalid && !r_arready) {
                r_arready <- true;
                r_rvalid  <- true;

                case (araddr[3:2]) {
                    2'b00   => r_rdata <- reg0;
                    2'b01   => r_rdata <- reg1;
                    2'b10   => r_rdata <- reg2;
                    2'b11   => r_rdata <- reg3;
                    default => r_rdata <- 0;
                }
            } else {
                r_arready <- false;
            }

            if (rready && r_rvalid) {
                r_rvalid <- false;
            }
        }
    }

    awready = r_awready;
    wready  = r_wready;
    bvalid  = r_bvalid;
    arready = r_arready;
    rdata   = r_rdata;
    rvalid  = r_rvalid;
}
```
