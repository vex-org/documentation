# TLS

`std/tls` provides pure-Vex TLS 1.3 record protection, an ordered SHA-256/
SHA-384 secret schedule with Finished verification, bounded Hello codecs,
allocation-free Handshake reassembly, a bounded dual-hash transcript, and a
move-only no-PSK handshake owner. On the client path that owner binds
ClientHello through client Finished, including X25519, EncryptedExtensions,
an explicit-trust Ed25519 certificate path, CertificateVerify, server Finished
and application-secret release.
It does not depend on OpenSSL or BoringSSL.

The package intentionally does not expose a connected `TlsStream` yet. A
stream API will only be added after async record orchestration and independent
interoperability suites exist. KeyUpdate generation ownership is already part
of the application-traffic state machine.
TLS APIs never silently downgrade to plaintext.

## Certificate substrate

`X509CertificateView.parse` is an allocation-free RFC 8410 Ed25519 DER view.
It enforces absent algorithm parameters, exact SPKI/signature widths, verifies
signatures, and enumerates subjectAltName DNS entries. `matchesDnsName` applies
RFC 9525 case folding and whole-left-label wildcard rules, keeps IP-ID separate,
and never falls back to Common Name.

`X509TlsServerVerifier.verifyChain` accepts a leaf, up to eight intermediates
in leaf-to-anchor order, an explicit caller-trusted anchor, a DNS reference and
Unix time. It validates every time range, exact issuer binding, critical CA
BasicConstraints, path length, KeyUsage/EKU, duplicate and unknown critical
extensions, each Ed25519 signature and the leaf SAN identity. `verifyDirect`
is the zero-intermediate convenience path. Neither path allocates or consults
an implicit OS/libc root store.

The direct profile compares the leaf issuer and anchor subject as exact DER.
This is deliberately fail-closed: semantically equivalent alternate
DirectoryName encodings can be rejected until the general PKIX
name-normalization layer is implemented, but cannot create a false trust
match.

NameConstraints, PolicyMappings, PolicyConstraints and inhibitAnyPolicy alter
path-validation state even when their critical bit is clear. The bounded
profile rejects certificates carrying these extensions until their complete
RFC 5280 semantics are implemented; it never treats them as ignorable data.

This bounded profile does not yet claim general PKIX validation. DirectoryName
normalization, name constraints/policies, revocation inputs, P-256 and RSA
remain promotion gates.

## Certificate authentication messages

`decodeServerCertificate` exposes a zero-copy TLS 1.3 Certificate view with a
hard ceiling of one leaf plus eight intermediates. It requires the server
request context to be empty, validates every nested uint24/uint16 length and
per-entry extension vector, rejects duplicate entry extension identities, and
never copies certificate DER.

`verifyServerCertificateSignature` implements the low-level Ed25519 server
CertificateVerify context exactly: 64 space octets, the RFC 8446 server context
string, a zero separator and the transcript hash through Certificate. It also
requires Certificate to be the transcript's last committed message.

The owning path uses `acceptServerCertificateVerify`, which additionally
proves that Ed25519 appeared in the exact committed ClientHello and that the
key came from the already-authenticated server certificate path. Signature
verification completes before CertificateVerify enters the transcript.

## Authenticated no-PSK client handshake

`TlsX25519Negotiation` is the single move-only state authority for the
authenticated flight. Construct it from an exact 32-byte private scalar, copy
its public key with `publicKeyTo`, then feed complete encoded Handshake
messages in protocol order:

```vex
let! negotiation = TlsX25519Negotiation.withDefaultLimit(
    TlsHandshakeRole.Client, privateKey,
)?;

negotiation.commitClientHello(encodedClientHello)?;
let digestLen = negotiation.acceptServerHello(
    encodedServerHello, &clientHandshakeTraffic!, &serverHandshakeTraffic!,
)?;
negotiation.acceptEncryptedExtensions(encodedEncryptedExtensions)?;
negotiation.acceptServerCertificate(
    encodedCertificate, trustAnchorDer, referenceDnsName, unixSeconds,
)?;
negotiation.acceptServerCertificateVerify(encodedCertificateVerify)?;
negotiation.acceptServerFinished(
    encodedServerFinished, &clientApplicationTraffic!,
    &serverApplicationTraffic!,
)?;
negotiation.writeClientFinished(&encodedClientFinished!)?;
```

