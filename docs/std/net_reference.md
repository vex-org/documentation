# Project v0.0.0

## Overview

**Structs:** [`Ipv4FormatBufferState`](#Ipv4FormatBufferState) · [`Ipv6FormatBufferState`](#Ipv6FormatBufferState) · [`SocketFormatBufferState`](#SocketFormatBufferState) · [`SocketAppendState`](#SocketAppendState) · [`WsParseState`](#WsParseState) · [`WsEncodeState`](#WsEncodeState) · [`WsUnmaskState`](#WsUnmaskState) · [`ConnHeaderState`](#ConnHeaderState) · [`ConnRecycleState`](#ConnRecycleState) · [`TcpListener`](#TcpListener) · [`TcpStream`](#TcpStream) · [`Event`](#Event) · [`EventLoop`](#EventLoop) · [`UdpSocket`](#UdpSocket) · [`UdpRecvFromResult`](#UdpRecvFromResult) · [`UdpDatagram`](#UdpDatagram) · [`WsFrame`](#WsFrame) · [`WsFrameStream`](#WsFrameStream) · [`ResolveError`](#ResolveError) · [`ResolveOptions`](#ResolveOptions) · [`sockaddr_in`](#sockaddr_in) · [`sockaddr_ip`](#sockaddr_ip) · [`Conn`](#Conn) · [`ArenaCheckpoint`](#ArenaCheckpoint) · [`Socket`](#Socket) · [`sockaddr_in`](#sockaddr_in) · [`sockaddr_ip`](#sockaddr_ip) · [`epoll_event`](#epoll_event) · [`AddressParseError`](#AddressParseError) · [`AddressFormatError`](#AddressFormatError) · [`Ipv4Addr`](#Ipv4Addr) · [`Ipv6Addr`](#Ipv6Addr) · [`SocketAddr`](#SocketAddr) · [`ParsedIpv6Side`](#ParsedIpv6Side) · [`sockaddr_in`](#sockaddr_in) · [`sockaddr_ip`](#sockaddr_ip)

**Enums:** [`ResolveFamily`](#ResolveFamily) · [`ResolveErrorKind`](#ResolveErrorKind) · [`IpFamily`](#IpFamily) · [`AddressParseErrorKind`](#AddressParseErrorKind) · [`IpAddr`](#IpAddr)

**Functions:** [`test_tcp_socket_create_close`](#test_tcp_socket_create_close) · [`test_udp_socket_create_close`](#test_udp_socket_create_close) · [`test_multiple_sockets_are_distinct`](#test_multiple_sockets_are_distinct) · [`test_invalid_event_loop_fails_closed`](#test_invalid_event_loop_fails_closed) · [`test_resolver_numeric_ipv4_fast_path`](#test_resolver_numeric_ipv4_fast_path) · [`test_resolver_numeric_ipv6_family_filter`](#test_resolver_numeric_ipv6_family_filter) · [`test_resolver_rejects_numeric_family_mismatch`](#test_resolver_rejects_numeric_family_mismatch) · [`test_resolver_validates_hostname_and_capacity`](#test_resolver_validates_hostname_and_capacity) · [`test_resolver_system_localhost_is_ordered_and_unique`](#test_resolver_system_localhost_is_ordered_and_unique) · [`test_resolver_family_filtering_is_semantic`](#test_resolver_family_filtering_is_semantic) · [`test_resolver_socket_addresses_preserve_port`](#test_resolver_socket_addresses_preserve_port) · [`test_encode_decode_text`](#test_encode_decode_text) · [`test_encode_close`](#test_encode_close) · [`test_encode_ping_pong`](#test_encode_ping_pong) · [`test_control_data_check`](#test_control_data_check) · [`test_need_more`](#test_need_more) · [`test_frame_stream_preserves_partial_and_trailing_frames`](#test_frame_stream_preserves_partial_and_trailing_frames) · [`test_frame_stream_rejects_invalid_capacity_transitions`](#test_frame_stream_rejects_invalid_capacity_transitions) · [`test_masked_payload_unmask`](#test_masked_payload_unmask) · [`test_masked_payload_unmask_simd_boundaries`](#test_masked_payload_unmask_simd_boundaries) · [`test_masked_payload_unmask_tail_matrix`](#test_masked_payload_unmask_tail_matrix) · [`test_rejects_invalid_protocol_shapes`](#test_rejects_invalid_protocol_shapes) · [`test_encode_bounds_and_extended_length`](#test_encode_bounds_and_extended_length) · [`test_encode_header_is_zero_copy_and_canonical`](#test_encode_header_is_zero_copy_and_canonical) · [`test_tcp_stream_adopt_consumes_socket_and_preserves_async_io`](#test_tcp_stream_adopt_consumes_socket_and_preserves_async_io) · [`mustIpv4`](#mustIpv4) · [`mustIpv6`](#mustIpv6) · [`expectInvalidIpv4`](#expectInvalidIpv4) · [`expectInvalidIpv6`](#expectInvalidIpv6) · [`bufferEquals`](#bufferEquals) · [`test_ipv4_typed_parse_format_and_classification`](#test_ipv4_typed_parse_format_and_classification) · [`test_ipv4_parser_is_canonical_and_bounded`](#test_ipv4_parser_is_canonical_and_bounded) · [`test_ipv6_parse_expansion_and_rfc5952_formatting`](#test_ipv6_parse_expansion_and_rfc5952_formatting) · [`test_ipv6_embedded_ipv4_and_roundtrip`](#test_ipv6_embedded_ipv4_and_roundtrip) · [`test_ipv6_parser_rejects_ambiguous_and_oversized_input`](#test_ipv6_parser_rejects_ambiguous_and_oversized_input) · [`test_ipaddr_and_socketaddr_typed_roundtrip`](#test_ipaddr_and_socketaddr_typed_roundtrip) · [`test_socketaddr_rejects_missing_or_out_of_range_port`](#test_socketaddr_rejects_missing_or_out_of_range_port) · [`test_address_caller_buffer_formatting_is_exact_and_transactional`](#test_address_caller_buffer_formatting_is_exact_and_transactional) · [`test_ipv6_format_repeated_preserves_value_and_result_ownership`](#test_ipv6_format_repeated_preserves_value_and_result_ownership) · [`test_ipv6_copy_aggregate_survives_optimizer_barrier`](#test_ipv6_copy_aggregate_survives_optimizer_barrier) · [`test_async_accept_parks_until_loopback_connect`](#test_async_accept_parks_until_loopback_connect) · [`test_context_cancellation_retires_parked_accept`](#test_context_cancellation_retires_parked_accept) · [`test_context_deadline_retires_parked_accept`](#test_context_deadline_retires_parked_accept) · [`test_context_aware_tcp_read_write_roundtrip`](#test_context_aware_tcp_read_write_roundtrip) · [`test_context_aware_udp_datagram_roundtrip`](#test_context_aware_udp_datagram_roundtrip) · [`test_context_cancellation_retires_parked_udp_receive`](#test_context_cancellation_retires_parked_udp_receive) · [`test_context_deadline_retires_parked_udp_receive`](#test_context_deadline_retires_parked_udp_receive) · [`test_socket_close_retires_parked_accept_exactly_once`](#test_socket_close_retires_parked_accept_exactly_once) · [`test_socket_close_and_context_cancel_elect_one_terminal`](#test_socket_close_and_context_cancel_elect_one_terminal) · [`test_arena_checkpoint_round_trip`](#test_arena_checkpoint_round_trip) · [`parseIpv4Observed`](#parseIpv4Observed) · [`parseIpv6Observed`](#parseIpv6Observed) · [`parseSocketObserved`](#parseSocketObserved) · [`bench_parse_ipv4`](#bench_parse_ipv4) · [`bench_parse_ipv6_compressed`](#bench_parse_ipv6_compressed) · [`bench_parse_socketaddr_ipv6`](#bench_parse_socketaddr_ipv6) · [`bench_format_ipv4`](#bench_format_ipv4) · [`bench_format_ipv6`](#bench_format_ipv6) · [`bench_format_ipv4_to_buffer`](#bench_format_ipv4_to_buffer) · [`bench_format_ipv6_to_buffer`](#bench_format_ipv6_to_buffer) · [`bench_format_socketaddr_ipv6_to_buffer`](#bench_format_socketaddr_ipv6_to_buffer) · [`bench_format_socketaddr_ipv6_append_reused`](#bench_format_socketaddr_ipv6_append_reused) · [`bench_websocket_parse_4k_zero_copy`](#bench_websocket_parse_4k_zero_copy) · [`bench_websocket_encode_4k_reused`](#bench_websocket_encode_4k_reused) · [`makeWsUnmaskState`](#makeWsUnmaskState) · [`runWsUnmask`](#runWsUnmask) · [`bench_websocket_unmask_125b_in_place`](#bench_websocket_unmask_125b_in_place) · [`bench_websocket_unmask_4k_in_place`](#bench_websocket_unmask_4k_in_place) · [`bench_conn_find_header_end_4k_late`](#bench_conn_find_header_end_4k_late) · [`bench_conn_recycle_read_queue_8k`](#bench_conn_recycle_read_queue_8k) · [`test_net_benchmark_fixtures_roundtrip`](#test_net_benchmark_fixtures_roundtrip) · [`test_conn_wrap`](#test_conn_wrap) · [`test_conn_readable`](#test_conn_readable) · [`test_conn_consume`](#test_conn_consume) · [`test_conn_compact`](#test_conn_compact) · [`test_conn_find_header_end`](#test_conn_find_header_end) · [`test_conn_find_header_end_boundaries_and_false_candidates`](#test_conn_find_header_end_boundaries_and_false_candidates) · [`test_conn_pending_write`](#test_conn_pending_write) · [`test_conn_buffered_write_is_lossless_and_bounded`](#test_conn_buffered_write_is_lossless_and_bounded) · [`test_conn_reset`](#test_conn_reset) · [`test_conn_buffered_zero_copy_input_and_limits`](#test_conn_buffered_zero_copy_input_and_limits) · [`parsed`](#parsed) · [`expectAddress`](#expectAddress) · [`expectInvalidAddress`](#expectInvalidAddress) · [`test_net_negative_result_preserves_canonical_error`](#test_net_negative_result_preserves_canonical_error) · [`test_ipv4_parser_accepts_exact_network_order_octets`](#test_ipv4_parser_accepts_exact_network_order_octets) · [`test_ipv4_parser_rejects_malformed_and_out_of_range_input`](#test_ipv4_parser_rejects_malformed_and_out_of_range_input) · [`test_high_level_constructors_validate_before_native_access`](#test_high_level_constructors_validate_before_native_access) · [`test_typed_ipv4_endpoints_reach_the_native_boundary`](#test_typed_ipv4_endpoints_reach_the_native_boundary) · [`test_udp_port_zero_local_addr_and_typed_roundtrip`](#test_udp_port_zero_local_addr_and_typed_roundtrip) · [`test_ipv6_endpoints_reach_sockaddr_in6_without_text_parsing`](#test_ipv6_endpoints_reach_sockaddr_in6_without_text_parsing) · [`closeHandle`](#closeHandle) · [`contextFailure`](#contextFailure) · [`nativeAddress`](#nativeAddress) · [`tcpStreamTakeSocket`](#tcpStreamTakeSocket) · [`vex_net_resolve_host`](#vex_net_resolve_host) · [`vex_net_socket_tcp`](#vex_net_socket_tcp) · [`vex_net_socket_tcp_blocking`](#vex_net_socket_tcp_blocking) · [`vex_net_socket_udp`](#vex_net_socket_udp) · [`vex_net_set_reuseaddr`](#vex_net_set_reuseaddr) · [`vex_net_set_reuseport`](#vex_net_set_reuseport) · [`vex_net_set_nonblock`](#vex_net_set_nonblock) · [`vex_net_set_nodelay`](#vex_net_set_nodelay) · [`vex_net_set_nopush`](#vex_net_set_nopush) · [`vex_net_bind`](#vex_net_bind) · [`vex_net_bind_ip`](#vex_net_bind_ip) · [`vex_net_listen`](#vex_net_listen) · [`vex_net_connect`](#vex_net_connect) · [`vex_net_connect_ip`](#vex_net_connect_ip) · [`vex_net_connect_ip_async`](#vex_net_connect_ip_async) · [`vex_net_connect_ip_async_context`](#vex_net_connect_ip_async_context) · [`vex_net_local_addr`](#vex_net_local_addr) · [`vex_net_peer_addr`](#vex_net_peer_addr) · [`vex_net_accept`](#vex_net_accept) · [`vex_net_recv`](#vex_net_recv) · [`vex_net_recv_peek`](#vex_net_recv_peek) · [`vex_net_send`](#vex_net_send) · [`vex_net_sendto`](#vex_net_sendto) · [`vex_net_sendto_ip`](#vex_net_sendto_ip) · [`vex_net_sendto_ip_async_context`](#vex_net_sendto_ip_async_context) · [`vex_net_recvfrom`](#vex_net_recvfrom) · [`vex_net_recvfrom_ip`](#vex_net_recvfrom_ip) · [`vex_net_recvfrom_ip_async_context`](#vex_net_recvfrom_ip_async_context) · [`vex_net_close`](#vex_net_close) · [`vex_net_pipe`](#vex_net_pipe) · [`vex_net_loop_create`](#vex_net_loop_create) · [`vex_net_loop_close`](#vex_net_loop_close) · [`vex_net_register`](#vex_net_register) · [`vex_net_modify`](#vex_net_modify) · [`vex_net_unregister`](#vex_net_unregister) · [`vex_net_tick`](#vex_net_tick) · [`vex_fd_set_nonblock`](#vex_fd_set_nonblock) · [`vex_net_thread_yield`](#vex_net_thread_yield) · [`vex_fd_read`](#vex_fd_read) · [`vex_fd_write`](#vex_fd_write) · [`readEvent`](#readEvent) · [`decodedSocketAddress`](#decodedSocketAddress) · [`localSocketAddress`](#localSocketAddress) · [`peerSocketAddress`](#peerSocketAddress) · [`closeHandle`](#closeHandle) · [`contextFailure`](#contextFailure) · [`nativeAddress`](#nativeAddress) · [`isValidOpcode`](#isValidOpcode) · [`parseFrame`](#parseFrame) · [`encodeFrameHeader`](#encodeFrameHeader) · [`encodeFrame`](#encodeFrame) · [`encodeText`](#encodeText) · [`encodeClose`](#encodeClose) · [`encodePing`](#encodePing) · [`encodePong`](#encodePong) · [`isControlFrame`](#isControlFrame) · [`isDataFrame`](#isDataFrame) · [`resolveError`](#resolveError) · [`familyCode`](#familyCode) · [`familyAccepts`](#familyAccepts) · [`validateAndCopyHost`](#validateAndCopyHost) · [`decodeProviderAddress`](#decodeProviderAddress) · [`mapProviderFailure`](#mapProviderFailure) · [`resolveHostBlocking`](#resolveHostBlocking) · [`resolveHostBlocking`](#resolveHostBlocking) · [`resolveSocketAddrsBlocking`](#resolveSocketAddrsBlocking) · [`resolveSocketAddrsBlocking`](#resolveSocketAddrsBlocking) · [`get_errno`](#get_errno) · [`negative_errno`](#negative_errno) · [`map_resolver_status`](#map_resolver_status) · [`vex_net_resolve_host`](#vex_net_resolve_host) · [`build_ip_port`](#build_ip_port) · [`decode_ip_port`](#decode_ip_port) · [`write_ipv4_text`](#write_ipv4_text) · [`parse_ip_port`](#parse_ip_port) · [`vex_net_socket_tcp`](#vex_net_socket_tcp) · [`vex_net_socket_tcp_blocking`](#vex_net_socket_tcp_blocking) · [`vex_net_socket_udp`](#vex_net_socket_udp) · [`vex_net_set_reuseaddr`](#vex_net_set_reuseaddr) · [`vex_net_set_reuseport`](#vex_net_set_reuseport) · [`vex_net_set_nonblock`](#vex_net_set_nonblock) · [`vex_net_set_nodelay`](#vex_net_set_nodelay) · [`vex_net_set_nopush`](#vex_net_set_nopush) · [`vex_net_bind`](#vex_net_bind) · [`vex_net_bind_ip`](#vex_net_bind_ip) · [`vex_net_listen`](#vex_net_listen) · [`vex_net_connect`](#vex_net_connect) · [`vex_net_connect_ip`](#vex_net_connect_ip) · [`vex_net_connect_ip_async`](#vex_net_connect_ip_async) · [`vex_net_connect_ip_async_context`](#vex_net_connect_ip_async_context) · [`vex_net_local_addr`](#vex_net_local_addr) · [`vex_net_peer_addr`](#vex_net_peer_addr) · [`vex_net_accept`](#vex_net_accept) · [`vex_net_recv`](#vex_net_recv) · [`vex_net_recv_peek`](#vex_net_recv_peek) · [`vex_net_send`](#vex_net_send) · [`vex_net_sendto`](#vex_net_sendto) · [`vex_net_sendto_ip`](#vex_net_sendto_ip) · [`vex_net_sendto_ip_async_context`](#vex_net_sendto_ip_async_context) · [`vex_net_recvfrom`](#vex_net_recvfrom) · [`vex_net_recvfrom_ip`](#vex_net_recvfrom_ip) · [`vex_net_recvfrom_ip_async_context`](#vex_net_recvfrom_ip_async_context) · [`vex_net_close`](#vex_net_close) · [`vex_net_pipe`](#vex_net_pipe) · [`vex_net_loop_create`](#vex_net_loop_create) · [`vex_net_loop_close`](#vex_net_loop_close) · [`vex_net_register`](#vex_net_register) · [`vex_net_modify`](#vex_net_modify) · [`vex_net_unregister`](#vex_net_unregister) · [`vex_net_tick`](#vex_net_tick) · [`vex_fd_set_nonblock`](#vex_fd_set_nonblock) · [`vex_net_thread_yield`](#vex_net_thread_yield) · [`vex_fd_read`](#vex_fd_read) · [`vex_fd_write`](#vex_fd_write) · [`monotonicNs`](#monotonicNs) · [`prepareWorkers`](#prepareWorkers) · [`registeredWorkerCount`](#registeredWorkerCount) · [`flushSpawnBatch`](#flushSpawnBatch) · [`arenaSave`](#arenaSave) · [`arenaRestore`](#arenaRestore) · [`arenaCheckpoint`](#arenaCheckpoint) · [`arenaRewind`](#arenaRewind) · [`arenaTotalBytesUsed`](#arenaTotalBytesUsed) · [`regionCurrent`](#regionCurrent) · [`regionSetCurrent`](#regionSetCurrent) · [`setArenaMode`](#setArenaMode) · [`getArenaMode`](#getArenaMode) · [`cpuCount`](#cpuCount) · [`makePipe`](#makePipe) · [`tcpBlockingFd`](#tcpBlockingFd) · [`connectFd`](#connectFd) · [`bindFd`](#bindFd) · [`listenFd`](#listenFd) · [`acceptFd`](#acceptFd) · [`setReuseAddrFd`](#setReuseAddrFd) · [`setNoDelayFd`](#setNoDelayFd) · [`recvFd`](#recvFd) · [`sendFd`](#sendFd) · [`closeFd`](#closeFd) · [`peekFd`](#peekFd) · [`writeFd`](#writeFd) · [`readFd`](#readFd) · [`asyncAcceptFd`](#asyncAcceptFd) · [`asyncAcceptFd`](#asyncAcceptFd) · [`asyncRecvFd`](#asyncRecvFd) · [`asyncRecvFd`](#asyncRecvFd) · [`asyncSendFd`](#asyncSendFd) · [`asyncSendFd`](#asyncSendFd) · [`setNonBlockFd`](#setNonBlockFd) · [`map_resolver_status`](#map_resolver_status) · [`vex_net_resolve_host`](#vex_net_resolve_host) · [`socket`](#socket) · [`bind`](#bind) · [`listen`](#listen) · [`accept`](#accept) · [`connect`](#connect) · [`getsockname`](#getsockname) · [`getpeername`](#getpeername) · [`close`](#close) · [`recvfrom`](#recvfrom) · [`sendto`](#sendto) · [`setsockopt`](#setsockopt) · [`pipe2`](#pipe2) · [`fcntl`](#fcntl) · [`epoll_create1`](#epoll_create1) · [`epoll_ctl`](#epoll_ctl) · [`epoll_wait`](#epoll_wait) · [`build_ip_port`](#build_ip_port) · [`decode_ip_port`](#decode_ip_port) · [`write_ipv4_text`](#write_ipv4_text) · [`parse_ip_port`](#parse_ip_port) · [`vex_net_socket_tcp`](#vex_net_socket_tcp) · [`vex_net_socket_tcp_blocking`](#vex_net_socket_tcp_blocking) · [`vex_net_socket_udp`](#vex_net_socket_udp) · [`vex_net_set_reuseaddr`](#vex_net_set_reuseaddr) · [`vex_net_set_reuseport`](#vex_net_set_reuseport) · [`vex_net_set_nonblock`](#vex_net_set_nonblock) · [`vex_net_set_nodelay`](#vex_net_set_nodelay) · [`vex_net_set_nopush`](#vex_net_set_nopush) · [`vex_net_bind`](#vex_net_bind) · [`vex_net_bind_ip`](#vex_net_bind_ip) · [`vex_net_listen`](#vex_net_listen) · [`vex_net_connect`](#vex_net_connect) · [`vex_net_connect_ip`](#vex_net_connect_ip) · [`vex_net_connect_ip_async`](#vex_net_connect_ip_async) · [`vex_net_connect_ip_async_context`](#vex_net_connect_ip_async_context) · [`vex_net_local_addr`](#vex_net_local_addr) · [`vex_net_peer_addr`](#vex_net_peer_addr) · [`vex_net_accept`](#vex_net_accept) · [`vex_net_recv`](#vex_net_recv) · [`vex_net_recv_peek`](#vex_net_recv_peek) · [`vex_net_send`](#vex_net_send) · [`vex_net_sendto`](#vex_net_sendto) · [`vex_net_sendto_ip`](#vex_net_sendto_ip) · [`vex_net_sendto_ip_async_context`](#vex_net_sendto_ip_async_context) · [`vex_net_recvfrom`](#vex_net_recvfrom) · [`vex_net_recvfrom_ip`](#vex_net_recvfrom_ip) · [`vex_net_recvfrom_ip_async_context`](#vex_net_recvfrom_ip_async_context) · [`vex_net_close`](#vex_net_close) · [`vex_net_pipe`](#vex_net_pipe) · [`vex_net_loop_create`](#vex_net_loop_create) · [`vex_net_loop_close`](#vex_net_loop_close) · [`vex_net_register`](#vex_net_register) · [`vex_net_modify`](#vex_net_modify) · [`vex_net_unregister`](#vex_net_unregister) · [`vex_net_tick`](#vex_net_tick) · [`vex_fd_set_nonblock`](#vex_fd_set_nonblock) · [`vex_net_thread_yield`](#vex_net_thread_yield) · [`vex_fd_read`](#vex_fd_read) · [`vex_fd_write`](#vex_fd_write) · [`formatError`](#formatError) · [`parseError`](#parseError) · [`Ipv4Addr`](#Ipv4Addr) · [`SocketAddr`](#SocketAddr) · [`byteAt`](#byteAt) · [`decimalDigit`](#decimalDigit) · [`hexValue`](#hexValue) · [`parseIpv4Range`](#parseIpv4Range) · [`failedSide`](#failedSide) · [`parseIpv6Side`](#parseIpv6Side) · [`parseIpv6Range`](#parseIpv6Range) · [`parsePortRange`](#parsePortRange) · [`writeByte`](#writeByte) · [`writeDecimal`](#writeDecimal) · [`decimalLength`](#decimalLength) · [`writePort`](#writePort) · [`writeIpv4`](#writeIpv4) · [`ipv4TextLength`](#ipv4TextLength) · [`writeHex`](#writeHex) · [`writeIpv6`](#writeIpv6) · [`ipv6TextLength`](#ipv6TextLength) · [`portTextLength`](#portTextLength) · [`formatCapacityError`](#formatCapacityError) · [`parseIpv4`](#parseIpv4) · [`errorFromNegativeResult`](#errorFromNegativeResult) · [`closedSocketError`](#closedSocketError) · [`invalidBufferError`](#invalidBufferError) · [`invalidIpv4AddressError`](#invalidIpv4AddressError) · [`invalidIpAddressError`](#invalidIpAddressError) · [`oversizedIoResultError`](#oversizedIoResultError) · [`ensure_wsa`](#ensure_wsa) · [`map_resolver_status`](#map_resolver_status) · [`vex_net_resolve_host`](#vex_net_resolve_host) · [`build_ip_port`](#build_ip_port) · [`decode_ip_port`](#decode_ip_port) · [`write_ipv4_text`](#write_ipv4_text) · [`parse_ip_port`](#parse_ip_port) · [`negative_socket_error`](#negative_socket_error) · [`bounded_socket_length`](#bounded_socket_length) · [`vex_net_socket_tcp`](#vex_net_socket_tcp) · [`vex_net_socket_tcp_blocking`](#vex_net_socket_tcp_blocking) · [`vex_net_socket_udp`](#vex_net_socket_udp) · [`vex_net_set_reuseaddr`](#vex_net_set_reuseaddr) · [`vex_net_set_reuseport`](#vex_net_set_reuseport) · [`vex_net_set_nonblock`](#vex_net_set_nonblock) · [`vex_net_set_nodelay`](#vex_net_set_nodelay) · [`vex_net_set_nopush`](#vex_net_set_nopush) · [`vex_net_bind`](#vex_net_bind) · [`vex_net_bind_ip`](#vex_net_bind_ip) · [`vex_net_listen`](#vex_net_listen) · [`vex_net_connect`](#vex_net_connect) · [`vex_net_connect_ip`](#vex_net_connect_ip) · [`vex_net_connect_ip_async`](#vex_net_connect_ip_async) · [`vex_net_connect_ip_async_context`](#vex_net_connect_ip_async_context) · [`vex_net_local_addr`](#vex_net_local_addr) · [`vex_net_peer_addr`](#vex_net_peer_addr) · [`vex_net_accept`](#vex_net_accept) · [`vex_net_recv`](#vex_net_recv) · [`vex_net_recv_peek`](#vex_net_recv_peek) · [`vex_net_send`](#vex_net_send) · [`vex_net_sendto`](#vex_net_sendto) · [`vex_net_sendto_ip`](#vex_net_sendto_ip) · [`vex_net_sendto_ip_async_context`](#vex_net_sendto_ip_async_context) · [`vex_net_recvfrom`](#vex_net_recvfrom) · [`vex_net_recvfrom_ip`](#vex_net_recvfrom_ip) · [`vex_net_recvfrom_ip_async_context`](#vex_net_recvfrom_ip_async_context) · [`vex_net_close`](#vex_net_close) · [`vex_net_pipe`](#vex_net_pipe) · [`vex_net_loop_create`](#vex_net_loop_create) · [`vex_net_loop_close`](#vex_net_loop_close) · [`vex_net_register`](#vex_net_register) · [`vex_net_modify`](#vex_net_modify) · [`vex_net_unregister`](#vex_net_unregister) · [`vex_net_tick`](#vex_net_tick) · [`vex_net_thread_yield`](#vex_net_thread_yield) · [`vex_fd_set_nonblock`](#vex_fd_set_nonblock) · [`vex_fd_write`](#vex_fd_write) · [`vex_fd_read`](#vex_fd_read) · [`vex_fd_write`](#vex_fd_write)

**Constants:** [`NET_UNSUPPORTED`](#NET_UNSUPPORTED) · [`EVT_READ`](#EVT_READ) · [`EVT_WRITE`](#EVT_WRITE) · [`EVT_HUP`](#EVT_HUP) · [`EVT_ERR`](#EVT_ERR) · [`WS_CONTINUATION`](#WS_CONTINUATION) · [`WS_TEXT`](#WS_TEXT) · [`WS_BINARY`](#WS_BINARY) · [`WS_CLOSE`](#WS_CLOSE) · [`WS_PING`](#WS_PING) · [`WS_PONG`](#WS_PONG) · [`WS_OK`](#WS_OK) · [`WS_NEED_MORE`](#WS_NEED_MORE) · [`WS_ERR_INVALID`](#WS_ERR_INVALID) · [`WS_MAX_BUFFER_BYTES`](#WS_MAX_BUFFER_BYTES) · [`RESOLVE_MAX_RESULTS`](#RESOLVE_MAX_RESULTS) · [`RESOLVE_HOST_CAPACITY`](#RESOLVE_HOST_CAPACITY) · [`RBUF_INIT`](#RBUF_INIT) · [`RBUF_MAX`](#RBUF_MAX) · [`WBUF_INIT`](#WBUF_INIT) · [`WBUF_MAX`](#WBUF_MAX)

## Constants

### <a id="NET_UNSUPPORTED"></a>`NET_UNSUPPORTED`

> 📄 `native.vxc` L10-10

```vex
const NET_UNSUPPORTED: i32=-95;
```

**Returns:** `i32=-95;`

---

### <a id="EVT_READ"></a>`EVT_READ` `🔓 export`

> 📄 `event_loop.vx` L27-27

```vex
export const EVT_READ: i32=1;
```

**Returns:** `i32=1;`

---

### <a id="EVT_WRITE"></a>`EVT_WRITE` `🔓 export`

> 📄 `event_loop.vx` L28-28

```vex
export const EVT_WRITE: i32=2;
```

**Returns:** `i32=2;`

---

### <a id="EVT_HUP"></a>`EVT_HUP` `🔓 export`

> 📄 `event_loop.vx` L29-29

```vex
export const EVT_HUP: i32=4;
```

**Returns:** `i32=4;`

---

### <a id="EVT_ERR"></a>`EVT_ERR` `🔓 export`

> 📄 `event_loop.vx` L30-30

```vex
export const EVT_ERR: i32=8;
```

**Returns:** `i32=8;`

---

### <a id="WS_CONTINUATION"></a>`WS_CONTINUATION` `🔓 export`

> 📄 `ws_parser.vx` L13-13

```vex
export const WS_CONTINUATION: u8=0;
```

**Returns:** `u8=0;`

---

### <a id="WS_TEXT"></a>`WS_TEXT` `🔓 export`

> 📄 `ws_parser.vx` L14-14

```vex
export const WS_TEXT: u8=1;
```

**Returns:** `u8=1;`

---

### <a id="WS_BINARY"></a>`WS_BINARY` `🔓 export`

> 📄 `ws_parser.vx` L15-15

```vex
export const WS_BINARY: u8=2;
```

**Returns:** `u8=2;`

---

### <a id="WS_CLOSE"></a>`WS_CLOSE` `🔓 export`

> 📄 `ws_parser.vx` L16-16

```vex
export const WS_CLOSE: u8=8;
```

**Returns:** `u8=8;`

---

### <a id="WS_PING"></a>`WS_PING` `🔓 export`

> 📄 `ws_parser.vx` L17-17

```vex
export const WS_PING: u8=9;
```

**Returns:** `u8=9;`

---

### <a id="WS_PONG"></a>`WS_PONG` `🔓 export`

> 📄 `ws_parser.vx` L18-18

```vex
export const WS_PONG: u8=10;
```

**Returns:** `u8=10;`

---

### <a id="WS_OK"></a>`WS_OK` `🔓 export`

> 📄 `ws_parser.vx` L20-20

```vex
export const WS_OK: i32=0;
```

**Returns:** `i32=0;`

---

### <a id="WS_NEED_MORE"></a>`WS_NEED_MORE` `🔓 export`

> 📄 `ws_parser.vx` L21-21

```vex
export const WS_NEED_MORE: i32=-1;
```

**Returns:** `i32=-1;`

---

### <a id="WS_ERR_INVALID"></a>`WS_ERR_INVALID` `🔓 export`

> 📄 `ws_parser.vx` L22-22

```vex
export const WS_ERR_INVALID: i32=-2;
```

**Returns:** `i32=-2;`

---

### <a id="WS_MAX_BUFFER_BYTES"></a>`WS_MAX_BUFFER_BYTES` `🔓 export`

> 📄 `ws_parser.vx` L27-27

```vex
export const WS_MAX_BUFFER_BYTES: usize=16 * 1024 * 1024 as usize;
```

Shared receive-buffer ceiling for connection-oriented WebSocket users.

This is deliberately a transport-neutral frame boundary rather than an
application message policy; consumers still bound fragmented messages.

**Returns:** `usize=16 * 1024 * 1024 as usize;`

---

### <a id="RESOLVE_MAX_RESULTS"></a>`RESOLVE_MAX_RESULTS`

> 📄 `resolver.vx` L12-12

```vex
const RESOLVE_MAX_RESULTS: usize=64 as usize;
```

**Returns:** `usize=64 as usize;`

---

### <a id="RESOLVE_HOST_CAPACITY"></a>`RESOLVE_HOST_CAPACITY`

> 📄 `resolver.vx` L13-13

```vex
const RESOLVE_HOST_CAPACITY: usize=254 as usize;
```

**Returns:** `usize=254 as usize;`

---

### <a id="RBUF_INIT"></a>`RBUF_INIT`

> 📄 `conn.vx` L18-18

```vex
const RBUF_INIT: usize=8192;
```

**Returns:** `usize=8192;`

---

### <a id="RBUF_MAX"></a>`RBUF_MAX`

> 📄 `conn.vx` L19-19

```vex
const RBUF_MAX: usize=1048576;
```

**Returns:** `usize=1048576;`

---

### <a id="WBUF_INIT"></a>`WBUF_INIT`

> 📄 `conn.vx` L20-20

```vex
const WBUF_INIT: usize=4096;
```

**Returns:** `usize=4096;`

---

### <a id="WBUF_MAX"></a>`WBUF_MAX`

> 📄 `conn.vx` L21-21

```vex
const WBUF_MAX: usize=1048576;
```

**Returns:** `usize=1048576;`

---

## Structs

### <a id="Ipv4FormatBufferState"></a>`Ipv4FormatBufferState`

> 📄 `bench.test.vx` L73-76

```vex
struct Ipv4FormatBufferState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `address` | `Ipv4Addr` | 🔒 private |  |
| `output` | `[u8; 64]` | 🔒 private |  |

---

### <a id="Ipv6FormatBufferState"></a>`Ipv6FormatBufferState`

> 📄 `bench.test.vx` L97-100

```vex
struct Ipv6FormatBufferState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `address` | `Ipv6Addr` | 🔒 private |  |
| `output` | `[u8; 64]` | 🔒 private |  |

---

### <a id="SocketFormatBufferState"></a>`SocketFormatBufferState`

> 📄 `bench.test.vx` L121-124

```vex
struct SocketFormatBufferState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `address` | `SocketAddr` | 🔒 private |  |
| `output` | `[u8; 64]` | 🔒 private |  |

---

### <a id="SocketAppendState"></a>`SocketAppendState`

> 📄 `bench.test.vx` L145-148

```vex
struct SocketAppendState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `address` | `SocketAddr` | 🔒 private |  |
| `output` | `Vec&lt;u8&gt;` | 🔒 private |  |

---

### <a id="WsParseState"></a>`WsParseState`

> 📄 `bench.test.vx` L169-173

```vex
struct WsParseState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `encoded` | `Vec&lt;u8&gt;` | 🔒 private |  |
| `frame` | `WsFrame` | 🔒 private |  |
| `consumed` | `u64` | 🔒 private |  |

---

### <a id="WsEncodeState"></a>`WsEncodeState`

> 📄 `bench.test.vx` L211-215

```vex
struct WsEncodeState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `payload` | `Vec&lt;u8&gt;` | 🔒 private |  |
| `encoded` | `Vec&lt;u8&gt;` | 🔒 private |  |
| `written` | `u64` | 🔒 private |  |

---

### <a id="WsUnmaskState"></a>`WsUnmaskState`

> 📄 `bench.test.vx` L238-244

```vex
struct WsUnmaskState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `encoded` | `Vec&lt;u8&gt;` | 🔒 private |  |
| `frame` | `WsFrame` | 🔒 private |  |
| `payloadOffset` | `usize` | 🔒 private |  |
| `payloadLength` | `usize` | 🔒 private |  |
| `observed` | `u64` | 🔒 private |  |

---

### <a id="ConnHeaderState"></a>`ConnHeaderState`

> 📄 `bench.test.vx` L307-310

```vex
struct ConnHeaderState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `connection` | `Conn` | 🔒 private |  |
| `observed` | `i32` | 🔒 private |  |

---

### <a id="ConnRecycleState"></a>`ConnRecycleState`

> 📄 `bench.test.vx` L335-338

```vex
struct ConnRecycleState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `connection` | `Conn` | 🔒 private |  |
| `source` | `Vec&lt;u8&gt;` | 🔒 private |  |

---

### <a id="TcpListener"></a>`TcpListener` `🔓 export`

> 📄 `tcp.vx` L34-36

```vex
export struct TcpListener
```

An owning, non-blocking TCP listener.

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `handle` | `i64` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `TcpListener.bind`[↗](#TcpListener.bind) | `export fn TcpListener.bind(ip: str, port: u16): Re` | Creates a non-blocking listener and completes all socket setup atomically. |
| `TcpListener.bind`[↗](#TcpListener.bind) | `export fn TcpListener.bind(endpoint: SocketAddr): ` | Creates a listener from a typed IPv4 or IPv6 endpoint. Address text parsing |
| ⚡`accept`[↗](#TcpListener.accept) | `export fn (self: &amp;TcpListener) accept(): Result&lt;Tc` | Accepts one connection, parking the current Vex task while the listener is |
| ⚡`accept`[↗](#TcpListener.accept) | `export fn (self: &amp;TcpListener) accept(context: &amp;Co` | Accepts with cancellation/deadline propagation into the native wait |
| `rawHandle`[↗](#TcpListener.rawHandle) | `export fn (self: &amp;TcpListener) rawHandle(): i64` | Returns the platform-width native socket handle for poller integration. |
| `isOpen`[↗](#TcpListener.isOpen) | `export fn (self: &amp;TcpListener) isOpen(): bool` |  |
| `localAddr`[↗](#TcpListener.localAddr) | `export fn (self: &amp;TcpListener) localAddr(): Result` | Returns the endpoint selected by the OS. This is authoritative when bind |
| `close`[↗](#TcpListener.close) | `export fn (self: &amp;TcpListener!) close(): Result&lt;()` | Closes exactly once. The local handle is invalidated before entering the OS |
| `drop`[↗](#TcpListener.drop) | `export fn (self: &amp;TcpListener!) drop()` |  |

---

### <a id="TcpStream"></a>`TcpStream` `🔓 export`

> 📄 `tcp.vx` L177-179

```vex
export struct TcpStream
```

An owning connected TCP stream.

TcpStream is the canonical AsyncReadWriter implementation. The
cancellation-aware overloads below satisfy the contract; context-free
overloads remain an explicit zero-overhead convenience for callers that
intentionally do not need cancellation propagation.

**Implements:** `AsyncReadWriter` & `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `handle` | `i64` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `TcpStream.adopt`[↗](#TcpStream.adopt) | `export fn TcpStream.adopt(socket: &amp;Socket!): Resul` | Adopt an already-connected `Socket` into the canonical task-aware stream |
| ⚡`TcpStream.connect`[↗](#TcpStream.connect) | `export fn TcpStream.connect(ip: str, port: u16): R` | Establishes a task-aware non-blocking connection without exposing a |
| ⚡`TcpStream.connect`[↗](#TcpStream.connect) | `export fn TcpStream.connect(endpoint: SocketAddr):` |  |
| ⚡`TcpStream.connect`[↗](#TcpStream.connect) | `export fn TcpStream.connect(ip: str, port: u16, co` |  |
| ⚡`TcpStream.connect`[↗](#TcpStream.connect) | `export fn TcpStream.connect(endpoint: SocketAddr, ` |  |
| `TcpStream.connectBlocking`[↗](#TcpStream.connectBlocking) | `export fn TcpStream.connectBlocking(ip: str, port:` | Explicit blocking connection establishment for synchronous bootstrap code. |
| `TcpStream.connectBlocking`[↗](#TcpStream.connectBlocking) | `export fn TcpStream.connectBlocking(endpoint: Sock` |  |
| ⚡`read`[↗](#TcpStream.read) | `export fn (self: &amp;TcpStream) read(buf: Ptr&lt;u8!&gt;, l` | Reads at most `len` bytes, parking the current task on temporary blocking. |
| ⚡`read`[↗](#TcpStream.read) | `export fn (self: &amp;TcpStream) read(buf: Ptr&lt;u8!&gt;, l` |  |
| ⚡`write`[↗](#TcpStream.write) | `export fn (self: &amp;TcpStream) write(data: Ptr&lt;u8&gt;, ` | Writes at most `len` bytes, parking the current task on temporary blocking. |
| ⚡`write`[↗](#TcpStream.write) | `export fn (self: &amp;TcpStream) write(data: Ptr&lt;u8&gt;, ` |  |
| ⚡`writeAll`[↗](#TcpStream.writeAll) | `export fn (self: &amp;TcpStream) writeAll(data: Ptr&lt;u8` | Writes the complete buffer or returns without losing the unwritten tail. |
| ⚡`writeAll`[↗](#TcpStream.writeAll) | `export fn (self: &amp;TcpStream) writeAll(data: Ptr&lt;u8` |  |
| ⚡`writeStr`[↗](#TcpStream.writeStr) | `export fn (self: &amp;TcpStream) writeStr(value: str):` |  |
| ⚡`writeStr`[↗](#TcpStream.writeStr) | `export fn (self: &amp;TcpStream) writeStr(value: str, ` |  |
| ⚡`writeAllStr`[↗](#TcpStream.writeAllStr) | `export fn (self: &amp;TcpStream) writeAllStr(value: st` |  |
| ⚡`writeAllStr`[↗](#TcpStream.writeAllStr) | `export fn (self: &amp;TcpStream) writeAllStr(value: st` |  |
| `rawHandle`[↗](#TcpStream.rawHandle) | `export fn (self: &amp;TcpStream) rawHandle(): i64` |  |
| `isOpen`[↗](#TcpStream.isOpen) | `export fn (self: &amp;TcpStream) isOpen(): bool` |  |
| `localAddr`[↗](#TcpStream.localAddr) | `export fn (self: &amp;TcpStream) localAddr(): Result&lt;S` |  |
| `peerAddr`[↗](#TcpStream.peerAddr) | `export fn (self: &amp;TcpStream) peerAddr(): Result&lt;So` |  |
| `close`[↗](#TcpStream.close) | `export fn (self: &amp;TcpStream!) close(): Result&lt;(), ` |  |
| `drop`[↗](#TcpStream.drop) | `export fn (self: &amp;TcpStream!) drop()` |  |

---

### <a id="Event"></a>`Event` `🔓 export`

> 📄 `event_loop.vx` L34-38

```vex
export struct Event
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fd` | `i32` | 🔓 public |  |
| `flags` | `i32` | 🔓 public |  |

---

### <a id="EventLoop"></a>`EventLoop` `🔓 export`

> 📄 `event_loop.vx` L44-48

```vex
export struct EventLoop
```

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `mem` | `[u8; 32]` | 🔓 public |  |
| `valid` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `EventLoop.new`[↗](#EventLoop.new) | `export fn EventLoop.new(): EventLoop` | Create a new event loop. Check isValid() after creation. |
| `isValid`[↗](#EventLoop.isValid) | `export fn (self: &amp;EventLoop) isValid(): bool` | Check if the event loop was created successfully. |
| `register`[↗](#EventLoop.register) | `export fn (self: &amp;EventLoop!) register(fd: i32, ev` | Register an fd for events (EVT_READ, EVT_WRITE, or both). |
| `modify`[↗](#EventLoop.modify) | `export fn (self: &amp;EventLoop!) modify(fd: i32, even` | Modify the events monitored for an fd. |
| `unregister`[↗](#EventLoop.unregister) | `export fn (self: &amp;EventLoop!) unregister(fd: i32):` | Unregister an fd from the event loop. |
| `poll`[↗](#EventLoop.poll) | `export fn (self: &amp;EventLoop!) poll(out: Ptr&lt;u8!&gt;, ` | Poll for events. Returns number of ready events. |
| `close`[↗](#EventLoop.close) | `export fn (self: &amp;EventLoop!) close()` | Close the event loop. |
| `drop`[↗](#EventLoop.drop) | `export fn (self: &amp;EventLoop!) drop()` |  |

---

### <a id="UdpSocket"></a>`UdpSocket` `🔓 export`

> 📄 `udp.vx` L30-32

```vex
export struct UdpSocket
```

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `handle` | `i64` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `UdpSocket.bind`[↗](#UdpSocket.bind) | `export fn UdpSocket.bind(ip: str, port: u16): Resu` | Creates and binds an owning UDP socket. Setup failure cannot leak a native |
| `UdpSocket.bind`[↗](#UdpSocket.bind) | `export fn UdpSocket.bind(endpoint: SocketAddr): Re` |  |
| `sendTo`[↗](#UdpSocket.sendTo) | `export fn (self: &amp;UdpSocket) sendTo(data: Ptr&lt;u8&gt;,` |  |
| `sendTo`[↗](#UdpSocket.sendTo) | `export fn (self: &amp;UdpSocket) sendTo(data: Ptr&lt;u8&gt;,` |  |
| ⚡`sendTo`[↗](#UdpSocket.sendTo) | `export fn (self: &amp;UdpSocket) sendTo(data: Ptr&lt;u8&gt;,` | Sends one datagram while propagating Context cancellation/deadline into the |
| ⚡`sendTo`[↗](#UdpSocket.sendTo) | `export fn (self: &amp;UdpSocket) sendTo(data: Ptr&lt;u8&gt;,` |  |
| `recvFrom`[↗](#UdpSocket.recvFrom) | `export fn (self: &amp;UdpSocket) recvFrom(buf: Ptr&lt;u8!` |  |
| ⚡`recvFrom`[↗](#UdpSocket.recvFrom) | `export fn (self: &amp;UdpSocket) recvFrom(buf: Ptr&lt;u8!` |  |
| `recvDatagram`[↗](#UdpSocket.recvDatagram) | `export fn (self: &amp;UdpSocket) recvDatagram(buf: Ptr` |  |
| ⚡`recvDatagram`[↗](#UdpSocket.recvDatagram) | `export fn (self: &amp;UdpSocket) recvDatagram(buf: Ptr` |  |
| `recvFromWithSource`[↗](#UdpSocket.recvFromWithSource) | `export fn (self: &amp;UdpSocket) recvFromWithSource(bu` |  |
| ⚡`recvFromWithSource`[↗](#UdpSocket.recvFromWithSource) | `export fn (self: &amp;UdpSocket) recvFromWithSource(bu` |  |
| `setNonBlock`[↗](#UdpSocket.setNonBlock) | `export fn (self: &amp;UdpSocket!) setNonBlock(on: bool` |  |
| `rawHandle`[↗](#UdpSocket.rawHandle) | `export fn (self: &amp;UdpSocket) rawHandle(): i64` |  |
| `isOpen`[↗](#UdpSocket.isOpen) | `export fn (self: &amp;UdpSocket) isOpen(): bool` |  |
| `localAddr`[↗](#UdpSocket.localAddr) | `export fn (self: &amp;UdpSocket) localAddr(): Result&lt;S` | Returns the actual bound endpoint, including the ephemeral port selected |
| `close`[↗](#UdpSocket.close) | `export fn (self: &amp;UdpSocket!) close(): Result&lt;(), ` |  |
| `drop`[↗](#UdpSocket.drop) | `export fn (self: &amp;UdpSocket!) drop()` |  |

---

### <a id="UdpRecvFromResult"></a>`UdpRecvFromResult` `🔓 export`

> 📄 `udp.vx` L36-41

```vex
export struct UdpRecvFromResult
```

One datagram receive result including its source tuple. `sourceIp` is a

zero-terminated IPv4 text buffer; `bytes` never exceeds the caller buffer.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `bytes` | `usize` | 🔓 public |  |
| `sourceIp` | `[u8; 64]` | 🔓 public |  |
| `sourcePort` | `u16` | 🔓 public |  |

---

### <a id="UdpDatagram"></a>`UdpDatagram` `🔓 export`

> 📄 `udp.vx` L45-49

```vex
export struct UdpDatagram
```

Allocation-free modern datagram result. Source address bytes are decoded

directly from sockaddr storage and are never round-tripped through text.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `bytes` | `usize` | 🔓 public |  |
| `source` | `SocketAddr` | 🔓 public |  |

---

### <a id="WsFrame"></a>`WsFrame` `🔓 export`

> 📄 `ws_parser.vx` L31-38

```vex
export struct WsFrame
```

Parsed frame metadata. Payload storage remains owned by the caller's input

buffer; this value only carries a zero-copy pointer into it.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `finValue` | `u8` | 🔒 private |  |
| `opcodeValue` | `u8` | 🔒 private |  |
| `maskedValue` | `u8` | 🔒 private |  |
| `payloadLength` | `u64` | 🔒 private |  |
| `maskValue` | `[u8; 4]` | 🔒 private |  |
| `payloadPointer` | `Ptr&lt;u8&gt;` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `WsFrame.empty`[↗](#WsFrame.empty) | `export fn WsFrame.empty(): WsFrame` |  |
| `fin`[↗](#WsFrame.fin) | `export fn (self: &amp;WsFrame) fin(): bool` |  |
| `opcode`[↗](#WsFrame.opcode) | `export fn (self: &amp;WsFrame) opcode(): u8` |  |
| `masked`[↗](#WsFrame.masked) | `export fn (self: &amp;WsFrame) masked(): bool` |  |
| `payloadLen`[↗](#WsFrame.payloadLen) | `export fn (self: &amp;WsFrame) payloadLen(): u64` |  |
| `payload`[↗](#WsFrame.payload) | `export fn (self: &amp;WsFrame) payload(): Ptr&lt;u8&gt;` |  |
| `unmaskPayload`[↗](#WsFrame.unmaskPayload) | `export fn (self: &amp;WsFrame) unmaskPayload(data: Ptr` | XOR this frame's masking key into caller-owned payload storage. |

---

### <a id="WsFrameStream"></a>`WsFrameStream` `🔓 export`

> 📄 `ws_parser.vx` L60-62

```vex
export struct WsFrameStream
```

Socket-independent incremental input state for RFC 6455 frames.

A frame parser must never equate `recv()` boundaries with frame boundaries.
This type retains incomplete headers/payloads and trailing frames, while
leaving the transport in charge of readiness, deadlines and I/O ownership.
`WsConn` uses it today; Fiber can feed it directly without recreating a
second parser or another peer-controlled growable buffer.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `input` | `Conn` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `WsFrameStream.new`[↗](#WsFrameStream.new) | `export fn WsFrameStream.new(): WsFrameStream` |  |
| `pending`[↗](#WsFrameStream.pending) | `export fn (self: &amp;WsFrameStream) pending(): usize` | Number of bytes not yet consumed by a parsed frame. |
| `readPtr`[↗](#WsFrameStream.readPtr) | `export fn (self: &amp;WsFrameStream) readPtr(): Ptr&lt;u8` | Start of unread storage. Valid even when `pending() == 0` so callers can |
| `writePtr`[↗](#WsFrameStream.writePtr) | `export fn (self: &amp;WsFrameStream!) writePtr(): Ptr&lt;` | Tail storage for one transport read after `ensureFree` succeeds. |
| `freeSpace`[↗](#WsFrameStream.freeSpace) | `export fn (self: &amp;WsFrameStream) freeSpace(): usiz` | Physical writable tail after a successful `ensureFree` reservation. |
| `ensureFree`[↗](#WsFrameStream.ensureFree) | `export fn (self: &amp;WsFrameStream!) ensureFree(requi` | Ensure at least `required` contiguous bytes at the writable tail. |
| `advance`[↗](#WsFrameStream.advance) | `export fn (self: &amp;WsFrameStream!) advance(count: u` | Commit bytes written by the transport. Invalid counts are rejected rather |
| `feed`[↗](#WsFrameStream.feed) | `export fn (self: &amp;WsFrameStream!) feed(data: Ptr&lt;u` | Copy a caller-owned chunk into the stream. Event-loop adapters may instead |
| `parseNext`[↗](#WsFrameStream.parseNext) | `export fn (self: &amp;WsFrameStream) parseNext(frame: ` | Parse the next complete frame. Frame payload storage remains owned by this |
| `consume`[↗](#WsFrameStream.consume) | `export fn (self: &amp;WsFrameStream!) consume(count: u` | Release the exact bytes reported by a successful `parseNext` call. |

---

### <a id="ResolveError"></a>`ResolveError` `🔓 export`

> 📄 `resolver.vx` L32-35

```vex
export struct ResolveError
```

Allocation-free resolver failure. `nativeCode` retains the target

provider's diagnostic code without making its numeric value public API.

**Implements:** `Copy` & `Display` & `Debug`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `kindValue` | `ResolveErrorKind` | 🔒 private |  |
| `nativeCodeValue` | `i32` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `kind`[↗](#ResolveError.kind) | `export fn (self: &amp;ResolveError) kind(): ResolveErr` |  |
| `nativeCode`[↗](#ResolveError.nativeCode) | `export fn (self: &amp;ResolveError) nativeCode(): i32` |  |
| `message`[↗](#ResolveError.message) | `export fn (self: &amp;ResolveError) message(): str` |  |
| `toString`[↗](#ResolveError.toString) | `export fn (self: &amp;ResolveError) toString(): string` |  |
| `debug`[↗](#ResolveError.debug) | `export fn (self: &amp;ResolveError) debug(): string` |  |

---

### <a id="ResolveOptions"></a>`ResolveOptions` `🔓 export`

> 📄 `resolver.vx` L64-67

```vex
export struct ResolveOptions
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `familyValue` | `ResolveFamily` | 🔒 private |  |
| `maxResultsValue` | `usize` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `ResolveOptions.default`[↗](#ResolveOptions.default) | `export fn ResolveOptions.default(): ResolveOptions` |  |
| `ResolveOptions.new`[↗](#ResolveOptions.new) | `export fn ResolveOptions.new(family: ResolveFamily` |  |
| `family`[↗](#ResolveOptions.family) | `export fn (self: &amp;ResolveOptions) family(): Resolv` |  |
| `maxResults`[↗](#ResolveOptions.maxResults) | `export fn (self: &amp;ResolveOptions) maxResults(): us` |  |

---

### <a id="sockaddr_in"></a>`sockaddr_in`

> 📄 `native.macos.vxc` L134-137

```vex
struct sockaddr_in
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `mem` | `[u8; 16]` | 🔓 public |  |

---

### <a id="sockaddr_ip"></a>`sockaddr_ip`

> 📄 `native.macos.vxc` L139-142

```vex
struct sockaddr_ip
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `mem` | `[u8; 28]` | 🔓 public |  |

---

### <a id="Conn"></a>`Conn` `🔓 export`

> 📄 `conn.vx` L26-41

```vex
export struct Conn
```

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fd` | `i64` | 🔒 private |  |
| `rbuf` | `Vec&lt;u8&gt;` | 🔒 private |  |
| `rpos` | `usize` | 🔒 private |  |
| `rlen` | `usize` | 🔒 private |  |
| `rbufMax` | `usize` | 🔒 private |  |
| `wbuf` | `Vec&lt;u8&gt;` | 🔒 private |  |
| `wpos` | `usize` | 🔒 private |  |
| `wlen` | `usize` | 🔒 private |  |
| `wbufMax` | `usize` | 🔒 private |  |
| `closed` | `bool` | 🔒 private |  |
| `ownsFd` | `bool` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Conn.wrap`[↗](#Conn.wrap) | `export fn Conn.wrap(fd: i64): Conn` | Wrap a raw fd into a buffered connection. |
| `Conn.wrapBorrowed`[↗](#Conn.wrapBorrowed) | `export fn Conn.wrapBorrowed(fd: i64): Conn` | Wrap a descriptor without taking ownership of it. |
| `Conn.wrapWithLimits`[↗](#Conn.wrapWithLimits) | `export fn Conn.wrapWithLimits(fd: i64, readLimit: ` | Wrap an owned descriptor with explicit bounded input/output queues. |
| `Conn.wrapBorrowedWithLimits`[↗](#Conn.wrapBorrowedWithLimits) | `export fn Conn.wrapBorrowedWithLimits(fd: i64, rea` | Borrow a descriptor with explicit bounded input/output queues. |
| `Conn.wrapBorrowedWithBuffering`[↗](#Conn.wrapBorrowedWithBuffering) | `export fn Conn.wrapBorrowedWithBuffering(fd: i64, ` | Borrow a descriptor with explicit queue limits and initial allocations. |
| `Conn.buffered`[↗](#Conn.buffered) | `export fn Conn.buffered(readLimit: usize, writeLim` | Create queue-only transport storage. It owns no descriptor, so `recv` and |
| `Conn.init`[↗](#Conn.init) | `fn Conn.init(fd: i64, ownsFd: bool, readLimit: usi` |  |
| `Conn.initWithBuffering`[↗](#Conn.initWithBuffering) | `fn Conn.initWithBuffering(fd: i64, ownsFd: bool, r` |  |
| `rawFd`[↗](#Conn.rawFd) | `export fn (self: &amp;Conn) rawFd(): i64` | The wrapped descriptor. Ownership remains with this connection unless it |
| `isClosed`[↗](#Conn.isClosed) | `export fn (self: &amp;Conn) isClosed(): bool` |  |
| `readable`[↗](#Conn.readable) | `export fn (self: &amp;Conn) readable(): usize` | Number of unread bytes available in the buffer. |
| `readPtr`[↗](#Conn.readPtr) | `export fn (self: &amp;Conn) readPtr(): Ptr&lt;u8&gt;` | Pointer to start of unread data. |
| `readTailSpace`[↗](#Conn.readTailSpace) | `export fn (self: &amp;Conn) readTailSpace(): usize` | Physical writable bytes currently available at the input tail. Callers that |
| `ensureReadSpace`[↗](#Conn.ensureReadSpace) | `export fn (self: &amp;Conn!) ensureReadSpace(required:` | Reserve contiguous tail space for an outer non-blocking transport read. |
| `readWritePtr`[↗](#Conn.readWritePtr) | `export fn (self: &amp;Conn!) readWritePtr(): Ptr&lt;u8!&gt;` | Writable tail after `ensureReadSpace` succeeds. |
| `commitRead`[↗](#Conn.commitRead) | `export fn (self: &amp;Conn!) commitRead(count: usize):` | Commit bytes written through `readWritePtr`. Counts beyond reserved free |
| `stageRead`[↗](#Conn.stageRead) | `export fn (self: &amp;Conn!) stageRead(data: Ptr&lt;u8&gt;, ` | Append bytes that were obtained by an outer transport layer (for example a |
| `recv`[↗](#Conn.recv) | `export fn (self: &amp;Conn!) recv(): i64` | Read from socket into the read buffer. |
| `consume`[↗](#Conn.consume) | `export fn (self: &amp;Conn!) consume(n: usize): bool` | Consume `n` bytes from the read buffer. Returns false without mutation when |
| `consume`[↗](#Conn.consume) | `export fn (self: &amp;Conn!) consume(n: i32): bool` |  |
| `compactRead`[↗](#Conn.compactRead) | `export fn (self: &amp;Conn!) compactRead()` | Compact read buffer — shift unread data to front. |
| `growRead`[↗](#Conn.growRead) | `fn (self: &amp;Conn!) growRead(): bool` | Grow read buffer (double, up to RBUF_MAX). |
| `findHeaderEnd`[↗](#Conn.findHeaderEnd) | `export fn (self: &amp;Conn) findHeaderEnd(): i32` | Scan read buffer for \r\n\r\n (HTTP header terminator). |
| `write`[↗](#Conn.write) | `export fn (self: &amp;Conn!) write(data: Ptr&lt;u8&gt;, len:` | Write data to the write buffer. Does NOT send to socket yet. |
| `bufferWrite`[↗](#Conn.bufferWrite) | `fn (self: &amp;Conn!) bufferWrite(data: Ptr&lt;u8&gt;, len: ` | Buffer data for later flush. |
| `stageWrite`[↗](#Conn.stageWrite) | `export fn (self: &amp;Conn!) stageWrite(data: Ptr&lt;u8&gt;,` | Queue bytes without attempting a socket write. This is useful for framed |
| `flush`[↗](#Conn.flush) | `export fn (self: &amp;Conn!) flush(): i64` | Flush write buffer to socket. |
| `hasPendingWrite`[↗](#Conn.hasPendingWrite) | `export fn (self: &amp;Conn) hasPendingWrite(): bool` | Check if there's unsent data in the write buffer. |
| `pendingWriteBytes`[↗](#Conn.pendingWriteBytes) | `export fn (self: &amp;Conn) pendingWriteBytes(): usize` |  |
| `writeAvailable`[↗](#Conn.writeAvailable) | `export fn (self: &amp;Conn) writeAvailable(): usize` | Remaining bounded output capacity. Framed transports use this to reserve a |
| `close`[↗](#Conn.close) | `export fn (self: &amp;Conn!) close()` | Close the connection and fd. |
| `drop`[↗](#Conn.drop) | `export fn (self: &amp;Conn!) drop()` |  |
| `reset`[↗](#Conn.reset) | `export fn (self: &amp;Conn!) reset()` | Reset for keep-alive reuse (zero alloc). |

---

### <a id="ArenaCheckpoint"></a>`ArenaCheckpoint` `🔓 export`

> 📄 `runtime.vxc` L19-25

```vex
export struct ArenaCheckpoint
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `state` | `Ptr&lt;Opaque&gt;` | 🔒 private |  |
| `chunk` | `Ptr&lt;Opaque&gt;` | 🔒 private |  |
| `activeSavePoint` | `Ptr&lt;Opaque&gt;` | 🔒 private |  |
| `used` | `i64` | 🔒 private |  |
| `deferredCount` | `i32` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `ArenaCheckpoint.new`[↗](#ArenaCheckpoint.new) | `export fn ArenaCheckpoint.new(): ArenaCheckpoint` |  |

---

### <a id="Socket"></a>`Socket` `🔓 export`

> 📄 `socket.vx` L41-44

```vex
export struct Socket
```

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fd` | `i64` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Socket.tcp`[↗](#Socket.tcp) | `export fn Socket.tcp(): Socket` | Create a non-blocking TCP socket. |
| `Socket.tcpBlocking`[↗](#Socket.tcpBlocking) | `export fn Socket.tcpBlocking(): Socket` | Create a blocking TCP socket. |
| `Socket.udp`[↗](#Socket.udp) | `export fn Socket.udp(): Socket` | Create a UDP socket. |
| `setReuseAddr`[↗](#Socket.setReuseAddr) | `export fn (self: &amp;Socket!) setReuseAddr(on: bool)` | Enable/disable SO_REUSEADDR. |
| `setReusePort`[↗](#Socket.setReusePort) | `export fn (self: &amp;Socket!) setReusePort(on: bool)` | Enable/disable SO_REUSEPORT (for multi-threaded accept). |
| `setNonBlock`[↗](#Socket.setNonBlock) | `export fn (self: &amp;Socket!) setNonBlock(on: bool)` | Enable/disable O_NONBLOCK. |
| `setNoDelay`[↗](#Socket.setNoDelay) | `export fn (self: &amp;Socket!) setNoDelay(on: bool)` | Enable/disable TCP_NODELAY (Nagle's algorithm off). |
| `setNoPush`[↗](#Socket.setNoPush) | `export fn (self: &amp;Socket!) setNoPush(on: bool)` | Enable/disable TCP_NOPUSH (macOS/BSD) / TCP_CORK (Linux). |
| `bind`[↗](#Socket.bind) | `export fn (self: &amp;Socket) bind(ip: str, port: u16)` | Bind socket to ip:port. Returns 0 on success, negative on error. |
| `listen`[↗](#Socket.listen) | `export fn (self: &amp;Socket) listen(backlog: i32): i3` | Start listening with given backlog. Returns 0 on success. |
| `connect`[↗](#Socket.connect) | `export fn (self: &amp;Socket) connect(ip: str, port: u` | Connect to remote ip:port. Returns 0 on success. |
| `accept`[↗](#Socket.accept) | `export fn (self: &amp;Socket) accept(): Socket` | Accept a new connection. Returns a Socket with the client fd. |
| `recv`[↗](#Socket.recv) | `export fn (self: &amp;Socket) recv(buf: Ptr&lt;u8!&gt;, len:` | Read into buffer. Returns bytes read, 0 on EOF, negative on error/EAGAIN. |
| `send`[↗](#Socket.send) | `export fn (self: &amp;Socket) send(buf: Ptr&lt;u8&gt;, len: ` | Write bytes. Returns bytes written or negative on error/EAGAIN. |
| `close`[↗](#Socket.close) | `export fn (self: &amp;Socket!) close()` | Close the socket. |
| `takeHandle`[↗](#Socket.takeHandle) | `export fn (self: &amp;Socket!) takeHandle(): i64` | Transfer ownership of the native handle out of this Socket. |
| `drop`[↗](#Socket.drop) | `export fn (self: &amp;Socket!) drop()` |  |
| `isValid`[↗](#Socket.isValid) | `export fn (self: &amp;Socket) isValid(): bool` | Check if socket is valid. |

---

### <a id="sockaddr_in"></a>`sockaddr_in`

> 📄 `native.linux.vxc` L173-176

```vex
struct sockaddr_in
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `mem` | `[u8; 16]` | 🔓 public |  |

---

### <a id="sockaddr_ip"></a>`sockaddr_ip`

> 📄 `native.linux.vxc` L178-181

```vex
struct sockaddr_ip
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `mem` | `[u8; 28]` | 🔓 public |  |

---

### <a id="epoll_event"></a>`epoll_event`

> 📄 `native.linux.vxc` L571-575

```vex
struct epoll_event
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `events` | `u32` | 🔓 public |  |
| `data` | `u64` | 🔓 public |  |

---

### <a id="AddressParseError"></a>`AddressParseError` `🔓 export`

> 📄 `address.vx` L29-32

```vex
export struct AddressParseError
```

Allocation-free parse failure. `position` is the byte offset at which the

parser could first prove the input invalid.

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `kindValue` | `AddressParseErrorKind` | 🔒 private |  |
| `positionValue` | `usize` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `kind`[↗](#AddressParseError.kind) | `export fn (self: &amp;AddressParseError) kind(): Addre` |  |
| `position`[↗](#AddressParseError.position) | `export fn (self: &amp;AddressParseError) position(): u` |  |
| `message`[↗](#AddressParseError.message) | `export fn (self: &amp;AddressParseError) message(): st` |  |

---

### <a id="AddressFormatError"></a>`AddressFormatError` `🔓 export`

> 📄 `address.vx` L37-40

```vex
export struct AddressFormatError
```

Transactional caller-buffer formatting failure. Address formatting never

partially modifies the destination: callers either receive the exact byte
count or this value with the required capacity.

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `requiredValue` | `usize` | 🔒 private |  |
| `capacityValue` | `usize` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `required`[↗](#AddressFormatError.required) | `export fn (self: &amp;AddressFormatError) required(): ` |  |
| `capacity`[↗](#AddressFormatError.capacity) | `export fn (self: &amp;AddressFormatError) capacity(): ` |  |
| `message`[↗](#AddressFormatError.message) | `export fn (self: &amp;AddressFormatError) message(): s` |  |

---

### <a id="Ipv4Addr"></a>`Ipv4Addr` `🔓 export`

> 📄 `address.vx` L72-74

```vex
export struct Ipv4Addr
```

**Implements:** `Copy` & `Eq` & `Display` & `Debug`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `bytes` | `[u8; 4]` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Ipv4Addr.unspecified`[↗](#Ipv4Addr.unspecified) | `export fn Ipv4Addr.unspecified(): Ipv4Addr` |  |
| `Ipv4Addr.loopback`[↗](#Ipv4Addr.loopback) | `export fn Ipv4Addr.loopback(): Ipv4Addr` |  |
| `octets`[↗](#Ipv4Addr.octets) | `export fn (self: &amp;Ipv4Addr) octets(): [u8; 4]` |  |
| `family`[↗](#Ipv4Addr.family) | `export fn (self: &amp;Ipv4Addr) family(): IpFamily` |  |
| `isUnspecified`[↗](#Ipv4Addr.isUnspecified) | `export fn (self: &amp;Ipv4Addr) isUnspecified(): bool` |  |
| `isLoopback`[↗](#Ipv4Addr.isLoopback) | `export fn (self: &amp;Ipv4Addr) isLoopback(): bool` |  |
| `op==`[↗](#Ipv4Addr.op==) | `export fn (self: &amp;Ipv4Addr) op==(other: &amp;Ipv4Addr)` |  |
| `copyOctetsTo`[↗](#Ipv4Addr.copyOctetsTo) | `export fn (self: &amp;Ipv4Addr) copyOctetsTo(output: P` | Copies exactly four network-order octets to a native boundary. |
| `Ipv4Addr.tryParse`[↗](#Ipv4Addr.tryParse) | `export fn Ipv4Addr.tryParse(input: str): Result&lt;Ip` |  |
| `textLength`[↗](#Ipv4Addr.textLength) | `export fn (self: &amp;Ipv4Addr) textLength(): usize` | Exact canonical text length without allocating. |
| `tryWriteTo`[↗](#Ipv4Addr.tryWriteTo) | `export fn (self: &amp;Ipv4Addr) tryWriteTo(output: Raw` | Write canonical text into caller-owned storage. Capacity is validated |
| `appendTo`[↗](#Ipv4Addr.appendTo) | `export fn (self: &amp;Ipv4Addr) appendTo(output: &amp;Vec&lt;` | Append canonical text to an owning byte vector. The vector is the safe |
| `toString`[↗](#Ipv4Addr.toString) | `export fn (self: &amp;Ipv4Addr) toString(): string` |  |
| `debug`[↗](#Ipv4Addr.debug) | `export fn (self: &amp;Ipv4Addr) debug(): string` |  |

---

### <a id="Ipv6Addr"></a>`Ipv6Addr` `🔓 export`

> 📄 `address.vx` L112-114

```vex
export struct Ipv6Addr
```

**Implements:** `Copy` & `Eq` & `Display` & `Debug`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `bytes` | `[u8; 16]` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Ipv6Addr.fromOctets`[↗](#Ipv6Addr.fromOctets) | `export fn Ipv6Addr.fromOctets(bytes: [u8; 16]): Ip` |  |
| `Ipv6Addr.unspecified`[↗](#Ipv6Addr.unspecified) | `export fn Ipv6Addr.unspecified(): Ipv6Addr` |  |
| `Ipv6Addr.loopback`[↗](#Ipv6Addr.loopback) | `export fn Ipv6Addr.loopback(): Ipv6Addr` |  |
| `octets`[↗](#Ipv6Addr.octets) | `export fn (self: &amp;Ipv6Addr) octets(): [u8; 16]` |  |
| `family`[↗](#Ipv6Addr.family) | `export fn (self: &amp;Ipv6Addr) family(): IpFamily` |  |
| `segments`[↗](#Ipv6Addr.segments) | `export fn (self: &amp;Ipv6Addr) segments(): [u16; 8]` |  |
| `isUnspecified`[↗](#Ipv6Addr.isUnspecified) | `export fn (self: &amp;Ipv6Addr) isUnspecified(): bool` |  |
| `isLoopback`[↗](#Ipv6Addr.isLoopback) | `export fn (self: &amp;Ipv6Addr) isLoopback(): bool` |  |
| `op==`[↗](#Ipv6Addr.op==) | `export fn (self: &amp;Ipv6Addr) op==(other: &amp;Ipv6Addr)` |  |
| `copyOctetsTo`[↗](#Ipv6Addr.copyOctetsTo) | `export fn (self: &amp;Ipv6Addr) copyOctetsTo(output: P` | Copies exactly sixteen network-order octets to a native boundary. |
| `Ipv6Addr.tryParse`[↗](#Ipv6Addr.tryParse) | `export fn Ipv6Addr.tryParse(input: str): Result&lt;Ip` |  |
| `textLength`[↗](#Ipv6Addr.textLength) | `export fn (self: &amp;Ipv6Addr) textLength(): usize` | Exact canonical text length without allocating. |
| `tryWriteTo`[↗](#Ipv6Addr.tryWriteTo) | `export fn (self: &amp;Ipv6Addr) tryWriteTo(output: Raw` | Write canonical text into caller-owned storage. Capacity is validated |
| `appendTo`[↗](#Ipv6Addr.appendTo) | `export fn (self: &amp;Ipv6Addr) appendTo(output: &amp;Vec&lt;` | Append canonical text to an owning byte vector. |
| `toString`[↗](#Ipv6Addr.toString) | `export fn (self: &amp;Ipv6Addr) toString(): string` |  |
| `debug`[↗](#Ipv6Addr.debug) | `export fn (self: &amp;Ipv6Addr) debug(): string` |  |

---

### <a id="SocketAddr"></a>`SocketAddr` `🔓 export`

> 📄 `address.vx` L228-231

```vex
export struct SocketAddr
```

**Implements:** `Copy` & `Eq` & `Display` & `Debug`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `addressValue` | `IpAddr` | 🔒 private |  |
| `portValue` | `u16` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `address`[↗](#SocketAddr.address) | `export fn (self: &amp;SocketAddr) address(): IpAddr` |  |
| `port`[↗](#SocketAddr.port) | `export fn (self: &amp;SocketAddr) port(): u16` |  |
| `family`[↗](#SocketAddr.family) | `export fn (self: &amp;SocketAddr) family(): IpFamily` |  |
| `op==`[↗](#SocketAddr.op==) | `export fn (self: &amp;SocketAddr) op==(other: &amp;SocketA` |  |
| `SocketAddr.tryParse`[↗](#SocketAddr.tryParse) | `export fn SocketAddr.tryParse(input: str): Result&lt;` |  |
| `textLength`[↗](#SocketAddr.textLength) | `export fn (self: &amp;SocketAddr) textLength(): usize` | Exact canonical socket-address text length without allocating. |
| `tryWriteTo`[↗](#SocketAddr.tryWriteTo) | `export fn (self: &amp;SocketAddr) tryWriteTo(output: R` | Write canonical text into caller-owned storage. Capacity is validated |
| `appendTo`[↗](#SocketAddr.appendTo) | `export fn (self: &amp;SocketAddr) appendTo(output: &amp;Ve` | Append canonical endpoint text to an owning byte vector. |
| `toString`[↗](#SocketAddr.toString) | `export fn (self: &amp;SocketAddr) toString(): string` |  |
| `debug`[↗](#SocketAddr.debug) | `export fn (self: &amp;SocketAddr) debug(): string` |  |

---

### <a id="ParsedIpv6Side"></a>`ParsedIpv6Side`

> 📄 `address.vx` L319-324

```vex
struct ParsedIpv6Side
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `ok` | `bool` | 🔒 private |  |
| `count` | `usize` | 🔒 private |  |
| `errorKind` | `AddressParseErrorKind` | 🔒 private |  |
| `errorPosition` | `usize` | 🔒 private |  |

---

### <a id="sockaddr_in"></a>`sockaddr_in`

> 📄 `native.windows.vxc` L113-119

```vex
struct sockaddr_in
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `sin_family` | `u16` | 🔓 public |  |
| `sin_port` | `u16` | 🔓 public |  |
| `sin_addr` | `u32` | 🔓 public |  |
| `sin_zero` | `[u8; 8]` | 🔓 public |  |

---

### <a id="sockaddr_ip"></a>`sockaddr_ip`

> 📄 `native.windows.vxc` L121-124

```vex
struct sockaddr_ip
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `mem` | `[u8; 28]` | 🔓 public |  |

---

## Enums

### <a id="ResolveFamily"></a>`ResolveFamily` `🔓 export`

> 📄 `resolver.vx` L15-19

```vex
export enum ResolveFamily
```

**Variants:**

- `Any`
- `V4`
- `V6`

---

### <a id="ResolveErrorKind"></a>`ResolveErrorKind` `🔓 export`

> 📄 `resolver.vx` L21-28

```vex
export enum ResolveErrorKind
```

**Variants:**

- `InvalidName`
- `NotFound`
- `TemporaryFailure`
- `Unsupported`
- `CapacityExceeded`
- `System`

---

### <a id="IpFamily"></a>`IpFamily` `🔓 export`

> 📄 `address.vx` L7-10

```vex
export enum IpFamily
```

**Variants:**

- `V4`
- `V6`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `op==`[↗](#IpFamily.op==) | `export fn (self: &amp;IpFamily) op==(other: &amp;IpFamily)` |  |

---

### <a id="AddressParseErrorKind"></a>`AddressParseErrorKind` `🔓 export`

> 📄 `address.vx` L19-25

```vex
export enum AddressParseErrorKind
```

**Variants:**

- `Empty`
- `InvalidSyntax`
- `InvalidCharacter`
- `OutOfRange`
- `MissingPort`

---

### <a id="IpAddr"></a>`IpAddr` `🔓 export`

> 📄 `address.vx` L182-185

```vex
export enum IpAddr
```

**Variants:**

- `V4`
- `V6`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `family`[↗](#IpAddr.family) | `export fn (self: &amp;IpAddr) family(): IpFamily` |  |
| `isUnspecified`[↗](#IpAddr.isUnspecified) | `export fn (self: &amp;IpAddr) isUnspecified(): bool` |  |
| `isLoopback`[↗](#IpAddr.isLoopback) | `export fn (self: &amp;IpAddr) isLoopback(): bool` |  |
| `op==`[↗](#IpAddr.op==) | `export fn (self: &amp;IpAddr) op==(other: &amp;IpAddr): bo` |  |
| `copyOctetsTo`[↗](#IpAddr.copyOctetsTo) | `export fn (self: &amp;IpAddr) copyOctetsTo(output: Ptr` | Copies the address into a sixteen-byte carrier. IPv4 uses the first four |
| `IpAddr.tryParse`[↗](#IpAddr.tryParse) | `export fn IpAddr.tryParse(input: str): Result&lt;IpAd` |  |
| `textLength`[↗](#IpAddr.textLength) | `export fn (self: &amp;IpAddr) textLength(): usize` | Exact canonical text length without allocating. |
| `tryWriteTo`[↗](#IpAddr.tryWriteTo) | `export fn (self: &amp;IpAddr) tryWriteTo(output: RawBu` | Write canonical text into caller-owned storage. Capacity is validated |
| `appendTo`[↗](#IpAddr.appendTo) | `export fn (self: &amp;IpAddr) appendTo(output: &amp;Vec&lt;u8` | Append canonical text to an owning byte vector. |
| `toString`[↗](#IpAddr.toString) | `export fn (self: &amp;IpAddr) toString(): string` |  |
| `debug`[↗](#IpAddr.debug) | `export fn (self: &amp;IpAddr) debug(): string` |  |

---

## Functions

### <a id="test_tcp_socket_create_close"></a>`test_tcp_socket_create_close`

> 📄 `net.test.vx` L9-21

```vex
fn test_tcp_socket_create_close(): i32
```

**Returns:** `i32`

---

### <a id="test_udp_socket_create_close"></a>`test_udp_socket_create_close`

> 📄 `net.test.vx` L23-34

```vex
fn test_udp_socket_create_close(): i32
```

**Returns:** `i32`

---

### <a id="test_multiple_sockets_are_distinct"></a>`test_multiple_sockets_are_distinct`

> 📄 `net.test.vx` L36-53

```vex
fn test_multiple_sockets_are_distinct(): i32
```

**Returns:** `i32`

---

### <a id="test_invalid_event_loop_fails_closed"></a>`test_invalid_event_loop_fails_closed`

> 📄 `net.test.vx` L55-65

```vex
fn test_invalid_event_loop_fails_closed(): i32
```

**Returns:** `i32`

---

### <a id="test_resolver_numeric_ipv4_fast_path"></a>`test_resolver_numeric_ipv4_fast_path`

> 📄 `resolver.test.vx` L11-18

```vex
fn test_resolver_numeric_ipv4_fast_path()
```

---

### <a id="test_resolver_numeric_ipv6_family_filter"></a>`test_resolver_numeric_ipv6_family_filter`

> 📄 `resolver.test.vx` L20-32

```vex
fn test_resolver_numeric_ipv6_family_filter()
```

---

### <a id="test_resolver_rejects_numeric_family_mismatch"></a>`test_resolver_rejects_numeric_family_mismatch`

> 📄 `resolver.test.vx` L34-46

```vex
fn test_resolver_rejects_numeric_family_mismatch()
```

---

### <a id="test_resolver_validates_hostname_and_capacity"></a>`test_resolver_validates_hostname_and_capacity`

> 📄 `resolver.test.vx` L48-77

```vex
fn test_resolver_validates_hostname_and_capacity()
```

---

### <a id="test_resolver_system_localhost_is_ordered_and_unique"></a>`test_resolver_system_localhost_is_ordered_and_unique`

> 📄 `resolver.test.vx` L79-98

```vex
fn test_resolver_system_localhost_is_ordered_and_unique()
```

---

### <a id="test_resolver_family_filtering_is_semantic"></a>`test_resolver_family_filtering_is_semantic`

> 📄 `resolver.test.vx` L100-116

```vex
fn test_resolver_family_filtering_is_semantic()
```

---

### <a id="test_resolver_socket_addresses_preserve_port"></a>`test_resolver_socket_addresses_preserve_port`

> 📄 `resolver.test.vx` L118-131

```vex
fn test_resolver_socket_addresses_preserve_port()
```

---

### <a id="test_encode_decode_text"></a>`test_encode_decode_text`

> 📄 `ws_parser.test.vx` L15-36

```vex
fn test_encode_decode_text(): i32
```

**Returns:** `i32`

---

### <a id="test_encode_close"></a>`test_encode_close`

> 📄 `ws_parser.test.vx` L38-53

```vex
fn test_encode_close(): i32
```

**Returns:** `i32`

---

### <a id="test_encode_ping_pong"></a>`test_encode_ping_pong`

> 📄 `ws_parser.test.vx` L55-79

```vex
fn test_encode_ping_pong(): i32
```

**Returns:** `i32`

---

### <a id="test_control_data_check"></a>`test_control_data_check`

> 📄 `ws_parser.test.vx` L81-94

```vex
fn test_control_data_check(): i32
```

**Returns:** `i32`

---

### <a id="test_need_more"></a>`test_need_more`

> 📄 `ws_parser.test.vx` L96-107

```vex
fn test_need_more(): i32
```

**Returns:** `i32`

---

### <a id="test_frame_stream_preserves_partial_and_trailing_frames"></a>`test_frame_stream_preserves_partial_and_trailing_frames`

> 📄 `ws_parser.test.vx` L109-153

```vex
fn test_frame_stream_preserves_partial_and_trailing_frames(): i32
```

**Returns:** `i32`

---

### <a id="test_frame_stream_rejects_invalid_capacity_transitions"></a>`test_frame_stream_rejects_invalid_capacity_transitions`

> 📄 `ws_parser.test.vx` L155-168

```vex
fn test_frame_stream_rejects_invalid_capacity_transitions(): i32
```

**Returns:** `i32`

---

### <a id="test_masked_payload_unmask"></a>`test_masked_payload_unmask`

> 📄 `ws_parser.test.vx` L170-191

```vex
fn test_masked_payload_unmask(): i32
```

**Returns:** `i32`

---

### <a id="test_masked_payload_unmask_simd_boundaries"></a>`test_masked_payload_unmask_simd_boundaries`

> 📄 `ws_parser.test.vx` L193-238

```vex
fn test_masked_payload_unmask_simd_boundaries(): i32
```

**Returns:** `i32`

---

### <a id="test_masked_payload_unmask_tail_matrix"></a>`test_masked_payload_unmask_tail_matrix`

> 📄 `ws_parser.test.vx` L240-279

```vex
fn test_masked_payload_unmask_tail_matrix(): i32
```

**Returns:** `i32`

---

### <a id="test_rejects_invalid_protocol_shapes"></a>`test_rejects_invalid_protocol_shapes`

> 📄 `ws_parser.test.vx` L281-320

```vex
fn test_rejects_invalid_protocol_shapes(): i32
```

**Returns:** `i32`

---

### <a id="test_encode_bounds_and_extended_length"></a>`test_encode_bounds_and_extended_length`

> 📄 `ws_parser.test.vx` L322-345

```vex
fn test_encode_bounds_and_extended_length(): i32
```

**Returns:** `i32`

---

### <a id="test_encode_header_is_zero_copy_and_canonical"></a>`test_encode_header_is_zero_copy_and_canonical`

> 📄 `ws_parser.test.vx` L347-369

```vex
fn test_encode_header_is_zero_copy_and_canonical(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_tcp_stream_adopt_consumes_socket_and_preserves_async_io"></a>`test_tcp_stream_adopt_consumes_socket_and_preserves_async_io`

> 📄 `tcp_ownership.test.vx` L11-69

```vex
fn test_tcp_stream_adopt_consumes_socket_and_preserves_async_io(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="mustIpv4"></a>`mustIpv4`

> 📄 `address.test.vx` L4-9

```vex
fn mustIpv4(input: str): Ipv4Addr
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `str` |  |

**Returns:** `Ipv4Addr`

---

### <a id="mustIpv6"></a>`mustIpv6`

> 📄 `address.test.vx` L11-16

```vex
fn mustIpv6(input: str): Ipv6Addr
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `str` |  |

**Returns:** `Ipv6Addr`

---

### <a id="expectInvalidIpv4"></a>`expectInvalidIpv4`

> 📄 `address.test.vx` L18-20

```vex
fn expectInvalidIpv4(input: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `str` |  |

---

### <a id="expectInvalidIpv6"></a>`expectInvalidIpv6`

> 📄 `address.test.vx` L22-24

```vex
fn expectInvalidIpv6(input: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `str` |  |

---

### <a id="bufferEquals"></a>`bufferEquals`

> 📄 `address.test.vx` L26-34

```vex
fn bufferEquals(buffer: &[u8; 64], expected: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buffer` | `&amp;[u8; 64]` |  |
| `expected` | `str` |  |

**Returns:** `bool`

---

### <a id="test_ipv4_typed_parse_format_and_classification"></a>`test_ipv4_typed_parse_format_and_classification`

> 📄 `address.test.vx` L36-48

```vex
fn test_ipv4_typed_parse_format_and_classification()
```

---

### <a id="test_ipv4_parser_is_canonical_and_bounded"></a>`test_ipv4_parser_is_canonical_and_bounded`

> 📄 `address.test.vx` L50-61

```vex
fn test_ipv4_parser_is_canonical_and_bounded()
```

---

### <a id="test_ipv6_parse_expansion_and_rfc5952_formatting"></a>`test_ipv6_parse_expansion_and_rfc5952_formatting`

> 📄 `address.test.vx` L63-91

```vex
fn test_ipv6_parse_expansion_and_rfc5952_formatting()
```

---

### <a id="test_ipv6_embedded_ipv4_and_roundtrip"></a>`test_ipv6_embedded_ipv4_and_roundtrip`

> 📄 `address.test.vx` L93-106

```vex
fn test_ipv6_embedded_ipv4_and_roundtrip()
```

---

### <a id="test_ipv6_parser_rejects_ambiguous_and_oversized_input"></a>`test_ipv6_parser_rejects_ambiguous_and_oversized_input`

> 📄 `address.test.vx` L108-120

```vex
fn test_ipv6_parser_rejects_ambiguous_and_oversized_input()
```

---

### <a id="test_ipaddr_and_socketaddr_typed_roundtrip"></a>`test_ipaddr_and_socketaddr_typed_roundtrip`

> 📄 `address.test.vx` L122-159

```vex
fn test_ipaddr_and_socketaddr_typed_roundtrip()
```

---

### <a id="test_socketaddr_rejects_missing_or_out_of_range_port"></a>`test_socketaddr_rejects_missing_or_out_of_range_port`

> 📄 `address.test.vx` L161-168

```vex
fn test_socketaddr_rejects_missing_or_out_of_range_port()
```

---

### <a id="test_address_caller_buffer_formatting_is_exact_and_transactional"></a>`test_address_caller_buffer_formatting_is_exact_and_transactional`

> 📄 `address.test.vx` L170-264

```vex
fn test_address_caller_buffer_formatting_is_exact_and_transactional()
```

---

### <a id="test_ipv6_format_repeated_preserves_value_and_result_ownership"></a>`test_ipv6_format_repeated_preserves_value_and_result_ownership`

> 📄 `address.test.vx` L266-276

```vex
fn test_ipv6_format_repeated_preserves_value_and_result_ownership()
```

---

### <a id="test_ipv6_copy_aggregate_survives_optimizer_barrier"></a>`test_ipv6_copy_aggregate_survives_optimizer_barrier`

> 📄 `address.test.vx` L278-288

```vex
fn test_ipv6_copy_aggregate_survives_optimizer_barrier()
```

---

### <a id="test_async_accept_parks_until_loopback_connect"></a>`test_async_accept_parks_until_loopback_connect`

> 📄 `async_io.test.vx` L6-63

```vex
fn test_async_accept_parks_until_loopback_connect()
```

---

### <a id="test_context_cancellation_retires_parked_accept"></a>`test_context_cancellation_retires_parked_accept`

> 📄 `async_io.test.vx` L65-94

```vex
fn test_context_cancellation_retires_parked_accept()
```

---

### <a id="test_context_deadline_retires_parked_accept"></a>`test_context_deadline_retires_parked_accept`

> 📄 `async_io.test.vx` L96-115

```vex
fn test_context_deadline_retires_parked_accept()
```

---

### <a id="test_context_aware_tcp_read_write_roundtrip"></a>`test_context_aware_tcp_read_write_roundtrip`

> 📄 `async_io.test.vx` L117-172

```vex
fn test_context_aware_tcp_read_write_roundtrip()
```

---

### <a id="test_context_aware_udp_datagram_roundtrip"></a>`test_context_aware_udp_datagram_roundtrip`

> 📄 `async_io.test.vx` L174-240

```vex
fn test_context_aware_udp_datagram_roundtrip()
```

---

### <a id="test_context_cancellation_retires_parked_udp_receive"></a>`test_context_cancellation_retires_parked_udp_receive`

> 📄 `async_io.test.vx` L242-272

```vex
fn test_context_cancellation_retires_parked_udp_receive()
```

---

### <a id="test_context_deadline_retires_parked_udp_receive"></a>`test_context_deadline_retires_parked_udp_receive`

> 📄 `async_io.test.vx` L274-296

```vex
fn test_context_deadline_retires_parked_udp_receive()
```

---

### <a id="test_socket_close_retires_parked_accept_exactly_once"></a>`test_socket_close_retires_parked_accept_exactly_once`

> 📄 `async_io.test.vx` L298-337

```vex
fn test_socket_close_retires_parked_accept_exactly_once()
```

---

### <a id="test_socket_close_and_context_cancel_elect_one_terminal"></a>`test_socket_close_and_context_cancel_elect_one_terminal`

> 📄 `async_io.test.vx` L339-387

```vex
fn test_socket_close_and_context_cancel_elect_one_terminal()
```

---

### <a id="test_arena_checkpoint_round_trip"></a>`test_arena_checkpoint_round_trip`

> 📄 `arena_checkpoint.test.vx` L8-39

```vex
fn test_arena_checkpoint_round_trip(): i32
```

**Returns:** `i32`

---

### <a id="parseIpv4Observed"></a>`parseIpv4Observed`

> 📄 `bench.test.vx` L7-16

```vex
fn parseIpv4Observed(value: str): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |

**Returns:** `u64`

---

### <a id="parseIpv6Observed"></a>`parseIpv6Observed`

> 📄 `bench.test.vx` L18-27

```vex
fn parseIpv6Observed(value: str): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |

**Returns:** `u64`

---

### <a id="parseSocketObserved"></a>`parseSocketObserved`

> 📄 `bench.test.vx` L29-37

```vex
fn parseSocketObserved(value: str): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |

**Returns:** `u64`

---

### <a id="bench_parse_ipv4"></a>`bench_parse_ipv4`

> 📄 `bench.test.vx` L39-43

```vex
fn bench_parse_ipv4(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_parse_ipv6_compressed"></a>`bench_parse_ipv6_compressed`

> 📄 `bench.test.vx` L45-49

```vex
fn bench_parse_ipv6_compressed(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_parse_socketaddr_ipv6"></a>`bench_parse_socketaddr_ipv6`

> 📄 `bench.test.vx` L51-55

```vex
fn bench_parse_socketaddr_ipv6(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_format_ipv4"></a>`bench_format_ipv4`

> 📄 `bench.test.vx` L57-63

```vex
fn bench_format_ipv4(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_format_ipv6"></a>`bench_format_ipv6`

> 📄 `bench.test.vx` L65-71

```vex
fn bench_format_ipv6(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_format_ipv4_to_buffer"></a>`bench_format_ipv4_to_buffer`

> 📄 `bench.test.vx` L78-95

```vex
fn bench_format_ipv4_to_buffer(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_format_ipv6_to_buffer"></a>`bench_format_ipv6_to_buffer`

> 📄 `bench.test.vx` L102-119

```vex
fn bench_format_ipv6_to_buffer(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_format_socketaddr_ipv6_to_buffer"></a>`bench_format_socketaddr_ipv6_to_buffer`

> 📄 `bench.test.vx` L126-143

```vex
fn bench_format_socketaddr_ipv6_to_buffer(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_format_socketaddr_ipv6_append_reused"></a>`bench_format_socketaddr_ipv6_append_reused`

> 📄 `bench.test.vx` L150-167

```vex
fn bench_format_socketaddr_ipv6_append_reused(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_websocket_parse_4k_zero_copy"></a>`bench_websocket_parse_4k_zero_copy`

> 📄 `bench.test.vx` L175-209

```vex
fn bench_websocket_parse_4k_zero_copy(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_websocket_encode_4k_reused"></a>`bench_websocket_encode_4k_reused`

> 📄 `bench.test.vx` L217-236

```vex
fn bench_websocket_encode_4k_reused(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="makeWsUnmaskState"></a>`makeWsUnmaskState`

> 📄 `bench.test.vx` L246-280

```vex
fn makeWsUnmaskState(payloadLength: usize): WsUnmaskState
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `payloadLength` | `usize` |  |

**Returns:** `WsUnmaskState`

---

### <a id="runWsUnmask"></a>`runWsUnmask`

> 📄 `bench.test.vx` L282-287

```vex
fn runWsUnmask(value: &WsUnmaskState!): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `&amp;WsUnmaskState!` |  |

**Returns:** `u64`

---

### <a id="bench_websocket_unmask_125b_in_place"></a>`bench_websocket_unmask_125b_in_place`

> 📄 `bench.test.vx` L289-296

```vex
fn bench_websocket_unmask_125b_in_place(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_websocket_unmask_4k_in_place"></a>`bench_websocket_unmask_4k_in_place`

> 📄 `bench.test.vx` L298-305

```vex
fn bench_websocket_unmask_4k_in_place(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_conn_find_header_end_4k_late"></a>`bench_conn_find_header_end_4k_late`

> 📄 `bench.test.vx` L312-333

```vex
fn bench_conn_find_header_end_4k_late(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_conn_recycle_read_queue_8k"></a>`bench_conn_recycle_read_queue_8k`

> 📄 `bench.test.vx` L340-364

```vex
fn bench_conn_recycle_read_queue_8k(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="test_net_benchmark_fixtures_roundtrip"></a>`test_net_benchmark_fixtures_roundtrip`

> 📄 `bench.test.vx` L366-374

```vex
fn test_net_benchmark_fixtures_roundtrip()
```

---

### <a id="test_conn_wrap"></a>`test_conn_wrap`

> 📄 `conn.test.vx` L9-17

```vex
fn test_conn_wrap(): i32
```

**Returns:** `i32`

---

### <a id="test_conn_readable"></a>`test_conn_readable`

> 📄 `conn.test.vx` L19-30

```vex
fn test_conn_readable(): i32
```

**Returns:** `i32`

---

### <a id="test_conn_consume"></a>`test_conn_consume`

> 📄 `conn.test.vx` L32-54

```vex
fn test_conn_consume(): i32
```

**Returns:** `i32`

---

### <a id="test_conn_compact"></a>`test_conn_compact`

> 📄 `conn.test.vx` L56-69

```vex
fn test_conn_compact(): i32
```

**Returns:** `i32`

---

### <a id="test_conn_find_header_end"></a>`test_conn_find_header_end`

> 📄 `conn.test.vx` L71-92

```vex
fn test_conn_find_header_end(): i32
```

**Returns:** `i32`

---

### <a id="test_conn_find_header_end_boundaries_and_false_candidates"></a>`test_conn_find_header_end_boundaries_and_false_candidates`

> 📄 `conn.test.vx` L94-118

```vex
fn test_conn_find_header_end_boundaries_and_false_candidates(): i32
```

**Returns:** `i32`

---

### <a id="test_conn_pending_write"></a>`test_conn_pending_write`

> 📄 `conn.test.vx` L120-128

```vex
fn test_conn_pending_write(): i32
```

**Returns:** `i32`

---

### <a id="test_conn_buffered_write_is_lossless_and_bounded"></a>`test_conn_buffered_write_is_lossless_and_bounded`

> 📄 `conn.test.vx` L130-147

```vex
fn test_conn_buffered_write_is_lossless_and_bounded(): i32
```

**Returns:** `i32`

---

### <a id="test_conn_reset"></a>`test_conn_reset`

> 📄 `conn.test.vx` L149-163

```vex
fn test_conn_reset(): i32
```

**Returns:** `i32`

---

### <a id="test_conn_buffered_zero_copy_input_and_limits"></a>`test_conn_buffered_zero_copy_input_and_limits`

> 📄 `conn.test.vx` L165-198

```vex
fn test_conn_buffered_zero_copy_input_and_limits(): i32
```

**Returns:** `i32`

---

### <a id="parsed"></a>`parsed`

> 📄 `high_level.test.vx` L6-10

```vex
fn parsed(address: str): Option<[u8; 4]>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `address` | `str` |  |

**Returns:** `Option&lt;[u8; 4]&gt;`

---

### <a id="expectAddress"></a>`expectAddress`

> 📄 `high_level.test.vx` L12-21

```vex
fn expectAddress(address: str, a: u8, b: u8, c: u8, d: u8)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `address` | `str` |  |
| `a` | `u8` |  |
| `b` | `u8` |  |
| `c` | `u8` |  |
| `d` | `u8` |  |

---

### <a id="expectInvalidAddress"></a>`expectInvalidAddress`

> 📄 `high_level.test.vx` L23-25

```vex
fn expectInvalidAddress(address: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `address` | `str` |  |

---

### <a id="test_net_negative_result_preserves_canonical_error"></a>`test_net_negative_result_preserves_canonical_error`

> 📄 `high_level.test.vx` L27-35

```vex
fn test_net_negative_result_preserves_canonical_error()
```

---

### <a id="test_ipv4_parser_accepts_exact_network_order_octets"></a>`test_ipv4_parser_accepts_exact_network_order_octets`

> 📄 `high_level.test.vx` L37-42

```vex
fn test_ipv4_parser_accepts_exact_network_order_octets()
```

---

### <a id="test_ipv4_parser_rejects_malformed_and_out_of_range_input"></a>`test_ipv4_parser_rejects_malformed_and_out_of_range_input`

> 📄 `high_level.test.vx` L44-55

```vex
fn test_ipv4_parser_rejects_malformed_and_out_of_range_input()
```

---

### <a id="test_high_level_constructors_validate_before_native_access"></a>`test_high_level_constructors_validate_before_native_access`

> 📄 `high_level.test.vx` L57-71

```vex
fn test_high_level_constructors_validate_before_native_access()
```

---

### <a id="test_typed_ipv4_endpoints_reach_the_native_boundary"></a>`test_typed_ipv4_endpoints_reach_the_native_boundary`

> 📄 `high_level.test.vx` L73-104

```vex
fn test_typed_ipv4_endpoints_reach_the_native_boundary()
```

---

### <a id="test_udp_port_zero_local_addr_and_typed_roundtrip"></a>`test_udp_port_zero_local_addr_and_typed_roundtrip`

> 📄 `high_level.test.vx` L106-155

```vex
fn test_udp_port_zero_local_addr_and_typed_roundtrip()
```

---

### <a id="test_ipv6_endpoints_reach_sockaddr_in6_without_text_parsing"></a>`test_ipv6_endpoints_reach_sockaddr_in6_without_text_parsing`

> 📄 `high_level.test.vx` L157-179

```vex
fn test_ipv6_endpoints_reach_sockaddr_in6_without_text_parsing()
```

---

### <a id="closeHandle"></a>`closeHandle`

> 📄 `tcp.vx` L18-23

```vex
fn closeHandle(handle: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `handle` | `i64` |  |

**Returns:** `i32`

---

### <a id="contextFailure"></a>`contextFailure`

> 📄 `tcp.vx` L25-31

```vex
fn contextFailure(context: &Context): Option<IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `context` | `&amp;Context` |  |

**Returns:** `Option&lt;IoError&gt;`

---

### <a id="nativeAddress"></a>`nativeAddress`

> 📄 `tcp.vx` L38-41

```vex
fn nativeAddress(address: &IpAddr, output: Ptr<u8!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `address` | `&amp;IpAddr` |  |
| `output` | `Ptr&lt;u8!&gt;` |  |

**Returns:** `i32`

---

### <a id="tcpStreamTakeSocket"></a>`tcpStreamTakeSocket` `🔓 export`

> 📄 `tcp.vx` L488-493

```vex
export fn tcpStreamTakeSocket(stream: &TcpStream!): Option<Socket>
```

Internal transport integration boundary: relinquish a quiescent task-aware

stream back to native event-loop ownership. This is deliberately a free
function which `net` does not re-export, so ordinary `TcpStream` users
cannot discover descriptor handoff as part of the safe stream API.
The caller must have completed every awaited operation before this
boundary; the returned `Socket` is the sole closer and the stream's Drop
becomes inert. Ownership is transferred as a value, never as a raw handle.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `stream` | `&amp;TcpStream!` |  |

**Returns:** `Option&lt;Socket&gt;`

---

### <a id="vex_net_resolve_host"></a>`vex_net_resolve_host` `🔓 export`

> 📄 `native.vxc` L12-22

```vex
export fn vex_net_resolve_host(host: Ptr<u8>, family: i32, familiesOut: Ptr<u8!>, addressesOut: Ptr<u8!>, capacity: u64, countOut: Ptr<u64!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `host` | `Ptr&lt;u8&gt;` |  |
| `family` | `i32` |  |
| `familiesOut` | `Ptr&lt;u8!&gt;` |  |
| `addressesOut` | `Ptr&lt;u8!&gt;` |  |
| `capacity` | `u64` |  |
| `countOut` | `Ptr&lt;u64!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_socket_tcp"></a>`vex_net_socket_tcp` `🔓 export`

> 📄 `native.vxc` L24-24

```vex
export fn vex_net_socket_tcp(ipv6: i32): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i64`

---

### <a id="vex_net_socket_tcp_blocking"></a>`vex_net_socket_tcp_blocking` `🔓 export`

> 📄 `native.vxc` L25-25

```vex
export fn vex_net_socket_tcp_blocking(ipv6: i32): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i64`

---

### <a id="vex_net_socket_udp"></a>`vex_net_socket_udp` `🔓 export`

> 📄 `native.vxc` L26-26

```vex
export fn vex_net_socket_udp(ipv6: i32): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i64`

---

### <a id="vex_net_set_reuseaddr"></a>`vex_net_set_reuseaddr` `🔓 export`

> 📄 `native.vxc` L28-28

```vex
export fn vex_net_set_reuseaddr(fd: i64, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_reuseport"></a>`vex_net_set_reuseport` `🔓 export`

> 📄 `native.vxc` L29-29

```vex
export fn vex_net_set_reuseport(fd: i64, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nonblock"></a>`vex_net_set_nonblock` `🔓 export`

> 📄 `native.vxc` L30-30

```vex
export fn vex_net_set_nonblock(fd: i64, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nodelay"></a>`vex_net_set_nodelay` `🔓 export`

> 📄 `native.vxc` L31-31

```vex
export fn vex_net_set_nodelay(fd: i64, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nopush"></a>`vex_net_set_nopush` `🔓 export`

> 📄 `native.vxc` L32-32

```vex
export fn vex_net_set_nopush(fd: i64, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_bind"></a>`vex_net_bind` `🔓 export`

> 📄 `native.vxc` L34-34

```vex
export fn vex_net_bind(fd: i64, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_bind_ip"></a>`vex_net_bind_ip` `🔓 export`

> 📄 `native.vxc` L35-35

```vex
export fn vex_net_bind_ip(fd: i64, family: i32, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_listen"></a>`vex_net_listen` `🔓 export`

> 📄 `native.vxc` L36-36

```vex
export fn vex_net_listen(fd: i64, backlog: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `backlog` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_connect"></a>`vex_net_connect` `🔓 export`

> 📄 `native.vxc` L37-37

```vex
export fn vex_net_connect(fd: i64, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_connect_ip"></a>`vex_net_connect_ip` `🔓 export`

> 📄 `native.vxc` L38-38

```vex
export fn vex_net_connect_ip(fd: i64, family: i32, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_connect_ip_async"></a>`vex_net_connect_ip_async` `🔓 export`

> 📄 `native.vxc` L39-39

```vex
export fn vex_net_connect_ip_async(fd: i64, family: i32, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_connect_ip_async_context"></a>`vex_net_connect_ip_async_context` `🔓 export`

> 📄 `native.vxc` L40-40

```vex
export fn vex_net_connect_ip_async_context(fd: i64, family: i32, ip: Ptr<u8>, port: u16, contextIdentity: Ptr<Opaque>, deadlineNs: u64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |
| `contextIdentity` | `Ptr&lt;Opaque&gt;` |  |
| `deadlineNs` | `u64` |  |

**Returns:** `i32`

---

### <a id="vex_net_local_addr"></a>`vex_net_local_addr` `🔓 export`

> 📄 `native.vxc` L41-43

```vex
export fn vex_net_local_addr(fd: i64, familyOut: Ptr<i32!>, ipOut: Ptr<u8!>, ipCapacity: u64, portOut: Ptr<u16!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `familyOut` | `Ptr&lt;i32!&gt;` |  |
| `ipOut` | `Ptr&lt;u8!&gt;` |  |
| `ipCapacity` | `u64` |  |
| `portOut` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_peer_addr"></a>`vex_net_peer_addr` `🔓 export`

> 📄 `native.vxc` L44-46

```vex
export fn vex_net_peer_addr(fd: i64, familyOut: Ptr<i32!>, ipOut: Ptr<u8!>, ipCapacity: u64, portOut: Ptr<u16!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `familyOut` | `Ptr&lt;i32!&gt;` |  |
| `ipOut` | `Ptr&lt;u8!&gt;` |  |
| `ipCapacity` | `u64` |  |
| `portOut` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_accept"></a>`vex_net_accept` `🔓 export`

> 📄 `native.vxc` L47-49

```vex
export fn vex_net_accept(fd: i64, ipOut: Ptr<u8!>, ipLen: u64, portOut: Ptr<u16!>): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `ipOut` | `Ptr&lt;u8!&gt;` |  |
| `ipLen` | `u64` |  |
| `portOut` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i64`

---

### <a id="vex_net_recv"></a>`vex_net_recv` `🔓 export`

> 📄 `native.vxc` L51-51

```vex
export fn vex_net_recv(fd: i64, buf: Ptr<u8!>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_recv_peek"></a>`vex_net_recv_peek` `🔓 export`

> 📄 `native.vxc` L52-52

```vex
export fn vex_net_recv_peek(fd: i64, buf: Ptr<u8!>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_send"></a>`vex_net_send` `🔓 export`

> 📄 `native.vxc` L53-53

```vex
export fn vex_net_send(fd: i64, buf: Ptr<u8>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_sendto"></a>`vex_net_sendto` `🔓 export`

> 📄 `native.vxc` L54-56

```vex
export fn vex_net_sendto(fd: i64, buf: Ptr<u8>, len: u64, ip: Ptr<u8>, port: u16): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i64`

---

### <a id="vex_net_sendto_ip"></a>`vex_net_sendto_ip` `🔓 export`

> 📄 `native.vxc` L57-59

```vex
export fn vex_net_sendto_ip(fd: i64, buf: Ptr<u8>, len: u64, family: i32, ip: Ptr<u8>, port: u16): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i64`

---

### <a id="vex_net_sendto_ip_async_context"></a>`vex_net_sendto_ip_async_context` `🔓 export`

> 📄 `native.vxc` L60-62

```vex
export fn vex_net_sendto_ip_async_context(fd: i64, buf: Ptr<u8>, len: u64, family: i32, ip: Ptr<u8>, port: u16, contextIdentity: Ptr<Opaque>, deadlineNs: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |
| `contextIdentity` | `Ptr&lt;Opaque&gt;` |  |
| `deadlineNs` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_recvfrom"></a>`vex_net_recvfrom` `🔓 export`

> 📄 `native.vxc` L63-72

```vex
export fn vex_net_recvfrom(fd: i64, buf: Ptr<u8!>, len: u64, ipOut: Ptr<u8!>, ipLen: u64, portOut: Ptr<u16!>): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |
| `ipOut` | `Ptr&lt;u8!&gt;` |  |
| `ipLen` | `u64` |  |
| `portOut` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i64`

---

### <a id="vex_net_recvfrom_ip"></a>`vex_net_recvfrom_ip` `🔓 export`

> 📄 `native.vxc` L73-83

```vex
export fn vex_net_recvfrom_ip(fd: i64, buf: Ptr<u8!>, len: u64, familyOut: Ptr<i32!>, ipOut: Ptr<u8!>, ipCapacity: u64, portOut: Ptr<u16!>): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |
| `familyOut` | `Ptr&lt;i32!&gt;` |  |
| `ipOut` | `Ptr&lt;u8!&gt;` |  |
| `ipCapacity` | `u64` |  |
| `portOut` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i64`

---

### <a id="vex_net_recvfrom_ip_async_context"></a>`vex_net_recvfrom_ip_async_context` `🔓 export`

> 📄 `native.vxc` L84-96

```vex
export fn vex_net_recvfrom_ip_async_context(fd: i64, buf: Ptr<u8!>, len: u64, familyOut: Ptr<i32!>, ipOut: Ptr<u8!>, ipCapacity: u64, portOut: Ptr<u16!>, contextIdentity: Ptr<Opaque>, deadlineNs: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |
| `familyOut` | `Ptr&lt;i32!&gt;` |  |
| `ipOut` | `Ptr&lt;u8!&gt;` |  |
| `ipCapacity` | `u64` |  |
| `portOut` | `Ptr&lt;u16!&gt;` |  |
| `contextIdentity` | `Ptr&lt;Opaque&gt;` |  |
| `deadlineNs` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_close"></a>`vex_net_close` `🔓 export`

> 📄 `native.vxc` L97-97

```vex
export fn vex_net_close(fd: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |

**Returns:** `i32`

---

### <a id="vex_net_pipe"></a>`vex_net_pipe` `🔓 export`

> 📄 `native.vxc` L99-99

```vex
export fn vex_net_pipe(readFd: Ptr<i32!>, writeFd: Ptr<i32!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `readFd` | `Ptr&lt;i32!&gt;` |  |
| `writeFd` | `Ptr&lt;i32!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_loop_create"></a>`vex_net_loop_create` `🔓 export`

> 📄 `native.vxc` L101-101

```vex
export fn vex_net_loop_create(loopPtr: Ptr<u8!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loopPtr` | `Ptr&lt;u8!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_loop_close"></a>`vex_net_loop_close` `🔓 export`

> 📄 `native.vxc` L102-102

```vex
export fn vex_net_loop_close(loopPtr: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loopPtr` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_register"></a>`vex_net_register` `🔓 export`

> 📄 `native.vxc` L103-105

```vex
export fn vex_net_register(loopPtr: Ptr<u8>, fd: i32, events: i32, userdata: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loopPtr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |
| `events` | `i32` |  |
| `userdata` | `i64` |  |

**Returns:** `i32`

---

### <a id="vex_net_modify"></a>`vex_net_modify` `🔓 export`

> 📄 `native.vxc` L106-108

```vex
export fn vex_net_modify(loopPtr: Ptr<u8>, fd: i32, events: i32, userdata: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loopPtr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |
| `events` | `i32` |  |
| `userdata` | `i64` |  |

**Returns:** `i32`

---

### <a id="vex_net_unregister"></a>`vex_net_unregister` `🔓 export`

> 📄 `native.vxc` L109-109

```vex
export fn vex_net_unregister(loopPtr: Ptr<u8>, fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loopPtr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_tick"></a>`vex_net_tick` `🔓 export`

> 📄 `native.vxc` L110-112

```vex
export fn vex_net_tick(loopPtr: Ptr<u8>, out: Ptr<u8!>, cap: i32, timeoutMs: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loopPtr` | `Ptr&lt;u8&gt;` |  |
| `out` | `Ptr&lt;u8!&gt;` |  |
| `cap` | `i32` |  |
| `timeoutMs` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_fd_set_nonblock"></a>`vex_fd_set_nonblock` `🔓 export`

> 📄 `native.vxc` L114-114

```vex
export fn vex_fd_set_nonblock(fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_thread_yield"></a>`vex_net_thread_yield` `🔓 export`

> 📄 `native.vxc` L115-115

```vex
export fn vex_net_thread_yield(): i32
```

**Returns:** `i32`

---

### <a id="vex_fd_read"></a>`vex_fd_read` `🔓 export`

> 📄 `native.vxc` L116-116

```vex
export fn vex_fd_read(fd: i32, buf: Ptr<Opaque!>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;Opaque!&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fd_write"></a>`vex_fd_write` `🔓 export`

> 📄 `native.vxc` L117-117

```vex
export fn vex_fd_write(fd: i32, buf: Ptr<Opaque>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;Opaque&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="readEvent"></a>`readEvent` `🔓 export`

> 📄 `event_loop.vx` L114-121

```vex
export fn readEvent(events_base: Ptr<Opaque>, index: i32): Event
```

Read the i-th event from a raw event buffer.

Each event is 16 bytes: {fd: i32, flags: i32, userdata: i64}.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `events_base` | `Ptr&lt;Opaque&gt;` |  |
| `index` | `i32` |  |

**Returns:** `Event`

---

### <a id="decodedSocketAddress"></a>`decodedSocketAddress`

> 📄 `endpoint.vx` L6-17

```vex
fn decodedSocketAddress(family: i32, octets: [u8; 16], port: u16): Result<SocketAddr, IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `family` | `i32` |  |
| `octets` | `[u8; 16]` |  |
| `port` | `u16` |  |

**Returns:** `Result&lt;SocketAddr, IoError&gt;`

---

### <a id="localSocketAddress"></a>`localSocketAddress` `🔓 export`

> 📄 `endpoint.vx` L19-28

```vex
export fn localSocketAddress(handle: i64): Result<SocketAddr, IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `handle` | `i64` |  |

**Returns:** `Result&lt;SocketAddr, IoError&gt;`

---

### <a id="peerSocketAddress"></a>`peerSocketAddress` `🔓 export`

> 📄 `endpoint.vx` L30-39

```vex
export fn peerSocketAddress(handle: i64): Result<SocketAddr, IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `handle` | `i64` |  |

**Returns:** `Result&lt;SocketAddr, IoError&gt;`

---

### <a id="closeHandle"></a>`closeHandle`

> 📄 `udp.vx` L15-20

```vex
fn closeHandle(handle: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `handle` | `i64` |  |

**Returns:** `i32`

---

### <a id="contextFailure"></a>`contextFailure`

> 📄 `udp.vx` L22-28

```vex
fn contextFailure(context: &Context): Option<IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `context` | `&amp;Context` |  |

**Returns:** `Option&lt;IoError&gt;`

---

### <a id="nativeAddress"></a>`nativeAddress`

> 📄 `udp.vx` L51-54

```vex
fn nativeAddress(address: &IpAddr, output: Ptr<u8!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `address` | `&amp;IpAddr` |  |
| `output` | `Ptr&lt;u8!&gt;` |  |

**Returns:** `i32`

---

### <a id="isValidOpcode"></a>`isValidOpcode`

> 📄 `ws_parser.vx` L174-178

```vex
fn isValidOpcode(opcode: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `opcode` | `u8` |  |

**Returns:** `bool`

---

### <a id="parseFrame"></a>`parseFrame` `🔓 export`

> 📄 `ws_parser.vx` L184-247

```vex
export fn parseFrame(buf: Ptr<u8>, len: u64, frame: &WsFrame!, consumed: &u64!): i32
```

Parse one complete frame without copying its payload.

On `WS_OK`, `frame.payload()` borrows `buf` and `consumed` is the exact
frame size. On failure, output parameters are left unchanged.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `frame` | `&amp;WsFrame!` |  |
| `consumed` | `&amp;u64!` |  |

**Returns:** `i32`

---

### <a id="encodeFrameHeader"></a>`encodeFrameHeader` `🔓 export`

> 📄 `ws_parser.vx` L255-297

```vex
export fn encodeFrameHeader(buf: Ptr<u8!>, bufLen: u64, opcode: u8, payloadLen: u64): u64
```

Encode an unmasked server frame header into caller-owned storage.

The returned header length is 2, 4, or 10.  Keeping this separate from
payload copying lets transports perform bounded write-all without a
temporary frame-sized allocation; `encodeFrame` below remains the
contiguous-buffer convenience adapter.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `bufLen` | `u64` |  |
| `opcode` | `u8` |  |
| `payloadLen` | `u64` |  |

**Returns:** `u64`

---

### <a id="encodeFrame"></a>`encodeFrame` `🔓 export`

> 📄 `ws_parser.vx` L300-314

```vex
export fn encodeFrame(buf: Ptr<u8!>, bufLen: u64, opcode: u8, payload: Ptr<u8>, payloadLen: u64, written: &u64!): i32
```

Encode one unmasked server frame into caller-owned contiguous storage.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `bufLen` | `u64` |  |
| `opcode` | `u8` |  |
| `payload` | `Ptr&lt;u8&gt;` |  |
| `payloadLen` | `u64` |  |
| `written` | `&amp;u64!` |  |

**Returns:** `i32`

---

### <a id="encodeText"></a>`encodeText` `🔓 export`

> 📄 `ws_parser.vx` L316-318

```vex
export fn encodeText(buf: Ptr<u8!>, bufLen: u64, text: Ptr<u8>, textLen: u64, written: &u64!): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `bufLen` | `u64` |  |
| `text` | `Ptr&lt;u8&gt;` |  |
| `textLen` | `u64` |  |
| `written` | `&amp;u64!` |  |

**Returns:** `i32`

---

### <a id="encodeClose"></a>`encodeClose` `🔓 export`

> 📄 `ws_parser.vx` L320-325

```vex
export fn encodeClose(buf: Ptr<u8!>, bufLen: u64, code: u16, written: &u64!): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `bufLen` | `u64` |  |
| `code` | `u16` |  |
| `written` | `&amp;u64!` |  |

**Returns:** `i32`

---

### <a id="encodePing"></a>`encodePing` `🔓 export`

> 📄 `ws_parser.vx` L327-329

```vex
export fn encodePing(buf: Ptr<u8!>, bufLen: u64, written: &u64!): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `bufLen` | `u64` |  |
| `written` | `&amp;u64!` |  |

**Returns:** `i32`

---

### <a id="encodePong"></a>`encodePong` `🔓 export`

> 📄 `ws_parser.vx` L331-333

```vex
export fn encodePong(buf: Ptr<u8!>, bufLen: u64, payload: Ptr<u8>, payloadLen: u64, written: &u64!): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `bufLen` | `u64` |  |
| `payload` | `Ptr&lt;u8&gt;` |  |
| `payloadLen` | `u64` |  |
| `written` | `&amp;u64!` |  |

**Returns:** `i32`

---

### <a id="isControlFrame"></a>`isControlFrame` `🔓 export`

> 📄 `ws_parser.vx` L335-337

```vex
export fn isControlFrame(opcode: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `opcode` | `u8` |  |

**Returns:** `bool`

---

### <a id="isDataFrame"></a>`isDataFrame` `🔓 export`

> 📄 `ws_parser.vx` L339-341

```vex
export fn isDataFrame(opcode: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `opcode` | `u8` |  |

**Returns:** `bool`

---

### <a id="resolveError"></a>`resolveError`

> 📄 `resolver.vx` L37-39

```vex
fn resolveError(kind: ResolveErrorKind, nativeCode: i32): ResolveError
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `kind` | `ResolveErrorKind` |  |
| `nativeCode` | `i32` |  |

**Returns:** `ResolveError`

---

### <a id="familyCode"></a>`familyCode`

> 📄 `resolver.vx` L83-89

```vex
fn familyCode(family: ResolveFamily): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `family` | `ResolveFamily` |  |

**Returns:** `i32`

---

### <a id="familyAccepts"></a>`familyAccepts`

> 📄 `resolver.vx` L91-97

```vex
fn familyAccepts(family: ResolveFamily, address: &IpAddr): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `family` | `ResolveFamily` |  |
| `address` | `&amp;IpAddr` |  |

**Returns:** `bool`

---

### <a id="validateAndCopyHost"></a>`validateAndCopyHost`

> 📄 `resolver.vx` L99-116

```vex
fn validateAndCopyHost(host: str, output: Ptr<u8!>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `host` | `str` |  |
| `output` | `Ptr&lt;u8!&gt;` |  |

**Returns:** `bool`

---

### <a id="decodeProviderAddress"></a>`decodeProviderAddress`

> 📄 `resolver.vx` L118-137

```vex
fn decodeProviderAddress(family: u8, bytes: Ptr<u8>): Option<IpAddr>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `family` | `u8` |  |
| `bytes` | `Ptr&lt;u8&gt;` |  |

**Returns:** `Option&lt;IpAddr&gt;`

---

### <a id="mapProviderFailure"></a>`mapProviderFailure`

> 📄 `resolver.vx` L139-149

```vex
fn mapProviderFailure(status: i32): ResolveError
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `status` | `i32` |  |

**Returns:** `ResolveError`

---

### <a id="resolveHostBlocking"></a>`resolveHostBlocking` `🔓 export`

> 📄 `resolver.vx` L154-159

```vex
export fn resolveHostBlocking(host: str): Result<Vec<IpAddr>, ResolveError>
```

Resolves a numeric address or DNS hostname through the target system

resolver. Results preserve provider order and remove duplicate addresses.
This call may block the current operating-system thread.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `host` | `str` |  |

**Returns:** `Result&lt;Vec&lt;IpAddr&gt;, ResolveError&gt;`

---

### <a id="resolveHostBlocking"></a>`resolveHostBlocking` `🔓 export`

> 📄 `resolver.vx` L161-223

```vex
export fn resolveHostBlocking(host: str, options: ResolveOptions): Result<Vec<IpAddr>, ResolveError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `host` | `str` |  |
| `options` | `ResolveOptions` |  |

**Returns:** `Result&lt;Vec&lt;IpAddr&gt;, ResolveError&gt;`

---

### <a id="resolveSocketAddrsBlocking"></a>`resolveSocketAddrsBlocking` `🔓 export`

> 📄 `resolver.vx` L226-235

```vex
export fn resolveSocketAddrsBlocking(host: str, port: u16): Result<Vec<SocketAddr>, ResolveError>
```

Resolves a hostname and attaches one caller-provided port to every address.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `host` | `str` |  |
| `port` | `u16` |  |

**Returns:** `Result&lt;Vec&lt;SocketAddr&gt;, ResolveError&gt;`

---

### <a id="resolveSocketAddrsBlocking"></a>`resolveSocketAddrsBlocking` `🔓 export`

> 📄 `resolver.vx` L237-253

```vex
export fn resolveSocketAddrsBlocking(host: str, port: u16, options: ResolveOptions): Result<Vec<SocketAddr>, ResolveError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `host` | `str` |  |
| `port` | `u16` |  |
| `options` | `ResolveOptions` |  |

**Returns:** `Result&lt;Vec&lt;SocketAddr&gt;, ResolveError&gt;`

---

### <a id="get_errno"></a>`get_errno`

> 📄 `native.macos.vxc` L37-43

```vex
fn get_errno(): i32
```

**Returns:** `i32`

---

### <a id="negative_errno"></a>`negative_errno`

> 📄 `native.macos.vxc` L45-47

```vex
fn negative_errno(): i32
```

**Returns:** `i32`

---

### <a id="map_resolver_status"></a>`map_resolver_status`

> 📄 `native.macos.vxc` L49-60

```vex
fn map_resolver_status(status: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `status` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_resolve_host"></a>`vex_net_resolve_host` `🔓 export`

> 📄 `native.macos.vxc` L64-128

```vex
export fn vex_net_resolve_host(host: Ptr<u8>, family: i32, familiesOut: Ptr<u8!>, addressesOut: Ptr<u8!>, capacity: u64, countOut: Ptr<u64!>): i32
```

System DNS boundary. `addrinfo` is decoded through Darwin's stable ABI

offsets and converted immediately into target-neutral family/octet records.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `host` | `Ptr&lt;u8&gt;` |  |
| `family` | `i32` |  |
| `familiesOut` | `Ptr&lt;u8!&gt;` |  |
| `addressesOut` | `Ptr&lt;u8!&gt;` |  |
| `capacity` | `u64` |  |
| `countOut` | `Ptr&lt;u64!&gt;` |  |

**Returns:** `i32`

---

### <a id="build_ip_port"></a>`build_ip_port`

> 📄 `native.macos.vxc` L146-166

```vex
fn build_ip_port(family: i32, ip: Ptr<u8>, port: u16, output: Ptr<sockaddr_ip!>): u32
```

Builds either sockaddr_in or sockaddr_in6 from validated network-order

bytes. The semantic family is 4 or 6 and is independent of Darwin values.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |
| `output` | `Ptr&lt;sockaddr_ip!&gt;` |  |

**Returns:** `u32`

---

### <a id="decode_ip_port"></a>`decode_ip_port`

> 📄 `native.macos.vxc` L168-194

```vex
fn decode_ip_port(address: Ptr<sockaddr_ip>, familyOut: Ptr<i32!>, ipOut: Ptr<u8!>, ipCapacity: u64, portOut: Ptr<u16!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `address` | `Ptr&lt;sockaddr_ip&gt;` |  |
| `familyOut` | `Ptr&lt;i32!&gt;` |  |
| `ipOut` | `Ptr&lt;u8!&gt;` |  |
| `ipCapacity` | `u64` |  |
| `portOut` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i32`

---

### <a id="write_ipv4_text"></a>`write_ipv4_text`

> 📄 `native.macos.vxc` L197-224

```vex
fn write_ipv4_text(src: Ptr<u8>, out: Ptr<u8!>, cap: u64)
```

Format the four network-order IPv4 bytes into a bounded C string.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `src` | `Ptr&lt;u8&gt;` |  |
| `out` | `Ptr&lt;u8!&gt;` |  |
| `cap` | `u64` |  |

---

### <a id="parse_ip_port"></a>`parse_ip_port`

> 📄 `native.macos.vxc` L226-255

```vex
fn parse_ip_port(ip: Ptr<u8>, port: u16, addr_out: Ptr<sockaddr_in!>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |
| `addr_out` | `Ptr&lt;sockaddr_in!&gt;` |  |

---

### <a id="vex_net_socket_tcp"></a>`vex_net_socket_tcp` `🔓 export`

> 📄 `native.macos.vxc` L259-271

```vex
export fn vex_net_socket_tcp(ipv6: i32): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i64`

---

### <a id="vex_net_socket_tcp_blocking"></a>`vex_net_socket_tcp_blocking` `🔓 export`

> 📄 `native.macos.vxc` L273-280

```vex
export fn vex_net_socket_tcp_blocking(ipv6: i32): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i64`

---

### <a id="vex_net_socket_udp"></a>`vex_net_socket_udp` `🔓 export`

> 📄 `native.macos.vxc` L282-289

```vex
export fn vex_net_socket_udp(ipv6: i32): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i64`

---

### <a id="vex_net_set_reuseaddr"></a>`vex_net_set_reuseaddr` `🔓 export`

> 📄 `native.macos.vxc` L291-296

```vex
export fn vex_net_set_reuseaddr(fd: i64, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_reuseport"></a>`vex_net_set_reuseport` `🔓 export`

> 📄 `native.macos.vxc` L298-303

```vex
export fn vex_net_set_reuseport(fd: i64, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nonblock"></a>`vex_net_set_nonblock` `🔓 export`

> 📄 `native.macos.vxc` L305-313

```vex
export fn vex_net_set_nonblock(fd: i64, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nodelay"></a>`vex_net_set_nodelay` `🔓 export`

> 📄 `native.macos.vxc` L315-320

```vex
export fn vex_net_set_nodelay(fd: i64, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nopush"></a>`vex_net_set_nopush` `🔓 export`

> 📄 `native.macos.vxc` L322-327

```vex
export fn vex_net_set_nopush(fd: i64, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_bind"></a>`vex_net_bind` `🔓 export`

> 📄 `native.macos.vxc` L331-337

```vex
export fn vex_net_bind(fd: i64, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_bind_ip"></a>`vex_net_bind_ip` `🔓 export`

> 📄 `native.macos.vxc` L339-346

```vex
export fn vex_net_bind_ip(fd: i64, family: i32, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_listen"></a>`vex_net_listen` `🔓 export`

> 📄 `native.macos.vxc` L348-352

```vex
export fn vex_net_listen(fd: i64, backlog: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `backlog` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_connect"></a>`vex_net_connect` `🔓 export`

> 📄 `native.macos.vxc` L354-360

```vex
export fn vex_net_connect(fd: i64, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_connect_ip"></a>`vex_net_connect_ip` `🔓 export`

> 📄 `native.macos.vxc` L362-369

```vex
export fn vex_net_connect_ip(fd: i64, family: i32, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_connect_ip_async"></a>`vex_net_connect_ip_async` `🔓 export`

> 📄 `native.macos.vxc` L371-376

```vex
export fn vex_net_connect_ip_async(fd: i64, family: i32, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_connect_ip_async_context"></a>`vex_net_connect_ip_async_context` `🔓 export`

> 📄 `native.macos.vxc` L378-393

```vex
export fn vex_net_connect_ip_async_context(fd: i64, family: i32, ip: Ptr<u8>, port: u16, contextIdentity: Ptr<Opaque>, deadlineNs: u64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |
| `contextIdentity` | `Ptr&lt;Opaque&gt;` |  |
| `deadlineNs` | `u64` |  |

**Returns:** `i32`

---

### <a id="vex_net_local_addr"></a>`vex_net_local_addr` `🔓 export`

> 📄 `native.macos.vxc` L395-407

```vex
export fn vex_net_local_addr(fd: i64, familyOut: Ptr<i32!>, ipOut: Ptr<u8!>, ipCapacity: u64, portOut: Ptr<u16!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `familyOut` | `Ptr&lt;i32!&gt;` |  |
| `ipOut` | `Ptr&lt;u8!&gt;` |  |
| `ipCapacity` | `u64` |  |
| `portOut` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_peer_addr"></a>`vex_net_peer_addr` `🔓 export`

> 📄 `native.macos.vxc` L409-421

```vex
export fn vex_net_peer_addr(fd: i64, familyOut: Ptr<i32!>, ipOut: Ptr<u8!>, ipCapacity: u64, portOut: Ptr<u16!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `familyOut` | `Ptr&lt;i32!&gt;` |  |
| `ipOut` | `Ptr&lt;u8!&gt;` |  |
| `ipCapacity` | `u64` |  |
| `portOut` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_accept"></a>`vex_net_accept` `🔓 export`

> 📄 `native.macos.vxc` L423-442

```vex
export fn vex_net_accept(fd: i64, ip_out: Ptr<u8!>, ip_len: u64, port_out: Ptr<u16!>): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `ip_out` | `Ptr&lt;u8!&gt;` |  |
| `ip_len` | `u64` |  |
| `port_out` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i64`

---

### <a id="vex_net_recv"></a>`vex_net_recv` `🔓 export`

> 📄 `native.macos.vxc` L444-448

```vex
export fn vex_net_recv(fd: i64, buf: Ptr<u8!>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_recv_peek"></a>`vex_net_recv_peek` `🔓 export`

> 📄 `native.macos.vxc` L450-454

```vex
export fn vex_net_recv_peek(fd: i64, buf: Ptr<u8!>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_send"></a>`vex_net_send` `🔓 export`

> 📄 `native.macos.vxc` L456-460

```vex
export fn vex_net_send(fd: i64, buf: Ptr<u8>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_sendto"></a>`vex_net_sendto` `🔓 export`

> 📄 `native.macos.vxc` L462-468

```vex
export fn vex_net_sendto(fd: i64, buf: Ptr<u8>, len: u64, ip: Ptr<u8>, port: u16): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i64`

---

### <a id="vex_net_sendto_ip"></a>`vex_net_sendto_ip` `🔓 export`

> 📄 `native.macos.vxc` L470-477

```vex
export fn vex_net_sendto_ip(fd: i64, buf: Ptr<u8>, len: u64, family: i32, ip: Ptr<u8>, port: u16): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i64`

---

### <a id="vex_net_sendto_ip_async_context"></a>`vex_net_sendto_ip_async_context` `🔓 export`

> 📄 `native.macos.vxc` L479-488

```vex
export fn vex_net_sendto_ip_async_context(fd: i64, buf: Ptr<u8>, len: u64, family: i32, ip: Ptr<u8>, port: u16, contextIdentity: Ptr<Opaque>, deadlineNs: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |
| `contextIdentity` | `Ptr&lt;Opaque&gt;` |  |
| `deadlineNs` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_recvfrom"></a>`vex_net_recvfrom` `🔓 export`

> 📄 `native.macos.vxc` L490-507

```vex
export fn vex_net_recvfrom(fd: i64, buf: Ptr<u8!>, len: u64, ip_out: Ptr<u8!>, ip_len: u64, port_out: Ptr<u16!>): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |
| `ip_out` | `Ptr&lt;u8!&gt;` |  |
| `ip_len` | `u64` |  |
| `port_out` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i64`

---

### <a id="vex_net_recvfrom_ip"></a>`vex_net_recvfrom_ip` `🔓 export`

> 📄 `native.macos.vxc` L509-525

```vex
export fn vex_net_recvfrom_ip(fd: i64, buf: Ptr<u8!>, len: u64, familyOut: Ptr<i32!>, ipOut: Ptr<u8!>, ipCapacity: u64, portOut: Ptr<u16!>): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |
| `familyOut` | `Ptr&lt;i32!&gt;` |  |
| `ipOut` | `Ptr&lt;u8!&gt;` |  |
| `ipCapacity` | `u64` |  |
| `portOut` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i64`

---

### <a id="vex_net_recvfrom_ip_async_context"></a>`vex_net_recvfrom_ip_async_context` `🔓 export`

> 📄 `native.macos.vxc` L527-549

```vex
export fn vex_net_recvfrom_ip_async_context(fd: i64, buf: Ptr<u8!>, len: u64, familyOut: Ptr<i32!>, ipOut: Ptr<u8!>, ipCapacity: u64, portOut: Ptr<u16!>, contextIdentity: Ptr<Opaque>, deadlineNs: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |
| `familyOut` | `Ptr&lt;i32!&gt;` |  |
| `ipOut` | `Ptr&lt;u8!&gt;` |  |
| `ipCapacity` | `u64` |  |
| `portOut` | `Ptr&lt;u16!&gt;` |  |
| `contextIdentity` | `Ptr&lt;Opaque&gt;` |  |
| `deadlineNs` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_close"></a>`vex_net_close` `🔓 export`

> 📄 `native.macos.vxc` L551-556

```vex
export fn vex_net_close(fd: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |

**Returns:** `i32`

---

### <a id="vex_net_pipe"></a>`vex_net_pipe` `🔓 export`

> 📄 `native.macos.vxc` L558-567

```vex
export fn vex_net_pipe(read_fd: Ptr<i32!>, write_fd: Ptr<i32!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `read_fd` | `Ptr&lt;i32!&gt;` |  |
| `write_fd` | `Ptr&lt;i32!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_loop_create"></a>`vex_net_loop_create` `🔓 export`

> 📄 `native.macos.vxc` L571-578

```vex
export fn vex_net_loop_create(loop_ptr: Ptr<u8!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_loop_close"></a>`vex_net_loop_close` `🔓 export`

> 📄 `native.macos.vxc` L580-585

```vex
export fn vex_net_loop_close(loop_ptr: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_register"></a>`vex_net_register` `🔓 export`

> 📄 `native.macos.vxc` L587-610

```vex
export fn vex_net_register(loop_ptr: Ptr<u8>, fd: i32, events: i32, userdata: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |
| `events` | `i32` |  |
| `userdata` | `i64` |  |

**Returns:** `i32`

---

### <a id="vex_net_modify"></a>`vex_net_modify` `🔓 export`

> 📄 `native.macos.vxc` L612-616

```vex
export fn vex_net_modify(loop_ptr: Ptr<u8>, fd: i32, events: i32, userdata: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |
| `events` | `i32` |  |
| `userdata` | `i64` |  |

**Returns:** `i32`

---

### <a id="vex_net_unregister"></a>`vex_net_unregister` `🔓 export`

> 📄 `native.macos.vxc` L618-631

```vex
export fn vex_net_unregister(loop_ptr: Ptr<u8>, fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_tick"></a>`vex_net_tick` `🔓 export`

> 📄 `native.macos.vxc` L633-677

```vex
export fn vex_net_tick(loop_ptr: Ptr<u8>, out: Ptr<u8!>, cap: i32, timeout_ms: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `out` | `Ptr&lt;u8!&gt;` |  |
| `cap` | `i32` |  |
| `timeout_ms` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_fd_set_nonblock"></a>`vex_fd_set_nonblock` `🔓 export`

> 📄 `native.macos.vxc` L681-683

```vex
export fn vex_fd_set_nonblock(fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_thread_yield"></a>`vex_net_thread_yield` `🔓 export`

> 📄 `native.macos.vxc` L703-705

```vex
export fn vex_net_thread_yield(): i32
```

**Returns:** `i32`

---

### <a id="vex_fd_read"></a>`vex_fd_read` `🔓 export`

> 📄 `native.macos.vxc` L707-711

```vex
export fn vex_fd_read(fd: i32, buf: Ptr<Opaque!>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;Opaque!&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fd_write"></a>`vex_fd_write` `🔓 export`

> 📄 `native.macos.vxc` L713-717

```vex
export fn vex_fd_write(fd: i32, buf: Ptr<Opaque>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;Opaque&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="monotonicNs"></a>`monotonicNs` `🔓 export`

> 📄 `runtime.vxc` L38-40

```vex
export fn monotonicNs(): u64
```

Monotonic clock in nanoseconds.

**Returns:** `u64`

---

### <a id="prepareWorkers"></a>`prepareWorkers` `🔓 export`

> 📄 `runtime.vxc` L43-45

```vex
export fn prepareWorkers(numWorkers: i32): i32
```

Ensure the async runtime has enough worker threads ready for server workloads.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `numWorkers` | `i32` |  |

**Returns:** `i32`

---

### <a id="registeredWorkerCount"></a>`registeredWorkerCount` `🔓 export`

> 📄 `runtime.vxc` L49-51

```vex
export fn registeredWorkerCount(): u32
```

Number of worker scheduler states that have completed registration.

This is a readiness observation, not a request to grow the worker pool.

**Returns:** `u32`

---

### <a id="flushSpawnBatch"></a>`flushSpawnBatch` `🔓 export`

> 📄 `runtime.vxc` L54-56

```vex
export fn flushSpawnBatch()
```

Flush the main-thread spawn batch immediately.

---

### <a id="arenaSave"></a>`arenaSave` `🔓 export`

> 📄 `runtime.vxc` L58-60

```vex
export fn arenaSave(): Ptr<Opaque>
```

**Returns:** `Ptr&lt;Opaque&gt;`

---

### <a id="arenaRestore"></a>`arenaRestore` `🔓 export`

> 📄 `runtime.vxc` L62-64

```vex
export fn arenaRestore(token: Ptr<Opaque>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `token` | `Ptr&lt;Opaque&gt;` |  |

---

### <a id="arenaCheckpoint"></a>`arenaCheckpoint` `🔓 export`

> 📄 `runtime.vxc` L67-69

```vex
export fn arenaCheckpoint(out: Ptr<ArenaCheckpoint!>): bool
```

Capture a lexical arena watermark without allocating a savepoint node.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `Ptr&lt;ArenaCheckpoint!&gt;` |  |

**Returns:** `bool`

---

### <a id="arenaRewind"></a>`arenaRewind` `🔓 export`

> 📄 `runtime.vxc` L72-74

```vex
export fn arenaRewind(checkpoint: Ptr<ArenaCheckpoint!>): bool
```

Reclaim exactly the work performed after arenaCheckpoint.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `checkpoint` | `Ptr&lt;ArenaCheckpoint!&gt;` |  |

**Returns:** `bool`

---

### <a id="arenaTotalBytesUsed"></a>`arenaTotalBytesUsed` `🔓 export`

> 📄 `runtime.vxc` L76-78

```vex
export fn arenaTotalBytesUsed(): u64
```

**Returns:** `u64`

---

### <a id="regionCurrent"></a>`regionCurrent` `🔓 export`

> 📄 `runtime.vxc` L80-82

```vex
export fn regionCurrent(): Ptr<Opaque>
```

**Returns:** `Ptr&lt;Opaque&gt;`

---

### <a id="regionSetCurrent"></a>`regionSetCurrent` `🔓 export`

> 📄 `runtime.vxc` L84-86

```vex
export fn regionSetCurrent(r: Ptr<Opaque>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `r` | `Ptr&lt;Opaque&gt;` |  |

---

### <a id="setArenaMode"></a>`setArenaMode` `🔓 export`

> 📄 `runtime.vxc` L88-90

```vex
export fn setArenaMode(enabled: bool)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `enabled` | `bool` |  |

---

### <a id="getArenaMode"></a>`getArenaMode` `🔓 export`

> 📄 `runtime.vxc` L92-94

```vex
export fn getArenaMode(): bool
```

**Returns:** `bool`

---

### <a id="cpuCount"></a>`cpuCount` `🔓 export`

> 📄 `socket.vx` L174-179

```vex
export fn cpuCount(): i32
```

Get the number of CPU cores (for multi-worker servers).

**Returns:** `i32`

---

### <a id="makePipe"></a>`makePipe` `🔓 export`

> 📄 `socket.vx` L183-189

```vex
export fn makePipe(): [i32; 2]
```

Create a pipe pair (read_fd, write_fd).

Returns [read_fd, write_fd] on success, [-1, -1] on error.

**Returns:** `[i32; 2]`

---

### <a id="tcpBlockingFd"></a>`tcpBlockingFd` `🔓 export`

> 📄 `socket.vx` L194-196

```vex
export fn tcpBlockingFd(): i64
```

Create a blocking TCP socket fd.

**Returns:** `i64`

---

### <a id="connectFd"></a>`connectFd` `🔓 export`

> 📄 `socket.vx` L199-203

```vex
export fn connectFd(fd: i64, ip: str, port: u16): i32
```

Connect an existing fd to ip:port.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `ip` | `str` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="bindFd"></a>`bindFd` `🔓 export`

> 📄 `socket.vx` L206-210

```vex
export fn bindFd(fd: i64, ip: str, port: u16): i32
```

Bind an existing fd to ip:port.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `ip` | `str` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="listenFd"></a>`listenFd` `🔓 export`

> 📄 `socket.vx` L213-215

```vex
export fn listenFd(fd: i64, backlog: i32): i32
```

Listen on an existing fd with backlog.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `backlog` | `i32` |  |

**Returns:** `i32`

---

### <a id="acceptFd"></a>`acceptFd` `🔓 export`

> 📄 `socket.vx` L218-220

```vex
export fn acceptFd(fd: i64): i64
```

Accept a client fd from a listening fd.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |

**Returns:** `i64`

---

### <a id="setReuseAddrFd"></a>`setReuseAddrFd` `🔓 export`

> 📄 `socket.vx` L223-227

```vex
export fn setReuseAddrFd(fd: i64, on: bool): i32
```

Enable/disable SO_REUSEADDR for a raw fd.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `on` | `bool` |  |

**Returns:** `i32`

---

### <a id="setNoDelayFd"></a>`setNoDelayFd` `🔓 export`

> 📄 `socket.vx` L230-234

```vex
export fn setNoDelayFd(fd: i64, on: bool): i32
```

Enable/disable TCP_NODELAY for a raw fd.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `on` | `bool` |  |

**Returns:** `i32`

---

### <a id="recvFd"></a>`recvFd` `🔓 export`

> 📄 `socket.vx` L237-239

```vex
export fn recvFd(fd: i64, buf: Ptr<u8!>, len: u64): i64
```

Receive bytes on a raw fd.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="sendFd"></a>`sendFd` `🔓 export`

> 📄 `socket.vx` L242-244

```vex
export fn sendFd(fd: i64, buf: Ptr<u8>, len: u64): i64
```

Send bytes on a raw fd.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="closeFd"></a>`closeFd` `🔓 export`

> 📄 `socket.vx` L247-249

```vex
export fn closeFd(fd: i64): i32
```

Close a raw fd.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |

**Returns:** `i32`

---

### <a id="peekFd"></a>`peekFd` `🔓 export`

> 📄 `socket.vx` L252-254

```vex
export fn peekFd(fd: i64, buf: Ptr<u8!>, len: u64): i64
```

Peek bytes without consuming them. Returns 0 on EOF, negative on error/EAGAIN.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="writeFd"></a>`writeFd` `🔓 export`

> 📄 `socket.vx` L258-260

```vex
export fn writeFd(fd: i32, buf: Ptr<u8>, len: u64): i64
```

Write bytes to any fd (pipe, file, socket). Uses write() syscall.

Unlike sendFd which uses send() (socket-only), this works on pipes.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="readFd"></a>`readFd` `🔓 export`

> 📄 `socket.vx` L264-266

```vex
export fn readFd(fd: i32, buf: Ptr<u8!>, len: u64): i64
```

Read bytes from any fd (pipe, file, socket). Uses read() syscall.

Unlike recvFd which uses recv() (socket-only), this works on pipes.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="asyncAcceptFd"></a>`asyncAcceptFd` `🔓 export`

> 📄 `socket.vx` L281-283

```vex
export fn asyncAcceptFd(fd: i64): i64
```

Accept a client fd using non-blocking I/O. Parks goroutine if no

connection pending. Returns client fd (pre-set to non-blocking).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |

**Returns:** `i64`

---

### <a id="asyncAcceptFd"></a>`asyncAcceptFd` `🔓 export`

> 📄 `socket.vx` L287-299

```vex
export fn asyncAcceptFd(fd: i64, context: &Context): i64
```

Context-aware accept. The raw cancellation identity is never retained by

std/net; VexArch owns it only while the generation-checked wait is armed.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `context` | `&amp;Context` |  |

**Returns:** `i64`

---

### <a id="asyncRecvFd"></a>`asyncRecvFd` `🔓 export`

> 📄 `socket.vx` L302-304

```vex
export fn asyncRecvFd(fd: i64, buf: Ptr<u8!>, len: u64): i64
```

Receive bytes on a raw fd, goroutine-aware. Parks on EAGAIN.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="asyncRecvFd"></a>`asyncRecvFd` `🔓 export`

> 📄 `socket.vx` L306-320

```vex
export fn asyncRecvFd(fd: i64, buf: Ptr<u8!>, len: u64, context: &Context): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |
| `context` | `&amp;Context` |  |

**Returns:** `i64`

---

### <a id="asyncSendFd"></a>`asyncSendFd` `🔓 export`

> 📄 `socket.vx` L324-326

```vex
export fn asyncSendFd(fd: i64, buf: Ptr<u8>, len: u64): i64
```

Send bytes on a raw fd, goroutine-aware. Parks on EAGAIN.

Ensures all bytes are written (handles partial writes).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="asyncSendFd"></a>`asyncSendFd` `🔓 export`

> 📄 `socket.vx` L328-342

```vex
export fn asyncSendFd(fd: i64, buf: Ptr<u8>, len: u64, context: &Context): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `context` | `&amp;Context` |  |

**Returns:** `i64`

---

### <a id="setNonBlockFd"></a>`setNonBlockFd` `🔓 export`

> 📄 `socket.vx` L345-347

```vex
export fn setNonBlockFd(fd: i64): i32
```

Set a socket to non-blocking mode.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |

**Returns:** `i32`

---

### <a id="map_resolver_status"></a>`map_resolver_status`

> 📄 `native.linux.vxc` L35-42

```vex
fn map_resolver_status(status: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `status` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_resolve_host"></a>`vex_net_resolve_host` `🔓 export`

> 📄 `native.linux.vxc` L44-105

```vex
export fn vex_net_resolve_host(host: Ptr<u8>, family: i32, familiesOut: Ptr<u8!>, addressesOut: Ptr<u8!>, capacity: u64, countOut: Ptr<u64!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `host` | `Ptr&lt;u8&gt;` |  |
| `family` | `i32` |  |
| `familiesOut` | `Ptr&lt;u8!&gt;` |  |
| `addressesOut` | `Ptr&lt;u8!&gt;` |  |
| `capacity` | `u64` |  |
| `countOut` | `Ptr&lt;u64!&gt;` |  |

**Returns:** `i32`

---

### <a id="socket"></a>`socket`

> 📄 `native.linux.vxc` L107-109

```vex
fn socket(domain: i32, type_: i32, protocol: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `domain` | `i32` |  |
| `type_` | `i32` |  |
| `protocol` | `i32` |  |

**Returns:** `i32`

---

### <a id="bind"></a>`bind`

> 📄 `native.linux.vxc` L111-113

```vex
fn bind(fd: i32, addr: Ptr<Opaque>, len: u32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `addr` | `Ptr&lt;Opaque&gt;` |  |
| `len` | `u32` |  |

**Returns:** `i32`

---

### <a id="listen"></a>`listen`

> 📄 `native.linux.vxc` L115-117

```vex
fn listen(fd: i32, backlog: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `backlog` | `i32` |  |

**Returns:** `i32`

---

### <a id="accept"></a>`accept`

> 📄 `native.linux.vxc` L119-121

```vex
fn accept(fd: i32, addr: Ptr<Opaque!>, len_ptr: Ptr<u32!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `addr` | `Ptr&lt;Opaque!&gt;` |  |
| `len_ptr` | `Ptr&lt;u32!&gt;` |  |

**Returns:** `i32`

---

### <a id="connect"></a>`connect`

> 📄 `native.linux.vxc` L123-125

```vex
fn connect(fd: i32, addr: Ptr<Opaque>, len: u32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `addr` | `Ptr&lt;Opaque&gt;` |  |
| `len` | `u32` |  |

**Returns:** `i32`

---

### <a id="getsockname"></a>`getsockname`

> 📄 `native.linux.vxc` L127-129

```vex
fn getsockname(fd: i32, addr: Ptr<Opaque!>, len_ptr: Ptr<u32!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `addr` | `Ptr&lt;Opaque!&gt;` |  |
| `len_ptr` | `Ptr&lt;u32!&gt;` |  |

**Returns:** `i32`

---

### <a id="getpeername"></a>`getpeername`

> 📄 `native.linux.vxc` L131-133

```vex
fn getpeername(fd: i32, addr: Ptr<Opaque!>, len_ptr: Ptr<u32!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `addr` | `Ptr&lt;Opaque!&gt;` |  |
| `len_ptr` | `Ptr&lt;u32!&gt;` |  |

**Returns:** `i32`

---

### <a id="close"></a>`close`

> 📄 `native.linux.vxc` L135-137

```vex
fn close(fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="recvfrom"></a>`recvfrom`

> 📄 `native.linux.vxc` L139-141

```vex
fn recvfrom(fd: i32, buf: Ptr<u8!>, len: u64, flags: i32, addr: Ptr<Opaque!>, addr_len: Ptr<u32!>): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |
| `flags` | `i32` |  |
| `addr` | `Ptr&lt;Opaque!&gt;` |  |
| `addr_len` | `Ptr&lt;u32!&gt;` |  |

**Returns:** `i64`

---

### <a id="sendto"></a>`sendto`

> 📄 `native.linux.vxc` L143-145

```vex
fn sendto(fd: i32, buf: Ptr<u8>, len: u64, flags: i32, addr: Ptr<Opaque>, addr_len: u32): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `flags` | `i32` |  |
| `addr` | `Ptr&lt;Opaque&gt;` |  |
| `addr_len` | `u32` |  |

**Returns:** `i64`

---

### <a id="setsockopt"></a>`setsockopt`

> 📄 `native.linux.vxc` L147-149

```vex
fn setsockopt(fd: i32, level: i32, optname: i32, optval: Ptr<Opaque>, optlen: u32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `level` | `i32` |  |
| `optname` | `i32` |  |
| `optval` | `Ptr&lt;Opaque&gt;` |  |
| `optlen` | `u32` |  |

**Returns:** `i32`

---

### <a id="pipe2"></a>`pipe2`

> 📄 `native.linux.vxc` L151-153

```vex
fn pipe2(fds: Ptr<i32!>, flags: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fds` | `Ptr&lt;i32!&gt;` |  |
| `flags` | `i32` |  |

**Returns:** `i32`

---

### <a id="fcntl"></a>`fcntl`

> 📄 `native.linux.vxc` L155-157

```vex
fn fcntl(fd: i32, cmd: i32, arg: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `cmd` | `i32` |  |
| `arg` | `i64` |  |

**Returns:** `i32`

---

### <a id="epoll_create1"></a>`epoll_create1`

> 📄 `native.linux.vxc` L159-161

```vex
fn epoll_create1(flags: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `flags` | `i32` |  |

**Returns:** `i32`

---

### <a id="epoll_ctl"></a>`epoll_ctl`

> 📄 `native.linux.vxc` L163-165

```vex
fn epoll_ctl(epfd: i32, op: i32, fd: i32, event: Ptr<Opaque>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `epfd` | `i32` |  |
| `op` | `i32` |  |
| `fd` | `i32` |  |
| `event` | `Ptr&lt;Opaque&gt;` |  |

**Returns:** `i32`

---

### <a id="epoll_wait"></a>`epoll_wait`

> 📄 `native.linux.vxc` L167-169

```vex
fn epoll_wait(epfd: i32, events: Ptr<Opaque!>, maxevents: i32, timeout: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `epfd` | `i32` |  |
| `events` | `Ptr&lt;Opaque!&gt;` |  |
| `maxevents` | `i32` |  |
| `timeout` | `i32` |  |

**Returns:** `i32`

---

### <a id="build_ip_port"></a>`build_ip_port`

> 📄 `native.linux.vxc` L183-202

```vex
fn build_ip_port(family: i32, ip: Ptr<u8>, port: u16, output: Ptr<sockaddr_ip!>): u32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |
| `output` | `Ptr&lt;sockaddr_ip!&gt;` |  |

**Returns:** `u32`

---

### <a id="decode_ip_port"></a>`decode_ip_port`

> 📄 `native.linux.vxc` L204-230

```vex
fn decode_ip_port(address: Ptr<sockaddr_ip>, familyOut: Ptr<i32!>, ipOut: Ptr<u8!>, ipCapacity: u64, portOut: Ptr<u16!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `address` | `Ptr&lt;sockaddr_ip&gt;` |  |
| `familyOut` | `Ptr&lt;i32!&gt;` |  |
| `ipOut` | `Ptr&lt;u8!&gt;` |  |
| `ipCapacity` | `u64` |  |
| `portOut` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i32`

---

### <a id="write_ipv4_text"></a>`write_ipv4_text`

> 📄 `native.linux.vxc` L233-260

```vex
fn write_ipv4_text(src: Ptr<u8>, out: Ptr<u8!>, cap: u64)
```

Format the four network-order IPv4 bytes into a bounded C string.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `src` | `Ptr&lt;u8&gt;` |  |
| `out` | `Ptr&lt;u8!&gt;` |  |
| `cap` | `u64` |  |

---

### <a id="parse_ip_port"></a>`parse_ip_port`

> 📄 `native.linux.vxc` L262-287

```vex
fn parse_ip_port(ip: Ptr<u8>, port: u16, addr_out: Ptr<sockaddr_in!>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |
| `addr_out` | `Ptr&lt;sockaddr_in!&gt;` |  |

---

### <a id="vex_net_socket_tcp"></a>`vex_net_socket_tcp` `🔓 export`

> 📄 `native.linux.vxc` L291-301

```vex
export fn vex_net_socket_tcp(ipv6: i32): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i64`

---

### <a id="vex_net_socket_tcp_blocking"></a>`vex_net_socket_tcp_blocking` `🔓 export`

> 📄 `native.linux.vxc` L303-306

```vex
export fn vex_net_socket_tcp_blocking(ipv6: i32): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i64`

---

### <a id="vex_net_socket_udp"></a>`vex_net_socket_udp` `🔓 export`

> 📄 `native.linux.vxc` L308-311

```vex
export fn vex_net_socket_udp(ipv6: i32): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i64`

---

### <a id="vex_net_set_reuseaddr"></a>`vex_net_set_reuseaddr` `🔓 export`

> 📄 `native.linux.vxc` L313-316

```vex
export fn vex_net_set_reuseaddr(fd: i64, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_reuseport"></a>`vex_net_set_reuseport` `🔓 export`

> 📄 `native.linux.vxc` L318-321

```vex
export fn vex_net_set_reuseport(fd: i64, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nonblock"></a>`vex_net_set_nonblock` `🔓 export`

> 📄 `native.linux.vxc` L323-330

```vex
export fn vex_net_set_nonblock(fd: i64, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nodelay"></a>`vex_net_set_nodelay` `🔓 export`

> 📄 `native.linux.vxc` L332-335

```vex
export fn vex_net_set_nodelay(fd: i64, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nopush"></a>`vex_net_set_nopush` `🔓 export`

> 📄 `native.linux.vxc` L337-340

```vex
export fn vex_net_set_nopush(fd: i64, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_bind"></a>`vex_net_bind` `🔓 export`

> 📄 `native.linux.vxc` L342-346

```vex
export fn vex_net_bind(fd: i64, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_bind_ip"></a>`vex_net_bind_ip` `🔓 export`

> 📄 `native.linux.vxc` L348-353

```vex
export fn vex_net_bind_ip(fd: i64, family: i32, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_listen"></a>`vex_net_listen` `🔓 export`

> 📄 `native.linux.vxc` L355-357

```vex
export fn vex_net_listen(fd: i64, backlog: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `backlog` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_connect"></a>`vex_net_connect` `🔓 export`

> 📄 `native.linux.vxc` L359-363

```vex
export fn vex_net_connect(fd: i64, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_connect_ip"></a>`vex_net_connect_ip` `🔓 export`

> 📄 `native.linux.vxc` L365-370

```vex
export fn vex_net_connect_ip(fd: i64, family: i32, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_connect_ip_async"></a>`vex_net_connect_ip_async` `🔓 export`

> 📄 `native.linux.vxc` L372-377

```vex
export fn vex_net_connect_ip_async(fd: i64, family: i32, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_connect_ip_async_context"></a>`vex_net_connect_ip_async_context` `🔓 export`

> 📄 `native.linux.vxc` L379-394

```vex
export fn vex_net_connect_ip_async_context(fd: i64, family: i32, ip: Ptr<u8>, port: u16, contextIdentity: Ptr<Opaque>, deadlineNs: u64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |
| `contextIdentity` | `Ptr&lt;Opaque&gt;` |  |
| `deadlineNs` | `u64` |  |

**Returns:** `i32`

---

### <a id="vex_net_local_addr"></a>`vex_net_local_addr` `🔓 export`

> 📄 `native.linux.vxc` L396-408

```vex
export fn vex_net_local_addr(fd: i64, familyOut: Ptr<i32!>, ipOut: Ptr<u8!>, ipCapacity: u64, portOut: Ptr<u16!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `familyOut` | `Ptr&lt;i32!&gt;` |  |
| `ipOut` | `Ptr&lt;u8!&gt;` |  |
| `ipCapacity` | `u64` |  |
| `portOut` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_peer_addr"></a>`vex_net_peer_addr` `🔓 export`

> 📄 `native.linux.vxc` L410-422

```vex
export fn vex_net_peer_addr(fd: i64, familyOut: Ptr<i32!>, ipOut: Ptr<u8!>, ipCapacity: u64, portOut: Ptr<u16!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `familyOut` | `Ptr&lt;i32!&gt;` |  |
| `ipOut` | `Ptr&lt;u8!&gt;` |  |
| `ipCapacity` | `u64` |  |
| `portOut` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_accept"></a>`vex_net_accept` `🔓 export`

> 📄 `native.linux.vxc` L424-440

```vex
export fn vex_net_accept(fd: i64, ip_out: Ptr<u8!>, ip_len: u64, port_out: Ptr<u16!>): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `ip_out` | `Ptr&lt;u8!&gt;` |  |
| `ip_len` | `u64` |  |
| `port_out` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i64`

---

### <a id="vex_net_recv"></a>`vex_net_recv` `🔓 export`

> 📄 `native.linux.vxc` L442-444

```vex
export fn vex_net_recv(fd: i64, buf: Ptr<u8!>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_recv_peek"></a>`vex_net_recv_peek` `🔓 export`

> 📄 `native.linux.vxc` L446-448

```vex
export fn vex_net_recv_peek(fd: i64, buf: Ptr<u8!>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_send"></a>`vex_net_send` `🔓 export`

> 📄 `native.linux.vxc` L450-452

```vex
export fn vex_net_send(fd: i64, buf: Ptr<u8>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_sendto"></a>`vex_net_sendto` `🔓 export`

> 📄 `native.linux.vxc` L454-458

```vex
export fn vex_net_sendto(fd: i64, buf: Ptr<u8>, len: u64, ip: Ptr<u8>, port: u16): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i64`

---

### <a id="vex_net_sendto_ip"></a>`vex_net_sendto_ip` `🔓 export`

> 📄 `native.linux.vxc` L460-465

```vex
export fn vex_net_sendto_ip(fd: i64, buf: Ptr<u8>, len: u64, family: i32, ip: Ptr<u8>, port: u16): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i64`

---

### <a id="vex_net_sendto_ip_async_context"></a>`vex_net_sendto_ip_async_context` `🔓 export`

> 📄 `native.linux.vxc` L467-476

```vex
export fn vex_net_sendto_ip_async_context(fd: i64, buf: Ptr<u8>, len: u64, family: i32, ip: Ptr<u8>, port: u16, contextIdentity: Ptr<Opaque>, deadlineNs: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |
| `contextIdentity` | `Ptr&lt;Opaque&gt;` |  |
| `deadlineNs` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_recvfrom"></a>`vex_net_recvfrom` `🔓 export`

> 📄 `native.linux.vxc` L478-494

```vex
export fn vex_net_recvfrom(fd: i64, buf: Ptr<u8!>, len: u64, ip_out: Ptr<u8!>, ip_len: u64, port_out: Ptr<u16!>): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |
| `ip_out` | `Ptr&lt;u8!&gt;` |  |
| `ip_len` | `u64` |  |
| `port_out` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i64`

---

### <a id="vex_net_recvfrom_ip"></a>`vex_net_recvfrom_ip` `🔓 export`

> 📄 `native.linux.vxc` L496-512

```vex
export fn vex_net_recvfrom_ip(fd: i64, buf: Ptr<u8!>, len: u64, familyOut: Ptr<i32!>, ipOut: Ptr<u8!>, ipCapacity: u64, portOut: Ptr<u16!>): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |
| `familyOut` | `Ptr&lt;i32!&gt;` |  |
| `ipOut` | `Ptr&lt;u8!&gt;` |  |
| `ipCapacity` | `u64` |  |
| `portOut` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i64`

---

### <a id="vex_net_recvfrom_ip_async_context"></a>`vex_net_recvfrom_ip_async_context` `🔓 export`

> 📄 `native.linux.vxc` L514-536

```vex
export fn vex_net_recvfrom_ip_async_context(fd: i64, buf: Ptr<u8!>, len: u64, familyOut: Ptr<i32!>, ipOut: Ptr<u8!>, ipCapacity: u64, portOut: Ptr<u16!>, contextIdentity: Ptr<Opaque>, deadlineNs: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |
| `familyOut` | `Ptr&lt;i32!&gt;` |  |
| `ipOut` | `Ptr&lt;u8!&gt;` |  |
| `ipCapacity` | `u64` |  |
| `portOut` | `Ptr&lt;u16!&gt;` |  |
| `contextIdentity` | `Ptr&lt;Opaque&gt;` |  |
| `deadlineNs` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_close"></a>`vex_net_close` `🔓 export`

> 📄 `native.linux.vxc` L538-541

```vex
export fn vex_net_close(fd: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |

**Returns:** `i32`

---

### <a id="vex_net_pipe"></a>`vex_net_pipe` `🔓 export`

> 📄 `native.linux.vxc` L543-553

```vex
export fn vex_net_pipe(read_fd: Ptr<i32!>, write_fd: Ptr<i32!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `read_fd` | `Ptr&lt;i32!&gt;` |  |
| `write_fd` | `Ptr&lt;i32!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_loop_create"></a>`vex_net_loop_create` `🔓 export`

> 📄 `native.linux.vxc` L557-564

```vex
export fn vex_net_loop_create(loop_ptr: Ptr<u8!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_loop_close"></a>`vex_net_loop_close` `🔓 export`

> 📄 `native.linux.vxc` L566-569

```vex
export fn vex_net_loop_close(loop_ptr: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_register"></a>`vex_net_register` `🔓 export`

> 📄 `native.linux.vxc` L577-586

```vex
export fn vex_net_register(loop_ptr: Ptr<u8>, fd: i32, events: i32, userdata: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |
| `events` | `i32` |  |
| `userdata` | `i64` |  |

**Returns:** `i32`

---

### <a id="vex_net_modify"></a>`vex_net_modify` `🔓 export`

> 📄 `native.linux.vxc` L588-597

```vex
export fn vex_net_modify(loop_ptr: Ptr<u8>, fd: i32, events: i32, userdata: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |
| `events` | `i32` |  |
| `userdata` | `i64` |  |

**Returns:** `i32`

---

### <a id="vex_net_unregister"></a>`vex_net_unregister` `🔓 export`

> 📄 `native.linux.vxc` L599-602

```vex
export fn vex_net_unregister(loop_ptr: Ptr<u8>, fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_tick"></a>`vex_net_tick` `🔓 export`

> 📄 `native.linux.vxc` L604-638

```vex
export fn vex_net_tick(loop_ptr: Ptr<u8>, out: Ptr<u8!>, cap: i32, timeout_ms: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `out` | `Ptr&lt;u8!&gt;` |  |
| `cap` | `i32` |  |
| `timeout_ms` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_fd_set_nonblock"></a>`vex_fd_set_nonblock` `🔓 export`

> 📄 `native.linux.vxc` L642-644

```vex
export fn vex_fd_set_nonblock(fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_thread_yield"></a>`vex_net_thread_yield` `🔓 export`

> 📄 `native.linux.vxc` L658-660

```vex
export fn vex_net_thread_yield(): i32
```

**Returns:** `i32`

---

### <a id="vex_fd_read"></a>`vex_fd_read` `🔓 export`

> 📄 `native.linux.vxc` L662-664

```vex
export fn vex_fd_read(fd: i32, buf: Ptr<Opaque!>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;Opaque!&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fd_write"></a>`vex_fd_write` `🔓 export`

> 📄 `native.linux.vxc` L666-668

```vex
export fn vex_fd_write(fd: i32, buf: Ptr<Opaque>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;Opaque&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="formatError"></a>`formatError`

> 📄 `address.vx` L42-44

```vex
fn formatError(required: usize, capacity: usize): AddressFormatError
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `required` | `usize` |  |
| `capacity` | `usize` |  |

**Returns:** `AddressFormatError`

---

### <a id="parseError"></a>`parseError`

> 📄 `address.vx` L50-52

```vex
fn parseError(kind: AddressParseErrorKind, position: usize): AddressParseError
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `kind` | `AddressParseErrorKind` |  |
| `position` | `usize` |  |

**Returns:** `AddressParseError`

---

### <a id="Ipv4Addr"></a>`Ipv4Addr` `🔓 export`

> 📄 `address.vx` L76-78

```vex
export fn Ipv4Addr(a: u8, b: u8, c: u8, d: u8): Ipv4Addr
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `u8` |  |
| `b` | `u8` |  |
| `c` | `u8` |  |
| `d` | `u8` |  |

**Returns:** `Ipv4Addr`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Ipv4Addr.unspecified`[↗](#Ipv4Addr.unspecified) | `export fn Ipv4Addr.unspecified(): Ipv4Addr` |  |
| `Ipv4Addr.loopback`[↗](#Ipv4Addr.loopback) | `export fn Ipv4Addr.loopback(): Ipv4Addr` |  |
| `octets`[↗](#Ipv4Addr.octets) | `export fn (self: &amp;Ipv4Addr) octets(): [u8; 4]` |  |
| `family`[↗](#Ipv4Addr.family) | `export fn (self: &amp;Ipv4Addr) family(): IpFamily` |  |
| `isUnspecified`[↗](#Ipv4Addr.isUnspecified) | `export fn (self: &amp;Ipv4Addr) isUnspecified(): bool` |  |
| `isLoopback`[↗](#Ipv4Addr.isLoopback) | `export fn (self: &amp;Ipv4Addr) isLoopback(): bool` |  |
| `op==`[↗](#Ipv4Addr.op==) | `export fn (self: &amp;Ipv4Addr) op==(other: &amp;Ipv4Addr)` |  |
| `copyOctetsTo`[↗](#Ipv4Addr.copyOctetsTo) | `export fn (self: &amp;Ipv4Addr) copyOctetsTo(output: P` | Copies exactly four network-order octets to a native boundary. |
| `Ipv4Addr.tryParse`[↗](#Ipv4Addr.tryParse) | `export fn Ipv4Addr.tryParse(input: str): Result&lt;Ip` |  |
| `textLength`[↗](#Ipv4Addr.textLength) | `export fn (self: &amp;Ipv4Addr) textLength(): usize` | Exact canonical text length without allocating. |
| `tryWriteTo`[↗](#Ipv4Addr.tryWriteTo) | `export fn (self: &amp;Ipv4Addr) tryWriteTo(output: Raw` | Write canonical text into caller-owned storage. Capacity is validated |
| `appendTo`[↗](#Ipv4Addr.appendTo) | `export fn (self: &amp;Ipv4Addr) appendTo(output: &amp;Vec&lt;` | Append canonical text to an owning byte vector. The vector is the safe |
| `toString`[↗](#Ipv4Addr.toString) | `export fn (self: &amp;Ipv4Addr) toString(): string` |  |
| `debug`[↗](#Ipv4Addr.debug) | `export fn (self: &amp;Ipv4Addr) debug(): string` |  |

---

### <a id="SocketAddr"></a>`SocketAddr` `🔓 export`

> 📄 `address.vx` L233-235

```vex
export fn SocketAddr(address: IpAddr, port: u16): SocketAddr
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `address` | `IpAddr` |  |
| `port` | `u16` |  |

**Returns:** `SocketAddr`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `address`[↗](#SocketAddr.address) | `export fn (self: &amp;SocketAddr) address(): IpAddr` |  |
| `port`[↗](#SocketAddr.port) | `export fn (self: &amp;SocketAddr) port(): u16` |  |
| `family`[↗](#SocketAddr.family) | `export fn (self: &amp;SocketAddr) family(): IpFamily` |  |
| `op==`[↗](#SocketAddr.op==) | `export fn (self: &amp;SocketAddr) op==(other: &amp;SocketA` |  |
| `SocketAddr.tryParse`[↗](#SocketAddr.tryParse) | `export fn SocketAddr.tryParse(input: str): Result&lt;` |  |
| `textLength`[↗](#SocketAddr.textLength) | `export fn (self: &amp;SocketAddr) textLength(): usize` | Exact canonical socket-address text length without allocating. |
| `tryWriteTo`[↗](#SocketAddr.tryWriteTo) | `export fn (self: &amp;SocketAddr) tryWriteTo(output: R` | Write canonical text into caller-owned storage. Capacity is validated |
| `appendTo`[↗](#SocketAddr.appendTo) | `export fn (self: &amp;SocketAddr) appendTo(output: &amp;Ve` | Append canonical endpoint text to an owning byte vector. |
| `toString`[↗](#SocketAddr.toString) | `export fn (self: &amp;SocketAddr) toString(): string` |  |
| `debug`[↗](#SocketAddr.debug) | `export fn (self: &amp;SocketAddr) debug(): string` |  |

---

### <a id="byteAt"></a>`byteAt`

> 📄 `address.vx` L245-247

```vex
fn byteAt(input: str, index: usize): u8
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `str` |  |
| `index` | `usize` |  |

**Returns:** `u8`

---

### <a id="decimalDigit"></a>`decimalDigit`

> 📄 `address.vx` L249-249

```vex
fn decimalDigit(valueByte: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `valueByte` | `u8` |  |

**Returns:** `bool`

---

### <a id="hexValue"></a>`hexValue`

> 📄 `address.vx` L251-256

```vex
fn hexValue(valueByte: u8): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `valueByte` | `u8` |  |

**Returns:** `i32`

---

### <a id="parseIpv4Range"></a>`parseIpv4Range`

> 📄 `address.vx` L258-309

```vex
fn parseIpv4Range(input: str, start: usize, end: usize, output: Ptr<u8!>): Result<(), AddressParseError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `str` |  |
| `start` | `usize` |  |
| `end` | `usize` |  |
| `output` | `Ptr&lt;u8!&gt;` |  |

**Returns:** `Result&lt;(), AddressParseError&gt;`

---

### <a id="failedSide"></a>`failedSide`

> 📄 `address.vx` L326-328

```vex
fn failedSide(kind: AddressParseErrorKind, position: usize): ParsedIpv6Side
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `kind` | `AddressParseErrorKind` |  |
| `position` | `usize` |  |

**Returns:** `ParsedIpv6Side`

---

### <a id="parseIpv6Side"></a>`parseIpv6Side`

> 📄 `address.vx` L330-406

```vex
fn parseIpv6Side(input: str, start: usize, end: usize, output: Ptr<u16!>): ParsedIpv6Side
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `str` |  |
| `start` | `usize` |  |
| `end` | `usize` |  |
| `output` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `ParsedIpv6Side`

---

### <a id="parseIpv6Range"></a>`parseIpv6Range`

> 📄 `address.vx` L408-464

```vex
fn parseIpv6Range(input: str, start: usize, end: usize): Result<Ipv6Addr, AddressParseError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `str` |  |
| `start` | `usize` |  |
| `end` | `usize` |  |

**Returns:** `Result&lt;Ipv6Addr, AddressParseError&gt;`

---

### <a id="parsePortRange"></a>`parsePortRange`

> 📄 `address.vx` L487-503

```vex
fn parsePortRange(input: str, start: usize, end: usize): Result<u16, AddressParseError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `str` |  |
| `start` | `usize` |  |
| `end` | `usize` |  |

**Returns:** `Result&lt;u16, AddressParseError&gt;`

---

### <a id="writeByte"></a>`writeByte`

> 📄 `address.vx` L558-561

```vex
fn writeByte(output: Ptr<u8!>, position: &usize!, valueByte: u8)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `output` | `Ptr&lt;u8!&gt;` |  |
| `position` | `&amp;usize!` |  |
| `valueByte` | `u8` |  |

---

### <a id="writeDecimal"></a>`writeDecimal`

> 📄 `address.vx` L563-567

```vex
fn writeDecimal(output: Ptr<u8!>, position: &usize!, value: u16)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `output` | `Ptr&lt;u8!&gt;` |  |
| `position` | `&amp;usize!` |  |
| `value` | `u16` |  |

---

### <a id="decimalLength"></a>`decimalLength`

> 📄 `address.vx` L569-573

```vex
fn decimalLength(value: u16): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `u16` |  |

**Returns:** `usize`

---

### <a id="writePort"></a>`writePort`

> 📄 `address.vx` L575-593

```vex
fn writePort(output: Ptr<u8!>, position: &usize!, value: u16)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `output` | `Ptr&lt;u8!&gt;` |  |
| `position` | `&amp;usize!` |  |
| `value` | `u16` |  |

---

### <a id="writeIpv4"></a>`writeIpv4`

> 📄 `address.vx` L595-602

```vex
fn writeIpv4(address: &Ipv4Addr, output: Ptr<u8!>, position: &usize!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `address` | `&amp;Ipv4Addr` |  |
| `output` | `Ptr&lt;u8!&gt;` |  |
| `position` | `&amp;usize!` |  |

---

### <a id="ipv4TextLength"></a>`ipv4TextLength`

> 📄 `address.vx` L604-610

```vex
fn ipv4TextLength(address: &Ipv4Addr): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `address` | `&amp;Ipv4Addr` |  |

**Returns:** `usize`

---

### <a id="writeHex"></a>`writeHex`

> 📄 `address.vx` L612-623

```vex
fn writeHex(output: Ptr<u8!>, position: &usize!, value: u16)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `output` | `Ptr&lt;u8!&gt;` |  |
| `position` | `&amp;usize!` |  |
| `value` | `u16` |  |

---

### <a id="writeIpv6"></a>`writeIpv6`

> 📄 `address.vx` L625-662

```vex
fn writeIpv6(address: &Ipv6Addr, output: Ptr<u8!>, position: &usize!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `address` | `&amp;Ipv6Addr` |  |
| `output` | `Ptr&lt;u8!&gt;` |  |
| `position` | `&amp;usize!` |  |

---

### <a id="ipv6TextLength"></a>`ipv6TextLength`

> 📄 `address.vx` L664-673

```vex
fn ipv6TextLength(address: &Ipv6Addr): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `address` | `&amp;Ipv6Addr` |  |

**Returns:** `usize`

---

### <a id="portTextLength"></a>`portTextLength`

> 📄 `address.vx` L675-679

```vex
fn portTextLength(value: u16): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `u16` |  |

**Returns:** `usize`

---

### <a id="formatCapacityError"></a>`formatCapacityError`

> 📄 `address.vx` L681-686

```vex
fn formatCapacityError(required: usize, output: RawBuf, capacity: usize): Option<AddressFormatError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `required` | `usize` |  |
| `output` | `RawBuf` |  |
| `capacity` | `usize` |  |

**Returns:** `Option&lt;AddressFormatError&gt;`

---

### <a id="parseIpv4"></a>`parseIpv4` `🔓 export`

> 📄 `ipv4.vx` L5-11

```vex
export fn parseIpv4(address: str, output: Ptr<u8!>): bool
```

Compatibility bridge for the former raw parser. New code should use

`Ipv4Addr.tryParse`; both paths share that canonical parser.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `address` | `str` |  |
| `output` | `Ptr&lt;u8!&gt;` |  |

**Returns:** `bool`

---

### <a id="errorFromNegativeResult"></a>`errorFromNegativeResult` `🔓 export`

> 📄 `error.vx` L7-17

```vex
export fn errorFromNegativeResult(result: i64): IoError
```

Converts the net/VexArch boundary's `-errno` convention into the shared

std/io error model. Native providers normalize their platform error before
crossing this boundary, so no target-name or platform-number checks belong
in std/net.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `result` | `i64` |  |

**Returns:** `IoError`

---

### <a id="closedSocketError"></a>`closedSocketError` `🔓 export`

> 📄 `error.vx` L19-21

```vex
export fn closedSocketError(): IoError
```

**Returns:** `IoError`

---

### <a id="invalidBufferError"></a>`invalidBufferError` `🔓 export`

> 📄 `error.vx` L23-25

```vex
export fn invalidBufferError(): IoError
```

**Returns:** `IoError`

---

### <a id="invalidIpv4AddressError"></a>`invalidIpv4AddressError` `🔓 export`

> 📄 `error.vx` L27-29

```vex
export fn invalidIpv4AddressError(): IoError
```

**Returns:** `IoError`

---

### <a id="invalidIpAddressError"></a>`invalidIpAddressError` `🔓 export`

> 📄 `error.vx` L31-33

```vex
export fn invalidIpAddressError(): IoError
```

**Returns:** `IoError`

---

### <a id="oversizedIoResultError"></a>`oversizedIoResultError` `🔓 export`

> 📄 `error.vx` L35-37

```vex
export fn oversizedIoResultError(): IoError
```

**Returns:** `IoError`

---

### <a id="ensure_wsa"></a>`ensure_wsa`

> 📄 `native.windows.vxc` L35-37

```vex
fn ensure_wsa(): bool
```

**Returns:** `bool`

---

### <a id="map_resolver_status"></a>`map_resolver_status`

> 📄 `native.windows.vxc` L39-45

```vex
fn map_resolver_status(status: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `status` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_resolve_host"></a>`vex_net_resolve_host` `🔓 export`

> 📄 `native.windows.vxc` L47-109

```vex
export fn vex_net_resolve_host(host: Ptr<u8>, family: i32, familiesOut: Ptr<u8!>, addressesOut: Ptr<u8!>, capacity: u64, countOut: Ptr<u64!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `host` | `Ptr&lt;u8&gt;` |  |
| `family` | `i32` |  |
| `familiesOut` | `Ptr&lt;u8!&gt;` |  |
| `addressesOut` | `Ptr&lt;u8!&gt;` |  |
| `capacity` | `u64` |  |
| `countOut` | `Ptr&lt;u64!&gt;` |  |

**Returns:** `i32`

---

### <a id="build_ip_port"></a>`build_ip_port`

> 📄 `native.windows.vxc` L126-145

```vex
fn build_ip_port(family: i32, ip: Ptr<u8>, port: u16, output: Ptr<sockaddr_ip!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |
| `output` | `Ptr&lt;sockaddr_ip!&gt;` |  |

**Returns:** `i32`

---

### <a id="decode_ip_port"></a>`decode_ip_port`

> 📄 `native.windows.vxc` L147-173

```vex
fn decode_ip_port(address: Ptr<sockaddr_ip>, familyOut: Ptr<i32!>, ipOut: Ptr<u8!>, ipCapacity: u64, portOut: Ptr<u16!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `address` | `Ptr&lt;sockaddr_ip&gt;` |  |
| `familyOut` | `Ptr&lt;i32!&gt;` |  |
| `ipOut` | `Ptr&lt;u8!&gt;` |  |
| `ipCapacity` | `u64` |  |
| `portOut` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i32`

---

### <a id="write_ipv4_text"></a>`write_ipv4_text`

> 📄 `native.windows.vxc` L176-203

```vex
fn write_ipv4_text(src: Ptr<u8>, out: Ptr<u8!>, cap: u64)
```

Format the four network-order IPv4 bytes into a bounded C string.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `src` | `Ptr&lt;u8&gt;` |  |
| `out` | `Ptr&lt;u8!&gt;` |  |
| `cap` | `u64` |  |

---

### <a id="parse_ip_port"></a>`parse_ip_port`

> 📄 `native.windows.vxc` L205-219

```vex
fn parse_ip_port(ip: Ptr<u8>, port: u16, addr_out: Ptr<sockaddr_in!>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |
| `addr_out` | `Ptr&lt;sockaddr_in!&gt;` |  |

---

### <a id="negative_socket_error"></a>`negative_socket_error`

> 📄 `native.windows.vxc` L223-225

```vex
fn negative_socket_error(): i64
```

**Returns:** `i64`

---

### <a id="bounded_socket_length"></a>`bounded_socket_length`

> 📄 `native.windows.vxc` L227-229

```vex
fn bounded_socket_length(len: u64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `len` | `u64` |  |

**Returns:** `i32`

---

### <a id="vex_net_socket_tcp"></a>`vex_net_socket_tcp` `🔓 export`

> 📄 `native.windows.vxc` L231-242

```vex
export fn vex_net_socket_tcp(ipv6: i32): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i64`

---

### <a id="vex_net_socket_tcp_blocking"></a>`vex_net_socket_tcp_blocking` `🔓 export`

> 📄 `native.windows.vxc` L244-249

```vex
export fn vex_net_socket_tcp_blocking(ipv6: i32): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i64`

---

### <a id="vex_net_socket_udp"></a>`vex_net_socket_udp` `🔓 export`

> 📄 `native.windows.vxc` L251-256

```vex
export fn vex_net_socket_udp(ipv6: i32): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ipv6` | `i32` |  |

**Returns:** `i64`

---

### <a id="vex_net_set_reuseaddr"></a>`vex_net_set_reuseaddr` `🔓 export`

> 📄 `native.windows.vxc` L258-262

```vex
export fn vex_net_set_reuseaddr(fd: i64, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_reuseport"></a>`vex_net_set_reuseport` `🔓 export`

> 📄 `native.windows.vxc` L264-266

```vex
export fn vex_net_set_reuseport(fd: i64, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nonblock"></a>`vex_net_set_nonblock` `🔓 export`

> 📄 `native.windows.vxc` L268-272

```vex
export fn vex_net_set_nonblock(fd: i64, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nodelay"></a>`vex_net_set_nodelay` `🔓 export`

> 📄 `native.windows.vxc` L274-278

```vex
export fn vex_net_set_nodelay(fd: i64, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_set_nopush"></a>`vex_net_set_nopush` `🔓 export`

> 📄 `native.windows.vxc` L280-284

```vex
export fn vex_net_set_nopush(fd: i64, on: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `on` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_bind"></a>`vex_net_bind` `🔓 export`

> 📄 `native.windows.vxc` L286-291

```vex
export fn vex_net_bind(fd: i64, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_bind_ip"></a>`vex_net_bind_ip` `🔓 export`

> 📄 `native.windows.vxc` L293-299

```vex
export fn vex_net_bind_ip(fd: i64, family: i32, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_listen"></a>`vex_net_listen` `🔓 export`

> 📄 `native.windows.vxc` L301-304

```vex
export fn vex_net_listen(fd: i64, backlog: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `backlog` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_connect"></a>`vex_net_connect` `🔓 export`

> 📄 `native.windows.vxc` L306-311

```vex
export fn vex_net_connect(fd: i64, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_connect_ip"></a>`vex_net_connect_ip` `🔓 export`

> 📄 `native.windows.vxc` L313-319

```vex
export fn vex_net_connect_ip(fd: i64, family: i32, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_connect_ip_async"></a>`vex_net_connect_ip_async` `🔓 export`

> 📄 `native.windows.vxc` L321-326

```vex
export fn vex_net_connect_ip_async(fd: i64, family: i32, ip: Ptr<u8>, port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="vex_net_connect_ip_async_context"></a>`vex_net_connect_ip_async_context` `🔓 export`

> 📄 `native.windows.vxc` L328-343

```vex
export fn vex_net_connect_ip_async_context(fd: i64, family: i32, ip: Ptr<u8>, port: u16, contextIdentity: Ptr<Opaque>, deadlineNs: u64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |
| `contextIdentity` | `Ptr&lt;Opaque&gt;` |  |
| `deadlineNs` | `u64` |  |

**Returns:** `i32`

---

### <a id="vex_net_local_addr"></a>`vex_net_local_addr` `🔓 export`

> 📄 `native.windows.vxc` L345-357

```vex
export fn vex_net_local_addr(fd: i64, familyOut: Ptr<i32!>, ipOut: Ptr<u8!>, ipCapacity: u64, portOut: Ptr<u16!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `familyOut` | `Ptr&lt;i32!&gt;` |  |
| `ipOut` | `Ptr&lt;u8!&gt;` |  |
| `ipCapacity` | `u64` |  |
| `portOut` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_peer_addr"></a>`vex_net_peer_addr` `🔓 export`

> 📄 `native.windows.vxc` L359-371

```vex
export fn vex_net_peer_addr(fd: i64, familyOut: Ptr<i32!>, ipOut: Ptr<u8!>, ipCapacity: u64, portOut: Ptr<u16!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `familyOut` | `Ptr&lt;i32!&gt;` |  |
| `ipOut` | `Ptr&lt;u8!&gt;` |  |
| `ipCapacity` | `u64` |  |
| `portOut` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_accept"></a>`vex_net_accept` `🔓 export`

> 📄 `native.windows.vxc` L373-386

```vex
export fn vex_net_accept(fd: i64, ip_out: Ptr<u8!>, ip_len: u64, port_out: Ptr<u16!>): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `ip_out` | `Ptr&lt;u8!&gt;` |  |
| `ip_len` | `u64` |  |
| `port_out` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i64`

---

### <a id="vex_net_recv"></a>`vex_net_recv` `🔓 export`

> 📄 `native.windows.vxc` L388-391

```vex
export fn vex_net_recv(fd: i64, buf: Ptr<u8!>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_recv_peek"></a>`vex_net_recv_peek` `🔓 export`

> 📄 `native.windows.vxc` L393-396

```vex
export fn vex_net_recv_peek(fd: i64, buf: Ptr<u8!>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_send"></a>`vex_net_send` `🔓 export`

> 📄 `native.windows.vxc` L398-401

```vex
export fn vex_net_send(fd: i64, buf: Ptr<u8>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_sendto"></a>`vex_net_sendto` `🔓 export`

> 📄 `native.windows.vxc` L403-408

```vex
export fn vex_net_sendto(fd: i64, buf: Ptr<u8>, len: u64, ip: Ptr<u8>, port: u16): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i64`

---

### <a id="vex_net_sendto_ip"></a>`vex_net_sendto_ip` `🔓 export`

> 📄 `native.windows.vxc` L410-416

```vex
export fn vex_net_sendto_ip(fd: i64, buf: Ptr<u8>, len: u64, family: i32, ip: Ptr<u8>, port: u16): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |

**Returns:** `i64`

---

### <a id="vex_net_sendto_ip_async_context"></a>`vex_net_sendto_ip_async_context` `🔓 export`

> 📄 `native.windows.vxc` L418-427

```vex
export fn vex_net_sendto_ip_async_context(fd: i64, buf: Ptr<u8>, len: u64, family: i32, ip: Ptr<u8>, port: u16, contextIdentity: Ptr<Opaque>, deadlineNs: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `family` | `i32` |  |
| `ip` | `Ptr&lt;u8&gt;` |  |
| `port` | `u16` |  |
| `contextIdentity` | `Ptr&lt;Opaque&gt;` |  |
| `deadlineNs` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_recvfrom"></a>`vex_net_recvfrom` `🔓 export`

> 📄 `native.windows.vxc` L429-442

```vex
export fn vex_net_recvfrom(fd: i64, buf: Ptr<u8!>, len: u64, ip_out: Ptr<u8!>, ip_len: u64, port_out: Ptr<u16!>): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |
| `ip_out` | `Ptr&lt;u8!&gt;` |  |
| `ip_len` | `u64` |  |
| `port_out` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i64`

---

### <a id="vex_net_recvfrom_ip"></a>`vex_net_recvfrom_ip` `🔓 export`

> 📄 `native.windows.vxc` L444-460

```vex
export fn vex_net_recvfrom_ip(fd: i64, buf: Ptr<u8!>, len: u64, familyOut: Ptr<i32!>, ipOut: Ptr<u8!>, ipCapacity: u64, portOut: Ptr<u16!>): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |
| `familyOut` | `Ptr&lt;i32!&gt;` |  |
| `ipOut` | `Ptr&lt;u8!&gt;` |  |
| `ipCapacity` | `u64` |  |
| `portOut` | `Ptr&lt;u16!&gt;` |  |

**Returns:** `i64`

---

### <a id="vex_net_recvfrom_ip_async_context"></a>`vex_net_recvfrom_ip_async_context` `🔓 export`

> 📄 `native.windows.vxc` L462-484

```vex
export fn vex_net_recvfrom_ip_async_context(fd: i64, buf: Ptr<u8!>, len: u64, familyOut: Ptr<i32!>, ipOut: Ptr<u8!>, ipCapacity: u64, portOut: Ptr<u16!>, contextIdentity: Ptr<Opaque>, deadlineNs: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8!&gt;` |  |
| `len` | `u64` |  |
| `familyOut` | `Ptr&lt;i32!&gt;` |  |
| `ipOut` | `Ptr&lt;u8!&gt;` |  |
| `ipCapacity` | `u64` |  |
| `portOut` | `Ptr&lt;u16!&gt;` |  |
| `contextIdentity` | `Ptr&lt;Opaque&gt;` |  |
| `deadlineNs` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_net_close"></a>`vex_net_close` `🔓 export`

> 📄 `native.windows.vxc` L486-490

```vex
export fn vex_net_close(fd: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |

**Returns:** `i32`

---

### <a id="vex_net_pipe"></a>`vex_net_pipe` `🔓 export`

> 📄 `native.windows.vxc` L492-494

```vex
export fn vex_net_pipe(read_fd: Ptr<i32!>, write_fd: Ptr<i32!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `read_fd` | `Ptr&lt;i32!&gt;` |  |
| `write_fd` | `Ptr&lt;i32!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_loop_create"></a>`vex_net_loop_create` `🔓 export`

> 📄 `native.windows.vxc` L503-505

```vex
export fn vex_net_loop_create(loop_ptr: Ptr<u8!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8!&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_loop_close"></a>`vex_net_loop_close` `🔓 export`

> 📄 `native.windows.vxc` L507-509

```vex
export fn vex_net_loop_close(loop_ptr: Ptr<u8>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |

**Returns:** `i32`

---

### <a id="vex_net_register"></a>`vex_net_register` `🔓 export`

> 📄 `native.windows.vxc` L511-513

```vex
export fn vex_net_register(loop_ptr: Ptr<u8>, fd: i32, events: i32, userdata: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |
| `events` | `i32` |  |
| `userdata` | `i64` |  |

**Returns:** `i32`

---

### <a id="vex_net_modify"></a>`vex_net_modify` `🔓 export`

> 📄 `native.windows.vxc` L515-517

```vex
export fn vex_net_modify(loop_ptr: Ptr<u8>, fd: i32, events: i32, userdata: i64): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |
| `events` | `i32` |  |
| `userdata` | `i64` |  |

**Returns:** `i32`

---

### <a id="vex_net_unregister"></a>`vex_net_unregister` `🔓 export`

> 📄 `native.windows.vxc` L519-521

```vex
export fn vex_net_unregister(loop_ptr: Ptr<u8>, fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_tick"></a>`vex_net_tick` `🔓 export`

> 📄 `native.windows.vxc` L523-525

```vex
export fn vex_net_tick(loop_ptr: Ptr<u8>, out: Ptr<u8!>, cap: i32, timeout_ms: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `loop_ptr` | `Ptr&lt;u8&gt;` |  |
| `out` | `Ptr&lt;u8!&gt;` |  |
| `cap` | `i32` |  |
| `timeout_ms` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_net_thread_yield"></a>`vex_net_thread_yield` `🔓 export`

> 📄 `native.windows.vxc` L527-529

```vex
export fn vex_net_thread_yield(): i32
```

**Returns:** `i32`

---

### <a id="vex_fd_set_nonblock"></a>`vex_fd_set_nonblock` `🔓 export`

> 📄 `native.windows.vxc` L533-535

```vex
export fn vex_fd_set_nonblock(fd: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

**Returns:** `i32`

---

### <a id="vex_fd_write"></a>`vex_fd_write` `🔓 export`

> 📄 `native.windows.vxc` L537-539

```vex
export fn vex_fd_write(fd: i32, buf: Ptr<u8>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fd_read"></a>`vex_fd_read` `🔓 export`

> 📄 `native.windows.vxc` L558-560

```vex
export fn vex_fd_read(fd: i32, buf: Ptr<Opaque!>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;Opaque!&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="vex_fd_write"></a>`vex_fd_write` `🔓 export`

> 📄 `native.windows.vxc` L562-564

```vex
export fn vex_fd_write(fd: i32, buf: Ptr<Opaque>, len: u64): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `buf` | `Ptr&lt;Opaque&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

---

*Generated by vex-doc v2.0 • 2026-08-24*
