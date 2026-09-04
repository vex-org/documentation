# Project v0.0.0

## Overview

**Structs:** [`TlsRecordHeader`](#TlsRecordHeader) · [`TlsPlaintext`](#TlsPlaintext) · [`TlsCipherState`](#TlsCipherState) · [`TlsDnsIdentityError`](#TlsDnsIdentityError) · [`TlsDnsIdentity`](#TlsDnsIdentity) · [`TlsX25519Negotiation`](#TlsX25519Negotiation) · [`TlsEncryptedExtensionsCandidate`](#TlsEncryptedExtensionsCandidate) · [`TlsAlert`](#TlsAlert) · [`TlsWireSlice`](#TlsWireSlice) · [`TlsHelloExtensions`](#TlsHelloExtensions) · [`TlsExtensionEntry`](#TlsExtensionEntry) · [`TlsKeyShareEntry`](#TlsKeyShareEntry) · [`TlsClientHelloView`](#TlsClientHelloView) · [`TlsServerHelloView`](#TlsServerHelloView) · [`TlsTrafficKeyLengths`](#TlsTrafficKeyLengths) · [`TlsHandshakeHeader`](#TlsHandshakeHeader) · [`TlsTranscript`](#TlsTranscript) · [`TlsCertificateEntryView`](#TlsCertificateEntryView) · [`TlsCertificateMessageView`](#TlsCertificateMessageView) · [`TlsCertificateVerifyView`](#TlsCertificateVerifyView) · [`TlsTransportEvent`](#TlsTransportEvent) · [`TlsTransportError`](#TlsTransportError) · [`TlsApplicationTraffic`](#TlsApplicationTraffic) · [`TlsNextTrafficGeneration`](#TlsNextTrafficGeneration) · [`X509Error`](#X509Error) · [`X509CertificateView`](#X509CertificateView) · [`X509ExtensionView`](#X509ExtensionView) · [`X509ExtensionPolicy`](#X509ExtensionPolicy) · [`X509TlsServerVerifier`](#X509TlsServerVerifier) · [`TlsSecretSchedule`](#TlsSecretSchedule) · [`TlsHandshakeFeedResult`](#TlsHandshakeFeedResult) · [`TlsHandshakeAssembler`](#TlsHandshakeAssembler)

**Enums:** [`TlsRecordError`](#TlsRecordError) · [`TlsKeyUpdateRequest`](#TlsKeyUpdateRequest) · [`TlsKeyUpdateError`](#TlsKeyUpdateError) · [`TlsDnsIdentityErrorKind`](#TlsDnsIdentityErrorKind) · [`TlsHandshakeRole`](#TlsHandshakeRole) · [`TlsX25519NegotiationStage`](#TlsX25519NegotiationStage) · [`TlsX25519NegotiationError`](#TlsX25519NegotiationError) · [`TlsAlertLevel`](#TlsAlertLevel) · [`TlsAlertDescription`](#TlsAlertDescription) · [`TlsAlertError`](#TlsAlertError) · [`TlsHelloError`](#TlsHelloError) · [`TlsKeyScheduleError`](#TlsKeyScheduleError) · [`TlsHashAlgorithm`](#TlsHashAlgorithm) · [`TlsTranscriptError`](#TlsTranscriptError) · [`TlsCertificateError`](#TlsCertificateError) · [`TlsTransportState`](#TlsTransportState) · [`TlsTransportEventKind`](#TlsTransportEventKind) · [`TlsTransportErrorKind`](#TlsTransportErrorKind) · [`X509ErrorKind`](#X509ErrorKind) · [`TlsSecretStage`](#TlsSecretStage) · [`TlsHandshakeAssemblerError`](#TlsHandshakeAssemblerError) · [`TlsHandshakeFeedKind`](#TlsHandshakeFeedKind)

**Functions:** [`encodeRecordHeaderRaw`](#encodeRecordHeaderRaw) · [`decodeRecordHeaderRaw`](#decodeRecordHeaderRaw) · [`encodeRecordHeader`](#encodeRecordHeader) · [`decodeRecordHeader`](#decodeRecordHeader) · [`isTlsInnerContentType`](#isTlsInnerContentType) · [`rangesOverlap`](#rangesOverlap) · [`constructNonce`](#constructNonce) · [`keyUpdateRequestCode`](#keyUpdateRequestCode) · [`encodeTlsKeyUpdate`](#encodeTlsKeyUpdate) · [`decodeTlsKeyUpdate`](#decodeTlsKeyUpdate) · [`identityError`](#identityError) · [`identityByteAt`](#identityByteAt) · [`isAsciiAlpha`](#isAsciiAlpha) · [`isAsciiDigit`](#isAsciiDigit) · [`foldedAscii`](#foldedAscii) · [`normalizedDnsLength`](#normalizedDnsLength) · [`isIpv4Reference`](#isIpv4Reference) · [`equalDnsRange`](#equalDnsRange) · [`exactArraySpan`](#exactArraySpan) · [`exactArraySpanMut`](#exactArraySpanMut) · [`spansOverlap`](#spansOverlap) · [`equalBytes`](#equalBytes) · [`mapHelloFailure`](#mapHelloFailure) · [`mapTranscriptFailure`](#mapTranscriptFailure) · [`mapScheduleFailure`](#mapScheduleFailure) · [`cipherHash`](#cipherHash) · [`offeredCipher`](#offeredCipher) · [`offeredSignature`](#offeredSignature) · [`hashU16`](#hashU16) · [`retryInvariantDigest`](#retryInvariantDigest) · [`extensionPresent`](#extensionPresent) · [`validateTrafficOutputs`](#validateTrafficOutputs) · [`negotiationU16`](#negotiationU16) · [`alertLevelCode`](#alertLevelCode) · [`decodeAlertLevel`](#decodeAlertLevel) · [`alertDescriptionCode`](#alertDescriptionCode) · [`decodeAlertDescription`](#decodeAlertDescription) · [`canonicalAlertLevel`](#canonicalAlertLevel) · [`encodeTlsAlert`](#encodeTlsAlert) · [`decodeTlsAlert`](#decodeTlsAlert) · [`emptyWireSlice`](#emptyWireSlice) · [`emptyExtensions`](#emptyExtensions) · [`readU16`](#readU16) · [`writeU16`](#writeU16) · [`copyBytes`](#copyBytes) · [`rangesOverlap`](#rangesOverlap) · [`spanRangeOverlapsOutput`](#spanRangeOverlapsOutput) · [`validateVector16`](#validateVector16) · [`validateSupportedVersions`](#validateSupportedVersions) · [`validateServerName`](#validateServerName) · [`validateAlpn`](#validateAlpn) · [`validateCookie`](#validateCookie) · [`validatePadding`](#validatePadding) · [`validateClientPsk`](#validateClientPsk) · [`groupsContain`](#groupsContain) · [`validateClientKeyShares`](#validateClientKeyShares) · [`validateServerKeyShare`](#validateServerKeyShare) · [`scanExtensions`](#scanExtensions) · [`decodeExactHeader`](#decodeExactHeader) · [`copyRandom`](#copyRandom) · [`isHelloRetryRandom`](#isHelloRetryRandom) · [`decodeClientHello`](#decodeClientHello) · [`decodeServerHello`](#decodeServerHello) · [`encodeHeader`](#encodeHeader) · [`encodeTlsExtension`](#encodeTlsExtension) · [`encodeCookie`](#encodeCookie) · [`encodeClientHello`](#encodeClientHello) · [`encodeServerHello`](#encodeServerHello) · [`encodeClientSupportedVersions`](#encodeClientSupportedVersions) · [`encodeServerSupportedVersion`](#encodeServerSupportedVersion) · [`encodeU16VectorExtension`](#encodeU16VectorExtension) · [`encodeSupportedGroups`](#encodeSupportedGroups) · [`encodeSignatureAlgorithms`](#encodeSignatureAlgorithms) · [`encodeClientKeyShare`](#encodeClientKeyShare) · [`encodeServerKeyShare`](#encodeServerKeyShare) · [`encodeHelloRetryKeyShare`](#encodeHelloRetryKeyShare) · [`spansOverlap`](#spansOverlap) · [`hkdfExpandLabel`](#hkdfExpandLabel) · [`deriveSecret`](#deriveSecret) · [`computeFinishedVerifyData`](#computeFinishedVerifyData) · [`verifyFinished`](#verifyFinished) · [`deriveTrafficKeys`](#deriveTrafficKeys) · [`updateTrafficSecret`](#updateTrafficSecret) · [`decodeHeaderRaw`](#decodeHeaderRaw) · [`encodeHeaderRaw`](#encodeHeaderRaw) · [`decodeHandshakeHeader`](#decodeHandshakeHeader) · [`encodeHandshakeHeader`](#encodeHandshakeHeader) · [`sameHash`](#sameHash) · [`certificateU16`](#certificateU16) · [`certificateU24`](#certificateU24) · [`certificateSlice`](#certificateSlice) · [`scanCertificateEntryExtensions`](#scanCertificateEntryExtensions) · [`certificateEntryAtChecked`](#certificateEntryAtChecked) · [`decodeServerCertificate`](#decodeServerCertificate) · [`decodeCertificateVerify`](#decodeCertificateVerify) · [`verifyServerCertificateSignature`](#verifyServerCertificateSignature) · [`verifyServerCertificateSignatureWithKey`](#verifyServerCertificateSignatureWithKey) · [`transportError`](#transportError) · [`transportRecordError`](#transportRecordError) · [`transportAlertError`](#transportAlertError) · [`transportScheduleError`](#transportScheduleError) · [`transportKeyUpdateError`](#transportKeyUpdateError) · [`recordFailureEndsConnection`](#recordFailureEndsConnection) · [`arraySpan`](#arraySpan) · [`mutableArraySpan`](#mutableArraySpan) · [`stageNextGeneration`](#stageNextGeneration) · [`x509Error`](#x509Error) · [`bytesOf`](#bytesOf) · [`rebaseSlice`](#rebaseSlice) · [`rebaseElement`](#rebaseElement) · [`child`](#child) · [`childCount`](#childCount) · [`isEd25519Algorithm`](#isEd25519Algorithm) · [`explicitElement`](#explicitElement) · [`x509Digit`](#x509Digit) · [`x509TwoDigits`](#x509TwoDigits) · [`x509LeapYear`](#x509LeapYear) · [`x509DaysInMonth`](#x509DaysInMonth) · [`x509DaysFromCivil`](#x509DaysFromCivil) · [`parseCertificateTime`](#parseCertificateTime) · [`extensionSequence`](#extensionSequence) · [`extensionAt`](#extensionAt) · [`oidMatches`](#oidMatches) · [`boundedPathLength`](#boundedPathLength) · [`sameOid`](#sameOid) · [`parseBasicConstraints`](#parseBasicConstraints) · [`parseKeyUsage`](#parseKeyUsage) · [`parseExtendedKeyUsage`](#parseExtendedKeyUsage) · [`extensionPolicy`](#extensionPolicy) · [`namesEqual`](#namesEqual) · [`subjectNameIsEmpty`](#subjectNameIsEmpty) · [`validateLeafPolicy`](#validateLeafPolicy) · [`validateAuthorityPolicy`](#validateAuthorityPolicy) · [`certificateIsSelfIssued`](#certificateIsSelfIssued) · [`subjectAltNames`](#subjectAltNames) · [`sameHash`](#sameHash) · [`rangesOverlap`](#rangesOverlap) · [`exactArraySpan`](#exactArraySpan) · [`exactArraySpanMut`](#exactArraySpanMut) · [`emptyTranscriptHash`](#emptyTranscriptHash) · [`transcriptDigest`](#transcriptDigest) · [`extractSecret`](#extractSecret) · [`validateDualOutput`](#validateDualOutput) · [`computeFinishedFromTranscript`](#computeFinishedFromTranscript) · [`verifyFinishedFromTranscript`](#verifyFinishedFromTranscript) · [`emptyFeedResult`](#emptyFeedResult) · [`completeFeedResult`](#completeFeedResult) · [`copyBytes`](#copyBytes) · [`spansOverlap`](#spansOverlap) · [`headerFromArray`](#headerFromArray) · [`validateOutput`](#validateOutput) · [`headerFromSpan`](#headerFromSpan)

**Constants:** [`CONTENT_TYPE_CHANGE_CIPHER_SPEC`](#CONTENT_TYPE_CHANGE_CIPHER_SPEC) · [`CONTENT_TYPE_ALERT`](#CONTENT_TYPE_ALERT) · [`CONTENT_TYPE_HANDSHAKE`](#CONTENT_TYPE_HANDSHAKE) · [`CONTENT_TYPE_APPLICATION_DATA`](#CONTENT_TYPE_APPLICATION_DATA) · [`TLS_VERSION_1_2`](#TLS_VERSION_1_2) · [`TLS_VERSION_1_3`](#TLS_VERSION_1_3) · [`CIPHER_AES_128_GCM_SHA256`](#CIPHER_AES_128_GCM_SHA256) · [`CIPHER_AES_256_GCM_SHA384`](#CIPHER_AES_256_GCM_SHA384) · [`CIPHER_CHACHA20_POLY1305_SHA256`](#CIPHER_CHACHA20_POLY1305_SHA256) · [`TLS_RECORD_HEADER_LEN`](#TLS_RECORD_HEADER_LEN) · [`TLS_AEAD_TAG_LEN`](#TLS_AEAD_TAG_LEN) · [`TLS_MAX_PLAINTEXT_LEN`](#TLS_MAX_PLAINTEXT_LEN) · [`TLS_MAX_CIPHERTEXT_LEN`](#TLS_MAX_CIPHERTEXT_LEN) · [`TLS_KEY_UPDATE_WIRE_BYTES`](#TLS_KEY_UPDATE_WIRE_BYTES) · [`TLS_MAX_NEGOTIATION_ALPN_BYTES`](#TLS_MAX_NEGOTIATION_ALPN_BYTES) · [`TLS_MAX_SELECTED_ALPN_BYTES`](#TLS_MAX_SELECTED_ALPN_BYTES) · [`TLS_MAX_RETRY_COOKIE_BYTES`](#TLS_MAX_RETRY_COOKIE_BYTES) · [`TLS_ALERT_WIRE_BYTES`](#TLS_ALERT_WIRE_BYTES) · [`TLS_LEGACY_VERSION`](#TLS_LEGACY_VERSION) · [`TLS_EXTENSION_SERVER_NAME`](#TLS_EXTENSION_SERVER_NAME) · [`TLS_EXTENSION_SUPPORTED_GROUPS`](#TLS_EXTENSION_SUPPORTED_GROUPS) · [`TLS_EXTENSION_SIGNATURE_ALGORITHMS`](#TLS_EXTENSION_SIGNATURE_ALGORITHMS) · [`TLS_EXTENSION_ALPN`](#TLS_EXTENSION_ALPN) · [`TLS_EXTENSION_PADDING`](#TLS_EXTENSION_PADDING) · [`TLS_EXTENSION_PRE_SHARED_KEY`](#TLS_EXTENSION_PRE_SHARED_KEY) · [`TLS_EXTENSION_EARLY_DATA`](#TLS_EXTENSION_EARLY_DATA) · [`TLS_EXTENSION_SUPPORTED_VERSIONS`](#TLS_EXTENSION_SUPPORTED_VERSIONS) · [`TLS_EXTENSION_COOKIE`](#TLS_EXTENSION_COOKIE) · [`TLS_EXTENSION_PSK_KEY_EXCHANGE_MODES`](#TLS_EXTENSION_PSK_KEY_EXCHANGE_MODES) · [`TLS_EXTENSION_KEY_SHARE`](#TLS_EXTENSION_KEY_SHARE) · [`TLS_NAMED_GROUP_X25519`](#TLS_NAMED_GROUP_X25519) · [`TLS_MAX_HELLO_EXTENSIONS`](#TLS_MAX_HELLO_EXTENSIONS) · [`TLS_MAX_HELLO_CIPHER_SUITES`](#TLS_MAX_HELLO_CIPHER_SUITES) · [`TLS_MAX_HELLO_GROUPS`](#TLS_MAX_HELLO_GROUPS) · [`TLS_MAX_HELLO_SIGNATURE_SCHEMES`](#TLS_MAX_HELLO_SIGNATURE_SCHEMES) · [`TLS_HELLO_RETRY_RANDOM`](#TLS_HELLO_RETRY_RANDOM) · [`HANDSHAKE_TYPE_CLIENT_HELLO`](#HANDSHAKE_TYPE_CLIENT_HELLO) · [`HANDSHAKE_TYPE_SERVER_HELLO`](#HANDSHAKE_TYPE_SERVER_HELLO) · [`HANDSHAKE_TYPE_ENCRYPTED_EXTENSIONS`](#HANDSHAKE_TYPE_ENCRYPTED_EXTENSIONS) · [`HANDSHAKE_TYPE_CERTIFICATE`](#HANDSHAKE_TYPE_CERTIFICATE) · [`HANDSHAKE_TYPE_CERTIFICATE_VERIFY`](#HANDSHAKE_TYPE_CERTIFICATE_VERIFY) · [`HANDSHAKE_TYPE_FINISHED`](#HANDSHAKE_TYPE_FINISHED) · [`HANDSHAKE_TYPE_KEY_UPDATE`](#HANDSHAKE_TYPE_KEY_UPDATE) · [`TLS_HANDSHAKE_HEADER_LEN`](#TLS_HANDSHAKE_HEADER_LEN) · [`TLS_MAX_HANDSHAKE_BODY_LEN`](#TLS_MAX_HANDSHAKE_BODY_LEN) · [`TLS_DEFAULT_TRANSCRIPT_LIMIT`](#TLS_DEFAULT_TRANSCRIPT_LIMIT) · [`TLS_MAX_TRANSCRIPT_LIMIT`](#TLS_MAX_TRANSCRIPT_LIMIT) · [`HANDSHAKE_TYPE_MESSAGE_HASH`](#HANDSHAKE_TYPE_MESSAGE_HASH) · [`TLS_SIGNATURE_ED25519`](#TLS_SIGNATURE_ED25519) · [`TLS_MAX_CERTIFICATE_ENTRIES`](#TLS_MAX_CERTIFICATE_ENTRIES) · [`TLS_MAX_CERTIFICATE_ENTRY_EXTENSIONS`](#TLS_MAX_CERTIFICATE_ENTRY_EXTENSIONS) · [`TLS_MIN_PROTECTED_RECORD_BYTES`](#TLS_MIN_PROTECTED_RECORD_BYTES) · [`OID_ED25519`](#OID_ED25519) · [`OID_SUBJECT_ALT_NAME`](#OID_SUBJECT_ALT_NAME) · [`OID_BASIC_CONSTRAINTS`](#OID_BASIC_CONSTRAINTS) · [`OID_KEY_USAGE`](#OID_KEY_USAGE) · [`OID_EXTENDED_KEY_USAGE`](#OID_EXTENDED_KEY_USAGE) · [`OID_SUBJECT_KEY_IDENTIFIER`](#OID_SUBJECT_KEY_IDENTIFIER) · [`OID_AUTHORITY_KEY_IDENTIFIER`](#OID_AUTHORITY_KEY_IDENTIFIER) · [`OID_NAME_CONSTRAINTS`](#OID_NAME_CONSTRAINTS) · [`OID_POLICY_MAPPINGS`](#OID_POLICY_MAPPINGS) · [`OID_POLICY_CONSTRAINTS`](#OID_POLICY_CONSTRAINTS) · [`OID_INHIBIT_ANY_POLICY`](#OID_INHIBIT_ANY_POLICY) · [`OID_SERVER_AUTH`](#OID_SERVER_AUTH) · [`OID_ANY_EXTENDED_KEY_USAGE`](#OID_ANY_EXTENDED_KEY_USAGE) · [`X509_MAX_INTERMEDIATES`](#X509_MAX_INTERMEDIATES)

## Constants

### <a id="CONTENT_TYPE_CHANGE_CIPHER_SPEC"></a>`CONTENT_TYPE_CHANGE_CIPHER_SPEC` `🔓 export`

> 📄 `record.vx` L11-11

```vex
export const CONTENT_TYPE_CHANGE_CIPHER_SPEC: u8=20;
```

**Returns:** `u8=20;`

---

### <a id="CONTENT_TYPE_ALERT"></a>`CONTENT_TYPE_ALERT` `🔓 export`

> 📄 `record.vx` L12-12

```vex
export const CONTENT_TYPE_ALERT: u8=21;
```

**Returns:** `u8=21;`

---

### <a id="CONTENT_TYPE_HANDSHAKE"></a>`CONTENT_TYPE_HANDSHAKE` `🔓 export`

> 📄 `record.vx` L13-13

```vex
export const CONTENT_TYPE_HANDSHAKE: u8=22;
```

**Returns:** `u8=22;`

---

### <a id="CONTENT_TYPE_APPLICATION_DATA"></a>`CONTENT_TYPE_APPLICATION_DATA` `🔓 export`

> 📄 `record.vx` L14-14

```vex
export const CONTENT_TYPE_APPLICATION_DATA: u8=23;
```

**Returns:** `u8=23;`

---

### <a id="TLS_VERSION_1_2"></a>`TLS_VERSION_1_2` `🔓 export`

> 📄 `record.vx` L16-16

```vex
export const TLS_VERSION_1_2: u16=0x0303;
```

**Returns:** `u16=0x0303;`

---

### <a id="TLS_VERSION_1_3"></a>`TLS_VERSION_1_3` `🔓 export`

> 📄 `record.vx` L17-17

```vex
export const TLS_VERSION_1_3: u16=0x0304;
```

**Returns:** `u16=0x0304;`

---

### <a id="CIPHER_AES_128_GCM_SHA256"></a>`CIPHER_AES_128_GCM_SHA256` `🔓 export`

> 📄 `record.vx` L19-19

```vex
export const CIPHER_AES_128_GCM_SHA256: u16=0x1301;
```

**Returns:** `u16=0x1301;`

---

### <a id="CIPHER_AES_256_GCM_SHA384"></a>`CIPHER_AES_256_GCM_SHA384` `🔓 export`

> 📄 `record.vx` L20-20

```vex
export const CIPHER_AES_256_GCM_SHA384: u16=0x1302;
```

**Returns:** `u16=0x1302;`

---

### <a id="CIPHER_CHACHA20_POLY1305_SHA256"></a>`CIPHER_CHACHA20_POLY1305_SHA256` `🔓 export`

> 📄 `record.vx` L21-21

```vex
export const CIPHER_CHACHA20_POLY1305_SHA256: u16=0x1303;
```

**Returns:** `u16=0x1303;`

---

### <a id="TLS_RECORD_HEADER_LEN"></a>`TLS_RECORD_HEADER_LEN`

> 📄 `record.vx` L23-23

```vex
const TLS_RECORD_HEADER_LEN: u64=5;
```

**Returns:** `u64=5;`

---

### <a id="TLS_AEAD_TAG_LEN"></a>`TLS_AEAD_TAG_LEN`

> 📄 `record.vx` L24-24

```vex
const TLS_AEAD_TAG_LEN: u64=16;
```

**Returns:** `u64=16;`

---

### <a id="TLS_MAX_PLAINTEXT_LEN"></a>`TLS_MAX_PLAINTEXT_LEN`

> 📄 `record.vx` L25-25

```vex
const TLS_MAX_PLAINTEXT_LEN: u64=16384;
```

**Returns:** `u64=16384;`

---

### <a id="TLS_MAX_CIPHERTEXT_LEN"></a>`TLS_MAX_CIPHERTEXT_LEN`

> 📄 `record.vx` L26-26

```vex
const TLS_MAX_CIPHERTEXT_LEN: u64=16640;
```

**Returns:** `u64=16640;`

---

### <a id="TLS_KEY_UPDATE_WIRE_BYTES"></a>`TLS_KEY_UPDATE_WIRE_BYTES` `🔓 export`

> 📄 `key_update.vx` L7-7

```vex
export const TLS_KEY_UPDATE_WIRE_BYTES: usize=5 as usize;
```

**Returns:** `usize=5 as usize;`

---

### <a id="TLS_MAX_NEGOTIATION_ALPN_BYTES"></a>`TLS_MAX_NEGOTIATION_ALPN_BYTES` `🔓 export`

> 📄 `negotiation.vx` L36-36

```vex
export const TLS_MAX_NEGOTIATION_ALPN_BYTES: usize=1024 as usize;
```

**Returns:** `usize=1024 as usize;`

---

### <a id="TLS_MAX_SELECTED_ALPN_BYTES"></a>`TLS_MAX_SELECTED_ALPN_BYTES` `🔓 export`

> 📄 `negotiation.vx` L37-37

```vex
export const TLS_MAX_SELECTED_ALPN_BYTES: usize=255 as usize;
```

**Returns:** `usize=255 as usize;`

---

### <a id="TLS_MAX_RETRY_COOKIE_BYTES"></a>`TLS_MAX_RETRY_COOKIE_BYTES` `🔓 export`

> 📄 `negotiation.vx` L38-38

```vex
export const TLS_MAX_RETRY_COOKIE_BYTES: usize=4096 as usize;
```

**Returns:** `usize=4096 as usize;`

---

### <a id="TLS_ALERT_WIRE_BYTES"></a>`TLS_ALERT_WIRE_BYTES` `🔓 export`

> 📄 `alert.vx` L5-5

```vex
export const TLS_ALERT_WIRE_BYTES: usize=2 as usize;
```

**Returns:** `usize=2 as usize;`

---

### <a id="TLS_LEGACY_VERSION"></a>`TLS_LEGACY_VERSION` `🔓 export`

> 📄 `hello.vx` L14-14

```vex
export const TLS_LEGACY_VERSION: u16=0x0303 as u16;
```

**Returns:** `u16=0x0303 as u16;`

---

### <a id="TLS_EXTENSION_SERVER_NAME"></a>`TLS_EXTENSION_SERVER_NAME` `🔓 export`

> 📄 `hello.vx` L16-16

```vex
export const TLS_EXTENSION_SERVER_NAME: u16=0 as u16;
```

**Returns:** `u16=0 as u16;`

---

### <a id="TLS_EXTENSION_SUPPORTED_GROUPS"></a>`TLS_EXTENSION_SUPPORTED_GROUPS` `🔓 export`

> 📄 `hello.vx` L17-17

```vex
export const TLS_EXTENSION_SUPPORTED_GROUPS: u16=10 as u16;
```

**Returns:** `u16=10 as u16;`

---

### <a id="TLS_EXTENSION_SIGNATURE_ALGORITHMS"></a>`TLS_EXTENSION_SIGNATURE_ALGORITHMS` `🔓 export`

> 📄 `hello.vx` L18-18

```vex
export const TLS_EXTENSION_SIGNATURE_ALGORITHMS: u16=13 as u16;
```

**Returns:** `u16=13 as u16;`

---

### <a id="TLS_EXTENSION_ALPN"></a>`TLS_EXTENSION_ALPN` `🔓 export`

> 📄 `hello.vx` L19-19

```vex
export const TLS_EXTENSION_ALPN: u16=16 as u16;
```

**Returns:** `u16=16 as u16;`

---

### <a id="TLS_EXTENSION_PADDING"></a>`TLS_EXTENSION_PADDING` `🔓 export`

> 📄 `hello.vx` L20-20

```vex
export const TLS_EXTENSION_PADDING: u16=21 as u16;
```

**Returns:** `u16=21 as u16;`

---

### <a id="TLS_EXTENSION_PRE_SHARED_KEY"></a>`TLS_EXTENSION_PRE_SHARED_KEY` `🔓 export`

> 📄 `hello.vx` L21-21

```vex
export const TLS_EXTENSION_PRE_SHARED_KEY: u16=41 as u16;
```

**Returns:** `u16=41 as u16;`

---

### <a id="TLS_EXTENSION_EARLY_DATA"></a>`TLS_EXTENSION_EARLY_DATA` `🔓 export`

> 📄 `hello.vx` L22-22

```vex
export const TLS_EXTENSION_EARLY_DATA: u16=42 as u16;
```

**Returns:** `u16=42 as u16;`

---

### <a id="TLS_EXTENSION_SUPPORTED_VERSIONS"></a>`TLS_EXTENSION_SUPPORTED_VERSIONS` `🔓 export`

> 📄 `hello.vx` L23-23

```vex
export const TLS_EXTENSION_SUPPORTED_VERSIONS: u16=43 as u16;
```

**Returns:** `u16=43 as u16;`

---

### <a id="TLS_EXTENSION_COOKIE"></a>`TLS_EXTENSION_COOKIE` `🔓 export`

> 📄 `hello.vx` L24-24

```vex
export const TLS_EXTENSION_COOKIE: u16=44 as u16;
```

**Returns:** `u16=44 as u16;`

---

### <a id="TLS_EXTENSION_PSK_KEY_EXCHANGE_MODES"></a>`TLS_EXTENSION_PSK_KEY_EXCHANGE_MODES` `🔓 export`

> 📄 `hello.vx` L25-25

```vex
export const TLS_EXTENSION_PSK_KEY_EXCHANGE_MODES: u16=45 as u16;
```

**Returns:** `u16=45 as u16;`

---

### <a id="TLS_EXTENSION_KEY_SHARE"></a>`TLS_EXTENSION_KEY_SHARE` `🔓 export`

> 📄 `hello.vx` L26-26

```vex
export const TLS_EXTENSION_KEY_SHARE: u16=51 as u16;
```

**Returns:** `u16=51 as u16;`

---

### <a id="TLS_NAMED_GROUP_X25519"></a>`TLS_NAMED_GROUP_X25519` `🔓 export`

> 📄 `hello.vx` L28-28

```vex
export const TLS_NAMED_GROUP_X25519: u16=29 as u16;
```

**Returns:** `u16=29 as u16;`

---

### <a id="TLS_MAX_HELLO_EXTENSIONS"></a>`TLS_MAX_HELLO_EXTENSIONS` `🔓 export`

> 📄 `hello.vx` L29-29

```vex
export const TLS_MAX_HELLO_EXTENSIONS: usize=64 as usize;
```

**Returns:** `usize=64 as usize;`

---

### <a id="TLS_MAX_HELLO_CIPHER_SUITES"></a>`TLS_MAX_HELLO_CIPHER_SUITES` `🔓 export`

> 📄 `hello.vx` L30-30

```vex
export const TLS_MAX_HELLO_CIPHER_SUITES: usize=256 as usize;
```

**Returns:** `usize=256 as usize;`

---

### <a id="TLS_MAX_HELLO_GROUPS"></a>`TLS_MAX_HELLO_GROUPS` `🔓 export`

> 📄 `hello.vx` L31-31

```vex
export const TLS_MAX_HELLO_GROUPS: usize=64 as usize;
```

**Returns:** `usize=64 as usize;`

---

### <a id="TLS_MAX_HELLO_SIGNATURE_SCHEMES"></a>`TLS_MAX_HELLO_SIGNATURE_SCHEMES` `🔓 export`

> 📄 `hello.vx` L32-32

```vex
export const TLS_MAX_HELLO_SIGNATURE_SCHEMES: usize=64 as usize;
```

**Returns:** `usize=64 as usize;`

---

### <a id="TLS_HELLO_RETRY_RANDOM"></a>`TLS_HELLO_RETRY_RANDOM`

> 📄 `hello.vx` L34-39

```vex
const TLS_HELLO_RETRY_RANDOM: [u8; 32]=[
    0xcfu8, 0x21, 0xad, 0x74, 0xe5, 0x9a, 0x61, 0x11,
    0xbe, 0x1d, 0x8c, 0x02, 0x1e, 0x65, 0xb8, 0x91,
    0xc2, 0xa2, 0x11, 0x16, 0x7a, 0xbb, 0x8c, 0x5e,
    0x07, 0x9e, 0x09, 0xe2, 0xc8, 0xa8, 0x33, 0x9c,
];
```

**Returns:** `[u8; 32]=[
    0xcfu8, 0x21, 0xad, 0x74, 0xe5, 0x9a, 0x61, 0x11,
    0xbe, 0x1d, 0x8c, 0x02, 0x1e, 0x65, 0xb8, 0x91,
    0xc2, 0xa2, 0x11, 0x16, 0x7a, 0xbb, 0x8c, 0x5e,
    0x07, 0x9e, 0x09, 0xe2, 0xc8, 0xa8, 0x33, 0x9c,
];`

---

### <a id="HANDSHAKE_TYPE_CLIENT_HELLO"></a>`HANDSHAKE_TYPE_CLIENT_HELLO` `🔓 export`

> 📄 `handshake.vx` L13-13

```vex
export const HANDSHAKE_TYPE_CLIENT_HELLO: u8=1;
```

**Returns:** `u8=1;`

---

### <a id="HANDSHAKE_TYPE_SERVER_HELLO"></a>`HANDSHAKE_TYPE_SERVER_HELLO` `🔓 export`

> 📄 `handshake.vx` L14-14

```vex
export const HANDSHAKE_TYPE_SERVER_HELLO: u8=2;
```

**Returns:** `u8=2;`

---

### <a id="HANDSHAKE_TYPE_ENCRYPTED_EXTENSIONS"></a>`HANDSHAKE_TYPE_ENCRYPTED_EXTENSIONS` `🔓 export`

> 📄 `handshake.vx` L15-15

```vex
export const HANDSHAKE_TYPE_ENCRYPTED_EXTENSIONS: u8=8;
```

**Returns:** `u8=8;`

---

### <a id="HANDSHAKE_TYPE_CERTIFICATE"></a>`HANDSHAKE_TYPE_CERTIFICATE` `🔓 export`

> 📄 `handshake.vx` L16-16

```vex
export const HANDSHAKE_TYPE_CERTIFICATE: u8=11;
```

**Returns:** `u8=11;`

---

### <a id="HANDSHAKE_TYPE_CERTIFICATE_VERIFY"></a>`HANDSHAKE_TYPE_CERTIFICATE_VERIFY` `🔓 export`

> 📄 `handshake.vx` L17-17

```vex
export const HANDSHAKE_TYPE_CERTIFICATE_VERIFY: u8=15;
```

**Returns:** `u8=15;`

---

### <a id="HANDSHAKE_TYPE_FINISHED"></a>`HANDSHAKE_TYPE_FINISHED` `🔓 export`

> 📄 `handshake.vx` L18-18

```vex
export const HANDSHAKE_TYPE_FINISHED: u8=20;
```

**Returns:** `u8=20;`

---

### <a id="HANDSHAKE_TYPE_KEY_UPDATE"></a>`HANDSHAKE_TYPE_KEY_UPDATE` `🔓 export`

> 📄 `handshake.vx` L19-19

```vex
export const HANDSHAKE_TYPE_KEY_UPDATE: u8=24;
```

**Returns:** `u8=24;`

---

### <a id="TLS_HANDSHAKE_HEADER_LEN"></a>`TLS_HANDSHAKE_HEADER_LEN` `🔓 export`

> 📄 `transcript.vx` L10-10

```vex
export const TLS_HANDSHAKE_HEADER_LEN: usize=4 as usize;
```

**Returns:** `usize=4 as usize;`

---

### <a id="TLS_MAX_HANDSHAKE_BODY_LEN"></a>`TLS_MAX_HANDSHAKE_BODY_LEN` `🔓 export`

> 📄 `transcript.vx` L11-11

```vex
export const TLS_MAX_HANDSHAKE_BODY_LEN: usize=0x00ff_ffff as usize;
```

**Returns:** `usize=0x00ff_ffff as usize;`

---

### <a id="TLS_DEFAULT_TRANSCRIPT_LIMIT"></a>`TLS_DEFAULT_TRANSCRIPT_LIMIT` `🔓 export`

> 📄 `transcript.vx` L12-12

```vex
export const TLS_DEFAULT_TRANSCRIPT_LIMIT: usize=16 as usize * 1024 as usize * 1024 as usize;
```

**Returns:** `usize=16 as usize * 1024 as usize * 1024 as usize;`

---

### <a id="TLS_MAX_TRANSCRIPT_LIMIT"></a>`TLS_MAX_TRANSCRIPT_LIMIT` `🔓 export`

> 📄 `transcript.vx` L13-13

```vex
export const TLS_MAX_TRANSCRIPT_LIMIT: usize=64 as usize * 1024 as usize * 1024 as usize;
```

**Returns:** `usize=64 as usize * 1024 as usize * 1024 as usize;`

---

### <a id="HANDSHAKE_TYPE_MESSAGE_HASH"></a>`HANDSHAKE_TYPE_MESSAGE_HASH` `🔓 export`

> 📄 `transcript.vx` L14-14

```vex
export const HANDSHAKE_TYPE_MESSAGE_HASH: u8=254 as u8;
```

**Returns:** `u8=254 as u8;`

---

### <a id="TLS_SIGNATURE_ED25519"></a>`TLS_SIGNATURE_ED25519` `🔓 export`

> 📄 `certificate.vx` L13-13

```vex
export const TLS_SIGNATURE_ED25519: u16=0x0807 as u16;
```

**Returns:** `u16=0x0807 as u16;`

---

### <a id="TLS_MAX_CERTIFICATE_ENTRIES"></a>`TLS_MAX_CERTIFICATE_ENTRIES` `🔓 export`

> 📄 `certificate.vx` L14-14

```vex
export const TLS_MAX_CERTIFICATE_ENTRIES: usize=9 as usize;
```

**Returns:** `usize=9 as usize;`

---

### <a id="TLS_MAX_CERTIFICATE_ENTRY_EXTENSIONS"></a>`TLS_MAX_CERTIFICATE_ENTRY_EXTENSIONS` `🔓 export`

> 📄 `certificate.vx` L15-15

```vex
export const TLS_MAX_CERTIFICATE_ENTRY_EXTENSIONS: usize=32 as usize;
```

**Returns:** `usize=32 as usize;`

---

### <a id="TLS_MIN_PROTECTED_RECORD_BYTES"></a>`TLS_MIN_PROTECTED_RECORD_BYTES`

> 📄 `transport.vx` L23-23

```vex
const TLS_MIN_PROTECTED_RECORD_BYTES: usize=22 as usize;
```

**Returns:** `usize=22 as usize;`

---

### <a id="OID_ED25519"></a>`OID_ED25519`

> 📄 `x509.vx` L9-9

```vex
const OID_ED25519: [u8; 3]=[0x2bu8, 0x65, 0x70];
```

**Returns:** `[u8; 3]=[0x2bu8, 0x65, 0x70];`

---

### <a id="OID_SUBJECT_ALT_NAME"></a>`OID_SUBJECT_ALT_NAME`

> 📄 `x509.vx` L10-10

```vex
const OID_SUBJECT_ALT_NAME: [u8; 3]=[0x55u8, 0x1d, 0x11];
```

**Returns:** `[u8; 3]=[0x55u8, 0x1d, 0x11];`

---

### <a id="OID_BASIC_CONSTRAINTS"></a>`OID_BASIC_CONSTRAINTS`

> 📄 `x509.vx` L11-11

```vex
const OID_BASIC_CONSTRAINTS: [u8; 3]=[0x55u8, 0x1d, 0x13];
```

**Returns:** `[u8; 3]=[0x55u8, 0x1d, 0x13];`

---

### <a id="OID_KEY_USAGE"></a>`OID_KEY_USAGE`

> 📄 `x509.vx` L12-12

```vex
const OID_KEY_USAGE: [u8; 3]=[0x55u8, 0x1d, 0x0f];
```

**Returns:** `[u8; 3]=[0x55u8, 0x1d, 0x0f];`

---

### <a id="OID_EXTENDED_KEY_USAGE"></a>`OID_EXTENDED_KEY_USAGE`

> 📄 `x509.vx` L13-13

```vex
const OID_EXTENDED_KEY_USAGE: [u8; 3]=[0x55u8, 0x1d, 0x25];
```

**Returns:** `[u8; 3]=[0x55u8, 0x1d, 0x25];`

---

### <a id="OID_SUBJECT_KEY_IDENTIFIER"></a>`OID_SUBJECT_KEY_IDENTIFIER`

> 📄 `x509.vx` L14-14

```vex
const OID_SUBJECT_KEY_IDENTIFIER: [u8; 3]=[0x55u8, 0x1d, 0x0e];
```

**Returns:** `[u8; 3]=[0x55u8, 0x1d, 0x0e];`

---

### <a id="OID_AUTHORITY_KEY_IDENTIFIER"></a>`OID_AUTHORITY_KEY_IDENTIFIER`

> 📄 `x509.vx` L15-15

```vex
const OID_AUTHORITY_KEY_IDENTIFIER: [u8; 3]=[0x55u8, 0x1d, 0x23];
```

**Returns:** `[u8; 3]=[0x55u8, 0x1d, 0x23];`

---

### <a id="OID_NAME_CONSTRAINTS"></a>`OID_NAME_CONSTRAINTS`

> 📄 `x509.vx` L16-16

```vex
const OID_NAME_CONSTRAINTS: [u8; 3]=[0x55u8, 0x1d, 0x1e];
```

**Returns:** `[u8; 3]=[0x55u8, 0x1d, 0x1e];`

---

### <a id="OID_POLICY_MAPPINGS"></a>`OID_POLICY_MAPPINGS`

> 📄 `x509.vx` L17-17

```vex
const OID_POLICY_MAPPINGS: [u8; 3]=[0x55u8, 0x1d, 0x21];
```

**Returns:** `[u8; 3]=[0x55u8, 0x1d, 0x21];`

---

### <a id="OID_POLICY_CONSTRAINTS"></a>`OID_POLICY_CONSTRAINTS`

> 📄 `x509.vx` L18-18

```vex
const OID_POLICY_CONSTRAINTS: [u8; 3]=[0x55u8, 0x1d, 0x24];
```

**Returns:** `[u8; 3]=[0x55u8, 0x1d, 0x24];`

---

### <a id="OID_INHIBIT_ANY_POLICY"></a>`OID_INHIBIT_ANY_POLICY`

> 📄 `x509.vx` L19-19

```vex
const OID_INHIBIT_ANY_POLICY: [u8; 3]=[0x55u8, 0x1d, 0x36];
```

**Returns:** `[u8; 3]=[0x55u8, 0x1d, 0x36];`

---

### <a id="OID_SERVER_AUTH"></a>`OID_SERVER_AUTH`

> 📄 `x509.vx` L20-20

```vex
const OID_SERVER_AUTH: [u8; 8]=[0x2bu8, 0x06, 0x01, 0x05, 0x05, 0x07, 0x03, 0x01];
```

**Returns:** `[u8; 8]=[0x2bu8, 0x06, 0x01, 0x05, 0x05, 0x07, 0x03, 0x01];`

---

### <a id="OID_ANY_EXTENDED_KEY_USAGE"></a>`OID_ANY_EXTENDED_KEY_USAGE`

> 📄 `x509.vx` L21-21

```vex
const OID_ANY_EXTENDED_KEY_USAGE: [u8; 4]=[0x55u8, 0x1d, 0x25, 0x00];
```

**Returns:** `[u8; 4]=[0x55u8, 0x1d, 0x25, 0x00];`

---

### <a id="X509_MAX_INTERMEDIATES"></a>`X509_MAX_INTERMEDIATES` `🔓 export`

> 📄 `x509.vx` L23-23

```vex
export const X509_MAX_INTERMEDIATES: usize=8 as usize;
```

**Returns:** `usize=8 as usize;`

---

## Structs

### <a id="TlsRecordHeader"></a>`TlsRecordHeader` `🔓 export`

> 📄 `record.vx` L28-33

```vex
export struct TlsRecordHeader
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `contentType` | `u8` | 🔓 public |  |
| `version` | `u16` | 🔓 public |  |
| `length` | `u16` | 🔓 public |  |

---

### <a id="TlsPlaintext"></a>`TlsPlaintext` `🔓 export`

> 📄 `record.vx` L54-58

```vex
export struct TlsPlaintext
```

Metadata recovered from an authenticated TLSInnerPlaintext.

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `length` | `u64` | 🔓 public |  |
| `contentType` | `u8` | 🔓 public |  |

---

### <a id="TlsCipherState"></a>`TlsCipherState` `🔓 export`

> 📄 `record.vx` L86-92

```vex
export struct TlsCipherState
```

Owning, move-only per-direction TLS 1.3 record state.

Key material and the sequence number are deliberately private. Exposing a
writable sequence would let application code reuse a nonce with the same
traffic key, which is catastrophic for every supported AEAD.

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `cipherId` | `u16` | 🔒 private |  |
| `key` | `[u8; 32]` | 🔒 private |  |
| `keyLen` | `usize` | 🔒 private |  |
| `iv` | `[u8; 12]` | 🔒 private |  |
| `seq` | `u64` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `TlsCipherState.new`[↗](#TlsCipherState.new) | `export fn TlsCipherState.new(cipherId: u16, key: S` |  |
| `sequence`[↗](#TlsCipherState.sequence) | `export fn (self: &amp;TlsCipherState) sequence(): u64` |  |
| `validateRekeyMaterial`[↗](#TlsCipherState.validateRekeyMaterial) | `fn (self: &amp;TlsCipherState) validateRekeyMaterial(k` | Atomically installs the next key generation for this direction. |
| `commitRekey`[↗](#TlsCipherState.commitRekey) | `fn (self: &amp;TlsCipherState!) commitRekey(key: Span&lt;` |  |
| `rekey`[↗](#TlsCipherState.rekey) | `export fn (self: &amp;TlsCipherState!) rekey(key: Span` |  |
| `retire`[↗](#TlsCipherState.retire) | `export fn (self: &amp;TlsCipherState!) retire()` | Irreversibly erases this direction's traffic key and IV. Transport owners |
| `drop`[↗](#TlsCipherState.drop) | `export fn (self: &amp;TlsCipherState!) drop()` |  |
| `keyBuf`[↗](#TlsCipherState.keyBuf) | `fn (self: &amp;TlsCipherState) keyBuf(): RawBuf` |  |
| `ivBuf`[↗](#TlsCipherState.ivBuf) | `fn (self: &amp;TlsCipherState) ivBuf(): RawBuf` |  |
| `encryptRecord`[↗](#TlsCipherState.encryptRecord) | `export fn (self: &amp;TlsCipherState!) encryptRecord(c` |  |
| `encryptRecordThenRekey`[↗](#TlsCipherState.encryptRecordThenRekey) | `export fn (self: &amp;TlsCipherState!) encryptRecordTh` | Encrypts one record under the current generation and atomically installs |
| `decryptRecord`[↗](#TlsCipherState.decryptRecord) | `export fn (self: &amp;TlsCipherState!) decryptRecord(r` |  |

---

### <a id="TlsDnsIdentityError"></a>`TlsDnsIdentityError` `🔓 export`

> 📄 `hostname.vx` L10-14

```vex
export struct TlsDnsIdentityError
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `kind` | `TlsDnsIdentityErrorKind` | 🔓 public |  |
| `offset` | `usize` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `isKind`[↗](#TlsDnsIdentityError.isKind) | `export fn (self: &amp;TlsDnsIdentityError) isKind(kind` |  |

---

### <a id="TlsDnsIdentity"></a>`TlsDnsIdentity` `🔓 export`

> 📄 `hostname.vx` L25-25

```vex
export struct TlsDnsIdentity
```

Strict service-identity matcher. This API compares a DNS reference name

only with an X.509 subjectAltName dNSName. It deliberately has no common
name fallback and does not reinterpret IP literals as DNS names.

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `TlsDnsIdentity.matches`[↗](#TlsDnsIdentity.matches) | `export fn TlsDnsIdentity.matches(reference: str, p` | Matches a caller reference hostname against the raw bytes of one dNSName |

---

### <a id="TlsX25519Negotiation"></a>`TlsX25519Negotiation` `🔓 export`

> 📄 `negotiation.vx` L157-194

```vex
export struct TlsX25519Negotiation
```

Move-only owner for the authenticated no-PSK TLS 1.3 client handshake.

Hello negotiation is also usable in server role, while the monotonic server
authentication flight is client-only. Transcript, key schedule, offered
capabilities and Finished traffic secrets have one lifetime and one state
authority; borrowed wire views never escape a call.

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `roleValue` | `TlsHandshakeRole` | 🔒 private |  |
| `stageValue` | `TlsX25519NegotiationStage` | 🔒 private |  |
| `transcriptValue` | `TlsTranscript` | 🔒 private |  |
| `schedule256` | `TlsSecretSchedule` | 🔒 private |  |
| `schedule384` | `TlsSecretSchedule` | 🔒 private |  |
| `localPrivate` | `[u8; 32]` | 🔒 private |  |
| `localPublic` | `[u8; 32]` | 🔒 private |  |
| `peerPublic` | `[u8; 32]` | 🔒 private |  |
| `peerReady` | `bool` | 🔒 private |  |
| `sessionId` | `[u8; 32]` | 🔒 private |  |
| `sessionLen` | `usize` | 🔒 private |  |
| `offeredAes128` | `bool` | 🔒 private |  |
| `offeredAes256` | `bool` | 🔒 private |  |
| `offeredChaCha` | `bool` | 🔒 private |  |
| `offeredEd25519` | `bool` | 🔒 private |  |
| `offeredExtensions` | `[u16; 64]` | 🔒 private |  |
| `offeredExtensionCount` | `usize` | 🔒 private |  |
| `offeredAlpn` | `Vec&lt;u8&gt;` | 🔒 private |  |
| `selectedAlpn` | `Vec&lt;u8&gt;` | 🔒 private |  |
| `clientHandshakeTraffic` | `[u8; 48]` | 🔒 private |  |
| `serverHandshakeTraffic` | `[u8; 48]` | 🔒 private |  |
| `handshakeTrafficReady` | `bool` | 🔒 private |  |
| `serverCertificatePublicKey` | `[u8; 32]` | 🔒 private |  |
| `serverCertificateKeyReady` | `bool` | 🔒 private |  |
| `selectedCipherValue` | `u16` | 🔒 private |  |
| `selectedHashValue` | `TlsHashAlgorithm` | 🔒 private |  |
| `selected` | `bool` | 🔒 private |  |
| `clientHelloInvariant` | `[u8; 32]` | 🔒 private |  |
| `clientHelloInvariantReady` | `bool` | 🔒 private |  |
| `initialKeyShareOffered` | `bool` | 🔒 private |  |
| `initialKeyShareLen` | `usize` | 🔒 private |  |
| `initialKeyShareDigest` | `[u8; 32]` | 🔒 private |  |
| `retryKeyShareRequested` | `bool` | 🔒 private |  |
| `retryCookiePresent` | `bool` | 🔒 private |  |
| `retryCookieLen` | `usize` | 🔒 private |  |
| `retryCookieDigest` | `[u8; 32]` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `TlsX25519Negotiation.new`[↗](#TlsX25519Negotiation.new) | `export fn TlsX25519Negotiation.new(role: TlsHandsh` | Creates a role-bound no-PSK negotiation owner, copies the exact 32-byte |
| `TlsX25519Negotiation.withDefaultLimit`[↗](#TlsX25519Negotiation.withDefaultLimit) | `export fn TlsX25519Negotiation.withDefaultLimit(ro` | Creates a negotiation owner with `TLS_DEFAULT_TRANSCRIPT_LIMIT`. |
| `role`[↗](#TlsX25519Negotiation.role) | `export fn (self: &amp;TlsX25519Negotiation) role(): Tl` | Returns the immutable endpoint role. |
| `stage`[↗](#TlsX25519Negotiation.stage) | `export fn (self: &amp;TlsX25519Negotiation) stage(): T` | Returns the monotonic negotiation stage. |
| `transcript`[↗](#TlsX25519Negotiation.transcript) | `export fn (self: &amp;TlsX25519Negotiation) transcript` | Borrows the transcript for read-only accounting or digest snapshots. |
| `selectedCipher`[↗](#TlsX25519Negotiation.selectedCipher) | `export fn (self: &amp;TlsX25519Negotiation) selectedCi` | Returns the selected suite after successful normal ServerHello processing. |
| `selectedHash`[↗](#TlsX25519Negotiation.selectedHash) | `export fn (self: &amp;TlsX25519Negotiation) selectedHa` | Returns the suite-authoritative hash after successful negotiation. |
| `publicKeyTo`[↗](#TlsX25519Negotiation.publicKeyTo) | `export fn (self: &amp;TlsX25519Negotiation) publicKeyT` | Copies the non-secret local public key into an exact 32-byte destination. |
| `commitClientHello`[↗](#TlsX25519Negotiation.commitClientHello) | `export fn (self: &amp;TlsX25519Negotiation!) commitCli` | Validates and commits the exact ClientHello that entered the transcript. |
| `commitRetryClientHello`[↗](#TlsX25519Negotiation.commitRetryClientHello) | `export fn (self: &amp;TlsX25519Negotiation!) commitRet` | Validates and commits ClientHello2 after one authenticated |
| `cipherWasOffered`[↗](#TlsX25519Negotiation.cipherWasOffered) | `fn (self: &amp;TlsX25519Negotiation) cipherWasOffered(` |  |
| `acceptServerHello`[↗](#TlsX25519Negotiation.acceptServerHello) | `export fn (self: &amp;TlsX25519Negotiation!) acceptSer` | Validates normal ServerHello, computes the contributory X25519 secret, and |
| `extensionWasOffered`[↗](#TlsX25519Negotiation.extensionWasOffered) | `fn (self: &amp;TlsX25519Negotiation) extensionWasOffer` |  |
| `alpnWasOffered`[↗](#TlsX25519Negotiation.alpnWasOffered) | `fn (self: &amp;TlsX25519Negotiation) alpnWasOffered(se` |  |
| `validateEncryptedExtensions`[↗](#TlsX25519Negotiation.validateEncryptedExtensions) | `fn (self: &amp;TlsX25519Negotiation) validateEncrypted` |  |
| `acceptEncryptedExtensions`[↗](#TlsX25519Negotiation.acceptEncryptedExtensions) | `export fn (self: &amp;TlsX25519Negotiation!) acceptEnc` | Validates and commits the server EncryptedExtensions flight. The current |
| `selectedAlpnLen`[↗](#TlsX25519Negotiation.selectedAlpnLen) | `export fn (self: &amp;TlsX25519Negotiation) selectedAl` | Returns the authenticated server ALPN selection length after server |
| `selectedAlpnTo`[↗](#TlsX25519Negotiation.selectedAlpnTo) | `export fn (self: &amp;TlsX25519Negotiation) selectedAl` | Copies the authenticated ALPN selection to caller storage. |
| `acceptServerCertificate`[↗](#TlsX25519Negotiation.acceptServerCertificate) | `export fn (self: &amp;TlsX25519Negotiation!) acceptSer` | Validates the server Certificate list against an explicit trust anchor, |
| `acceptServerCertificateVerify`[↗](#TlsX25519Negotiation.acceptServerCertificateVerify) | `export fn (self: &amp;TlsX25519Negotiation!) acceptSer` | Verifies and commits server CertificateVerify only when Ed25519 was offered |
| `failAuthenticatedFlight`[↗](#TlsX25519Negotiation.failAuthenticatedFlight) | `fn (self: &amp;TlsX25519Negotiation!) failAuthenticate` |  |
| `acceptServerFinished`[↗](#TlsX25519Negotiation.acceptServerFinished) | `export fn (self: &amp;TlsX25519Negotiation!) acceptSer` | Constant-time verifies and commits the peer Finished, then derives |
| `writeClientFinished`[↗](#TlsX25519Negotiation.writeClientFinished) | `export fn (self: &amp;TlsX25519Negotiation!) writeClie` | Emits and commits the client's Finished message. Application traffic was |
| `drop`[↗](#TlsX25519Negotiation.drop) | `export fn (self: &amp;TlsX25519Negotiation!) drop()` |  |

---

### <a id="TlsEncryptedExtensionsCandidate"></a>`TlsEncryptedExtensionsCandidate`

> 📄 `negotiation.vx` L1145-1148

```vex
struct TlsEncryptedExtensionsCandidate
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `selectedAlpnOffset` | `usize` | 🔒 private |  |
| `selectedAlpnLen` | `usize` | 🔒 private |  |

---

### <a id="TlsAlert"></a>`TlsAlert` `🔓 export`

> 📄 `alert.vx` L42-46

```vex
export struct TlsAlert
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `level` | `TlsAlertLevel` | 🔓 public |  |
| `description` | `TlsAlertDescription` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `TlsAlert.closeNotify`[↗](#TlsAlert.closeNotify) | `export fn TlsAlert.closeNotify(): TlsAlert` |  |
| `TlsAlert.userCanceled`[↗](#TlsAlert.userCanceled) | `export fn TlsAlert.userCanceled(): TlsAlert` |  |
| `TlsAlert.fatal`[↗](#TlsAlert.fatal) | `export fn TlsAlert.fatal(description: TlsAlertDesc` |  |
| `isCloseNotify`[↗](#TlsAlert.isCloseNotify) | `export fn (self: &amp;TlsAlert) isCloseNotify(): bool` |  |
| `isUserCanceled`[↗](#TlsAlert.isUserCanceled) | `export fn (self: &amp;TlsAlert) isUserCanceled(): bool` |  |
| `isFatal`[↗](#TlsAlert.isFatal) | `export fn (self: &amp;TlsAlert) isFatal(): bool` | Effective TLS 1.3 severity. A peer that incorrectly labels an error alert |

---

### <a id="TlsWireSlice"></a>`TlsWireSlice` `🔓 export`

> 📄 `hello.vx` L63-68

```vex
export struct TlsWireSlice
```

Offset/length pair into the complete encoded Handshake message. No pointer

escapes the input lifetime; callers resolve the view against the same
encoded span when needed.

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `present` | `bool` | 🔓 public |  |
| `offset` | `usize` | 🔓 public |  |
| `length` | `usize` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `resolve`[↗](#TlsWireSlice.resolve) | `export fn (self: &amp;TlsWireSlice) resolve(encoded: S` |  |

---

### <a id="TlsHelloExtensions"></a>`TlsHelloExtensions` `🔓 export`

> 📄 `hello.vx` L90-103

```vex
export struct TlsHelloExtensions
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `count` | `usize` | 🔓 public |  |
| `encodedBlock` | `TlsWireSlice` | 🔓 public |  |
| `supportedVersions` | `TlsWireSlice` | 🔓 public |  |
| `supportedGroups` | `TlsWireSlice` | 🔓 public |  |
| `signatureAlgorithms` | `TlsWireSlice` | 🔓 public |  |
| `keyShare` | `TlsWireSlice` | 🔓 public |  |
| `serverName` | `TlsWireSlice` | 🔓 public |  |
| `alpn` | `TlsWireSlice` | 🔓 public |  |
| `preSharedKey` | `TlsWireSlice` | 🔓 public |  |
| `pskKeyExchangeModes` | `TlsWireSlice` | 🔓 public |  |
| `cookie` | `TlsWireSlice` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `entryAt`[↗](#TlsHelloExtensions.entryAt) | `export fn (self: &amp;TlsHelloExtensions) entryAt(enco` | Resolves an extension by stable wire order. Unknown extension identities |
| `find`[↗](#TlsHelloExtensions.find) | `export fn (self: &amp;TlsHelloExtensions) find(encoded` |  |

---

### <a id="TlsExtensionEntry"></a>`TlsExtensionEntry` `🔓 export`

> 📄 `hello.vx` L121-125

```vex
export struct TlsExtensionEntry
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `extensionType` | `u16` | 🔓 public |  |
| `data` | `TlsWireSlice` | 🔓 public |  |

---

### <a id="TlsKeyShareEntry"></a>`TlsKeyShareEntry` `🔓 export`

> 📄 `hello.vx` L127-131

```vex
export struct TlsKeyShareEntry
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `group` | `u16` | 🔓 public |  |
| `keyExchange` | `TlsWireSlice` | 🔓 public |  |

---

### <a id="TlsClientHelloView"></a>`TlsClientHelloView` `🔓 export`

> 📄 `hello.vx` L193-201

```vex
export struct TlsClientHelloView
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `encodedLen` | `usize` | 🔓 public |  |
| `random` | `[u8; 32]` | 🔓 public |  |
| `sessionId` | `TlsWireSlice` | 🔓 public |  |
| `cipherSuites` | `TlsWireSlice` | 🔓 public |  |
| `cipherSuiteCount` | `usize` | 🔓 public |  |
| `extensions` | `TlsHelloExtensions` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `cipherSuiteAt`[↗](#TlsClientHelloView.cipherSuiteAt) | `export fn (self: &amp;TlsClientHelloView) cipherSuiteA` |  |
| `signatureSchemeCount`[↗](#TlsClientHelloView.signatureSchemeCount) | `export fn (self: &amp;TlsClientHelloView) signatureSch` | Returns the number of structurally validated signature schemes advertised |
| `signatureSchemeAt`[↗](#TlsClientHelloView.signatureSchemeAt) | `export fn (self: &amp;TlsClientHelloView) signatureSch` | Resolves one advertised signature scheme by wire order. Bounds and backing |
| `supportsGroup`[↗](#TlsClientHelloView.supportsGroup) | `export fn (self: &amp;TlsClientHelloView) supportsGrou` | Reports whether the structurally validated `supported_groups` vector |
| `keyShareAt`[↗](#TlsClientHelloView.keyShareAt) | `export fn (self: &amp;TlsClientHelloView) keyShareAt(e` | Resolves one validated ClientHello KeyShareEntry by wire order. |
| `findKeyShare`[↗](#TlsClientHelloView.findKeyShare) | `export fn (self: &amp;TlsClientHelloView) findKeyShare` |  |

---

### <a id="TlsServerHelloView"></a>`TlsServerHelloView` `🔓 export`

> 📄 `hello.vx` L339-347

```vex
export struct TlsServerHelloView
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `encodedLen` | `usize` | 🔓 public |  |
| `random` | `[u8; 32]` | 🔓 public |  |
| `sessionId` | `TlsWireSlice` | 🔓 public |  |
| `cipherSuite` | `u16` | 🔓 public |  |
| `helloRetryRequest` | `bool` | 🔓 public |  |
| `extensions` | `TlsHelloExtensions` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `selectedKeyShare`[↗](#TlsServerHelloView.selectedKeyShare) | `export fn (self: &amp;TlsServerHelloView) selectedKeyS` | Resolves the sole normal ServerHello KeyShareEntry. HelloRetryRequest has |

---

### <a id="TlsTrafficKeyLengths"></a>`TlsTrafficKeyLengths` `🔓 export`

> 📄 `handshake.vx` L56-60

```vex
export struct TlsTrafficKeyLengths
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `key` | `usize` | 🔓 public |  |
| `iv` | `usize` | 🔓 public |  |

---

### <a id="TlsHandshakeHeader"></a>`TlsHandshakeHeader` `🔓 export`

> 📄 `transcript.vx` L38-42

```vex
export struct TlsHandshakeHeader
```

The exact four-byte TLS Handshake header: one-byte type and uint24 body

length. Record-layer headers are intentionally outside this type.

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `messageType` | `u8` | 🔓 public |  |
| `bodyLen` | `usize` | 🔓 public |  |

---

### <a id="TlsTranscript"></a>`TlsTranscript` `🔓 export`

> 📄 `transcript.vx` L90-104

```vex
export struct TlsTranscript
```

Streaming, allocation-free TLS 1.3 transcript state.

`acceptedBytes` is a monotonic resource-accounting counter and is never
reduced by HelloRetryRequest rewriting. `hashedBytes` reports the effective
transcript size after the RFC 8446 synthetic `message_hash` replacement.

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `hash` | `TlsHashAlgorithm` | 🔒 private |  |
| `hashSelected` | `bool` | 🔒 private |  |
| `sha256Available` | `bool` | 🔒 private |  |
| `sha384Available` | `bool` | 🔒 private |  |
| `sha256` | `Sha256` | 🔒 private |  |
| `sha384` | `Sha384` | 🔒 private |  |
| `byteLimit` | `usize` | 🔒 private |  |
| `acceptedBytes` | `usize` | 🔒 private |  |
| `hashedBytes` | `usize` | 🔒 private |  |
| `messageCount` | `usize` | 🔒 private |  |
| `firstMessageType` | `u8` | 🔒 private |  |
| `lastMessageType` | `u8` | 🔒 private |  |
| `retryRewritten` | `bool` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `TlsTranscript.new`[↗](#TlsTranscript.new) | `export fn TlsTranscript.new(byteLimit: usize): Res` | Constructs a dual SHA-256/SHA-384 transcript with an explicit resource |
| `TlsTranscript.newForHash`[↗](#TlsTranscript.newForHash) | `export fn TlsTranscript.newForHash(hash: TlsHashAl` | Constructs a transcript whose cipher-suite hash is already known. |
| `TlsTranscript.withDefaultLimit`[↗](#TlsTranscript.withDefaultLimit) | `export fn TlsTranscript.withDefaultLimit(): TlsTra` | Constructs a dual transcript with the 16 MiB default input budget. |
| `TlsTranscript.withDefaultHash`[↗](#TlsTranscript.withDefaultHash) | `export fn TlsTranscript.withDefaultHash(hash: TlsH` | Constructs a selected-hash transcript with the 16 MiB default budget. |
| `selectedHash`[↗](#TlsTranscript.selectedHash) | `export fn (self: &amp;TlsTranscript) selectedHash(): O` | Returns the committed suite hash, or `None` while both candidates are live. |
| `limit`[↗](#TlsTranscript.limit) | `export fn (self: &amp;TlsTranscript) limit(): usize` | Returns the immutable accepted-input byte budget. |
| `acceptedLen`[↗](#TlsTranscript.acceptedLen) | `export fn (self: &amp;TlsTranscript) acceptedLen(): us` | Returns bytes accepted from complete peer/local Handshake messages. |
| `hashedLen`[↗](#TlsTranscript.hashedLen) | `export fn (self: &amp;TlsTranscript) hashedLen(): usiz` | Returns the effective bytes represented by the running hash state. |
| `messages`[↗](#TlsTranscript.messages) | `export fn (self: &amp;TlsTranscript) messages(): usize` | Returns the number of effective messages in the running transcript. |
| `lastMessage`[↗](#TlsTranscript.lastMessage) | `export fn (self: &amp;TlsTranscript) lastMessage(): Op` | Returns the most recently committed Handshake type. An empty transcript |
| `didRewriteHelloRetry`[↗](#TlsTranscript.didRewriteHelloRetry) | `export fn (self: &amp;TlsTranscript) didRewriteHelloRe` | Reports whether the ClientHello1 synthetic-hash rewrite was committed. |
| `drop`[↗](#TlsTranscript.drop) | `export fn (self: &amp;TlsTranscript!) drop()` |  |
| `absorbRaw`[↗](#TlsTranscript.absorbRaw) | `fn (self: &amp;TlsTranscript!) absorbRaw(input: RawBuf` |  |
| `selectHash`[↗](#TlsTranscript.selectHash) | `export fn (self: &amp;TlsTranscript!) selectHash(hash:` | Commits the cipher-suite hash. Re-selecting the same hash is idempotent; |
| `validateAppend`[↗](#TlsTranscript.validateAppend) | `fn (self: &amp;TlsTranscript) validateAppend(messageTy` |  |
| `commitMessage`[↗](#TlsTranscript.commitMessage) | `fn (self: &amp;TlsTranscript!) commitMessage(messageTy` |  |
| `appendEncoded`[↗](#TlsTranscript.appendEncoded) | `export fn (self: &amp;TlsTranscript!) appendEncoded(en` | Validates and appends one complete encoded TLS Handshake message. The |
| `appendMessage`[↗](#TlsTranscript.appendMessage) | `export fn (self: &amp;TlsTranscript!) appendMessage(me` | Appends a body while generating the authenticated handshake header. This |
| `digestTo`[↗](#TlsTranscript.digestTo) | `export fn (self: &amp;TlsTranscript) digestTo(output: ` | Writes the current transcript hash without finalizing the running state. |
| `digestFor`[↗](#TlsTranscript.digestFor) | `export fn (self: &amp;TlsTranscript) digestFor(hash: T` | Snapshots either candidate hash before cipher-suite selection. After |
| `rewriteForHelloRetryRequest`[↗](#TlsTranscript.rewriteForHelloRetryRequest) | `export fn (self: &amp;TlsTranscript!) rewriteForHelloR` | Applies RFC 8446 section 4.4.1's HelloRetryRequest rewrite. |

---

### <a id="TlsCertificateEntryView"></a>`TlsCertificateEntryView` `🔓 export`

> 📄 `certificate.vx` L86-91

```vex
export struct TlsCertificateEntryView
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `certificate` | `TlsWireSlice` | 🔓 public |  |
| `extensions` | `TlsWireSlice` | 🔓 public |  |
| `extensionCount` | `usize` | 🔓 public |  |

---

### <a id="TlsCertificateMessageView"></a>`TlsCertificateMessageView` `🔓 export`

> 📄 `certificate.vx` L93-97

```vex
export struct TlsCertificateMessageView
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `certificateList` | `TlsWireSlice` | 🔓 public |  |
| `certificateCount` | `usize` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `entryAt`[↗](#TlsCertificateMessageView.entryAt) | `export fn (self: &amp;TlsCertificateMessageView) entry` |  |

---

### <a id="TlsCertificateVerifyView"></a>`TlsCertificateVerifyView` `🔓 export`

> 📄 `certificate.vx` L221-225

```vex
export struct TlsCertificateVerifyView
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `algorithm` | `u16` | 🔓 public |  |
| `signature` | `TlsWireSlice` | 🔓 public |  |

---

### <a id="TlsTransportEvent"></a>`TlsTransportEvent` `🔓 export`

> 📄 `transport.vx` L44-50

```vex
export struct TlsTransportEvent
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `kind` | `TlsTransportEventKind` | 🔓 public |  |
| `length` | `usize` | 🔓 public |  |
| `alert` | `Option&lt;TlsAlert&gt;` | 🔓 public |  |
| `keyUpdate` | `Option&lt;TlsKeyUpdateRequest&gt;` | 🔓 public |  |

---

### <a id="TlsTransportError"></a>`TlsTransportError` `🔓 export`

> 📄 `transport.vx` L65-72

```vex
export struct TlsTransportError
```

Typed transport failure with the exact lower-layer cause retained when one

exists. Caller-capacity/overlap mistakes remain retryable; authenticated
wire failures retire both traffic directions.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `kind` | `TlsTransportErrorKind` | 🔓 public |  |
| `recordCause` | `Option&lt;TlsRecordError&gt;` | 🔓 public |  |
| `alertCause` | `Option&lt;TlsAlertError&gt;` | 🔓 public |  |
| `scheduleCause` | `Option&lt;TlsKeyScheduleError&gt;` | 🔓 public |  |
| `keyUpdateCause` | `Option&lt;TlsKeyUpdateError&gt;` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `isKind`[↗](#TlsTransportError.isKind) | `export fn (self: &amp;TlsTransportError) isKind(kind: ` |  |

---

### <a id="TlsApplicationTraffic"></a>`TlsApplicationTraffic` `🔓 export`

> 📄 `transport.vx` L158-176

```vex
export struct TlsApplicationTraffic
```

Owns exactly one protected send direction and one protected receive

direction after generation-0 application traffic secrets exist.
The constructor derives keys directly into bounded stack candidates,
transfers them into move-only cipher states, then erases every candidate.
Callers pass directional secrets explicitly: `sendSecret` is always local
output and `receiveSecret` is always peer output, independent of role.

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `send` | `TlsCipherState` | 🔒 private |  |
| `receive` | `TlsCipherState` | 🔒 private |  |
| `cipherId` | `u16` | 🔒 private |  |
| `hash` | `TlsHashAlgorithm` | 🔒 private |  |
| `digestLen` | `usize` | 🔒 private |  |
| `sendSecret` | `[u8; 48]` | 🔒 private |  |
| `receiveSecret` | `[u8; 48]` | 🔒 private |  |
| `sendGeneration` | `u64` | 🔒 private |  |
| `receiveGeneration` | `u64` | 🔒 private |  |
| `keyUpdateResponsePending` | `bool` | 🔒 private |  |
| `postHandshake` | `[u8; 5]` | 🔒 private |  |
| `postHandshakeLen` | `usize` | 🔒 private |  |
| `localClosed` | `bool` | 🔒 private |  |
| `peerClosed` | `bool` | 🔒 private |  |
| `peerCanceled` | `bool` | 🔒 private |  |
| `localCanceled` | `bool` | 🔒 private |  |
| `failed` | `bool` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `TlsApplicationTraffic.new`[↗](#TlsApplicationTraffic.new) | `export fn TlsApplicationTraffic.new(cipherId: u16,` |  |
| `state`[↗](#TlsApplicationTraffic.state) | `export fn (self: &amp;TlsApplicationTraffic) state(): ` |  |
| `sendSequence`[↗](#TlsApplicationTraffic.sendSequence) | `export fn (self: &amp;TlsApplicationTraffic) sendSeque` |  |
| `receiveSequence`[↗](#TlsApplicationTraffic.receiveSequence) | `export fn (self: &amp;TlsApplicationTraffic) receiveSe` |  |
| `sendGeneration`[↗](#TlsApplicationTraffic.sendGeneration) | `export fn (self: &amp;TlsApplicationTraffic) sendGener` |  |
| `receiveGeneration`[↗](#TlsApplicationTraffic.receiveGeneration) | `export fn (self: &amp;TlsApplicationTraffic) receiveGe` |  |
| `keyUpdateResponseRequired`[↗](#TlsApplicationTraffic.keyUpdateResponseRequired) | `export fn (self: &amp;TlsApplicationTraffic) keyUpdate` |  |
| `retireSendDirection`[↗](#TlsApplicationTraffic.retireSendDirection) | `fn (self: &amp;TlsApplicationTraffic!) retireSendDirec` |  |
| `retireReceiveDirection`[↗](#TlsApplicationTraffic.retireReceiveDirection) | `fn (self: &amp;TlsApplicationTraffic!) retireReceiveDi` |  |
| `retireFailed`[↗](#TlsApplicationTraffic.retireFailed) | `fn (self: &amp;TlsApplicationTraffic!) retireFailed()` |  |
| `encryptApplicationData`[↗](#TlsApplicationTraffic.encryptApplicationData) | `export fn (self: &amp;TlsApplicationTraffic!) encryptA` |  |
| `writeKeyUpdate`[↗](#TlsApplicationTraffic.writeKeyUpdate) | `export fn (self: &amp;TlsApplicationTraffic!) writeKey` | Sends a complete KeyUpdate under the current send generation and commits |
| `writeAlertPayload`[↗](#TlsApplicationTraffic.writeAlertPayload) | `fn (self: &amp;TlsApplicationTraffic!) writeAlertPaylo` |  |
| `writeUserCanceled`[↗](#TlsApplicationTraffic.writeUserCanceled) | `export fn (self: &amp;TlsApplicationTraffic!) writeUse` | Sends the TLS 1.3 user_canceled warning once without retiring the send key. |
| `writeCloseNotify`[↗](#TlsApplicationTraffic.writeCloseNotify) | `export fn (self: &amp;TlsApplicationTraffic!) writeClo` | Encrypts close_notify exactly once, then erases the send-direction key. |
| `writeFatalAlert`[↗](#TlsApplicationTraffic.writeFatalAlert) | `export fn (self: &amp;TlsApplicationTraffic!) writeFat` | Emits one fatal alert and immediately retires both directions after the |
| `readKeyUpdateFragment`[↗](#TlsApplicationTraffic.readKeyUpdateFragment) | `fn (self: &amp;TlsApplicationTraffic!) readKeyUpdateFr` |  |
| `readRecord`[↗](#TlsApplicationTraffic.readRecord) | `export fn (self: &amp;TlsApplicationTraffic!) readReco` | Authenticates and classifies one protected application-phase record. |
| `drop`[↗](#TlsApplicationTraffic.drop) | `export fn (self: &amp;TlsApplicationTraffic!) drop()` |  |

---

### <a id="TlsNextTrafficGeneration"></a>`TlsNextTrafficGeneration`

> 📄 `transport.vx` L313-318

```vex
struct TlsNextTrafficGeneration
```

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `secret` | `[u8; 48]` | 🔒 private |  |
| `key` | `[u8; 32]` | 🔒 private |  |
| `iv` | `[u8; 12]` | 🔒 private |  |
| `keyLen` | `usize` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `drop`[↗](#TlsNextTrafficGeneration.drop) | `fn (self: &amp;TlsNextTrafficGeneration!) drop()` |  |

---

### <a id="X509Error"></a>`X509Error` `🔓 export`

> 📄 `x509.vx` L46-50

```vex
export struct X509Error
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `kind` | `X509ErrorKind` | 🔓 public |  |
| `offset` | `usize` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `isKind`[↗](#X509Error.isKind) | `export fn (self: &amp;X509Error) isKind(kind: X509Erro` |  |

---

### <a id="X509CertificateView"></a>`X509CertificateView` `🔓 export`

> 📄 `x509.vx` L131-141

```vex
export struct X509CertificateView
```

Allocation-free certificate view. The caller retains the DER bytes for the

complete lifetime of this value and passes the same span to every method.

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `certificate` | `DerSlice` | 🔒 private |  |
| `tbsCertificate` | `DerSlice` | 🔒 private |  |
| `signature` | `DerSlice` | 🔒 private |  |
| `publicKey` | `DerSlice` | 🔒 private |  |
| `issuer` | `DerSlice` | 🔒 private |  |
| `validity` | `DerSlice` | 🔒 private |  |
| `subject` | `DerSlice` | 🔒 private |  |
| `extensions` | `DerSlice` | 🔒 private |  |
| `hasExtensions` | `bool` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `X509CertificateView.parse`[↗](#X509CertificateView.parse) | `export fn X509CertificateView.parse(input: Span&lt;u8` | Parses the structural certificate envelope and admits only RFC 8410 |
| `publicKeyBytes`[↗](#X509CertificateView.publicKeyBytes) | `export fn (self: &amp;X509CertificateView) publicKeyBy` |  |
| `verifySignatureWith`[↗](#X509CertificateView.verifySignatureWith) | `export fn (self: &amp;X509CertificateView) verifySigna` | Verifies this certificate signature with the issuer's Ed25519 SPKI. Chain |
| `validityRange`[↗](#X509CertificateView.validityRange) | `export fn (self: &amp;X509CertificateView) validityRan` |  |
| `validateAt`[↗](#X509CertificateView.validateAt) | `export fn (self: &amp;X509CertificateView) validateAt(` |  |
| `dnsNameCount`[↗](#X509CertificateView.dnsNameCount) | `export fn (self: &amp;X509CertificateView) dnsNameCoun` |  |
| `dnsNameAt`[↗](#X509CertificateView.dnsNameAt) | `export fn (self: &amp;X509CertificateView) dnsNameAt(i` |  |
| `matchesDnsName`[↗](#X509CertificateView.matchesDnsName) | `export fn (self: &amp;X509CertificateView) matchesDnsN` | Checks every SAN dNSName. Invalid presented identities fail closed instead |

---

### <a id="X509ExtensionView"></a>`X509ExtensionView`

> 📄 `x509.vx` L528-532

```vex
struct X509ExtensionView
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `oid` | `DerElement` | 🔒 private |  |
| `value` | `DerElement` | 🔒 private |  |
| `critical` | `bool` | 🔒 private |  |

---

### <a id="X509ExtensionPolicy"></a>`X509ExtensionPolicy`

> 📄 `x509.vx` L600-613

```vex
struct X509ExtensionPolicy
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `hasBasicConstraints` | `bool` | 🔒 private |  |
| `basicConstraintsCritical` | `bool` | 🔒 private |  |
| `certificateAuthority` | `bool` | 🔒 private |  |
| `hasPathLength` | `bool` | 🔒 private |  |
| `pathLength` | `usize` | 🔒 private |  |
| `hasKeyUsage` | `bool` | 🔒 private |  |
| `digitalSignature` | `bool` | 🔒 private |  |
| `certificateSign` | `bool` | 🔒 private |  |
| `hasExtendedKeyUsage` | `bool` | 🔒 private |  |
| `serverAuth` | `bool` | 🔒 private |  |
| `hasSubjectAltName` | `bool` | 🔒 private |  |
| `subjectAltNameCritical` | `bool` | 🔒 private |  |

---

### <a id="X509TlsServerVerifier"></a>`X509TlsServerVerifier` `🔓 export`

> 📄 `x509.vx` L1000-1000

```vex
export struct X509TlsServerVerifier
```

Bounded TLS server-certificate verifier for the currently supported

Ed25519 profile. Intermediates are presented in leaf-to-anchor order and
the explicit trust anchor is not included in `intermediateInputs`.
Validation is allocation-free and never consults an OS/libc root store.

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `X509TlsServerVerifier.verifyChain`[↗](#X509TlsServerVerifier.verifyChain) | `export fn X509TlsServerVerifier.verifyChain(leafIn` |  |
| `X509TlsServerVerifier.verifyDirect`[↗](#X509TlsServerVerifier.verifyDirect) | `export fn X509TlsServerVerifier.verifyDirect(leafI` | Convenience path for a leaf signed directly by the explicit trust anchor. |

---

### <a id="TlsSecretSchedule"></a>`TlsSecretSchedule` `🔓 export`

> 📄 `key_schedule.vx` L131-135

```vex
export struct TlsSecretSchedule
```

Move-only owner of the current raw secret on the left side of RFC 8446's

key-schedule diagram. Only ordered Early -&gt; Handshake -&gt; Master transitions
are exposed. Working secrets are erased on every transition and on Drop.

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `hash` | `TlsHashAlgorithm` | 🔒 private |  |
| `stage` | `TlsSecretStage` | 🔒 private |  |
| `secret` | `[u8; 48]` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `TlsSecretSchedule.new`[↗](#TlsSecretSchedule.new) | `export fn TlsSecretSchedule.new(hash: TlsHashAlgor` | Starts the schedule at Early Secret. An empty PSK means the RFC 8446 |
| `stage`[↗](#TlsSecretSchedule.stage) | `export fn (self: &amp;TlsSecretSchedule) stage(): TlsS` |  |
| `hashAlgorithm`[↗](#TlsSecretSchedule.hashAlgorithm) | `export fn (self: &amp;TlsSecretSchedule) hashAlgorithm` |  |
| `drop`[↗](#TlsSecretSchedule.drop) | `export fn (self: &amp;TlsSecretSchedule!) drop()` |  |
| `retire`[↗](#TlsSecretSchedule.retire) | `export fn (self: &amp;TlsSecretSchedule!) retire()` | Irreversibly erases a candidate schedule that negotiation did not select. |
| `deriveHandshakeTraffic`[↗](#TlsSecretSchedule.deriveHandshakeTraffic) | `export fn (self: &amp;TlsSecretSchedule!) deriveHandsh` | Commits Early -&gt; Handshake and writes client/server handshake traffic |
| `deriveApplicationTraffic`[↗](#TlsSecretSchedule.deriveApplicationTraffic) | `export fn (self: &amp;TlsSecretSchedule!) deriveApplic` | Commits Handshake -&gt; Master and writes generation-0 application traffic |

---

### <a id="TlsHandshakeFeedResult"></a>`TlsHandshakeFeedResult` `🔓 export`

> 📄 `assembler.vx` L39-46

```vex
export struct TlsHandshakeFeedResult
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `kind` | `TlsHandshakeFeedKind` | 🔓 public |  |
| `consumed` | `usize` | 🔓 public |  |
| `messageType` | `u8` | 🔓 public |  |
| `bodyLen` | `usize` | 🔓 public |  |
| `encodedLen` | `usize` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `isComplete`[↗](#TlsHandshakeFeedResult.isComplete) | `export fn (self: &amp;TlsHandshakeFeedResult) isComple` |  |
| `isDirect`[↗](#TlsHandshakeFeedResult.isDirect) | `export fn (self: &amp;TlsHandshakeFeedResult) isDirect` |  |

---

### <a id="TlsHandshakeAssembler"></a>`TlsHandshakeAssembler` `🔓 export`

> 📄 `assembler.vx` L117-127

```vex
export struct TlsHandshakeAssembler
```

Allocation-free, one-message-at-a-time TLS Handshake assembler.

The common aligned path is zero-copy. A fragmented message is written into
a caller-owned span whose address must remain stable until completion. This
makes lifetime, allocation policy, and maximum certificate size explicit
at the connection layer instead of hiding them in TLS.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `maxBodyLen` | `usize` | 🔒 private |  |
| `headerBytes` | `[u8; 4]` | 🔒 private |  |
| `headerLen` | `usize` | 🔒 private |  |
| `messageType` | `u8` | 🔒 private |  |
| `bodyLen` | `usize` | 🔒 private |  |
| `encodedLen` | `usize` | 🔒 private |  |
| `written` | `usize` | 🔒 private |  |
| `outputAddress` | `usize` | 🔒 private |  |
| `outputBound` | `bool` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `TlsHandshakeAssembler.new`[↗](#TlsHandshakeAssembler.new) | `export fn TlsHandshakeAssembler.new(maxBodyLen: us` |  |
| `TlsHandshakeAssembler.withProtocolLimit`[↗](#TlsHandshakeAssembler.withProtocolLimit) | `export fn TlsHandshakeAssembler.withProtocolLimit(` |  |
| `isIdle`[↗](#TlsHandshakeAssembler.isIdle) | `export fn (self: &amp;TlsHandshakeAssembler) isIdle():` |  |
| `maxMessageBodyLen`[↗](#TlsHandshakeAssembler.maxMessageBodyLen) | `export fn (self: &amp;TlsHandshakeAssembler) maxMessag` |  |
| `pendingLen`[↗](#TlsHandshakeAssembler.pendingLen) | `export fn (self: &amp;TlsHandshakeAssembler) pendingLe` | Returns bytes already retained for the fragmented message. A partial |
| `clearPending`[↗](#TlsHandshakeAssembler.clearPending) | `fn (self: &amp;TlsHandshakeAssembler!) clearPending()` |  |
| `abort`[↗](#TlsHandshakeAssembler.abort) | `export fn (self: &amp;TlsHandshakeAssembler!) abort()` | Explicitly abandons a partial message after the connection has entered a |
| `requireNonHandshakeBoundary`[↗](#TlsHandshakeAssembler.requireNonHandshakeBoundary) | `export fn (self: &amp;TlsHandshakeAssembler) requireNo` | RFC 8446 forbids interleaving another record content type through a |
| `requireKeyChangeBoundary`[↗](#TlsHandshakeAssembler.requireKeyChangeBoundary) | `export fn (self: &amp;TlsHandshakeAssembler) requireKe` | Handshake messages may not cross a record-protection key change. |
| `validateHeader`[↗](#TlsHandshakeAssembler.validateHeader) | `fn (self: &amp;TlsHandshakeAssembler) validateHeader(h` |  |
| `feed`[↗](#TlsHandshakeAssembler.feed) | `export fn (self: &amp;TlsHandshakeAssembler!) feed(fra` | Consumes at most one complete Handshake message from `fragment`. |

---

## Enums

### <a id="TlsRecordError"></a>`TlsRecordError` `🔓 export`

> 📄 `record.vx` L36-47

```vex
export enum TlsRecordError
```

Allocation-free failures from TLS 1.3 record protection.

**Variants:**

- `InvalidState`
- `InvalidKeyMaterial`
- `InvalidBuffer`
- `InvalidContentType`
- `RecordOverflow`
- `InvalidRecord`
- `AuthenticationFailed`
- `SequenceExhausted`
- `BufferOverlap`
- `CipherFailure`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `isKind`[↗](#TlsRecordError.isKind) | `export fn (self: &amp;TlsRecordError) isKind(kind: Tls` |  |

---

### <a id="TlsKeyUpdateRequest"></a>`TlsKeyUpdateRequest` `🔓 export`

> 📄 `key_update.vx` L9-12

```vex
export enum TlsKeyUpdateRequest
```

**Variants:**

- `UpdateNotRequested`
- `UpdateRequested`

---

### <a id="TlsKeyUpdateError"></a>`TlsKeyUpdateError` `🔓 export`

> 📄 `key_update.vx` L14-19

```vex
export enum TlsKeyUpdateError
```

**Variants:**

- `InvalidBuffer`
- `InvalidLength`
- `InvalidMessageType`
- `InvalidRequest`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `isKind`[↗](#TlsKeyUpdateError.isKind) | `export fn (self: &amp;TlsKeyUpdateError) isKind(kind: ` |  |

---

### <a id="TlsDnsIdentityErrorKind"></a>`TlsDnsIdentityErrorKind` `🔓 export`

> 📄 `hostname.vx` L3-8

```vex
export enum TlsDnsIdentityErrorKind
```

**Variants:**

- `InvalidReference`
- `InvalidPresentedIdentity`
- `UnsupportedIdna`
- `IpAddressRequiresIpId`

---

### <a id="TlsHandshakeRole"></a>`TlsHandshakeRole` `🔓 export`

> 📄 `negotiation.vx` L41-44

```vex
export enum TlsHandshakeRole
```

Local endpoint role used to validate which Hello owns each X25519 share.

**Variants:**

- `Client`
- `Server`

---

### <a id="TlsX25519NegotiationStage"></a>`TlsX25519NegotiationStage` `🔓 export`

> 📄 `negotiation.vx` L47-59

```vex
export enum TlsX25519NegotiationStage
```

Monotonic state of normal no-PSK X25519 Hello negotiation.

**Variants:**

- `Ready`
- `ClientHelloCommitted`
- `HelloRetryRequested`
- `RetryClientHelloCommitted`
- `HandshakeTraffic`
- `EncryptedExtensions`
- `ServerCertificateAuthenticated`
- `ServerCertificateVerifyAuthenticated`
- `ServerFinishedAuthenticated`
- `Complete`
- `Failed`

---

### <a id="TlsX25519NegotiationError"></a>`TlsX25519NegotiationError` `🔓 export`

> 📄 `negotiation.vx` L63-87

```vex
export enum TlsX25519NegotiationError
```

Fail-closed negotiation errors. `HelloRetryRequest` is a typed transition

request, not a successful normal ServerHello.

**Variants:**

- `InvalidState`
- `InvalidRole`
- `InvalidPrivateKey`
- `InvalidHello`
- `InvalidEncryptedExtensions`
- `ExtensionNotOffered`
- `ResourceLimit`
- `UnsupportedMode`
- `UnsupportedCipher`
- `CipherNotOffered`
- `SessionMismatch`
- `MissingKeyShare`
- `KeyShareMismatch`
- `HelloRetryRequest`
- `InvalidOutput`
- `BufferOverlap`
- `NonContributoryKey`
- `SignatureAlgorithmNotOffered`
- `CertificateFailure`
- `CertificateVerifyFailure`
- `FinishedFailure`
- `TranscriptFailure`
- `ScheduleFailure`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `isKind`[↗](#TlsX25519NegotiationError.isKind) | `export fn (self: &amp;TlsX25519NegotiationError) isKin` |  |

---

### <a id="TlsAlertLevel"></a>`TlsAlertLevel` `🔓 export`

> 📄 `alert.vx` L7-10

```vex
export enum TlsAlertLevel
```

**Variants:**

- `Warning`
- `Fatal`

---

### <a id="TlsAlertDescription"></a>`TlsAlertDescription` `🔓 export`

> 📄 `alert.vx` L12-40

```vex
export enum TlsAlertDescription
```

**Variants:**

- `CloseNotify`
- `UnexpectedMessage`
- `BadRecordMac`
- `RecordOverflow`
- `HandshakeFailure`
- `BadCertificate`
- `UnsupportedCertificate`
- `CertificateRevoked`
- `CertificateExpired`
- `CertificateUnknown`
- `IllegalParameter`
- `UnknownCa`
- `AccessDenied`
- `DecodeError`
- `DecryptError`
- `ProtocolVersion`
- `InsufficientSecurity`
- `InternalError`
- `InappropriateFallback`
- `UserCanceled`
- `MissingExtension`
- `UnsupportedExtension`
- `UnrecognizedName`
- `BadCertificateStatusResponse`
- `UnknownPskIdentity`
- `CertificateRequired`
- `NoApplicationProtocol`

---

### <a id="TlsAlertError"></a>`TlsAlertError` `🔓 export`

> 📄 `alert.vx` L48-54

```vex
export enum TlsAlertError
```

**Variants:**

- `InvalidBuffer`
- `InvalidLength`
- `InvalidLevel`
- `UnknownDescription`
- `NonCanonicalLevel`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `isKind`[↗](#TlsAlertError.isKind) | `export fn (self: &amp;TlsAlertError) isKind(kind: TlsA` |  |

---

### <a id="TlsHelloError"></a>`TlsHelloError` `🔓 export`

> 📄 `hello.vx` L41-54

```vex
export enum TlsHelloError
```

**Variants:**

- `InvalidInput`
- `InvalidOutput`
- `InvalidMessageType`
- `InvalidMessageLength`
- `DecodeError`
- `ProtocolVersion`
- `IllegalParameter`
- `MissingExtension`
- `DuplicateExtension`
- `ExtensionOrder`
- `ResourceLimit`
- `BufferOverlap`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `isKind`[↗](#TlsHelloError.isKind) | `export fn (self: &amp;TlsHelloError) isKind(kind: TlsH` |  |

---

### <a id="TlsKeyScheduleError"></a>`TlsKeyScheduleError` `🔓 export`

> 📄 `handshake.vx` L21-32

```vex
export enum TlsKeyScheduleError
```

**Variants:**

- `InvalidSecret`
- `InvalidLabel`
- `InvalidContext`
- `InvalidOutput`
- `BufferOverlap`
- `InvalidState`
- `HashMismatch`
- `AuthenticationFailed`
- `UnsupportedCipher`
- `CryptoFailure`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `isKind`[↗](#TlsKeyScheduleError.isKind) | `export fn (self: &amp;TlsKeyScheduleError) isKind(kind` |  |

---

### <a id="TlsHashAlgorithm"></a>`TlsHashAlgorithm` `🔓 export`

> 📄 `handshake.vx` L36-39

```vex
export enum TlsHashAlgorithm
```

Hash identity is explicit at the HKDF boundary. TLS must never infer a

cryptographic algorithm from an output buffer or silently substitute one.

**Variants:**

- `Sha256`
- `Sha384`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `digestLen`[↗](#TlsHashAlgorithm.digestLen) | `export fn (self: &amp;TlsHashAlgorithm) digestLen(): u` |  |
| `maxExpandLen`[↗](#TlsHashAlgorithm.maxExpandLen) | `fn (self: &amp;TlsHashAlgorithm) maxExpandLen(): usize` |  |

---

### <a id="TlsTranscriptError"></a>`TlsTranscriptError` `🔓 export`

> 📄 `transcript.vx` L19-30

```vex
export enum TlsTranscriptError
```

Allocation-free failures produced by the handshake framing and transcript

layer. Every validation error is detected before the hash state or counters
are changed.

**Variants:**

- `InvalidLimit`
- `InvalidInput`
- `InvalidOutput`
- `InvalidMessageLength`
- `MessageTooLarge`
- `TranscriptLimitExceeded`
- `SyntheticMessageForbidden`
- `InvalidState`
- `HashUnavailable`
- `HashFailure`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `isKind`[↗](#TlsTranscriptError.isKind) | `export fn (self: &amp;TlsTranscriptError) isKind(kind:` |  |

---

### <a id="TlsCertificateError"></a>`TlsCertificateError` `🔓 export`

> 📄 `certificate.vx` L17-30

```vex
export enum TlsCertificateError
```

**Variants:**

- `InvalidInput`
- `InvalidMessageType`
- `InvalidMessageLength`
- `NonEmptyServerContext`
- `EmptyCertificateList`
- `EmptyCertificate`
- `ResourceLimit`
- `DuplicateExtension`
- `InvalidState`
- `UnsupportedSignatureAlgorithm`
- `InvalidCertificate`
- `InvalidSignature`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `isKind`[↗](#TlsCertificateError.isKind) | `export fn (self: &amp;TlsCertificateError) isKind(kind` |  |

---

### <a id="TlsTransportState"></a>`TlsTransportState` `🔓 export`

> 📄 `transport.vx` L25-33

```vex
export enum TlsTransportState
```

**Variants:**

- `Open`
- `PeerCanceled`
- `LocalCanceled`
- `LocalCloseSent`
- `PeerCloseReceived`
- `Closed`
- `Failed`

---

### <a id="TlsTransportEventKind"></a>`TlsTransportEventKind` `🔓 export`

> 📄 `transport.vx` L35-42

```vex
export enum TlsTransportEventKind
```

**Variants:**

- `ApplicationData`
- `PeerCloseNotify`
- `PeerUserCanceled`
- `PeerFatalAlert`
- `PostHandshakeFragment`
- `PeerKeyUpdate`

---

### <a id="TlsTransportErrorKind"></a>`TlsTransportErrorKind` `🔓 export`

> 📄 `transport.vx` L52-60

```vex
export enum TlsTransportErrorKind
```

**Variants:**

- `InvalidState`
- `KeyScheduleFailure`
- `RecordFailure`
- `AlertFailure`
- `KeyUpdateFailure`
- `GenerationExhausted`
- `UnexpectedMessage`

---

### <a id="X509ErrorKind"></a>`X509ErrorKind` `🔓 export`

> 📄 `x509.vx` L25-44

```vex
export enum X509ErrorKind
```

**Variants:**

- `InvalidDer`
- `InvalidCertificate`
- `UnsupportedAlgorithm`
- `InvalidSignature`
- `MissingSubjectAltName`
- `InvalidSubjectAltName`
- `InvalidValidity`
- `CertificateNotYetValid`
- `CertificateExpired`
- `IssuerMismatch`
- `NotCertificateAuthority`
- `InvalidKeyUsage`
- `InvalidExtendedKeyUsage`
- `UnsupportedCriticalExtension`
- `UnsupportedConstraint`
- `ChainTooLong`
- `HostnameMismatch`
- `IndexOutOfBounds`

---

### <a id="TlsSecretStage"></a>`TlsSecretStage` `🔓 export`

> 📄 `key_schedule.vx` L13-18

```vex
export enum TlsSecretStage
```

The only legal states of the TLS 1.3 main secret schedule.

**Variants:**

- `Early`
- `Handshake`
- `Master`
- `Retired`

---

### <a id="TlsHandshakeAssemblerError"></a>`TlsHandshakeAssemblerError` `🔓 export`

> 📄 `assembler.vx` L13-21

```vex
export enum TlsHandshakeAssemblerError
```

Failures produced while turning arbitrarily fragmented record payloads

back into complete TLS Handshake messages. Rejected input never partially
advances the assembler.

**Variants:**

- `InvalidLimit`
- `InvalidInput`
- `InvalidOutput`
- `MessageTooLarge`
- `OutputChanged`
- `InterleavedRecord`
- `KeyChangeWhileFragmented`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `isKind`[↗](#TlsHandshakeAssemblerError.isKind) | `export fn (self: &amp;TlsHandshakeAssemblerError) isKi` |  |

---

### <a id="TlsHandshakeFeedKind"></a>`TlsHandshakeFeedKind` `🔓 export`

> 📄 `assembler.vx` L33-37

```vex
export enum TlsHandshakeFeedKind
```

`CompleteDirect` means the complete message is the first `encodedLen`

bytes of the supplied fragment. `CompleteBuffered` means it is in the
caller-owned output span. `NeedMore` consumes the reported prefix and keeps
bounded state for the next record.

**Variants:**

- `NeedMore`
- `CompleteDirect`
- `CompleteBuffered`

---

## Functions

### <a id="encodeRecordHeaderRaw"></a>`encodeRecordHeaderRaw`

> 📄 `record.vx` L60-66

```vex
fn encodeRecordHeaderRaw(contentType: u8, version: u16, length: u16, out: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `contentType` | `u8` |  |
| `version` | `u16` |  |
| `length` | `u16` |  |
| `out` | `RawBuf` |  |

---

### <a id="decodeRecordHeaderRaw"></a>`decodeRecordHeaderRaw`

> 📄 `record.vx` L68-79

```vex
fn decodeRecordHeaderRaw(inBuf: RawBuf): TlsRecordHeader
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `inBuf` | `RawBuf` |  |

**Returns:** `TlsRecordHeader`

---

### <a id="encodeRecordHeader"></a>`encodeRecordHeader` `🔓 export`

> 📄 `record.vx` L207-217

```vex
export fn encodeRecordHeader(contentType: u8, version: u16, length: u16, out: &Span<u8>!): Result<usize, TlsRecordError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `contentType` | `u8` |  |
| `version` | `u16` |  |
| `length` | `u16` |  |
| `out` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, TlsRecordError&gt;`

---

### <a id="decodeRecordHeader"></a>`decodeRecordHeader` `🔓 export`

> 📄 `record.vx` L219-224

```vex
export fn decodeRecordHeader(inBuf: Span<u8>): Result<TlsRecordHeader, TlsRecordError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `inBuf` | `Span&lt;u8&gt;` |  |

**Returns:** `Result&lt;TlsRecordHeader, TlsRecordError&gt;`

---

### <a id="isTlsInnerContentType"></a>`isTlsInnerContentType`

> 📄 `record.vx` L226-231

```vex
fn isTlsInnerContentType(contentType: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `contentType` | `u8` |  |

**Returns:** `bool`

---

### <a id="rangesOverlap"></a>`rangesOverlap`

> 📄 `record.vx` L233-241

```vex
fn rangesOverlap(a: RawBuf, aLen: u64, b: RawBuf, bLen: u64): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `RawBuf` |  |
| `aLen` | `u64` |  |
| `b` | `RawBuf` |  |
| `bLen` | `u64` |  |

**Returns:** `bool`

---

### <a id="constructNonce"></a>`constructNonce`

> 📄 `record.vx` L243-259

```vex
fn constructNonce(iv: RawBuf, seq: u64, outNonce: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `iv` | `RawBuf` |  |
| `seq` | `u64` |  |
| `outNonce` | `RawBuf` |  |

---

### <a id="keyUpdateRequestCode"></a>`keyUpdateRequestCode`

> 📄 `key_update.vx` L25-30

```vex
fn keyUpdateRequestCode(request: TlsKeyUpdateRequest): u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `request` | `TlsKeyUpdateRequest` |  |

**Returns:** `u8`

---

### <a id="encodeTlsKeyUpdate"></a>`encodeTlsKeyUpdate` `🔓 export`

> 📄 `key_update.vx` L33-46

```vex
export fn encodeTlsKeyUpdate(request: TlsKeyUpdateRequest, output: &Span<u8>!): Result<usize, TlsKeyUpdateError>
```

Encodes one complete Handshake-framed TLS 1.3 KeyUpdate message.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `request` | `TlsKeyUpdateRequest` |  |
| `output` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, TlsKeyUpdateError&gt;`

---

### <a id="decodeTlsKeyUpdate"></a>`decodeTlsKeyUpdate` `🔓 export`

> 📄 `key_update.vx` L51-78

```vex
export fn decodeTlsKeyUpdate(encoded: Span<u8>): Result<TlsKeyUpdateRequest, TlsKeyUpdateError>
```

Decodes exactly one complete Handshake-framed TLS 1.3 KeyUpdate message.

Values other than 0 and 1 are retained as a typed `InvalidRequest` so the
connection owner can select the required `illegal_parameter` alert.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `encoded` | `Span&lt;u8&gt;` |  |

**Returns:** `Result&lt;TlsKeyUpdateRequest, TlsKeyUpdateError&gt;`

---

### <a id="identityError"></a>`identityError`

> 📄 `hostname.vx` L27-29

```vex
fn identityError(kind: TlsDnsIdentityErrorKind, offset: usize): TlsDnsIdentityError
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `kind` | `TlsDnsIdentityErrorKind` |  |
| `offset` | `usize` |  |

**Returns:** `TlsDnsIdentityError`

---

### <a id="identityByteAt"></a>`identityByteAt`

> 📄 `hostname.vx` L31-33

```vex
fn identityByteAt(value: Span<u8>, offset: usize): u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `Span&lt;u8&gt;` |  |
| `offset` | `usize` |  |

**Returns:** `u8`

---

### <a id="isAsciiAlpha"></a>`isAsciiAlpha`

> 📄 `hostname.vx` L35-38

```vex
fn isAsciiAlpha(value: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `u8` |  |

**Returns:** `bool`

---

### <a id="isAsciiDigit"></a>`isAsciiDigit`

> 📄 `hostname.vx` L40-42

```vex
fn isAsciiDigit(value: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `u8` |  |

**Returns:** `bool`

---

### <a id="foldedAscii"></a>`foldedAscii`

> 📄 `hostname.vx` L44-47

```vex
fn foldedAscii(value: u8): u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `u8` |  |

**Returns:** `u8`

---

### <a id="normalizedDnsLength"></a>`normalizedDnsLength`

> 📄 `hostname.vx` L49-97

```vex
fn normalizedDnsLength(value: Span<u8>, allowWildcard: bool, invalidKind: TlsDnsIdentityErrorKind): Result<usize, TlsDnsIdentityError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `Span&lt;u8&gt;` |  |
| `allowWildcard` | `bool` |  |
| `invalidKind` | `TlsDnsIdentityErrorKind` |  |

**Returns:** `Result&lt;usize, TlsDnsIdentityError&gt;`

---

### <a id="isIpv4Reference"></a>`isIpv4Reference`

> 📄 `hostname.vx` L99-121

```vex
fn isIpv4Reference(value: Span<u8>, length: usize): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `Span&lt;u8&gt;` |  |
| `length` | `usize` |  |

**Returns:** `bool`

---

### <a id="equalDnsRange"></a>`equalDnsRange`

> 📄 `hostname.vx` L123-137

```vex
fn equalDnsRange(reference: Span<u8>, referenceOffset: usize, presented: Span<u8>, presentedOffset: usize, length: usize): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `reference` | `Span&lt;u8&gt;` |  |
| `referenceOffset` | `usize` |  |
| `presented` | `Span&lt;u8&gt;` |  |
| `presentedOffset` | `usize` |  |
| `length` | `usize` |  |

**Returns:** `bool`

---

### <a id="exactArraySpan"></a>`exactArraySpan`

> 📄 `negotiation.vx` L95-97

```vex
fn exactArraySpan(value: &[u8; N], length: usize): Span<u8>
```

**Type Parameters:**

- `const N: usize`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `&amp;[u8; N]` |  |
| `length` | `usize` |  |

**Returns:** `Span&lt;u8&gt;`

---

### <a id="exactArraySpanMut"></a>`exactArraySpanMut`

> 📄 `negotiation.vx` L99-101

```vex
fn exactArraySpanMut(value: &[u8; N]!, length: usize): Span<u8>
```

**Type Parameters:**

- `const N: usize`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `&amp;[u8; N]!` |  |
| `length` | `usize` |  |

**Returns:** `Span&lt;u8&gt;`

---

### <a id="spansOverlap"></a>`spansOverlap`

> 📄 `negotiation.vx` L103-111

```vex
fn spansOverlap(left: Span<u8>, right: Span<u8>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `left` | `Span&lt;u8&gt;` |  |
| `right` | `Span&lt;u8&gt;` |  |

**Returns:** `bool`

---

### <a id="equalBytes"></a>`equalBytes`

> 📄 `negotiation.vx` L113-120

```vex
fn equalBytes(left: Span<u8>, right: Span<u8>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `left` | `Span&lt;u8&gt;` |  |
| `right` | `Span&lt;u8&gt;` |  |

**Returns:** `bool`

---

### <a id="mapHelloFailure"></a>`mapHelloFailure`

> 📄 `negotiation.vx` L122-124

```vex
fn mapHelloFailure(_: TlsHelloError): TlsX25519NegotiationError
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_` | `TlsHelloError` |  |

**Returns:** `TlsX25519NegotiationError`

---

### <a id="mapTranscriptFailure"></a>`mapTranscriptFailure`

> 📄 `negotiation.vx` L126-128

```vex
fn mapTranscriptFailure(_: TlsTranscriptError): TlsX25519NegotiationError
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_` | `TlsTranscriptError` |  |

**Returns:** `TlsX25519NegotiationError`

---

### <a id="mapScheduleFailure"></a>`mapScheduleFailure`

> 📄 `negotiation.vx` L130-138

```vex
fn mapScheduleFailure(failure: TlsKeyScheduleError): TlsX25519NegotiationError
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `failure` | `TlsKeyScheduleError` |  |

**Returns:** `TlsX25519NegotiationError`

---

### <a id="cipherHash"></a>`cipherHash`

> 📄 `negotiation.vx` L140-150

```vex
fn cipherHash(cipherSuite: u16): Result<TlsHashAlgorithm, TlsX25519NegotiationError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `cipherSuite` | `u16` |  |

**Returns:** `Result&lt;TlsHashAlgorithm, TlsX25519NegotiationError&gt;`

---

### <a id="offeredCipher"></a>`offeredCipher`

> 📄 `negotiation.vx` L328-338

```vex
fn offeredCipher(view: &TlsClientHelloView, encoded: Span<u8>, cipher: u16): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `view` | `&amp;TlsClientHelloView` |  |
| `encoded` | `Span&lt;u8&gt;` |  |
| `cipher` | `u16` |  |

**Returns:** `bool`

---

### <a id="offeredSignature"></a>`offeredSignature`

> 📄 `negotiation.vx` L340-353

```vex
fn offeredSignature(view: &TlsClientHelloView, encoded: Span<u8>, scheme: u16): Result<bool, TlsX25519NegotiationError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `view` | `&amp;TlsClientHelloView` |  |
| `encoded` | `Span&lt;u8&gt;` |  |
| `scheme` | `u16` |  |

**Returns:** `Result&lt;bool, TlsX25519NegotiationError&gt;`

---

### <a id="hashU16"></a>`hashU16`

> 📄 `negotiation.vx` L355-363

```vex
fn hashU16(hasher: &Sha256!, value: usize)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `hasher` | `&amp;Sha256!` |  |
| `value` | `usize` |  |

---

### <a id="retryInvariantDigest"></a>`retryInvariantDigest`

> 📄 `negotiation.vx` L370-433

```vex
fn retryInvariantDigest(view: &TlsClientHelloView, encoded: Span<u8>, output: &[u8; 32]!): Result<bool, TlsX25519NegotiationError>
```

Hashes precisely the ClientHello fields RFC 8446 requires to remain

invariant across HelloRetryRequest. `key_share`, `cookie`, and zero padding
are excluded because the protocol explicitly permits those fields to
change. The digest is an internal comparison token, never a transcript
substitute.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `view` | `&amp;TlsClientHelloView` |  |
| `encoded` | `Span&lt;u8&gt;` |  |
| `output` | `&amp;[u8; 32]!` |  |

**Returns:** `Result&lt;bool, TlsX25519NegotiationError&gt;`

---

### <a id="extensionPresent"></a>`extensionPresent`

> 📄 `negotiation.vx` L435-443

```vex
fn extensionPresent(view: &TlsClientHelloView, encoded: Span<u8>, identity: u16): Result<bool, TlsX25519NegotiationError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `view` | `&amp;TlsClientHelloView` |  |
| `encoded` | `Span&lt;u8&gt;` |  |
| `identity` | `u16` |  |

**Returns:** `Result&lt;bool, TlsX25519NegotiationError&gt;`

---

### <a id="validateTrafficOutputs"></a>`validateTrafficOutputs`

> 📄 `negotiation.vx` L809-821

```vex
fn validateTrafficOutputs(digestLen: usize, clientOut: Span<u8>, serverOut: Span<u8>): Result<bool, TlsX25519NegotiationError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `digestLen` | `usize` |  |
| `clientOut` | `Span&lt;u8&gt;` |  |
| `serverOut` | `Span&lt;u8&gt;` |  |

**Returns:** `Result&lt;bool, TlsX25519NegotiationError&gt;`

---

### <a id="negotiationU16"></a>`negotiationU16`

> 📄 `negotiation.vx` L1105-1108

```vex
fn negotiationU16(input: Span<u8>, offset: usize): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `offset` | `usize` |  |

**Returns:** `usize`

---

### <a id="alertLevelCode"></a>`alertLevelCode`

> 📄 `alert.vx` L60-65

```vex
fn alertLevelCode(level: TlsAlertLevel): u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `level` | `TlsAlertLevel` |  |

**Returns:** `u8`

---

### <a id="decodeAlertLevel"></a>`decodeAlertLevel`

> 📄 `alert.vx` L67-71

```vex
fn decodeAlertLevel(code: u8): Result<TlsAlertLevel, TlsAlertError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `code` | `u8` |  |

**Returns:** `Result&lt;TlsAlertLevel, TlsAlertError&gt;`

---

### <a id="alertDescriptionCode"></a>`alertDescriptionCode`

> 📄 `alert.vx` L73-103

```vex
fn alertDescriptionCode(description: TlsAlertDescription): u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `description` | `TlsAlertDescription` |  |

**Returns:** `u8`

---

### <a id="decodeAlertDescription"></a>`decodeAlertDescription`

> 📄 `alert.vx` L105-138

```vex
fn decodeAlertDescription(code: u8): Result<TlsAlertDescription, TlsAlertError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `code` | `u8` |  |

**Returns:** `Result&lt;TlsAlertDescription, TlsAlertError&gt;`

---

### <a id="canonicalAlertLevel"></a>`canonicalAlertLevel`

> 📄 `alert.vx` L140-147

```vex
fn canonicalAlertLevel(description: TlsAlertDescription): TlsAlertLevel
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `description` | `TlsAlertDescription` |  |

**Returns:** `TlsAlertLevel`

---

### <a id="encodeTlsAlert"></a>`encodeTlsAlert` `🔓 export`

> 📄 `alert.vx` L193-206

```vex
export fn encodeTlsAlert(alert: TlsAlert, output: &Span<u8>!): Result<usize, TlsAlertError>
```

Encodes one canonical two-byte TLS 1.3 Alert payload. Vex never emits a

warning-level error alert or a fatal close_notify/user_canceled alert.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `alert` | `TlsAlert` |  |
| `output` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, TlsAlertError&gt;`

---

### <a id="decodeTlsAlert"></a>`decodeTlsAlert` `🔓 export`

> 📄 `alert.vx` L211-227

```vex
export fn decodeTlsAlert(input: Span<u8>): Result<TlsAlert, TlsAlertError>
```

Decodes exactly one Alert payload. Warning-level protocol errors are

retained on the view but `isFatal` still applies TLS 1.3 effective
severity, preventing a peer-controlled downgrade.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |

**Returns:** `Result&lt;TlsAlert, TlsAlertError&gt;`

---

### <a id="emptyWireSlice"></a>`emptyWireSlice`

> 📄 `hello.vx` L70-76

```vex
fn emptyWireSlice(): TlsWireSlice
```

**Returns:** `TlsWireSlice`

---

### <a id="emptyExtensions"></a>`emptyExtensions`

> 📄 `hello.vx` L105-119

```vex
fn emptyExtensions(): TlsHelloExtensions
```

**Returns:** `TlsHelloExtensions`

---

### <a id="readU16"></a>`readU16`

> 📄 `hello.vx` L384-387

```vex
fn readU16(input: Span<u8>, offset: usize): u16
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `offset` | `usize` |  |

**Returns:** `u16`

---

### <a id="writeU16"></a>`writeU16`

> 📄 `hello.vx` L389-393

```vex
fn writeU16(output: &Span<u8>!, offset: usize, value: u16)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `output` | `&amp;Span&lt;u8&gt;!` |  |
| `offset` | `usize` |  |
| `value` | `u16` |  |

---

### <a id="copyBytes"></a>`copyBytes`

> 📄 `hello.vx` L395-398

```vex
fn copyBytes(destination: Ptr<u8>, source: Ptr<u8>, length: usize)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `destination` | `Ptr&lt;u8&gt;` |  |
| `source` | `Ptr&lt;u8&gt;` |  |
| `length` | `usize` |  |

---

### <a id="rangesOverlap"></a>`rangesOverlap`

> 📄 `hello.vx` L400-408

```vex
fn rangesOverlap(leftAddress: usize, leftLen: usize, rightAddress: usize, rightLen: usize): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `leftAddress` | `usize` |  |
| `leftLen` | `usize` |  |
| `rightAddress` | `usize` |  |
| `rightLen` | `usize` |  |

**Returns:** `bool`

---

### <a id="spanRangeOverlapsOutput"></a>`spanRangeOverlapsOutput`

> 📄 `hello.vx` L410-415

```vex
fn spanRangeOverlapsOutput(input: Span<u8>, output: Span<u8>, used: usize): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `output` | `Span&lt;u8&gt;` |  |
| `used` | `usize` |  |

**Returns:** `bool`

---

### <a id="validateVector16"></a>`validateVector16`

> 📄 `hello.vx` L417-430

```vex
fn validateVector16(input: Span<u8>, offset: usize, length: usize, maxItems: usize): Result<usize, TlsHelloError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `offset` | `usize` |  |
| `length` | `usize` |  |
| `maxItems` | `usize` |  |

**Returns:** `Result&lt;usize, TlsHelloError&gt;`

---

### <a id="validateSupportedVersions"></a>`validateSupportedVersions`

> 📄 `hello.vx` L432-459

```vex
fn validateSupportedVersions(input: Span<u8>, view: TlsWireSlice, client: bool): Result<bool, TlsHelloError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `view` | `TlsWireSlice` |  |
| `client` | `bool` |  |

**Returns:** `Result&lt;bool, TlsHelloError&gt;`

---

### <a id="validateServerName"></a>`validateServerName`

> 📄 `hello.vx` L461-495

```vex
fn validateServerName(input: Span<u8>, view: TlsWireSlice): Result<bool, TlsHelloError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `view` | `TlsWireSlice` |  |

**Returns:** `Result&lt;bool, TlsHelloError&gt;`

---

### <a id="validateAlpn"></a>`validateAlpn`

> 📄 `hello.vx` L497-519

```vex
fn validateAlpn(input: Span<u8>, view: TlsWireSlice): Result<bool, TlsHelloError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `view` | `TlsWireSlice` |  |

**Returns:** `Result&lt;bool, TlsHelloError&gt;`

---

### <a id="validateCookie"></a>`validateCookie`

> 📄 `hello.vx` L521-532

```vex
fn validateCookie(input: Span<u8>, view: TlsWireSlice): Result<bool, TlsHelloError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `view` | `TlsWireSlice` |  |

**Returns:** `Result&lt;bool, TlsHelloError&gt;`

---

### <a id="validatePadding"></a>`validatePadding`

> 📄 `hello.vx` L534-545

```vex
fn validatePadding(input: Span<u8>, view: TlsWireSlice): Result<bool, TlsHelloError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `view` | `TlsWireSlice` |  |

**Returns:** `Result&lt;bool, TlsHelloError&gt;`

---

### <a id="validateClientPsk"></a>`validateClientPsk`

> 📄 `hello.vx` L547-592

```vex
fn validateClientPsk(input: Span<u8>, view: TlsWireSlice): Result<bool, TlsHelloError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `view` | `TlsWireSlice` |  |

**Returns:** `Result&lt;bool, TlsHelloError&gt;`

---

### <a id="groupsContain"></a>`groupsContain`

> 📄 `hello.vx` L594-602

```vex
fn groupsContain(input: Span<u8>, view: TlsWireSlice, group: u16): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `view` | `TlsWireSlice` |  |
| `group` | `u16` |  |

**Returns:** `bool`

---

### <a id="validateClientKeyShares"></a>`validateClientKeyShares`

> 📄 `hello.vx` L604-640

```vex
fn validateClientKeyShares(input: Span<u8>, view: TlsWireSlice, groups: TlsWireSlice): Result<bool, TlsHelloError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `view` | `TlsWireSlice` |  |
| `groups` | `TlsWireSlice` |  |

**Returns:** `Result&lt;bool, TlsHelloError&gt;`

---

### <a id="validateServerKeyShare"></a>`validateServerKeyShare`

> 📄 `hello.vx` L642-655

```vex
fn validateServerKeyShare(input: Span<u8>, view: TlsWireSlice, helloRetryRequest: bool): Result<bool, TlsHelloError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `view` | `TlsWireSlice` |  |
| `helloRetryRequest` | `bool` |  |

**Returns:** `Result&lt;bool, TlsHelloError&gt;`

---

### <a id="scanExtensions"></a>`scanExtensions`

> 📄 `hello.vx` L657-854

```vex
fn scanExtensions(input: Span<u8>, start: usize, length: usize, client: bool, helloRetryRequest: bool): Result<TlsHelloExtensions, TlsHelloError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `start` | `usize` |  |
| `length` | `usize` |  |
| `client` | `bool` |  |
| `helloRetryRequest` | `bool` |  |

**Returns:** `Result&lt;TlsHelloExtensions, TlsHelloError&gt;`

---

### <a id="decodeExactHeader"></a>`decodeExactHeader`

> 📄 `hello.vx` L856-876

```vex
fn decodeExactHeader(encoded: Span<u8>, expectedType: u8): Result<TlsHandshakeHeader, TlsHelloError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `encoded` | `Span&lt;u8&gt;` |  |
| `expectedType` | `u8` |  |

**Returns:** `Result&lt;TlsHandshakeHeader, TlsHelloError&gt;`

---

### <a id="copyRandom"></a>`copyRandom`

> 📄 `hello.vx` L878-886

```vex
fn copyRandom(input: Span<u8>, offset: usize): [u8; 32]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `offset` | `usize` |  |

**Returns:** `[u8; 32]`

---

### <a id="isHelloRetryRandom"></a>`isHelloRetryRandom`

> 📄 `hello.vx` L888-896

```vex
fn isHelloRetryRandom(random: &[u8; 32]): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `random` | `&amp;[u8; 32]` |  |

**Returns:** `bool`

---

### <a id="decodeClientHello"></a>`decodeClientHello` `🔓 export`

> 📄 `hello.vx` L899-960

```vex
export fn decodeClientHello(encoded: Span<u8>): Result<TlsClientHelloView, TlsHelloError>
```

Decodes and validates one complete TLS 1.3 ClientHello Handshake message.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `encoded` | `Span&lt;u8&gt;` |  |

**Returns:** `Result&lt;TlsClientHelloView, TlsHelloError&gt;`

---

### <a id="decodeServerHello"></a>`decodeServerHello` `🔓 export`

> 📄 `hello.vx` L964-1013

```vex
export fn decodeServerHello(encoded: Span<u8>): Result<TlsServerHelloView, TlsHelloError>
```

Decodes and validates one complete TLS 1.3 ServerHello or

HelloRetryRequest Handshake message.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `encoded` | `Span&lt;u8&gt;` |  |

**Returns:** `Result&lt;TlsServerHelloView, TlsHelloError&gt;`

---

### <a id="encodeHeader"></a>`encodeHeader`

> 📄 `hello.vx` L1015-1027

```vex
fn encodeHeader(messageType: u8, bodyLen: usize, output: &Span<u8>!): Result<bool, TlsHelloError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `messageType` | `u8` |  |
| `bodyLen` | `usize` |  |
| `output` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;bool, TlsHelloError&gt;`

---

### <a id="encodeTlsExtension"></a>`encodeTlsExtension` `🔓 export`

> 📄 `hello.vx` L1030-1047

```vex
export fn encodeTlsExtension(extensionType: u16, data: Span<u8>, output: &Span<u8>!): Result<usize, TlsHelloError>
```

Emits a generic Extension TLV into caller-owned storage.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `extensionType` | `u16` |  |
| `data` | `Span&lt;u8&gt;` |  |
| `output` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, TlsHelloError&gt;`

---

### <a id="encodeCookie"></a>`encodeCookie` `🔓 export`

> 📄 `hello.vx` L1052-1074

```vex
export fn encodeCookie(cookie: Span<u8>, output: &Span<u8>!): Result<usize, TlsHelloError>
```

Encodes the TLS 1.3 `cookie` extension into caller-owned storage. The

opaque payload is length-delimited exactly once inside the extension and
is never allocated or truncated.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `cookie` | `Span&lt;u8&gt;` |  |
| `output` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, TlsHelloError&gt;`

---

### <a id="encodeClientHello"></a>`encodeClientHello` `🔓 export`

> 📄 `hello.vx` L1079-1146

```vex
export fn encodeClientHello(random: &[u8; 32], sessionId: Span<u8>, cipherSuites: Span<u16>, extensionBlock: Span<u8>, output: &Span<u8>!): Result<usize, TlsHelloError>
```

Emits the TLS 1.3 ClientHello body and Handshake header. Randomness and key

material are always supplied by the caller; this codec has no deterministic
or hidden entropy fallback.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `random` | `&amp;[u8; 32]` |  |
| `sessionId` | `Span&lt;u8&gt;` |  |
| `cipherSuites` | `Span&lt;u16&gt;` |  |
| `extensionBlock` | `Span&lt;u8&gt;` |  |
| `output` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, TlsHelloError&gt;`

---

### <a id="encodeServerHello"></a>`encodeServerHello` `🔓 export`

> 📄 `hello.vx` L1150-1205

```vex
export fn encodeServerHello(random: &[u8; 32], sessionId: Span<u8>, cipherSuite: u16, extensionBlock: Span<u8>, output: &Span<u8>!): Result<usize, TlsHelloError>
```

Emits one TLS 1.3 ServerHello or HelloRetryRequest from an already

validated extension block.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `random` | `&amp;[u8; 32]` |  |
| `sessionId` | `Span&lt;u8&gt;` |  |
| `cipherSuite` | `u16` |  |
| `extensionBlock` | `Span&lt;u8&gt;` |  |
| `output` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, TlsHelloError&gt;`

---

### <a id="encodeClientSupportedVersions"></a>`encodeClientSupportedVersions` `🔓 export`

> 📄 `hello.vx` L1208-1245

```vex
export fn encodeClientSupportedVersions(versions: Span<u16>, output: &Span<u8>!): Result<usize, TlsHelloError>
```

Encodes `supported_versions` for a TLS 1.3 ClientHello.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `versions` | `Span&lt;u16&gt;` |  |
| `output` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, TlsHelloError&gt;`

---

### <a id="encodeServerSupportedVersion"></a>`encodeServerSupportedVersion` `🔓 export`

> 📄 `hello.vx` L1247-1257

```vex
export fn encodeServerSupportedVersion(output: &Span<u8>!): Result<usize, TlsHelloError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `output` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, TlsHelloError&gt;`

---

### <a id="encodeU16VectorExtension"></a>`encodeU16VectorExtension`

> 📄 `hello.vx` L1259-1287

```vex
fn encodeU16VectorExtension(extensionType: u16, values: Span<u16>, maxItems: usize, output: &Span<u8>!): Result<usize, TlsHelloError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `extensionType` | `u16` |  |
| `values` | `Span&lt;u16&gt;` |  |
| `maxItems` | `usize` |  |
| `output` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, TlsHelloError&gt;`

---

### <a id="encodeSupportedGroups"></a>`encodeSupportedGroups` `🔓 export`

> 📄 `hello.vx` L1289-1295

```vex
export fn encodeSupportedGroups(groups: Span<u16>, output: &Span<u8>!): Result<usize, TlsHelloError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `groups` | `Span&lt;u16&gt;` |  |
| `output` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, TlsHelloError&gt;`

---

### <a id="encodeSignatureAlgorithms"></a>`encodeSignatureAlgorithms` `🔓 export`

> 📄 `hello.vx` L1297-1304

```vex
export fn encodeSignatureAlgorithms(schemes: Span<u16>, output: &Span<u8>!): Result<usize, TlsHelloError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `schemes` | `Span&lt;u16&gt;` |  |
| `output` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, TlsHelloError&gt;`

---

### <a id="encodeClientKeyShare"></a>`encodeClientKeyShare` `🔓 export`

> 📄 `hello.vx` L1306-1330

```vex
export fn encodeClientKeyShare(group: u16, keyExchange: Span<u8>, output: &Span<u8>!): Result<usize, TlsHelloError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `group` | `u16` |  |
| `keyExchange` | `Span&lt;u8&gt;` |  |
| `output` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, TlsHelloError&gt;`

---

### <a id="encodeServerKeyShare"></a>`encodeServerKeyShare` `🔓 export`

> 📄 `hello.vx` L1332-1355

```vex
export fn encodeServerKeyShare(group: u16, keyExchange: Span<u8>, output: &Span<u8>!): Result<usize, TlsHelloError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `group` | `u16` |  |
| `keyExchange` | `Span&lt;u8&gt;` |  |
| `output` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, TlsHelloError&gt;`

---

### <a id="encodeHelloRetryKeyShare"></a>`encodeHelloRetryKeyShare` `🔓 export`

> 📄 `hello.vx` L1359-1369

```vex
export fn encodeHelloRetryKeyShare(group: u16, output: &Span<u8>!): Result<usize, TlsHelloError>
```

Encodes the selected-group-only `key_share` form used exclusively by

HelloRetryRequest. A normal ServerHello must use `encodeServerKeyShare`.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `group` | `u16` |  |
| `output` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, TlsHelloError&gt;`

---

### <a id="spansOverlap"></a>`spansOverlap`

> 📄 `handshake.vx` L62-70

```vex
fn spansOverlap(left: Span<u8>, right: Span<u8>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `left` | `Span&lt;u8&gt;` |  |
| `right` | `Span&lt;u8&gt;` |  |

**Returns:** `bool`

---

### <a id="hkdfExpandLabel"></a>`hkdfExpandLabel` `🔓 export`

> 📄 `handshake.vx` L77-161

```vex
export fn hkdfExpandLabel(hash: TlsHashAlgorithm, secret: Span<u8>, label: str, context: Span<u8>, out: &Span<u8>!): Result<usize, TlsKeyScheduleError>
```

RFC 8446 HKDF-Expand-Label for TLS 1.3 SHA-256 and SHA-384 schedules.

The traffic secret must be exactly one digest of the selected hash. The
output length comes from the mutable span, preventing pointer/length
disagreement. Inputs may not alias output; rejection precedes mutation.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `hash` | `TlsHashAlgorithm` |  |
| `secret` | `Span&lt;u8&gt;` |  |
| `label` | `str` |  |
| `context` | `Span&lt;u8&gt;` |  |
| `out` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, TlsKeyScheduleError&gt;`

---

### <a id="deriveSecret"></a>`deriveSecret` `🔓 export`

> 📄 `handshake.vx` L168-181

```vex
export fn deriveSecret(hash: TlsHashAlgorithm, secret: Span<u8>, label: str, transcriptHash: Span<u8>, out: &Span<u8>!): Result<usize, TlsKeyScheduleError>
```

RFC 8446 Derive-Secret over an already snapshotted transcript hash.

Requiring one exact digest for both `secret` and `transcriptHash` prevents
accidental cross-suite derivation. The output prefix is committed only
after every length and alias check succeeds.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `hash` | `TlsHashAlgorithm` |  |
| `secret` | `Span&lt;u8&gt;` |  |
| `label` | `str` |  |
| `transcriptHash` | `Span&lt;u8&gt;` |  |
| `out` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, TlsKeyScheduleError&gt;`

---

### <a id="computeFinishedVerifyData"></a>`computeFinishedVerifyData` `🔓 export`

> 📄 `handshake.vx` L185-232

```vex
export fn computeFinishedVerifyData(hash: TlsHashAlgorithm, baseKey: Span<u8>, transcriptHash: Span<u8>, out: &Span<u8>!): Result<usize, TlsKeyScheduleError>
```

Computes TLS 1.3 Finished.verify_data from a traffic secret and an exact

transcript snapshot. The caller must snapshot before appending Finished.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `hash` | `TlsHashAlgorithm` |  |
| `baseKey` | `Span&lt;u8&gt;` |  |
| `transcriptHash` | `Span&lt;u8&gt;` |  |
| `out` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, TlsKeyScheduleError&gt;`

---

### <a id="verifyFinished"></a>`verifyFinished` `🔓 export`

> 📄 `handshake.vx` L236-264

```vex
export fn verifyFinished(hash: TlsHashAlgorithm, baseKey: Span<u8>, transcriptHash: Span<u8>, received: Span<u8>): Result<bool, TlsKeyScheduleError>
```

Verifies TLS 1.3 Finished in constant time. A mismatch is an authentication

failure, not a boolean that a caller can accidentally ignore.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `hash` | `TlsHashAlgorithm` |  |
| `baseKey` | `Span&lt;u8&gt;` |  |
| `transcriptHash` | `Span&lt;u8&gt;` |  |
| `received` | `Span&lt;u8&gt;` |  |

**Returns:** `Result&lt;bool, TlsKeyScheduleError&gt;`

---

### <a id="deriveTrafficKeys"></a>`deriveTrafficKeys` `🔓 export`

> 📄 `handshake.vx` L268-308

```vex
export fn deriveTrafficKeys(secret: Span<u8>, cipherId: u16, outKey: &Span<u8>!, outIv: &Span<u8>!): Result<TlsTrafficKeyLengths, TlsKeyScheduleError>
```

Derive the per-direction TLS 1.3 record key and IV for all implemented

suites. Cipher-suite selection fixes both AEAD key length and HKDF hash.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `secret` | `Span&lt;u8&gt;` |  |
| `cipherId` | `u16` |  |
| `outKey` | `&amp;Span&lt;u8&gt;!` |  |
| `outIv` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;TlsTrafficKeyLengths, TlsKeyScheduleError&gt;`

---

### <a id="updateTrafficSecret"></a>`updateTrafficSecret` `🔓 export`

> 📄 `handshake.vx` L315-329

```vex
export fn updateTrafficSecret(hash: TlsHashAlgorithm, current: Span<u8>, next: &Span<u8>!): Result<usize, TlsKeyScheduleError>
```

Derives RFC 8446 application_traffic_secret_N+1 from generation N.

The current secret remains caller-owned and unchanged. The next secret is
committed only after exact hash-width, capacity and alias validation, so a
transport can stage the complete next key generation before publishing it.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `hash` | `TlsHashAlgorithm` |  |
| `current` | `Span&lt;u8&gt;` |  |
| `next` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, TlsKeyScheduleError&gt;`

---

### <a id="decodeHeaderRaw"></a>`decodeHeaderRaw`

> 📄 `transcript.vx` L44-52

```vex
fn decodeHeaderRaw(input: RawBuf): TlsHandshakeHeader
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `RawBuf` |  |

**Returns:** `TlsHandshakeHeader`

---

### <a id="encodeHeaderRaw"></a>`encodeHeaderRaw`

> 📄 `transcript.vx` L54-59

```vex
fn encodeHeaderRaw(header: TlsHandshakeHeader, output: RawBuf)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `header` | `TlsHandshakeHeader` |  |
| `output` | `RawBuf` |  |

---

### <a id="decodeHandshakeHeader"></a>`decodeHandshakeHeader` `🔓 export`

> 📄 `transcript.vx` L62-69

```vex
export fn decodeHandshakeHeader(input: Span<u8>): Result<TlsHandshakeHeader, TlsTranscriptError>
```

Decodes a TLS Handshake header from the first four bytes of `input`.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |

**Returns:** `Result&lt;TlsHandshakeHeader, TlsTranscriptError&gt;`

---

### <a id="encodeHandshakeHeader"></a>`encodeHandshakeHeader` `🔓 export`

> 📄 `transcript.vx` L72-83

```vex
export fn encodeHandshakeHeader(header: TlsHandshakeHeader, output: &Span<u8>!): Result<usize, TlsTranscriptError>
```

Encodes a TLS Handshake header without allocating.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `header` | `TlsHandshakeHeader` |  |
| `output` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, TlsTranscriptError&gt;`

---

### <a id="sameHash"></a>`sameHash`

> 📄 `transcript.vx` L212-223

```vex
fn sameHash(left: TlsHashAlgorithm, right: TlsHashAlgorithm): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `left` | `TlsHashAlgorithm` |  |
| `right` | `TlsHashAlgorithm` |  |

**Returns:** `bool`

---

### <a id="certificateU16"></a>`certificateU16`

> 📄 `certificate.vx` L36-39

```vex
fn certificateU16(input: Span<u8>, offset: usize): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `offset` | `usize` |  |

**Returns:** `usize`

---

### <a id="certificateU24"></a>`certificateU24`

> 📄 `certificate.vx` L41-45

```vex
fn certificateU24(input: Span<u8>, offset: usize): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `offset` | `usize` |  |

**Returns:** `usize`

---

### <a id="certificateSlice"></a>`certificateSlice`

> 📄 `certificate.vx` L47-49

```vex
fn certificateSlice(offset: usize, length: usize): TlsWireSlice
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `offset` | `usize` |  |
| `length` | `usize` |  |

**Returns:** `TlsWireSlice`

---

### <a id="scanCertificateEntryExtensions"></a>`scanCertificateEntryExtensions`

> 📄 `certificate.vx` L51-84

```vex
fn scanCertificateEntryExtensions(input: Span<u8>, offset: usize, length: usize): Result<usize, TlsCertificateError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `offset` | `usize` |  |
| `length` | `usize` |  |

**Returns:** `Result&lt;usize, TlsCertificateError&gt;`

---

### <a id="certificateEntryAtChecked"></a>`certificateEntryAtChecked`

> 📄 `certificate.vx` L99-141

```vex
fn certificateEntryAtChecked(encoded: Span<u8>, list: &TlsWireSlice, wanted: usize): Result<TlsCertificateEntryView, TlsCertificateError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `encoded` | `Span&lt;u8&gt;` |  |
| `list` | `&amp;TlsWireSlice` |  |
| `wanted` | `usize` |  |

**Returns:** `Result&lt;TlsCertificateEntryView, TlsCertificateError&gt;`

---

### <a id="decodeServerCertificate"></a>`decodeServerCertificate` `🔓 export`

> 📄 `certificate.vx` L155-219

```vex
export fn decodeServerCertificate(encoded: Span<u8>): Result<TlsCertificateMessageView, TlsCertificateError>
```

Decodes one complete server Certificate Handshake message. The server

request context must be empty; the list is bounded to leaf plus eight
intermediates and all entry extension vectors are structurally validated.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `encoded` | `Span&lt;u8&gt;` |  |

**Returns:** `Result&lt;TlsCertificateMessageView, TlsCertificateError&gt;`

---

### <a id="decodeCertificateVerify"></a>`decodeCertificateVerify` `🔓 export`

> 📄 `certificate.vx` L227-252

```vex
export fn decodeCertificateVerify(encoded: Span<u8>): Result<TlsCertificateVerifyView, TlsCertificateError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `encoded` | `Span&lt;u8&gt;` |  |

**Returns:** `Result&lt;TlsCertificateVerifyView, TlsCertificateError&gt;`

---

### <a id="verifyServerCertificateSignature"></a>`verifyServerCertificateSignature` `🔓 export`

> 📄 `certificate.vx` L257-269

```vex
export fn verifyServerCertificateSignature(encoded: Span<u8>, transcript: &TlsTranscript, leafDer: Span<u8>): Result<bool, TlsCertificateError>
```

Verifies a server CertificateVerify against the transcript ending at the

complete Certificate message. The CertificateVerify message is not
appended here; the owning handshake state may commit it only after success.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `encoded` | `Span&lt;u8&gt;` |  |
| `transcript` | `&amp;TlsTranscript` |  |
| `leafDer` | `Span&lt;u8&gt;` |  |

**Returns:** `Result&lt;bool, TlsCertificateError&gt;`

---

### <a id="verifyServerCertificateSignatureWithKey"></a>`verifyServerCertificateSignatureWithKey` `🔓 export`

> 📄 `certificate.vx` L275-327

```vex
export fn verifyServerCertificateSignatureWithKey(encoded: Span<u8>, transcript: &TlsTranscript, publicKey: Span<u8>): Result<bool, TlsCertificateError>
```

Verifies server CertificateVerify with an exact Ed25519 public key already

authenticated by an owning certificate-path state. This avoids retaining a
borrowed DER span across handshake calls while keeping the RFC 8446 context
construction and signature checks in one source of truth.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `encoded` | `Span&lt;u8&gt;` |  |
| `transcript` | `&amp;TlsTranscript` |  |
| `publicKey` | `Span&lt;u8&gt;` |  |

**Returns:** `Result&lt;bool, TlsCertificateError&gt;`

---

### <a id="transportError"></a>`transportError`

> 📄 `transport.vx` L78-86

```vex
fn transportError(kind: TlsTransportErrorKind): TlsTransportError
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `kind` | `TlsTransportErrorKind` |  |

**Returns:** `TlsTransportError`

---

### <a id="transportRecordError"></a>`transportRecordError`

> 📄 `transport.vx` L88-96

```vex
fn transportRecordError(cause: TlsRecordError): TlsTransportError
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `cause` | `TlsRecordError` |  |

**Returns:** `TlsTransportError`

---

### <a id="transportAlertError"></a>`transportAlertError`

> 📄 `transport.vx` L98-106

```vex
fn transportAlertError(cause: TlsAlertError): TlsTransportError
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `cause` | `TlsAlertError` |  |

**Returns:** `TlsTransportError`

---

### <a id="transportScheduleError"></a>`transportScheduleError`

> 📄 `transport.vx` L108-116

```vex
fn transportScheduleError(cause: TlsKeyScheduleError): TlsTransportError
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `cause` | `TlsKeyScheduleError` |  |

**Returns:** `TlsTransportError`

---

### <a id="transportKeyUpdateError"></a>`transportKeyUpdateError`

> 📄 `transport.vx` L118-126

```vex
fn transportKeyUpdateError(cause: TlsKeyUpdateError): TlsTransportError
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `cause` | `TlsKeyUpdateError` |  |

**Returns:** `TlsTransportError`

---

### <a id="recordFailureEndsConnection"></a>`recordFailureEndsConnection`

> 📄 `transport.vx` L128-141

```vex
fn recordFailureEndsConnection(cause: TlsRecordError): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `cause` | `TlsRecordError` |  |

**Returns:** `bool`

---

### <a id="arraySpan"></a>`arraySpan`

> 📄 `transport.vx` L143-145

```vex
fn arraySpan(value: &[u8; N]): Span<u8>
```

**Type Parameters:**

- `const N: usize`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `&amp;[u8; N]` |  |

**Returns:** `Span&lt;u8&gt;`

---

### <a id="mutableArraySpan"></a>`mutableArraySpan`

> 📄 `transport.vx` L147-149

```vex
fn mutableArraySpan(value: &[u8; N]!): Span<u8>
```

**Type Parameters:**

- `const N: usize`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `&amp;[u8; N]!` |  |

**Returns:** `Span&lt;u8&gt;`

---

### <a id="stageNextGeneration"></a>`stageNextGeneration`

> 📄 `transport.vx` L327-353

```vex
fn stageNextGeneration(hash: TlsHashAlgorithm, cipherId: u16, digestLen: usize, currentSecret: Span<u8>): Result<TlsNextTrafficGeneration, TlsTransportError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `hash` | `TlsHashAlgorithm` |  |
| `cipherId` | `u16` |  |
| `digestLen` | `usize` |  |
| `currentSecret` | `Span&lt;u8&gt;` |  |

**Returns:** `Result&lt;TlsNextTrafficGeneration, TlsTransportError&gt;`

---

### <a id="x509Error"></a>`x509Error`

> 📄 `x509.vx` L56-58

```vex
fn x509Error(kind: X509ErrorKind, offset: usize): X509Error
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `kind` | `X509ErrorKind` |  |
| `offset` | `usize` |  |

**Returns:** `X509Error`

---

### <a id="bytesOf"></a>`bytesOf`

> 📄 `x509.vx` L60-62

```vex
fn bytesOf(value: &[u8; N]): Span<u8>
```

**Type Parameters:**

- `const N: usize`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `&amp;[u8; N]` |  |

**Returns:** `Span&lt;u8&gt;`

---

### <a id="rebaseSlice"></a>`rebaseSlice`

> 📄 `x509.vx` L64-66

```vex
fn rebaseSlice(value: DerSlice, base: usize): DerSlice
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `DerSlice` |  |
| `base` | `usize` |  |

**Returns:** `DerSlice`

---

### <a id="rebaseElement"></a>`rebaseElement`

> 📄 `x509.vx` L68-77

```vex
fn rebaseElement(value: DerElement, base: usize): DerElement
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `DerElement` |  |
| `base` | `usize` |  |

**Returns:** `DerElement`

---

### <a id="child"></a>`child`

> 📄 `x509.vx` L79-84

```vex
fn child(input: Span<u8>, parent: &DerElement, index: usize): Result<DerElement, X509Error>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `parent` | `&amp;DerElement` |  |
| `index` | `usize` |  |

**Returns:** `Result&lt;DerElement, X509Error&gt;`

---

### <a id="childCount"></a>`childCount`

> 📄 `x509.vx` L86-91

```vex
fn childCount(input: Span<u8>, parent: &DerElement): Result<usize, X509Error>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `parent` | `&amp;DerElement` |  |

**Returns:** `Result&lt;usize, X509Error&gt;`

---

### <a id="isEd25519Algorithm"></a>`isEd25519Algorithm`

> 📄 `x509.vx` L93-111

```vex
fn isEd25519Algorithm(input: Span<u8>, algorithm: &DerElement): Result<bool, X509Error>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `algorithm` | `&amp;DerElement` |  |

**Returns:** `Result&lt;bool, X509Error&gt;`

---

### <a id="explicitElement"></a>`explicitElement`

> 📄 `x509.vx` L113-127

```vex
fn explicitElement(input: Span<u8>, wrapper: &DerElement): Result<DerElement, X509Error>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `wrapper` | `&amp;DerElement` |  |

**Returns:** `Result&lt;DerElement, X509Error&gt;`

---

### <a id="x509Digit"></a>`x509Digit`

> 📄 `x509.vx` L379-385

```vex
fn x509Digit(input: Span<u8>, offset: usize): Result<i32, X509Error>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `offset` | `usize` |  |

**Returns:** `Result&lt;i32, X509Error&gt;`

---

### <a id="x509TwoDigits"></a>`x509TwoDigits`

> 📄 `x509.vx` L387-395

```vex
fn x509TwoDigits(input: Span<u8>, offset: usize): Result<i32, X509Error>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `offset` | `usize` |  |

**Returns:** `Result&lt;i32, X509Error&gt;`

---

### <a id="x509LeapYear"></a>`x509LeapYear`

> 📄 `x509.vx` L397-399

```vex
fn x509LeapYear(year: i32): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `year` | `i32` |  |

**Returns:** `bool`

---

### <a id="x509DaysInMonth"></a>`x509DaysInMonth`

> 📄 `x509.vx` L401-405

```vex
fn x509DaysInMonth(year: i32, month: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `year` | `i32` |  |
| `month` | `i32` |  |

**Returns:** `i32`

---

### <a id="x509DaysFromCivil"></a>`x509DaysFromCivil`

> 📄 `x509.vx` L407-417

```vex
fn x509DaysFromCivil(year: i32, month: i32, day: i32): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `year` | `i32` |  |
| `month` | `i32` |  |
| `day` | `i32` |  |

**Returns:** `i64`

---

### <a id="parseCertificateTime"></a>`parseCertificateTime`

> 📄 `x509.vx` L419-480

```vex
fn parseCertificateTime(input: Span<u8>, element: &DerElement): Result<i64, X509Error>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `element` | `&amp;DerElement` |  |

**Returns:** `Result&lt;i64, X509Error&gt;`

---

### <a id="extensionSequence"></a>`extensionSequence`

> 📄 `x509.vx` L534-544

```vex
fn extensionSequence(input: Span<u8>, certificate: &X509CertificateView): Result<DerElement, X509Error>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `certificate` | `&amp;X509CertificateView` |  |

**Returns:** `Result&lt;DerElement, X509Error&gt;`

---

### <a id="extensionAt"></a>`extensionAt`

> 📄 `x509.vx` L546-589

```vex
fn extensionAt(input: Span<u8>, sequence: &DerElement, index: usize): Result<X509ExtensionView, X509Error>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `sequence` | `&amp;DerElement` |  |
| `index` | `usize` |  |

**Returns:** `Result&lt;X509ExtensionView, X509Error&gt;`

---

### <a id="oidMatches"></a>`oidMatches`

> 📄 `x509.vx` L591-598

```vex
fn oidMatches(input: Span<u8>, oid: &DerElement, expected: &[u8; N]): Result<bool, X509Error>
```

**Type Parameters:**

- `const N: usize`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `oid` | `&amp;DerElement` |  |
| `expected` | `&amp;[u8; N]` |  |

**Returns:** `Result&lt;bool, X509Error&gt;`

---

### <a id="boundedPathLength"></a>`boundedPathLength`

> 📄 `x509.vx` L615-633

```vex
fn boundedPathLength(input: Span<u8>, magnitude: &DerSlice): Result<usize, X509Error>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `magnitude` | `&amp;DerSlice` |  |

**Returns:** `Result&lt;usize, X509Error&gt;`

---

### <a id="sameOid"></a>`sameOid`

> 📄 `x509.vx` L635-645

```vex
fn sameOid(input: Span<u8>, left: &DerElement, right: &DerElement): Result<bool, X509Error>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `left` | `&amp;DerElement` |  |
| `right` | `&amp;DerElement` |  |

**Returns:** `Result&lt;bool, X509Error&gt;`

---

### <a id="parseBasicConstraints"></a>`parseBasicConstraints`

> 📄 `x509.vx` L647-698

```vex
fn parseBasicConstraints(input: Span<u8>, extension: &X509ExtensionView): Result<(bool, bool, usize), X509Error>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `extension` | `&amp;X509ExtensionView` |  |

**Returns:** `Result&lt;(bool, bool, usize), X509Error&gt;`

---

### <a id="parseKeyUsage"></a>`parseKeyUsage`

> 📄 `x509.vx` L700-731

```vex
fn parseKeyUsage(input: Span<u8>, extension: &X509ExtensionView): Result<(bool, bool), X509Error>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `extension` | `&amp;X509ExtensionView` |  |

**Returns:** `Result&lt;(bool, bool), X509Error&gt;`

---

### <a id="parseExtendedKeyUsage"></a>`parseExtendedKeyUsage`

> 📄 `x509.vx` L733-776

```vex
fn parseExtendedKeyUsage(input: Span<u8>, extension: &X509ExtensionView): Result<bool, X509Error>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `extension` | `&amp;X509ExtensionView` |  |

**Returns:** `Result&lt;bool, X509Error&gt;`

---

### <a id="extensionPolicy"></a>`extensionPolicy`

> 📄 `x509.vx` L778-892

```vex
fn extensionPolicy(input: Span<u8>, certificate: &X509CertificateView): Result<X509ExtensionPolicy, X509Error>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `certificate` | `&amp;X509CertificateView` |  |

**Returns:** `Result&lt;X509ExtensionPolicy, X509Error&gt;`

---

### <a id="namesEqual"></a>`namesEqual`

> 📄 `x509.vx` L894-907

```vex
fn namesEqual(childInput: Span<u8>, childCertificate: &X509CertificateView, issuerInput: Span<u8>, issuerCertificate: &X509CertificateView): Result<bool, X509Error>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `childInput` | `Span&lt;u8&gt;` |  |
| `childCertificate` | `&amp;X509CertificateView` |  |
| `issuerInput` | `Span&lt;u8&gt;` |  |
| `issuerCertificate` | `&amp;X509CertificateView` |  |

**Returns:** `Result&lt;bool, X509Error&gt;`

---

### <a id="subjectNameIsEmpty"></a>`subjectNameIsEmpty`

> 📄 `x509.vx` L909-920

```vex
fn subjectNameIsEmpty(input: Span<u8>, certificate: &X509CertificateView): Result<bool, X509Error>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `certificate` | `&amp;X509CertificateView` |  |

**Returns:** `Result&lt;bool, X509Error&gt;`

---

### <a id="validateLeafPolicy"></a>`validateLeafPolicy`

> 📄 `x509.vx` L922-950

```vex
fn validateLeafPolicy(input: Span<u8>, certificate: &X509CertificateView, facts: &X509ExtensionPolicy, referenceDnsName: str, unixSeconds: i64): Result<bool, X509Error>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `certificate` | `&amp;X509CertificateView` |  |
| `facts` | `&amp;X509ExtensionPolicy` |  |
| `referenceDnsName` | `str` |  |
| `unixSeconds` | `i64` |  |

**Returns:** `Result&lt;bool, X509Error&gt;`

---

### <a id="validateAuthorityPolicy"></a>`validateAuthorityPolicy`

> 📄 `x509.vx` L952-980

```vex
fn validateAuthorityPolicy(input: Span<u8>, certificate: &X509CertificateView, facts: &X509ExtensionPolicy, caCertificatesBelow: usize, unixSeconds: i64): Result<bool, X509Error>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `certificate` | `&amp;X509CertificateView` |  |
| `facts` | `&amp;X509ExtensionPolicy` |  |
| `caCertificatesBelow` | `usize` |  |
| `unixSeconds` | `i64` |  |

**Returns:** `Result&lt;bool, X509Error&gt;`

---

### <a id="certificateIsSelfIssued"></a>`certificateIsSelfIssued`

> 📄 `x509.vx` L982-994

```vex
fn certificateIsSelfIssued(input: Span<u8>, certificate: &X509CertificateView): Result<bool, X509Error>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `certificate` | `&amp;X509CertificateView` |  |

**Returns:** `Result&lt;bool, X509Error&gt;`

---

### <a id="subjectAltNames"></a>`subjectAltNames`

> 📄 `x509.vx` L1078-1119

```vex
fn subjectAltNames(input: Span<u8>, certificate: &X509CertificateView): Result<DerElement, X509Error>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |
| `certificate` | `&amp;X509CertificateView` |  |

**Returns:** `Result&lt;DerElement, X509Error&gt;`

---

### <a id="sameHash"></a>`sameHash`

> 📄 `key_schedule.vx` L20-31

```vex
fn sameHash(left: TlsHashAlgorithm, right: TlsHashAlgorithm): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `left` | `TlsHashAlgorithm` |  |
| `right` | `TlsHashAlgorithm` |  |

**Returns:** `bool`

---

### <a id="rangesOverlap"></a>`rangesOverlap`

> 📄 `key_schedule.vx` L33-41

```vex
fn rangesOverlap(left: Span<u8>, right: Span<u8>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `left` | `Span&lt;u8&gt;` |  |
| `right` | `Span&lt;u8&gt;` |  |

**Returns:** `bool`

---

### <a id="exactArraySpan"></a>`exactArraySpan`

> 📄 `key_schedule.vx` L43-45

```vex
fn exactArraySpan(value: &[u8; 48], length: usize): Span<u8>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `&amp;[u8; 48]` |  |
| `length` | `usize` |  |

**Returns:** `Span&lt;u8&gt;`

---

### <a id="exactArraySpanMut"></a>`exactArraySpanMut`

> 📄 `key_schedule.vx` L47-49

```vex
fn exactArraySpanMut(value: &[u8; 48]!, length: usize): Span<u8>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `&amp;[u8; 48]!` |  |
| `length` | `usize` |  |

**Returns:** `Span&lt;u8&gt;`

---

### <a id="emptyTranscriptHash"></a>`emptyTranscriptHash`

> 📄 `key_schedule.vx` L51-69

```vex
fn emptyTranscriptHash(hash: TlsHashAlgorithm): [u8; 48]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `hash` | `TlsHashAlgorithm` |  |

**Returns:** `[u8; 48]`

---

### <a id="transcriptDigest"></a>`transcriptDigest`

> 📄 `key_schedule.vx` L71-87

```vex
fn transcriptDigest(hash: TlsHashAlgorithm, transcript: &TlsTranscript, output: &[u8; 48]!): Result<usize, TlsKeyScheduleError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `hash` | `TlsHashAlgorithm` |  |
| `transcript` | `&amp;TlsTranscript` |  |
| `output` | `&amp;[u8; 48]!` |  |

**Returns:** `Result&lt;usize, TlsKeyScheduleError&gt;`

---

### <a id="extractSecret"></a>`extractSecret`

> 📄 `key_schedule.vx` L89-108

```vex
fn extractSecret(hash: TlsHashAlgorithm, salt: Span<u8>, ikm: Span<u8>, output: Ptr<u8>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `hash` | `TlsHashAlgorithm` |  |
| `salt` | `Span&lt;u8&gt;` |  |
| `ikm` | `Span&lt;u8&gt;` |  |
| `output` | `Ptr&lt;u8&gt;` |  |

**Returns:** `bool`

---

### <a id="validateDualOutput"></a>`validateDualOutput`

> 📄 `key_schedule.vx` L110-126

```vex
fn validateDualOutput(digestLen: usize, first: Span<u8>, second: Span<u8>, input: Span<u8>): Result<bool, TlsKeyScheduleError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `digestLen` | `usize` |  |
| `first` | `Span&lt;u8&gt;` |  |
| `second` | `Span&lt;u8&gt;` |  |
| `input` | `Span&lt;u8&gt;` |  |

**Returns:** `Result&lt;bool, TlsKeyScheduleError&gt;`

---

### <a id="computeFinishedFromTranscript"></a>`computeFinishedFromTranscript` `🔓 export`

> 📄 `key_schedule.vx` L394-414

```vex
export fn computeFinishedFromTranscript(baseKey: Span<u8>, transcript: &TlsTranscript, out: &Span<u8>!): Result<usize, TlsKeyScheduleError>
```

Transcript-coupled Finished generation. The selected transcript hash is

authoritative; caller-provided hash identity cannot drift from it.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `baseKey` | `Span&lt;u8&gt;` |  |
| `transcript` | `&amp;TlsTranscript` |  |
| `out` | `&amp;Span&lt;u8&gt;!` |  |

**Returns:** `Result&lt;usize, TlsKeyScheduleError&gt;`

---

### <a id="verifyFinishedFromTranscript"></a>`verifyFinishedFromTranscript` `🔓 export`

> 📄 `key_schedule.vx` L418-438

```vex
export fn verifyFinishedFromTranscript(baseKey: Span<u8>, transcript: &TlsTranscript, received: Span<u8>): Result<bool, TlsKeyScheduleError>
```

Transcript-coupled constant-time Finished verification. Verify before

appending the peer Finished message to the transcript.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `baseKey` | `Span&lt;u8&gt;` |  |
| `transcript` | `&amp;TlsTranscript` |  |
| `received` | `Span&lt;u8&gt;` |  |

**Returns:** `Result&lt;bool, TlsKeyScheduleError&gt;`

---

### <a id="emptyFeedResult"></a>`emptyFeedResult`

> 📄 `assembler.vx` L60-68

```vex
fn emptyFeedResult(consumed: usize): TlsHandshakeFeedResult
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `consumed` | `usize` |  |

**Returns:** `TlsHandshakeFeedResult`

---

### <a id="completeFeedResult"></a>`completeFeedResult`

> 📄 `assembler.vx` L70-80

```vex
fn completeFeedResult(kind: TlsHandshakeFeedKind, consumed: usize, header: TlsHandshakeHeader): TlsHandshakeFeedResult
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `kind` | `TlsHandshakeFeedKind` |  |
| `consumed` | `usize` |  |
| `header` | `TlsHandshakeHeader` |  |

**Returns:** `TlsHandshakeFeedResult`

---

### <a id="copyBytes"></a>`copyBytes`

> 📄 `assembler.vx` L82-89

```vex
fn copyBytes(destination: Ptr<u8>, source: Ptr<u8>, length: usize)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `destination` | `Ptr&lt;u8&gt;` |  |
| `source` | `Ptr&lt;u8&gt;` |  |
| `length` | `usize` |  |

---

### <a id="spansOverlap"></a>`spansOverlap`

> 📄 `assembler.vx` L91-99

```vex
fn spansOverlap(left: Span<u8>, right: Span<u8>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `left` | `Span&lt;u8&gt;` |  |
| `right` | `Span&lt;u8&gt;` |  |

**Returns:** `bool`

---

### <a id="headerFromArray"></a>`headerFromArray`

> 📄 `assembler.vx` L101-109

```vex
fn headerFromArray(value: &[u8; 4]): TlsHandshakeHeader
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `&amp;[u8; 4]` |  |

**Returns:** `TlsHandshakeHeader`

---

### <a id="validateOutput"></a>`validateOutput`

> 📄 `assembler.vx` L216-225

```vex
fn validateOutput(output: Span<u8>, encodedLen: usize): Result<bool, TlsHandshakeAssemblerError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `output` | `Span&lt;u8&gt;` |  |
| `encodedLen` | `usize` |  |

**Returns:** `Result&lt;bool, TlsHandshakeAssemblerError&gt;`

---

### <a id="headerFromSpan"></a>`headerFromSpan`

> 📄 `assembler.vx` L227-239

```vex
fn headerFromSpan(input: Span<u8>): Result<TlsHandshakeHeader, TlsHandshakeAssemblerError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `Span&lt;u8&gt;` |  |

**Returns:** `Result&lt;TlsHandshakeHeader, TlsHandshakeAssemblerError&gt;`

---

---

*Generated by vex-doc v2.0 • 2026-08-25*