The owner validates the offered cipher, legacy-session echo, X25519 group and
role-specific public keys. It computes contributory ECDH before committing
ServerHello, selects SHA-256 or SHA-384 from the exact suite, derives both
handshake traffic secrets and erases the local scalar plus unused schedule.
Hello negotiation is available for both endpoint roles; the authenticated
certificate/Finished continuation is currently client-only.

EncryptedExtensions accepts only supported semantics: empty, SNI
acknowledgement, supported groups, and one ALPN value that appeared in the
committed offer. Unknown semantics fail closed. ALPN offer/selection bytes use
exact-size managed storage only when present; the common no-ALPN path is
zero-allocation. A selected ALPN is not observable until server Finished has
authenticated the complete server flight.

The certificate transition accepts an explicit caller trust anchor, DNS name
and Unix time. It validates up to eight ordered intermediates and retains only
the authenticated Ed25519 public key; borrowed DER never escapes the call.
CertificateVerify and server Finished are authenticated before transcript
mutation. Application-secret outputs are staged and released only after both
server Finished and the Master transition succeed. Client Finished then
commits the local flight, retires handshake traffic and locks the owner in
`Complete`.

A valid HelloRetryRequest returns `TlsX25519NegotiationError.HelloRetryRequest`
after cipher/session/group validation. It selects the suite hash, rewrites the
transcript to RFC `message_hash || HRR`, and locks the owner in
`HelloRetryRequested`; traffic outputs remain untouched and a later normal
ServerHello cannot bypass the second ClientHello.

The connection layer then encodes ClientHello2 and calls
`commitRetryClientHello`. If HRR selected X25519, a client supplies an exact
fresh 32-byte private scalar; server role supplies an empty span and captures
the corresponding peer share. For cookie-only HRR, both roles supply an empty
private span and ClientHello2 must repeat the original key-share extension
byte-for-byte:

```vex
match negotiation.acceptServerHello(
    encodedHelloRetry, &clientHandshakeTraffic!, &serverHandshakeTraffic!,
) {
    Result.Err(failure) => {
        if !failure.isKind(TlsX25519NegotiationError.HelloRetryRequest) {
            return Result.Err(failure);
        }
        negotiation.commitRetryClientHello(
            encodedClientHello2, freshClientPrivateKey,
        )?;
    },
    Result.Ok(_) => { /* normal ServerHello completed without retry */ },
}
```

CH2 must preserve the random, session, cipher list and ordered non-retry
extensions from CH1. Its cookie must exactly echo the bounded HRR cookie.
Failed invariant, cookie, key-share, overlap or transcript checks mutate
neither transcript nor key state. PSK negotiation is not claimed by this
owner. Post-handshake traffic state is owned separately by
`TlsApplicationTraffic` after application secrets exist.

## Alerts and application traffic ownership

`TlsAlert` provides canonical TLS 1.3 alert descriptions. `encodeTlsAlert`
emits exactly two bytes and permits warning level only for `close_notify` and
`user_canceled`. `decodeTlsAlert` retains the received level but `isFatal()`
still treats every error description as fatal, so a peer cannot downgrade an
error by labeling it warning.

`TlsApplicationTraffic.new(cipherId, sendSecret, receiveSecret)` derives and
owns both directional record states. `encryptApplicationData`,
`writeUserCanceled`, `writeCloseNotify`, `writeFatalAlert` and `readRecord`
expose typed results and events without a plaintext fallback. After
`writeUserCanceled`, application data is forbidden and orderly output must
continue with `close_notify`. A successful local close retires only the send
key; peer close retires only the receive key, allowing an orderly half-close.
Mutual close produces `TlsTransportState.Closed`.

