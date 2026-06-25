# Project v0.0.0

## Overview

**Structs:** [`Poly1305`](#Poly1305) · [`Fe25519`](#Fe25519) · [`W128`](#W128) · [`ExtPoint`](#ExtPoint) · [`AffPoint`](#AffPoint) · [`Sha512`](#Sha512) · [`Fe25519`](#Fe25519) · [`W128`](#W128) · [`ExtPoint`](#ExtPoint) · [`AffPoint`](#AffPoint) · [`Sha1`](#Sha1) · [`Sha256`](#Sha256)

**Contracts:** [`Digest32`](#Digest32) · [`Mac32`](#Mac32)

**Functions:** [`pbkdf2Sha256`](#pbkdf2Sha256) · [`pbkdf2Sha256Hex`](#pbkdf2Sha256Hex) · [`hexChar`](#hexChar) · [`fromHexNibble`](#fromHexNibble) · [`hexEncode`](#hexEncode) · [`hexDecodeTo`](#hexDecodeTo) · [`hkdfExtract`](#hkdfExtract) · [`hkdfExpand`](#hkdfExpand) · [`hkdf`](#hkdf) · [`storeLe64`](#storeLe64) · [`storeBe64`](#storeBe64) · [`p1305LoadLe32`](#p1305LoadLe32) · [`newPoly1305`](#newPoly1305) · [`poly1305Auth`](#poly1305Auth) · [`rotl32`](#rotl32) · [`loadLe32`](#loadLe32) · [`storeLe32`](#storeLe32) · [`quarterRound`](#quarterRound) · [`chacha20Block`](#chacha20Block) · [`chacha20Xor`](#chacha20Xor) · [`feLoadLe64`](#feLoadLe64) · [`feZero`](#feZero) · [`feOne`](#feOne) · [`feCopy`](#feCopy) · [`feFromBytes`](#feFromBytes) · [`feToBytes`](#feToBytes) · [`feCarryPropagate`](#feCarryPropagate) · [`feReduce`](#feReduce) · [`feAdd`](#feAdd) · [`feSub`](#feSub) · [`mulAdd`](#mulAdd) · [`feMul`](#feMul) · [`feSq`](#feSq) · [`feSqN`](#feSqN) · [`feInvert`](#feInvert) · [`feCSwap`](#feCSwap) · [`pointIdentity`](#pointIdentity) · [`edD`](#edD) · [`ed2D`](#ed2D) · [`affIdentity`](#affIdentity) · [`affBasepoint`](#affBasepoint) · [`affAdd`](#affAdd) · [`affScalarMul`](#affScalarMul) · [`feCopyAff`](#feCopyAff) · [`affEncode`](#affEncode) · [`feEq`](#feEq) · [`fePowConst`](#fePowConst) · [`feSqrtM1`](#feSqrtM1) · [`feSqrtRatio`](#feSqrtRatio) · [`scalarLessThanL`](#scalarLessThanL) · [`affDecodeCompressed`](#affDecodeCompressed) · [`affToExt`](#affToExt) · [`pointDouble`](#pointDouble) · [`pointAdd`](#pointAdd) · [`scalarMul`](#scalarMul) · [`pointEncode`](#pointEncode) · [`basepointExt`](#basepointExt) · [`scalarL`](#scalarL) · [`cmpLeNum`](#cmpLeNum) · [`subLeInPlace`](#subLeInPlace) · [`reduceModL64`](#reduceModL64) · [`mulScalar32`](#mulScalar32) · [`scMulAdd`](#scMulAdd) · [`scReduce`](#scReduce) · [`ed25519PublicKey`](#ed25519PublicKey) · [`ed25519Sign`](#ed25519Sign) · [`ed25519SignHex`](#ed25519SignHex) · [`ed25519Verify`](#ed25519Verify) · [`ed25519PublicKeyHex`](#ed25519PublicKeyHex) · [`ed25519BasepointHex`](#ed25519BasepointHex) · [`ed25519MulBaseHex`](#ed25519MulBaseHex) · [`ctEq`](#ctEq) · [`xorInto`](#xorInto) · [`xorInPlace`](#xorInPlace) · [`zeroize`](#zeroize) · [`hmacSha256To`](#hmacSha256To) · [`hmacSha256Hex`](#hmacSha256Hex) · [`hmacVerifySha256Hex`](#hmacVerifySha256Hex) · [`rotr64`](#rotr64) · [`loadLe64`](#loadLe64) · [`storeLe64`](#storeLe64) · [`ivAt`](#ivAt) · [`sigmaRow`](#sigmaRow) · [`g`](#g) · [`compress`](#compress) · [`blake2bTo`](#blake2bTo) · [`blake2bHex`](#blake2bHex) · [`loadLe64`](#loadLe64) · [`low32`](#low32) · [`rotr64`](#rotr64) · [`add64`](#add64) · [`blamka`](#blamka) · [`storeLe64`](#storeLe64) · [`storeLe32`](#storeLe32) · [`roundedMemoryKiB`](#roundedMemoryKiB) · [`validParams`](#validParams) · [`hash2ToLen`](#hash2ToLen) · [`hPrimeTo`](#hPrimeTo) · [`blockOffset`](#blockOffset) · [`gbMix`](#gbMix) · [`pPermute128`](#pPermute128) · [`roundBlockInPlace`](#roundBlockInPlace) · [`fillBlock`](#fillBlock) · [`gCompress1024`](#gCompress1024) · [`nextAddressBlock`](#nextAddressBlock) · [`selectRefIndex`](#selectRefIndex) · [`seedInitBlock`](#seedInitBlock) · [`argon2DeriveVariant`](#argon2DeriveVariant) · [`argon2DeriveVariantEx`](#argon2DeriveVariantEx) · [`argon2idDerive`](#argon2idDerive) · [`argon2idDeriveEx`](#argon2idDeriveEx) · [`argon2iDerive`](#argon2iDerive) · [`argon2iDeriveEx`](#argon2iDeriveEx) · [`argon2dDerive`](#argon2dDerive) · [`argon2dDeriveEx`](#argon2dDeriveEx) · [`x25519`](#x25519) · [`x25519Basepoint`](#x25519Basepoint) · [`x25519Hex`](#x25519Hex) · [`xor16`](#xor16) · [`rightShift1`](#rightShift1) · [`ghashMul`](#ghashMul) · [`ghashUpdate`](#ghashUpdate) · [`ghashAll`](#ghashAll) · [`aesGcmEncrypt`](#aesGcmEncrypt) · [`aesGcmDecrypt`](#aesGcmDecrypt) · [`rotr64`](#rotr64) · [`ch512`](#ch512) · [`maj512`](#maj512) · [`bsig0_512`](#bsig0_512) · [`bsig1_512`](#bsig1_512) · [`ssig0_512`](#ssig0_512) · [`ssig1_512`](#ssig1_512) · [`k512`](#k512) · [`sha512Hex`](#sha512Hex) · [`sha512To`](#sha512To) · [`b64At`](#b64At) · [`base64Encode`](#base64Encode) · [`base64EncodeString`](#base64EncodeString) · [`main`](#main) · [`computeAeadTag`](#computeAeadTag) · [`aeadEncrypt`](#aeadEncrypt) · [`aeadDecrypt`](#aeadDecrypt) · [`feLoadLe64`](#feLoadLe64) · [`feZero`](#feZero) · [`feOne`](#feOne) · [`feCopy`](#feCopy) · [`feFromBytes`](#feFromBytes) · [`feToBytes`](#feToBytes) · [`feCarryPropagate`](#feCarryPropagate) · [`feReduce`](#feReduce) · [`feAdd`](#feAdd) · [`feSub`](#feSub) · [`mulAdd`](#mulAdd) · [`feMul`](#feMul) · [`feSq`](#feSq) · [`feSqN`](#feSqN) · [`feInvert`](#feInvert) · [`feCSwap`](#feCSwap) · [`xtime`](#xtime) · [`gfMul8`](#gfMul8) · [`gfPow8`](#gfPow8) · [`rotl8`](#rotl8) · [`sboxByte`](#sboxByte) · [`addRoundKey`](#addRoundKey) · [`subBytes`](#subBytes) · [`shiftRows`](#shiftRows) · [`mixColumns`](#mixColumns) · [`rconAt`](#rconAt) · [`keyExpand256`](#keyExpand256) · [`aes256EncryptBlock`](#aes256EncryptBlock) · [`inc32be`](#inc32be) · [`aes256CtrXor`](#aes256CtrXor) · [`xorBlocks`](#xorBlocks) · [`addU32Blocks`](#addU32Blocks) · [`rotrU32Blocks`](#rotrU32Blocks) · [`pointIdentity`](#pointIdentity) · [`edD`](#edD) · [`ed2D`](#ed2D) · [`affIdentity`](#affIdentity) · [`affBasepoint`](#affBasepoint) · [`affAdd`](#affAdd) · [`affScalarMul`](#affScalarMul) · [`feCopyAff`](#feCopyAff) · [`affEncode`](#affEncode) · [`feEq`](#feEq) · [`fePowConst`](#fePowConst) · [`feSqrtM1`](#feSqrtM1) · [`feSqrtRatio`](#feSqrtRatio) · [`scalarLessThanL`](#scalarLessThanL) · [`affDecodeCompressed`](#affDecodeCompressed) · [`affToExt`](#affToExt) · [`pointDouble`](#pointDouble) · [`pointAdd`](#pointAdd) · [`scalarMul`](#scalarMul) · [`pointEncode`](#pointEncode) · [`basepointExt`](#basepointExt) · [`scalarL`](#scalarL) · [`cmpLeNum`](#cmpLeNum) · [`subLeInPlace`](#subLeInPlace) · [`reduceModL64`](#reduceModL64) · [`mulScalar32`](#mulScalar32) · [`scMulAdd`](#scMulAdd) · [`scReduce`](#scReduce) · [`ed25519PublicKey`](#ed25519PublicKey) · [`ed25519Sign`](#ed25519Sign) · [`ed25519SignHex`](#ed25519SignHex) · [`ed25519Verify`](#ed25519Verify) · [`ed25519PublicKeyHex`](#ed25519PublicKeyHex) · [`ed25519BasepointHex`](#ed25519BasepointHex) · [`ed25519MulBaseHex`](#ed25519MulBaseHex) · [`rol32`](#rol32) · [`newSha1`](#newSha1) · [`sha1To`](#sha1To) · [`sha1Hex`](#sha1Hex) · [`rotr32`](#rotr32) · [`ch`](#ch) · [`maj`](#maj) · [`bsig0`](#bsig0) · [`bsig1`](#bsig1) · [`ssig0`](#ssig0) · [`ssig1`](#ssig1) · [`k256`](#k256) · [`newSha256`](#newSha256) · [`sha256To`](#sha256To) · [`sha256Hex`](#sha256Hex)

**Constants:** [`shiftLe`](#shiftLe) · [`shiftBe`](#shiftBe) · [`MASK32`](#MASK32) · [`MASK64`](#MASK64) · [`ARGON2D_VARIANT`](#ARGON2D_VARIANT) · [`ARGON2I_VARIANT`](#ARGON2I_VARIANT) · [`ARGON2ID_VARIANT`](#ARGON2ID_VARIANT) · [`ARGON2_VERSION_13`](#ARGON2_VERSION_13) · [`ARGON2_BLOCK_BYTES`](#ARGON2_BLOCK_BYTES)

## Constants

### <a id="shiftLe"></a>`shiftLe`

&gt; 📄 `utils.vx` L2-2

```vex
const shiftLe: [u8;8]=[0,8,16,24,32,40,48,56];
```

**Returns:** `[u8;8]=[0,8,16,24,32,40,48,56];`

---

### <a id="shiftBe"></a>`shiftBe`

&gt; 📄 `utils.vx` L3-3

```vex
const shiftBe: [u8;8]=[56,48,40,32,24,16,8,0];
```

**Returns:** `[u8;8]=[56,48,40,32,24,16,8,0];`

---

### <a id="MASK32"></a>`MASK32`

&gt; 📄 `argon2id.vx` L8-8

```vex
const MASK32: u64=0xffffffff;
```

**Returns:** `u64=0xffffffff;`

---

### <a id="MASK64"></a>`MASK64`

&gt; 📄 `argon2id.vx` L9-9

```vex
const MASK64: u64=0xffffffffffffffff;
```

**Returns:** `u64=0xffffffffffffffff;`

---

### <a id="ARGON2D_VARIANT"></a>`ARGON2D_VARIANT`

&gt; 📄 `argon2id.vx` L182-182

```vex
const ARGON2D_VARIANT: u8=0;
```

**Returns:** `u8=0;`

---

### <a id="ARGON2I_VARIANT"></a>`ARGON2I_VARIANT`

&gt; 📄 `argon2id.vx` L183-183

```vex
const ARGON2I_VARIANT: u8=1;
```

**Returns:** `u8=1;`

---

### <a id="ARGON2ID_VARIANT"></a>`ARGON2ID_VARIANT`

&gt; 📄 `argon2id.vx` L184-184

```vex
const ARGON2ID_VARIANT: u8=2;
```

**Returns:** `u8=2;`

---

### <a id="ARGON2_VERSION_13"></a>`ARGON2_VERSION_13`

&gt; 📄 `argon2id.vx` L185-185

```vex
const ARGON2_VERSION_13: u64=0x13;
```

**Returns:** `u64=0x13;`

---

### <a id="ARGON2_BLOCK_BYTES"></a>`ARGON2_BLOCK_BYTES`

&gt; 📄 `argon2id.vx` L186-186

```vex
const ARGON2_BLOCK_BYTES: i64=1024;
```

**Returns:** `i64=1024;`

---

## Contracts

### <a id="Digest32"></a>`Digest32`

&gt; 📄 `contracts.vx` L3-8

```vex
contract Digest32
```

**Implements:** `Digest32.unknown` & `Digest32.unknown` & `Digest32.unknown` & `Digest32.unknown`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `unknown`[↗](#Digest32.unknown) | `fn unknown()` |  |
| `unknown`[↗](#Digest32.unknown) | `fn unknown(data: str)` |  |
| `unknown`[↗](#Digest32.unknown) | `fn unknown(data: RawBuf, len: u64)` |  |
| `unknown`[↗](#Digest32.unknown) | `fn unknown(out: *u8, out_len: u64)` |  |

---

### <a id="Mac32"></a>`Mac32`

&gt; 📄 `contracts.vx` L10-15

```vex
contract Mac32
```

**Implements:** `Mac32.unknown` & `Mac32.unknown` & `Mac32.unknown` & `Mac32.unknown`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `unknown`[↗](#Mac32.unknown) | `fn unknown()` |  |
| `unknown`[↗](#Mac32.unknown) | `fn unknown(data: str)` |  |
| `unknown`[↗](#Mac32.unknown) | `fn unknown(data: RawBuf, len: u64)` |  |
| `unknown`[↗](#Mac32.unknown) | `fn unknown(out: *u8, out_len: u64)` |  |

---

## Structs

### <a id="Poly1305"></a>`Poly1305` `🔓 export`

&gt; 📄 `poly1305.vx` L14-22

```vex
export struct Poly1305
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `r` | `[u32; 5]` | 🔒 private |  |
| `rs` | `[u32; 4]` | 🔒 private |  |
| `h` | `[u32; 5]` | 🔒 private |  |
| `pad` | `[u32; 4]` | 🔒 private |  |
| `buf` | `[u8; 16]` | 🔒 private |  |
| `buf_len` | `usize` | 🔒 private |  |
| `finalized` | `bool` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Poly1305.new`[↗](#Poly1305.new) | `export fn Poly1305.new(key: RawBuf, key_len: usize` |  |
| `update`[↗](#Poly1305.update) | `export fn (self: &Poly1305!) update(data: RawBuf, ` |  |
| `processBlock`[↗](#Poly1305.processBlock) | `fn (self: &Poly1305!) processBlock(hibit: u32)` |  |
| `finalize`[↗](#Poly1305.finalize) | `export fn (self: &Poly1305!) finalize(): [u8; 16]` |  |

---

### <a id="Fe25519"></a>`Fe25519` `🔓 export`

&gt; 📄 `field25519.vx` L19-22

```vex
export struct Fe25519
```

Field element in 5x51-bit limbs

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `l` | `[u64; 5]` | 🔓 public |  |

---

### <a id="W128"></a>`W128`

&gt; 📄 `field25519.vx` L195-199

```vex
struct W128
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `lo` | `u64` | 🔓 public |  |
| `hi` | `u64` | 🔓 public |  |

---

### <a id="ExtPoint"></a>`ExtPoint`

&gt; 📄 `ed25519.vx` L13-19

```vex
struct ExtPoint
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `x` | `Fe25519` | 🔓 public |  |
| `y` | `Fe25519` | 🔓 public |  |
| `z` | `Fe25519` | 🔓 public |  |
| `t` | `Fe25519` | 🔓 public |  |

---

### <a id="AffPoint"></a>`AffPoint`

&gt; 📄 `ed25519.vx` L53-57

```vex
struct AffPoint
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `x` | `Fe25519` | 🔓 public |  |
| `y` | `Fe25519` | 🔓 public |  |

---

### <a id="Sha512"></a>`Sha512` `🔓 export`

&gt; 📄 `sha512.vx` L119-125

```vex
export struct Sha512
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `h` | `[u64; 8]` | 🔓 public |  |
| `buf` | `[u8; 128]` | 🔓 public |  |
| `bufLen` | `u64` | 🔓 public |  |
| `totalLen` | `u64` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `init`[↗](#Sha512.init) | `export fn (self: &Sha512!) init()` |  |
| `processBlock512`[↗](#Sha512.processBlock512) | `fn (self: &Sha512!) processBlock512(block: RawBuf)` |  |
| `update512`[↗](#Sha512.update512) | `export fn (self: &Sha512!) update512(data: str)` |  |
| `updateRaw512`[↗](#Sha512.updateRaw512) | `export fn (self: &Sha512!) updateRaw512(data: RawB` |  |
| `sum512`[↗](#Sha512.sum512) | `export fn (self: &Sha512!) sum512(out: *u8, outLen` |  |

---

### <a id="Fe25519"></a>`Fe25519` `🔓 export`

&gt; 📄 `old_field.vx` L19-22

```vex
export struct Fe25519
```

Field element in 5x51-bit limbs

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `l` | `[u64; 5]` | 🔓 public |  |

---

### <a id="W128"></a>`W128`

&gt; 📄 `old_field.vx` L181-185

```vex
struct W128
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `lo` | `u64` | 🔓 public |  |
| `hi` | `u64` | 🔓 public |  |

---

### <a id="ExtPoint"></a>`ExtPoint`

&gt; 📄 `old_ed.vx` L13-19

```vex
struct ExtPoint
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `x` | `Fe25519` | 🔓 public |  |
| `y` | `Fe25519` | 🔓 public |  |
| `z` | `Fe25519` | 🔓 public |  |
| `t` | `Fe25519` | 🔓 public |  |

---

### <a id="AffPoint"></a>`AffPoint`

&gt; 📄 `old_ed.vx` L55-59

```vex
struct AffPoint
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `x` | `Fe25519` | 🔓 public |  |
| `y` | `Fe25519` | 🔓 public |  |

---

### <a id="Sha1"></a>`Sha1` `🔓 export`

&gt; 📄 `sha1.vx` L7-12

```vex
export struct Sha1
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `h` | `[u32; 5]` | 🔒 private |  |
| `buf` | `[u8; 64]` | 🔒 private |  |
| `bufLen` | `u64` | 🔒 private |  |
| `totalLen` | `u64` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Sha1.new`[↗](#Sha1.new) | `export fn Sha1.new(): Sha1` |  |
| `processBlock`[↗](#Sha1.processBlock) | `fn (self: &Sha1!) processBlock(block: RawBuf)` |  |
| `reset`[↗](#Sha1.reset) | `export fn (self: &Sha1!) reset()` |  |
| `update`[↗](#Sha1.update) | `export fn (self: &Sha1!) update(data: str)` |  |
| `updateRaw`[↗](#Sha1.updateRaw) | `export fn (self: &Sha1!) updateRaw(data: RawBuf, l` |  |
| `sum`[↗](#Sha1.sum) | `export fn (self: &Sha1!) sum(out: *u8, out_len: u6` |  |

---

### <a id="Sha256"></a>`Sha256` `🔓 export`

&gt; 📄 `sha256.vx` L69-74

```vex
export struct Sha256
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `h` | `[u32; 8]` | 🔒 private |  |
| `buf` | `[u8; 64]` | 🔒 private |  |
| `bufLen` | `u64` | 🔒 private |  |
| `totalLen` | `u64` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Sha256.new`[↗](#Sha256.new) | `export fn Sha256.new(): Sha256` |  |
| `processBlock`[↗](#Sha256.processBlock) | `fn (self: &Sha256!) processBlock(block: RawBuf)` |  |
| `reset`[↗](#Sha256.reset) | `export fn (self: &Sha256!) reset()` |  |
| `update`[↗](#Sha256.update) | `export fn (self: &Sha256!) update(data: str)` |  |
| `updateRaw`[↗](#Sha256.updateRaw) | `export fn (self: &Sha256!) updateRaw(data: RawBuf,` |  |
| `sum`[↗](#Sha256.sum) | `export fn (self: &Sha256!) sum(out: *u8, out_len: ` |  |

---

## Functions

### <a id="pbkdf2Sha256"></a>`pbkdf2Sha256` `🔓 export`

&gt; 📄 `pbkdf2.vx` L8-87

```vex
export fn pbkdf2Sha256(password: RawBuf, pwdLen: u64, salt: RawBuf, saltLen: u64, iterations: u64, out: RawBuf, outLen: u64)
```

PBKDF2 with HMAC-SHA256 as PRF.

Password and salt are raw buffers, iterations &gt;= 1, output written to `out`.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `password` | `RawBuf` |  |
| `pwdLen` | `u64` |  |
| `salt` | `RawBuf` |  |
| `saltLen` | `u64` |  |
| `iterations` | `u64` |  |
| `out` | `RawBuf` |  |
| `outLen` | `u64` |  |

---

### <a id="pbkdf2Sha256Hex"></a>`pbkdf2Sha256Hex` `🔓 export`

&gt; 📄 `pbkdf2.vx` L90-103

```vex
export fn pbkdf2Sha256Hex(password: str, salt: str, iterations: u64, dkLen: u64): string
```

Convenience: PBKDF2-SHA256 with string inputs, returns hex-encoded output.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `password` | `str` |  |
| `salt` | `str` |  |
| `iterations` | `u64` |  |
| `dkLen` | `u64` |  |

**Returns:** `string`

---

### <a id="hexChar"></a>`hexChar`

&gt; 📄 `hex.vx` L3-6

```vex
fn hexChar(n: u8): u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `n` | `u8` |  |

**Returns:** `u8`

---

### <a id="fromHexNibble"></a>`fromHexNibble`

&gt; 📄 `hex.vx` L8-13

```vex
fn fromHexNibble(c: u8): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `u8` |  |

**Returns:** `i32`

---

### <a id="hexEncode"></a>`hexEncode` `🔓 export`

&gt; 📄 `hex.vx` L16-36

```vex
export fn hexEncode(src: RawBuf, len: u64): string
```

Encode raw bytes to lowercase hex string.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `src` | `RawBuf` |  |
| `len` | `u64` |  |

**Returns:** `string`

---

### <a id="hexDecodeTo"></a>`hexDecodeTo` `🔓 export`

&gt; 📄 `hex.vx` L40-60

```vex
export fn hexDecodeTo(hex: str, out: RawBuf, outCap: u64): u64
```

Decode hex string to bytes into caller-provided output buffer.

Returns number of written bytes, or 0 on invalid hex/out-of-capacity.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `hex` | `str` |  |
| `out` | `RawBuf` |  |
| `outCap` | `u64` |  |

**Returns:** `u64`

---

### <a id="hkdfExtract"></a>`hkdfExtract` `🔓 export`

&gt; 📄 `hkdf.vx` L7-14

```vex
export fn hkdfExtract(salt: RawBuf, saltLen: u64, ikm: RawBuf, ikmLen: u64, prk: *u8)
```

HKDF-Extract: PRK = HMAC-SHA256(salt, IKM)

If salt is empty (saltLen==0), uses 32 zero bytes as default salt.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `salt` | `RawBuf` |  |
| `saltLen` | `u64` |  |
| `ikm` | `RawBuf` |  |
| `ikmLen` | `u64` |  |
| `prk` | `*u8` |  |

---

### <a id="hkdfExpand"></a>`hkdfExpand` `🔓 export`

&gt; 📄 `hkdf.vx` L18-77

```vex
export fn hkdfExpand(prk: RawBuf, prkLen: u64, info: RawBuf, infoLen: u64, out: RawBuf, outLen: u64)
```

HKDF-Expand: derive output keying material from PRK.

prk: 32 bytes (from hkdfExtract), outLen ≤ 255*32 = 8160 bytes.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `prk` | `RawBuf` |  |
| `prkLen` | `u64` |  |
| `info` | `RawBuf` |  |
| `infoLen` | `u64` |  |
| `out` | `RawBuf` |  |
| `outLen` | `u64` |  |

---

### <a id="hkdf"></a>`hkdf` `🔓 export`

&gt; 📄 `hkdf.vx` L80-85

```vex
export fn hkdf(salt: RawBuf, saltLen: u64, ikm: RawBuf, ikmLen: u64, info: RawBuf, infoLen: u64, out: RawBuf, outLen: u64)
```

One-shot HKDF: Extract + Expand.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `salt` | `RawBuf` |  |
| `saltLen` | `u64` |  |
| `ikm` | `RawBuf` |  |
| `ikmLen` | `u64` |  |
| `info` | `RawBuf` |  |
| `infoLen` | `u64` |  |
| `out` | `RawBuf` |  |
| `outLen` | `u64` |  |

---

### <a id="storeLe64"></a>`storeLe64` `🔓 export`

&gt; 📄 `utils.vx` L4-13

```vex
export fn storeLe64(buf: RawBuf, off: i64, v: u64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `RawBuf` |  |
| `off` | `i64` |  |
| `v` | `u64` |  |

---

### <a id="storeBe64"></a>`storeBe64` `🔓 export`

&gt; 📄 `utils.vx` L15-24

```vex
export fn storeBe64(buf: RawBuf, off: i64, v: u64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `RawBuf` |  |
| `off` | `i64` |  |
| `v` | `u64` |  |

---

### <a id="p1305LoadLe32"></a>`p1305LoadLe32`

&gt; 📄 `poly1305.vx` L5-11

```vex
fn p1305LoadLe32(buf: RawBuf, off: i64): u32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `RawBuf` |  |
| `off` | `i64` |  |

**Returns:** `u32`

---

### <a id="newPoly1305"></a>`newPoly1305` `🔓 export`

&gt; 📄 `poly1305.vx` L74-76

```vex
export fn newPoly1305(key: RawBuf, key_len: usize): Poly1305
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `RawBuf` |  |
| `key_len` | `usize` |  |

**Returns:** `Poly1305`

---

### <a id="poly1305Auth"></a>`poly1305Auth` `🔓 export`

&gt; 📄 `poly1305.vx` L295-299

```vex
export fn poly1305Auth(key: RawBuf, key_len: usize, message: RawBuf, msg_len: usize): [u8; 16]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `RawBuf` |  |
| `key_len` | `usize` |  |
| `message` | `RawBuf` |  |
| `msg_len` | `usize` |  |

**Returns:** `[u8; 16]`

---

### <a id="rotl32"></a>`rotl32`

&gt; 📄 `chacha20.vx` L3-5

```vex
fn rotl32(v: u32, n: u32): u32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `v` | `u32` |  |
| `n` | `u32` |  |

**Returns:** `u32`

---

### <a id="loadLe32"></a>`loadLe32`

&gt; 📄 `chacha20.vx` L7-13

```vex
fn loadLe32(buf: RawBuf, off: i64): u32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `RawBuf` |  |
| `off` | `i64` |  |

**Returns:** `u32`

---

### <a id="storeLe32"></a>`storeLe32`

&gt; 📄 `chacha20.vx` L15-20

```vex
fn storeLe32(buf: RawBuf, off: i64, v: u32)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `RawBuf` |  |
| `off` | `i64` |  |
| `v` | `u32` |  |

---

### <a id="quarterRound"></a>`quarterRound`

&gt; 📄 `chacha20.vx` L22-45

```vex
fn quarterRound(a: u32, b: u32, c: u32, d: u32): [u32; 4]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `u32` |  |
| `b` | `u32` |  |
| `c` | `u32` |  |
| `d` | `u32` |  |

**Returns:** `[u32; 4]`

---

### <a id="chacha20Block"></a>`chacha20Block` `🔓 export`

&gt; 📄 `chacha20.vx` L49-142

```vex
export fn chacha20Block(key: RawBuf, nonce: RawBuf, counter: u32, out: RawBuf)
```

Generate one 64-byte ChaCha20 block.

key: 32 bytes, nonce: 12 bytes, counter: initial block counter.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `RawBuf` |  |
| `nonce` | `RawBuf` |  |
| `counter` | `u32` |  |
| `out` | `RawBuf` |  |

---

### <a id="chacha20Xor"></a>`chacha20Xor` `🔓 export`

&gt; 📄 `chacha20.vx` L146-170

```vex
export fn chacha20Xor(out: RawBuf, input: RawBuf, len: u64, key: RawBuf, nonce: RawBuf, counter: u32)
```

XOR stream with input: out[i] = in[i] ^ keystream[i].

key: 32 bytes, nonce: 12 bytes.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `RawBuf` |  |
| `input` | `RawBuf` |  |
| `len` | `u64` |  |
| `key` | `RawBuf` |  |
| `nonce` | `RawBuf` |  |
| `counter` | `u32` |  |

---

### <a id="feLoadLe64"></a>`feLoadLe64`

&gt; 📄 `field25519.vx` L5-16

```vex
fn feLoadLe64(buf: RawBuf, off: i64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `RawBuf` |  |
| `off` | `i64` |  |

**Returns:** `u64`

---

### <a id="feZero"></a>`feZero` `🔓 export`

&gt; 📄 `field25519.vx` L24-30

```vex
export fn feZero(out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&Fe25519!` |  |

---

### <a id="feOne"></a>`feOne` `🔓 export`

&gt; 📄 `field25519.vx` L32-38

```vex
export fn feOne(out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&Fe25519!` |  |

---

### <a id="feCopy"></a>`feCopy` `🔓 export`

&gt; 📄 `field25519.vx` L41-47

```vex
export fn feCopy(f: &Fe25519, out: &Fe25519!)
```

Copy a field element (creates a new value from a reference)

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `f` | `&Fe25519` |  |
| `out` | `&Fe25519!` |  |

---

### <a id="feFromBytes"></a>`feFromBytes` `🔓 export`

&gt; 📄 `field25519.vx` L50-64

```vex
export fn feFromBytes(b: RawBuf, out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `RawBuf` |  |
| `out` | `&Fe25519!` |  |

---

### <a id="feToBytes"></a>`feToBytes` `🔓 export`

&gt; 📄 `field25519.vx` L67-99

```vex
export fn feToBytes(f: &Fe25519, out: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `f` | `&Fe25519` |  |
| `out` | `RawBuf` |  |

---

### <a id="feCarryPropagate"></a>`feCarryPropagate`

&gt; 📄 `field25519.vx` L101-128

```vex
fn feCarryPropagate(f: &Fe25519, out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `f` | `&Fe25519` |  |
| `out` | `&Fe25519!` |  |

---

### <a id="feReduce"></a>`feReduce`

&gt; 📄 `field25519.vx` L130-170

```vex
fn feReduce(f: &Fe25519, out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `f` | `&Fe25519` |  |
| `out` | `&Fe25519!` |  |

---

### <a id="feAdd"></a>`feAdd` `🔓 export`

&gt; 📄 `field25519.vx` L172-180

```vex
export fn feAdd(a: &Fe25519, b: &Fe25519, out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `&Fe25519` |  |
| `b` | `&Fe25519` |  |
| `out` | `&Fe25519!` |  |

---

### <a id="feSub"></a>`feSub` `🔓 export`

&gt; 📄 `field25519.vx` L182-192

```vex
export fn feSub(a: &Fe25519, b: &Fe25519, out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `&Fe25519` |  |
| `b` | `&Fe25519` |  |
| `out` | `&Fe25519!` |  |

---

### <a id="mulAdd"></a>`mulAdd`

&gt; 📄 `field25519.vx` L202-228

```vex
fn mulAdd(a: u64, b: u64, carry_lo: u64, carry_hi: u64, out: &W128!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `u64` |  |
| `b` | `u64` |  |
| `carry_lo` | `u64` |  |
| `carry_hi` | `u64` |  |
| `out` | `&W128!` |  |

---

### <a id="feMul"></a>`feMul` `🔓 export`

&gt; 📄 `field25519.vx` L230-350

```vex
export fn feMul(a: &Fe25519, b: &Fe25519, out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `&Fe25519` |  |
| `b` | `&Fe25519` |  |
| `out` | `&Fe25519!` |  |

---

### <a id="feSq"></a>`feSq` `🔓 export`

&gt; 📄 `field25519.vx` L352-354

```vex
export fn feSq(a: &Fe25519, out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `&Fe25519` |  |
| `out` | `&Fe25519!` |  |

---

### <a id="feSqN"></a>`feSqN`

&gt; 📄 `field25519.vx` L357-370

```vex
fn feSqN(a: &Fe25519, n: i64, out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `&Fe25519` |  |
| `n` | `i64` |  |
| `out` | `&Fe25519!` |  |

---

### <a id="feInvert"></a>`feInvert` `🔓 export`

&gt; 📄 `field25519.vx` L373-425

```vex
export fn feInvert(z: &Fe25519, out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `z` | `&Fe25519` |  |
| `out` | `&Fe25519!` |  |

---

### <a id="feCSwap"></a>`feCSwap` `🔓 export`

&gt; 📄 `field25519.vx` L428-437

```vex
export fn feCSwap(a: &Fe25519!, b: &Fe25519!, swap: u64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `&Fe25519!` |  |
| `b` | `&Fe25519!` |  |
| `swap` | `u64` |  |

---

### <a id="pointIdentity"></a>`pointIdentity` `🔓 export`

&gt; 📄 `ed25519.vx` L21-26

```vex
export fn pointIdentity(out: &ExtPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&ExtPoint!` |  |

---

### <a id="edD"></a>`edD`

&gt; 📄 `ed25519.vx` L29-43

```vex
fn edD(out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&Fe25519!` |  |

---

### <a id="ed2D"></a>`ed2D`

&gt; 📄 `ed25519.vx` L46-50

```vex
fn ed2D(out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&Fe25519!` |  |

---

### <a id="affIdentity"></a>`affIdentity`

&gt; 📄 `ed25519.vx` L59-62

```vex
fn affIdentity(out: &AffPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&AffPoint!` |  |

---

### <a id="affBasepoint"></a>`affBasepoint`

&gt; 📄 `ed25519.vx` L64-81

```vex
fn affBasepoint(out: &AffPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&AffPoint!` |  |

---

### <a id="affAdd"></a>`affAdd`

&gt; 📄 `ed25519.vx` L83-108

```vex
fn affAdd(p: &AffPoint, q: &AffPoint, out: &AffPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `&AffPoint` |  |
| `q` | `&AffPoint` |  |
| `out` | `&AffPoint!` |  |

---

### <a id="affScalarMul"></a>`affScalarMul`

&gt; 📄 `ed25519.vx` L110-132

```vex
fn affScalarMul(scalar: RawBuf, point: &AffPoint, out: &AffPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `scalar` | `RawBuf` |  |
| `point` | `&AffPoint` |  |
| `out` | `&AffPoint!` |  |

---

### <a id="feCopyAff"></a>`feCopyAff`

&gt; 📄 `ed25519.vx` L134-137

```vex
fn feCopyAff(p: &AffPoint, out: &AffPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `&AffPoint` |  |
| `out` | `&AffPoint!` |  |

---

### <a id="affEncode"></a>`affEncode`

&gt; 📄 `ed25519.vx` L139-148

```vex
fn affEncode(p: &AffPoint, out: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `&AffPoint` |  |
| `out` | `RawBuf` |  |

---

### <a id="feEq"></a>`feEq`

&gt; 📄 `ed25519.vx` L150-163

```vex
fn feEq(a: &Fe25519, b: &Fe25519): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `&Fe25519` |  |
| `b` | `&Fe25519` |  |

**Returns:** `bool`

---

### <a id="fePowConst"></a>`fePowConst`

&gt; 📄 `ed25519.vx` L165-182

```vex
fn fePowConst(base: &Fe25519, expLe: RawBuf, out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `base` | `&Fe25519` |  |
| `expLe` | `RawBuf` |  |
| `out` | `&Fe25519!` |  |

---

### <a id="feSqrtM1"></a>`feSqrtM1`

&gt; 📄 `ed25519.vx` L184-197

```vex
fn feSqrtM1(out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&Fe25519!` |  |

---

### <a id="feSqrtRatio"></a>`feSqrtRatio`

&gt; 📄 `ed25519.vx` L199-235

```vex
fn feSqrtRatio(u: &Fe25519, v: &Fe25519, out: &Fe25519!): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `u` | `&Fe25519` |  |
| `v` | `&Fe25519` |  |
| `out` | `&Fe25519!` |  |

**Returns:** `bool`

---

### <a id="scalarLessThanL"></a>`scalarLessThanL`

&gt; 📄 `ed25519.vx` L237-252

```vex
fn scalarLessThanL(s: RawBuf): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `RawBuf` |  |

**Returns:** `bool`

---

### <a id="affDecodeCompressed"></a>`affDecodeCompressed`

&gt; 📄 `ed25519.vx` L254-298

```vex
fn affDecodeCompressed(in32: RawBuf, out: &AffPoint!): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `in32` | `RawBuf` |  |
| `out` | `&AffPoint!` |  |

**Returns:** `bool`

---

### <a id="affToExt"></a>`affToExt`

&gt; 📄 `ed25519.vx` L301-306

```vex
fn affToExt(p: &AffPoint, out: &ExtPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `&AffPoint` |  |
| `out` | `&ExtPoint!` |  |

---

### <a id="pointDouble"></a>`pointDouble` `🔓 export`

&gt; 📄 `ed25519.vx` L309-333

```vex
export fn pointDouble(p: &ExtPoint, out: &ExtPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `&ExtPoint` |  |
| `out` | `&ExtPoint!` |  |

---

### <a id="pointAdd"></a>`pointAdd` `🔓 export`

&gt; 📄 `ed25519.vx` L336-372

```vex
export fn pointAdd(p: &ExtPoint, q: &ExtPoint, out: &ExtPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `&ExtPoint` |  |
| `q` | `&ExtPoint` |  |
| `out` | `&ExtPoint!` |  |

---

### <a id="scalarMul"></a>`scalarMul` `🔓 export`

&gt; 📄 `ed25519.vx` L375-408

```vex
export fn scalarMul(scalar: RawBuf, point: &ExtPoint, out: &ExtPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `scalar` | `RawBuf` |  |
| `point` | `&ExtPoint` |  |
| `out` | `&ExtPoint!` |  |

---

### <a id="pointEncode"></a>`pointEncode` `🔓 export`

&gt; 📄 `ed25519.vx` L411-430

```vex
export fn pointEncode(p: &ExtPoint, out: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `&ExtPoint` |  |
| `out` | `RawBuf` |  |

---

### <a id="basepointExt"></a>`basepointExt` `🔓 export`

&gt; 📄 `ed25519.vx` L433-457

```vex
export fn basepointExt(out: &ExtPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&ExtPoint!` |  |

---

### <a id="scalarL"></a>`scalarL`

&gt; 📄 `ed25519.vx` L461-472

```vex
fn scalarL(): [u8; 32]
```

**Returns:** `[u8; 32]`

---

### <a id="cmpLeNum"></a>`cmpLeNum`

&gt; 📄 `ed25519.vx` L474-489

```vex
fn cmpLeNum(a: RawBuf, aLen: i64, b: RawBuf, bLen: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `RawBuf` |  |
| `aLen` | `i64` |  |
| `b` | `RawBuf` |  |
| `bLen` | `i64` |  |

**Returns:** `i32`

---

### <a id="subLeInPlace"></a>`subLeInPlace`

&gt; 📄 `ed25519.vx` L491-507

```vex
fn subLeInPlace(a: RawBuf, b: RawBuf, len: i64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `RawBuf` |  |
| `b` | `RawBuf` |  |
| `len` | `i64` |  |

---

### <a id="reduceModL64"></a>`reduceModL64`

&gt; 📄 `ed25519.vx` L509-563

```vex
fn reduceModL64(x64: RawBuf): [u8; 32]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x64` | `RawBuf` |  |

**Returns:** `[u8; 32]`

---

### <a id="mulScalar32"></a>`mulScalar32`

&gt; 📄 `ed25519.vx` L565-600

```vex
fn mulScalar32(a: RawBuf, b: RawBuf): [u8; 64]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `RawBuf` |  |
| `b` | `RawBuf` |  |

**Returns:** `[u8; 64]`

---

### <a id="scMulAdd"></a>`scMulAdd`

&gt; 📄 `ed25519.vx` L602-623

```vex
fn scMulAdd(r: RawBuf, k: RawBuf, a: RawBuf): [u8; 32]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `r` | `RawBuf` |  |
| `k` | `RawBuf` |  |
| `a` | `RawBuf` |  |

**Returns:** `[u8; 32]`

---

### <a id="scReduce"></a>`scReduce`

&gt; 📄 `ed25519.vx` L625-627

```vex
fn scReduce(hash: RawBuf): [u8; 32]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `hash` | `RawBuf` |  |

**Returns:** `[u8; 32]`

---

### <a id="ed25519PublicKey"></a>`ed25519PublicKey` `🔓 export`

&gt; 📄 `ed25519.vx` L632-655

```vex
export fn ed25519PublicKey(pubOut: RawBuf, privateKey: RawBuf)
```

Ed25519 key pair generation.

privateKey: 32 random bytes.
Writes 32-byte public key to pubOut.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `pubOut` | `RawBuf` |  |
| `privateKey` | `RawBuf` |  |

---

### <a id="ed25519Sign"></a>`ed25519Sign` `🔓 export`

&gt; 📄 `ed25519.vx` L660-763

```vex
export fn ed25519Sign(sigOut: RawBuf, privateKey: RawBuf, message: RawBuf, msgLen: u64)
```

Ed25519 sign a message.

Writes 64-byte signature to sigOut.
privateKey: 32 bytes, message: raw bytes.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `sigOut` | `RawBuf` |  |
| `privateKey` | `RawBuf` |  |
| `message` | `RawBuf` |  |
| `msgLen` | `u64` |  |

---

### <a id="ed25519SignHex"></a>`ed25519SignHex` `🔓 export`

&gt; 📄 `ed25519.vx` L766-770

```vex
export fn ed25519SignHex(privateKey: RawBuf, message: RawBuf, msgLen: u64): string
```

Ed25519 sign returning hex(signature[64]).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `privateKey` | `RawBuf` |  |
| `message` | `RawBuf` |  |
| `msgLen` | `u64` |  |

**Returns:** `string`

---

### <a id="ed25519Verify"></a>`ed25519Verify` `🔓 export`

&gt; 📄 `ed25519.vx` L773-862

```vex
export fn ed25519Verify(signature: RawBuf, publicKey: RawBuf, message: RawBuf, msgLen: u64): bool
```

Ed25519 verify: returns true iff signature is valid.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `signature` | `RawBuf` |  |
| `publicKey` | `RawBuf` |  |
| `message` | `RawBuf` |  |
| `msgLen` | `u64` |  |

**Returns:** `bool`

---

### <a id="ed25519PublicKeyHex"></a>`ed25519PublicKeyHex` `🔓 export`

&gt; 📄 `ed25519.vx` L865-869

```vex
export fn ed25519PublicKeyHex(privateKey: RawBuf): string
```

Ed25519 public key generation returning hex.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `privateKey` | `RawBuf` |  |

**Returns:** `string`

---

### <a id="ed25519BasepointHex"></a>`ed25519BasepointHex` `🔓 export`

&gt; 📄 `ed25519.vx` L872-878

```vex
export fn ed25519BasepointHex(): string
```

Diagnostic helper: return encoded Ed25519 basepoint.

**Returns:** `string`

---

### <a id="ed25519MulBaseHex"></a>`ed25519MulBaseHex` `🔓 export`

&gt; 📄 `ed25519.vx` L881-889

```vex
export fn ed25519MulBaseHex(scalar: RawBuf): string
```

Diagnostic helper: encode scalar*B for a raw 32-byte scalar.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `scalar` | `RawBuf` |  |

**Returns:** `string`

---

### <a id="ctEq"></a>`ctEq` `🔓 export`

&gt; 📄 `bytes.vx` L5-17

```vex
export fn ctEq(a: RawBuf, aLen: u64, b: RawBuf, bLen: u64): bool
```

Constant-time equality over two byte slices.

Returns false on length mismatch.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `RawBuf` |  |
| `aLen` | `u64` |  |
| `b` | `RawBuf` |  |
| `bLen` | `u64` |  |

**Returns:** `bool`

---

### <a id="xorInto"></a>`xorInto` `🔓 export`

&gt; 📄 `bytes.vx` L20-27

```vex
export fn xorInto(dst: RawBuf, a: RawBuf, b: RawBuf, len: u64)
```

XOR two sources into destination: dst[i] = a[i] ^ b[i]

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `dst` | `RawBuf` |  |
| `a` | `RawBuf` |  |
| `b` | `RawBuf` |  |
| `len` | `u64` |  |

---

### <a id="xorInPlace"></a>`xorInPlace` `🔓 export`

&gt; 📄 `bytes.vx` L30-37

```vex
export fn xorInPlace(dst: RawBuf, src: RawBuf, len: u64)
```

In-place XOR: dst[i] ^= src[i]

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `dst` | `RawBuf` |  |
| `src` | `RawBuf` |  |
| `len` | `u64` |  |

---

### <a id="zeroize"></a>`zeroize` `🔓 export`

&gt; 📄 `bytes.vx` L40-43

```vex
export fn zeroize(buf: RawBuf, len: u64)
```

Zeroize sensitive buffer memory.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `RawBuf` |  |
| `len` | `u64` |  |

---

### <a id="hmacSha256To"></a>`hmacSha256To` `🔓 export`

&gt; 📄 `hmac.vx` L7-95

```vex
export fn hmacSha256To(key: RawBuf, keyLen: u64, data: RawBuf, dataLen: u64, out: *u8)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `RawBuf` |  |
| `keyLen` | `u64` |  |
| `data` | `RawBuf` |  |
| `dataLen` | `u64` |  |
| `out` | `*u8` |  |

---

### <a id="hmacSha256Hex"></a>`hmacSha256Hex` `🔓 export`

&gt; 📄 `hmac.vx` L97-114

```vex
export fn hmacSha256Hex(key: str, data: str): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `str` |  |
| `data` | `str` |  |

**Returns:** `string`

---

### <a id="hmacVerifySha256Hex"></a>`hmacVerifySha256Hex` `🔓 export`

&gt; 📄 `hmac.vx` L116-143

```vex
export fn hmacVerifySha256Hex(key: str, data: str, expectedHex: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `str` |  |
| `data` | `str` |  |
| `expectedHex` | `str` |  |

**Returns:** `bool`

---

### <a id="rotr64"></a>`rotr64`

&gt; 📄 `blake2b.vx` L4-6

```vex
fn rotr64(x: u64, n: u64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u64` |  |
| `n` | `u64` |  |

**Returns:** `u64`

---

### <a id="loadLe64"></a>`loadLe64`

&gt; 📄 `blake2b.vx` L8-18

```vex
fn loadLe64(buf: RawBuf!, off: i64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `RawBuf!` |  |
| `off` | `i64` |  |

**Returns:** `u64`

---

### <a id="storeLe64"></a>`storeLe64`

&gt; 📄 `blake2b.vx` L20-29

```vex
fn storeLe64(buf: RawBuf!, off: i64, v: u64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `RawBuf!` |  |
| `off` | `i64` |  |
| `v` | `u64` |  |

---

### <a id="ivAt"></a>`ivAt`

&gt; 📄 `blake2b.vx` L31-42

```vex
fn ivAt(i: i64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `i` | `i64` |  |

**Returns:** `u64`

---

### <a id="sigmaRow"></a>`sigmaRow`

&gt; 📄 `blake2b.vx` L44-57

```vex
fn sigmaRow(r: i64): [u8; 16]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `r` | `i64` |  |

**Returns:** `[u8; 16]`

---

### <a id="g"></a>`g`

&gt; 📄 `blake2b.vx` L59-81

```vex
fn g(vb: RawBuf, a: i64, b: i64, c: i64, d: i64, x: u64, y: u64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `vb` | `RawBuf` |  |
| `a` | `i64` |  |
| `b` | `i64` |  |
| `c` | `i64` |  |
| `d` | `i64` |  |
| `x` | `u64` |  |
| `y` | `u64` |  |

---

### <a id="compress"></a>`compress`

&gt; 📄 `blake2b.vx` L83-131

```vex
fn compress(h: RawBuf, block: RawBuf, t: u64, fFinal: bool)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `h` | `RawBuf` |  |
| `block` | `RawBuf` |  |
| `t` | `u64` |  |
| `fFinal` | `bool` |  |

---

### <a id="blake2bTo"></a>`blake2bTo` `🔓 export`

&gt; 📄 `blake2b.vx` L135-185

```vex
export fn blake2bTo(data: RawBuf, len: u64, out: *u8, outLen: u64)
```

Compute BLAKE2b hash to caller-provided output buffer.

outLen must be in [1, 64].

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `RawBuf` |  |
| `len` | `u64` |  |
| `out` | `*u8` |  |
| `outLen` | `u64` |  |

---

### <a id="blake2bHex"></a>`blake2bHex` `🔓 export`

&gt; 📄 `blake2b.vx` L187-191

```vex
export fn blake2bHex(data: str): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |

**Returns:** `string`

---

### <a id="loadLe64"></a>`loadLe64`

&gt; 📄 `argon2id.vx` L11-21

```vex
fn loadLe64(buf: RawBuf, off: i64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `RawBuf` |  |
| `off` | `i64` |  |

**Returns:** `u64`

---

### <a id="low32"></a>`low32`

&gt; 📄 `argon2id.vx` L23-25

```vex
fn low32(x: u64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u64` |  |

**Returns:** `u64`

---

### <a id="rotr64"></a>`rotr64`

&gt; 📄 `argon2id.vx` L27-29

```vex
fn rotr64(x: u64, n: u64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u64` |  |
| `n` | `u64` |  |

**Returns:** `u64`

---

### <a id="add64"></a>`add64`

&gt; 📄 `argon2id.vx` L31-33

```vex
fn add64(a: u64, b: u64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `u64` |  |
| `b` | `u64` |  |

**Returns:** `u64`

---

### <a id="blamka"></a>`blamka`

&gt; 📄 `argon2id.vx` L35-38

```vex
fn blamka(a: u64, b: u64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `u64` |  |
| `b` | `u64` |  |

**Returns:** `u64`

---

### <a id="storeLe64"></a>`storeLe64`

&gt; 📄 `argon2id.vx` L40-49

```vex
fn storeLe64(buf: RawBuf!, off: i64, v: u64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `RawBuf!` |  |
| `off` | `i64` |  |
| `v` | `u64` |  |

---

### <a id="storeLe32"></a>`storeLe32`

&gt; 📄 `argon2id.vx` L51-56

```vex
fn storeLe32(buf: RawBuf!, off: i64, v: u32)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `RawBuf!` |  |
| `off` | `i64` |  |
| `v` | `u32` |  |

---

### <a id="roundedMemoryKiB"></a>`roundedMemoryKiB`

&gt; 📄 `argon2id.vx` L58-61

```vex
fn roundedMemoryKiB(memoryKiB: u64, parallelism: u64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `memoryKiB` | `u64` |  |
| `parallelism` | `u64` |  |

**Returns:** `u64`

---

### <a id="validParams"></a>`validParams`

&gt; 📄 `argon2id.vx` L63-76

```vex
fn validParams(pwdLen: u64, saltLen: u64, timeCost: u64, memoryKiB: u64, parallelism: u64, outLen: u64): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `pwdLen` | `u64` |  |
| `saltLen` | `u64` |  |
| `timeCost` | `u64` |  |
| `memoryKiB` | `u64` |  |
| `parallelism` | `u64` |  |
| `outLen` | `u64` |  |

**Returns:** `bool`

---

### <a id="hash2ToLen"></a>`hash2ToLen`

&gt; 📄 `argon2id.vx` L78-97

```vex
fn hash2ToLen(a: RawBuf, aLen: u64, b: RawBuf, bLen: u64, out: RawBuf, outLen: u64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `RawBuf` |  |
| `aLen` | `u64` |  |
| `b` | `RawBuf` |  |
| `bLen` | `u64` |  |
| `out` | `RawBuf` |  |
| `outLen` | `u64` |  |

---

### <a id="hPrimeTo"></a>`hPrimeTo`

&gt; 📄 `argon2id.vx` L103-176

```vex
fn hPrimeTo(input: RawBuf, inputLen: u64, out: RawBuf!, outLen: u64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `RawBuf` |  |
| `inputLen` | `u64` |  |
| `out` | `RawBuf!` |  |
| `outLen` | `u64` |  |

---

### <a id="blockOffset"></a>`blockOffset`

&gt; 📄 `argon2id.vx` L178-180

```vex
fn blockOffset(idx: i64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `idx` | `i64` |  |

**Returns:** `i64`

---

### <a id="gbMix"></a>`gbMix`

&gt; 📄 `argon2id.vx` L188-210

```vex
fn gbMix(v: RawBuf, a: i64, b: i64, c: i64, d: i64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `v` | `RawBuf` |  |
| `a` | `i64` |  |
| `b` | `i64` |  |
| `c` | `i64` |  |
| `d` | `i64` |  |

---

### <a id="pPermute128"></a>`pPermute128`

&gt; 📄 `argon2id.vx` L212-224

```vex
fn pPermute128(v: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `v` | `RawBuf` |  |

---

### <a id="roundBlockInPlace"></a>`roundBlockInPlace`

&gt; 📄 `argon2id.vx` L226-274

```vex
fn roundBlockInPlace(block: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `block` | `RawBuf` |  |

---

### <a id="fillBlock"></a>`fillBlock`

&gt; 📄 `argon2id.vx` L276-305

```vex
fn fillBlock(prev: RawBuf, ref: RawBuf, next: RawBuf!, withXor: bool)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `prev` | `RawBuf` |  |
| `ref` | `RawBuf` |  |
| `next` | `RawBuf!` |  |
| `withXor` | `bool` |  |

---

### <a id="gCompress1024"></a>`gCompress1024`

&gt; 📄 `argon2id.vx` L307-334

```vex
fn gCompress1024(x: RawBuf, y: RawBuf, out: RawBuf!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `RawBuf` |  |
| `y` | `RawBuf` |  |
| `out` | `RawBuf!` |  |

---

### <a id="nextAddressBlock"></a>`nextAddressBlock`

&gt; 📄 `argon2id.vx` L336-345

```vex
fn nextAddressBlock(input: RawBuf, out: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `RawBuf` |  |
| `out` | `RawBuf` |  |

---

### <a id="selectRefIndex"></a>`selectRefIndex`

&gt; 📄 `argon2id.vx` L347-393

```vex
fn selectRefIndex(pass: i64, lane: i64, slice: i64, idxInSeg: i64, lanes: i64, laneLen: i64, j1: u64, j2: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `pass` | `i64` |  |
| `lane` | `i64` |  |
| `slice` | `i64` |  |
| `idxInSeg` | `i64` |  |
| `lanes` | `i64` |  |
| `laneLen` | `i64` |  |
| `j1` | `u64` |  |
| `j2` | `u64` |  |

**Returns:** `i64`

---

### <a id="seedInitBlock"></a>`seedInitBlock`

&gt; 📄 `argon2id.vx` L395-401

```vex
fn seedInitBlock(h0: RawBuf, j: u32, i: u32, out: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `h0` | `RawBuf` |  |
| `j` | `u32` |  |
| `i` | `u32` |  |
| `out` | `RawBuf` |  |

---

### <a id="argon2DeriveVariant"></a>`argon2DeriveVariant`

&gt; 📄 `argon2id.vx` L405-417

```vex
fn argon2DeriveVariant(variant: u8, password: RawBuf, pwdLen: u64, salt: RawBuf, saltLen: u64, timeCost: u64, memoryKiB: u64, parallelism: u64, out: RawBuf, outLen: u64)
```

Derive key bytes using selectable Argon2 variant strategy.

parallelism parameter is currently folded into initialization (single-lane engine for now).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `variant` | `u8` |  |
| `password` | `RawBuf` |  |
| `pwdLen` | `u64` |  |
| `salt` | `RawBuf` |  |
| `saltLen` | `u64` |  |
| `timeCost` | `u64` |  |
| `memoryKiB` | `u64` |  |
| `parallelism` | `u64` |  |
| `out` | `RawBuf` |  |
| `outLen` | `u64` |  |

---

### <a id="argon2DeriveVariantEx"></a>`argon2DeriveVariantEx`

&gt; 📄 `argon2id.vx` L419-679

```vex
fn argon2DeriveVariantEx(variant: u8, password: RawBuf, pwdLen: u64, salt: RawBuf, saltLen: u64, secret: RawBuf, secretLen: u64, ad: RawBuf, adLen: u64, timeCost: u64, memoryKiB: u64, parallelism: u64, out: RawBuf!, outLen: u64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `variant` | `u8` |  |
| `password` | `RawBuf` |  |
| `pwdLen` | `u64` |  |
| `salt` | `RawBuf` |  |
| `saltLen` | `u64` |  |
| `secret` | `RawBuf` |  |
| `secretLen` | `u64` |  |
| `ad` | `RawBuf` |  |
| `adLen` | `u64` |  |
| `timeCost` | `u64` |  |
| `memoryKiB` | `u64` |  |
| `parallelism` | `u64` |  |
| `out` | `RawBuf!` |  |
| `outLen` | `u64` |  |

---

### <a id="argon2idDerive"></a>`argon2idDerive` `🔓 export`

&gt; 📄 `argon2id.vx` L682-692

```vex
export fn argon2idDerive(password: RawBuf, pwdLen: u64, salt: RawBuf, saltLen: u64, timeCost: u64, memoryKiB: u64, parallelism: u64, out: RawBuf, outLen: u64)
```

Argon2id derivation (recommended default).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `password` | `RawBuf` |  |
| `pwdLen` | `u64` |  |
| `salt` | `RawBuf` |  |
| `saltLen` | `u64` |  |
| `timeCost` | `u64` |  |
| `memoryKiB` | `u64` |  |
| `parallelism` | `u64` |  |
| `out` | `RawBuf` |  |
| `outLen` | `u64` |  |

---

### <a id="argon2idDeriveEx"></a>`argon2idDeriveEx` `🔓 export`

&gt; 📄 `argon2id.vx` L695-707

```vex
export fn argon2idDeriveEx(password: RawBuf, pwdLen: u64, salt: RawBuf, saltLen: u64, secret: RawBuf, secretLen: u64, ad: RawBuf, adLen: u64, timeCost: u64, memoryKiB: u64, parallelism: u64, out: RawBuf, outLen: u64)
```

Argon2id derivation with optional secret/ad fields (RFC-style inputs).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `password` | `RawBuf` |  |
| `pwdLen` | `u64` |  |
| `salt` | `RawBuf` |  |
| `saltLen` | `u64` |  |
| `secret` | `RawBuf` |  |
| `secretLen` | `u64` |  |
| `ad` | `RawBuf` |  |
| `adLen` | `u64` |  |
| `timeCost` | `u64` |  |
| `memoryKiB` | `u64` |  |
| `parallelism` | `u64` |  |
| `out` | `RawBuf` |  |
| `outLen` | `u64` |  |

---

### <a id="argon2iDerive"></a>`argon2iDerive` `🔓 export`

&gt; 📄 `argon2id.vx` L710-720

```vex
export fn argon2iDerive(password: RawBuf, pwdLen: u64, salt: RawBuf, saltLen: u64, timeCost: u64, memoryKiB: u64, parallelism: u64, out: RawBuf, outLen: u64)
```

Argon2i derivation (data-independent indexing).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `password` | `RawBuf` |  |
| `pwdLen` | `u64` |  |
| `salt` | `RawBuf` |  |
| `saltLen` | `u64` |  |
| `timeCost` | `u64` |  |
| `memoryKiB` | `u64` |  |
| `parallelism` | `u64` |  |
| `out` | `RawBuf` |  |
| `outLen` | `u64` |  |

---

### <a id="argon2iDeriveEx"></a>`argon2iDeriveEx` `🔓 export`

&gt; 📄 `argon2id.vx` L723-735

```vex
export fn argon2iDeriveEx(password: RawBuf, pwdLen: u64, salt: RawBuf, saltLen: u64, secret: RawBuf, secretLen: u64, ad: RawBuf, adLen: u64, timeCost: u64, memoryKiB: u64, parallelism: u64, out: RawBuf, outLen: u64)
```

Argon2i derivation with optional secret/ad fields.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `password` | `RawBuf` |  |
| `pwdLen` | `u64` |  |
| `salt` | `RawBuf` |  |
| `saltLen` | `u64` |  |
| `secret` | `RawBuf` |  |
| `secretLen` | `u64` |  |
| `ad` | `RawBuf` |  |
| `adLen` | `u64` |  |
| `timeCost` | `u64` |  |
| `memoryKiB` | `u64` |  |
| `parallelism` | `u64` |  |
| `out` | `RawBuf` |  |
| `outLen` | `u64` |  |

---

### <a id="argon2dDerive"></a>`argon2dDerive` `🔓 export`

&gt; 📄 `argon2id.vx` L738-748

```vex
export fn argon2dDerive(password: RawBuf, pwdLen: u64, salt: RawBuf, saltLen: u64, timeCost: u64, memoryKiB: u64, parallelism: u64, out: RawBuf, outLen: u64)
```

Argon2d derivation (data-dependent indexing).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `password` | `RawBuf` |  |
| `pwdLen` | `u64` |  |
| `salt` | `RawBuf` |  |
| `saltLen` | `u64` |  |
| `timeCost` | `u64` |  |
| `memoryKiB` | `u64` |  |
| `parallelism` | `u64` |  |
| `out` | `RawBuf` |  |
| `outLen` | `u64` |  |

---

### <a id="argon2dDeriveEx"></a>`argon2dDeriveEx` `🔓 export`

&gt; 📄 `argon2id.vx` L751-763

```vex
export fn argon2dDeriveEx(password: RawBuf, pwdLen: u64, salt: RawBuf, saltLen: u64, secret: RawBuf, secretLen: u64, ad: RawBuf, adLen: u64, timeCost: u64, memoryKiB: u64, parallelism: u64, out: RawBuf, outLen: u64)
```

Argon2d derivation with optional secret/ad fields.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `password` | `RawBuf` |  |
| `pwdLen` | `u64` |  |
| `salt` | `RawBuf` |  |
| `saltLen` | `u64` |  |
| `secret` | `RawBuf` |  |
| `secretLen` | `u64` |  |
| `ad` | `RawBuf` |  |
| `adLen` | `u64` |  |
| `timeCost` | `u64` |  |
| `memoryKiB` | `u64` |  |
| `parallelism` | `u64` |  |
| `out` | `RawBuf` |  |
| `outLen` | `u64` |  |

---

### <a id="x25519"></a>`x25519` `🔓 export`

&gt; 📄 `x25519.vx` L12-79

```vex
export fn x25519(out: RawBuf, scalar: RawBuf, point: RawBuf)
```

Scalar multiplication: result = scalar * point on Curve25519.

Both scalar and point are 32 bytes (little-endian).
Result written to out (32 bytes).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `RawBuf` |  |
| `scalar` | `RawBuf` |  |
| `point` | `RawBuf` |  |

---

### <a id="x25519Basepoint"></a>`x25519Basepoint` `🔓 export`

&gt; 📄 `x25519.vx` L84-88

```vex
export fn x25519Basepoint(out: RawBuf, privateKey: RawBuf)
```

Generate X25519 public key from private key.

Private key: 32 random bytes (will be clamped internally).
Uses basepoint u=9.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `RawBuf` |  |
| `privateKey` | `RawBuf` |  |

---

### <a id="x25519Hex"></a>`x25519Hex` `🔓 export`

&gt; 📄 `x25519.vx` L91-95

```vex
export fn x25519Hex(myPrivate: RawBuf, theirPublic: RawBuf): string
```

Compute X25519 shared secret, returns hex string.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `myPrivate` | `RawBuf` |  |
| `theirPublic` | `RawBuf` |  |

**Returns:** `string`

---

### <a id="xor16"></a>`xor16`

&gt; 📄 `aes_gcm.vx` L6-12

```vex
fn xor16(dst: RawBuf, src: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `dst` | `RawBuf` |  |
| `src` | `RawBuf` |  |

---

### <a id="rightShift1"></a>`rightShift1`

&gt; 📄 `aes_gcm.vx` L14-24

```vex
fn rightShift1(v: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `v` | `RawBuf` |  |

---

### <a id="ghashMul"></a>`ghashMul`

&gt; 📄 `aes_gcm.vx` L26-56

```vex
fn ghashMul(x: RawBuf, h: RawBuf): [u8; 16]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `RawBuf` |  |
| `h` | `RawBuf` |  |

**Returns:** `[u8; 16]`

---

### <a id="ghashUpdate"></a>`ghashUpdate`

&gt; 📄 `aes_gcm.vx` L58-68

```vex
fn ghashUpdate(y: RawBuf, h: RawBuf, block: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `y` | `RawBuf` |  |
| `h` | `RawBuf` |  |
| `block` | `RawBuf` |  |

---

### <a id="ghashAll"></a>`ghashAll`

&gt; 📄 `aes_gcm.vx` L72-109

```vex
fn ghashAll(h: RawBuf, aad: RawBuf, aadLen: u64, ct: RawBuf, ctLen: u64): [u8; 16]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `h` | `RawBuf` |  |
| `aad` | `RawBuf` |  |
| `aadLen` | `u64` |  |
| `ct` | `RawBuf` |  |
| `ctLen` | `u64` |  |

**Returns:** `[u8; 16]`

---

### <a id="aesGcmEncrypt"></a>`aesGcmEncrypt` `🔓 export`

&gt; 📄 `aes_gcm.vx` L115-157

```vex
export fn aesGcmEncrypt(key: RawBuf, nonce12: RawBuf, aad: RawBuf, aadLen: u64, plaintext: RawBuf, ptLen: u64, out: RawBuf): [u8; 16]
```

AES-256-GCM encrypt (96-bit nonce).

key: 32 bytes, nonce: 12 bytes.
out ciphertext has same length as plaintext.
returns 16-byte tag.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `RawBuf` |  |
| `nonce12` | `RawBuf` |  |
| `aad` | `RawBuf` |  |
| `aadLen` | `u64` |  |
| `plaintext` | `RawBuf` |  |
| `ptLen` | `u64` |  |
| `out` | `RawBuf` |  |

**Returns:** `[u8; 16]`

---

### <a id="aesGcmDecrypt"></a>`aesGcmDecrypt` `🔓 export`

&gt; 📄 `aes_gcm.vx` L160-211

```vex
export fn aesGcmDecrypt(key: RawBuf, nonce12: RawBuf, aad: RawBuf, aadLen: u64, ciphertext: RawBuf, ctLen: u64, tag: RawBuf, out: RawBuf): bool
```

AES-256-GCM decrypt (96-bit nonce). Returns false on tag mismatch.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `RawBuf` |  |
| `nonce12` | `RawBuf` |  |
| `aad` | `RawBuf` |  |
| `aadLen` | `u64` |  |
| `ciphertext` | `RawBuf` |  |
| `ctLen` | `u64` |  |
| `tag` | `RawBuf` |  |
| `out` | `RawBuf` |  |

**Returns:** `bool`

---

### <a id="rotr64"></a>`rotr64`

&gt; 📄 `sha512.vx` L5-7

```vex
fn rotr64(x: u64, n: u64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u64` |  |
| `n` | `u64` |  |

**Returns:** `u64`

---

### <a id="ch512"></a>`ch512`

&gt; 📄 `sha512.vx` L9-11

```vex
fn ch512(x: u64, y: u64, z: u64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u64` |  |
| `y` | `u64` |  |
| `z` | `u64` |  |

**Returns:** `u64`

---

### <a id="maj512"></a>`maj512`

&gt; 📄 `sha512.vx` L13-15

```vex
fn maj512(x: u64, y: u64, z: u64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u64` |  |
| `y` | `u64` |  |
| `z` | `u64` |  |

**Returns:** `u64`

---

### <a id="bsig0_512"></a>`bsig0_512`

&gt; 📄 `sha512.vx` L17-19

```vex
fn bsig0_512(x: u64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u64` |  |

**Returns:** `u64`

---

### <a id="bsig1_512"></a>`bsig1_512`

&gt; 📄 `sha512.vx` L21-23

```vex
fn bsig1_512(x: u64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u64` |  |

**Returns:** `u64`

---

### <a id="ssig0_512"></a>`ssig0_512`

&gt; 📄 `sha512.vx` L25-27

```vex
fn ssig0_512(x: u64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u64` |  |

**Returns:** `u64`

---

### <a id="ssig1_512"></a>`ssig1_512`

&gt; 📄 `sha512.vx` L29-31

```vex
fn ssig1_512(x: u64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u64` |  |

**Returns:** `u64`

---

### <a id="k512"></a>`k512`

&gt; 📄 `sha512.vx` L33-117

```vex
fn k512(t: i64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `i64` |  |

**Returns:** `u64`

---

### <a id="sha512Hex"></a>`sha512Hex` `🔓 export`

&gt; 📄 `sha512.vx` L291-298

```vex
export fn sha512Hex(data: str): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |

**Returns:** `string`

---

### <a id="sha512To"></a>`sha512To` `🔓 export`

&gt; 📄 `sha512.vx` L300-305

```vex
export fn sha512To(data: RawBuf, len: u64, out: *u8)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `RawBuf` |  |
| `len` | `u64` |  |
| `out` | `*u8` |  |

---

### <a id="b64At"></a>`b64At`

&gt; 📄 `base64.vx` L3-9

```vex
fn b64At(n: u8): u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `n` | `u8` |  |

**Returns:** `u8`

---

### <a id="base64Encode"></a>`base64Encode` `🔓 export`

&gt; 📄 `base64.vx` L12-59

```vex
export fn base64Encode(src: RawBuf, len: u64): string
```

Base64 encode raw bytes (RFC 4648, padded).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `src` | `RawBuf` |  |
| `len` | `u64` |  |

**Returns:** `string`

---

### <a id="base64EncodeString"></a>`base64EncodeString` `🔓 export`

&gt; 📄 `base64.vx` L62-64

```vex
export fn base64EncodeString(s: str): string
```

Base64 encode string bytes as UTF-8 byte sequence.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `str` |  |

**Returns:** `string`

---

### <a id="main"></a>`main` `🔓 export`

&gt; 📄 `trace_old.vx` L5-11

```vex
export fn main()
```

---

### <a id="computeAeadTag"></a>`computeAeadTag`

&gt; 📄 `aead.vx` L9-45

```vex
fn computeAeadTag(otkBuf: RawBuf, aad: RawBuf, aadLen: u64, ct: RawBuf, ctLen: u64): [u8; 16]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `otkBuf` | `RawBuf` |  |
| `aad` | `RawBuf` |  |
| `aadLen` | `u64` |  |
| `ct` | `RawBuf` |  |
| `ctLen` | `u64` |  |

**Returns:** `[u8; 16]`

---

### <a id="aeadEncrypt"></a>`aeadEncrypt` `🔓 export`

&gt; 📄 `aead.vx` L51-65

```vex
export fn aeadEncrypt(key: RawBuf, nonce: RawBuf, aad: RawBuf, aadLen: u64, plaintext: RawBuf, ptLen: u64, out: RawBuf): [u8; 16]
```

Encrypt with ChaCha20-Poly1305 AEAD (RFC 8439).

key: 32 bytes, nonce: 12 bytes.
Writes ciphertext to `out` (same length as plaintext).
Returns 16-byte authentication tag.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `RawBuf` |  |
| `nonce` | `RawBuf` |  |
| `aad` | `RawBuf` |  |
| `aadLen` | `u64` |  |
| `plaintext` | `RawBuf` |  |
| `ptLen` | `u64` |  |
| `out` | `RawBuf` |  |

**Returns:** `[u8; 16]`

---

### <a id="aeadDecrypt"></a>`aeadDecrypt` `🔓 export`

&gt; 📄 `aead.vx` L71-98

```vex
export fn aeadDecrypt(key: RawBuf, nonce: RawBuf, aad: RawBuf, aadLen: u64, ciphertext: RawBuf, ctLen: u64, tag: RawBuf, out: RawBuf): bool
```

Decrypt with ChaCha20-Poly1305 AEAD (RFC 8439).

key: 32 bytes, nonce: 12 bytes.
Returns true on success (tag verified), false on failure.
On failure, `out` is zeroed.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `RawBuf` |  |
| `nonce` | `RawBuf` |  |
| `aad` | `RawBuf` |  |
| `aadLen` | `u64` |  |
| `ciphertext` | `RawBuf` |  |
| `ctLen` | `u64` |  |
| `tag` | `RawBuf` |  |
| `out` | `RawBuf` |  |

**Returns:** `bool`

---

### <a id="feLoadLe64"></a>`feLoadLe64`

&gt; 📄 `old_field.vx` L5-16

```vex
fn feLoadLe64(buf: RawBuf, off: i64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `RawBuf` |  |
| `off` | `i64` |  |

**Returns:** `u64`

---

### <a id="feZero"></a>`feZero` `🔓 export`

&gt; 📄 `old_field.vx` L24-26

```vex
export fn feZero(): Fe25519
```

**Returns:** `Fe25519`

---

### <a id="feOne"></a>`feOne` `🔓 export`

&gt; 📄 `old_field.vx` L28-30

```vex
export fn feOne(): Fe25519
```

**Returns:** `Fe25519`

---

### <a id="feCopy"></a>`feCopy` `🔓 export`

&gt; 📄 `old_field.vx` L33-35

```vex
export fn feCopy(f: &Fe25519): Fe25519
```

Copy a field element (creates a new value from a reference)

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `f` | `&Fe25519` |  |

**Returns:** `Fe25519`

---

### <a id="feFromBytes"></a>`feFromBytes` `🔓 export`

&gt; 📄 `old_field.vx` L38-54

```vex
export fn feFromBytes(b: RawBuf): Fe25519
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `RawBuf` |  |

**Returns:** `Fe25519`

---

### <a id="feToBytes"></a>`feToBytes` `🔓 export`

&gt; 📄 `old_field.vx` L57-88

```vex
export fn feToBytes(f: Fe25519, out: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `f` | `Fe25519` |  |
| `out` | `RawBuf` |  |

---

### <a id="feCarryPropagate"></a>`feCarryPropagate`

&gt; 📄 `old_field.vx` L90-115

```vex
fn feCarryPropagate(f: Fe25519): Fe25519
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `f` | `Fe25519` |  |

**Returns:** `Fe25519`

---

### <a id="feReduce"></a>`feReduce`

&gt; 📄 `old_field.vx` L117-154

```vex
fn feReduce(f: Fe25519): Fe25519
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `f` | `Fe25519` |  |

**Returns:** `Fe25519`

---

### <a id="feAdd"></a>`feAdd` `🔓 export`

&gt; 📄 `old_field.vx` L156-164

```vex
export fn feAdd(a: Fe25519, b: Fe25519): Fe25519
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `Fe25519` |  |
| `b` | `Fe25519` |  |

**Returns:** `Fe25519`

---

### <a id="feSub"></a>`feSub` `🔓 export`

&gt; 📄 `old_field.vx` L166-178

```vex
export fn feSub(a: Fe25519, b: Fe25519): Fe25519
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `Fe25519` |  |
| `b` | `Fe25519` |  |

**Returns:** `Fe25519`

---

### <a id="mulAdd"></a>`mulAdd`

&gt; 📄 `old_field.vx` L188-214

```vex
fn mulAdd(a: u64, b: u64, carry_lo: u64, carry_hi: u64): W128
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `u64` |  |
| `b` | `u64` |  |
| `carry_lo` | `u64` |  |
| `carry_hi` | `u64` |  |

**Returns:** `W128`

---

### <a id="feMul"></a>`feMul` `🔓 export`

&gt; 📄 `old_field.vx` L216-311

```vex
export fn feMul(a: Fe25519, b: Fe25519): Fe25519
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `Fe25519` |  |
| `b` | `Fe25519` |  |

**Returns:** `Fe25519`

---

### <a id="feSq"></a>`feSq` `🔓 export`

&gt; 📄 `old_field.vx` L313-316

```vex
export fn feSq(a: Fe25519): Fe25519
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `Fe25519` |  |

**Returns:** `Fe25519`

---

### <a id="feSqN"></a>`feSqN`

&gt; 📄 `old_field.vx` L319-328

```vex
fn feSqN(a: Fe25519, n: i64): Fe25519
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `Fe25519` |  |
| `n` | `i64` |  |

**Returns:** `Fe25519`

---

### <a id="feInvert"></a>`feInvert` `🔓 export`

&gt; 📄 `old_field.vx` L331-375

```vex
export fn feInvert(z: Fe25519): Fe25519
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `z` | `Fe25519` |  |

**Returns:** `Fe25519`

---

### <a id="feCSwap"></a>`feCSwap` `🔓 export`

&gt; 📄 `old_field.vx` L378-387

```vex
export fn feCSwap(a: &Fe25519!, b: &Fe25519!, swap: u64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `&Fe25519!` |  |
| `b` | `&Fe25519!` |  |
| `swap` | `u64` |  |

---

### <a id="xtime"></a>`xtime`

&gt; 📄 `aes.vx` L3-10

```vex
fn xtime(x: u8): u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u8` |  |

**Returns:** `u8`

---

### <a id="gfMul8"></a>`gfMul8`

&gt; 📄 `aes.vx` L12-31

```vex
fn gfMul8(a: u8, b: u8): u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `u8` |  |
| `b` | `u8` |  |

**Returns:** `u8`

---

### <a id="gfPow8"></a>`gfPow8`

&gt; 📄 `aes.vx` L33-46

```vex
fn gfPow8(a: u8, exp: u32): u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `u8` |  |
| `exp` | `u32` |  |

**Returns:** `u8`

---

### <a id="rotl8"></a>`rotl8`

&gt; 📄 `aes.vx` L48-50

```vex
fn rotl8(x: u8, n: u8): u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u8` |  |
| `n` | `u8` |  |

**Returns:** `u8`

---

### <a id="sboxByte"></a>`sboxByte`

&gt; 📄 `aes.vx` L52-56

```vex
fn sboxByte(x: u8): u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u8` |  |

**Returns:** `u8`

---

### <a id="addRoundKey"></a>`addRoundKey`

&gt; 📄 `aes.vx` L58-65

```vex
fn addRoundKey(state: RawBuf, roundKeys: RawBuf, round: i64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `state` | `RawBuf` |  |
| `roundKeys` | `RawBuf` |  |
| `round` | `i64` |  |

---

### <a id="subBytes"></a>`subBytes`

&gt; 📄 `aes.vx` L67-73

```vex
fn subBytes(state: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `state` | `RawBuf` |  |

---

### <a id="shiftRows"></a>`shiftRows`

&gt; 📄 `aes.vx` L75-104

```vex
fn shiftRows(state: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `state` | `RawBuf` |  |

---

### <a id="mixColumns"></a>`mixColumns`

&gt; 📄 `aes.vx` L106-127

```vex
fn mixColumns(state: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `state` | `RawBuf` |  |

---

### <a id="rconAt"></a>`rconAt`

&gt; 📄 `aes.vx` L129-137

```vex
fn rconAt(iter: i64): u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `iter` | `i64` |  |

**Returns:** `u8`

---

### <a id="keyExpand256"></a>`keyExpand256`

&gt; 📄 `aes.vx` L139-188

```vex
fn keyExpand256(key: RawBuf): [u8; 240]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `RawBuf` |  |

**Returns:** `[u8; 240]`

---

### <a id="aes256EncryptBlock"></a>`aes256EncryptBlock` `🔓 export`

&gt; 📄 `aes.vx` L192-225

```vex
export fn aes256EncryptBlock(key: RawBuf, input: RawBuf, out: RawBuf)
```

AES-256 encrypt one 16-byte block.

key: 32 bytes, input: 16 bytes.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `RawBuf` |  |
| `input` | `RawBuf` |  |
| `out` | `RawBuf` |  |

---

### <a id="inc32be"></a>`inc32be`

&gt; 📄 `aes.vx` L227-240

```vex
fn inc32be(counterBlock: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `counterBlock` | `RawBuf` |  |

---

### <a id="aes256CtrXor"></a>`aes256CtrXor` `🔓 export`

&gt; 📄 `aes.vx` L244-270

```vex
export fn aes256CtrXor(key: RawBuf, counter0: RawBuf, input: RawBuf, len: u64, out: RawBuf)
```

AES-256 CTR XOR helper (counter block is 16-byte J0-like block).

Uses inc32 in big-endian per GCM convention.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `RawBuf` |  |
| `counter0` | `RawBuf` |  |
| `input` | `RawBuf` |  |
| `len` | `u64` |  |
| `out` | `RawBuf` |  |

---

### <a id="xorBlocks"></a>`xorBlocks` `🔓 export`

&gt; 📄 `simd.vx` L6-12

```vex
export fn xorBlocks(dst: RawBuf, a: RawBuf, b: RawBuf, bytes: u64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `dst` | `RawBuf` |  |
| `a` | `RawBuf` |  |
| `b` | `RawBuf` |  |
| `bytes` | `u64` |  |

---

### <a id="addU32Blocks"></a>`addU32Blocks` `🔓 export`

&gt; 📄 `simd.vx` L14-21

```vex
export fn addU32Blocks(dst: RawBuf, a: RawBuf, b: RawBuf, words: u64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `dst` | `RawBuf` |  |
| `a` | `RawBuf` |  |
| `b` | `RawBuf` |  |
| `words` | `u64` |  |

---

### <a id="rotrU32Blocks"></a>`rotrU32Blocks` `🔓 export`

&gt; 📄 `simd.vx` L23-31

```vex
export fn rotrU32Blocks(dst: RawBuf, src: RawBuf, words: u64, shift: u32)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `dst` | `RawBuf` |  |
| `src` | `RawBuf` |  |
| `words` | `u64` |  |
| `shift` | `u32` |  |

---

### <a id="pointIdentity"></a>`pointIdentity`

&gt; 📄 `old_ed.vx` L21-28

```vex
fn pointIdentity(): ExtPoint
```

**Returns:** `ExtPoint`

---

### <a id="edD"></a>`edD`

&gt; 📄 `old_ed.vx` L31-45

```vex
fn edD(): Fe25519
```

**Returns:** `Fe25519`

---

### <a id="ed2D"></a>`ed2D`

&gt; 📄 `old_ed.vx` L48-52

```vex
fn ed2D(): Fe25519
```

**Returns:** `Fe25519`

---

### <a id="affIdentity"></a>`affIdentity`

&gt; 📄 `old_ed.vx` L61-63

```vex
fn affIdentity(): AffPoint
```

**Returns:** `AffPoint`

---

### <a id="affBasepoint"></a>`affBasepoint`

&gt; 📄 `old_ed.vx` L65-92

```vex
fn affBasepoint(): AffPoint
```

**Returns:** `AffPoint`

---

### <a id="affAdd"></a>`affAdd`

&gt; 📄 `old_ed.vx` L94-119

```vex
fn affAdd(p: AffPoint, q: AffPoint): AffPoint
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `AffPoint` |  |
| `q` | `AffPoint` |  |

**Returns:** `AffPoint`

---

### <a id="affScalarMul"></a>`affScalarMul`

&gt; 📄 `old_ed.vx` L121-139

```vex
fn affScalarMul(scalar: RawBuf, point: AffPoint): AffPoint
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `scalar` | `RawBuf` |  |
| `point` | `AffPoint` |  |

**Returns:** `AffPoint`

---

### <a id="feCopyAff"></a>`feCopyAff`

&gt; 📄 `old_ed.vx` L141-143

```vex
fn feCopyAff(p: &AffPoint): AffPoint
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `&AffPoint` |  |

**Returns:** `AffPoint`

---

### <a id="affEncode"></a>`affEncode`

&gt; 📄 `old_ed.vx` L145-154

```vex
fn affEncode(p: AffPoint, out: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `AffPoint` |  |
| `out` | `RawBuf` |  |

---

### <a id="feEq"></a>`feEq`

&gt; 📄 `old_ed.vx` L156-169

```vex
fn feEq(a: Fe25519, b: Fe25519): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `Fe25519` |  |
| `b` | `Fe25519` |  |

**Returns:** `bool`

---

### <a id="fePowConst"></a>`fePowConst`

&gt; 📄 `old_ed.vx` L171-187

```vex
fn fePowConst(base: Fe25519, expLe: RawBuf): Fe25519
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `base` | `Fe25519` |  |
| `expLe` | `RawBuf` |  |

**Returns:** `Fe25519`

---

### <a id="feSqrtM1"></a>`feSqrtM1`

&gt; 📄 `old_ed.vx` L189-202

```vex
fn feSqrtM1(): Fe25519
```

**Returns:** `Fe25519`

---

### <a id="feSqrtRatio"></a>`feSqrtRatio`

&gt; 📄 `old_ed.vx` L204-232

```vex
fn feSqrtRatio(u: Fe25519, v: Fe25519): (bool, Fe25519)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `u` | `Fe25519` |  |
| `v` | `Fe25519` |  |

**Returns:** `(bool, Fe25519)`

---

### <a id="scalarLessThanL"></a>`scalarLessThanL`

&gt; 📄 `old_ed.vx` L234-249

```vex
fn scalarLessThanL(s: RawBuf): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `RawBuf` |  |

**Returns:** `bool`

---

### <a id="affDecodeCompressed"></a>`affDecodeCompressed`

&gt; 📄 `old_ed.vx` L251-283

```vex
fn affDecodeCompressed(in32: RawBuf): (bool, AffPoint)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `in32` | `RawBuf` |  |

**Returns:** `(bool, AffPoint)`

---

### <a id="affToExt"></a>`affToExt`

&gt; 📄 `old_ed.vx` L285-296

```vex
fn affToExt(p: AffPoint): ExtPoint
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `AffPoint` |  |

**Returns:** `ExtPoint`

---

### <a id="pointDouble"></a>`pointDouble`

&gt; 📄 `old_ed.vx` L299-323

```vex
fn pointDouble(p: ExtPoint): ExtPoint
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `ExtPoint` |  |

**Returns:** `ExtPoint`

---

### <a id="pointAdd"></a>`pointAdd`

&gt; 📄 `old_ed.vx` L326-367

```vex
fn pointAdd(p: ExtPoint, q: ExtPoint): ExtPoint
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `ExtPoint` |  |
| `q` | `ExtPoint` |  |

**Returns:** `ExtPoint`

---

### <a id="scalarMul"></a>`scalarMul`

&gt; 📄 `old_ed.vx` L370-393

```vex
fn scalarMul(scalar: RawBuf, point: ExtPoint): ExtPoint
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `scalar` | `RawBuf` |  |
| `point` | `ExtPoint` |  |

**Returns:** `ExtPoint`

---

### <a id="pointEncode"></a>`pointEncode`

&gt; 📄 `old_ed.vx` L396-411

```vex
fn pointEncode(p: ExtPoint, out: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `ExtPoint` |  |
| `out` | `RawBuf` |  |

---

### <a id="basepointExt"></a>`basepointExt`

&gt; 📄 `old_ed.vx` L414-450

```vex
fn basepointExt(): ExtPoint
```

**Returns:** `ExtPoint`

---

### <a id="scalarL"></a>`scalarL`

&gt; 📄 `old_ed.vx` L454-465

```vex
fn scalarL(): [u8; 32]
```

**Returns:** `[u8; 32]`

---

### <a id="cmpLeNum"></a>`cmpLeNum`

&gt; 📄 `old_ed.vx` L467-482

```vex
fn cmpLeNum(a: RawBuf, aLen: i64, b: RawBuf, bLen: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `RawBuf` |  |
| `aLen` | `i64` |  |
| `b` | `RawBuf` |  |
| `bLen` | `i64` |  |

**Returns:** `i32`

---

### <a id="subLeInPlace"></a>`subLeInPlace`

&gt; 📄 `old_ed.vx` L484-500

```vex
fn subLeInPlace(a: RawBuf, b: RawBuf, len: i64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `RawBuf` |  |
| `b` | `RawBuf` |  |
| `len` | `i64` |  |

---

### <a id="reduceModL64"></a>`reduceModL64`

&gt; 📄 `old_ed.vx` L502-556

```vex
fn reduceModL64(x64: RawBuf): [u8; 32]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x64` | `RawBuf` |  |

**Returns:** `[u8; 32]`

---

### <a id="mulScalar32"></a>`mulScalar32`

&gt; 📄 `old_ed.vx` L558-593

```vex
fn mulScalar32(a: RawBuf, b: RawBuf): [u8; 64]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `RawBuf` |  |
| `b` | `RawBuf` |  |

**Returns:** `[u8; 64]`

---

### <a id="scMulAdd"></a>`scMulAdd`

&gt; 📄 `old_ed.vx` L595-616

```vex
fn scMulAdd(r: RawBuf, k: RawBuf, a: RawBuf): [u8; 32]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `r` | `RawBuf` |  |
| `k` | `RawBuf` |  |
| `a` | `RawBuf` |  |

**Returns:** `[u8; 32]`

---

### <a id="scReduce"></a>`scReduce`

&gt; 📄 `old_ed.vx` L618-620

```vex
fn scReduce(hash: RawBuf): [u8; 32]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `hash` | `RawBuf` |  |

**Returns:** `[u8; 32]`

---

### <a id="ed25519PublicKey"></a>`ed25519PublicKey` `🔓 export`

&gt; 📄 `old_ed.vx` L625-638

```vex
export fn ed25519PublicKey(pubOut: RawBuf, privateKey: RawBuf)
```

Ed25519 key pair generation.

privateKey: 32 random bytes.
Writes 32-byte public key to pubOut.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `pubOut` | `RawBuf` |  |
| `privateKey` | `RawBuf` |  |

---

### <a id="ed25519Sign"></a>`ed25519Sign` `🔓 export`

&gt; 📄 `old_ed.vx` L643-740

```vex
export fn ed25519Sign(sigOut: RawBuf, privateKey: RawBuf, message: RawBuf, msgLen: u64)
```

Ed25519 sign a message.

Writes 64-byte signature to sigOut.
privateKey: 32 bytes, message: raw bytes.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `sigOut` | `RawBuf` |  |
| `privateKey` | `RawBuf` |  |
| `message` | `RawBuf` |  |
| `msgLen` | `u64` |  |

---

### <a id="ed25519SignHex"></a>`ed25519SignHex` `🔓 export`

&gt; 📄 `old_ed.vx` L743-747

```vex
export fn ed25519SignHex(privateKey: RawBuf, message: RawBuf, msgLen: u64): string
```

Ed25519 sign returning hex(signature[64]).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `privateKey` | `RawBuf` |  |
| `message` | `RawBuf` |  |
| `msgLen` | `u64` |  |

**Returns:** `string`

---

### <a id="ed25519Verify"></a>`ed25519Verify` `🔓 export`

&gt; 📄 `old_ed.vx` L750-828

```vex
export fn ed25519Verify(signature: RawBuf, publicKey: RawBuf, message: RawBuf, msgLen: u64): bool
```

Ed25519 verify: returns true iff signature is valid.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `signature` | `RawBuf` |  |
| `publicKey` | `RawBuf` |  |
| `message` | `RawBuf` |  |
| `msgLen` | `u64` |  |

**Returns:** `bool`

---

### <a id="ed25519PublicKeyHex"></a>`ed25519PublicKeyHex` `🔓 export`

&gt; 📄 `old_ed.vx` L831-835

```vex
export fn ed25519PublicKeyHex(privateKey: RawBuf): string
```

Ed25519 public key generation returning hex.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `privateKey` | `RawBuf` |  |

**Returns:** `string`

---

### <a id="ed25519BasepointHex"></a>`ed25519BasepointHex` `🔓 export`

&gt; 📄 `old_ed.vx` L838-842

```vex
export fn ed25519BasepointHex(): string
```

Diagnostic helper: return encoded Ed25519 basepoint.

**Returns:** `string`

---

### <a id="ed25519MulBaseHex"></a>`ed25519MulBaseHex` `🔓 export`

&gt; 📄 `old_ed.vx` L845-850

```vex
export fn ed25519MulBaseHex(scalar: RawBuf): string
```

Diagnostic helper: encode scalar*B for a raw 32-byte scalar.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `scalar` | `RawBuf` |  |

**Returns:** `string`

---

### <a id="rol32"></a>`rol32`

&gt; 📄 `sha1.vx` L3-5

```vex
fn rol32(x: u32, n: u32): u32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u32` |  |
| `n` | `u32` |  |

**Returns:** `u32`

---

### <a id="newSha1"></a>`newSha1` `🔓 export`

&gt; 📄 `sha1.vx` L35-37

```vex
export fn newSha1(): Sha1
```

**Returns:** `Sha1`

---

### <a id="sha1To"></a>`sha1To` `🔓 export`

&gt; 📄 `sha1.vx` L190-194

```vex
export fn sha1To(data: RawBuf, len: u64, out: *u8)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `RawBuf` |  |
| `len` | `u64` |  |
| `out` | `*u8` |  |

---

### <a id="sha1Hex"></a>`sha1Hex` `🔓 export`

&gt; 📄 `sha1.vx` L196-204

```vex
export fn sha1Hex(data: str): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |

**Returns:** `string`

---

### <a id="rotr32"></a>`rotr32`

&gt; 📄 `sha256.vx` L3-5

```vex
fn rotr32(x: u32, n: u32): u32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u32` |  |
| `n` | `u32` |  |

**Returns:** `u32`

---

### <a id="ch"></a>`ch`

&gt; 📄 `sha256.vx` L7-9

```vex
fn ch(x: u32, y: u32, z: u32): u32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u32` |  |
| `y` | `u32` |  |
| `z` | `u32` |  |

**Returns:** `u32`

---

### <a id="maj"></a>`maj`

&gt; 📄 `sha256.vx` L11-13

```vex
fn maj(x: u32, y: u32, z: u32): u32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u32` |  |
| `y` | `u32` |  |
| `z` | `u32` |  |

**Returns:** `u32`

---

### <a id="bsig0"></a>`bsig0`

&gt; 📄 `sha256.vx` L15-17

```vex
fn bsig0(x: u32): u32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u32` |  |

**Returns:** `u32`

---

### <a id="bsig1"></a>`bsig1`

&gt; 📄 `sha256.vx` L19-21

```vex
fn bsig1(x: u32): u32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u32` |  |

**Returns:** `u32`

---

### <a id="ssig0"></a>`ssig0`

&gt; 📄 `sha256.vx` L23-25

```vex
fn ssig0(x: u32): u32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u32` |  |

**Returns:** `u32`

---

### <a id="ssig1"></a>`ssig1`

&gt; 📄 `sha256.vx` L27-29

```vex
fn ssig1(x: u32): u32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u32` |  |

**Returns:** `u32`

---

### <a id="k256"></a>`k256`

&gt; 📄 `sha256.vx` L31-67

```vex
fn k256(t: i64): u32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `i64` |  |

**Returns:** `u32`

---

### <a id="newSha256"></a>`newSha256` `🔓 export`

&gt; 📄 `sha256.vx` L100-102

```vex
export fn newSha256(): Sha256
```

**Returns:** `Sha256`

---

### <a id="sha256To"></a>`sha256To` `🔓 export`

&gt; 📄 `sha256.vx` L245-249

```vex
export fn sha256To(data: RawBuf, len: u64, out: *u8)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `RawBuf` |  |
| `len` | `u64` |  |
| `out` | `*u8` |  |

---

### <a id="sha256Hex"></a>`sha256Hex` `🔓 export`

&gt; 📄 `sha256.vx` L251-263

```vex
export fn sha256Hex(data: str): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |

**Returns:** `string`

---

---

*Generated by vex-doc v2.0 • 2026-07-06*
