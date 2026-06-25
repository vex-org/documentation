# Project v0.0.0

## Overview

**Structs:** [`Cookie`](#Cookie) · [`CookiePair`](#CookiePair) · [`CorsConfig`](#CorsConfig) · [`RateLimitConfig`](#RateLimitConfig) · [`HeaderEntry`](#HeaderEntry) · [`RequestHeaders`](#RequestHeaders) · [`Headers`](#Headers) · [`AsyncServer`](#AsyncServer) · [`WsFrame`](#WsFrame) · [`WsMessage`](#WsMessage) · [`HeaderEntry`](#HeaderEntry) · [`ParserHeaders`](#ParserHeaders) · [`Scanner`](#Scanner) · [`H2Frame`](#H2Frame) · [`H2Settings`](#H2Settings) · [`GoAway`](#GoAway) · [`BodyReader`](#BodyReader) · [`StaticEntry`](#StaticEntry) · [`DynEntry`](#DynEntry) · [`DynamicTable`](#DynamicTable) · [`HpackHeader`](#HpackHeader) · [`FiberHeader`](#FiberHeader) · [`FiberParsedRequest`](#FiberParsedRequest) · [`ParserRequest`](#ParserRequest) · [`ChunkedDecoder`](#ChunkedDecoder) · [`Response`](#Response) · [`H2Stream`](#H2Stream) · [`StreamMap`](#StreamMap) · [`Server`](#Server) · [`ConnBuf`](#ConnBuf) · [`Connection`](#Connection) · [`MwEntry`](#MwEntry) · [`App`](#App) · [`Group`](#Group) · [`HandlerEntry`](#HandlerEntry) · [`Route`](#Route) · [`Router`](#Router) · [`Ctx`](#Ctx) · [`HandlerSlot`](#HandlerSlot) · [`ParamEntry`](#ParamEntry) · [`LocalEntry`](#LocalEntry) · [`RadixTree`](#RadixTree) · [`MatchResult`](#MatchResult) · [`ParamPair`](#ParamPair) · [`SseWriter`](#SseWriter) · [`ClientResponse`](#ClientResponse) · [`ClientRequest`](#ClientRequest) · [`Request`](#Request) · [`Response`](#Response) · [`WsFrame`](#WsFrame) · [`WsMessage`](#WsMessage) · [`WsConn`](#WsConn)

**Enums:** [`WsParseResult`](#WsParseResult) · [`HeaderParseResult`](#HeaderParseResult) · [`H2ParseResult`](#H2ParseResult) · [`BodyMode`](#BodyMode) · [`BodyResult`](#BodyResult) · [`HpackResult`](#HpackResult) · [`FiberRequestResult`](#FiberRequestResult) · [`Method`](#Method) · [`HttpVersion`](#HttpVersion) · [`RequestResult`](#RequestResult) · [`ChunkState`](#ChunkState) · [`ChunkResult`](#ChunkResult) · [`ResponseResult`](#ResponseResult) · [`HuffDecodeResult`](#HuffDecodeResult) · [`StreamState`](#StreamState) · [`StreamError`](#StreamError)

**Functions:** [`parseCookies`](#parseCookies) · [`trimStr`](#trimStr) · [`staticFiles`](#staticFiles) · [`strContainsDotDot`](#strContainsDotDot) · [`detectContentType`](#detectContentType) · [`buildRequestId`](#buildRequestId) · [`requestId`](#requestId) · [`requestIdWithHeader`](#requestIdWithHeader) · [`recover`](#recover) · [`cors`](#cors) · [`corsWithOrigin`](#corsWithOrigin) · [`rateLimiter`](#rateLimiter) · [`logger`](#logger) · [`headerEqCI`](#headerEqCI) · [`statusText`](#statusText) · [`parseFrame`](#parseFrame) · [`applyMask`](#applyMask) · [`encodedFrameSize`](#encodedFrameSize) · [`encodeFrameHeader`](#encodeFrameHeader) · [`parseHeaders`](#parseHeaders) · [`main`](#main) · [`test_body_content_length_exact`](#test_body_content_length_exact) · [`test_body_content_length_partial`](#test_body_content_length_partial) · [`test_body_content_length_excess`](#test_body_content_length_excess) · [`test_body_content_length_empty`](#test_body_content_length_empty) · [`test_body_none_mode`](#test_body_none_mode) · [`test_body_until_close`](#test_body_until_close) · [`test_body_chunked_mode`](#test_body_chunked_mode) · [`test_body_reset`](#test_body_reset) · [`test_body_already_done`](#test_body_already_done) · [`wb`](#wb) · [`mkstr`](#mkstr) · [`copyStr`](#copyStr) · [`test_parser_bench_sanity`](#test_parser_bench_sanity) · [`bench_parse_get_simple`](#bench_parse_get_simple) · [`bench_parse_get_with_headers`](#bench_parse_get_with_headers) · [`bench_parse_post_with_body`](#bench_parse_post_with_body) · [`bench_parse_response_200`](#bench_parse_response_200) · [`bench_parse_response_with_many_headers`](#bench_parse_response_with_many_headers) · [`bench_parseDecimal`](#bench_parseDecimal) · [`bench_parseHex`](#bench_parseHex) · [`bench_eqCaseInsensitive`](#bench_eqCaseInsensitive) · [`bench_ws_parse_text_frame`](#bench_ws_parse_text_frame) · [`bench_h2_parse_data_frame`](#bench_h2_parse_data_frame) · [`bench_chunked_decode_single_chunk`](#bench_chunked_decode_single_chunk) · [`bench_body_reader_chunked_feed`](#bench_body_reader_chunked_feed) · [`bench_hpack_decode_indexed_header`](#bench_hpack_decode_indexed_header) · [`bench_hpack_decode_header_block_small`](#bench_hpack_decode_header_block_small) · [`bench_huffman_code_lookup`](#bench_huffman_code_lookup) · [`bench_huffman_encoded_length`](#bench_huffman_encoded_length) · [`main`](#main) · [`test_chunked_single_chunk`](#test_chunked_single_chunk) · [`test_chunked_two_chunks`](#test_chunked_two_chunks) · [`test_chunked_hex_size`](#test_chunked_hex_size) · [`test_chunked_empty_body`](#test_chunked_empty_body) · [`test_chunked_with_extension`](#test_chunked_with_extension) · [`test_chunked_uppercase_hex`](#test_chunked_uppercase_hex) · [`test_chunked_is_done`](#test_chunked_is_done) · [`test_chunked_reset`](#test_chunked_reset) · [`test_chunked_need_more`](#test_chunked_need_more) · [`test_chunked_invalid_size`](#test_chunked_invalid_size) · [`wb`](#wb) · [`mkstr`](#mkstr) · [`copyStr`](#copyStr) · [`writeH2Header`](#writeH2Header) · [`test_h2_parse_data_frame`](#test_h2_parse_data_frame) · [`test_h2_parse_headers_frame`](#test_h2_parse_headers_frame) · [`test_h2_parse_settings_frame`](#test_h2_parse_settings_frame) · [`test_h2_parse_settings_ack`](#test_h2_parse_settings_ack) · [`test_h2_parse_ping_frame`](#test_h2_parse_ping_frame) · [`test_h2_parse_goaway_frame`](#test_h2_parse_goaway_frame) · [`test_h2_parse_window_update`](#test_h2_parse_window_update) · [`test_h2_need_more_short`](#test_h2_need_more_short) · [`test_h2_need_more_empty`](#test_h2_need_more_empty) · [`test_h2_frame_flags`](#test_h2_frame_flags) · [`test_h2_settings_defaults`](#test_h2_settings_defaults) · [`test_h2_parse_settings_payload`](#test_h2_parse_settings_payload) · [`test_h2_parse_settings_invalid_len`](#test_h2_parse_settings_invalid_len) · [`test_h2_parse_goaway_payload`](#test_h2_parse_goaway_payload) · [`test_h2_parse_goaway_with_debug`](#test_h2_parse_goaway_with_debug) · [`test_h2_frame_header_size`](#test_h2_frame_header_size) · [`test_h2_frame_types`](#test_h2_frame_types) · [`test_h2_error_codes`](#test_h2_error_codes) · [`wb`](#wb) · [`mkstr`](#mkstr) · [`copyStr`](#copyStr) · [`test_ws_parse_text_frame`](#test_ws_parse_text_frame) · [`test_ws_parse_binary_frame`](#test_ws_parse_binary_frame) · [`test_ws_parse_close_frame`](#test_ws_parse_close_frame) · [`test_ws_parse_ping_frame`](#test_ws_parse_ping_frame) · [`test_ws_parse_pong_frame`](#test_ws_parse_pong_frame) · [`test_ws_parse_masked_frame`](#test_ws_parse_masked_frame) · [`test_ws_parse_16bit_length`](#test_ws_parse_16bit_length) · [`test_ws_need_more_short`](#test_ws_need_more_short) · [`test_ws_need_more_empty`](#test_ws_need_more_empty) · [`test_ws_control_frame_too_large`](#test_ws_control_frame_too_large) · [`test_ws_frame_methods`](#test_ws_frame_methods) · [`test_ws_rsv_bits`](#test_ws_rsv_bits) · [`test_ws_encoded_frame_size`](#test_ws_encoded_frame_size) · [`test_ws_message_single`](#test_ws_message_single) · [`test_ws_message_reset`](#test_ws_message_reset) · [`test_ws_close_codes`](#test_ws_close_codes) · [`wb`](#wb) · [`mkstr`](#mkstr) · [`copyStr`](#copyStr) · [`test_parser_bench_sanity`](#test_parser_bench_sanity) · [`bench_parse_get_simple`](#bench_parse_get_simple) · [`bench_parse_get_with_headers`](#bench_parse_get_with_headers) · [`bench_parse_post_with_body`](#bench_parse_post_with_body) · [`bench_parse_response_200`](#bench_parse_response_200) · [`bench_parse_response_with_many_headers`](#bench_parse_response_with_many_headers) · [`bench_parseDecimal`](#bench_parseDecimal) · [`bench_parseHex`](#bench_parseHex) · [`bench_eqCaseInsensitive`](#bench_eqCaseInsensitive) · [`bench_ws_parse_text_frame`](#bench_ws_parse_text_frame) · [`bench_h2_parse_data_frame`](#bench_h2_parse_data_frame) · [`bench_chunked_decode_single_chunk`](#bench_chunked_decode_single_chunk) · [`bench_body_reader_chunked_feed`](#bench_body_reader_chunked_feed) · [`bench_hpack_decode_indexed_header`](#bench_hpack_decode_indexed_header) · [`bench_hpack_decode_header_block_small`](#bench_hpack_decode_header_block_small) · [`bench_huffman_code_lookup`](#bench_huffman_code_lookup) · [`bench_huffman_encoded_length`](#bench_huffman_encoded_length) · [`test_get_request`](#test_get_request) · [`test_post_request_with_body`](#test_post_request_with_body) · [`test_incomplete_request`](#test_incomplete_request) · [`test_multiple_headers`](#test_multiple_headers) · [`test_response_200`](#test_response_200) · [`test_response_404`](#test_response_404) · [`test_response_redirect`](#test_response_redirect) · [`test_response_500`](#test_response_500) · [`test_parseDecimal_basic`](#test_parseDecimal_basic) · [`test_parseDecimal_zero`](#test_parseDecimal_zero) · [`test_parseDecimal_empty`](#test_parseDecimal_empty) · [`test_parseDecimal_non_digit`](#test_parseDecimal_non_digit) · [`test_parseDecimal_null_coalesce`](#test_parseDecimal_null_coalesce) · [`test_parseHex_ff`](#test_parseHex_ff) · [`test_parseHex_lowercase`](#test_parseHex_lowercase) · [`test_parseHex_zero`](#test_parseHex_zero) · [`test_parseHex_chunked_size`](#test_parseHex_chunked_size) · [`test_eqCaseInsensitive_match`](#test_eqCaseInsensitive_match) · [`test_eqCaseInsensitive_mismatch`](#test_eqCaseInsensitive_mismatch) · [`test_websocket_upgrade`](#test_websocket_upgrade) · [`test_empty_request`](#test_empty_request) · [`test_chunked_header_detection`](#test_chunked_header_detection) · [`test_connection_close`](#test_connection_close) · [`test_head_method`](#test_head_method) · [`test_options_method`](#test_options_method) · [`wb`](#wb) · [`mkstr`](#mkstr) · [`copyStr`](#copyStr) · [`test_hpack_decode_integer_small`](#test_hpack_decode_integer_small) · [`test_hpack_decode_integer_max_prefix`](#test_hpack_decode_integer_max_prefix) · [`test_hpack_decode_integer_multibyte`](#test_hpack_decode_integer_multibyte) · [`test_hpack_decode_integer_7bit`](#test_hpack_decode_integer_7bit) · [`test_hpack_decode_integer_empty`](#test_hpack_decode_integer_empty) · [`test_hpack_encode_integer_small`](#test_hpack_encode_integer_small) · [`test_hpack_encode_integer_multibyte`](#test_hpack_encode_integer_multibyte) · [`test_hpack_dynamic_table_new`](#test_hpack_dynamic_table_new) · [`test_hpack_dynamic_table_add`](#test_hpack_dynamic_table_add) · [`test_hpack_dynamic_table_eviction`](#test_hpack_dynamic_table_eviction) · [`test_hpack_dynamic_table_oversized_entry`](#test_hpack_dynamic_table_oversized_entry) · [`test_hpack_dynamic_table_set_max_size`](#test_hpack_dynamic_table_set_max_size) · [`test_hpack_static_table_authority`](#test_hpack_static_table_authority) · [`test_hpack_static_table_method_get`](#test_hpack_static_table_method_get) · [`test_hpack_static_table_method_post`](#test_hpack_static_table_method_post) · [`test_hpack_static_table_path`](#test_hpack_static_table_path) · [`test_hpack_static_table_status_200`](#test_hpack_static_table_status_200) · [`test_hpack_static_table_out_of_range`](#test_hpack_static_table_out_of_range) · [`test_hpack_decode_indexed_header`](#test_hpack_decode_indexed_header) · [`test_hpack_decode_indexed_status_200`](#test_hpack_decode_indexed_status_200) · [`test_hpack_decode_literal_with_indexing`](#test_hpack_decode_literal_with_indexing) · [`test_hpack_decode_literal_new_name`](#test_hpack_decode_literal_new_name) · [`test_hpack_decode_literal_without_indexing`](#test_hpack_decode_literal_without_indexing) · [`test_hpack_decode_table_size_update`](#test_hpack_decode_table_size_update) · [`test_hpack_decode_empty_input`](#test_hpack_decode_empty_input) · [`test_hpack_decode_header_block`](#test_hpack_decode_header_block) · [`test_hpack_decode_header_block_empty`](#test_hpack_decode_header_block_empty) · [`eqCaseInsensitive`](#eqCaseInsensitive) · [`parseDecimal`](#parseDecimal) · [`parseHex`](#parseHex) · [`parseH2Frame`](#parseH2Frame) · [`parseSettings`](#parseSettings) · [`parseGoAway`](#parseGoAway) · [`encodeH2FrameHeader`](#encodeH2FrameHeader) · [`encodeSettings`](#encodeSettings) · [`writeSetting`](#writeSetting) · [`encodePing`](#encodePing) · [`encodeWindowUpdate`](#encodeWindowUpdate) · [`encodeRstStream`](#encodeRstStream) · [`encodeGoAway`](#encodeGoAway) · [`detectBodyMode`](#detectBodyMode) · [`getStaticEntry`](#getStaticEntry) · [`decodeInteger`](#decodeInteger) · [`encodeInteger`](#encodeInteger) · [`decodeHeader`](#decodeHeader) · [`decodeLiteral`](#decodeLiteral) · [`decodeHeaderBlock`](#decodeHeaderBlock) · [`parseFiberRequestInto`](#parseFiberRequestInto) · [`parseFiberRequest`](#parseFiberRequest) · [`isHttp10`](#isHttp10) · [`parseMethod`](#parseMethod) · [`parseVersion`](#parseVersion) · [`parseRequest`](#parseRequest) · [`parseRequestBuffer`](#parseRequestBuffer) · [`parseResponse`](#parseResponse) · [`huffmanCode`](#huffmanCode) · [`huffmanEncodedLength`](#huffmanEncodedLength) · [`huffmanEncode`](#huffmanEncode) · [`huffmanDecode`](#huffmanDecode) · [`matchHuffmanSymbol`](#matchHuffmanSymbol) · [`flushAcceptedBatch`](#flushAcceptedBatch) · [`acceptBatch`](#acceptBatch) · [`decodeHpackHeaders`](#decodeHpackHeaders) · [`h2FindState`](#h2FindState) · [`h1FindState`](#h1FindState) · [`h1RemoveState`](#h1RemoveState) · [`h2RemoveState`](#h2RemoveState) · [`isH2PrefaceBytes`](#isH2PrefaceBytes) · [`isH2PrefacePrefix`](#isH2PrefacePrefix) · [`isH2PrefaceString`](#isH2PrefaceString) · [`h2SendSettings`](#h2SendSettings) · [`h2SendSettingsAck`](#h2SendSettingsAck) · [`h2SendPingAck`](#h2SendPingAck) · [`h2SendAll`](#h2SendAll) · [`isNonBlockingRetry`](#isNonBlockingRetry) · [`reapClosedConnections`](#reapClosedConnections) · [`closeTrackedConnection`](#closeTrackedConnection) · [`activeRemoveFd`](#activeRemoveFd) · [`closeListenFds`](#closeListenFds) · [`defaultNotFound`](#defaultNotFound) · [`methodToId`](#methodToId) · [`cacheRouteParamNames`](#cacheRouteParamNames) · [`cachedParamName`](#cachedParamName) · [`injectRouteMiddleware`](#injectRouteMiddleware) · [`matchRoute`](#matchRoute) · [`h2StatusText`](#h2StatusText) · [`h2WriteFrameHeader`](#h2WriteFrameHeader) · [`h2WriteLiteralHeader`](#h2WriteLiteralHeader) · [`h2SendResponse`](#h2SendResponse) · [`h2SendAll`](#h2SendAll) · [`parseQueryString`](#parseQueryString) · [`strContains`](#strContains) · [`trimWhitespace`](#trimWhitespace) · [`jsonGetString`](#jsonGetString) · [`mimeFromExt`](#mimeFromExt) · [`strContainsDotDot`](#strContainsDotDot) · [`getExtension`](#getExtension) · [`cloneMiddlewareRange`](#cloneMiddlewareRange) · [`ensurePattern`](#ensurePattern) · [`assignMatch`](#assignMatch) · [`matchNode`](#matchNode) · [`matchChildrenOfKind`](#matchChildrenOfKind) · [`httpGet`](#httpGet) · [`httpPost`](#httpPost) · [`httpPostJSON`](#httpPostJSON) · [`httpPut`](#httpPut) · [`httpDelete`](#httpDelete) · [`httpPatch`](#httpPatch) · [`readResponse`](#readResponse) · [`parseRequestFromSocket`](#parseRequestFromSocket) · [`parseRequest`](#parseRequest) · [`parseRequestAsync`](#parseRequestAsync) · [`respondText`](#respondText) · [`respondJSON`](#respondJSON) · [`respondError`](#respondError) · [`respondRedirect`](#respondRedirect) · [`isWebSocketUpgrade`](#isWebSocketUpgrade)

**Constants:** [`STATUS_OK`](#STATUS_OK) · [`STATUS_CREATED`](#STATUS_CREATED) · [`STATUS_ACCEPTED`](#STATUS_ACCEPTED) · [`STATUS_NO_CONTENT`](#STATUS_NO_CONTENT) · [`STATUS_MOVED_PERMANENTLY`](#STATUS_MOVED_PERMANENTLY) · [`STATUS_FOUND`](#STATUS_FOUND) · [`STATUS_NOT_MODIFIED`](#STATUS_NOT_MODIFIED) · [`STATUS_TEMPORARY_REDIRECT`](#STATUS_TEMPORARY_REDIRECT) · [`STATUS_PERMANENT_REDIRECT`](#STATUS_PERMANENT_REDIRECT) · [`STATUS_BAD_REQUEST`](#STATUS_BAD_REQUEST) · [`STATUS_UNAUTHORIZED`](#STATUS_UNAUTHORIZED) · [`STATUS_FORBIDDEN`](#STATUS_FORBIDDEN) · [`STATUS_NOT_FOUND`](#STATUS_NOT_FOUND) · [`STATUS_METHOD_NOT_ALLOWED`](#STATUS_METHOD_NOT_ALLOWED) · [`STATUS_CONFLICT`](#STATUS_CONFLICT) · [`STATUS_GONE`](#STATUS_GONE) · [`STATUS_UNPROCESSABLE_ENTITY`](#STATUS_UNPROCESSABLE_ENTITY) · [`STATUS_TOO_MANY_REQUESTS`](#STATUS_TOO_MANY_REQUESTS) · [`STATUS_INTERNAL_SERVER_ERROR`](#STATUS_INTERNAL_SERVER_ERROR) · [`STATUS_NOT_IMPLEMENTED`](#STATUS_NOT_IMPLEMENTED) · [`STATUS_BAD_GATEWAY`](#STATUS_BAD_GATEWAY) · [`STATUS_SERVICE_UNAVAILABLE`](#STATUS_SERVICE_UNAVAILABLE) · [`STATUS_GATEWAY_TIMEOUT`](#STATUS_GATEWAY_TIMEOUT) · [`OP_CONTINUATION`](#OP_CONTINUATION) · [`OP_TEXT`](#OP_TEXT) · [`OP_BINARY`](#OP_BINARY) · [`OP_CLOSE`](#OP_CLOSE) · [`OP_PING`](#OP_PING) · [`OP_PONG`](#OP_PONG) · [`CLOSE_NORMAL`](#CLOSE_NORMAL) · [`CLOSE_GOING_AWAY`](#CLOSE_GOING_AWAY) · [`CLOSE_PROTOCOL_ERROR`](#CLOSE_PROTOCOL_ERROR) · [`CLOSE_UNSUPPORTED_DATA`](#CLOSE_UNSUPPORTED_DATA) · [`CLOSE_NO_STATUS`](#CLOSE_NO_STATUS) · [`CLOSE_ABNORMAL`](#CLOSE_ABNORMAL) · [`CLOSE_INVALID_PAYLOAD`](#CLOSE_INVALID_PAYLOAD) · [`CLOSE_POLICY_VIOLATION`](#CLOSE_POLICY_VIOLATION) · [`CLOSE_MESSAGE_TOO_BIG`](#CLOSE_MESSAGE_TOO_BIG) · [`CLOSE_MANDATORY_EXT`](#CLOSE_MANDATORY_EXT) · [`CLOSE_INTERNAL_ERROR`](#CLOSE_INTERNAL_ERROR) · [`MAX_HEADERS`](#MAX_HEADERS) · [`FRAME_DATA`](#FRAME_DATA) · [`FRAME_HEADERS`](#FRAME_HEADERS) · [`FRAME_PRIORITY`](#FRAME_PRIORITY) · [`FRAME_RST_STREAM`](#FRAME_RST_STREAM) · [`FRAME_SETTINGS`](#FRAME_SETTINGS) · [`FRAME_PUSH_PROMISE`](#FRAME_PUSH_PROMISE) · [`FRAME_PING`](#FRAME_PING) · [`FRAME_GOAWAY`](#FRAME_GOAWAY) · [`FRAME_WINDOW_UPDATE`](#FRAME_WINDOW_UPDATE) · [`FRAME_CONTINUATION`](#FRAME_CONTINUATION) · [`FLAG_END_STREAM`](#FLAG_END_STREAM) · [`FLAG_ACK`](#FLAG_ACK) · [`FLAG_END_HEADERS`](#FLAG_END_HEADERS) · [`FLAG_PADDED`](#FLAG_PADDED) · [`FLAG_PRIORITY_F`](#FLAG_PRIORITY_F) · [`ERR_NO_ERROR`](#ERR_NO_ERROR) · [`ERR_PROTOCOL_ERROR`](#ERR_PROTOCOL_ERROR) · [`ERR_INTERNAL_ERROR`](#ERR_INTERNAL_ERROR) · [`ERR_FLOW_CONTROL_ERROR`](#ERR_FLOW_CONTROL_ERROR) · [`ERR_SETTINGS_TIMEOUT`](#ERR_SETTINGS_TIMEOUT) · [`ERR_STREAM_CLOSED`](#ERR_STREAM_CLOSED) · [`ERR_FRAME_SIZE_ERROR`](#ERR_FRAME_SIZE_ERROR) · [`ERR_REFUSED_STREAM`](#ERR_REFUSED_STREAM) · [`ERR_CANCEL`](#ERR_CANCEL) · [`ERR_COMPRESSION_ERROR`](#ERR_COMPRESSION_ERROR) · [`ERR_CONNECT_ERROR`](#ERR_CONNECT_ERROR) · [`ERR_ENHANCE_YOUR_CALM`](#ERR_ENHANCE_YOUR_CALM) · [`ERR_INADEQUATE_SECURITY`](#ERR_INADEQUATE_SECURITY) · [`ERR_HTTP_1_1_REQUIRED`](#ERR_HTTP_1_1_REQUIRED) · [`H2_FRAME_HEADER_SIZE`](#H2_FRAME_HEADER_SIZE) · [`STATIC_TABLE_SIZE`](#STATIC_TABLE_SIZE) · [`INIT_CAP`](#INIT_CAP) · [`MAX_BUF`](#MAX_BUF) · [`OFFSET_SHIFT_4`](#OFFSET_SHIFT_4) · [`NODE_STATIC`](#NODE_STATIC) · [`NODE_PARAM`](#NODE_PARAM) · [`NODE_CATCH`](#NODE_CATCH) · [`NO_PARENT`](#NO_PARENT) · [`WS_TEXT`](#WS_TEXT) · [`WS_BINARY`](#WS_BINARY) · [`WS_CLOSE`](#WS_CLOSE) · [`WS_PING`](#WS_PING) · [`WS_PONG`](#WS_PONG)

**Type Aliases:** [`AsyncRequestHandler`](#AsyncRequestHandler) · [`RequestHandler`](#RequestHandler) · [`Handler`](#Handler)

## Constants

### <a id="STATUS_OK"></a>`STATUS_OK` `🔓 export`

&gt; 📄 `status.vx` L6-6

```vex
export const STATUS_OK: i32=200;
```

**Returns:** `i32=200;`

---

### <a id="STATUS_CREATED"></a>`STATUS_CREATED` `🔓 export`

&gt; 📄 `status.vx` L7-7

```vex
export const STATUS_CREATED: i32=201;
```

**Returns:** `i32=201;`

---

### <a id="STATUS_ACCEPTED"></a>`STATUS_ACCEPTED` `🔓 export`

&gt; 📄 `status.vx` L8-8

```vex
export const STATUS_ACCEPTED: i32=202;
```

**Returns:** `i32=202;`

---

### <a id="STATUS_NO_CONTENT"></a>`STATUS_NO_CONTENT` `🔓 export`

&gt; 📄 `status.vx` L9-9

```vex
export const STATUS_NO_CONTENT: i32=204;
```

**Returns:** `i32=204;`

---

### <a id="STATUS_MOVED_PERMANENTLY"></a>`STATUS_MOVED_PERMANENTLY` `🔓 export`

&gt; 📄 `status.vx` L12-12

```vex
export const STATUS_MOVED_PERMANENTLY: i32=301;
```

**Returns:** `i32=301;`

---

### <a id="STATUS_FOUND"></a>`STATUS_FOUND` `🔓 export`

&gt; 📄 `status.vx` L13-13

```vex
export const STATUS_FOUND: i32=302;
```

**Returns:** `i32=302;`

---

### <a id="STATUS_NOT_MODIFIED"></a>`STATUS_NOT_MODIFIED` `🔓 export`

&gt; 📄 `status.vx` L14-14

```vex
export const STATUS_NOT_MODIFIED: i32=304;
```

**Returns:** `i32=304;`

---

### <a id="STATUS_TEMPORARY_REDIRECT"></a>`STATUS_TEMPORARY_REDIRECT` `🔓 export`

&gt; 📄 `status.vx` L15-15

```vex
export const STATUS_TEMPORARY_REDIRECT: i32=307;
```

**Returns:** `i32=307;`

---

### <a id="STATUS_PERMANENT_REDIRECT"></a>`STATUS_PERMANENT_REDIRECT` `🔓 export`

&gt; 📄 `status.vx` L16-16

```vex
export const STATUS_PERMANENT_REDIRECT: i32=308;
```

**Returns:** `i32=308;`

---

### <a id="STATUS_BAD_REQUEST"></a>`STATUS_BAD_REQUEST` `🔓 export`

&gt; 📄 `status.vx` L19-19

```vex
export const STATUS_BAD_REQUEST: i32=400;
```

**Returns:** `i32=400;`

---

### <a id="STATUS_UNAUTHORIZED"></a>`STATUS_UNAUTHORIZED` `🔓 export`

&gt; 📄 `status.vx` L20-20

```vex
export const STATUS_UNAUTHORIZED: i32=401;
```

**Returns:** `i32=401;`

---

### <a id="STATUS_FORBIDDEN"></a>`STATUS_FORBIDDEN` `🔓 export`

&gt; 📄 `status.vx` L21-21

```vex
export const STATUS_FORBIDDEN: i32=403;
```

**Returns:** `i32=403;`

---

### <a id="STATUS_NOT_FOUND"></a>`STATUS_NOT_FOUND` `🔓 export`

&gt; 📄 `status.vx` L22-22

```vex
export const STATUS_NOT_FOUND: i32=404;
```

**Returns:** `i32=404;`

---

### <a id="STATUS_METHOD_NOT_ALLOWED"></a>`STATUS_METHOD_NOT_ALLOWED` `🔓 export`

&gt; 📄 `status.vx` L23-23

```vex
export const STATUS_METHOD_NOT_ALLOWED: i32=405;
```

**Returns:** `i32=405;`

---

### <a id="STATUS_CONFLICT"></a>`STATUS_CONFLICT` `🔓 export`

&gt; 📄 `status.vx` L24-24

```vex
export const STATUS_CONFLICT: i32=409;
```

**Returns:** `i32=409;`

---

### <a id="STATUS_GONE"></a>`STATUS_GONE` `🔓 export`

&gt; 📄 `status.vx` L25-25

```vex
export const STATUS_GONE: i32=410;
```

**Returns:** `i32=410;`

---

### <a id="STATUS_UNPROCESSABLE_ENTITY"></a>`STATUS_UNPROCESSABLE_ENTITY` `🔓 export`

&gt; 📄 `status.vx` L26-26

```vex
export const STATUS_UNPROCESSABLE_ENTITY: i32=422;
```

**Returns:** `i32=422;`

---

### <a id="STATUS_TOO_MANY_REQUESTS"></a>`STATUS_TOO_MANY_REQUESTS` `🔓 export`

&gt; 📄 `status.vx` L27-27

```vex
export const STATUS_TOO_MANY_REQUESTS: i32=429;
```

**Returns:** `i32=429;`

---

### <a id="STATUS_INTERNAL_SERVER_ERROR"></a>`STATUS_INTERNAL_SERVER_ERROR` `🔓 export`

&gt; 📄 `status.vx` L30-30

```vex
export const STATUS_INTERNAL_SERVER_ERROR: i32=500;
```

**Returns:** `i32=500;`

---

### <a id="STATUS_NOT_IMPLEMENTED"></a>`STATUS_NOT_IMPLEMENTED` `🔓 export`

&gt; 📄 `status.vx` L31-31

```vex
export const STATUS_NOT_IMPLEMENTED: i32=501;
```

**Returns:** `i32=501;`

---

### <a id="STATUS_BAD_GATEWAY"></a>`STATUS_BAD_GATEWAY` `🔓 export`

&gt; 📄 `status.vx` L32-32

```vex
export const STATUS_BAD_GATEWAY: i32=502;
```

**Returns:** `i32=502;`

---

### <a id="STATUS_SERVICE_UNAVAILABLE"></a>`STATUS_SERVICE_UNAVAILABLE` `🔓 export`

&gt; 📄 `status.vx` L33-33

```vex
export const STATUS_SERVICE_UNAVAILABLE: i32=503;
```

**Returns:** `i32=503;`

---

### <a id="STATUS_GATEWAY_TIMEOUT"></a>`STATUS_GATEWAY_TIMEOUT` `🔓 export`

&gt; 📄 `status.vx` L34-34

```vex
export const STATUS_GATEWAY_TIMEOUT: i32=504;
```

**Returns:** `i32=504;`

---

### <a id="OP_CONTINUATION"></a>`OP_CONTINUATION` `🔓 export`

&gt; 📄 `ws.vx` L33-33

```vex
export const OP_CONTINUATION: u8=0x0;
```

**Returns:** `u8=0x0;`

---

### <a id="OP_TEXT"></a>`OP_TEXT` `🔓 export`

&gt; 📄 `ws.vx` L34-34

```vex
export const OP_TEXT: u8=0x1;
```

**Returns:** `u8=0x1;`

---

### <a id="OP_BINARY"></a>`OP_BINARY` `🔓 export`

&gt; 📄 `ws.vx` L35-35

```vex
export const OP_BINARY: u8=0x2;
```

**Returns:** `u8=0x2;`

---

### <a id="OP_CLOSE"></a>`OP_CLOSE` `🔓 export`

&gt; 📄 `ws.vx` L36-36

```vex
export const OP_CLOSE: u8=0x8;
```

**Returns:** `u8=0x8;`

---

### <a id="OP_PING"></a>`OP_PING` `🔓 export`

&gt; 📄 `ws.vx` L37-37

```vex
export const OP_PING: u8=0x9;
```

**Returns:** `u8=0x9;`

---

### <a id="OP_PONG"></a>`OP_PONG` `🔓 export`

&gt; 📄 `ws.vx` L38-38

```vex
export const OP_PONG: u8=0xA;
```

**Returns:** `u8=0xA;`

---

### <a id="CLOSE_NORMAL"></a>`CLOSE_NORMAL` `🔓 export`

&gt; 📄 `ws.vx` L44-44

```vex
export const CLOSE_NORMAL: u16=1000;
```

**Returns:** `u16=1000;`

---

### <a id="CLOSE_GOING_AWAY"></a>`CLOSE_GOING_AWAY` `🔓 export`

&gt; 📄 `ws.vx` L45-45

```vex
export const CLOSE_GOING_AWAY: u16=1001;
```

**Returns:** `u16=1001;`

---

### <a id="CLOSE_PROTOCOL_ERROR"></a>`CLOSE_PROTOCOL_ERROR` `🔓 export`

&gt; 📄 `ws.vx` L46-46

```vex
export const CLOSE_PROTOCOL_ERROR: u16=1002;
```

**Returns:** `u16=1002;`

---

### <a id="CLOSE_UNSUPPORTED_DATA"></a>`CLOSE_UNSUPPORTED_DATA` `🔓 export`

&gt; 📄 `ws.vx` L47-47

```vex
export const CLOSE_UNSUPPORTED_DATA: u16=1003;
```

**Returns:** `u16=1003;`

---

### <a id="CLOSE_NO_STATUS"></a>`CLOSE_NO_STATUS` `🔓 export`

&gt; 📄 `ws.vx` L48-48

```vex
export const CLOSE_NO_STATUS: u16=1005;
```

**Returns:** `u16=1005;`

---

### <a id="CLOSE_ABNORMAL"></a>`CLOSE_ABNORMAL` `🔓 export`

&gt; 📄 `ws.vx` L49-49

```vex
export const CLOSE_ABNORMAL: u16=1006;
```

**Returns:** `u16=1006;`

---

### <a id="CLOSE_INVALID_PAYLOAD"></a>`CLOSE_INVALID_PAYLOAD` `🔓 export`

&gt; 📄 `ws.vx` L50-50

```vex
export const CLOSE_INVALID_PAYLOAD: u16=1007;
```

**Returns:** `u16=1007;`

---

### <a id="CLOSE_POLICY_VIOLATION"></a>`CLOSE_POLICY_VIOLATION` `🔓 export`

&gt; 📄 `ws.vx` L51-51

```vex
export const CLOSE_POLICY_VIOLATION: u16=1008;
```

**Returns:** `u16=1008;`

---

### <a id="CLOSE_MESSAGE_TOO_BIG"></a>`CLOSE_MESSAGE_TOO_BIG` `🔓 export`

&gt; 📄 `ws.vx` L52-52

```vex
export const CLOSE_MESSAGE_TOO_BIG: u16=1009;
```

**Returns:** `u16=1009;`

---

### <a id="CLOSE_MANDATORY_EXT"></a>`CLOSE_MANDATORY_EXT` `🔓 export`

&gt; 📄 `ws.vx` L53-53

```vex
export const CLOSE_MANDATORY_EXT: u16=1010;
```

**Returns:** `u16=1010;`

---

### <a id="CLOSE_INTERNAL_ERROR"></a>`CLOSE_INTERNAL_ERROR` `🔓 export`

&gt; 📄 `ws.vx` L54-54

```vex
export const CLOSE_INTERNAL_ERROR: u16=1011;
```

**Returns:** `u16=1011;`

---

### <a id="MAX_HEADERS"></a>`MAX_HEADERS`

&gt; 📄 `headers.vx` L22-22

```vex
const MAX_HEADERS: usize=64;
```

**Returns:** `usize=64;`

---

### <a id="FRAME_DATA"></a>`FRAME_DATA` `🔓 export`

&gt; 📄 `h2.vx` L24-24

```vex
export const FRAME_DATA: u8=0x0;
```

**Returns:** `u8=0x0;`

---

### <a id="FRAME_HEADERS"></a>`FRAME_HEADERS` `🔓 export`

&gt; 📄 `h2.vx` L25-25

```vex
export const FRAME_HEADERS: u8=0x1;
```

**Returns:** `u8=0x1;`

---

### <a id="FRAME_PRIORITY"></a>`FRAME_PRIORITY` `🔓 export`

&gt; 📄 `h2.vx` L26-26

```vex
export const FRAME_PRIORITY: u8=0x2;
```

**Returns:** `u8=0x2;`

---

### <a id="FRAME_RST_STREAM"></a>`FRAME_RST_STREAM` `🔓 export`

&gt; 📄 `h2.vx` L27-27

```vex
export const FRAME_RST_STREAM: u8=0x3;
```

**Returns:** `u8=0x3;`

---

### <a id="FRAME_SETTINGS"></a>`FRAME_SETTINGS` `🔓 export`

&gt; 📄 `h2.vx` L28-28

```vex
export const FRAME_SETTINGS: u8=0x4;
```

**Returns:** `u8=0x4;`

---

### <a id="FRAME_PUSH_PROMISE"></a>`FRAME_PUSH_PROMISE` `🔓 export`

&gt; 📄 `h2.vx` L29-29

```vex
export const FRAME_PUSH_PROMISE: u8=0x5;
```

**Returns:** `u8=0x5;`

---

### <a id="FRAME_PING"></a>`FRAME_PING` `🔓 export`

&gt; 📄 `h2.vx` L30-30

```vex
export const FRAME_PING: u8=0x6;
```

**Returns:** `u8=0x6;`

---

### <a id="FRAME_GOAWAY"></a>`FRAME_GOAWAY` `🔓 export`

&gt; 📄 `h2.vx` L31-31

```vex
export const FRAME_GOAWAY: u8=0x7;
```

**Returns:** `u8=0x7;`

---

### <a id="FRAME_WINDOW_UPDATE"></a>`FRAME_WINDOW_UPDATE` `🔓 export`

&gt; 📄 `h2.vx` L32-32

```vex
export const FRAME_WINDOW_UPDATE: u8=0x8;
```

**Returns:** `u8=0x8;`

---

### <a id="FRAME_CONTINUATION"></a>`FRAME_CONTINUATION` `🔓 export`

&gt; 📄 `h2.vx` L33-33

```vex
export const FRAME_CONTINUATION: u8=0x9;
```

**Returns:** `u8=0x9;`

---

### <a id="FLAG_END_STREAM"></a>`FLAG_END_STREAM` `🔓 export`

&gt; 📄 `h2.vx` L39-39

```vex
export const FLAG_END_STREAM: u8=0x1;
```

**Returns:** `u8=0x1;`

---

### <a id="FLAG_ACK"></a>`FLAG_ACK` `🔓 export`

&gt; 📄 `h2.vx` L40-40

```vex
export const FLAG_ACK: u8=0x1;
```

**Returns:** `u8=0x1;`

---

### <a id="FLAG_END_HEADERS"></a>`FLAG_END_HEADERS` `🔓 export`

&gt; 📄 `h2.vx` L41-41

```vex
export const FLAG_END_HEADERS: u8=0x4;
```

**Returns:** `u8=0x4;`

---

### <a id="FLAG_PADDED"></a>`FLAG_PADDED` `🔓 export`

&gt; 📄 `h2.vx` L42-42

```vex
export const FLAG_PADDED: u8=0x8;
```

**Returns:** `u8=0x8;`

---

### <a id="FLAG_PRIORITY_F"></a>`FLAG_PRIORITY_F` `🔓 export`

&gt; 📄 `h2.vx` L43-43

```vex
export const FLAG_PRIORITY_F: u8=0x20;
```

**Returns:** `u8=0x20;`

---

### <a id="ERR_NO_ERROR"></a>`ERR_NO_ERROR` `🔓 export`

&gt; 📄 `h2.vx` L49-49

```vex
export const ERR_NO_ERROR: u32=0x0;
```

**Returns:** `u32=0x0;`

---

### <a id="ERR_PROTOCOL_ERROR"></a>`ERR_PROTOCOL_ERROR` `🔓 export`

&gt; 📄 `h2.vx` L50-50

```vex
export const ERR_PROTOCOL_ERROR: u32=0x1;
```

**Returns:** `u32=0x1;`

---

### <a id="ERR_INTERNAL_ERROR"></a>`ERR_INTERNAL_ERROR` `🔓 export`

&gt; 📄 `h2.vx` L51-51

```vex
export const ERR_INTERNAL_ERROR: u32=0x2;
```

**Returns:** `u32=0x2;`

---

### <a id="ERR_FLOW_CONTROL_ERROR"></a>`ERR_FLOW_CONTROL_ERROR` `🔓 export`

&gt; 📄 `h2.vx` L52-52

```vex
export const ERR_FLOW_CONTROL_ERROR: u32=0x3;
```

**Returns:** `u32=0x3;`

---

### <a id="ERR_SETTINGS_TIMEOUT"></a>`ERR_SETTINGS_TIMEOUT` `🔓 export`

&gt; 📄 `h2.vx` L53-53

```vex
export const ERR_SETTINGS_TIMEOUT: u32=0x4;
```

**Returns:** `u32=0x4;`

---

### <a id="ERR_STREAM_CLOSED"></a>`ERR_STREAM_CLOSED` `🔓 export`

&gt; 📄 `h2.vx` L54-54

```vex
export const ERR_STREAM_CLOSED: u32=0x5;
```

**Returns:** `u32=0x5;`

---

### <a id="ERR_FRAME_SIZE_ERROR"></a>`ERR_FRAME_SIZE_ERROR` `🔓 export`

&gt; 📄 `h2.vx` L55-55

```vex
export const ERR_FRAME_SIZE_ERROR: u32=0x6;
```

**Returns:** `u32=0x6;`

---

### <a id="ERR_REFUSED_STREAM"></a>`ERR_REFUSED_STREAM` `🔓 export`

&gt; 📄 `h2.vx` L56-56

```vex
export const ERR_REFUSED_STREAM: u32=0x7;
```

**Returns:** `u32=0x7;`

---

### <a id="ERR_CANCEL"></a>`ERR_CANCEL` `🔓 export`

&gt; 📄 `h2.vx` L57-57

```vex
export const ERR_CANCEL: u32=0x8;
```

**Returns:** `u32=0x8;`

---

### <a id="ERR_COMPRESSION_ERROR"></a>`ERR_COMPRESSION_ERROR` `🔓 export`

&gt; 📄 `h2.vx` L58-58

```vex
export const ERR_COMPRESSION_ERROR: u32=0x9;
```

**Returns:** `u32=0x9;`

---

### <a id="ERR_CONNECT_ERROR"></a>`ERR_CONNECT_ERROR` `🔓 export`

&gt; 📄 `h2.vx` L59-59

```vex
export const ERR_CONNECT_ERROR: u32=0xA;
```

**Returns:** `u32=0xA;`

---

### <a id="ERR_ENHANCE_YOUR_CALM"></a>`ERR_ENHANCE_YOUR_CALM` `🔓 export`

&gt; 📄 `h2.vx` L60-60

```vex
export const ERR_ENHANCE_YOUR_CALM: u32=0xB;
```

**Returns:** `u32=0xB;`

---

### <a id="ERR_INADEQUATE_SECURITY"></a>`ERR_INADEQUATE_SECURITY` `🔓 export`

&gt; 📄 `h2.vx` L61-61

```vex
export const ERR_INADEQUATE_SECURITY: u32=0xC;
```

**Returns:** `u32=0xC;`

---

### <a id="ERR_HTTP_1_1_REQUIRED"></a>`ERR_HTTP_1_1_REQUIRED` `🔓 export`

&gt; 📄 `h2.vx` L62-62

```vex
export const ERR_HTTP_1_1_REQUIRED: u32=0xD;
```

**Returns:** `u32=0xD;`

---

### <a id="H2_FRAME_HEADER_SIZE"></a>`H2_FRAME_HEADER_SIZE` `🔓 export`

&gt; 📄 `h2.vx` L77-77

```vex
export const H2_FRAME_HEADER_SIZE: usize=9;
```

Frame header is always 9 bytes.

**Returns:** `usize=9;`

---

### <a id="STATIC_TABLE_SIZE"></a>`STATIC_TABLE_SIZE`

&gt; 📄 `hpack.vx` L94-94

```vex
const STATIC_TABLE_SIZE: usize=61;
```

**Returns:** `usize=61;`

---

### <a id="INIT_CAP"></a>`INIT_CAP`

&gt; 📄 `connection.vx` L37-37

```vex
const INIT_CAP: usize=8192;
```

Default initial buffer capacity (8 KB covers most HTTP requests).

**Returns:** `usize=8192;`

---

### <a id="MAX_BUF"></a>`MAX_BUF`

&gt; 📄 `connection.vx` L40-40

```vex
const MAX_BUF: usize=1048576;
```

Maximum buffer size to prevent OOM from malicious clients (1 MB).

**Returns:** `usize=1048576;`

---

### <a id="OFFSET_SHIFT_4"></a>`OFFSET_SHIFT_4`

&gt; 📄 `app.vx` L586-586

```vex
const OFFSET_SHIFT_4: [i32; 4]=[0, 8, 16, 24];
```

**Returns:** `[i32; 4]=[0, 8, 16, 24];`

---

### <a id="NODE_STATIC"></a>`NODE_STATIC`

&gt; 📄 `radix.vx` L6-6

```vex
const NODE_STATIC: i32=0;
```

**Returns:** `i32=0;`

---

### <a id="NODE_PARAM"></a>`NODE_PARAM`

&gt; 📄 `radix.vx` L7-7

```vex
const NODE_PARAM: i32=1;
```

**Returns:** `i32=1;`

---

### <a id="NODE_CATCH"></a>`NODE_CATCH`

&gt; 📄 `radix.vx` L8-8

```vex
const NODE_CATCH: i32=2;
```

**Returns:** `i32=2;`

---

### <a id="NO_PARENT"></a>`NO_PARENT`

&gt; 📄 `radix.vx` L9-9

```vex
const NO_PARENT: i32=- 1;
```

**Returns:** `i32=- 1;`

---

### <a id="WS_TEXT"></a>`WS_TEXT` `🔓 export`

&gt; 📄 `ws.vx` L27-27

```vex
export const WS_TEXT: u8=1;
```

**Returns:** `u8=1;`

---

### <a id="WS_BINARY"></a>`WS_BINARY` `🔓 export`

&gt; 📄 `ws.vx` L28-28

```vex
export const WS_BINARY: u8=2;
```

**Returns:** `u8=2;`

---

### <a id="WS_CLOSE"></a>`WS_CLOSE` `🔓 export`

&gt; 📄 `ws.vx` L29-29

```vex
export const WS_CLOSE: u8=8;
```

**Returns:** `u8=8;`

---

### <a id="WS_PING"></a>`WS_PING` `🔓 export`

&gt; 📄 `ws.vx` L30-30

```vex
export const WS_PING: u8=9;
```

**Returns:** `u8=9;`

---

### <a id="WS_PONG"></a>`WS_PONG` `🔓 export`

&gt; 📄 `ws.vx` L31-31

```vex
export const WS_PONG: u8=10;
```

**Returns:** `u8=10;`

---

## Type Aliases

### <a id="AsyncRequestHandler"></a>`AsyncRequestHandler`

&gt; 📄 `async_server.vx` L32-32

```vex
type AsyncRequestHandler = fn (req: &Request, res: &Response!)
```

**Returns:** `fn (req: &Request, res: &Response!)`

---

### <a id="RequestHandler"></a>`RequestHandler`

&gt; 📄 `server.vx` L30-30

```vex
type RequestHandler = fn (req: &Request, res: &Response!)
```

**Returns:** `fn (req: &Request, res: &Response!)`

---

### <a id="Handler"></a>`Handler`

&gt; 📄 `ctx.vx` L49-49

```vex
type Handler = fn ( &Ctx!)
```

**Returns:** `fn ( &Ctx!)`

---

## Structs

### <a id="Cookie"></a>`Cookie` `🔓 export`

&gt; 📄 `cookie.vx` L17-27

```vex
export struct Cookie
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `name` | `string` | 🔓 public |  |
| `value` | `string` | 🔓 public |  |
| `path` | `string` | 🔓 public |  |
| `domain` | `string` | 🔓 public |  |
| `maxAge` | `i32` | 🔓 public |  |
| `secure` | `bool` | 🔓 public |  |
| `httpOnly` | `bool` | 🔓 public |  |
| `sameSite` | `string` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Cookie.new`[↗](#Cookie.new) | `export fn Cookie.new(name: string, value: string):` | Create a simple session cookie (name=value, HttpOnly, Path=/). |
| `Cookie.persistent`[↗](#Cookie.persistent) | `export fn Cookie.persistent(name: string, value: s` | Create a persistent cookie with Max-Age. |
| `Cookie.delete`[↗](#Cookie.delete) | `export fn Cookie.delete(name: string): Cookie` | Create a deletion cookie (Max-Age=0). |
| `toString`[↗](#Cookie.toString) | `export fn (self: &Cookie) toString(): string` | Serialize cookie for Set-Cookie header. |

---

### <a id="CookiePair"></a>`CookiePair` `🔓 export`

&gt; 📄 `cookie.vx` L107-111

```vex
export struct CookiePair
```

A single parsed cookie pair (name=value from Cookie header).

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `name` | `string` | 🔓 public |  |
| `value` | `string` | 🔓 public |  |

---

### <a id="CorsConfig"></a>`CorsConfig` `🔓 export`

&gt; 📄 `cors.vx` L22-29

```vex
export struct CorsConfig
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `origin` | `string` | 🔓 public |  |
| `methods` | `string` | 🔓 public |  |
| `headers` | `string` | 🔓 public |  |
| `maxAge` | `string` | 🔓 public |  |
| `credentials` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `CorsConfig.new`[↗](#CorsConfig.new) | `export fn CorsConfig.new(origin: string): CorsConf` | Create a CORS config with a specific origin. |
| `setMethods`[↗](#CorsConfig.setMethods) | `export fn (self: &CorsConfig!) setMethods(m: strin` | Set allowed methods (chainable). |
| `setHeaders`[↗](#CorsConfig.setHeaders) | `export fn (self: &CorsConfig!) setHeaders(h: strin` | Set allowed headers (chainable). |
| `setMaxAge`[↗](#CorsConfig.setMaxAge) | `export fn (self: &CorsConfig!) setMaxAge(age: stri` | Set max age for preflight cache (chainable). |
| `allowCredentials`[↗](#CorsConfig.allowCredentials) | `export fn (self: &CorsConfig!) allowCredentials():` | Enable credentials (chainable). |
| `build`[↗](#CorsConfig.build) | `export fn (self: &CorsConfig) build(): Handler` | Build a Handler from this config. |

---

### <a id="RateLimitConfig"></a>`RateLimitConfig` `🔓 export`

&gt; 📄 `rate_limiter.vx` L26-33

```vex
export struct RateLimitConfig
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `maxRequests` | `i32` | 🔓 public |  |
| `windowSecs` | `i32` | 🔓 public |  |
| `message` | `string` | 🔓 public |  |
| `statusCode` | `i32` | 🔓 public |  |
| `skipPaths` | `Vec&lt;string&gt;` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `RateLimitConfig.new`[↗](#RateLimitConfig.new) | `export fn RateLimitConfig.new(maxRequests: i32, wi` | Create a rate limit config. |
| `setMessage`[↗](#RateLimitConfig.setMessage) | `export fn (self: &RateLimitConfig!) setMessage(msg` | Set custom rejection message (chainable). |
| `skip`[↗](#RateLimitConfig.skip) | `export fn (self: &RateLimitConfig!) skip(path: str` | Add a path to skip (chainable). |
| `build`[↗](#RateLimitConfig.build) | `export fn (self: &RateLimitConfig) build(): Handle` | Build a Handler from this config. |

---

### <a id="HeaderEntry"></a>`HeaderEntry` `🔓 export`

&gt; 📄 `headers.vx` L14-18

```vex
export struct HeaderEntry
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `name` | `string` | 🔓 public |  |
| `value` | `string` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `HeaderEntry.empty`[↗](#HeaderEntry.empty) | `export fn HeaderEntry.empty(): HeaderEntry` |  |

---

### <a id="RequestHeaders"></a>`RequestHeaders` `🔓 export`

&gt; 📄 `headers.vx` L28-32

```vex
export struct RequestHeaders
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `names` | `Vec&lt;str&gt;` | 🔓 public |  |
| `values` | `Vec&lt;str&gt;` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `RequestHeaders.new`[↗](#RequestHeaders.new) | `export fn RequestHeaders.new(): RequestHeaders` |  |
| `get`[↗](#RequestHeaders.get) | `export fn (self: &RequestHeaders) get(name: str): ` | Get header value by name (case-insensitive). Returns empty str if not found. |
| `has`[↗](#RequestHeaders.has) | `export fn (self: &RequestHeaders) has(name: str): ` | Check if a header exists (case-insensitive). |
| `add`[↗](#RequestHeaders.add) | `export fn (self: &RequestHeaders!) add(name: str, ` | Add a header — zero-copy, stores str views directly. |
| `clear`[↗](#RequestHeaders.clear) | `export fn (self: &RequestHeaders!) clear()` | Clear all headers (no allocations — str is Copy). |
| `len`[↗](#RequestHeaders.len) | `export fn (self: &RequestHeaders) len(): i32` | Number of headers. |

---

### <a id="Headers"></a>`Headers` `🔓 export`

&gt; 📄 `headers.vx` L84-88

```vex
export struct Headers
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `names` | `Vec&lt;string&gt;` | 🔓 public |  |
| `values` | `Vec&lt;string&gt;` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Headers.new`[↗](#Headers.new) | `export fn Headers.new(): Headers` | Create an empty Headers collection. |
| `get`[↗](#Headers.get) | `export fn (self: &Headers) get(name: str): string` | Get header value by name (case-insensitive). |
| `has`[↗](#Headers.has) | `export fn (self: &Headers) has(name: str): bool` | Check if a header exists (case-insensitive). |
| `set`[↗](#Headers.set) | `export fn (self: &Headers!) set(name: str, value: ` | Set a header. Replaces existing (case-insensitive) or appends. |
| `add`[↗](#Headers.add) | `export fn (self: &Headers!) add(name: str, value: ` | Add a header (allows duplicate names, e.g. Set-Cookie). |
| `del`[↗](#Headers.del) | `export fn (self: &Headers!) del(name: str)` | Remove all headers with the given name (case-insensitive). |
| `clear`[↗](#Headers.clear) | `export fn (self: &Headers!) clear()` | Clear all headers. |
| `shrinkToFit`[↗](#Headers.shrinkToFit) | `export fn (self: &Headers!) shrinkToFit()` | Shrink underlying storage to match actual header count. |
| `len`[↗](#Headers.len) | `export fn (self: &Headers) len(): i32` | Number of headers. |

---

### <a id="AsyncServer"></a>`AsyncServer` `🔓 export`

&gt; 📄 `async_server.vx` L38-43

```vex
export struct AsyncServer
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fd` | `i32` | 🔓 public |  |
| `port` | `i32` | 🔓 public |  |
| `host` | `string` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `AsyncServer.new`[↗](#AsyncServer.new) | `export fn AsyncServer.new(host: string, port: i32)` | Create and bind a new async server. |
| `serve`[↗](#AsyncServer.serve) | `export fn (self: &AsyncServer) serve(handler: Asyn` | Start accepting connections. Each connection spawns a goroutine. |
| `close`[↗](#AsyncServer.close) | `export fn (self: &AsyncServer) close()` | Close the server socket. |

---

### <a id="WsFrame"></a>`WsFrame` `🔓 export`

&gt; 📄 `ws.vx` L60-71

```vex
export struct WsFrame
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fin` | `bool` | 🔓 public |  |
| `rsv1` | `bool` | 🔓 public |  |
| `rsv2` | `bool` | 🔓 public |  |
| `rsv3` | `bool` | 🔓 public |  |
| `opcode` | `u8` | 🔓 public |  |
| `masked` | `bool` | 🔓 public |  |
| `payloadLen` | `u64` | 🔓 public |  |
| `maskKey` | `u32` | 🔓 public |  |
| `headerLen` | `usize` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `isControl`[↗](#WsFrame.isControl) | `export fn (self: &WsFrame) isControl(): bool` | Is this a control frame? (opcodes 0x8-0xF) |
| `isText`[↗](#WsFrame.isText) | `export fn (self: &WsFrame) isText(): bool` | Is this a text frame? |
| `isBinary`[↗](#WsFrame.isBinary) | `export fn (self: &WsFrame) isBinary(): bool` | Is this a binary frame? |
| `isClose`[↗](#WsFrame.isClose) | `export fn (self: &WsFrame) isClose(): bool` | Is this a close frame? |
| `isPing`[↗](#WsFrame.isPing) | `export fn (self: &WsFrame) isPing(): bool` | Is this a ping frame? |
| `isPong`[↗](#WsFrame.isPong) | `export fn (self: &WsFrame) isPong(): bool` | Is this a pong frame? |

---

### <a id="WsMessage"></a>`WsMessage` `🔓 export`

&gt; 📄 `ws.vx` L311-316

```vex
export struct WsMessage
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `opcode` | `u8` | 🔓 public |  |
| `data` | `string` | 🔓 public |  |
| `complete` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `WsMessage.new`[↗](#WsMessage.new) | `export fn WsMessage.new(): WsMessage` |  |
| `feedFrame`[↗](#WsMessage.feedFrame) | `export fn (self: &WsMessage!) feedFrame(frame: &Ws` | Feed a parsed frame into the message assembler. |
| `reset`[↗](#WsMessage.reset) | `export fn (self: &WsMessage!) reset()` | Reset for next message. |
| `isText`[↗](#WsMessage.isText) | `export fn (self: &WsMessage) isText(): bool` | Check if this is a text message. |
| `isBinary`[↗](#WsMessage.isBinary) | `export fn (self: &WsMessage) isBinary(): bool` | Check if this is a binary message. |
| `isClose`[↗](#WsMessage.isClose) | `export fn (self: &WsMessage) isClose(): bool` | Check if this is a close frame. |
| `isPing`[↗](#WsMessage.isPing) | `export fn (self: &WsMessage) isPing(): bool` | Check if this is a ping frame. |
| `text`[↗](#WsMessage.text) | `export fn (self: &WsMessage) text(): string` | Get the text content (for text messages). |

---

### <a id="HeaderEntry"></a>`HeaderEntry` `🔓 export`

&gt; 📄 `headers.vx` L28-32

```vex
export struct HeaderEntry
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `name` | `str` | 🔓 public |  |
| `value` | `str` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `HeaderEntry.empty`[↗](#HeaderEntry.empty) | `export fn HeaderEntry.empty(): HeaderEntry` |  |

---

### <a id="ParserHeaders"></a>`ParserHeaders` `🔓 export`

&gt; 📄 `headers.vx` L42-46

```vex
export struct ParserHeaders
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `entries` | `[HeaderEntry; 64]` | 🔓 public |  |
| `count` | `usize` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `ParserHeaders.new`[↗](#ParserHeaders.new) | `export fn ParserHeaders.new(): ParserHeaders` | Create an empty header collection. |
| `add`[↗](#ParserHeaders.add) | `export fn (self: &ParserHeaders!) add(name: str, v` | Add a header entry. Returns false if at capacity. |
| `get`[↗](#ParserHeaders.get) | `export fn (self: &ParserHeaders) get(name: str): s` | Get header value by name (case-insensitive). |
| `has`[↗](#ParserHeaders.has) | `export fn (self: &ParserHeaders) has(name: str): b` | Check if a header exists (case-insensitive). |
| `contentLength`[↗](#ParserHeaders.contentLength) | `export fn (self: &ParserHeaders) contentLength(): ` | Get Content-Length value, or -1 if not present/invalid. |
| `isChunked`[↗](#ParserHeaders.isChunked) | `export fn (self: &ParserHeaders) isChunked(): bool` | Check if Transfer-Encoding contains "chunked". |
| `isConnectionClose`[↗](#ParserHeaders.isConnectionClose) | `export fn (self: &ParserHeaders) isConnectionClose` | Check if Connection header says "close". |
| `isUpgrade`[↗](#ParserHeaders.isUpgrade) | `export fn (self: &ParserHeaders) isUpgrade(): bool` | Check if Connection header says "upgrade". |
| `len`[↗](#ParserHeaders.len) | `export fn (self: &ParserHeaders) len(): usize` | Get number of stored headers. |
| `clear`[↗](#ParserHeaders.clear) | `export fn (self: &ParserHeaders!) clear()` | Reset the header collection for reuse. |
| `at`[↗](#ParserHeaders.at) | `export fn (self: &ParserHeaders) at(index: usize):` | Get header entry by index. |

---

### <a id="Scanner"></a>`Scanner` `🔓 export`

&gt; 📄 `scanner.vx` L24-28

```vex
export struct Scanner
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `data` | `str` | 🔓 public |  |
| `pos` | `usize` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Scanner.new`[↗](#Scanner.new) | `export fn Scanner.new(input: str): Scanner` | Create a scanner over the given input. |
| `Scanner.at`[↗](#Scanner.at) | `export fn Scanner.at(input: str, offset: usize): S` | Create a scanner starting at a given offset. |
| `remaining`[↗](#Scanner.remaining) | `export fn (self: &Scanner) remaining(): usize` | Bytes remaining from current position. |
| `isEof`[↗](#Scanner.isEof) | `export fn (self: &Scanner) isEof(): bool` | True if no bytes remain. |
| `position`[↗](#Scanner.position) | `export fn (self: &Scanner) position(): usize` | Current absolute cursor position. |
| `setPosition`[↗](#Scanner.setPosition) | `export fn (self: &Scanner!) setPosition(newPos: us` | Set absolute cursor position (clamped to input length). |
| `peek`[↗](#Scanner.peek) | `export fn (self: &Scanner) peek(): u8` | Peek at byte at current position (0 if EOF). |
| `peekAt`[↗](#Scanner.peekAt) | `export fn (self: &Scanner) peekAt(offset: usize): ` | Peek at byte at offset from current position. |
| `advance`[↗](#Scanner.advance) | `export fn (self: &Scanner!) advance(n: usize)` | Advance position by n bytes. |
| `rest`[↗](#Scanner.rest) | `export fn (self: &Scanner) rest(): str` | Get a str slice from current position to end. |
| `slice`[↗](#Scanner.slice) | `export fn (self: &Scanner) slice(start: usize, end` | Get a str slice [start..end) relative to buffer start. |
| `findByte`[↗](#Scanner.findByte) | `export fn (self: &Scanner) findByte(byt: u8): i32` | Find first occurrence of `byte` from current position. |
| `findCRLF`[↗](#Scanner.findCRLF) | `export fn (self: &Scanner) findCRLF(): i32` | Find \r\n (CRLF) from current position. |
| `findDoubleCRLF`[↗](#Scanner.findDoubleCRLF) | `export fn (self: &Scanner) findDoubleCRLF(): i32` | Find \r\n\r\n (double CRLF — end of headers). |
| `readUntil`[↗](#Scanner.readUntil) | `export fn (self: &Scanner!) readUntil(delim: u8): ` | Read bytes until `delim` is found. Returns slice [pos..delim_pos). |
| `readLine`[↗](#Scanner.readLine) | `export fn (self: &Scanner!) readLine(): str` | Read bytes until CRLF. Returns slice [pos..cr_pos). |
| `expect`[↗](#Scanner.expect) | `export fn (self: &Scanner!) expect(byt: u8): bool` | Expect and consume a specific byte. Returns true if matched. |
| `skipOWS`[↗](#Scanner.skipOWS) | `export fn (self: &Scanner!) skipOWS()` | Skip optional whitespace (SP and HTAB). |
| `skipSP`[↗](#Scanner.skipSP) | `export fn (self: &Scanner!) skipSP(): bool` | Skip exactly one SP (space). Returns true if consumed. |
| `readN`[↗](#Scanner.readN) | `export fn (self: &Scanner!) readN(n: usize): str` | Read a fixed number of bytes as a str slice. |
| `startsWith`[↗](#Scanner.startsWith) | `export fn (self: &Scanner) startsWith(pattern: str` | Check if the next bytes match a pattern (case-sensitive). |

---

### <a id="H2Frame"></a>`H2Frame` `🔓 export`

&gt; 📄 `h2.vx` L68-74

```vex
export struct H2Frame
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `length` | `u32` | 🔓 public |  |
| `frameType` | `u8` | 🔓 public |  |
| `flags` | `u8` | 🔓 public |  |
| `streamId` | `u32` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `isEndStream`[↗](#H2Frame.isEndStream) | `export fn (self: &H2Frame) isEndStream(): bool` | Has END_STREAM flag? |
| `isEndHeaders`[↗](#H2Frame.isEndHeaders) | `export fn (self: &H2Frame) isEndHeaders(): bool` | Has END_HEADERS flag? |
| `isPadded`[↗](#H2Frame.isPadded) | `export fn (self: &H2Frame) isPadded(): bool` | Has PADDED flag? |
| `hasPriority`[↗](#H2Frame.hasPriority) | `export fn (self: &H2Frame) hasPriority(): bool` | Has PRIORITY flag? |
| `isAck`[↗](#H2Frame.isAck) | `export fn (self: &H2Frame) isAck(): bool` | Has ACK flag? |

---

### <a id="H2Settings"></a>`H2Settings` `🔓 export`

&gt; 📄 `h2.vx` L160-168

```vex
export struct H2Settings
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `headerTableSize` | `u32` | 🔓 public |  |
| `enablePush` | `bool` | 🔓 public |  |
| `maxConcurrentStreams` | `u32` | 🔓 public |  |
| `initialWindowSize` | `u32` | 🔓 public |  |
| `maxFrameSize` | `u32` | 🔓 public |  |
| `maxHeaderListSize` | `u32` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `H2Settings.defaults`[↗](#H2Settings.defaults) | `export fn H2Settings.defaults(): H2Settings` | Default HTTP/2 settings. |

---

### <a id="GoAway"></a>`GoAway` `🔓 export`

&gt; 📄 `h2.vx` L211-216

```vex
export struct GoAway
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `lastStreamId` | `u32` | 🔓 public |  |
| `errorCode` | `u32` | 🔓 public |  |
| `debugData` | `str` | 🔓 public |  |

---

### <a id="BodyReader"></a>`BodyReader` `🔓 export`

&gt; 📄 `body.vx` L55-62

```vex
export struct BodyReader
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `mode` | `BodyMode` | 🔓 public |  |
| `consumed` | `usize` | 🔓 public |  |
| `expected` | `usize` | 🔓 public |  |
| `chunked` | `ChunkedDecoder` | 🔓 public |  |
| `done` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `BodyReader.new`[↗](#BodyReader.new) | `export fn BodyReader.new(mode: BodyMode): BodyRead` | Create a body reader from detected mode. |
| `feed`[↗](#BodyReader.feed) | `export fn (self: &BodyReader!) feed(data: str): Bo` | Feed more data to the body reader. |
| `connectionClosed`[↗](#BodyReader.connectionClosed) | `export fn (self: &BodyReader!) connectionClosed()` | Mark the connection as closed (for UntilClose mode). |
| `isDone`[↗](#BodyReader.isDone) | `export fn (self: &BodyReader) isDone(): bool` | Is the body fully read? |
| `totalBytes`[↗](#BodyReader.totalBytes) | `export fn (self: &BodyReader) totalBytes(): usize` | Total bytes consumed. |
| `reset`[↗](#BodyReader.reset) | `export fn (self: &BodyReader!) reset(mode: BodyMod` | Reset for reuse. |

---

### <a id="StaticEntry"></a>`StaticEntry`

&gt; 📄 `hpack.vx` L20-24

```vex
struct StaticEntry
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `name` | `str` | 🔓 public |  |
| `value` | `str` | 🔓 public |  |

---

### <a id="DynEntry"></a>`DynEntry`

&gt; 📄 `hpack.vx` L100-105

```vex
struct DynEntry
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `name` | `string` | 🔓 public |  |
| `value` | `string` | 🔓 public |  |
| `size` | `usize` | 🔓 public |  |

---

### <a id="DynamicTable"></a>`DynamicTable` `🔓 export`

&gt; 📄 `hpack.vx` L107-112

```vex
export struct DynamicTable
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `entries` | `Vec&lt;DynEntry&gt;` | 🔓 public |  |
| `size` | `usize` | 🔓 public |  |
| `maxSize` | `usize` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `DynamicTable.new`[↗](#DynamicTable.new) | `export fn DynamicTable.new(maxSize: usize): Dynami` |  |
| `add`[↗](#DynamicTable.add) | `export fn (self: &DynamicTable!) add(name: string,` | Add entry to dynamic table (front = newest). |
| `lookup`[↗](#DynamicTable.lookup) | `export fn (self: &DynamicTable) lookup(index: usiz` | Look up by absolute index (1-based, 1..61 = static, 62+ = dynamic). |
| `setMaxSize`[↗](#DynamicTable.setMaxSize) | `export fn (self: &DynamicTable!) setMaxSize(newMax` | Update max size (from SETTINGS_HEADER_TABLE_SIZE). |

---

### <a id="HpackHeader"></a>`HpackHeader` `🔓 export`

&gt; 📄 `hpack.vx` L235-239

```vex
export struct HpackHeader
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `name` | `string` | 🔓 public |  |
| `value` | `string` | 🔓 public |  |

---

### <a id="FiberHeader"></a>`FiberHeader` `🔓 export`

&gt; 📄 `fiber_request.vx` L17-21

```vex
export struct FiberHeader
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `name` | `str` | 🔓 public |  |
| `value` | `str` | 🔓 public |  |

---

### <a id="FiberParsedRequest"></a>`FiberParsedRequest` `🔓 export`

&gt; 📄 `fiber_request.vx` L23-33

```vex
export struct FiberParsedRequest
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `method` | `str` | 🔓 public |  |
| `uri` | `str` | 🔓 public |  |
| `path` | `str` | 🔓 public |  |
| `query` | `str` | 🔓 public |  |
| `version` | `str` | 🔓 public |  |
| `headers` | `Vec&lt;FiberHeader&gt;` | 🔓 public |  |
| `contentLength` | `i64` | 🔓 public |  |
| `keepAlive` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `FiberParsedRequest.empty`[↗](#FiberParsedRequest.empty) | `export fn FiberParsedRequest.empty(): FiberParsedR` |  |

---

### <a id="ParserRequest"></a>`ParserRequest` `🔓 export`

&gt; 📄 `request.vx` L109-115

```vex
export struct ParserRequest
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `method` | `Method` | 🔓 public |  |
| `uri` | `str` | 🔓 public |  |
| `version` | `HttpVersion` | 🔓 public |  |
| `headers` | `ParserHeaders` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `ParserRequest.empty`[↗](#ParserRequest.empty) | `export fn ParserRequest.empty(): ParserRequest` | Create an empty request. |
| `path`[↗](#ParserRequest.path) | `export fn (self: &ParserRequest) path(): str` | Get the URI path component (before '?'). |
| `query`[↗](#ParserRequest.query) | `export fn (self: &ParserRequest) query(): str` | Get query string (after '?'), or empty. |
| `host`[↗](#ParserRequest.host) | `export fn (self: &ParserRequest) host(): str` | Get Host header value. |
| `contentLength`[↗](#ParserRequest.contentLength) | `export fn (self: &ParserRequest) contentLength(): ` | Get Content-Length or -1. |
| `isChunked`[↗](#ParserRequest.isChunked) | `export fn (self: &ParserRequest) isChunked(): bool` | Is this a chunked transfer? |
| `isWebSocketUpgrade`[↗](#ParserRequest.isWebSocketUpgrade) | `export fn (self: &ParserRequest) isWebSocketUpgrad` | Is this a WebSocket upgrade? |
| `hasBody`[↗](#ParserRequest.hasBody) | `export fn (self: &ParserRequest) hasBody(): bool` | Does the request expect a body? |

---

### <a id="ChunkedDecoder"></a>`ChunkedDecoder` `🔓 export`

&gt; 📄 `chunked.vx` L48-54

```vex
export struct ChunkedDecoder
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `state` | `ChunkState` | 🔓 public |  |
| `dataRemaining` | `usize` | 🔓 public |  |
| `totalDecoded` | `usize` | 🔓 public |  |
| `buffered` | `string` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `ChunkedDecoder.new`[↗](#ChunkedDecoder.new) | `export fn ChunkedDecoder.new(): ChunkedDecoder` | Create a new chunked decoder. |
| `decode`[↗](#ChunkedDecoder.decode) | `export fn (self: &ChunkedDecoder!) decode(input: s` | Feed more data into the decoder. |
| `reset`[↗](#ChunkedDecoder.reset) | `export fn (self: &ChunkedDecoder!) reset()` | Reset the decoder for reuse. |
| `isDone`[↗](#ChunkedDecoder.isDone) | `export fn (self: &ChunkedDecoder) isDone(): bool` | Is the decoder finished? |
| `isError`[↗](#ChunkedDecoder.isError) | `export fn (self: &ChunkedDecoder) isError(): bool` | Is the decoder in error state? |

---

### <a id="Response"></a>`Response` `🔓 export`

&gt; 📄 `response.vx` L26-32

```vex
export struct Response
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `statusCode` | `i32` | 🔓 public |  |
| `reasonPhrase` | `str` | 🔓 public |  |
| `version` | `str` | 🔓 public |  |
| `headers` | `ParserHeaders` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Response.empty`[↗](#Response.empty) | `export fn Response.empty(): Response` | Create an empty response. |
| `isInformational`[↗](#Response.isInformational) | `export fn (self: &Response) isInformational(): boo` | True if status is 1xx (informational). |
| `isSuccess`[↗](#Response.isSuccess) | `export fn (self: &Response) isSuccess(): bool` | True if status is 2xx (success). |
| `isRedirect`[↗](#Response.isRedirect) | `export fn (self: &Response) isRedirect(): bool` | True if status is 3xx (redirect). |
| `isClientError`[↗](#Response.isClientError) | `export fn (self: &Response) isClientError(): bool` | True if status is 4xx (client error). |
| `isServerError`[↗](#Response.isServerError) | `export fn (self: &Response) isServerError(): bool` | True if status is 5xx (server error). |
| `contentLength`[↗](#Response.contentLength) | `export fn (self: &Response) contentLength(): i64` | Get Content-Length or -1. |
| `isChunked`[↗](#Response.isChunked) | `export fn (self: &Response) isChunked(): bool` | Is chunked transfer? |
| `isConnectionClose`[↗](#Response.isConnectionClose) | `export fn (self: &Response) isConnectionClose(): b` | Is Connection: close? |
| `location`[↗](#Response.location) | `export fn (self: &Response) location(): str` | Get Location header (for redirects). |
| `contentType`[↗](#Response.contentType) | `export fn (self: &Response) contentType(): str` | Get Content-Type header. |
| `Response.new`[↗](#Response.new) | `export fn Response.new(): Response` | Create a new response with default 200 OK and keep-alive. |
| `reset`[↗](#Response.reset) | `export fn (self: &Response!) reset()` | Reset response for reuse (clears headers, keeps capacity). |
| `status`[↗](#Response.status) | `export fn (self: &Response!) status(code: i32): &R` |  |
| `header`[↗](#Response.header) | `export fn (self: &Response!) header(name: string, ` |  |
| `contentType`[↗](#Response.contentType) | `export fn (self: &Response!) contentType(ct: strin` |  |
| `setBody`[↗](#Response.setBody) | `export fn (self: &Response!) setBody(b: string): &` |  |
| `sendString`[↗](#Response.sendString) | `export fn (self: &Response!) sendString(fd: i32, t` |  |
| `sendJSON`[↗](#Response.sendJSON) | `export fn (self: &Response!) sendJSON(fd: i32, jso` |  |
| `sendHTML`[↗](#Response.sendHTML) | `export fn (self: &Response!) sendHTML(fd: i32, htm` |  |
| `send`[↗](#Response.send) | `export fn (self: &Response!) send(fd: i32)` |  |
| `sendEmpty`[↗](#Response.sendEmpty) | `export fn (self: &Response!) sendEmpty(fd: i32)` |  |
| `writeTo`[↗](#Response.writeTo) | `fn (self: &Response!) writeTo(fd: i32)` |  |
| `writeToWithContentType`[↗](#Response.writeToWithContentType) | `fn (self: &Response!) writeToWithContentType(fd: i` |  |

---

### <a id="H2Stream"></a>`H2Stream` `🔓 export`

&gt; 📄 `stream.vx` L89-98

```vex
export struct H2Stream
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `id` | `u32` | 🔓 public |  |
| `state` | `StreamState` | 🔓 public |  |
| `sendWindow` | `i32` | 🔓 public |  |
| `recvWindow` | `i32` | 🔓 public |  |
| `weight` | `u8` | 🔓 public |  |
| `dependency` | `u32` | 🔓 public |  |
| `exclusive` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `H2Stream.new`[↗](#H2Stream.new) | `export fn H2Stream.new(id: u32, initialWindow: i32` | Create a new stream in idle state. |
| `recvFrame`[↗](#H2Stream.recvFrame) | `export fn (self: &H2Stream!) recvFrame(frame: &H2F` | Process a received frame and transition state. |
| `sendFrame`[↗](#H2Stream.sendFrame) | `export fn (self: &H2Stream!) sendFrame(frame: &H2F` | Process a sent frame and transition state. |
| `consumeSendWindow`[↗](#H2Stream.consumeSendWindow) | `export fn (self: &H2Stream!) consumeSendWindow(siz` | Consume send window for outgoing DATA. Returns false if insufficient. |
| `consumeRecvWindow`[↗](#H2Stream.consumeRecvWindow) | `export fn (self: &H2Stream!) consumeRecvWindow(siz` | Consume receive window for incoming DATA. |
| `applyWindowUpdate`[↗](#H2Stream.applyWindowUpdate) | `export fn (self: &H2Stream!) applyWindowUpdate(inc` | Apply WINDOW_UPDATE increment. |
| `setPriority`[↗](#H2Stream.setPriority) | `export fn (self: &H2Stream!) setPriority(dep: u32,` | Set priority. |
| `isClosed`[↗](#H2Stream.isClosed) | `export fn (self: &H2Stream) isClosed(): bool` | Is the stream in a terminal state? |
| `canSend`[↗](#H2Stream.canSend) | `export fn (self: &H2Stream) canSend(): bool` | Can this stream send DATA/HEADERS? |
| `canRecv`[↗](#H2Stream.canRecv) | `export fn (self: &H2Stream) canRecv(): bool` | Can this stream receive DATA/HEADERS? |

---

### <a id="StreamMap"></a>`StreamMap` `🔓 export`

&gt; 📄 `stream.vx` L396-402

```vex
export struct StreamMap
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `streams` | `Vec&lt;H2Stream&gt;` | 🔓 public |  |
| `initialWindow` | `i32` | 🔓 public |  |
| `nextStreamId` | `u32` | 🔓 public |  |
| `maxStreams` | `u32` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `StreamMap.new`[↗](#StreamMap.new) | `export fn StreamMap.new(initialWindow: i32, maxStr` | Create a new stream map. |
| `getOrCreate`[↗](#StreamMap.getOrCreate) | `export fn (self: &StreamMap!) getOrCreate(id: u32)` | Get or create a stream by ID. |
| `get`[↗](#StreamMap.get) | `export fn (self: &StreamMap) get(index: usize): H2` | Get stream by index. |
| `activeCount`[↗](#StreamMap.activeCount) | `export fn (self: &StreamMap) activeCount(): u32` | Count active (non-closed) streams. |
| `allocateStreamId`[↗](#StreamMap.allocateStreamId) | `export fn (self: &StreamMap!) allocateStreamId(): ` | Allocate next client stream ID. |

---

### <a id="Server"></a>`Server` `🔓 export`

&gt; 📄 `server.vx` L36-41

```vex
export struct Server
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fd` | `i32` | 🔓 public |  |
| `port` | `i32` | 🔓 public |  |
| `host` | `string` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Server.new`[↗](#Server.new) | `export fn Server.new(host: string, port: i32): Ser` | Create and bind a new server. Returns immediately (does not listen yet). |
| `serve`[↗](#Server.serve) | `export fn (self: &Server) serve(handler: RequestHa` | Start accepting connections. Blocks forever (event loop). |
| `close`[↗](#Server.close) | `export fn (self: &Server) close()` | Close the server socket. |

---

### <a id="ConnBuf"></a>`ConnBuf` `🔓 export`

&gt; 📄 `connection.vx` L29-34

```vex
export struct ConnBuf
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `data` | `Vec&lt;u8&gt;` | 🔓 public |  |
| `readPos` | `usize` | 🔓 public |  |
| `writePos` | `usize` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `ConnBuf.new`[↗](#ConnBuf.new) | `export fn ConnBuf.new(): ConnBuf` | Create a new connection buffer with default capacity. |
| `pending`[↗](#ConnBuf.pending) | `export fn (self: &ConnBuf) pending(): usize` | Number of unprocessed bytes available. |
| `writePtr`[↗](#ConnBuf.writePtr) | `export fn (self: &ConnBuf) writePtr(): *u8` | Pointer to the start of free space (where recv should write). |
| `freeSpace`[↗](#ConnBuf.freeSpace) | `export fn (self: &ConnBuf) freeSpace(): usize` | Amount of free space available for recv(). |
| `advance`[↗](#ConnBuf.advance) | `export fn (self: &ConnBuf!) advance(n: usize)` | Advance write position after a successful recv(). |
| `readPtr`[↗](#ConnBuf.readPtr) | `export fn (self: &ConnBuf) readPtr(): *u8` | Pointer to start of unprocessed data. |
| `consume`[↗](#ConnBuf.consume) | `export fn (self: &ConnBuf!) consume(n: usize)` | Consume `n` bytes from the front (after processing). |
| `compact`[↗](#ConnBuf.compact) | `export fn (self: &ConnBuf!) compact()` | Move unprocessed data to front of buffer to free space at the end. |
| `grow`[↗](#ConnBuf.grow) | `export fn (self: &ConnBuf!) grow(): bool` | Grow buffer capacity (doubles up to MAX_BUF). Returns false if at limit. |
| `reset`[↗](#ConnBuf.reset) | `export fn (self: &ConnBuf!) reset()` | Reset for keep-alive reuse (zero alloc — just resets cursors). |

---

### <a id="Connection"></a>`Connection` `🔓 export`

&gt; 📄 `connection.vx` L138-144

```vex
export struct Connection
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fd` | `i32` | 🔓 public |  |
| `buf` | `ConnBuf` | 🔓 public |  |
| `keepAlive` | `bool` | 🔓 public |  |
| `headerLen` | `i32` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Connection.new`[↗](#Connection.new) | `export fn Connection.new(fd: i32): Connection` |  |
| `recv`[↗](#Connection.recv) | `export fn (self: &Connection!) recv(): i64` | Read from socket into buffer. Returns bytes read (0=EOF, &lt;0=error/EAGAIN). |
| `findHeaderEnd`[↗](#Connection.findHeaderEnd) | `export fn (self: &Connection!) findHeaderEnd(): i3` | Check if a complete HTTP header block is available. |
| `reset`[↗](#Connection.reset) | `export fn (self: &Connection!) reset()` | Reset connection for keep-alive reuse. |
| `consumeRequest`[↗](#Connection.consumeRequest) | `export fn (self: &Connection!) consumeRequest(tota` | Consume processed bytes (header + body). |

---

### <a id="MwEntry"></a>`MwEntry`

&gt; 📄 `app.vx` L34-37

```vex
struct MwEntry
```

Wrapper to fix Vec&lt;fn_ptr&gt; codegen issue — struct forces correct element size.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `handler` | `Handler` | 🔓 public |  |

---

### <a id="App"></a>`App` `🔓 export`

&gt; 📄 `app.vx` L39-52

```vex
export struct App
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `bodyLimit` | `i32` | 🔓 public |  |
| `readTimeout` | `i32` | 🔓 public |  |
| `writeTimeout` | `i32` | 🔓 public |  |
| `idleTimeout` | `i32` | 🔓 public |  |
| `serverHeader` | `string` | 🔓 public |  |
| `router` | `Router` | 🔓 public |  |
| `middlewares` | `Vec&lt;MwEntry&gt;` | 🔓 public |  |
| `frozenMiddlewares` | `Vec&lt;MwEntry&gt;` | 🔓 public |  |
| `notFoundHandler` | `Option&lt;Handler&gt;` | 🔓 public |  |
| `errorHandler` | `Option&lt;Handler&gt;` | 🔓 public |  |
| `frozen` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `App.new`[↗](#App.new) | `export fn App.new(): App` | Create a new application with default config. |
| `get`[↗](#App.get) | `export fn (self: &App!) get(path: string, handler:` |  |
| `post`[↗](#App.post) | `export fn (self: &App!) post(path: string, handler` |  |
| `put`[↗](#App.put) | `export fn (self: &App!) put(path: string, handler:` |  |
| `delete`[↗](#App.delete) | `export fn (self: &App!) delete(path: string, handl` |  |
| `patch`[↗](#App.patch) | `export fn (self: &App!) patch(path: string, handle` |  |
| `head`[↗](#App.head) | `export fn (self: &App!) head(path: string, handler` |  |
| `options`[↗](#App.options) | `export fn (self: &App!) options(path: string, hand` |  |
| `static`[↗](#App.static) | `export fn (self: &App!) static(prefix: string, roo` | Serve static files from a directory. |
| `getWith`[↗](#App.getWith) | `export fn (self: &App!) getWith(path: string, midd` | Register GET route with route-level middleware. |
| `postWith`[↗](#App.postWith) | `export fn (self: &App!) postWith(path: string, mid` |  |
| `putWith`[↗](#App.putWith) | `export fn (self: &App!) putWith(path: string, midd` |  |
| `deleteWith`[↗](#App.deleteWith) | `export fn (self: &App!) deleteWith(path: string, m` |  |
| `patchWith`[↗](#App.patchWith) | `export fn (self: &App!) patchWith(path: string, mi` |  |
| `all`[↗](#App.all) | `export fn (self: &App!) all(path: string, handler:` |  |
| `group`[↗](#App.group) | `export fn (self: &App!) group(prefix: string): Gro` | Create a route group with a shared prefix. |
| `use`[↗](#App.use) | `export fn (self: &App!) use(handler: Handler)` |  |
| `setNotFound`[↗](#App.setNotFound) | `export fn (self: &App!) setNotFound(handler: Handl` |  |
| `setErrorHandler`[↗](#App.setErrorHandler) | `export fn (self: &App!) setErrorHandler(handler: H` |  |
| `freeze`[↗](#App.freeze) | `export fn (self: &App!) freeze()` | Freeze the application: compile radix tree and snapshot middleware list. |
| `listen`[↗](#App.listen) | `export fn (self: &App!) listen(host: string, port:` | Start the server. Blocks forever. |
| `runAcceptor`[↗](#App.runAcceptor) | `fn (self: &App!) runAcceptor(listen_fd: i32, pipe_` | macOS acceptor: accepts connections and distributes to workers via pipes. |
| `runClientWorker`[↗](#App.runClientWorker) | `fn (self: &App!) runClientWorker(pipe_rd: i32)` | macOS client worker: receives FDs via pipe, handles HTTP connections. |
| `runWorker`[↗](#App.runWorker) | `fn (self: &App!) runWorker(listen_fd: i32)` |  |
| `processEvents`[↗](#App.processEvents) | `fn (self: &App!) processEvents(n: i32, events_buf_` |  |
| `handleRequest`[↗](#App.handleRequest) | `fn (self: &App!) handleRequest(fd: i32, ev_loop: &` |  |
| `dispatchRequest`[↗](#App.dispatchRequest) | `fn (self: &App!) dispatchRequest(fd: i32, ev_loop:` |  |
| `tryHandleH2`[↗](#App.tryHandleH2) | `fn (self: &App!) tryHandleH2(fd: i32, buf: *u8, n:` |  |
| `handleH2Headers`[↗](#App.handleH2Headers) | `fn (self: &App!) handleH2Headers(fd: i32, stream_i` |  |
| `dispatchH2Request`[↗](#App.dispatchH2Request) | `fn (self: &App!) dispatchH2Request(ctx: &Ctx!, han` |  |

---

### <a id="Group"></a>`Group` `🔓 export`

&gt; 📄 `group.vx` L26-31

```vex
export struct Group
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `prefix` | `string` | 🔓 public |  |
| `router` | `&Router!` | 🔓 public |  |
| `middlewares` | `Vec&lt;HandlerSlot&gt;` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Group.create`[↗](#Group.create) | `export fn Group.create(prefix: string, router: &Ro` | Create a group (called by App.group() — not directly by users). |
| `get`[↗](#Group.get) | `export fn (self: &Group!) get(path: string, handle` |  |
| `post`[↗](#Group.post) | `export fn (self: &Group!) post(path: string, handl` |  |
| `put`[↗](#Group.put) | `export fn (self: &Group!) put(path: string, handle` |  |
| `delete`[↗](#Group.delete) | `export fn (self: &Group!) delete(path: string, han` |  |
| `patch`[↗](#Group.patch) | `export fn (self: &Group!) patch(path: string, hand` |  |
| `head`[↗](#Group.head) | `export fn (self: &Group!) head(path: string, handl` |  |
| `options`[↗](#Group.options) | `export fn (self: &Group!) options(path: string, ha` |  |
| `static`[↗](#Group.static) | `export fn (self: &Group!) static(prefix: string, r` | Serve static files from a directory under this group. |
| `all`[↗](#Group.all) | `export fn (self: &Group!) all(path: string, handle` |  |
| `use`[↗](#Group.use) | `export fn (self: &Group!) use(handler: Handler)` |  |
| `group`[↗](#Group.group) | `export fn (self: &Group!) group(subPrefix: string)` | Create a sub-group with an additional prefix. |

---

### <a id="HandlerEntry"></a>`HandlerEntry`

&gt; 📄 `router.vx` L21-24

```vex
struct HandlerEntry
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `handler` | `Handler` | 🔓 public |  |

---

### <a id="Route"></a>`Route`

&gt; 📄 `router.vx` L29-36

```vex
struct Route
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `method` | `string` | 🔓 public |  |
| `pattern` | `string` | 🔓 public |  |
| `handler` | `HandlerEntry` | 🔓 public |  |
| `isStatic` | `bool` | 🔓 public |  |
| `middlewares` | `Vec&lt;HandlerEntry&gt;` | 🔓 public |  |

---

### <a id="Router"></a>`Router` `🔓 export`

&gt; 📄 `router.vx` L58-77

```vex
export struct Router
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `routeMethodIds` | `Vec&lt;i32&gt;` | 🔓 public |  |
| `routePatterns` | `Vec&lt;string&gt;` | 🔓 public |  |
| `routeParamNameStart` | `Vec&lt;usize&gt;` | 🔓 public |  |
| `routeParamNameLen` | `Vec&lt;usize&gt;` | 🔓 public |  |
| `routeParamNamePool` | `Vec&lt;string&gt;` | 🔓 public |  |
| `routeHandlers` | `Vec&lt;HandlerEntry&gt;` | 🔓 public |  |
| `routeIsStatic` | `Vec&lt;bool&gt;` | 🔓 public |  |
| `routeMwStart` | `Vec&lt;usize&gt;` | 🔓 public |  |
| `routeMwLen` | `Vec&lt;usize&gt;` | 🔓 public |  |
| `routeMwPool` | `Vec&lt;HandlerEntry&gt;` | 🔓 public |  |
| `trees` | `Vec&lt;RadixTree&gt;` | 🔓 public |  |
| `frozen` | `bool` | 🔓 public |  |
| `cacheMid` | `i32` | 🔓 public |  |
| `cachePath` | `string` | 🔓 public |  |
| `cacheIdx` | `i32` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Router.new`[↗](#Router.new) | `export fn Router.new(): Router` | Create an empty router. |
| `add`[↗](#Router.add) | `export fn (self: &Router!) add(method: str, patter` | Register a route with a method, pattern, and handler. |
| `addWithMiddleware`[↗](#Router.addWithMiddleware) | `export fn (self: &Router!) addWithMiddleware(metho` | Register a route with route-level middleware. |
| `freeze`[↗](#Router.freeze) | `export fn (self: &Router!) freeze()` | Compile all routes into per-method radix trees. |
| `find`[↗](#Router.find) | `export fn (self: &Router!) find(method: str, path:` | Find a matching route and extract parameters into ctx. |
| `findRadix`[↗](#Router.findRadix) | `fn (self: &Router!) findRadix(method: str, path: s` | Radix tree lookup — O(L) via Vec&lt;RadixTree&gt; indexed by method ID. |
| `findLinear`[↗](#Router.findLinear) | `fn (self: &Router!) findLinear(method: str, path: ` | Linear scan — O(N) with hot route cache (O(1) for repeated paths). |

---

### <a id="Ctx"></a>`Ctx` `🔓 export`

&gt; 📄 `ctx.vx` L32-47

```vex
export struct Ctx
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `req` | `Request` | 🔓 public |  |
| `res` | `Response` | 🔓 public |  |
| `routePath` | `string` | 🔓 public |  |
| `routeParams` | `Vec&lt;ParamEntry&gt;` | 🔓 public |  |
| `queryParams` | `Vec&lt;ParamEntry&gt;` | 🔓 public |  |
| `locals` | `Vec&lt;LocalEntry&gt;` | 🔓 public |  |
| `handlers` | `Vec&lt;HandlerSlot&gt;` | 🔓 public |  |
| `routeMiddlewares` | `Vec&lt;HandlerSlot&gt;` | 🔓 public |  |
| `handlerIdx` | `usize` | 🔓 public |  |
| `cookieParsed` | `bool` | 🔓 public |  |
| `parsedCookies` | `Vec&lt;CookiePair&gt;` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Ctx.new`[↗](#Ctx.new) | `export fn Ctx.new(req: Request): Ctx` | Create a new Ctx from a parsed request. |
| `Ctx.empty`[↗](#Ctx.empty) | `export fn Ctx.empty(): Ctx` | Create an empty Ctx for pre-allocation (zero alloc reuse pattern). |
| `reset`[↗](#Ctx.reset) | `export fn (self: &Ctx!) reset()` | Reset Ctx for reuse — clears all Vecs keeping capacity (zero alloc after warmup). |
| `method`[↗](#Ctx.method) | `export fn (self: &Ctx) method(): str` | HTTP method (GET, POST, PUT, DELETE, etc.) |
| `path`[↗](#Ctx.path) | `export fn (self: &Ctx) path(): str` | Request path (without query string). |
| `params`[↗](#Ctx.params) | `export fn (self: &Ctx) params(key: string): string` | Get route parameter by name (from :param patterns). |
| `query`[↗](#Ctx.query) | `export fn (self: &Ctx) query(key: string): string` | Get query parameter by name. |
| `header`[↗](#Ctx.header) | `export fn (self: &Ctx) header(name: str): str` | Get request header by name (case-insensitive). |
| `body`[↗](#Ctx.body) | `export fn (self: &Ctx) body(): str` | Raw request body. |
| `contentType`[↗](#Ctx.contentType) | `export fn (self: &Ctx) contentType(): str` | Request Content-Type. |
| `isJSON`[↗](#Ctx.isJSON) | `export fn (self: &Ctx) isJSON(): bool` | Check if request is JSON. |
| `contentLength`[↗](#Ctx.contentLength) | `export fn (self: &Ctx) contentLength(): i64` | Content-Length value (-1 if not present). |
| `protocol`[↗](#Ctx.protocol) | `export fn (self: &Ctx) protocol(): str` | HTTP version string (e.g. "HTTP/1.1", "HTTP/2"). |
| `originalURL`[↗](#Ctx.originalURL) | `export fn (self: &Ctx) originalURL(): string` | Full original URL (path + query string). Returns owned string. |
| `baseURL`[↗](#Ctx.baseURL) | `export fn (self: &Ctx) baseURL(): string` | Base URL (scheme + host). Derives from Host header. |
| `hostname`[↗](#Ctx.hostname) | `export fn (self: &Ctx) hostname(): str` | Hostname from Host header (without port). |
| `ip`[↗](#Ctx.ip) | `export fn (self: &Ctx) ip(): str` | Client IP address from X-Forwarded-For or X-Real-IP headers. |
| `userAgent`[↗](#Ctx.userAgent) | `export fn (self: &Ctx) userAgent(): str` | User-Agent header. |
| `get`[↗](#Ctx.get) | `export fn (self: &Ctx) get(name: str): str` | Get request header by name (alias for header(), Fiber v3 compat). |
| `xhr`[↗](#Ctx.xhr) | `export fn (self: &Ctx) xhr(): bool` | Check if request is XMLHttpRequest (AJAX). |
| `accepts`[↗](#Ctx.accepts) | `export fn (self: &Ctx) accepts(contentType: str): ` | Check if the request accepts a given content type. |
| `cookies`[↗](#Ctx.cookies) | `export fn (self: &Ctx!) cookies(name: string): str` | Get a cookie value by name from the request. |
| `setCookie`[↗](#Ctx.setCookie) | `export fn (self: &Ctx!) setCookie(cookie: Cookie)` | Set a cookie on the response (adds Set-Cookie header). |
| `setSimpleCookie`[↗](#Ctx.setSimpleCookie) | `export fn (self: &Ctx!) setSimpleCookie(name: stri` | Set a simple cookie by name, value, and max-age in seconds (HttpOnly). |
| `clearCookie`[↗](#Ctx.clearCookie) | `export fn (self: &Ctx!) clearCookie(name: string)` | Delete a cookie by name (Max-Age=0). |
| `status`[↗](#Ctx.status) | `export fn (self: &Ctx!) status(code: i32): &Ctx!` | Set response status code (chainable). |
| `setType`[↗](#Ctx.setType) | `export fn (self: &Ctx!) setType(ct: string): &Ctx!` | Set response Content-Type (chainable). |
| `set`[↗](#Ctx.set) | `export fn (self: &Ctx!) set(name: string, value: s` | Set a response header (chainable). |
| `sendString`[↗](#Ctx.sendString) | `export fn (self: &Ctx!) sendString(text: string)` | Send a plain text response. |
| `sendJSON`[↗](#Ctx.sendJSON) | `export fn (self: &Ctx!) sendJSON(json: string)` | Send a JSON string response. |
| `sendHTML`[↗](#Ctx.sendHTML) | `export fn (self: &Ctx!) sendHTML(html: string)` | Send an HTML response. |
| `send`[↗](#Ctx.send) | `export fn (self: &Ctx!) send()` | Send the response with current body/status. |
| `sendStatus`[↗](#Ctx.sendStatus) | `export fn (self: &Ctx!) sendStatus(code: i32)` | Send an empty response (status + headers only). |
| `redirect`[↗](#Ctx.redirect) | `export fn (self: &Ctx!) redirect(url: string)` | Redirect to a URL (302 by default). |
| `redirectWithStatus`[↗](#Ctx.redirectWithStatus) | `export fn (self: &Ctx!) redirectWithStatus(url: st` | Redirect with a specific status code (301, 302, 307, 308). |
| `location`[↗](#Ctx.location) | `export fn (self: &Ctx!) location(path: string): &C` | Set Location header only (no redirect status). |
| `download`[↗](#Ctx.download) | `export fn (self: &Ctx!) download(body: string, fil` | Set Content-Disposition for file download. |
| `setContentType`[↗](#Ctx.setContentType) | `export fn (self: &Ctx!) setContentType(ext: string` | Set Content-Type based on file extension. |
| `sendFile`[↗](#Ctx.sendFile) | `export fn (self: &Ctx!) sendFile(filePath: string)` | Serve a file from the filesystem. |
| `upgradeWs`[↗](#Ctx.upgradeWs) | `export fn (self: &Ctx!) upgradeWs(): WsConn` | Upgrade this request to a WebSocket connection. |
| `sse`[↗](#Ctx.sse) | `export fn (self: &Ctx!) sse(): SseWriter` | Begin a Server-Sent Events stream on this connection. |
| `next`[↗](#Ctx.next) | `export fn (self: &Ctx!) next()` | Continue to the next handler in the middleware chain. |
| `setLocal`[↗](#Ctx.setLocal) | `export fn (self: &Ctx!) setLocal(key: string, valu` | Set a local value (for passing data between middlewares). |
| `getLocal`[↗](#Ctx.getLocal) | `export fn (self: &Ctx) getLocal(key: string): stri` | Get a local value set by a previous middleware. |
| `bodyJSON`[↗](#Ctx.bodyJSON) | `export fn (self: &Ctx) bodyJSON(key: string): stri` | Get a value from a JSON body by key (simple top-level string extraction). |
| `formValue`[↗](#Ctx.formValue) | `export fn (self: &Ctx) formValue(key: string): str` | Get a form value from application/x-www-form-urlencoded body. |

---

### <a id="HandlerSlot"></a>`HandlerSlot` `🔓 export`

&gt; 📄 `ctx.vx` L51-54

```vex
export struct HandlerSlot
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `handler` | `Handler` | 🔓 public |  |

---

### <a id="ParamEntry"></a>`ParamEntry` `🔓 export`

&gt; 📄 `ctx.vx` L57-61

```vex
export struct ParamEntry
```

Key-value pair for route parameters.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `key` | `string` | 🔓 public |  |
| `value` | `string` | 🔓 public |  |

---

### <a id="LocalEntry"></a>`LocalEntry` `🔓 export`

&gt; 📄 `ctx.vx` L64-68

```vex
export struct LocalEntry
```

Key-value pair for user-defined locals (middleware data passing).

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `key` | `string` | 🔓 public |  |
| `value` | `string` | 🔓 public |  |

---

### <a id="RadixTree"></a>`RadixTree` `🔓 export`

&gt; 📄 `radix.vx` L11-23

```vex
export struct RadixTree
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `parents` | `Vec&lt;i32&gt;` | 🔓 public |  |
| `prefixes` | `Vec&lt;string&gt;` | 🔓 public |  |
| `kinds` | `Vec&lt;i32&gt;` | 🔓 public |  |
| `paramNames` | `Vec&lt;string&gt;` | 🔓 public |  |
| `handlerIdx` | `Vec&lt;i32&gt;` | 🔓 public |  |
| `handlerPool` | `Vec&lt;Handler&gt;` | 🔓 public |  |
| `hasHandlers` | `Vec&lt;bool&gt;` | 🔓 public |  |
| `mwStart` | `Vec&lt;usize&gt;` | 🔓 public |  |
| `mwLen` | `Vec&lt;usize&gt;` | 🔓 public |  |
| `mwPool` | `Vec&lt;Handler&gt;` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `RadixTree.new`[↗](#RadixTree.new) | `export fn RadixTree.new(): RadixTree` |  |
| `insert`[↗](#RadixTree.insert) | `export fn (self: &RadixTree!) insert(pattern: stri` |  |
| `insertWithMiddleware`[↗](#RadixTree.insertWithMiddleware) | `export fn (self: &RadixTree!) insertWithMiddleware` |  |
| `find`[↗](#RadixTree.find) | `export fn (self: &RadixTree) find(path: string): M` |  |

---

### <a id="MatchResult"></a>`MatchResult` `🔓 export`

&gt; 📄 `radix.vx` L25-31

```vex
export struct MatchResult
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `found` | `bool` | 🔓 public |  |
| `handler` | `Option&lt;Handler&gt;` | 🔓 public |  |
| `params` | `Vec&lt;ParamPair&gt;` | 🔓 public |  |
| `middlewares` | `Vec&lt;HandlerSlot&gt;` | 🔓 public |  |

---

### <a id="ParamPair"></a>`ParamPair` `🔓 export`

&gt; 📄 `radix.vx` L33-37

```vex
export struct ParamPair
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `key` | `string` | 🔓 public |  |
| `value` | `string` | 🔓 public |  |

---

### <a id="SseWriter"></a>`SseWriter` `🔓 export`

&gt; 📄 `sse.vx` L23-27

```vex
export struct SseWriter
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fd` | `i32` | 🔓 public |  |
| `open` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `SseWriter.init`[↗](#SseWriter.init) | `export fn SseWriter.init(fd: i32): SseWriter` | Create a new SseWriter for the given socket fd. |
| `emit`[↗](#SseWriter.emit) | `export fn (self: &SseWriter!) emit(event: str, dat` | Send a named event with a data payload. |
| `data`[↗](#SseWriter.data) | `export fn (self: &SseWriter!) data(data: str)` | Send a data-only event (no event type). |
| `ping`[↗](#SseWriter.ping) | `export fn (self: &SseWriter!) ping()` | Send a keep-alive comment to prevent connection timeout. |
| `close`[↗](#SseWriter.close) | `export fn (self: &SseWriter!) close()` | Mark the stream as closed. Does not close the socket (caller controls fd). |
| `isOpen`[↗](#SseWriter.isOpen) | `export fn (self: &SseWriter) isOpen(): bool` | Check if the stream is still open (client connected). |

---

### <a id="ClientResponse"></a>`ClientResponse` `🔓 export`

&gt; 📄 `client.vx` L42-50

```vex
export struct ClientResponse
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `status` | `i32` | 🔓 public |  |
| `statusText` | `string` | 🔓 public |  |
| `version` | `string` | 🔓 public |  |
| `headers` | `Headers` | 🔓 public |  |
| `body` | `string` | 🔓 public |  |
| `valid` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `ClientResponse.invalid`[↗](#ClientResponse.invalid) | `fn ClientResponse.invalid(): ClientResponse` | Empty/error response sentinel. |
| `header`[↗](#ClientResponse.header) | `export fn (self: &ClientResponse) header(name: str` | Get a response header (case-insensitive). |
| `ok`[↗](#ClientResponse.ok) | `export fn (self: &ClientResponse) ok(): bool` | Check if response was successful (2xx). |
| `isRedirect`[↗](#ClientResponse.isRedirect) | `export fn (self: &ClientResponse) isRedirect(): bo` | Check if response is a redirect (3xx). |

---

### <a id="ClientRequest"></a>`ClientRequest` `🔓 export`

&gt; 📄 `client.vx` L83-92

```vex
export struct ClientRequest
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `method` | `string` | 🔓 public |  |
| `host` | `string` | 🔓 public |  |
| `port` | `i32` | 🔓 public |  |
| `path` | `string` | 🔓 public |  |
| `headers` | `Headers` | 🔓 public |  |
| `body` | `string` | 🔓 public |  |
| `timeout` | `i32` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `ClientRequest.new`[↗](#ClientRequest.new) | `export fn ClientRequest.new(method: string, host: ` | Create a new client request. |
| `setHeader`[↗](#ClientRequest.setHeader) | `export fn (self: &ClientRequest!) setHeader(name: ` | Set a request header. |
| `setBody`[↗](#ClientRequest.setBody) | `export fn (self: &ClientRequest!) setBody(b: strin` | Set the request body. |
| `setContentType`[↗](#ClientRequest.setContentType) | `export fn (self: &ClientRequest!) setContentType(c` | Set Content-Type header. |
| `send`[↗](#ClientRequest.send) | `export fn (self: &ClientRequest!) send(): ClientRe` | Send the HTTP request and return the response. |

---

### <a id="Request"></a>`Request` `🔓 export`

&gt; 📄 `request.vx` L24-38

```vex
export struct Request
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `method` | `str` | 🔓 public |  |
| `path` | `str` | 🔓 public |  |
| `query` | `str` | 🔓 public |  |
| `version` | `str` | 🔓 public |  |
| `headers` | `RequestHeaders` | 🔓 public |  |
| `body` | `str` | 🔓 public |  |
| `_raw` | `string` | 🔓 public |  |
| `fd` | `i32` | 🔓 public |  |
| `streamId` | `i32` | 🔓 public |  |
| `valid` | `bool` | 🔓 public |  |
| `contentLength` | `i64` | 🔓 public |  |
| `keepAlive` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Request.invalid`[↗](#Request.invalid) | `export fn Request.invalid(): Request` | Empty/invalid request sentinel. |
| `header`[↗](#Request.header) | `export fn (self: &Request) header(name: str): str` | Get a header value by name (case-insensitive). Returns empty str if absent. |
| `hasHeader`[↗](#Request.hasHeader) | `export fn (self: &Request) hasHeader(name: str): b` | Check if a header exists. |
| `isMethod`[↗](#Request.isMethod) | `export fn (self: &Request) isMethod(m: str): bool` | Check if the request method matches (case-sensitive). |
| `hasBody`[↗](#Request.hasBody) | `export fn (self: &Request) hasBody(): bool` | Check if the request has a body. |
| `contentType`[↗](#Request.contentType) | `export fn (self: &Request) contentType(): str` | Get Content-Type header. |
| `isJSON`[↗](#Request.isJSON) | `export fn (self: &Request) isJSON(): bool` | Check if request is JSON. |

---

### <a id="Response"></a>`Response` `🔓 export`

&gt; 📄 `response.vx` L24-31

```vex
export struct Response
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `statusCode` | `i32` | 🔓 public |  |
| `headers` | `Headers` | 🔓 public |  |
| `body` | `string` | 🔓 public |  |
| `sent` | `bool` | 🔓 public |  |
| `keepAlive` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Response.empty`[↗](#Response.empty) | `export fn Response.empty(): Response` | Create an empty response. |
| `isInformational`[↗](#Response.isInformational) | `export fn (self: &Response) isInformational(): boo` | True if status is 1xx (informational). |
| `isSuccess`[↗](#Response.isSuccess) | `export fn (self: &Response) isSuccess(): bool` | True if status is 2xx (success). |
| `isRedirect`[↗](#Response.isRedirect) | `export fn (self: &Response) isRedirect(): bool` | True if status is 3xx (redirect). |
| `isClientError`[↗](#Response.isClientError) | `export fn (self: &Response) isClientError(): bool` | True if status is 4xx (client error). |
| `isServerError`[↗](#Response.isServerError) | `export fn (self: &Response) isServerError(): bool` | True if status is 5xx (server error). |
| `contentLength`[↗](#Response.contentLength) | `export fn (self: &Response) contentLength(): i64` | Get Content-Length or -1. |
| `isChunked`[↗](#Response.isChunked) | `export fn (self: &Response) isChunked(): bool` | Is chunked transfer? |
| `isConnectionClose`[↗](#Response.isConnectionClose) | `export fn (self: &Response) isConnectionClose(): b` | Is Connection: close? |
| `location`[↗](#Response.location) | `export fn (self: &Response) location(): str` | Get Location header (for redirects). |
| `contentType`[↗](#Response.contentType) | `export fn (self: &Response) contentType(): str` | Get Content-Type header. |
| `Response.new`[↗](#Response.new) | `export fn Response.new(): Response` | Create a new response with default 200 OK and keep-alive. |
| `reset`[↗](#Response.reset) | `export fn (self: &Response!) reset()` | Reset response for reuse (clears headers, keeps capacity). |
| `status`[↗](#Response.status) | `export fn (self: &Response!) status(code: i32): &R` |  |
| `header`[↗](#Response.header) | `export fn (self: &Response!) header(name: string, ` |  |
| `contentType`[↗](#Response.contentType) | `export fn (self: &Response!) contentType(ct: strin` |  |
| `setBody`[↗](#Response.setBody) | `export fn (self: &Response!) setBody(b: string): &` |  |
| `sendString`[↗](#Response.sendString) | `export fn (self: &Response!) sendString(fd: i32, t` |  |
| `sendJSON`[↗](#Response.sendJSON) | `export fn (self: &Response!) sendJSON(fd: i32, jso` |  |
| `sendHTML`[↗](#Response.sendHTML) | `export fn (self: &Response!) sendHTML(fd: i32, htm` |  |
| `send`[↗](#Response.send) | `export fn (self: &Response!) send(fd: i32)` |  |
| `sendEmpty`[↗](#Response.sendEmpty) | `export fn (self: &Response!) sendEmpty(fd: i32)` |  |
| `writeTo`[↗](#Response.writeTo) | `fn (self: &Response!) writeTo(fd: i32)` |  |
| `writeToWithContentType`[↗](#Response.writeToWithContentType) | `fn (self: &Response!) writeToWithContentType(fd: i` |  |

---

### <a id="WsFrame"></a>`WsFrame` `🔓 export`

&gt; 📄 `ws.vx` L36-44

```vex
export struct WsFrame
```

Parsed WebSocket frame.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fin` | `bool` | 🔓 public |  |
| `opcode` | `u8` | 🔓 public |  |
| `masked` | `bool` | 🔓 public |  |
| `payloadLen` | `u64` | 🔓 public |  |
| `mask` | `[u8; 4]` | 🔓 public |  |
| `payload` | `*u8` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `isControl`[↗](#WsFrame.isControl) | `export fn (self: &WsFrame) isControl(): bool` | Is this a control frame? (opcodes 0x8-0xF) |
| `isText`[↗](#WsFrame.isText) | `export fn (self: &WsFrame) isText(): bool` | Is this a text frame? |
| `isBinary`[↗](#WsFrame.isBinary) | `export fn (self: &WsFrame) isBinary(): bool` | Is this a binary frame? |
| `isClose`[↗](#WsFrame.isClose) | `export fn (self: &WsFrame) isClose(): bool` | Is this a close frame? |
| `isPing`[↗](#WsFrame.isPing) | `export fn (self: &WsFrame) isPing(): bool` | Is this a ping frame? |
| `isPong`[↗](#WsFrame.isPong) | `export fn (self: &WsFrame) isPong(): bool` | Is this a pong frame? |

---

### <a id="WsMessage"></a>`WsMessage` `🔓 export`

&gt; 📄 `ws.vx` L49-53

```vex
export struct WsMessage
```

A complete WebSocket message (possibly assembled from fragments).

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `opcode` | `u8` | 🔓 public |  |
| `data` | `string` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `WsMessage.new`[↗](#WsMessage.new) | `export fn WsMessage.new(): WsMessage` |  |
| `feedFrame`[↗](#WsMessage.feedFrame) | `export fn (self: &WsMessage!) feedFrame(frame: &Ws` | Feed a parsed frame into the message assembler. |
| `reset`[↗](#WsMessage.reset) | `export fn (self: &WsMessage!) reset()` | Reset for next message. |
| `isText`[↗](#WsMessage.isText) | `export fn (self: &WsMessage) isText(): bool` | Check if this is a text message. |
| `isBinary`[↗](#WsMessage.isBinary) | `export fn (self: &WsMessage) isBinary(): bool` | Check if this is a binary message. |
| `isClose`[↗](#WsMessage.isClose) | `export fn (self: &WsMessage) isClose(): bool` | Check if this is a close frame. |
| `isPing`[↗](#WsMessage.isPing) | `export fn (self: &WsMessage) isPing(): bool` | Check if this is a ping frame. |
| `text`[↗](#WsMessage.text) | `export fn (self: &WsMessage) text(): string` | Get the text content (for text messages). |

---

### <a id="WsConn"></a>`WsConn` `🔓 export`

&gt; 📄 `ws.vx` L84-88

```vex
export struct WsConn
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fd` | `i32` | 🔓 public |  |
| `open` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `WsConn.new`[↗](#WsConn.new) | `export fn WsConn.new(fd: i32): WsConn` | Create a WebSocket connection from an already-upgraded socket fd. |
| `WsConn.upgrade`[↗](#WsConn.upgrade) | `export fn WsConn.upgrade(fd: i32, req: &Request): ` | Perform the WebSocket upgrade handshake. |
| `sendText`[↗](#WsConn.sendText) | `export fn (self: &WsConn!) sendText(text: string)` | Send a text message. |
| `sendBinary`[↗](#WsConn.sendBinary) | `export fn (self: &WsConn!) sendBinary(data: *u8, l` | Send a binary message. |
| `sendPing`[↗](#WsConn.sendPing) | `export fn (self: &WsConn!) sendPing()` | Send a ping frame. |
| `sendPong`[↗](#WsConn.sendPong) | `export fn (self: &WsConn!) sendPong()` | Send a pong frame (response to ping). |
| `close`[↗](#WsConn.close) | `export fn (self: &WsConn!) close()` | Send a close frame and mark connection as closed. |
| `readMessage`[↗](#WsConn.readMessage) | `export fn (self: &WsConn!) readMessage(): Option&lt;W` | Read the next WebSocket message. Blocks until a message arrives. |
| `messageLoop`[↗](#WsConn.messageLoop) | `export fn (self: &WsConn!) messageLoop(handler: fn` | Run a message loop. Calls the handler for each received message. |

---

## Enums

### <a id="WsParseResult"></a>`WsParseResult` `🔓 export`

&gt; 📄 `ws.vx` L107-114

```vex
export enum WsParseResult
```

**Variants:**

- `Ok` — Frame header parsed. WsFrame contains metadata.
- `NeedMore` — Need more data (at least needBytes more).
- `Error` — Protocol error.

---

### <a id="HeaderParseResult"></a>`HeaderParseResult` `🔓 export`

&gt; 📄 `headers.vx` L143-152

```vex
export enum HeaderParseResult
```

Parse result for headers.

**Variants:**

- `Complete` — ParserHeaders fully parsed. Value = position after \r\n\r\n.
- `Incomplete` — Need more data (incomplete header block).
- `Error` — Malformed header line.
- `TooManyHeaders` — Too many headers.

---

### <a id="H2ParseResult"></a>`H2ParseResult` `🔓 export`

&gt; 📄 `h2.vx` L108-115

```vex
export enum H2ParseResult
```

**Variants:**

- `Ok` — Frame header parsed successfully.
- `NeedMore` — Need more data (at least N bytes).
- `Error` — Protocol error.

---

### <a id="BodyMode"></a>`BodyMode` `🔓 export`

&gt; 📄 `body.vx` L19-28

```vex
export enum BodyMode
```

**Variants:**

- `NoBody` — No body (HEAD response, 204, 304, etc.)
- `ContentLength` — Fixed-length body.
- `Chunked` — Chunked transfer encoding.
- `UntilClose` — Read until connection close (HTTP/1.0 fallback).

---

### <a id="BodyResult"></a>`BodyResult` `🔓 export`

&gt; 📄 `body.vx` L110-119

```vex
export enum BodyResult
```

**Variants:**

- `Data` — Got body data as an owned string.
- `NeedMore` — Need more data.
- `Done` — Body complete. usize = total bytes.
- `Error` — Error.

---

### <a id="HpackResult"></a>`HpackResult` `🔓 export`

&gt; 📄 `hpack.vx` L241-250

```vex
export enum HpackResult
```

**Variants:**

- `Ok` — Decoded one header.
- `TableUpdate` — Dynamic table size update (not a header).
- `NeedMore` — Need more data.
- `Error` — Decode error.

---

### <a id="FiberRequestResult"></a>`FiberRequestResult` `🔓 export`

&gt; 📄 `fiber_request.vx` L35-39

```vex
export enum FiberRequestResult
```

**Variants:**

- `Complete`
- `Incomplete`
- `Error`

---

### <a id="Method"></a>`Method` `🔓 export`

&gt; 📄 `request.vx` L27-38

```vex
export enum Method
```

**Variants:**

- `GET`
- `POST`
- `PUT`
- `DELETE`
- `PATCH`
- `HEAD`
- `OPTIONS`
- `CONNECT`
- `TRACE`
- `Unknown`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `asStr`[↗](#Method.asStr) | `export fn (self: &Method) asStr(): str` | Method to string. |

---

### <a id="HttpVersion"></a>`HttpVersion` `🔓 export`

&gt; 📄 `request.vx` L84-88

```vex
export enum HttpVersion
```

**Variants:**

- `Http10`
- `Http11`
- `Unknown`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `asStr`[↗](#HttpVersion.asStr) | `export fn (self: &HttpVersion) asStr(): str` |  |

---

### <a id="RequestResult"></a>`RequestResult` `🔓 export`

&gt; 📄 `request.vx` L192-199

```vex
export enum RequestResult
```

**Variants:**

- `Complete` — Fully parsed. usize = byte offset where body starts.
- `Incomplete` — Need more data (headers not complete).
- `Error` — Protocol error.

---

### <a id="ChunkState"></a>`ChunkState` `🔓 export`

&gt; 📄 `chunked.vx` L29-42

```vex
export enum ChunkState
```

**Variants:**

- `Size` — Expecting chunk-size line.
- `Data` — Reading chunk-data (dataRemaining bytes left).
- `DataCRLF` — Expecting CRLF after chunk-data.
- `Trailer` — After last-chunk (size=0), expecting trailer/final CRLF.
- `Done` — Fully decoded.
- `Error` — Decode error.

---

### <a id="ChunkResult"></a>`ChunkResult` `🔓 export`

&gt; 📄 `chunked.vx` L70-79

```vex
export enum ChunkResult
```

**Variants:**

- `Data` — Got chunk data as an owned string.
- `NeedMore` — Need more data to continue.
- `Done` — All chunks decoded. usize = total bytes consumed from input.
- `Error` — Decode error.

---

### <a id="ResponseResult"></a>`ResponseResult` `🔓 export`

&gt; 📄 `response.vx` L102-109

```vex
export enum ResponseResult
```

**Variants:**

- `Complete` — Fully parsed. usize = byte offset where body starts.
- `Incomplete` — Need more data.
- `Error` — Protocol error.

---

### <a id="HuffDecodeResult"></a>`HuffDecodeResult` `🔓 export`

&gt; 📄 `huffman.vx` L338-343

```vex
export enum HuffDecodeResult
```

Decode result

**Variants:**

- `Ok` — Successfully decoded. usize = bytes written to output.
- `Error` — Invalid Huffman sequence.

---

### <a id="StreamState"></a>`StreamState` `🔓 export`

&gt; 📄 `stream.vx` L47-55

```vex
export enum StreamState
```

**Variants:**

- `Idle`
- `ReservedLocal`
- `ReservedRemote`
- `Open`
- `HalfClosedLocal`
- `HalfClosedRemote`
- `Closed`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `name`[↗](#StreamState.name) | `export fn (self: &StreamState) name(): str` | Human-readable state name. |

---

### <a id="StreamError"></a>`StreamError` `🔓 export`

&gt; 📄 `stream.vx` L74-83

```vex
export enum StreamError
```

**Variants:**

- `Ok` — No error, transition successful.
- `InvalidTransition` — Frame type not valid in current state.
- `StreamError` — Stream-level protocol error (RST_STREAM).
- `ConnectionError` — Connection-level error (GOAWAY).

---

## Functions

### <a id="parseCookies"></a>`parseCookies` `🔓 export`

&gt; 📄 `cookie.vx` L115-157

```vex
export fn parseCookies(header: str): Vec<CookiePair>
```

Parse a Cookie header value: "name1=val1; name2=val2; ..."

Returns a vector of CookiePair. Accepts str — no allocation at call site.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `header` | `str` |  |

**Returns:** `Vec&lt;CookiePair&gt;`

---

### <a id="trimStr"></a>`trimStr`

&gt; 📄 `cookie.vx` L160-175

```vex
fn trimStr(s: str): str
```

Trim leading and trailing spaces/tabs. Returns sub-str view (no alloc).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `str` |  |

**Returns:** `str`

---

### <a id="staticFiles"></a>`staticFiles` `🔓 export`

&gt; 📄 `static.vx` L18-81

```vex
export fn staticFiles(c: &Ctx!, root: string, prefix: string)
```

Serve static files from `root` directory.

`prefix` is the URL prefix to strip (e.g. "/static").
If the request path starts with prefix, tries to serve the file from root.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&Ctx!` |  |
| `root` | `string` |  |
| `prefix` | `string` |  |

---

### <a id="strContainsDotDot"></a>`strContainsDotDot`

&gt; 📄 `static.vx` L84-93

```vex
fn strContainsDotDot(s: string): bool
```

Check if a string contains ".." (path traversal)

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `string` |  |

**Returns:** `bool`

---

### <a id="detectContentType"></a>`detectContentType`

&gt; 📄 `static.vx` L96-129

```vex
fn detectContentType(path: string): string
```

Detect MIME type from file extension (string comparison, no pointer math)

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `string`

---

### <a id="buildRequestId"></a>`buildRequestId`

&gt; 📄 `requestid.vx` L22-24

```vex
fn buildRequestId(c: &Ctx): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&Ctx` |  |

**Returns:** `string`

---

### <a id="requestId"></a>`requestId` `🔓 export`

&gt; 📄 `requestid.vx` L27-32

```vex
export fn requestId(c: &Ctx!)
```

Request ID middleware — assigns a unique ID to each request.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&Ctx!` |  |

---

### <a id="requestIdWithHeader"></a>`requestIdWithHeader` `🔓 export`

&gt; 📄 `requestid.vx` L35-42

```vex
export fn requestIdWithHeader(headerName: string): Handler
```

Create a request ID middleware with a custom header name.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `headerName` | `string` |  |

**Returns:** `Handler`

---

### <a id="recover"></a>`recover` `🔓 export`

&gt; 📄 `recover.vx` L19-28

```vex
export fn recover(c: &Ctx!)
```

Recovery middleware — wraps next() in a safe execution context.

If the downstream handler completes normally, proceeds as usual.
NOTE: True panic recovery requires runtime support. This middleware
serves as a placeholder and catches common error patterns.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&Ctx!` |  |

---

### <a id="cors"></a>`cors` `🔓 export`

&gt; 📄 `cors.vx` L93-106

```vex
export fn cors(c: &Ctx!)
```

Default CORS middleware — allows all origins.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&Ctx!` |  |

---

### <a id="corsWithOrigin"></a>`corsWithOrigin` `🔓 export`

&gt; 📄 `cors.vx` L109-123

```vex
export fn corsWithOrigin(origin: string): Handler
```

CORS middleware with custom allowed origin.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `origin` | `string` |  |

**Returns:** `Handler`

---

### <a id="rateLimiter"></a>`rateLimiter` `🔓 export`

&gt; 📄 `rate_limiter.vx` L77-81

```vex
export fn rateLimiter(c: &Ctx!)
```

Default rate limiter — sets rate limit headers for proxy integration.

For production, use a reverse proxy (nginx, caddy) for actual enforcement.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&Ctx!` |  |

---

### <a id="logger"></a>`logger` `🔓 export`

&gt; 📄 `logger.vx` L21-40

```vex
export fn logger(c: &Ctx!)
```

Logger middleware — prints method, path, status, and latency.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&Ctx!` |  |

---

### <a id="headerEqCI"></a>`headerEqCI`

&gt; 📄 `headers.vx` L184-201

```vex
fn headerEqCI(a: str, b: str): bool
```

Compare two header names case-insensitively using byte indexing.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `str` |  |
| `b` | `str` |  |

**Returns:** `bool`

---

### <a id="statusText"></a>`statusText` `🔓 export`

&gt; 📄 `status.vx` L40-65

```vex
export fn statusText(code: i32): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `code` | `i32` |  |

**Returns:** `string`

---

### <a id="parseFrame"></a>`parseFrame` `🔓 export`

&gt; 📄 `ws.vx` L125-201

```vex
export fn parseFrame(data: str): WsParseResult
```

Parse a WebSocket frame header from raw bytes.

Returns WsParseResult with frame info.
On Ok, frame.headerLen indicates where payload starts.
Caller must then read frame.payloadLen bytes of payload.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |

**Returns:** `WsParseResult`

---

### <a id="applyMask"></a>`applyMask` `🔓 export`

&gt; 📄 `ws.vx` L211-228

```vex
export fn applyMask(payload: &str!, maskKey: u32, len: usize)
```

Apply/remove WebSocket mask to payload buffer (in-place).

XOR with 4-byte rotating mask key.
Uses RawBuf for safe byte-level access.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `payload` | `&str!` |  |
| `maskKey` | `u32` |  |
| `len` | `usize` |  |

---

### <a id="encodedFrameSize"></a>`encodedFrameSize` `🔓 export`

&gt; 📄 `ws.vx` L235-244

```vex
export fn encodedFrameSize(payloadLen: usize, masked: bool): usize
```

Calculate encoded frame size (header + payload).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `payloadLen` | `usize` |  |
| `masked` | `bool` |  |

**Returns:** `usize`

---

### <a id="encodeFrameHeader"></a>`encodeFrameHeader` `🔓 export`

&gt; 📄 `ws.vx` L250-305

```vex
export fn encodeFrameHeader(out: &str!, fin: bool, opcode: u8, payloadLen: usize, masked: bool, maskKey: u32): usize
```

Encode a WebSocket frame header into `out` buffer.

Returns number of header bytes written.
Caller must write payload immediately after.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&str!` |  |
| `fin` | `bool` |  |
| `opcode` | `u8` |  |
| `payloadLen` | `usize` |  |
| `masked` | `bool` |  |
| `maskKey` | `u32` |  |

**Returns:** `usize`

---

### <a id="parseHeaders"></a>`parseHeaders` `🔓 export`

&gt; 📄 `headers.vx` L164-230

```vex
export fn parseHeaders(sc: &Scanner!, hdrs: &ParserHeaders!): HeaderParseResult
```

Parse HTTP/1.1 headers from a scanner.

Expects scanner positioned at start of first header line.
Parses until \r\n\r\n (empty line).
Returns HeaderParseResult indicating outcome.
Format per RFC 7230:
field-name ":" OWS field-value OWS CRLF

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `sc` | `&Scanner!` |  |
| `hdrs` | `&ParserHeaders!` |  |

**Returns:** `HeaderParseResult`

---

### <a id="main"></a>`main`

&gt; 📄 `test_dt_min.vx` L2-25

```vex
fn main(): i32
```

**Returns:** `i32`

---

### <a id="test_body_content_length_exact"></a>`test_body_content_length_exact`

&gt; 📄 `body.test.vx` L12-29

```vex
fn test_body_content_length_exact(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_body_content_length_partial"></a>`test_body_content_length_partial`

&gt; 📄 `body.test.vx` L31-61

```vex
fn test_body_content_length_partial(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_body_content_length_excess"></a>`test_body_content_length_excess`

&gt; 📄 `body.test.vx` L63-77

```vex
fn test_body_content_length_excess(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_body_content_length_empty"></a>`test_body_content_length_empty`

&gt; 📄 `body.test.vx` L79-86

```vex
fn test_body_content_length_empty(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_body_none_mode"></a>`test_body_none_mode`

&gt; 📄 `body.test.vx` L92-106

```vex
fn test_body_none_mode(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_body_until_close"></a>`test_body_until_close`

&gt; 📄 `body.test.vx` L112-142

```vex
fn test_body_until_close(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_body_chunked_mode"></a>`test_body_chunked_mode`

&gt; 📄 `body.test.vx` L148-159

```vex
fn test_body_chunked_mode(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_body_reset"></a>`test_body_reset`

&gt; 📄 `body.test.vx` L165-179

```vex
fn test_body_reset(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_body_already_done"></a>`test_body_already_done`

&gt; 📄 `body.test.vx` L181-197

```vex
fn test_body_already_done(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="wb"></a>`wb`

&gt; 📄 `.vex_bench_runner.vx` L20-20

```vex
fn wb(p: Ptr<u8>, i: i64, v: i64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8&gt;` |  |
| `i` | `i64` |  |
| `v` | `i64` |  |

---

### <a id="mkstr"></a>`mkstr`

&gt; 📄 `.vex_bench_runner.vx` L21-21

```vex
fn mkstr(p: Ptr<u8>, n: i64): str
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8&gt;` |  |
| `n` | `i64` |  |

**Returns:** `str`

---

### <a id="copyStr"></a>`copyStr`

&gt; 📄 `.vex_bench_runner.vx` L22-25

```vex
fn copyStr(p: Ptr<u8>, off: i64, s: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8&gt;` |  |
| `off` | `i64` |  |
| `s` | `str` |  |

---

### <a id="test_parser_bench_sanity"></a>`test_parser_bench_sanity`

&gt; 📄 `.vex_bench_runner.vx` L29-36

```vex
fn test_parser_bench_sanity(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="bench_parse_get_simple"></a>`bench_parse_get_simple`

&gt; 📄 `.vex_bench_runner.vx` L40-45

```vex
fn bench_parse_get_simple(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_parse_get_with_headers"></a>`bench_parse_get_with_headers`

&gt; 📄 `.vex_bench_runner.vx` L47-52

```vex
fn bench_parse_get_with_headers(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_parse_post_with_body"></a>`bench_parse_post_with_body`

&gt; 📄 `.vex_bench_runner.vx` L56-61

```vex
fn bench_parse_post_with_body(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_parse_response_200"></a>`bench_parse_response_200`

&gt; 📄 `.vex_bench_runner.vx` L65-70

```vex
fn bench_parse_response_200(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_parse_response_with_many_headers"></a>`bench_parse_response_with_many_headers`

&gt; 📄 `.vex_bench_runner.vx` L72-77

```vex
fn bench_parse_response_with_many_headers(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_parseDecimal"></a>`bench_parseDecimal`

&gt; 📄 `.vex_bench_runner.vx` L81-88

```vex
fn bench_parseDecimal(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_parseHex"></a>`bench_parseHex`

&gt; 📄 `.vex_bench_runner.vx` L90-97

```vex
fn bench_parseHex(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_eqCaseInsensitive"></a>`bench_eqCaseInsensitive`

&gt; 📄 `.vex_bench_runner.vx` L99-106

```vex
fn bench_eqCaseInsensitive(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_ws_parse_text_frame"></a>`bench_ws_parse_text_frame`

&gt; 📄 `.vex_bench_runner.vx` L110-120

```vex
fn bench_ws_parse_text_frame(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_h2_parse_data_frame"></a>`bench_h2_parse_data_frame`

&gt; 📄 `.vex_bench_runner.vx` L124-136

```vex
fn bench_h2_parse_data_frame(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_chunked_decode_single_chunk"></a>`bench_chunked_decode_single_chunk`

&gt; 📄 `.vex_bench_runner.vx` L140-147

```vex
fn bench_chunked_decode_single_chunk(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_body_reader_chunked_feed"></a>`bench_body_reader_chunked_feed`

&gt; 📄 `.vex_bench_runner.vx` L151-158

```vex
fn bench_body_reader_chunked_feed(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_hpack_decode_indexed_header"></a>`bench_hpack_decode_indexed_header`

&gt; 📄 `.vex_bench_runner.vx` L162-172

```vex
fn bench_hpack_decode_indexed_header(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_hpack_decode_header_block_small"></a>`bench_hpack_decode_header_block_small`

&gt; 📄 `.vex_bench_runner.vx` L174-184

```vex
fn bench_hpack_decode_header_block_small(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_huffman_code_lookup"></a>`bench_huffman_code_lookup`

&gt; 📄 `.vex_bench_runner.vx` L188-195

```vex
fn bench_huffman_code_lookup(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_huffman_encoded_length"></a>`bench_huffman_encoded_length`

&gt; 📄 `.vex_bench_runner.vx` L197-202

```vex
fn bench_huffman_encoded_length(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="main"></a>`main`

&gt; 📄 `.vex_bench_runner.vx` L208-231

```vex
fn main(): i32
```

**Returns:** `i32`

---

### <a id="test_chunked_single_chunk"></a>`test_chunked_single_chunk`

&gt; 📄 `chunked.test.vx` L12-34

```vex
fn test_chunked_single_chunk(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_chunked_two_chunks"></a>`test_chunked_two_chunks`

&gt; 📄 `chunked.test.vx` L36-50

```vex
fn test_chunked_two_chunks(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_chunked_hex_size"></a>`test_chunked_hex_size`

&gt; 📄 `chunked.test.vx` L52-65

```vex
fn test_chunked_hex_size(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_chunked_empty_body"></a>`test_chunked_empty_body`

&gt; 📄 `chunked.test.vx` L67-80

```vex
fn test_chunked_empty_body(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_chunked_with_extension"></a>`test_chunked_with_extension`

&gt; 📄 `chunked.test.vx` L82-95

```vex
fn test_chunked_with_extension(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_chunked_uppercase_hex"></a>`test_chunked_uppercase_hex`

&gt; 📄 `chunked.test.vx` L97-109

```vex
fn test_chunked_uppercase_hex(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_chunked_is_done"></a>`test_chunked_is_done`

&gt; 📄 `chunked.test.vx` L115-123

```vex
fn test_chunked_is_done(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_chunked_reset"></a>`test_chunked_reset`

&gt; 📄 `chunked.test.vx` L125-135

```vex
fn test_chunked_reset(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_chunked_need_more"></a>`test_chunked_need_more`

&gt; 📄 `chunked.test.vx` L137-151

```vex
fn test_chunked_need_more(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_chunked_invalid_size"></a>`test_chunked_invalid_size`

&gt; 📄 `chunked.test.vx` L153-160

```vex
fn test_chunked_invalid_size(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="wb"></a>`wb`

&gt; 📄 `h2.test.vx` L20-20

```vex
fn wb(p: Ptr<u8>, i: i64, v: i64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8&gt;` |  |
| `i` | `i64` |  |
| `v` | `i64` |  |

---

### <a id="mkstr"></a>`mkstr`

&gt; 📄 `h2.test.vx` L21-21

```vex
fn mkstr(p: Ptr<u8>, n: i64): str
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8&gt;` |  |
| `n` | `i64` |  |

**Returns:** `str`

---

### <a id="copyStr"></a>`copyStr`

&gt; 📄 `h2.test.vx` L22-25

```vex
fn copyStr(p: Ptr<u8>, offset: i64, s: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8&gt;` |  |
| `offset` | `i64` |  |
| `s` | `str` |  |

---

### <a id="writeH2Header"></a>`writeH2Header`

&gt; 📄 `h2.test.vx` L28-38

```vex
fn writeH2Header(p: Ptr<u8>, off: i64, length: i64, frameType: i64, flags: i64, streamId: i64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8&gt;` |  |
| `off` | `i64` |  |
| `length` | `i64` |  |
| `frameType` | `i64` |  |
| `flags` | `i64` |  |
| `streamId` | `i64` |  |

---

### <a id="test_h2_parse_data_frame"></a>`test_h2_parse_data_frame`

&gt; 📄 `h2.test.vx` L44-60

```vex
fn test_h2_parse_data_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_h2_parse_headers_frame"></a>`test_h2_parse_headers_frame`

&gt; 📄 `h2.test.vx` L62-78

```vex
fn test_h2_parse_headers_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_h2_parse_settings_frame"></a>`test_h2_parse_settings_frame`

&gt; 📄 `h2.test.vx` L80-94

```vex
fn test_h2_parse_settings_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_h2_parse_settings_ack"></a>`test_h2_parse_settings_ack`

&gt; 📄 `h2.test.vx` L96-108

```vex
fn test_h2_parse_settings_ack(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_h2_parse_ping_frame"></a>`test_h2_parse_ping_frame`

&gt; 📄 `h2.test.vx` L110-125

```vex
fn test_h2_parse_ping_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_h2_parse_goaway_frame"></a>`test_h2_parse_goaway_frame`

&gt; 📄 `h2.test.vx` L127-142

```vex
fn test_h2_parse_goaway_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_h2_parse_window_update"></a>`test_h2_parse_window_update`

&gt; 📄 `h2.test.vx` L144-159

```vex
fn test_h2_parse_window_update(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_h2_need_more_short"></a>`test_h2_need_more_short`

&gt; 📄 `h2.test.vx` L165-177

```vex
fn test_h2_need_more_short(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_h2_need_more_empty"></a>`test_h2_need_more_empty`

&gt; 📄 `h2.test.vx` L179-187

```vex
fn test_h2_need_more_empty(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_h2_frame_flags"></a>`test_h2_frame_flags`

&gt; 📄 `h2.test.vx` L193-207

```vex
fn test_h2_frame_flags(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_h2_settings_defaults"></a>`test_h2_settings_defaults`

&gt; 📄 `h2.test.vx` L213-220

```vex
fn test_h2_settings_defaults(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_h2_parse_settings_payload"></a>`test_h2_parse_settings_payload`

&gt; 📄 `h2.test.vx` L222-233

```vex
fn test_h2_parse_settings_payload(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_h2_parse_settings_invalid_len"></a>`test_h2_parse_settings_invalid_len`

&gt; 📄 `h2.test.vx` L235-243

```vex
fn test_h2_parse_settings_invalid_len(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_h2_parse_goaway_payload"></a>`test_h2_parse_goaway_payload`

&gt; 📄 `h2.test.vx` L249-258

```vex
fn test_h2_parse_goaway_payload(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_h2_parse_goaway_with_debug"></a>`test_h2_parse_goaway_with_debug`

&gt; 📄 `h2.test.vx` L260-271

```vex
fn test_h2_parse_goaway_with_debug(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_h2_frame_header_size"></a>`test_h2_frame_header_size`

&gt; 📄 `h2.test.vx` L277-279

```vex
fn test_h2_frame_header_size(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_h2_frame_types"></a>`test_h2_frame_types`

&gt; 📄 `h2.test.vx` L281-291

```vex
fn test_h2_frame_types(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_h2_error_codes"></a>`test_h2_error_codes`

&gt; 📄 `h2.test.vx` L293-297

```vex
fn test_h2_error_codes(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="wb"></a>`wb`

&gt; 📄 `ws.test.vx` L19-21

```vex
fn wb(p: Ptr<u8>, i: i64, v: i64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8&gt;` |  |
| `i` | `i64` |  |
| `v` | `i64` |  |

---

### <a id="mkstr"></a>`mkstr`

&gt; 📄 `ws.test.vx` L23-25

```vex
fn mkstr(p: Ptr<u8>, n: i64): str
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8&gt;` |  |
| `n` | `i64` |  |

**Returns:** `str`

---

### <a id="copyStr"></a>`copyStr`

&gt; 📄 `ws.test.vx` L27-33

```vex
fn copyStr(p: Ptr<u8>, offset: i64, s: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8&gt;` |  |
| `offset` | `i64` |  |
| `s` | `str` |  |

---

### <a id="test_ws_parse_text_frame"></a>`test_ws_parse_text_frame`

&gt; 📄 `ws.test.vx` L39-57

```vex
fn test_ws_parse_text_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_ws_parse_binary_frame"></a>`test_ws_parse_binary_frame`

&gt; 📄 `ws.test.vx` L59-75

```vex
fn test_ws_parse_binary_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_ws_parse_close_frame"></a>`test_ws_parse_close_frame`

&gt; 📄 `ws.test.vx` L77-93

```vex
fn test_ws_parse_close_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_ws_parse_ping_frame"></a>`test_ws_parse_ping_frame`

&gt; 📄 `ws.test.vx` L95-111

```vex
fn test_ws_parse_ping_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_ws_parse_pong_frame"></a>`test_ws_parse_pong_frame`

&gt; 📄 `ws.test.vx` L113-127

```vex
fn test_ws_parse_pong_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_ws_parse_masked_frame"></a>`test_ws_parse_masked_frame`

&gt; 📄 `ws.test.vx` L133-152

```vex
fn test_ws_parse_masked_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_ws_parse_16bit_length"></a>`test_ws_parse_16bit_length`

&gt; 📄 `ws.test.vx` L154-169

```vex
fn test_ws_parse_16bit_length(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_ws_need_more_short"></a>`test_ws_need_more_short`

&gt; 📄 `ws.test.vx` L175-188

```vex
fn test_ws_need_more_short(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_ws_need_more_empty"></a>`test_ws_need_more_empty`

&gt; 📄 `ws.test.vx` L190-199

```vex
fn test_ws_need_more_empty(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_ws_control_frame_too_large"></a>`test_ws_control_frame_too_large`

&gt; 📄 `ws.test.vx` L205-217

```vex
fn test_ws_control_frame_too_large(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_ws_frame_methods"></a>`test_ws_frame_methods`

&gt; 📄 `ws.test.vx` L223-241

```vex
fn test_ws_frame_methods(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_ws_rsv_bits"></a>`test_ws_rsv_bits`

&gt; 📄 `ws.test.vx` L243-258

```vex
fn test_ws_rsv_bits(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_ws_encoded_frame_size"></a>`test_ws_encoded_frame_size`

&gt; 📄 `ws.test.vx` L264-276

```vex
fn test_ws_encoded_frame_size(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_ws_message_single"></a>`test_ws_message_single`

&gt; 📄 `ws.test.vx` L282-304

```vex
fn test_ws_message_single(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_ws_message_reset"></a>`test_ws_message_reset`

&gt; 📄 `ws.test.vx` L306-312

```vex
fn test_ws_message_reset(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_ws_close_codes"></a>`test_ws_close_codes`

&gt; 📄 `ws.test.vx` L318-322

```vex
fn test_ws_close_codes(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="wb"></a>`wb`

&gt; 📄 `bench.test.vx` L20-20

```vex
fn wb(p: Ptr<u8>, i: i64, v: i64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8&gt;` |  |
| `i` | `i64` |  |
| `v` | `i64` |  |

---

### <a id="mkstr"></a>`mkstr`

&gt; 📄 `bench.test.vx` L21-21

```vex
fn mkstr(p: Ptr<u8>, n: i64): str
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8&gt;` |  |
| `n` | `i64` |  |

**Returns:** `str`

---

### <a id="copyStr"></a>`copyStr`

&gt; 📄 `bench.test.vx` L22-25

```vex
fn copyStr(p: Ptr<u8>, off: i64, s: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8&gt;` |  |
| `off` | `i64` |  |
| `s` | `str` |  |

---

### <a id="test_parser_bench_sanity"></a>`test_parser_bench_sanity`

&gt; 📄 `bench.test.vx` L29-36

```vex
fn test_parser_bench_sanity(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="bench_parse_get_simple"></a>`bench_parse_get_simple`

&gt; 📄 `bench.test.vx` L40-45

```vex
fn bench_parse_get_simple(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_parse_get_with_headers"></a>`bench_parse_get_with_headers`

&gt; 📄 `bench.test.vx` L47-52

```vex
fn bench_parse_get_with_headers(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_parse_post_with_body"></a>`bench_parse_post_with_body`

&gt; 📄 `bench.test.vx` L56-61

```vex
fn bench_parse_post_with_body(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_parse_response_200"></a>`bench_parse_response_200`

&gt; 📄 `bench.test.vx` L65-70

```vex
fn bench_parse_response_200(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_parse_response_with_many_headers"></a>`bench_parse_response_with_many_headers`

&gt; 📄 `bench.test.vx` L72-77

```vex
fn bench_parse_response_with_many_headers(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_parseDecimal"></a>`bench_parseDecimal`

&gt; 📄 `bench.test.vx` L81-88

```vex
fn bench_parseDecimal(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_parseHex"></a>`bench_parseHex`

&gt; 📄 `bench.test.vx` L90-97

```vex
fn bench_parseHex(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_eqCaseInsensitive"></a>`bench_eqCaseInsensitive`

&gt; 📄 `bench.test.vx` L99-106

```vex
fn bench_eqCaseInsensitive(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_ws_parse_text_frame"></a>`bench_ws_parse_text_frame`

&gt; 📄 `bench.test.vx` L110-120

```vex
fn bench_ws_parse_text_frame(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_h2_parse_data_frame"></a>`bench_h2_parse_data_frame`

&gt; 📄 `bench.test.vx` L124-136

```vex
fn bench_h2_parse_data_frame(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_chunked_decode_single_chunk"></a>`bench_chunked_decode_single_chunk`

&gt; 📄 `bench.test.vx` L140-147

```vex
fn bench_chunked_decode_single_chunk(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_body_reader_chunked_feed"></a>`bench_body_reader_chunked_feed`

&gt; 📄 `bench.test.vx` L151-158

```vex
fn bench_body_reader_chunked_feed(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_hpack_decode_indexed_header"></a>`bench_hpack_decode_indexed_header`

&gt; 📄 `bench.test.vx` L162-172

```vex
fn bench_hpack_decode_indexed_header(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_hpack_decode_header_block_small"></a>`bench_hpack_decode_header_block_small`

&gt; 📄 `bench.test.vx` L174-184

```vex
fn bench_hpack_decode_header_block_small(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_huffman_code_lookup"></a>`bench_huffman_code_lookup`

&gt; 📄 `bench.test.vx` L188-195

```vex
fn bench_huffman_code_lookup(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="bench_huffman_encoded_length"></a>`bench_huffman_encoded_length`

&gt; 📄 `bench.test.vx` L197-202

```vex
fn bench_huffman_encoded_length(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&BenchCtx!` |  |

---

### <a id="test_get_request"></a>`test_get_request`

&gt; 📄 `basic.test.vx` L17-47

```vex
fn test_get_request(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_post_request_with_body"></a>`test_post_request_with_body`

&gt; 📄 `basic.test.vx` L49-74

```vex
fn test_post_request_with_body(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_incomplete_request"></a>`test_incomplete_request`

&gt; 📄 `basic.test.vx` L76-84

```vex
fn test_incomplete_request(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_multiple_headers"></a>`test_multiple_headers`

&gt; 📄 `basic.test.vx` L86-110

```vex
fn test_multiple_headers(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_response_200"></a>`test_response_200`

&gt; 📄 `basic.test.vx` L116-147

```vex
fn test_response_200(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_response_404"></a>`test_response_404`

&gt; 📄 `basic.test.vx` L149-170

```vex
fn test_response_404(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_response_redirect"></a>`test_response_redirect`

&gt; 📄 `basic.test.vx` L172-190

```vex
fn test_response_redirect(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_response_500"></a>`test_response_500`

&gt; 📄 `basic.test.vx` L192-207

```vex
fn test_response_500(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_parseDecimal_basic"></a>`test_parseDecimal_basic`

&gt; 📄 `basic.test.vx` L213-220

```vex
fn test_parseDecimal_basic(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_parseDecimal_zero"></a>`test_parseDecimal_zero`

&gt; 📄 `basic.test.vx` L222-229

```vex
fn test_parseDecimal_zero(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_parseDecimal_empty"></a>`test_parseDecimal_empty`

&gt; 📄 `basic.test.vx` L231-236

```vex
fn test_parseDecimal_empty(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_parseDecimal_non_digit"></a>`test_parseDecimal_non_digit`

&gt; 📄 `basic.test.vx` L238-243

```vex
fn test_parseDecimal_non_digit(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_parseDecimal_null_coalesce"></a>`test_parseDecimal_null_coalesce`

&gt; 📄 `basic.test.vx` L245-251

```vex
fn test_parseDecimal_null_coalesce(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_parseHex_ff"></a>`test_parseHex_ff`

&gt; 📄 `basic.test.vx` L257-264

```vex
fn test_parseHex_ff(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_parseHex_lowercase"></a>`test_parseHex_lowercase`

&gt; 📄 `basic.test.vx` L266-273

```vex
fn test_parseHex_lowercase(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_parseHex_zero"></a>`test_parseHex_zero`

&gt; 📄 `basic.test.vx` L275-282

```vex
fn test_parseHex_zero(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_parseHex_chunked_size"></a>`test_parseHex_chunked_size`

&gt; 📄 `basic.test.vx` L284-291

```vex
fn test_parseHex_chunked_size(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_eqCaseInsensitive_match"></a>`test_eqCaseInsensitive_match`

&gt; 📄 `basic.test.vx` L297-307

```vex
fn test_eqCaseInsensitive_match(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_eqCaseInsensitive_mismatch"></a>`test_eqCaseInsensitive_mismatch`

&gt; 📄 `basic.test.vx` L309-316

```vex
fn test_eqCaseInsensitive_mismatch(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_websocket_upgrade"></a>`test_websocket_upgrade`

&gt; 📄 `basic.test.vx` L322-334

```vex
fn test_websocket_upgrade(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_empty_request"></a>`test_empty_request`

&gt; 📄 `basic.test.vx` L340-346

```vex
fn test_empty_request(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_chunked_header_detection"></a>`test_chunked_header_detection`

&gt; 📄 `basic.test.vx` L348-360

```vex
fn test_chunked_header_detection(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_connection_close"></a>`test_connection_close`

&gt; 📄 `basic.test.vx` L362-374

```vex
fn test_connection_close(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_head_method"></a>`test_head_method`

&gt; 📄 `basic.test.vx` L376-391

```vex
fn test_head_method(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_options_method"></a>`test_options_method`

&gt; 📄 `basic.test.vx` L393-408

```vex
fn test_options_method(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="wb"></a>`wb`

&gt; 📄 `hpack.test.vx` L12-12

```vex
fn wb(p: Ptr<u8>, i: i64, v: i64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8&gt;` |  |
| `i` | `i64` |  |
| `v` | `i64` |  |

---

### <a id="mkstr"></a>`mkstr`

&gt; 📄 `hpack.test.vx` L13-13

```vex
fn mkstr(p: Ptr<u8>, n: i64): str
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8&gt;` |  |
| `n` | `i64` |  |

**Returns:** `str`

---

### <a id="copyStr"></a>`copyStr`

&gt; 📄 `hpack.test.vx` L14-17

```vex
fn copyStr(p: Ptr<u8>, offset: i64, s: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8&gt;` |  |
| `offset` | `i64` |  |
| `s` | `str` |  |

---

### <a id="test_hpack_decode_integer_small"></a>`test_hpack_decode_integer_small`

&gt; 📄 `hpack.test.vx` L23-31

```vex
fn test_hpack_decode_integer_small(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_decode_integer_max_prefix"></a>`test_hpack_decode_integer_max_prefix`

&gt; 📄 `hpack.test.vx` L33-41

```vex
fn test_hpack_decode_integer_max_prefix(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_decode_integer_multibyte"></a>`test_hpack_decode_integer_multibyte`

&gt; 📄 `hpack.test.vx` L43-52

```vex
fn test_hpack_decode_integer_multibyte(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_decode_integer_7bit"></a>`test_hpack_decode_integer_7bit`

&gt; 📄 `hpack.test.vx` L54-62

```vex
fn test_hpack_decode_integer_7bit(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_decode_integer_empty"></a>`test_hpack_decode_integer_empty`

&gt; 📄 `hpack.test.vx` L64-67

```vex
fn test_hpack_decode_integer_empty(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_encode_integer_small"></a>`test_hpack_encode_integer_small`

&gt; 📄 `hpack.test.vx` L69-76

```vex
fn test_hpack_encode_integer_small(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_encode_integer_multibyte"></a>`test_hpack_encode_integer_multibyte`

&gt; 📄 `hpack.test.vx` L78-85

```vex
fn test_hpack_encode_integer_multibyte(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_dynamic_table_new"></a>`test_hpack_dynamic_table_new`

&gt; 📄 `hpack.test.vx` L91-95

```vex
fn test_hpack_dynamic_table_new(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_dynamic_table_add"></a>`test_hpack_dynamic_table_add`

&gt; 📄 `hpack.test.vx` L97-104

```vex
fn test_hpack_dynamic_table_add(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_dynamic_table_eviction"></a>`test_hpack_dynamic_table_eviction`

&gt; 📄 `hpack.test.vx` L106-114

```vex
fn test_hpack_dynamic_table_eviction(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_dynamic_table_oversized_entry"></a>`test_hpack_dynamic_table_oversized_entry`

&gt; 📄 `hpack.test.vx` L116-121

```vex
fn test_hpack_dynamic_table_oversized_entry(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_dynamic_table_set_max_size"></a>`test_hpack_dynamic_table_set_max_size`

&gt; 📄 `hpack.test.vx` L123-130

```vex
fn test_hpack_dynamic_table_set_max_size(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_static_table_authority"></a>`test_hpack_static_table_authority`

&gt; 📄 `hpack.test.vx` L136-141

```vex
fn test_hpack_static_table_authority(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_static_table_method_get"></a>`test_hpack_static_table_method_get`

&gt; 📄 `hpack.test.vx` L143-148

```vex
fn test_hpack_static_table_method_get(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_static_table_method_post"></a>`test_hpack_static_table_method_post`

&gt; 📄 `hpack.test.vx` L150-155

```vex
fn test_hpack_static_table_method_post(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_static_table_path"></a>`test_hpack_static_table_path`

&gt; 📄 `hpack.test.vx` L157-162

```vex
fn test_hpack_static_table_path(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_static_table_status_200"></a>`test_hpack_static_table_status_200`

&gt; 📄 `hpack.test.vx` L164-169

```vex
fn test_hpack_static_table_status_200(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_static_table_out_of_range"></a>`test_hpack_static_table_out_of_range`

&gt; 📄 `hpack.test.vx` L171-177

```vex
fn test_hpack_static_table_out_of_range(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_decode_indexed_header"></a>`test_hpack_decode_indexed_header`

&gt; 📄 `hpack.test.vx` L183-198

```vex
fn test_hpack_decode_indexed_header(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_decode_indexed_status_200"></a>`test_hpack_decode_indexed_status_200`

&gt; 📄 `hpack.test.vx` L200-214

```vex
fn test_hpack_decode_indexed_status_200(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_decode_literal_with_indexing"></a>`test_hpack_decode_literal_with_indexing`

&gt; 📄 `hpack.test.vx` L216-233

```vex
fn test_hpack_decode_literal_with_indexing(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_decode_literal_new_name"></a>`test_hpack_decode_literal_new_name`

&gt; 📄 `hpack.test.vx` L235-254

```vex
fn test_hpack_decode_literal_new_name(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_decode_literal_without_indexing"></a>`test_hpack_decode_literal_without_indexing`

&gt; 📄 `hpack.test.vx` L256-273

```vex
fn test_hpack_decode_literal_without_indexing(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_decode_table_size_update"></a>`test_hpack_decode_table_size_update`

&gt; 📄 `hpack.test.vx` L275-288

```vex
fn test_hpack_decode_table_size_update(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_decode_empty_input"></a>`test_hpack_decode_empty_input`

&gt; 📄 `hpack.test.vx` L290-298

```vex
fn test_hpack_decode_empty_input(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_decode_header_block"></a>`test_hpack_decode_header_block`

&gt; 📄 `hpack.test.vx` L304-318

```vex
fn test_hpack_decode_header_block(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="test_hpack_decode_header_block_empty"></a>`test_hpack_decode_header_block_empty`

&gt; 📄 `hpack.test.vx` L320-324

```vex
fn test_hpack_decode_header_block_empty(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&TestCtx!` |  |

---

### <a id="eqCaseInsensitive"></a>`eqCaseInsensitive` `🔓 export`

&gt; 📄 `scanner.vx` L286-298

```vex
export fn eqCaseInsensitive(a: str, target: str): bool
```

Case-insensitive comparison of a str against a lowercase target.

Both must be same length. Target MUST be lowercase ASCII.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `str` |  |
| `target` | `str` |  |

**Returns:** `bool`

---

### <a id="parseDecimal"></a>`parseDecimal` `🔓 export`

&gt; 📄 `scanner.vx` L314-332

```vex
export fn parseDecimal(s: str): Option<i64>
```

Parse a decimal integer from a str view.

Returns Some(value) on success, None if no digits found.
Stops at first non-digit. Overflow-safe for values ≤ i64.MAX.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `str` |  |

**Returns:** `Option&lt;i64&gt;`

---

### <a id="parseHex"></a>`parseHex` `🔓 export`

&gt; 📄 `scanner.vx` L337-363

```vex
export fn parseHex(s: str): Option<i64>
```

Parse a hexadecimal integer from a str view (for chunked encoding).

Returns Some(value) on success, None if no hex digits found.
Case-insensitive A-F. Overflow-safe.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `str` |  |

**Returns:** `Option&lt;i64&gt;`

---

### <a id="parseH2Frame"></a>`parseH2Frame` `🔓 export`

&gt; 📄 `h2.vx` L123-154

```vex
export fn parseH2Frame(data: str): H2ParseResult
```

Parse an HTTP/2 frame header (9 bytes).

Caller must then read frame.length bytes of payload.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |

**Returns:** `H2ParseResult`

---

### <a id="parseSettings"></a>`parseSettings` `🔓 export`

&gt; 📄 `h2.vx` L183-205

```vex
export fn parseSettings(payload: str, settings: &H2Settings!): bool
```

Parse SETTINGS payload. Each setting is 6 bytes: id(16) + value(32).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `payload` | `str` |  |
| `settings` | `&H2Settings!` |  |

**Returns:** `bool`

---

### <a id="parseGoAway"></a>`parseGoAway` `🔓 export`

&gt; 📄 `h2.vx` L219-246

```vex
export fn parseGoAway(payload: str): GoAway
```

Parse GOAWAY payload.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `payload` | `str` |  |

**Returns:** `GoAway`

---

### <a id="encodeH2FrameHeader"></a>`encodeH2FrameHeader` `🔓 export`

&gt; 📄 `h2.vx` L253-274

```vex
export fn encodeH2FrameHeader(out: &str!, length: u32, frameType: u8, flags: u8, streamId: u32)
```

Encode an HTTP/2 frame header (9 bytes) into `out`.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&str!` |  |
| `length` | `u32` |  |
| `frameType` | `u8` |  |
| `flags` | `u8` |  |
| `streamId` | `u32` |  |

---

### <a id="encodeSettings"></a>`encodeSettings` `🔓 export`

&gt; 📄 `h2.vx` L277-294

```vex
export fn encodeSettings(out: &str!, settings: &H2Settings): usize
```

Build a SETTINGS frame (payload = settings pairs).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&str!` |  |
| `settings` | `&H2Settings` |  |

**Returns:** `usize`

---

### <a id="writeSetting"></a>`writeSetting`

&gt; 📄 `h2.vx` L296-305

```vex
fn writeSetting(out: &str!, offset: usize, id: u16, value: u32): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&str!` |  |
| `offset` | `usize` |  |
| `id` | `u16` |  |
| `value` | `u32` |  |

**Returns:** `usize`

---

### <a id="encodePing"></a>`encodePing` `🔓 export`

&gt; 📄 `h2.vx` L308-325

```vex
export fn encodePing(out: &str!, opaqueData: str, isAck: bool)
```

Build a PING frame (8 bytes opaque data).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&str!` |  |
| `opaqueData` | `str` |  |
| `isAck` | `bool` |  |

---

### <a id="encodeWindowUpdate"></a>`encodeWindowUpdate` `🔓 export`

&gt; 📄 `h2.vx` L328-335

```vex
export fn encodeWindowUpdate(out: &str!, streamId: u32, increment: u32)
```

Build a WINDOW_UPDATE frame.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&str!` |  |
| `streamId` | `u32` |  |
| `increment` | `u32` |  |

---

### <a id="encodeRstStream"></a>`encodeRstStream` `🔓 export`

&gt; 📄 `h2.vx` L338-345

```vex
export fn encodeRstStream(out: &str!, streamId: u32, errorCode: u32)
```

Build a RST_STREAM frame.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&str!` |  |
| `streamId` | `u32` |  |
| `errorCode` | `u32` |  |

---

### <a id="encodeGoAway"></a>`encodeGoAway` `🔓 export`

&gt; 📄 `h2.vx` L348-359

```vex
export fn encodeGoAway(out: &str!, lastStreamId: u32, errorCode: u32)
```

Build a GOAWAY frame.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&str!` |  |
| `lastStreamId` | `u32` |  |
| `errorCode` | `u32` |  |

---

### <a id="detectBodyMode"></a>`detectBodyMode` `🔓 export`

&gt; 📄 `body.vx` L31-49

```vex
export fn detectBodyMode(hdrs: &ParserHeaders, isRequest: bool): BodyMode
```

Determine body mode from parsed headers.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `hdrs` | `&ParserHeaders` |  |
| `isRequest` | `bool` |  |

**Returns:** `BodyMode`

---

### <a id="getStaticEntry"></a>`getStaticEntry`

&gt; 📄 `hpack.vx` L28-92

```vex
fn getStaticEntry(index: usize): (str, str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `index` | `usize` |  |

**Returns:** `(str, str)`

---

### <a id="decodeInteger"></a>`decodeInteger` `🔓 export`

&gt; 📄 `hpack.vx` L181-204

```vex
export fn decodeInteger(data: str, prefixBits: u8): (u64, usize)
```

Decode an HPACK integer with given prefix bit count.

Returns (value, bytesConsumed).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |
| `prefixBits` | `u8` |  |

**Returns:** `(u64, usize)`

---

### <a id="encodeInteger"></a>`encodeInteger` `🔓 export`

&gt; 📄 `hpack.vx` L207-229

```vex
export fn encodeInteger(out: &str!, value: u64, prefixBits: u8, prefixByte: u8): usize
```

Encode an HPACK integer. Returns bytes written to `out`.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&str!` |  |
| `value` | `u64` |  |
| `prefixBits` | `u8` |  |
| `prefixByte` | `u8` |  |

**Returns:** `usize`

---

### <a id="decodeHeader"></a>`decodeHeader` `🔓 export`

&gt; 📄 `hpack.vx` L258-300

```vex
export fn decodeHeader(data: str, table: &DynamicTable!): (HpackResult, usize)
```

Decode the next HPACK header representation from data.

Returns (HpackResult, bytesConsumed).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |
| `table` | `&DynamicTable!` |  |

**Returns:** `(HpackResult, usize)`

---

### <a id="decodeLiteral"></a>`decodeLiteral`

&gt; 📄 `hpack.vx` L303-359

```vex
fn decodeLiteral(data: str, table: &DynamicTable!, prefixBits: u8, addToTable: bool): (HpackResult, usize)
```

Decode a literal header field.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |
| `table` | `&DynamicTable!` |  |
| `prefixBits` | `u8` |  |
| `addToTable` | `bool` |  |

**Returns:** `(HpackResult, usize)`

---

### <a id="decodeHeaderBlock"></a>`decodeHeaderBlock` `🔓 export`

&gt; 📄 `hpack.vx` L363-389

```vex
export fn decodeHeaderBlock(data: str, table: &DynamicTable!): Vec<HpackHeader>
```

Decode a complete HPACK header block.

Returns list of decoded headers.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |
| `table` | `&DynamicTable!` |  |

**Returns:** `Vec&lt;HpackHeader&gt;`

---

### <a id="parseFiberRequestInto"></a>`parseFiberRequestInto` `🔓 export`

&gt; 📄 `fiber_request.vx` L54-182

```vex
export fn parseFiberRequestInto(buf: str, out: &FiberParsedRequest!): FiberRequestResult
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `str` |  |
| `out` | `&FiberParsedRequest!` |  |

**Returns:** `FiberRequestResult`

---

### <a id="parseFiberRequest"></a>`parseFiberRequest` `🔓 export`

&gt; 📄 `fiber_request.vx` L184-188

```vex
export fn parseFiberRequest(buf: str): (FiberParsedRequest, FiberRequestResult)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `str` |  |

**Returns:** `(FiberParsedRequest, FiberRequestResult)`

---

### <a id="isHttp10"></a>`isHttp10`

&gt; 📄 `fiber_request.vx` L190-209

```vex
fn isHttp10(v: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `v` | `str` |  |

**Returns:** `bool`

---

### <a id="parseMethod"></a>`parseMethod`

&gt; 📄 `request.vx` L57-78

```vex
fn parseMethod(s: str): Method
```

Parse method string to enum.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `str` |  |

**Returns:** `Method`

---

### <a id="parseVersion"></a>`parseVersion`

&gt; 📄 `request.vx` L91-95

```vex
fn parseVersion(s: str): HttpVersion
```

Parse "HTTP/1.0" or "HTTP/1.1".

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `str` |  |

**Returns:** `HttpVersion`

---

### <a id="parseRequest"></a>`parseRequest` `🔓 export`

&gt; 📄 `request.vx` L212-258

```vex
export fn parseRequest(buf: str): (ParserRequest, RequestResult)
```

Parse an HTTP/1.1 request from buffer.

Returns (Request, RequestResult).
On Complete, the usize is the byte index where the body starts.
On Incomplete/Error, the Request may be partially filled.
Zero-copy: all str fields reference the input buffer.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `str` |  |

**Returns:** `(ParserRequest, RequestResult)`

---

### <a id="parseRequestBuffer"></a>`parseRequestBuffer` `🔓 export`

&gt; 📄 `request.vx` L261-263

```vex
export fn parseRequestBuffer(buf: str): (ParserRequest, RequestResult)
```

Alias entrypoint to avoid name collision with `http/src/request.vx` parseRequest(fd).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `str` |  |

**Returns:** `(ParserRequest, RequestResult)`

---

### <a id="parseResponse"></a>`parseResponse` `🔓 export`

&gt; 📄 `response.vx` L121-177

```vex
export fn parseResponse(buf: str): (Response, ResponseResult)
```

Parse an HTTP/1.1 response from buffer.

RFC 7230 status-line:
HTTP-version SP status-code SP reason-phrase CRLF
Returns (Response, ResponseResult).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `str` |  |

**Returns:** `(Response, ResponseResult)`

---

### <a id="huffmanCode"></a>`huffmanCode` `🔓 export`

&gt; 📄 `huffman.vx` L29-267

```vex
export fn huffmanCode(sym: u8): (u32, u8)
```

Get Huffman code and bit length for a byte value (0-255).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `sym` | `u8` |  |

**Returns:** `(u32, u8)`

---

### <a id="huffmanEncodedLength"></a>`huffmanEncodedLength` `🔓 export`

&gt; 📄 `huffman.vx` L275-286

```vex
export fn huffmanEncodedLength(input: str): usize
```

Calculate the encoded byte length of a string under HPACK Huffman.

Used to decide whether Huffman encoding saves space.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `str` |  |

**Returns:** `usize`

---

### <a id="huffmanEncode"></a>`huffmanEncode` `🔓 export`

&gt; 📄 `huffman.vx` L296-331

```vex
export fn huffmanEncode(input: str, out: &str!): usize
```

Encode a string using HPACK Huffman coding.

Writes to output buffer via RawBuf, returns bytes written.
Output is padded with 1-bits to byte boundary (RFC 7541 §5.2).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `str` |  |
| `out` | `&str!` |  |

**Returns:** `usize`

---

### <a id="huffmanDecode"></a>`huffmanDecode` `🔓 export`

&gt; 📄 `huffman.vx` L351-410

```vex
export fn huffmanDecode(input: str, inputLen: usize, out: &str!): HuffDecodeResult
```

Decode HPACK Huffman-encoded bytes.

Reads `inputLen` bytes from `input`, writes decoded bytes to `out`.
Returns number of decoded bytes.
Uses bit-by-bit decoding with the canonical Huffman tree.
Validates: no EOS symbol, padding must be all 1-bits.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `str` |  |
| `inputLen` | `usize` |  |
| `out` | `&str!` |  |

**Returns:** `HuffDecodeResult`

---

### <a id="matchHuffmanSymbol"></a>`matchHuffmanSymbol`

&gt; 📄 `huffman.vx` L414-685

```vex
fn matchHuffmanSymbol(code: u32, bits: u8): i32
```

Try to match accumulated bits against Huffman table.

Returns symbol (0-256) if match, -1 if no match.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `code` | `u32` |  |
| `bits` | `u8` |  |

**Returns:** `i32`

---

### <a id="flushAcceptedBatch"></a>`flushAcceptedBatch`

&gt; 📄 `app.vx` L527-585

```vex
fn flushAcceptedBatch(pipe_write_fds: &Vec<i32>, worker_penalty: &[i32; 64]!, dispatched_per_worker: &[i64; 64]!, num_workers: i32, rr_idx_in: i32, fd_batch: &[i32; 32], fd_batch_count: usize, dropped_fds: &i64 !): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `pipe_write_fds` | `&Vec&lt;i32&gt;` |  |
| `worker_penalty` | `&[i32; 64]!` |  |
| `dispatched_per_worker` | `&[i64; 64]!` |  |
| `num_workers` | `i32` |  |
| `rr_idx_in` | `i32` |  |
| `fd_batch` | `&[i32; 32]` |  |
| `fd_batch_count` | `usize` |  |
| `dropped_fds` | `&i64 !` |  |

**Returns:** `i32`

---

### <a id="acceptBatch"></a>`acceptBatch`

&gt; 📄 `app.vx` L840-853

```vex
fn acceptBatch(listen_sock: &Socket, ev_loop: &EventLoop!, active_fds: &Vec<i32>!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `listen_sock` | `&Socket` |  |
| `ev_loop` | `&EventLoop!` |  |
| `active_fds` | `&Vec&lt;i32&gt;!` |  |

---

### <a id="decodeHpackHeaders"></a>`decodeHpackHeaders`

&gt; 📄 `app.vx` L1198-1201

```vex
fn decodeHpackHeaders(payload: str, table: &DynamicTable!): Vec<HpackHeader>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `payload` | `str` |  |
| `table` | `&DynamicTable!` |  |

**Returns:** `Vec&lt;HpackHeader&gt;`

---

### <a id="h2FindState"></a>`h2FindState`

&gt; 📄 `app.vx` L1364-1371

```vex
fn h2FindState(fds: &Vec<i32>, fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fds` | `&Vec&lt;i32&gt;` |  |
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="h1FindState"></a>`h1FindState`

&gt; 📄 `app.vx` L1373-1380

```vex
fn h1FindState(fds: &Vec<i32>, fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fds` | `&Vec&lt;i32&gt;` |  |
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="h1RemoveState"></a>`h1RemoveState`

&gt; 📄 `app.vx` L1382-1398

```vex
fn h1RemoveState(fds: &Vec<i32>!, inbufs: &Vec<string>!, fd: i32)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fds` | `&Vec&lt;i32&gt;!` |  |
| `inbufs` | `&Vec&lt;string&gt;!` |  |
| `fd` | `i32` |  |

---

### <a id="h2RemoveState"></a>`h2RemoveState`

&gt; 📄 `app.vx` L1400-1418

```vex
fn h2RemoveState(fds: &Vec<i32>!, preface_done: &Vec<i32>!, inbufs: &Vec<string>!, fd: i32)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fds` | `&Vec&lt;i32&gt;!` |  |
| `preface_done` | `&Vec&lt;i32&gt;!` |  |
| `inbufs` | `&Vec&lt;string&gt;!` |  |
| `fd` | `i32` |  |

---

### <a id="isH2PrefaceBytes"></a>`isH2PrefaceBytes`

&gt; 📄 `app.vx` L1420-1431

```vex
fn isH2PrefaceBytes(buf: *u8, n: usize): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `*u8` |  |
| `n` | `usize` |  |

**Returns:** `bool`

---

### <a id="isH2PrefacePrefix"></a>`isH2PrefacePrefix`

&gt; 📄 `app.vx` L1433-1443

```vex
fn isH2PrefacePrefix(chunk: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `chunk` | `str` |  |

**Returns:** `bool`

---

### <a id="isH2PrefaceString"></a>`isH2PrefaceString`

&gt; 📄 `app.vx` L1445-1454

```vex
fn isH2PrefaceString(s: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `str` |  |

**Returns:** `bool`

---

### <a id="h2SendSettings"></a>`h2SendSettings`

&gt; 📄 `app.vx` L1456-1464

```vex
fn h2SendSettings(fd: i32)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

---

### <a id="h2SendSettingsAck"></a>`h2SendSettingsAck`

&gt; 📄 `app.vx` L1466-1474

```vex
fn h2SendSettingsAck(fd: i32)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

---

### <a id="h2SendPingAck"></a>`h2SendPingAck`

&gt; 📄 `app.vx` L1476-1495

```vex
fn h2SendPingAck(fd: i32, payload: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `payload` | `str` |  |

---

### <a id="h2SendAll"></a>`h2SendAll`

&gt; 📄 `app.vx` L1497-1511

```vex
fn h2SendAll(fd: i32, buf: *u8, len: usize): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `*u8` |  |
| `len` | `usize` |  |

**Returns:** `bool`

---

### <a id="isNonBlockingRetry"></a>`isNonBlockingRetry`

&gt; 📄 `app.vx` L1513-1518

```vex
fn isNonBlockingRetry(rc: i64): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `rc` | `i64` |  |

**Returns:** `bool`

---

### <a id="reapClosedConnections"></a>`reapClosedConnections`

&gt; 📄 `app.vx` L1520-1541

```vex
fn reapClosedConnections(active_fds: &Vec<i32>!, ev_loop: &EventLoop!, h1_fds: &Vec<i32>!, h1_inbufs: &Vec<string>!, h2_fds: &Vec<i32>!, h2_preface_done: &Vec<i32>!, h2_inbufs: &Vec<string>!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `active_fds` | `&Vec&lt;i32&gt;!` |  |
| `ev_loop` | `&EventLoop!` |  |
| `h1_fds` | `&Vec&lt;i32&gt;!` |  |
| `h1_inbufs` | `&Vec&lt;string&gt;!` |  |
| `h2_fds` | `&Vec&lt;i32&gt;!` |  |
| `h2_preface_done` | `&Vec&lt;i32&gt;!` |  |
| `h2_inbufs` | `&Vec&lt;string&gt;!` |  |

---

### <a id="closeTrackedConnection"></a>`closeTrackedConnection`

&gt; 📄 `app.vx` L1543-1553

```vex
fn closeTrackedConnection(fd: i32, ev_loop: &EventLoop!, active_fds: &Vec<i32>!, h1_fds: &Vec<i32>!, h1_inbufs: &Vec<string>!, h2_fds: &Vec<i32>!, h2_preface_done: &Vec<i32>!, h2_inbufs: &Vec<string>!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `ev_loop` | `&EventLoop!` |  |
| `active_fds` | `&Vec&lt;i32&gt;!` |  |
| `h1_fds` | `&Vec&lt;i32&gt;!` |  |
| `h1_inbufs` | `&Vec&lt;string&gt;!` |  |
| `h2_fds` | `&Vec&lt;i32&gt;!` |  |
| `h2_preface_done` | `&Vec&lt;i32&gt;!` |  |
| `h2_inbufs` | `&Vec&lt;string&gt;!` |  |

---

### <a id="activeRemoveFd"></a>`activeRemoveFd`

&gt; 📄 `app.vx` L1555-1572

```vex
fn activeRemoveFd(active_fds: &Vec<i32>!, fd: i32)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `active_fds` | `&Vec&lt;i32&gt;!` |  |
| `fd` | `i32` |  |

---

### <a id="closeListenFds"></a>`closeListenFds`

&gt; 📄 `app.vx` L1574-1591

```vex
fn closeListenFds(fds: &Vec<i32>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fds` | `&Vec&lt;i32&gt;` |  |

---

### <a id="defaultNotFound"></a>`defaultNotFound`

&gt; 📄 `app.vx` L1593-1596

```vex
fn defaultNotFound(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&Ctx!` |  |

---

### <a id="methodToId"></a>`methodToId`

&gt; 📄 `router.vx` L42-51

```vex
fn methodToId(m: str): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `m` | `str` |  |

**Returns:** `i32`

---

### <a id="cacheRouteParamNames"></a>`cacheRouteParamNames`

&gt; 📄 `router.vx` L281-308

```vex
fn cacheRouteParamNames(router: &Router!, pattern: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `router` | `&Router!` |  |
| `pattern` | `str` |  |

---

### <a id="cachedParamName"></a>`cachedParamName`

&gt; 📄 `router.vx` L310-317

```vex
fn cachedParamName(router: &Router, route_idx: usize, param_idx: usize, fallback: str): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `router` | `&Router` |  |
| `route_idx` | `usize` |  |
| `param_idx` | `usize` |  |
| `fallback` | `str` |  |

**Returns:** `string`

---

### <a id="injectRouteMiddleware"></a>`injectRouteMiddleware`

&gt; 📄 `router.vx` L319-344

```vex
fn injectRouteMiddleware(router: &Router, route_idx: usize, ctx: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `router` | `&Router` |  |
| `route_idx` | `usize` |  |
| `ctx` | `&Ctx!` |  |

---

### <a id="matchRoute"></a>`matchRoute`

&gt; 📄 `router.vx` L353-421

```vex
fn matchRoute(router: &Router, route_idx: usize, pattern: str, path: str, ctx: &Ctx!): bool
```

Match a request path against a route pattern using direct byte comparison.

Reuses cached param-name strings to avoid per-request name materialization.
On success, populates ctx.routeParams and returns true.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `router` | `&Router` |  |
| `route_idx` | `usize` |  |
| `pattern` | `str` |  |
| `path` | `str` |  |
| `ctx` | `&Ctx!` |  |

**Returns:** `bool`

---

### <a id="h2StatusText"></a>`h2StatusText`

&gt; 📄 `ctx.vx` L569-587

```vex
fn h2StatusText(code: i32): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `code` | `i32` |  |

**Returns:** `string`

---

### <a id="h2WriteFrameHeader"></a>`h2WriteFrameHeader`

&gt; 📄 `ctx.vx` L589-600

```vex
fn h2WriteFrameHeader(buf: *u8, payloadLen: i32, frameType: u8, flags: u8, streamId: i32)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `*u8` |  |
| `payloadLen` | `i32` |  |
| `frameType` | `u8` |  |
| `flags` | `u8` |  |
| `streamId` | `i32` |  |

---

### <a id="h2WriteLiteralHeader"></a>`h2WriteLiteralHeader`

&gt; 📄 `ctx.vx` L602-632

```vex
fn h2WriteLiteralHeader(out: *u8, offset: i32, name: str, value: str): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `*u8` |  |
| `offset` | `i32` |  |
| `name` | `str` |  |
| `value` | `str` |  |

**Returns:** `i32`

---

### <a id="h2SendResponse"></a>`h2SendResponse`

&gt; 📄 `ctx.vx` L634-667

```vex
fn h2SendResponse(fd: i32, streamId: i32, statusCode: i32, contentType: str, body: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `streamId` | `i32` |  |
| `statusCode` | `i32` |  |
| `contentType` | `str` |  |
| `body` | `str` |  |

---

### <a id="h2SendAll"></a>`h2SendAll`

&gt; 📄 `ctx.vx` L669-683

```vex
fn h2SendAll(fd: i32, buf: *u8, len: usize): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `*u8` |  |
| `len` | `usize` |  |

**Returns:** `bool`

---

### <a id="parseQueryString"></a>`parseQueryString`

&gt; 📄 `ctx.vx` L714-746

```vex
fn parseQueryString(qs: string): Vec<ParamEntry>
```

Parse "key1=val1&key2=val2" into ParamEntry pairs.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `qs` | `string` |  |

**Returns:** `Vec&lt;ParamEntry&gt;`

---

### <a id="strContains"></a>`strContains`

&gt; 📄 `ctx.vx` L753-774

```vex
fn strContains(haystack: string, needle: string): bool
```

Simple substring search.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `haystack` | `string` |  |
| `needle` | `string` |  |

**Returns:** `bool`

---

### <a id="trimWhitespace"></a>`trimWhitespace`

&gt; 📄 `ctx.vx` L777-790

```vex
fn trimWhitespace(s: string): string
```

Trim leading/trailing whitespace.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `string` |  |

**Returns:** `string`

---

### <a id="jsonGetString"></a>`jsonGetString`

&gt; 📄 `ctx.vx` L795-847

```vex
fn jsonGetString(json: string, key: string): string
```

Extract a string value from a JSON object by key.

Handles: {"key": "value", ...} patterns.
Returns empty string if key not found or value is not a string.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `json` | `string` |  |
| `key` | `string` |  |

**Returns:** `string`

---

### <a id="mimeFromExt"></a>`mimeFromExt`

&gt; 📄 `ctx.vx` L854-875

```vex
fn mimeFromExt(ext: string): string
```

Map file extension to MIME type.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ext` | `string` |  |

**Returns:** `string`

---

### <a id="strContainsDotDot"></a>`strContainsDotDot`

&gt; 📄 `ctx.vx` L877-886

```vex
fn strContainsDotDot(s: string): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `string` |  |

**Returns:** `bool`

---

### <a id="getExtension"></a>`getExtension`

&gt; 📄 `ctx.vx` L888-898

```vex
fn getExtension(path: string): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `string`

---

### <a id="cloneMiddlewareRange"></a>`cloneMiddlewareRange`

&gt; 📄 `radix.vx` L113-123

```vex
fn cloneMiddlewareRange(tree: &RadixTree, node_idx: usize): Vec<HandlerSlot>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `tree` | `&RadixTree` |  |
| `node_idx` | `usize` |  |

**Returns:** `Vec&lt;HandlerSlot&gt;`

---

### <a id="ensurePattern"></a>`ensurePattern`

&gt; 📄 `radix.vx` L125-225

```vex
fn ensurePattern(tree: &RadixTree!, pattern: string): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `tree` | `&RadixTree!` |  |
| `pattern` | `string` |  |

**Returns:** `usize`

---

### <a id="assignMatch"></a>`assignMatch`

&gt; 📄 `radix.vx` L227-234

```vex
fn assignMatch(tree: &RadixTree, node_idx: usize, result: &MatchResult!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `tree` | `&RadixTree` |  |
| `node_idx` | `usize` |  |
| `result` | `&MatchResult!` |  |

---

### <a id="matchNode"></a>`matchNode`

&gt; 📄 `radix.vx` L236-255

```vex
fn matchNode(tree: &RadixTree, node_idx: usize, path: string, pos: usize, result: &MatchResult!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `tree` | `&RadixTree` |  |
| `node_idx` | `usize` |  |
| `path` | `string` |  |
| `pos` | `usize` |  |
| `result` | `&MatchResult!` |  |

---

### <a id="matchChildrenOfKind"></a>`matchChildrenOfKind`

&gt; 📄 `radix.vx` L257-355

```vex
fn matchChildrenOfKind(tree: &RadixTree, parent_idx: usize, wanted_kind: i32, path: string, cpos: usize, result: &MatchResult!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `tree` | `&RadixTree` |  |
| `parent_idx` | `usize` |  |
| `wanted_kind` | `i32` |  |
| `path` | `string` |  |
| `cpos` | `usize` |  |
| `result` | `&MatchResult!` |  |

---

### <a id="httpGet"></a>`httpGet` `🔓 export`

&gt; 📄 `client.vx` L225-228

```vex
export fn httpGet(host: string, port: i32, path: string): ClientResponse
```

Simple GET request.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `host` | `string` |  |
| `port` | `i32` |  |
| `path` | `string` |  |

**Returns:** `ClientResponse`

---

### <a id="httpPost"></a>`httpPost` `🔓 export`

&gt; 📄 `client.vx` L231-236

```vex
export fn httpPost(host: string, port: i32, path: string, body: string): ClientResponse
```

Simple POST request with body.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `host` | `string` |  |
| `port` | `i32` |  |
| `path` | `string` |  |
| `body` | `string` |  |

**Returns:** `ClientResponse`

---

### <a id="httpPostJSON"></a>`httpPostJSON` `🔓 export`

&gt; 📄 `client.vx` L239-244

```vex
export fn httpPostJSON(host: string, port: i32, path: string, json: string): ClientResponse
```

POST JSON request.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `host` | `string` |  |
| `port` | `i32` |  |
| `path` | `string` |  |
| `json` | `string` |  |

**Returns:** `ClientResponse`

---

### <a id="httpPut"></a>`httpPut` `🔓 export`

&gt; 📄 `client.vx` L247-251

```vex
export fn httpPut(host: string, port: i32, path: string, body: string): ClientResponse
```

Simple PUT request with body.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `host` | `string` |  |
| `port` | `i32` |  |
| `path` | `string` |  |
| `body` | `string` |  |

**Returns:** `ClientResponse`

---

### <a id="httpDelete"></a>`httpDelete` `🔓 export`

&gt; 📄 `client.vx` L254-257

```vex
export fn httpDelete(host: string, port: i32, path: string): ClientResponse
```

Simple DELETE request.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `host` | `string` |  |
| `port` | `i32` |  |
| `path` | `string` |  |

**Returns:** `ClientResponse`

---

### <a id="httpPatch"></a>`httpPatch` `🔓 export`

&gt; 📄 `client.vx` L260-264

```vex
export fn httpPatch(host: string, port: i32, path: string, body: string): ClientResponse
```

Simple PATCH request.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `host` | `string` |  |
| `port` | `i32` |  |
| `path` | `string` |  |
| `body` | `string` |  |

**Returns:** `ClientResponse`

---

### <a id="readResponse"></a>`readResponse`

&gt; 📄 `client.vx` L272-342

```vex
fn readResponse(fd: i32): ClientResponse
```

Read and parse an HTTP response from a socket.

Uses Scanner SIMD for byte-finding — ~5-10x faster than manual byte loops.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

**Returns:** `ClientResponse`

---

### <a id="parseRequestFromSocket"></a>`parseRequestFromSocket`

&gt; 📄 `request.vx` L103-257

```vex
fn parseRequestFromSocket(fd: i32, useAsync: bool): Request
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `useAsync` | `bool` |  |

**Returns:** `Request`

---

### <a id="parseRequest"></a>`parseRequest` `🔓 export`

&gt; 📄 `request.vx` L260-262

```vex
export fn parseRequest(fd: i32): Request
```

Read and parse an HTTP request from a TCP socket fd.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

**Returns:** `Request`

---

### <a id="parseRequestAsync"></a>`parseRequestAsync` `🔓 export`

&gt; 📄 `request.vx` L265-267

```vex
export fn parseRequestAsync(fd: i32): Request
```

Async variant for goroutine-per-connection servers.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

**Returns:** `Request`

---

### <a id="respondText"></a>`respondText` `🔓 export`

&gt; 📄 `response.vx` L111-114

```vex
export fn respondText(fd: i32, text: string)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `text` | `string` |  |

---

### <a id="respondJSON"></a>`respondJSON` `🔓 export`

&gt; 📄 `response.vx` L116-119

```vex
export fn respondJSON(fd: i32, json: string)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `json` | `string` |  |

---

### <a id="respondError"></a>`respondError` `🔓 export`

&gt; 📄 `response.vx` L121-125

```vex
export fn respondError(fd: i32, code: i32, message: string)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `code` | `i32` |  |
| `message` | `string` |  |

---

### <a id="respondRedirect"></a>`respondRedirect` `🔓 export`

&gt; 📄 `response.vx` L127-132

```vex
export fn respondRedirect(fd: i32, location: string)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `location` | `string` |  |

---

### <a id="isWebSocketUpgrade"></a>`isWebSocketUpgrade` `🔓 export`

&gt; 📄 `ws.vx` L278-283

```vex
export fn isWebSocketUpgrade(req: &Request): bool
```

Check if a request is a WebSocket upgrade request.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&Request` |  |

**Returns:** `bool`

---

---

*Generated by vex-doc v2.0 • 2026-07-06*