Caller-owned short/overlapping output is retryable and does not consume a
sequence. Truncated wire records, authentication failures, malformed
authenticated alerts, fatal alerts and malformed post-handshake messages
retire both directions immediately.

## Post-handshake KeyUpdate

`writeKeyUpdate(request, output)` implements the RFC 8446 generation boundary:
the KeyUpdate message is encrypted with generation N, and only a successful
ciphertext commit installs the staged generation N+1 traffic secret, key and
IV. The next record therefore starts at sequence zero under the new key. A
short/overlapping output leaves the secret, key, generation and sequence
unchanged.

`readRecord` authenticates KeyUpdate fragments under the current receive key,
validates the exact five-byte Handshake message, then advances only the receive
generation. A record encrypted under N+1 is rejected unless the complete
old-key KeyUpdate boundary was observed first. `UpdateRequested` creates a
response obligation: application writes are blocked until
`writeKeyUpdate(UpdateNotRequested, ...)` succeeds. Crossed update requests
advance two independent generations, as required by RFC 8446.

Traffic secrets and record keys are move-only owner state and are securely
erased on replacement, directional retirement and Drop. The implementation is
allocation-free and exposes read-only `sendGeneration`, `receiveGeneration`
and `keyUpdateResponseRequired` observations for integration state machines.

## Low-level owning record state

`TlsCipherState.new(cipherId, key, iv)` accepts length-carrying `Span<u8>`
values and returns `Result<TlsCipherState, TlsRecordError>`. The key must be 16
or 32 bytes for the selected cipher and the IV must be exactly 12 bytes.

The resulting state is move-only. It copies and owns its key/IV, clears both
with `Mem.secureZero` on Drop, and keeps the sequence counter private. Normal
code can inspect the monotonic counter through `sequence()`, but cannot reset
it and accidentally reuse an AEAD nonce.

```vex
let keyBytes = [0u8; 16];
let ivBytes = [0u8; 12];
let key = unsafe { Span.of<u8>(&keyBytes as Ptr<u8>, 16) };
let iv = unsafe { Span.of<u8>(&ivBytes as Ptr<u8>, 12) };

let! tx = match TlsCipherState.new(CIPHER_AES_128_GCM_SHA256, key, iv) {
    Result.Ok(state) => state,
    Result.Err(failure) => { return Result.Err(failure); },
};
```

## Record API

`encryptRecord(contentType, plaintext, &output!)` returns
`Result<usize, TlsRecordError>`, where the successful value is the complete
encoded record length. `decryptRecord(record, &output!)` returns
`Result<TlsPlaintext, TlsRecordError>`; its `length` and `contentType` describe
the authenticated TLSInnerPlaintext. A valid empty application-data record is
therefore distinct from an error.

All public buffers are `Span<u8>`. The implementation checks header, record and
plaintext capacities before access. Encrypt and decrypt input/output aliasing
is rejected before mutation; there is no public raw-pointer-plus-length pair.

Record failures are allocation-free and classified as:

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

Authentication or inner-plaintext validation failure zeroes the candidate
plaintext and does not advance the receive sequence. Plaintext is limited to
16 KiB, record sizes are checked against TLS 1.3 limits, and sequence numbers
fail closed before wrapping.

## Key schedule

