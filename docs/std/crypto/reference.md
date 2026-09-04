# Project v0.0.0

## Overview

**Structs:** [`ChaCha20Poly1305`](#ChaCha20Poly1305) · [`Aes128Gcm`](#Aes128Gcm) · [`Aes256Gcm`](#Aes256Gcm) · [`HkdfSha256`](#HkdfSha256) · [`HkdfSha384`](#HkdfSha384) · [`Pbkdf2Sha256`](#Pbkdf2Sha256) · [`X25519`](#X25519) · [`Ed25519`](#Ed25519) · [`Poly1305`](#Poly1305) · [`Fe25519`](#Fe25519) · [`ExtPoint`](#ExtPoint) · [`AffPoint`](#AffPoint) · [`CryptoError`](#CryptoError) · [`Argon2Parameters`](#Argon2Parameters) · [`Argon2id`](#Argon2id) · [`Sha512`](#Sha512) · [`Sha384`](#Sha384) · [`Sha1`](#Sha1) · [`Sha256`](#Sha256)

**Enums:** [`CryptoErrorKind`](#CryptoErrorKind)

**Contracts:** [`Digest32`](#Digest32) · [`Mac32`](#Mac32)

**Functions:** [`pbkdf2Sha256`](#pbkdf2Sha256) · [`pbkdf2Sha256Hex`](#pbkdf2Sha256Hex) · [`cryptoError`](#cryptoError) · [`clearSensitiveOutput`](#clearSensitiveOutput) · [`validateExactLength`](#validateExactLength) · [`spansOverlapOutput`](#spansOverlapOutput) · [`checkedTaggedLength`](#checkedTaggedLength) · [`prepareDetachedInputs`](#prepareDetachedInputs) · [`aesGcmSealDetachedInto`](#aesGcmSealDetachedInto) · [`aesGcmOpenDetachedInto`](#aesGcmOpenDetachedInto) · [`hexChar`](#hexChar) · [`fromHexNibble`](#fromHexNibble) · [`hexEncode`](#hexEncode) · [`hexDecodeTo`](#hexDecodeTo) · [`hkdfExtract`](#hkdfExtract) · [`hkdfExpand`](#hkdfExpand) · [`hkdf`](#hkdf) · [`hkdfExtractSha384`](#hkdfExtractSha384) · [`hkdfExpandSha384`](#hkdfExpandSha384) · [`hkdfSha384`](#hkdfSha384) · [`storeLe64`](#storeLe64) · [`storeBe64`](#storeBe64) · [`p1305LoadLe32`](#p1305LoadLe32) · [`newPoly1305`](#newPoly1305) · [`poly1305Auth`](#poly1305Auth) · [`rotl32`](#rotl32) · [`loadLe32`](#loadLe32) · [`storeLe32`](#storeLe32) · [`quarterRound`](#quarterRound) · [`chacha20Block`](#chacha20Block) · [`chacha20Xor`](#chacha20Xor) · [`feLoadLe64`](#feLoadLe64) · [`feZero`](#feZero) · [`feOne`](#feOne) · [`feCopy`](#feCopy) · [`feFromBytes`](#feFromBytes) · [`feToBytes`](#feToBytes) · [`feCarryPropagate`](#feCarryPropagate) · [`feReduce`](#feReduce) · [`feAdd`](#feAdd) · [`feSub`](#feSub) · [`feReduceWide`](#feReduceWide) · [`feMul`](#feMul) · [`feMulSmall`](#feMulSmall) · [`feSq`](#feSq) · [`feSqN`](#feSqN) · [`feInvert`](#feInvert) · [`feCSwap`](#feCSwap) · [`pointIdentity`](#pointIdentity) · [`edD`](#edD) · [`ed2D`](#ed2D) · [`affIdentity`](#affIdentity) · [`affBasepoint`](#affBasepoint) · [`affAdd`](#affAdd) · [`affScalarMul`](#affScalarMul) · [`feCopyAff`](#feCopyAff) · [`affEncode`](#affEncode) · [`feEq`](#feEq) · [`fePowConst`](#fePowConst) · [`feSqrtM1`](#feSqrtM1) · [`feSqrtRatio`](#feSqrtRatio) · [`scalarLessThanL`](#scalarLessThanL) · [`affDecodeCompressed`](#affDecodeCompressed) · [`affToExt`](#affToExt) · [`pointDouble`](#pointDouble) · [`pointAdd`](#pointAdd) · [`pointCopy`](#pointCopy) · [`pointCmov`](#pointCmov) · [`ctEqNibble`](#ctEqNibble) · [`scalarMul`](#scalarMul) · [`extIsIdentity`](#extIsIdentity) · [`extHasSmallOrder`](#extHasSmallOrder) · [`pointEncode`](#pointEncode) · [`basepointExt`](#basepointExt) · [`scalarL`](#scalarL) · [`reduceModL64`](#reduceModL64) · [`mulScalar32`](#mulScalar32) · [`scMulAdd`](#scMulAdd) · [`scReduce`](#scReduce) · [`ed25519PublicKey`](#ed25519PublicKey) · [`ed25519Sign`](#ed25519Sign) · [`ed25519SignHex`](#ed25519SignHex) · [`ed25519Verify`](#ed25519Verify) · [`ed25519PublicKeyHex`](#ed25519PublicKeyHex) · [`ed25519BasepointHex`](#ed25519BasepointHex) · [`ed25519MulBaseHex`](#ed25519MulBaseHex) · [`ctEq`](#ctEq) · [`xorInto`](#xorInto) · [`xorInPlace`](#xorInPlace) · [`zeroize`](#zeroize) · [`hmacSha1To`](#hmacSha1To) · [`hmacSha256To`](#hmacSha256To) · [`hmacSha256PartsTo`](#hmacSha256PartsTo) · [`hmacSha384PartsTo`](#hmacSha384PartsTo) · [`hmacSha384To`](#hmacSha384To) · [`hmacSha384Hex`](#hmacSha384Hex) · [`hmacSha256Hex`](#hmacSha256Hex) · [`hmacVerifySha256Hex`](#hmacVerifySha256Hex) · [`rotr64`](#rotr64) · [`loadLe64`](#loadLe64) · [`storeLe64`](#storeLe64) · [`ivAt`](#ivAt) · [`sigmaRow`](#sigmaRow) · [`g`](#g) · [`compress`](#compress) · [`blake2bTo`](#blake2bTo) · [`blake2bHex`](#blake2bHex) · [`loadLe64`](#loadLe64) · [`low32`](#low32) · [`rotr64`](#rotr64) · [`add64`](#add64) · [`blamka`](#blamka) · [`storeLe64`](#storeLe64) · [`storeLe32`](#storeLe32) · [`roundedMemoryKiB`](#roundedMemoryKiB) · [`validParams`](#validParams) · [`clearOutputIfRepresentable`](#clearOutputIfRepresentable) · [`invalidArgonParameter`](#invalidArgonParameter) · [`hash2ToLen`](#hash2ToLen) · [`hPrimeTo`](#hPrimeTo) · [`blockOffset`](#blockOffset) · [`gbMix`](#gbMix) · [`roundBlockInPlace`](#roundBlockInPlace) · [`fillBlock`](#fillBlock) · [`nextAddressBlock`](#nextAddressBlock) · [`selectRefIndex`](#selectRefIndex) · [`seedInitBlock`](#seedInitBlock) · [`argon2DeriveVariant`](#argon2DeriveVariant) · [`argon2DeriveVariantEx`](#argon2DeriveVariantEx) · [`argon2idDerive`](#argon2idDerive) · [`argon2idDeriveEx`](#argon2idDeriveEx) · [`argon2iDerive`](#argon2iDerive) · [`argon2iDeriveEx`](#argon2iDeriveEx) · [`argon2dDerive`](#argon2dDerive) · [`argon2dDeriveEx`](#argon2dDeriveEx) · [`clearArgonVec`](#clearArgonVec) · [`argonSpanOverlapsOutput`](#argonSpanOverlapsOutput) · [`validateArgonFacade`](#validateArgonFacade) · [`x25519`](#x25519) · [`x25519Basepoint`](#x25519Basepoint) · [`x25519Hex`](#x25519Hex) · [`reverseBits64`](#reverseBits64) · [`ghashMulReflected`](#ghashMulReflected) · [`ghashUpdateReflected`](#ghashUpdateReflected) · [`ghashBlockReflected`](#ghashBlockReflected) · [`ghashUpdateFourReflected`](#ghashUpdateFourReflected) · [`ghashAll`](#ghashAll) · [`encryptBlockWithSchedule`](#encryptBlockWithSchedule) · [`ctrXorWithSchedule`](#ctrXorWithSchedule) · [`validateGcmLengths`](#validateGcmLengths) · [`gcmEncryptWithSchedule`](#gcmEncryptWithSchedule) · [`gcmDecryptWithSchedule`](#gcmDecryptWithSchedule) · [`aes128GcmEncrypt`](#aes128GcmEncrypt) · [`aes128GcmDecrypt`](#aes128GcmDecrypt) · [`aes256GcmEncrypt`](#aes256GcmEncrypt) · [`aes256GcmDecrypt`](#aes256GcmDecrypt) · [`rotr64`](#rotr64) · [`ch512`](#ch512) · [`maj512`](#maj512) · [`bsig0_512`](#bsig0_512) · [`bsig1_512`](#bsig1_512) · [`ssig0_512`](#ssig0_512) · [`ssig1_512`](#ssig1_512) · [`bswap64`](#bswap64) · [`k512`](#k512) · [`sha512Hex`](#sha512Hex) · [`sha512To`](#sha512To) · [`sha384Hex`](#sha384Hex) · [`sha384To`](#sha384To) · [`loadLe32`](#loadLe32) · [`rotl32`](#rotl32) · [`qr`](#qr) · [`pack64`](#pack64) · [`chacha20Block4Way`](#chacha20Block4Way) · [`b64At`](#b64At) · [`base64Encode`](#base64Encode) · [`base64EncodeString`](#base64EncodeString) · [`computeAeadTag`](#computeAeadTag) · [`aeadEncrypt`](#aeadEncrypt) · [`aeadDecrypt`](#aeadDecrypt) · [`xtime`](#xtime) · [`gfMul8`](#gfMul8) · [`gfPow8`](#gfPow8) · [`rotl8`](#rotl8) · [`sboxByte`](#sboxByte) · [`rconAt`](#rconAt) · [`aes256ExpandKey`](#aes256ExpandKey) · [`aes128ExpandKey`](#aes128ExpandKey) · [`aesEncryptBlockWithRk`](#aesEncryptBlockWithRk) · [`aes128EncryptBlockWithRk`](#aes128EncryptBlockWithRk) · [`aes128EncryptBlock`](#aes128EncryptBlock) · [`aes256EncryptBlockWithRk`](#aes256EncryptBlockWithRk) · [`aes256EncryptBlock`](#aes256EncryptBlock) · [`counter32be`](#counter32be) · [`inc32be`](#inc32be) · [`validateIncrementingCtrRequest`](#validateIncrementingCtrRequest) · [`aes256CtrXorWithRk`](#aes256CtrXorWithRk) · [`aes256CtrXor`](#aes256CtrXor) · [`aes128CtrXorWithRk`](#aes128CtrXorWithRk) · [`aes128CtrXor`](#aes128CtrXor) · [`aes128CtrXorFromInitialCounter`](#aes128CtrXorFromInitialCounter) · [`xorBlocks`](#xorBlocks) · [`addU32Blocks`](#addU32Blocks) · [`rotrU32Blocks`](#rotrU32Blocks) · [`rol32`](#rol32) · [`newSha1`](#newSha1) · [`sha1To`](#sha1To) · [`sha1Hex`](#sha1Hex) · [`bswap32`](#bswap32) · [`k256`](#k256) · [`newSha256`](#newSha256) · [`sha256To`](#sha256To) · [`sha256Hex`](#sha256Hex)

**Constants:** [`shiftLe`](#shiftLe) · [`shiftBe`](#shiftBe) · [`MASK32`](#MASK32) · [`MASK64`](#MASK64) · [`ARGON2D_VARIANT`](#ARGON2D_VARIANT) · [`ARGON2I_VARIANT`](#ARGON2I_VARIANT) · [`ARGON2ID_VARIANT`](#ARGON2ID_VARIANT) · [`ARGON2_VERSION_13`](#ARGON2_VERSION_13) · [`ARGON2_BLOCK_BYTES`](#ARGON2_BLOCK_BYTES) · [`K256`](#K256)

## Constants

### <a id="shiftLe"></a>`shiftLe`

> 📄 `utils.vx` L2-2

```vex
const shiftLe: [u8;8]=[0,8,16,24,32,40,48,56];
```

**Returns:** `[u8;8]=[0,8,16,24,32,40,48,56];`

---

### <a id="shiftBe"></a>`shiftBe`

> 📄 `utils.vx` L3-3

```vex
const shiftBe: [u8;8]=[56,48,40,32,24,16,8,0];
```

**Returns:** `[u8;8]=[56,48,40,32,24,16,8,0];`

---

### <a id="MASK32"></a>`MASK32`

> 📄 `argon2id.vx` L7-7

```vex
const MASK32: u64=0xffffffff;
```

**Returns:** `u64=0xffffffff;`

---

### <a id="MASK64"></a>`MASK64`

> 📄 `argon2id.vx` L8-8

```vex
const MASK64: u64=0xffffffffffffffff;
```

**Returns:** `u64=0xffffffffffffffff;`

---

### <a id="ARGON2D_VARIANT"></a>`ARGON2D_VARIANT`

> 📄 `argon2id.vx` L213-213

```vex
const ARGON2D_VARIANT: u8=0;
```

**Returns:** `u8=0;`

---

### <a id="ARGON2I_VARIANT"></a>`ARGON2I_VARIANT`

> 📄 `argon2id.vx` L214-214

```vex
const ARGON2I_VARIANT: u8=1;
```

**Returns:** `u8=1;`

---

### <a id="ARGON2ID_VARIANT"></a>`ARGON2ID_VARIANT`

> 📄 `argon2id.vx` L215-215

```vex
const ARGON2ID_VARIANT: u8=2;
```

**Returns:** `u8=2;`

---

### <a id="ARGON2_VERSION_13"></a>`ARGON2_VERSION_13`

> 📄 `argon2id.vx` L216-216

```vex
const ARGON2_VERSION_13: u64=0x13;
```

**Returns:** `u64=0x13;`

---

### <a id="ARGON2_BLOCK_BYTES"></a>`ARGON2_BLOCK_BYTES`

> 📄 `argon2id.vx` L217-217

```vex
const ARGON2_BLOCK_BYTES: i64=1024;
```

**Returns:** `i64=1024;`

---

### <a id="K256"></a>`K256`

> 📄 `sha256.vx` L8-25

```vex
const K256: [u32; 64]=[
    0x428a2f98 as u32, 0x71374491 as u32, 0xb5c0fbcf as u32, 0xe9b5dba5 as u32,
    0x3956c25b as u32, 0x59f111f1 as u32, 0x923f82a4 as u32, 0xab1c5ed5 as u32,
    0xd807aa98 as u32, 0x12835b01 as u32, 0x243185be as u32, 0x550c7dc3 as u32,
    0x72be5d74 as u32, 0x80deb1fe as u32, 0x9bdc06a7 as u32, 0xc19bf174 as u32,
    0xe49b69c1 as u32, 0xefbe4786 as u32, 0x0fc19dc6 as u32, 0x240ca1cc as u32,
    0x2de92c6f as u32, 0x4a7484aa as u32, 0x5cb0a9dc as u32, 0x76f988da as u32,
    0x983e5152 as u32, 0xa831c66d as u32, 0xb00327c8 as u32, 0xbf597fc7 as u32,
    0xc6e00bf3 as u32, 0xd5a79147 as u32, 0x06ca6351 as u32, 0x14292967 as u32,
    0x27b70a85 as u32, 0x2e1b2138 as u32, 0x4d2c6dfc as u32, 0x53380d13 as u32,
    0x650a7354 as u32, 0x766a0abb as u32, 0x81c2c92e as u32, 0x92722c85 as u32,
    0xa2bfe8a1 as u32, 0xa81a664b as u32, 0xc24b8b70 as u32, 0xc76c51a3 as u32,
    0xd192e819 as u32, 0xd6990624 as u32, 0xf40e3585 as u32, 0x106aa070 as u32,
    0x19a4c116 as u32, 0x1e376c08 as u32, 0x2748774c as u32, 0x34b0bcb5 as u32,
    0x391c0cb3 as u32, 0x4ed8aa4a as u32, 0x5b9cca4f as u32, 0x682e6ff3 as u32,
    0x748f82ee as u32, 0x78a5636f as u32, 0x84c87814 as u32, 0x8cc70208 as u32,
    0x90befffa as u32, 0xa4506ceb as u32, 0xbef9a3f7 as u32, 0xc67178f2 as u32,
];
```

**Returns:** `[u32; 64]=[
    0x428a2f98 as u32, 0x71374491 as u32, 0xb5c0fbcf as u32, 0xe9b5dba5 as u32,
    0x3956c25b as u32, 0x59f111f1 as u32, 0x923f82a4 as u32, 0xab1c5ed5 as u32,
    0xd807aa98 as u32, 0x12835b01 as u32, 0x243185be as u32, 0x550c7dc3 as u32,
    0x72be5d74 as u32, 0x80deb1fe as u32, 0x9bdc06a7 as u32, 0xc19bf174 as u32,
    0xe49b69c1 as u32, 0xefbe4786 as u32, 0x0fc19dc6 as u32, 0x240ca1cc as u32,
    0x2de92c6f as u32, 0x4a7484aa as u32, 0x5cb0a9dc as u32, 0x76f988da as u32,
    0x983e5152 as u32, 0xa831c66d as u32, 0xb00327c8 as u32, 0xbf597fc7 as u32,
    0xc6e00bf3 as u32, 0xd5a79147 as u32, 0x06ca6351 as u32, 0x14292967 as u32,
    0x27b70a85 as u32, 0x2e1b2138 as u32, 0x4d2c6dfc as u32, 0x53380d13 as u32,
    0x650a7354 as u32, 0x766a0abb as u32, 0x81c2c92e as u32, 0x92722c85 as u32,
    0xa2bfe8a1 as u32, 0xa81a664b as u32, 0xc24b8b70 as u32, 0xc76c51a3 as u32,
    0xd192e819 as u32, 0xd6990624 as u32, 0xf40e3585 as u32, 0x106aa070 as u32,
    0x19a4c116 as u32, 0x1e376c08 as u32, 0x2748774c as u32, 0x34b0bcb5 as u32,
    0x391c0cb3 as u32, 0x4ed8aa4a as u32, 0x5b9cca4f as u32, 0x682e6ff3 as u32,
    0x748f82ee as u32, 0x78a5636f as u32, 0x84c87814 as u32, 0x8cc70208 as u32,
    0x90befffa as u32, 0xa4506ceb as u32, 0xbef9a3f7 as u32, 0xc67178f2 as u32,
];`

---

## Contracts

### <a id="Digest32"></a>`Digest32`

> 📄 `contracts.vx` L48-53

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
| `unknown`[↗](#Digest32.unknown) | `fn unknown(out: Ptr&lt;u8&gt;, out_len: u64)` |  |

---

### <a id="Mac32"></a>`Mac32`

> 📄 `contracts.vx` L55-60

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
| `unknown`[↗](#Mac32.unknown) | `fn unknown(out: Ptr&lt;u8&gt;, out_len: u64)` |  |

---

## Structs

### <a id="ChaCha20Poly1305"></a>`ChaCha20Poly1305` `🔓 export`

> 📄 `api.vx` L19-19

```vex
export struct ChaCha20Poly1305
```

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `ChaCha20Poly1305.sealDetachedInto`[↗](#ChaCha20Poly1305.sealDetachedInto) | `export fn ChaCha20Poly1305.sealDetachedInto(key: S` | Encrypt into caller-reusable storage and return a detached 128-bit tag. |
| `ChaCha20Poly1305.openDetachedInto`[↗](#ChaCha20Poly1305.openDetachedInto) | `export fn ChaCha20Poly1305.openDetachedInto(key: S` | Authenticate before releasing plaintext into caller-reusable storage. |
| `ChaCha20Poly1305.sealInto`[↗](#ChaCha20Poly1305.sealInto) | `export fn ChaCha20Poly1305.sealInto(key: Span&lt;u8&gt;,` | Encrypt to the conventional `ciphertext &#124;&#124; tag` representation. |
| `ChaCha20Poly1305.openInto`[↗](#ChaCha20Poly1305.openInto) | `export fn ChaCha20Poly1305.openInto(key: Span&lt;u8&gt;,` | Open a conventional `ciphertext &#124;&#124; tag` value. |
| `ChaCha20Poly1305.seal`[↗](#ChaCha20Poly1305.seal) | `export fn ChaCha20Poly1305.seal(key: Span&lt;u8&gt;, non` |  |
| `ChaCha20Poly1305.open`[↗](#ChaCha20Poly1305.open) | `export fn ChaCha20Poly1305.open(key: Span&lt;u8&gt;, non` |  |

---

### <a id="Aes128Gcm"></a>`Aes128Gcm` `🔓 export`

> 📄 `api.vx` L20-20

```vex
export struct Aes128Gcm
```

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Aes128Gcm.sealDetachedInto`[↗](#Aes128Gcm.sealDetachedInto) | `export fn Aes128Gcm.sealDetachedInto(key: Span&lt;u8&gt;` | AES-128-GCM detached encryption for protocols such as TLS 1.3. |
| `Aes128Gcm.openDetachedInto`[↗](#Aes128Gcm.openDetachedInto) | `export fn Aes128Gcm.openDetachedInto(key: Span&lt;u8&gt;` |  |
| `Aes128Gcm.sealInto`[↗](#Aes128Gcm.sealInto) | `export fn Aes128Gcm.sealInto(key: Span&lt;u8&gt;, nonce:` |  |
| `Aes128Gcm.openInto`[↗](#Aes128Gcm.openInto) | `export fn Aes128Gcm.openInto(key: Span&lt;u8&gt;, nonce:` |  |
| `Aes128Gcm.seal`[↗](#Aes128Gcm.seal) | `export fn Aes128Gcm.seal(key: Span&lt;u8&gt;, nonce: Spa` |  |
| `Aes128Gcm.open`[↗](#Aes128Gcm.open) | `export fn Aes128Gcm.open(key: Span&lt;u8&gt;, nonce: Spa` |  |

---

### <a id="Aes256Gcm"></a>`Aes256Gcm` `🔓 export`

> 📄 `api.vx` L21-21

```vex
export struct Aes256Gcm
```

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Aes256Gcm.sealDetachedInto`[↗](#Aes256Gcm.sealDetachedInto) | `export fn Aes256Gcm.sealDetachedInto(key: Span&lt;u8&gt;` | AES-256-GCM detached encryption with the checked/reusable contract. |
| `Aes256Gcm.openDetachedInto`[↗](#Aes256Gcm.openDetachedInto) | `export fn Aes256Gcm.openDetachedInto(key: Span&lt;u8&gt;` |  |
| `Aes256Gcm.sealInto`[↗](#Aes256Gcm.sealInto) | `export fn Aes256Gcm.sealInto(key: Span&lt;u8&gt;, nonce:` |  |
| `Aes256Gcm.openInto`[↗](#Aes256Gcm.openInto) | `export fn Aes256Gcm.openInto(key: Span&lt;u8&gt;, nonce:` |  |
| `Aes256Gcm.seal`[↗](#Aes256Gcm.seal) | `export fn Aes256Gcm.seal(key: Span&lt;u8&gt;, nonce: Spa` |  |
| `Aes256Gcm.open`[↗](#Aes256Gcm.open) | `export fn Aes256Gcm.open(key: Span&lt;u8&gt;, nonce: Spa` |  |

---

### <a id="HkdfSha256"></a>`HkdfSha256` `🔓 export`

> 📄 `api.vx` L22-22

```vex
export struct HkdfSha256
```

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `HkdfSha256.extract`[↗](#HkdfSha256.extract) | `export fn HkdfSha256.extract(salt: Span&lt;u8&gt;, input` | Extract a fixed 32-byte pseudorandom key without exposing raw pointers. |
| `HkdfSha256.expandInto`[↗](#HkdfSha256.expandInto) | `export fn HkdfSha256.expandInto(prk: Span&lt;u8&gt;, inf` | Expand a 32-byte PRK into caller-reusable storage. RFC 5869's 8160-byte |
| `HkdfSha256.deriveInto`[↗](#HkdfSha256.deriveInto) | `export fn HkdfSha256.deriveInto(salt: Span&lt;u8&gt;, in` | One-shot HKDF-SHA256 derivation into caller-reusable storage. |
| `HkdfSha256.derive`[↗](#HkdfSha256.derive) | `export fn HkdfSha256.derive(salt: Span&lt;u8&gt;, inputK` |  |

---

### <a id="HkdfSha384"></a>`HkdfSha384` `🔓 export`

> 📄 `api.vx` L23-23

```vex
export struct HkdfSha384
```

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `HkdfSha384.extract`[↗](#HkdfSha384.extract) | `export fn HkdfSha384.extract(salt: Span&lt;u8&gt;, input` | Extract a fixed 48-byte SHA-384 pseudorandom key through safe spans. |
| `HkdfSha384.expandInto`[↗](#HkdfSha384.expandInto) | `export fn HkdfSha384.expandInto(prk: Span&lt;u8&gt;, inf` | Expand a 48-byte PRK into caller-reusable storage. RFC 5869's 12240-byte |
| `HkdfSha384.deriveInto`[↗](#HkdfSha384.deriveInto) | `export fn HkdfSha384.deriveInto(salt: Span&lt;u8&gt;, in` |  |
| `HkdfSha384.derive`[↗](#HkdfSha384.derive) | `export fn HkdfSha384.derive(salt: Span&lt;u8&gt;, inputK` |  |

---

### <a id="Pbkdf2Sha256"></a>`Pbkdf2Sha256` `🔓 export`

> 📄 `api.vx` L24-24

```vex
export struct Pbkdf2Sha256
```

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Pbkdf2Sha256.deriveInto`[↗](#Pbkdf2Sha256.deriveInto) | `export fn Pbkdf2Sha256.deriveInto(password: Span&lt;u` | PBKDF2-HMAC-SHA256 into reusable storage. Iteration count and RFC output |
| `Pbkdf2Sha256.derive`[↗](#Pbkdf2Sha256.derive) | `export fn Pbkdf2Sha256.derive(password: Span&lt;u8&gt;, ` |  |

---

### <a id="X25519"></a>`X25519` `🔓 export`

> 📄 `api.vx` L25-25

```vex
export struct X25519
```

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `X25519.publicKeyTo`[↗](#X25519.publicKeyTo) | `export fn X25519.publicKeyTo(privateKey: Span&lt;u8&gt;,` | Derive an X25519 public key from an exact 32-byte private scalar. |
| `X25519.publicKeyInto`[↗](#X25519.publicKeyInto) | `export fn X25519.publicKeyInto(privateKey: Span&lt;u8` | Derive an X25519 public key into reusable owned storage. |
| `X25519.publicKey`[↗](#X25519.publicKey) | `export fn X25519.publicKey(privateKey: Span&lt;u8&gt;): ` |  |
| `X25519.sharedSecretTo`[↗](#X25519.sharedSecretTo) | `export fn X25519.sharedSecretTo(privateKey: Span&lt;u` | Compute a contributory X25519 shared secret. RFC 7748 permits callers to |
| `X25519.sharedSecretInto`[↗](#X25519.sharedSecretInto) | `export fn X25519.sharedSecretInto(privateKey: Span` | Compute a contributory X25519 shared secret into reusable owned storage. |
| `X25519.sharedSecret`[↗](#X25519.sharedSecret) | `export fn X25519.sharedSecret(privateKey: Span&lt;u8&gt;` |  |

---

### <a id="Ed25519"></a>`Ed25519` `🔓 export`

> 📄 `api.vx` L26-26

```vex
export struct Ed25519
```

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Ed25519.publicKey`[↗](#Ed25519.publicKey) | `export fn Ed25519.publicKey(privateSeed: Span&lt;u8&gt;)` | Derive the RFC 8032 public key for an exact 32-byte private seed. |
| `Ed25519.signInto`[↗](#Ed25519.signInto) | `export fn Ed25519.signInto(privateSeed: Span&lt;u8&gt;, ` | Deterministically sign a message into caller-reusable storage. The private |
| `Ed25519.sign`[↗](#Ed25519.sign) | `export fn Ed25519.sign(privateSeed: Span&lt;u8&gt;, mess` |  |
| `Ed25519.verify`[↗](#Ed25519.verify) | `export fn Ed25519.verify(publicKey: Span&lt;u8&gt;, mess` | Strict verification: canonical encodings, canonical S, and non-small-order |

---

### <a id="Poly1305"></a>`Poly1305` `🔓 export`

> 📄 `poly1305.vx` L10-18

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
| `update`[↗](#Poly1305.update) | `export fn (self: &amp;Poly1305!) update(data: RawBuf, ` |  |
| `processBufferedBlock`[↗](#Poly1305.processBufferedBlock) | `fn (self: &amp;Poly1305!) processBufferedBlock(hibit: ` |  |
| `processDataBlock`[↗](#Poly1305.processDataBlock) | `fn (self: &amp;Poly1305!) processDataBlock(data: RawBu` |  |
| `processWords`[↗](#Poly1305.processWords) | `fn (self: &amp;Poly1305!) processWords(t0: u32, t1: u3` |  |
| `finalize`[↗](#Poly1305.finalize) | `export fn (self: &amp;Poly1305!) finalize(): [u8; 16]` |  |

---

### <a id="Fe25519"></a>`Fe25519` `🔓 export`

> 📄 `field25519.vx` L10-13

```vex
export struct Fe25519
```

Field element in 5x51-bit limbs

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `l` | `[u64; 5]` | 🔓 public |  |

---

### <a id="ExtPoint"></a>`ExtPoint`

> 📄 `ed25519.vx` L12-18

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

> 📄 `ed25519.vx` L52-56

```vex
struct AffPoint
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `x` | `Fe25519` | 🔓 public |  |
| `y` | `Fe25519` | 🔓 public |  |

---

### <a id="CryptoError"></a>`CryptoError` `🔓 export`

> 📄 `contracts.vx` L18-23

```vex
export struct CryptoError
```

Allocation-free cryptographic operation failure. `requested` and `limit`

are byte counts unless the operation documents another unit.

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `kind` | `CryptoErrorKind` | 🔓 public |  |
| `requested` | `u64` | 🔓 public |  |
| `limit` | `u64` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `CryptoError.new`[↗](#CryptoError.new) | `export fn CryptoError.new(kind: CryptoErrorKind, r` |  |
| `message`[↗](#CryptoError.message) | `export fn (self: &amp;CryptoError) message(): str` |  |

---

### <a id="Argon2Parameters"></a>`Argon2Parameters` `🔓 export`

> 📄 `argon2id.vx` L753-758

```vex
export struct Argon2Parameters
```

Public Argon2 cost policy. Memory is expressed in KiB, matching RFC 9106.

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `timeCost` | `u64` | 🔓 public |  |
| `memoryKiB` | `u64` | 🔓 public |  |
| `parallelism` | `u64` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Argon2Parameters.new`[↗](#Argon2Parameters.new) | `export fn Argon2Parameters.new(timeCost: u64, memo` |  |
| `Argon2Parameters.recommended`[↗](#Argon2Parameters.recommended) | `export fn Argon2Parameters.recommended(): Argon2Pa` | RFC 9106's memory-constrained recommendation: 64 MiB, three passes and |

---

### <a id="Argon2id"></a>`Argon2id` `🔓 export`

> 📄 `argon2id.vx` L781-781

```vex
export struct Argon2id
```

Type-safe Argon2id facade. RawBuf kernels remain available for protocol

implementations, while application code should use this Span/Vec surface.

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Argon2id.deriveInto`[↗](#Argon2id.deriveInto) | `export fn Argon2id.deriveInto(password: Span&lt;u8&gt;, ` | Derive into caller-reusable storage. Input/output aliases are staged before |
| `Argon2id.deriveExInto`[↗](#Argon2id.deriveExInto) | `export fn Argon2id.deriveExInto(password: Span&lt;u8&gt;` | RFC 9106 extended derivation with an optional secret (pepper) and |
| `Argon2id.derive`[↗](#Argon2id.derive) | `export fn Argon2id.derive(password: Span&lt;u8&gt;, salt` |  |
| `Argon2id.deriveEx`[↗](#Argon2id.deriveEx) | `export fn Argon2id.deriveEx(password: Span&lt;u8&gt;, sa` |  |

---

### <a id="Sha512"></a>`Sha512` `🔓 export`

> 📄 `sha512.vx` L65-71

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
| `Sha512.new`[↗](#Sha512.new) | `export fn Sha512.new(): Sha512` |  |
| `init`[↗](#Sha512.init) | `export fn (self: &amp;Sha512!) init()` |  |
| `init384`[↗](#Sha512.init384) | `fn (self: &amp;Sha512!) init384()` |  |
| `processBlock512`[↗](#Sha512.processBlock512) | `fn (self: &amp;Sha512!) processBlock512(block: RawBuf,` |  |
| `update512`[↗](#Sha512.update512) | `export fn (self: &amp;Sha512!) update512(data: str)` |  |
| `updateRaw512`[↗](#Sha512.updateRaw512) | `export fn (self: &amp;Sha512!) updateRaw512(data: RawB` |  |
| `sum512Family`[↗](#Sha512.sum512Family) | `fn (self: &amp;Sha512!) sum512Family(out: Ptr&lt;u8&gt;, out` |  |
| `sum512`[↗](#Sha512.sum512) | `export fn (self: &amp;Sha512!) sum512(out: Ptr&lt;u8&gt;, ou` |  |

---

### <a id="Sha384"></a>`Sha384` `🔓 export`

> 📄 `sha512.vx` L77-79

```vex
export struct Sha384
```

SHA-384 shares SHA-512's compression function and block size, but uses

the independent FIPS 180-4 initial state and truncates the digest to 48
bytes. Keeping a single `Sha512` engine avoids a second cryptographic
kernel drifting away from the standard.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `state` | `Sha512` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Sha384.new`[↗](#Sha384.new) | `export fn Sha384.new(): Sha384` |  |
| `update384`[↗](#Sha384.update384) | `export fn (self: &amp;Sha384!) update384(data: str)` |  |
| `updateRaw384`[↗](#Sha384.updateRaw384) | `export fn (self: &amp;Sha384!) updateRaw384(data: RawB` |  |
| `sum384`[↗](#Sha384.sum384) | `export fn (self: &amp;Sha384!) sum384(out: Ptr&lt;u8&gt;, ou` |  |
| `reset384`[↗](#Sha384.reset384) | `export fn (self: &amp;Sha384!) reset384()` | Resets a SHA-384 state to its FIPS 180-4 initial value. |
| `snapshotTo`[↗](#Sha384.snapshotTo) | `export fn (self: &amp;Sha384) snapshotTo(out: Ptr&lt;u8&gt;,` | Writes the digest of the current state without consuming or finalizing it. |

---

### <a id="Sha1"></a>`Sha1` `🔓 export`

> 📄 `sha1.vx` L7-12

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
| `processBlock`[↗](#Sha1.processBlock) | `fn (self: &amp;Sha1!) processBlock(block: RawBuf)` |  |
| `reset`[↗](#Sha1.reset) | `export fn (self: &amp;Sha1!) reset()` |  |
| `update`[↗](#Sha1.update) | `export fn (self: &amp;Sha1!) update(data: str)` |  |
| `updateRaw`[↗](#Sha1.updateRaw) | `export fn (self: &amp;Sha1!) updateRaw(data: RawBuf, l` |  |
| `sum`[↗](#Sha1.sum) | `export fn (self: &amp;Sha1!) sum(out: Ptr&lt;u8&gt;, out_len` |  |

---

### <a id="Sha256"></a>`Sha256` `🔓 export`

> 📄 `sha256.vx` L34-39

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
| `processBlock`[↗](#Sha256.processBlock) | `fn (self: &amp;Sha256!) processBlock(block: RawBuf, of` |  |
| `reset`[↗](#Sha256.reset) | `export fn (self: &amp;Sha256!) reset()` |  |
| `update`[↗](#Sha256.update) | `export fn (self: &amp;Sha256!) update(data: str)` |  |
| `updateRaw`[↗](#Sha256.updateRaw) | `export fn (self: &amp;Sha256!) updateRaw(data: RawBuf,` |  |
| `sum`[↗](#Sha256.sum) | `export fn (self: &amp;Sha256!) sum(out: Ptr&lt;u8&gt;, out_l` |  |
| `snapshotTo`[↗](#Sha256.snapshotTo) | `export fn (self: &amp;Sha256) snapshotTo(out: Ptr&lt;u8&gt;,` | Writes the digest of the current state without consuming or finalizing it. |

---

## Enums

### <a id="CryptoErrorKind"></a>`CryptoErrorKind` `🔓 export`

> 📄 `contracts.vx` L3-14

```vex
export enum CryptoErrorKind
```

**Variants:**

- `InvalidKeyLength`
- `InvalidNonceLength`
- `InvalidTagLength`
- `InvalidSignatureLength`
- `MessageTooLarge`
- `CounterExhausted`
- `AuthenticationFailed`
- `InvalidPublicKey`
- `InvalidParameter`
- `OutOfMemory`

---

## Functions

### <a id="pbkdf2Sha256"></a>`pbkdf2Sha256` `🔓 export`

> 📄 `pbkdf2.vx` L8-103

```vex
export fn pbkdf2Sha256(password: RawBuf, pwdLen: u64, salt: RawBuf, saltLen: u64, iterations: u64, out: RawBuf, outLen: u64): Result<(), CryptoError>
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

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="pbkdf2Sha256Hex"></a>`pbkdf2Sha256Hex` `🔓 export`

> 📄 `pbkdf2.vx` L106-128

```vex
export fn pbkdf2Sha256Hex(password: str, salt: str, iterations: u64, dkLen: u64): Result<string, CryptoError>
```

Convenience: PBKDF2-SHA256 with string inputs, returns hex-encoded output.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `password` | `str` |  |
| `salt` | `str` |  |
| `iterations` | `u64` |  |
| `dkLen` | `u64` |  |

**Returns:** `Result&lt;string, CryptoError&gt;`

---

### <a id="cryptoError"></a>`cryptoError`

> 📄 `api.vx` L28-30

```vex
fn cryptoError(kind: CryptoErrorKind, requested: usize, limit: usize): CryptoError
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `kind` | `CryptoErrorKind` |  |
| `requested` | `usize` |  |
| `limit` | `usize` |  |

**Returns:** `CryptoError`

---

### <a id="clearSensitiveOutput"></a>`clearSensitiveOutput`

> 📄 `api.vx` L32-37

```vex
fn clearSensitiveOutput(output: &Vec<u8>!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `output` | `&amp;Vec&lt;u8&gt;!` |  |

---

### <a id="validateExactLength"></a>`validateExactLength`

> 📄 `api.vx` L39-50

```vex
fn validateExactLength(actual: usize, expected: usize, kind: CryptoErrorKind, output: &Vec<u8>!): Result<(), CryptoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `actual` | `usize` |  |
| `expected` | `usize` |  |
| `kind` | `CryptoErrorKind` |  |
| `output` | `&amp;Vec&lt;u8&gt;!` |  |

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="spansOverlapOutput"></a>`spansOverlapOutput`

> 📄 `api.vx` L52-60

```vex
fn spansOverlapOutput(source: Span<u8>, output: &Vec<u8>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `source` | `Span&lt;u8&gt;` |  |
| `output` | `&amp;Vec&lt;u8&gt;` |  |

**Returns:** `bool`

---

### <a id="checkedTaggedLength"></a>`checkedTaggedLength`

> 📄 `api.vx` L62-68

```vex
fn checkedTaggedLength(length: usize, output: &Vec<u8>!): Result<usize, CryptoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `length` | `usize` |  |
| `output` | `&amp;Vec&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, CryptoError&gt;`

---

### <a id="prepareDetachedInputs"></a>`prepareDetachedInputs`

> 📄 `api.vx` L70-89

```vex
fn prepareDetachedInputs(key: Span<u8>, nonce: Span<u8>, tag: Span<u8>, output: &Vec<u8>!): Result<(), CryptoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `Span&lt;u8&gt;` |  |
| `nonce` | `Span&lt;u8&gt;` |  |
| `tag` | `Span&lt;u8&gt;` |  |
| `output` | `&amp;Vec&lt;u8&gt;!` |  |

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="aesGcmSealDetachedInto"></a>`aesGcmSealDetachedInto`

> 📄 `api.vx` L269-328

```vex
fn aesGcmSealDetachedInto(keyLength: usize, useAes128: bool, key: Span<u8>, nonce: Span<u8>, aad: Span<u8>, plaintext: Span<u8>, output: &Vec<u8>!): Result<[u8; 16], CryptoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `keyLength` | `usize` |  |
| `useAes128` | `bool` |  |
| `key` | `Span&lt;u8&gt;` |  |
| `nonce` | `Span&lt;u8&gt;` |  |
| `aad` | `Span&lt;u8&gt;` |  |
| `plaintext` | `Span&lt;u8&gt;` |  |
| `output` | `&amp;Vec&lt;u8&gt;!` |  |

**Returns:** `Result&lt;[u8; 16], CryptoError&gt;`

---

### <a id="aesGcmOpenDetachedInto"></a>`aesGcmOpenDetachedInto`

> 📄 `api.vx` L330-402

```vex
fn aesGcmOpenDetachedInto(keyLength: usize, useAes128: bool, key: Span<u8>, nonce: Span<u8>, aad: Span<u8>, ciphertext: Span<u8>, tag: Span<u8>, output: &Vec<u8>!): Result<usize, CryptoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `keyLength` | `usize` |  |
| `useAes128` | `bool` |  |
| `key` | `Span&lt;u8&gt;` |  |
| `nonce` | `Span&lt;u8&gt;` |  |
| `aad` | `Span&lt;u8&gt;` |  |
| `ciphertext` | `Span&lt;u8&gt;` |  |
| `tag` | `Span&lt;u8&gt;` |  |
| `output` | `&amp;Vec&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, CryptoError&gt;`

---

### <a id="hexChar"></a>`hexChar`

> 📄 `hex.vx` L1-4

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

> 📄 `hex.vx` L6-11

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

> 📄 `hex.vx` L14-34

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

> 📄 `hex.vx` L38-58

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

> 📄 `hkdf.vx` L9-29

```vex
export fn hkdfExtract(salt: RawBuf, saltLen: u64, ikm: RawBuf, ikmLen: u64, prk: Ptr<u8>): Result<(), CryptoError>
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
| `prk` | `Ptr&lt;u8&gt;` |  |

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="hkdfExpand"></a>`hkdfExpand` `🔓 export`

> 📄 `hkdf.vx` L33-81

```vex
export fn hkdfExpand(prk: RawBuf, prkLen: u64, info: RawBuf, infoLen: u64, out: RawBuf, outLen: u64): Result<(), CryptoError>
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

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="hkdf"></a>`hkdf` `🔓 export`

> 📄 `hkdf.vx` L84-95

```vex
export fn hkdf(salt: RawBuf, saltLen: u64, ikm: RawBuf, ikmLen: u64, info: RawBuf, infoLen: u64, out: RawBuf, outLen: u64): Result<(), CryptoError>
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

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="hkdfExtractSha384"></a>`hkdfExtractSha384` `🔓 export`

> 📄 `hkdf.vx` L99-119

```vex
export fn hkdfExtractSha384(salt: RawBuf, saltLen: u64, ikm: RawBuf, ikmLen: u64, prk: Ptr<u8>): Result<(), CryptoError>
```

HKDF-Extract with HMAC-SHA384. An empty salt is represented by one

SHA-384 digest-length block of zero bytes, as required by RFC 5869.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `salt` | `RawBuf` |  |
| `saltLen` | `u64` |  |
| `ikm` | `RawBuf` |  |
| `ikmLen` | `u64` |  |
| `prk` | `Ptr&lt;u8&gt;` |  |

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="hkdfExpandSha384"></a>`hkdfExpandSha384` `🔓 export`

> 📄 `hkdf.vx` L122-165

```vex
export fn hkdfExpandSha384(prk: RawBuf, prkLen: u64, info: RawBuf, infoLen: u64, out: RawBuf, outLen: u64): Result<(), CryptoError>
```

HKDF-Expand with HMAC-SHA384. The RFC 5869 limit is 255 digest blocks.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `prk` | `RawBuf` |  |
| `prkLen` | `u64` |  |
| `info` | `RawBuf` |  |
| `infoLen` | `u64` |  |
| `out` | `RawBuf` |  |
| `outLen` | `u64` |  |

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="hkdfSha384"></a>`hkdfSha384` `🔓 export`

> 📄 `hkdf.vx` L167-180

```vex
export fn hkdfSha384(salt: RawBuf, saltLen: u64, ikm: RawBuf, ikmLen: u64, info: RawBuf, infoLen: u64, out: RawBuf, outLen: u64): Result<(), CryptoError>
```

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

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="storeLe64"></a>`storeLe64` `🔓 export`

> 📄 `utils.vx` L4-13

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

> 📄 `utils.vx` L15-24

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

> 📄 `poly1305.vx` L5-7

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

> 📄 `poly1305.vx` L70-72

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

> 📄 `poly1305.vx` L318-322

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

> 📄 `chacha20.vx` L7-9

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

> 📄 `chacha20.vx` L11-13

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

> 📄 `chacha20.vx` L15-17

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

> 📄 `chacha20.vx` L19-26

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

> 📄 `chacha20.vx` L29-73

```vex
export fn chacha20Block(key: RawBuf, nonce: RawBuf, counter: u32, out: RawBuf)
```

Generate one 64-byte ChaCha20 block.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `RawBuf` |  |
| `nonce` | `RawBuf` |  |
| `counter` | `u32` |  |
| `out` | `RawBuf` |  |

---

### <a id="chacha20Xor"></a>`chacha20Xor` `🔓 export`

> 📄 `chacha20.vx` L76-151

```vex
export fn chacha20Xor(out: RawBuf, input: RawBuf, len: u64, key: RawBuf, nonce: RawBuf, counter: u32): Result<(), CryptoError>
```

XOR stream with input using 4-way SIMD parallel block pass (256 bytes per iteration).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `RawBuf` |  |
| `input` | `RawBuf` |  |
| `len` | `u64` |  |
| `key` | `RawBuf` |  |
| `nonce` | `RawBuf` |  |
| `counter` | `u32` |  |

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="feLoadLe64"></a>`feLoadLe64`

> 📄 `field25519.vx` L5-7

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

> 📄 `field25519.vx` L15-21

```vex
export fn feZero(out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;Fe25519!` |  |

---

### <a id="feOne"></a>`feOne` `🔓 export`

> 📄 `field25519.vx` L23-29

```vex
export fn feOne(out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;Fe25519!` |  |

---

### <a id="feCopy"></a>`feCopy` `🔓 export`

> 📄 `field25519.vx` L32-38

```vex
export fn feCopy(f: &Fe25519, out: &Fe25519!)
```

Copy a field element (creates a new value from a reference)

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `f` | `&amp;Fe25519` |  |
| `out` | `&amp;Fe25519!` |  |

---

### <a id="feFromBytes"></a>`feFromBytes` `🔓 export`

> 📄 `field25519.vx` L41-55

```vex
export fn feFromBytes(b: RawBuf, out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `RawBuf` |  |
| `out` | `&amp;Fe25519!` |  |

---

### <a id="feToBytes"></a>`feToBytes` `🔓 export`

> 📄 `field25519.vx` L58-90

```vex
export fn feToBytes(f: &Fe25519, out: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `f` | `&amp;Fe25519` |  |
| `out` | `RawBuf` |  |

---

### <a id="feCarryPropagate"></a>`feCarryPropagate`

> 📄 `field25519.vx` L92-119

```vex
fn feCarryPropagate(f: &Fe25519, out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `f` | `&amp;Fe25519` |  |
| `out` | `&amp;Fe25519!` |  |

---

### <a id="feReduce"></a>`feReduce`

> 📄 `field25519.vx` L121-160

```vex
fn feReduce(f: &Fe25519, out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `f` | `&amp;Fe25519` |  |
| `out` | `&amp;Fe25519!` |  |

---

### <a id="feAdd"></a>`feAdd` `🔓 export`

> 📄 `field25519.vx` L162-170

```vex
export fn feAdd(a: &Fe25519, b: &Fe25519, out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `&amp;Fe25519` |  |
| `b` | `&amp;Fe25519` |  |
| `out` | `&amp;Fe25519!` |  |

---

### <a id="feSub"></a>`feSub` `🔓 export`

> 📄 `field25519.vx` L172-182

```vex
export fn feSub(a: &Fe25519, b: &Fe25519, out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `&amp;Fe25519` |  |
| `b` | `&amp;Fe25519` |  |
| `out` | `&amp;Fe25519!` |  |

---

### <a id="feReduceWide"></a>`feReduceWide`

> 📄 `field25519.vx` L188-217

```vex
fn feReduceWide(t0: u128, t1: u128, t2: u128, t3: u128, t4: u128, out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t0` | `u128` |  |
| `t1` | `u128` |  |
| `t2` | `u128` |  |
| `t3` | `u128` |  |
| `t4` | `u128` |  |
| `out` | `&amp;Fe25519!` |  |

---

### <a id="feMul"></a>`feMul` `🔓 export`

> 📄 `field25519.vx` L219-237

```vex
export fn feMul(a: &Fe25519, b: &Fe25519, out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `&amp;Fe25519` |  |
| `b` | `&amp;Fe25519` |  |
| `out` | `&amp;Fe25519!` |  |

---

### <a id="feMulSmall"></a>`feMulSmall` `🔓 export`

> 📄 `field25519.vx` L243-253

```vex
export fn feMulSmall(a: &Fe25519, coefficient: u64, out: &Fe25519!)
```

Multiply by a single machine-word coefficient. This is the canonical

constant/small-coefficient path for field formulas: it preserves the same
reduction semantics as `feMul` without manufacturing a sparse field
element and paying for its zero products.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `&amp;Fe25519` |  |
| `coefficient` | `u64` |  |
| `out` | `&amp;Fe25519!` |  |

---

### <a id="feSq"></a>`feSq` `🔓 export`

> 📄 `field25519.vx` L255-268

```vex
export fn feSq(a: &Fe25519, out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `&amp;Fe25519` |  |
| `out` | `&amp;Fe25519!` |  |

---

### <a id="feSqN"></a>`feSqN`

> 📄 `field25519.vx` L271-281

```vex
fn feSqN(a: &Fe25519, n: i64, out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `&amp;Fe25519` |  |
| `n` | `i64` |  |
| `out` | `&amp;Fe25519!` |  |

---

### <a id="feInvert"></a>`feInvert` `🔓 export`

> 📄 `field25519.vx` L284-336

```vex
export fn feInvert(z: &Fe25519, out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `z` | `&amp;Fe25519` |  |
| `out` | `&amp;Fe25519!` |  |

---

### <a id="feCSwap"></a>`feCSwap` `🔓 export`

> 📄 `field25519.vx` L339-348

```vex
export fn feCSwap(a: &Fe25519!, b: &Fe25519!, swap: u64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `&amp;Fe25519!` |  |
| `b` | `&amp;Fe25519!` |  |
| `swap` | `u64` |  |

---

### <a id="pointIdentity"></a>`pointIdentity` `🔓 export`

> 📄 `ed25519.vx` L20-25

```vex
export fn pointIdentity(out: &ExtPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;ExtPoint!` |  |

---

### <a id="edD"></a>`edD`

> 📄 `ed25519.vx` L28-42

```vex
fn edD(out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;Fe25519!` |  |

---

### <a id="ed2D"></a>`ed2D`

> 📄 `ed25519.vx` L45-49

```vex
fn ed2D(out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;Fe25519!` |  |

---

### <a id="affIdentity"></a>`affIdentity`

> 📄 `ed25519.vx` L58-61

```vex
fn affIdentity(out: &AffPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;AffPoint!` |  |

---

### <a id="affBasepoint"></a>`affBasepoint`

> 📄 `ed25519.vx` L63-80

```vex
fn affBasepoint(out: &AffPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;AffPoint!` |  |

---

### <a id="affAdd"></a>`affAdd`

> 📄 `ed25519.vx` L82-107

```vex
fn affAdd(p: &AffPoint, q: &AffPoint, out: &AffPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `&amp;AffPoint` |  |
| `q` | `&amp;AffPoint` |  |
| `out` | `&amp;AffPoint!` |  |

---

### <a id="affScalarMul"></a>`affScalarMul`

> 📄 `ed25519.vx` L109-131

```vex
fn affScalarMul(scalar: RawBuf, point: &AffPoint, out: &AffPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `scalar` | `RawBuf` |  |
| `point` | `&amp;AffPoint` |  |
| `out` | `&amp;AffPoint!` |  |

---

### <a id="feCopyAff"></a>`feCopyAff`

> 📄 `ed25519.vx` L133-136

```vex
fn feCopyAff(p: &AffPoint, out: &AffPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `&amp;AffPoint` |  |
| `out` | `&amp;AffPoint!` |  |

---

### <a id="affEncode"></a>`affEncode`

> 📄 `ed25519.vx` L138-147

```vex
fn affEncode(p: &AffPoint, out: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `&amp;AffPoint` |  |
| `out` | `RawBuf` |  |

---

### <a id="feEq"></a>`feEq`

> 📄 `ed25519.vx` L149-162

```vex
fn feEq(a: &Fe25519, b: &Fe25519): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `&amp;Fe25519` |  |
| `b` | `&amp;Fe25519` |  |

**Returns:** `bool`

---

### <a id="fePowConst"></a>`fePowConst`

> 📄 `ed25519.vx` L164-181

```vex
fn fePowConst(base: &Fe25519, expLe: RawBuf, out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `base` | `&amp;Fe25519` |  |
| `expLe` | `RawBuf` |  |
| `out` | `&amp;Fe25519!` |  |

---

### <a id="feSqrtM1"></a>`feSqrtM1`

> 📄 `ed25519.vx` L183-196

```vex
fn feSqrtM1(out: &Fe25519!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;Fe25519!` |  |

---

### <a id="feSqrtRatio"></a>`feSqrtRatio`

> 📄 `ed25519.vx` L198-234

```vex
fn feSqrtRatio(u: &Fe25519, v: &Fe25519, out: &Fe25519!): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `u` | `&amp;Fe25519` |  |
| `v` | `&amp;Fe25519` |  |
| `out` | `&amp;Fe25519!` |  |

**Returns:** `bool`

---

### <a id="scalarLessThanL"></a>`scalarLessThanL`

> 📄 `ed25519.vx` L236-251

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

> 📄 `ed25519.vx` L253-313

```vex
fn affDecodeCompressed(in32: RawBuf, out: &AffPoint!): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `in32` | `RawBuf` |  |
| `out` | `&amp;AffPoint!` |  |

**Returns:** `bool`

---

### <a id="affToExt"></a>`affToExt`

> 📄 `ed25519.vx` L316-321

```vex
fn affToExt(p: &AffPoint, out: &ExtPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `&amp;AffPoint` |  |
| `out` | `&amp;ExtPoint!` |  |

---

### <a id="pointDouble"></a>`pointDouble` `🔓 export`

> 📄 `ed25519.vx` L324-348

```vex
export fn pointDouble(p: &ExtPoint, out: &ExtPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `&amp;ExtPoint` |  |
| `out` | `&amp;ExtPoint!` |  |

---

### <a id="pointAdd"></a>`pointAdd` `🔓 export`

> 📄 `ed25519.vx` L351-387

```vex
export fn pointAdd(p: &ExtPoint, q: &ExtPoint, out: &ExtPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `&amp;ExtPoint` |  |
| `q` | `&amp;ExtPoint` |  |
| `out` | `&amp;ExtPoint!` |  |

---

### <a id="pointCopy"></a>`pointCopy`

> 📄 `ed25519.vx` L389-394

```vex
fn pointCopy(point: &ExtPoint, out: &ExtPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `point` | `&amp;ExtPoint` |  |
| `out` | `&amp;ExtPoint!` |  |

---

### <a id="pointCmov"></a>`pointCmov`

> 📄 `ed25519.vx` L398-420

```vex
fn pointCmov(candidate: &ExtPoint, choose: u64, out: &ExtPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `candidate` | `&amp;ExtPoint` |  |
| `choose` | `u64` |  |
| `out` | `&amp;ExtPoint!` |  |

---

### <a id="ctEqNibble"></a>`ctEqNibble`

> 📄 `ed25519.vx` L422-425

```vex
fn ctEqNibble(left: u64, right: u64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `left` | `u64` |  |
| `right` | `u64` |  |

**Returns:** `u64`

---

### <a id="scalarMul"></a>`scalarMul` `🔓 export`

> 📄 `ed25519.vx` L432-482

```vex
export fn scalarMul(scalar: RawBuf, point: &ExtPoint, out: &ExtPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `scalar` | `RawBuf` |  |
| `point` | `&amp;ExtPoint` |  |
| `out` | `&amp;ExtPoint!` |  |

---

### <a id="extIsIdentity"></a>`extIsIdentity`

> 📄 `ed25519.vx` L484-488

```vex
fn extIsIdentity(point: &ExtPoint): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `point` | `&amp;ExtPoint` |  |

**Returns:** `bool`

---

### <a id="extHasSmallOrder"></a>`extHasSmallOrder`

> 📄 `ed25519.vx` L490-499

```vex
fn extHasSmallOrder(point: &ExtPoint): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `point` | `&amp;ExtPoint` |  |

**Returns:** `bool`

---

### <a id="pointEncode"></a>`pointEncode` `🔓 export`

> 📄 `ed25519.vx` L502-521

```vex
export fn pointEncode(p: &ExtPoint, out: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `&amp;ExtPoint` |  |
| `out` | `RawBuf` |  |

---

### <a id="basepointExt"></a>`basepointExt` `🔓 export`

> 📄 `ed25519.vx` L524-548

```vex
export fn basepointExt(out: &ExtPoint!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;ExtPoint!` |  |

---

### <a id="scalarL"></a>`scalarL`

> 📄 `ed25519.vx` L552-563

```vex
fn scalarL(): [u8; 32]
```

**Returns:** `[u8; 32]`

---

### <a id="reduceModL64"></a>`reduceModL64`

> 📄 `ed25519.vx` L565-628

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

> 📄 `ed25519.vx` L630-665

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

> 📄 `ed25519.vx` L667-688

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

> 📄 `ed25519.vx` L690-692

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

> 📄 `ed25519.vx` L697-724

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

> 📄 `ed25519.vx` L729-814

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

> 📄 `ed25519.vx` L817-821

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

> 📄 `ed25519.vx` L824-900

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

> 📄 `ed25519.vx` L903-907

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

> 📄 `ed25519.vx` L910-916

```vex
export fn ed25519BasepointHex(): string
```

Diagnostic helper: return encoded Ed25519 basepoint.

**Returns:** `string`

---

### <a id="ed25519MulBaseHex"></a>`ed25519MulBaseHex` `🔓 export`

> 📄 `ed25519.vx` L919-927

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

> 📄 `bytes.vx` L5-29

```vex
export fn ctEq(a: RawBuf, aLen: u64, b: RawBuf, bLen: u64): bool
```

Constant-time equality over two byte slices (64-bit SWAR accelerated).

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

> 📄 `bytes.vx` L32-48

```vex
export fn xorInto(dst: RawBuf, a: RawBuf, b: RawBuf, len: u64)
```

XOR two sources into destination: dst[i] = a[i] ^ b[i] (64-bit SWAR accelerated)

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `dst` | `RawBuf` |  |
| `a` | `RawBuf` |  |
| `b` | `RawBuf` |  |
| `len` | `u64` |  |

---

### <a id="xorInPlace"></a>`xorInPlace` `🔓 export`

> 📄 `bytes.vx` L51-67

```vex
export fn xorInPlace(dst: RawBuf, src: RawBuf, len: u64)
```

In-place XOR: dst[i] ^= src[i] (64-bit SWAR accelerated)

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `dst` | `RawBuf` |  |
| `src` | `RawBuf` |  |
| `len` | `u64` |  |

---

### <a id="zeroize"></a>`zeroize` `🔓 export`

> 📄 `bytes.vx` L71-73

```vex
export fn zeroize(buf: RawBuf, len: u64)
```

Zeroize sensitive buffer memory. The compiler lowers this to a volatile

memset so the stores survive dead-store elimination before deallocation.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `RawBuf` |  |
| `len` | `u64` |  |

---

### <a id="hmacSha1To"></a>`hmacSha1To` `🔓 export`

> 📄 `hmac.vx` L12-62

```vex
export fn hmacSha1To(key: RawBuf, keyLen: u64, data: RawBuf, dataLen: u64, out: Ptr<u8>)
```

HMAC-SHA1 (RFC 2104).  SHA-1 is retained solely for interoperating with

protocol profiles such as SRTP AES_CM_128_HMAC_SHA1_80; new application
protocols should use HMAC-SHA256 instead.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `RawBuf` |  |
| `keyLen` | `u64` |  |
| `data` | `RawBuf` |  |
| `dataLen` | `u64` |  |
| `out` | `Ptr&lt;u8&gt;` |  |

---

### <a id="hmacSha256To"></a>`hmacSha256To` `🔓 export`

> 📄 `hmac.vx` L64-159

```vex
export fn hmacSha256To(key: RawBuf, keyLen: u64, data: RawBuf, dataLen: u64, out: Ptr<u8>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `RawBuf` |  |
| `keyLen` | `u64` |  |
| `data` | `RawBuf` |  |
| `dataLen` | `u64` |  |
| `out` | `Ptr&lt;u8&gt;` |  |

---

### <a id="hmacSha256PartsTo"></a>`hmacSha256PartsTo` `🔓 export`

> 📄 `hmac.vx` L164-215

```vex
export fn hmacSha256PartsTo(key: RawBuf, keyLen: u64, first: RawBuf, firstLen: u64, second: RawBuf, secondLen: u64, third: RawBuf, thirdLen: u64, out: Ptr<u8>)
```

Allocation-free HMAC-SHA256 over three discontiguous byte segments.

This is the shared kernel for HKDF/PBKDF2; no secret-bearing concatenation
buffer or per-round allocator traffic is required.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `RawBuf` |  |
| `keyLen` | `u64` |  |
| `first` | `RawBuf` |  |
| `firstLen` | `u64` |  |
| `second` | `RawBuf` |  |
| `secondLen` | `u64` |  |
| `third` | `RawBuf` |  |
| `thirdLen` | `u64` |  |
| `out` | `Ptr&lt;u8&gt;` |  |

---

### <a id="hmacSha384PartsTo"></a>`hmacSha384PartsTo` `🔓 export`

> 📄 `hmac.vx` L219-270

```vex
export fn hmacSha384PartsTo(key: RawBuf, keyLen: u64, first: RawBuf, firstLen: u64, second: RawBuf, secondLen: u64, third: RawBuf, thirdLen: u64, out: Ptr<u8>)
```

Allocation-free HMAC-SHA384 over three discontiguous byte segments.

SHA-384 uses SHA-512's 128-byte block size and a 48-byte digest.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `RawBuf` |  |
| `keyLen` | `u64` |  |
| `first` | `RawBuf` |  |
| `firstLen` | `u64` |  |
| `second` | `RawBuf` |  |
| `secondLen` | `u64` |  |
| `third` | `RawBuf` |  |
| `thirdLen` | `u64` |  |
| `out` | `Ptr&lt;u8&gt;` |  |

---

### <a id="hmacSha384To"></a>`hmacSha384To` `🔓 export`

> 📄 `hmac.vx` L272-282

```vex
export fn hmacSha384To(key: RawBuf, keyLen: u64, data: RawBuf, dataLen: u64, out: Ptr<u8>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `RawBuf` |  |
| `keyLen` | `u64` |  |
| `data` | `RawBuf` |  |
| `dataLen` | `u64` |  |
| `out` | `Ptr&lt;u8&gt;` |  |

---

### <a id="hmacSha384Hex"></a>`hmacSha384Hex` `🔓 export`

> 📄 `hmac.vx` L284-292

```vex
export fn hmacSha384Hex(key: str, data: str): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `str` |  |
| `data` | `str` |  |

**Returns:** `string`

---

### <a id="hmacSha256Hex"></a>`hmacSha256Hex` `🔓 export`

> 📄 `hmac.vx` L294-311

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

> 📄 `hmac.vx` L313-340

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

> 📄 `blake2b.vx` L4-6

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

> 📄 `blake2b.vx` L8-10

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

> 📄 `blake2b.vx` L12-14

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

> 📄 `blake2b.vx` L16-27

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

> 📄 `blake2b.vx` L29-42

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

> 📄 `blake2b.vx` L44-66

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

> 📄 `blake2b.vx` L68-116

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

> 📄 `blake2b.vx` L120-170

```vex
export fn blake2bTo(data: RawBuf, len: u64, out: Ptr<u8>, outLen: u64)
```

Compute BLAKE2b hash to caller-provided output buffer.

outLen must be in [1, 64].

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `RawBuf` |  |
| `len` | `u64` |  |
| `out` | `Ptr&lt;u8&gt;` |  |
| `outLen` | `u64` |  |

---

### <a id="blake2bHex"></a>`blake2bHex` `🔓 export`

> 📄 `blake2b.vx` L172-176

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

> 📄 `argon2id.vx` L10-20

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

> 📄 `argon2id.vx` L22-24

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

> 📄 `argon2id.vx` L26-28

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

> 📄 `argon2id.vx` L30-32

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

> 📄 `argon2id.vx` L34-37

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

> 📄 `argon2id.vx` L39-48

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

> 📄 `argon2id.vx` L50-55

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

> 📄 `argon2id.vx` L57-60

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

> 📄 `argon2id.vx` L62-90

```vex
fn validParams(pwdLen: u64, saltLen: u64, secretLen: u64, adLen: u64, timeCost: u64, memoryKiB: u64, parallelism: u64, outLen: u64): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `pwdLen` | `u64` |  |
| `saltLen` | `u64` |  |
| `secretLen` | `u64` |  |
| `adLen` | `u64` |  |
| `timeCost` | `u64` |  |
| `memoryKiB` | `u64` |  |
| `parallelism` | `u64` |  |
| `outLen` | `u64` |  |

**Returns:** `bool`

---

### <a id="clearOutputIfRepresentable"></a>`clearOutputIfRepresentable`

> 📄 `argon2id.vx` L92-97

```vex
fn clearOutputIfRepresentable(out: RawBuf!, outLen: u64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `RawBuf!` |  |
| `outLen` | `u64` |  |

---

### <a id="invalidArgonParameter"></a>`invalidArgonParameter`

> 📄 `argon2id.vx` L99-101

```vex
fn invalidArgonParameter(requested: u64, limit: u64): Result<(), CryptoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `requested` | `u64` |  |
| `limit` | `u64` |  |

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="hash2ToLen"></a>`hash2ToLen`

> 📄 `argon2id.vx` L103-123

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

> 📄 `argon2id.vx` L129-207

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

> 📄 `argon2id.vx` L209-211

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

> 📄 `argon2id.vx` L219-241

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

### <a id="roundBlockInPlace"></a>`roundBlockInPlace`

> 📄 `argon2id.vx` L243-291

```vex
fn roundBlockInPlace(block: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `block` | `RawBuf` |  |

---

### <a id="fillBlock"></a>`fillBlock`

> 📄 `argon2id.vx` L293-314

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

### <a id="nextAddressBlock"></a>`nextAddressBlock`

> 📄 `argon2id.vx` L316-325

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

> 📄 `argon2id.vx` L327-373

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

> 📄 `argon2id.vx` L375-381

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

> 📄 `argon2id.vx` L384-396

```vex
fn argon2DeriveVariant(variant: u8, password: RawBuf, pwdLen: u64, salt: RawBuf, saltLen: u64, timeCost: u64, memoryKiB: u64, parallelism: u64, out: RawBuf, outLen: u64): Result<(), CryptoError>
```

Derive key bytes using the selected RFC 9106 Argon2 variant.

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

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="argon2DeriveVariantEx"></a>`argon2DeriveVariantEx`

> 📄 `argon2id.vx` L398-666

```vex
fn argon2DeriveVariantEx(variant: u8, password: RawBuf, pwdLen: u64, salt: RawBuf, saltLen: u64, secret: RawBuf, secretLen: u64, ad: RawBuf, adLen: u64, timeCost: u64, memoryKiB: u64, parallelism: u64, out: RawBuf!, outLen: u64): Result<(), CryptoError>
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

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="argon2idDerive"></a>`argon2idDerive` `🔓 export`

> 📄 `argon2id.vx` L669-679

```vex
export fn argon2idDerive(password: RawBuf, pwdLen: u64, salt: RawBuf, saltLen: u64, timeCost: u64, memoryKiB: u64, parallelism: u64, out: RawBuf, outLen: u64): Result<(), CryptoError>
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

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="argon2idDeriveEx"></a>`argon2idDeriveEx` `🔓 export`

> 📄 `argon2id.vx` L682-694

```vex
export fn argon2idDeriveEx(password: RawBuf, pwdLen: u64, salt: RawBuf, saltLen: u64, secret: RawBuf, secretLen: u64, ad: RawBuf, adLen: u64, timeCost: u64, memoryKiB: u64, parallelism: u64, out: RawBuf, outLen: u64): Result<(), CryptoError>
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

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="argon2iDerive"></a>`argon2iDerive` `🔓 export`

> 📄 `argon2id.vx` L697-707

```vex
export fn argon2iDerive(password: RawBuf, pwdLen: u64, salt: RawBuf, saltLen: u64, timeCost: u64, memoryKiB: u64, parallelism: u64, out: RawBuf, outLen: u64): Result<(), CryptoError>
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

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="argon2iDeriveEx"></a>`argon2iDeriveEx` `🔓 export`

> 📄 `argon2id.vx` L710-722

```vex
export fn argon2iDeriveEx(password: RawBuf, pwdLen: u64, salt: RawBuf, saltLen: u64, secret: RawBuf, secretLen: u64, ad: RawBuf, adLen: u64, timeCost: u64, memoryKiB: u64, parallelism: u64, out: RawBuf, outLen: u64): Result<(), CryptoError>
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

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="argon2dDerive"></a>`argon2dDerive` `🔓 export`

> 📄 `argon2id.vx` L725-735

```vex
export fn argon2dDerive(password: RawBuf, pwdLen: u64, salt: RawBuf, saltLen: u64, timeCost: u64, memoryKiB: u64, parallelism: u64, out: RawBuf, outLen: u64): Result<(), CryptoError>
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

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="argon2dDeriveEx"></a>`argon2dDeriveEx` `🔓 export`

> 📄 `argon2id.vx` L738-750

```vex
export fn argon2dDeriveEx(password: RawBuf, pwdLen: u64, salt: RawBuf, saltLen: u64, secret: RawBuf, secretLen: u64, ad: RawBuf, adLen: u64, timeCost: u64, memoryKiB: u64, parallelism: u64, out: RawBuf, outLen: u64): Result<(), CryptoError>
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

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="clearArgonVec"></a>`clearArgonVec`

> 📄 `argon2id.vx` L783-788

```vex
fn clearArgonVec(output: &Vec<u8>!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `output` | `&amp;Vec&lt;u8&gt;!` |  |

---

### <a id="argonSpanOverlapsOutput"></a>`argonSpanOverlapsOutput`

> 📄 `argon2id.vx` L790-798

```vex
fn argonSpanOverlapsOutput(source: Span<u8>, output: &Vec<u8>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `source` | `Span&lt;u8&gt;` |  |
| `output` | `&amp;Vec&lt;u8&gt;` |  |

**Returns:** `bool`

---

### <a id="validateArgonFacade"></a>`validateArgonFacade`

> 📄 `argon2id.vx` L800-821

```vex
fn validateArgonFacade(passwordLength: usize, saltLength: usize, secretLength: usize, associatedDataLength: usize, parameters: Argon2Parameters, outputLength: usize): Result<(), CryptoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `passwordLength` | `usize` |  |
| `saltLength` | `usize` |  |
| `secretLength` | `usize` |  |
| `associatedDataLength` | `usize` |  |
| `parameters` | `Argon2Parameters` |  |
| `outputLength` | `usize` |  |

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="x25519"></a>`x25519` `🔓 export`

> 📄 `x25519.vx` L13-92

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

> 📄 `x25519.vx` L97-102

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

> 📄 `x25519.vx` L105-109

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

### <a id="reverseBits64"></a>`reverseBits64`

> 📄 `aes_gcm.vx` L9-17

```vex
fn reverseBits64(value: u64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `u64` |  |

**Returns:** `u64`

---

### <a id="ghashMulReflected"></a>`ghashMulReflected`

> 📄 `aes_gcm.vx` L19-42

```vex
fn ghashMulReflected(xLo: u64, xHi: u64, hLo: u64, hHi: u64): [u64; 2]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `xLo` | `u64` |  |
| `xHi` | `u64` |  |
| `hLo` | `u64` |  |
| `hHi` | `u64` |  |

**Returns:** `[u64; 2]`

---

### <a id="ghashUpdateReflected"></a>`ghashUpdateReflected`

> 📄 `aes_gcm.vx` L44-55

```vex
fn ghashUpdateReflected(yLo: u64, yHi: u64, hLo: u64, hHi: u64, block: RawBuf): [u64; 2]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `yLo` | `u64` |  |
| `yHi` | `u64` |  |
| `hLo` | `u64` |  |
| `hHi` | `u64` |  |
| `block` | `RawBuf` |  |

**Returns:** `[u64; 2]`

---

### <a id="ghashBlockReflected"></a>`ghashBlockReflected`

> 📄 `aes_gcm.vx` L57-62

```vex
fn ghashBlockReflected(block: RawBuf): [u64; 2]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `block` | `RawBuf` |  |

**Returns:** `[u64; 2]`

---

### <a id="ghashUpdateFourReflected"></a>`ghashUpdateFourReflected`

> 📄 `aes_gcm.vx` L64-93

```vex
fn ghashUpdateFourReflected(yLo: u64, yHi: u64, hLo: u64, hHi: u64, h2Lo: u64, h2Hi: u64, h3Lo: u64, h3Hi: u64, h4Lo: u64, h4Hi: u64, blocks: RawBuf): [u64; 2]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `yLo` | `u64` |  |
| `yHi` | `u64` |  |
| `hLo` | `u64` |  |
| `hHi` | `u64` |  |
| `h2Lo` | `u64` |  |
| `h2Hi` | `u64` |  |
| `h3Lo` | `u64` |  |
| `h3Hi` | `u64` |  |
| `h4Lo` | `u64` |  |
| `h4Hi` | `u64` |  |
| `blocks` | `RawBuf` |  |

**Returns:** `[u64; 2]`

---

### <a id="ghashAll"></a>`ghashAll`

> 📄 `aes_gcm.vx` L95-202

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

### <a id="encryptBlockWithSchedule"></a>`encryptBlockWithSchedule`

> 📄 `aes_gcm.vx` L204-212

```vex
fn encryptBlockWithSchedule(keyBytes: usize, roundKeys: RawBuf, input: RawBuf, output: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `keyBytes` | `usize` |  |
| `roundKeys` | `RawBuf` |  |
| `input` | `RawBuf` |  |
| `output` | `RawBuf` |  |

---

### <a id="ctrXorWithSchedule"></a>`ctrXorWithSchedule`

> 📄 `aes_gcm.vx` L214-226

```vex
fn ctrXorWithSchedule(keyBytes: usize, roundKeys: RawBuf, counter: RawBuf, input: RawBuf, length: u64, output: RawBuf): Result<(), CryptoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `keyBytes` | `usize` |  |
| `roundKeys` | `RawBuf` |  |
| `counter` | `RawBuf` |  |
| `input` | `RawBuf` |  |
| `length` | `u64` |  |
| `output` | `RawBuf` |  |

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="validateGcmLengths"></a>`validateGcmLengths`

> 📄 `aes_gcm.vx` L228-257

```vex
fn validateGcmLengths(aadLen: u64, textLen: u64): Result<(), CryptoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `aadLen` | `u64` |  |
| `textLen` | `u64` |  |

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="gcmEncryptWithSchedule"></a>`gcmEncryptWithSchedule`

> 📄 `aes_gcm.vx` L259-319

```vex
fn gcmEncryptWithSchedule(keyBytes: usize, roundKeys: RawBuf, nonce12: RawBuf, aad: RawBuf, aadLen: u64, plaintext: RawBuf, ptLen: u64, out: RawBuf): Result<[u8; 16], CryptoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `keyBytes` | `usize` |  |
| `roundKeys` | `RawBuf` |  |
| `nonce12` | `RawBuf` |  |
| `aad` | `RawBuf` |  |
| `aadLen` | `u64` |  |
| `plaintext` | `RawBuf` |  |
| `ptLen` | `u64` |  |
| `out` | `RawBuf` |  |

**Returns:** `Result&lt;[u8; 16], CryptoError&gt;`

---

### <a id="gcmDecryptWithSchedule"></a>`gcmDecryptWithSchedule`

> 📄 `aes_gcm.vx` L321-389

```vex
fn gcmDecryptWithSchedule(keyBytes: usize, roundKeys: RawBuf, nonce12: RawBuf, aad: RawBuf, aadLen: u64, ciphertext: RawBuf, ctLen: u64, tag: RawBuf, out: RawBuf): Result<(), CryptoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `keyBytes` | `usize` |  |
| `roundKeys` | `RawBuf` |  |
| `nonce12` | `RawBuf` |  |
| `aad` | `RawBuf` |  |
| `aadLen` | `u64` |  |
| `ciphertext` | `RawBuf` |  |
| `ctLen` | `u64` |  |
| `tag` | `RawBuf` |  |
| `out` | `RawBuf` |  |

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="aes128GcmEncrypt"></a>`aes128GcmEncrypt` `🔓 export`

> 📄 `aes_gcm.vx` L392-405

```vex
export fn aes128GcmEncrypt(key: RawBuf, nonce12: RawBuf, aad: RawBuf, aadLen: u64, plaintext: RawBuf, ptLen: u64, out: RawBuf): Result<[u8; 16], CryptoError>
```

AES-128-GCM encrypt with the NIST 96-bit nonce fast path.

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

**Returns:** `Result&lt;[u8; 16], CryptoError&gt;`

---

### <a id="aes128GcmDecrypt"></a>`aes128GcmDecrypt` `🔓 export`

> 📄 `aes_gcm.vx` L409-423

```vex
export fn aes128GcmDecrypt(key: RawBuf, nonce12: RawBuf, aad: RawBuf, aadLen: u64, ciphertext: RawBuf, ctLen: u64, tag: RawBuf, out: RawBuf): Result<(), CryptoError>
```

AES-128-GCM authenticated decryption. Plaintext is released only after the

complete tag has been verified in constant time.

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

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="aes256GcmEncrypt"></a>`aes256GcmEncrypt` `🔓 export`

> 📄 `aes_gcm.vx` L426-439

```vex
export fn aes256GcmEncrypt(key: RawBuf, nonce12: RawBuf, aad: RawBuf, aadLen: u64, plaintext: RawBuf, ptLen: u64, out: RawBuf): Result<[u8; 16], CryptoError>
```

AES-256-GCM encrypt with one key expansion per complete operation.

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

**Returns:** `Result&lt;[u8; 16], CryptoError&gt;`

---

### <a id="aes256GcmDecrypt"></a>`aes256GcmDecrypt` `🔓 export`

> 📄 `aes_gcm.vx` L441-455

```vex
export fn aes256GcmDecrypt(key: RawBuf, nonce12: RawBuf, aad: RawBuf, aadLen: u64, ciphertext: RawBuf, ctLen: u64, tag: RawBuf, out: RawBuf): Result<(), CryptoError>
```

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

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="rotr64"></a>`rotr64`

> 📄 `sha512.vx` L4-6

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

> 📄 `sha512.vx` L8-10

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

> 📄 `sha512.vx` L12-14

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

> 📄 `sha512.vx` L16-18

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

> 📄 `sha512.vx` L20-22

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

> 📄 `sha512.vx` L24-26

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

> 📄 `sha512.vx` L28-30

```vex
fn ssig1_512(x: u64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u64` |  |

**Returns:** `u64`

---

### <a id="bswap64"></a>`bswap64`

> 📄 `sha512.vx` L32-34

```vex
fn bswap64(v: u64): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `v` | `u64` |  |

**Returns:** `u64`

---

### <a id="k512"></a>`k512`

> 📄 `sha512.vx` L36-63

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

> 📄 `sha512.vx` L321-328

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

> 📄 `sha512.vx` L330-335

```vex
export fn sha512To(data: RawBuf, len: u64, out: Ptr<u8>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `RawBuf` |  |
| `len` | `u64` |  |
| `out` | `Ptr&lt;u8&gt;` |  |

---

### <a id="sha384Hex"></a>`sha384Hex` `🔓 export`

> 📄 `sha512.vx` L337-344

```vex
export fn sha384Hex(data: str): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |

**Returns:** `string`

---

### <a id="sha384To"></a>`sha384To` `🔓 export`

> 📄 `sha512.vx` L346-351

```vex
export fn sha384To(data: RawBuf, len: u64, out: Ptr<u8>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `RawBuf` |  |
| `len` | `u64` |  |
| `out` | `Ptr&lt;u8&gt;` |  |

---

### <a id="loadLe32"></a>`loadLe32`

> 📄 `chacha20_4way.vx` L5-7

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

### <a id="rotl32"></a>`rotl32`

> 📄 `chacha20_4way.vx` L9-11

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

### <a id="qr"></a>`qr`

> 📄 `chacha20_4way.vx` L13-20

```vex
fn qr(a: u32, b: u32, c: u32, d: u32): [u32; 4]
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

### <a id="pack64"></a>`pack64`

> 📄 `chacha20_4way.vx` L22-24

```vex
fn pack64(lo: u32, hi: u32): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `lo` | `u32` |  |
| `hi` | `u32` |  |

**Returns:** `u64`

---

### <a id="chacha20Block4Way"></a>`chacha20Block4Way` `🔓 export`

> 📄 `chacha20_4way.vx` L27-151

```vex
export fn chacha20Block4Way(key: RawBuf, nonce: RawBuf, counter: u32, out256: RawBuf)
```

Generate 4 consecutive ChaCha20 blocks (256 bytes) in 4-way parallel.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `RawBuf` |  |
| `nonce` | `RawBuf` |  |
| `counter` | `u32` |  |
| `out256` | `RawBuf` |  |

---

### <a id="b64At"></a>`b64At`

> 📄 `base64.vx` L1-7

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

> 📄 `base64.vx` L10-57

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

> 📄 `base64.vx` L60-62

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

### <a id="computeAeadTag"></a>`computeAeadTag`

> 📄 `aead.vx` L10-46

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

> 📄 `aead.vx` L52-81

```vex
export fn aeadEncrypt(key: RawBuf, nonce: RawBuf, aad: RawBuf, aadLen: u64, plaintext: RawBuf, ptLen: u64, out: RawBuf): Result<[u8; 16], CryptoError>
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

**Returns:** `Result&lt;[u8; 16], CryptoError&gt;`

---

### <a id="aeadDecrypt"></a>`aeadDecrypt` `🔓 export`

> 📄 `aead.vx` L87-123

```vex
export fn aeadDecrypt(key: RawBuf, nonce: RawBuf, aad: RawBuf, aadLen: u64, ciphertext: RawBuf, ctLen: u64, tag: RawBuf, out: RawBuf): Result<(), CryptoError>
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

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="xtime"></a>`xtime`

> 📄 `aes.vx` L5-8

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

> 📄 `aes.vx` L10-24

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

> 📄 `aes.vx` L26-39

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

> 📄 `aes.vx` L41-43

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

> 📄 `aes.vx` L45-50

```vex
fn sboxByte(x: u8): u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `x` | `u8` |  |

**Returns:** `u8`

---

### <a id="rconAt"></a>`rconAt`

> 📄 `aes.vx` L52-60

```vex
fn rconAt(iter: i64): u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `iter` | `i64` |  |

**Returns:** `u8`

---

### <a id="aes256ExpandKey"></a>`aes256ExpandKey` `🔓 export`

> 📄 `aes.vx` L64-113

```vex
export fn aes256ExpandKey(key: RawBuf): [u8; 240]
```

Expand an AES-256 key once for internal multi-block constructions.

Callers must securely erase the returned 240-byte schedule.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `RawBuf` |  |

**Returns:** `[u8; 240]`

---

### <a id="aes128ExpandKey"></a>`aes128ExpandKey` `🔓 export`

> 📄 `aes.vx` L120-157

```vex
export fn aes128ExpandKey(key: RawBuf): [u8; 176]
```

Expand an AES-128 key once for internal multi-block constructions.

Callers must securely erase the returned 176-byte schedule.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `RawBuf` |  |

**Returns:** `[u8; 176]`

---

### <a id="aesEncryptBlockWithRk"></a>`aesEncryptBlockWithRk`

> 📄 `aes.vx` L159-173

```vex
fn aesEncryptBlockWithRk(rkb: RawBuf, input: RawBuf, out: RawBuf, rounds: i64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `rkb` | `RawBuf` |  |
| `input` | `RawBuf` |  |
| `out` | `RawBuf` |  |
| `rounds` | `i64` |  |

---

### <a id="aes128EncryptBlockWithRk"></a>`aes128EncryptBlockWithRk` `🔓 export`

> 📄 `aes.vx` L175-177

```vex
export fn aes128EncryptBlockWithRk(rkb: RawBuf, input: RawBuf, out: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `rkb` | `RawBuf` |  |
| `input` | `RawBuf` |  |
| `out` | `RawBuf` |  |

---

### <a id="aes128EncryptBlock"></a>`aes128EncryptBlock` `🔓 export`

> 📄 `aes.vx` L181-186

```vex
export fn aes128EncryptBlock(key: RawBuf, input: RawBuf, out: RawBuf)
```

AES-128 encrypt one 16-byte block.

key: 16 bytes, input: 16 bytes.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `RawBuf` |  |
| `input` | `RawBuf` |  |
| `out` | `RawBuf` |  |

---

### <a id="aes256EncryptBlockWithRk"></a>`aes256EncryptBlockWithRk` `🔓 export`

> 📄 `aes.vx` L188-190

```vex
export fn aes256EncryptBlockWithRk(rkb: RawBuf, input: RawBuf, out: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `rkb` | `RawBuf` |  |
| `input` | `RawBuf` |  |
| `out` | `RawBuf` |  |

---

### <a id="aes256EncryptBlock"></a>`aes256EncryptBlock` `🔓 export`

> 📄 `aes.vx` L194-199

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

### <a id="counter32be"></a>`counter32be`

> 📄 `aes.vx` L201-206

```vex
fn counter32be(counterBlock: RawBuf): u32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `counterBlock` | `RawBuf` |  |

**Returns:** `u32`

---

### <a id="inc32be"></a>`inc32be`

> 📄 `aes.vx` L208-221

```vex
fn inc32be(counterBlock: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `counterBlock` | `RawBuf` |  |

---

### <a id="validateIncrementingCtrRequest"></a>`validateIncrementingCtrRequest`

> 📄 `aes.vx` L223-243

```vex
fn validateIncrementingCtrRequest(counter0: RawBuf, len: u64): Result<(), CryptoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `counter0` | `RawBuf` |  |
| `len` | `u64` |  |

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="aes256CtrXorWithRk"></a>`aes256CtrXorWithRk` `🔓 export`

> 📄 `aes.vx` L246-298

```vex
export fn aes256CtrXorWithRk(rkb: RawBuf, counter0: RawBuf, input: RawBuf, len: u64, out: RawBuf): Result<(), CryptoError>
```

AES-256 CTR using a caller-owned expanded schedule.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `rkb` | `RawBuf` |  |
| `counter0` | `RawBuf` |  |
| `input` | `RawBuf` |  |
| `len` | `u64` |  |
| `out` | `RawBuf` |  |

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="aes256CtrXor"></a>`aes256CtrXor` `🔓 export`

> 📄 `aes.vx` L302-314

```vex
export fn aes256CtrXor(key: RawBuf, counter0: RawBuf, input: RawBuf, len: u64, out: RawBuf): Result<(), CryptoError>
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

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="aes128CtrXorWithRk"></a>`aes128CtrXorWithRk` `🔓 export`

> 📄 `aes.vx` L319-358

```vex
export fn aes128CtrXorWithRk(rkb: RawBuf, counter0: RawBuf, input: RawBuf, len: u64, out: RawBuf): Result<(), CryptoError>
```

AES-128 CTR XOR helper (counter block is a 16-byte J0-like block).

Like AES-GCM's CTR construction, the supplied block is incremented before
it is encrypted for the first segment.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `rkb` | `RawBuf` |  |
| `counter0` | `RawBuf` |  |
| `input` | `RawBuf` |  |
| `len` | `u64` |  |
| `out` | `RawBuf` |  |

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="aes128CtrXor"></a>`aes128CtrXor` `🔓 export`

> 📄 `aes.vx` L360-368

```vex
export fn aes128CtrXor(key: RawBuf, counter0: RawBuf, input: RawBuf, len: u64, out: RawBuf): Result<(), CryptoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `key` | `RawBuf` |  |
| `counter0` | `RawBuf` |  |
| `input` | `RawBuf` |  |
| `len` | `u64` |  |
| `out` | `RawBuf` |  |

**Returns:** `Result&lt;(), CryptoError&gt;`

---

### <a id="aes128CtrXorFromInitialCounter"></a>`aes128CtrXorFromInitialCounter` `🔓 export`

> 📄 `aes.vx` L373-407

```vex
export fn aes128CtrXorFromInitialCounter(key: RawBuf, counter0: RawBuf, input: RawBuf, len: u64, out: RawBuf)
```

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

> 📄 `simd.vx` L6-12

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

> 📄 `simd.vx` L14-21

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

> 📄 `simd.vx` L23-31

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

### <a id="rol32"></a>`rol32`

> 📄 `sha1.vx` L3-5

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

> 📄 `sha1.vx` L35-37

```vex
export fn newSha1(): Sha1
```

**Returns:** `Sha1`

---

### <a id="sha1To"></a>`sha1To` `🔓 export`

> 📄 `sha1.vx` L190-194

```vex
export fn sha1To(data: RawBuf, len: u64, out: Ptr<u8>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `RawBuf` |  |
| `len` | `u64` |  |
| `out` | `Ptr&lt;u8&gt;` |  |

---

### <a id="sha1Hex"></a>`sha1Hex` `🔓 export`

> 📄 `sha1.vx` L196-204

```vex
export fn sha1Hex(data: str): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |

**Returns:** `string`

---

### <a id="bswap32"></a>`bswap32`

> 📄 `sha256.vx` L4-6

```vex
fn bswap32(v: u32): u32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `v` | `u32` |  |

**Returns:** `u32`

---

### <a id="k256"></a>`k256`

> 📄 `sha256.vx` L27-32

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

> 📄 `sha256.vx` L65-67

```vex
export fn newSha256(): Sha256
```

**Returns:** `Sha256`

---

### <a id="sha256To"></a>`sha256To` `🔓 export`

> 📄 `sha256.vx` L245-249

```vex
export fn sha256To(data: RawBuf, len: u64, out: Ptr<u8>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `RawBuf` |  |
| `len` | `u64` |  |
| `out` | `Ptr&lt;u8&gt;` |  |

---

### <a id="sha256Hex"></a>`sha256Hex` `🔓 export`

> 📄 `sha256.vx` L251-263

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

*Generated by vex-doc v2.0 • 2026-08-20*
