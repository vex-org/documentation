# url

The `url` package provides an RFC 3986 URI-reference parser, relative-reference
resolution, strict percent decoding, form encoding and lossless query-component
handling. It is a generic URI package, not a WHATWG browser URL parser; it does
not perform IDNA conversion, DNS lookup or filesystem normalization.

## Typed parsing

```vex
import { URL, UrlError } from "url";

match URL.parse("https://user:pass@example.com:8080/docs?q=vex#top") {
    Ok(value) => {
        $println(value.scheme); // https
        $println(value.host);   // example.com
        $println(value.path);   // /docs
    }
    Err(_) => $println("invalid URI"),
}
```

`URL.parse(input)` returns `Result<URL, UrlError>`. The convenient `URL(input)`
constructor is non-throwing; inspect its `valid` and `parseError` fields before
using untrusted input. Ports outside `0..65535`, malformed escapes, invalid IP
literals, forbidden ASCII and malformed authorities are rejected.

`URL` exposes `scheme`, `userinfo`, `host`, `port`, `path`, `query`, `fragment`,
`raw`, `valid`, `hasAuthority`, `hasQuery`, `hasFragment` and `isIpv6`.

## Resolving references

```vex
let base = URL("https://example.com/a/b/index.html?q=1");
match base.resolve("../assets/app.js?v=2#load") {
    Ok(value) => $println(value.toString()),
    Err(_) => $panic("resolution failed"),
}
// https://example.com/a/assets/app.js?v=2#load
```

`resolve(reference)` implements RFC 3986 section 5.2. The base must be a valid
absolute URI. `resolveReference(base, reference)` is the one-shot equivalent.
Path merging and dot-segment removal are lexical; percent-encoded dots are not
treated as structural segments.

## Percent and form encoding

```vex
import { percentEncode, tryPercentDecode, formEncode, tryFormDecode } from "url";

percentEncode("a b+c"); // a%20b%2Bc
formEncode("a b+c");    // a+b%2Bc
```

- `tryPercentDecode` preserves `+` and returns typed decoding errors.
- `tryFormDecode` maps `+` to a space for form data.
- strict decoders reject malformed escapes and invalid/non-canonical UTF-8.
- `percentDecode` and `formDecode` are compatibility wrappers returning an
  empty string on failure; prefer the `try*` forms for untrusted data.
- legacy `urlDecode` retains form-style `+` behavior.

## Query components

`tryParseQuery(raw: str)` returns `Result<Vec<QueryParam>, UrlDecodeError>` and preserves
the distinction between `bare` and `empty=` through `QueryParam.hasValue`.
`buildQuery` uses form encoding. `parseQuery(raw: str)` is the compatibility wrapper and
returns an empty vector for malformed input. Parsing reserves the component
upper bound before decode. Building computes the exact encoded length, performs
one owned allocation, and writes the canonical `FormUrl` representation
directly into the final string.

Both query parsers borrow their input as `str`; passing an owned `string` does
not consume or implicitly clone it. Returned keys and values are independent
owned strings. URL query accessors can therefore be called repeatedly without
copying the complete query merely to start parsing it.

## Resource limits

URI parsing accepts at most 1 MiB of input. Query parsing has the same byte
limit plus a 16,384-component limit; typed APIs report `ResourceLimit` rather
than allocating indefinitely. URI reference resolution also rejects a final
serialized result over 1 MiB. These are request/control-plane limits, not a
streaming form-body API.

Useful URL methods include `toString`, `hostPort`, `tryQueryParams`,
`tryQueryParamValue`, `isScheme`, `isSecure`, `defaultPort` and `effectivePort`.

## Current validation

On 2026-09-06 the full package passed **45 tests at both O0 and O3**, including
repeated borrowed-input reuse, heap-backed decode results, and cleanup after a
partially decoded query fails. Cleanup tests require zero live-allocation and
byte growth after warming the same loop boundary: the first arena save creates
reusable runtime metadata, which straight-line warmup does not exercise. The
separate thread-cleanup regression verifies that cached metadata is released.
Strict lint and the benchmark figures below are earlier baselines, not new
measurements from this recovery run.
The RFC 3986 section
5.4 normal and abnormal resolution examples are regression tests. On the local
Apple M2 Max O3 baseline, simple/full parsing measures about 132/340 ns,
five-component query parse/build about 223/169 ns, URI serialization about
131 ns, and relative resolution about 591 ns. The benchmark runner uses a
bounded child allocation region and restores the caller route; `--benchmem`
therefore reports no process-heap traffic for temporary owned results. These
are local regression baselines, not portable performance promises.