`hkdfExpandLabel(hash, secret, label, context, &output!)` implements the
[RFC 8446](https://www.rfc-editor.org/rfc/rfc8446.html) label encoding for
`TlsHashAlgorithm.Sha256` and `.Sha384`. The secret must be exactly the selected
digest length (32 or 48 bytes). Output length comes from the span; aliasing is
rejected before mutation and temporary state or failed output is securely
cleared. The bounded `HkdfLabel` is stack-resident, so schedule derivation
performs no heap allocation.

`deriveTrafficKeys(secret, cipherId, &key!, &iv!)` supports:

- `TLS_AES_128_GCM_SHA256`
- `TLS_AES_256_GCM_SHA384`
- `TLS_CHACHA20_POLY1305_SHA256`

Cipher-suite dispatch selects both AEAD key width and the exact HKDF hash.
SHA-384 reuses the SHA-512-family compression engine with its independent
FIPS 180-4 initial state; its HMAC path is checked against
[RFC 4231](https://www.rfc-editor.org/rfc/rfc4231.html). It is never
approximated with SHA-256.

### Ordered secret schedule

`TlsSecretSchedule.new(hash, psk)` owns the current raw secret and begins at
`TlsSecretStage.Early`. An empty PSK selects the RFC 8446 no-PSK value: one
digest-length block of zero octets. The only main transitions are:

```vex
let! schedule = TlsSecretSchedule.new(
    TlsHashAlgorithm.Sha256, Span.empty<u8>()
)?;

schedule.deriveHandshakeTraffic(
    sharedSecret, &transcript, &clientHandshake!, &serverHandshake!
)?;
// transcript now includes the authenticated server Finished
schedule.deriveApplicationTraffic(
    &transcript, &clientApplication!, &serverApplication!
)?;
```

This enforces `Early -> Handshake -> Master`. Repeating or skipping a stage,
using a transcript selected for another hash, passing overlapping outputs, or
passing a wrong-width digest fails before schedule/output mutation. Current
secrets, retired transition material, and transcript snapshots are securely
erased. The schedule itself is move-only and clears its secret on Drop.

`deriveSecret` exposes the RFC 8446 primitive for an already snapshotted exact
transcript hash. Exporter and resumption helpers remain withheld until the
complete handshake state machine can enforce their distinct transcript points.

### Finished

`computeFinishedFromTranscript(baseKey, &transcript, &output!)` derives the
Finished key and writes `verify_data`. `verifyFinishedFromTranscript` compares
peer data in constant time and returns `TlsKeyScheduleError.AuthenticationFailed`
on mismatch. Both use the transcript's selected hash as the authority.

Finished must be computed or verified before appending that Finished message
to the transcript. Application traffic secrets are derived after the server
Finished has been authenticated and appended.

## Hello codec and record fragmentation

`encodeClientHello` and `encodeServerHello` emit complete Handshake messages
into caller-owned spans. They do not call a random API: the 32-byte random,
session identifier, cipher suites, key shares and extension block are explicit
inputs. This keeps entropy policy at the connection boundary and prevents a
test-friendly deterministic fallback from leaking into production.

`decodeClientHello` and `decodeServerHello` validate the TLS 1.3 legacy fields,
uint16/uint24 lengths, duplicate extension identities, ClientHello PSK-last
ordering, bounded cipher/extension/group counts, nested SNI/ALPN/PSK vectors,
and key-share membership in `supported_groups`. ServerHello accepts only the
extensions legal in its normal or HelloRetryRequest context. Parsed variable-
length data is represented by `TlsWireSlice` offsets into the original encoded
message, so no borrowed pointer escapes its input lifetime. These contracts
follow [RFC 8446 ClientHello](https://www.rfc-editor.org/rfc/rfc8446.html#section-4.1.2),
[ServerHello](https://www.rfc-editor.org/rfc/rfc8446.html#section-4.1.3), and
[extension rules](https://www.rfc-editor.org/rfc/rfc8446.html#section-4.2).

TLS records may split one Handshake message or coalesce several. Call
`TlsHandshakeAssembler.feed(fragment, &storage!)` repeatedly and advance by
`result.consumed`. `CompleteDirect` means the message is already the first
`encodedLen` bytes of the current fragment and no copy occurred.
`CompleteBuffered` means a fragmented message is complete in caller-owned
storage. The storage base cannot change mid-message, and boundary guards reject
content-type interleaving or a record-key change while a message is pending, as
required by [RFC 8446 record fragmentation](https://www.rfc-editor.org/rfc/rfc8446.html#section-5.1).

## Bounded handshake transcript

`TlsTranscript.new(limit)` starts before cipher-suite negotiation and streams
each complete Handshake message into both SHA-256 and SHA-384. Once the suite
is known, `selectHash(hash)` commits the algorithm and securely erases the
unused state. `newForHash(hash, limit)` is available only for callers that
already know the suite.

```vex
let! transcript = match TlsTranscript.new(16 as usize * 1024 * 1024) {
    Result.Ok(value) => value,
    Result.Err(failure) => { return Result.Err(failure); },
};

transcript.appendMessage(HANDSHAKE_TYPE_CLIENT_HELLO, clientHelloBody)?;
transcript.selectHash(TlsHashAlgorithm.Sha384)?;

let digestBytes = [0u8; 48];
let! digest = unsafe { Span.of<u8>(&digestBytes as Ptr<u8>, 48) };
transcript.digestTo(&digest!)?;
```

`appendMessage` generates the authenticated one-byte type + uint24 body-length
header without allocating. `appendEncoded` accepts a complete encoded
Handshake message and rejects a length mismatch before state mutation. Record
headers are never part of the transcript, matching
[RFC 8446 section 4.4.1](https://www.rfc-editor.org/rfc/rfc8446.html#section-4.4.1).

Snapshots do not finalize the running hash. `digestFor` can read either
candidate before selection; after selection, the retired hash is unavailable.
`rewriteForHelloRetryRequest` performs the RFC synthetic `message_hash`
replacement exactly once and only after a sole ClientHello. The accepted-byte
counter remains monotonic through the rewrite, so retry processing cannot
reclaim resource budget. The default limit is 16 MiB and the hard ceiling is
64 MiB.

## Verified baseline

On 26 August 2026 the package has 59/59 passing tests at O0 and O3. Strict
full-package lint passes native macOS, Windows x86-64, Linux x86-64 and WASI.
SHA-256/SHA-384 label paths are checked against independent fixed vectors. RFC
8448's published handshake traffic secrets and fixed SHA-256/SHA-384 ordered-
transition/Finished vectors also pass. A real Ed25519 root/intermediate/leaf
fixture covers the complete owner flight plus wrong-order, replay and tamper
atomicity. HRR fixtures cover cookie-only replay, fresh-X25519 replay for both
roles, CH2 invariant/cookie rejection and a transactional 4096-byte cookie
ceiling.

Apple M2 Max, `vex test -O3 --bench lib/std/tls/tests`:

| Operation | Throughput |
| --- | ---: |
| ChaCha20-Poly1305 decrypt, 10 KiB | ~579 MB/s |
| ChaCha20-Poly1305 decrypt, 16 KiB | ~578 MB/s |
| AES-128-GCM decrypt, 16 KiB | ~1.71 GB/s |
| SHA-256 traffic key + IV derivation | ~415 ns |
| SHA-384 traffic key + IV derivation | ~6.48 µs |
| Ordered SHA-256 handshake-secret transition | ~1.26 µs |
| SHA-256 Finished generation | ~431 ns |
| Selected SHA-256 transcript append, 1 KiB | ~516 ns / 1.85 GB/s |
| Pre-negotiation dual transcript append, 1 KiB | ~6.76 µs / 145 MB/s |
| ClientHello decode, 152 bytes | ~67.5 ns / 2.10 GB/s |
| Aligned Handshake framing, 36 bytes | ~6.03 ns / 5.56 GB/s |
| Two-fragment Handshake reassembly, 1 KiB | ~28.4 ns / 33.7 GB/s |
| Full no-PSK X25519 client negotiation, SHA-256 | ~78.6 µs / 12.7K handshakes/s, 0 alloc |
| Full HRR/fresh-X25519 client negotiation, SHA-256 | ~117.5 µs / 8.51K handshakes/s, 0 alloc |
| Complete authenticated client flight, one intermediate | ~454 µs / 2.20K handshakes/s, 0 alloc |

Each benchmark iteration constructs a fresh owning sequence-zero state and
securely destroys it afterward. The production API does not expose a sequence
reset merely to make the benchmark convenient.

## Open production gates

- General PKIX name normalization/constraints/policies, revocation inputs and
  RSA/P-256. The current bounded Ed25519 path is intentionally fail-closed.
- Interoperability suites against independent TLS implementations.
- A fail-closed fiber-async `TlsStream` built on the completed state machine.
