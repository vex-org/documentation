# Project v0.0.0

## Overview

**Structs:** [`FixedRedirectResolver`](#FixedRedirectResolver) · [`RecordingSink`](#RecordingSink) · [`FragmentedSource`](#FragmentedSource) · [`DynamicLaneBenchState`](#DynamicLaneBenchState) · [`ResponseAppendState`](#ResponseAppendState) · [`KeepAliveBodySink`](#KeepAliveBodySink) · [`H2BodySink`](#H2BodySink) · [`CollectBody`](#CollectBody) · [`Cookie`](#Cookie) · [`CookiePair`](#CookiePair) · [`CorsConfig`](#CorsConfig) · [`HeaderEntry`](#HeaderEntry) · [`RequestHeaders`](#RequestHeaders) · [`Headers`](#Headers) · [`WsFrame`](#WsFrame) · [`WsMessage`](#WsMessage) · [`H2Priority`](#H2Priority) · [`H2PriorityUpdate`](#H2PriorityUpdate) · [`SfBare`](#SfBare) · [`SfCursor`](#SfCursor) · [`H2PriorityEntry`](#H2PriorityEntry) · [`H2PriorityScheduler`](#H2PriorityScheduler) · [`H2ProtocolConfig`](#H2ProtocolConfig) · [`H2IngressState`](#H2IngressState) · [`H2HeaderFragment`](#H2HeaderFragment) · [`H2HeaderFrameCursor`](#H2HeaderFrameCursor) · [`H2ProtocolState`](#H2ProtocolState) · [`HeaderEntry`](#HeaderEntry) · [`ParserHeaders`](#ParserHeaders) · [`CountingSink`](#CountingSink) · [`LifecycleSink`](#LifecycleSink) · [`CaptureMultipartSink`](#CaptureMultipartSink) · [`H2PrioritySchedulerBenchState`](#H2PrioritySchedulerBenchState) · [`H2ProtocolSchedulerBenchState`](#H2ProtocolSchedulerBenchState) · [`H2ProtocolHeaderBenchState`](#H2ProtocolHeaderBenchState) · [`H2ProtocolPushBenchState`](#H2ProtocolPushBenchState) · [`H2ProtocolReceiveResetBenchState`](#H2ProtocolReceiveResetBenchState) · [`H2ProtocolGoAwayBenchState`](#H2ProtocolGoAwayBenchState) · [`H2ProtocolPingBenchState`](#H2ProtocolPingBenchState) · [`H2ProtocolPriorityBenchState`](#H2ProtocolPriorityBenchState) · [`H2ProtocolIngressBenchState`](#H2ProtocolIngressBenchState) · [`H2ProtocolSendDataBenchState`](#H2ProtocolSendDataBenchState) · [`H2ProtocolRecvDataBenchState`](#H2ProtocolRecvDataBenchState) · [`H2StaticFieldBenchState`](#H2StaticFieldBenchState) · [`CountingBodySink`](#CountingBodySink) · [`FixedBodyBenchState`](#FixedBodyBenchState) · [`DecodedBodyBenchSink`](#DecodedBodyBenchSink) · [`DecodedBodyBenchState`](#DecodedBodyBenchState) · [`BodyRingBenchState`](#BodyRingBenchState) · [`CountingMultipartSink`](#CountingMultipartSink) · [`HpackEncodeBenchState`](#HpackEncodeBenchState) · [`H2FieldSectionInfo`](#H2FieldSectionInfo) · [`MultipartLimits`](#MultipartLimits) · [`MultipartPartInfo`](#MultipartPartInfo) · [`MultipartConsumer`](#MultipartConsumer) · [`MultipartHeaderView`](#MultipartHeaderView) · [`Scanner`](#Scanner) · [`H2Frame`](#H2Frame) · [`H2Settings`](#H2Settings) · [`GoAway`](#GoAway) · [`H2LegacyPriority`](#H2LegacyPriority) · [`BodyProgress`](#BodyProgress) · [`BodyConsumerStart`](#BodyConsumerStart) · [`BodyReader`](#BodyReader) · [`RequestBodyLifecycle`](#RequestBodyLifecycle) · [`DecodedBodyLifecycle`](#DecodedBodyLifecycle) · [`BodyPageRing`](#BodyPageRing) · [`StringBuilderBodySink`](#StringBuilderBodySink) · [`LifecycleBodySink`](#LifecycleBodySink) · [`StaticEntry`](#StaticEntry) · [`DynEntry`](#DynEntry) · [`DynamicTable`](#DynamicTable) · [`HpackHeader`](#HpackHeader) · [`HpackDecodeLimits`](#HpackDecodeLimits) · [`HpackEncodeLimits`](#HpackEncodeLimits) · [`HpackEncoder`](#HpackEncoder) · [`HpackVirtualEntry`](#HpackVirtualEntry) · [`HpackEncodeDecision`](#HpackEncodeDecision) · [`FiberRequestLimits`](#FiberRequestLimits) · [`FiberHeader`](#FiberHeader) · [`FiberParsedRequest`](#FiberParsedRequest) · [`H2ConnectionState`](#H2ConnectionState) · [`ParserRequest`](#ParserRequest) · [`ChunkProgress`](#ChunkProgress) · [`StringBuilderChunkSink`](#StringBuilderChunkSink) · [`ChunkedDecoder`](#ChunkedDecoder) · [`Response`](#Response) · [`H2Stream`](#H2Stream) · [`StreamMap`](#StreamMap) · [`Server`](#Server) · [`ConnBuf`](#ConnBuf) · [`Connection`](#Connection) · [`AdmissionState`](#AdmissionState) · [`WsSessionIdState`](#WsSessionIdState) · [`ConnectionState`](#ConnectionState) · [`Http1SyncProtocolState`](#Http1SyncProtocolState) · [`FullProtocolState`](#FullProtocolState) · [`FiberWsState`](#FiberWsState) · [`AsyncRouteLaunch`](#AsyncRouteLaunch) · [`AsyncRouteTaskInput`](#AsyncRouteTaskInput) · [`AsyncBodyRouteLaunch`](#AsyncBodyRouteLaunch) · [`AsyncBodyRouteTaskInput`](#AsyncBodyRouteTaskInput) · [`AsyncConnectionReturn`](#AsyncConnectionReturn) · [`AsyncReturnLane`](#AsyncReturnLane) · [`H2AsyncTaskCompletion`](#H2AsyncTaskCompletion) · [`H2AsyncRouteTaskInput`](#H2AsyncRouteTaskInput) · [`H2ResponseStreamTaskInput`](#H2ResponseStreamTaskInput) · [`H2AsyncCompletionLane`](#H2AsyncCompletionLane) · [`FullWorkerContext`](#FullWorkerContext) · [`DeferredConnectionQueue`](#DeferredConnectionQueue) · [`AppConfig`](#AppConfig) · [`App`](#App) · [`Group`](#Group) · [`AsyncRouteDef`](#AsyncRouteDef) · [`AsyncBodyRouteDef`](#AsyncBodyRouteDef) · [`WsRouteOptions`](#WsRouteOptions) · [`WsProtocolSelection`](#WsProtocolSelection) · [`FullRouteState`](#FullRouteState) · [`RouteCapabilityState`](#RouteCapabilityState) · [`Router`](#Router) · [`ResponseStreamToken`](#ResponseStreamToken) · [`ResponseStreamWriter`](#ResponseStreamWriter) · [`Ctx`](#Ctx) · [`WsUpgradeScratch`](#WsUpgradeScratch) · [`RouteParam`](#RouteParam) · [`QueryParam`](#QueryParam) · [`LocalEntry`](#LocalEntry) · [`RadixTree`](#RadixTree) · [`MatchResult`](#MatchResult) · [`ParamPair`](#ParamPair) · [`RadixMatch`](#RadixMatch) · [`AsyncPipelineNext`](#AsyncPipelineNext) · [`H2TransportConfig`](#H2TransportConfig) · [`H2AsyncConnectionToken`](#H2AsyncConnectionToken) · [`H2AsyncRequestLaunch`](#H2AsyncRequestLaunch) · [`H2ResponseStreamLaunch`](#H2ResponseStreamLaunch) · [`H2AsyncTaskOwner`](#H2AsyncTaskOwner) · [`H2ResponseStreamTaskOwner`](#H2ResponseStreamTaskOwner) · [`H2ResponseStreamState`](#H2ResponseStreamState) · [`H2TransportSession`](#H2TransportSession) · [`H2ApplicationRequest`](#H2ApplicationRequest) · [`H2FieldOwner`](#H2FieldOwner) · [`H2ApplicationResponse`](#H2ApplicationResponse) · [`H2BufferedApplicationStream`](#H2BufferedApplicationStream) · [`H2DynamicRequest`](#H2DynamicRequest) · [`H2BufferedStreamSet`](#H2BufferedStreamSet) · [`H2BufferedBodySink`](#H2BufferedBodySink) · [`H2ApplicationBody`](#H2ApplicationBody) · [`H2PendingStreamCredit`](#H2PendingStreamCredit) · [`H2ApplicationSession`](#H2ApplicationSession) · [`H2QueuedResponse`](#H2QueuedResponse) · [`H2ActiveHeaders`](#H2ActiveHeaders) · [`H2QueuedBody`](#H2QueuedBody) · [`H2ResponseEgress`](#H2ResponseEgress) · [`AsyncBodyPipelineNext`](#AsyncBodyPipelineNext) · [`RingBodyConsumer`](#RingBodyConsumer) · [`AsyncRequestBody`](#AsyncRequestBody) · [`AsyncBodyTransport`](#AsyncBodyTransport) · [`HttpClientConfig`](#HttpClientConfig) · [`HttpClient`](#HttpClient) · [`HttpRedirectPolicy`](#HttpRedirectPolicy) · [`HttpContentDecoding`](#HttpContentDecoding) · [`ClientResponse`](#ClientResponse) · [`ClientResponseHead`](#ClientResponseHead) · [`HttpSession`](#HttpSession) · [`ClientResponseWorkspace`](#ClientResponseWorkspace) · [`ClientRequest`](#ClientRequest) · [`RedirectStep`](#RedirectStep) · [`ResponseBodyStep`](#ResponseBodyStep) · [`SameOriginRedirectResolver`](#SameOriginRedirectResolver) · [`Request`](#Request) · [`Response`](#Response) · [`ResponseStreamHead`](#ResponseStreamHead) · [`WsMessage`](#WsMessage) · [`WsConn`](#WsConn) · [`WsSession`](#WsSession)

**Enums:** [`WsParseResult`](#WsParseResult) · [`H2PriorityFieldResult`](#H2PriorityFieldResult) · [`H2PriorityUpdateResult`](#H2PriorityUpdateResult) · [`H2PriorityRegistrationResult`](#H2PriorityRegistrationResult) · [`H2ScheduleResult`](#H2ScheduleResult) · [`H2ProtocolFrameResult`](#H2ProtocolFrameResult) · [`H2ReceiveGoAwayResult`](#H2ReceiveGoAwayResult) · [`H2SendGoAwayResult`](#H2SendGoAwayResult) · [`H2ReceivePingResult`](#H2ReceivePingResult) · [`H2SendPingResult`](#H2SendPingResult) · [`H2ReceivePriorityResult`](#H2ReceivePriorityResult) · [`H2SendPriorityResult`](#H2SendPriorityResult) · [`H2ReceiveLegacyPriorityResult`](#H2ReceiveLegacyPriorityResult) · [`H2ProtocolAbortResult`](#H2ProtocolAbortResult) · [`H2HeaderFrameResult`](#H2HeaderFrameResult) · [`H2ReceiveDataResult`](#H2ReceiveDataResult) · [`H2SendDataResult`](#H2SendDataResult) · [`H2SendControlResult`](#H2SendControlResult) · [`H2ReceiveResetResult`](#H2ReceiveResetResult) · [`H2InboundFrameResult`](#H2InboundFrameResult) · [`H2IngressResult`](#H2IngressResult) · [`H2SendResetResult`](#H2SendResetResult) · [`H2SendHeaderResult`](#H2SendHeaderResult) · [`H2SendPushResult`](#H2SendPushResult) · [`H2HeaderFragmentResult`](#H2HeaderFragmentResult) · [`H2AppliedFieldSectionResult`](#H2AppliedFieldSectionResult) · [`MessageFraming`](#MessageFraming) · [`HeaderParseResult`](#HeaderParseResult) · [`H2FieldSectionKind`](#H2FieldSectionKind) · [`H2FieldSectionResult`](#H2FieldSectionResult) · [`MultipartState`](#MultipartState) · [`H2ParseResult`](#H2ParseResult) · [`H2MetadataValidation`](#H2MetadataValidation) · [`H2SettingsUpdateResult`](#H2SettingsUpdateResult) · [`H2GoAwayResult`](#H2GoAwayResult) · [`H2WindowUpdateResult`](#H2WindowUpdateResult) · [`H2RstStreamResult`](#H2RstStreamResult) · [`H2LegacyPriorityResult`](#H2LegacyPriorityResult) · [`H2EncodeResult`](#H2EncodeResult) · [`BodyMode`](#BodyMode) · [`BodyResult`](#BodyResult) · [`BodyConsumerState`](#BodyConsumerState) · [`HpackIntegerResult`](#HpackIntegerResult) · [`HpackIndexing`](#HpackIndexing) · [`HpackResult`](#HpackResult) · [`HpackBlockResult`](#HpackBlockResult) · [`HpackStringResult`](#HpackStringResult) · [`HpackEncodeResult`](#HpackEncodeResult) · [`FiberRequestResult`](#FiberRequestResult) · [`H2EndpointRole`](#H2EndpointRole) · [`H2ConnectionResult`](#H2ConnectionResult) · [`H2FlowResult`](#H2FlowResult) · [`H2StreamAdmissionResult`](#H2StreamAdmissionResult) · [`Method`](#Method) · [`HttpVersion`](#HttpVersion) · [`RequestResult`](#RequestResult) · [`ChunkState`](#ChunkState) · [`ChunkResult`](#ChunkResult) · [`ResponseResult`](#ResponseResult) · [`HuffDecodeResult`](#HuffDecodeResult) · [`StreamState`](#StreamState) · [`StreamError`](#StreamError) · [`ApplicationTransportRequirement`](#ApplicationTransportRequirement) · [`ApplicationDispatchResult`](#ApplicationDispatchResult) · [`H2AsyncTaskResult`](#H2AsyncTaskResult) · [`DispatchResult`](#DispatchResult) · [`ApplicationLane`](#ApplicationLane) · [`ResponseStreamEvent`](#ResponseStreamEvent) · [`H2TransportTurn`](#H2TransportTurn) · [`H2AsyncCompletionResult`](#H2AsyncCompletionResult) · [`H2ResponseStreamResult`](#H2ResponseStreamResult) · [`H2ApplicationRequestResult`](#H2ApplicationRequestResult) · [`H2ApplicationResponseResult`](#H2ApplicationResponseResult) · [`H2BufferedStreamResult`](#H2BufferedStreamResult) · [`H2BufferedDispatchResult`](#H2BufferedDispatchResult) · [`H2BufferedOwnedDispatchResult`](#H2BufferedOwnedDispatchResult) · [`H2BufferedOpenResult`](#H2BufferedOpenResult) · [`H2ApplicationBodyResult`](#H2ApplicationBodyResult) · [`H2ApplicationIngressResult`](#H2ApplicationIngressResult) · [`H2EgressEnqueueResult`](#H2EgressEnqueueResult) · [`H2EgressCancelResult`](#H2EgressCancelResult) · [`H2EgressWriteResult`](#H2EgressWriteResult)

**Contracts:** [`MultipartSink`](#MultipartSink) · [`RequestBodyConsumer`](#RequestBodyConsumer) · [`ChunkSink`](#ChunkSink) · [`BufferedApplicationDispatcher`](#BufferedApplicationDispatcher) · [`HttpRedirectResolver`](#HttpRedirectResolver)

**Functions:** [`makeRequest`](#makeRequest) · [`test_ctx_new`](#test_ctx_new) · [`test_ctx_default_status`](#test_ctx_default_status) · [`test_ctx_method`](#test_ctx_method) · [`test_ctx_path`](#test_ctx_path) · [`test_ctx_body`](#test_ctx_body) · [`test_ctx_header`](#test_ctx_header) · [`test_ctx_content_type`](#test_ctx_content_type) · [`test_ctx_is_json`](#test_ctx_is_json) · [`test_ctx_query_single`](#test_ctx_query_single) · [`test_ctx_query_multiple`](#test_ctx_query_multiple) · [`test_ctx_query_missing`](#test_ctx_query_missing) · [`test_ctx_query_empty`](#test_ctx_query_empty) · [`test_ctx_params_empty`](#test_ctx_params_empty) · [`test_ctx_params_manual_set`](#test_ctx_params_manual_set) · [`test_ctx_params_multiple`](#test_ctx_params_multiple) · [`test_ctx_locals_set_get`](#test_ctx_locals_set_get) · [`test_ctx_locals_missing`](#test_ctx_locals_missing) · [`test_ctx_locals_overwrite`](#test_ctx_locals_overwrite) · [`test_ctx_locals_multiple`](#test_ctx_locals_multiple) · [`test_ctx_status`](#test_ctx_status) · [`test_ctx_type`](#test_ctx_type) · [`test_ctx_set_header`](#test_ctx_set_header) · [`test_ctx_chained_response`](#test_ctx_chained_response) · [`maskedFrame`](#maskedFrame) · [`appendFrame`](#appendFrame) · [`upgradeRequest`](#upgradeRequest) · [`test_ws_session_queues_validated_upgrade_without_direct_write`](#test_ws_session_queues_validated_upgrade_without_direct_write) · [`test_ws_session_keeps_supplied_opaque_identity`](#test_ws_session_keeps_supplied_opaque_identity) · [`test_ws_session_retains_negotiated_subprotocol`](#test_ws_session_retains_negotiated_subprotocol) · [`test_ws_session_queues_arena_safe_validated_key_capability`](#test_ws_session_queues_arena_safe_validated_key_capability) · [`test_ws_session_preserves_fragmented_input_and_emits_one_message`](#test_ws_session_preserves_fragmented_input_and_emits_one_message) · [`test_ws_session_queues_ping_reply_without_sync_socket_write`](#test_ws_session_queues_ping_reply_without_sync_socket_write) · [`test_ws_session_advances_one_frame_per_turn`](#test_ws_session_advances_one_frame_per_turn) · [`test_ws_session_rejects_unmasked_client_input`](#test_ws_session_rejects_unmasked_client_input) · [`test_ws_session_rejects_invalid_outbound_close_payload`](#test_ws_session_rejects_invalid_outbound_close_payload) · [`test_ws_session_echoes_close_then_becomes_drain_only`](#test_ws_session_echoes_close_then_becomes_drain_only) · [`liveH2AsyncHandler`](#liveH2AsyncHandler) · [`test_live_h2_async_route_returns_through_worker_owned_completion_lane`](#test_live_h2_async_route_returns_through_worker_owned_completion_lane) · [`http1SyncHandler`](#http1SyncHandler) · [`reserveHttp1SyncPort`](#reserveHttp1SyncPort) · [`recvHttp1SyncWithin`](#recvHttp1SyncWithin) · [`http1SyncWireContains`](#http1SyncWireContains) · [`test_http1_sync_profile_serves_and_stops_within_bounds`](#test_http1_sync_profile_serves_and_stops_within_bounds) · [`test_response_default_status`](#test_response_default_status) · [`test_response_default_not_sent`](#test_response_default_not_sent) · [`test_response_default_empty_body`](#test_response_default_empty_body) · [`test_send_all_empty_is_a_noop`](#test_send_all_empty_is_a_noop) · [`test_send_all_rejects_null_nonempty_buffer`](#test_send_all_rejects_null_nonempty_buffer) · [`test_response_status_chaining`](#test_response_status_chaining) · [`test_response_content_type`](#test_response_content_type) · [`test_response_header`](#test_response_header) · [`test_response_set_body`](#test_response_set_body) · [`test_response_chained_builder`](#test_response_chained_builder) · [`test_response_status_overwrite`](#test_response_status_overwrite) · [`test_response_multiple_headers`](#test_response_multiple_headers) · [`test_response_header_replace`](#test_response_header_replace) · [`test_response_encode_exact_http11`](#test_response_encode_exact_http11) · [`test_response_encode_reuses_storage`](#test_response_encode_reuses_storage) · [`test_response_stream_headers_frame_exact_body_length`](#test_response_stream_headers_frame_exact_body_length) · [`test_response_bodyless_status_never_frames_or_emits_payload`](#test_response_bodyless_status_never_frames_or_emits_payload) · [`test_response_head_suppresses_bytes_but_preserves_content_length`](#test_response_head_suppresses_bytes_but_preserves_content_length) · [`test_response_stream_headers_report_bodyless_status_and_suppress_stream`](#test_response_stream_headers_report_bodyless_status_and_suppress_stream) · [`test_response_chunked_headers_and_frames_are_canonical`](#test_response_chunked_headers_and_frames_are_canonical) · [`test_response_chunked_head_omits_unknown_length_framing`](#test_response_chunked_head_omits_unknown_length_framing) · [`test_default_content_type_does_not_duplicate_case_variant`](#test_default_content_type_does_not_duplicate_case_variant) · [`test_response_encoder_rejects_injected_or_invalid_headers`](#test_response_encoder_rejects_injected_or_invalid_headers) · [`liveWsOpen`](#liveWsOpen) · [`liveWsMessage`](#liveWsMessage) · [`liveWsClose`](#liveWsClose) · [`reserveWsLoopbackPort`](#reserveWsLoopbackPort) · [`recvWsWithin`](#recvWsWithin) · [`appendWsBytes`](#appendWsBytes) · [`appendMaskedWsText`](#appendMaskedWsText) · [`liveWireContains`](#liveWireContains) · [`liveWireHasEmptyCloseFrame`](#liveWireHasEmptyCloseFrame) · [`test_live_ws_handoff_negotiates_frames_and_drains_close`](#test_live_ws_handoff_negotiates_frames_and_drains_close) · [`h2TransportHandler`](#h2TransportHandler) · [`h2TransportStreamHandler`](#h2TransportStreamHandler) · [`h2TransportAsyncHandler`](#h2TransportAsyncHandler) · [`appendFrame`](#appendFrame) · [`queuedFramesContain`](#queuedFramesContain) · [`queuedFrameCount`](#queuedFrameCount) · [`test_h2_transport_composes_preface_control_dispatch_and_response`](#test_h2_transport_composes_preface_control_dispatch_and_response) · [`test_h2_transport_preface_is_incremental_and_invalid_prefix_fails_closed`](#test_h2_transport_preface_is_incremental_and_invalid_prefix_fails_closed) · [`test_h2_transport_graceful_drain_queues_current_boundary_goaway`](#test_h2_transport_graceful_drain_queues_current_boundary_goaway) · [`test_h2_transport_owns_settings_and_ping_acknowledgements`](#test_h2_transport_owns_settings_and_ping_acknowledgements) · [`test_h2_transport_returns_data_credit_before_terminal_response`](#test_h2_transport_returns_data_credit_before_terminal_response) · [`test_h2_transport_stream_route_is_bounded_by_wire_acknowledgements`](#test_h2_transport_stream_route_is_bounded_by_wire_acknowledgements) · [`test_h2_transport_peer_reset_cancels_stream_producer_and_rejects_stale_events`](#test_h2_transport_peer_reset_cancels_stream_producer_and_rejects_stale_events) · [`test_h2_transport_abort_cancels_running_stream_producer`](#test_h2_transport_abort_cancels_running_stream_producer) · [`test_h2_transport_async_request_keeps_descriptor_and_commits_task_response`](#test_h2_transport_async_request_keeps_descriptor_and_commits_task_response) · [`test_h2_transport_peer_reset_cancels_task_and_rejects_late_completion`](#test_h2_transport_peer_reset_cancels_task_and_rejects_late_completion) · [`test_h2_transport_deadline_paths_retain_terminal_goaway`](#test_h2_transport_deadline_paths_retain_terminal_goaway) · [`test_h2_transport_rejects_request_before_initial_peer_settings`](#test_h2_transport_rejects_request_before_initial_peer_settings) · [`test_connbuf_new`](#test_connbuf_new) · [`test_connbuf_advance`](#test_connbuf_advance) · [`test_connbuf_consume`](#test_connbuf_consume) · [`test_connbuf_consume_all_resets`](#test_connbuf_consume_all_resets) · [`test_connbuf_compact`](#test_connbuf_compact) · [`test_connbuf_compact_noop_at_zero`](#test_connbuf_compact_noop_at_zero) · [`test_connbuf_free_space`](#test_connbuf_free_space) · [`test_connbuf_grow`](#test_connbuf_grow) · [`test_connbuf_reset`](#test_connbuf_reset) · [`test_connection_new`](#test_connection_new) · [`test_connection_reset`](#test_connection_reset) · [`test_connection_find_header_end_empty`](#test_connection_find_header_end_empty) · [`test_connection_find_header_end_partial`](#test_connection_find_header_end_partial) · [`test_connection_find_header_end_complete`](#test_connection_find_header_end_complete) · [`test_connection_consume_request`](#test_connection_consume_request) · [`test_response_header_and_body`](#test_response_header_and_body) · [`test_status_2xx_values`](#test_status_2xx_values) · [`test_status_3xx_values`](#test_status_3xx_values) · [`test_status_4xx_values`](#test_status_4xx_values) · [`test_status_5xx_values`](#test_status_5xx_values) · [`test_status_text_2xx`](#test_status_text_2xx) · [`test_status_text_3xx`](#test_status_text_3xx) · [`test_status_text_4xx`](#test_status_text_4xx) · [`test_status_text_5xx`](#test_status_text_5xx) · [`test_status_text_unknown`](#test_status_text_unknown) · [`test_status_content_semantics`](#test_status_content_semantics) · [`dummyRequest`](#dummyRequest) · [`dummyHandler`](#dummyHandler) · [`asyncDummyHandler`](#asyncDummyHandler) · [`asyncBodyDummyHandler`](#asyncBodyDummyHandler) · [`test_static_route_match`](#test_static_route_match) · [`test_static_route_no_match`](#test_static_route_no_match) · [`test_method_mismatch`](#test_method_mismatch) · [`test_multiple_methods_same_path`](#test_multiple_methods_same_path) · [`test_param_route_match`](#test_param_route_match) · [`test_param_route_multiple_params`](#test_param_route_multiple_params) · [`test_param_route_string_value`](#test_param_route_string_value) · [`test_dynamic_hot_cache_replays_params`](#test_dynamic_hot_cache_replays_params) · [`test_frozen_router_extracts_params`](#test_frozen_router_extracts_params) · [`routeMiddleware`](#routeMiddleware) · [`test_route_middleware_does_not_accumulate_on_reused_context`](#test_route_middleware_does_not_accumulate_on_reused_context) · [`test_wildcard_route`](#test_wildcard_route) · [`test_wildcard_single_segment`](#test_wildcard_single_segment) · [`test_static_before_param`](#test_static_before_param) · [`test_trailing_slash_stripped`](#test_trailing_slash_stripped) · [`test_root_path`](#test_root_path) · [`test_too_few_segments`](#test_too_few_segments) · [`test_too_many_segments`](#test_too_many_segments) · [`test_frozen_async_route_uses_structural_route_identity`](#test_frozen_async_route_uses_structural_route_identity) · [`test_frozen_async_body_route_uses_structural_route_identity`](#test_frozen_async_body_route_uses_structural_route_identity) · [`makeReq`](#makeReq) · [`setupTestFiles`](#setupTestFiles) · [`cleanupTestFiles`](#cleanupTestFiles) · [`test_static_files_serving`](#test_static_files_serving) · [`test_static_files_group`](#test_static_files_group) · [`test_new_headers_empty`](#test_new_headers_empty) · [`test_set_and_get`](#test_set_and_get) · [`test_get_missing_returns_empty`](#test_get_missing_returns_empty) · [`test_has_existing`](#test_has_existing) · [`test_has_missing`](#test_has_missing) · [`test_get_case_insensitive`](#test_get_case_insensitive) · [`test_has_case_insensitive`](#test_has_case_insensitive) · [`test_set_replaces_case_insensitive`](#test_set_replaces_case_insensitive) · [`test_set_replaces_value`](#test_set_replaces_value) · [`test_add_allows_duplicates`](#test_add_allows_duplicates) · [`test_add_does_not_replace`](#test_add_does_not_replace) · [`test_del_removes_all_matching`](#test_del_removes_all_matching) · [`test_del_case_insensitive`](#test_del_case_insensitive) · [`test_del_nonexistent_noop`](#test_del_nonexistent_noop) · [`test_multiple_headers`](#test_multiple_headers) · [`test_empty_value`](#test_empty_value) · [`test_header_with_special_chars`](#test_header_with_special_chars) · [`liveH2StreamHandler`](#liveH2StreamHandler) · [`test_live_h2_stream_route_obeys_worker_owned_backpressure_and_shutdown`](#test_live_h2_stream_route_obeys_worker_owned_backpressure_and_shutdown) · [`liveH2SlowAsyncHandler`](#liveH2SlowAsyncHandler) · [`test_live_h2_peer_reset_rejects_late_task_result_and_keeps_connection`](#test_live_h2_peer_reset_rejects_late_task_result_and_keeps_connection) · [`makeReq`](#makeReq) · [`stubHandler`](#stubHandler) · [`notFoundStub`](#notFoundStub) · [`streamStub`](#streamStub) · [`wsStub`](#wsStub) · [`wsOpenStub`](#wsOpenStub) · [`wsCloseStub`](#wsCloseStub) · [`asyncStub`](#asyncStub) · [`asyncBodyStub`](#asyncBodyStub) · [`test_app_new`](#test_app_new) · [`test_app_uses_explicit_config`](#test_app_uses_explicit_config) · [`test_app_get_registers_route`](#test_app_get_registers_route) · [`test_app_post_registers_route`](#test_app_post_registers_route) · [`test_app_async_route_registers_structural_metadata`](#test_app_async_route_registers_structural_metadata) · [`test_app_async_routes_cover_all_http_methods`](#test_app_async_routes_cover_all_http_methods) · [`test_app_request_body_stream_registers_early_handoff_metadata`](#test_app_request_body_stream_registers_early_handoff_metadata) · [`test_group_request_body_stream_inherits_only_async_body_middleware`](#test_group_request_body_stream_inherits_only_async_body_middleware) · [`test_frozen_patch_route_keeps_parameter_capture`](#test_frozen_patch_route_keeps_parameter_capture) · [`test_app_get_stream_registers_route_and_preserves_endpoint_metadata`](#test_app_get_stream_registers_route_and_preserves_endpoint_metadata) · [`test_app_head_stream_falls_back_to_get_metadata`](#test_app_head_stream_falls_back_to_get_metadata) · [`test_app_ws_registers_frozen_get_route_metadata`](#test_app_ws_registers_frozen_get_route_metadata) · [`test_app_ws_lifecycle_metadata_survives_frozen_lookup`](#test_app_ws_lifecycle_metadata_survives_frozen_lookup) · [`test_group_ws_preserves_group_middleware`](#test_group_ws_preserves_group_middleware) · [`test_group_ws_lifecycle_preserves_prefix_and_hooks`](#test_group_ws_lifecycle_preserves_prefix_and_hooks) · [`test_ws_route_selects_server_preference_without_request_allocation`](#test_ws_route_selects_server_preference_without_request_allocation) · [`test_group_ws_required_subprotocol_rejects_no_overlap`](#test_group_ws_required_subprotocol_rejects_no_overlap) · [`test_stream_route_keeps_route_middleware_when_frozen`](#test_stream_route_keeps_route_middleware_when_frozen) · [`test_repeated_freeze_keeps_one_route_middleware_source`](#test_repeated_freeze_keeps_one_route_middleware_source) · [`test_app_multiple_routes`](#test_app_multiple_routes) · [`test_app_all_registers_seven`](#test_app_all_registers_seven) · [`test_app_use_middleware`](#test_app_use_middleware) · [`test_app_multiple_middlewares`](#test_app_multiple_middlewares) · [`groupMiddleware`](#groupMiddleware) · [`test_group_middleware_is_attached_to_route`](#test_group_middleware_is_attached_to_route) · [`test_nested_group_inherits_parent_middleware_when_frozen`](#test_nested_group_inherits_parent_middleware_when_frozen) · [`test_group_static_preserves_root_and_middleware_when_frozen`](#test_group_static_preserves_root_and_middleware_when_frozen) · [`test_app_router_finds_get`](#test_app_router_finds_get) · [`test_app_router_param_extraction`](#test_app_router_param_extraction) · [`test_app_router_method_mismatch`](#test_app_router_method_mismatch) · [`test_app_set_not_found`](#test_app_set_not_found) · [`test_app_patch_route`](#test_app_patch_route) · [`test_app_head_route`](#test_app_head_route) · [`test_app_head_falls_back_to_get_route`](#test_app_head_falls_back_to_get_route) · [`test_frozen_router_head_falls_back_to_get_route`](#test_frozen_router_head_falls_back_to_get_route) · [`test_app_explicit_head_overrides_get_route`](#test_app_explicit_head_overrides_get_route) · [`test_app_options_route`](#test_app_options_route) · [`test_buffered_dispatch_reports_transport_owned_route_lanes`](#test_buffered_dispatch_reports_transport_owned_route_lanes) · [`test_buffered_dispatch_requires_frozen_valid_context`](#test_buffered_dispatch_requires_frozen_valid_context) · [`request`](#request) · [`outer`](#outer) · [`inner`](#inner) · [`endpoint`](#endpoint) · [`doubleNext`](#doubleNext) · [`test_async_pipeline_preserves_nested_middleware_order`](#test_async_pipeline_preserves_nested_middleware_order) · [`test_async_pipeline_never_replays_a_successor`](#test_async_pipeline_never_replays_a_successor) · [`liveH2Handler`](#liveH2Handler) · [`test_live_h2_prior_knowledge_dispatches_and_drains_binary_response`](#test_live_h2_prior_knowledge_dispatches_and_drains_binary_response) · [`byteString`](#byteString) · [`compressedResponse`](#compressedResponse) · [`loopbackListener`](#loopbackListener) · [`test_client_defaults_are_bounded`](#test_client_defaults_are_bounded) · [`test_client_request_builder`](#test_client_request_builder) · [`test_client_streaming_request_rejects_ambiguous_and_oversized_length`](#test_client_streaming_request_rejects_ambiguous_and_oversized_length) · [`test_client_rejects_transport_header_at_every_position`](#test_client_rejects_transport_header_at_every_position) · [`test_client_rejects_malformed_virtual_host_before_connect`](#test_client_rejects_malformed_virtual_host_before_connect) · [`clientRequestFailsInvalid`](#clientRequestFailsInvalid) · [`test_client_rejects_duplicate_host_and_wrong_request_target_forms`](#test_client_rejects_duplicate_host_and_wrong_request_target_forms) · [`test_client_session_reuses_only_a_proven_http11_boundary`](#test_client_session_reuses_only_a_proven_http11_boundary) · [`test_client_async_fragmented_content_length_roundtrip`](#test_client_async_fragmented_content_length_roundtrip) · [`test_client_decodes_chunked_response`](#test_client_decodes_chunked_response) · [`test_client_preserves_fragmented_chunk_framing`](#test_client_preserves_fragmented_chunk_framing) · [`test_client_streams_chunked_response_into_async_writer`](#test_client_streams_chunked_response_into_async_writer) · [`test_client_rejects_http_10_transfer_encoding`](#test_client_rejects_http_10_transfer_encoding) · [`test_client_rejects_response_header_limit`](#test_client_rejects_response_header_limit) · [`test_client_rejects_ambiguous_response_framing`](#test_client_rejects_ambiguous_response_framing) · [`test_client_rejects_protocol_upgrade_without_handoff`](#test_client_rejects_protocol_upgrade_without_handoff) · [`test_client_consumes_bounded_informational_chain_and_reuses_session`](#test_client_consumes_bounded_informational_chain_and_reuses_session) · [`test_client_rejects_excessive_informational_responses`](#test_client_rejects_excessive_informational_responses) · [`test_client_head_ignores_representational_length_and_reuses_session`](#test_client_head_ignores_representational_length_and_reuses_session) · [`test_client_205_zero_chunk_preserves_session_boundary`](#test_client_205_zero_chunk_preserves_session_boundary) · [`test_client_rejects_nonempty_205_body`](#test_client_rejects_nonempty_205_body) · [`test_client_rejects_successful_connect_without_handoff`](#test_client_rejects_successful_connect_without_handoff) · [`test_client_context_timeout_interrupts_response_read`](#test_client_context_timeout_interrupts_response_read) · [`test_client_session_streams_fragmented_request_then_reuses_boundary`](#test_client_session_streams_fragmented_request_then_reuses_boundary) · [`test_client_streaming_request_short_source_invalidates_session`](#test_client_streaming_request_short_source_invalidates_session) · [`serveStatelessStreamingExchange`](#serveStatelessStreamingExchange) · [`test_stateless_client_streams_request_with_both_response_modes`](#test_stateless_client_streams_request_with_both_response_modes) · [`test_client_follows_relative_303_and_rewrites_buffered_post`](#test_client_follows_relative_303_and_rewrites_buffered_post) · [`test_client_cross_origin_307_uses_resolver_and_strips_credentials`](#test_client_cross_origin_307_uses_resolver_and_strips_credentials) · [`test_client_redirect_limit_fails_before_third_connection`](#test_client_redirect_limit_fails_before_third_connection) · [`redirectFailureKind`](#redirectFailureKind) · [`test_client_redirects_fail_closed_on_unsafe_boundaries`](#test_client_redirects_fail_closed_on_unsafe_boundaries) · [`assertDecodedResponse`](#assertDecodedResponse) · [`test_client_decodes_all_advertised_content_codings`](#test_client_decodes_all_advertised_content_codings) · [`test_client_content_decoding_roundtrips_binary_http_body`](#test_client_content_decoding_roundtrips_binary_http_body) · [`test_client_decodes_content_encoding_chain_in_reverse_order`](#test_client_decodes_content_encoding_chain_in_reverse_order) · [`test_client_content_decoding_limit_and_errors_are_atomic`](#test_client_content_decoding_limit_and_errors_are_atomic) · [`benchReq`](#benchReq) · [`noop`](#noop) · [`streamNoop`](#streamNoop) · [`prepareReusedRouteCtx`](#prepareReusedRouteCtx) · [`bench_sanity`](#bench_sanity) · [`bench_headers_set_get`](#bench_headers_set_get) · [`bench_headers_case_insensitive`](#bench_headers_case_insensitive) · [`bench_headers_has`](#bench_headers_has) · [`bench_status_text_lookup`](#bench_status_text_lookup) · [`bench_router_static_match`](#bench_router_static_match) · [`bench_router_param_match`](#bench_router_param_match) · [`bench_router_multi_param_match`](#bench_router_multi_param_match) · [`bench_router_miss`](#bench_router_miss) · [`bench_router_static_match_reused_ctx`](#bench_router_static_match_reused_ctx) · [`bench_router_param_match_reused_ctx`](#bench_router_param_match_reused_ctx) · [`bench_router_miss_reused_ctx`](#bench_router_miss_reused_ctx) · [`bench_buffered_dynamic_lane_reused_ctx`](#bench_buffered_dynamic_lane_reused_ctx) · [`bench_response_builder`](#bench_response_builder) · [`bench_response_encode_reuse`](#bench_response_encode_reuse) · [`bench_response_append_encoded_reused`](#bench_response_append_encoded_reused) · [`bench_ctx_new`](#bench_ctx_new) · [`bench_ctx_with_query`](#bench_ctx_with_query) · [`bench_ctx_locals`](#bench_ctx_locals) · [`assertRejected`](#assertRejected) · [`assertBothRejected`](#assertBothRejected) · [`test_rejects_conflicting_content_length`](#test_rejects_conflicting_content_length) · [`test_rejects_identical_duplicate_content_length`](#test_rejects_identical_duplicate_content_length) · [`test_rejects_content_length_transfer_encoding`](#test_rejects_content_length_transfer_encoding) · [`test_rejects_unsupported_transfer_encoding`](#test_rejects_unsupported_transfer_encoding) · [`test_rejects_transfer_encoding_substring`](#test_rejects_transfer_encoding_substring) · [`test_rejects_duplicate_transfer_encoding`](#test_rejects_duplicate_transfer_encoding) · [`test_accepts_exact_chunked_transfer_encoding`](#test_accepts_exact_chunked_transfer_encoding) · [`test_rejects_http_10_transfer_encoding`](#test_rejects_http_10_transfer_encoding) · [`test_rejects_invalid_content_length`](#test_rejects_invalid_content_length) · [`test_rejects_obs_fold`](#test_rejects_obs_fold) · [`test_rejects_whitespace_before_colon`](#test_rejects_whitespace_before_colon) · [`test_requires_host_for_http_11`](#test_requires_host_for_http_11) · [`test_rejects_duplicate_host`](#test_rejects_duplicate_host) · [`test_http_10_does_not_require_host`](#test_http_10_does_not_require_host) · [`test_canonical_parser_rejects_conflicting_framing`](#test_canonical_parser_rejects_conflicting_framing) · [`test_canonical_parser_accepts_chunked_without_length`](#test_canonical_parser_accepts_chunked_without_length) · [`test_server_parser_bounds_header_count`](#test_server_parser_bounds_header_count) · [`test_configured_header_count_is_enforced`](#test_configured_header_count_is_enforced) · [`test_configured_header_bytes_are_enforced`](#test_configured_header_bytes_are_enforced) · [`test_header_limit_does_not_count_body_bytes`](#test_header_limit_does_not_count_body_bytes) · [`test_rejects_lowercase_http_version_on_both_paths`](#test_rejects_lowercase_http_version_on_both_paths) · [`test_rejects_control_byte_in_target_on_both_paths`](#test_rejects_control_byte_in_target_on_both_paths) · [`test_fiber_connection_tokens_are_list_aware_and_close_wins`](#test_fiber_connection_tokens_are_list_aware_and_close_wins) · [`test_fiber_http10_connection_keep_alive_token_is_honored`](#test_fiber_http10_connection_keep_alive_token_is_honored) · [`test_rejects_host_userinfo_and_path_on_both_paths`](#test_rejects_host_userinfo_and_path_on_both_paths) · [`test_rejects_invalid_host_ports_on_both_paths`](#test_rejects_invalid_host_ports_on_both_paths) · [`test_accepts_bracketed_host_literal_with_port_on_both_paths`](#test_accepts_bracketed_host_literal_with_port_on_both_paths) · [`test_bracketed_host_literals_use_uri_ip_literal_grammar`](#test_bracketed_host_literals_use_uri_ip_literal_grammar) · [`test_ip_literal_authority_acceptance_is_shared`](#test_ip_literal_authority_acceptance_is_shared) · [`streamedUpload`](#streamedUpload) · [`secondRequest`](#secondRequest) · [`reserveLoopbackPort`](#reserveLoopbackPort) · [`recvWithin`](#recvWithin) · [`test_streamed_request_returns_socket_and_pipeline_suffix_to_fiber`](#test_streamed_request_returns_socket_and_pipeline_suffix_to_fiber) · [`validUpgradeRequest`](#validUpgradeRequest) · [`test_ws_upgrade_accepts_valid_rfc6455_handshake`](#test_ws_upgrade_accepts_valid_rfc6455_handshake) · [`test_ws_upgrade_rejects_invalid_key_and_protocol_shape`](#test_ws_upgrade_rejects_invalid_key_and_protocol_shape) · [`test_ws_upgrade_rejects_ambiguous_security_headers`](#test_ws_upgrade_rejects_ambiguous_security_headers) · [`test_ws_upgrade_rejects_http_body_framing`](#test_ws_upgrade_rejects_http_body_framing) · [`test_ws_subprotocol_offer_is_strict_and_response_selects_exact_token`](#test_ws_subprotocol_offer_is_strict_and_response_selects_exact_token) · [`test_ws_subprotocol_offer_rejects_ambiguous_or_malformed_lists`](#test_ws_subprotocol_offer_rejects_ambiguous_or_malformed_lists) · [`test_ws_validated_key_capability_builds_exact_arena_safe_response`](#test_ws_validated_key_capability_builds_exact_arena_safe_response) · [`dummyHandler`](#dummyHandler) · [`assertMatch`](#assertMatch) · [`assertNoMatch`](#assertNoMatch) · [`assertParam`](#assertParam) · [`test_radix_static_root`](#test_radix_static_root) · [`test_radix_static_simple`](#test_radix_static_simple) · [`test_radix_static_deep`](#test_radix_static_deep) · [`test_radix_static_no_match`](#test_radix_static_no_match) · [`test_radix_static_prefix_not_match`](#test_radix_static_prefix_not_match) · [`test_radix_static_segment_boundary_not_match`](#test_radix_static_segment_boundary_not_match) · [`test_radix_multiple_static`](#test_radix_multiple_static) · [`test_radix_shared_prefix`](#test_radix_shared_prefix) · [`test_radix_split_at_divergence`](#test_radix_split_at_divergence) · [`test_radix_param_single`](#test_radix_param_single) · [`test_radix_param_multiple`](#test_radix_param_multiple) · [`test_radix_replaced_structural_route_uses_winning_param_name`](#test_radix_replaced_structural_route_uses_winning_param_name) · [`test_radix_param_string_value`](#test_radix_param_string_value) · [`test_radix_param_no_match_missing`](#test_radix_param_no_match_missing) · [`test_radix_wildcard_multi_segment`](#test_radix_wildcard_multi_segment) · [`test_radix_wildcard_single_segment`](#test_radix_wildcard_single_segment) · [`test_radix_wildcard_empty`](#test_radix_wildcard_empty) · [`test_radix_priority_static_over_param`](#test_radix_priority_static_over_param) · [`test_radix_priority_param_over_wildcard`](#test_radix_priority_param_over_wildcard) · [`test_radix_trailing_slash`](#test_radix_trailing_slash) · [`test_radix_too_few_segments`](#test_radix_too_few_segments) · [`test_radix_too_many_segments`](#test_radix_too_many_segments) · [`test_radix_mixed_routes`](#test_radix_mixed_routes) · [`requestFields`](#requestFields) · [`requestFieldsWithLength`](#requestFieldsWithLength) · [`newBodySink`](#newBodySink) · [`validatedInfo`](#validatedInfo) · [`bufferedRequest`](#bufferedRequest) · [`fieldValue`](#fieldValue) · [`h2StreamingResponseStub`](#h2StreamingResponseStub) · [`terminalResponse`](#terminalResponse) · [`streamingResponseHead`](#streamingResponseHead) · [`h2ApplicationMiddleware`](#h2ApplicationMiddleware) · [`h2ApplicationHandler`](#h2ApplicationHandler) · [`h2BufferedEchoHandler`](#h2BufferedEchoHandler) · [`test_h2_application_request_moves_validated_fields_into_common_ctx`](#test_h2_application_request_moves_validated_fields_into_common_ctx) · [`test_h2_application_request_rejects_non_request_section_without_moving_it`](#test_h2_application_request_rejects_non_request_section_without_moving_it) · [`test_h2_application_body_streams_fragmented_data_through_shared_lifecycle`](#test_h2_application_body_streams_fragmented_data_through_shared_lifecycle) · [`test_h2_application_body_fails_closed_on_length_or_stream_mismatch`](#test_h2_application_body_fails_closed_on_length_or_stream_mismatch) · [`test_h2_protocol_headers_and_data_reach_one_application_lifecycle`](#test_h2_protocol_headers_and_data_reach_one_application_lifecycle) · [`test_h2_application_response_moves_body_and_normalizes_headers`](#test_h2_application_response_moves_body_and_normalizes_headers) · [`test_h2_request_dispatches_through_shared_app_and_response_boundary`](#test_h2_request_dispatches_through_shared_app_and_response_boundary) · [`test_h2_buffered_stream_owns_fragmented_body_dispatch_and_response`](#test_h2_buffered_stream_owns_fragmented_body_dispatch_and_response) · [`test_h2_buffered_stream_cancellation_is_terminal_and_idempotent`](#test_h2_buffered_stream_cancellation_is_terminal_and_idempotent) · [`test_h2_buffered_stream_set_bounds_duplicates_dispatch_and_abort`](#test_h2_buffered_stream_set_bounds_duplicates_dispatch_and_abort) · [`test_h2_application_response_preserves_head_length_without_payload`](#test_h2_application_response_preserves_head_length_without_payload) · [`test_h2_application_response_commits_through_protocol_header_owner`](#test_h2_application_response_commits_through_protocol_header_owner) · [`test_h2_application_session_owns_dispatch_and_credit_until_wire_commit`](#test_h2_application_session_owns_dispatch_and_credit_until_wire_commit) · [`test_h2_dynamic_route_refusal_retires_owner_and_preserves_connection_credit`](#test_h2_dynamic_route_refusal_retires_owner_and_preserves_connection_credit) · [`test_h2_application_session_binds_receive_error_to_exact_reset`](#test_h2_application_session_binds_receive_error_to_exact_reset) · [`test_h2_response_egress_serializes_windowed_frames`](#test_h2_response_egress_serializes_windowed_frames) · [`test_h2_response_egress_cancellation_preserves_hpack_connection_state`](#test_h2_response_egress_cancellation_preserves_hpack_connection_state) · [`test_h2_response_egress_streams_one_backpressured_chunk_at_a_time`](#test_h2_response_egress_streams_one_backpressured_chunk_at_a_time) · [`loopbackListener`](#loopbackListener) · [`test_async_request_body_consumes_initial_fixed_body_once`](#test_async_request_body_consumes_initial_fixed_body_once) · [`test_async_request_body_streams_fragmented_chunked_tail`](#test_async_request_body_streams_fragmented_chunked_tail) · [`test_async_request_body_deadline_cancels_partial_framed_body`](#test_async_request_body_deadline_cancels_partial_framed_body) · [`handler`](#handler) · [`main`](#main) · [`handler`](#handler) · [`main`](#main) · [`main`](#main) · [`main`](#main) · [`indexHandler`](#indexHandler) · [`jsonHandler`](#jsonHandler) · [`healthHandler`](#healthHandler) · [`userHandler`](#userHandler) · [`echoHandler`](#echoHandler) · [`cookieSetHandler`](#cookieSetHandler) · [`cookieGetHandler`](#cookieGetHandler) · [`apiStatusHandler`](#apiStatusHandler) · [`apiUserHandler`](#apiUserHandler) · [`loggerMiddleware`](#loggerMiddleware) · [`errorHandler`](#errorHandler) · [`notFoundHandler`](#notFoundHandler) · [`main`](#main) · [`pingHandler`](#pingHandler) · [`jsonHandler`](#jsonHandler) · [`plainHandler`](#plainHandler) · [`healthHandler`](#healthHandler) · [`hello`](#hello) · [`main`](#main) · [`main`](#main) · [`indexHandler`](#indexHandler) · [`helloHandler`](#helloHandler) · [`jsonHandler`](#jsonHandler) · [`healthHandler`](#healthHandler) · [`reserveH2LoopbackPort`](#reserveH2LoopbackPort) · [`recvH2Within`](#recvH2Within) · [`appendH2Bytes`](#appendH2Bytes) · [`appendH2Frame`](#appendH2Frame) · [`liveH2HasFrame`](#liveH2HasFrame) · [`liveH2HasStreamFrame`](#liveH2HasStreamFrame) · [`liveH2HasPingAck`](#liveH2HasPingAck) · [`liveH2StreamDataContains`](#liveH2StreamDataContains) · [`liveH2StreamEnded`](#liveH2StreamEnded) · [`connectH2Loopback`](#connectH2Loopback) · [`liveH2Exchange`](#liveH2Exchange) · [`liveH2ResetExchange`](#liveH2ResetExchange) · [`parseCookies`](#parseCookies) · [`trimStr`](#trimStr) · [`cors`](#cors) · [`corsWithOrigin`](#corsWithOrigin) · [`logger`](#logger) · [`headerEqCI`](#headerEqCI) · [`statusText`](#statusText) · [`statusAllowsContent`](#statusAllowsContent) · [`isValidOpcode`](#isValidOpcode) · [`parseFrame`](#parseFrame) · [`applyMask`](#applyMask) · [`encodedFrameSize`](#encodedFrameSize) · [`encodeFrameHeader`](#encodeFrameHeader) · [`sfOther`](#sfOther) · [`sfIsLowerAlpha`](#sfIsLowerAlpha) · [`sfIsUpperAlpha`](#sfIsUpperAlpha) · [`sfIsDigit`](#sfIsDigit) · [`sfIsKeyStart`](#sfIsKeyStart) · [`sfIsKeyChar`](#sfIsKeyChar) · [`sfIsTokenStart`](#sfIsTokenStart) · [`sfIsTokenChar`](#sfIsTokenChar) · [`sfIsBase64Data`](#sfIsBase64Data) · [`parseH2PriorityFieldWithLimit`](#parseH2PriorityFieldWithLimit) · [`parseH2PriorityField`](#parseH2PriorityField) · [`parseH2PriorityUpdateWithLimit`](#parseH2PriorityUpdateWithLimit) · [`parseH2PriorityUpdate`](#parseH2PriorityUpdate) · [`encodeH2PriorityUpdate`](#encodeH2PriorityUpdate) · [`schedulerBetterStarved`](#schedulerBetterStarved) · [`schedulerBetterNormal`](#schedulerBetterNormal) · [`copySettings`](#copySettings) · [`protocolControlResult`](#protocolControlResult) · [`protocolReceiveStreamError`](#protocolReceiveStreamError) · [`protocolSendStreamError`](#protocolSendStreamError) · [`copyConnectionState`](#copyConnectionState) · [`stageSentFieldSection`](#stageSentFieldSection) · [`pingToken`](#pingToken) · [`settingsPayloadError`](#settingsPayloadError) · [`read31`](#read31) · [`headerFragment`](#headerFragment) · [`advanceMessageFraming`](#advanceMessageFraming) · [`hasHeaderToken`](#hasHeaderToken) · [`isValidHostAuthority`](#isValidHostAuthority) · [`isValidHostPort`](#isValidHostPort) · [`isValidHostRegName`](#isValidHostRegName) · [`isValidIpLiteral`](#isValidIpLiteral) · [`isAsciiHex`](#isAsciiHex) · [`isValidIpvFuture`](#isValidIpvFuture) · [`isValidIpv4Address`](#isValidIpv4Address) · [`isValidIpv6Segment`](#isValidIpv6Segment) · [`isValidIpv6Address`](#isValidIpv6Address) · [`parseHeaders`](#parseHeaders) · [`main`](#main) · [`newLifecycleSink`](#newLifecycleSink) · [`test_body_content_length_preserves_pipeline_suffix`](#test_body_content_length_preserves_pipeline_suffix) · [`test_body_content_length_fragmented`](#test_body_content_length_fragmented) · [`test_body_content_length_limit_is_fail_closed`](#test_body_content_length_limit_is_fail_closed) · [`test_body_no_body_consumes_nothing`](#test_body_no_body_consumes_nothing) · [`test_body_chunked_uses_canonical_decoder`](#test_body_chunked_uses_canonical_decoder) · [`test_body_until_close_is_bounded`](#test_body_until_close_is_bounded) · [`test_body_reader_reset_reuses_state`](#test_body_reader_reset_reuses_state) · [`test_body_reader_streams_fixed_body_to_borrowed_sink`](#test_body_reader_streams_fixed_body_to_borrowed_sink) · [`test_body_reader_streams_fragmented_chunked_body_to_borrowed_sink`](#test_body_reader_streams_fragmented_chunked_body_to_borrowed_sink) · [`test_body_reader_rejecting_sink_fails_closed`](#test_body_reader_rejecting_sink_fails_closed) · [`test_request_body_lifecycle_finishes_once_and_preserves_suffix`](#test_request_body_lifecycle_finishes_once_and_preserves_suffix) · [`test_request_body_lifecycle_rejection_cancels_once`](#test_request_body_lifecycle_rejection_cancels_once) · [`test_request_body_lifecycle_eof_cancels_framed_body`](#test_request_body_lifecycle_eof_cancels_framed_body) · [`test_request_body_lifecycle_rejected_begin_is_terminal`](#test_request_body_lifecycle_rejected_begin_is_terminal) · [`test_request_body_lifecycle_until_close_finishes_at_eof`](#test_request_body_lifecycle_until_close_finishes_at_eof) · [`test_body_page_ring_is_fixed_and_wraps_at_page_boundaries`](#test_body_page_ring_is_fixed_and_wraps_at_page_boundaries) · [`test_body_page_ring_rejects_overflow_without_partial_mutation`](#test_body_page_ring_rejects_overflow_without_partial_mutation) · [`test_body_page_ring_direct_reservation_requires_bounded_commit`](#test_body_page_ring_direct_reservation_requires_bounded_commit) · [`feedMultipartOneByte`](#feedMultipartOneByte) · [`test_multipart_boundary_is_owned_strict_and_unambiguous`](#test_multipart_boundary_is_owned_strict_and_unambiguous) · [`test_multipart_streams_fragmented_parts_and_preserves_false_markers`](#test_multipart_streams_fragmented_parts_and_preserves_false_markers) · [`test_multipart_truncation_cancels_once`](#test_multipart_truncation_cancels_once) · [`test_multipart_part_limit_fails_closed`](#test_multipart_part_limit_fails_closed) · [`test_multipart_header_budget_rejects_before_unbounded_growth`](#test_multipart_header_budget_rejects_before_unbounded_growth) · [`test_chunked_complete_preserves_pipeline_suffix`](#test_chunked_complete_preserves_pipeline_suffix) · [`test_chunked_fragmented_size_data_and_crlf`](#test_chunked_fragmented_size_data_and_crlf) · [`test_chunked_fragmented_multi_chunk_trailer_and_pipeline`](#test_chunked_fragmented_multi_chunk_trailer_and_pipeline) · [`test_chunked_extension_and_trailer`](#test_chunked_extension_and_trailer) · [`test_chunked_rejects_forbidden_trailer`](#test_chunked_rejects_forbidden_trailer) · [`test_chunked_rejects_invalid_size_suffix`](#test_chunked_rejects_invalid_size_suffix) · [`test_chunked_enforces_decoded_body_limit_before_write`](#test_chunked_enforces_decoded_body_limit_before_write) · [`test_chunked_empty_and_reset`](#test_chunked_empty_and_reset) · [`wb`](#wb) · [`mkstr`](#mkstr) · [`copyStr`](#copyStr) · [`writeH2Header`](#writeH2Header) · [`test_h2_parse_data_frame`](#test_h2_parse_data_frame) · [`test_h2_parse_headers_frame`](#test_h2_parse_headers_frame) · [`test_h2_parse_settings_frame`](#test_h2_parse_settings_frame) · [`test_h2_parse_settings_ack`](#test_h2_parse_settings_ack) · [`test_h2_parse_ping_frame`](#test_h2_parse_ping_frame) · [`test_h2_parse_goaway_frame`](#test_h2_parse_goaway_frame) · [`test_h2_parse_window_update`](#test_h2_parse_window_update) · [`test_h2_need_more_short`](#test_h2_need_more_short) · [`test_h2_need_more_empty`](#test_h2_need_more_empty) · [`test_h2_frame_flags`](#test_h2_frame_flags) · [`test_h2_rejects_connection_data_frame`](#test_h2_rejects_connection_data_frame) · [`test_h2_rejects_settings_ack_payload`](#test_h2_rejects_settings_ack_payload) · [`test_h2_enforces_negotiated_frame_size`](#test_h2_enforces_negotiated_frame_size) · [`test_h2_parse_error_scope_matches_rfc_9113`](#test_h2_parse_error_scope_matches_rfc_9113) · [`test_h2_parse_separates_local_config_from_peer_errors`](#test_h2_parse_separates_local_config_from_peer_errors) · [`test_h2_settings_defaults`](#test_h2_settings_defaults) · [`test_h2_parse_settings_payload`](#test_h2_parse_settings_payload) · [`test_h2_parse_settings_update_preserves_omitted_values_and_wire_order`](#test_h2_parse_settings_update_preserves_omitted_values_and_wire_order) · [`test_h2_parse_settings_invalid_len`](#test_h2_parse_settings_invalid_len) · [`test_h2_parse_settings_is_transactional`](#test_h2_parse_settings_is_transactional) · [`test_h2_parse_settings_rejects_invalid_window_and_frame_size`](#test_h2_parse_settings_rejects_invalid_window_and_frame_size) · [`test_h2_parse_goaway_payload`](#test_h2_parse_goaway_payload) · [`test_h2_parse_goaway_with_debug`](#test_h2_parse_goaway_with_debug) · [`test_h2_parse_goaway_rejects_truncation`](#test_h2_parse_goaway_rejects_truncation) · [`test_h2_parse_window_update_is_typed_and_strict`](#test_h2_parse_window_update_is_typed_and_strict) · [`test_h2_parse_rst_stream_preserves_open_error_code_space`](#test_h2_parse_rst_stream_preserves_open_error_code_space) · [`test_h2_encode_header_validates_before_write`](#test_h2_encode_header_validates_before_write) · [`test_h2_encode_settings_frame_is_complete`](#test_h2_encode_settings_frame_is_complete) · [`test_h2_encode_selected_settings_omits_role_forbidden_defaults`](#test_h2_encode_selected_settings_omits_role_forbidden_defaults) · [`test_h2_encode_settings_rejects_small_output_atomically`](#test_h2_encode_settings_rejects_small_output_atomically) · [`test_h2_encode_control_frame_boundaries`](#test_h2_encode_control_frame_boundaries) · [`test_h2_frame_header_size`](#test_h2_frame_header_size) · [`test_h2_frame_types`](#test_h2_frame_types) · [`test_h2_error_codes`](#test_h2_error_codes) · [`test_find_crlf_simd`](#test_find_crlf_simd) · [`test_scanner_not_found_uses_usize_sentinel`](#test_scanner_not_found_uses_usize_sentinel) · [`test_scanner_fixed_simd_block_scalar_tail_boundary`](#test_scanner_fixed_simd_block_scalar_tail_boundary) · [`protocol`](#protocol) · [`frame`](#frame) · [`payloadFrame`](#payloadFrame) · [`bytes`](#bytes) · [`wireFrame`](#wireFrame) · [`concatBytes`](#concatBytes) · [`windowPayload`](#windowPayload) · [`goAwayPayload`](#goAwayPayload) · [`priorityPayload`](#priorityPayload) · [`receivePriority`](#receivePriority) · [`requestFields`](#requestFields) · [`responseFields`](#responseFields) · [`sendRequestHeaders`](#sendRequestHeaders) · [`sendResponseHeaders`](#sendResponseHeaders) · [`pushServer`](#pushServer) · [`test_h2_protocol_configuration_is_bounded_and_validated`](#test_h2_protocol_configuration_is_bounded_and_validated) · [`test_h2_protocol_inbound_dispatch_owns_new_stream_admission`](#test_h2_protocol_inbound_dispatch_owns_new_stream_admission) · [`test_h2_protocol_refused_headers_still_advance_hpack_before_slot_reuse`](#test_h2_protocol_refused_headers_still_advance_hpack_before_slot_reuse) · [`test_h2_protocol_inbound_dispatch_routes_control_extension_and_header_lock`](#test_h2_protocol_inbound_dispatch_routes_control_extension_and_header_lock) · [`test_h2_protocol_ingress_retains_partial_valid_frame_without_copying`](#test_h2_protocol_ingress_retains_partial_valid_frame_without_copying) · [`test_h2_protocol_ingress_stream_discards_rejected_payload_incrementally`](#test_h2_protocol_ingress_stream_discards_rejected_payload_incrementally) · [`test_h2_protocol_abort_clears_pending_ingress_discard`](#test_h2_protocol_abort_clears_pending_ingress_discard) · [`test_h2_protocol_unifies_active_and_idle_priority_capacity`](#test_h2_protocol_unifies_active_and_idle_priority_capacity) · [`test_h2_protocol_discards_unknown_extensions_without_bypassing_header_lock`](#test_h2_protocol_discards_unknown_extensions_without_bypassing_header_lock) · [`test_h2_protocol_prunes_priorities_for_implicitly_closed_idle_ids`](#test_h2_protocol_prunes_priorities_for_implicitly_closed_idle_ids) · [`test_h2_protocol_local_admission_and_idle_cancellation_are_atomic`](#test_h2_protocol_local_admission_and_idle_cancellation_are_atomic) · [`test_h2_protocol_active_reset_commits_wire_and_scheduler_atomically`](#test_h2_protocol_active_reset_commits_wire_and_scheduler_atomically) · [`test_h2_protocol_receive_stream_error_retains_exact_wire_reset_obligation`](#test_h2_protocol_receive_stream_error_retains_exact_wire_reset_obligation) · [`test_h2_protocol_received_reset_owns_payload_idle_scope_and_bypass`](#test_h2_protocol_received_reset_owns_payload_idle_scope_and_bypass) · [`test_h2_protocol_malformed_reset_is_terminal_without_partial_retirement`](#test_h2_protocol_malformed_reset_is_terminal_without_partial_retirement) · [`test_h2_protocol_frame_transitions_are_transactional_and_retire_naturally`](#test_h2_protocol_frame_transitions_are_transactional_and_retire_naturally) · [`test_h2_protocol_data_owner_strips_padding_and_charges_complete_payload`](#test_h2_protocol_data_owner_strips_padding_and_charges_complete_payload) · [`test_h2_protocol_data_send_commits_padding_flow_and_state_together`](#test_h2_protocol_data_send_commits_padding_flow_and_state_together) · [`test_h2_protocol_malformed_data_payload_fails_connection_without_partial_stream_state`](#test_h2_protocol_malformed_data_payload_fails_connection_without_partial_stream_state) · [`test_h2_protocol_missing_data_pad_length_is_stream_scoped_and_sequenced`](#test_h2_protocol_missing_data_pad_length_is_stream_scoped_and_sequenced) · [`contentLengthRequestFrame`](#contentLengthRequestFrame) · [`test_h2_protocol_content_length_tracks_application_data_not_padding`](#test_h2_protocol_content_length_tracks_application_data_not_padding) · [`test_h2_protocol_outgoing_content_length_is_atomic_with_data_commit`](#test_h2_protocol_outgoing_content_length_is_atomic_with_data_commit) · [`test_h2_protocol_discarded_closed_stream_data_preserves_connection_flow`](#test_h2_protocol_discarded_closed_stream_data_preserves_connection_flow) · [`test_h2_protocol_window_update_owner_is_scoped_atomic_and_unbypassable`](#test_h2_protocol_window_update_owner_is_scoped_atomic_and_unbypassable) · [`test_h2_protocol_flow_control_parks_and_wakes_pending_work`](#test_h2_protocol_flow_control_parks_and_wakes_pending_work) · [`test_h2_protocol_connection_credit_gates_all_pending_streams`](#test_h2_protocol_connection_credit_gates_all_pending_streams) · [`test_h2_protocol_goaway_retires_work_outside_processed_boundaries`](#test_h2_protocol_goaway_retires_work_outside_processed_boundaries) · [`test_h2_protocol_goaway_shape_and_boundary_fail_connection_atomically`](#test_h2_protocol_goaway_shape_and_boundary_fail_connection_atomically) · [`test_h2_protocol_ping_owner_is_bounded_correlated_and_unbypassable`](#test_h2_protocol_ping_owner_is_bounded_correlated_and_unbypassable) · [`test_h2_protocol_ping_shape_and_interleaving_fail_connection`](#test_h2_protocol_ping_shape_and_interleaving_fail_connection) · [`test_h2_protocol_priority_update_owns_wire_scheduler_and_direction`](#test_h2_protocol_priority_update_owns_wire_scheduler_and_direction) · [`test_h2_protocol_priority_update_malformed_direction_and_interleaving_fail_closed`](#test_h2_protocol_priority_update_malformed_direction_and_interleaving_fail_closed) · [`test_h2_protocol_legacy_priority_is_exact_compatible_and_unbypassable`](#test_h2_protocol_legacy_priority_is_exact_compatible_and_unbypassable) · [`test_h2_protocol_legacy_priority_preserves_error_scope_and_header_lock`](#test_h2_protocol_legacy_priority_preserves_error_scope_and_header_lock) · [`test_h2_protocol_abort_revokes_every_stream_and_lease_once`](#test_h2_protocol_abort_revokes_every_stream_and_lease_once) · [`test_h2_protocol_reassembles_headers_and_retains_dynamic_table`](#test_h2_protocol_reassembles_headers_and_retains_dynamic_table) · [`test_h2_protocol_peer_cannot_open_locally_owned_idle_stream`](#test_h2_protocol_peer_cannot_open_locally_owned_idle_stream) · [`test_h2_protocol_strips_header_padding_and_priority_metadata`](#test_h2_protocol_strips_header_padding_and_priority_metadata) · [`test_h2_protocol_headers_legacy_self_dependency_is_delayed_stream_error`](#test_h2_protocol_headers_legacy_self_dependency_is_delayed_stream_error) · [`test_h2_protocol_header_limits_and_payload_shape_fail_closed`](#test_h2_protocol_header_limits_and_payload_shape_fail_closed) · [`test_h2_protocol_compression_error_is_connection_terminal`](#test_h2_protocol_compression_error_is_connection_terminal) · [`test_h2_protocol_malformed_fields_are_stream_scoped_after_hpack_decode`](#test_h2_protocol_malformed_fields_are_stream_scoped_after_hpack_decode) · [`test_h2_protocol_tracks_informational_final_and_trailer_phases`](#test_h2_protocol_tracks_informational_final_and_trailer_phases) · [`test_h2_protocol_malformed_push_consumes_and_retires_promised_stream`](#test_h2_protocol_malformed_push_consumes_and_retires_promised_stream) · [`test_h2_protocol_stream_error_still_advances_shared_hpack_context`](#test_h2_protocol_stream_error_still_advances_shared_hpack_context) · [`test_h2_protocol_push_promise_reserves_peer_stream_atomically`](#test_h2_protocol_push_promise_reserves_peer_stream_atomically) · [`test_h2_protocol_settings_apply_peer_values_and_ack_fifo`](#test_h2_protocol_settings_apply_peer_values_and_ack_fifo) · [`test_h2_protocol_acknowledged_hpack_reduction_is_enforced_at_block_boundary`](#test_h2_protocol_acknowledged_hpack_reduction_is_enforced_at_block_boundary) · [`test_h2_protocol_local_settings_bound_remote_admission_after_ack`](#test_h2_protocol_local_settings_bound_remote_admission_after_ack) · [`test_h2_protocol_settings_queue_is_bounded_and_generic_apis_cannot_bypass_it`](#test_h2_protocol_settings_queue_is_bounded_and_generic_apis_cannot_bypass_it) · [`test_h2_protocol_acknowledged_push_disable_is_terminal_for_push_promise`](#test_h2_protocol_acknowledged_push_disable_is_terminal_for_push_promise) · [`test_h2_protocol_unexpected_settings_ack_is_connection_terminal`](#test_h2_protocol_unexpected_settings_ack_is_connection_terminal) · [`test_h2_protocol_invalid_initial_window_uses_flow_control_error`](#test_h2_protocol_invalid_initial_window_uses_flow_control_error) · [`test_h2_protocol_send_header_owner_commits_semantics_and_hpack_together`](#test_h2_protocol_send_header_owner_commits_semantics_and_hpack_together) · [`test_h2_protocol_peer_table_setting_drives_next_outbound_block`](#test_h2_protocol_peer_table_setting_drives_next_outbound_block) · [`test_h2_protocol_send_response_tracks_informational_final_and_trailers`](#test_h2_protocol_send_response_tracks_informational_final_and_trailers) · [`test_h2_protocol_outbound_header_cursor_fragments_without_copying`](#test_h2_protocol_outbound_header_cursor_fragments_without_copying) · [`test_h2_protocol_send_push_promise_commits_reservation_and_prefix`](#test_h2_protocol_send_push_promise_commits_reservation_and_prefix) · [`test_h2_protocol_push_cursor_reserves_prefix_before_fragmenting`](#test_h2_protocol_push_cursor_reserves_prefix_before_fragmenting) · [`test_h2_protocol_failed_push_restores_id_slot_scheduler_and_hpack`](#test_h2_protocol_failed_push_restores_id_slot_scheduler_and_hpack) · [`test_h2_protocol_send_push_obeys_direction_setting_and_semantics`](#test_h2_protocol_send_push_obeys_direction_setting_and_semantics) · [`frame`](#frame) · [`goAway`](#goAway) · [`clientState`](#clientState) · [`test_h2_connection_reassembles_one_stream_header_block`](#test_h2_connection_reassembles_one_stream_header_block) · [`test_h2_connection_rejects_interleaving_without_losing_lock`](#test_h2_connection_rejects_interleaving_without_losing_lock) · [`test_h2_connection_send_and_receive_locks_are_independent`](#test_h2_connection_send_and_receive_locks_are_independent) · [`test_h2_connection_tracks_settings_acknowledgements`](#test_h2_connection_tracks_settings_acknowledgements) · [`test_h2_connection_goaway_last_stream_id_never_increases`](#test_h2_connection_goaway_last_stream_id_never_increases) · [`test_h2_connection_rejects_orphan_continuation`](#test_h2_connection_rejects_orphan_continuation) · [`test_h2_priority_update_direction_is_client_only`](#test_h2_priority_update_direction_is_client_only) · [`test_h2_priority_update_buffers_idle_requests_under_one_capacity_owner`](#test_h2_priority_update_buffers_idle_requests_under_one_capacity_owner) · [`test_h2_priority_update_rejects_unpromised_push_and_discards_closed`](#test_h2_priority_update_rejects_unpromised_push_and_discards_closed) · [`test_h2_priority_update_discards_closed_targets_after_slot_reuse`](#test_h2_priority_update_discards_closed_targets_after_slot_reuse) · [`test_h2_admission_assigns_role_owned_stream_ids`](#test_h2_admission_assigns_role_owned_stream_ids) · [`test_h2_admission_enforces_peer_parity_and_monotonicity`](#test_h2_admission_enforces_peer_parity_and_monotonicity) · [`test_h2_admission_never_reopens_a_closed_peer_stream`](#test_h2_admission_never_reopens_a_closed_peer_stream) · [`test_h2_admission_consumes_refused_peer_ids_without_partial_local_open`](#test_h2_admission_consumes_refused_peer_ids_without_partial_local_open) · [`test_h2_goaway_drains_local_work_and_bounds_remote_admission`](#test_h2_goaway_drains_local_work_and_bounds_remote_admission) · [`test_h2_local_stream_id_exhaustion_is_terminal_and_non_wrapping`](#test_h2_local_stream_id_exhaustion_is_terminal_and_non_wrapping) · [`openStream`](#openStream) · [`test_h2_flow_reserves_connection_and_stream_atomically`](#test_h2_flow_reserves_connection_and_stream_atomically) · [`test_h2_flow_receive_violation_is_scoped_and_atomic`](#test_h2_flow_receive_violation_is_scoped_and_atomic) · [`test_h2_flow_window_updates_check_overflow_before_mutation`](#test_h2_flow_window_updates_check_overflow_before_mutation) · [`wb`](#wb) · [`bytes`](#bytes) · [`test_huffman_rfc_non_ascii_codes`](#test_huffman_rfc_non_ascii_codes) · [`test_huffman_round_trip_full_octet_range_samples`](#test_huffman_round_trip_full_octet_range_samples) · [`test_huffman_rejects_invalid_padding`](#test_huffman_rejects_invalid_padding) · [`test_huffman_enforces_output_capacity`](#test_huffman_enforces_output_capacity) · [`wb`](#wb) · [`bytes`](#bytes) · [`priority`](#priority) · [`test_h2_priority_parses_defaults_and_known_parameters`](#test_h2_priority_parses_defaults_and_known_parameters) · [`test_h2_priority_validates_structured_fields_and_ignores_extensions`](#test_h2_priority_validates_structured_fields_and_ignores_extensions) · [`test_h2_priority_update_payload_is_typed_and_strict`](#test_h2_priority_update_payload_is_typed_and_strict) · [`test_h2_priority_update_encoder_is_canonical_and_atomic`](#test_h2_priority_update_encoder_is_canonical_and_atomic) · [`test_h2_priority_scheduler_obeys_urgency_and_selection_lease`](#test_h2_priority_scheduler_obeys_urgency_and_selection_lease) · [`test_h2_priority_scheduler_serializes_nonincremental_and_rotates_incremental`](#test_h2_priority_scheduler_serializes_nonincremental_and_rotates_incremental) · [`test_h2_priority_scheduler_bounds_starvation_and_idle_capacity`](#test_h2_priority_scheduler_bounds_starvation_and_idle_capacity) · [`test_h2_priority_scheduler_cancellation_repairs_or_revokes_leases`](#test_h2_priority_scheduler_cancellation_repairs_or_revokes_leases) · [`wb`](#wb) · [`mkstr`](#mkstr) · [`copyStr`](#copyStr) · [`test_ws_parse_text_frame`](#test_ws_parse_text_frame) · [`test_ws_parse_binary_frame`](#test_ws_parse_binary_frame) · [`test_ws_parse_close_frame`](#test_ws_parse_close_frame) · [`test_ws_parse_ping_frame`](#test_ws_parse_ping_frame) · [`test_ws_parse_pong_frame`](#test_ws_parse_pong_frame) · [`test_ws_parse_masked_frame`](#test_ws_parse_masked_frame) · [`test_ws_parse_16bit_length`](#test_ws_parse_16bit_length) · [`test_ws_need_more_short`](#test_ws_need_more_short) · [`test_ws_need_more_empty`](#test_ws_need_more_empty) · [`test_ws_control_frame_too_large`](#test_ws_control_frame_too_large) · [`test_ws_frame_methods`](#test_ws_frame_methods) · [`test_ws_rsv_bits`](#test_ws_rsv_bits) · [`test_ws_rejects_reserved_opcode_and_invalid_control_shape`](#test_ws_rejects_reserved_opcode_and_invalid_control_shape) · [`test_ws_rejects_noncanonical_extended_lengths`](#test_ws_rejects_noncanonical_extended_lengths) · [`test_ws_encoded_frame_size`](#test_ws_encoded_frame_size) · [`test_ws_message_single`](#test_ws_message_single) · [`test_ws_message_reset`](#test_ws_message_reset) · [`test_ws_message_enforces_fragment_sequence`](#test_ws_message_enforces_fragment_sequence) · [`test_ws_close_codes`](#test_ws_close_codes) · [`wb`](#wb) · [`mkstr`](#mkstr) · [`copyStr`](#copyStr) · [`benchRequestFields`](#benchRequestFields) · [`benchResponseFields`](#benchResponseFields) · [`bench_parse_get_simple`](#bench_parse_get_simple) · [`bench_parse_get_with_headers`](#bench_parse_get_with_headers) · [`bench_parse_post_with_body`](#bench_parse_post_with_body) · [`bench_parse_response_200`](#bench_parse_response_200) · [`bench_parse_response_with_many_headers`](#bench_parse_response_with_many_headers) · [`bench_parseDecimal`](#bench_parseDecimal) · [`bench_parseHex`](#bench_parseHex) · [`bench_eqCaseInsensitive`](#bench_eqCaseInsensitive) · [`bench_ws_parse_text_frame`](#bench_ws_parse_text_frame) · [`bench_h2_parse_data_frame`](#bench_h2_parse_data_frame) · [`bench_h2_priority_field_parse`](#bench_h2_priority_field_parse) · [`bench_h2_priority_scheduler_32_ready`](#bench_h2_priority_scheduler_32_ready) · [`bench_h2_protocol_scheduler_32_writable`](#bench_h2_protocol_scheduler_32_writable) · [`bench_h2_protocol_receive_static_header`](#bench_h2_protocol_receive_static_header) · [`bench_h2_protocol_push_lifecycle`](#bench_h2_protocol_push_lifecycle) · [`bench_h2_protocol_receive_reset_lifecycle`](#bench_h2_protocol_receive_reset_lifecycle) · [`bench_h2_protocol_receive_goaway_turn`](#bench_h2_protocol_receive_goaway_turn) · [`bench_h2_protocol_ping_round_trip`](#bench_h2_protocol_ping_round_trip) · [`bench_h2_protocol_inbound_dispatch_priority_update`](#bench_h2_protocol_inbound_dispatch_priority_update) · [`bench_h2_protocol_ingress_priority_update`](#bench_h2_protocol_ingress_priority_update) · [`bench_h2_protocol_send_data_turn`](#bench_h2_protocol_send_data_turn) · [`bench_h2_protocol_receive_data_turn`](#bench_h2_protocol_receive_data_turn) · [`bench_h2_decode_validate_static_request`](#bench_h2_decode_validate_static_request) · [`bench_chunked_decode_single_chunk`](#bench_chunked_decode_single_chunk) · [`bench_body_reader_chunked_feed`](#bench_body_reader_chunked_feed) · [`bench_body_reader_zero_copy_dispatch_64k`](#bench_body_reader_zero_copy_dispatch_64k) · [`bench_decoded_body_lifecycle_64k`](#bench_decoded_body_lifecycle_64k) · [`bench_body_page_ring_64k`](#bench_body_page_ring_64k) · [`bench_multipart_consumer_64k`](#bench_multipart_consumer_64k) · [`bench_hpack_decode_indexed_header`](#bench_hpack_decode_indexed_header) · [`bench_hpack_decode_header_block_small`](#bench_hpack_decode_header_block_small) · [`bench_hpack_encode_repeated_request`](#bench_hpack_encode_repeated_request) · [`bench_huffman_code_lookup`](#bench_huffman_code_lookup) · [`bench_huffman_encoded_length`](#bench_huffman_encoded_length) · [`test_parser_bench_fixture_sanity`](#test_parser_bench_fixture_sanity) · [`test_get_request`](#test_get_request) · [`test_post_request_with_body`](#test_post_request_with_body) · [`test_incomplete_request`](#test_incomplete_request) · [`test_multiple_headers`](#test_multiple_headers) · [`test_response_200`](#test_response_200) · [`test_response_404`](#test_response_404) · [`test_response_redirect`](#test_response_redirect) · [`test_response_500`](#test_response_500) · [`test_parseDecimal_basic`](#test_parseDecimal_basic) · [`test_parseDecimal_zero`](#test_parseDecimal_zero) · [`test_parseDecimal_empty`](#test_parseDecimal_empty) · [`test_parseDecimal_non_digit`](#test_parseDecimal_non_digit) · [`test_parseDecimal_null_coalesce`](#test_parseDecimal_null_coalesce) · [`test_parseHex_ff`](#test_parseHex_ff) · [`test_parseHex_lowercase`](#test_parseHex_lowercase) · [`test_parseHex_zero`](#test_parseHex_zero) · [`test_parseHex_chunked_size`](#test_parseHex_chunked_size) · [`test_eqCaseInsensitive_match`](#test_eqCaseInsensitive_match) · [`test_eqCaseInsensitive_mismatch`](#test_eqCaseInsensitive_mismatch) · [`test_websocket_upgrade`](#test_websocket_upgrade) · [`test_empty_request`](#test_empty_request) · [`test_chunked_header_detection`](#test_chunked_header_detection) · [`test_rejects_duplicate_content_length_framing`](#test_rejects_duplicate_content_length_framing) · [`test_rejects_content_length_with_transfer_encoding`](#test_rejects_content_length_with_transfer_encoding) · [`test_rejects_transfer_encoding_substring`](#test_rejects_transfer_encoding_substring) · [`test_rejects_http_10_transfer_encoding`](#test_rejects_http_10_transfer_encoding) · [`test_connection_close`](#test_connection_close) · [`test_connection_tokens_are_list_aware`](#test_connection_tokens_are_list_aware) · [`test_head_method`](#test_head_method) · [`test_options_method`](#test_options_method) · [`test_custom_method_is_not_misclassified_by_fast_path`](#test_custom_method_is_not_misclassified_by_fast_path) · [`frame`](#frame) · [`test_stream_legacy_priority_represents_full_wire_range`](#test_stream_legacy_priority_represents_full_wire_range) · [`test_stream_map_applies_peer_initial_window_delta_to_all_streams`](#test_stream_map_applies_peer_initial_window_delta_to_all_streams) · [`test_stream_map_initial_window_update_is_transactional`](#test_stream_map_initial_window_update_is_transactional) · [`test_stream_map_enforces_capacity_and_ids`](#test_stream_map_enforces_capacity_and_ids) · [`test_stream_map_recycles_closed_slots_under_long_lived_churn`](#test_stream_map_recycles_closed_slots_under_long_lived_churn) · [`test_stream_map_settings_ignore_terminal_slot_windows`](#test_stream_map_settings_ignore_terminal_slot_windows) · [`test_stream_idle_data_fails_and_headers_open`](#test_stream_idle_data_fails_and_headers_open) · [`test_stream_push_promise_never_reserves_its_idle_carrier`](#test_stream_push_promise_never_reserves_its_idle_carrier) · [`test_stream_half_closed_remote_uses_stream_closed_scope`](#test_stream_half_closed_remote_uses_stream_closed_scope) · [`test_stream_rejects_frame_for_another_stream`](#test_stream_rejects_frame_for_another_stream) · [`test_stream_unknown_extensions_never_mutate_core_state`](#test_stream_unknown_extensions_never_mutate_core_state) · [`add`](#add) · [`validRequest`](#validRequest) · [`expectMalformed`](#expectMalformed) · [`test_h2_fields_accept_valid_request_connect_response_and_trailers`](#test_h2_fields_accept_valid_request_connect_response_and_trailers) · [`test_h2_fields_reject_smuggling_bytes_and_connection_fields`](#test_h2_fields_reject_smuggling_bytes_and_connection_fields) · [`test_h2_fields_enforce_pseudo_header_context_order_and_uniqueness`](#test_h2_fields_enforce_pseudo_header_context_order_and_uniqueness) · [`test_h2_fields_enforce_required_control_data_and_te_exception`](#test_h2_fields_enforce_required_control_data_and_te_exception) · [`test_h2_fields_push_requires_known_safe_cacheable_method`](#test_h2_fields_push_requires_known_safe_cacheable_method) · [`test_h2_fields_canonicalize_content_length_and_reject_trailer_redefinition`](#test_h2_fields_canonicalize_content_length_and_reject_trailer_redefinition) · [`wb`](#wb) · [`mkstr`](#mkstr) · [`copyStr`](#copyStr) · [`fillBytes`](#fillBytes) · [`expectByte`](#expectByte) · [`test_hpack_decode_integer_small`](#test_hpack_decode_integer_small) · [`test_hpack_decode_integer_max_prefix`](#test_hpack_decode_integer_max_prefix) · [`test_hpack_decode_integer_multibyte`](#test_hpack_decode_integer_multibyte) · [`test_hpack_decode_integer_7bit`](#test_hpack_decode_integer_7bit) · [`test_hpack_decode_integer_empty`](#test_hpack_decode_integer_empty) · [`test_hpack_decode_integer_reports_truncation`](#test_hpack_decode_integer_reports_truncation) · [`test_hpack_decode_integer_rejects_overflow`](#test_hpack_decode_integer_rejects_overflow) · [`test_hpack_encode_integer_small`](#test_hpack_encode_integer_small) · [`test_hpack_encode_integer_multibyte`](#test_hpack_encode_integer_multibyte) · [`test_hpack_dynamic_table_new`](#test_hpack_dynamic_table_new) · [`test_hpack_dynamic_table_add`](#test_hpack_dynamic_table_add) · [`test_hpack_dynamic_table_eviction`](#test_hpack_dynamic_table_eviction) · [`test_hpack_dynamic_table_oversized_entry`](#test_hpack_dynamic_table_oversized_entry) · [`test_hpack_dynamic_table_set_max_size`](#test_hpack_dynamic_table_set_max_size) · [`test_hpack_static_table_authority`](#test_hpack_static_table_authority) · [`test_hpack_static_table_method_get`](#test_hpack_static_table_method_get) · [`test_hpack_static_table_method_post`](#test_hpack_static_table_method_post) · [`test_hpack_static_table_path`](#test_hpack_static_table_path) · [`test_hpack_static_table_status_200`](#test_hpack_static_table_status_200) · [`test_hpack_static_table_out_of_range`](#test_hpack_static_table_out_of_range) · [`test_hpack_decode_indexed_header`](#test_hpack_decode_indexed_header) · [`test_hpack_decode_indexed_status_200`](#test_hpack_decode_indexed_status_200) · [`test_hpack_decode_literal_with_indexing`](#test_hpack_decode_literal_with_indexing) · [`test_hpack_decode_literal_new_name`](#test_hpack_decode_literal_new_name) · [`test_hpack_decode_literal_without_indexing`](#test_hpack_decode_literal_without_indexing) · [`test_hpack_decode_table_size_update`](#test_hpack_decode_table_size_update) · [`test_hpack_decode_empty_input`](#test_hpack_decode_empty_input) · [`test_hpack_decode_header_block`](#test_hpack_decode_header_block) · [`test_hpack_decode_header_block_empty`](#test_hpack_decode_header_block_empty) · [`test_hpack_acknowledged_table_reduction_requires_first_block_update`](#test_hpack_acknowledged_table_reduction_requires_first_block_update) · [`test_hpack_multiple_acknowledged_changes_preserve_smallest_reduction`](#test_hpack_multiple_acknowledged_changes_preserve_smallest_reduction) · [`test_hpack_huffman_literal_rfc_fixture`](#test_hpack_huffman_literal_rfc_fixture) · [`test_hpack_block_rejects_truncated_literal`](#test_hpack_block_rejects_truncated_literal) · [`test_hpack_block_rejects_late_table_update`](#test_hpack_block_rejects_late_table_update) · [`test_hpack_block_enforces_header_count`](#test_hpack_block_enforces_header_count) · [`test_hpack_block_enforces_header_list_bytes`](#test_hpack_block_enforces_header_list_bytes) · [`test_hpack_encoder_rfc_request_without_huffman`](#test_hpack_encoder_rfc_request_without_huffman) · [`test_hpack_encoder_huffman_rfc_fixture_round_trip`](#test_hpack_encoder_huffman_rfc_fixture_round_trip) · [`test_hpack_encoder_sensitive_field_is_never_indexed`](#test_hpack_encoder_sensitive_field_is_never_indexed) · [`test_hpack_encoder_failure_is_transactional`](#test_hpack_encoder_failure_is_transactional) · [`test_hpack_encoder_limits_leave_output_untouched`](#test_hpack_encoder_limits_leave_output_untouched) · [`isLowerTokenByte`](#isLowerTokenByte) · [`validFieldName`](#validFieldName) · [`validFieldValue`](#validFieldValue) · [`isConnectionSpecific`](#isConnectionSpecific) · [`equalsAsciiCaseInsensitive`](#equalsAsciiCaseInsensitive) · [`parseStatus`](#parseStatus) · [`parseContentLength`](#parseContentLength) · [`validateH2FieldSection`](#validateH2FieldSection) · [`trimOws`](#trimOws) · [`validBoundary`](#validBoundary) · [`multipartBoundary`](#multipartBoundary) · [`multipartConsumer`](#multipartConsumer) · [`findBytes`](#findBytes) · [`appendQuotedValue`](#appendQuotedValue) · [`headerLineEnd`](#headerLineEnd) · [`splitHeader`](#splitHeader) · [`eqCaseInsensitive`](#eqCaseInsensitive) · [`isHttpToken`](#isHttpToken) · [`isValidHttpFieldValue`](#isValidHttpFieldValue) · [`parseDecimal`](#parseDecimal) · [`parseHex`](#parseHex) · [`isKnownH2FrameType`](#isKnownH2FrameType) · [`frameSizeError`](#frameSizeError) · [`validateFrameMetadata`](#validateFrameMetadata) · [`parseH2Frame`](#parseH2Frame) · [`parseH2FrameLimited`](#parseH2FrameLimited) · [`parseSettingsUpdate`](#parseSettingsUpdate) · [`parseSettings`](#parseSettings) · [`parseLegacyPriority`](#parseLegacyPriority) · [`parseRstStream`](#parseRstStream) · [`parseWindowUpdate`](#parseWindowUpdate) · [`parseGoAway`](#parseGoAway) · [`validSettings`](#validSettings) · [`encodeH2FrameHeader`](#encodeH2FrameHeader) · [`encodeSettingsPayload`](#encodeSettingsPayload) · [`encodeSettingsFrame`](#encodeSettingsFrame) · [`encodeSettingsFrameSelected`](#encodeSettingsFrameSelected) · [`encodeSettingsAck`](#encodeSettingsAck) · [`writeSetting`](#writeSetting) · [`encodePing`](#encodePing) · [`encodeLegacyPriority`](#encodeLegacyPriority) · [`encodeWindowUpdate`](#encodeWindowUpdate) · [`encodeRstStream`](#encodeRstStream) · [`encodeGoAway`](#encodeGoAway) · [`encodeGoAwayWithDebug`](#encodeGoAwayWithDebug) · [`detectBodyMode`](#detectBodyMode) · [`pageRemaining`](#pageRemaining) · [`bodyDeclaredLength`](#bodyDeclaredLength) · [`bodyProgress`](#bodyProgress) · [`getStaticEntry`](#getStaticEntry) · [`decodeIntegerChecked`](#decodeIntegerChecked) · [`decodeInteger`](#decodeInteger) · [`encodeInteger`](#encodeInteger) · [`decodeHeader`](#decodeHeader) · [`decodeHeaderLimited`](#decodeHeaderLimited) · [`decodeLiteral`](#decodeLiteral) · [`decodeStringLiteral`](#decodeStringLiteral) · [`decodeHeaderBlock`](#decodeHeaderBlock) · [`decodeHeaderBlockLimited`](#decodeHeaderBlockLimited) · [`staticLookupExact`](#staticLookupExact) · [`integerEncodedLength`](#integerEncodedLength) · [`checkedEncodedAdd`](#checkedEncodedAdd) · [`virtualLookupExact`](#virtualLookupExact) · [`virtualLookupName`](#virtualLookupName) · [`virtualAdd`](#virtualAdd) · [`autoSensitiveName`](#autoSensitiveName) · [`autoShouldIndex`](#autoShouldIndex) · [`encodedStringBytes`](#encodedStringBytes) · [`writeIntegerAt`](#writeIntegerAt) · [`writeStringAt`](#writeStringAt) · [`tableLookupExact`](#tableLookupExact) · [`encodeIndexedOnly`](#encodeIndexedOnly) · [`encodeHeaderBlockLimited`](#encodeHeaderBlockLimited) · [`encodeHeaderBlock`](#encodeHeaderBlock) · [`parseFiberRequestInto`](#parseFiberRequestInto) · [`parseFiberRequestIntoWithLimits`](#parseFiberRequestIntoWithLimits) · [`parseFiberRequest`](#parseFiberRequest) · [`isHttp10`](#isHttp10) · [`sequenceError`](#sequenceError) · [`parseMethod`](#parseMethod) · [`parseVersion`](#parseVersion) · [`validateRequestFraming`](#validateRequestFraming) · [`parseRequest`](#parseRequest) · [`parseRequestBuffer`](#parseRequestBuffer) · [`progress`](#progress) · [`validateTrailer`](#validateTrailer) · [`parseResponse`](#parseResponse) · [`huffmanCode`](#huffmanCode) · [`huffmanEncodedLength`](#huffmanEncodedLength) · [`huffmanEncode`](#huffmanEncode) · [`huffmanDecode`](#huffmanDecode) · [`matchHuffmanSymbol`](#matchHuffmanSymbol) · [`requireValidHttpCapabilities`](#requireValidHttpCapabilities) · [`requireAsyncRoutes`](#requireAsyncRoutes) · [`requireRequestStreaming`](#requireRequestStreaming) · [`requireWebSocket`](#requireWebSocket) · [`requireResponseStreaming`](#requireResponseStreaming) · [`admissionTryAcquire`](#admissionTryAcquire) · [`admissionRelease`](#admissionRelease) · [`nextWsSessionId`](#nextWsSessionId) · [`asyncConnectionReturn`](#asyncConnectionReturn) · [`fullDeferred`](#fullDeferred) · [`newFullConnectionState`](#newFullConnectionState) · [`newHttp1SyncConnectionState`](#newHttp1SyncConnectionState) · [`classifyInitialProtocol`](#classifyInitialProtocol) · [`envValueOrEmpty`](#envValueOrEmpty) · [`envFlag`](#envFlag) · [`staticFileHandler`](#staticFileHandler) · [`acceptHttp1SyncBatch`](#acceptHttp1SyncBatch) · [`reapHttp1SyncConnections`](#reapHttp1SyncConnections) · [`closeAllHttp1SyncConnections`](#closeAllHttp1SyncConnections) · [`flushAcceptedBatch`](#flushAcceptedBatch) · [`drainAsyncReturnWake`](#drainAsyncReturnWake) · [`acceptBatch`](#acceptBatch) · [`syncH2Deadline`](#syncH2Deadline) · [`taskOwnedPart`](#taskOwnedPart) · [`taskOwnedCtx`](#taskOwnedCtx) · [`populateRequestContext`](#populateRequestContext) · [`runDirectApplication`](#runDirectApplication) · [`isNonBlockingRetry`](#isNonBlockingRetry) · [`effectiveTimeoutMs`](#effectiveTimeoutMs) · [`maintenancePollTimeout`](#maintenancePollTimeout) · [`timeoutExpired`](#timeoutExpired) · [`reapClosedConnections`](#reapClosedConnections) · [`closeTrackedConnection`](#closeTrackedConnection) · [`closeTrackedConnectionFor`](#closeTrackedConnectionFor) · [`closeAllConnections`](#closeAllConnections) · [`waitForWorkers`](#waitForWorkers) · [`activeRemoveFd`](#activeRemoveFd) · [`closeListenFds`](#closeListenFds) · [`defaultNotFound`](#defaultNotFound) · [`groupStaticFileHandler`](#groupStaticFileHandler) · [`methodToId`](#methodToId) · [`asyncRouteMarker`](#asyncRouteMarker) · [`emptyCtx`](#emptyCtx) · [`resetHttp1Common`](#resetHttp1Common) · [`staticPathHasParentSegment`](#staticPathHasParentSegment) · [`pathIsWithinRoot`](#pathIsWithinRoot) · [`streamRouteHandler`](#streamRouteHandler) · [`wsRouteHandler`](#wsRouteHandler) · [`parseQueryStringInto`](#parseQueryStringInto) · [`findQueryValue`](#findQueryValue) · [`strContains`](#strContains) · [`trimWhitespace`](#trimWhitespace) · [`jsonGetString`](#jsonGetString) · [`mimeFromExt`](#mimeFromExt) · [`strContainsDotDot`](#strContainsDotDot) · [`getExtension`](#getExtension) · [`ensureRoot`](#ensureRoot) · [`cloneMiddlewareRange`](#cloneMiddlewareRange) · [`appendNode`](#appendNode) · [`ensurePattern`](#ensurePattern) · [`assignMatch`](#assignMatch) · [`matchNode`](#matchNode) · [`matchChildrenOfKind`](#matchChildrenOfKind) · [`assignMatchInto`](#assignMatchInto) · [`matchNodeInto`](#matchNodeInto) · [`matchChildrenInto`](#matchChildrenInto) · [`asyncPipelineNext`](#asyncPipelineNext) · [`bufferedStreamResult`](#bufferedStreamResult) · [`lowerH2HeaderName`](#lowerH2HeaderName) · [`isResponseFramingField`](#isResponseFramingField) · [`decimalString`](#decimalString) · [`h2ApplicationResponse`](#h2ApplicationResponse) · [`h2StreamingResponseHead`](#h2StreamingResponseHead) · [`h2BodyResult`](#h2BodyResult) · [`ownedFieldValue`](#ownedFieldValue) · [`ownedFieldName`](#ownedFieldName) · [`splitRequestTarget`](#splitRequestTarget) · [`h2ApplicationRequest`](#h2ApplicationRequest) · [`checkedCreditSum`](#checkedCreditSum) · [`asyncBodyPipelineNext`](#asyncBodyPipelineNext) · [`bodyFramingError`](#bodyFramingError) · [`asyncBodyTakeReusableTransport`](#asyncBodyTakeReusableTransport) · [`protocolError`](#protocolError) · [`requestLimitError`](#requestLimitError) · [`headerNameIs`](#headerNameIs) · [`validateContentDecoding`](#validateContentDecoding) · [`isOws`](#isOws) · [`appendContentEncodingValue`](#appendContentEncodingValue) · [`contentEncodingFormats`](#contentEncodingFormats) · [`decodedString`](#decodedString) · [`decodeCompressionFailure`](#decodeCompressionFailure) · [`decodeResponseContent`](#decodeResponseContent) · [`validateClientConfig`](#validateClientConfig) · [`validateRedirectPolicy`](#validateRedirectPolicy) · [`cloneApplicationHeaders`](#cloneApplicationHeaders) · [`cloneClientRequest`](#cloneClientRequest) · [`headerCount`](#headerCount) · [`redirectStatus`](#redirectStatus) · [`initialRequestUrl`](#initialRequestUrl) · [`sameOrigin`](#sameOrigin) · [`redirectRequestTarget`](#redirectRequestTarget) · [`removeRedirectBodyHeaders`](#removeRedirectBodyHeaders) · [`removeCrossOriginCredentials`](#removeCrossOriginCredentials) · [`prepareRedirect`](#prepareRedirect) · [`isSafeRequestTargetBytes`](#isSafeRequestTargetBytes) · [`isRequestTarget`](#isRequestTarget) · [`validateRequest`](#validateRequest) · [`reserveRequestBytes`](#reserveRequestBytes) · [`encodeRequestHead`](#encodeRequestHead) · [`encodeRequest`](#encodeRequest) · [`validateStreamingRequest`](#validateStreamingRequest) · [`writeStreamingRequestBody`](#writeStreamingRequestBody) · [`validateResponseHeaders`](#validateResponseHeaders) · [`cloneHeaders`](#cloneHeaders) · [`bodyModeForResponse`](#bodyModeForResponse) · [`bodyByteLimitForResponse`](#bodyByteLimitForResponse) · [`responseMustClose`](#responseMustClose) · [`materializeResponse`](#materializeResponse) · [`materializeWorkspaceResponse`](#materializeWorkspaceResponse) · [`materializeResponseHead`](#materializeResponseHead) · [`consumeResponseBody`](#consumeResponseBody) · [`consumeResponseBodyInto`](#consumeResponseBodyInto) · [`retainBodySuffix`](#retainBodySuffix) · [`readResponseWithWorkspace`](#readResponseWithWorkspace) · [`readResponse`](#readResponse) · [`readResponseIntoWithWorkspace`](#readResponseIntoWithWorkspace) · [`readResponseInto`](#readResponseInto) · [`sendFollowingWithResolver`](#sendFollowingWithResolver) · [`parseRequestFromSocket`](#parseRequestFromSocket) · [`parseRequest`](#parseRequest) · [`respondText`](#respondText) · [`respondJSON`](#respondJSON) · [`respondError`](#respondError) · [`respondRedirect`](#respondRedirect) · [`writeDeadlineNs`](#writeDeadlineNs) · [`sendAllUntil`](#sendAllUntil) · [`sendAllWithTimeout`](#sendAllWithTimeout) · [`sendAll`](#sendAll) · [`appendChunkLength`](#appendChunkLength) · [`appendHttp1Chunk`](#appendHttp1Chunk) · [`appendHttp1ChunkTerminator`](#appendHttp1ChunkTerminator) · [`webSocketUpgradeResponse`](#webSocketUpgradeResponse) · [`webSocketUpgradeResponseWithProtocol`](#webSocketUpgradeResponseWithProtocol) · [`webSocketUpgradeResponseFromValidatedKey`](#webSocketUpgradeResponseFromValidatedKey) · [`isValidUtf8`](#isValidUtf8) · [`isValidCloseCode`](#isValidCloseCode) · [`isValidClosePayload`](#isValidClosePayload) · [`isWebSocketUpgrade`](#isWebSocketUpgrade) · [`webSocketProtocolOffered`](#webSocketProtocolOffered) · [`webSocketProtocolOccurrences`](#webSocketProtocolOccurrences) · [`requestWebSocketProtocolsValid`](#requestWebSocketProtocolsValid) · [`requestHeaderCount`](#requestHeaderCount) · [`hasRequestHeaderToken`](#hasRequestHeaderToken) · [`containsHeaderToken`](#containsHeaderToken) · [`wsSessionQueueUpgradeResponse`](#wsSessionQueueUpgradeResponse) · [`wsSessionQueueValidatedUpgrade`](#wsSessionQueueValidatedUpgrade) · [`isValidUtf8`](#isValidUtf8) · [`isValidCloseCode`](#isValidCloseCode) · [`isValidClosePayload`](#isValidClosePayload)

**Constants:** [`STATUS_OK`](#STATUS_OK) · [`STATUS_CREATED`](#STATUS_CREATED) · [`STATUS_ACCEPTED`](#STATUS_ACCEPTED) · [`STATUS_NO_CONTENT`](#STATUS_NO_CONTENT) · [`STATUS_RESET_CONTENT`](#STATUS_RESET_CONTENT) · [`STATUS_PARTIAL_CONTENT`](#STATUS_PARTIAL_CONTENT) · [`STATUS_MOVED_PERMANENTLY`](#STATUS_MOVED_PERMANENTLY) · [`STATUS_FOUND`](#STATUS_FOUND) · [`STATUS_NOT_MODIFIED`](#STATUS_NOT_MODIFIED) · [`STATUS_TEMPORARY_REDIRECT`](#STATUS_TEMPORARY_REDIRECT) · [`STATUS_PERMANENT_REDIRECT`](#STATUS_PERMANENT_REDIRECT) · [`STATUS_BAD_REQUEST`](#STATUS_BAD_REQUEST) · [`STATUS_UNAUTHORIZED`](#STATUS_UNAUTHORIZED) · [`STATUS_FORBIDDEN`](#STATUS_FORBIDDEN) · [`STATUS_NOT_FOUND`](#STATUS_NOT_FOUND) · [`STATUS_METHOD_NOT_ALLOWED`](#STATUS_METHOD_NOT_ALLOWED) · [`STATUS_CONFLICT`](#STATUS_CONFLICT) · [`STATUS_GONE`](#STATUS_GONE) · [`STATUS_CONTENT_TOO_LARGE`](#STATUS_CONTENT_TOO_LARGE) · [`STATUS_UNPROCESSABLE_ENTITY`](#STATUS_UNPROCESSABLE_ENTITY) · [`STATUS_TOO_MANY_REQUESTS`](#STATUS_TOO_MANY_REQUESTS) · [`STATUS_INTERNAL_SERVER_ERROR`](#STATUS_INTERNAL_SERVER_ERROR) · [`STATUS_NOT_IMPLEMENTED`](#STATUS_NOT_IMPLEMENTED) · [`STATUS_BAD_GATEWAY`](#STATUS_BAD_GATEWAY) · [`STATUS_SERVICE_UNAVAILABLE`](#STATUS_SERVICE_UNAVAILABLE) · [`STATUS_GATEWAY_TIMEOUT`](#STATUS_GATEWAY_TIMEOUT) · [`OP_CONTINUATION`](#OP_CONTINUATION) · [`OP_TEXT`](#OP_TEXT) · [`OP_BINARY`](#OP_BINARY) · [`OP_CLOSE`](#OP_CLOSE) · [`OP_PING`](#OP_PING) · [`OP_PONG`](#OP_PONG) · [`CLOSE_NORMAL`](#CLOSE_NORMAL) · [`CLOSE_GOING_AWAY`](#CLOSE_GOING_AWAY) · [`CLOSE_PROTOCOL_ERROR`](#CLOSE_PROTOCOL_ERROR) · [`CLOSE_UNSUPPORTED_DATA`](#CLOSE_UNSUPPORTED_DATA) · [`CLOSE_NO_STATUS`](#CLOSE_NO_STATUS) · [`CLOSE_ABNORMAL`](#CLOSE_ABNORMAL) · [`CLOSE_INVALID_PAYLOAD`](#CLOSE_INVALID_PAYLOAD) · [`CLOSE_POLICY_VIOLATION`](#CLOSE_POLICY_VIOLATION) · [`CLOSE_MESSAGE_TOO_BIG`](#CLOSE_MESSAGE_TOO_BIG) · [`CLOSE_MANDATORY_EXT`](#CLOSE_MANDATORY_EXT) · [`CLOSE_INTERNAL_ERROR`](#CLOSE_INTERNAL_ERROR) · [`H2_DEFAULT_URGENCY`](#H2_DEFAULT_URGENCY) · [`H2_MAX_PRIORITY_FIELD_BYTES`](#H2_MAX_PRIORITY_FIELD_BYTES) · [`SF_KIND_OTHER`](#SF_KIND_OTHER) · [`SF_KIND_INTEGER`](#SF_KIND_INTEGER) · [`SF_KIND_BOOLEAN`](#SF_KIND_BOOLEAN) · [`MAX_HEADERS`](#MAX_HEADERS) · [`MULTIPART_MAX_BOUNDARY_BYTES`](#MULTIPART_MAX_BOUNDARY_BYTES) · [`MULTIPART_MIN_WORKSPACE_BYTES`](#MULTIPART_MIN_WORKSPACE_BYTES) · [`FRAME_DATA`](#FRAME_DATA) · [`FRAME_HEADERS`](#FRAME_HEADERS) · [`FRAME_PRIORITY`](#FRAME_PRIORITY) · [`FRAME_RST_STREAM`](#FRAME_RST_STREAM) · [`FRAME_SETTINGS`](#FRAME_SETTINGS) · [`FRAME_PUSH_PROMISE`](#FRAME_PUSH_PROMISE) · [`FRAME_PING`](#FRAME_PING) · [`FRAME_GOAWAY`](#FRAME_GOAWAY) · [`FRAME_WINDOW_UPDATE`](#FRAME_WINDOW_UPDATE) · [`FRAME_CONTINUATION`](#FRAME_CONTINUATION) · [`FRAME_PRIORITY_UPDATE`](#FRAME_PRIORITY_UPDATE) · [`FLAG_END_STREAM`](#FLAG_END_STREAM) · [`FLAG_ACK`](#FLAG_ACK) · [`FLAG_END_HEADERS`](#FLAG_END_HEADERS) · [`FLAG_PADDED`](#FLAG_PADDED) · [`FLAG_PRIORITY_F`](#FLAG_PRIORITY_F) · [`ERR_NO_ERROR`](#ERR_NO_ERROR) · [`ERR_PROTOCOL_ERROR`](#ERR_PROTOCOL_ERROR) · [`ERR_INTERNAL_ERROR`](#ERR_INTERNAL_ERROR) · [`ERR_FLOW_CONTROL_ERROR`](#ERR_FLOW_CONTROL_ERROR) · [`ERR_SETTINGS_TIMEOUT`](#ERR_SETTINGS_TIMEOUT) · [`ERR_STREAM_CLOSED`](#ERR_STREAM_CLOSED) · [`ERR_FRAME_SIZE_ERROR`](#ERR_FRAME_SIZE_ERROR) · [`ERR_REFUSED_STREAM`](#ERR_REFUSED_STREAM) · [`ERR_CANCEL`](#ERR_CANCEL) · [`ERR_COMPRESSION_ERROR`](#ERR_COMPRESSION_ERROR) · [`ERR_CONNECT_ERROR`](#ERR_CONNECT_ERROR) · [`ERR_ENHANCE_YOUR_CALM`](#ERR_ENHANCE_YOUR_CALM) · [`ERR_INADEQUATE_SECURITY`](#ERR_INADEQUATE_SECURITY) · [`ERR_HTTP_1_1_REQUIRED`](#ERR_HTTP_1_1_REQUIRED) · [`H2_FRAME_HEADER_SIZE`](#H2_FRAME_HEADER_SIZE) · [`H2_SETTINGS_HEADER_TABLE_SIZE`](#H2_SETTINGS_HEADER_TABLE_SIZE) · [`H2_SETTINGS_ENABLE_PUSH`](#H2_SETTINGS_ENABLE_PUSH) · [`H2_SETTINGS_MAX_CONCURRENT_STREAMS`](#H2_SETTINGS_MAX_CONCURRENT_STREAMS) · [`H2_SETTINGS_INITIAL_WINDOW_SIZE`](#H2_SETTINGS_INITIAL_WINDOW_SIZE) · [`H2_SETTINGS_MAX_FRAME_SIZE`](#H2_SETTINGS_MAX_FRAME_SIZE) · [`H2_SETTINGS_MAX_HEADER_LIST_SIZE`](#H2_SETTINGS_MAX_HEADER_LIST_SIZE) · [`STATIC_TABLE_SIZE`](#STATIC_TABLE_SIZE) · [`HPACK_ENCODE_INDEXED`](#HPACK_ENCODE_INDEXED) · [`HPACK_ENCODE_INCREMENTAL`](#HPACK_ENCODE_INCREMENTAL) · [`HPACK_ENCODE_WITHOUT`](#HPACK_ENCODE_WITHOUT) · [`HPACK_ENCODE_NEVER`](#HPACK_ENCODE_NEVER) · [`MAX_CHUNK_LINE_BYTES`](#MAX_CHUNK_LINE_BYTES) · [`MAX_TRAILER_BYTES`](#MAX_TRAILER_BYTES) · [`INIT_CAP`](#INIT_CAP) · [`MAX_BUF`](#MAX_BUF) · [`HTTP_V1`](#HTTP_V1) · [`HTTP_V2`](#HTTP_V2) · [`WEBSOCKET`](#WEBSOCKET) · [`ASYNC_ROUTES`](#ASYNC_ROUTES) · [`REQUEST_STREAMING`](#REQUEST_STREAMING) · [`RESPONSE_STREAMING`](#RESPONSE_STREAMING) · [`HTTP_FULL`](#HTTP_FULL) · [`DEFAULT_MAX_CONNECTIONS`](#DEFAULT_MAX_CONNECTIONS) · [`HTTP1_RETAINED_BODY_BYTES`](#HTTP1_RETAINED_BODY_BYTES) · [`WS_MAX_FRAMES_PER_TURN`](#WS_MAX_FRAMES_PER_TURN) · [`DEFERRED_CONNECTIONS_PER_TURN`](#DEFERRED_CONNECTIONS_PER_TURN) · [`WS_TURN_CLOSED`](#WS_TURN_CLOSED) · [`WS_TURN_IDLE`](#WS_TURN_IDLE) · [`WS_TURN_DEFERRED`](#WS_TURN_DEFERRED) · [`H2_TURN_CLOSED`](#H2_TURN_CLOSED) · [`H2_TURN_IDLE`](#H2_TURN_IDLE) · [`H2_TURN_DEFERRED`](#H2_TURN_DEFERRED) · [`PREFACE_HTTP1`](#PREFACE_HTTP1) · [`PREFACE_PENDING`](#PREFACE_PENDING) · [`PREFACE_HTTP2`](#PREFACE_HTTP2) · [`FIBER_ASYNC_SCHEDULER_RESERVE`](#FIBER_ASYNC_SCHEDULER_RESERVE) · [`ASYNC_RETURN_QUEUE_CAPACITY`](#ASYNC_RETURN_QUEUE_CAPACITY) · [`ASYNC_RETURNS_PER_TURN`](#ASYNC_RETURNS_PER_TURN) · [`H2_ASYNC_COMPLETION_QUEUE_CAPACITY`](#H2_ASYNC_COMPLETION_QUEUE_CAPACITY) · [`H2_ASYNC_COMPLETIONS_PER_TURN`](#H2_ASYNC_COMPLETIONS_PER_TURN) · [`HTTP_FEATURE_H2`](#HTTP_FEATURE_H2) · [`HTTP_FEATURE_WEBSOCKET`](#HTTP_FEATURE_WEBSOCKET) · [`HTTP_FEATURE_ASYNC_ROUTE`](#HTTP_FEATURE_ASYNC_ROUTE) · [`HTTP_FEATURE_ASYNC_BODY`](#HTTP_FEATURE_ASYNC_BODY) · [`HTTP_FEATURE_RESPONSE_STREAM`](#HTTP_FEATURE_RESPONSE_STREAM) · [`HTTP_FEATURES_HTTP1_SYNC`](#HTTP_FEATURES_HTTP1_SYNC) · [`HTTP_FEATURES_FULL`](#HTTP_FEATURES_FULL) · [`OFFSET_SHIFT_4`](#OFFSET_SHIFT_4) · [`STREAM_WRITE_BUFFER_BYTES`](#STREAM_WRITE_BUFFER_BYTES) · [`NODE_STATIC`](#NODE_STATIC) · [`NODE_PARAM`](#NODE_PARAM) · [`NODE_CATCH`](#NODE_CATCH) · [`NO_PARENT`](#NO_PARENT) · [`H2_CLIENT_PREFACE`](#H2_CLIENT_PREFACE) · [`H2_CONTROL_RESERVE`](#H2_CONTROL_RESERVE) · [`H2_CREDIT_BATCH_BYTES`](#H2_CREDIT_BATCH_BYTES) · [`ASYNC_BODY_PAGE_BYTES`](#ASYNC_BODY_PAGE_BYTES) · [`ASYNC_BODY_PAGE_COUNT`](#ASYNC_BODY_PAGE_COUNT) · [`ASYNC_BODY_WORKSPACE_BYTES`](#ASYNC_BODY_WORKSPACE_BYTES) · [`DEFAULT_MAX_REQUEST_BYTES`](#DEFAULT_MAX_REQUEST_BYTES) · [`DEFAULT_MAX_RESPONSE_HEADER_BYTES`](#DEFAULT_MAX_RESPONSE_HEADER_BYTES) · [`DEFAULT_MAX_RESPONSE_BODY_BYTES`](#DEFAULT_MAX_RESPONSE_BODY_BYTES) · [`DEFAULT_MAX_RESPONSE_HEADERS`](#DEFAULT_MAX_RESPONSE_HEADERS) · [`DEFAULT_MAX_INFORMATIONAL_RESPONSES`](#DEFAULT_MAX_INFORMATIONAL_RESPONSES) · [`MAX_INFORMATIONAL_RESPONSES`](#MAX_INFORMATIONAL_RESPONSES) · [`DEFAULT_MAX_REDIRECTS`](#DEFAULT_MAX_REDIRECTS) · [`MAX_REDIRECTS`](#MAX_REDIRECTS) · [`DEFAULT_MAX_CONTENT_ENCODING_LAYERS`](#DEFAULT_MAX_CONTENT_ENCODING_LAYERS) · [`MAX_CONTENT_ENCODING_LAYERS`](#MAX_CONTENT_ENCODING_LAYERS) · [`DEFAULT_MAX_REQUEST_HEADERS`](#DEFAULT_MAX_REQUEST_HEADERS) · [`CLIENT_READ_BUFFER_BYTES`](#CLIENT_READ_BUFFER_BYTES) · [`CLIENT_RESPONSE_RETAINED_BODY_BYTES`](#CLIENT_RESPONSE_RETAINED_BODY_BYTES) · [`DEFAULT_WRITE_TIMEOUT_MS`](#DEFAULT_WRITE_TIMEOUT_MS) · [`ERR_TIMED_OUT`](#ERR_TIMED_OUT) · [`ERR_BROKEN_PIPE`](#ERR_BROKEN_PIPE) · [`WS_TEXT`](#WS_TEXT) · [`WS_BINARY`](#WS_BINARY) · [`WS_CLOSE`](#WS_CLOSE) · [`WS_PING`](#WS_PING) · [`WS_PONG`](#WS_PONG) · [`WS_MAX_MESSAGE_BYTES`](#WS_MAX_MESSAGE_BYTES) · [`WS_MAX_SUBPROTOCOLS`](#WS_MAX_SUBPROTOCOLS) · [`WS_MAX_SUBPROTOCOL_BYTES`](#WS_MAX_SUBPROTOCOL_BYTES) · [`WS_MAX_QUEUED_BYTES`](#WS_MAX_QUEUED_BYTES) · [`WS_INITIAL_READ_BYTES`](#WS_INITIAL_READ_BYTES) · [`WS_INITIAL_WRITE_BYTES`](#WS_INITIAL_WRITE_BYTES) · [`WS_FRAME_CLOSED`](#WS_FRAME_CLOSED) · [`WS_FRAME_NEED_MORE`](#WS_FRAME_NEED_MORE) · [`WS_FRAME_CONTROL`](#WS_FRAME_CONTROL) · [`WS_FRAME_MESSAGE`](#WS_FRAME_MESSAGE)

**Type Aliases:** [`RequestHandler`](#RequestHandler) · [`H1ConnectionState`](#H1ConnectionState) · [`Http1SyncConnectionState`](#Http1SyncConnectionState) · [`Handler`](#Handler) · [`StreamHandler`](#StreamHandler) · [`WsHandler`](#WsHandler) · [`WsOpenHandler`](#WsOpenHandler) · [`WsCloseHandler`](#WsCloseHandler) · [`AsyncHandler`](#AsyncHandler) · [`AsyncBodyHandler`](#AsyncBodyHandler)

## Constants

### <a id="STATUS_OK"></a>`STATUS_OK` `🔓 export`

> 📄 `status.vx` L6-6

```vex
export const STATUS_OK: i32=200;
```

**Returns:** `i32=200;`

---

### <a id="STATUS_CREATED"></a>`STATUS_CREATED` `🔓 export`

> 📄 `status.vx` L7-7

```vex
export const STATUS_CREATED: i32=201;
```

**Returns:** `i32=201;`

---

### <a id="STATUS_ACCEPTED"></a>`STATUS_ACCEPTED` `🔓 export`

> 📄 `status.vx` L8-8

```vex
export const STATUS_ACCEPTED: i32=202;
```

**Returns:** `i32=202;`

---

### <a id="STATUS_NO_CONTENT"></a>`STATUS_NO_CONTENT` `🔓 export`

> 📄 `status.vx` L9-9

```vex
export const STATUS_NO_CONTENT: i32=204;
```

**Returns:** `i32=204;`

---

### <a id="STATUS_RESET_CONTENT"></a>`STATUS_RESET_CONTENT` `🔓 export`

> 📄 `status.vx` L10-10

```vex
export const STATUS_RESET_CONTENT: i32=205;
```

**Returns:** `i32=205;`

---

### <a id="STATUS_PARTIAL_CONTENT"></a>`STATUS_PARTIAL_CONTENT` `🔓 export`

> 📄 `status.vx` L11-11

```vex
export const STATUS_PARTIAL_CONTENT: i32=206;
```

**Returns:** `i32=206;`

---

### <a id="STATUS_MOVED_PERMANENTLY"></a>`STATUS_MOVED_PERMANENTLY` `🔓 export`

> 📄 `status.vx` L14-14

```vex
export const STATUS_MOVED_PERMANENTLY: i32=301;
```

**Returns:** `i32=301;`

---

### <a id="STATUS_FOUND"></a>`STATUS_FOUND` `🔓 export`

> 📄 `status.vx` L15-15

```vex
export const STATUS_FOUND: i32=302;
```

**Returns:** `i32=302;`

---

### <a id="STATUS_NOT_MODIFIED"></a>`STATUS_NOT_MODIFIED` `🔓 export`

> 📄 `status.vx` L16-16

```vex
export const STATUS_NOT_MODIFIED: i32=304;
```

**Returns:** `i32=304;`

---

### <a id="STATUS_TEMPORARY_REDIRECT"></a>`STATUS_TEMPORARY_REDIRECT` `🔓 export`

> 📄 `status.vx` L17-17

```vex
export const STATUS_TEMPORARY_REDIRECT: i32=307;
```

**Returns:** `i32=307;`

---

### <a id="STATUS_PERMANENT_REDIRECT"></a>`STATUS_PERMANENT_REDIRECT` `🔓 export`

> 📄 `status.vx` L18-18

```vex
export const STATUS_PERMANENT_REDIRECT: i32=308;
```

**Returns:** `i32=308;`

---

### <a id="STATUS_BAD_REQUEST"></a>`STATUS_BAD_REQUEST` `🔓 export`

> 📄 `status.vx` L21-21

```vex
export const STATUS_BAD_REQUEST: i32=400;
```

**Returns:** `i32=400;`

---

### <a id="STATUS_UNAUTHORIZED"></a>`STATUS_UNAUTHORIZED` `🔓 export`

> 📄 `status.vx` L22-22

```vex
export const STATUS_UNAUTHORIZED: i32=401;
```

**Returns:** `i32=401;`

---

### <a id="STATUS_FORBIDDEN"></a>`STATUS_FORBIDDEN` `🔓 export`

> 📄 `status.vx` L23-23

```vex
export const STATUS_FORBIDDEN: i32=403;
```

**Returns:** `i32=403;`

---

### <a id="STATUS_NOT_FOUND"></a>`STATUS_NOT_FOUND` `🔓 export`

> 📄 `status.vx` L24-24

```vex
export const STATUS_NOT_FOUND: i32=404;
```

**Returns:** `i32=404;`

---

### <a id="STATUS_METHOD_NOT_ALLOWED"></a>`STATUS_METHOD_NOT_ALLOWED` `🔓 export`

> 📄 `status.vx` L25-25

```vex
export const STATUS_METHOD_NOT_ALLOWED: i32=405;
```

**Returns:** `i32=405;`

---

### <a id="STATUS_CONFLICT"></a>`STATUS_CONFLICT` `🔓 export`

> 📄 `status.vx` L26-26

```vex
export const STATUS_CONFLICT: i32=409;
```

**Returns:** `i32=409;`

---

### <a id="STATUS_GONE"></a>`STATUS_GONE` `🔓 export`

> 📄 `status.vx` L27-27

```vex
export const STATUS_GONE: i32=410;
```

**Returns:** `i32=410;`

---

### <a id="STATUS_CONTENT_TOO_LARGE"></a>`STATUS_CONTENT_TOO_LARGE` `🔓 export`

> 📄 `status.vx` L28-28

```vex
export const STATUS_CONTENT_TOO_LARGE: i32=413;
```

**Returns:** `i32=413;`

---

### <a id="STATUS_UNPROCESSABLE_ENTITY"></a>`STATUS_UNPROCESSABLE_ENTITY` `🔓 export`

> 📄 `status.vx` L29-29

```vex
export const STATUS_UNPROCESSABLE_ENTITY: i32=422;
```

**Returns:** `i32=422;`

---

### <a id="STATUS_TOO_MANY_REQUESTS"></a>`STATUS_TOO_MANY_REQUESTS` `🔓 export`

> 📄 `status.vx` L30-30

```vex
export const STATUS_TOO_MANY_REQUESTS: i32=429;
```

**Returns:** `i32=429;`

---

### <a id="STATUS_INTERNAL_SERVER_ERROR"></a>`STATUS_INTERNAL_SERVER_ERROR` `🔓 export`

> 📄 `status.vx` L33-33

```vex
export const STATUS_INTERNAL_SERVER_ERROR: i32=500;
```

**Returns:** `i32=500;`

---

### <a id="STATUS_NOT_IMPLEMENTED"></a>`STATUS_NOT_IMPLEMENTED` `🔓 export`

> 📄 `status.vx` L34-34

```vex
export const STATUS_NOT_IMPLEMENTED: i32=501;
```

**Returns:** `i32=501;`

---

### <a id="STATUS_BAD_GATEWAY"></a>`STATUS_BAD_GATEWAY` `🔓 export`

> 📄 `status.vx` L35-35

```vex
export const STATUS_BAD_GATEWAY: i32=502;
```

**Returns:** `i32=502;`

---

### <a id="STATUS_SERVICE_UNAVAILABLE"></a>`STATUS_SERVICE_UNAVAILABLE` `🔓 export`

> 📄 `status.vx` L36-36

```vex
export const STATUS_SERVICE_UNAVAILABLE: i32=503;
```

**Returns:** `i32=503;`

---

### <a id="STATUS_GATEWAY_TIMEOUT"></a>`STATUS_GATEWAY_TIMEOUT` `🔓 export`

> 📄 `status.vx` L37-37

```vex
export const STATUS_GATEWAY_TIMEOUT: i32=504;
```

**Returns:** `i32=504;`

---

### <a id="OP_CONTINUATION"></a>`OP_CONTINUATION` `🔓 export`

> 📄 `ws.vx` L33-33

```vex
export const OP_CONTINUATION: u8=0x0;
```

**Returns:** `u8=0x0;`

---

### <a id="OP_TEXT"></a>`OP_TEXT` `🔓 export`

> 📄 `ws.vx` L34-34

```vex
export const OP_TEXT: u8=0x1;
```

**Returns:** `u8=0x1;`

---

### <a id="OP_BINARY"></a>`OP_BINARY` `🔓 export`

> 📄 `ws.vx` L35-35

```vex
export const OP_BINARY: u8=0x2;
```

**Returns:** `u8=0x2;`

---

### <a id="OP_CLOSE"></a>`OP_CLOSE` `🔓 export`

> 📄 `ws.vx` L36-36

```vex
export const OP_CLOSE: u8=0x8;
```

**Returns:** `u8=0x8;`

---

### <a id="OP_PING"></a>`OP_PING` `🔓 export`

> 📄 `ws.vx` L37-37

```vex
export const OP_PING: u8=0x9;
```

**Returns:** `u8=0x9;`

---

### <a id="OP_PONG"></a>`OP_PONG` `🔓 export`

> 📄 `ws.vx` L38-38

```vex
export const OP_PONG: u8=0xA;
```

**Returns:** `u8=0xA;`

---

### <a id="CLOSE_NORMAL"></a>`CLOSE_NORMAL` `🔓 export`

> 📄 `ws.vx` L52-52

```vex
export const CLOSE_NORMAL: u16=1000;
```

**Returns:** `u16=1000;`

---

### <a id="CLOSE_GOING_AWAY"></a>`CLOSE_GOING_AWAY` `🔓 export`

> 📄 `ws.vx` L53-53

```vex
export const CLOSE_GOING_AWAY: u16=1001;
```

**Returns:** `u16=1001;`

---

### <a id="CLOSE_PROTOCOL_ERROR"></a>`CLOSE_PROTOCOL_ERROR` `🔓 export`

> 📄 `ws.vx` L54-54

```vex
export const CLOSE_PROTOCOL_ERROR: u16=1002;
```

**Returns:** `u16=1002;`

---

### <a id="CLOSE_UNSUPPORTED_DATA"></a>`CLOSE_UNSUPPORTED_DATA` `🔓 export`

> 📄 `ws.vx` L55-55

```vex
export const CLOSE_UNSUPPORTED_DATA: u16=1003;
```

**Returns:** `u16=1003;`

---

### <a id="CLOSE_NO_STATUS"></a>`CLOSE_NO_STATUS` `🔓 export`

> 📄 `ws.vx` L56-56

```vex
export const CLOSE_NO_STATUS: u16=1005;
```

**Returns:** `u16=1005;`

---

### <a id="CLOSE_ABNORMAL"></a>`CLOSE_ABNORMAL` `🔓 export`

> 📄 `ws.vx` L57-57

```vex
export const CLOSE_ABNORMAL: u16=1006;
```

**Returns:** `u16=1006;`

---

### <a id="CLOSE_INVALID_PAYLOAD"></a>`CLOSE_INVALID_PAYLOAD` `🔓 export`

> 📄 `ws.vx` L58-58

```vex
export const CLOSE_INVALID_PAYLOAD: u16=1007;
```

**Returns:** `u16=1007;`

---

### <a id="CLOSE_POLICY_VIOLATION"></a>`CLOSE_POLICY_VIOLATION` `🔓 export`

> 📄 `ws.vx` L59-59

```vex
export const CLOSE_POLICY_VIOLATION: u16=1008;
```

**Returns:** `u16=1008;`

---

### <a id="CLOSE_MESSAGE_TOO_BIG"></a>`CLOSE_MESSAGE_TOO_BIG` `🔓 export`

> 📄 `ws.vx` L60-60

```vex
export const CLOSE_MESSAGE_TOO_BIG: u16=1009;
```

**Returns:** `u16=1009;`

---

### <a id="CLOSE_MANDATORY_EXT"></a>`CLOSE_MANDATORY_EXT` `🔓 export`

> 📄 `ws.vx` L61-61

```vex
export const CLOSE_MANDATORY_EXT: u16=1010;
```

**Returns:** `u16=1010;`

---

### <a id="CLOSE_INTERNAL_ERROR"></a>`CLOSE_INTERNAL_ERROR` `🔓 export`

> 📄 `ws.vx` L62-62

```vex
export const CLOSE_INTERNAL_ERROR: u16=1011;
```

**Returns:** `u16=1011;`

---

### <a id="H2_DEFAULT_URGENCY"></a>`H2_DEFAULT_URGENCY` `🔓 export`

> 📄 `h2_priority.vx` L15-15

```vex
export const H2_DEFAULT_URGENCY: u8=3;
```

**Returns:** `u8=3;`

---

### <a id="H2_MAX_PRIORITY_FIELD_BYTES"></a>`H2_MAX_PRIORITY_FIELD_BYTES` `🔓 export`

> 📄 `h2_priority.vx` L16-16

```vex
export const H2_MAX_PRIORITY_FIELD_BYTES: usize=1024;
```

**Returns:** `usize=1024;`

---

### <a id="SF_KIND_OTHER"></a>`SF_KIND_OTHER`

> 📄 `h2_priority.vx` L49-49

```vex
const SF_KIND_OTHER: u8=0;
```

**Returns:** `u8=0;`

---

### <a id="SF_KIND_INTEGER"></a>`SF_KIND_INTEGER`

> 📄 `h2_priority.vx` L50-50

```vex
const SF_KIND_INTEGER: u8=1;
```

**Returns:** `u8=1;`

---

### <a id="SF_KIND_BOOLEAN"></a>`SF_KIND_BOOLEAN`

> 📄 `h2_priority.vx` L51-51

```vex
const SF_KIND_BOOLEAN: u8=2;
```

**Returns:** `u8=2;`

---

### <a id="MAX_HEADERS"></a>`MAX_HEADERS`

> 📄 `headers.vx` L22-22

```vex
const MAX_HEADERS: usize=64;
```

**Returns:** `usize=64;`

---

### <a id="MULTIPART_MAX_BOUNDARY_BYTES"></a>`MULTIPART_MAX_BOUNDARY_BYTES`

> 📄 `multipart.vx` L14-14

```vex
const MULTIPART_MAX_BOUNDARY_BYTES: usize=70 as usize;
```

**Returns:** `usize=70 as usize;`

---

### <a id="MULTIPART_MIN_WORKSPACE_BYTES"></a>`MULTIPART_MIN_WORKSPACE_BYTES`

> 📄 `multipart.vx` L15-15

```vex
const MULTIPART_MIN_WORKSPACE_BYTES: usize=256 as usize;
```

**Returns:** `usize=256 as usize;`

---

### <a id="FRAME_DATA"></a>`FRAME_DATA` `🔓 export`

> 📄 `h2.vx` L24-24

```vex
export const FRAME_DATA: u8=0x0;
```

**Returns:** `u8=0x0;`

---

### <a id="FRAME_HEADERS"></a>`FRAME_HEADERS` `🔓 export`

> 📄 `h2.vx` L25-25

```vex
export const FRAME_HEADERS: u8=0x1;
```

**Returns:** `u8=0x1;`

---

### <a id="FRAME_PRIORITY"></a>`FRAME_PRIORITY` `🔓 export`

> 📄 `h2.vx` L26-26

```vex
export const FRAME_PRIORITY: u8=0x2;
```

**Returns:** `u8=0x2;`

---

### <a id="FRAME_RST_STREAM"></a>`FRAME_RST_STREAM` `🔓 export`

> 📄 `h2.vx` L27-27

```vex
export const FRAME_RST_STREAM: u8=0x3;
```

**Returns:** `u8=0x3;`

---

### <a id="FRAME_SETTINGS"></a>`FRAME_SETTINGS` `🔓 export`

> 📄 `h2.vx` L28-28

```vex
export const FRAME_SETTINGS: u8=0x4;
```

**Returns:** `u8=0x4;`

---

### <a id="FRAME_PUSH_PROMISE"></a>`FRAME_PUSH_PROMISE` `🔓 export`

> 📄 `h2.vx` L29-29

```vex
export const FRAME_PUSH_PROMISE: u8=0x5;
```

**Returns:** `u8=0x5;`

---

### <a id="FRAME_PING"></a>`FRAME_PING` `🔓 export`

> 📄 `h2.vx` L30-30

```vex
export const FRAME_PING: u8=0x6;
```

**Returns:** `u8=0x6;`

---

### <a id="FRAME_GOAWAY"></a>`FRAME_GOAWAY` `🔓 export`

> 📄 `h2.vx` L31-31

```vex
export const FRAME_GOAWAY: u8=0x7;
```

**Returns:** `u8=0x7;`

---

### <a id="FRAME_WINDOW_UPDATE"></a>`FRAME_WINDOW_UPDATE` `🔓 export`

> 📄 `h2.vx` L32-32

```vex
export const FRAME_WINDOW_UPDATE: u8=0x8;
```

**Returns:** `u8=0x8;`

---

### <a id="FRAME_CONTINUATION"></a>`FRAME_CONTINUATION` `🔓 export`

> 📄 `h2.vx` L33-33

```vex
export const FRAME_CONTINUATION: u8=0x9;
```

**Returns:** `u8=0x9;`

---

### <a id="FRAME_PRIORITY_UPDATE"></a>`FRAME_PRIORITY_UPDATE` `🔓 export`

> 📄 `h2.vx` L35-35

```vex
export const FRAME_PRIORITY_UPDATE: u8=0x10;
```

RFC 9218 extensible HTTP priority signal.

**Returns:** `u8=0x10;`

---

### <a id="FLAG_END_STREAM"></a>`FLAG_END_STREAM` `🔓 export`

> 📄 `h2.vx` L47-47

```vex
export const FLAG_END_STREAM: u8=0x1;
```

**Returns:** `u8=0x1;`

---

### <a id="FLAG_ACK"></a>`FLAG_ACK` `🔓 export`

> 📄 `h2.vx` L48-48

```vex
export const FLAG_ACK: u8=0x1;
```

**Returns:** `u8=0x1;`

---

### <a id="FLAG_END_HEADERS"></a>`FLAG_END_HEADERS` `🔓 export`

> 📄 `h2.vx` L49-49

```vex
export const FLAG_END_HEADERS: u8=0x4;
```

**Returns:** `u8=0x4;`

---

### <a id="FLAG_PADDED"></a>`FLAG_PADDED` `🔓 export`

> 📄 `h2.vx` L50-50

```vex
export const FLAG_PADDED: u8=0x8;
```

**Returns:** `u8=0x8;`

---

### <a id="FLAG_PRIORITY_F"></a>`FLAG_PRIORITY_F` `🔓 export`

> 📄 `h2.vx` L51-51

```vex
export const FLAG_PRIORITY_F: u8=0x20;
```

**Returns:** `u8=0x20;`

---

### <a id="ERR_NO_ERROR"></a>`ERR_NO_ERROR` `🔓 export`

> 📄 `h2.vx` L57-57

```vex
export const ERR_NO_ERROR: u32=0x0;
```

**Returns:** `u32=0x0;`

---

### <a id="ERR_PROTOCOL_ERROR"></a>`ERR_PROTOCOL_ERROR` `🔓 export`

> 📄 `h2.vx` L58-58

```vex
export const ERR_PROTOCOL_ERROR: u32=0x1;
```

**Returns:** `u32=0x1;`

---

### <a id="ERR_INTERNAL_ERROR"></a>`ERR_INTERNAL_ERROR` `🔓 export`

> 📄 `h2.vx` L59-59

```vex
export const ERR_INTERNAL_ERROR: u32=0x2;
```

**Returns:** `u32=0x2;`

---

### <a id="ERR_FLOW_CONTROL_ERROR"></a>`ERR_FLOW_CONTROL_ERROR` `🔓 export`

> 📄 `h2.vx` L60-60

```vex
export const ERR_FLOW_CONTROL_ERROR: u32=0x3;
```

**Returns:** `u32=0x3;`

---

### <a id="ERR_SETTINGS_TIMEOUT"></a>`ERR_SETTINGS_TIMEOUT` `🔓 export`

> 📄 `h2.vx` L61-61

```vex
export const ERR_SETTINGS_TIMEOUT: u32=0x4;
```

**Returns:** `u32=0x4;`

---

### <a id="ERR_STREAM_CLOSED"></a>`ERR_STREAM_CLOSED` `🔓 export`

> 📄 `h2.vx` L62-62

```vex
export const ERR_STREAM_CLOSED: u32=0x5;
```

**Returns:** `u32=0x5;`

---

### <a id="ERR_FRAME_SIZE_ERROR"></a>`ERR_FRAME_SIZE_ERROR` `🔓 export`

> 📄 `h2.vx` L63-63

```vex
export const ERR_FRAME_SIZE_ERROR: u32=0x6;
```

**Returns:** `u32=0x6;`

---

### <a id="ERR_REFUSED_STREAM"></a>`ERR_REFUSED_STREAM` `🔓 export`

> 📄 `h2.vx` L64-64

```vex
export const ERR_REFUSED_STREAM: u32=0x7;
```

**Returns:** `u32=0x7;`

---

### <a id="ERR_CANCEL"></a>`ERR_CANCEL` `🔓 export`

> 📄 `h2.vx` L65-65

```vex
export const ERR_CANCEL: u32=0x8;
```

**Returns:** `u32=0x8;`

---

### <a id="ERR_COMPRESSION_ERROR"></a>`ERR_COMPRESSION_ERROR` `🔓 export`

> 📄 `h2.vx` L66-66

```vex
export const ERR_COMPRESSION_ERROR: u32=0x9;
```

**Returns:** `u32=0x9;`

---

### <a id="ERR_CONNECT_ERROR"></a>`ERR_CONNECT_ERROR` `🔓 export`

> 📄 `h2.vx` L67-67

```vex
export const ERR_CONNECT_ERROR: u32=0xA;
```

**Returns:** `u32=0xA;`

---

### <a id="ERR_ENHANCE_YOUR_CALM"></a>`ERR_ENHANCE_YOUR_CALM` `🔓 export`

> 📄 `h2.vx` L68-68

```vex
export const ERR_ENHANCE_YOUR_CALM: u32=0xB;
```

**Returns:** `u32=0xB;`

---

### <a id="ERR_INADEQUATE_SECURITY"></a>`ERR_INADEQUATE_SECURITY` `🔓 export`

> 📄 `h2.vx` L69-69

```vex
export const ERR_INADEQUATE_SECURITY: u32=0xC;
```

**Returns:** `u32=0xC;`

---

### <a id="ERR_HTTP_1_1_REQUIRED"></a>`ERR_HTTP_1_1_REQUIRED` `🔓 export`

> 📄 `h2.vx` L70-70

```vex
export const ERR_HTTP_1_1_REQUIRED: u32=0xD;
```

**Returns:** `u32=0xD;`

---

### <a id="H2_FRAME_HEADER_SIZE"></a>`H2_FRAME_HEADER_SIZE` `🔓 export`

> 📄 `h2.vx` L85-85

```vex
export const H2_FRAME_HEADER_SIZE: usize=9;
```

Frame header is always 9 bytes.

**Returns:** `usize=9;`

---

### <a id="H2_SETTINGS_HEADER_TABLE_SIZE"></a>`H2_SETTINGS_HEADER_TABLE_SIZE` `🔓 export`

> 📄 `h2.vx` L349-349

```vex
export const H2_SETTINGS_HEADER_TABLE_SIZE: u8=1;
```

**Returns:** `u8=1;`

---

### <a id="H2_SETTINGS_ENABLE_PUSH"></a>`H2_SETTINGS_ENABLE_PUSH` `🔓 export`

> 📄 `h2.vx` L350-350

```vex
export const H2_SETTINGS_ENABLE_PUSH: u8=2;
```

**Returns:** `u8=2;`

---

### <a id="H2_SETTINGS_MAX_CONCURRENT_STREAMS"></a>`H2_SETTINGS_MAX_CONCURRENT_STREAMS` `🔓 export`

> 📄 `h2.vx` L351-351

```vex
export const H2_SETTINGS_MAX_CONCURRENT_STREAMS: u8=4;
```

**Returns:** `u8=4;`

---

### <a id="H2_SETTINGS_INITIAL_WINDOW_SIZE"></a>`H2_SETTINGS_INITIAL_WINDOW_SIZE` `🔓 export`

> 📄 `h2.vx` L352-352

```vex
export const H2_SETTINGS_INITIAL_WINDOW_SIZE: u8=8;
```

**Returns:** `u8=8;`

---

### <a id="H2_SETTINGS_MAX_FRAME_SIZE"></a>`H2_SETTINGS_MAX_FRAME_SIZE` `🔓 export`

> 📄 `h2.vx` L353-353

```vex
export const H2_SETTINGS_MAX_FRAME_SIZE: u8=16;
```

**Returns:** `u8=16;`

---

### <a id="H2_SETTINGS_MAX_HEADER_LIST_SIZE"></a>`H2_SETTINGS_MAX_HEADER_LIST_SIZE` `🔓 export`

> 📄 `h2.vx` L354-354

```vex
export const H2_SETTINGS_MAX_HEADER_LIST_SIZE: u8=32;
```

**Returns:** `u8=32;`

---

### <a id="STATIC_TABLE_SIZE"></a>`STATIC_TABLE_SIZE`

> 📄 `hpack.vx` L98-98

```vex
const STATIC_TABLE_SIZE: usize=61;
```

**Returns:** `usize=61;`

---

### <a id="HPACK_ENCODE_INDEXED"></a>`HPACK_ENCODE_INDEXED`

> 📄 `hpack.vx` L772-772

```vex
const HPACK_ENCODE_INDEXED: u8=1;
```

**Returns:** `u8=1;`

---

### <a id="HPACK_ENCODE_INCREMENTAL"></a>`HPACK_ENCODE_INCREMENTAL`

> 📄 `hpack.vx` L773-773

```vex
const HPACK_ENCODE_INCREMENTAL: u8=2;
```

**Returns:** `u8=2;`

---

### <a id="HPACK_ENCODE_WITHOUT"></a>`HPACK_ENCODE_WITHOUT`

> 📄 `hpack.vx` L774-774

```vex
const HPACK_ENCODE_WITHOUT: u8=3;
```

**Returns:** `u8=3;`

---

### <a id="HPACK_ENCODE_NEVER"></a>`HPACK_ENCODE_NEVER`

> 📄 `hpack.vx` L775-775

```vex
const HPACK_ENCODE_NEVER: u8=4;
```

**Returns:** `u8=4;`

---

### <a id="MAX_CHUNK_LINE_BYTES"></a>`MAX_CHUNK_LINE_BYTES`

> 📄 `chunked.vx` L8-8

```vex
const MAX_CHUNK_LINE_BYTES: usize=1024;
```

**Returns:** `usize=1024;`

---

### <a id="MAX_TRAILER_BYTES"></a>`MAX_TRAILER_BYTES`

> 📄 `chunked.vx` L9-9

```vex
const MAX_TRAILER_BYTES: usize=8192;
```

**Returns:** `usize=8192;`

---

### <a id="INIT_CAP"></a>`INIT_CAP`

> 📄 `connection.vx` L37-37

```vex
const INIT_CAP: usize=8192;
```

Default initial buffer capacity (8 KB covers most HTTP requests).

**Returns:** `usize=8192;`

---

### <a id="MAX_BUF"></a>`MAX_BUF`

> 📄 `connection.vx` L40-40

```vex
const MAX_BUF: usize=1048576;
```

Maximum buffer size to prevent OOM from malicious clients (1 MB).

**Returns:** `usize=1048576;`

---

### <a id="HTTP_V1"></a>`HTTP_V1` `🔓 export`

> 📄 `capabilities.vx` L8-8

```vex
export const HTTP_V1: u32=1 as u32;
```

**Returns:** `u32=1 as u32;`

---

### <a id="HTTP_V2"></a>`HTTP_V2` `🔓 export`

> 📄 `capabilities.vx` L9-9

```vex
export const HTTP_V2: u32=1 as u32 << 1;
```

**Returns:** `u32=1 as u32 &lt;&lt; 1;`

---

### <a id="WEBSOCKET"></a>`WEBSOCKET` `🔓 export`

> 📄 `capabilities.vx` L10-10

```vex
export const WEBSOCKET: u32=1 as u32 << 2;
```

**Returns:** `u32=1 as u32 &lt;&lt; 2;`

---

### <a id="ASYNC_ROUTES"></a>`ASYNC_ROUTES` `🔓 export`

> 📄 `capabilities.vx` L11-11

```vex
export const ASYNC_ROUTES: u32=1 as u32 << 3;
```

**Returns:** `u32=1 as u32 &lt;&lt; 3;`

---

### <a id="REQUEST_STREAMING"></a>`REQUEST_STREAMING` `🔓 export`

> 📄 `capabilities.vx` L12-12

```vex
export const REQUEST_STREAMING: u32=1 as u32 << 4;
```

**Returns:** `u32=1 as u32 &lt;&lt; 4;`

---

### <a id="RESPONSE_STREAMING"></a>`RESPONSE_STREAMING` `🔓 export`

> 📄 `capabilities.vx` L13-13

```vex
export const RESPONSE_STREAMING: u32=1 as u32 << 5;
```

**Returns:** `u32=1 as u32 &lt;&lt; 5;`

---

### <a id="HTTP_FULL"></a>`HTTP_FULL` `🔓 export`

> 📄 `capabilities.vx` L14-15

```vex
export const HTTP_FULL: u32=HTTP_V1 | HTTP_V2 | WEBSOCKET |
    ASYNC_ROUTES | REQUEST_STREAMING | RESPONSE_STREAMING;
```

**Returns:** `u32=HTTP_V1 &#124; HTTP_V2 &#124; WEBSOCKET &#124;
    ASYNC_ROUTES &#124; REQUEST_STREAMING &#124; RESPONSE_STREAMING;`

---

### <a id="DEFAULT_MAX_CONNECTIONS"></a>`DEFAULT_MAX_CONNECTIONS`

> 📄 `app.vx` L68-68

```vex
const DEFAULT_MAX_CONNECTIONS: i32=65536;
```

**Returns:** `i32=65536;`

---

### <a id="HTTP1_RETAINED_BODY_BYTES"></a>`HTTP1_RETAINED_BODY_BYTES`

> 📄 `app.vx` L72-72

```vex
const HTTP1_RETAINED_BODY_BYTES: usize=64 * 1024;
```

**Returns:** `usize=64 * 1024;`

---

### <a id="WS_MAX_FRAMES_PER_TURN"></a>`WS_MAX_FRAMES_PER_TURN`

> 📄 `app.vx` L76-76

```vex
const WS_MAX_FRAMES_PER_TURN: usize=256 as usize;
```

**Returns:** `usize=256 as usize;`

---

### <a id="DEFERRED_CONNECTIONS_PER_TURN"></a>`DEFERRED_CONNECTIONS_PER_TURN`

> 📄 `app.vx` L77-77

```vex
const DEFERRED_CONNECTIONS_PER_TURN: usize=64 as usize;
```

**Returns:** `usize=64 as usize;`

---

### <a id="WS_TURN_CLOSED"></a>`WS_TURN_CLOSED`

> 📄 `app.vx` L78-78

```vex
const WS_TURN_CLOSED: i32=0;
```

**Returns:** `i32=0;`

---

### <a id="WS_TURN_IDLE"></a>`WS_TURN_IDLE`

> 📄 `app.vx` L79-79

```vex
const WS_TURN_IDLE: i32=1;
```

**Returns:** `i32=1;`

---

### <a id="WS_TURN_DEFERRED"></a>`WS_TURN_DEFERRED`

> 📄 `app.vx` L80-80

```vex
const WS_TURN_DEFERRED: i32=2;
```

**Returns:** `i32=2;`

---

### <a id="H2_TURN_CLOSED"></a>`H2_TURN_CLOSED`

> 📄 `app.vx` L81-81

```vex
const H2_TURN_CLOSED: i32=0;
```

**Returns:** `i32=0;`

---

### <a id="H2_TURN_IDLE"></a>`H2_TURN_IDLE`

> 📄 `app.vx` L82-82

```vex
const H2_TURN_IDLE: i32=1;
```

**Returns:** `i32=1;`

---

### <a id="H2_TURN_DEFERRED"></a>`H2_TURN_DEFERRED`

> 📄 `app.vx` L83-83

```vex
const H2_TURN_DEFERRED: i32=2;
```

**Returns:** `i32=2;`

---

### <a id="PREFACE_HTTP1"></a>`PREFACE_HTTP1`

> 📄 `app.vx` L84-84

```vex
const PREFACE_HTTP1: i32=0;
```

**Returns:** `i32=0;`

---

### <a id="PREFACE_PENDING"></a>`PREFACE_PENDING`

> 📄 `app.vx` L85-85

```vex
const PREFACE_PENDING: i32=1;
```

**Returns:** `i32=1;`

---

### <a id="PREFACE_HTTP2"></a>`PREFACE_HTTP2`

> 📄 `app.vx` L86-86

```vex
const PREFACE_HTTP2: i32=2;
```

**Returns:** `i32=2;`

---

### <a id="FIBER_ASYNC_SCHEDULER_RESERVE"></a>`FIBER_ASYNC_SCHEDULER_RESERVE`

> 📄 `app.vx` L90-90

```vex
const FIBER_ASYNC_SCHEDULER_RESERVE: i32=1;
```

**Returns:** `i32=1;`

---

### <a id="ASYNC_RETURN_QUEUE_CAPACITY"></a>`ASYNC_RETURN_QUEUE_CAPACITY`

> 📄 `app.vx` L95-95

```vex
const ASYNC_RETURN_QUEUE_CAPACITY: usize=4096 as usize;
```

**Returns:** `usize=4096 as usize;`

---

### <a id="ASYNC_RETURNS_PER_TURN"></a>`ASYNC_RETURNS_PER_TURN`

> 📄 `app.vx` L96-96

```vex
const ASYNC_RETURNS_PER_TURN: usize=256 as usize;
```

**Returns:** `usize=256 as usize;`

---

### <a id="H2_ASYNC_COMPLETION_QUEUE_CAPACITY"></a>`H2_ASYNC_COMPLETION_QUEUE_CAPACITY`

> 📄 `app.vx` L100-100

```vex
const H2_ASYNC_COMPLETION_QUEUE_CAPACITY: usize=4096 as usize;
```

**Returns:** `usize=4096 as usize;`

---

### <a id="H2_ASYNC_COMPLETIONS_PER_TURN"></a>`H2_ASYNC_COMPLETIONS_PER_TURN`

> 📄 `app.vx` L101-101

```vex
const H2_ASYNC_COMPLETIONS_PER_TURN: usize=256 as usize;
```

**Returns:** `usize=256 as usize;`

---

### <a id="HTTP_FEATURE_H2"></a>`HTTP_FEATURE_H2`

> 📄 `app.vx` L103-103

```vex
const HTTP_FEATURE_H2: u32=HTTP_V2;
```

**Returns:** `u32=HTTP_V2;`

---

### <a id="HTTP_FEATURE_WEBSOCKET"></a>`HTTP_FEATURE_WEBSOCKET`

> 📄 `app.vx` L104-104

```vex
const HTTP_FEATURE_WEBSOCKET: u32=WEBSOCKET;
```

**Returns:** `u32=WEBSOCKET;`

---

### <a id="HTTP_FEATURE_ASYNC_ROUTE"></a>`HTTP_FEATURE_ASYNC_ROUTE`

> 📄 `app.vx` L105-105

```vex
const HTTP_FEATURE_ASYNC_ROUTE: u32=ASYNC_ROUTES;
```

**Returns:** `u32=ASYNC_ROUTES;`

---

### <a id="HTTP_FEATURE_ASYNC_BODY"></a>`HTTP_FEATURE_ASYNC_BODY`

> 📄 `app.vx` L106-106

```vex
const HTTP_FEATURE_ASYNC_BODY: u32=REQUEST_STREAMING;
```

**Returns:** `u32=REQUEST_STREAMING;`

---

### <a id="HTTP_FEATURE_RESPONSE_STREAM"></a>`HTTP_FEATURE_RESPONSE_STREAM`

> 📄 `app.vx` L107-107

```vex
const HTTP_FEATURE_RESPONSE_STREAM: u32=RESPONSE_STREAMING;
```

**Returns:** `u32=RESPONSE_STREAMING;`

---

### <a id="HTTP_FEATURES_HTTP1_SYNC"></a>`HTTP_FEATURES_HTTP1_SYNC`

> 📄 `app.vx` L108-108

```vex
const HTTP_FEATURES_HTTP1_SYNC: u32=HTTP_V1;
```

**Returns:** `u32=HTTP_V1;`

---

### <a id="HTTP_FEATURES_FULL"></a>`HTTP_FEATURES_FULL`

> 📄 `app.vx` L109-109

```vex
const HTTP_FEATURES_FULL: u32=HTTP_FULL;
```

**Returns:** `u32=HTTP_FULL;`

---

### <a id="OFFSET_SHIFT_4"></a>`OFFSET_SHIFT_4`

> 📄 `app.vx` L1928-1928

```vex
const OFFSET_SHIFT_4: [i32; 4]=[0, 8, 16, 24];
```

**Returns:** `[i32; 4]=[0, 8, 16, 24];`

---

### <a id="STREAM_WRITE_BUFFER_BYTES"></a>`STREAM_WRITE_BUFFER_BYTES`

> 📄 `ctx.vx` L37-37

```vex
const STREAM_WRITE_BUFFER_BYTES: usize=65536 as usize;
```

**Returns:** `usize=65536 as usize;`

---

### <a id="NODE_STATIC"></a>`NODE_STATIC`

> 📄 `radix.vx` L6-6

```vex
const NODE_STATIC: i32=0;
```

**Returns:** `i32=0;`

---

### <a id="NODE_PARAM"></a>`NODE_PARAM`

> 📄 `radix.vx` L7-7

```vex
const NODE_PARAM: i32=1;
```

**Returns:** `i32=1;`

---

### <a id="NODE_CATCH"></a>`NODE_CATCH`

> 📄 `radix.vx` L8-8

```vex
const NODE_CATCH: i32=2;
```

**Returns:** `i32=2;`

---

### <a id="NO_PARENT"></a>`NO_PARENT`

> 📄 `radix.vx` L9-9

```vex
const NO_PARENT: i32=- 1;
```

**Returns:** `i32=- 1;`

---

### <a id="H2_CLIENT_PREFACE"></a>`H2_CLIENT_PREFACE` `🔓 export`

> 📄 `h2_transport.vx` L44-44

```vex
export const H2_CLIENT_PREFACE: str="PRI * HTTP/2.0\r\n\r\nSM\r\n\r\n";
```

**Returns:** `str="PRI * HTTP/2.0\r\n\r\nSM\r\n\r\n";`

---

### <a id="H2_CONTROL_RESERVE"></a>`H2_CONTROL_RESERVE`

> 📄 `h2_transport.vx` L45-45

```vex
const H2_CONTROL_RESERVE: usize=64 as usize;
```

**Returns:** `usize=64 as usize;`

---

### <a id="H2_CREDIT_BATCH_BYTES"></a>`H2_CREDIT_BATCH_BYTES`

> 📄 `h2_transport.vx` L46-46

```vex
const H2_CREDIT_BATCH_BYTES: u32=32768 as u32;
```

**Returns:** `u32=32768 as u32;`

---

### <a id="ASYNC_BODY_PAGE_BYTES"></a>`ASYNC_BODY_PAGE_BYTES`

> 📄 `async_body.vx` L21-21

```vex
const ASYNC_BODY_PAGE_BYTES: usize=16 * 1024;
```

**Returns:** `usize=16 * 1024;`

---

### <a id="ASYNC_BODY_PAGE_COUNT"></a>`ASYNC_BODY_PAGE_COUNT`

> 📄 `async_body.vx` L22-22

```vex
const ASYNC_BODY_PAGE_COUNT: usize=4 as usize;
```

**Returns:** `usize=4 as usize;`

---

### <a id="ASYNC_BODY_WORKSPACE_BYTES"></a>`ASYNC_BODY_WORKSPACE_BYTES`

> 📄 `async_body.vx` L23-23

```vex
const ASYNC_BODY_WORKSPACE_BYTES: usize=ASYNC_BODY_PAGE_BYTES * ASYNC_BODY_PAGE_COUNT;
```

**Returns:** `usize=ASYNC_BODY_PAGE_BYTES * ASYNC_BODY_PAGE_COUNT;`

---

### <a id="DEFAULT_MAX_REQUEST_BYTES"></a>`DEFAULT_MAX_REQUEST_BYTES`

> 📄 `client.vx` L32-32

```vex
const DEFAULT_MAX_REQUEST_BYTES: usize=4 * 1024 * 1024;
```

**Returns:** `usize=4 * 1024 * 1024;`

---

### <a id="DEFAULT_MAX_RESPONSE_HEADER_BYTES"></a>`DEFAULT_MAX_RESPONSE_HEADER_BYTES`

> 📄 `client.vx` L33-33

```vex
const DEFAULT_MAX_RESPONSE_HEADER_BYTES: usize=32 * 1024;
```

**Returns:** `usize=32 * 1024;`

---

### <a id="DEFAULT_MAX_RESPONSE_BODY_BYTES"></a>`DEFAULT_MAX_RESPONSE_BODY_BYTES`

> 📄 `client.vx` L34-34

```vex
const DEFAULT_MAX_RESPONSE_BODY_BYTES: usize=16 * 1024 * 1024;
```

**Returns:** `usize=16 * 1024 * 1024;`

---

### <a id="DEFAULT_MAX_RESPONSE_HEADERS"></a>`DEFAULT_MAX_RESPONSE_HEADERS`

> 📄 `client.vx` L35-35

```vex
const DEFAULT_MAX_RESPONSE_HEADERS: usize=64;
```

**Returns:** `usize=64;`

---

### <a id="DEFAULT_MAX_INFORMATIONAL_RESPONSES"></a>`DEFAULT_MAX_INFORMATIONAL_RESPONSES`

> 📄 `client.vx` L36-36

```vex
const DEFAULT_MAX_INFORMATIONAL_RESPONSES: usize=16;
```

**Returns:** `usize=16;`

---

### <a id="MAX_INFORMATIONAL_RESPONSES"></a>`MAX_INFORMATIONAL_RESPONSES`

> 📄 `client.vx` L37-37

```vex
const MAX_INFORMATIONAL_RESPONSES: usize=64;
```

**Returns:** `usize=64;`

---

### <a id="DEFAULT_MAX_REDIRECTS"></a>`DEFAULT_MAX_REDIRECTS`

> 📄 `client.vx` L38-38

```vex
const DEFAULT_MAX_REDIRECTS: usize=10;
```

**Returns:** `usize=10;`

---

### <a id="MAX_REDIRECTS"></a>`MAX_REDIRECTS`

> 📄 `client.vx` L39-39

```vex
const MAX_REDIRECTS: usize=64;
```

**Returns:** `usize=64;`

---

### <a id="DEFAULT_MAX_CONTENT_ENCODING_LAYERS"></a>`DEFAULT_MAX_CONTENT_ENCODING_LAYERS`

> 📄 `client.vx` L40-40

```vex
const DEFAULT_MAX_CONTENT_ENCODING_LAYERS: usize=4;
```

**Returns:** `usize=4;`

---

### <a id="MAX_CONTENT_ENCODING_LAYERS"></a>`MAX_CONTENT_ENCODING_LAYERS`

> 📄 `client.vx` L41-41

```vex
const MAX_CONTENT_ENCODING_LAYERS: usize=16;
```

**Returns:** `usize=16;`

---

### <a id="DEFAULT_MAX_REQUEST_HEADERS"></a>`DEFAULT_MAX_REQUEST_HEADERS`

> 📄 `client.vx` L42-42

```vex
const DEFAULT_MAX_REQUEST_HEADERS: usize=64;
```

**Returns:** `usize=64;`

---

### <a id="CLIENT_READ_BUFFER_BYTES"></a>`CLIENT_READ_BUFFER_BYTES`

> 📄 `client.vx` L43-43

```vex
const CLIENT_READ_BUFFER_BYTES: usize=16 * 1024;
```

**Returns:** `usize=16 * 1024;`

---

### <a id="CLIENT_RESPONSE_RETAINED_BODY_BYTES"></a>`CLIENT_RESPONSE_RETAINED_BODY_BYTES`

> 📄 `client.vx` L48-48

```vex
const CLIENT_RESPONSE_RETAINED_BODY_BYTES: usize=4 * CLIENT_READ_BUFFER_BYTES;
```

**Returns:** `usize=4 * CLIENT_READ_BUFFER_BYTES;`

---

### <a id="DEFAULT_WRITE_TIMEOUT_MS"></a>`DEFAULT_WRITE_TIMEOUT_MS`

> 📄 `response.vx` L20-20

```vex
const DEFAULT_WRITE_TIMEOUT_MS: i32=5000;
```

**Returns:** `i32=5000;`

---

### <a id="ERR_TIMED_OUT"></a>`ERR_TIMED_OUT`

> 📄 `response.vx` L21-21

```vex
const ERR_TIMED_OUT: i64=- 110;
```

**Returns:** `i64=- 110;`

---

### <a id="ERR_BROKEN_PIPE"></a>`ERR_BROKEN_PIPE`

> 📄 `response.vx` L22-22

```vex
const ERR_BROKEN_PIPE: i64=- 32;
```

**Returns:** `i64=- 32;`

---

### <a id="WS_TEXT"></a>`WS_TEXT` `🔓 export`

> 📄 `ws.vx` L29-29

```vex
export const WS_TEXT: u8=1;
```

**Returns:** `u8=1;`

---

### <a id="WS_BINARY"></a>`WS_BINARY` `🔓 export`

> 📄 `ws.vx` L30-30

```vex
export const WS_BINARY: u8=2;
```

**Returns:** `u8=2;`

---

### <a id="WS_CLOSE"></a>`WS_CLOSE` `🔓 export`

> 📄 `ws.vx` L31-31

```vex
export const WS_CLOSE: u8=8;
```

**Returns:** `u8=8;`

---

### <a id="WS_PING"></a>`WS_PING` `🔓 export`

> 📄 `ws.vx` L32-32

```vex
export const WS_PING: u8=9;
```

**Returns:** `u8=9;`

---

### <a id="WS_PONG"></a>`WS_PONG` `🔓 export`

> 📄 `ws.vx` L33-33

```vex
export const WS_PONG: u8=10;
```

**Returns:** `u8=10;`

---

### <a id="WS_MAX_MESSAGE_BYTES"></a>`WS_MAX_MESSAGE_BYTES`

> 📄 `ws.vx` L35-35

```vex
const WS_MAX_MESSAGE_BYTES: usize=WS_MAX_BUFFER_BYTES;
```

**Returns:** `usize=WS_MAX_BUFFER_BYTES;`

---

### <a id="WS_MAX_SUBPROTOCOLS"></a>`WS_MAX_SUBPROTOCOLS` `🔓 export`

> 📄 `ws.vx` L38-38

```vex
export const WS_MAX_SUBPROTOCOLS: usize=32 as usize;
```

A handshake may advertise several subprotocols, but an attacker-controlled

comma list must not turn route selection into unbounded quadratic work.

**Returns:** `usize=32 as usize;`

---

### <a id="WS_MAX_SUBPROTOCOL_BYTES"></a>`WS_MAX_SUBPROTOCOL_BYTES` `🔓 export`

> 📄 `ws.vx` L42-42

```vex
export const WS_MAX_SUBPROTOCOL_BYTES: usize=255 as usize;
```

Route-level subprotocol identifiers are bounded independently of the

request-header ceiling. This keeps the arena-safe handoff snapshot fixed
size while remaining far above practical registered protocol names.

**Returns:** `usize=255 as usize;`

---

### <a id="WS_MAX_QUEUED_BYTES"></a>`WS_MAX_QUEUED_BYTES` `🔓 export`

> 📄 `session.vx` L28-28

```vex
export const WS_MAX_QUEUED_BYTES: usize=WS_MAX_BUFFER_BYTES;
```

The output limit is intentionally equal to the accepted input/message

limit. It makes a slow peer a bounded backpressure condition instead of an
unbounded worker-memory commitment.

**Returns:** `usize=WS_MAX_BUFFER_BYTES;`

---

### <a id="WS_INITIAL_READ_BYTES"></a>`WS_INITIAL_READ_BYTES`

> 📄 `session.vx` L29-29

```vex
const WS_INITIAL_READ_BYTES: usize=1024 as usize;
```

**Returns:** `usize=1024 as usize;`

---

### <a id="WS_INITIAL_WRITE_BYTES"></a>`WS_INITIAL_WRITE_BYTES`

> 📄 `session.vx` L30-30

```vex
const WS_INITIAL_WRITE_BYTES: usize=256 as usize;
```

**Returns:** `usize=256 as usize;`

---

### <a id="WS_FRAME_CLOSED"></a>`WS_FRAME_CLOSED` `🔓 export`

> 📄 `session.vx` L36-36

```vex
export const WS_FRAME_CLOSED: i32=-2;
```

**Returns:** `i32=-2;`

---

### <a id="WS_FRAME_NEED_MORE"></a>`WS_FRAME_NEED_MORE` `🔓 export`

> 📄 `session.vx` L37-37

```vex
export const WS_FRAME_NEED_MORE: i32=-1;
```

**Returns:** `i32=-1;`

---

### <a id="WS_FRAME_CONTROL"></a>`WS_FRAME_CONTROL` `🔓 export`

> 📄 `session.vx` L38-38

```vex
export const WS_FRAME_CONTROL: i32=0;
```

**Returns:** `i32=0;`

---

### <a id="WS_FRAME_MESSAGE"></a>`WS_FRAME_MESSAGE` `🔓 export`

> 📄 `session.vx` L39-39

```vex
export const WS_FRAME_MESSAGE: i32=1;
```

**Returns:** `i32=1;`

---

## Type Aliases

### <a id="RequestHandler"></a>`RequestHandler`

> 📄 `handler.vx` L16-16

```vex
type RequestHandler = fn (req: &Request, res: &Response!)
```

Direct request/response callback for `Server` and `App.serveDirect`.

The request is valid only for the callback. Responses are buffered into the
worker-owned connection output and drained after the callback returns.

**Returns:** `fn (req: &amp;Request, res: &amp;Response!)`

---

### <a id="H1ConnectionState"></a>`H1ConnectionState`

> 📄 `app.vx` L204-204

```vex
type H1ConnectionState = ConnectionState<FullProtocolState>
```

**Returns:** `ConnectionState&lt;FullProtocolState&gt;`

---

### <a id="Http1SyncConnectionState"></a>`Http1SyncConnectionState`

> 📄 `app.vx` L205-205

```vex
type Http1SyncConnectionState = ConnectionState<Http1SyncProtocolState>
```

**Returns:** `ConnectionState&lt;Http1SyncProtocolState&gt;`

---

### <a id="Handler"></a>`Handler`

> 📄 `ctx.vx` L39-39

```vex
type Handler = fn ( &Ctx!)
```

**Returns:** `fn ( &amp;Ctx!)`

---

### <a id="StreamHandler"></a>`StreamHandler`

> 📄 `ctx.vx` L44-44

```vex
type StreamHandler = fn ( &Ctx!, &ResponseStreamWriter!)
```

A bounded HTTP response producer. The route owns response metadata through

`Ctx` until its first `out.write`; afterwards `ResponseStreamWriter` is the
only path which can produce body bytes and HTTP/1 framing.

**Returns:** `fn ( &amp;Ctx!, &amp;ResponseStreamWriter!)`

---

### <a id="WsHandler"></a>`WsHandler`

> 📄 `ctx.vx` L90-90

```vex
type WsHandler = fn ( &WsSession!, WsMessage)
```

Runs on the owning Fiber worker for each complete WebSocket message. The

`WsSession` borrow is event-scoped: applications can queue replies but do
not receive descriptor ownership or a blocking read primitive.

**Returns:** `fn ( &amp;WsSession!, WsMessage)`

---

### <a id="WsOpenHandler"></a>`WsOpenHandler`

> 📄 `ctx.vx` L95-95

```vex
type WsOpenHandler = fn ( &WsSession!)
```

Runs after Fiber has accepted a valid upgrade and queued its `101` reply.

The borrow is worker-scoped, so opening work can queue a welcome frame but
cannot take ownership of the descriptor.

**Returns:** `fn ( &amp;WsSession!)`

---

### <a id="WsCloseHandler"></a>`WsCloseHandler`

> 📄 `ctx.vx` L101-101

```vex
type WsCloseHandler = fn (u64)
```

Runs exactly once when Fiber retires a WebSocket connection. The supplied

identity is stable for the session but is never an OS descriptor. Close
hooks are observational: transport ownership has ended, so no session
handle is exposed for further I/O.

**Returns:** `fn (u64)`

---

### <a id="AsyncHandler"></a>`AsyncHandler`

> 📄 `async_pipeline.vx` L23-23

```vex
type AsyncHandler = async fn(&Ctx!, &AsyncPipelineNext!, &Context)
```

A task-owned, awaitable Fiber handler. This is an explicit async lane;

ordinary `Handler` remains synchronous by design.

**Returns:** `async fn(&amp;Ctx!, &amp;AsyncPipelineNext!, &amp;Context)`

---

### <a id="AsyncBodyHandler"></a>`AsyncBodyHandler`

> 📄 `async_body.vx` L28-30

```vex
type AsyncBodyHandler = async fn(
    &Ctx!, &AsyncRequestBody!, &AsyncBodyPipelineNext!, &Context
)
```

One explicit awaitable body-route step. All middleware in this lane sees

the same task-owned request body and continuation; ordinary synchronous
Fiber middleware is never allowed to retain either value.

**Returns:** `async fn(
    &amp;Ctx!, &amp;AsyncRequestBody!, &amp;AsyncBodyPipelineNext!, &amp;Context
)`

---

## Contracts

### <a id="MultipartSink"></a>`MultipartSink`

> 📄 `multipart.vx` L50-57

```vex
contract MultipartSink
```

Synchronous destination for one decoded multipart stream. The contract is

deliberately allocation-free and non-awaitable at the byte seam: Fiber's
task-owned page ring has already established ownership before invoking it.

**Implements:** `MultipartSink.unknown` & `MultipartSink.unknown` & `MultipartSink.unknown` & `MultipartSink.unknown` & `MultipartSink.unknown` & `MultipartSink.unknown`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `unknown`[↗](#MultipartSink.unknown) | `fn unknown(info: MultipartPartInfo): bool;` |  |
| `unknown`[↗](#MultipartSink.unknown) | `fn unknown(name: str, value: str): bool;` |  |
| `unknown`[↗](#MultipartSink.unknown) | `fn unknown(bytes: str): bool;` |  |
| `unknown`[↗](#MultipartSink.unknown) | `fn unknown(): bool;` |  |
| `unknown`[↗](#MultipartSink.unknown) | `fn unknown(partCount: usize): bool;` |  |
| `unknown`[↗](#MultipartSink.unknown) | `fn unknown()` |  |

---

### <a id="RequestBodyConsumer"></a>`RequestBodyConsumer`

> 📄 `body.vx` L77-82

```vex
contract RequestBodyConsumer
```

Stateful destination for one bounded decoded HTTP body.

The lifecycle is deliberately synchronous at the byte-delivery seam:
`acceptChunk` receives a borrowed transport view, so acknowledging it after
an `await` would be an ownership violation. Async Fiber routes will place
owned fixed-capacity pages *before* this contract, not turn this contract
into a raw descriptor callback.

**Implements:** `RequestBodyConsumer.unknown` & `RequestBodyConsumer.unknown` & `RequestBodyConsumer.unknown` & `RequestBodyConsumer.unknown`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `unknown`[↗](#RequestBodyConsumer.unknown) | `fn unknown(info: BodyConsumerStart): bool;` |  |
| `unknown`[↗](#RequestBodyConsumer.unknown) | `fn unknown(bytes: str): bool;` |  |
| `unknown`[↗](#RequestBodyConsumer.unknown) | `fn unknown(totalBytes: usize): bool;` |  |
| `unknown`[↗](#RequestBodyConsumer.unknown) | `fn unknown()` |  |

---

### <a id="ChunkSink"></a>`ChunkSink`

> 📄 `chunked.vx` L40-42

```vex
contract ChunkSink
```

Destination for decoded transfer-coding payload bytes.

The view is borrowed from the current transport fragment and is valid only
for this call. Returning `false` aborts decoding without accepting later
transport bytes. This is a statically-dispatched contract: a streaming
consumer does not pay for a closure, allocation, or virtual call.

**Implements:** `ChunkSink.unknown`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `unknown`[↗](#ChunkSink.unknown) | `fn unknown(bytes: str): bool;` |  |

---

### <a id="BufferedApplicationDispatcher"></a>`BufferedApplicationDispatcher`

> 📄 `application_contract.vx` L29-31

```vex
contract BufferedApplicationDispatcher
```

Static application capability shared by HTTP/1, HTTP/2 and future HTTP/3.

Implementations pay no virtual dispatch or allocation cost.

**Implements:** `BufferedApplicationDispatcher.unknown`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `unknown`[↗](#BufferedApplicationDispatcher.unknown) | `fn unknown(ctx: &amp;Ctx!): ApplicationDispatchResult;` |  |

---

### <a id="HttpRedirectResolver"></a>`HttpRedirectResolver`

> 📄 `client.vx` L134-138

```vex
contract HttpRedirectResolver
```

Async authority-to-endpoint boundary used only by cross-origin redirects.

Implementations receive an HTTP host and effective port. They may consult
an application-owned pre-resolved map or an async resolver, but must not
perform blocking DNS on a scheduler worker. Same-origin redirects never
invoke this contract and keep using the caller's original endpoint.

**Implements:** `HttpRedirectResolver.unknown`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| ⚡`unknown`[↗](#HttpRedirectResolver.unknown) | `fn unknown(host: str, port: u16, context: &amp;Context` |  |

---

## Structs

### <a id="FixedRedirectResolver"></a>`FixedRedirectResolver`

> 📄 `client.test.vx` L20-25

```vex
struct FixedRedirectResolver
```

**Implements:** `HttpRedirectResolver`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `endpoint` | `SocketAddr` | 🔒 private |  |
| `expectedHost` | `string` | 🔒 private |  |
| `expectedPort` | `u16` | 🔒 private |  |
| `calls` | `Channel&lt;i32&gt;` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| ⚡`resolve`[↗](#FixedRedirectResolver.resolve) | `fn (self: &amp;FixedRedirectResolver) resolve(host: st` |  |

---

### <a id="RecordingSink"></a>`RecordingSink`

> 📄 `client.test.vx` L79-81

```vex
struct RecordingSink
```

Records every decoded streaming fragment without assuming how TCP chooses

to split a response. The test joins the known body length at the consumer.

**Implements:** `AsyncWriter`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `chunks` | `Channel&lt;string&gt;` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| ⚡`write`[↗](#RecordingSink.write) | `fn (self: &amp;RecordingSink) write(data: Ptr&lt;u8&gt;, len` |  |

---

### <a id="FragmentedSource"></a>`FragmentedSource`

> 📄 `client.test.vx` L94-98

```vex
struct FragmentedSource
```

Deterministic short-read source used to prove that request streaming loops

over the AsyncReader contract instead of assuming one read equals one body.

**Implements:** `AsyncReader`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `data` | `string` | 🔒 private |  |
| `offset` | `usize` | 🔒 private |  |
| `maxChunk` | `usize` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `FragmentedSource.new`[↗](#FragmentedSource.new) | `fn FragmentedSource.new(data: str, maxChunk: usize` |  |
| ⚡`read`[↗](#FragmentedSource.read) | `fn (self: &amp;FragmentedSource!) read(output: Ptr&lt;u8!` |  |

---

### <a id="DynamicLaneBenchState"></a>`DynamicLaneBenchState`

> 📄 `bench.test.vx` L224-227

```vex
struct DynamicLaneBenchState
```

Dynamic lanes must be classified before user code and without allocating a

protocol-specific writer. This measures the complete frozen match plus the
typed capability boundary on a worker-reused context.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `app` | `App` | 🔒 private |  |
| `ctx` | `Ctx` | 🔒 private |  |

---

### <a id="ResponseAppendState"></a>`ResponseAppendState`

> 📄 `bench.test.vx` L279-282

```vex
struct ResponseAppendState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `response` | `Response` | 🔒 private |  |
| `output` | `StringBuilder` | 🔒 private |  |

---

### <a id="KeepAliveBodySink"></a>`KeepAliveBodySink`

> 📄 `async_body_keepalive.test.vx` L16-19

```vex
struct KeepAliveBodySink
```

**Implements:** `RequestBodyConsumer`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `bytes` | `StringBuilder` | 🔒 private |  |
| `complete` | `bool` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `KeepAliveBodySink.new`[↗](#KeepAliveBodySink.new) | `fn KeepAliveBodySink.new(): KeepAliveBodySink` |  |
| `begin`[↗](#KeepAliveBodySink.begin) | `fn (self: &amp;KeepAliveBodySink!) begin(_info: BodyCo` |  |
| `acceptChunk`[↗](#KeepAliveBodySink.acceptChunk) | `fn (self: &amp;KeepAliveBodySink!) acceptChunk(bytes: ` |  |
| `finish`[↗](#KeepAliveBodySink.finish) | `fn (self: &amp;KeepAliveBodySink!) finish(totalBytes: ` |  |
| `cancel`[↗](#KeepAliveBodySink.cancel) | `fn (self: &amp;KeepAliveBodySink!) cancel()` |  |

---

### <a id="H2BodySink"></a>`H2BodySink`

> 📄 `h2_application.test.vx` L59-65

```vex
struct H2BodySink
```

**Implements:** `RequestBodyConsumer`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `body` | `StringBuilder` | 🔒 private |  |
| `begins` | `usize` | 🔒 private |  |
| `finishes` | `usize` | 🔒 private |  |
| `cancels` | `usize` | 🔒 private |  |
| `declaredLength` | `i64` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `begin`[↗](#H2BodySink.begin) | `fn (self: &amp;H2BodySink!) begin(info: BodyConsumerSt` |  |
| `acceptChunk`[↗](#H2BodySink.acceptChunk) | `fn (self: &amp;H2BodySink!) acceptChunk(bytes: str): b` |  |
| `finish`[↗](#H2BodySink.finish) | `fn (self: &amp;H2BodySink!) finish(_totalBytes: usize)` |  |
| `cancel`[↗](#H2BodySink.cancel) | `fn (self: &amp;H2BodySink!) cancel()` |  |

---

### <a id="CollectBody"></a>`CollectBody`

> 📄 `async_body.test.vx` L14-19

```vex
struct CollectBody
```

**Implements:** `RequestBodyConsumer`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `output` | `StringBuilder` | 🔒 private |  |
| `began` | `i32` | 🔒 private |  |
| `finished` | `i32` | 🔒 private |  |
| `cancelled` | `i32` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `CollectBody.new`[↗](#CollectBody.new) | `fn CollectBody.new(): CollectBody` |  |
| `begin`[↗](#CollectBody.begin) | `fn (self: &amp;CollectBody!) begin(_info: BodyConsumer` |  |
| `acceptChunk`[↗](#CollectBody.acceptChunk) | `fn (self: &amp;CollectBody!) acceptChunk(bytes: str): ` |  |
| `finish`[↗](#CollectBody.finish) | `fn (self: &amp;CollectBody!) finish(_totalBytes: usize` |  |
| `cancel`[↗](#CollectBody.cancel) | `fn (self: &amp;CollectBody!) cancel()` |  |

---

### <a id="Cookie"></a>`Cookie` `🔓 export`

> 📄 `cookie.vx` L17-27

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
| `toString`[↗](#Cookie.toString) | `export fn (self: &amp;Cookie) toString(): string` | Serialize cookie for Set-Cookie header. |

---

### <a id="CookiePair"></a>`CookiePair` `🔓 export`

> 📄 `cookie.vx` L107-111

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

> 📄 `cors.vx` L22-29

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
| `setMethods`[↗](#CorsConfig.setMethods) | `export fn (self: &amp;CorsConfig!) setMethods(m: strin` | Set allowed methods (chainable). |
| `setHeaders`[↗](#CorsConfig.setHeaders) | `export fn (self: &amp;CorsConfig!) setHeaders(h: strin` | Set allowed headers (chainable). |
| `setMaxAge`[↗](#CorsConfig.setMaxAge) | `export fn (self: &amp;CorsConfig!) setMaxAge(age: stri` | Set max age for preflight cache (chainable). |
| `allowCredentials`[↗](#CorsConfig.allowCredentials) | `export fn (self: &amp;CorsConfig!) allowCredentials():` | Enable credentials (chainable). |
| `build`[↗](#CorsConfig.build) | `export fn (self: &amp;CorsConfig) build(): Handler` | Build a Handler from this config. |

---

### <a id="HeaderEntry"></a>`HeaderEntry` `🔓 export`

> 📄 `headers.vx` L14-18

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

> 📄 `headers.vx` L28-32

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
| `get`[↗](#RequestHeaders.get) | `export fn (self: &amp;RequestHeaders) get(name: str): ` | Get header value by name (case-insensitive). Returns empty str if not found. |
| `has`[↗](#RequestHeaders.has) | `export fn (self: &amp;RequestHeaders) has(name: str): ` | Check if a header exists (case-insensitive). |
| `add`[↗](#RequestHeaders.add) | `export fn (self: &amp;RequestHeaders!) add(name: str, ` | Add a header — zero-copy, stores str views directly. |
| `clear`[↗](#RequestHeaders.clear) | `export fn (self: &amp;RequestHeaders!) clear()` | Clear all headers (no allocations — str is Copy). |
| `len`[↗](#RequestHeaders.len) | `export fn (self: &amp;RequestHeaders) len(): usize` | Number of headers. |

---

### <a id="Headers"></a>`Headers` `🔓 export`

> 📄 `headers.vx` L84-88

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
| `get`[↗](#Headers.get) | `export fn (self: &amp;Headers) get(name: str): string` | Get header value by name (case-insensitive). |
| `has`[↗](#Headers.has) | `export fn (self: &amp;Headers) has(name: str): bool` | Check if a header exists (case-insensitive). |
| `set`[↗](#Headers.set) | `export fn (self: &amp;Headers!) set(name: str, value: ` | Set a header. Replaces existing (case-insensitive) or appends. |
| `add`[↗](#Headers.add) | `export fn (self: &amp;Headers!) add(name: str, value: ` | Add a header (allows duplicate names, e.g. Set-Cookie). |
| `del`[↗](#Headers.del) | `export fn (self: &amp;Headers!) del(name: str)` | Remove all headers with the given name (case-insensitive). |
| `clear`[↗](#Headers.clear) | `export fn (self: &amp;Headers!) clear()` | Clear all headers. |
| `shrinkToFit`[↗](#Headers.shrinkToFit) | `export fn (self: &amp;Headers!) shrinkToFit()` | Shrink underlying storage to match actual header count. |
| `len`[↗](#Headers.len) | `export fn (self: &amp;Headers) len(): usize` | Number of headers. |

---

### <a id="WsFrame"></a>`WsFrame` `🔓 export`

> 📄 `ws.vx` L68-79

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
| `isControl`[↗](#WsFrame.isControl) | `export fn (self: &amp;WsFrame) isControl(): bool` | Is this a control frame? (opcodes 0x8-0xF) |
| `isText`[↗](#WsFrame.isText) | `export fn (self: &amp;WsFrame) isText(): bool` | Is this a text frame? |
| `isBinary`[↗](#WsFrame.isBinary) | `export fn (self: &amp;WsFrame) isBinary(): bool` | Is this a binary frame? |
| `isClose`[↗](#WsFrame.isClose) | `export fn (self: &amp;WsFrame) isClose(): bool` | Is this a close frame? |
| `isPing`[↗](#WsFrame.isPing) | `export fn (self: &amp;WsFrame) isPing(): bool` | Is this a ping frame? |
| `isPong`[↗](#WsFrame.isPong) | `export fn (self: &amp;WsFrame) isPong(): bool` | Is this a pong frame? |

---

### <a id="WsMessage"></a>`WsMessage` `🔓 export`

> 📄 `ws.vx` L338-344

```vex
export struct WsMessage
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `opcode` | `u8` | 🔓 public |  |
| `data` | `string` | 🔓 public |  |
| `complete` | `bool` | 🔓 public |  |
| `active` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `WsMessage.new`[↗](#WsMessage.new) | `export fn WsMessage.new(): WsMessage` |  |
| `feedFrame`[↗](#WsMessage.feedFrame) | `export fn (self: &amp;WsMessage!) feedFrame(frame: &amp;Ws` | Feed a parsed frame into the message assembler. |
| `reset`[↗](#WsMessage.reset) | `export fn (self: &amp;WsMessage!) reset()` | Reset for next message. |
| `isText`[↗](#WsMessage.isText) | `export fn (self: &amp;WsMessage) isText(): bool` | Check if this is a text message. |
| `isBinary`[↗](#WsMessage.isBinary) | `export fn (self: &amp;WsMessage) isBinary(): bool` | Check if this is a binary message. |
| `isClose`[↗](#WsMessage.isClose) | `export fn (self: &amp;WsMessage) isClose(): bool` | Check if this is a close frame. |
| `isPing`[↗](#WsMessage.isPing) | `export fn (self: &amp;WsMessage) isPing(): bool` | Check if this is a ping frame. |
| `text`[↗](#WsMessage.text) | `export fn (self: &amp;WsMessage) text(): string` | Get the text content (for text messages). |
| `WsMessage.empty`[↗](#WsMessage.empty) | `fn WsMessage.empty(): WsMessage` |  |

---

### <a id="H2Priority"></a>`H2Priority` `🔓 export`

> 📄 `h2_priority.vx` L18-22

```vex
export struct H2Priority
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `urgency` | `u8` | 🔓 public |  |
| `incremental` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `H2Priority.defaults`[↗](#H2Priority.defaults) | `export fn H2Priority.defaults(): H2Priority` |  |
| `H2Priority.new`[↗](#H2Priority.new) | `export fn H2Priority.new(urgency: u8, incremental:` |  |

---

### <a id="H2PriorityUpdate"></a>`H2PriorityUpdate` `🔓 export`

> 📄 `h2_priority.vx` L38-42

```vex
export struct H2PriorityUpdate
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `streamId` | `u32` | 🔓 public |  |
| `priority` | `H2Priority` | 🔓 public |  |

---

### <a id="SfBare"></a>`SfBare`

> 📄 `h2_priority.vx` L53-57

```vex
struct SfBare
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `kind` | `u8` | 🔒 private |  |
| `integer` | `i64` | 🔒 private |  |
| `boolean` | `bool` | 🔒 private |  |

---

### <a id="SfCursor"></a>`SfCursor`

> 📄 `h2_priority.vx` L59-62

```vex
struct SfCursor
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `data` | `str` | 🔒 private |  |
| `pos` | `usize` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `skipSpaces`[↗](#SfCursor.skipSpaces) | `fn (self: &amp;SfCursor!) skipSpaces()` |  |
| `parseKey`[↗](#SfCursor.parseKey) | `fn (self: &amp;SfCursor!) parseKey(start: &amp;usize!, end` |  |
| `parseNumber`[↗](#SfCursor.parseNumber) | `fn (self: &amp;SfCursor!) parseNumber(): Option&lt;SfBare` |  |
| `parseString`[↗](#SfCursor.parseString) | `fn (self: &amp;SfCursor!) parseString(): bool` |  |
| `parseByteSequence`[↗](#SfCursor.parseByteSequence) | `fn (self: &amp;SfCursor!) parseByteSequence(): bool` |  |
| `parseToken`[↗](#SfCursor.parseToken) | `fn (self: &amp;SfCursor!) parseToken(): bool` |  |
| `parseBare`[↗](#SfCursor.parseBare) | `fn (self: &amp;SfCursor!) parseBare(): Option&lt;SfBare&gt;` |  |
| `parseParameters`[↗](#SfCursor.parseParameters) | `fn (self: &amp;SfCursor!) parseParameters(): bool` |  |
| `parseItem`[↗](#SfCursor.parseItem) | `fn (self: &amp;SfCursor!) parseItem(): Option&lt;SfBare&gt;` |  |
| `parseInnerList`[↗](#SfCursor.parseInnerList) | `fn (self: &amp;SfCursor!) parseInnerList(): bool` |  |

---

### <a id="H2PriorityEntry"></a>`H2PriorityEntry`

> 📄 `h2_priority.vx` L422-429

```vex
struct H2PriorityEntry
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `streamId` | `u32` | 🔒 private |  |
| `priority` | `H2Priority` | 🔒 private |  |
| `pending` | `bool` | 🔒 private |  |
| `flowBlocked` | `bool` | 🔒 private |  |
| `served` | `bool` | 🔒 private |  |
| `lastServedTurn` | `u64` | 🔒 private |  |

---

### <a id="H2PriorityScheduler"></a>`H2PriorityScheduler` `🔓 export`

> 📄 `h2_priority.vx` L446-454

```vex
export struct H2PriorityScheduler
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `entries` | `Vec&lt;H2PriorityEntry&gt;` | 🔒 private |  |
| `capacity` | `u32` | 🔒 private |  |
| `maximumChunkBytes` | `u32` | 🔒 private |  |
| `starvationTurns` | `u64` | 🔒 private |  |
| `turn` | `u64` | 🔒 private |  |
| `selectedIndex` | `i32` | 🔒 private |  |
| `selectedBudget` | `u32` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `H2PriorityScheduler.new`[↗](#H2PriorityScheduler.new) | `export fn H2PriorityScheduler.new(capacity: u32, m` | Create a bounded scheduler. `starvationTurns` is the maximum normal-priority |
| `H2PriorityScheduler.defaults`[↗](#H2PriorityScheduler.defaults) | `export fn H2PriorityScheduler.defaults(capacity: u` |  |
| `find`[↗](#H2PriorityScheduler.find) | `fn (self: &amp;H2PriorityScheduler) find(streamId: u32` |  |
| `len`[↗](#H2PriorityScheduler.len) | `export fn (self: &amp;H2PriorityScheduler) len(): usiz` |  |
| `isRegistered`[↗](#H2PriorityScheduler.isRegistered) | `export fn (self: &amp;H2PriorityScheduler) isRegistere` |  |
| `isFull`[↗](#H2PriorityScheduler.isFull) | `export fn (self: &amp;H2PriorityScheduler) isFull(): b` |  |
| `remainingCapacity`[↗](#H2PriorityScheduler.remainingCapacity) | `export fn (self: &amp;H2PriorityScheduler) remainingCa` |  |
| `hasPendingWork`[↗](#H2PriorityScheduler.hasPendingWork) | `export fn (self: &amp;H2PriorityScheduler) hasPendingW` |  |
| `hasFlowBlockedWork`[↗](#H2PriorityScheduler.hasFlowBlockedWork) | `export fn (self: &amp;H2PriorityScheduler) hasFlowBloc` |  |
| `priorityFor`[↗](#H2PriorityScheduler.priorityFor) | `export fn (self: &amp;H2PriorityScheduler) priorityFor` |  |
| `streamIdAt`[↗](#H2PriorityScheduler.streamIdAt) | `export fn (self: &amp;H2PriorityScheduler) streamIdAt(` | Inspect bounded registry identity without exposing mutable entries. Protocol |
| `register`[↗](#H2PriorityScheduler.register) | `export fn (self: &amp;H2PriorityScheduler!) register(s` | Register an active or idle stream. Re-registration is a reprioritization and |
| `markReady`[↗](#H2PriorityScheduler.markReady) | `export fn (self: &amp;H2PriorityScheduler!) markReady(` |  |
| `markBlocked`[↗](#H2PriorityScheduler.markBlocked) | `export fn (self: &amp;H2PriorityScheduler!) markBlocke` |  |
| `markFlowBlocked`[↗](#H2PriorityScheduler.markFlowBlocked) | `export fn (self: &amp;H2PriorityScheduler!) markFlowBl` | Park application-ready work behind stream flow control without forgetting |
| `markFlowWritable`[↗](#H2PriorityScheduler.markFlowWritable) | `export fn (self: &amp;H2PriorityScheduler!) markFlowWr` | Publish new stream credit. Pending work becomes selectable again without a |
| `remove`[↗](#H2PriorityScheduler.remove) | `export fn (self: &amp;H2PriorityScheduler!) remove(str` |  |
| `cancel`[↗](#H2PriorityScheduler.cancel) | `export fn (self: &amp;H2PriorityScheduler!) cancel(str` | Cancel a registered stream even when another selection lease is active. |
| `clear`[↗](#H2PriorityScheduler.clear) | `export fn (self: &amp;H2PriorityScheduler!) clear()` | Drop all active and idle priority state while retaining pre-reserved |
| `normalizeTurnIfNeeded`[↗](#H2PriorityScheduler.normalizeTurnIfNeeded) | `fn (self: &amp;H2PriorityScheduler!) normalizeTurnIfNe` |  |
| `next`[↗](#H2PriorityScheduler.next) | `export fn (self: &amp;H2PriorityScheduler!) next(maxim` | Reserve one bounded scheduling turn. Exactly one selection may be in flight; |
| `selectedStreamId`[↗](#H2PriorityScheduler.selectedStreamId) | `export fn (self: &amp;H2PriorityScheduler) selectedStr` |  |
| `selectedRemainingBytes`[↗](#H2PriorityScheduler.selectedRemainingBytes) | `export fn (self: &amp;H2PriorityScheduler) selectedRem` |  |
| `capSelectedBudget`[↗](#H2PriorityScheduler.capSelectedBudget) | `export fn (self: &amp;H2PriorityScheduler!) capSelecte` | Narrow a selected turn after connection/stream flow windows are applied. |
| `consumeSelectedBudget`[↗](#H2PriorityScheduler.consumeSelectedBudget) | `export fn (self: &amp;H2PriorityScheduler!) consumeSel` | Consume bytes from the current selection lease. This enforces the scheduler |
| `restoreSelectedBudget`[↗](#H2PriorityScheduler.restoreSelectedBudget) | `export fn (self: &amp;H2PriorityScheduler!) restoreSel` | Restore a provisional budget reservation when flow-control mutation fails. |
| `complete`[↗](#H2PriorityScheduler.complete) | `export fn (self: &amp;H2PriorityScheduler!) complete(s` | Complete the outstanding selection. `stillReady=true` requeues it without |
| `completeFlowBlocked`[↗](#H2PriorityScheduler.completeFlowBlocked) | `export fn (self: &amp;H2PriorityScheduler!) completeFl` | Complete a selected turn that discovered exhausted stream credit. Pending |

---

### <a id="H2ProtocolConfig"></a>`H2ProtocolConfig` `🔓 export`

> 📄 `h2_protocol.vx` L48-57

```vex
export struct H2ProtocolConfig
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `maxConcurrentStreams` | `u32` | 🔓 public |  |
| `maximumChunkBytes` | `u32` | 🔓 public |  |
| `starvationTurns` | `u64` | 🔓 public |  |
| `maxHeaderBlockBytes` | `usize` | 🔓 public |  |
| `hpackLimits` | `HpackDecodeLimits` | 🔓 public |  |
| `maxOutstandingSettings` | `u32` | 🔓 public |  |
| `maxOutstandingPings` | `u32` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `H2ProtocolConfig.defaults`[↗](#H2ProtocolConfig.defaults) | `export fn H2ProtocolConfig.defaults(): H2ProtocolC` |  |
| `isValid`[↗](#H2ProtocolConfig.isValid) | `export fn (self: &amp;H2ProtocolConfig) isValid(): boo` |  |

---

### <a id="H2IngressState"></a>`H2IngressState`

> 📄 `h2_protocol.vx` L242-247

```vex
struct H2IngressState
```

Small transport cursor used only while streaming past a frame whose header

is already known to be stream-invalid. Valid payloads stay caller-owned and
zero-copy; rejected oversized payloads are discarded incrementally instead
of forcing one frame-sized allocation per connection.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `discardBytes` | `usize` | 🔒 private |  |
| `pendingFrame` | `H2Frame` | 🔒 private |  |
| `pendingErrorCode` | `u32` | 🔒 private |  |
| `pendingMessage` | `string` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `H2IngressState.new`[↗](#H2IngressState.new) | `fn H2IngressState.new(): H2IngressState` |  |

---

### <a id="H2HeaderFragment"></a>`H2HeaderFragment` `🔓 export`

> 📄 `h2_protocol.vx` L275-283

```vex
export struct H2HeaderFragment
```

One wire fragment of a successfully committed outbound HPACK block.

`payloadOffset` and `payloadBytes` slice the caller-owned contiguous block;
transport prepends `frame` and never copies compression state.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `frame` | `H2Frame` | 🔓 public |  |
| `promisedStreamId` | `u32` | 🔓 public | Non-zero only for the first PUSH_PROMISE fragment. Transport writes |
| `payloadOffset` | `usize` | 🔓 public |  |
| `payloadBytes` | `usize` | 🔓 public |  |

---

### <a id="H2HeaderFrameCursor"></a>`H2HeaderFrameCursor` `🔓 export`

> 📄 `h2_protocol.vx` L287-296

```vex
export struct H2HeaderFrameCursor
```

Allocation-free HEADERS/CONTINUATION cursor bound to the peer's effective

SETTINGS_MAX_FRAME_SIZE at the same transaction that encoded the block.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `streamId` | `u32` | 🔒 private |  |
| `payloadBytes` | `usize` | 🔒 private |  |
| `offset` | `usize` | 🔒 private |  |
| `maximumFrameBytes` | `usize` | 🔒 private |  |
| `endStream` | `bool` | 🔒 private |  |
| `emittedEmpty` | `bool` | 🔒 private |  |
| `initialFrameType` | `u8` | 🔒 private |  |
| `promisedStreamId` | `u32` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `remainingPayloadBytes`[↗](#H2HeaderFrameCursor.remainingPayloadBytes) | `export fn (self: &amp;H2HeaderFrameCursor) remainingPa` |  |
| `remainingFragmentCount`[↗](#H2HeaderFrameCursor.remainingFragmentCount) | `export fn (self: &amp;H2HeaderFrameCursor) remainingFr` |  |
| `remainingWireBytes`[↗](#H2HeaderFrameCursor.remainingWireBytes) | `export fn (self: &amp;H2HeaderFrameCursor) remainingWi` | Remaining payload plus the nine-byte header for every remaining frame. |
| `nextWireBytes`[↗](#H2HeaderFrameCursor.nextWireBytes) | `export fn (self: &amp;H2HeaderFrameCursor) nextWireByt` | Exact destination capacity required by the next cursor turn without |
| `next`[↗](#H2HeaderFrameCursor.next) | `export fn (self: &amp;H2HeaderFrameCursor!) next(): Op` |  |

---

### <a id="H2ProtocolState"></a>`H2ProtocolState` `🔓 export`

> 📄 `h2_protocol.vx` L440-464

```vex
export struct H2ProtocolState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `connection` | `H2ConnectionState` | 🔒 private |  |
| `streams` | `StreamMap` | 🔒 private |  |
| `scheduler` | `H2PriorityScheduler` | 🔒 private |  |
| `recvHeaderTable` | `DynamicTable` | 🔒 private |  |
| `recvHeaderBlock` | `StringBuilder` | 🔒 private |  |
| `recvHeaderBlockLimit` | `usize` | 🔒 private |  |
| `recvHeaderLimits` | `HpackDecodeLimits` | 🔒 private |  |
| `recvHeaderPolicy` | `HpackDecodeLimits` | 🔒 private |  |
| `sendHeaderEncoder` | `HpackEncoder` | 🔒 private |  |
| `sendHeaderPolicy` | `HpackEncodeLimits` | 🔒 private |  |
| `recvHeaderStreamId` | `u32` | 🔒 private |  |
| `recvPromisedStreamId` | `u32` | 🔒 private |  |
| `recvHeaderStreamError` | `u32` | 🔒 private |  |
| `recvHeaderIgnored` | `bool` | 🔒 private |  |
| `recvHeaderEndStream` | `bool` | 🔒 private |  |
| `localSettings` | `H2Settings` | 🔒 private |  |
| `peerSettings` | `H2Settings` | 🔒 private |  |
| `pendingLocalSettings` | `Vec&lt;H2Settings&gt;` | 🔒 private |  |
| `maxOutstandingSettings` | `u32` | 🔒 private |  |
| `pendingLocalPings` | `Vec&lt;u64&gt;` | 🔒 private |  |
| `maxOutstandingPings` | `u32` | 🔒 private |  |
| `ingress` | `H2IngressState` | 🔒 private |  |
| `closed` | `bool` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `H2ProtocolState.new`[↗](#H2ProtocolState.new) | `export fn H2ProtocolState.new(role: H2EndpointRole` | Create one bounded owner for connection sequencing, live stream slots and |
| `role`[↗](#H2ProtocolState.role) | `export fn (self: &amp;H2ProtocolState) role(): H2Endpo` |  |
| `activeStreamCount`[↗](#H2ProtocolState.activeStreamCount) | `export fn (self: &amp;H2ProtocolState) activeStreamCou` |  |
| `residentStreamCount`[↗](#H2ProtocolState.residentStreamCount) | `export fn (self: &amp;H2ProtocolState) residentStreamC` |  |
| `priorityStateCount`[↗](#H2ProtocolState.priorityStateCount) | `export fn (self: &amp;H2ProtocolState) priorityStateCo` |  |
| `bufferedHeaderBytes`[↗](#H2ProtocolState.bufferedHeaderBytes) | `export fn (self: &amp;H2ProtocolState) bufferedHeaderB` |  |
| `remainingIngressDiscardBytes`[↗](#H2ProtocolState.remainingIngressDiscardBytes) | `export fn (self: &amp;H2ProtocolState) remainingIngres` |  |
| `receiveDynamicTableBytes`[↗](#H2ProtocolState.receiveDynamicTableBytes) | `export fn (self: &amp;H2ProtocolState) receiveDynamicT` |  |
| `sendDynamicTableBytes`[↗](#H2ProtocolState.sendDynamicTableBytes) | `export fn (self: &amp;H2ProtocolState) sendDynamicTabl` |  |
| `sendMaximumDynamicTableBytes`[↗](#H2ProtocolState.sendMaximumDynamicTableBytes) | `export fn (self: &amp;H2ProtocolState) sendMaximumDyna` |  |
| `hasPendingSendTableSizeUpdate`[↗](#H2ProtocolState.hasPendingSendTableSizeUpdate) | `export fn (self: &amp;H2ProtocolState) hasPendingSendT` |  |
| `effectiveLocalSettings`[↗](#H2ProtocolState.effectiveLocalSettings) | `export fn (self: &amp;H2ProtocolState) effectiveLocalS` |  |
| `effectivePeerSettings`[↗](#H2ProtocolState.effectivePeerSettings) | `export fn (self: &amp;H2ProtocolState) effectivePeerSe` |  |
| `pendingLocalSettingsCount`[↗](#H2ProtocolState.pendingLocalSettingsCount) | `export fn (self: &amp;H2ProtocolState) pendingLocalSet` |  |
| `pendingLocalPingCount`[↗](#H2ProtocolState.pendingLocalPingCount) | `export fn (self: &amp;H2ProtocolState) pendingLocalPin` |  |
| `receiveMaximumFrameSize`[↗](#H2ProtocolState.receiveMaximumFrameSize) | `export fn (self: &amp;H2ProtocolState) receiveMaximumF` |  |
| `sendMaximumFrameSize`[↗](#H2ProtocolState.sendMaximumFrameSize) | `export fn (self: &amp;H2ProtocolState) sendMaximumFram` |  |
| `isClosed`[↗](#H2ProtocolState.isClosed) | `export fn (self: &amp;H2ProtocolState) isClosed(): boo` |  |
| `lastRemoteStreamId`[↗](#H2ProtocolState.lastRemoteStreamId) | `export fn (self: &amp;H2ProtocolState) lastRemoteStrea` | Highest peer-owned stream identifier admitted or refused by this |
| `isDraining`[↗](#H2ProtocolState.isDraining) | `export fn (self: &amp;H2ProtocolState) isDraining(): b` |  |
| `streamState`[↗](#H2ProtocolState.streamState) | `export fn (self: &amp;H2ProtocolState) streamState(str` |  |
| `streamPriority`[↗](#H2ProtocolState.streamPriority) | `export fn (self: &amp;H2ProtocolState) streamPriority(` |  |
| `isRemoteStreamId`[↗](#H2ProtocolState.isRemoteStreamId) | `fn (self: &amp;H2ProtocolState) isRemoteStreamId(strea` |  |
| `isLocalStreamId`[↗](#H2ProtocolState.isLocalStreamId) | `fn (self: &amp;H2ProtocolState) isLocalStreamId(stream` |  |
| `activeInitiatedStreamCount`[↗](#H2ProtocolState.activeInitiatedStreamCount) | `fn (self: &amp;H2ProtocolState) activeInitiatedStreamC` |  |
| `pruneImplicitlyClosedRemotePriorities`[↗](#H2ProtocolState.pruneImplicitlyClosedRemotePriorities) | `fn (self: &amp;H2ProtocolState!) pruneImplicitlyClosed` |  |
| `openLocalStream`[↗](#H2ProtocolState.openLocalStream) | `export fn (self: &amp;H2ProtocolState!) openLocalStrea` | Open a locally owned stream only when its scheduler slot is also available. |
| `acceptRemoteStream`[↗](#H2ProtocolState.acceptRemoteStream) | `export fn (self: &amp;H2ProtocolState!) acceptRemoteSt` | Admit a peer stream and preserve any PRIORITY_UPDATE that raced ahead of |
| `sendRstStreamFrame`[↗](#H2ProtocolState.sendRstStreamFrame) | `export fn (self: &amp;H2ProtocolState!) sendRstStreamF` | Cancel/reset a locally owned stream under one wire transaction. Active |
| `sendStreamErrorFrame`[↗](#H2ProtocolState.sendStreamErrorFrame) | `export fn (self: &amp;H2ProtocolState!) sendStreamErro` | Encode the RST_STREAM required by a locally detected receive-side stream |
| `sendCancelFrame`[↗](#H2ProtocolState.sendCancelFrame) | `export fn (self: &amp;H2ProtocolState!) sendCancelFram` |  |
| `terminalReceiveResetError`[↗](#H2ProtocolState.terminalReceiveResetError) | `fn (self: &amp;H2ProtocolState!) terminalReceiveResetE` |  |
| `recvRstStreamFrame`[↗](#H2ProtocolState.recvRstStreamFrame) | `export fn (self: &amp;H2ProtocolState!) recvRstStreamF` | Consume a peer RST_STREAM payload exactly once. Idle-stream violations, |
| `markReady`[↗](#H2ProtocolState.markReady) | `export fn (self: &amp;H2ProtocolState!) markReady(stre` |  |
| `markBlocked`[↗](#H2ProtocolState.markBlocked) | `export fn (self: &amp;H2ProtocolState!) markBlocked(st` |  |
| `completeWritable`[↗](#H2ProtocolState.completeWritable) | `export fn (self: &amp;H2ProtocolState!) completeWritab` |  |
| `nextWritable`[↗](#H2ProtocolState.nextWritable) | `export fn (self: &amp;H2ProtocolState!) nextWritable(m` | Select only work that has both application bytes and connection/stream |
| `sendHeaderBlock`[↗](#H2ProtocolState.sendHeaderBlock) | `export fn (self: &amp;H2ProtocolState!) sendHeaderBloc` | Encode one complete HEADERS field block. Semantic phase, |
| `rollbackPromisedAdmission`[↗](#H2ProtocolState.rollbackPromisedAdmission) | `fn (self: &amp;H2ProtocolState!) rollbackPromisedAdmis` |  |
| `sendPushPromise`[↗](#H2ProtocolState.sendPushPromise) | `export fn (self: &amp;H2ProtocolState!) sendPushPromis` | Reserve and encode one server PUSH_PROMISE transactionally. Carrier state, |
| `terminalReceiveDataError`[↗](#H2ProtocolState.terminalReceiveDataError) | `fn (self: &amp;H2ProtocolState!) terminalReceiveDataEr` |  |
| `recvDataFrame`[↗](#H2ProtocolState.recvDataFrame) | `export fn (self: &amp;H2ProtocolState!) recvDataFrame(` | Consume one complete DATA payload under a single protocol owner. Payload |
| `sendDataFrame`[↗](#H2ProtocolState.sendDataFrame) | `export fn (self: &amp;H2ProtocolState!) sendDataFrame(` | Commit one outbound DATA frame from the current scheduler lease. Caller |
| `recvWindowUpdateFrame`[↗](#H2ProtocolState.recvWindowUpdateFrame) | `export fn (self: &amp;H2ProtocolState!) recvWindowUpda` | Apply a complete peer WINDOW_UPDATE transaction. Frame sequencing, |
| `sendWindowUpdateFrame`[↗](#H2ProtocolState.sendWindowUpdateFrame) | `export fn (self: &amp;H2ProtocolState!) sendWindowUpda` | Encode and record one locally emitted WINDOW_UPDATE atomically. `out` must |
| `findPendingPing`[↗](#H2ProtocolState.findPendingPing) | `fn (self: &amp;H2ProtocolState) findPendingPing(token:` |  |
| `terminalReceivePingError`[↗](#H2ProtocolState.terminalReceivePingError) | `fn (self: &amp;H2ProtocolState!) terminalReceivePingEr` |  |
| `recvPingFrame`[↗](#H2ProtocolState.recvPingFrame) | `export fn (self: &amp;H2ProtocolState!) recvPingFrame(` | Consume one exact peer PING payload. ACKs remove only the matching bounded |
| `sendPingOwned`[↗](#H2ProtocolState.sendPingOwned) | `fn (self: &amp;H2ProtocolState!) sendPingOwned(opaqueD` |  |
| `sendPingFrame`[↗](#H2ProtocolState.sendPingFrame) | `export fn (self: &amp;H2ProtocolState!) sendPingFrame(` | Emit a locally initiated PING and retain its opaque token until the peer's |
| `sendPingAckFrame`[↗](#H2ProtocolState.sendPingAckFrame) | `export fn (self: &amp;H2ProtocolState!) sendPingAckFra` | Echo a peer PING payload as ACK without consuming local outstanding-PING |
| `terminalReceivePriorityError`[↗](#H2ProtocolState.terminalReceivePriorityError) | `fn (self: &amp;H2ProtocolState!) terminalReceivePriori` |  |
| `recvPriorityUpdateFrame`[↗](#H2ProtocolState.recvPriorityUpdateFrame) | `export fn (self: &amp;H2ProtocolState!) recvPriorityUp` | Consume one complete peer PRIORITY_UPDATE. The raw Structured Fields value |
| `sendPriorityUpdateFrame`[↗](#H2ProtocolState.sendPriorityUpdateFrame) | `export fn (self: &amp;H2ProtocolState!) sendPriorityUp` | Encode one client PRIORITY_UPDATE and publish local connection sequencing |
| `terminalReceiveLegacyPriorityError`[↗](#H2ProtocolState.terminalReceiveLegacyPriorityError) | `fn (self: &amp;H2ProtocolState!) terminalReceiveLegacy` |  |
| `legacyPriorityStreamError`[↗](#H2ProtocolState.legacyPriorityStreamError) | `fn (self: &amp;H2ProtocolState!) legacyPriorityStreamE` |  |
| `recvLegacyPriorityFrame`[↗](#H2ProtocolState.recvLegacyPriorityFrame) | `export fn (self: &amp;H2ProtocolState!) recvLegacyPrio` | Consume one deprecated RFC 7540 PRIORITY frame for interoperability. It |
| `sendLegacyPriorityFrame`[↗](#H2ProtocolState.sendLegacyPriorityFrame) | `export fn (self: &amp;H2ProtocolState!) sendLegacyPrio` | Emit deprecated PRIORITY only for explicit compatibility. The frame may |
| `recvStreamFrameOwned`[↗](#H2ProtocolState.recvStreamFrameOwned) | `fn (self: &amp;H2ProtocolState!) recvStreamFrameOwned(` | Apply a received frame to an already admitted stream and connection |
| `recvStreamFrame`[↗](#H2ProtocolState.recvStreamFrame) | `export fn (self: &amp;H2ProtocolState!) recvStreamFram` | Apply a non-header stream frame. Header-bearing frames must use |
| `sendStreamFrame`[↗](#H2ProtocolState.sendStreamFrame) | `export fn (self: &amp;H2ProtocolState!) sendStreamFram` | Apply a locally emitted frame transactionally. Invalid stream transitions |
| `recvConnectionFrame`[↗](#H2ProtocolState.recvConnectionFrame) | `export fn (self: &amp;H2ProtocolState!) recvConnection` |  |
| `sendConnectionFrame`[↗](#H2ProtocolState.sendConnectionFrame) | `export fn (self: &amp;H2ProtocolState!) sendConnection` |  |
| `terminalProtocolFrameError`[↗](#H2ProtocolState.terminalProtocolFrameError) | `fn (self: &amp;H2ProtocolState!) terminalProtocolFrame` |  |
| `applyAcknowledgedLocalSettings`[↗](#H2ProtocolState.applyAcknowledgedLocalSettings) | `fn (self: &amp;H2ProtocolState!) applyAcknowledgedLoca` |  |
| `recvSettingsFrame`[↗](#H2ProtocolState.recvSettingsFrame) | `export fn (self: &amp;H2ProtocolState!) recvSettingsFr` | Receive and apply a peer SETTINGS frame. Non-ACK values become effective |
| `sendSettingsFrame`[↗](#H2ProtocolState.sendSettingsFrame) | `export fn (self: &amp;H2ProtocolState!) sendSettingsFr` | Record a locally emitted SETTINGS frame. A non-ACK payload is merged onto |
| `clearReceivedHeaderBlock`[↗](#H2ProtocolState.clearReceivedHeaderBlock) | `fn (self: &amp;H2ProtocolState!) clearReceivedHeaderBl` |  |
| `terminalHeaderError`[↗](#H2ProtocolState.terminalHeaderError) | `fn (self: &amp;H2ProtocolState!) terminalHeaderError(c` |  |
| `recvHeaderFrame`[↗](#H2ProtocolState.recvHeaderFrame) | `export fn (self: &amp;H2ProtocolState!) recvHeaderFram` | Process one received HEADERS/PUSH_PROMISE/CONTINUATION frame and its exact |
| `applyReceivedFieldSection`[↗](#H2ProtocolState.applyReceivedFieldSection) | `fn (self: &amp;H2ProtocolState!) applyReceivedFieldSec` | Validate decompressed HTTP semantics and advance the per-stream message |
| `applyPeerInitialWindowSize`[↗](#H2ProtocolState.applyPeerInitialWindowSize) | `export fn (self: &amp;H2ProtocolState!) applyPeerIniti` |  |
| `applyLocalInitialWindowSize`[↗](#H2ProtocolState.applyLocalInitialWindowSize) | `export fn (self: &amp;H2ProtocolState!) applyLocalInit` |  |
| `retireLocalStreamsAbove`[↗](#H2ProtocolState.retireLocalStreamsAbove) | `fn (self: &amp;H2ProtocolState!) retireLocalStreamsAbo` |  |
| `retireRemoteStreamsAbove`[↗](#H2ProtocolState.retireRemoteStreamsAbove) | `fn (self: &amp;H2ProtocolState!) retireRemoteStreamsAb` |  |
| `terminalReceiveGoAwayError`[↗](#H2ProtocolState.terminalReceiveGoAwayError) | `fn (self: &amp;H2ProtocolState!) terminalReceiveGoAway` |  |
| `recvGoAwayFrame`[↗](#H2ProtocolState.recvGoAwayFrame) | `export fn (self: &amp;H2ProtocolState!) recvGoAwayFram` | Consume one complete peer GOAWAY transaction. Payload/debug bytes remain |
| `recvFrame`[↗](#H2ProtocolState.recvFrame) | `export fn (self: &amp;H2ProtocolState!) recvFrame(fram` | Consume one complete frame returned by `parseH2FrameLimited`. This is the |
| `recvRejectedFrameMetadata`[↗](#H2ProtocolState.recvRejectedFrameMetadata) | `fn (self: &amp;H2ProtocolState!) recvRejectedFrameMeta` |  |
| `recvBytes`[↗](#H2ProtocolState.recvBytes) | `export fn (self: &amp;H2ProtocolState!) recvBytes(inpu` | Parse and dispatch at most one frame from caller-retained transport bytes. |
| `sendGoAwayFrame`[↗](#H2ProtocolState.sendGoAwayFrame) | `export fn (self: &amp;H2ProtocolState!) sendGoAwayFram` | Encode and publish one local GOAWAY transaction. The output must reserve |
| `localStreamMayHaveBeenProcessed`[↗](#H2ProtocolState.localStreamMayHaveBeenProcessed) | `export fn (self: &amp;H2ProtocolState) localStreamMayH` |  |
| `abort`[↗](#H2ProtocolState.abort) | `export fn (self: &amp;H2ProtocolState!) abort(errorCod` | Terminate the entire protocol owner without freeing its reusable storage. |

---

### <a id="HeaderEntry"></a>`HeaderEntry` `🔓 export`

> 📄 `headers.vx` L28-32

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

> 📄 `headers.vx` L42-46

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
| `add`[↗](#ParserHeaders.add) | `export fn (self: &amp;ParserHeaders!) add(name: str, v` | Add a header entry. Returns false if at capacity. |
| `get`[↗](#ParserHeaders.get) | `export fn (self: &amp;ParserHeaders) get(name: str): s` | Get header value by name (case-insensitive). |
| `has`[↗](#ParserHeaders.has) | `export fn (self: &amp;ParserHeaders) has(name: str): b` | Check if a header exists (case-insensitive). |
| `messageFraming`[↗](#ParserHeaders.messageFraming) | `export fn (self: &amp;ParserHeaders) messageFraming():` | Derive the unique HTTP body framing from the complete header collection. |
| `contentLength`[↗](#ParserHeaders.contentLength) | `export fn (self: &amp;ParserHeaders) contentLength(): ` | Get Content-Length value, or -1 when no unambiguous content length exists. |
| `isChunked`[↗](#ParserHeaders.isChunked) | `export fn (self: &amp;ParserHeaders) isChunked(): bool` | True only when the complete message framing is exactly chunked. |
| `hasConnectionToken`[↗](#ParserHeaders.hasConnectionToken) | `fn (self: &amp;ParserHeaders) hasConnectionToken(expec` |  |
| `isConnectionClose`[↗](#ParserHeaders.isConnectionClose) | `export fn (self: &amp;ParserHeaders) isConnectionClose` | Check whether any Connection token says `close`. |
| `isUpgrade`[↗](#ParserHeaders.isUpgrade) | `export fn (self: &amp;ParserHeaders) isUpgrade(): bool` | Check whether any Connection token says `upgrade`. |
| `len`[↗](#ParserHeaders.len) | `export fn (self: &amp;ParserHeaders) len(): usize` | Get number of stored headers. |
| `clear`[↗](#ParserHeaders.clear) | `export fn (self: &amp;ParserHeaders!) clear()` | Reset the header collection for reuse. |
| `at`[↗](#ParserHeaders.at) | `export fn (self: &amp;ParserHeaders) at(index: usize):` | Get header entry by index. |

---

### <a id="CountingSink"></a>`CountingSink`

> 📄 `body.test.vx` L9-13

```vex
struct CountingSink
```

**Implements:** `ChunkSink`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `bytes` | `usize` | 🔒 private |  |
| `calls` | `usize` | 🔒 private |  |
| `reject` | `bool` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `acceptChunk`[↗](#CountingSink.acceptChunk) | `fn (self: &amp;CountingSink!) acceptChunk(bytes: str):` |  |

---

### <a id="LifecycleSink"></a>`LifecycleSink`

> 📄 `body.test.vx` L21-29

```vex
struct LifecycleSink
```

**Implements:** `RequestBodyConsumer`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `begins` | `usize` | 🔒 private |  |
| `bytes` | `usize` | 🔒 private |  |
| `finishes` | `usize` | 🔒 private |  |
| `cancels` | `usize` | 🔒 private |  |
| `expected` | `i64` | 🔒 private |  |
| `rejectBegin` | `bool` | 🔒 private |  |
| `rejectFinish` | `bool` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `begin`[↗](#LifecycleSink.begin) | `fn (self: &amp;LifecycleSink!) begin(info: BodyConsume` |  |
| `acceptChunk`[↗](#LifecycleSink.acceptChunk) | `fn (self: &amp;LifecycleSink!) acceptChunk(bytes: str)` |  |
| `finish`[↗](#LifecycleSink.finish) | `fn (self: &amp;LifecycleSink!) finish(_totalBytes: usi` |  |
| `cancel`[↗](#LifecycleSink.cancel) | `fn (self: &amp;LifecycleSink!) cancel()` |  |

---

### <a id="CaptureMultipartSink"></a>`CaptureMultipartSink`

> 📄 `multipart.test.vx` L11-23

```vex
struct CaptureMultipartSink
```

**Implements:** `MultipartSink`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `begins` | `usize` | 🔒 private |  |
| `headers` | `usize` | 🔒 private |  |
| `ends` | `usize` | 🔒 private |  |
| `finishes` | `usize` | 🔒 private |  |
| `cancels` | `usize` | 🔒 private |  |
| `finalPartCount` | `usize` | 🔒 private |  |
| `fileParts` | `usize` | 🔒 private |  |
| `names` | `StringBuilder` | 🔒 private |  |
| `fileNames` | `StringBuilder` | 🔒 private |  |
| `contentTypes` | `StringBuilder` | 🔒 private |  |
| `payload` | `StringBuilder` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `CaptureMultipartSink.new`[↗](#CaptureMultipartSink.new) | `fn CaptureMultipartSink.new(): CaptureMultipartSin` |  |
| `beginPart`[↗](#CaptureMultipartSink.beginPart) | `fn (self: &amp;CaptureMultipartSink!) beginPart(info: ` |  |
| `partHeader`[↗](#CaptureMultipartSink.partHeader) | `fn (self: &amp;CaptureMultipartSink!) partHeader(_name` |  |
| `acceptPartChunk`[↗](#CaptureMultipartSink.acceptPartChunk) | `fn (self: &amp;CaptureMultipartSink!) acceptPartChunk(` |  |
| `endPart`[↗](#CaptureMultipartSink.endPart) | `fn (self: &amp;CaptureMultipartSink!) endPart(): bool` |  |
| `finishMultipart`[↗](#CaptureMultipartSink.finishMultipart) | `fn (self: &amp;CaptureMultipartSink!) finishMultipart(` |  |
| `cancelMultipart`[↗](#CaptureMultipartSink.cancelMultipart) | `fn (self: &amp;CaptureMultipartSink!) cancelMultipart(` |  |

---

### <a id="H2PrioritySchedulerBenchState"></a>`H2PrioritySchedulerBenchState`

> 📄 `bench.test.vx` L162-164

```vex
struct H2PrioritySchedulerBenchState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `scheduler` | `H2PriorityScheduler` | 🔒 private |  |

---

### <a id="H2ProtocolSchedulerBenchState"></a>`H2ProtocolSchedulerBenchState`

> 📄 `bench.test.vx` L186-188

```vex
struct H2ProtocolSchedulerBenchState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `protocol` | `H2ProtocolState` | 🔒 private |  |

---

### <a id="H2ProtocolHeaderBenchState"></a>`H2ProtocolHeaderBenchState`

> 📄 `bench.test.vx` L231-238

```vex
struct H2ProtocolHeaderBenchState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `protocol` | `H2ProtocolState` | 🔒 private |  |
| `frame` | `H2Frame` | 🔒 private |  |
| `payload` | `string` | 🔒 private |  |
| `responseHeaders` | `Vec&lt;HpackHeader&gt;` | 🔒 private |  |
| `sendOutput` | `Vec&lt;u8&gt;` | 🔒 private |  |
| `nextStreamId` | `u32` | 🔒 private |  |

---

### <a id="H2ProtocolPushBenchState"></a>`H2ProtocolPushBenchState`

> 📄 `bench.test.vx` L290-295

```vex
struct H2ProtocolPushBenchState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `protocol` | `H2ProtocolState` | 🔒 private |  |
| `pushHeaders` | `Vec&lt;HpackHeader&gt;` | 🔒 private |  |
| `responseHeaders` | `Vec&lt;HpackHeader&gt;` | 🔒 private |  |
| `output` | `Vec&lt;u8&gt;` | 🔒 private |  |

---

### <a id="H2ProtocolReceiveResetBenchState"></a>`H2ProtocolReceiveResetBenchState`

> 📄 `bench.test.vx` L348-355

```vex
struct H2ProtocolReceiveResetBenchState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `protocol` | `H2ProtocolState` | 🔒 private |  |
| `headerFrame` | `H2Frame` | 🔒 private |  |
| `resetFrame` | `H2Frame` | 🔒 private |  |
| `headerPayload` | `string` | 🔒 private |  |
| `resetPayload` | `string` | 🔒 private |  |
| `nextStreamId` | `u32` | 🔒 private |  |

---

### <a id="H2ProtocolGoAwayBenchState"></a>`H2ProtocolGoAwayBenchState`

> 📄 `bench.test.vx` L413-417

```vex
struct H2ProtocolGoAwayBenchState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `protocol` | `H2ProtocolState` | 🔒 private |  |
| `frame` | `H2Frame` | 🔒 private |  |
| `payload` | `string` | 🔒 private |  |

---

### <a id="H2ProtocolPingBenchState"></a>`H2ProtocolPingBenchState`

> 📄 `bench.test.vx` L463-468

```vex
struct H2ProtocolPingBenchState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `protocol` | `H2ProtocolState` | 🔒 private |  |
| `ackFrame` | `H2Frame` | 🔒 private |  |
| `payload` | `string` | 🔒 private |  |
| `output` | `Vec&lt;u8&gt;` | 🔒 private |  |

---

### <a id="H2ProtocolPriorityBenchState"></a>`H2ProtocolPriorityBenchState`

> 📄 `bench.test.vx` L502-506

```vex
struct H2ProtocolPriorityBenchState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `protocol` | `H2ProtocolState` | 🔒 private |  |
| `frame` | `H2Frame` | 🔒 private |  |
| `payload` | `string` | 🔒 private |  |

---

### <a id="H2ProtocolIngressBenchState"></a>`H2ProtocolIngressBenchState`

> 📄 `bench.test.vx` L508-511

```vex
struct H2ProtocolIngressBenchState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `protocol` | `H2ProtocolState` | 🔒 private |  |
| `wire` | `string` | 🔒 private |  |

---

### <a id="H2ProtocolSendDataBenchState"></a>`H2ProtocolSendDataBenchState`

> 📄 `bench.test.vx` L587-592

```vex
struct H2ProtocolSendDataBenchState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `protocol` | `H2ProtocolState` | 🔒 private |  |
| `connectionUpdate` | `H2Frame` | 🔒 private |  |
| `streamUpdate` | `H2Frame` | 🔒 private |  |
| `updatePayload` | `[u8; 4]` | 🔒 private |  |

---

### <a id="H2ProtocolRecvDataBenchState"></a>`H2ProtocolRecvDataBenchState`

> 📄 `bench.test.vx` L659-664

```vex
struct H2ProtocolRecvDataBenchState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `protocol` | `H2ProtocolState` | 🔒 private |  |
| `frame` | `H2Frame` | 🔒 private |  |
| `payload` | `string` | 🔒 private |  |
| `updateOutput` | `Vec&lt;u8&gt;` | 🔒 private |  |

---

### <a id="H2StaticFieldBenchState"></a>`H2StaticFieldBenchState`

> 📄 `bench.test.vx` L721-725

```vex
struct H2StaticFieldBenchState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `table` | `DynamicTable` | 🔒 private |  |
| `limits` | `HpackDecodeLimits` | 🔒 private |  |
| `payload` | `string` | 🔒 private |  |

---

### <a id="CountingBodySink"></a>`CountingBodySink`

> 📄 `bench.test.vx` L777-779

```vex
struct CountingBodySink
```

**Implements:** `ChunkSink`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `bytes` | `usize` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `acceptChunk`[↗](#CountingBodySink.acceptChunk) | `fn (self: &amp;CountingBodySink!) acceptChunk(value: s` |  |

---

### <a id="FixedBodyBenchState"></a>`FixedBodyBenchState`

> 📄 `bench.test.vx` L786-790

```vex
struct FixedBodyBenchState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `reader` | `BodyReader` | 🔒 private |  |
| `sink` | `CountingBodySink` | 🔒 private |  |
| `payload` | `Vec&lt;u8&gt;` | 🔒 private |  |

---

### <a id="DecodedBodyBenchSink"></a>`DecodedBodyBenchSink`

> 📄 `bench.test.vx` L809-811

```vex
struct DecodedBodyBenchSink
```

**Implements:** `RequestBodyConsumer`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `bytes` | `usize` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `begin`[↗](#DecodedBodyBenchSink.begin) | `fn (self: &amp;DecodedBodyBenchSink!) begin(_info: Bod` |  |
| `acceptChunk`[↗](#DecodedBodyBenchSink.acceptChunk) | `fn (self: &amp;DecodedBodyBenchSink!) acceptChunk(valu` |  |
| `finish`[↗](#DecodedBodyBenchSink.finish) | `fn (self: &amp;DecodedBodyBenchSink!) finish(totalByte` |  |
| `cancel`[↗](#DecodedBodyBenchSink.cancel) | `fn (self: &amp;DecodedBodyBenchSink!) cancel()` |  |

---

### <a id="DecodedBodyBenchState"></a>`DecodedBodyBenchState`

> 📄 `bench.test.vx` L831-835

```vex
struct DecodedBodyBenchState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `lifecycle` | `DecodedBodyLifecycle` | 🔒 private |  |
| `sink` | `DecodedBodyBenchSink` | 🔒 private |  |
| `payload` | `Vec&lt;u8&gt;` | 🔒 private |  |

---

### <a id="BodyRingBenchState"></a>`BodyRingBenchState`

> 📄 `bench.test.vx` L863-866

```vex
struct BodyRingBenchState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `ring` | `BodyPageRing` | 🔒 private |  |
| `page` | `Vec&lt;u8&gt;` | 🔒 private |  |

---

### <a id="CountingMultipartSink"></a>`CountingMultipartSink`

> 📄 `bench.test.vx` L898-901

```vex
struct CountingMultipartSink
```

**Implements:** `MultipartSink`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `bytes` | `usize` | 🔒 private |  |
| `parts` | `usize` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `beginPart`[↗](#CountingMultipartSink.beginPart) | `fn (self: &amp;CountingMultipartSink!) beginPart(_info` |  |
| `partHeader`[↗](#CountingMultipartSink.partHeader) | `fn (self: &amp;CountingMultipartSink!) partHeader(_nam` |  |
| `acceptPartChunk`[↗](#CountingMultipartSink.acceptPartChunk) | `fn (self: &amp;CountingMultipartSink!) acceptPartChunk` |  |
| `endPart`[↗](#CountingMultipartSink.endPart) | `fn (self: &amp;CountingMultipartSink!) endPart(): bool` |  |
| `finishMultipart`[↗](#CountingMultipartSink.finishMultipart) | `fn (self: &amp;CountingMultipartSink!) finishMultipart` |  |
| `cancelMultipart`[↗](#CountingMultipartSink.cancelMultipart) | `fn (self: &amp;CountingMultipartSink!) cancelMultipart` |  |

---

### <a id="HpackEncodeBenchState"></a>`HpackEncodeBenchState`

> 📄 `bench.test.vx` L978-983

```vex
struct HpackEncodeBenchState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `encoder` | `HpackEncoder` | 🔒 private |  |
| `limits` | `HpackEncodeLimits` | 🔒 private |  |
| `headers` | `Vec&lt;HpackHeader&gt;` | 🔒 private |  |
| `output` | `Vec&lt;u8&gt;` | 🔒 private |  |

---

### <a id="H2FieldSectionInfo"></a>`H2FieldSectionInfo` `🔓 export`

> 📄 `h2_headers.vx` L22-37

```vex
export struct H2FieldSectionInfo
```

Successful validation metadata. `statusCode` is zero for non-responses.

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `statusCode` | `u16` | 🔓 public |  |
| `methodIndex` | `usize` | 🔓 public | Exact pseudo-header positions found by the semantic validation |
| `schemeIndex` | `usize` | 🔓 public |  |
| `authorityIndex` | `usize` | 🔓 public |  |
| `pathIndex` | `usize` | 🔓 public |  |
| `statusIndex` | `usize` | 🔓 public |  |
| `regularStart` | `usize` | 🔓 public | First regular field, or `headers.len()` when none are present. |
| `contentLength` | `i64` | 🔓 public | Canonical content length, or -1 when the section omits it. |

---

### <a id="MultipartLimits"></a>`MultipartLimits` `🔓 export`

> 📄 `multipart.vx` L17-24

```vex
export struct MultipartLimits
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `maxParts` | `usize` | 🔓 public |  |
| `maxPartHeaderBytes` | `usize` | 🔓 public |  |
| `maxHeadersPerPart` | `usize` | 🔓 public |  |
| `maxNameBytes` | `usize` | 🔓 public |  |
| `maxFileNameBytes` | `usize` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `MultipartLimits.defaults`[↗](#MultipartLimits.defaults) | `export fn MultipartLimits.defaults(): MultipartLim` |  |

---

### <a id="MultipartPartInfo"></a>`MultipartPartInfo` `🔓 export`

> 📄 `multipart.vx` L38-45

```vex
export struct MultipartPartInfo
```

Metadata views are valid only during `beginPart`. A sink which retains a

name or filename must copy it into its own storage.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `index` | `usize` | 🔓 public |  |
| `name` | `str` | 🔓 public |  |
| `fileName` | `str` | 🔓 public |  |
| `hasFileName` | `bool` | 🔓 public |  |
| `contentType` | `str` | 🔓 public |  |

---

### <a id="MultipartConsumer"></a>`MultipartConsumer` `🔓 export`

> 📄 `multipart.vx` L69-84

```vex
export struct MultipartConsumer<S>
```

Fixed-budget incremental parser bound to one caller-owned sink.

**Implements:** `RequestBodyConsumer`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `sink` | `&amp;S!` | 🔒 private |  |
| `limits` | `MultipartLimits` | 🔒 private |  |
| `startMarker` | `string` | 🔒 private |  |
| `bodyMarker` | `string` | 🔒 private |  |
| `workspace` | `Vec&lt;u8&gt;` | 🔒 private |  |
| `buffered` | `usize` | 🔒 private |  |
| `state` | `MultipartState` | 🔒 private |  |
| `partCount` | `usize` | 🔒 private |  |
| `activePart` | `bool` | 🔒 private |  |
| `began` | `bool` | 🔒 private |  |
| `terminal` | `bool` | 🔒 private |  |
| `partHasFileName` | `bool` | 🔒 private |  |
| `partName` | `StringBuilder` | 🔒 private |  |
| `partFileName` | `StringBuilder` | 🔒 private |  |

**Type Parameters:**

- `S`: `MultipartSink`

---

### <a id="MultipartHeaderView"></a>`MultipartHeaderView`

> 📄 `multipart.vx` L361-365

```vex
struct MultipartHeaderView
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `valid` | `bool` | 🔒 private |  |
| `name` | `str` | 🔒 private |  |
| `value` | `str` | 🔒 private |  |

---

### <a id="Scanner"></a>`Scanner` `🔓 export`

> 📄 `scanner.vx` L20-24

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
| `remaining`[↗](#Scanner.remaining) | `export fn (self: &amp;Scanner) remaining(): usize` | Bytes remaining from current position. |
| `isEof`[↗](#Scanner.isEof) | `export fn (self: &amp;Scanner) isEof(): bool` | True if no bytes remain. |
| `position`[↗](#Scanner.position) | `export fn (self: &amp;Scanner) position(): usize` | Current absolute cursor position. |
| `setPosition`[↗](#Scanner.setPosition) | `export fn (self: &amp;Scanner!) setPosition(newPos: us` | Set absolute cursor position (clamped to input length). |
| `peek`[↗](#Scanner.peek) | `export fn (self: &amp;Scanner) peek(): u8` | Peek at byte at current position (0 if EOF). |
| `peekAt`[↗](#Scanner.peekAt) | `export fn (self: &amp;Scanner) peekAt(offset: usize): ` | Peek at byte at offset from current position. |
| `advance`[↗](#Scanner.advance) | `export fn (self: &amp;Scanner!) advance(n: usize)` | Advance position by n bytes. |
| `rest`[↗](#Scanner.rest) | `export fn (self: &amp;Scanner) rest(): str` | Get a str slice from current position to end. |
| `slice`[↗](#Scanner.slice) | `export fn (self: &amp;Scanner) slice(start: usize, end` | Get a str slice [start..end) relative to buffer start. |
| `findByte`[↗](#Scanner.findByte) | `export fn (self: &amp;Scanner) findByte(byt: u8): usiz` | Find first occurrence of `byte` from current position. |
| `findCRLF`[↗](#Scanner.findCRLF) | `export fn (self: &amp;Scanner) findCRLF(): usize` | Find \r\n (CRLF) from current position. |
| `findDoubleCRLF`[↗](#Scanner.findDoubleCRLF) | `export fn (self: &amp;Scanner) findDoubleCRLF(): usize` | Find \r\n\r\n (double CRLF — end of headers). |
| `readUntil`[↗](#Scanner.readUntil) | `export fn (self: &amp;Scanner!) readUntil(delim: u8): ` | Read bytes until `delim` is found. Returns slice [pos..delim_pos). |
| `readLine`[↗](#Scanner.readLine) | `export fn (self: &amp;Scanner!) readLine(): str` | Read bytes until CRLF. Returns slice [pos..cr_pos). |
| `expect`[↗](#Scanner.expect) | `export fn (self: &amp;Scanner!) expect(byt: u8): bool` | Expect and consume a specific byte. Returns true if matched. |
| `skipOWS`[↗](#Scanner.skipOWS) | `export fn (self: &amp;Scanner!) skipOWS()` | Skip optional whitespace (SP and HTAB). |
| `skipSP`[↗](#Scanner.skipSP) | `export fn (self: &amp;Scanner!) skipSP(): bool` | Skip exactly one SP (space). Returns true if consumed. |
| `readN`[↗](#Scanner.readN) | `export fn (self: &amp;Scanner!) readN(n: usize): str` | Read a fixed number of bytes as a str slice. |
| `startsWith`[↗](#Scanner.startsWith) | `export fn (self: &amp;Scanner) startsWith(pattern: str` | Check if the next bytes match a pattern (case-sensitive). |

---

### <a id="H2Frame"></a>`H2Frame` `🔓 export`

> 📄 `h2.vx` L76-82

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
| `isEndStream`[↗](#H2Frame.isEndStream) | `export fn (self: &amp;H2Frame) isEndStream(): bool` | Has END_STREAM flag? |
| `isEndHeaders`[↗](#H2Frame.isEndHeaders) | `export fn (self: &amp;H2Frame) isEndHeaders(): bool` | Has END_HEADERS flag? |
| `isPadded`[↗](#H2Frame.isPadded) | `export fn (self: &amp;H2Frame) isPadded(): bool` | Has PADDED flag? |
| `hasPriority`[↗](#H2Frame.hasPriority) | `export fn (self: &amp;H2Frame) hasPriority(): bool` | Has PRIORITY flag? |
| `isAck`[↗](#H2Frame.isAck) | `export fn (self: &amp;H2Frame) isAck(): bool` | Has ACK flag? |

---

### <a id="H2Settings"></a>`H2Settings` `🔓 export`

> 📄 `h2.vx` L327-335

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

> 📄 `h2.vx` L453-458

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

### <a id="H2LegacyPriority"></a>`H2LegacyPriority` `🔓 export`

> 📄 `h2.vx` L477-482

```vex
export struct H2LegacyPriority
```

Deprecated RFC 7540 dependency metadata retained only for HTTP/2 wire

interoperability. Modern scheduling uses RFC 9218 `H2Priority` instead.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `streamDependency` | `u32` | 🔓 public |  |
| `weight` | `u16` | 🔓 public |  |
| `exclusive` | `bool` | 🔓 public |  |

---

### <a id="BodyProgress"></a>`BodyProgress` `🔓 export`

> 📄 `body.vx` L38-42

```vex
export struct BodyProgress
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `consumed` | `usize` | 🔓 public |  |
| `decoded` | `usize` | 🔓 public |  |

---

### <a id="BodyConsumerStart"></a>`BodyConsumerStart` `🔓 export`

> 📄 `body.vx` L54-59

```vex
export struct BodyConsumerStart
```

Immutable metadata delivered exactly once before a streaming consumer sees

decoded bytes. `declaredLength` is -1 when the framing has no fixed decoded
length (`chunked` or `until-close`). A consumer must treat every chunk view
as borrowed from the current transport read and may not retain it.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `mode` | `BodyMode` | 🔓 public |  |
| `declaredLength` | `i64` | 🔓 public |  |
| `maxBodyBytes` | `usize` | 🔓 public |  |

---

### <a id="BodyReader"></a>`BodyReader` `🔓 export`

> 📄 `body.vx` L84-91

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
| `BodyReader.new`[↗](#BodyReader.new) | `export fn BodyReader.new(mode: BodyMode): BodyRead` |  |
| `feedInto`[↗](#BodyReader.feedInto) | `export fn (self: &amp;BodyReader!) feedInto(data: str,` | Consume one transport fragment and append decoded bytes to `output`. |
| `feedTo`[↗](#BodyReader.feedTo) | `export fn (self: &amp;BodyReader!) feedTo(data: str, s` | Consume one transport fragment through a caller-owned decoded-byte sink. |
| `connectionClosed`[↗](#BodyReader.connectionClosed) | `export fn (self: &amp;BodyReader!) connectionClosed()` |  |
| `isDone`[↗](#BodyReader.isDone) | `export fn (self: &amp;BodyReader) isDone(): bool` |  |
| `totalBytes`[↗](#BodyReader.totalBytes) | `export fn (self: &amp;BodyReader) totalBytes(): usize` |  |
| `reset`[↗](#BodyReader.reset) | `export fn (self: &amp;BodyReader!) reset(mode: BodyMod` |  |

---

### <a id="RequestBodyLifecycle"></a>`RequestBodyLifecycle` `🔓 export`

> 📄 `body.vx` L98-102

```vex
export struct RequestBodyLifecycle
```

Owns exactly one `BodyReader` plus the begin/finish/cancel transition for a

route-owned consumer. This is the only place a future Fiber body lane may
translate parser completion or transport failure into consumer lifecycle
calls; it prevents multipart/proxy helpers from inventing competing body
decoders or success-on-error behavior.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `reader` | `BodyReader` | 🔓 public |  |
| `delivery` | `DecodedBodyLifecycle` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `RequestBodyLifecycle.new`[↗](#RequestBodyLifecycle.new) | `export fn RequestBodyLifecycle.new(mode: BodyMode)` |  |
| `begin`[↗](#RequestBodyLifecycle.begin) | `export fn (self: &amp;RequestBodyLifecycle!) begin(con` | Begin one consumer exactly once. A consumer that rejects admission is |
| `feed`[↗](#RequestBodyLifecycle.feed) | `export fn (self: &amp;RequestBodyLifecycle!) feed(data` | Decode one transport fragment into an admitted consumer. Calls after a |
| `connectionClosed`[↗](#RequestBodyLifecycle.connectionClosed) | `export fn (self: &amp;RequestBodyLifecycle!) connectio` | Terminal peer-close handling. Only close-delimited bodies may finish at EOF; |
| `cancel`[↗](#RequestBodyLifecycle.cancel) | `export fn (self: &amp;RequestBodyLifecycle!) cancel(co` | Cancel an admitted consumer due to deadline, routing failure, or explicit |
| `reset`[↗](#RequestBodyLifecycle.reset) | `export fn (self: &amp;RequestBodyLifecycle!) reset(mod` | Reset only after a terminal transition. This makes accidental reuse while |

---

### <a id="DecodedBodyLifecycle"></a>`DecodedBodyLifecycle` `🔓 export`

> 📄 `body.vx` L110-117

```vex
export struct DecodedBodyLifecycle
```

Protocol-neutral owner of the application body-consumer contract.

HTTP/1 feeds this owner after `BodyReader` removes transfer framing. HTTP/2
feeds it directly from validated DATA payloads. Keeping admission, byte
limits, declared-length accounting and terminal callbacks here prevents
each transport from inventing subtly different body semantics.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `state` | `BodyConsumerState` | 🔓 public |  |
| `mode` | `BodyMode` | 🔓 public |  |
| `declaredLength` | `i64` | 🔓 public |  |
| `maxBodyBytes` | `usize` | 🔓 public |  |
| `totalBytes` | `usize` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `DecodedBodyLifecycle.new`[↗](#DecodedBodyLifecycle.new) | `export fn DecodedBodyLifecycle.new(mode: BodyMode,` |  |
| `startInfo`[↗](#DecodedBodyLifecycle.startInfo) | `fn (self: &amp;DecodedBodyLifecycle) startInfo(): Body` |  |
| `begin`[↗](#DecodedBodyLifecycle.begin) | `export fn (self: &amp;DecodedBodyLifecycle!) begin(con` | Admit exactly one consumer. Invalid or oversized declared lengths are |
| `cancelActive`[↗](#DecodedBodyLifecycle.cancelActive) | `fn (self: &amp;DecodedBodyLifecycle!) cancelActive(con` |  |
| `accept`[↗](#DecodedBodyLifecycle.accept) | `export fn (self: &amp;DecodedBodyLifecycle!) accept(by` | Deliver one already-decoded protocol payload synchronously. Accounting is |
| `finish`[↗](#DecodedBodyLifecycle.finish) | `export fn (self: &amp;DecodedBodyLifecycle!) finish(co` | Complete the protocol-neutral stream boundary exactly once. A declared |
| `cancel`[↗](#DecodedBodyLifecycle.cancel) | `export fn (self: &amp;DecodedBodyLifecycle!) cancel(co` | Idempotently cancel an admitted consumer without publishing completion. |
| `rearm`[↗](#DecodedBodyLifecycle.rearm) | `export fn (self: &amp;DecodedBodyLifecycle!) rearm(mod` | Re-arm only after a terminal transition; active borrowed callbacks can |

---

### <a id="BodyPageRing"></a>`BodyPageRing` `🔓 export`

> 📄 `body.vx` L130-137

```vex
export struct BodyPageRing
```

Fixed-capacity storage for Fiber's task-owned asynchronous request-body

lane. `BodyReader` still presents decoded chunks as borrowed views; this
ring is the ownership boundary used before forwarding decoded bytes to the
route-owned consumer.
Storage is allocated once at construction and never grows. Both readable
and writable views stop at a logical page boundary, so a task can release
one fixed page at a time without exposing an interior allocation or making
a peer-controlled fragment size affect retained memory. This type itself is
deliberately single-owner: the Fiber handoff transfers the descriptor and
its ring together rather than sharing mutable pages between worker and task.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `storage` | `Vec&lt;u8&gt;` | 🔒 private |  |
| `pageBytes` | `usize` | 🔒 private |  |
| `capacityBytes` | `usize` | 🔒 private |  |
| `readOffset` | `usize` | 🔒 private |  |
| `writeOffset` | `usize` | 🔒 private |  |
| `bufferedBytes` | `usize` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `BodyPageRing.new`[↗](#BodyPageRing.new) | `export fn BodyPageRing.new(pageCount: usize, pageB` | Create a bounded owned page ring. Zero dimensions and overflowing total |
| `capacity`[↗](#BodyPageRing.capacity) | `export fn (self: &amp;BodyPageRing) capacity(): usize` | Total fixed storage reserved by this ring. |
| `len`[↗](#BodyPageRing.len) | `export fn (self: &amp;BodyPageRing) len(): usize` | Number of decoded bytes currently owned by the ring. |
| `isEmpty`[↗](#BodyPageRing.isEmpty) | `export fn (self: &amp;BodyPageRing) isEmpty(): bool` |  |
| `free`[↗](#BodyPageRing.free) | `export fn (self: &amp;BodyPageRing) free(): usize` | Remaining bounded storage. A zero result is the backpressure signal: the |
| `writable`[↗](#BodyPageRing.writable) | `export fn (self: &amp;BodyPageRing) writable(): usize` | Bytes that may be committed through `writePtr` without crossing one page. |
| `writePtr`[↗](#BodyPageRing.writePtr) | `export fn (self: &amp;BodyPageRing!) writePtr(): Ptr&lt;u` | Writable tail storage for one bounded producer operation. It is valid only |
| `commitWrite`[↗](#BodyPageRing.commitWrite) | `export fn (self: &amp;BodyPageRing!) commitWrite(count` | Commit bytes written through the current writable page. Invalid counts do |
| `write`[↗](#BodyPageRing.write) | `export fn (self: &amp;BodyPageRing!) write(data: str):` | Copy a complete caller-owned fragment into the bounded pages. This is the |
| `readable`[↗](#BodyPageRing.readable) | `export fn (self: &amp;BodyPageRing) readable(): usize` | Bytes available to one consumer callback without crossing a page. The |
| `readChunk`[↗](#BodyPageRing.readChunk) | `export fn (self: &amp;BodyPageRing) readChunk(): str` | Borrow the current readable page fragment. Empty rings return an empty |
| `consume`[↗](#BodyPageRing.consume) | `export fn (self: &amp;BodyPageRing!) consume(count: us` | Release exactly a prefix of the current readable page. Crossing a page in |
| `reset`[↗](#BodyPageRing.reset) | `export fn (self: &amp;BodyPageRing!) reset()` | Clear queued ownership after a terminal request transition. Pages remain |

---

### <a id="StringBuilderBodySink"></a>`StringBuilderBodySink`

> 📄 `body.vx` L285-287

```vex
struct StringBuilderBodySink
```

Internal adapter which preserves the buffered public convenience API while

making `BodyReader.feedTo` the one canonical decoding path.

**Implements:** `ChunkSink`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `output` | `&amp;StringBuilder!` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `acceptChunk`[↗](#StringBuilderBodySink.acceptChunk) | `fn (self: &amp;StringBuilderBodySink!) acceptChunk(byt` |  |

---

### <a id="LifecycleBodySink"></a>`LifecycleBodySink`

> 📄 `body.vx` L450-453

```vex
struct LifecycleBodySink<C>
```

**Implements:** `ChunkSink`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `delivery` | `&amp;DecodedBodyLifecycle!` | 🔒 private |  |
| `consumer` | `&amp;C!` | 🔒 private |  |

**Type Parameters:**

- `C`: `RequestBodyConsumer`

---

### <a id="StaticEntry"></a>`StaticEntry`

> 📄 `hpack.vx` L24-28

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

> 📄 `hpack.vx` L104-109

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

> 📄 `hpack.vx` L111-119

```vex
export struct DynamicTable
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `entries` | `Vec&lt;DynEntry&gt;` | 🔓 public |  |
| `size` | `usize` | 🔓 public |  |
| `maxSize` | `usize` | 🔓 public |  |
| `allowedMaxSize` | `usize` | 🔓 public |  |
| `requiredSizeUpdate` | `bool` | 🔓 public |  |
| `requiredSizeUpdateMaximum` | `usize` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `DynamicTable.new`[↗](#DynamicTable.new) | `export fn DynamicTable.new(maxSize: usize): Dynami` |  |
| `add`[↗](#DynamicTable.add) | `export fn (self: &amp;DynamicTable!) add(name: string,` | Add entry to dynamic table (front = newest). |
| `lookup`[↗](#DynamicTable.lookup) | `export fn (self: &amp;DynamicTable) lookup(index: usiz` | Look up by absolute index (1-based, 1..61 = static, 62+ = dynamic). |
| `setMaxSize`[↗](#DynamicTable.setMaxSize) | `export fn (self: &amp;DynamicTable!) setMaxSize(newMax` | Update max size (from SETTINGS_HEADER_TABLE_SIZE). |
| `setAllowedMaxSize`[↗](#DynamicTable.setAllowedMaxSize) | `export fn (self: &amp;DynamicTable!) setAllowedMaxSize` | Apply an acknowledged SETTINGS_HEADER_TABLE_SIZE to the decoder. A |
| `requiresSizeUpdate`[↗](#DynamicTable.requiresSizeUpdate) | `export fn (self: &amp;DynamicTable) requiresSizeUpdate` |  |

---

### <a id="HpackHeader"></a>`HpackHeader` `🔓 export`

> 📄 `hpack.vx` L298-303

```vex
export struct HpackHeader
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `name` | `string` | 🔓 public |  |
| `value` | `string` | 🔓 public |  |
| `indexing` | `HpackIndexing` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `HpackHeader.new`[↗](#HpackHeader.new) | `export fn HpackHeader.new(name: str, value: str): ` |  |
| `HpackHeader.withIndexing`[↗](#HpackHeader.withIndexing) | `export fn HpackHeader.withIndexing(name: str, valu` |  |
| `HpackHeader.sensitive`[↗](#HpackHeader.sensitive) | `export fn HpackHeader.sensitive(name: str, value: ` |  |

---

### <a id="HpackDecodeLimits"></a>`HpackDecodeLimits` `🔓 export`

> 📄 `hpack.vx` L348-354

```vex
export struct HpackDecodeLimits
```

Explicit resource policy for one complete HPACK header block.

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `maxHeaderListBytes` | `usize` | 🔓 public |  |
| `maxHeaderCount` | `usize` | 🔓 public |  |
| `maxStringBytes` | `usize` | 🔓 public |  |
| `maxDynamicTableSize` | `usize` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `HpackDecodeLimits.defaults`[↗](#HpackDecodeLimits.defaults) | `export fn HpackDecodeLimits.defaults(): HpackDecod` |  |
| `isValid`[↗](#HpackDecodeLimits.isValid) | `export fn (self: &amp;HpackDecodeLimits) isValid(): bo` |  |

---

### <a id="HpackEncodeLimits"></a>`HpackEncodeLimits` `🔓 export`

> 📄 `hpack.vx` L676-683

```vex
export struct HpackEncodeLimits
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `maxHeaderListBytes` | `usize` | 🔓 public |  |
| `maxHeaderCount` | `usize` | 🔓 public |  |
| `maxStringBytes` | `usize` | 🔓 public |  |
| `maxBlockBytes` | `usize` | 🔓 public |  |
| `useHuffman` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `HpackEncodeLimits.defaults`[↗](#HpackEncodeLimits.defaults) | `export fn HpackEncodeLimits.defaults(): HpackEncod` |  |
| `isValid`[↗](#HpackEncodeLimits.isValid) | `export fn (self: &amp;HpackEncodeLimits) isValid(): bo` |  |

---

### <a id="HpackEncoder"></a>`HpackEncoder` `🔓 export`

> 📄 `hpack.vx` L710-715

```vex
export struct HpackEncoder
```

Connection-lifetime encoder state. Peer SETTINGS changes are applied to

table capacity immediately and emitted at the beginning of the next block.
A reduction followed by an increase retains both the smallest observed
value and the final value, as required by RFC 7541 §4.2.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `table` | `DynamicTable` | 🔒 private |  |
| `pendingSizeUpdate` | `bool` | 🔒 private |  |
| `pendingMinimumSize` | `usize` | 🔒 private |  |
| `pendingFinalSize` | `usize` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `HpackEncoder.new`[↗](#HpackEncoder.new) | `export fn HpackEncoder.new(maximumTableBytes: usiz` |  |
| `dynamicTableBytes`[↗](#HpackEncoder.dynamicTableBytes) | `export fn (self: &amp;HpackEncoder) dynamicTableBytes(` |  |
| `maximumTableBytes`[↗](#HpackEncoder.maximumTableBytes) | `export fn (self: &amp;HpackEncoder) maximumTableBytes(` |  |
| `hasPendingSizeUpdate`[↗](#HpackEncoder.hasPendingSizeUpdate) | `export fn (self: &amp;HpackEncoder) hasPendingSizeUpda` |  |
| `setMaximumTableBytes`[↗](#HpackEncoder.setMaximumTableBytes) | `export fn (self: &amp;HpackEncoder!) setMaximumTableBy` | Apply the peer's effective SETTINGS_HEADER_TABLE_SIZE. No wire state is |

---

### <a id="HpackVirtualEntry"></a>`HpackVirtualEntry`

> 📄 `hpack.vx` L757-761

```vex
struct HpackVirtualEntry
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `name` | `str` | 🔒 private |  |
| `value` | `str` | 🔒 private |  |
| `size` | `usize` | 🔒 private |  |

---

### <a id="HpackEncodeDecision"></a>`HpackEncodeDecision`

> 📄 `hpack.vx` L763-770

```vex
struct HpackEncodeDecision
```

**Implements:** `Copy`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `representation` | `u8` | 🔒 private |  |
| `index` | `usize` | 🔒 private |  |
| `huffmanName` | `bool` | 🔒 private |  |
| `huffmanValue` | `bool` | 🔒 private |  |
| `encodedNameBytes` | `usize` | 🔒 private |  |
| `encodedValueBytes` | `usize` | 🔒 private |  |

---

### <a id="FiberRequestLimits"></a>`FiberRequestLimits` `🔓 export`

> 📄 `fiber_request.vx` L21-25

```vex
export struct FiberRequestLimits
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `maxHeaderBytes` | `usize` | 🔓 public |  |
| `maxHeaders` | `usize` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `FiberRequestLimits.defaults`[↗](#FiberRequestLimits.defaults) | `export fn FiberRequestLimits.defaults(): FiberRequ` |  |

---

### <a id="FiberHeader"></a>`FiberHeader` `🔓 export`

> 📄 `fiber_request.vx` L34-38

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

> 📄 `fiber_request.vx` L40-51

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
| `chunked` | `bool` | 🔓 public |  |
| `keepAlive` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `FiberParsedRequest.empty`[↗](#FiberParsedRequest.empty) | `export fn FiberParsedRequest.empty(): FiberParsedR` |  |

---

### <a id="H2ConnectionState"></a>`H2ConnectionState` `🔓 export`

> 📄 `h2_connection.vx` L72-87

```vex
export struct H2ConnectionState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `role` | `H2EndpointRole` | 🔓 public |  |
| `recvContinuationStreamId` | `u32` | 🔓 public |  |
| `sendContinuationStreamId` | `u32` | 🔓 public |  |
| `outstandingLocalSettings` | `u32` | 🔓 public |  |
| `pendingPeerSettingsAcks` | `u32` | 🔓 public |  |
| `sendWindow` | `i32` | 🔓 public |  |
| `recvWindow` | `i32` | 🔓 public |  |
| `receivedGoAway` | `bool` | 🔓 public |  |
| `sentGoAway` | `bool` | 🔓 public |  |
| `receivedLastStreamId` | `u32` | 🔓 public |  |
| `sentLastStreamId` | `u32` | 🔓 public |  |
| `nextLocalStreamId` | `u32` | 🔓 public |  |
| `highestRemoteStreamId` | `u32` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `H2ConnectionState.new`[↗](#H2ConnectionState.new) | `export fn H2ConnectionState.new(role: H2EndpointRo` | Create connection state with explicit endpoint ownership. Clients initiate |
| `isLocalStreamId`[↗](#H2ConnectionState.isLocalStreamId) | `fn (self: &amp;H2ConnectionState) isLocalStreamId(id: ` |  |
| `openLocalStream`[↗](#H2ConnectionState.openLocalStream) | `export fn (self: &amp;H2ConnectionState!) openLocalStr` | Open the next locally owned stream and materialize it atomically. Once a |
| `acceptRemoteStream`[↗](#H2ConnectionState.acceptRemoteStream) | `export fn (self: &amp;H2ConnectionState!) acceptRemote` | Admit a peer-owned stream under parity, monotonic-ID, GOAWAY and concurrent |
| `localStreamMayHaveBeenProcessed`[↗](#H2ConnectionState.localStreamMayHaveBeenProcessed) | `export fn (self: &amp;H2ConnectionState) localStreamMa` | Whether the peer's GOAWAY confirms that a locally initiated stream may have |
| `applyReceivedPriorityUpdate`[↗](#H2ConnectionState.applyReceivedPriorityUpdate) | `export fn (self: &amp;H2ConnectionState!) applyReceive` | Apply a client PRIORITY_UPDATE to the bounded scheduler. Request priorities |
| `reserveSendData`[↗](#H2ConnectionState.reserveSendData) | `export fn (self: &amp;H2ConnectionState!) reserveSendD` | Atomically reserve connection and stream credit for outgoing DATA. |
| `acceptReceivedData`[↗](#H2ConnectionState.acceptReceivedData) | `export fn (self: &amp;H2ConnectionState!) acceptReceiv` | Atomically account peer DATA against connection and stream receive credit. |
| `acceptReceivedDiscardedData`[↗](#H2ConnectionState.acceptReceivedDiscardedData) | `export fn (self: &amp;H2ConnectionState!) acceptReceiv` | Account DATA that arrived after the peer-facing side of a stream closed. |
| `recvConnectionWindowUpdate`[↗](#H2ConnectionState.recvConnectionWindowUpdate) | `export fn (self: &amp;H2ConnectionState!) recvConnecti` | Apply a peer connection-level WINDOW_UPDATE to local send credit. |
| `sendConnectionWindowUpdate`[↗](#H2ConnectionState.sendConnectionWindowUpdate) | `export fn (self: &amp;H2ConnectionState!) sendConnecti` | Record a locally emitted connection WINDOW_UPDATE in receive credit. |
| `recvStreamWindowUpdate`[↗](#H2ConnectionState.recvStreamWindowUpdate) | `export fn (self: &amp;H2ConnectionState!) recvStreamWi` | Apply a peer stream-level WINDOW_UPDATE to local send credit. |
| `sendStreamWindowUpdate`[↗](#H2ConnectionState.sendStreamWindowUpdate) | `export fn (self: &amp;H2ConnectionState!) sendStreamWi` | Record a locally emitted stream WINDOW_UPDATE in receive credit. |
| `recvFrame`[↗](#H2ConnectionState.recvFrame) | `export fn (self: &amp;H2ConnectionState!) recvFrame(fr` | Apply a peer frame to connection-owned receive sequencing. |
| `sendFrame`[↗](#H2ConnectionState.sendFrame) | `export fn (self: &amp;H2ConnectionState!) sendFrame(fr` | Apply a local frame to connection-owned send sequencing. |
| `recordReceivedGoAway`[↗](#H2ConnectionState.recordReceivedGoAway) | `export fn (self: &amp;H2ConnectionState!) recordReceiv` | Record an accepted peer GOAWAY payload. Later GOAWAY frames may reduce, but |
| `recordSentGoAway`[↗](#H2ConnectionState.recordSentGoAway) | `export fn (self: &amp;H2ConnectionState!) recordSentGo` | Record a locally emitted GOAWAY payload under the same non-increasing rule. |

---

### <a id="ParserRequest"></a>`ParserRequest` `🔓 export`

> 📄 `request.vx` L113-119

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
| `path`[↗](#ParserRequest.path) | `export fn (self: &amp;ParserRequest) path(): str` | Get the URI path component (before '?'). |
| `query`[↗](#ParserRequest.query) | `export fn (self: &amp;ParserRequest) query(): str` | Get query string (after '?'), or empty. |
| `host`[↗](#ParserRequest.host) | `export fn (self: &amp;ParserRequest) host(): str` | Get Host header value. |
| `contentLength`[↗](#ParserRequest.contentLength) | `export fn (self: &amp;ParserRequest) contentLength(): ` | Get Content-Length or -1. |
| `isChunked`[↗](#ParserRequest.isChunked) | `export fn (self: &amp;ParserRequest) isChunked(): bool` | Is this a chunked transfer? |
| `isWebSocketUpgrade`[↗](#ParserRequest.isWebSocketUpgrade) | `export fn (self: &amp;ParserRequest) isWebSocketUpgrad` | Is this a WebSocket upgrade? |
| `hasBody`[↗](#ParserRequest.hasBody) | `export fn (self: &amp;ParserRequest) hasBody(): bool` | Does the request expect a body? |

---

### <a id="ChunkProgress"></a>`ChunkProgress` `🔓 export`

> 📄 `chunked.vx` L22-26

```vex
export struct ChunkProgress
```

Progress is relative to the input passed to the current `decodeInto` call.

The caller must retain `input[consumed..]` when `NeedMore` is returned.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `consumed` | `usize` | 🔓 public |  |
| `decoded` | `usize` | 🔓 public |  |

---

### <a id="StringBuilderChunkSink"></a>`StringBuilderChunkSink`

> 📄 `chunked.vx` L47-49

```vex
struct StringBuilderChunkSink
```

Compatibility adapter for the buffered `decodeInto` convenience API.

The decoder itself always targets `ChunkSink`; this adds no alternate
framing path.

**Implements:** `ChunkSink`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `output` | `&amp;StringBuilder!` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `acceptChunk`[↗](#StringBuilderChunkSink.acceptChunk) | `fn (self: &amp;StringBuilderChunkSink!) acceptChunk(by` |  |

---

### <a id="ChunkedDecoder"></a>`ChunkedDecoder` `🔓 export`

> 📄 `chunked.vx` L56-62

```vex
export struct ChunkedDecoder
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `state` | `ChunkState` | 🔓 public |  |
| `dataRemaining` | `usize` | 🔓 public |  |
| `totalDecoded` | `usize` | 🔓 public |  |
| `trailerBytes` | `usize` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `ChunkedDecoder.new`[↗](#ChunkedDecoder.new) | `export fn ChunkedDecoder.new(): ChunkedDecoder` |  |
| `fail`[↗](#ChunkedDecoder.fail) | `fn (self: &amp;ChunkedDecoder!) fail(message: str): Ch` |  |
| `decodeTo`[↗](#ChunkedDecoder.decodeTo) | `export fn (self: &amp;ChunkedDecoder!) decodeTo(input:` | Incrementally decode one input fragment into a caller-owned sink. |
| `decodeInto`[↗](#ChunkedDecoder.decodeInto) | `export fn (self: &amp;ChunkedDecoder!) decodeInto(inpu` | Buffered convenience form of `decodeTo`. |
| `reset`[↗](#ChunkedDecoder.reset) | `export fn (self: &amp;ChunkedDecoder!) reset()` |  |
| `isDone`[↗](#ChunkedDecoder.isDone) | `export fn (self: &amp;ChunkedDecoder) isDone(): bool` |  |
| `isError`[↗](#ChunkedDecoder.isError) | `export fn (self: &amp;ChunkedDecoder) isError(): bool` |  |

---

### <a id="Response"></a>`Response` `🔓 export`

> 📄 `response.vx` L26-32

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
| `encodeObserved`[↗](#Response.encodeObserved) | `fn (self: &amp;Response!) encodeObserved(seed: i64): i` |  |
| `Response.empty`[↗](#Response.empty) | `export fn Response.empty(): Response` | Create an empty response. |
| `isInformational`[↗](#Response.isInformational) | `export fn (self: &amp;Response) isInformational(): boo` | True if status is 1xx (informational). |
| `isSuccess`[↗](#Response.isSuccess) | `export fn (self: &amp;Response) isSuccess(): bool` | True if status is 2xx (success). |
| `isRedirect`[↗](#Response.isRedirect) | `export fn (self: &amp;Response) isRedirect(): bool` | True if status is 3xx (redirect). |
| `isClientError`[↗](#Response.isClientError) | `export fn (self: &amp;Response) isClientError(): bool` | True if status is 4xx (client error). |
| `isServerError`[↗](#Response.isServerError) | `export fn (self: &amp;Response) isServerError(): bool` | True if status is 5xx (server error). |
| `contentLength`[↗](#Response.contentLength) | `export fn (self: &amp;Response) contentLength(): i64` | Get Content-Length or -1. |
| `isChunked`[↗](#Response.isChunked) | `export fn (self: &amp;Response) isChunked(): bool` | Is chunked transfer? |
| `isConnectionClose`[↗](#Response.isConnectionClose) | `export fn (self: &amp;Response) isConnectionClose(): b` | Is Connection: close? |
| `location`[↗](#Response.location) | `export fn (self: &amp;Response) location(): str` | Get Location header (for redirects). |
| `contentType`[↗](#Response.contentType) | `export fn (self: &amp;Response) contentType(): str` | Get Content-Type header. |
| `Response.new`[↗](#Response.new) | `export fn Response.new(): Response` | Create a new response with default 200 OK and keep-alive. |
| `takeStreamHead`[↗](#Response.takeStreamHead) | `export fn (self: &amp;Response!) takeStreamHead(): Res` | Move streaming response metadata exactly once. Header vectors retain their |
| `reset`[↗](#Response.reset) | `export fn (self: &amp;Response!) reset()` | Reset response for reuse (clears headers, keeps capacity). |
| `status`[↗](#Response.status) | `export fn (self: &amp;Response!) status(code: i32): &amp;R` |  |
| `header`[↗](#Response.header) | `export fn (self: &amp;Response!) header(name: string, ` |  |
| `contentType`[↗](#Response.contentType) | `export fn (self: &amp;Response!) contentType(ct: strin` |  |
| `setBody`[↗](#Response.setBody) | `export fn (self: &amp;Response!) setBody(b: string): &amp;` |  |
| `sendString`[↗](#Response.sendString) | `export fn (self: &amp;Response!) sendString(fd: i64, t` |  |
| `sendJSON`[↗](#Response.sendJSON) | `export fn (self: &amp;Response!) sendJSON(fd: i64, jso` |  |
| `sendHTML`[↗](#Response.sendHTML) | `export fn (self: &amp;Response!) sendHTML(fd: i64, htm` |  |
| `send`[↗](#Response.send) | `export fn (self: &amp;Response!) send(fd: i64)` |  |
| `sendEmpty`[↗](#Response.sendEmpty) | `export fn (self: &amp;Response!) sendEmpty(fd: i64)` |  |
| `appendHeadersWithFraming`[↗](#Response.appendHeadersWithFraming) | `fn (self: &amp;Response) appendHeadersWithFraming(out:` | Append a complete HTTP/1 header block with Response-owned framing. |
| `appendHeadersForBodyLength`[↗](#Response.appendHeadersForBodyLength) | `fn (self: &amp;Response) appendHeadersForBodyLength(ou` | Append a complete HTTP/1 header block for an explicitly sized body. |
| `appendEncoded`[↗](#Response.appendEncoded) | `fn (self: &amp;Response) appendEncoded(out: &amp;StringBui` |  |
| `encodeInto`[↗](#Response.encodeInto) | `fn (self: &amp;Response!) encodeInto(defaultContentTyp` |  |
| `appendEncodedTo`[↗](#Response.appendEncodedTo) | `export fn (self: &amp;Response) appendEncodedTo(out: &amp;` | Append the buffered Fiber response into caller-owned reusable storage. |
| `appendStreamHeadersTo`[↗](#Response.appendStreamHeadersTo) | `export fn (self: &amp;Response) appendStreamHeadersTo(` | Append only the HTTP/1 headers for a body that Fiber will stream directly |
| `appendChunkedHeadersTo`[↗](#Response.appendChunkedHeadersTo) | `export fn (self: &amp;Response) appendChunkedHeadersTo` | Append headers for an unknown-length HTTP/1 response body. |
| `appendChunkTo`[↗](#Response.appendChunkTo) | `export fn (self: &amp;Response) appendChunkTo(out: &amp;St` |  |
| `appendChunkTerminatorTo`[↗](#Response.appendChunkTerminatorTo) | `export fn (self: &amp;Response) appendChunkTerminatorT` |  |
| `encode`[↗](#Response.encode) | `export fn (self: &amp;Response!) encode(): str` | Serialize into response-owned reusable storage and borrow the encoded bytes. |
| `writeTo`[↗](#Response.writeTo) | `fn (self: &amp;Response!) writeTo(fd: i64)` |  |
| `writeToWithContentType`[↗](#Response.writeToWithContentType) | `fn (self: &amp;Response!) writeToWithContentType(fd: i` |  |

---

### <a id="H2Stream"></a>`H2Stream` `🔓 export`

> 📄 `stream.vx` L90-117

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
| `legacyWeight` | `u16` | 🔓 public |  |
| `legacyDependency` | `u32` | 🔓 public |  |
| `legacyExclusive` | `bool` | 🔓 public |  |
| `recvInitialHeaders` | `bool` | 🔓 public |  |
| `recvFinalHeaders` | `bool` | 🔓 public |  |
| `sendInitialHeaders` | `bool` | 🔓 public |  |
| `sendFinalHeaders` | `bool` | 🔓 public |  |
| `recvContentLength` | `i64` | 🔓 public |  |
| `recvContentBytes` | `u64` | 🔓 public |  |
| `recvContentForbidden` | `bool` | 🔓 public |  |
| `sentRequestHead` | `bool` | 🔓 public |  |
| `sentRequestConnect` | `bool` | 🔓 public |  |
| `recvRequestHead` | `bool` | 🔓 public |  |
| `recvRequestConnect` | `bool` | 🔓 public |  |
| `sendContentLength` | `i64` | 🔓 public |  |
| `sendContentBytes` | `u64` | 🔓 public |  |
| `sendContentForbidden` | `bool` | 🔓 public |  |
| `resetSent` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `H2Stream.new`[↗](#H2Stream.new) | `export fn H2Stream.new(id: u32, initialWindow: i32` | Create a new stream in idle state. |
| `recvFrame`[↗](#H2Stream.recvFrame) | `export fn (self: &amp;H2Stream!) recvFrame(frame: &amp;H2F` | Process a received frame and transition state. |
| `sendFrame`[↗](#H2Stream.sendFrame) | `export fn (self: &amp;H2Stream!) sendFrame(frame: &amp;H2F` | Process a sent frame and transition state. |
| `setLegacyPriority`[↗](#H2Stream.setLegacyPriority) | `export fn (self: &amp;H2Stream!) setLegacyPriority(dep` | Retain deprecated RFC 7540 dependency metadata for interoperability fallback. |
| `isClosed`[↗](#H2Stream.isClosed) | `export fn (self: &amp;H2Stream) isClosed(): bool` | Is the stream in a terminal state? |
| `canSend`[↗](#H2Stream.canSend) | `export fn (self: &amp;H2Stream) canSend(): bool` | Can this stream send DATA/HEADERS? |
| `canRecv`[↗](#H2Stream.canRecv) | `export fn (self: &amp;H2Stream) canRecv(): bool` | Can this stream receive DATA/HEADERS? |

---

### <a id="StreamMap"></a>`StreamMap` `🔓 export`

> 📄 `stream.vx` L421-427

```vex
export struct StreamMap
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `streams` | `Vec&lt;H2Stream&gt;` | 🔓 public |  |
| `sendInitialWindow` | `i32` | 🔓 public |  |
| `recvInitialWindow` | `i32` | 🔓 public |  |
| `maxStreams` | `u32` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `StreamMap.new`[↗](#StreamMap.new) | `export fn StreamMap.new(maxStreams: u32): StreamMa` | Create a stream map with RFC default send/receive windows. Negotiated |
| `find`[↗](#StreamMap.find) | `export fn (self: &amp;StreamMap) find(id: u32): i32` | Find a materialized stream without changing connection state. |
| `getOrCreate`[↗](#StreamMap.getOrCreate) | `export fn (self: &amp;StreamMap!) getOrCreate(id: u32)` | Get or create a stream by ID. |
| `residentCount`[↗](#StreamMap.residentCount) | `export fn (self: &amp;StreamMap) residentCount(): usiz` | Number of resident slots. This never exceeds the configured concurrent |
| `applyInitialWindowDelta`[↗](#StreamMap.applyInitialWindowDelta) | `fn (self: &amp;StreamMap!) applyInitialWindowDelta(new` |  |
| `applyPeerInitialWindowSize`[↗](#StreamMap.applyPeerInitialWindowSize) | `export fn (self: &amp;StreamMap!) applyPeerInitialWind` | Apply peer SETTINGS_INITIAL_WINDOW_SIZE to every local send window. |
| `applyLocalInitialWindowSize`[↗](#StreamMap.applyLocalInitialWindowSize) | `export fn (self: &amp;StreamMap!) applyLocalInitialWin` | Apply a locally advertised SETTINGS_INITIAL_WINDOW_SIZE to receive windows. |
| `get`[↗](#StreamMap.get) | `export fn (self: &amp;StreamMap) get(index: usize): Op` | Get stream by index. |
| `activeCount`[↗](#StreamMap.activeCount) | `export fn (self: &amp;StreamMap) activeCount(): u32` | Count active (non-closed) streams. |

---

### <a id="Server"></a>`Server` `🔓 export`

> 📄 `server.vx` L15-20

```vex
export struct Server
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `host` | `string` | 🔓 public |  |
| `port` | `i32` | 🔓 public |  |
| `app` | `App&lt;{HTTP_FULL}&gt;` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Server.new`[↗](#Server.new) | `export fn Server.new(host: string, port: i32): Ser` | Create a direct callback server with Fiber's production defaults. |
| `Server.withConfig`[↗](#Server.withConfig) | `export fn Server.withConfig(host: string, port: i3` | Create a direct callback server with one coherent Fiber resource policy. |
| `serve`[↗](#Server.serve) | `export fn (self: Server) serve(handler: RequestHan` | Serve requests through the canonical Fiber HTTP/1 state machine. |
| `serveWithContext`[↗](#Server.serveWithContext) | `export fn (self: Server) serveWithContext(lifetime` | Context-cancellable direct callback server. Cancellation has the same |

---

### <a id="ConnBuf"></a>`ConnBuf` `🔓 export`

> 📄 `connection.vx` L29-34

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
| `pending`[↗](#ConnBuf.pending) | `export fn (self: &amp;ConnBuf) pending(): usize` | Number of unprocessed bytes available. |
| `writePtr`[↗](#ConnBuf.writePtr) | `export fn (self: &amp;ConnBuf!) writePtr(): Ptr&lt;u8!&gt;` | Pointer to the start of free space (where recv should write). |
| `freeSpace`[↗](#ConnBuf.freeSpace) | `export fn (self: &amp;ConnBuf) freeSpace(): usize` | Amount of free space available for recv(). |
| `advance`[↗](#ConnBuf.advance) | `export fn (self: &amp;ConnBuf!) advance(n: usize)` | Advance write position after a successful recv(). |
| `readPtr`[↗](#ConnBuf.readPtr) | `export fn (self: &amp;ConnBuf) readPtr(): Ptr&lt;u8&gt;` | Pointer to start of unprocessed data. |
| `consume`[↗](#ConnBuf.consume) | `export fn (self: &amp;ConnBuf!) consume(n: usize)` | Consume `n` bytes from the front (after processing). |
| `compact`[↗](#ConnBuf.compact) | `export fn (self: &amp;ConnBuf!) compact()` | Move unprocessed data to front of buffer to free space at the end. |
| `grow`[↗](#ConnBuf.grow) | `export fn (self: &amp;ConnBuf!) grow(): bool` | Grow buffer capacity (doubles up to MAX_BUF). Returns false if at limit. |
| `reset`[↗](#ConnBuf.reset) | `export fn (self: &amp;ConnBuf!) reset()` | Reset for keep-alive reuse (zero alloc — just resets cursors). |

---

### <a id="Connection"></a>`Connection` `🔓 export`

> 📄 `connection.vx` L138-144

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
| `recv`[↗](#Connection.recv) | `export fn (self: &amp;Connection!) recv(): i64` | Read from socket into buffer. Returns bytes read (0=EOF, &lt;0=error/EAGAIN). |
| `findHeaderEnd`[↗](#Connection.findHeaderEnd) | `export fn (self: &amp;Connection!) findHeaderEnd(): i3` | Check if a complete HTTP header block is available. |
| `reset`[↗](#Connection.reset) | `export fn (self: &amp;Connection!) reset()` | Reset connection for keep-alive reuse. |
| `consumeRequest`[↗](#Connection.consumeRequest) | `export fn (self: &amp;Connection!) consumeRequest(tota` | Consume processed bytes (header + body). |

---

### <a id="AdmissionState"></a>`AdmissionState`

> 📄 `app.vx` L113-117

```vex
struct AdmissionState
```

One process-wide admission budget shared by acceptors/workers. The counter

changes only at native connection ownership boundaries, never per request.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `limit` | `u32` | 🔒 private |  |
| `active` | `u32` | 🔒 private |  |
| `rejected` | `u64` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `AdmissionState.new`[↗](#AdmissionState.new) | `fn AdmissionState.new(configuredLimit: i32): Admis` |  |

---

### <a id="WsSessionIdState"></a>`WsSessionIdState`

> 📄 `app.vx` L122-124

```vex
struct WsSessionIdState
```

Process-local, atomic IDs for application lifecycle callbacks. Full

listeners box one owner and share it across workers; exact HTTP/1 apps do
not retain or allocate WebSocket-only state.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `next` | `u64` | 🔒 private |  |

---

### <a id="ConnectionState"></a>`ConnectionState`

> 📄 `app.vx` L163-184

```vex
struct ConnectionState<P> with the descriptor and cannot outlive the server's counter.
    admission: Box<AdmissionState>, protocolUndecided: bool, // Capability-specific storage. The minimal H1-sync monomorph substitutes
    // the zero-sized state below, so H2/WS layouts and drop closures cannot
    // leak into its ABI or reachability graph.
    protocol: P, }
```

Persistent HTTP/1 framing state. Instances are created outside request

arenas and moved through the worker-local map, so fragmented bodies survive
arena reset without exposing allocator management to application code.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `pending` | `string` | 🔒 private |  |
| `header` | `string` | 🔒 private |  |
| `reader` | `BodyReader` | 🔒 private |  |
| `body` | `StringBuilder` | 🔒 private |  |
| `response` | `StringBuilder` | 🔒 private |  |
| `readingBody` | `bool` | 🔒 private |  |
| `lastActivityNs` | `u64` | 🔒 private |  |
| `requestStartedNs` | `u64` | 🔒 private |  |
| `admission` | `Box&lt;AdmissionState&gt;` | 🔒 private |  |
| `protocolUndecided` | `bool` | 🔒 private |  |
| `protocol` | `P` | 🔒 private |  |

**Type Parameters:**

- `P`

---

### <a id="Http1SyncProtocolState"></a>`Http1SyncProtocolState`

> 📄 `app.vx` L186-186

```vex
struct Http1SyncProtocolState
```

---

### <a id="FullProtocolState"></a>`FullProtocolState`

> 📄 `app.vx` L188-202

```vex
struct FullProtocolState
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `ws` | `Option&lt;FiberWsState&gt;` | 🔒 private |  |
| `wsDeferred` | `bool` | 🔒 private |  |
| `h2` | `Option&lt;H2TransportSession&gt;` | 🔒 private |  |
| `h2Deferred` | `bool` | 🔒 private |  |
| `h2DrainStartedNs` | `u64` | 🔒 private |  |

---

### <a id="FiberWsState"></a>`FiberWsState`

> 📄 `app.vx` L209-213

```vex
struct FiberWsState
```

Route callback plus its bounded non-blocking protocol state. Application

code only receives an event-scoped `&WsSession!`; it never owns an fd.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `session` | `WsSession` | 🔒 private |  |
| `handler` | `WsHandler` | 🔒 private |  |
| `onClose` | `Option&lt;WsCloseHandler&gt;` | 🔒 private |  |

---

### <a id="AsyncRouteLaunch"></a>`AsyncRouteLaunch`

> 📄 `app.vx` L218-221

```vex
struct AsyncRouteLaunch
```

Fully task-owned inputs for an explicit async Fiber route. This is created

only after frozen routing resolves the structural route id; it contains no
worker buffer, event-loop registration or raw descriptor.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `ctx` | `Ctx` | 🔒 private |  |
| `handlers` | `Vec&lt;AsyncHandler&gt;` | 🔒 private |  |

---

### <a id="AsyncRouteTaskInput"></a>`AsyncRouteTaskInput`

> 📄 `app.vx` L227-233

```vex
struct AsyncRouteTaskInput
```

The sole cross-scheduler ownership boundary for an executing async route.

Keeping the transfer in one value makes its move/drop state atomic from the
language ABI's perspective; the worker no longer exposes five independent
ownership edges to a coroutine frame.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `socket` | `Socket` | 🔒 private |  |
| `lease` | `Box&lt;AdmissionState&gt;` | 🔒 private |  |
| `ctx` | `Ctx` | 🔒 private |  |
| `next` | `AsyncPipelineNext` | 🔒 private |  |
| `lifetime` | `Context` | 🔒 private |  |

---

### <a id="AsyncBodyRouteLaunch"></a>`AsyncBodyRouteLaunch`

> 📄 `app.vx` L238-243

```vex
struct AsyncBodyRouteLaunch
```

Header-selected request-body lane. `initialBytes` is owned before the

worker returns to its reusable receive buffer; it contains the exact suffix
after the header boundary, not a guessed Content-Length slice.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `ctx` | `Ctx` | 🔒 private |  |
| `handlers` | `Vec&lt;AsyncBodyHandler&gt;` | 🔒 private |  |
| `mode` | `BodyMode` | 🔒 private |  |
| `initialBytes` | `string` | 🔒 private |  |

---

### <a id="AsyncBodyRouteTaskInput"></a>`AsyncBodyRouteTaskInput`

> 📄 `app.vx` L245-256

```vex
struct AsyncBodyRouteTaskInput
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `socket` | `Socket` | 🔒 private |  |
| `lease` | `Box&lt;AdmissionState&gt;` | 🔒 private |  |
| `ctx` | `Ctx` | 🔒 private |  |
| `next` | `AsyncBodyPipelineNext` | 🔒 private |  |
| `lifetime` | `Context` | 🔒 private |  |
| `mode` | `BodyMode` | 🔒 private |  |
| `initialBytes` | `string` | 🔒 private |  |
| `maxBodyBytes` | `usize` | 🔒 private |  |
| `returns` | `Channel&lt;AsyncConnectionReturn&gt;` | 🔒 private |  |
| `returnWakeFd` | `i32` | 🔒 private |  |

---

### <a id="AsyncConnectionReturn"></a>`AsyncConnectionReturn`

> 📄 `app.vx` L262-267

```vex
struct AsyncConnectionReturn
```

Completed task-owned descriptor plus the exact parser suffix which must

re-enter one Fiber worker as a unit. `armed` owns the process admission
count until successful worker adoption; every rejected/abandoned queue item
therefore closes and releases exactly once through ordinary Drop.

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `socket` | `Socket` | 🔒 private |  |
| `admission` | `Box&lt;AdmissionState&gt;` | 🔒 private |  |
| `pending` | `string` | 🔒 private |  |
| `armed` | `bool` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `drop`[↗](#AsyncConnectionReturn.drop) | `fn (self: &amp;AsyncConnectionReturn!) drop()` |  |

---

### <a id="AsyncReturnLane"></a>`AsyncReturnLane`

> 📄 `app.vx` L294-298

```vex
struct AsyncReturnLane
```

Parent-owned completion lane. Workers and route tasks clone only the MPMC

queue and borrow integer pipe handles; this value remains the sole authority
which closes both wake descriptors after all workers have stopped.

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `queue` | `Channel&lt;AsyncConnectionReturn&gt;` | 🔒 private |  |
| `readFd` | `i32` | 🔒 private |  |
| `writeFd` | `i32` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `AsyncReturnLane.new`[↗](#AsyncReturnLane.new) | `fn AsyncReturnLane.new(enabled: bool): Option&lt;Asyn` |  |
| `drop`[↗](#AsyncReturnLane.drop) | `fn (self: &amp;AsyncReturnLane!) drop()` |  |

---

### <a id="H2AsyncTaskCompletion"></a>`H2AsyncTaskCompletion`

> 📄 `app.vx` L307-311

```vex
struct H2AsyncTaskCompletion
```

Task output contains no descriptor. The boxed token is both a lookup hint

and the exact connection-generation capability checked by the transport.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `token` | `Box&lt;H2AsyncConnectionToken&gt;` | 🔒 private |  |
| `streamId` | `u32` | 🔒 private |  |
| `result` | `H2AsyncTaskResult` | 🔒 private |  |

---

### <a id="H2AsyncRouteTaskInput"></a>`H2AsyncRouteTaskInput`

> 📄 `app.vx` L313-323

```vex
struct H2AsyncRouteTaskInput
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `token` | `Box&lt;H2AsyncConnectionToken&gt;` | 🔒 private |  |
| `streamId` | `u32` | 🔒 private |  |
| `request` | `H2DynamicRequest` | 🔒 private |  |
| `next` | `AsyncPipelineNext` | 🔒 private |  |
| `lifetime` | `Context` | 🔒 private |  |
| `completions` | `Channel&lt;H2AsyncTaskCompletion&gt;` | 🔒 private |  |
| `wakeFd` | `i32` | 🔒 private |  |

---

### <a id="H2ResponseStreamTaskInput"></a>`H2ResponseStreamTaskInput`

> 📄 `app.vx` L325-332

```vex
struct H2ResponseStreamTaskInput
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `request` | `H2DynamicRequest` | 🔒 private |  |
| `streamWriter` | `ResponseStreamWriter` | 🔒 private |  |
| `lifetime` | `Context` | 🔒 private |  |

---

### <a id="H2AsyncCompletionLane"></a>`H2AsyncCompletionLane`

> 📄 `app.vx` L336-341

```vex
struct H2AsyncCompletionLane
```

Per-worker lane: unlike HTTP/1 descriptor handback, an H2 completion must

return to the exact worker which retains its multiplexed connection.

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `queue` | `Channel&lt;H2AsyncTaskCompletion&gt;` | 🔒 private |  |
| `responseStreams` | `Channel&lt;ResponseStreamEvent&gt;` | 🔒 private |  |
| `readFd` | `i32` | 🔒 private |  |
| `writeFd` | `i32` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `H2AsyncCompletionLane.new`[↗](#H2AsyncCompletionLane.new) | `fn H2AsyncCompletionLane.new(asyncEnabled: bool, r` |  |
| `drop`[↗](#H2AsyncCompletionLane.drop) | `fn (self: &amp;H2AsyncCompletionLane!) drop()` |  |

---

### <a id="FullWorkerContext"></a>`FullWorkerContext`

> 📄 `app.vx` L346-353

```vex
struct FullWorkerContext
```

Full-profile-only worker services. The shared H1 parser receives this as

an opaque pointer and casts it only inside selected capability branches.
Consequently the H1-sync monomorph has no H2/WS/async type in its ABI.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `lifetime` | `Context` | 🔒 private |  |
| `returns` | `Channel&lt;AsyncConnectionReturn&gt;` | 🔒 private |  |
| `returnWriteFd` | `i32` | 🔒 private |  |
| `deferred` | `Ptr&lt;DeferredConnectionQueue!&gt;` | 🔒 private |  |
| `h2Async` | `&amp;H2AsyncCompletionLane` | 🔒 private |  |
| `wsSessionIds` | `Ptr&lt;WsSessionIdState!&gt;` | 🔒 private |  |

---

### <a id="DeferredConnectionQueue"></a>`DeferredConnectionQueue`

> 📄 `app.vx` L468-471

```vex
struct DeferredConnectionQueue
```

FIFO (with amortized compaction) of worker-local protocol turns. It is not

shared across workers and contains only descriptors still owned by the
corresponding connection-state map.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fds` | `Vec&lt;i32&gt;` | 🔒 private |  |
| `head` | `usize` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `DeferredConnectionQueue.new`[↗](#DeferredConnectionQueue.new) | `fn DeferredConnectionQueue.new(): DeferredConnecti` |  |
| `isEmpty`[↗](#DeferredConnectionQueue.isEmpty) | `fn (self: &amp;DeferredConnectionQueue) isEmpty(): boo` |  |
| `push`[↗](#DeferredConnectionQueue.push) | `fn (self: &amp;DeferredConnectionQueue!) push(fd: i32)` |  |
| `pop`[↗](#DeferredConnectionQueue.pop) | `fn (self: &amp;DeferredConnectionQueue!) pop(): Option` |  |

---

### <a id="AppConfig"></a>`AppConfig` `🔓 export`

> 📄 `app.vx` L610-624

```vex
export struct AppConfig
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `bodyLimit` | `usize` | 🔓 public |  |
| `maxHeaderBytes` | `usize` | 🔓 public |  |
| `maxHeaders` | `usize` | 🔓 public |  |
| `responseBatchBytes` | `usize` | 🔓 public | Soft cap for coalesced complete HTTP/1 responses on one connection. |
| `readTimeout` | `i32` | 🔓 public |  |
| `writeTimeout` | `i32` | 🔓 public |  |
| `idleTimeout` | `i32` | 🔓 public |  |
| `maxConnections` | `i32` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `AppConfig.defaults`[↗](#AppConfig.defaults) | `export fn AppConfig.defaults(): AppConfig` |  |

---

### <a id="App"></a>`App` `🔓 export`

> 📄 `app.vx` L639-652

```vex
export struct App<FEATURES>
```

**Implements:** `BufferedApplicationDispatcher`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `config` | `AppConfig` | 🔓 public |  |
| `router` | `Router&lt;{FEATURES}&gt;` | 🔓 public |  |
| `middlewares` | `Vec&lt;Handler&gt;` | 🔓 public |  |
| `frozenMiddlewares` | `Vec&lt;Handler&gt;` | 🔓 public |  |
| `notFoundHandler` | `Option&lt;Handler&gt;` | 🔓 public |  |
| `errorHandler` | `Option&lt;Handler&gt;` | 🔓 public |  |
| `directHandler` | `Option&lt;RequestHandler&gt;` | 🔓 public |  |
| `frozen` | `bool` | 🔓 public |  |

**Type Parameters:**

- `const FEATURES: u32=HTTP_FULL` = `HTTP_FULL`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `App.new`[↗](#App.new) | `export fn App.new(): App&lt;{HTTP_FULL}&gt;` | Create a new application with default config. |
| `App.new`[↗](#App.new) | `export fn App.new(config: AppConfig): App&lt;{HTTP_FU` | Create an application with one coherent resource/deadline policy. |
| `App.new`[↗](#App.new) | `export fn App.new(): App&lt;{FEATURES}&gt;` | Create an exactly specialized application. Unknown bits and profiles |
| `App.new`[↗](#App.new) | `export fn App.new(config: AppConfig): App&lt;{FEATURE` |  |

---

### <a id="Group"></a>`Group` `🔓 export`

> 📄 `group.vx` L31-37

```vex
export struct Group<FEATURES>
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `prefix` | `string` | 🔓 public |  |
| `router` | `&amp;Router&lt;{FEATURES}&gt;!` | 🔓 public |  |
| `middlewares` | `Vec&lt;Handler&gt;` | 🔓 public |  |
| `bodyMiddlewares` | `Vec&lt;AsyncBodyHandler&gt;` | 🔓 public |  |

**Type Parameters:**

- `const FEATURES: u32=HTTP_FULL` = `HTTP_FULL`

---

### <a id="AsyncRouteDef"></a>`AsyncRouteDef`

> 📄 `router.vx` L57-59

```vex
struct AsyncRouteDef
```

Immutable async route metadata keyed by the frozen route index. Function

values are copied into a task-owned pipeline only after route selection;
no worker-local context or mutable router state crosses an await.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `handlers` | `Vec&lt;AsyncHandler&gt;` | 🔒 private |  |

---

### <a id="AsyncBodyRouteDef"></a>`AsyncBodyRouteDef`

> 📄 `router.vx` L64-66

```vex
struct AsyncBodyRouteDef
```

Streaming request-body metadata is intentionally distinct from the

complete-body async lane. Frozen route identity decides ownership before
Fiber reads the body, without adding a mode branch to ordinary handlers.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `handlers` | `Vec&lt;AsyncBodyHandler&gt;` | 🔒 private |  |

---

### <a id="WsRouteOptions"></a>`WsRouteOptions` `🔓 export`

> 📄 `router.vx` L71-74

```vex
export struct WsRouteOptions
```

Immutable WebSocket handshake policy compiled into route metadata. Protocol

insertion order is server preference order; no per-request protocol vector
is constructed on the hot path.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `supportedProtocols` | `Vec&lt;string&gt;` | 🔒 private |  |
| `required` | `bool` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `WsRouteOptions.new`[↗](#WsRouteOptions.new) | `export fn WsRouteOptions.new(): WsRouteOptions` |  |
| `protocol`[↗](#WsRouteOptions.protocol) | `export fn (self: &amp;WsRouteOptions!) protocol(value:` | Add one case-sensitive RFC 6455 subprotocol in server preference order. |
| `requireSubprotocol`[↗](#WsRouteOptions.requireSubprotocol) | `export fn (self: &amp;WsRouteOptions!) requireSubproto` | Reject an opening handshake when it offers none of this route's supported |

---

### <a id="WsProtocolSelection"></a>`WsProtocolSelection` `🔓 export`

> 📄 `router.vx` L112-116

```vex
export struct WsProtocolSelection
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `accepted` | `bool` | 🔓 public |  |
| `protocol` | `string` | 🔓 public |  |

---

### <a id="FullRouteState"></a>`FullRouteState`

> 📄 `router.vx` L122-135

```vex
struct FullRouteState
```

Protocol-only route metadata is owned behind one typed capability slot.

The exact HTTP/1 profile stores a null slot and its monomorphized drop path
never instantiates this type. Full profiles retain the existing compact
parallel arrays without charging ordinary HTTP routes for their ownership.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `routeStreamHandlers` | `Vec&lt;Option&lt;StreamHandler&gt;&gt;` | 🔒 private |  |
| `routeWsHandlers` | `Vec&lt;Option&lt;WsHandler&gt;&gt;` | 🔒 private |  |
| `routeWsOpenHandlers` | `Vec&lt;Option&lt;WsOpenHandler&gt;&gt;` | 🔒 private |  |
| `routeWsCloseHandlers` | `Vec&lt;Option&lt;WsCloseHandler&gt;&gt;` | 🔒 private |  |
| `routeWsProtocolStart` | `Vec&lt;usize&gt;` | 🔒 private |  |
| `routeWsProtocolLen` | `Vec&lt;usize&gt;` | 🔒 private |  |
| `routeWsProtocolRequired` | `Vec&lt;bool&gt;` | 🔒 private |  |
| `routeWsProtocolPool` | `Vec&lt;string&gt;` | 🔒 private |  |
| `asyncRouteIndex` | `Vec&lt;i32&gt;` | 🔒 private |  |
| `asyncRouteDefs` | `Vec&lt;AsyncRouteDef&gt;` | 🔒 private |  |
| `asyncBodyRouteIndex` | `Vec&lt;i32&gt;` | 🔒 private |  |
| `asyncBodyRouteDefs` | `Vec&lt;AsyncBodyRouteDef&gt;` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `FullRouteState.new`[↗](#FullRouteState.new) | `fn FullRouteState.new(): FullRouteState` |  |

---

### <a id="RouteCapabilityState"></a>`RouteCapabilityState`

> 📄 `router.vx` L157-159

```vex
struct RouteCapabilityState<FEATURES>
```

Conditional owner used because Vex structs deliberately have one stable

layout per const-generic instantiation. Keeping only a typed pointer in the
common layout prevents advanced route drop glue from entering HTTP_V1.

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `pointer` | `Ptr&lt;FullRouteState!&gt;` | 🔒 private |  |

**Type Parameters:**

- `const FEATURES: u32`

---

### <a id="Router"></a>`Router` `🔓 export`

> 📄 `router.vx` L189-210

```vex
export struct Router<FEATURES>
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `routeMethodIds` | `Vec&lt;i32&gt;` | 🔓 public |  |
| `routePatterns` | `Vec&lt;string&gt;` | 🔓 public |  |
| `routeStaticRoots` | `Vec&lt;string&gt;` | 🔓 public |  |
| `routeParamNameStart` | `Vec&lt;usize&gt;` | 🔓 public |  |
| `routeParamNameLen` | `Vec&lt;usize&gt;` | 🔓 public |  |
| `routeParamNamePool` | `Vec&lt;string&gt;` | 🔓 public |  |
| `routeHandlers` | `Vec&lt;Handler&gt;` | 🔓 public |  |
| `routeIsStatic` | `Vec&lt;bool&gt;` | 🔓 public |  |
| `routeMwStart` | `Vec&lt;usize&gt;` | 🔓 public |  |
| `routeMwLen` | `Vec&lt;usize&gt;` | 🔓 public |  |
| `routeMwPool` | `Vec&lt;Handler&gt;` | 🔓 public |  |
| `protocolRoutes` | `RouteCapabilityState&lt;{FEATURES}&gt;` | 🔓 public |  |
| `trees` | `Vec&lt;RadixTree&gt;` | 🔓 public |  |
| `frozen` | `bool` | 🔓 public |  |
| `cacheMid` | `i32` | 🔓 public |  |
| `cachePath` | `string` | 🔓 public |  |
| `cacheIdx` | `i32` | 🔓 public |  |

**Type Parameters:**

- `const FEATURES: u32=HTTP_FULL` = `HTTP_FULL`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Router.new`[↗](#Router.new) | `export fn Router.new(): Router&lt;{HTTP_FULL}&gt;` | Create an empty router. |
| `Router.new`[↗](#Router.new) | `export fn Router.new(): Router&lt;{FEATURES}&gt;` |  |

---

### <a id="ResponseStreamToken"></a>`ResponseStreamToken` `🔓 export`

> 📄 `ctx.vx` L49-52

```vex
export struct ResponseStreamToken
```

Stable transport-generation authority carried by a streaming producer.

The concrete H2/H3 owner validates pointer identity; numeric descriptors are
deliberately absent so application tasks cannot retain or reuse them.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fd` | `i32` | 🔒 private |  |
| `marker` | `u8` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `ResponseStreamToken.new`[↗](#ResponseStreamToken.new) | `export fn ResponseStreamToken.new(fd: i32): Respon` |  |
| `lookupFd`[↗](#ResponseStreamToken.lookupFd) | `export fn (self: &amp;ResponseStreamToken) lookupFd():` |  |

---

### <a id="ResponseStreamWriter"></a>`ResponseStreamWriter` `🔓 export`

> 📄 `ctx.vx` L106-121

```vex
export struct ResponseStreamWriter
```

Connection-bound dynamic response writer used only by Fiber stream routes.

It never exposes an fd to application code, retains a fixed-size buffer and
shares one absolute deadline across headers, every chunk and the terminator.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `buffer` | `StringBuilder` | 🔒 private |  |
| `fd` | `i64` | 🔒 private |  |
| `deadlineNs` | `u64` | 🔒 private |  |
| `response` | `Ptr&lt;Response!&gt;` | 🔒 private |  |
| `configured` | `bool` | 🔒 private |  |
| `headersSent` | `bool` | 🔒 private |  |
| `contentAllowed` | `bool` | 🔒 private |  |
| `finished` | `bool` | 🔒 private |  |
| `failed` | `bool` | 🔒 private |  |
| `streamToken` | `Option&lt;Box&lt;ResponseStreamToken&gt;&gt;` | 🔒 private |  |
| `streamId` | `u32` | 🔒 private |  |
| `streamEvents` | `Option&lt;Channel&lt;ResponseStreamEvent&gt;&gt;` | 🔒 private |  |
| `streamAck` | `Option&lt;Channel&lt;bool&gt;&gt;` | 🔒 private |  |
| `streamWakeFd` | `i32` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `ResponseStreamWriter.new`[↗](#ResponseStreamWriter.new) | `export fn ResponseStreamWriter.new(): ResponseStre` |  |
| `reset`[↗](#ResponseStreamWriter.reset) | `fn (self: &amp;ResponseStreamWriter!) reset()` |  |
| `configureTransport`[↗](#ResponseStreamWriter.configureTransport) | `fn (self: &amp;ResponseStreamWriter!) configureTranspo` | Bind a task-owned producer to a protocol worker without transferring its |
| `publishStreamEvent`[↗](#ResponseStreamWriter.publishStreamEvent) | `fn (self: &amp;ResponseStreamWriter!) publishStreamEve` |  |
| `configure`[↗](#ResponseStreamWriter.configure) | `fn (self: &amp;ResponseStreamWriter!) configure(fd: i6` | Internal connection binding. App creates the deadline before middleware |
| `flush`[↗](#ResponseStreamWriter.flush) | `fn (self: &amp;ResponseStreamWriter!) flush(): bool` |  |
| `begin`[↗](#ResponseStreamWriter.begin) | `fn (self: &amp;ResponseStreamWriter!) begin(): bool` | Emit response headers and select canonical chunked framing exactly once. |
| `write`[↗](#ResponseStreamWriter.write) | `export fn (self: &amp;ResponseStreamWriter!) write(dat` | Write a bounded sequence of HTTP/1 chunks. Large producer strings are |
| `finish`[↗](#ResponseStreamWriter.finish) | `fn (self: &amp;ResponseStreamWriter!) finish(): bool` | Complete a stream exactly once. A producer that returns without calling |

---

### <a id="Ctx"></a>`Ctx` `🔓 export`

> 📄 `ctx.vx` L328-372

```vex
export struct Ctx
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `req` | `Request` | 🔓 public |  |
| `res` | `Response` | 🔓 public |  |
| `ownedRequestParts` | `Vec&lt;string&gt;` | 🔓 public |  |
| `routeId` | `i32` | 🔓 public |  |
| `routePath` | `str` | 🔓 public |  |
| `staticRoot` | `str` | 🔓 public |  |
| `routeParams` | `Vec&lt;RouteParam&gt;` | 🔓 public |  |
| `queryParams` | `Vec&lt;QueryParam&gt;` | 🔓 public |  |
| `locals` | `Vec&lt;LocalEntry&gt;` | 🔓 public |  |
| `handlers` | `Vec&lt;Handler&gt;` | 🔓 public |  |
| `routeMiddlewares` | `Vec&lt;Handler&gt;` | 🔓 public |  |
| `handlerIdx` | `usize` | 🔓 public |  |
| `cookieParsed` | `bool` | 🔓 public |  |
| `parsedCookies` | `Vec&lt;CookiePair&gt;` | 🔓 public |  |
| `streamFileLength` | `u64` | 🔓 public |  |
| `streamFilePending` | `bool` | 🔓 public |  |
| `streamFile` | `Option&lt;File&gt;` | 🔓 public |  |
| `streamHandler` | `Option&lt;StreamHandler&gt;` | 🔓 public |  |
| `streamWriter` | `Ptr&lt;ResponseStreamWriter!&gt;` | 🔓 public |  |
| `wsUpgrade` | `Ptr&lt;WsUpgradeScratch!&gt;` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Ctx.new`[↗](#Ctx.new) | `export fn Ctx.new(req: Request): Ctx` | Create a new Ctx from a parsed request. |
| `Ctx.empty`[↗](#Ctx.empty) | `export fn Ctx.empty(): Ctx` | Create an empty Ctx for pre-allocation (zero alloc reuse pattern). |
| `Ctx.emptyHttp1Sync`[↗](#Ctx.emptyHttp1Sync) | `export fn Ctx.emptyHttp1Sync(): Ctx` | Zero-capacity dynamic transport storage for the capability-sealed H1 |
| `reset`[↗](#Ctx.reset) | `export fn (self: &amp;Ctx!) reset()` | Reset Ctx for reuse — clears all Vecs keeping capacity (zero alloc after warmup). |
| `resetHttp1Sync`[↗](#Ctx.resetHttp1Sync) | `export fn (self: &amp;Ctx!) resetHttp1Sync()` | Reset only state reachable from the H1-sync capability surface. Dynamic |
| `method`[↗](#Ctx.method) | `export fn (self: &amp;Ctx) method(): str` | HTTP method (GET, POST, PUT, DELETE, etc.) |
| `path`[↗](#Ctx.path) | `export fn (self: &amp;Ctx) path(): str` | Request path (without query string). |
| `params`[↗](#Ctx.params) | `export fn (self: &amp;Ctx) params(key: str): string` | Get route parameter by name (from :param patterns). |
| `param`[↗](#Ctx.param) | `export fn (self: &amp;Ctx) param(key: str): str` | Borrowed route parameter view. The result is valid for this request. |
| `query`[↗](#Ctx.query) | `export fn (self: &amp;Ctx) query(key: str): string` | Get query parameter by name. |
| `queryView`[↗](#Ctx.queryView) | `export fn (self: &amp;Ctx) queryView(key: str): str` | Borrowed raw query parameter view. Percent/form decoding is intentionally |
| `indexQuery`[↗](#Ctx.indexQuery) | `export fn (self: &amp;Ctx!) indexQuery()` | Re-index the raw query after assigning Request.query. |
| `header`[↗](#Ctx.header) | `export fn (self: &amp;Ctx) header(name: str): str` | Get request header by name (case-insensitive). |
| `body`[↗](#Ctx.body) | `export fn (self: &amp;Ctx) body(): str` | Raw request body. |
| `contentType`[↗](#Ctx.contentType) | `export fn (self: &amp;Ctx) contentType(): str` | Request Content-Type. |
| `isJSON`[↗](#Ctx.isJSON) | `export fn (self: &amp;Ctx) isJSON(): bool` | Check if request is JSON. |
| `contentLength`[↗](#Ctx.contentLength) | `export fn (self: &amp;Ctx) contentLength(): i64` | Content-Length value (-1 if not present). |
| `protocol`[↗](#Ctx.protocol) | `export fn (self: &amp;Ctx) protocol(): str` | HTTP version string (e.g. "HTTP/1.1", "HTTP/2"). |
| `scheme`[↗](#Ctx.scheme) | `export fn (self: &amp;Ctx) scheme(): str` | URI scheme supplied by the transport protocol. |
| `authority`[↗](#Ctx.authority) | `export fn (self: &amp;Ctx) authority(): str` | Canonical request authority. HTTP/2 uses `:authority`; HTTP/1 falls back |
| `originalURL`[↗](#Ctx.originalURL) | `export fn (self: &amp;Ctx) originalURL(): string` | Full original URL (path + query string). Returns owned string. |
| `baseURL`[↗](#Ctx.baseURL) | `export fn (self: &amp;Ctx) baseURL(): string` | Base URL (scheme + host). Derives from Host header. |
| `hostname`[↗](#Ctx.hostname) | `export fn (self: &amp;Ctx) hostname(): str` | Hostname from Host header (without port). |
| `ip`[↗](#Ctx.ip) | `export fn (self: &amp;Ctx) ip(): str` | Client IP address from X-Forwarded-For or X-Real-IP headers. |
| `userAgent`[↗](#Ctx.userAgent) | `export fn (self: &amp;Ctx) userAgent(): str` | User-Agent header. |
| `get`[↗](#Ctx.get) | `export fn (self: &amp;Ctx) get(name: str): str` | Get request header by name (alias for header(), Fiber v3 compat). |
| `xhr`[↗](#Ctx.xhr) | `export fn (self: &amp;Ctx) xhr(): bool` | Check if request is XMLHttpRequest (AJAX). |
| `accepts`[↗](#Ctx.accepts) | `export fn (self: &amp;Ctx) accepts(contentType: str): ` | Check if the request accepts a given content type. |
| `cookies`[↗](#Ctx.cookies) | `export fn (self: &amp;Ctx!) cookies(name: string): str` | Get a cookie value by name from the request. |
| `setCookie`[↗](#Ctx.setCookie) | `export fn (self: &amp;Ctx!) setCookie(cookie: Cookie)` | Set a cookie on the response (adds Set-Cookie header). |
| `setSimpleCookie`[↗](#Ctx.setSimpleCookie) | `export fn (self: &amp;Ctx!) setSimpleCookie(name: stri` | Set a simple cookie by name, value, and max-age in seconds (HttpOnly). |
| `clearCookie`[↗](#Ctx.clearCookie) | `export fn (self: &amp;Ctx!) clearCookie(name: string)` | Delete a cookie by name (Max-Age=0). |
| `status`[↗](#Ctx.status) | `export fn (self: &amp;Ctx!) status(code: i32): &amp;Ctx!` | Set response status code (chainable). |
| `setType`[↗](#Ctx.setType) | `export fn (self: &amp;Ctx!) setType(ct: string): &amp;Ctx!` | Set response Content-Type (chainable). |
| `set`[↗](#Ctx.set) | `export fn (self: &amp;Ctx!) set(name: string, value: s` | Set a response header (chainable). |
| `sendString`[↗](#Ctx.sendString) | `export fn (self: &amp;Ctx!) sendString(text: string)` | Send a plain text response. |
| `sendJSON`[↗](#Ctx.sendJSON) | `export fn (self: &amp;Ctx!) sendJSON(json: string)` | Send a JSON string response. |
| `sendHTML`[↗](#Ctx.sendHTML) | `export fn (self: &amp;Ctx!) sendHTML(html: string)` | Send an HTML response. |
| `send`[↗](#Ctx.send) | `export fn (self: &amp;Ctx!) send()` | Send the response with current body/status. |
| `sendStatus`[↗](#Ctx.sendStatus) | `export fn (self: &amp;Ctx!) sendStatus(code: i32)` | Send an empty response (status + headers only). |
| `redirect`[↗](#Ctx.redirect) | `export fn (self: &amp;Ctx!) redirect(url: string)` | Redirect to a URL (302 by default). |
| `redirectWithStatus`[↗](#Ctx.redirectWithStatus) | `export fn (self: &amp;Ctx!) redirectWithStatus(url: st` | Redirect with a specific status code (301, 302, 307, 308). |
| `location`[↗](#Ctx.location) | `export fn (self: &amp;Ctx!) location(path: string): &amp;C` | Set Location header only (no redirect status). |
| `download`[↗](#Ctx.download) | `export fn (self: &amp;Ctx!) download(body: string, fil` | Set Content-Disposition for file download. |
| `setContentType`[↗](#Ctx.setContentType) | `export fn (self: &amp;Ctx!) setContentType(ext: string` | Set Content-Type based on file extension. |
| `sendFile`[↗](#Ctx.sendFile) | `export fn (self: &amp;Ctx!) sendFile(filePath: string)` | Serve a file from the filesystem. |
| `sendStaticFile`[↗](#Ctx.sendStaticFile) | `export fn (self: &amp;Ctx!) sendStaticFile(root: str, ` | Serve one file that must remain below a configured static root. |
| `queueFileStream`[↗](#Ctx.queueFileStream) | `fn (self: &amp;Ctx!) queueFileStream(filePath: string,` | Prepare one known-length file for the ordered Fiber response drain. |
| `hasPendingFileStream`[↗](#Ctx.hasPendingFileStream) | `fn (self: &amp;Ctx) hasPendingFileStream(): bool` | Whether this dispatch has an ordered file body waiting behind its headers. |
| `pendingFileStreamLength`[↗](#Ctx.pendingFileStreamLength) | `fn (self: &amp;Ctx) pendingFileStreamLength(): u64` |  |
| `discardPendingFileStream`[↗](#Ctx.discardPendingFileStream) | `fn (self: &amp;Ctx!) discardPendingFileStream()` | Drop a queued stream before socket draining. Used when response semantics |
| `flushPendingFileStream`[↗](#Ctx.flushPendingFileStream) | `fn (self: &amp;Ctx!) flushPendingFileStream(fd: i64, s` | Drain the open descriptor through caller-owned scratch storage. A short |
| `next`[↗](#Ctx.next) | `export fn (self: &amp;Ctx!) next()` | Continue to the next handler in the middleware chain. |
| `runHandlerChain`[↗](#Ctx.runHandlerChain) | `export fn (self: &amp;Ctx!) runHandlerChain()` | Start the prepared middleware/handler chain at its first entry. |
| `hasStreamHandler`[↗](#Ctx.hasStreamHandler) | `fn (self: &amp;Ctx) hasStreamHandler(): bool` | Whether Router selected a dynamic producer endpoint for this request. |
| `bindWsUpgradeScratch`[↗](#Ctx.bindWsUpgradeScratch) | `fn (self: &amp;Ctx!) bindWsUpgradeScratch(scratch: &amp;Ws` |  |
| `wsUpgradeRequested`[↗](#Ctx.wsUpgradeRequested) | `fn (self: &amp;Ctx) wsUpgradeRequested(): bool` |  |
| `cancelWsUpgrade`[↗](#Ctx.cancelWsUpgrade) | `fn (self: &amp;Ctx!) cancelWsUpgrade()` |  |
| `stageWsUpgrade`[↗](#Ctx.stageWsUpgrade) | `fn (self: &amp;Ctx!) stageWsUpgrade(key: str, protocol` |  |
| `wsHandshakeReady`[↗](#Ctx.wsHandshakeReady) | `fn (self: &amp;Ctx) wsHandshakeReady(): bool` |  |
| `wsUpgradeKey`[↗](#Ctx.wsUpgradeKey) | `fn (self: &amp;Ctx) wsUpgradeKey(): str` |  |
| `wsUpgradeProtocol`[↗](#Ctx.wsUpgradeProtocol) | `fn (self: &amp;Ctx) wsUpgradeProtocol(): str` |  |
| `configureStreamWriter`[↗](#Ctx.configureStreamWriter) | `fn (self: &amp;Ctx!) configureStreamWriter(fd: i64, de` | Bind the writer to the worker-owned connection after App has drained every |
| `bindStreamWriter`[↗](#Ctx.bindStreamWriter) | `fn (self: &amp;Ctx!) bindStreamWriter(writer: &amp;Respons` | Bind transport-owned streaming state to this context. The caller pins the |
| `configureTransportStreamWriter`[↗](#Ctx.configureTransportStreamWriter) | `fn (self: &amp;Ctx!) configureTransportStreamWriter(to` | Bind a dynamic producer to a protocol completion lane. The concrete |
| `completeStreamWriter`[↗](#Ctx.completeStreamWriter) | `fn (self: &amp;Ctx!) completeStreamWriter()` | Finalize a stream whether the terminal handler ran or middleware returned |
| `setLocal`[↗](#Ctx.setLocal) | `export fn (self: &amp;Ctx!) setLocal(key: string, valu` | Set a local value (for passing data between middlewares). |
| `getLocal`[↗](#Ctx.getLocal) | `export fn (self: &amp;Ctx) getLocal(key: string): stri` | Get a local value set by a previous middleware. |
| `bodyJSON`[↗](#Ctx.bodyJSON) | `export fn (self: &amp;Ctx) bodyJSON(key: string): stri` | Get a value from a JSON body by key (simple top-level string extraction). |
| `formValue`[↗](#Ctx.formValue) | `export fn (self: &amp;Ctx) formValue(key: str): string` | Get a form value from application/x-www-form-urlencoded body. |

---

### <a id="WsUpgradeScratch"></a>`WsUpgradeScratch` `🔓 export`

> 📄 `ctx.vx` L377-383

```vex
export struct WsUpgradeScratch
```

Full-profile WebSocket handoff scratch. A worker pins one beside its

reusable Ctx, preserving validated key/protocol bytes across arena rewind
without charging ordinary HTTP/1 contexts 288 bytes per request owner.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `keyBytes` | `[u8; 24]` | 🔒 private |  |
| `protocolBytes` | `[u8; 255]` | 🔒 private |  |
| `protocolLength` | `usize` | 🔒 private |  |
| `handshakeReady` | `bool` | 🔒 private |  |
| `requested` | `bool` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `WsUpgradeScratch.new`[↗](#WsUpgradeScratch.new) | `export fn WsUpgradeScratch.new(): WsUpgradeScratch` |  |
| `reset`[↗](#WsUpgradeScratch.reset) | `fn (self: &amp;WsUpgradeScratch!) reset()` |  |

---

### <a id="RouteParam"></a>`RouteParam` `🔓 export`

> 📄 `ctx.vx` L402-408

```vex
export struct RouteParam
```

Key-value pair for route parameters.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `keyPtr` | `Ptr&lt;u8&gt;` | 🔓 public |  |
| `keyLength` | `usize` | 🔓 public |  |
| `valueStart` | `usize` | 🔓 public |  |
| `valueLength` | `usize` | 🔓 public |  |

---

### <a id="QueryParam"></a>`QueryParam` `🔓 export`

> 📄 `ctx.vx` L411-417

```vex
export struct QueryParam
```

Query parameter represented entirely by offsets into Request.query.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `keyStart` | `usize` | 🔓 public |  |
| `keyLength` | `usize` | 🔓 public |  |
| `valueStart` | `usize` | 🔓 public |  |
| `valueLength` | `usize` | 🔓 public |  |

---

### <a id="LocalEntry"></a>`LocalEntry` `🔓 export`

> 📄 `ctx.vx` L420-424

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

> 📄 `radix.vx` L11-26

```vex
export struct RadixTree
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `parents` | `Vec&lt;i32&gt;` | 🔓 public |  |
| `firstChild` | `Vec&lt;i32&gt;` | 🔓 public |  |
| `nextSibling` | `Vec&lt;i32&gt;` | 🔓 public |  |
| `prefixes` | `Vec&lt;string&gt;` | 🔓 public |  |
| `kinds` | `Vec&lt;i32&gt;` | 🔓 public |  |
| `paramNames` | `Vec&lt;string&gt;` | 🔓 public |  |
| `handlerIdx` | `Vec&lt;i32&gt;` | 🔓 public |  |
| `handlerPool` | `Vec&lt;Handler&gt;` | 🔓 public |  |
| `hasHandlers` | `Vec&lt;bool&gt;` | 🔓 public |  |
| `mwStart` | `Vec&lt;usize&gt;` | 🔓 public |  |
| `mwLen` | `Vec&lt;usize&gt;` | 🔓 public |  |
| `mwPool` | `Vec&lt;Handler&gt;` | 🔓 public |  |
| `routeIdx` | `Vec&lt;i32&gt;` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `RadixTree.empty`[↗](#RadixTree.empty) | `export fn RadixTree.empty(): RadixTree` | Construct storage without allocating a root node. Router freeze uses this |
| `RadixTree.new`[↗](#RadixTree.new) | `export fn RadixTree.new(): RadixTree` |  |
| `insert`[↗](#RadixTree.insert) | `export fn (self: &amp;RadixTree!) insert(pattern: stri` |  |
| `insertWithMiddleware`[↗](#RadixTree.insertWithMiddleware) | `export fn (self: &amp;RadixTree!) insertWithMiddleware` |  |
| `insertRoute`[↗](#RadixTree.insertRoute) | `export fn (self: &amp;RadixTree!) insertRoute(pattern:` | Insert a route while retaining the Router table index used to restore |
| `insertRouteWithMiddleware`[↗](#RadixTree.insertRouteWithMiddleware) | `export fn (self: &amp;RadixTree!) insertRouteWithMiddl` |  |
| `findInto`[↗](#RadixTree.findInto) | `export fn (self: &amp;RadixTree) findInto(path: str, c` | Match directly into reusable request context buffers. No MatchResult, |
| `find`[↗](#RadixTree.find) | `export fn (self: &amp;RadixTree) find(path: str): Matc` |  |

---

### <a id="MatchResult"></a>`MatchResult` `🔓 export`

> 📄 `radix.vx` L28-34

```vex
export struct MatchResult
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `found` | `bool` | 🔓 public |  |
| `handler` | `Option&lt;Handler&gt;` | 🔓 public |  |
| `params` | `Vec&lt;ParamPair&gt;` | 🔓 public |  |
| `middlewares` | `Vec&lt;Handler&gt;` | 🔓 public |  |

---

### <a id="ParamPair"></a>`ParamPair` `🔓 export`

> 📄 `radix.vx` L36-40

```vex
export struct ParamPair
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `key` | `string` | 🔓 public |  |
| `value` | `string` | 🔓 public |  |

---

### <a id="RadixMatch"></a>`RadixMatch` `🔓 export`

> 📄 `radix.vx` L43-48

```vex
export struct RadixMatch
```

Allocation-free result used by Router's request hot path.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `found` | `bool` | 🔓 public |  |
| `handler` | `Option&lt;Handler&gt;` | 🔓 public |  |
| `routeIndex` | `i32` | 🔓 public |  |

---

### <a id="AsyncPipelineNext"></a>`AsyncPipelineNext` `🔓 export`

> 📄 `async_pipeline.vx` L30-33

```vex
export struct AsyncPipelineNext
```

Monotonic continuation state for one task-owned request.

The continuation owns its handler vector. That makes its lifetime and
storage independent of its caller and prevents a suspended request from
observing a reallocated external Vec.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `steps` | `Vec&lt;AsyncHandler&gt;` | 🔒 private |  |
| `index` | `usize` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| ⚡`run`[↗](#AsyncPipelineNext.run) | `export fn (self: &amp;AsyncPipelineNext!) run(ctx: &amp;Ct` | Resume the next handler in order. The cursor is advanced before the await, |

---

### <a id="H2TransportConfig"></a>`H2TransportConfig` `🔓 export`

> 📄 `h2_transport.vx` L48-55

```vex
export struct H2TransportConfig
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `protocol` | `H2ProtocolConfig` | 🔓 public |  |
| `maxBodyBytes` | `usize` | 🔓 public |  |
| `inputQueueBytes` | `usize` | 🔓 public |  |
| `outputQueueBytes` | `usize` | 🔓 public |  |
| `framesPerTurn` | `usize` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `H2TransportConfig.defaults`[↗](#H2TransportConfig.defaults) | `export fn H2TransportConfig.defaults(): H2Transpor` |  |
| `isValid`[↗](#H2TransportConfig.isValid) | `export fn (self: &amp;H2TransportConfig) isValid(): bo` |  |

---

### <a id="H2AsyncConnectionToken"></a>`H2AsyncConnectionToken` `🔓 export`

> 📄 `h2_transport.vx` L97-100

```vex
export struct H2AsyncConnectionToken
```

Stable connection-generation identity shared with an async task. Native fd

values may be reused immediately after close; pointer identity prevents a
late completion from entering a different H2 connection with the same fd.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fd` | `i32` | 🔒 private |  |
| `marker` | `u8` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `fd`[↗](#H2AsyncConnectionToken.fd) | `export fn (self: &amp;H2AsyncConnectionToken) fd(): i3` | Descriptor lookup hint carried by a completion. The integer is never |

---

### <a id="H2AsyncRequestLaunch"></a>`H2AsyncRequestLaunch` `🔓 export`

> 📄 `h2_transport.vx` L109-113

```vex
export struct H2AsyncRequestLaunch
```

One task-safe request removed from the buffered application registry. The

multiplexed descriptor remains exclusively worker-owned.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `token` | `Box&lt;H2AsyncConnectionToken&gt;` | 🔓 public |  |
| `request` | `H2DynamicRequest` | 🔓 public |  |

---

### <a id="H2ResponseStreamLaunch"></a>`H2ResponseStreamLaunch` `🔓 export`

> 📄 `h2_transport.vx` L117-121

```vex
export struct H2ResponseStreamLaunch
```

Task-safe streaming response request. As with ordinary async requests, the

descriptor never crosses this boundary; the token is generation authority.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `token` | `Box&lt;ResponseStreamToken&gt;` | 🔓 public |  |
| `request` | `H2DynamicRequest` | 🔓 public |  |

---

### <a id="H2AsyncTaskOwner"></a>`H2AsyncTaskOwner`

> 📄 `h2_transport.vx` L123-126

```vex
struct H2AsyncTaskOwner
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `streamId` | `u32` | 🔒 private |  |
| `cancel` | `CancelHandle` | 🔒 private |  |

---

### <a id="H2ResponseStreamTaskOwner"></a>`H2ResponseStreamTaskOwner`

> 📄 `h2_transport.vx` L128-137

```vex
struct H2ResponseStreamTaskOwner
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `streamId` | `u32` | 🔒 private |  |
| `cancel` | `CancelHandle` | 🔒 private |  |
| `ack` | `Channel&lt;bool&gt;` | 🔒 private |  |
| `headCommitted` | `bool` | 🔒 private |  |
| `headAcknowledged` | `bool` | 🔒 private |  |
| `headTerminal` | `bool` | 🔒 private |  |
| `chunkPending` | `bool` | 🔒 private |  |
| `finishing` | `bool` | 🔒 private |  |

---

### <a id="H2ResponseStreamState"></a>`H2ResponseStreamState`

> 📄 `h2_transport.vx` L144-150

```vex
struct H2ResponseStreamState
```

Cold response-producer state. Most H2 connections never execute a stream

route, so the hot transport owner carries only one nullable box instead of
a second token plus three empty heap-backed containers and FIFO cursors.
Allocation occurs only after exact frozen-route dispatch selects a
streaming response.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `token` | `Box&lt;ResponseStreamToken&gt;` | 🔒 private |  |
| `pending` | `Vec&lt;Option&lt;H2ResponseStreamLaunch&gt;&gt;` | 🔒 private |  |
| `pendingHead` | `usize` | 🔒 private |  |
| `pendingCount` | `usize` | 🔒 private |  |
| `tasks` | `Vec&lt;H2ResponseStreamTaskOwner&gt;` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `H2ResponseStreamState.new`[↗](#H2ResponseStreamState.new) | `fn H2ResponseStreamState.new(fd: i32): H2ResponseS` |  |
| `taskIndex`[↗](#H2ResponseStreamState.taskIndex) | `fn (self: &amp;H2ResponseStreamState) taskIndex(stream` |  |

---

### <a id="H2TransportSession"></a>`H2TransportSession` `🔓 export`

> 📄 `h2_transport.vx` L186-203

```vex
export struct H2TransportSession
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `io` | `Conn` | 🔒 private |  |
| `protocol` | `H2ProtocolState` | 🔒 private |  |
| `application` | `H2ApplicationSession` | 🔒 private |  |
| `egress` | `H2ResponseEgress` | 🔒 private |  |
| `scratch` | `Vec&lt;u8&gt;` | 🔒 private |  |
| `prefaceBytes` | `usize` | 🔒 private |  |
| `peerSettingsReceived` | `bool` | 🔒 private |  |
| `asyncToken` | `Box&lt;H2AsyncConnectionToken&gt;` | 🔒 private |  |
| `pendingAsync` | `Vec&lt;Option&lt;H2AsyncRequestLaunch&gt;&gt;` | 🔒 private |  |
| `pendingAsyncHead` | `usize` | 🔒 private |  |
| `pendingAsyncCount` | `usize` | 🔒 private |  |
| `asyncTasks` | `Vec&lt;H2AsyncTaskOwner&gt;` | 🔒 private |  |
| `responseStreams` | `Option&lt;Box&lt;H2ResponseStreamState&gt;&gt;` | 🔒 private |  |
| `framesPerTurn` | `usize` | 🔒 private |  |
| `closing` | `bool` | 🔒 private |  |
| `peerDraining` | `bool` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `H2TransportSession.new`[↗](#H2TransportSession.new) | `export fn H2TransportSession.new(fd: i64, config: ` |  |
| `pendingInput`[↗](#H2TransportSession.pendingInput) | `export fn (self: &amp;H2TransportSession) pendingInput` |  |
| `pendingOutput`[↗](#H2TransportSession.pendingOutput) | `export fn (self: &amp;H2TransportSession) pendingOutpu` |  |
| `wantsWrite`[↗](#H2TransportSession.wantsWrite) | `export fn (self: &amp;H2TransportSession) wantsWrite()` |  |
| `isDraining`[↗](#H2TransportSession.isDraining) | `export fn (self: &amp;H2TransportSession) isDraining()` |  |
| `isClosing`[↗](#H2TransportSession.isClosing) | `export fn (self: &amp;H2TransportSession) isClosing():` | Terminal protocol failure stops further reads but may retain a complete |
| `shouldCloseAfterFlush`[↗](#H2TransportSession.shouldCloseAfterFlush) | `export fn (self: &amp;H2TransportSession) shouldCloseA` |  |
| `activeStreamCount`[↗](#H2TransportSession.activeStreamCount) | `export fn (self: &amp;H2TransportSession) activeStream` |  |
| `pendingAsyncRequestCount`[↗](#H2TransportSession.pendingAsyncRequestCount) | `export fn (self: &amp;H2TransportSession) pendingAsync` |  |
| `activeAsyncTaskCount`[↗](#H2TransportSession.activeAsyncTaskCount) | `export fn (self: &amp;H2TransportSession) activeAsyncT` |  |
| `pendingResponseStreamCount`[↗](#H2TransportSession.pendingResponseStreamCount) | `export fn (self: &amp;H2TransportSession) pendingRespo` |  |
| `activeResponseStreamTaskCount`[↗](#H2TransportSession.activeResponseStreamTaskCount) | `export fn (self: &amp;H2TransportSession) activeRespon` |  |
| `ownsAsyncToken`[↗](#H2TransportSession.ownsAsyncToken) | `fn (self: &amp;H2TransportSession) ownsAsyncToken(toke` |  |
| `ownsResponseStreamToken`[↗](#H2TransportSession.ownsResponseStreamToken) | `fn (self: &amp;H2TransportSession) ownsResponseStreamT` |  |
| `asyncTaskIndex`[↗](#H2TransportSession.asyncTaskIndex) | `fn (self: &amp;H2TransportSession) asyncTaskIndex(stre` |  |
| `responseStreamTaskIndex`[↗](#H2TransportSession.responseStreamTaskIndex) | `fn (self: &amp;H2TransportSession) responseStreamTaskI` |  |
| `queueResponseStream`[↗](#H2TransportSession.queueResponseStream) | `fn (self: &amp;H2TransportSession!) queueResponseStrea` |  |
| `takeResponseStream`[↗](#H2TransportSession.takeResponseStream) | `export fn (self: &amp;H2TransportSession!) takeRespons` |  |
| `queueAsyncRequest`[↗](#H2TransportSession.queueAsyncRequest) | `fn (self: &amp;H2TransportSession!) queueAsyncRequest(` |  |
| `takeAsyncRequest`[↗](#H2TransportSession.takeAsyncRequest) | `export fn (self: &amp;H2TransportSession!) takeAsyncRe` | Transfer one request to the owning worker. Consumed slots are compacted in |
| `registerAsyncTask`[↗](#H2TransportSession.registerAsyncTask) | `export fn (self: &amp;H2TransportSession!) registerAsy` | Register the stream's cooperative cancellation capability before spawning |
| `registerResponseStreamTask`[↗](#H2TransportSession.registerResponseStreamTask) | `export fn (self: &amp;H2TransportSession!) registerRes` | Register cancellation and the producer acknowledgement channel before a |
| `acknowledgeResponseStream`[↗](#H2TransportSession.acknowledgeResponseStream) | `fn (self: &amp;H2TransportSession!) acknowledgeRespons` |  |
| `beginResponseStream`[↗](#H2TransportSession.beginResponseStream) | `export fn (self: &amp;H2TransportSession!) beginRespon` | Commit streaming response metadata through the connection-owned HPACK |
| `pushResponseStreamChunk`[↗](#H2TransportSession.pushResponseStreamChunk) | `export fn (self: &amp;H2TransportSession!) pushRespons` | Move one producer chunk into egress. Acknowledgement is deliberately |
| `finishResponseStream`[↗](#H2TransportSession.finishResponseStream) | `export fn (self: &amp;H2TransportSession!) finishRespo` | Complete a producer. Open response streams commit one empty terminal DATA |
| `failResponseStream`[↗](#H2TransportSession.failResponseStream) | `export fn (self: &amp;H2TransportSession!) failRespons` |  |
| `acceptResponseStreamEvent`[↗](#H2TransportSession.acceptResponseStreamEvent) | `export fn (self: &amp;H2TransportSession!) acceptRespo` | Single typed worker boundary for producer events. Conversion, generation |
| `cancelPendingAsync`[↗](#H2TransportSession.cancelPendingAsync) | `fn (self: &amp;H2TransportSession!) cancelPendingAsync` |  |
| `cancelAsyncTask`[↗](#H2TransportSession.cancelAsyncTask) | `fn (self: &amp;H2TransportSession!) cancelAsyncTask(st` |  |
| `cancelAsyncOwnership`[↗](#H2TransportSession.cancelAsyncOwnership) | `fn (self: &amp;H2TransportSession!) cancelAsyncOwnersh` |  |
| `cancelResponseStreamOwnership`[↗](#H2TransportSession.cancelResponseStreamOwnership) | `fn (self: &amp;H2TransportSession!) cancelResponseStre` |  |
| `cancelAllAsync`[↗](#H2TransportSession.cancelAllAsync) | `fn (self: &amp;H2TransportSession!) cancelAllAsync(): ` |  |
| `cancelAllResponseStreams`[↗](#H2TransportSession.cancelAllResponseStreams) | `fn (self: &amp;H2TransportSession!) cancelAllResponseS` |  |
| `completeAsync`[↗](#H2TransportSession.completeAsync) | `export fn (self: &amp;H2TransportSession!) completeAsy` | Publish a completed task response only if this exact connection generation |
| `failAsync`[↗](#H2TransportSession.failAsync) | `export fn (self: &amp;H2TransportSession!) failAsync(t` | Fail one registered task without failing the multiplexed connection. This |
| `copyPendingOutput`[↗](#H2TransportSession.copyPendingOutput) | `export fn (self: &amp;H2TransportSession) copyPendingO` |  |
| `stageInitialInput`[↗](#H2TransportSession.stageInitialInput) | `export fn (self: &amp;H2TransportSession!) stageInitia` |  |
| `readFromTransport`[↗](#H2TransportSession.readFromTransport) | `export fn (self: &amp;H2TransportSession!) readFromTra` |  |
| `flushTransport`[↗](#H2TransportSession.flushTransport) | `export fn (self: &amp;H2TransportSession!) flushTransp` |  |
| `ensureScratch`[↗](#H2TransportSession.ensureScratch) | `fn (self: &amp;H2TransportSession!) ensureScratch(requ` |  |
| `scratchView`[↗](#H2TransportSession.scratchView) | `fn (self: &amp;H2TransportSession!) scratchView(length` |  |
| `stageScratch`[↗](#H2TransportSession.stageScratch) | `fn (self: &amp;H2TransportSession!) stageScratch(lengt` |  |
| `queueInitialSettings`[↗](#H2TransportSession.queueInitialSettings) | `fn (self: &amp;H2TransportSession!) queueInitialSettin` |  |
| `queueSettingsAck`[↗](#H2TransportSession.queueSettingsAck) | `fn (self: &amp;H2TransportSession!) queueSettingsAck()` |  |
| `queuePingAck`[↗](#H2TransportSession.queuePingAck) | `fn (self: &amp;H2TransportSession!) queuePingAck(paylo` |  |
| `queueReset`[↗](#H2TransportSession.queueReset) | `fn (self: &amp;H2TransportSession!) queueReset(streamI` |  |
| `flushConnectionCredit`[↗](#H2TransportSession.flushConnectionCredit) | `fn (self: &amp;H2TransportSession!) flushConnectionCre` |  |
| `flushStreamCredit`[↗](#H2TransportSession.flushStreamCredit) | `fn (self: &amp;H2TransportSession!) flushStreamCredit(` |  |
| `abortConnection`[↗](#H2TransportSession.abortConnection) | `fn (self: &amp;H2TransportSession!) abortConnection(er` |  |
| `cancelEgress`[↗](#H2TransportSession.cancelEgress) | `fn (self: &amp;H2TransportSession!) cancelEgress(strea` |  |
| `handleApplicationResult`[↗](#H2TransportSession.handleApplicationResult) | `fn (self: &amp;H2TransportSession!) handleApplicationR` |  |
| `handleInbound`[↗](#H2TransportSession.handleInbound) | `fn (self: &amp;H2TransportSession!) handleInbound(inbo` | Keep connection control in the transport layer. Apart from avoiding a |
| `acknowledgeEmittedResponseStreamChunk`[↗](#H2TransportSession.acknowledgeEmittedResponseStreamChunk) | `fn (self: &amp;H2TransportSession!) acknowledgeEmitted` |  |
| `acknowledgeEmittedResponseStreamHead`[↗](#H2TransportSession.acknowledgeEmittedResponseStreamHead) | `fn (self: &amp;H2TransportSession!) acknowledgeEmitted` |  |
| `acceptPreface`[↗](#H2TransportSession.acceptPreface) | `fn (self: &amp;H2TransportSession!) acceptPreface(): H` |  |
| `drainEgress`[↗](#H2TransportSession.drainEgress) | `fn (self: &amp;H2TransportSession!) drainEgress(): boo` |  |
| `advance`[↗](#H2TransportSession.advance) | `export fn (self: &amp;H2TransportSession!) advance(app` | Advance a bounded number of complete frames already present in the input |
| `beginGracefulDrain`[↗](#H2TransportSession.beginGracefulDrain) | `export fn (self: &amp;H2TransportSession!) beginGracef` | Emit a final current-stream GOAWAY and stop admitting higher peer streams. |
| `beginIdleClose`[↗](#H2TransportSession.beginIdleClose) | `export fn (self: &amp;H2TransportSession!) beginIdleCl` | Retire an idle connection without truncating GOAWAY. Active streams must |
| `abortTimedOut`[↗](#H2TransportSession.abortTimedOut) | `export fn (self: &amp;H2TransportSession!) abortTimedO` | Fail a stalled live connection with an exact terminal GOAWAY while keeping |
| `abortInternal`[↗](#H2TransportSession.abortInternal) | `export fn (self: &amp;H2TransportSession!) abortIntern` | Retain a complete terminal GOAWAY when a worker-side invariant fails. |
| `abort`[↗](#H2TransportSession.abort) | `export fn (self: &amp;H2TransportSession!) abort(): us` |  |

---

### <a id="H2ApplicationRequest"></a>`H2ApplicationRequest` `🔓 export`

> 📄 `h2_application.vx` L29-38

```vex
export struct H2ApplicationRequest
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `ctx` | `Ctx` | 🔓 public |  |
| `fields` | `Box&lt;H2FieldOwner&gt;` | 🔓 public |  |
| `endStream` | `bool` | 🔓 public |  |
| `body` | `H2ApplicationBody` | 🔓 public |  |

---

### <a id="H2FieldOwner"></a>`H2FieldOwner`

> 📄 `h2_application.vx` L40-42

```vex
struct H2FieldOwner
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fields` | `Vec&lt;HpackHeader&gt;` | 🔒 private |  |

---

### <a id="H2ApplicationResponse"></a>`H2ApplicationResponse` `🔓 export`

> 📄 `h2_application.vx` L52-57

```vex
export struct H2ApplicationResponse
```

Sole owner transferred from a completed shared `Ctx` dispatch to HTTP/2

response encoding. `body` is moved, never cloned. Header names are
normalized once because HTTP/2 requires lowercase field names.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fields` | `Vec&lt;HpackHeader&gt;` | 🔓 public |  |
| `body` | `string` | 🔓 public |  |
| `endStream` | `bool` | 🔓 public |  |

---

### <a id="H2BufferedApplicationStream"></a>`H2BufferedApplicationStream` `🔓 export`

> 📄 `h2_application.vx` L68-72

```vex
export struct H2BufferedApplicationStream
```

Buffered synchronous stream owner used by the live transport boundary.

It retains fragmented DATA in one bounded builder, exposes that builder as
a borrowed request-body view only during shared App dispatch, then moves
the completed response into the HTTP/2 egress owner.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `request` | `H2ApplicationRequest` | 🔒 private |  |
| `sink` | `H2BufferedBodySink` | 🔒 private |  |
| `dispatched` | `bool` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `H2BufferedApplicationStream.new`[↗](#H2BufferedApplicationStream.new) | `export fn H2BufferedApplicationStream.new(request:` |  |
| `begin`[↗](#H2BufferedApplicationStream.begin) | `export fn (self: &amp;H2BufferedApplicationStream!) be` |  |
| `feedData`[↗](#H2BufferedApplicationStream.feedData) | `export fn (self: &amp;H2BufferedApplicationStream!) fe` |  |
| `streamId`[↗](#H2BufferedApplicationStream.streamId) | `export fn (self: &amp;H2BufferedApplicationStream) str` |  |
| `cancel`[↗](#H2BufferedApplicationStream.cancel) | `export fn (self: &amp;H2BufferedApplicationStream!) ca` | Bind RST_STREAM, GOAWAY retirement or connection teardown to the exact |
| `dispatch`[↗](#H2BufferedApplicationStream.dispatch) | `export fn (self: &amp;H2BufferedApplicationStream!) di` | Run one complete buffered stream through the protocol-neutral application |
| `intoDynamic`[↗](#H2BufferedApplicationStream.intoDynamic) | `fn (self: H2BufferedApplicationStream) intoDynamic` | Move a dynamic request into task-safe context ownership. The buffered body |

---

### <a id="H2DynamicRequest"></a>`H2DynamicRequest` `🔓 export`

> 📄 `h2_application.vx` L84-90

```vex
export struct H2DynamicRequest
```

Fully materialized dynamic request transferred out of the buffered stream

registry. The request body is rehomed into `Ctx.ownedRequestParts` before
the stream's builder is dropped, so an async task never retains a borrowed
view into connection-local application storage.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `streamId` | `u32` | 🔓 public |  |
| `requirement` | `ApplicationTransportRequirement` | 🔓 public |  |
| `ctx` | `Ctx` | 🔓 public |  |
| `fields` | `Box&lt;H2FieldOwner&gt;` | 🔓 public |  |

---

### <a id="H2BufferedStreamSet"></a>`H2BufferedStreamSet` `🔓 export`

> 📄 `h2_application.vx` L109-112

```vex
export struct H2BufferedStreamSet
```

Bounded connection-local registry for synchronous buffered streams. The

protocol's concurrent-stream limit is mirrored here so a valid peer cannot
create more application owners than the connection agreed to serve.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `streams` | `Vec&lt;H2BufferedApplicationStream&gt;` | 🔒 private |  |
| `maximumStreams` | `usize` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `H2BufferedStreamSet.new`[↗](#H2BufferedStreamSet.new) | `export fn H2BufferedStreamSet.new(maximumStreams: ` |  |
| `len`[↗](#H2BufferedStreamSet.len) | `export fn (self: &amp;H2BufferedStreamSet) len(): usiz` |  |
| `find`[↗](#H2BufferedStreamSet.find) | `fn (self: &amp;H2BufferedStreamSet) find(streamId: u32` |  |
| `open`[↗](#H2BufferedStreamSet.open) | `export fn (self: &amp;H2BufferedStreamSet!) open(reque` | Admit a decoded initial request and immediately begin its body lifecycle. |
| `feedData`[↗](#H2BufferedStreamSet.feedData) | `export fn (self: &amp;H2BufferedStreamSet!) feedData(s` |  |
| `finish`[↗](#H2BufferedStreamSet.finish) | `export fn (self: &amp;H2BufferedStreamSet!) finish(str` | Complete a body with a terminal trailer field section. HTTP/2 trailers |
| `dispatch`[↗](#H2BufferedStreamSet.dispatch) | `export fn (self: &amp;H2BufferedStreamSet!) dispatch(s` |  |
| `cancel`[↗](#H2BufferedStreamSet.cancel) | `export fn (self: &amp;H2BufferedStreamSet!) cancel(str` |  |
| `cancelAll`[↗](#H2BufferedStreamSet.cancelAll) | `export fn (self: &amp;H2BufferedStreamSet!) cancelAll(` | Cancel every remaining application stream during GOAWAY/connection abort. |

---

### <a id="H2BufferedBodySink"></a>`H2BufferedBodySink`

> 📄 `h2_application.vx` L122-126

```vex
struct H2BufferedBodySink
```

**Implements:** `RequestBodyConsumer`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `output` | `StringBuilder` | 🔒 private |  |
| `finished` | `bool` | 🔒 private |  |
| `cancelled` | `bool` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `begin`[↗](#H2BufferedBodySink.begin) | `fn (self: &amp;H2BufferedBodySink!) begin(_info: BodyC` |  |
| `acceptChunk`[↗](#H2BufferedBodySink.acceptChunk) | `fn (self: &amp;H2BufferedBodySink!) acceptChunk(bytes:` |  |
| `finish`[↗](#H2BufferedBodySink.finish) | `fn (self: &amp;H2BufferedBodySink!) finish(totalBytes:` |  |
| `cancel`[↗](#H2BufferedBodySink.cancel) | `fn (self: &amp;H2BufferedBodySink!) cancel()` |  |

---

### <a id="H2ApplicationBody"></a>`H2ApplicationBody` `🔓 export`

> 📄 `h2_application.vx` L539-544

```vex
export struct H2ApplicationBody
```

Per-stream application body boundary. The HTTP/2 protocol owner has

already removed padding, applied flow control and validated stream state;
this owner applies the shared application consumer lifecycle and body cap.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `streamId` | `u32` | 🔓 public |  |
| `initialEndStream` | `bool` | 🔓 public |  |
| `delivery` | `DecodedBodyLifecycle` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `H2ApplicationBody.new`[↗](#H2ApplicationBody.new) | `fn H2ApplicationBody.new(streamId: u32, endStream:` |  |
| `begin`[↗](#H2ApplicationBody.begin) | `export fn (self: &amp;H2ApplicationBody!) begin(consum` | Admit the route consumer after HEADERS. A header-only request completes in |
| `feedData`[↗](#H2ApplicationBody.feedData) | `export fn (self: &amp;H2ApplicationBody!) feedData(str` | Deliver one validated DATA payload. `data` is the application-byte view, |
| `cancel`[↗](#H2ApplicationBody.cancel) | `export fn (self: &amp;H2ApplicationBody!) cancel(consu` |  |

---

### <a id="H2PendingStreamCredit"></a>`H2PendingStreamCredit`

> 📄 `h2_session.vx` L29-32

```vex
struct H2PendingStreamCredit
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `streamId` | `u32` | 🔒 private |  |
| `bytes` | `u32` | 🔒 private |  |

---

### <a id="H2ApplicationSession"></a>`H2ApplicationSession` `🔓 export`

> 📄 `h2_session.vx` L37-43

```vex
export struct H2ApplicationSession
```

Bounded server-side application owner. Protocol state remains caller-owned

so transport can sequence control frames and response egress without a
second state machine.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `streams` | `H2BufferedStreamSet` | 🔒 private |  |
| `credits` | `Vec&lt;H2PendingStreamCredit&gt;` | 🔒 private |  |
| `connectionCredit` | `u32` | 🔒 private |  |
| `fd` | `i64` | 🔒 private |  |
| `maxBodyBytes` | `usize` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `H2ApplicationSession.new`[↗](#H2ApplicationSession.new) | `export fn H2ApplicationSession.new(fd: i64, maximu` |  |
| `activeStreamCount`[↗](#H2ApplicationSession.activeStreamCount) | `export fn (self: &amp;H2ApplicationSession) activeStre` |  |
| `pendingConnectionCredit`[↗](#H2ApplicationSession.pendingConnectionCredit) | `export fn (self: &amp;H2ApplicationSession) pendingCon` |  |
| `creditIndex`[↗](#H2ApplicationSession.creditIndex) | `fn (self: &amp;H2ApplicationSession) creditIndex(strea` |  |
| `pendingStreamCredit`[↗](#H2ApplicationSession.pendingStreamCredit) | `export fn (self: &amp;H2ApplicationSession) pendingStr` |  |
| `retireDynamic`[↗](#H2ApplicationSession.retireDynamic) | `export fn (self: &amp;H2ApplicationSession!) retireDyn` | Retire stream-scoped flow credit after a dynamic request owner has been |
| `recordAcceptedCredit`[↗](#H2ApplicationSession.recordAcceptedCredit) | `fn (self: &amp;H2ApplicationSession!) recordAcceptedCr` | Record DATA credit only after the application consumer accepted the exact |
| `recordDiscardedCredit`[↗](#H2ApplicationSession.recordDiscardedCredit) | `fn (self: &amp;H2ApplicationSession!) recordDiscardedC` |  |
| `discardStreamCredit`[↗](#H2ApplicationSession.discardStreamCredit) | `fn (self: &amp;H2ApplicationSession!) discardStreamCre` |  |
| `dispatchReady`[↗](#H2ApplicationSession.dispatchReady) | `fn (self: &amp;H2ApplicationSession!) dispatchReady(st` |  |
| `accept`[↗](#H2ApplicationSession.accept) | `export fn (self: &amp;H2ApplicationSession!) accept(in` | Move one protocol result through the bounded application lifecycle. This |
| `flushConnectionCredit`[↗](#H2ApplicationSession.flushConnectionCredit) | `export fn (self: &amp;H2ApplicationSession!) flushConn` | Atomically restore accepted connection credit. The ledger is cleared only |
| `flushStreamCredit`[↗](#H2ApplicationSession.flushStreamCredit) | `export fn (self: &amp;H2ApplicationSession!) flushStre` | Atomically restore one live stream's accepted credit. Call this before |
| `abort`[↗](#H2ApplicationSession.abort) | `export fn (self: &amp;H2ApplicationSession!) abort(): ` | Connection teardown owns every remaining consumer and credit obligation. |

---

### <a id="H2QueuedResponse"></a>`H2QueuedResponse`

> 📄 `h2_egress.vx` L19-23

```vex
struct H2QueuedResponse
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `streamId` | `u32` | 🔒 private |  |
| `response` | `H2ApplicationResponse` | 🔒 private |  |
| `streaming` | `bool` | 🔒 private |  |

---

### <a id="H2ActiveHeaders"></a>`H2ActiveHeaders`

> 📄 `h2_egress.vx` L25-30

```vex
struct H2ActiveHeaders
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `streamId` | `u32` | 🔒 private |  |
| `response` | `H2ApplicationResponse` | 🔒 private |  |
| `cursor` | `H2HeaderFrameCursor` | 🔒 private |  |
| `streaming` | `bool` | 🔒 private |  |

---

### <a id="H2QueuedBody"></a>`H2QueuedBody`

> 📄 `h2_egress.vx` L32-38

```vex
struct H2QueuedBody
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `streamId` | `u32` | 🔒 private |  |
| `body` | `string` | 🔒 private |  |
| `offset` | `usize` | 🔒 private |  |
| `streaming` | `bool` | 🔒 private |  |
| `endStream` | `bool` | 🔒 private |  |

---

### <a id="H2ResponseEgress"></a>`H2ResponseEgress` `🔓 export`

> 📄 `h2_egress.vx` L40-49

```vex
export struct H2ResponseEgress
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `pending` | `Vec&lt;Option&lt;H2QueuedResponse&gt;&gt;` | 🔒 private |  |
| `pendingHead` | `usize` | 🔒 private |  |
| `pendingCount` | `usize` | 🔒 private |  |
| `active` | `Option&lt;H2ActiveHeaders&gt;` | 🔒 private |  |
| `bodies` | `Vec&lt;H2QueuedBody&gt;` | 🔒 private |  |
| `headerBytes` | `Vec&lt;u8&gt;` | 🔒 private |  |
| `maximumResponses` | `usize` | 🔒 private |  |
| `maximumHeaderBytes` | `usize` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `H2ResponseEgress.new`[↗](#H2ResponseEgress.new) | `export fn H2ResponseEgress.new(maximumResponses: u` |  |
| `len`[↗](#H2ResponseEgress.len) | `export fn (self: &amp;H2ResponseEgress) len(): usize` |  |
| `contains`[↗](#H2ResponseEgress.contains) | `fn (self: &amp;H2ResponseEgress) contains(streamId: u3` |  |
| `compactPending`[↗](#H2ResponseEgress.compactPending) | `fn (self: &amp;H2ResponseEgress!) compactPending()` |  |
| `cancel`[↗](#H2ResponseEgress.cancel) | `export fn (self: &amp;H2ResponseEgress!) cancel(stream` | Revoke one response owner without violating the HPACK connection state. |
| `abort`[↗](#H2ResponseEgress.abort) | `export fn (self: &amp;H2ResponseEgress!) abort(): usiz` | Terminal connection teardown makes it safe to discard a committed HPACK |
| `enqueue`[↗](#H2ResponseEgress.enqueue) | `export fn (self: &amp;H2ResponseEgress!) enqueue(strea` |  |
| `enqueueStreamingHead`[↗](#H2ResponseEgress.enqueueStreamingHead) | `export fn (self: &amp;H2ResponseEgress!) enqueueStream` | Admit one incremental response field owner. The body is supplied later by |
| `enqueueStreamingChunk`[↗](#H2ResponseEgress.enqueueStreamingChunk) | `export fn (self: &amp;H2ResponseEgress!) enqueueStream` | Install at most one producer chunk for a streaming response. A producer |
| `streamingChunkPending`[↗](#H2ResponseEgress.streamingChunkPending) | `export fn (self: &amp;H2ResponseEgress) streamingChunk` | True while DATA ownership is outstanding. A task may publish its next |
| `prepareHeaders`[↗](#H2ResponseEgress.prepareHeaders) | `fn (self: &amp;H2ResponseEgress!) prepareHeaders(proto` |  |
| `writeNextHeader`[↗](#H2ResponseEgress.writeNextHeader) | `export fn (self: &amp;H2ResponseEgress!) writeNextHead` | Copy one complete HEADERS/CONTINUATION frame into caller-owned output. |
| `bodyIndex`[↗](#H2ResponseEgress.bodyIndex) | `fn (self: &amp;H2ResponseEgress) bodyIndex(streamId: u` |  |
| `writeNextData`[↗](#H2ResponseEgress.writeNextData) | `export fn (self: &amp;H2ResponseEgress!) writeNextData` | Schedule and copy one complete DATA frame. `out` is the transport queue's |

---

### <a id="AsyncBodyPipelineNext"></a>`AsyncBodyPipelineNext` `🔓 export`

> 📄 `async_body.vx` L32-35

```vex
export struct AsyncBodyPipelineNext
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `steps` | `Vec&lt;AsyncBodyHandler&gt;` | 🔒 private |  |
| `index` | `usize` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| ⚡`run`[↗](#AsyncBodyPipelineNext.run) | `export fn (self: &amp;AsyncBodyPipelineNext!) run(ctx:` | Monotonic body-route continuation. Advancing before awaiting prevents a |

---

### <a id="RingBodyConsumer"></a>`RingBodyConsumer`

> 📄 `async_body.vx` L56-59

```vex
struct RingBodyConsumer<C>
```

Adapter which owns decoded bytes before forwarding them to the route's

synchronous consumer. The ring is drained before `acceptChunk` returns, so
parser progress acknowledges only bytes the application actually accepted.

**Implements:** `RequestBodyConsumer`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `pages` | `&amp;BodyPageRing!` | 🔒 private |  |
| `downstream` | `&amp;C!` | 🔒 private |  |

**Type Parameters:**

- `C`: `RequestBodyConsumer`

---

### <a id="AsyncRequestBody"></a>`AsyncRequestBody` `🔓 export`

> 📄 `async_body.vx` L94-102

```vex
export struct AsyncRequestBody
```

Sole owner of one streamed HTTP/1 request after Fiber unregisters the

descriptor. `consume` may be called once; completion, rejection, EOF and
Context cancellation all terminate the same RequestBodyLifecycle.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `stream` | `TcpStream` | 🔒 private |  |
| `lifecycle` | `RequestBodyLifecycle` | 🔒 private |  |
| `pages` | `BodyPageRing` | 🔒 private |  |
| `transport` | `Vec&lt;u8&gt;` | 🔒 private |  |
| `buffered` | `usize` | 🔒 private |  |
| `maxBodyBytes` | `usize` | 🔒 private |  |
| `consumeStarted` | `bool` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `AsyncRequestBody.new`[↗](#AsyncRequestBody.new) | `export fn AsyncRequestBody.new(stream: TcpStream, ` | Construct the task-owned body after Socket -&gt; TcpStream adoption. Initial |
| `discardPrefix`[↗](#AsyncRequestBody.discardPrefix) | `fn (self: &amp;AsyncRequestBody!) discardPrefix(count:` |  |
| ⚡`consume`[↗](#AsyncRequestBody.consume) | `export fn (self: &amp;AsyncRequestBody!) consume(consu` | Decode the complete bounded body into one route-owned consumer. Socket |
| ⚡`writeResponse`[↗](#AsyncRequestBody.writeResponse) | `export fn (self: &amp;AsyncRequestBody!) writeResponse` | Fiber transport finalization. Kept on the body owner so the descriptor can |
| `close`[↗](#AsyncRequestBody.close) | `export fn (self: &amp;AsyncRequestBody!) close(): Resu` |  |
| `isReusable`[↗](#AsyncRequestBody.isReusable) | `export fn (self: &amp;AsyncRequestBody) isReusable(): ` | A streamed connection is reusable only after the canonical lifecycle has |

---

### <a id="AsyncBodyTransport"></a>`AsyncBodyTransport` `🔓 export`

> 📄 `async_body.vx` L107-111

```vex
export struct AsyncBodyTransport
```

Sole owning value crossing from a completed body task back to Fiber's

native poller. `pending` is the exact unconsumed transport suffix and may
begin with a complete or fragmented pipelined HTTP/1 request.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `socket` | `Socket` | 🔓 public |  |
| `pending` | `string` | 🔓 public |  |

---

### <a id="HttpClientConfig"></a>`HttpClientConfig` `🔓 export`

> 📄 `client.vx` L59-66

```vex
export struct HttpClientConfig
```

Resource limits for one HTTP/1.1 request/response exchange.

Zero limits are never treated as "unbounded": use `defaults()` and modify
an explicit field instead. The parser itself has a structural 64-header
ceiling, therefore `maxResponseHeaders` may not exceed 64.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `maxRequestBytes` | `usize` | 🔓 public |  |
| `maxResponseHeaderBytes` | `usize` | 🔓 public |  |
| `maxResponseBodyBytes` | `usize` | 🔓 public |  |
| `maxResponseHeaders` | `usize` | 🔓 public |  |
| `maxInformationalResponses` | `usize` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `HttpClientConfig.defaults`[↗](#HttpClientConfig.defaults) | `export fn HttpClientConfig.defaults(): HttpClientC` |  |

---

### <a id="HttpClient"></a>`HttpClient` `🔓 export`

> 📄 `client.vx` L81-83

```vex
export struct HttpClient
```

Stateless HTTP/1.1 transport configuration. The type intentionally owns

no socket pool yet: closing every exchange makes response framing exact and
is safer than pretending that partially supported keep-alive is reusable.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `configValue` | `HttpClientConfig` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `HttpClient.new`[↗](#HttpClient.new) | `export fn HttpClient.new(): HttpClient` |  |
| `HttpClient.new`[↗](#HttpClient.new) | `export fn HttpClient.new(config: HttpClientConfig)` |  |
| `config`[↗](#HttpClient.config) | `export fn (self: &amp;HttpClient) config(): HttpClient` |  |
| ⚡`connect`[↗](#HttpClient.connect) | `export fn (self: &amp;HttpClient) connect(endpoint: So` | Establish one exclusive reusable HTTP/1.1 session with this client's |
| ⚡`send`[↗](#HttpClient.send) | `export fn (self: &amp;HttpClient) send(request: &amp;Clien` | Sends one bounded HTTP/1.1 request to an already-resolved endpoint. |
| ⚡`sendFollowing`[↗](#HttpClient.sendFollowing) | `export fn (self: &amp;HttpClient) sendFollowing(reques` | Follow a finite chain of same-origin redirects for an owning buffered |
| ⚡`sendFollowingResolved`[↗](#HttpClient.sendFollowingResolved) | `export fn (self: &amp;HttpClient) sendFollowingResolve` | Follow same- and cross-origin redirects through an explicit async endpoint |
| ⚡`sendInto`[↗](#HttpClient.sendInto) | `export fn (self: &amp;HttpClient) sendInto(request: &amp;C` | Sends one bounded HTTP/1.1 request and streams its decoded final body into |
| ⚡`sendFrom`[↗](#HttpClient.sendFrom) | `export fn (self: &amp;HttpClient) sendFrom(request: &amp;C` | Send one exact-length streaming request body and materialize the bounded |
| ⚡`sendFromInto`[↗](#HttpClient.sendFromInto) | `export fn (self: &amp;HttpClient) sendFromInto(request` | Send one exact-length streaming request body and stream the decoded |

---

### <a id="HttpRedirectPolicy"></a>`HttpRedirectPolicy` `🔓 export`

> 📄 `client.vx` L101-104

```vex
export struct HttpRedirectPolicy
```

Explicit policy for buffered redirect following.

Zero is deliberately invalid: callers that do not want redirects use
`send`, while redirect-enabled code always has a finite, visible bound.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `maxRedirects` | `usize` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `HttpRedirectPolicy.defaults`[↗](#HttpRedirectPolicy.defaults) | `export fn HttpRedirectPolicy.defaults(): HttpRedir` |  |

---

### <a id="HttpContentDecoding"></a>`HttpContentDecoding` `🔓 export`

> 📄 `client.vx` L115-119

```vex
export struct HttpContentDecoding
```

Explicit decoded-response resource policy.

Encoded transfer bytes remain bounded by `HttpClientConfig`; this second
ceiling applies after every Content-Encoding layer and prevents compressed
payloads from turning a small wire response into an allocation bomb.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `maxDecodedBodyBytes` | `usize` | 🔓 public |  |
| `maxEncodingLayers` | `usize` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `HttpContentDecoding.defaults`[↗](#HttpContentDecoding.defaults) | `export fn HttpContentDecoding.defaults(): HttpCont` |  |

---

### <a id="ClientResponse"></a>`ClientResponse` `🔓 export`

> 📄 `client.vx` L142-150

```vex
export struct ClientResponse
```

Fully decoded and owning HTTP response. A transport/protocol failure is

represented by `Result.Err(IoError)`, never by a magic invalid response.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `status` | `i32` | 🔓 public |  |
| `statusText` | `string` | 🔓 public |  |
| `version` | `string` | 🔓 public |  |
| `headers` | `Headers` | 🔓 public |  |
| `body` | `string` | 🔓 public |  |
| `connectionWillClose` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `header`[↗](#ClientResponse.header) | `export fn (self: &amp;ClientResponse) header(name: str` | Get a response header (case-insensitive). |
| `ok`[↗](#ClientResponse.ok) | `export fn (self: &amp;ClientResponse) ok(): bool` | Check if response status is successful (2xx). |
| `isRedirect`[↗](#ClientResponse.isRedirect) | `export fn (self: &amp;ClientResponse) isRedirect(): bo` | Check if response status is a redirect (3xx). |
| `decodeContent`[↗](#ClientResponse.decodeContent) | `export fn (self: &amp;ClientResponse!) decodeContent(d` | Decode the complete owning response body according to Content-Encoding. |

---

### <a id="ClientResponseHead"></a>`ClientResponseHead` `🔓 export`

> 📄 `client.vx` L155-162

```vex
export struct ClientResponseHead
```

Final response metadata for `HttpClient.sendInto`. The body has already

been decoded into the caller-provided async writer, so this value never
owns an unbounded payload.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `status` | `i32` | 🔓 public |  |
| `statusText` | `string` | 🔓 public |  |
| `version` | `string` | 🔓 public |  |
| `headers` | `Headers` | 🔓 public |  |
| `connectionWillClose` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `header`[↗](#ClientResponseHead.header) | `export fn (self: &amp;ClientResponseHead) header(name:` | Get a streamed response header (case-insensitive). |
| `ok`[↗](#ClientResponseHead.ok) | `export fn (self: &amp;ClientResponseHead) ok(): bool` | Check whether a streamed response has a 2xx status. |

---

### <a id="HttpSession"></a>`HttpSession` `🔓 export`

> 📄 `client.vx` L206-220

```vex
export struct HttpSession
```

One caller-owned, sequential HTTP/1.1 keep-alive connection.

This is deliberately not a shared pool. It has no lock, queue, background
reaper, or cross-task ownership ambiguity: one task owns one session and
performs one request at a time. The session closes itself on every framing,
I/O, cancellation, upgrade, HTTP/1.0, close-delimited, or `Connection:
close` boundary. A future pool can therefore contain only already-proven
reusable sessions rather than duplicating HTTP parsing policy.

**Implements:** `Drop`

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `stream` | `TcpStream` | 🔒 private |  |
| `configValue` | `HttpClientConfig` | 🔒 private |  |
| `requestBuffer` | `StringBuilder` | 🔒 private |  |
| `responseWorkspace` | `ClientResponseWorkspace` | 🔒 private |  |
| `reusable` | `bool` | 🔒 private |  |
| `busy` | `bool` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `invalidate`[↗](#HttpSession.invalidate) | `fn (self: &amp;HttpSession!) invalidate()` |  |
| `isReusable`[↗](#HttpSession.isReusable) | `export fn (self: &amp;HttpSession) isReusable(): bool` | True only while the exact connection is open and has completed a reusable |
| `close`[↗](#HttpSession.close) | `export fn (self: &amp;HttpSession!) close(): Result&lt;()` | Explicitly close the session. Closing an already invalidated session is a |
| `drop`[↗](#HttpSession.drop) | `export fn (self: &amp;HttpSession!) drop()` |  |
| ⚡`HttpSession.connect`[↗](#HttpSession.connect) | `export fn HttpSession.connect(endpoint: SocketAddr` | Establish one exclusive session using the default bounded client policy. |
| ⚡`send`[↗](#HttpSession.send) | `export fn (self: &amp;HttpSession!) send(request: &amp;Cli` | Send one complete request over this session. A session is intentionally |
| ⚡`sendInto`[↗](#HttpSession.sendInto) | `export fn (self: &amp;HttpSession!) sendInto(request: ` | Session equivalent of `HttpClient.sendInto`. Decoded body bytes are |
| ⚡`sendFrom`[↗](#HttpSession.sendFrom) | `export fn (self: &amp;HttpSession!) sendFrom(request: ` | Stream an exact-length request body over this exclusive keep-alive |
| ⚡`sendFromInto`[↗](#HttpSession.sendFromInto) | `export fn (self: &amp;HttpSession!) sendFromInto(reque` | Stream an exact-length request body and stream the decoded response body |

---

### <a id="ClientResponseWorkspace"></a>`ClientResponseWorkspace`

> 📄 `client.vx` L226-232

```vex
struct ClientResponseWorkspace
```

Private reusable storage for exactly one client response decoder. Keeping

this state as a concrete value (rather than a pool or erased scratch
object) makes exclusive-session reuse allocation-free after warm-up while
retaining the same hard parser/body limits as a stateless exchange.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `headerBuffer` | `StringBuilder` | 🔒 private |  |
| `bodyBuffer` | `StringBuilder` | 🔒 private |  |
| `bodyScratch` | `StringBuilder` | 🔒 private |  |
| `encodedPending` | `StringBuilder` | 🔒 private |  |
| `mergedInput` | `StringBuilder` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `ClientResponseWorkspace.new`[↗](#ClientResponseWorkspace.new) | `fn ClientResponseWorkspace.new(): ClientResponseWo` |  |
| `reset`[↗](#ClientResponseWorkspace.reset) | `fn (self: &amp;ClientResponseWorkspace!) reset()` |  |
| `releaseBodyCapacity`[↗](#ClientResponseWorkspace.releaseBodyCapacity) | `fn (self: &amp;ClientResponseWorkspace!) releaseBodyCa` | Release only exceptional decoded-body capacity after materialization. The |

---

### <a id="ClientRequest"></a>`ClientRequest` `🔓 export`

> 📄 `client.vx` L290-297

```vex
export struct ClientRequest
```

Request builder. `host` is the HTTP authority sent in `Host`; `endpoint`

is deliberately supplied separately to `HttpClient.send`, allowing a
resolved address and a virtual-host authority to differ safely.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `method` | `string` | 🔓 public |  |
| `host` | `string` | 🔓 public |  |
| `path` | `string` | 🔓 public |  |
| `headers` | `Headers` | 🔓 public |  |
| `body` | `string` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `ClientRequest.new`[↗](#ClientRequest.new) | `export fn ClientRequest.new(method: str, host: str` | Creates a request for an HTTP authority. Direct-origin requests use |
| `setHeader`[↗](#ClientRequest.setHeader) | `export fn (self: &amp;ClientRequest!) setHeader(name: ` | Set a request header. Authority/framing fields remain transport-owned and |
| `setBody`[↗](#ClientRequest.setBody) | `export fn (self: &amp;ClientRequest!) setBody(body: st` | Set a complete buffered request body. |
| `setContentType`[↗](#ClientRequest.setContentType) | `export fn (self: &amp;ClientRequest!) setContentType(c` | Set Content-Type for a buffered request body. |
| `acceptCompressed`[↗](#ClientRequest.acceptCompressed) | `export fn (self: &amp;ClientRequest!) acceptCompressed` | Advertise exactly the pure-Vex content codings understood by |
| ⚡`send`[↗](#ClientRequest.send) | `export fn (self: &amp;ClientRequest) send(endpoint: So` | Convenience overload for the default bounded client policy. |
| ⚡`sendInto`[↗](#ClientRequest.sendInto) | `export fn (self: &amp;ClientRequest) sendInto(endpoint` | Convenience overload for a streamed response with default bounded policy. |

---

### <a id="RedirectStep"></a>`RedirectStep`

> 📄 `client.vx` L632-637

```vex
struct RedirectStep
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `request` | `ClientRequest` | 🔒 private |  |
| `target` | `URL` | 🔒 private |  |
| `endpoint` | `SocketAddr` | 🔒 private |  |
| `crossOrigin` | `bool` | 🔒 private |  |

---

### <a id="ResponseBodyStep"></a>`ResponseBodyStep`

> 📄 `client.vx` L1069-1072

```vex
struct ResponseBodyStep
```

One decoder step reports transport progress separately from decoded output.

A chunked decoder may need to retain a short incomplete size/trailer/CRLF
suffix even after it has delivered earlier bytes from the same read.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `complete` | `bool` | 🔒 private |  |
| `consumed` | `usize` | 🔒 private |  |

---

### <a id="SameOriginRedirectResolver"></a>`SameOriginRedirectResolver`

> 📄 `client.vx` L1720-1720

```vex
struct SameOriginRedirectResolver
```

**Implements:** `HttpRedirectResolver`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| ⚡`resolve`[↗](#SameOriginRedirectResolver.resolve) | `fn (self: &amp;SameOriginRedirectResolver) resolve(hos` |  |

---

### <a id="Request"></a>`Request` `🔓 export`

> 📄 `request.vx` L23-40

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
| `scheme` | `str` | 🔓 public |  |
| `authority` | `str` | 🔓 public |  |
| `headers` | `RequestHeaders` | 🔓 public |  |
| `body` | `str` | 🔓 public |  |
| `_raw` | `str` | 🔓 public |  |
| `_raw_owned` | `string` | 🔓 public |  |
| `fd` | `i64` | 🔓 public |  |
| `streamId` | `i32` | 🔓 public |  |
| `valid` | `bool` | 🔓 public |  |
| `contentLength` | `i64` | 🔓 public |  |
| `keepAlive` | `bool` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `Request.invalid`[↗](#Request.invalid) | `export fn Request.invalid(): Request` | Empty/invalid request sentinel. |
| `header`[↗](#Request.header) | `export fn (self: &amp;Request) header(name: str): str` | Get a header value by name (case-insensitive). Returns empty str if absent. |
| `hasHeader`[↗](#Request.hasHeader) | `export fn (self: &amp;Request) hasHeader(name: str): b` | Check if a header exists. |
| `isMethod`[↗](#Request.isMethod) | `export fn (self: &amp;Request) isMethod(m: str): bool` | Check if the request method matches (case-sensitive). |
| `hasBody`[↗](#Request.hasBody) | `export fn (self: &amp;Request) hasBody(): bool` | Check if the request has a body. |
| `contentType`[↗](#Request.contentType) | `export fn (self: &amp;Request) contentType(): str` | Get Content-Type header. |
| `isJSON`[↗](#Request.isJSON) | `export fn (self: &amp;Request) isJSON(): bool` | Check if request is JSON. |

---

### <a id="Response"></a>`Response` `🔓 export`

> 📄 `response.vx` L28-42

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
| `buffered` | `bool` | 🔓 public |  |
| `bodySuppressed` | `bool` | 🔓 public |  |
| `bufferedContentType` | `str` | 🔓 public |  |
| `buffered_output` | `StringBuilder` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `encodeObserved`[↗](#Response.encodeObserved) | `fn (self: &amp;Response!) encodeObserved(seed: i64): i` |  |
| `Response.empty`[↗](#Response.empty) | `export fn Response.empty(): Response` | Create an empty response. |
| `isInformational`[↗](#Response.isInformational) | `export fn (self: &amp;Response) isInformational(): boo` | True if status is 1xx (informational). |
| `isSuccess`[↗](#Response.isSuccess) | `export fn (self: &amp;Response) isSuccess(): bool` | True if status is 2xx (success). |
| `isRedirect`[↗](#Response.isRedirect) | `export fn (self: &amp;Response) isRedirect(): bool` | True if status is 3xx (redirect). |
| `isClientError`[↗](#Response.isClientError) | `export fn (self: &amp;Response) isClientError(): bool` | True if status is 4xx (client error). |
| `isServerError`[↗](#Response.isServerError) | `export fn (self: &amp;Response) isServerError(): bool` | True if status is 5xx (server error). |
| `contentLength`[↗](#Response.contentLength) | `export fn (self: &amp;Response) contentLength(): i64` | Get Content-Length or -1. |
| `isChunked`[↗](#Response.isChunked) | `export fn (self: &amp;Response) isChunked(): bool` | Is chunked transfer? |
| `isConnectionClose`[↗](#Response.isConnectionClose) | `export fn (self: &amp;Response) isConnectionClose(): b` | Is Connection: close? |
| `location`[↗](#Response.location) | `export fn (self: &amp;Response) location(): str` | Get Location header (for redirects). |
| `contentType`[↗](#Response.contentType) | `export fn (self: &amp;Response) contentType(): str` | Get Content-Type header. |
| `Response.new`[↗](#Response.new) | `export fn Response.new(): Response` | Create a new response with default 200 OK and keep-alive. |
| `takeStreamHead`[↗](#Response.takeStreamHead) | `export fn (self: &amp;Response!) takeStreamHead(): Res` | Move streaming response metadata exactly once. Header vectors retain their |
| `reset`[↗](#Response.reset) | `export fn (self: &amp;Response!) reset()` | Reset response for reuse (clears headers, keeps capacity). |
| `status`[↗](#Response.status) | `export fn (self: &amp;Response!) status(code: i32): &amp;R` |  |
| `header`[↗](#Response.header) | `export fn (self: &amp;Response!) header(name: string, ` |  |
| `contentType`[↗](#Response.contentType) | `export fn (self: &amp;Response!) contentType(ct: strin` |  |
| `setBody`[↗](#Response.setBody) | `export fn (self: &amp;Response!) setBody(b: string): &amp;` |  |
| `sendString`[↗](#Response.sendString) | `export fn (self: &amp;Response!) sendString(fd: i64, t` |  |
| `sendJSON`[↗](#Response.sendJSON) | `export fn (self: &amp;Response!) sendJSON(fd: i64, jso` |  |
| `sendHTML`[↗](#Response.sendHTML) | `export fn (self: &amp;Response!) sendHTML(fd: i64, htm` |  |
| `send`[↗](#Response.send) | `export fn (self: &amp;Response!) send(fd: i64)` |  |
| `sendEmpty`[↗](#Response.sendEmpty) | `export fn (self: &amp;Response!) sendEmpty(fd: i64)` |  |
| `appendHeadersWithFraming`[↗](#Response.appendHeadersWithFraming) | `fn (self: &amp;Response) appendHeadersWithFraming(out:` | Append a complete HTTP/1 header block with Response-owned framing. |
| `appendHeadersForBodyLength`[↗](#Response.appendHeadersForBodyLength) | `fn (self: &amp;Response) appendHeadersForBodyLength(ou` | Append a complete HTTP/1 header block for an explicitly sized body. |
| `appendEncoded`[↗](#Response.appendEncoded) | `fn (self: &amp;Response) appendEncoded(out: &amp;StringBui` |  |
| `encodeInto`[↗](#Response.encodeInto) | `fn (self: &amp;Response!) encodeInto(defaultContentTyp` |  |
| `appendEncodedTo`[↗](#Response.appendEncodedTo) | `export fn (self: &amp;Response) appendEncodedTo(out: &amp;` | Append the buffered Fiber response into caller-owned reusable storage. |
| `appendStreamHeadersTo`[↗](#Response.appendStreamHeadersTo) | `export fn (self: &amp;Response) appendStreamHeadersTo(` | Append only the HTTP/1 headers for a body that Fiber will stream directly |
| `appendChunkedHeadersTo`[↗](#Response.appendChunkedHeadersTo) | `export fn (self: &amp;Response) appendChunkedHeadersTo` | Append headers for an unknown-length HTTP/1 response body. |
| `appendChunkTo`[↗](#Response.appendChunkTo) | `export fn (self: &amp;Response) appendChunkTo(out: &amp;St` |  |
| `appendChunkTerminatorTo`[↗](#Response.appendChunkTerminatorTo) | `export fn (self: &amp;Response) appendChunkTerminatorT` |  |
| `encode`[↗](#Response.encode) | `export fn (self: &amp;Response!) encode(): str` | Serialize into response-owned reusable storage and borrow the encoded bytes. |
| `writeTo`[↗](#Response.writeTo) | `fn (self: &amp;Response!) writeTo(fd: i64)` |  |
| `writeToWithContentType`[↗](#Response.writeToWithContentType) | `fn (self: &amp;Response!) writeToWithContentType(fd: i` |  |

---

### <a id="ResponseStreamHead"></a>`ResponseStreamHead` `🔓 export`

> 📄 `response.vx` L47-53

```vex
export struct ResponseStreamHead
```

Protocol-neutral response metadata moved out of a streaming task before

its first body chunk. HTTP/1 selects chunked framing; HTTP/2/3 translate the
same owned fields without inventing a Content-Length for an open stream.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `statusCode` | `i32` | 🔓 public |  |
| `headers` | `Headers` | 🔓 public |  |
| `bodySuppressed` | `bool` | 🔓 public |  |
| `contentType` | `string` | 🔓 public |  |

---

### <a id="WsMessage"></a>`WsMessage` `🔓 export`

> 📄 `ws.vx` L47-51

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
| `feedFrame`[↗](#WsMessage.feedFrame) | `export fn (self: &amp;WsMessage!) feedFrame(frame: &amp;Ws` | Feed a parsed frame into the message assembler. |
| `reset`[↗](#WsMessage.reset) | `export fn (self: &amp;WsMessage!) reset()` | Reset for next message. |
| `isText`[↗](#WsMessage.isText) | `export fn (self: &amp;WsMessage) isText(): bool` | Check if this is a text message. |
| `isBinary`[↗](#WsMessage.isBinary) | `export fn (self: &amp;WsMessage) isBinary(): bool` | Check if this is a binary message. |
| `isClose`[↗](#WsMessage.isClose) | `export fn (self: &amp;WsMessage) isClose(): bool` | Check if this is a close frame. |
| `isPing`[↗](#WsMessage.isPing) | `export fn (self: &amp;WsMessage) isPing(): bool` | Check if this is a ping frame. |
| `text`[↗](#WsMessage.text) | `export fn (self: &amp;WsMessage) text(): string` | Get the text content (for text messages). |
| `WsMessage.empty`[↗](#WsMessage.empty) | `fn WsMessage.empty(): WsMessage` |  |

---

### <a id="WsConn"></a>`WsConn` `🔓 export`

> 📄 `ws.vx` L82-89

```vex
export struct WsConn
```

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `fd` | `i64` | 🔓 public |  |
| `open` | `bool` | 🔓 public |  |
| `recvBuffer` | `WsFrameStream` | 🔓 public |  |
| `fragmentOpcode` | `u8` | 🔓 public |  |
| `fragmentData` | `StringBuilder` | 🔓 public |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `WsConn.new`[↗](#WsConn.new) | `export fn WsConn.new(fd: i64): WsConn` | Create a WebSocket connection from an already-upgraded socket fd. |
| `WsConn.upgrade`[↗](#WsConn.upgrade) | `export fn WsConn.upgrade(fd: i64, req: &amp;Request): ` | Perform the WebSocket upgrade handshake. |
| `sendText`[↗](#WsConn.sendText) | `export fn (self: &amp;WsConn!) sendText(text: string)` | Send a text message. |
| `sendBinary`[↗](#WsConn.sendBinary) | `export fn (self: &amp;WsConn!) sendBinary(data: Ptr&lt;u8` | Send a binary message. |
| `sendPing`[↗](#WsConn.sendPing) | `export fn (self: &amp;WsConn!) sendPing()` | Send a ping frame. |
| `sendPong`[↗](#WsConn.sendPong) | `export fn (self: &amp;WsConn!) sendPong()` | Send a pong frame (response to ping). |
| `close`[↗](#WsConn.close) | `export fn (self: &amp;WsConn!) close()` | Send a close frame and mark connection as closed. |
| `writeFrame`[↗](#WsConn.writeFrame) | `fn (self: &amp;WsConn!) writeFrame(opcode: u8, payload` | Send a complete unmasked server frame without materialising `header+body`. |
| `closeTransport`[↗](#WsConn.closeTransport) | `fn (self: &amp;WsConn!) closeTransport()` |  |
| `receiveMore`[↗](#WsConn.receiveMore) | `fn (self: &amp;WsConn!) receiveMore(): bool` | Read additional TCP bytes while preserving every already-buffered frame. |
| `failProtocol`[↗](#WsConn.failProtocol) | `fn (self: &amp;WsConn!) failProtocol(): Option&lt;WsMessa` |  |
| `appendFragment`[↗](#WsConn.appendFragment) | `fn (self: &amp;WsConn!) appendFragment(data: str): boo` |  |
| `readMessage`[↗](#WsConn.readMessage) | `export fn (self: &amp;WsConn!) readMessage(): Option&lt;W` | Read the next complete logical WebSocket message. |
| `messageLoop`[↗](#WsConn.messageLoop) | `export fn (self: &amp;WsConn!) messageLoop(handler: fn` | Run a message loop. Calls the handler for each received message. |

---

### <a id="WsSession"></a>`WsSession` `🔓 export`

> 📄 `session.vx` L43-53

```vex
export struct WsSession
```

A persistent non-blocking WebSocket endpoint. It borrows the descriptor:

the enclosing Fiber worker remains the only authority that closes it.

**Fields:**

| Name | Type | Access | Description |
|------|------|--------|-------------|
| `io` | `Conn` | 🔒 private |  |
| `idValue` | `u64` | 🔒 private |  |
| `protocolValue` | `string` | 🔒 private |  |
| `open` | `bool` | 🔒 private |  |
| `closeQueued` | `bool` | 🔒 private |  |
| `fragmentOpcode` | `u8` | 🔒 private |  |
| `fragmentData` | `StringBuilder` | 🔒 private |  |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `WsSession.new`[↗](#WsSession.new) | `export fn WsSession.new(fd: i64): WsSession` | Create a session for an already non-blocking, already-upgraded socket. |
| `WsSession.withId`[↗](#WsSession.withId) | `export fn WsSession.withId(fd: i64, id: u64): WsSe` | Create a session with a stable application-visible identity. Low-level |
| `WsSession.withIdAndProtocol`[↗](#WsSession.withIdAndProtocol) | `export fn WsSession.withIdAndProtocol(fd: i64, id:` | Create an upgraded session with the one route-selected subprotocol. The |
| `isOpen`[↗](#WsSession.isOpen) | `export fn (self: &amp;WsSession) isOpen(): bool` |  |
| `id`[↗](#WsSession.id) | `export fn (self: &amp;WsSession) id(): u64` |  |
| `protocol`[↗](#WsSession.protocol) | `export fn (self: &amp;WsSession) protocol(): str` | The negotiated RFC 6455 subprotocol, or empty when none was selected. |
| `pendingInput`[↗](#WsSession.pendingInput) | `export fn (self: &amp;WsSession) pendingInput(): usize` |  |
| `pendingOutput`[↗](#WsSession.pendingOutput) | `export fn (self: &amp;WsSession) pendingOutput(): usiz` |  |
| `wantsWrite`[↗](#WsSession.wantsWrite) | `export fn (self: &amp;WsSession) wantsWrite(): bool` |  |
| `shouldCloseAfterFlush`[↗](#WsSession.shouldCloseAfterFlush) | `export fn (self: &amp;WsSession) shouldCloseAfterFlush` | A close response may be queued behind earlier application output. The |
| `stageInitialInput`[↗](#WsSession.stageInitialInput) | `export fn (self: &amp;WsSession!) stageInitialInput(da` | Copy HTTP's already-received post-upgrade suffix into the session. This is |
| `queueUpgradeResponse`[↗](#WsSession.queueUpgradeResponse) | `fn (self: &amp;WsSession!) queueUpgradeResponse(req: &amp;` | Queue the validated `101` response without performing a synchronous |
| `queueValidatedUpgrade`[↗](#WsSession.queueValidatedUpgrade) | `fn (self: &amp;WsSession!) queueValidatedUpgrade(key: ` | Queue Fiber's arena-safe opening response from the already-validated, |
| `readFromTransport`[↗](#WsSession.readFromTransport) | `export fn (self: &amp;WsSession!) readFromTransport():` | Fill the common bounded input queue after an EVT_READ notification. |
| `flushTransport`[↗](#WsSession.flushTransport) | `export fn (self: &amp;WsSession!) flushTransport(): i6` | Drain queued output after an EVT_WRITE notification. A negative EAGAIN is |
| `queueFrame`[↗](#WsSession.queueFrame) | `fn (self: &amp;WsSession!) queueFrame(opcode: u8, payl` | Queue a complete server frame atomically with respect to the bounded |
| `sendText`[↗](#WsSession.sendText) | `export fn (self: &amp;WsSession!) sendText(text: str):` |  |
| `sendBinary`[↗](#WsSession.sendBinary) | `export fn (self: &amp;WsSession!) sendBinary(data: Ptr` |  |
| `sendPing`[↗](#WsSession.sendPing) | `export fn (self: &amp;WsSession!) sendPing(data: str):` |  |
| `sendPong`[↗](#WsSession.sendPong) | `export fn (self: &amp;WsSession!) sendPong(data: Ptr&lt;u` |  |
| `closeWith`[↗](#WsSession.closeWith) | `export fn (self: &amp;WsSession!) closeWith(data: Ptr&lt;` | Queue a close payload once. The session remains drainable so a valid close |
| `close`[↗](#WsSession.close) | `export fn (self: &amp;WsSession!) close(): bool` |  |
| `failProtocol`[↗](#WsSession.failProtocol) | `fn (self: &amp;WsSession!) failProtocol(): Option&lt;WsMe` |  |
| `appendFragment`[↗](#WsSession.appendFragment) | `fn (self: &amp;WsSession!) appendFragment(data: str): ` |  |
| `advanceFrame`[↗](#WsSession.advanceFrame) | `export fn (self: &amp;WsSession!) advanceFrame(message` |  |
| `nextMessage`[↗](#WsSession.nextMessage) | `export fn (self: &amp;WsSession!) nextMessage(): Optio` | Consume buffered frames until an application-visible message is available. |

---

## Enums

### <a id="WsParseResult"></a>`WsParseResult` `🔓 export`

> 📄 `ws.vx` L115-122

```vex
export enum WsParseResult
```

**Variants:**

- `Ok` — Frame header parsed. WsFrame contains metadata.
- `NeedMore` — Need more data (at least needBytes more).
- `Error` — Protocol error.

---

### <a id="H2PriorityFieldResult"></a>`H2PriorityFieldResult` `🔓 export`

> 📄 `h2_priority.vx` L33-36

```vex
export enum H2PriorityFieldResult
```

**Variants:**

- `Ok`
- `Error`

---

### <a id="H2PriorityUpdateResult"></a>`H2PriorityUpdateResult` `🔓 export`

> 📄 `h2_priority.vx` L44-47

```vex
export enum H2PriorityUpdateResult
```

**Variants:**

- `Ok`
- `Error`

---

### <a id="H2PriorityRegistrationResult"></a>`H2PriorityRegistrationResult` `🔓 export`

> 📄 `h2_priority.vx` L431-436

```vex
export enum H2PriorityRegistrationResult
```

**Variants:**

- `Added`
- `Updated`
- `Full`
- `Invalid`

---

### <a id="H2ScheduleResult"></a>`H2ScheduleResult` `🔓 export`

> 📄 `h2_priority.vx` L438-444

```vex
export enum H2ScheduleResult
```

**Variants:**

- `Selected`
- `Empty`
- `FlowBlocked`
- `Busy`
- `Invalid`

---

### <a id="H2ProtocolFrameResult"></a>`H2ProtocolFrameResult` `🔓 export`

> 📄 `h2_protocol.vx` L82-90

```vex
export enum H2ProtocolFrameResult
```

**Variants:**

- `Ok`
- `HeaderBlockOpen`
- `HeaderBlockComplete`
- `SettingsAckRequired`
- `StreamError`
- `ConnectionError`
- `Invalid`

---

### <a id="H2ReceiveGoAwayResult"></a>`H2ReceiveGoAwayResult` `🔓 export`

> 📄 `h2_protocol.vx` L92-96

```vex
export enum H2ReceiveGoAwayResult
```

**Variants:**

- `Applied`
- `ConnectionError`
- `Invalid`

---

### <a id="H2SendGoAwayResult"></a>`H2SendGoAwayResult` `🔓 export`

> 📄 `h2_protocol.vx` L98-102

```vex
export enum H2SendGoAwayResult
```

**Variants:**

- `Encoded`
- `ConnectionError`
- `Invalid`

---

### <a id="H2ReceivePingResult"></a>`H2ReceivePingResult` `🔓 export`

> 📄 `h2_protocol.vx` L107-113

```vex
export enum H2ReceivePingResult
```

Exact received PING ownership. Non-ACK payloads must be echoed by

`sendPingAckFrame`; ACK payloads are correlated against the bounded local
outstanding set. Unmatched ACKs are observable but not connection errors.

**Variants:**

- `AckRequired`
- `Acknowledged`
- `UnmatchedAcknowledgement`
- `ConnectionError`
- `Invalid`

---

### <a id="H2SendPingResult"></a>`H2SendPingResult` `🔓 export`

> 📄 `h2_protocol.vx` L115-121

```vex
export enum H2SendPingResult
```

**Variants:**

- `Encoded`
- `Duplicate`
- `Full`
- `ConnectionError`
- `Invalid`

---

### <a id="H2ReceivePriorityResult"></a>`H2ReceivePriorityResult` `🔓 export`

> 📄 `h2_protocol.vx` L125-129

```vex
export enum H2ReceivePriorityResult
```

Exact RFC 9218 PRIORITY_UPDATE receive ownership. Wire parsing, directional

connection sequencing and bounded scheduler mutation commit as one turn.

**Variants:**

- `Applied`
- `ConnectionError`
- `Invalid`

---

### <a id="H2SendPriorityResult"></a>`H2SendPriorityResult` `🔓 export`

> 📄 `h2_protocol.vx` L131-135

```vex
export enum H2SendPriorityResult
```

**Variants:**

- `Encoded`
- `ConnectionError`
- `Invalid`

---

### <a id="H2ReceiveLegacyPriorityResult"></a>`H2ReceiveLegacyPriorityResult` `🔓 export`

> 📄 `h2_protocol.vx` L137-143

```vex
export enum H2ReceiveLegacyPriorityResult
```

**Variants:**

- `Applied`
- `Ignored`
- `StreamError`
- `ConnectionError`
- `Invalid`

---

### <a id="H2ProtocolAbortResult"></a>`H2ProtocolAbortResult` `🔓 export`

> 📄 `h2_protocol.vx` L145-148

```vex
export enum H2ProtocolAbortResult
```

**Variants:**

- `Closed`
- `AlreadyClosed`

---

### <a id="H2HeaderFrameResult"></a>`H2HeaderFrameResult` `🔓 export`

> 📄 `h2_protocol.vx` L153-161

```vex
export enum H2HeaderFrameResult
```

Result of connection-owned received header-block processing. A stream

error is intentionally delayed until END_HEADERS so HPACK state still
advances exactly as it did on the wire.

**Variants:**

- `Pending`
- `Decoded`
- `Ignored`
- `StreamError`
- `ConnectionError`
- `Invalid`

---

### <a id="H2ReceiveDataResult"></a>`H2ReceiveDataResult` `🔓 export`

> 📄 `h2_protocol.vx` L166-174

```vex
export enum H2ReceiveDataResult
```

Result of exact-payload DATA ingestion. `Data` borrows only the application

bytes after the optional pad-length field and trailing padding; `flowBytes`
is the complete frame payload charged to both receive windows.

**Variants:**

- `Data`
- `Discarded`
- `StreamError`
- `ConnectionError`
- `Invalid`

---

### <a id="H2SendDataResult"></a>`H2SendDataResult` `🔓 export`

> 📄 `h2_protocol.vx` L179-185

```vex
export enum H2SendDataResult
```

A DATA frame whose scheduler lease, stream/connection windows and stream

transition committed together. Transport writes one optional pad-length
byte, `dataBytes` application bytes, then `paddingBytes` zero bytes.

**Variants:**

- `Ready`
- `Blocked`
- `StreamError`
- `ConnectionError`
- `Invalid`

---

### <a id="H2SendControlResult"></a>`H2SendControlResult` `🔓 export`

> 📄 `h2_protocol.vx` L188-193

```vex
export enum H2SendControlResult
```

Shared result for atomically encoded payload-bearing control frames.

**Variants:**

- `Encoded`
- `StreamError`
- `ConnectionError`
- `Invalid`

---

### <a id="H2ReceiveResetResult"></a>`H2ReceiveResetResult` `🔓 export`

> 📄 `h2_protocol.vx` L197-201

```vex
export enum H2ReceiveResetResult
```

A peer reset whose payload, connection sequencing, stream retirement and

scheduler revocation committed together.

**Variants:**

- `Reset`
- `ConnectionError`
- `Invalid`

---

### <a id="H2InboundFrameResult"></a>`H2InboundFrameResult` `🔓 export`

> 📄 `h2_protocol.vx` L206-227

```vex
export enum H2InboundFrameResult
```

One transport-facing receive result for every HTTP/2 frame class. The

dispatcher preserves borrowed payload views, moves decoded header ownership
once, and retains exact stream-vs-connection error scope.

**Variants:**

- `Data`
- `DiscardedData`
- `HeaderBlockPending`
- `Headers`
- `SettingsAckRequired`
- `SettingsAcknowledged`
- `WindowUpdated`
- `Reset`
- `GoAway`
- `PingAckRequired`
- `PingAcknowledged`
- `PingUnmatched`
- `PriorityUpdated`
- `LegacyPriorityApplied`
- `LegacyPriorityIgnored`
- `Ignored`
- `StreamError`
- `ConnectionError`
- `Invalid`

---

### <a id="H2IngressResult"></a>`H2IngressResult` `🔓 export`

> 📄 `h2_protocol.vx` L232-236

```vex
export enum H2IngressResult
```

One incremental transport step over caller-retained bytes. `Dispatched`

reports the exact prefix safe to consume after the result is handled;
borrowed DATA/PING/GOAWAY views remain valid until then.

**Variants:**

- `Dispatched`
- `NeedMore`
- `Invalid`

---

### <a id="H2SendResetResult"></a>`H2SendResetResult` `🔓 export`

> 📄 `h2_protocol.vx` L261-270

```vex
export enum H2SendResetResult
```

Result of an application cancellation/reset. Idle identifiers have no wire

representation and are retired without encoding; active streams commit
only after the complete 13-byte RST_STREAM has been encoded successfully.

**Variants:**

- `Encoded`
- `Closed`
- `IdlePriorityRemoved`
- `AlreadyClosed`
- `NotFound`
- `StreamError`
- `ConnectionError`
- `Invalid`

---

### <a id="H2SendHeaderResult"></a>`H2SendHeaderResult` `🔓 export`

> 📄 `h2_protocol.vx` L424-430

```vex
export enum H2SendHeaderResult
```

Result of a semantically validated, connection-owned outbound field block.

`Encoded` returns the HPACK payload length; transport owns the nine-byte
frame header and writes it only after this transaction succeeds.

**Variants:**

- `Encoded`
- `OutputTooSmall`
- `StreamError`
- `ConnectionError`
- `Invalid`

---

### <a id="H2SendPushResult"></a>`H2SendPushResult` `🔓 export`

> 📄 `h2_protocol.vx` L432-438

```vex
export enum H2SendPushResult
```

**Variants:**

- `Promised`
- `OutputTooSmall`
- `StreamError`
- `ConnectionError`
- `Invalid`

---

### <a id="H2HeaderFragmentResult"></a>`H2HeaderFragmentResult`

> 📄 `h2_protocol.vx` L2790-2793

```vex
enum H2HeaderFragmentResult
```

**Variants:**

- `Ok`
- `Error`

---

### <a id="H2AppliedFieldSectionResult"></a>`H2AppliedFieldSectionResult`

> 📄 `h2_protocol.vx` L3095-3098

```vex
enum H2AppliedFieldSectionResult
```

**Variants:**

- `Applied`
- `Error`

---

### <a id="MessageFraming"></a>`MessageFraming` `🔓 export`

> 📄 `headers.vx` L54-59

```vex
export enum MessageFraming
```

The sole framing decision derived from HTTP message headers.

Callers must not independently inspect `Content-Length` and
`Transfer-Encoding`: doing so is how request/response parsers disagree
about message boundaries. `Invalid` is deliberately a borrowed static
diagnostic, so the zero-copy parser stays allocation-free.

**Variants:**

- `NoFraming`
- `ContentLength`
- `Chunked`
- `Invalid`

---

### <a id="HeaderParseResult"></a>`HeaderParseResult` `🔓 export`

> 📄 `headers.vx` L469-478

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

### <a id="H2FieldSectionKind"></a>`H2FieldSectionKind` `🔓 export`

> 📄 `h2_headers.vx` L14-19

```vex
export enum H2FieldSectionKind
```

The semantic context of one fully decompressed HTTP/2 field section.

**Variants:**

- `Request`
- `Response`
- `Trailers`
- `PushRequest`

---

### <a id="H2FieldSectionResult"></a>`H2FieldSectionResult` `🔓 export`

> 📄 `h2_headers.vx` L39-42

```vex
export enum H2FieldSectionResult
```

**Variants:**

- `Ok`
- `Malformed`

---

### <a id="MultipartState"></a>`MultipartState` `🔓 export`

> 📄 `multipart.vx` L59-66

```vex
export enum MultipartState
```

**Variants:**

- `Start`
- `Headers`
- `Body`
- `BoundarySuffix`
- `Done`
- `Failed`

---

### <a id="H2ParseResult"></a>`H2ParseResult` `🔓 export`

> 📄 `h2.vx` L116-129

```vex
export enum H2ParseResult
```

**Variants:**

- `Ok` — Frame header parsed successfully.
- `NeedMore` — Need more data (at least N bytes).
- `StreamError` — Stream-scoped metadata rejection. Frame metadata is retained so a
- `ConnectionError` — Peer violation that terminates the HTTP/2 connection.
- `Invalid` — Invalid local parser configuration rather than peer input.

---

### <a id="H2MetadataValidation"></a>`H2MetadataValidation`

> 📄 `h2.vx` L131-135

```vex
enum H2MetadataValidation
```

**Variants:**

- `Valid`
- `StreamError`
- `ConnectionError`

---

### <a id="H2SettingsUpdateResult"></a>`H2SettingsUpdateResult` `🔓 export`

> 📄 `h2.vx` L356-359

```vex
export enum H2SettingsUpdateResult
```

**Variants:**

- `Ok`
- `Error`

---

### <a id="H2GoAwayResult"></a>`H2GoAwayResult` `🔓 export`

> 📄 `h2.vx` L460-463

```vex
export enum H2GoAwayResult
```

**Variants:**

- `Ok`
- `Error`

---

### <a id="H2WindowUpdateResult"></a>`H2WindowUpdateResult` `🔓 export`

> 📄 `h2.vx` L465-468

```vex
export enum H2WindowUpdateResult
```

**Variants:**

- `Ok`
- `Error`

---

### <a id="H2RstStreamResult"></a>`H2RstStreamResult` `🔓 export`

> 📄 `h2.vx` L470-473

```vex
export enum H2RstStreamResult
```

**Variants:**

- `Ok`
- `Error`

---

### <a id="H2LegacyPriorityResult"></a>`H2LegacyPriorityResult` `🔓 export`

> 📄 `h2.vx` L484-487

```vex
export enum H2LegacyPriorityResult
```

**Variants:**

- `Ok`
- `Error`

---

### <a id="H2EncodeResult"></a>`H2EncodeResult` `🔓 export`

> 📄 `h2.vx` L565-568

```vex
export enum H2EncodeResult
```

**Variants:**

- `Ok`
- `Error`

---

### <a id="BodyMode"></a>`BodyMode` `🔓 export`

> 📄 `body.vx` L9-17

```vex
export enum BodyMode
```

**Variants:**

- `NoBody`
- `ContentLength`
- `Chunked`
- `UntilClose`
- `EndStream` — Decoded bytes are terminated by an explicit protocol stream boundary

---

### <a id="BodyResult"></a>`BodyResult` `🔓 export`

> 📄 `body.vx` L44-48

```vex
export enum BodyResult
```

**Variants:**

- `NeedMore`
- `Complete`
- `Error`

---

### <a id="BodyConsumerState"></a>`BodyConsumerState` `🔓 export`

> 📄 `body.vx` L63-68

```vex
export enum BodyConsumerState
```

The terminal state is explicit because a transport error after `begin`

must never look like a successful empty body to a route-level consumer.

**Variants:**

- `Idle`
- `Reading`
- `Finished`
- `Cancelled`

---

### <a id="HpackIntegerResult"></a>`HpackIntegerResult` `🔓 export`

> 📄 `hpack.vx` L216-220

```vex
export enum HpackIntegerResult
```

**Variants:**

- `Ok`
- `NeedMore`
- `Error`

---

### <a id="HpackIndexing"></a>`HpackIndexing` `🔓 export`

> 📄 `hpack.vx` L307-312

```vex
export enum HpackIndexing
```

Encoding policy for one HPACK field. Decoded literals preserve their wire

policy; indexed fields decode as `Auto` because they carry no literal flag.

**Variants:**

- `Auto`
- `Incremental`
- `Without`
- `Never`

---

### <a id="HpackResult"></a>`HpackResult` `🔓 export`

> 📄 `hpack.vx` L336-345

```vex
export enum HpackResult
```

**Variants:**

- `Ok` — Decoded one header.
- `TableUpdate` — Dynamic table size update (not a header).
- `NeedMore` — Need more data.
- `Error` — Decode error.

---

### <a id="HpackBlockResult"></a>`HpackBlockResult` `🔓 export`

> 📄 `hpack.vx` L371-374

```vex
export enum HpackBlockResult
```

**Variants:**

- `Ok`
- `Error`

---

### <a id="HpackStringResult"></a>`HpackStringResult`

> 📄 `hpack.vx` L376-380

```vex
enum HpackStringResult
```

**Variants:**

- `Ok`
- `NeedMore`
- `Error`

---

### <a id="HpackEncodeResult"></a>`HpackEncodeResult` `🔓 export`

> 📄 `hpack.vx` L700-704

```vex
export enum HpackEncodeResult
```

**Variants:**

- `Ok`
- `OutputTooSmall`
- `Error`

---

### <a id="FiberRequestResult"></a>`FiberRequestResult` `🔓 export`

> 📄 `fiber_request.vx` L53-57

```vex
export enum FiberRequestResult
```

**Variants:**

- `Complete`
- `Incomplete`
- `Error`

---

### <a id="H2EndpointRole"></a>`H2EndpointRole` `🔓 export`

> 📄 `h2_connection.vx` L28-31

```vex
export enum H2EndpointRole
```

**Variants:**

- `Client`
- `Server`

---

### <a id="H2ConnectionResult"></a>`H2ConnectionResult` `🔓 export`

> 📄 `h2_connection.vx` L33-43

```vex
export enum H2ConnectionResult
```

**Variants:**

- `Ok`
- `HeaderBlockOpen` — A fragmented header block now owns this direction of the connection.
- `HeaderBlockComplete` — A complete header block is ready for HPACK decoding.
- `SettingsAckRequired` — Peer SETTINGS were accepted and require an acknowledgement.
- `Error` — Connection-level HTTP/2 error code and stable diagnostic.

---

### <a id="H2FlowResult"></a>`H2FlowResult` `🔓 export`

> 📄 `h2_connection.vx` L45-55

```vex
export enum H2FlowResult
```

**Variants:**

- `Ok`
- `Blocked` — Local send capacity is exhausted; wait for WINDOW_UPDATE.
- `Invalid` — Invalid local API request; no flow-control state changed.
- `ConnectionError` — Peer violated the connection flow-control window.
- `StreamError` — Peer violated one stream's flow-control window.

---

### <a id="H2StreamAdmissionResult"></a>`H2StreamAdmissionResult` `🔓 export`

> 📄 `h2_connection.vx` L57-70

```vex
export enum H2StreamAdmissionResult
```

**Variants:**

- `Opened` — A stream was materialized. Contains its stream identifier and map index.
- `Existing` — The stream was already materialized. Contains its identifier and index.
- `Blocked` — Local admission cannot proceed (draining, concurrency limit, exhaustion).
- `Ignored` — A peer stream above the locally sent GOAWAY boundary was consumed but ignored.
- `StreamError` — Peer admission failed at stream scope.
- `ConnectionError` — Peer admission violated a connection-wide stream-ID invariant.

---

### <a id="Method"></a>`Method` `🔓 export`

> 📄 `request.vx` L29-40

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
| `asStr`[↗](#Method.asStr) | `export fn (self: &amp;Method) asStr(): str` | Method to string. |

---

### <a id="HttpVersion"></a>`HttpVersion` `🔓 export`

> 📄 `request.vx` L88-92

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
| `asStr`[↗](#HttpVersion.asStr) | `export fn (self: &amp;HttpVersion) asStr(): str` |  |

---

### <a id="RequestResult"></a>`RequestResult` `🔓 export`

> 📄 `request.vx` L196-203

```vex
export enum RequestResult
```

**Variants:**

- `Complete` — Fully parsed. usize = byte offset where body starts.
- `Incomplete` — Need more data (headers not complete).
- `Error` — Protocol error.

---

### <a id="ChunkState"></a>`ChunkState` `🔓 export`

> 📄 `chunked.vx` L11-18

```vex
export enum ChunkState
```

**Variants:**

- `Size`
- `Data`
- `DataCRLF`
- `Trailer`
- `Done`
- `Error`

---

### <a id="ChunkResult"></a>`ChunkResult` `🔓 export`

> 📄 `chunked.vx` L28-32

```vex
export enum ChunkResult
```

**Variants:**

- `NeedMore`
- `Complete`
- `Error`

---

### <a id="ResponseResult"></a>`ResponseResult` `🔓 export`

> 📄 `response.vx` L102-109

```vex
export enum ResponseResult
```

**Variants:**

- `Complete` — Fully parsed. usize = byte offset where body starts.
- `Incomplete` — Need more data.
- `Error` — Protocol error.

---

### <a id="HuffDecodeResult"></a>`HuffDecodeResult` `🔓 export`

> 📄 `huffman.vx` L360-365

```vex
export enum HuffDecodeResult
```

Decode result

**Variants:**

- `Ok` — Successfully decoded. usize = bytes written to output.
- `Error` — Invalid Huffman sequence.

---

### <a id="StreamState"></a>`StreamState` `🔓 export`

> 📄 `stream.vx` L48-56

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
| `name`[↗](#StreamState.name) | `export fn (self: &amp;StreamState) name(): str` | Human-readable state name. |

---

### <a id="StreamError"></a>`StreamError` `🔓 export`

> 📄 `stream.vx` L75-84

```vex
export enum StreamError
```

**Variants:**

- `Ok` — No error, transition successful.
- `InvalidTransition` — Frame type not valid in current state.
- `StreamError` — Stream-level protocol error (RST_STREAM).
- `ConnectionError` — Connection-level error (GOAWAY).

---

### <a id="ApplicationTransportRequirement"></a>`ApplicationTransportRequirement` `🔓 export`

> 📄 `application_contract.vx` L10-15

```vex
export enum ApplicationTransportRequirement
```

Exact transport capability required before a dynamic route may execute.

Keeping this separate from the dispatch result makes impossible states
such as `TransportRequired(Complete)` unrepresentable.

**Variants:**

- `AsyncRequest`
- `StreamingRequestBody`
- `StreamingResponse`
- `WebSocket`

---

### <a id="ApplicationDispatchResult"></a>`ApplicationDispatchResult` `🔓 export`

> 📄 `application_contract.vx` L21-25

```vex
export enum ApplicationDispatchResult
```

Result of dispatching one fully materialized request. Protocol transports

can execute the synchronous buffered lane without importing Fiber's
concrete App owner; dynamic lanes remain typed and user code is not entered
until the owning transport explicitly supports the required capability.

**Variants:**

- `Complete`
- `TransportRequired`
- `Invalid`

---

### <a id="H2AsyncTaskResult"></a>`H2AsyncTaskResult`

> 📄 `app.vx` L300-303

```vex
enum H2AsyncTaskResult
```

**Variants:**

- `Response`
- `Invalid`

---

### <a id="DispatchResult"></a>`DispatchResult`

> 📄 `app.vx` L447-450

```vex
enum DispatchResult
```

**Variants:**

- `Complete`
- `Async`

---

### <a id="ApplicationLane"></a>`ApplicationLane`

> 📄 `app.vx` L456-463

```vex
enum ApplicationLane
```

Protocol-neutral result of dispatching one fully materialized request.

Buffered handlers are completed synchronously; lanes that require a
transport owner are reported structurally so HTTP/1, HTTP/2 and future
HTTP/3 loops can install their own writer/scheduler before user code runs.

**Variants:**

- `Direct`
- `Buffered`
- `Async`
- `StreamingRequestBody`
- `Streaming`
- `WebSocket`

---

### <a id="ResponseStreamEvent"></a>`ResponseStreamEvent` `🔓 export`

> 📄 `ctx.vx` L63-68

```vex
export enum ResponseStreamEvent
```

Protocol-neutral task-to-worker response stream events. One producer waits

for an acknowledgement after every event, bounding ownership to one chunk
per stream and coupling backpressure to actual transport progress.

**Variants:**

- `Begin`
- `Chunk`
- `Finish`
- `Failed`

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `lookupFd`[↗](#ResponseStreamEvent.lookupFd) | `export fn (self: &amp;ResponseStreamEvent) lookupFd():` |  |

---

### <a id="H2TransportTurn"></a>`H2TransportTurn` `🔓 export`

> 📄 `h2_transport.vx` L85-92

```vex
export enum H2TransportTurn
```

**Variants:**

- `Progress`
- `NeedMore`
- `OutputBackpressure`
- `Draining`
- `Closed`
- `Invalid`

---

### <a id="H2AsyncCompletionResult"></a>`H2AsyncCompletionResult` `🔓 export`

> 📄 `h2_transport.vx` L171-176

```vex
export enum H2AsyncCompletionResult
```

**Variants:**

- `Queued`
- `Reset`
- `Stale`
- `Failed`

---

### <a id="H2ResponseStreamResult"></a>`H2ResponseStreamResult` `🔓 export`

> 📄 `h2_transport.vx` L178-184

```vex
export enum H2ResponseStreamResult
```

**Variants:**

- `Queued`
- `AwaitingWire`
- `Acknowledged`
- `Stale`
- `Failed`

---

### <a id="H2ApplicationRequestResult"></a>`H2ApplicationRequestResult` `🔓 export`

> 📄 `h2_application.vx` L44-47

```vex
export enum H2ApplicationRequestResult
```

**Variants:**

- `Ready`
- `Invalid`

---

### <a id="H2ApplicationResponseResult"></a>`H2ApplicationResponseResult` `🔓 export`

> 📄 `h2_application.vx` L59-62

```vex
export enum H2ApplicationResponseResult
```

**Variants:**

- `Ready`
- `Invalid`

---

### <a id="H2BufferedStreamResult"></a>`H2BufferedStreamResult` `🔓 export`

> 📄 `h2_application.vx` L74-78

```vex
export enum H2BufferedStreamResult
```

**Variants:**

- `NeedMore`
- `Complete`
- `Error`

---

### <a id="H2BufferedDispatchResult"></a>`H2BufferedDispatchResult` `🔓 export`

> 📄 `h2_application.vx` L92-96

```vex
export enum H2BufferedDispatchResult
```

**Variants:**

- `Ready`
- `TransportRequired`
- `Invalid`

---

### <a id="H2BufferedOwnedDispatchResult"></a>`H2BufferedOwnedDispatchResult` `🔓 export`

> 📄 `h2_application.vx` L100-104

```vex
export enum H2BufferedOwnedDispatchResult
```

Registry-level dispatch result. Unlike the borrowed stream classifier, a

dynamic result owns the complete task-safe request removed from the set.

**Variants:**

- `Ready`
- `TransportRequired`
- `Invalid`

---

### <a id="H2BufferedOpenResult"></a>`H2BufferedOpenResult` `🔓 export`

> 📄 `h2_application.vx` L114-120

```vex
export enum H2BufferedOpenResult
```

**Variants:**

- `Receiving`
- `Ready`
- `Duplicate`
- `Full`
- `Error`

---

### <a id="H2ApplicationBodyResult"></a>`H2ApplicationBodyResult` `🔓 export`

> 📄 `h2_application.vx` L546-550

```vex
export enum H2ApplicationBodyResult
```

**Variants:**

- `NeedMore`
- `Complete`
- `Error`

---

### <a id="H2ApplicationIngressResult"></a>`H2ApplicationIngressResult` `🔓 export`

> 📄 `h2_session.vx` L48-57

```vex
export enum H2ApplicationIngressResult
```

Application interpretation of one already-validated inbound frame. `Pass`

preserves control/extension events for the transport owner; borrowed views
remain valid only for the original recvFrame/recvBytes handling turn.

**Variants:**

- `Pass`
- `Receiving`
- `Response`
- `TransportRequired`
- `ResetRequired`
- `PeerReset`
- `ConnectionError`
- `Invalid`

---

### <a id="H2EgressEnqueueResult"></a>`H2EgressEnqueueResult` `🔓 export`

> 📄 `h2_egress.vx` L51-56

```vex
export enum H2EgressEnqueueResult
```

**Variants:**

- `Queued`
- `Duplicate`
- `Full`
- `Invalid`

---

### <a id="H2EgressCancelResult"></a>`H2EgressCancelResult` `🔓 export`

> 📄 `h2_egress.vx` L64-68

```vex
export enum H2EgressCancelResult
```

Cancellation is deliberately structural. A response which has not entered

HPACK, or a DATA owner whose field block is already on the wire, can be
released independently. Once HPACK has committed an active field block,
however, silently dropping its remaining bytes would desynchronize the
connection compression context. The transport must drain that block or
abort the whole connection.

**Variants:**

- `Cancelled`
- `NotFound`
- `ConnectionAbortRequired`

---

### <a id="H2EgressWriteResult"></a>`H2EgressWriteResult` `🔓 export`

> 📄 `h2_egress.vx` L70-81

```vex
export enum H2EgressWriteResult
```

**Variants:**

- `Header`
- `Data`
- `OutputTooSmall`
- `FlowBlocked`
- `Empty`
- `StreamError`
- `ConnectionError`
- `Invalid`

---

## Functions

### <a id="makeRequest"></a>`makeRequest`

> 📄 `ctx.test.vx` L15-22

```vex
fn makeRequest(method: str, path: str, query: str, body: str): Request
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `method` | `str` |  |
| `path` | `str` |  |
| `query` | `str` |  |
| `body` | `str` |  |

**Returns:** `Request`

---

### <a id="test_ctx_new"></a>`test_ctx_new`

> 📄 `ctx.test.vx` L26-31

```vex
fn test_ctx_new(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ctx_default_status"></a>`test_ctx_default_status`

> 📄 `ctx.test.vx` L33-37

```vex
fn test_ctx_default_status(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ctx_method"></a>`test_ctx_method`

> 📄 `ctx.test.vx` L41-45

```vex
fn test_ctx_method(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ctx_path"></a>`test_ctx_path`

> 📄 `ctx.test.vx` L47-51

```vex
fn test_ctx_path(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ctx_body"></a>`test_ctx_body`

> 📄 `ctx.test.vx` L53-57

```vex
fn test_ctx_body(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ctx_header"></a>`test_ctx_header`

> 📄 `ctx.test.vx` L59-68

```vex
fn test_ctx_header(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ctx_content_type"></a>`test_ctx_content_type`

> 📄 `ctx.test.vx` L70-76

```vex
fn test_ctx_content_type(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ctx_is_json"></a>`test_ctx_is_json`

> 📄 `ctx.test.vx` L78-84

```vex
fn test_ctx_is_json(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ctx_query_single"></a>`test_ctx_query_single`

> 📄 `ctx.test.vx` L88-92

```vex
fn test_ctx_query_single(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ctx_query_multiple"></a>`test_ctx_query_multiple`

> 📄 `ctx.test.vx` L94-100

```vex
fn test_ctx_query_multiple(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ctx_query_missing"></a>`test_ctx_query_missing`

> 📄 `ctx.test.vx` L102-106

```vex
fn test_ctx_query_missing(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ctx_query_empty"></a>`test_ctx_query_empty`

> 📄 `ctx.test.vx` L108-112

```vex
fn test_ctx_query_empty(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ctx_params_empty"></a>`test_ctx_params_empty`

> 📄 `ctx.test.vx` L116-120

```vex
fn test_ctx_params_empty(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ctx_params_manual_set"></a>`test_ctx_params_manual_set`

> 📄 `ctx.test.vx` L122-131

```vex
fn test_ctx_params_manual_set(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ctx_params_multiple"></a>`test_ctx_params_multiple`

> 📄 `ctx.test.vx` L133-148

```vex
fn test_ctx_params_multiple(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ctx_locals_set_get"></a>`test_ctx_locals_set_get`

> 📄 `ctx.test.vx` L152-157

```vex
fn test_ctx_locals_set_get(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ctx_locals_missing"></a>`test_ctx_locals_missing`

> 📄 `ctx.test.vx` L159-163

```vex
fn test_ctx_locals_missing(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ctx_locals_overwrite"></a>`test_ctx_locals_overwrite`

> 📄 `ctx.test.vx` L165-171

```vex
fn test_ctx_locals_overwrite(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ctx_locals_multiple"></a>`test_ctx_locals_multiple`

> 📄 `ctx.test.vx` L173-182

```vex
fn test_ctx_locals_multiple(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ctx_status"></a>`test_ctx_status`

> 📄 `ctx.test.vx` L186-191

```vex
fn test_ctx_status(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ctx_type"></a>`test_ctx_type`

> 📄 `ctx.test.vx` L193-198

```vex
fn test_ctx_type(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ctx_set_header"></a>`test_ctx_set_header`

> 📄 `ctx.test.vx` L200-205

```vex
fn test_ctx_set_header(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ctx_chained_response"></a>`test_ctx_chained_response`

> 📄 `ctx.test.vx` L207-216

```vex
fn test_ctx_chained_response(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="maskedFrame"></a>`maskedFrame`

> 📄 `ws_session.test.vx` L14-32

```vex
fn maskedFrame(opcode: u8, fin: bool, payload: str): Vec<u8>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `opcode` | `u8` |  |
| `fin` | `bool` |  |
| `payload` | `str` |  |

**Returns:** `Vec&lt;u8&gt;`

---

### <a id="appendFrame"></a>`appendFrame`

> 📄 `ws_session.test.vx` L34-40

```vex
fn appendFrame(destination: &Vec<u8>!, source: &Vec<u8>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `destination` | `&amp;Vec&lt;u8&gt;!` |  |
| `source` | `&amp;Vec&lt;u8&gt;` |  |

---

### <a id="upgradeRequest"></a>`upgradeRequest`

> 📄 `ws_session.test.vx` L42-53

```vex
fn upgradeRequest(): Request
```

**Returns:** `Request`

---

### <a id="test_ws_session_queues_validated_upgrade_without_direct_write"></a>`test_ws_session_queues_validated_upgrade_without_direct_write`

> 📄 `ws_session.test.vx` L55-65

```vex
fn test_ws_session_queues_validated_upgrade_without_direct_write(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_session_keeps_supplied_opaque_identity"></a>`test_ws_session_keeps_supplied_opaque_identity`

> 📄 `ws_session.test.vx` L67-70

```vex
fn test_ws_session_keeps_supplied_opaque_identity(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_session_retains_negotiated_subprotocol"></a>`test_ws_session_retains_negotiated_subprotocol`

> 📄 `ws_session.test.vx` L72-80

```vex
fn test_ws_session_retains_negotiated_subprotocol(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_session_queues_arena_safe_validated_key_capability"></a>`test_ws_session_queues_arena_safe_validated_key_capability`

> 📄 `ws_session.test.vx` L82-92

```vex
fn test_ws_session_queues_arena_safe_validated_key_capability(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_session_preserves_fragmented_input_and_emits_one_message"></a>`test_ws_session_preserves_fragmented_input_and_emits_one_message`

> 📄 `ws_session.test.vx` L94-123

```vex
fn test_ws_session_preserves_fragmented_input_and_emits_one_message(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_session_queues_ping_reply_without_sync_socket_write"></a>`test_ws_session_queues_ping_reply_without_sync_socket_write`

> 📄 `ws_session.test.vx` L125-139

```vex
fn test_ws_session_queues_ping_reply_without_sync_socket_write(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_session_advances_one_frame_per_turn"></a>`test_ws_session_advances_one_frame_per_turn`

> 📄 `ws_session.test.vx` L141-164

```vex
fn test_ws_session_advances_one_frame_per_turn(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_session_rejects_unmasked_client_input"></a>`test_ws_session_rejects_unmasked_client_input`

> 📄 `ws_session.test.vx` L166-182

```vex
fn test_ws_session_rejects_unmasked_client_input(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_session_rejects_invalid_outbound_close_payload"></a>`test_ws_session_rejects_invalid_outbound_close_payload`

> 📄 `ws_session.test.vx` L184-191

```vex
fn test_ws_session_rejects_invalid_outbound_close_payload(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_session_echoes_close_then_becomes_drain_only"></a>`test_ws_session_echoes_close_then_becomes_drain_only`

> 📄 `ws_session.test.vx` L193-210

```vex
fn test_ws_session_echoes_close_then_becomes_drain_only(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="liveH2AsyncHandler"></a>`liveH2AsyncHandler` `⚡ async`

> 📄 `h2_async_live.test.vx` L8-13

```vex
fn liveH2AsyncHandler(ctx: &Ctx!, _next: &AsyncPipelineNext!, _context: &Context)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |
| `_next` | `&amp;AsyncPipelineNext!` |  |
| `_context` | `&amp;Context` |  |

---

### <a id="test_live_h2_async_route_returns_through_worker_owned_completion_lane"></a>`test_live_h2_async_route_returns_through_worker_owned_completion_lane`

> 📄 `h2_async_live.test.vx` L15-49

```vex
fn test_live_h2_async_route_returns_through_worker_owned_completion_lane()
```

---

### <a id="http1SyncHandler"></a>`http1SyncHandler`

> 📄 `http1_sync_live.test.vx` L11-13

```vex
fn http1SyncHandler(ctx: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |

---

### <a id="reserveHttp1SyncPort"></a>`reserveHttp1SyncPort`

> 📄 `http1_sync_live.test.vx` L15-28

```vex
fn reserveHttp1SyncPort(): u16
```

**Returns:** `u16`

---

### <a id="recvHttp1SyncWithin"></a>`recvHttp1SyncWithin`

> 📄 `http1_sync_live.test.vx` L30-40

```vex
fn recvHttp1SyncWithin(channel: &Channel<i32>, attempts: i32): Option<i32>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `channel` | `&amp;Channel&lt;i32&gt;` |  |
| `attempts` | `i32` |  |

**Returns:** `Option&lt;i32&gt;`

---

### <a id="http1SyncWireContains"></a>`http1SyncWireContains`

> 📄 `http1_sync_live.test.vx` L42-48

```vex
fn http1SyncWireContains(wire: &Vec<u8>, marker: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `wire` | `&amp;Vec&lt;u8&gt;` |  |
| `marker` | `str` |  |

**Returns:** `bool`

---

### <a id="test_http1_sync_profile_serves_and_stops_within_bounds"></a>`test_http1_sync_profile_serves_and_stops_within_bounds`

> 📄 `http1_sync_live.test.vx` L50-140

```vex
fn test_http1_sync_profile_serves_and_stops_within_bounds()
```

---

### <a id="test_response_default_status"></a>`test_response_default_status`

> 📄 `response.test.vx` L15-18

```vex
fn test_response_default_status(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_default_not_sent"></a>`test_response_default_not_sent`

> 📄 `response.test.vx` L20-23

```vex
fn test_response_default_not_sent(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_default_empty_body"></a>`test_response_default_empty_body`

> 📄 `response.test.vx` L25-28

```vex
fn test_response_default_empty_body(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_send_all_empty_is_a_noop"></a>`test_send_all_empty_is_a_noop`

> 📄 `response.test.vx` L30-33

```vex
fn test_send_all_empty_is_a_noop(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_send_all_rejects_null_nonempty_buffer"></a>`test_send_all_rejects_null_nonempty_buffer`

> 📄 `response.test.vx` L35-38

```vex
fn test_send_all_rejects_null_nonempty_buffer(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_status_chaining"></a>`test_response_status_chaining`

> 📄 `response.test.vx` L42-46

```vex
fn test_response_status_chaining(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_content_type"></a>`test_response_content_type`

> 📄 `response.test.vx` L48-52

```vex
fn test_response_content_type(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_header"></a>`test_response_header`

> 📄 `response.test.vx` L54-58

```vex
fn test_response_header(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_set_body"></a>`test_response_set_body`

> 📄 `response.test.vx` L60-64

```vex
fn test_response_set_body(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_chained_builder"></a>`test_response_chained_builder`

> 📄 `response.test.vx` L66-74

```vex
fn test_response_chained_builder(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_status_overwrite"></a>`test_response_status_overwrite`

> 📄 `response.test.vx` L78-83

```vex
fn test_response_status_overwrite(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_multiple_headers"></a>`test_response_multiple_headers`

> 📄 `response.test.vx` L87-94

```vex
fn test_response_multiple_headers(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_header_replace"></a>`test_response_header_replace`

> 📄 `response.test.vx` L96-102

```vex
fn test_response_header_replace(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_encode_exact_http11"></a>`test_response_encode_exact_http11`

> 📄 `response.test.vx` L104-114

```vex
fn test_response_encode_exact_http11(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_encode_reuses_storage"></a>`test_response_encode_reuses_storage`

> 📄 `response.test.vx` L116-126

```vex
fn test_response_encode_reuses_storage(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_stream_headers_frame_exact_body_length"></a>`test_response_stream_headers_frame_exact_body_length`

> 📄 `response.test.vx` L128-141

```vex
fn test_response_stream_headers_frame_exact_body_length(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_bodyless_status_never_frames_or_emits_payload"></a>`test_response_bodyless_status_never_frames_or_emits_payload`

> 📄 `response.test.vx` L143-155

```vex
fn test_response_bodyless_status_never_frames_or_emits_payload(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_head_suppresses_bytes_but_preserves_content_length"></a>`test_response_head_suppresses_bytes_but_preserves_content_length`

> 📄 `response.test.vx` L157-167

```vex
fn test_response_head_suppresses_bytes_but_preserves_content_length(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_stream_headers_report_bodyless_status_and_suppress_stream"></a>`test_response_stream_headers_report_bodyless_status_and_suppress_stream`

> 📄 `response.test.vx` L169-180

```vex
fn test_response_stream_headers_report_bodyless_status_and_suppress_stream(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_chunked_headers_and_frames_are_canonical"></a>`test_response_chunked_headers_and_frames_are_canonical`

> 📄 `response.test.vx` L182-196

```vex
fn test_response_chunked_headers_and_frames_are_canonical(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_chunked_head_omits_unknown_length_framing"></a>`test_response_chunked_head_omits_unknown_length_framing`

> 📄 `response.test.vx` L198-207

```vex
fn test_response_chunked_head_omits_unknown_length_framing(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_default_content_type_does_not_duplicate_case_variant"></a>`test_default_content_type_does_not_duplicate_case_variant`

> 📄 `response.test.vx` L209-221

```vex
fn test_default_content_type_does_not_duplicate_case_variant(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_encoder_rejects_injected_or_invalid_headers"></a>`test_response_encoder_rejects_injected_or_invalid_headers`

> 📄 `response.test.vx` L226-238

```vex
fn test_response_encoder_rejects_injected_or_invalid_headers(t: &TestCtx!)
```

`Headers` is intentionally reusable outside HTTP wire encoding. Response

serialization must therefore remain the final defense against an
application-provided CR/LF injection attempt.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="liveWsOpen"></a>`liveWsOpen`

> 📄 `ws_live.test.vx` L15-22

```vex
fn liveWsOpen(session: &WsSession!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `session` | `&amp;WsSession!` |  |

---

### <a id="liveWsMessage"></a>`liveWsMessage`

> 📄 `ws_live.test.vx` L24-34

```vex
fn liveWsMessage(session: &WsSession!, message: WsMessage)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `session` | `&amp;WsSession!` |  |
| `message` | `WsMessage` |  |

---

### <a id="liveWsClose"></a>`liveWsClose`

> 📄 `ws_live.test.vx` L36-36

```vex
fn liveWsClose(id: u64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `id` | `u64` |  |

---

### <a id="reserveWsLoopbackPort"></a>`reserveWsLoopbackPort`

> 📄 `ws_live.test.vx` L38-51

```vex
fn reserveWsLoopbackPort(): u16
```

**Returns:** `u16`

---

### <a id="recvWsWithin"></a>`recvWsWithin`

> 📄 `ws_live.test.vx` L53-63

```vex
fn recvWsWithin(channel: &Channel<i32>, attempts: i32): Option<i32>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `channel` | `&amp;Channel&lt;i32&gt;` |  |
| `attempts` | `i32` |  |

**Returns:** `Option&lt;i32&gt;`

---

### <a id="appendWsBytes"></a>`appendWsBytes`

> 📄 `ws_live.test.vx` L65-71

```vex
fn appendWsBytes(destination: &Vec<u8>!, source: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `destination` | `&amp;Vec&lt;u8&gt;!` |  |
| `source` | `str` |  |

---

### <a id="appendMaskedWsText"></a>`appendMaskedWsText`

> 📄 `ws_live.test.vx` L73-87

```vex
fn appendMaskedWsText(destination: &Vec<u8>!, payload: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `destination` | `&amp;Vec&lt;u8&gt;!` |  |
| `payload` | `str` |  |

---

### <a id="liveWireContains"></a>`liveWireContains`

> 📄 `ws_live.test.vx` L89-95

```vex
fn liveWireContains(wire: &Vec<u8>, marker: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `wire` | `&amp;Vec&lt;u8&gt;` |  |
| `marker` | `str` |  |

**Returns:** `bool`

---

### <a id="liveWireHasEmptyCloseFrame"></a>`liveWireHasEmptyCloseFrame`

> 📄 `ws_live.test.vx` L97-106

```vex
fn liveWireHasEmptyCloseFrame(wire: &Vec<u8>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `wire` | `&amp;Vec&lt;u8&gt;` |  |

**Returns:** `bool`

---

### <a id="test_live_ws_handoff_negotiates_frames_and_drains_close"></a>`test_live_ws_handoff_negotiates_frames_and_drains_close`

> 📄 `ws_live.test.vx` L108-237

```vex
fn test_live_ws_handoff_negotiates_frames_and_drains_close()
```

---

### <a id="h2TransportHandler"></a>`h2TransportHandler`

> 📄 `h2_transport.test.vx` L23-26

```vex
fn h2TransportHandler(ctx: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |

---

### <a id="h2TransportStreamHandler"></a>`h2TransportStreamHandler`

> 📄 `h2_transport.test.vx` L28-31

```vex
fn h2TransportStreamHandler(_ctx: &Ctx!, _out: &ResponseStreamWriter!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_ctx` | `&amp;Ctx!` |  |
| `_out` | `&amp;ResponseStreamWriter!` |  |

---

### <a id="h2TransportAsyncHandler"></a>`h2TransportAsyncHandler` `⚡ async`

> 📄 `h2_transport.test.vx` L33-37

```vex
fn h2TransportAsyncHandler(ctx: &Ctx!, _next: &AsyncPipelineNext!, _cx: &Context)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |
| `_next` | `&amp;AsyncPipelineNext!` |  |
| `_cx` | `&amp;Context` |  |

---

### <a id="appendFrame"></a>`appendFrame`

> 📄 `h2_transport.test.vx` L39-62

```vex
fn appendFrame(output: &Vec<u8>!, frameType: u8, flags: u8, streamId: u32, payload: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `output` | `&amp;Vec&lt;u8&gt;!` |  |
| `frameType` | `u8` |  |
| `flags` | `u8` |  |
| `streamId` | `u32` |  |
| `payload` | `str` |  |

**Returns:** `bool`

---

### <a id="queuedFramesContain"></a>`queuedFramesContain`

> 📄 `h2_transport.test.vx` L64-75

```vex
fn queuedFramesContain(wire: str, start: usize, wanted: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `wire` | `str` |  |
| `start` | `usize` |  |
| `wanted` | `u8` |  |

**Returns:** `bool`

---

### <a id="queuedFrameCount"></a>`queuedFrameCount`

> 📄 `h2_transport.test.vx` L77-89

```vex
fn queuedFrameCount(wire: str, start: usize, wanted: u8): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `wire` | `str` |  |
| `start` | `usize` |  |
| `wanted` | `u8` |  |

**Returns:** `usize`

---

### <a id="test_h2_transport_composes_preface_control_dispatch_and_response"></a>`test_h2_transport_composes_preface_control_dispatch_and_response`

> 📄 `h2_transport.test.vx` L91-156

```vex
fn test_h2_transport_composes_preface_control_dispatch_and_response(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_transport_preface_is_incremental_and_invalid_prefix_fails_closed"></a>`test_h2_transport_preface_is_incremental_and_invalid_prefix_fails_closed`

> 📄 `h2_transport.test.vx` L158-198

```vex
fn test_h2_transport_preface_is_incremental_and_invalid_prefix_fails_closed(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_transport_graceful_drain_queues_current_boundary_goaway"></a>`test_h2_transport_graceful_drain_queues_current_boundary_goaway`

> 📄 `h2_transport.test.vx` L200-214

```vex
fn test_h2_transport_graceful_drain_queues_current_boundary_goaway(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_transport_owns_settings_and_ping_acknowledgements"></a>`test_h2_transport_owns_settings_and_ping_acknowledgements`

> 📄 `h2_transport.test.vx` L216-245

```vex
fn test_h2_transport_owns_settings_and_ping_acknowledgements(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_transport_returns_data_credit_before_terminal_response"></a>`test_h2_transport_returns_data_credit_before_terminal_response`

> 📄 `h2_transport.test.vx` L247-284

```vex
fn test_h2_transport_returns_data_credit_before_terminal_response(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_transport_stream_route_is_bounded_by_wire_acknowledgements"></a>`test_h2_transport_stream_route_is_bounded_by_wire_acknowledgements`

> 📄 `h2_transport.test.vx` L286-393

```vex
fn test_h2_transport_stream_route_is_bounded_by_wire_acknowledgements(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_transport_peer_reset_cancels_stream_producer_and_rejects_stale_events"></a>`test_h2_transport_peer_reset_cancels_stream_producer_and_rejects_stale_events`

> 📄 `h2_transport.test.vx` L395-472

```vex
fn test_h2_transport_peer_reset_cancels_stream_producer_and_rejects_stale_events(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_transport_abort_cancels_running_stream_producer"></a>`test_h2_transport_abort_cancels_running_stream_producer`

> 📄 `h2_transport.test.vx` L474-518

```vex
fn test_h2_transport_abort_cancels_running_stream_producer(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_transport_async_request_keeps_descriptor_and_commits_task_response"></a>`test_h2_transport_async_request_keeps_descriptor_and_commits_task_response`

> 📄 `h2_transport.test.vx` L520-588

```vex
fn test_h2_transport_async_request_keeps_descriptor_and_commits_task_response(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_transport_peer_reset_cancels_task_and_rejects_late_completion"></a>`test_h2_transport_peer_reset_cancels_task_and_rejects_late_completion`

> 📄 `h2_transport.test.vx` L590-646

```vex
fn test_h2_transport_peer_reset_cancels_task_and_rejects_late_completion(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_transport_deadline_paths_retain_terminal_goaway"></a>`test_h2_transport_deadline_paths_retain_terminal_goaway`

> 📄 `h2_transport.test.vx` L648-670

```vex
fn test_h2_transport_deadline_paths_retain_terminal_goaway(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_transport_rejects_request_before_initial_peer_settings"></a>`test_h2_transport_rejects_request_before_initial_peer_settings`

> 📄 `h2_transport.test.vx` L672-699

```vex
fn test_h2_transport_rejects_request_before_initial_peer_settings(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_connbuf_new"></a>`test_connbuf_new`

> 📄 `connection.test.vx` L13-18

```vex
fn test_connbuf_new(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_connbuf_advance"></a>`test_connbuf_advance`

> 📄 `connection.test.vx` L20-25

```vex
fn test_connbuf_advance(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_connbuf_consume"></a>`test_connbuf_consume`

> 📄 `connection.test.vx` L27-33

```vex
fn test_connbuf_consume(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_connbuf_consume_all_resets"></a>`test_connbuf_consume_all_resets`

> 📄 `connection.test.vx` L35-43

```vex
fn test_connbuf_consume_all_resets(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_connbuf_compact"></a>`test_connbuf_compact`

> 📄 `connection.test.vx` L45-59

```vex
fn test_connbuf_compact(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_connbuf_compact_noop_at_zero"></a>`test_connbuf_compact_noop_at_zero`

> 📄 `connection.test.vx` L61-68

```vex
fn test_connbuf_compact_noop_at_zero(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_connbuf_free_space"></a>`test_connbuf_free_space`

> 📄 `connection.test.vx` L70-76

```vex
fn test_connbuf_free_space(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_connbuf_grow"></a>`test_connbuf_grow`

> 📄 `connection.test.vx` L78-84

```vex
fn test_connbuf_grow(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_connbuf_reset"></a>`test_connbuf_reset`

> 📄 `connection.test.vx` L86-94

```vex
fn test_connbuf_reset(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_connection_new"></a>`test_connection_new`

> 📄 `connection.test.vx` L98-104

```vex
fn test_connection_new(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_connection_reset"></a>`test_connection_reset`

> 📄 `connection.test.vx` L106-113

```vex
fn test_connection_reset(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_connection_find_header_end_empty"></a>`test_connection_find_header_end_empty`

> 📄 `connection.test.vx` L115-119

```vex
fn test_connection_find_header_end_empty(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_connection_find_header_end_partial"></a>`test_connection_find_header_end_partial`

> 📄 `connection.test.vx` L121-129

```vex
fn test_connection_find_header_end_partial(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_connection_find_header_end_complete"></a>`test_connection_find_header_end_complete`

> 📄 `connection.test.vx` L131-145

```vex
fn test_connection_find_header_end_complete(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_connection_consume_request"></a>`test_connection_consume_request`

> 📄 `connection.test.vx` L147-154

```vex
fn test_connection_consume_request(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_header_and_body"></a>`test_response_header_and_body`

> 📄 `debug_assign.test.vx` L4-11

```vex
fn test_response_header_and_body(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_status_2xx_values"></a>`test_status_2xx_values`

> 📄 `status.test.vx` L21-28

```vex
fn test_status_2xx_values(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_status_3xx_values"></a>`test_status_3xx_values`

> 📄 `status.test.vx` L30-36

```vex
fn test_status_3xx_values(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_status_4xx_values"></a>`test_status_4xx_values`

> 📄 `status.test.vx` L38-49

```vex
fn test_status_4xx_values(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_status_5xx_values"></a>`test_status_5xx_values`

> 📄 `status.test.vx` L51-57

```vex
fn test_status_5xx_values(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_status_text_2xx"></a>`test_status_text_2xx`

> 📄 `status.test.vx` L61-67

```vex
fn test_status_text_2xx(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_status_text_3xx"></a>`test_status_text_3xx`

> 📄 `status.test.vx` L69-75

```vex
fn test_status_text_3xx(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_status_text_4xx"></a>`test_status_text_4xx`

> 📄 `status.test.vx` L77-88

```vex
fn test_status_text_4xx(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_status_text_5xx"></a>`test_status_text_5xx`

> 📄 `status.test.vx` L90-96

```vex
fn test_status_text_5xx(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_status_text_unknown"></a>`test_status_text_unknown`

> 📄 `status.test.vx` L98-102

```vex
fn test_status_text_unknown(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_status_content_semantics"></a>`test_status_content_semantics`

> 📄 `status.test.vx` L104-113

```vex
fn test_status_content_semantics(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="dummyRequest"></a>`dummyRequest`

> 📄 `router.test.vx` L21-27

```vex
fn dummyRequest(method: str, path: str): Request
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `method` | `str` |  |
| `path` | `str` |  |

**Returns:** `Request`

---

### <a id="dummyHandler"></a>`dummyHandler`

> 📄 `router.test.vx` L29-31

```vex
fn dummyHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="asyncDummyHandler"></a>`asyncDummyHandler` `⚡ async`

> 📄 `router.test.vx` L33-37

```vex
fn asyncDummyHandler(_ctx: &Ctx!, _next: &AsyncPipelineNext!, _context: &Context)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_ctx` | `&amp;Ctx!` |  |
| `_next` | `&amp;AsyncPipelineNext!` |  |
| `_context` | `&amp;Context` |  |

---

### <a id="asyncBodyDummyHandler"></a>`asyncBodyDummyHandler` `⚡ async`

> 📄 `router.test.vx` L39-44

```vex
fn asyncBodyDummyHandler(_ctx: &Ctx!, _body: &AsyncRequestBody!, _next: &AsyncBodyPipelineNext!, _context: &Context)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_ctx` | `&amp;Ctx!` |  |
| `_body` | `&amp;AsyncRequestBody!` |  |
| `_next` | `&amp;AsyncBodyPipelineNext!` |  |
| `_context` | `&amp;Context` |  |

---

### <a id="test_static_route_match"></a>`test_static_route_match`

> 📄 `router.test.vx` L48-80

```vex
fn test_static_route_match(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_static_route_no_match"></a>`test_static_route_no_match`

> 📄 `router.test.vx` L82-94

```vex
fn test_static_route_no_match(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_method_mismatch"></a>`test_method_mismatch`

> 📄 `router.test.vx` L98-110

```vex
fn test_method_mismatch(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_multiple_methods_same_path"></a>`test_multiple_methods_same_path`

> 📄 `router.test.vx` L112-134

```vex
fn test_multiple_methods_same_path(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_param_route_match"></a>`test_param_route_match`

> 📄 `router.test.vx` L138-155

```vex
fn test_param_route_match(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_param_route_multiple_params"></a>`test_param_route_multiple_params`

> 📄 `router.test.vx` L157-171

```vex
fn test_param_route_multiple_params(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_param_route_string_value"></a>`test_param_route_string_value`

> 📄 `router.test.vx` L173-186

```vex
fn test_param_route_string_value(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_dynamic_hot_cache_replays_params"></a>`test_dynamic_hot_cache_replays_params`

> 📄 `router.test.vx` L188-205

```vex
fn test_dynamic_hot_cache_replays_params(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_frozen_router_extracts_params"></a>`test_frozen_router_extracts_params`

> 📄 `router.test.vx` L207-218

```vex
fn test_frozen_router_extracts_params(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="routeMiddleware"></a>`routeMiddleware`

> 📄 `router.test.vx` L220-222

```vex
fn routeMiddleware(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="test_route_middleware_does_not_accumulate_on_reused_context"></a>`test_route_middleware_does_not_accumulate_on_reused_context`

> 📄 `router.test.vx` L224-239

```vex
fn test_route_middleware_does_not_accumulate_on_reused_context(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_wildcard_route"></a>`test_wildcard_route`

> 📄 `router.test.vx` L243-256

```vex
fn test_wildcard_route(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_wildcard_single_segment"></a>`test_wildcard_single_segment`

> 📄 `router.test.vx` L258-271

```vex
fn test_wildcard_single_segment(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_static_before_param"></a>`test_static_before_param`

> 📄 `router.test.vx` L275-291

```vex
fn test_static_before_param(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_trailing_slash_stripped"></a>`test_trailing_slash_stripped`

> 📄 `router.test.vx` L295-308

```vex
fn test_trailing_slash_stripped(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_root_path"></a>`test_root_path`

> 📄 `router.test.vx` L312-324

```vex
fn test_root_path(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_too_few_segments"></a>`test_too_few_segments`

> 📄 `router.test.vx` L328-340

```vex
fn test_too_few_segments(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_too_many_segments"></a>`test_too_many_segments`

> 📄 `router.test.vx` L342-354

```vex
fn test_too_many_segments(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_frozen_async_route_uses_structural_route_identity"></a>`test_frozen_async_route_uses_structural_route_identity`

> 📄 `router.test.vx` L356-371

```vex
fn test_frozen_async_route_uses_structural_route_identity(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_frozen_async_body_route_uses_structural_route_identity"></a>`test_frozen_async_body_route_uses_structural_route_identity`

> 📄 `router.test.vx` L373-388

```vex
fn test_frozen_async_body_route_uses_structural_route_identity(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="makeReq"></a>`makeReq`

> 📄 `static_serving.test.vx` L11-17

```vex
fn makeReq(method: str, path: str): Request
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `method` | `str` |  |
| `path` | `str` |  |

**Returns:** `Request`

---

### <a id="setupTestFiles"></a>`setupTestFiles`

> 📄 `static_serving.test.vx` L19-48

```vex
fn setupTestFiles(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="cleanupTestFiles"></a>`cleanupTestFiles`

> 📄 `static_serving.test.vx` L50-56

```vex
fn cleanupTestFiles(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_static_files_serving"></a>`test_static_files_serving`

> 📄 `static_serving.test.vx` L58-187

```vex
fn test_static_files_serving(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_static_files_group"></a>`test_static_files_group`

> 📄 `static_serving.test.vx` L189-219

```vex
fn test_static_files_group(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_new_headers_empty"></a>`test_new_headers_empty`

> 📄 `headers.test.vx` L11-14

```vex
fn test_new_headers_empty(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_set_and_get"></a>`test_set_and_get`

> 📄 `headers.test.vx` L16-20

```vex
fn test_set_and_get(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_get_missing_returns_empty"></a>`test_get_missing_returns_empty`

> 📄 `headers.test.vx` L22-25

```vex
fn test_get_missing_returns_empty(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_has_existing"></a>`test_has_existing`

> 📄 `headers.test.vx` L27-31

```vex
fn test_has_existing(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_has_missing"></a>`test_has_missing`

> 📄 `headers.test.vx` L33-36

```vex
fn test_has_missing(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_get_case_insensitive"></a>`test_get_case_insensitive`

> 📄 `headers.test.vx` L40-46

```vex
fn test_get_case_insensitive(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_has_case_insensitive"></a>`test_has_case_insensitive`

> 📄 `headers.test.vx` L48-53

```vex
fn test_has_case_insensitive(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_set_replaces_case_insensitive"></a>`test_set_replaces_case_insensitive`

> 📄 `headers.test.vx` L55-61

```vex
fn test_set_replaces_case_insensitive(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_set_replaces_value"></a>`test_set_replaces_value`

> 📄 `headers.test.vx` L65-71

```vex
fn test_set_replaces_value(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_add_allows_duplicates"></a>`test_add_allows_duplicates`

> 📄 `headers.test.vx` L75-80

```vex
fn test_add_allows_duplicates(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_add_does_not_replace"></a>`test_add_does_not_replace`

> 📄 `headers.test.vx` L82-89

```vex
fn test_add_does_not_replace(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_del_removes_all_matching"></a>`test_del_removes_all_matching`

> 📄 `headers.test.vx` L93-102

```vex
fn test_del_removes_all_matching(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_del_case_insensitive"></a>`test_del_case_insensitive`

> 📄 `headers.test.vx` L104-110

```vex
fn test_del_case_insensitive(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_del_nonexistent_noop"></a>`test_del_nonexistent_noop`

> 📄 `headers.test.vx` L112-117

```vex
fn test_del_nonexistent_noop(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_multiple_headers"></a>`test_multiple_headers`

> 📄 `headers.test.vx` L121-133

```vex
fn test_multiple_headers(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_empty_value"></a>`test_empty_value`

> 📄 `headers.test.vx` L137-142

```vex
fn test_empty_value(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_header_with_special_chars"></a>`test_header_with_special_chars`

> 📄 `headers.test.vx` L144-148

```vex
fn test_header_with_special_chars(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="liveH2StreamHandler"></a>`liveH2StreamHandler`

> 📄 `h2_stream_live.test.vx` L12-16

```vex
fn liveH2StreamHandler(ctx: &Ctx!, output: &ResponseStreamWriter!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |
| `output` | `&amp;ResponseStreamWriter!` |  |

---

### <a id="test_live_h2_stream_route_obeys_worker_owned_backpressure_and_shutdown"></a>`test_live_h2_stream_route_obeys_worker_owned_backpressure_and_shutdown`

> 📄 `h2_stream_live.test.vx` L18-55

```vex
fn test_live_h2_stream_route_obeys_worker_owned_backpressure_and_shutdown()
```

---

### <a id="liveH2SlowAsyncHandler"></a>`liveH2SlowAsyncHandler` `⚡ async`

> 📄 `h2_async_reset_live.test.vx` L9-15

```vex
fn liveH2SlowAsyncHandler(ctx: &Ctx!, _next: &AsyncPipelineNext!, _context: &Context)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |
| `_next` | `&amp;AsyncPipelineNext!` |  |
| `_context` | `&amp;Context` |  |

---

### <a id="test_live_h2_peer_reset_rejects_late_task_result_and_keeps_connection"></a>`test_live_h2_peer_reset_rejects_late_task_result_and_keeps_connection`

> 📄 `h2_async_reset_live.test.vx` L17-51

```vex
fn test_live_h2_peer_reset_rejects_late_task_result_and_keeps_connection()
```

---

### <a id="makeReq"></a>`makeReq`

> 📄 `app.test.vx` L16-22

```vex
fn makeReq(method: str, path: str): Request
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `method` | `str` |  |
| `path` | `str` |  |

**Returns:** `Request`

---

### <a id="stubHandler"></a>`stubHandler`

> 📄 `app.test.vx` L24-26

```vex
fn stubHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="notFoundStub"></a>`notFoundStub`

> 📄 `app.test.vx` L28-30

```vex
fn notFoundStub(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="streamStub"></a>`streamStub`

> 📄 `app.test.vx` L32-34

```vex
fn streamStub(c: &Ctx!, out: &ResponseStreamWriter!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |
| `out` | `&amp;ResponseStreamWriter!` |  |

---

### <a id="wsStub"></a>`wsStub`

> 📄 `app.test.vx` L36-41

```vex
fn wsStub(session: &WsSession!, message: WsMessage)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `session` | `&amp;WsSession!` |  |
| `message` | `WsMessage` |  |

---

### <a id="wsOpenStub"></a>`wsOpenStub`

> 📄 `app.test.vx` L43-45

```vex
fn wsOpenStub(session: &WsSession!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `session` | `&amp;WsSession!` |  |

---

### <a id="wsCloseStub"></a>`wsCloseStub`

> 📄 `app.test.vx` L47-47

```vex
fn wsCloseStub(id: u64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `id` | `u64` |  |

---

### <a id="asyncStub"></a>`asyncStub` `⚡ async`

> 📄 `app.test.vx` L49-55

```vex
fn asyncStub(ctx: &Ctx!, next: &AsyncPipelineNext!, context: &Context)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |
| `next` | `&amp;AsyncPipelineNext!` |  |
| `context` | `&amp;Context` |  |

---

### <a id="asyncBodyStub"></a>`asyncBodyStub` `⚡ async`

> 📄 `app.test.vx` L57-65

```vex
fn asyncBodyStub(ctx: &Ctx!, body: &AsyncRequestBody!, next: &AsyncBodyPipelineNext!, context: &Context)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |
| `body` | `&amp;AsyncRequestBody!` |  |
| `next` | `&amp;AsyncBodyPipelineNext!` |  |
| `context` | `&amp;Context` |  |

---

### <a id="test_app_new"></a>`test_app_new`

> 📄 `app.test.vx` L69-81

```vex
fn test_app_new(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_uses_explicit_config"></a>`test_app_uses_explicit_config`

> 📄 `app.test.vx` L83-94

```vex
fn test_app_uses_explicit_config(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_get_registers_route"></a>`test_app_get_registers_route`

> 📄 `app.test.vx` L98-102

```vex
fn test_app_get_registers_route(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_post_registers_route"></a>`test_app_post_registers_route`

> 📄 `app.test.vx` L104-108

```vex
fn test_app_post_registers_route(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_async_route_registers_structural_metadata"></a>`test_app_async_route_registers_structural_metadata`

> 📄 `app.test.vx` L110-120

```vex
fn test_app_async_route_registers_structural_metadata(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_async_routes_cover_all_http_methods"></a>`test_app_async_routes_cover_all_http_methods`

> 📄 `app.test.vx` L122-143

```vex
fn test_app_async_routes_cover_all_http_methods(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_request_body_stream_registers_early_handoff_metadata"></a>`test_app_request_body_stream_registers_early_handoff_metadata`

> 📄 `app.test.vx` L145-157

```vex
fn test_app_request_body_stream_registers_early_handoff_metadata(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_group_request_body_stream_inherits_only_async_body_middleware"></a>`test_group_request_body_stream_inherits_only_async_body_middleware`

> 📄 `app.test.vx` L159-173

```vex
fn test_group_request_body_stream_inherits_only_async_body_middleware(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_frozen_patch_route_keeps_parameter_capture"></a>`test_frozen_patch_route_keeps_parameter_capture`

> 📄 `app.test.vx` L175-184

```vex
fn test_frozen_patch_route_keeps_parameter_capture(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_get_stream_registers_route_and_preserves_endpoint_metadata"></a>`test_app_get_stream_registers_route_and_preserves_endpoint_metadata`

> 📄 `app.test.vx` L186-198

```vex
fn test_app_get_stream_registers_route_and_preserves_endpoint_metadata(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_head_stream_falls_back_to_get_metadata"></a>`test_app_head_stream_falls_back_to_get_metadata`

> 📄 `app.test.vx` L200-210

```vex
fn test_app_head_stream_falls_back_to_get_metadata(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_ws_registers_frozen_get_route_metadata"></a>`test_app_ws_registers_frozen_get_route_metadata`

> 📄 `app.test.vx` L212-224

```vex
fn test_app_ws_registers_frozen_get_route_metadata(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_ws_lifecycle_metadata_survives_frozen_lookup"></a>`test_app_ws_lifecycle_metadata_survives_frozen_lookup`

> 📄 `app.test.vx` L226-241

```vex
fn test_app_ws_lifecycle_metadata_survives_frozen_lookup(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_group_ws_preserves_group_middleware"></a>`test_group_ws_preserves_group_middleware`

> 📄 `app.test.vx` L243-257

```vex
fn test_group_ws_preserves_group_middleware(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_group_ws_lifecycle_preserves_prefix_and_hooks"></a>`test_group_ws_lifecycle_preserves_prefix_and_hooks`

> 📄 `app.test.vx` L259-274

```vex
fn test_group_ws_lifecycle_preserves_prefix_and_hooks(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_route_selects_server_preference_without_request_allocation"></a>`test_ws_route_selects_server_preference_without_request_allocation`

> 📄 `app.test.vx` L276-291

```vex
fn test_ws_route_selects_server_preference_without_request_allocation(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_group_ws_required_subprotocol_rejects_no_overlap"></a>`test_group_ws_required_subprotocol_rejects_no_overlap`

> 📄 `app.test.vx` L293-311

```vex
fn test_group_ws_required_subprotocol_rejects_no_overlap(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_stream_route_keeps_route_middleware_when_frozen"></a>`test_stream_route_keeps_route_middleware_when_frozen`

> 📄 `app.test.vx` L313-331

```vex
fn test_stream_route_keeps_route_middleware_when_frozen(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_repeated_freeze_keeps_one_route_middleware_source"></a>`test_repeated_freeze_keeps_one_route_middleware_source`

> 📄 `app.test.vx` L333-350

```vex
fn test_repeated_freeze_keeps_one_route_middleware_source(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_multiple_routes"></a>`test_app_multiple_routes`

> 📄 `app.test.vx` L352-360

```vex
fn test_app_multiple_routes(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_all_registers_seven"></a>`test_app_all_registers_seven`

> 📄 `app.test.vx` L362-366

```vex
fn test_app_all_registers_seven(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_use_middleware"></a>`test_app_use_middleware`

> 📄 `app.test.vx` L370-374

```vex
fn test_app_use_middleware(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_multiple_middlewares"></a>`test_app_multiple_middlewares`

> 📄 `app.test.vx` L376-382

```vex
fn test_app_multiple_middlewares(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="groupMiddleware"></a>`groupMiddleware`

> 📄 `app.test.vx` L384-386

```vex
fn groupMiddleware(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="test_group_middleware_is_attached_to_route"></a>`test_group_middleware_is_attached_to_route`

> 📄 `app.test.vx` L388-400

```vex
fn test_group_middleware_is_attached_to_route(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_nested_group_inherits_parent_middleware_when_frozen"></a>`test_nested_group_inherits_parent_middleware_when_frozen`

> 📄 `app.test.vx` L402-415

```vex
fn test_nested_group_inherits_parent_middleware_when_frozen(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_group_static_preserves_root_and_middleware_when_frozen"></a>`test_group_static_preserves_root_and_middleware_when_frozen`

> 📄 `app.test.vx` L417-431

```vex
fn test_group_static_preserves_root_and_middleware_when_frozen(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_router_finds_get"></a>`test_app_router_finds_get`

> 📄 `app.test.vx` L435-447

```vex
fn test_app_router_finds_get(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_router_param_extraction"></a>`test_app_router_param_extraction`

> 📄 `app.test.vx` L449-462

```vex
fn test_app_router_param_extraction(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_router_method_mismatch"></a>`test_app_router_method_mismatch`

> 📄 `app.test.vx` L464-476

```vex
fn test_app_router_method_mismatch(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_set_not_found"></a>`test_app_set_not_found`

> 📄 `app.test.vx` L480-488

```vex
fn test_app_set_not_found(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_patch_route"></a>`test_app_patch_route`

> 📄 `app.test.vx` L492-503

```vex
fn test_app_patch_route(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_head_route"></a>`test_app_head_route`

> 📄 `app.test.vx` L505-517

```vex
fn test_app_head_route(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_head_falls_back_to_get_route"></a>`test_app_head_falls_back_to_get_route`

> 📄 `app.test.vx` L519-530

```vex
fn test_app_head_falls_back_to_get_route(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_frozen_router_head_falls_back_to_get_route"></a>`test_frozen_router_head_falls_back_to_get_route`

> 📄 `app.test.vx` L532-544

```vex
fn test_frozen_router_head_falls_back_to_get_route(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_explicit_head_overrides_get_route"></a>`test_app_explicit_head_overrides_get_route`

> 📄 `app.test.vx` L546-563

```vex
fn test_app_explicit_head_overrides_get_route(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_app_options_route"></a>`test_app_options_route`

> 📄 `app.test.vx` L565-577

```vex
fn test_app_options_route(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_buffered_dispatch_reports_transport_owned_route_lanes"></a>`test_buffered_dispatch_reports_transport_owned_route_lanes`

> 📄 `app.test.vx` L579-625

```vex
fn test_buffered_dispatch_reports_transport_owned_route_lanes(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_buffered_dispatch_requires_frozen_valid_context"></a>`test_buffered_dispatch_requires_frozen_valid_context`

> 📄 `app.test.vx` L627-635

```vex
fn test_buffered_dispatch_requires_frozen_valid_context(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="request"></a>`request`

> 📄 `async_pipeline.test.vx` L10-17

```vex
fn request(): Request
```

**Returns:** `Request`

---

### <a id="outer"></a>`outer` `⚡ async`

> 📄 `async_pipeline.test.vx` L19-23

```vex
fn outer(ctx: &Ctx!, next: &AsyncPipelineNext!, context: &Context)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |
| `next` | `&amp;AsyncPipelineNext!` |  |
| `context` | `&amp;Context` |  |

---

### <a id="inner"></a>`inner` `⚡ async`

> 📄 `async_pipeline.test.vx` L25-29

```vex
fn inner(ctx: &Ctx!, next: &AsyncPipelineNext!, context: &Context)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |
| `next` | `&amp;AsyncPipelineNext!` |  |
| `context` | `&amp;Context` |  |

---

### <a id="endpoint"></a>`endpoint` `⚡ async`

> 📄 `async_pipeline.test.vx` L31-33

```vex
fn endpoint(ctx: &Ctx!, _next: &AsyncPipelineNext!, _context: &Context)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |
| `_next` | `&amp;AsyncPipelineNext!` |  |
| `_context` | `&amp;Context` |  |

---

### <a id="doubleNext"></a>`doubleNext` `⚡ async`

> 📄 `async_pipeline.test.vx` L35-42

```vex
fn doubleNext(ctx: &Ctx!, next: &AsyncPipelineNext!, context: &Context)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |
| `next` | `&amp;AsyncPipelineNext!` |  |
| `context` | `&amp;Context` |  |

---

### <a id="test_async_pipeline_preserves_nested_middleware_order"></a>`test_async_pipeline_preserves_nested_middleware_order` `🔓 export`

> 📄 `async_pipeline.test.vx` L44-61

```vex
export fn test_async_pipeline_preserves_nested_middleware_order(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_async_pipeline_never_replays_a_successor"></a>`test_async_pipeline_never_replays_a_successor` `🔓 export`

> 📄 `async_pipeline.test.vx` L63-79

```vex
export fn test_async_pipeline_never_replays_a_successor(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="liveH2Handler"></a>`liveH2Handler`

> 📄 `h2_live.test.vx` L11-14

```vex
fn liveH2Handler(ctx: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |

---

### <a id="test_live_h2_prior_knowledge_dispatches_and_drains_binary_response"></a>`test_live_h2_prior_knowledge_dispatches_and_drains_binary_response`

> 📄 `h2_live.test.vx` L16-50

```vex
fn test_live_h2_prior_knowledge_dispatches_and_drains_binary_response()
```

---

### <a id="byteString"></a>`byteString`

> 📄 `client.test.vx` L27-34

```vex
fn byteString(bytes: &Vec<u8>): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `bytes` | `&amp;Vec&lt;u8&gt;` |  |

**Returns:** `string`

---

### <a id="compressedResponse"></a>`compressedResponse`

> 📄 `client.test.vx` L36-55

```vex
fn compressedResponse(body: str, format: CompressionFormat, coding: str): ClientResponse
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `body` | `str` |  |
| `format` | `CompressionFormat` |  |
| `coding` | `str` |  |

**Returns:** `ClientResponse`

---

### <a id="loopbackListener"></a>`loopbackListener`

> 📄 `client.test.vx` L70-75

```vex
fn loopbackListener(): TcpListener
```

**Returns:** `TcpListener`

---

### <a id="test_client_defaults_are_bounded"></a>`test_client_defaults_are_bounded`

> 📄 `client.test.vx` L123-134

```vex
fn test_client_defaults_are_bounded(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_request_builder"></a>`test_client_request_builder`

> 📄 `client.test.vx` L136-148

```vex
fn test_client_request_builder(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_streaming_request_rejects_ambiguous_and_oversized_length"></a>`test_client_streaming_request_rejects_ambiguous_and_oversized_length`

> 📄 `client.test.vx` L150-193

```vex
fn test_client_streaming_request_rejects_ambiguous_and_oversized_length(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_rejects_transport_header_at_every_position"></a>`test_client_rejects_transport_header_at_every_position`

> 📄 `client.test.vx` L195-221

```vex
fn test_client_rejects_transport_header_at_every_position(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_rejects_malformed_virtual_host_before_connect"></a>`test_client_rejects_malformed_virtual_host_before_connect`

> 📄 `client.test.vx` L227-249

```vex
fn test_client_rejects_malformed_virtual_host_before_connect(t: &TestCtx!)
```

The client encoder emits `Host` itself, therefore its virtual-host input

must obey the same authority grammar as both server parser front doors.
Validation happens before connect, so this test deliberately never accepts
on the listener.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="clientRequestFailsInvalid"></a>`clientRequestFailsInvalid` `⚡ async`

> 📄 `client.test.vx` L251-259

```vex
fn clientRequestFailsInvalid(client: &HttpClient, request: &ClientRequest, endpoint: SocketAddr, context: &Context): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `client` | `&amp;HttpClient` |  |
| `request` | `&amp;ClientRequest` |  |
| `endpoint` | `SocketAddr` |  |
| `context` | `&amp;Context` |  |

**Returns:** `bool`

---

### <a id="test_client_rejects_duplicate_host_and_wrong_request_target_forms"></a>`test_client_rejects_duplicate_host_and_wrong_request_target_forms`

> 📄 `client.test.vx` L264-299

```vex
fn test_client_rejects_duplicate_host_and_wrong_request_target_forms(t: &TestCtx!)
```

The direct-origin transport owns Host/framing fields and emits only the

request-target forms whose semantics it can prove. Every case below must
fail before connect; the listener intentionally has no accept task.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_session_reuses_only_a_proven_http11_boundary"></a>`test_client_session_reuses_only_a_proven_http11_boundary`

> 📄 `client.test.vx` L301-394

```vex
fn test_client_session_reuses_only_a_proven_http11_boundary(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_async_fragmented_content_length_roundtrip"></a>`test_client_async_fragmented_content_length_roundtrip`

> 📄 `client.test.vx` L396-462

```vex
fn test_client_async_fragmented_content_length_roundtrip(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_decodes_chunked_response"></a>`test_client_decodes_chunked_response`

> 📄 `client.test.vx` L464-507

```vex
fn test_client_decodes_chunked_response(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_preserves_fragmented_chunk_framing"></a>`test_client_preserves_fragmented_chunk_framing`

> 📄 `client.test.vx` L512-560

```vex
fn test_client_preserves_fragmented_chunk_framing(t: &TestCtx!)
```

Chunk framing is allowed to split at every transport boundary. In

particular, the decoder must retain an incomplete size/trailer line rather
than treating the next recv as a new independent chunk stream.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_streams_chunked_response_into_async_writer"></a>`test_client_streams_chunked_response_into_async_writer`

> 📄 `client.test.vx` L562-622

```vex
fn test_client_streams_chunked_response_into_async_writer(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_rejects_http_10_transfer_encoding"></a>`test_client_rejects_http_10_transfer_encoding`

> 📄 `client.test.vx` L624-664

```vex
fn test_client_rejects_http_10_transfer_encoding(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_rejects_response_header_limit"></a>`test_client_rejects_response_header_limit`

> 📄 `client.test.vx` L666-709

```vex
fn test_client_rejects_response_header_limit(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_rejects_ambiguous_response_framing"></a>`test_client_rejects_ambiguous_response_framing`

> 📄 `client.test.vx` L711-751

```vex
fn test_client_rejects_ambiguous_response_framing(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_rejects_protocol_upgrade_without_handoff"></a>`test_client_rejects_protocol_upgrade_without_handoff`

> 📄 `client.test.vx` L753-793

```vex
fn test_client_rejects_protocol_upgrade_without_handoff(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_consumes_bounded_informational_chain_and_reuses_session"></a>`test_client_consumes_bounded_informational_chain_and_reuses_session`

> 📄 `client.test.vx` L795-877

```vex
fn test_client_consumes_bounded_informational_chain_and_reuses_session(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_rejects_excessive_informational_responses"></a>`test_client_rejects_excessive_informational_responses`

> 📄 `client.test.vx` L879-928

```vex
fn test_client_rejects_excessive_informational_responses(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_head_ignores_representational_length_and_reuses_session"></a>`test_client_head_ignores_representational_length_and_reuses_session`

> 📄 `client.test.vx` L930-1006

```vex
fn test_client_head_ignores_representational_length_and_reuses_session(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_205_zero_chunk_preserves_session_boundary"></a>`test_client_205_zero_chunk_preserves_session_boundary`

> 📄 `client.test.vx` L1008-1086

```vex
fn test_client_205_zero_chunk_preserves_session_boundary(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_rejects_nonempty_205_body"></a>`test_client_rejects_nonempty_205_body`

> 📄 `client.test.vx` L1088-1130

```vex
fn test_client_rejects_nonempty_205_body(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_rejects_successful_connect_without_handoff"></a>`test_client_rejects_successful_connect_without_handoff`

> 📄 `client.test.vx` L1132-1174

```vex
fn test_client_rejects_successful_connect_without_handoff(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_context_timeout_interrupts_response_read"></a>`test_client_context_timeout_interrupts_response_read`

> 📄 `client.test.vx` L1176-1213

```vex
fn test_client_context_timeout_interrupts_response_read(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_session_streams_fragmented_request_then_reuses_boundary"></a>`test_client_session_streams_fragmented_request_then_reuses_boundary`

> 📄 `client.test.vx` L1215-1324

```vex
fn test_client_session_streams_fragmented_request_then_reuses_boundary(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_streaming_request_short_source_invalidates_session"></a>`test_client_streaming_request_short_source_invalidates_session`

> 📄 `client.test.vx` L1326-1378

```vex
fn test_client_streaming_request_short_source_invalidates_session(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="serveStatelessStreamingExchange"></a>`serveStatelessStreamingExchange` `⚡ async`

> 📄 `client.test.vx` L1380-1415

```vex
fn serveStatelessStreamingExchange(listener: &TcpListener, context: &Context, expectedBody: str, responseBody: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `listener` | `&amp;TcpListener` |  |
| `context` | `&amp;Context` |  |
| `expectedBody` | `str` |  |
| `responseBody` | `str` |  |

**Returns:** `bool`

---

### <a id="test_stateless_client_streams_request_with_both_response_modes"></a>`test_stateless_client_streams_request_with_both_response_modes`

> 📄 `client.test.vx` L1417-1482

```vex
fn test_stateless_client_streams_request_with_both_response_modes(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_follows_relative_303_and_rewrites_buffered_post"></a>`test_client_follows_relative_303_and_rewrites_buffered_post`

> 📄 `client.test.vx` L1484-1566

```vex
fn test_client_follows_relative_303_and_rewrites_buffered_post(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_cross_origin_307_uses_resolver_and_strips_credentials"></a>`test_client_cross_origin_307_uses_resolver_and_strips_credentials`

> 📄 `client.test.vx` L1568-1664

```vex
fn test_client_cross_origin_307_uses_resolver_and_strips_credentials(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_redirect_limit_fails_before_third_connection"></a>`test_client_redirect_limit_fails_before_third_connection`

> 📄 `client.test.vx` L1666-1714

```vex
fn test_client_redirect_limit_fails_before_third_connection(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="redirectFailureKind"></a>`redirectFailureKind` `⚡ async`

> 📄 `client.test.vx` L1716-1729

```vex
fn redirectFailureKind(client: &HttpClient, request: &ClientRequest, endpoint: SocketAddr, redirectPolicy: &HttpRedirectPolicy, context: &Context): IoErrorKind
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `client` | `&amp;HttpClient` |  |
| `request` | `&amp;ClientRequest` |  |
| `endpoint` | `SocketAddr` |  |
| `redirectPolicy` | `&amp;HttpRedirectPolicy` |  |
| `context` | `&amp;Context` |  |

**Returns:** `IoErrorKind`

---

### <a id="test_client_redirects_fail_closed_on_unsafe_boundaries"></a>`test_client_redirects_fail_closed_on_unsafe_boundaries`

> 📄 `client.test.vx` L1731-1801

```vex
fn test_client_redirects_fail_closed_on_unsafe_boundaries(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="assertDecodedResponse"></a>`assertDecodedResponse`

> 📄 `client.test.vx` L1803-1817

```vex
fn assertDecodedResponse(t: &TestCtx!, format: CompressionFormat, coding: str, expected: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |
| `format` | `CompressionFormat` |  |
| `coding` | `str` |  |
| `expected` | `str` |  |

---

### <a id="test_client_decodes_all_advertised_content_codings"></a>`test_client_decodes_all_advertised_content_codings`

> 📄 `client.test.vx` L1819-1824

```vex
fn test_client_decodes_all_advertised_content_codings(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_content_decoding_roundtrips_binary_http_body"></a>`test_client_content_decoding_roundtrips_binary_http_body`

> 📄 `client.test.vx` L1826-1892

```vex
fn test_client_content_decoding_roundtrips_binary_http_body(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_decodes_content_encoding_chain_in_reverse_order"></a>`test_client_decodes_content_encoding_chain_in_reverse_order`

> 📄 `client.test.vx` L1894-1919

```vex
fn test_client_decodes_content_encoding_chain_in_reverse_order(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_client_content_decoding_limit_and_errors_are_atomic"></a>`test_client_content_decoding_limit_and_errors_are_atomic`

> 📄 `client.test.vx` L1921-1993

```vex
fn test_client_content_decoding_limit_and_errors_are_atomic(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="benchReq"></a>`benchReq`

> 📄 `bench.test.vx` L23-29

```vex
fn benchReq(method: str, path: str): Request
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `method` | `str` |  |
| `path` | `str` |  |

**Returns:** `Request`

---

### <a id="noop"></a>`noop`

> 📄 `bench.test.vx` L31-33

```vex
fn noop(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="streamNoop"></a>`streamNoop`

> 📄 `bench.test.vx` L35-37

```vex
fn streamNoop(_ctx: &Ctx!, _out: &ResponseStreamWriter!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_ctx` | `&amp;Ctx!` |  |
| `_out` | `&amp;ResponseStreamWriter!` |  |

---

### <a id="prepareReusedRouteCtx"></a>`prepareReusedRouteCtx`

> 📄 `bench.test.vx` L43-48

```vex
fn prepareReusedRouteCtx(ctx: &Ctx!, method: str, path: str)
```

Mirror Fiber's worker lifecycle: request context allocations happen during

worker setup, while every request clears and repopulates the same context.
Keeping this separate from Ctx.new benchmarks prevents construction cost
from being misreported as radix lookup cost.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |
| `method` | `str` |  |
| `path` | `str` |  |

---

### <a id="bench_sanity"></a>`bench_sanity`

> 📄 `bench.test.vx` L50-55

```vex
fn bench_sanity(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_headers_set_get"></a>`bench_headers_set_get`

> 📄 `bench.test.vx` L59-71

```vex
fn bench_headers_set_get(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_headers_case_insensitive"></a>`bench_headers_case_insensitive`

> 📄 `bench.test.vx` L73-86

```vex
fn bench_headers_case_insensitive(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_headers_has"></a>`bench_headers_has`

> 📄 `bench.test.vx` L88-102

```vex
fn bench_headers_has(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_status_text_lookup"></a>`bench_status_text_lookup`

> 📄 `bench.test.vx` L106-112

```vex
fn bench_status_text_lookup(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_router_static_match"></a>`bench_router_static_match`

> 📄 `bench.test.vx` L116-130

```vex
fn bench_router_static_match(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_router_param_match"></a>`bench_router_param_match`

> 📄 `bench.test.vx` L132-144

```vex
fn bench_router_param_match(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_router_multi_param_match"></a>`bench_router_multi_param_match`

> 📄 `bench.test.vx` L146-156

```vex
fn bench_router_multi_param_match(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_router_miss"></a>`bench_router_miss`

> 📄 `bench.test.vx` L158-170

```vex
fn bench_router_miss(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_router_static_match_reused_ctx"></a>`bench_router_static_match_reused_ctx`

> 📄 `bench.test.vx` L174-189

```vex
fn bench_router_static_match_reused_ctx(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_router_param_match_reused_ctx"></a>`bench_router_param_match_reused_ctx`

> 📄 `bench.test.vx` L191-204

```vex
fn bench_router_param_match_reused_ctx(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_router_miss_reused_ctx"></a>`bench_router_miss_reused_ctx`

> 📄 `bench.test.vx` L206-219

```vex
fn bench_router_miss_reused_ctx(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_buffered_dynamic_lane_reused_ctx"></a>`bench_buffered_dynamic_lane_reused_ctx`

> 📄 `bench.test.vx` L229-245

```vex
fn bench_buffered_dynamic_lane_reused_ctx(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_response_builder"></a>`bench_response_builder`

> 📄 `bench.test.vx` L249-258

```vex
fn bench_response_builder(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_response_encode_reuse"></a>`bench_response_encode_reuse`

> 📄 `bench.test.vx` L265-274

```vex
fn bench_response_encode_reuse(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_response_append_encoded_reused"></a>`bench_response_append_encoded_reused`

> 📄 `bench.test.vx` L284-303

```vex
fn bench_response_append_encoded_reused(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_ctx_new"></a>`bench_ctx_new`

> 📄 `bench.test.vx` L307-313

```vex
fn bench_ctx_new(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_ctx_with_query"></a>`bench_ctx_with_query`

> 📄 `bench.test.vx` L315-322

```vex
fn bench_ctx_with_query(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_ctx_locals"></a>`bench_ctx_locals`

> 📄 `bench.test.vx` L324-336

```vex
fn bench_ctx_locals(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="assertRejected"></a>`assertRejected`

> 📄 `request_security.test.vx` L8-14

```vex
fn assertRejected(t: &TestCtx!, raw: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |
| `raw` | `str` |  |

---

### <a id="assertBothRejected"></a>`assertBothRejected`

> 📄 `request_security.test.vx` L18-25

```vex
fn assertBothRejected(t: &TestCtx!, raw: str)
```

The optimized Fiber adapter and the canonical parser are allowed to have

different storage shapes, never different accept/reject grammar.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |
| `raw` | `str` |  |

---

### <a id="test_rejects_conflicting_content_length"></a>`test_rejects_conflicting_content_length`

> 📄 `request_security.test.vx` L27-29

```vex
fn test_rejects_conflicting_content_length(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_rejects_identical_duplicate_content_length"></a>`test_rejects_identical_duplicate_content_length`

> 📄 `request_security.test.vx` L31-36

```vex
fn test_rejects_identical_duplicate_content_length(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_rejects_content_length_transfer_encoding"></a>`test_rejects_content_length_transfer_encoding`

> 📄 `request_security.test.vx` L38-40

```vex
fn test_rejects_content_length_transfer_encoding(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_rejects_unsupported_transfer_encoding"></a>`test_rejects_unsupported_transfer_encoding`

> 📄 `request_security.test.vx` L42-44

```vex
fn test_rejects_unsupported_transfer_encoding(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_rejects_transfer_encoding_substring"></a>`test_rejects_transfer_encoding_substring`

> 📄 `request_security.test.vx` L46-48

```vex
fn test_rejects_transfer_encoding_substring(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_rejects_duplicate_transfer_encoding"></a>`test_rejects_duplicate_transfer_encoding`

> 📄 `request_security.test.vx` L50-55

```vex
fn test_rejects_duplicate_transfer_encoding(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_accepts_exact_chunked_transfer_encoding"></a>`test_accepts_exact_chunked_transfer_encoding`

> 📄 `request_security.test.vx` L57-65

```vex
fn test_accepts_exact_chunked_transfer_encoding(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_rejects_http_10_transfer_encoding"></a>`test_rejects_http_10_transfer_encoding`

> 📄 `request_security.test.vx` L67-69

```vex
fn test_rejects_http_10_transfer_encoding(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_rejects_invalid_content_length"></a>`test_rejects_invalid_content_length`

> 📄 `request_security.test.vx` L71-73

```vex
fn test_rejects_invalid_content_length(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_rejects_obs_fold"></a>`test_rejects_obs_fold`

> 📄 `request_security.test.vx` L75-77

```vex
fn test_rejects_obs_fold(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_rejects_whitespace_before_colon"></a>`test_rejects_whitespace_before_colon`

> 📄 `request_security.test.vx` L79-81

```vex
fn test_rejects_whitespace_before_colon(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_requires_host_for_http_11"></a>`test_requires_host_for_http_11`

> 📄 `request_security.test.vx` L83-85

```vex
fn test_requires_host_for_http_11(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_rejects_duplicate_host"></a>`test_rejects_duplicate_host`

> 📄 `request_security.test.vx` L87-89

```vex
fn test_rejects_duplicate_host(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_http_10_does_not_require_host"></a>`test_http_10_does_not_require_host`

> 📄 `request_security.test.vx` L91-97

```vex
fn test_http_10_does_not_require_host(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_canonical_parser_rejects_conflicting_framing"></a>`test_canonical_parser_rejects_conflicting_framing`

> 📄 `request_security.test.vx` L99-107

```vex
fn test_canonical_parser_rejects_conflicting_framing(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_canonical_parser_accepts_chunked_without_length"></a>`test_canonical_parser_accepts_chunked_without_length`

> 📄 `request_security.test.vx` L109-117

```vex
fn test_canonical_parser_accepts_chunked_without_length(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_server_parser_bounds_header_count"></a>`test_server_parser_bounds_header_count`

> 📄 `request_security.test.vx` L119-128

```vex
fn test_server_parser_bounds_header_count(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_configured_header_count_is_enforced"></a>`test_configured_header_count_is_enforced`

> 📄 `request_security.test.vx` L130-140

```vex
fn test_configured_header_count_is_enforced(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_configured_header_bytes_are_enforced"></a>`test_configured_header_bytes_are_enforced`

> 📄 `request_security.test.vx` L142-153

```vex
fn test_configured_header_bytes_are_enforced(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_header_limit_does_not_count_body_bytes"></a>`test_header_limit_does_not_count_body_bytes`

> 📄 `request_security.test.vx` L155-167

```vex
fn test_header_limit_does_not_count_body_bytes(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_rejects_lowercase_http_version_on_both_paths"></a>`test_rejects_lowercase_http_version_on_both_paths`

> 📄 `request_security.test.vx` L169-171

```vex
fn test_rejects_lowercase_http_version_on_both_paths(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_rejects_control_byte_in_target_on_both_paths"></a>`test_rejects_control_byte_in_target_on_both_paths`

> 📄 `request_security.test.vx` L173-175

```vex
fn test_rejects_control_byte_in_target_on_both_paths(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_fiber_connection_tokens_are_list_aware_and_close_wins"></a>`test_fiber_connection_tokens_are_list_aware_and_close_wins`

> 📄 `request_security.test.vx` L177-187

```vex
fn test_fiber_connection_tokens_are_list_aware_and_close_wins(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_fiber_http10_connection_keep_alive_token_is_honored"></a>`test_fiber_http10_connection_keep_alive_token_is_honored`

> 📄 `request_security.test.vx` L189-199

```vex
fn test_fiber_http10_connection_keep_alive_token_is_honored(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_rejects_host_userinfo_and_path_on_both_paths"></a>`test_rejects_host_userinfo_and_path_on_both_paths`

> 📄 `request_security.test.vx` L201-206

```vex
fn test_rejects_host_userinfo_and_path_on_both_paths(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_rejects_invalid_host_ports_on_both_paths"></a>`test_rejects_invalid_host_ports_on_both_paths`

> 📄 `request_security.test.vx` L208-212

```vex
fn test_rejects_invalid_host_ports_on_both_paths(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_accepts_bracketed_host_literal_with_port_on_both_paths"></a>`test_accepts_bracketed_host_literal_with_port_on_both_paths`

> 📄 `request_security.test.vx` L214-226

```vex
fn test_accepts_bracketed_host_literal_with_port_on_both_paths(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_bracketed_host_literals_use_uri_ip_literal_grammar"></a>`test_bracketed_host_literals_use_uri_ip_literal_grammar`

> 📄 `request_security.test.vx` L228-243

```vex
fn test_bracketed_host_literals_use_uri_ip_literal_grammar(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ip_literal_authority_acceptance_is_shared"></a>`test_ip_literal_authority_acceptance_is_shared`

> 📄 `request_security.test.vx` L245-271

```vex
fn test_ip_literal_authority_acceptance_is_shared(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="streamedUpload"></a>`streamedUpload` `⚡ async`

> 📄 `async_body_keepalive.test.vx` L43-55

```vex
fn streamedUpload(ctx: &Ctx!, body: &AsyncRequestBody!, _next: &AsyncBodyPipelineNext!, context: &Context)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |
| `body` | `&amp;AsyncRequestBody!` |  |
| `_next` | `&amp;AsyncBodyPipelineNext!` |  |
| `context` | `&amp;Context` |  |

---

### <a id="secondRequest"></a>`secondRequest`

> 📄 `async_body_keepalive.test.vx` L57-57

```vex
fn secondRequest(ctx: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |

---

### <a id="reserveLoopbackPort"></a>`reserveLoopbackPort`

> 📄 `async_body_keepalive.test.vx` L59-72

```vex
fn reserveLoopbackPort(): u16
```

**Returns:** `u16`

---

### <a id="recvWithin"></a>`recvWithin`

> 📄 `async_body_keepalive.test.vx` L77-87

```vex
fn recvWithin(channel: &Channel<i32>, attempts: i32): Option<i32>
```

Keep the regression fail-fast even if startup, client handback or worker

shutdown regresses. A blocking Channel.recv would otherwise hide the exact
phase until the outer 30-second test-runner watchdog kills the process.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `channel` | `&amp;Channel&lt;i32&gt;` |  |
| `attempts` | `i32` |  |

**Returns:** `Option&lt;i32&gt;`

---

### <a id="test_streamed_request_returns_socket_and_pipeline_suffix_to_fiber"></a>`test_streamed_request_returns_socket_and_pipeline_suffix_to_fiber`

> 📄 `async_body_keepalive.test.vx` L89-183

```vex
fn test_streamed_request_returns_socket_and_pipeline_suffix_to_fiber()
```

---

### <a id="validUpgradeRequest"></a>`validUpgradeRequest`

> 📄 `ws_handshake.test.vx` L15-27

```vex
fn validUpgradeRequest(): Request
```

**Returns:** `Request`

---

### <a id="test_ws_upgrade_accepts_valid_rfc6455_handshake"></a>`test_ws_upgrade_accepts_valid_rfc6455_handshake`

> 📄 `ws_handshake.test.vx` L29-44

```vex
fn test_ws_upgrade_accepts_valid_rfc6455_handshake(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_upgrade_rejects_invalid_key_and_protocol_shape"></a>`test_ws_upgrade_rejects_invalid_key_and_protocol_shape`

> 📄 `ws_handshake.test.vx` L46-64

```vex
fn test_ws_upgrade_rejects_invalid_key_and_protocol_shape(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_upgrade_rejects_ambiguous_security_headers"></a>`test_ws_upgrade_rejects_ambiguous_security_headers`

> 📄 `ws_handshake.test.vx` L66-78

```vex
fn test_ws_upgrade_rejects_ambiguous_security_headers(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_upgrade_rejects_http_body_framing"></a>`test_ws_upgrade_rejects_http_body_framing`

> 📄 `ws_handshake.test.vx` L80-93

```vex
fn test_ws_upgrade_rejects_http_body_framing(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_subprotocol_offer_is_strict_and_response_selects_exact_token"></a>`test_ws_subprotocol_offer_is_strict_and_response_selects_exact_token`

> 📄 `ws_handshake.test.vx` L95-112

```vex
fn test_ws_subprotocol_offer_is_strict_and_response_selects_exact_token(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_subprotocol_offer_rejects_ambiguous_or_malformed_lists"></a>`test_ws_subprotocol_offer_rejects_ambiguous_or_malformed_lists`

> 📄 `ws_handshake.test.vx` L114-127

```vex
fn test_ws_subprotocol_offer_rejects_ambiguous_or_malformed_lists(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_validated_key_capability_builds_exact_arena_safe_response"></a>`test_ws_validated_key_capability_builds_exact_arena_safe_response`

> 📄 `ws_handshake.test.vx` L129-150

```vex
fn test_ws_validated_key_capability_builds_exact_arena_safe_response(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="dummyHandler"></a>`dummyHandler`

> 📄 `radix.test.vx` L15-17

```vex
fn dummyHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="assertMatch"></a>`assertMatch`

> 📄 `radix.test.vx` L19-24

```vex
fn assertMatch(t: &TestCtx!, tree: &RadixTree, path: string, msg: string)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |
| `tree` | `&amp;RadixTree` |  |
| `path` | `string` |  |
| `msg` | `string` |  |

---

### <a id="assertNoMatch"></a>`assertNoMatch`

> 📄 `radix.test.vx` L26-31

```vex
fn assertNoMatch(t: &TestCtx!, tree: &RadixTree, path: string, msg: string)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |
| `tree` | `&amp;RadixTree` |  |
| `path` | `string` |  |
| `msg` | `string` |  |

---

### <a id="assertParam"></a>`assertParam`

> 📄 `radix.test.vx` L33-48

```vex
fn assertParam(t: &TestCtx!, result: &MatchResult, key: string, expected: string)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |
| `result` | `&amp;MatchResult` |  |
| `key` | `string` |  |
| `expected` | `string` |  |

---

### <a id="test_radix_static_root"></a>`test_radix_static_root`

> 📄 `radix.test.vx` L52-56

```vex
fn test_radix_static_root(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_radix_static_simple"></a>`test_radix_static_simple`

> 📄 `radix.test.vx` L58-62

```vex
fn test_radix_static_simple(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_radix_static_deep"></a>`test_radix_static_deep`

> 📄 `radix.test.vx` L64-68

```vex
fn test_radix_static_deep(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_radix_static_no_match"></a>`test_radix_static_no_match`

> 📄 `radix.test.vx` L70-74

```vex
fn test_radix_static_no_match(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_radix_static_prefix_not_match"></a>`test_radix_static_prefix_not_match`

> 📄 `radix.test.vx` L76-80

```vex
fn test_radix_static_prefix_not_match(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_radix_static_segment_boundary_not_match"></a>`test_radix_static_segment_boundary_not_match`

> 📄 `radix.test.vx` L82-91

```vex
fn test_radix_static_segment_boundary_not_match(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_radix_multiple_static"></a>`test_radix_multiple_static`

> 📄 `radix.test.vx` L93-102

```vex
fn test_radix_multiple_static(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_radix_shared_prefix"></a>`test_radix_shared_prefix`

> 📄 `radix.test.vx` L106-113

```vex
fn test_radix_shared_prefix(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_radix_split_at_divergence"></a>`test_radix_split_at_divergence`

> 📄 `radix.test.vx` L115-122

```vex
fn test_radix_split_at_divergence(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_radix_param_single"></a>`test_radix_param_single`

> 📄 `radix.test.vx` L126-132

```vex
fn test_radix_param_single(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_radix_param_multiple"></a>`test_radix_param_multiple`

> 📄 `radix.test.vx` L134-141

```vex
fn test_radix_param_multiple(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_radix_replaced_structural_route_uses_winning_param_name"></a>`test_radix_replaced_structural_route_uses_winning_param_name`

> 📄 `radix.test.vx` L143-151

```vex
fn test_radix_replaced_structural_route_uses_winning_param_name(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_radix_param_string_value"></a>`test_radix_param_string_value`

> 📄 `radix.test.vx` L153-159

```vex
fn test_radix_param_string_value(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_radix_param_no_match_missing"></a>`test_radix_param_no_match_missing`

> 📄 `radix.test.vx` L161-165

```vex
fn test_radix_param_no_match_missing(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_radix_wildcard_multi_segment"></a>`test_radix_wildcard_multi_segment`

> 📄 `radix.test.vx` L169-175

```vex
fn test_radix_wildcard_multi_segment(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_radix_wildcard_single_segment"></a>`test_radix_wildcard_single_segment`

> 📄 `radix.test.vx` L177-183

```vex
fn test_radix_wildcard_single_segment(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_radix_wildcard_empty"></a>`test_radix_wildcard_empty`

> 📄 `radix.test.vx` L185-192

```vex
fn test_radix_wildcard_empty(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_radix_priority_static_over_param"></a>`test_radix_priority_static_over_param`

> 📄 `radix.test.vx` L196-204

```vex
fn test_radix_priority_static_over_param(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_radix_priority_param_over_wildcard"></a>`test_radix_priority_param_over_wildcard`

> 📄 `radix.test.vx` L206-214

```vex
fn test_radix_priority_param_over_wildcard(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_radix_trailing_slash"></a>`test_radix_trailing_slash`

> 📄 `radix.test.vx` L218-225

```vex
fn test_radix_trailing_slash(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_radix_too_few_segments"></a>`test_radix_too_few_segments`

> 📄 `radix.test.vx` L229-233

```vex
fn test_radix_too_few_segments(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_radix_too_many_segments"></a>`test_radix_too_many_segments`

> 📄 `radix.test.vx` L235-239

```vex
fn test_radix_too_many_segments(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_radix_mixed_routes"></a>`test_radix_mixed_routes`

> 📄 `radix.test.vx` L243-268

```vex
fn test_radix_mixed_routes(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="requestFields"></a>`requestFields`

> 📄 `h2_application.test.vx` L41-51

```vex
fn requestFields(method: str, target: str): Vec<HpackHeader>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `method` | `str` |  |
| `target` | `str` |  |

**Returns:** `Vec&lt;HpackHeader&gt;`

---

### <a id="requestFieldsWithLength"></a>`requestFieldsWithLength`

> 📄 `h2_application.test.vx` L53-57

```vex
fn requestFieldsWithLength(length: str): Vec<HpackHeader>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `length` | `str` |  |

**Returns:** `Vec&lt;HpackHeader&gt;`

---

### <a id="newBodySink"></a>`newBodySink`

> 📄 `h2_application.test.vx` L67-72

```vex
fn newBodySink(): H2BodySink
```

**Returns:** `H2BodySink`

---

### <a id="validatedInfo"></a>`validatedInfo`

> 📄 `h2_application.test.vx` L94-104

```vex
fn validatedInfo(t: &TestCtx!, fields: &Vec<HpackHeader>, kind: H2FieldSectionKind): Option<H2FieldSectionInfo>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |
| `fields` | `&amp;Vec&lt;HpackHeader&gt;` |  |
| `kind` | `H2FieldSectionKind` |  |

**Returns:** `Option&lt;H2FieldSectionInfo&gt;`

---

### <a id="bufferedRequest"></a>`bufferedRequest`

> 📄 `h2_application.test.vx` L106-121

```vex
fn bufferedRequest(t: &TestCtx!, streamId: u32, target: str): Option<H2ApplicationRequest>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |
| `streamId` | `u32` |  |
| `target` | `str` |  |

**Returns:** `Option&lt;H2ApplicationRequest&gt;`

---

### <a id="fieldValue"></a>`fieldValue`

> 📄 `h2_application.test.vx` L123-132

```vex
fn fieldValue(fields: &Vec<HpackHeader>, name: str): str
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fields` | `&amp;Vec&lt;HpackHeader&gt;` |  |
| `name` | `str` |  |

**Returns:** `str`

---

### <a id="h2StreamingResponseStub"></a>`h2StreamingResponseStub`

> 📄 `h2_application.test.vx` L134-136

```vex
fn h2StreamingResponseStub(_ctx: &Ctx!, _out: &ResponseStreamWriter!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `_ctx` | `&amp;Ctx!` |  |
| `_out` | `&amp;ResponseStreamWriter!` |  |

---

### <a id="terminalResponse"></a>`terminalResponse`

> 📄 `h2_application.test.vx` L138-144

```vex
fn terminalResponse(status: str): H2ApplicationResponse
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `status` | `str` |  |

**Returns:** `H2ApplicationResponse`

---

### <a id="streamingResponseHead"></a>`streamingResponseHead`

> 📄 `h2_application.test.vx` L146-152

```vex
fn streamingResponseHead(status: str): H2ApplicationResponse
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `status` | `str` |  |

**Returns:** `H2ApplicationResponse`

---

### <a id="h2ApplicationMiddleware"></a>`h2ApplicationMiddleware`

> 📄 `h2_application.test.vx` L154-157

```vex
fn h2ApplicationMiddleware(ctx: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |

---

### <a id="h2ApplicationHandler"></a>`h2ApplicationHandler`

> 📄 `h2_application.test.vx` L159-162

```vex
fn h2ApplicationHandler(ctx: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |

---

### <a id="h2BufferedEchoHandler"></a>`h2BufferedEchoHandler`

> 📄 `h2_application.test.vx` L164-167

```vex
fn h2BufferedEchoHandler(ctx: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |

---

### <a id="test_h2_application_request_moves_validated_fields_into_common_ctx"></a>`test_h2_application_request_moves_validated_fields_into_common_ctx`

> 📄 `h2_application.test.vx` L169-209

```vex
fn test_h2_application_request_moves_validated_fields_into_common_ctx(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_application_request_rejects_non_request_section_without_moving_it"></a>`test_h2_application_request_rejects_non_request_section_without_moving_it`

> 📄 `h2_application.test.vx` L211-221

```vex
fn test_h2_application_request_rejects_non_request_section_without_moving_it(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_application_body_streams_fragmented_data_through_shared_lifecycle"></a>`test_h2_application_body_streams_fragmented_data_through_shared_lifecycle`

> 📄 `h2_application.test.vx` L223-252

```vex
fn test_h2_application_body_streams_fragmented_data_through_shared_lifecycle(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_application_body_fails_closed_on_length_or_stream_mismatch"></a>`test_h2_application_body_fails_closed_on_length_or_stream_mismatch`

> 📄 `h2_application.test.vx` L254-278

```vex
fn test_h2_application_body_fails_closed_on_length_or_stream_mismatch(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_headers_and_data_reach_one_application_lifecycle"></a>`test_h2_protocol_headers_and_data_reach_one_application_lifecycle`

> 📄 `h2_application.test.vx` L280-332

```vex
fn test_h2_protocol_headers_and_data_reach_one_application_lifecycle(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_application_response_moves_body_and_normalizes_headers"></a>`test_h2_application_response_moves_body_and_normalizes_headers`

> 📄 `h2_application.test.vx` L334-363

```vex
fn test_h2_application_response_moves_body_and_normalizes_headers(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_request_dispatches_through_shared_app_and_response_boundary"></a>`test_h2_request_dispatches_through_shared_app_and_response_boundary`

> 📄 `h2_application.test.vx` L365-399

```vex
fn test_h2_request_dispatches_through_shared_app_and_response_boundary(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_buffered_stream_owns_fragmented_body_dispatch_and_response"></a>`test_h2_buffered_stream_owns_fragmented_body_dispatch_and_response`

> 📄 `h2_application.test.vx` L401-445

```vex
fn test_h2_buffered_stream_owns_fragmented_body_dispatch_and_response(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_buffered_stream_cancellation_is_terminal_and_idempotent"></a>`test_h2_buffered_stream_cancellation_is_terminal_and_idempotent`

> 📄 `h2_application.test.vx` L447-469

```vex
fn test_h2_buffered_stream_cancellation_is_terminal_and_idempotent(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_buffered_stream_set_bounds_duplicates_dispatch_and_abort"></a>`test_h2_buffered_stream_set_bounds_duplicates_dispatch_and_abort`

> 📄 `h2_application.test.vx` L471-513

```vex
fn test_h2_buffered_stream_set_bounds_duplicates_dispatch_and_abort(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_application_response_preserves_head_length_without_payload"></a>`test_h2_application_response_preserves_head_length_without_payload`

> 📄 `h2_application.test.vx` L515-530

```vex
fn test_h2_application_response_preserves_head_length_without_payload(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_application_response_commits_through_protocol_header_owner"></a>`test_h2_application_response_commits_through_protocol_header_owner`

> 📄 `h2_application.test.vx` L532-571

```vex
fn test_h2_application_response_commits_through_protocol_header_owner(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_application_session_owns_dispatch_and_credit_until_wire_commit"></a>`test_h2_application_session_owns_dispatch_and_credit_until_wire_commit`

> 📄 `h2_application.test.vx` L573-641

```vex
fn test_h2_application_session_owns_dispatch_and_credit_until_wire_commit(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_dynamic_route_refusal_retires_owner_and_preserves_connection_credit"></a>`test_h2_dynamic_route_refusal_retires_owner_and_preserves_connection_credit`

> 📄 `h2_application.test.vx` L643-698

```vex
fn test_h2_dynamic_route_refusal_retires_owner_and_preserves_connection_credit(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_application_session_binds_receive_error_to_exact_reset"></a>`test_h2_application_session_binds_receive_error_to_exact_reset`

> 📄 `h2_application.test.vx` L700-761

```vex
fn test_h2_application_session_binds_receive_error_to_exact_reset(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_response_egress_serializes_windowed_frames"></a>`test_h2_response_egress_serializes_windowed_frames`

> 📄 `h2_application.test.vx` L763-860

```vex
fn test_h2_response_egress_serializes_windowed_frames(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_response_egress_cancellation_preserves_hpack_connection_state"></a>`test_h2_response_egress_cancellation_preserves_hpack_connection_state`

> 📄 `h2_application.test.vx` L862-908

```vex
fn test_h2_response_egress_cancellation_preserves_hpack_connection_state(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_response_egress_streams_one_backpressured_chunk_at_a_time"></a>`test_h2_response_egress_streams_one_backpressured_chunk_at_a_time`

> 📄 `h2_application.test.vx` L910-999

```vex
fn test_h2_response_egress_streams_one_backpressured_chunk_at_a_time(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="loopbackListener"></a>`loopbackListener`

> 📄 `async_body.test.vx` L49-61

```vex
fn loopbackListener(): (TcpListener, SocketAddr)
```

**Returns:** `(TcpListener, SocketAddr)`

---

### <a id="test_async_request_body_consumes_initial_fixed_body_once"></a>`test_async_request_body_consumes_initial_fixed_body_once`

> 📄 `async_body.test.vx` L63-119

```vex
fn test_async_request_body_consumes_initial_fixed_body_once()
```

---

### <a id="test_async_request_body_streams_fragmented_chunked_tail"></a>`test_async_request_body_streams_fragmented_chunked_tail`

> 📄 `async_body.test.vx` L121-165

```vex
fn test_async_request_body_streams_fragmented_chunked_tail()
```

---

### <a id="test_async_request_body_deadline_cancels_partial_framed_body"></a>`test_async_request_body_deadline_cancels_partial_framed_body`

> 📄 `async_body.test.vx` L167-210

```vex
fn test_async_request_body_deadline_cancels_partial_framed_body()
```

---

### <a id="handler"></a>`handler`

> 📄 `direct_server_probe.vx` L10-22

```vex
fn handler(req: &Request, res: &Response!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&amp;Request` |  |
| `res` | `&amp;Response!` |  |

---

### <a id="main"></a>`main`

> 📄 `direct_server_probe.vx` L24-28

```vex
fn main(): i32
```

**Returns:** `i32`

---

### <a id="handler"></a>`handler`

> 📄 `test_deep_drop.vx` L3-5

```vex
fn handler(ctx: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |

---

### <a id="main"></a>`main`

> 📄 `test_deep_drop.vx` L7-25

```vex
fn main(): i32
```

**Returns:** `i32`

---

### <a id="main"></a>`main`

> 📄 `leak_test_option_string.vx` L2-23

```vex
fn main()
```

---

### <a id="main"></a>`main`

> 📄 `hello_ev_server.vx` L26-55

```vex
fn main()
```

---

### <a id="indexHandler"></a>`indexHandler`

> 📄 `hello_ev_server.vx` L59-62

```vex
fn indexHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="jsonHandler"></a>`jsonHandler`

> 📄 `hello_ev_server.vx` L64-66

```vex
fn jsonHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="healthHandler"></a>`healthHandler`

> 📄 `hello_ev_server.vx` L68-70

```vex
fn healthHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="userHandler"></a>`userHandler`

> 📄 `hello_ev_server.vx` L72-75

```vex
fn userHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="echoHandler"></a>`echoHandler`

> 📄 `hello_ev_server.vx` L77-81

```vex
fn echoHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="cookieSetHandler"></a>`cookieSetHandler`

> 📄 `hello_ev_server.vx` L83-86

```vex
fn cookieSetHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="cookieGetHandler"></a>`cookieGetHandler`

> 📄 `hello_ev_server.vx` L88-95

```vex
fn cookieGetHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="apiStatusHandler"></a>`apiStatusHandler`

> 📄 `hello_ev_server.vx` L97-99

```vex
fn apiStatusHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="apiUserHandler"></a>`apiUserHandler`

> 📄 `hello_ev_server.vx` L101-104

```vex
fn apiUserHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="loggerMiddleware"></a>`loggerMiddleware`

> 📄 `hello_ev_server.vx` L108-111

```vex
fn loggerMiddleware(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="errorHandler"></a>`errorHandler`

> 📄 `hello_ev_server.vx` L115-117

```vex
fn errorHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="notFoundHandler"></a>`notFoundHandler`

> 📄 `hello_ev_server.vx` L119-121

```vex
fn notFoundHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="main"></a>`main`

> 📄 `bench_server.vx` L27-36

```vex
fn main()
```

---

### <a id="pingHandler"></a>`pingHandler`

> 📄 `bench_server.vx` L38-40

```vex
fn pingHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="jsonHandler"></a>`jsonHandler`

> 📄 `bench_server.vx` L42-44

```vex
fn jsonHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="plainHandler"></a>`plainHandler`

> 📄 `bench_server.vx` L46-48

```vex
fn plainHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="healthHandler"></a>`healthHandler`

> 📄 `bench_server.vx` L50-52

```vex
fn healthHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="hello"></a>`hello`

> 📄 `hello_http1_sync.vx` L5-7

```vex
fn hello(context: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `context` | `&amp;Ctx!` |  |

---

### <a id="main"></a>`main`

> 📄 `hello_http1_sync.vx` L9-13

```vex
fn main()
```

---

### <a id="main"></a>`main`

> 📄 `hello_server.vx` L19-30

```vex
fn main()
```

---

### <a id="indexHandler"></a>`indexHandler`

> 📄 `hello_server.vx` L34-36

```vex
fn indexHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="helloHandler"></a>`helloHandler`

> 📄 `hello_server.vx` L38-41

```vex
fn helloHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="jsonHandler"></a>`jsonHandler`

> 📄 `hello_server.vx` L43-46

```vex
fn jsonHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="healthHandler"></a>`healthHandler`

> 📄 `hello_server.vx` L48-50

```vex
fn healthHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="reserveH2LoopbackPort"></a>`reserveH2LoopbackPort` `🔓 export`

> 📄 `h2_live_support.vx` L14-27

```vex
export fn reserveH2LoopbackPort(): u16
```

**Returns:** `u16`

---

### <a id="recvH2Within"></a>`recvH2Within` `🔓 export`

> 📄 `h2_live_support.vx` L29-39

```vex
export fn recvH2Within(channel: &Channel<i32>, attempts: i32): Option<i32>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `channel` | `&amp;Channel&lt;i32&gt;` |  |
| `attempts` | `i32` |  |

**Returns:** `Option&lt;i32&gt;`

---

### <a id="appendH2Bytes"></a>`appendH2Bytes`

> 📄 `h2_live_support.vx` L41-44

```vex
fn appendH2Bytes(output: &Vec<u8>!, source: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `output` | `&amp;Vec&lt;u8&gt;!` |  |
| `source` | `str` |  |

---

### <a id="appendH2Frame"></a>`appendH2Frame`

> 📄 `h2_live_support.vx` L46-69

```vex
fn appendH2Frame(output: &Vec<u8>!, frameType: u8, flags: u8, streamId: u32, payload: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `output` | `&amp;Vec&lt;u8&gt;!` |  |
| `frameType` | `u8` |  |
| `flags` | `u8` |  |
| `streamId` | `u32` |  |
| `payload` | `str` |  |

**Returns:** `bool`

---

### <a id="liveH2HasFrame"></a>`liveH2HasFrame`

> 📄 `h2_live_support.vx` L71-82

```vex
fn liveH2HasFrame(wire: &Vec<u8>, wanted: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `wire` | `&amp;Vec&lt;u8&gt;` |  |
| `wanted` | `u8` |  |

**Returns:** `bool`

---

### <a id="liveH2HasStreamFrame"></a>`liveH2HasStreamFrame`

> 📄 `h2_live_support.vx` L84-101

```vex
fn liveH2HasStreamFrame(wire: &Vec<u8>, wanted: u8, streamId: u32): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `wire` | `&amp;Vec&lt;u8&gt;` |  |
| `wanted` | `u8` |  |
| `streamId` | `u32` |  |

**Returns:** `bool`

---

### <a id="liveH2HasPingAck"></a>`liveH2HasPingAck`

> 📄 `h2_live_support.vx` L103-115

```vex
fn liveH2HasPingAck(wire: &Vec<u8>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `wire` | `&amp;Vec&lt;u8&gt;` |  |

**Returns:** `bool`

---

### <a id="liveH2StreamDataContains"></a>`liveH2StreamDataContains`

> 📄 `h2_live_support.vx` L120-147

```vex
fn liveH2StreamDataContains(wire: &Vec<u8>, streamId: u32, marker: str): bool
```

Collect only stream DATA payloads before searching. This remains correct

when one logical response spans multiple frames; wire headers must never be
mistaken for application bytes or break a cross-chunk marker.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `wire` | `&amp;Vec&lt;u8&gt;` |  |
| `streamId` | `u32` |  |
| `marker` | `str` |  |

**Returns:** `bool`

---

### <a id="liveH2StreamEnded"></a>`liveH2StreamEnded`

> 📄 `h2_live_support.vx` L149-169

```vex
fn liveH2StreamEnded(wire: &Vec<u8>, streamId: u32): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `wire` | `&amp;Vec&lt;u8&gt;` |  |
| `streamId` | `u32` |  |

**Returns:** `bool`

---

### <a id="connectH2Loopback"></a>`connectH2Loopback` `⚡ async`

> 📄 `h2_live_support.vx` L171-184

```vex
fn connectH2Loopback(port: u16, context: &Context): Option<TcpStream>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `port` | `u16` |  |
| `context` | `&amp;Context` |  |

**Returns:** `Option&lt;TcpStream&gt;`

---

### <a id="liveH2Exchange"></a>`liveH2Exchange` `⚡ async` `🔓 export`

> 📄 `h2_live_support.vx` L186-241

```vex
export fn liveH2Exchange(port: u16, expectedBody: str): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `port` | `u16` |  |
| `expectedBody` | `str` |  |

**Returns:** `i32`

---

### <a id="liveH2ResetExchange"></a>`liveH2ResetExchange` `⚡ async` `🔓 export`

> 📄 `h2_live_support.vx` L243-306

```vex
export fn liveH2ResetExchange(port: u16): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `port` | `u16` |  |

**Returns:** `i32`

---

### <a id="parseCookies"></a>`parseCookies` `🔓 export`

> 📄 `cookie.vx` L115-157

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

> 📄 `cookie.vx` L160-175

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

### <a id="cors"></a>`cors` `🔓 export`

> 📄 `cors.vx` L93-106

```vex
export fn cors(c: &Ctx!)
```

Default CORS middleware — allows all origins.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="corsWithOrigin"></a>`corsWithOrigin` `🔓 export`

> 📄 `cors.vx` L109-123

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

### <a id="logger"></a>`logger` `🔓 export`

> 📄 `logger.vx` L21-40

```vex
export fn logger(c: &Ctx!)
```

Logger middleware — prints method, path, status, and latency.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="headerEqCI"></a>`headerEqCI`

> 📄 `headers.vx` L184-201

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

> 📄 `status.vx` L43-71

```vex
export fn statusText(code: i32): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `code` | `i32` |  |

**Returns:** `string`

---

### <a id="statusAllowsContent"></a>`statusAllowsContent` `🔓 export`

> 📄 `status.vx` L79-82

```vex
export fn statusAllowsContent(code: i32): bool
```

Whether an HTTP response status permits a payload body on the wire.

`HEAD` is intentionally not handled here: it has the status semantics of
its corresponding `GET` response and therefore preserves the prospective
payload length while suppressing only the payload bytes. The response
serializer carries that request-specific distinction separately.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `code` | `i32` |  |

**Returns:** `bool`

---

### <a id="isValidOpcode"></a>`isValidOpcode`

> 📄 `ws.vx` L42-46

```vex
fn isValidOpcode(opcode: u8): bool
```

RFC 6455 defines only these opcodes when no extension has been negotiated.

Reserved opcodes are a protocol error, not an application-defined frame.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `opcode` | `u8` |  |

**Returns:** `bool`

---

### <a id="parseFrame"></a>`parseFrame` `🔓 export`

> 📄 `ws.vx` L133-228

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

> 📄 `ws.vx` L238-255

```vex
export fn applyMask(payload: &str!, maskKey: u32, len: usize)
```

Apply/remove WebSocket mask to payload buffer (in-place).

XOR with 4-byte rotating mask key.
Uses RawBuf for safe byte-level access.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `payload` | `&amp;str!` |  |
| `maskKey` | `u32` |  |
| `len` | `usize` |  |

---

### <a id="encodedFrameSize"></a>`encodedFrameSize` `🔓 export`

> 📄 `ws.vx` L262-271

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

> 📄 `ws.vx` L277-332

```vex
export fn encodeFrameHeader(out: &str!, fin: bool, opcode: u8, payloadLen: usize, masked: bool, maskKey: u32): usize
```

Encode a WebSocket frame header into `out` buffer.

Returns number of header bytes written.
Caller must write payload immediately after.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;str!` |  |
| `fin` | `bool` |  |
| `opcode` | `u8` |  |
| `payloadLen` | `usize` |  |
| `masked` | `bool` |  |
| `maskKey` | `u32` |  |

**Returns:** `usize`

---

### <a id="sfOther"></a>`sfOther`

> 📄 `h2_priority.vx` L64-66

```vex
fn sfOther(): SfBare
```

**Returns:** `SfBare`

---

### <a id="sfIsLowerAlpha"></a>`sfIsLowerAlpha`

> 📄 `h2_priority.vx` L68-68

```vex
fn sfIsLowerAlpha(byt: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `byt` | `u8` |  |

**Returns:** `bool`

---

### <a id="sfIsUpperAlpha"></a>`sfIsUpperAlpha`

> 📄 `h2_priority.vx` L69-69

```vex
fn sfIsUpperAlpha(byt: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `byt` | `u8` |  |

**Returns:** `bool`

---

### <a id="sfIsDigit"></a>`sfIsDigit`

> 📄 `h2_priority.vx` L70-70

```vex
fn sfIsDigit(byt: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `byt` | `u8` |  |

**Returns:** `bool`

---

### <a id="sfIsKeyStart"></a>`sfIsKeyStart`

> 📄 `h2_priority.vx` L72-74

```vex
fn sfIsKeyStart(byt: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `byt` | `u8` |  |

**Returns:** `bool`

---

### <a id="sfIsKeyChar"></a>`sfIsKeyChar`

> 📄 `h2_priority.vx` L76-79

```vex
fn sfIsKeyChar(byt: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `byt` | `u8` |  |

**Returns:** `bool`

---

### <a id="sfIsTokenStart"></a>`sfIsTokenStart`

> 📄 `h2_priority.vx` L81-83

```vex
fn sfIsTokenStart(byt: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `byt` | `u8` |  |

**Returns:** `bool`

---

### <a id="sfIsTokenChar"></a>`sfIsTokenChar`

> 📄 `h2_priority.vx` L85-88

```vex
fn sfIsTokenChar(byt: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `byt` | `u8` |  |

**Returns:** `bool`

---

### <a id="sfIsBase64Data"></a>`sfIsBase64Data`

> 📄 `h2_priority.vx` L167-170

```vex
fn sfIsBase64Data(byt: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `byt` | `u8` |  |

**Returns:** `bool`

---

### <a id="parseH2PriorityFieldWithLimit"></a>`parseH2PriorityFieldWithLimit` `🔓 export`

> 📄 `h2_priority.vx` L292-355

```vex
export fn parseH2PriorityFieldWithLimit(fieldValue: str, maximumBytes: usize): H2PriorityFieldResult
```

Parse the RFC 9218 Priority Dictionary without allocation. Unknown members

and known members with unsupported/out-of-range types are ignored exactly as
required; malformed Structured Fields syntax fails closed.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fieldValue` | `str` |  |
| `maximumBytes` | `usize` |  |

**Returns:** `H2PriorityFieldResult`

---

### <a id="parseH2PriorityField"></a>`parseH2PriorityField` `🔓 export`

> 📄 `h2_priority.vx` L357-359

```vex
export fn parseH2PriorityField(fieldValue: str): H2PriorityFieldResult
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fieldValue` | `str` |  |

**Returns:** `H2PriorityFieldResult`

---

### <a id="parseH2PriorityUpdateWithLimit"></a>`parseH2PriorityUpdateWithLimit` `🔓 export`

> 📄 `h2_priority.vx` L363-383

```vex
export fn parseH2PriorityUpdateWithLimit(payload: str, maximumFieldBytes: usize): H2PriorityUpdateResult
```

Parse a complete HTTP/2 PRIORITY_UPDATE payload: 31-bit target stream ID

followed by one ASCII Structured Fields Dictionary.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `payload` | `str` |  |
| `maximumFieldBytes` | `usize` |  |

**Returns:** `H2PriorityUpdateResult`

---

### <a id="parseH2PriorityUpdate"></a>`parseH2PriorityUpdate` `🔓 export`

> 📄 `h2_priority.vx` L385-387

```vex
export fn parseH2PriorityUpdate(payload: str): H2PriorityUpdateResult
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `payload` | `str` |  |

**Returns:** `H2PriorityUpdateResult`

---

### <a id="encodeH2PriorityUpdate"></a>`encodeH2PriorityUpdate` `🔓 export`

> 📄 `h2_priority.vx` L391-420

```vex
export fn encodeH2PriorityUpdate(out: &str!, streamId: u32, priority: &H2Priority): H2EncodeResult
```

Encode a canonical complete PRIORITY_UPDATE frame. False incremental uses

its RFC default by omission; urgency is always explicit.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;str!` |  |
| `streamId` | `u32` |  |
| `priority` | `&amp;H2Priority` |  |

**Returns:** `H2EncodeResult`

---

### <a id="schedulerBetterStarved"></a>`schedulerBetterStarved`

> 📄 `h2_priority.vx` L633-641

```vex
fn schedulerBetterStarved(candidate: &H2PriorityEntry, current: &H2PriorityEntry, turn: u64): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `candidate` | `&amp;H2PriorityEntry` |  |
| `current` | `&amp;H2PriorityEntry` |  |
| `turn` | `u64` |  |

**Returns:** `bool`

---

### <a id="schedulerBetterNormal"></a>`schedulerBetterNormal`

> 📄 `h2_priority.vx` L643-659

```vex
fn schedulerBetterNormal(candidate: &H2PriorityEntry, current: &H2PriorityEntry): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `candidate` | `&amp;H2PriorityEntry` |  |
| `current` | `&amp;H2PriorityEntry` |  |

**Returns:** `bool`

---

### <a id="copySettings"></a>`copySettings`

> 📄 `h2_protocol.vx` L557-566

```vex
fn copySettings(value: &H2Settings): H2Settings
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `&amp;H2Settings` |  |

**Returns:** `H2Settings`

---

### <a id="protocolControlResult"></a>`protocolControlResult`

> 📄 `h2_protocol.vx` L1065-1081

```vex
fn protocolControlResult(result: H2ConnectionResult): H2ProtocolFrameResult
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `result` | `H2ConnectionResult` |  |

**Returns:** `H2ProtocolFrameResult`

---

### <a id="protocolReceiveStreamError"></a>`protocolReceiveStreamError`

> 📄 `h2_protocol.vx` L1083-1103

```vex
fn protocolReceiveStreamError(streamId: u32, result: StreamError): Option<H2ProtocolFrameResult>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `streamId` | `u32` |  |
| `result` | `StreamError` |  |

**Returns:** `Option&lt;H2ProtocolFrameResult&gt;`

---

### <a id="protocolSendStreamError"></a>`protocolSendStreamError`

> 📄 `h2_protocol.vx` L1105-1122

```vex
fn protocolSendStreamError(streamId: u32, result: StreamError): Option<H2ProtocolFrameResult>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `streamId` | `u32` |  |
| `result` | `StreamError` |  |

**Returns:** `Option&lt;H2ProtocolFrameResult&gt;`

---

### <a id="copyConnectionState"></a>`copyConnectionState`

> 📄 `h2_protocol.vx` L1124-1140

```vex
fn copyConnectionState(value: &H2ConnectionState): H2ConnectionState
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `&amp;H2ConnectionState` |  |

**Returns:** `H2ConnectionState`

---

### <a id="stageSentFieldSection"></a>`stageSentFieldSection`

> 📄 `h2_protocol.vx` L1144-1223

```vex
fn stageSentFieldSection(stream: &H2Stream!, role: &H2EndpointRole, endStream: bool, headers: &Vec<HpackHeader>): Option<str>
```

Validate one locally produced field section and stage its message phase.

Failure leaves the connection, stream and compression context untouched.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `stream` | `&amp;H2Stream!` |  |
| `role` | `&amp;H2EndpointRole` |  |
| `endStream` | `bool` |  |
| `headers` | `&amp;Vec&lt;HpackHeader&gt;` |  |

**Returns:** `Option&lt;str&gt;`

---

### <a id="pingToken"></a>`pingToken`

> 📄 `h2_protocol.vx` L1972-1981

```vex
fn pingToken(payload: str): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `payload` | `str` |  |

**Returns:** `u64`

---

### <a id="settingsPayloadError"></a>`settingsPayloadError`

> 📄 `h2_protocol.vx` L2604-2612

```vex
fn settingsPayloadError(frame: &H2Frame, payload: str): str
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `frame` | `&amp;H2Frame` |  |
| `payload` | `str` |  |

**Returns:** `str`

---

### <a id="read31"></a>`read31`

> 📄 `h2_protocol.vx` L2795-2800

```vex
fn read31(data: str, offset: usize): u32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |
| `offset` | `usize` |  |

**Returns:** `u32`

---

### <a id="headerFragment"></a>`headerFragment`

> 📄 `h2_protocol.vx` L2805-2860

```vex
fn headerFragment(frame: &H2Frame, payload: str): H2HeaderFragmentResult
```

Strip frame-local padding, legacy priority metadata and promised-ID fields

before appending only the HPACK fragment. All arithmetic is checked against
the exact payload length first.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `frame` | `&amp;H2Frame` |  |
| `payload` | `str` |  |

**Returns:** `H2HeaderFragmentResult`

---

### <a id="advanceMessageFraming"></a>`advanceMessageFraming` `🔓 export`

> 📄 `headers.vx` L66-108

```vex
export fn advanceMessageFraming(current: MessageFraming, name: str, value: str): MessageFraming
```

Apply one field to an in-progress framing decision.

The incremental Fiber parser and the fixed `ParserHeaders` parser both use
this transition, so an attacker cannot get a different body boundary by
choosing the server's fast parser instead of the canonical parser.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `current` | `MessageFraming` |  |
| `name` | `str` |  |
| `value` | `str` |  |

**Returns:** `MessageFraming`

---

### <a id="hasHeaderToken"></a>`hasHeaderToken` `🔓 export`

> 📄 `headers.vx` L196-217

```vex
export fn hasHeaderToken(value: str, expected: str): bool
```

Check one RFC token-list field without allocating or accepting a substring.

`Connection` may appear more than once and each field may contain a
comma-separated list, so exact whole-value equality is not sufficient for
connection lifetime or upgrade semantics. Fiber's incremental parser and
the fixed `ParserHeaders` path share this exact rule.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |
| `expected` | `str` |  |

**Returns:** `bool`

---

### <a id="isValidHostAuthority"></a>`isValidHostAuthority` `🔓 export`

> 📄 `headers.vx` L227-274

```vex
export fn isValidHostAuthority(value: str): bool
```

Validate the HTTP `Host` field's authority *shape* without allocation.

This deliberately validates the interpretation boundary needed by an origin
server: no user-info, path, query, fragment, unbracketed IPv6 ambiguity, or
invalid decimal port can reach host-based middleware. Bracketed literals
use the URI `IPv6address` / `IPvFuture` grammar, while socket address-family
resolution remains the networking layer's responsibility. Both HTTP/1
parser front doors call this helper.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |

**Returns:** `bool`

---

### <a id="isValidHostPort"></a>`isValidHostPort`

> 📄 `headers.vx` L276-282

```vex
fn isValidHostPort(value: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |

**Returns:** `bool`

---

### <a id="isValidHostRegName"></a>`isValidHostRegName`

> 📄 `headers.vx` L287-310

```vex
fn isValidHostRegName(value: str): bool
```

RFC 3986 `reg-name`: unreserved bytes, sub-delimiters, and complete

percent encodings. This is stricter than a generic HTTP field value, which
is important because a Host field becomes routing/security authority.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |

**Returns:** `bool`

---

### <a id="isValidIpLiteral"></a>`isValidIpLiteral`

> 📄 `headers.vx` L313-319

```vex
fn isValidIpLiteral(value: str): bool
```

RFC 3986 IP-literal payload (without the surrounding brackets).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |

**Returns:** `bool`

---

### <a id="isAsciiHex"></a>`isAsciiHex`

> 📄 `headers.vx` L321-324

```vex
fn isAsciiHex(value: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `u8` |  |

**Returns:** `bool`

---

### <a id="isValidIpvFuture"></a>`isValidIpvFuture`

> 📄 `headers.vx` L326-348

```vex
fn isValidIpvFuture(value: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |

**Returns:** `bool`

---

### <a id="isValidIpv4Address"></a>`isValidIpv4Address`

> 📄 `headers.vx` L350-369

```vex
fn isValidIpv4Address(value: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |

**Returns:** `bool`

---

### <a id="isValidIpv6Segment"></a>`isValidIpv6Segment`

> 📄 `headers.vx` L371-389

```vex
fn isValidIpv6Segment(value: str, isLast: bool): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |
| `isLast` | `bool` |  |

**Returns:** `usize`

---

### <a id="isValidIpv6Address"></a>`isValidIpv6Address`

> 📄 `headers.vx` L391-425

```vex
fn isValidIpv6Address(value: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |

**Returns:** `bool`

---

### <a id="parseHeaders"></a>`parseHeaders` `🔓 export`

> 📄 `headers.vx` L490-551

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
| `sc` | `&amp;Scanner!` |  |
| `hdrs` | `&amp;ParserHeaders!` |  |

**Returns:** `HeaderParseResult`

---

### <a id="main"></a>`main`

> 📄 `test_dt_min.vx` L2-25

```vex
fn main(): i32
```

**Returns:** `i32`

---

### <a id="newLifecycleSink"></a>`newLifecycleSink`

> 📄 `body.test.vx` L51-56

```vex
fn newLifecycleSink(): LifecycleSink
```

**Returns:** `LifecycleSink`

---

### <a id="test_body_content_length_preserves_pipeline_suffix"></a>`test_body_content_length_preserves_pipeline_suffix`

> 📄 `body.test.vx` L58-72

```vex
fn test_body_content_length_preserves_pipeline_suffix(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_body_content_length_fragmented"></a>`test_body_content_length_fragmented`

> 📄 `body.test.vx` L74-93

```vex
fn test_body_content_length_fragmented(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_body_content_length_limit_is_fail_closed"></a>`test_body_content_length_limit_is_fail_closed`

> 📄 `body.test.vx` L95-104

```vex
fn test_body_content_length_limit_is_fail_closed(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_body_no_body_consumes_nothing"></a>`test_body_no_body_consumes_nothing`

> 📄 `body.test.vx` L106-117

```vex
fn test_body_no_body_consumes_nothing(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_body_chunked_uses_canonical_decoder"></a>`test_body_chunked_uses_canonical_decoder`

> 📄 `body.test.vx` L119-132

```vex
fn test_body_chunked_uses_canonical_decoder(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_body_until_close_is_bounded"></a>`test_body_until_close_is_bounded`

> 📄 `body.test.vx` L134-149

```vex
fn test_body_until_close_is_bounded(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_body_reader_reset_reuses_state"></a>`test_body_reader_reset_reuses_state`

> 📄 `body.test.vx` L151-163

```vex
fn test_body_reader_reset_reuses_state(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_body_reader_streams_fixed_body_to_borrowed_sink"></a>`test_body_reader_streams_fixed_body_to_borrowed_sink`

> 📄 `body.test.vx` L165-179

```vex
fn test_body_reader_streams_fixed_body_to_borrowed_sink(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_body_reader_streams_fragmented_chunked_body_to_borrowed_sink"></a>`test_body_reader_streams_fragmented_chunked_body_to_borrowed_sink`

> 📄 `body.test.vx` L181-204

```vex
fn test_body_reader_streams_fragmented_chunked_body_to_borrowed_sink(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_body_reader_rejecting_sink_fails_closed"></a>`test_body_reader_rejecting_sink_fails_closed`

> 📄 `body.test.vx` L206-217

```vex
fn test_body_reader_rejecting_sink_fails_closed(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_request_body_lifecycle_finishes_once_and_preserves_suffix"></a>`test_request_body_lifecycle_finishes_once_and_preserves_suffix`

> 📄 `body.test.vx` L219-243

```vex
fn test_request_body_lifecycle_finishes_once_and_preserves_suffix(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_request_body_lifecycle_rejection_cancels_once"></a>`test_request_body_lifecycle_rejection_cancels_once`

> 📄 `body.test.vx` L245-260

```vex
fn test_request_body_lifecycle_rejection_cancels_once(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_request_body_lifecycle_eof_cancels_framed_body"></a>`test_request_body_lifecycle_eof_cancels_framed_body`

> 📄 `body.test.vx` L262-274

```vex
fn test_request_body_lifecycle_eof_cancels_framed_body(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_request_body_lifecycle_rejected_begin_is_terminal"></a>`test_request_body_lifecycle_rejected_begin_is_terminal`

> 📄 `body.test.vx` L276-286

```vex
fn test_request_body_lifecycle_rejected_begin_is_terminal(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_request_body_lifecycle_until_close_finishes_at_eof"></a>`test_request_body_lifecycle_until_close_finishes_at_eof`

> 📄 `body.test.vx` L288-301

```vex
fn test_request_body_lifecycle_until_close_finishes_at_eof(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_body_page_ring_is_fixed_and_wraps_at_page_boundaries"></a>`test_body_page_ring_is_fixed_and_wraps_at_page_boundaries`

> 📄 `body.test.vx` L303-336

```vex
fn test_body_page_ring_is_fixed_and_wraps_at_page_boundaries(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_body_page_ring_rejects_overflow_without_partial_mutation"></a>`test_body_page_ring_rejects_overflow_without_partial_mutation`

> 📄 `body.test.vx` L338-351

```vex
fn test_body_page_ring_rejects_overflow_without_partial_mutation(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_body_page_ring_direct_reservation_requires_bounded_commit"></a>`test_body_page_ring_direct_reservation_requires_bounded_commit`

> 📄 `body.test.vx` L353-372

```vex
fn test_body_page_ring_direct_reservation_requires_bounded_commit(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="feedMultipartOneByte"></a>`feedMultipartOneByte`

> 📄 `multipart.test.vx` L81-108

```vex
fn feedMultipartOneByte(input: str, boundary: str, limits: MultipartLimits, sink: &CaptureMultipartSink!): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `str` |  |
| `boundary` | `str` |  |
| `limits` | `MultipartLimits` |  |
| `sink` | `&amp;CaptureMultipartSink!` |  |

**Returns:** `bool`

---

### <a id="test_multipart_boundary_is_owned_strict_and_unambiguous"></a>`test_multipart_boundary_is_owned_strict_and_unambiguous`

> 📄 `multipart.test.vx` L110-128

```vex
fn test_multipart_boundary_is_owned_strict_and_unambiguous(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_multipart_streams_fragmented_parts_and_preserves_false_markers"></a>`test_multipart_streams_fragmented_parts_and_preserves_false_markers`

> 📄 `multipart.test.vx` L130-154

```vex
fn test_multipart_streams_fragmented_parts_and_preserves_false_markers(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_multipart_truncation_cancels_once"></a>`test_multipart_truncation_cancels_once`

> 📄 `multipart.test.vx` L156-177

```vex
fn test_multipart_truncation_cancels_once(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_multipart_part_limit_fails_closed"></a>`test_multipart_part_limit_fails_closed`

> 📄 `multipart.test.vx` L179-202

```vex
fn test_multipart_part_limit_fails_closed(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_multipart_header_budget_rejects_before_unbounded_growth"></a>`test_multipart_header_budget_rejects_before_unbounded_growth`

> 📄 `multipart.test.vx` L204-244

```vex
fn test_multipart_header_budget_rejects_before_unbounded_growth(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_chunked_complete_preserves_pipeline_suffix"></a>`test_chunked_complete_preserves_pipeline_suffix`

> 📄 `chunked.test.vx` L5-19

```vex
fn test_chunked_complete_preserves_pipeline_suffix(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_chunked_fragmented_size_data_and_crlf"></a>`test_chunked_fragmented_size_data_and_crlf`

> 📄 `chunked.test.vx` L21-56

```vex
fn test_chunked_fragmented_size_data_and_crlf(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_chunked_fragmented_multi_chunk_trailer_and_pipeline"></a>`test_chunked_fragmented_multi_chunk_trailer_and_pipeline`

> 📄 `chunked.test.vx` L58-86

```vex
fn test_chunked_fragmented_multi_chunk_trailer_and_pipeline(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_chunked_extension_and_trailer"></a>`test_chunked_extension_and_trailer`

> 📄 `chunked.test.vx` L88-98

```vex
fn test_chunked_extension_and_trailer(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_chunked_rejects_forbidden_trailer"></a>`test_chunked_rejects_forbidden_trailer`

> 📄 `chunked.test.vx` L100-107

```vex
fn test_chunked_rejects_forbidden_trailer(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_chunked_rejects_invalid_size_suffix"></a>`test_chunked_rejects_invalid_size_suffix`

> 📄 `chunked.test.vx` L109-116

```vex
fn test_chunked_rejects_invalid_size_suffix(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_chunked_enforces_decoded_body_limit_before_write"></a>`test_chunked_enforces_decoded_body_limit_before_write`

> 📄 `chunked.test.vx` L118-127

```vex
fn test_chunked_enforces_decoded_body_limit_before_write(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_chunked_empty_and_reset"></a>`test_chunked_empty_and_reset`

> 📄 `chunked.test.vx` L129-140

```vex
fn test_chunked_empty_and_reset(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="wb"></a>`wb`

> 📄 `h2.test.vx` L27-27

```vex
fn wb(p: Ptr<u8!>, i: usize, v: i64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8!&gt;` |  |
| `i` | `usize` |  |
| `v` | `i64` |  |

---

### <a id="mkstr"></a>`mkstr`

> 📄 `h2.test.vx` L28-28

```vex
fn mkstr(p: Ptr<u8>, n: usize): str
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8&gt;` |  |
| `n` | `usize` |  |

**Returns:** `str`

---

### <a id="copyStr"></a>`copyStr`

> 📄 `h2.test.vx` L29-32

```vex
fn copyStr(p: Ptr<u8!>, offset: usize, s: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8!&gt;` |  |
| `offset` | `usize` |  |
| `s` | `str` |  |

---

### <a id="writeH2Header"></a>`writeH2Header`

> 📄 `h2.test.vx` L35-45

```vex
fn writeH2Header(p: Ptr<u8!>, off: usize, length: i64, frameType: i64, flags: i64, streamId: i64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8!&gt;` |  |
| `off` | `usize` |  |
| `length` | `i64` |  |
| `frameType` | `i64` |  |
| `flags` | `i64` |  |
| `streamId` | `i64` |  |

---

### <a id="test_h2_parse_data_frame"></a>`test_h2_parse_data_frame`

> 📄 `h2.test.vx` L51-67

```vex
fn test_h2_parse_data_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_parse_headers_frame"></a>`test_h2_parse_headers_frame`

> 📄 `h2.test.vx` L69-85

```vex
fn test_h2_parse_headers_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_parse_settings_frame"></a>`test_h2_parse_settings_frame`

> 📄 `h2.test.vx` L87-101

```vex
fn test_h2_parse_settings_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_parse_settings_ack"></a>`test_h2_parse_settings_ack`

> 📄 `h2.test.vx` L103-115

```vex
fn test_h2_parse_settings_ack(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_parse_ping_frame"></a>`test_h2_parse_ping_frame`

> 📄 `h2.test.vx` L117-132

```vex
fn test_h2_parse_ping_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_parse_goaway_frame"></a>`test_h2_parse_goaway_frame`

> 📄 `h2.test.vx` L134-149

```vex
fn test_h2_parse_goaway_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_parse_window_update"></a>`test_h2_parse_window_update`

> 📄 `h2.test.vx` L151-166

```vex
fn test_h2_parse_window_update(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_need_more_short"></a>`test_h2_need_more_short`

> 📄 `h2.test.vx` L172-184

```vex
fn test_h2_need_more_short(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_need_more_empty"></a>`test_h2_need_more_empty`

> 📄 `h2.test.vx` L186-194

```vex
fn test_h2_need_more_empty(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_frame_flags"></a>`test_h2_frame_flags`

> 📄 `h2.test.vx` L200-215

```vex
fn test_h2_frame_flags(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_rejects_connection_data_frame"></a>`test_h2_rejects_connection_data_frame`

> 📄 `h2.test.vx` L217-226

```vex
fn test_h2_rejects_connection_data_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_rejects_settings_ack_payload"></a>`test_h2_rejects_settings_ack_payload`

> 📄 `h2.test.vx` L228-237

```vex
fn test_h2_rejects_settings_ack_payload(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_enforces_negotiated_frame_size"></a>`test_h2_enforces_negotiated_frame_size`

> 📄 `h2.test.vx` L239-255

```vex
fn test_h2_enforces_negotiated_frame_size(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_parse_error_scope_matches_rfc_9113"></a>`test_h2_parse_error_scope_matches_rfc_9113`

> 📄 `h2.test.vx` L257-295

```vex
fn test_h2_parse_error_scope_matches_rfc_9113(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_parse_separates_local_config_from_peer_errors"></a>`test_h2_parse_separates_local_config_from_peer_errors`

> 📄 `h2.test.vx` L297-311

```vex
fn test_h2_parse_separates_local_config_from_peer_errors(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_settings_defaults"></a>`test_h2_settings_defaults`

> 📄 `h2.test.vx` L317-325

```vex
fn test_h2_settings_defaults(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_parse_settings_payload"></a>`test_h2_parse_settings_payload`

> 📄 `h2.test.vx` L327-338

```vex
fn test_h2_parse_settings_payload(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_parse_settings_update_preserves_omitted_values_and_wire_order"></a>`test_h2_parse_settings_update_preserves_omitted_values_and_wire_order`

> 📄 `h2.test.vx` L340-360

```vex
fn test_h2_parse_settings_update_preserves_omitted_values_and_wire_order(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_parse_settings_invalid_len"></a>`test_h2_parse_settings_invalid_len`

> 📄 `h2.test.vx` L362-370

```vex
fn test_h2_parse_settings_invalid_len(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_parse_settings_is_transactional"></a>`test_h2_parse_settings_is_transactional`

> 📄 `h2.test.vx` L372-380

```vex
fn test_h2_parse_settings_is_transactional(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_parse_settings_rejects_invalid_window_and_frame_size"></a>`test_h2_parse_settings_rejects_invalid_window_and_frame_size`

> 📄 `h2.test.vx` L382-391

```vex
fn test_h2_parse_settings_rejects_invalid_window_and_frame_size(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_parse_goaway_payload"></a>`test_h2_parse_goaway_payload`

> 📄 `h2.test.vx` L397-410

```vex
fn test_h2_parse_goaway_payload(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_parse_goaway_with_debug"></a>`test_h2_parse_goaway_with_debug`

> 📄 `h2.test.vx` L412-427

```vex
fn test_h2_parse_goaway_with_debug(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_parse_goaway_rejects_truncation"></a>`test_h2_parse_goaway_rejects_truncation`

> 📄 `h2.test.vx` L429-435

```vex
fn test_h2_parse_goaway_rejects_truncation(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_parse_window_update_is_typed_and_strict"></a>`test_h2_parse_window_update_is_typed_and_strict`

> 📄 `h2.test.vx` L437-453

```vex
fn test_h2_parse_window_update_is_typed_and_strict(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_parse_rst_stream_preserves_open_error_code_space"></a>`test_h2_parse_rst_stream_preserves_open_error_code_space`

> 📄 `h2.test.vx` L455-468

```vex
fn test_h2_parse_rst_stream_preserves_open_error_code_space(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_encode_header_validates_before_write"></a>`test_h2_encode_header_validates_before_write`

> 📄 `h2.test.vx` L474-484

```vex
fn test_h2_encode_header_validates_before_write(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_encode_settings_frame_is_complete"></a>`test_h2_encode_settings_frame_is_complete`

> 📄 `h2.test.vx` L486-499

```vex
fn test_h2_encode_settings_frame_is_complete(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_encode_selected_settings_omits_role_forbidden_defaults"></a>`test_h2_encode_selected_settings_omits_role_forbidden_defaults`

> 📄 `h2.test.vx` L501-518

```vex
fn test_h2_encode_selected_settings_omits_role_forbidden_defaults(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_encode_settings_rejects_small_output_atomically"></a>`test_h2_encode_settings_rejects_small_output_atomically`

> 📄 `h2.test.vx` L520-531

```vex
fn test_h2_encode_settings_rejects_small_output_atomically(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_encode_control_frame_boundaries"></a>`test_h2_encode_control_frame_boundaries`

> 📄 `h2.test.vx` L533-575

```vex
fn test_h2_encode_control_frame_boundaries(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_frame_header_size"></a>`test_h2_frame_header_size`

> 📄 `h2.test.vx` L581-583

```vex
fn test_h2_frame_header_size(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_frame_types"></a>`test_h2_frame_types`

> 📄 `h2.test.vx` L585-596

```vex
fn test_h2_frame_types(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_error_codes"></a>`test_h2_error_codes`

> 📄 `h2.test.vx` L598-602

```vex
fn test_h2_error_codes(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_find_crlf_simd"></a>`test_find_crlf_simd`

> 📄 `test_find_crlf.vx` L4-12

```vex
fn test_find_crlf_simd(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_scanner_not_found_uses_usize_sentinel"></a>`test_scanner_not_found_uses_usize_sentinel`

> 📄 `test_find_crlf.vx` L14-26

```vex
fn test_scanner_not_found_uses_usize_sentinel(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_scanner_fixed_simd_block_scalar_tail_boundary"></a>`test_scanner_fixed_simd_block_scalar_tail_boundary`

> 📄 `test_find_crlf.vx` L28-45

```vex
fn test_scanner_fixed_simd_block_scalar_tail_boundary(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="protocol"></a>`protocol`

> 📄 `h2_protocol.test.vx` L29-39

```vex
fn protocol(role: H2EndpointRole, capacity: u32): Option<H2ProtocolState>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `role` | `H2EndpointRole` |  |
| `capacity` | `u32` |  |

**Returns:** `Option&lt;H2ProtocolState&gt;`

---

### <a id="frame"></a>`frame`

> 📄 `h2_protocol.test.vx` L41-48

```vex
fn frame(frameType: u8, flags: u8, streamId: u32): H2Frame
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `frameType` | `u8` |  |
| `flags` | `u8` |  |
| `streamId` | `u32` |  |

**Returns:** `H2Frame`

---

### <a id="payloadFrame"></a>`payloadFrame`

> 📄 `h2_protocol.test.vx` L50-57

```vex
fn payloadFrame(frameType: u8, flags: u8, streamId: u32, length: usize): H2Frame
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `frameType` | `u8` |  |
| `flags` | `u8` |  |
| `streamId` | `u32` |  |
| `length` | `usize` |  |

**Returns:** `H2Frame`

---

### <a id="bytes"></a>`bytes`

> 📄 `h2_protocol.test.vx` L59-61

```vex
fn bytes(pointer: Ptr<u8>, length: usize): str
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `pointer` | `Ptr&lt;u8&gt;` |  |
| `length` | `usize` |  |

**Returns:** `str`

---

### <a id="wireFrame"></a>`wireFrame`

> 📄 `h2_protocol.test.vx` L63-83

```vex
fn wireFrame(value: &H2Frame, payload: str): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `&amp;H2Frame` |  |
| `payload` | `str` |  |

**Returns:** `string`

---

### <a id="concatBytes"></a>`concatBytes`

> 📄 `h2_protocol.test.vx` L85-100

```vex
fn concatBytes(first: str, second: str): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `first` | `str` |  |
| `second` | `str` |  |

**Returns:** `string`

---

### <a id="windowPayload"></a>`windowPayload`

> 📄 `h2_protocol.test.vx` L102-109

```vex
fn windowPayload(increment: u32): [u8; 4]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `increment` | `u32` |  |

**Returns:** `[u8; 4]`

---

### <a id="goAwayPayload"></a>`goAwayPayload`

> 📄 `h2_protocol.test.vx` L111-122

```vex
fn goAwayPayload(lastStreamId: u32, errorCode: u32): [u8; 8]
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `lastStreamId` | `u32` |  |
| `errorCode` | `u32` |  |

**Returns:** `[u8; 8]`

---

### <a id="priorityPayload"></a>`priorityPayload`

> 📄 `h2_protocol.test.vx` L124-142

```vex
fn priorityPayload(streamId: u32, priority: &H2Priority): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `streamId` | `u32` |  |
| `priority` | `&amp;H2Priority` |  |

**Returns:** `string`

---

### <a id="receivePriority"></a>`receivePriority`

> 📄 `h2_protocol.test.vx` L144-152

```vex
fn receivePriority(state: &H2ProtocolState!, streamId: u32, priority: H2Priority): H2ReceivePriorityResult
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `state` | `&amp;H2ProtocolState!` |  |
| `streamId` | `u32` |  |
| `priority` | `H2Priority` |  |

**Returns:** `H2ReceivePriorityResult`

---

### <a id="requestFields"></a>`requestFields`

> 📄 `h2_protocol.test.vx` L154-161

```vex
fn requestFields(authority: str): Vec<HpackHeader>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `authority` | `str` |  |

**Returns:** `Vec&lt;HpackHeader&gt;`

---

### <a id="responseFields"></a>`responseFields`

> 📄 `h2_protocol.test.vx` L163-167

```vex
fn responseFields(status: str): Vec<HpackHeader>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `status` | `str` |  |

**Returns:** `Vec&lt;HpackHeader&gt;`

---

### <a id="sendRequestHeaders"></a>`sendRequestHeaders`

> 📄 `h2_protocol.test.vx` L169-176

```vex
fn sendRequestHeaders(state: &H2ProtocolState!, streamId: u32, endStream: bool): H2SendHeaderResult
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `state` | `&amp;H2ProtocolState!` |  |
| `streamId` | `u32` |  |
| `endStream` | `bool` |  |

**Returns:** `H2SendHeaderResult`

---

### <a id="sendResponseHeaders"></a>`sendResponseHeaders`

> 📄 `h2_protocol.test.vx` L178-185

```vex
fn sendResponseHeaders(state: &H2ProtocolState!, streamId: u32, status: str, endStream: bool): H2SendHeaderResult
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `state` | `&amp;H2ProtocolState!` |  |
| `streamId` | `u32` |  |
| `status` | `str` |  |
| `endStream` | `bool` |  |

**Returns:** `H2SendHeaderResult`

---

### <a id="pushServer"></a>`pushServer`

> 📄 `h2_protocol.test.vx` L187-202

```vex
fn pushServer(capacity: u32): Option<H2ProtocolState>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `capacity` | `u32` |  |

**Returns:** `Option&lt;H2ProtocolState&gt;`

---

### <a id="test_h2_protocol_configuration_is_bounded_and_validated"></a>`test_h2_protocol_configuration_is_bounded_and_validated`

> 📄 `h2_protocol.test.vx` L204-231

```vex
fn test_h2_protocol_configuration_is_bounded_and_validated(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_inbound_dispatch_owns_new_stream_admission"></a>`test_h2_protocol_inbound_dispatch_owns_new_stream_admission`

> 📄 `h2_protocol.test.vx` L233-265

```vex
fn test_h2_protocol_inbound_dispatch_owns_new_stream_admission(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_refused_headers_still_advance_hpack_before_slot_reuse"></a>`test_h2_protocol_refused_headers_still_advance_hpack_before_slot_reuse`

> 📄 `h2_protocol.test.vx` L267-316

```vex
fn test_h2_protocol_refused_headers_still_advance_hpack_before_slot_reuse(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_inbound_dispatch_routes_control_extension_and_header_lock"></a>`test_h2_protocol_inbound_dispatch_routes_control_extension_and_header_lock`

> 📄 `h2_protocol.test.vx` L318-358

```vex
fn test_h2_protocol_inbound_dispatch_routes_control_extension_and_header_lock(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_ingress_retains_partial_valid_frame_without_copying"></a>`test_h2_protocol_ingress_retains_partial_valid_frame_without_copying`

> 📄 `h2_protocol.test.vx` L360-381

```vex
fn test_h2_protocol_ingress_retains_partial_valid_frame_without_copying(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_ingress_stream_discards_rejected_payload_incrementally"></a>`test_h2_protocol_ingress_stream_discards_rejected_payload_incrementally`

> 📄 `h2_protocol.test.vx` L383-424

```vex
fn test_h2_protocol_ingress_stream_discards_rejected_payload_incrementally(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_abort_clears_pending_ingress_discard"></a>`test_h2_protocol_abort_clears_pending_ingress_discard`

> 📄 `h2_protocol.test.vx` L426-445

```vex
fn test_h2_protocol_abort_clears_pending_ingress_discard(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_unifies_active_and_idle_priority_capacity"></a>`test_h2_protocol_unifies_active_and_idle_priority_capacity`

> 📄 `h2_protocol.test.vx` L447-482

```vex
fn test_h2_protocol_unifies_active_and_idle_priority_capacity(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_discards_unknown_extensions_without_bypassing_header_lock"></a>`test_h2_protocol_discards_unknown_extensions_without_bypassing_header_lock`

> 📄 `h2_protocol.test.vx` L484-518

```vex
fn test_h2_protocol_discards_unknown_extensions_without_bypassing_header_lock(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_prunes_priorities_for_implicitly_closed_idle_ids"></a>`test_h2_protocol_prunes_priorities_for_implicitly_closed_idle_ids`

> 📄 `h2_protocol.test.vx` L520-549

```vex
fn test_h2_protocol_prunes_priorities_for_implicitly_closed_idle_ids(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_local_admission_and_idle_cancellation_are_atomic"></a>`test_h2_protocol_local_admission_and_idle_cancellation_are_atomic`

> 📄 `h2_protocol.test.vx` L551-580

```vex
fn test_h2_protocol_local_admission_and_idle_cancellation_are_atomic(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_active_reset_commits_wire_and_scheduler_atomically"></a>`test_h2_protocol_active_reset_commits_wire_and_scheduler_atomically`

> 📄 `h2_protocol.test.vx` L582-632

```vex
fn test_h2_protocol_active_reset_commits_wire_and_scheduler_atomically(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_receive_stream_error_retains_exact_wire_reset_obligation"></a>`test_h2_protocol_receive_stream_error_retains_exact_wire_reset_obligation`

> 📄 `h2_protocol.test.vx` L634-676

```vex
fn test_h2_protocol_receive_stream_error_retains_exact_wire_reset_obligation(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_received_reset_owns_payload_idle_scope_and_bypass"></a>`test_h2_protocol_received_reset_owns_payload_idle_scope_and_bypass`

> 📄 `h2_protocol.test.vx` L678-713

```vex
fn test_h2_protocol_received_reset_owns_payload_idle_scope_and_bypass(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_malformed_reset_is_terminal_without_partial_retirement"></a>`test_h2_protocol_malformed_reset_is_terminal_without_partial_retirement`

> 📄 `h2_protocol.test.vx` L715-728

```vex
fn test_h2_protocol_malformed_reset_is_terminal_without_partial_retirement(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_frame_transitions_are_transactional_and_retire_naturally"></a>`test_h2_protocol_frame_transitions_are_transactional_and_retire_naturally`

> 📄 `h2_protocol.test.vx` L730-805

```vex
fn test_h2_protocol_frame_transitions_are_transactional_and_retire_naturally(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_data_owner_strips_padding_and_charges_complete_payload"></a>`test_h2_protocol_data_owner_strips_padding_and_charges_complete_payload`

> 📄 `h2_protocol.test.vx` L807-843

```vex
fn test_h2_protocol_data_owner_strips_padding_and_charges_complete_payload(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_data_send_commits_padding_flow_and_state_together"></a>`test_h2_protocol_data_send_commits_padding_flow_and_state_together`

> 📄 `h2_protocol.test.vx` L845-882

```vex
fn test_h2_protocol_data_send_commits_padding_flow_and_state_together(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_malformed_data_payload_fails_connection_without_partial_stream_state"></a>`test_h2_protocol_malformed_data_payload_fails_connection_without_partial_stream_state`

> 📄 `h2_protocol.test.vx` L884-895

```vex
fn test_h2_protocol_malformed_data_payload_fails_connection_without_partial_stream_state(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_missing_data_pad_length_is_stream_scoped_and_sequenced"></a>`test_h2_protocol_missing_data_pad_length_is_stream_scoped_and_sequenced`

> 📄 `h2_protocol.test.vx` L897-926

```vex
fn test_h2_protocol_missing_data_pad_length_is_stream_scoped_and_sequenced(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="contentLengthRequestFrame"></a>`contentLengthRequestFrame`

> 📄 `h2_protocol.test.vx` L928-940

```vex
fn contentLengthRequestFrame(streamId: u32, lengthDigit: u8, endStream: bool): (H2Frame, [u8; 7])
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `streamId` | `u32` |  |
| `lengthDigit` | `u8` |  |
| `endStream` | `bool` |  |

**Returns:** `(H2Frame, [u8; 7])`

---

### <a id="test_h2_protocol_content_length_tracks_application_data_not_padding"></a>`test_h2_protocol_content_length_tracks_application_data_not_padding`

> 📄 `h2_protocol.test.vx` L942-994

```vex
fn test_h2_protocol_content_length_tracks_application_data_not_padding(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_outgoing_content_length_is_atomic_with_data_commit"></a>`test_h2_protocol_outgoing_content_length_is_atomic_with_data_commit`

> 📄 `h2_protocol.test.vx` L996-1029

```vex
fn test_h2_protocol_outgoing_content_length_is_atomic_with_data_commit(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_discarded_closed_stream_data_preserves_connection_flow"></a>`test_h2_protocol_discarded_closed_stream_data_preserves_connection_flow`

> 📄 `h2_protocol.test.vx` L1031-1074

```vex
fn test_h2_protocol_discarded_closed_stream_data_preserves_connection_flow(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_window_update_owner_is_scoped_atomic_and_unbypassable"></a>`test_h2_protocol_window_update_owner_is_scoped_atomic_and_unbypassable`

> 📄 `h2_protocol.test.vx` L1076-1138

```vex
fn test_h2_protocol_window_update_owner_is_scoped_atomic_and_unbypassable(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_flow_control_parks_and_wakes_pending_work"></a>`test_h2_protocol_flow_control_parks_and_wakes_pending_work`

> 📄 `h2_protocol.test.vx` L1140-1200

```vex
fn test_h2_protocol_flow_control_parks_and_wakes_pending_work(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_connection_credit_gates_all_pending_streams"></a>`test_h2_protocol_connection_credit_gates_all_pending_streams`

> 📄 `h2_protocol.test.vx` L1202-1234

```vex
fn test_h2_protocol_connection_credit_gates_all_pending_streams(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_goaway_retires_work_outside_processed_boundaries"></a>`test_h2_protocol_goaway_retires_work_outside_processed_boundaries`

> 📄 `h2_protocol.test.vx` L1236-1303

```vex
fn test_h2_protocol_goaway_retires_work_outside_processed_boundaries(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_goaway_shape_and_boundary_fail_connection_atomically"></a>`test_h2_protocol_goaway_shape_and_boundary_fail_connection_atomically`

> 📄 `h2_protocol.test.vx` L1305-1337

```vex
fn test_h2_protocol_goaway_shape_and_boundary_fail_connection_atomically(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_ping_owner_is_bounded_correlated_and_unbypassable"></a>`test_h2_protocol_ping_owner_is_bounded_correlated_and_unbypassable`

> 📄 `h2_protocol.test.vx` L1339-1422

```vex
fn test_h2_protocol_ping_owner_is_bounded_correlated_and_unbypassable(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_ping_shape_and_interleaving_fail_connection"></a>`test_h2_protocol_ping_shape_and_interleaving_fail_connection`

> 📄 `h2_protocol.test.vx` L1424-1452

```vex
fn test_h2_protocol_ping_shape_and_interleaving_fail_connection(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_priority_update_owns_wire_scheduler_and_direction"></a>`test_h2_protocol_priority_update_owns_wire_scheduler_and_direction`

> 📄 `h2_protocol.test.vx` L1454-1521

```vex
fn test_h2_protocol_priority_update_owns_wire_scheduler_and_direction(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_priority_update_malformed_direction_and_interleaving_fail_closed"></a>`test_h2_protocol_priority_update_malformed_direction_and_interleaving_fail_closed`

> 📄 `h2_protocol.test.vx` L1523-1576

```vex
fn test_h2_protocol_priority_update_malformed_direction_and_interleaving_fail_closed(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_legacy_priority_is_exact_compatible_and_unbypassable"></a>`test_h2_protocol_legacy_priority_is_exact_compatible_and_unbypassable`

> 📄 `h2_protocol.test.vx` L1578-1647

```vex
fn test_h2_protocol_legacy_priority_is_exact_compatible_and_unbypassable(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_legacy_priority_preserves_error_scope_and_header_lock"></a>`test_h2_protocol_legacy_priority_preserves_error_scope_and_header_lock`

> 📄 `h2_protocol.test.vx` L1649-1711

```vex
fn test_h2_protocol_legacy_priority_preserves_error_scope_and_header_lock(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_abort_revokes_every_stream_and_lease_once"></a>`test_h2_protocol_abort_revokes_every_stream_and_lease_once`

> 📄 `h2_protocol.test.vx` L1713-1737

```vex
fn test_h2_protocol_abort_revokes_every_stream_and_lease_once(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_reassembles_headers_and_retains_dynamic_table"></a>`test_h2_protocol_reassembles_headers_and_retains_dynamic_table`

> 📄 `h2_protocol.test.vx` L1739-1777

```vex
fn test_h2_protocol_reassembles_headers_and_retains_dynamic_table(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_peer_cannot_open_locally_owned_idle_stream"></a>`test_h2_protocol_peer_cannot_open_locally_owned_idle_stream`

> 📄 `h2_protocol.test.vx` L1779-1794

```vex
fn test_h2_protocol_peer_cannot_open_locally_owned_idle_stream(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_strips_header_padding_and_priority_metadata"></a>`test_h2_protocol_strips_header_padding_and_priority_metadata`

> 📄 `h2_protocol.test.vx` L1796-1813

```vex
fn test_h2_protocol_strips_header_padding_and_priority_metadata(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_headers_legacy_self_dependency_is_delayed_stream_error"></a>`test_h2_protocol_headers_legacy_self_dependency_is_delayed_stream_error`

> 📄 `h2_protocol.test.vx` L1815-1847

```vex
fn test_h2_protocol_headers_legacy_self_dependency_is_delayed_stream_error(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_header_limits_and_payload_shape_fail_closed"></a>`test_h2_protocol_header_limits_and_payload_shape_fail_closed`

> 📄 `h2_protocol.test.vx` L1849-1888

```vex
fn test_h2_protocol_header_limits_and_payload_shape_fail_closed(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_compression_error_is_connection_terminal"></a>`test_h2_protocol_compression_error_is_connection_terminal`

> 📄 `h2_protocol.test.vx` L1890-1905

```vex
fn test_h2_protocol_compression_error_is_connection_terminal(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_malformed_fields_are_stream_scoped_after_hpack_decode"></a>`test_h2_protocol_malformed_fields_are_stream_scoped_after_hpack_decode`

> 📄 `h2_protocol.test.vx` L1907-1933

```vex
fn test_h2_protocol_malformed_fields_are_stream_scoped_after_hpack_decode(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_tracks_informational_final_and_trailer_phases"></a>`test_h2_protocol_tracks_informational_final_and_trailer_phases`

> 📄 `h2_protocol.test.vx` L1935-1971

```vex
fn test_h2_protocol_tracks_informational_final_and_trailer_phases(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_malformed_push_consumes_and_retires_promised_stream"></a>`test_h2_protocol_malformed_push_consumes_and_retires_promised_stream`

> 📄 `h2_protocol.test.vx` L1973-1994

```vex
fn test_h2_protocol_malformed_push_consumes_and_retires_promised_stream(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_stream_error_still_advances_shared_hpack_context"></a>`test_h2_protocol_stream_error_still_advances_shared_hpack_context`

> 📄 `h2_protocol.test.vx` L1996-2035

```vex
fn test_h2_protocol_stream_error_still_advances_shared_hpack_context(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_push_promise_reserves_peer_stream_atomically"></a>`test_h2_protocol_push_promise_reserves_peer_stream_atomically`

> 📄 `h2_protocol.test.vx` L2037-2081

```vex
fn test_h2_protocol_push_promise_reserves_peer_stream_atomically(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_settings_apply_peer_values_and_ack_fifo"></a>`test_h2_protocol_settings_apply_peer_values_and_ack_fifo`

> 📄 `h2_protocol.test.vx` L2083-2133

```vex
fn test_h2_protocol_settings_apply_peer_values_and_ack_fifo(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_acknowledged_hpack_reduction_is_enforced_at_block_boundary"></a>`test_h2_protocol_acknowledged_hpack_reduction_is_enforced_at_block_boundary`

> 📄 `h2_protocol.test.vx` L2135-2169

```vex
fn test_h2_protocol_acknowledged_hpack_reduction_is_enforced_at_block_boundary(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_local_settings_bound_remote_admission_after_ack"></a>`test_h2_protocol_local_settings_bound_remote_admission_after_ack`

> 📄 `h2_protocol.test.vx` L2171-2185

```vex
fn test_h2_protocol_local_settings_bound_remote_admission_after_ack(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_settings_queue_is_bounded_and_generic_apis_cannot_bypass_it"></a>`test_h2_protocol_settings_queue_is_bounded_and_generic_apis_cannot_bypass_it`

> 📄 `h2_protocol.test.vx` L2187-2215

```vex
fn test_h2_protocol_settings_queue_is_bounded_and_generic_apis_cannot_bypass_it(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_acknowledged_push_disable_is_terminal_for_push_promise"></a>`test_h2_protocol_acknowledged_push_disable_is_terminal_for_push_promise`

> 📄 `h2_protocol.test.vx` L2217-2235

```vex
fn test_h2_protocol_acknowledged_push_disable_is_terminal_for_push_promise(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_unexpected_settings_ack_is_connection_terminal"></a>`test_h2_protocol_unexpected_settings_ack_is_connection_terminal`

> 📄 `h2_protocol.test.vx` L2237-2249

```vex
fn test_h2_protocol_unexpected_settings_ack_is_connection_terminal(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_invalid_initial_window_uses_flow_control_error"></a>`test_h2_protocol_invalid_initial_window_uses_flow_control_error`

> 📄 `h2_protocol.test.vx` L2251-2264

```vex
fn test_h2_protocol_invalid_initial_window_uses_flow_control_error(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_send_header_owner_commits_semantics_and_hpack_together"></a>`test_h2_protocol_send_header_owner_commits_semantics_and_hpack_together`

> 📄 `h2_protocol.test.vx` L2266-2314

```vex
fn test_h2_protocol_send_header_owner_commits_semantics_and_hpack_together(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_peer_table_setting_drives_next_outbound_block"></a>`test_h2_protocol_peer_table_setting_drives_next_outbound_block`

> 📄 `h2_protocol.test.vx` L2316-2346

```vex
fn test_h2_protocol_peer_table_setting_drives_next_outbound_block(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_send_response_tracks_informational_final_and_trailers"></a>`test_h2_protocol_send_response_tracks_informational_final_and_trailers`

> 📄 `h2_protocol.test.vx` L2348-2395

```vex
fn test_h2_protocol_send_response_tracks_informational_final_and_trailers(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_outbound_header_cursor_fragments_without_copying"></a>`test_h2_protocol_outbound_header_cursor_fragments_without_copying`

> 📄 `h2_protocol.test.vx` L2397-2467

```vex
fn test_h2_protocol_outbound_header_cursor_fragments_without_copying(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_send_push_promise_commits_reservation_and_prefix"></a>`test_h2_protocol_send_push_promise_commits_reservation_and_prefix`

> 📄 `h2_protocol.test.vx` L2469-2518

```vex
fn test_h2_protocol_send_push_promise_commits_reservation_and_prefix(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_push_cursor_reserves_prefix_before_fragmenting"></a>`test_h2_protocol_push_cursor_reserves_prefix_before_fragmenting`

> 📄 `h2_protocol.test.vx` L2520-2591

```vex
fn test_h2_protocol_push_cursor_reserves_prefix_before_fragmenting(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_failed_push_restores_id_slot_scheduler_and_hpack"></a>`test_h2_protocol_failed_push_restores_id_slot_scheduler_and_hpack`

> 📄 `h2_protocol.test.vx` L2593-2620

```vex
fn test_h2_protocol_failed_push_restores_id_slot_scheduler_and_hpack(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_protocol_send_push_obeys_direction_setting_and_semantics"></a>`test_h2_protocol_send_push_obeys_direction_setting_and_semantics`

> 📄 `h2_protocol.test.vx` L2622-2659

```vex
fn test_h2_protocol_send_push_obeys_direction_setting_and_semantics(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="frame"></a>`frame`

> 📄 `h2_connection.test.vx` L20-22

```vex
fn frame(frameType: u8, flags: u8, streamId: u32): H2Frame
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `frameType` | `u8` |  |
| `flags` | `u8` |  |
| `streamId` | `u32` |  |

**Returns:** `H2Frame`

---

### <a id="goAway"></a>`goAway`

> 📄 `h2_connection.test.vx` L24-26

```vex
fn goAway(lastStreamId: u32): GoAway
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `lastStreamId` | `u32` |  |

**Returns:** `GoAway`

---

### <a id="clientState"></a>`clientState`

> 📄 `h2_connection.test.vx` L28-30

```vex
fn clientState(): H2ConnectionState
```

**Returns:** `H2ConnectionState`

---

### <a id="test_h2_connection_reassembles_one_stream_header_block"></a>`test_h2_connection_reassembles_one_stream_header_block`

> 📄 `h2_connection.test.vx` L32-47

```vex
fn test_h2_connection_reassembles_one_stream_header_block(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_connection_rejects_interleaving_without_losing_lock"></a>`test_h2_connection_rejects_interleaving_without_losing_lock`

> 📄 `h2_connection.test.vx` L49-61

```vex
fn test_h2_connection_rejects_interleaving_without_losing_lock(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_connection_send_and_receive_locks_are_independent"></a>`test_h2_connection_send_and_receive_locks_are_independent`

> 📄 `h2_connection.test.vx` L63-70

```vex
fn test_h2_connection_send_and_receive_locks_are_independent(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_connection_tracks_settings_acknowledgements"></a>`test_h2_connection_tracks_settings_acknowledgements`

> 📄 `h2_connection.test.vx` L72-101

```vex
fn test_h2_connection_tracks_settings_acknowledgements(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_connection_goaway_last_stream_id_never_increases"></a>`test_h2_connection_goaway_last_stream_id_never_increases`

> 📄 `h2_connection.test.vx` L103-122

```vex
fn test_h2_connection_goaway_last_stream_id_never_increases(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_connection_rejects_orphan_continuation"></a>`test_h2_connection_rejects_orphan_continuation`

> 📄 `h2_connection.test.vx` L124-130

```vex
fn test_h2_connection_rejects_orphan_continuation(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_priority_update_direction_is_client_only"></a>`test_h2_priority_update_direction_is_client_only`

> 📄 `h2_connection.test.vx` L132-157

```vex
fn test_h2_priority_update_direction_is_client_only(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_priority_update_buffers_idle_requests_under_one_capacity_owner"></a>`test_h2_priority_update_buffers_idle_requests_under_one_capacity_owner`

> 📄 `h2_connection.test.vx` L159-195

```vex
fn test_h2_priority_update_buffers_idle_requests_under_one_capacity_owner(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_priority_update_rejects_unpromised_push_and_discards_closed"></a>`test_h2_priority_update_rejects_unpromised_push_and_discards_closed`

> 📄 `h2_connection.test.vx` L197-217

```vex
fn test_h2_priority_update_rejects_unpromised_push_and_discards_closed(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_priority_update_discards_closed_targets_after_slot_reuse"></a>`test_h2_priority_update_discards_closed_targets_after_slot_reuse`

> 📄 `h2_connection.test.vx` L219-252

```vex
fn test_h2_priority_update_discards_closed_targets_after_slot_reuse(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_admission_assigns_role_owned_stream_ids"></a>`test_h2_admission_assigns_role_owned_stream_ids`

> 📄 `h2_connection.test.vx` L254-274

```vex
fn test_h2_admission_assigns_role_owned_stream_ids(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_admission_enforces_peer_parity_and_monotonicity"></a>`test_h2_admission_enforces_peer_parity_and_monotonicity`

> 📄 `h2_connection.test.vx` L276-308

```vex
fn test_h2_admission_enforces_peer_parity_and_monotonicity(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_admission_never_reopens_a_closed_peer_stream"></a>`test_h2_admission_never_reopens_a_closed_peer_stream`

> 📄 `h2_connection.test.vx` L310-324

```vex
fn test_h2_admission_never_reopens_a_closed_peer_stream(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_admission_consumes_refused_peer_ids_without_partial_local_open"></a>`test_h2_admission_consumes_refused_peer_ids_without_partial_local_open`

> 📄 `h2_connection.test.vx` L326-352

```vex
fn test_h2_admission_consumes_refused_peer_ids_without_partial_local_open(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_goaway_drains_local_work_and_bounds_remote_admission"></a>`test_h2_goaway_drains_local_work_and_bounds_remote_admission`

> 📄 `h2_connection.test.vx` L354-392

```vex
fn test_h2_goaway_drains_local_work_and_bounds_remote_admission(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_local_stream_id_exhaustion_is_terminal_and_non_wrapping"></a>`test_h2_local_stream_id_exhaustion_is_terminal_and_non_wrapping`

> 📄 `h2_connection.test.vx` L394-419

```vex
fn test_h2_local_stream_id_exhaustion_is_terminal_and_non_wrapping(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="openStream"></a>`openStream`

> 📄 `h2_connection.test.vx` L421-426

```vex
fn openStream(id: u32, sendWindow: i32, recvWindow: i32): H2Stream
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `id` | `u32` |  |
| `sendWindow` | `i32` |  |
| `recvWindow` | `i32` |  |

**Returns:** `H2Stream`

---

### <a id="test_h2_flow_reserves_connection_and_stream_atomically"></a>`test_h2_flow_reserves_connection_and_stream_atomically`

> 📄 `h2_connection.test.vx` L428-444

```vex
fn test_h2_flow_reserves_connection_and_stream_atomically(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_flow_receive_violation_is_scoped_and_atomic"></a>`test_h2_flow_receive_violation_is_scoped_and_atomic`

> 📄 `h2_connection.test.vx` L446-466

```vex
fn test_h2_flow_receive_violation_is_scoped_and_atomic(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_flow_window_updates_check_overflow_before_mutation"></a>`test_h2_flow_window_updates_check_overflow_before_mutation`

> 📄 `h2_connection.test.vx` L468-487

```vex
fn test_h2_flow_window_updates_check_overflow_before_mutation(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="wb"></a>`wb`

> 📄 `huffman.test.vx` L9-11

```vex
fn wb(pointer: Ptr<u8!>, index: usize, value: i64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `pointer` | `Ptr&lt;u8!&gt;` |  |
| `index` | `usize` |  |
| `value` | `i64` |  |

---

### <a id="bytes"></a>`bytes`

> 📄 `huffman.test.vx` L13-15

```vex
fn bytes(pointer: Ptr<u8>, length: usize): str
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `pointer` | `Ptr&lt;u8&gt;` |  |
| `length` | `usize` |  |

**Returns:** `str`

---

### <a id="test_huffman_rfc_non_ascii_codes"></a>`test_huffman_rfc_non_ascii_codes`

> 📄 `huffman.test.vx` L17-24

```vex
fn test_huffman_rfc_non_ascii_codes(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_huffman_round_trip_full_octet_range_samples"></a>`test_huffman_round_trip_full_octet_range_samples`

> 📄 `huffman.test.vx` L26-51

```vex
fn test_huffman_round_trip_full_octet_range_samples(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_huffman_rejects_invalid_padding"></a>`test_huffman_rejects_invalid_padding`

> 📄 `huffman.test.vx` L53-62

```vex
fn test_huffman_rejects_invalid_padding(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_huffman_enforces_output_capacity"></a>`test_huffman_enforces_output_capacity`

> 📄 `huffman.test.vx` L64-76

```vex
fn test_huffman_enforces_output_capacity(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="wb"></a>`wb`

> 📄 `h2_priority.test.vx` L12-14

```vex
fn wb(pointer: Ptr<u8!>, index: usize, value: i64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `pointer` | `Ptr&lt;u8!&gt;` |  |
| `index` | `usize` |  |
| `value` | `i64` |  |

---

### <a id="bytes"></a>`bytes`

> 📄 `h2_priority.test.vx` L16-18

```vex
fn bytes(pointer: Ptr<u8>, length: usize): str
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `pointer` | `Ptr&lt;u8&gt;` |  |
| `length` | `usize` |  |

**Returns:** `str`

---

### <a id="priority"></a>`priority`

> 📄 `h2_priority.test.vx` L20-24

```vex
fn priority(urgency: u8, incremental: bool): H2Priority
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `urgency` | `u8` |  |
| `incremental` | `bool` |  |

**Returns:** `H2Priority`

---

### <a id="test_h2_priority_parses_defaults_and_known_parameters"></a>`test_h2_priority_parses_defaults_and_known_parameters`

> 📄 `h2_priority.test.vx` L26-45

```vex
fn test_h2_priority_parses_defaults_and_known_parameters(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_priority_validates_structured_fields_and_ignores_extensions"></a>`test_h2_priority_validates_structured_fields_and_ignores_extensions`

> 📄 `h2_priority.test.vx` L47-82

```vex
fn test_h2_priority_validates_structured_fields_and_ignores_extensions(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_priority_update_payload_is_typed_and_strict"></a>`test_h2_priority_update_payload_is_typed_and_strict`

> 📄 `h2_priority.test.vx` L84-107

```vex
fn test_h2_priority_update_payload_is_typed_and_strict(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_priority_update_encoder_is_canonical_and_atomic"></a>`test_h2_priority_update_encoder_is_canonical_and_atomic`

> 📄 `h2_priority.test.vx` L109-138

```vex
fn test_h2_priority_update_encoder_is_canonical_and_atomic(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_priority_scheduler_obeys_urgency_and_selection_lease"></a>`test_h2_priority_scheduler_obeys_urgency_and_selection_lease`

> 📄 `h2_priority.test.vx` L140-164

```vex
fn test_h2_priority_scheduler_obeys_urgency_and_selection_lease(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_priority_scheduler_serializes_nonincremental_and_rotates_incremental"></a>`test_h2_priority_scheduler_serializes_nonincremental_and_rotates_incremental`

> 📄 `h2_priority.test.vx` L166-184

```vex
fn test_h2_priority_scheduler_serializes_nonincremental_and_rotates_incremental(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_priority_scheduler_bounds_starvation_and_idle_capacity"></a>`test_h2_priority_scheduler_bounds_starvation_and_idle_capacity`

> 📄 `h2_priority.test.vx` L186-210

```vex
fn test_h2_priority_scheduler_bounds_starvation_and_idle_capacity(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_priority_scheduler_cancellation_repairs_or_revokes_leases"></a>`test_h2_priority_scheduler_cancellation_repairs_or_revokes_leases`

> 📄 `h2_priority.test.vx` L212-240

```vex
fn test_h2_priority_scheduler_cancellation_repairs_or_revokes_leases(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="wb"></a>`wb`

> 📄 `ws.test.vx` L19-21

```vex
fn wb(p: Ptr<u8!>, i: usize, v: i64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8!&gt;` |  |
| `i` | `usize` |  |
| `v` | `i64` |  |

---

### <a id="mkstr"></a>`mkstr`

> 📄 `ws.test.vx` L23-25

```vex
fn mkstr(p: Ptr<u8>, n: usize): str
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8&gt;` |  |
| `n` | `usize` |  |

**Returns:** `str`

---

### <a id="copyStr"></a>`copyStr`

> 📄 `ws.test.vx` L27-33

```vex
fn copyStr(p: Ptr<u8!>, offset: usize, s: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8!&gt;` |  |
| `offset` | `usize` |  |
| `s` | `str` |  |

---

### <a id="test_ws_parse_text_frame"></a>`test_ws_parse_text_frame`

> 📄 `ws.test.vx` L39-57

```vex
fn test_ws_parse_text_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_parse_binary_frame"></a>`test_ws_parse_binary_frame`

> 📄 `ws.test.vx` L59-75

```vex
fn test_ws_parse_binary_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_parse_close_frame"></a>`test_ws_parse_close_frame`

> 📄 `ws.test.vx` L77-93

```vex
fn test_ws_parse_close_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_parse_ping_frame"></a>`test_ws_parse_ping_frame`

> 📄 `ws.test.vx` L95-111

```vex
fn test_ws_parse_ping_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_parse_pong_frame"></a>`test_ws_parse_pong_frame`

> 📄 `ws.test.vx` L113-127

```vex
fn test_ws_parse_pong_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_parse_masked_frame"></a>`test_ws_parse_masked_frame`

> 📄 `ws.test.vx` L133-152

```vex
fn test_ws_parse_masked_frame(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_parse_16bit_length"></a>`test_ws_parse_16bit_length`

> 📄 `ws.test.vx` L154-169

```vex
fn test_ws_parse_16bit_length(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_need_more_short"></a>`test_ws_need_more_short`

> 📄 `ws.test.vx` L175-188

```vex
fn test_ws_need_more_short(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_need_more_empty"></a>`test_ws_need_more_empty`

> 📄 `ws.test.vx` L190-199

```vex
fn test_ws_need_more_empty(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_control_frame_too_large"></a>`test_ws_control_frame_too_large`

> 📄 `ws.test.vx` L205-218

```vex
fn test_ws_control_frame_too_large(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_frame_methods"></a>`test_ws_frame_methods`

> 📄 `ws.test.vx` L224-242

```vex
fn test_ws_frame_methods(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_rsv_bits"></a>`test_ws_rsv_bits`

> 📄 `ws.test.vx` L244-255

```vex
fn test_ws_rsv_bits(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_rejects_reserved_opcode_and_invalid_control_shape"></a>`test_ws_rejects_reserved_opcode_and_invalid_control_shape`

> 📄 `ws.test.vx` L257-278

```vex
fn test_ws_rejects_reserved_opcode_and_invalid_control_shape(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_rejects_noncanonical_extended_lengths"></a>`test_ws_rejects_noncanonical_extended_lengths`

> 📄 `ws.test.vx` L280-299

```vex
fn test_ws_rejects_noncanonical_extended_lengths(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_encoded_frame_size"></a>`test_ws_encoded_frame_size`

> 📄 `ws.test.vx` L305-317

```vex
fn test_ws_encoded_frame_size(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_message_single"></a>`test_ws_message_single`

> 📄 `ws.test.vx` L323-345

```vex
fn test_ws_message_single(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_message_reset"></a>`test_ws_message_reset`

> 📄 `ws.test.vx` L347-353

```vex
fn test_ws_message_reset(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_message_enforces_fragment_sequence"></a>`test_ws_message_enforces_fragment_sequence`

> 📄 `ws.test.vx` L355-395

```vex
fn test_ws_message_enforces_fragment_sequence(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_ws_close_codes"></a>`test_ws_close_codes`

> 📄 `ws.test.vx` L401-405

```vex
fn test_ws_close_codes(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="wb"></a>`wb`

> 📄 `bench.test.vx` L48-48

```vex
fn wb(p: Ptr<u8!>, i: usize, v: i64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8!&gt;` |  |
| `i` | `usize` |  |
| `v` | `i64` |  |

---

### <a id="mkstr"></a>`mkstr`

> 📄 `bench.test.vx` L49-49

```vex
fn mkstr(p: Ptr<u8>, n: usize): str
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8&gt;` |  |
| `n` | `usize` |  |

**Returns:** `str`

---

### <a id="copyStr"></a>`copyStr`

> 📄 `bench.test.vx` L50-53

```vex
fn copyStr(p: Ptr<u8!>, off: usize, s: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8!&gt;` |  |
| `off` | `usize` |  |
| `s` | `str` |  |

---

### <a id="benchRequestFields"></a>`benchRequestFields`

> 📄 `bench.test.vx` L55-62

```vex
fn benchRequestFields(): Vec<HpackHeader>
```

**Returns:** `Vec&lt;HpackHeader&gt;`

---

### <a id="benchResponseFields"></a>`benchResponseFields`

> 📄 `bench.test.vx` L64-68

```vex
fn benchResponseFields(): Vec<HpackHeader>
```

**Returns:** `Vec&lt;HpackHeader&gt;`

---

### <a id="bench_parse_get_simple"></a>`bench_parse_get_simple`

> 📄 `bench.test.vx` L72-75

```vex
fn bench_parse_get_simple(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_parse_get_with_headers"></a>`bench_parse_get_with_headers`

> 📄 `bench.test.vx` L77-80

```vex
fn bench_parse_get_with_headers(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_parse_post_with_body"></a>`bench_parse_post_with_body`

> 📄 `bench.test.vx` L84-87

```vex
fn bench_parse_post_with_body(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_parse_response_200"></a>`bench_parse_response_200`

> 📄 `bench.test.vx` L91-94

```vex
fn bench_parse_response_200(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_parse_response_with_many_headers"></a>`bench_parse_response_with_many_headers`

> 📄 `bench.test.vx` L96-99

```vex
fn bench_parse_response_with_many_headers(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_parseDecimal"></a>`bench_parseDecimal`

> 📄 `bench.test.vx` L103-110

```vex
fn bench_parseDecimal(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_parseHex"></a>`bench_parseHex`

> 📄 `bench.test.vx` L112-119

```vex
fn bench_parseHex(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_eqCaseInsensitive"></a>`bench_eqCaseInsensitive`

> 📄 `bench.test.vx` L121-128

```vex
fn bench_eqCaseInsensitive(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_ws_parse_text_frame"></a>`bench_ws_parse_text_frame`

> 📄 `bench.test.vx` L132-140

```vex
fn bench_ws_parse_text_frame(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_h2_parse_data_frame"></a>`bench_h2_parse_data_frame`

> 📄 `bench.test.vx` L144-154

```vex
fn bench_h2_parse_data_frame(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_h2_priority_field_parse"></a>`bench_h2_priority_field_parse`

> 📄 `bench.test.vx` L156-160

```vex
fn bench_h2_priority_field_parse(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_h2_priority_scheduler_32_ready"></a>`bench_h2_priority_scheduler_32_ready`

> 📄 `bench.test.vx` L166-184

```vex
fn bench_h2_priority_scheduler_32_ready(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_h2_protocol_scheduler_32_writable"></a>`bench_h2_protocol_scheduler_32_writable`

> 📄 `bench.test.vx` L190-229

```vex
fn bench_h2_protocol_scheduler_32_writable(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_h2_protocol_receive_static_header"></a>`bench_h2_protocol_receive_static_header`

> 📄 `bench.test.vx` L240-288

```vex
fn bench_h2_protocol_receive_static_header(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_h2_protocol_push_lifecycle"></a>`bench_h2_protocol_push_lifecycle`

> 📄 `bench.test.vx` L300-346

```vex
fn bench_h2_protocol_push_lifecycle(b: &BenchCtx!)
```

Measures the complete reusable server-push ownership cycle: reserve one

promised stream, encode its request block, send a terminal response, then
recycle the stream/scheduler slot for the next iteration.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_h2_protocol_receive_reset_lifecycle"></a>`bench_h2_protocol_receive_reset_lifecycle`

> 📄 `bench.test.vx` L360-411

```vex
fn bench_h2_protocol_receive_reset_lifecycle(b: &BenchCtx!)
```

One complete peer stream lifecycle ending in RST_STREAM: monotonic

admission, HPACK/field validation, exact reset payload decoding, stream
retirement, scheduler revocation and bounded slot reuse.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_h2_protocol_receive_goaway_turn"></a>`bench_h2_protocol_receive_goaway_turn`

> 📄 `bench.test.vx` L422-461

```vex
fn bench_h2_protocol_receive_goaway_turn(b: &BenchCtx!)
```

Steady-state graceful-drain control turn after the first boundary has

retired retry-safe work: exact payload/debug parse, connection sequencing,
non-increasing boundary validation and bounded resident-stream scan.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_h2_protocol_ping_round_trip"></a>`bench_h2_protocol_ping_round_trip`

> 📄 `bench.test.vx` L472-500

```vex
fn bench_h2_protocol_ping_round_trip(b: &BenchCtx!)
```

Complete reusable liveness turn: atomically encode/register one local PING,

receive its exact ACK, correlate the opaque token and release bounded state.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_h2_protocol_inbound_dispatch_priority_update"></a>`bench_h2_protocol_inbound_dispatch_priority_update`

> 📄 `bench.test.vx` L517-547

```vex
fn bench_h2_protocol_inbound_dispatch_priority_update(b: &BenchCtx!)
```

Complete steady RFC 9218 turn through the transport-facing dispatcher.

This includes bounded wire parsing, directional sequencing, scheduler
lookup and in-place reprioritization while guarding the single-owner API
against growing into an abstraction tax.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_h2_protocol_ingress_priority_update"></a>`bench_h2_protocol_ingress_priority_update`

> 📄 `bench.test.vx` L551-585

```vex
fn bench_h2_protocol_ingress_priority_update(b: &BenchCtx!)
```

Production-shaped receive turn from the complete 9-byte frame header

through payload slicing, unified dispatch and the bounded scheduler update.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_h2_protocol_send_data_turn"></a>`bench_h2_protocol_send_data_turn`

> 📄 `bench.test.vx` L596-657

```vex
fn bench_h2_protocol_send_data_turn(b: &BenchCtx!)
```

One reusable writable DATA turn, including flow reservation, frame/state

commit, scheduler rotation and WINDOW_UPDATE wakeup.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_h2_protocol_receive_data_turn"></a>`bench_h2_protocol_receive_data_turn`

> 📄 `bench.test.vx` L668-719

```vex
fn bench_h2_protocol_receive_data_turn(b: &BenchCtx!)
```

Exact inbound DATA processing with state/flow ownership and receive-credit

replenishment; application bytes remain a borrowed payload slice.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_h2_decode_validate_static_request"></a>`bench_h2_decode_validate_static_request`

> 📄 `bench.test.vx` L729-753

```vex
fn bench_h2_decode_validate_static_request(b: &BenchCtx!)
```

Isolates the hot post-reassembly path: HPACK decode plus HTTP semantic gate,

without stream admission/retirement bookkeeping.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_chunked_decode_single_chunk"></a>`bench_chunked_decode_single_chunk`

> 📄 `bench.test.vx` L757-764

```vex
fn bench_chunked_decode_single_chunk(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_body_reader_chunked_feed"></a>`bench_body_reader_chunked_feed`

> 📄 `bench.test.vx` L768-775

```vex
fn bench_body_reader_chunked_feed(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_body_reader_zero_copy_dispatch_64k"></a>`bench_body_reader_zero_copy_dispatch_64k`

> 📄 `bench.test.vx` L792-807

```vex
fn bench_body_reader_zero_copy_dispatch_64k(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_decoded_body_lifecycle_64k"></a>`bench_decoded_body_lifecycle_64k`

> 📄 `bench.test.vx` L840-861

```vex
fn bench_decoded_body_lifecycle_64k(b: &BenchCtx!)
```

Protocol-neutral HTTP/2-style application delivery. This intentionally

performs no payload copy: it measures admission, bounds/accounting, one
borrowed DATA callback and the END_STREAM transition.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_body_page_ring_64k"></a>`bench_body_page_ring_64k`

> 📄 `bench.test.vx` L868-894

```vex
fn bench_body_page_ring_64k(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_multipart_consumer_64k"></a>`bench_multipart_consumer_64k`

> 📄 `bench.test.vx` L927-950

```vex
fn bench_multipart_consumer_64k(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_hpack_decode_indexed_header"></a>`bench_hpack_decode_indexed_header`

> 📄 `bench.test.vx` L954-964

```vex
fn bench_hpack_decode_indexed_header(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_hpack_decode_header_block_small"></a>`bench_hpack_decode_header_block_small`

> 📄 `bench.test.vx` L966-976

```vex
fn bench_hpack_decode_header_block_small(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_hpack_encode_repeated_request"></a>`bench_hpack_encode_repeated_request`

> 📄 `bench.test.vx` L987-1015

```vex
fn bench_hpack_encode_repeated_request(b: &BenchCtx!)
```

Steady-state HTTP/2 request encoding after the authority field entered the

connection dynamic table. The resulting block is four indexed bytes.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_huffman_code_lookup"></a>`bench_huffman_code_lookup`

> 📄 `bench.test.vx` L1019-1026

```vex
fn bench_huffman_code_lookup(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="bench_huffman_encoded_length"></a>`bench_huffman_encoded_length`

> 📄 `bench.test.vx` L1028-1031

```vex
fn bench_huffman_encoded_length(b: &BenchCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `b` | `&amp;BenchCtx!` |  |

---

### <a id="test_parser_bench_fixture_sanity"></a>`test_parser_bench_fixture_sanity`

> 📄 `basic.test.vx` L13-20

```vex
fn test_parser_bench_fixture_sanity(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_get_request"></a>`test_get_request`

> 📄 `basic.test.vx` L26-56

```vex
fn test_get_request(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_post_request_with_body"></a>`test_post_request_with_body`

> 📄 `basic.test.vx` L58-83

```vex
fn test_post_request_with_body(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_incomplete_request"></a>`test_incomplete_request`

> 📄 `basic.test.vx` L85-93

```vex
fn test_incomplete_request(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_multiple_headers"></a>`test_multiple_headers`

> 📄 `basic.test.vx` L95-119

```vex
fn test_multiple_headers(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_200"></a>`test_response_200`

> 📄 `basic.test.vx` L125-156

```vex
fn test_response_200(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_404"></a>`test_response_404`

> 📄 `basic.test.vx` L158-179

```vex
fn test_response_404(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_redirect"></a>`test_response_redirect`

> 📄 `basic.test.vx` L181-199

```vex
fn test_response_redirect(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_response_500"></a>`test_response_500`

> 📄 `basic.test.vx` L201-216

```vex
fn test_response_500(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_parseDecimal_basic"></a>`test_parseDecimal_basic`

> 📄 `basic.test.vx` L222-229

```vex
fn test_parseDecimal_basic(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_parseDecimal_zero"></a>`test_parseDecimal_zero`

> 📄 `basic.test.vx` L231-238

```vex
fn test_parseDecimal_zero(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_parseDecimal_empty"></a>`test_parseDecimal_empty`

> 📄 `basic.test.vx` L240-245

```vex
fn test_parseDecimal_empty(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_parseDecimal_non_digit"></a>`test_parseDecimal_non_digit`

> 📄 `basic.test.vx` L247-252

```vex
fn test_parseDecimal_non_digit(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_parseDecimal_null_coalesce"></a>`test_parseDecimal_null_coalesce`

> 📄 `basic.test.vx` L254-260

```vex
fn test_parseDecimal_null_coalesce(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_parseHex_ff"></a>`test_parseHex_ff`

> 📄 `basic.test.vx` L266-273

```vex
fn test_parseHex_ff(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_parseHex_lowercase"></a>`test_parseHex_lowercase`

> 📄 `basic.test.vx` L275-282

```vex
fn test_parseHex_lowercase(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_parseHex_zero"></a>`test_parseHex_zero`

> 📄 `basic.test.vx` L284-291

```vex
fn test_parseHex_zero(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_parseHex_chunked_size"></a>`test_parseHex_chunked_size`

> 📄 `basic.test.vx` L293-300

```vex
fn test_parseHex_chunked_size(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_eqCaseInsensitive_match"></a>`test_eqCaseInsensitive_match`

> 📄 `basic.test.vx` L306-319

```vex
fn test_eqCaseInsensitive_match(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_eqCaseInsensitive_mismatch"></a>`test_eqCaseInsensitive_mismatch`

> 📄 `basic.test.vx` L321-328

```vex
fn test_eqCaseInsensitive_mismatch(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_websocket_upgrade"></a>`test_websocket_upgrade`

> 📄 `basic.test.vx` L334-346

```vex
fn test_websocket_upgrade(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_empty_request"></a>`test_empty_request`

> 📄 `basic.test.vx` L352-358

```vex
fn test_empty_request(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_chunked_header_detection"></a>`test_chunked_header_detection`

> 📄 `basic.test.vx` L360-372

```vex
fn test_chunked_header_detection(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_rejects_duplicate_content_length_framing"></a>`test_rejects_duplicate_content_length_framing`

> 📄 `basic.test.vx` L374-385

```vex
fn test_rejects_duplicate_content_length_framing(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_rejects_content_length_with_transfer_encoding"></a>`test_rejects_content_length_with_transfer_encoding`

> 📄 `basic.test.vx` L387-398

```vex
fn test_rejects_content_length_with_transfer_encoding(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_rejects_transfer_encoding_substring"></a>`test_rejects_transfer_encoding_substring`

> 📄 `basic.test.vx` L400-411

```vex
fn test_rejects_transfer_encoding_substring(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_rejects_http_10_transfer_encoding"></a>`test_rejects_http_10_transfer_encoding`

> 📄 `basic.test.vx` L413-424

```vex
fn test_rejects_http_10_transfer_encoding(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_connection_close"></a>`test_connection_close`

> 📄 `basic.test.vx` L426-438

```vex
fn test_connection_close(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_connection_tokens_are_list_aware"></a>`test_connection_tokens_are_list_aware`

> 📄 `basic.test.vx` L440-450

```vex
fn test_connection_tokens_are_list_aware(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_head_method"></a>`test_head_method`

> 📄 `basic.test.vx` L452-467

```vex
fn test_head_method(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_options_method"></a>`test_options_method`

> 📄 `basic.test.vx` L469-484

```vex
fn test_options_method(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_custom_method_is_not_misclassified_by_fast_path"></a>`test_custom_method_is_not_misclassified_by_fast_path`

> 📄 `basic.test.vx` L486-496

```vex
fn test_custom_method_is_not_misclassified_by_fast_path(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="frame"></a>`frame`

> 📄 `stream.test.vx` L10-12

```vex
fn frame(frameType: u8, flags: u8, streamId: u32): H2Frame
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `frameType` | `u8` |  |
| `flags` | `u8` |  |
| `streamId` | `u32` |  |

**Returns:** `H2Frame`

---

### <a id="test_stream_legacy_priority_represents_full_wire_range"></a>`test_stream_legacy_priority_represents_full_wire_range`

> 📄 `stream.test.vx` L14-19

```vex
fn test_stream_legacy_priority_represents_full_wire_range(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_stream_map_applies_peer_initial_window_delta_to_all_streams"></a>`test_stream_map_applies_peer_initial_window_delta_to_all_streams`

> 📄 `stream.test.vx` L21-39

```vex
fn test_stream_map_applies_peer_initial_window_delta_to_all_streams(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_stream_map_initial_window_update_is_transactional"></a>`test_stream_map_initial_window_update_is_transactional`

> 📄 `stream.test.vx` L41-56

```vex
fn test_stream_map_initial_window_update_is_transactional(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_stream_map_enforces_capacity_and_ids"></a>`test_stream_map_enforces_capacity_and_ids`

> 📄 `stream.test.vx` L58-69

```vex
fn test_stream_map_enforces_capacity_and_ids(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_stream_map_recycles_closed_slots_under_long_lived_churn"></a>`test_stream_map_recycles_closed_slots_under_long_lived_churn`

> 📄 `stream.test.vx` L71-90

```vex
fn test_stream_map_recycles_closed_slots_under_long_lived_churn(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_stream_map_settings_ignore_terminal_slot_windows"></a>`test_stream_map_settings_ignore_terminal_slot_windows`

> 📄 `stream.test.vx` L92-110

```vex
fn test_stream_map_settings_ignore_terminal_slot_windows(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_stream_idle_data_fails_and_headers_open"></a>`test_stream_idle_data_fails_and_headers_open`

> 📄 `stream.test.vx` L112-130

```vex
fn test_stream_idle_data_fails_and_headers_open(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_stream_push_promise_never_reserves_its_idle_carrier"></a>`test_stream_push_promise_never_reserves_its_idle_carrier`

> 📄 `stream.test.vx` L132-149

```vex
fn test_stream_push_promise_never_reserves_its_idle_carrier(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_stream_half_closed_remote_uses_stream_closed_scope"></a>`test_stream_half_closed_remote_uses_stream_closed_scope`

> 📄 `stream.test.vx` L151-164

```vex
fn test_stream_half_closed_remote_uses_stream_closed_scope(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_stream_rejects_frame_for_another_stream"></a>`test_stream_rejects_frame_for_another_stream`

> 📄 `stream.test.vx` L166-177

```vex
fn test_stream_rejects_frame_for_another_stream(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_stream_unknown_extensions_never_mutate_core_state"></a>`test_stream_unknown_extensions_never_mutate_core_state`

> 📄 `stream.test.vx` L179-204

```vex
fn test_stream_unknown_extensions_never_mutate_core_state(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="add"></a>`add`

> 📄 `h2_headers.test.vx` L9-11

```vex
fn add(headers: &Vec<HpackHeader>!, name: str, value: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `headers` | `&amp;Vec&lt;HpackHeader&gt;!` |  |
| `name` | `str` |  |
| `value` | `str` |  |

---

### <a id="validRequest"></a>`validRequest`

> 📄 `h2_headers.test.vx` L13-19

```vex
fn validRequest(): Vec<HpackHeader>
```

**Returns:** `Vec&lt;HpackHeader&gt;`

---

### <a id="expectMalformed"></a>`expectMalformed`

> 📄 `h2_headers.test.vx` L21-26

```vex
fn expectMalformed(t: &TestCtx!, headers: &Vec<HpackHeader>, kind: H2FieldSectionKind)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |
| `headers` | `&amp;Vec&lt;HpackHeader&gt;` |  |
| `kind` | `H2FieldSectionKind` |  |

---

### <a id="test_h2_fields_accept_valid_request_connect_response_and_trailers"></a>`test_h2_fields_accept_valid_request_connect_response_and_trailers`

> 📄 `h2_headers.test.vx` L28-69

```vex
fn test_h2_fields_accept_valid_request_connect_response_and_trailers(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_fields_reject_smuggling_bytes_and_connection_fields"></a>`test_h2_fields_reject_smuggling_bytes_and_connection_fields`

> 📄 `h2_headers.test.vx` L71-91

```vex
fn test_h2_fields_reject_smuggling_bytes_and_connection_fields(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_fields_enforce_pseudo_header_context_order_and_uniqueness"></a>`test_h2_fields_enforce_pseudo_header_context_order_and_uniqueness`

> 📄 `h2_headers.test.vx` L93-112

```vex
fn test_h2_fields_enforce_pseudo_header_context_order_and_uniqueness(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_fields_enforce_required_control_data_and_te_exception"></a>`test_h2_fields_enforce_required_control_data_and_te_exception`

> 📄 `h2_headers.test.vx` L114-139

```vex
fn test_h2_fields_enforce_required_control_data_and_te_exception(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_fields_push_requires_known_safe_cacheable_method"></a>`test_h2_fields_push_requires_known_safe_cacheable_method`

> 📄 `h2_headers.test.vx` L141-152

```vex
fn test_h2_fields_push_requires_known_safe_cacheable_method(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_h2_fields_canonicalize_content_length_and_reject_trailer_redefinition"></a>`test_h2_fields_canonicalize_content_length_and_reject_trailer_redefinition`

> 📄 `h2_headers.test.vx` L154-176

```vex
fn test_h2_fields_canonicalize_content_length_and_reject_trailer_redefinition(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="wb"></a>`wb`

> 📄 `hpack.test.vx` L16-16

```vex
fn wb(p: Ptr<u8!>, i: usize, v: i64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8!&gt;` |  |
| `i` | `usize` |  |
| `v` | `i64` |  |

---

### <a id="mkstr"></a>`mkstr`

> 📄 `hpack.test.vx` L17-17

```vex
fn mkstr(p: Ptr<u8>, n: usize): str
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8&gt;` |  |
| `n` | `usize` |  |

**Returns:** `str`

---

### <a id="copyStr"></a>`copyStr`

> 📄 `hpack.test.vx` L18-21

```vex
fn copyStr(p: Ptr<u8!>, offset: usize, s: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8!&gt;` |  |
| `offset` | `usize` |  |
| `s` | `str` |  |

---

### <a id="fillBytes"></a>`fillBytes`

> 📄 `hpack.test.vx` L23-29

```vex
fn fillBytes(p: Ptr<u8!>, count: usize, value: u8)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `p` | `Ptr&lt;u8!&gt;` |  |
| `count` | `usize` |  |
| `value` | `u8` |  |

---

### <a id="expectByte"></a>`expectByte`

> 📄 `hpack.test.vx` L31-33

```vex
fn expectByte(t: &TestCtx!, data: str, index: usize, expected: u8, message: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |
| `data` | `str` |  |
| `index` | `usize` |  |
| `expected` | `u8` |  |
| `message` | `str` |  |

---

### <a id="test_hpack_decode_integer_small"></a>`test_hpack_decode_integer_small`

> 📄 `hpack.test.vx` L39-47

```vex
fn test_hpack_decode_integer_small(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_decode_integer_max_prefix"></a>`test_hpack_decode_integer_max_prefix`

> 📄 `hpack.test.vx` L49-57

```vex
fn test_hpack_decode_integer_max_prefix(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_decode_integer_multibyte"></a>`test_hpack_decode_integer_multibyte`

> 📄 `hpack.test.vx` L59-68

```vex
fn test_hpack_decode_integer_multibyte(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_decode_integer_7bit"></a>`test_hpack_decode_integer_7bit`

> 📄 `hpack.test.vx` L70-78

```vex
fn test_hpack_decode_integer_7bit(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_decode_integer_empty"></a>`test_hpack_decode_integer_empty`

> 📄 `hpack.test.vx` L80-84

```vex
fn test_hpack_decode_integer_empty(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_decode_integer_reports_truncation"></a>`test_hpack_decode_integer_reports_truncation`

> 📄 `hpack.test.vx` L86-93

```vex
fn test_hpack_decode_integer_reports_truncation(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_decode_integer_rejects_overflow"></a>`test_hpack_decode_integer_rejects_overflow`

> 📄 `hpack.test.vx` L95-104

```vex
fn test_hpack_decode_integer_rejects_overflow(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_encode_integer_small"></a>`test_hpack_encode_integer_small`

> 📄 `hpack.test.vx` L106-113

```vex
fn test_hpack_encode_integer_small(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_encode_integer_multibyte"></a>`test_hpack_encode_integer_multibyte`

> 📄 `hpack.test.vx` L115-122

```vex
fn test_hpack_encode_integer_multibyte(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_dynamic_table_new"></a>`test_hpack_dynamic_table_new`

> 📄 `hpack.test.vx` L128-132

```vex
fn test_hpack_dynamic_table_new(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_dynamic_table_add"></a>`test_hpack_dynamic_table_add`

> 📄 `hpack.test.vx` L134-141

```vex
fn test_hpack_dynamic_table_add(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_dynamic_table_eviction"></a>`test_hpack_dynamic_table_eviction`

> 📄 `hpack.test.vx` L143-151

```vex
fn test_hpack_dynamic_table_eviction(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_dynamic_table_oversized_entry"></a>`test_hpack_dynamic_table_oversized_entry`

> 📄 `hpack.test.vx` L153-158

```vex
fn test_hpack_dynamic_table_oversized_entry(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_dynamic_table_set_max_size"></a>`test_hpack_dynamic_table_set_max_size`

> 📄 `hpack.test.vx` L160-167

```vex
fn test_hpack_dynamic_table_set_max_size(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_static_table_authority"></a>`test_hpack_static_table_authority`

> 📄 `hpack.test.vx` L173-178

```vex
fn test_hpack_static_table_authority(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_static_table_method_get"></a>`test_hpack_static_table_method_get`

> 📄 `hpack.test.vx` L180-185

```vex
fn test_hpack_static_table_method_get(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_static_table_method_post"></a>`test_hpack_static_table_method_post`

> 📄 `hpack.test.vx` L187-192

```vex
fn test_hpack_static_table_method_post(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_static_table_path"></a>`test_hpack_static_table_path`

> 📄 `hpack.test.vx` L194-199

```vex
fn test_hpack_static_table_path(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_static_table_status_200"></a>`test_hpack_static_table_status_200`

> 📄 `hpack.test.vx` L201-206

```vex
fn test_hpack_static_table_status_200(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_static_table_out_of_range"></a>`test_hpack_static_table_out_of_range`

> 📄 `hpack.test.vx` L208-214

```vex
fn test_hpack_static_table_out_of_range(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_decode_indexed_header"></a>`test_hpack_decode_indexed_header`

> 📄 `hpack.test.vx` L220-235

```vex
fn test_hpack_decode_indexed_header(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_decode_indexed_status_200"></a>`test_hpack_decode_indexed_status_200`

> 📄 `hpack.test.vx` L237-252

```vex
fn test_hpack_decode_indexed_status_200(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_decode_literal_with_indexing"></a>`test_hpack_decode_literal_with_indexing`

> 📄 `hpack.test.vx` L254-272

```vex
fn test_hpack_decode_literal_with_indexing(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_decode_literal_new_name"></a>`test_hpack_decode_literal_new_name`

> 📄 `hpack.test.vx` L274-294

```vex
fn test_hpack_decode_literal_new_name(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_decode_literal_without_indexing"></a>`test_hpack_decode_literal_without_indexing`

> 📄 `hpack.test.vx` L296-314

```vex
fn test_hpack_decode_literal_without_indexing(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_decode_table_size_update"></a>`test_hpack_decode_table_size_update`

> 📄 `hpack.test.vx` L316-330

```vex
fn test_hpack_decode_table_size_update(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_decode_empty_input"></a>`test_hpack_decode_empty_input`

> 📄 `hpack.test.vx` L332-341

```vex
fn test_hpack_decode_empty_input(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_decode_header_block"></a>`test_hpack_decode_header_block`

> 📄 `hpack.test.vx` L347-361

```vex
fn test_hpack_decode_header_block(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_decode_header_block_empty"></a>`test_hpack_decode_header_block_empty`

> 📄 `hpack.test.vx` L363-371

```vex
fn test_hpack_decode_header_block_empty(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_acknowledged_table_reduction_requires_first_block_update"></a>`test_hpack_acknowledged_table_reduction_requires_first_block_update`

> 📄 `hpack.test.vx` L373-400

```vex
fn test_hpack_acknowledged_table_reduction_requires_first_block_update(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_multiple_acknowledged_changes_preserve_smallest_reduction"></a>`test_hpack_multiple_acknowledged_changes_preserve_smallest_reduction`

> 📄 `hpack.test.vx` L402-414

```vex
fn test_hpack_multiple_acknowledged_changes_preserve_smallest_reduction(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_huffman_literal_rfc_fixture"></a>`test_hpack_huffman_literal_rfc_fixture`

> 📄 `hpack.test.vx` L416-433

```vex
fn test_hpack_huffman_literal_rfc_fixture(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_block_rejects_truncated_literal"></a>`test_hpack_block_rejects_truncated_literal`

> 📄 `hpack.test.vx` L435-443

```vex
fn test_hpack_block_rejects_truncated_literal(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_block_rejects_late_table_update"></a>`test_hpack_block_rejects_late_table_update`

> 📄 `hpack.test.vx` L445-453

```vex
fn test_hpack_block_rejects_late_table_update(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_block_enforces_header_count"></a>`test_hpack_block_enforces_header_count`

> 📄 `hpack.test.vx` L455-469

```vex
fn test_hpack_block_enforces_header_count(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_block_enforces_header_list_bytes"></a>`test_hpack_block_enforces_header_list_bytes`

> 📄 `hpack.test.vx` L471-485

```vex
fn test_hpack_block_enforces_header_list_bytes(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_encoder_rfc_request_without_huffman"></a>`test_hpack_encoder_rfc_request_without_huffman`

> 📄 `hpack.test.vx` L491-539

```vex
fn test_hpack_encoder_rfc_request_without_huffman(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_encoder_huffman_rfc_fixture_round_trip"></a>`test_hpack_encoder_huffman_rfc_fixture_round_trip`

> 📄 `hpack.test.vx` L541-570

```vex
fn test_hpack_encoder_huffman_rfc_fixture_round_trip(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_encoder_sensitive_field_is_never_indexed"></a>`test_hpack_encoder_sensitive_field_is_never_indexed`

> 📄 `hpack.test.vx` L572-601

```vex
fn test_hpack_encoder_sensitive_field_is_never_indexed(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_encoder_failure_is_transactional"></a>`test_hpack_encoder_failure_is_transactional`

> 📄 `hpack.test.vx` L603-644

```vex
fn test_hpack_encoder_failure_is_transactional(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="test_hpack_encoder_limits_leave_output_untouched"></a>`test_hpack_encoder_limits_leave_output_untouched`

> 📄 `hpack.test.vx` L646-663

```vex
fn test_hpack_encoder_limits_leave_output_untouched(t: &TestCtx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `t` | `&amp;TestCtx!` |  |

---

### <a id="isLowerTokenByte"></a>`isLowerTokenByte`

> 📄 `h2_headers.vx` L44-51

```vex
fn isLowerTokenByte(value: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `u8` |  |

**Returns:** `bool`

---

### <a id="validFieldName"></a>`validFieldName`

> 📄 `h2_headers.vx` L53-65

```vex
fn validFieldName(name: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `str` |  |

**Returns:** `bool`

---

### <a id="validFieldValue"></a>`validFieldValue`

> 📄 `h2_headers.vx` L67-82

```vex
fn validFieldValue(value: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |

**Returns:** `bool`

---

### <a id="isConnectionSpecific"></a>`isConnectionSpecific`

> 📄 `h2_headers.vx` L84-88

```vex
fn isConnectionSpecific(name: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `str` |  |

**Returns:** `bool`

---

### <a id="equalsAsciiCaseInsensitive"></a>`equalsAsciiCaseInsensitive`

> 📄 `h2_headers.vx` L90-100

```vex
fn equalsAsciiCaseInsensitive(left: str, rightLower: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `left` | `str` |  |
| `rightLower` | `str` |  |

**Returns:** `bool`

---

### <a id="parseStatus"></a>`parseStatus`

> 📄 `h2_headers.vx` L102-113

```vex
fn parseStatus(value: str): u16
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |

**Returns:** `u16`

---

### <a id="parseContentLength"></a>`parseContentLength`

> 📄 `h2_headers.vx` L119-144

```vex
fn parseContentLength(value: str): i64
```

Parse one RFC field-list representation of Content-Length. Repeated list

members are accepted only when every decimal value is identical. `-1`
means malformed; every valid value is representable by the runtime body
counters without narrowing.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |

**Returns:** `i64`

---

### <a id="validateH2FieldSection"></a>`validateH2FieldSection` `🔓 export`

> 📄 `h2_headers.vx` L148-306

```vex
export fn validateH2FieldSection(headers: &Vec<HpackHeader>, kind: H2FieldSectionKind): H2FieldSectionResult
```

Validate a complete decompressed field section according to RFC 9113's

generic field, pseudo-header, request, response and trailer rules.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `headers` | `&amp;Vec&lt;HpackHeader&gt;` |  |
| `kind` | `H2FieldSectionKind` |  |

**Returns:** `H2FieldSectionResult`

---

### <a id="trimOws"></a>`trimOws`

> 📄 `multipart.vx` L86-96

```vex
fn trimOws(value: str): str
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |

**Returns:** `str`

---

### <a id="validBoundary"></a>`validBoundary`

> 📄 `multipart.vx` L98-116

```vex
fn validBoundary(boundary: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `boundary` | `str` |  |

**Returns:** `bool`

---

### <a id="multipartBoundary"></a>`multipartBoundary` `🔓 export`

> 📄 `multipart.vx` L121-200

```vex
export fn multipartBoundary(contentType: str): Option<string>
```

Extract and own the boundary parameter from a multipart/form-data content

type. Quoted values support backslash escaping; duplicate or trailing junk
is rejected instead of selecting one ambiguous boundary.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `contentType` | `str` |  |

**Returns:** `Option&lt;string&gt;`

---

### <a id="multipartConsumer"></a>`multipartConsumer` `🔓 export`

> 📄 `multipart.vx` L202-230

```vex
export fn multipartConsumer(boundary: str, limits: MultipartLimits, sink: &S!): Option<MultipartConsumer<S>>where S: MultipartSink
```

**Type Parameters:**

- `S`

**Where:**

- `MultipartSink`: `MultipartSink`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `boundary` | `str` |  |
| `limits` | `MultipartLimits` |  |
| `sink` | `&amp;S!` |  |

**Returns:** `Option&lt;MultipartConsumer&lt;S&gt;&gt;where S: MultipartSink`

---

### <a id="findBytes"></a>`findBytes`

> 📄 `multipart.vx` L250-254

```vex
fn findBytes(haystack: str, needle: str): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `haystack` | `str` |  |
| `needle` | `str` |  |

**Returns:** `i64`

---

### <a id="appendQuotedValue"></a>`appendQuotedValue`

> 📄 `multipart.vx` L256-292

```vex
fn appendQuotedValue(value: str, output: &StringBuilder!, maximum: usize): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |
| `output` | `&amp;StringBuilder!` |  |
| `maximum` | `usize` |  |

**Returns:** `bool`

---

### <a id="headerLineEnd"></a>`headerLineEnd`

> 📄 `multipart.vx` L367-372

```vex
fn headerLineEnd(source: str, beginAt: usize): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `source` | `str` |  |
| `beginAt` | `usize` |  |

**Returns:** `usize`

---

### <a id="splitHeader"></a>`splitHeader`

> 📄 `multipart.vx` L374-390

```vex
fn splitHeader(line: str): MultipartHeaderView
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `line` | `str` |  |

**Returns:** `MultipartHeaderView`

---

### <a id="eqCaseInsensitive"></a>`eqCaseInsensitive` `🔓 export`

> 📄 `scanner.vx` L288-306

```vex
export fn eqCaseInsensitive(a: str, target: str): bool
```

Case-insensitive ASCII comparison. Both inputs must have the same length;

neither side carries a hidden pre-normalization requirement.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `a` | `str` |  |
| `target` | `str` |  |

**Returns:** `bool`

---

### <a id="isHttpToken"></a>`isHttpToken` `🔓 export`

> 📄 `scanner.vx` L311-324

```vex
export fn isHttpToken(value: str): bool
```

Returns true when every byte is an RFC 9110 `tchar`.

HTTP field names and methods are tokens; accepting separators or controls
here creates parser differentials between Vex and downstream proxies.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |

**Returns:** `bool`

---

### <a id="isValidHttpFieldValue"></a>`isValidHttpFieldValue` `🔓 export`

> 📄 `scanner.vx` L328-336

```vex
export fn isValidHttpFieldValue(value: str): bool
```

Validate a field value after OWS trimming. HTAB is allowed; other control

bytes and DEL are rejected. CR/LF cannot be smuggled through a value.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |

**Returns:** `bool`

---

### <a id="parseDecimal"></a>`parseDecimal` `🔓 export`

> 📄 `scanner.vx` L352-369

```vex
export fn parseDecimal(s: str): Option<i64>
```

Parse a decimal integer from a str view.

Returns Some(value) only when the entire view is decimal digits.
Overflow-safe for values ≤ i64.MAX.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `str` |  |

**Returns:** `Option&lt;i64&gt;`

---

### <a id="parseHex"></a>`parseHex` `🔓 export`

> 📄 `scanner.vx` L374-399

```vex
export fn parseHex(s: str): Option<i64>
```

Parse a hexadecimal integer from a str view (for chunked encoding).

Returns Some(value) only when the complete view is hexadecimal digits.
Case-insensitive A-F. Overflow-safe.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `s` | `str` |  |

**Returns:** `Option&lt;i64&gt;`

---

### <a id="isKnownH2FrameType"></a>`isKnownH2FrameType` `🔓 export`

> 📄 `h2.vx` L39-41

```vex
export fn isKnownH2FrameType(frameType: u8): bool
```

Whether this package assigns semantics to a frame type. Unknown extension

frames must be discarded without consulting the stream state machine.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `frameType` | `u8` |  |

**Returns:** `bool`

---

### <a id="frameSizeError"></a>`frameSizeError`

> 📄 `h2.vx` L137-149

```vex
fn frameSizeError(frameType: u8, streamId: u32, message: str): H2MetadataValidation
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `frameType` | `u8` |  |
| `streamId` | `u32` |  |
| `message` | `str` |  |

**Returns:** `H2MetadataValidation`

---

### <a id="validateFrameMetadata"></a>`validateFrameMetadata`

> 📄 `h2.vx` L151-263

```vex
fn validateFrameMetadata(length: u32, frameType: u8, flags: u8, streamId: u32): H2MetadataValidation
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `length` | `u32` |  |
| `frameType` | `u8` |  |
| `flags` | `u8` |  |
| `streamId` | `u32` |  |

**Returns:** `H2MetadataValidation`

---

### <a id="parseH2Frame"></a>`parseH2Frame` `🔓 export`

> 📄 `h2.vx` L271-273

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

### <a id="parseH2FrameLimited"></a>`parseH2FrameLimited` `🔓 export`

> 📄 `h2.vx` L276-321

```vex
export fn parseH2FrameLimited(data: str, maxFrameSize: u32): H2ParseResult
```

Parse a frame header under the peer's negotiated maximum frame size.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |
| `maxFrameSize` | `u32` |  |

**Returns:** `H2ParseResult`

---

### <a id="parseSettingsUpdate"></a>`parseSettingsUpdate` `🔓 export`

> 📄 `h2.vx` L364-431

```vex
export fn parseSettingsUpdate(payload: str, current: &H2Settings): H2SettingsUpdateResult
```

Parse one SETTINGS delta against the currently effective values. Unknown

identifiers are ignored, duplicate identifiers are applied in wire order,
and omitted settings retain their previous values.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `payload` | `str` |  |
| `current` | `&amp;H2Settings` |  |

**Returns:** `H2SettingsUpdateResult`

---

### <a id="parseSettings"></a>`parseSettings` `🔓 export`

> 📄 `h2.vx` L434-447

```vex
export fn parseSettings(payload: str, settings: &H2Settings!): bool
```

Parse SETTINGS payload. Each setting is 6 bytes: id(16) + value(32).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `payload` | `str` |  |
| `settings` | `&amp;H2Settings!` |  |

**Returns:** `bool`

---

### <a id="parseLegacyPriority"></a>`parseLegacyPriority` `🔓 export`

> 📄 `h2.vx` L492-504

```vex
export fn parseLegacyPriority(payload: str): H2LegacyPriorityResult
```

Parse the exact five-byte deprecated PRIORITY payload. Stream

self-dependency is validated by the protocol owner because it needs the
frame's stream identifier.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `payload` | `str` |  |

**Returns:** `H2LegacyPriorityResult`

---

### <a id="parseRstStream"></a>`parseRstStream` `🔓 export`

> 📄 `h2.vx` L508-518

```vex
export fn parseRstStream(payload: str): H2RstStreamResult
```

Parse the exact four-byte RST_STREAM error code. Error codes are an open

32-bit space, so every value (including extension codes) is preserved.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `payload` | `str` |  |

**Returns:** `H2RstStreamResult`

---

### <a id="parseWindowUpdate"></a>`parseWindowUpdate` `🔓 export`

> 📄 `h2.vx` L522-534

```vex
export fn parseWindowUpdate(payload: str): H2WindowUpdateResult
```

Parse a complete WINDOW_UPDATE payload and reject the reserved zero

increment before it can reach flow-control arithmetic.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `payload` | `str` |  |

**Returns:** `H2WindowUpdateResult`

---

### <a id="parseGoAway"></a>`parseGoAway` `🔓 export`

> 📄 `h2.vx` L537-559

```vex
export fn parseGoAway(payload: str): H2GoAwayResult
```

Parse a complete GOAWAY payload. Truncated control frames fail closed.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `payload` | `str` |  |

**Returns:** `H2GoAwayResult`

---

### <a id="validSettings"></a>`validSettings`

> 📄 `h2.vx` L570-574

```vex
fn validSettings(settings: &H2Settings): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `settings` | `&amp;H2Settings` |  |

**Returns:** `bool`

---

### <a id="encodeH2FrameHeader"></a>`encodeH2FrameHeader` `🔓 export`

> 📄 `h2.vx` L578-609

```vex
export fn encodeH2FrameHeader(out: &str!, length: u32, frameType: u8, flags: u8, streamId: u32): H2EncodeResult
```

Encode an HTTP/2 frame header into `out` after validating the complete

metadata and destination capacity. Failed writes leave `out` unchanged.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;str!` |  |
| `length` | `u32` |  |
| `frameType` | `u8` |  |
| `flags` | `u8` |  |
| `streamId` | `u32` |  |

**Returns:** `H2EncodeResult`

---

### <a id="encodeSettingsPayload"></a>`encodeSettingsPayload` `🔓 export`

> 📄 `h2.vx` L612-624

```vex
export fn encodeSettingsPayload(out: &str!, settings: &H2Settings): H2EncodeResult
```

Encode the six standard SETTINGS entries as a 36-byte payload.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;str!` |  |
| `settings` | `&amp;H2Settings` |  |

**Returns:** `H2EncodeResult`

---

### <a id="encodeSettingsFrame"></a>`encodeSettingsFrame` `🔓 export`

> 📄 `h2.vx` L627-639

```vex
export fn encodeSettingsFrame(out: &str!, settings: &H2Settings): H2EncodeResult
```

Build a complete SETTINGS frame (9-byte header + 36-byte payload).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;str!` |  |
| `settings` | `&amp;H2Settings` |  |

**Returns:** `H2EncodeResult`

---

### <a id="encodeSettingsFrameSelected"></a>`encodeSettingsFrameSelected` `🔓 export`

> 📄 `h2.vx` L646-693

```vex
export fn encodeSettingsFrameSelected(out: &str!, settings: &H2Settings, present: u8): H2EncodeResult
```

Encode only the selected standard SETTINGS entries. This is the canonical

transport API: roles can omit forbidden fields (servers must not emit
SETTINGS_ENABLE_PUSH), and unchanged defaults do not waste wire bytes.
Selection uses the `H2_SETTINGS_*` presence mask returned by
`parseSettingsUpdate`; unknown mask bits fail before output mutation.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;str!` |  |
| `settings` | `&amp;H2Settings` |  |
| `present` | `u8` |  |

**Returns:** `H2EncodeResult`

---

### <a id="encodeSettingsAck"></a>`encodeSettingsAck` `🔓 export`

> 📄 `h2.vx` L696-698

```vex
export fn encodeSettingsAck(out: &str!): H2EncodeResult
```

Build an empty SETTINGS acknowledgement frame.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;str!` |  |

**Returns:** `H2EncodeResult`

---

### <a id="writeSetting"></a>`writeSetting`

> 📄 `h2.vx` L700-709

```vex
fn writeSetting(out: &str!, offset: usize, id: u16, value: u32): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;str!` |  |
| `offset` | `usize` |  |
| `id` | `u16` |  |
| `value` | `u32` |  |

**Returns:** `usize`

---

### <a id="encodePing"></a>`encodePing` `🔓 export`

> 📄 `h2.vx` L712-730

```vex
export fn encodePing(out: &str!, opaqueData: str, isAck: bool): H2EncodeResult
```

Build a PING frame. `opaqueData` must contain exactly eight bytes.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;str!` |  |
| `opaqueData` | `str` |  |
| `isAck` | `bool` |  |

**Returns:** `H2EncodeResult`

---

### <a id="encodeLegacyPriority"></a>`encodeLegacyPriority` `🔓 export`

> 📄 `h2.vx` L734-759

```vex
export fn encodeLegacyPriority(out: &str!, streamId: u32, priority: &H2LegacyPriority): H2EncodeResult
```

Build one deprecated RFC 7540 PRIORITY compatibility frame. Vex-native

scheduling should emit RFC 9218 PRIORITY_UPDATE instead.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;str!` |  |
| `streamId` | `u32` |  |
| `priority` | `&amp;H2LegacyPriority` |  |

**Returns:** `H2EncodeResult`

---

### <a id="encodeWindowUpdate"></a>`encodeWindowUpdate` `🔓 export`

> 📄 `h2.vx` L762-776

```vex
export fn encodeWindowUpdate(out: &str!, streamId: u32, increment: u32): H2EncodeResult
```

Build a WINDOW_UPDATE frame.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;str!` |  |
| `streamId` | `u32` |  |
| `increment` | `u32` |  |

**Returns:** `H2EncodeResult`

---

### <a id="encodeRstStream"></a>`encodeRstStream` `🔓 export`

> 📄 `h2.vx` L779-792

```vex
export fn encodeRstStream(out: &str!, streamId: u32, errorCode: u32): H2EncodeResult
```

Build a RST_STREAM frame.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;str!` |  |
| `streamId` | `u32` |  |
| `errorCode` | `u32` |  |

**Returns:** `H2EncodeResult`

---

### <a id="encodeGoAway"></a>`encodeGoAway` `🔓 export`

> 📄 `h2.vx` L795-797

```vex
export fn encodeGoAway(out: &str!, lastStreamId: u32, errorCode: u32): H2EncodeResult
```

Build a GOAWAY frame.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;str!` |  |
| `lastStreamId` | `u32` |  |
| `errorCode` | `u32` |  |

**Returns:** `H2EncodeResult`

---

### <a id="encodeGoAwayWithDebug"></a>`encodeGoAwayWithDebug` `🔓 export`

> 📄 `h2.vx` L801-831

```vex
export fn encodeGoAwayWithDebug(out: &str!, lastStreamId: u32, errorCode: u32, debugData: str): H2EncodeResult
```

Build a complete GOAWAY frame including optional opaque diagnostic bytes.

Capacity and the 24-bit frame-length bound are validated before any write.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;str!` |  |
| `lastStreamId` | `u32` |  |
| `errorCode` | `u32` |  |
| `debugData` | `str` |  |

**Returns:** `H2EncodeResult`

---

### <a id="detectBodyMode"></a>`detectBodyMode` `🔓 export`

> 📄 `body.vx` L19-36

```vex
export fn detectBodyMode(hdrs: &ParserHeaders, isRequest: bool): BodyMode
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `hdrs` | `&amp;ParserHeaders` |  |
| `isRequest` | `bool` |  |

**Returns:** `BodyMode`

---

### <a id="pageRemaining"></a>`pageRemaining`

> 📄 `body.vx` L172-174

```vex
fn pageRemaining(offset: usize, pageBytes: usize): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `offset` | `usize` |  |
| `pageBytes` | `usize` |  |

**Returns:** `usize`

---

### <a id="bodyDeclaredLength"></a>`bodyDeclaredLength`

> 📄 `body.vx` L318-328

```vex
fn bodyDeclaredLength(mode: BodyMode): i64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `mode` | `BodyMode` |  |

**Returns:** `i64`

---

### <a id="bodyProgress"></a>`bodyProgress`

> 📄 `body.vx` L544-546

```vex
fn bodyProgress(consumed: usize, decoded: usize): BodyProgress
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `consumed` | `usize` |  |
| `decoded` | `usize` |  |

**Returns:** `BodyProgress`

---

### <a id="getStaticEntry"></a>`getStaticEntry`

> 📄 `hpack.vx` L32-96

```vex
fn getStaticEntry(index: usize): (str, str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `index` | `usize` |  |

**Returns:** `(str, str)`

---

### <a id="decodeIntegerChecked"></a>`decodeIntegerChecked` `🔓 export`

> 📄 `hpack.vx` L223-259

```vex
export fn decodeIntegerChecked(data: str, prefixBits: u8): HpackIntegerResult
```

Decode an HPACK integer while preserving truncation and overflow.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |
| `prefixBits` | `u8` |  |

**Returns:** `HpackIntegerResult`

---

### <a id="decodeInteger"></a>`decodeInteger` `🔓 export`

> 📄 `hpack.vx` L262-267

```vex
export fn decodeInteger(data: str, prefixBits: u8): (u64, usize)
```

Compatibility helper. Prefer `decodeIntegerChecked` in protocol code.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |
| `prefixBits` | `u8` |  |

**Returns:** `(u64, usize)`

---

### <a id="encodeInteger"></a>`encodeInteger` `🔓 export`

> 📄 `hpack.vx` L270-292

```vex
export fn encodeInteger(out: &str!, value: u64, prefixBits: u8, prefixByte: u8): usize
```

Encode an HPACK integer. Returns bytes written to `out`.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;str!` |  |
| `value` | `u64` |  |
| `prefixBits` | `u8` |  |
| `prefixByte` | `u8` |  |

**Returns:** `usize`

---

### <a id="decodeHeader"></a>`decodeHeader` `🔓 export`

> 📄 `hpack.vx` L388-393

```vex
export fn decodeHeader(data: str, table: &DynamicTable!): (HpackResult, usize)
```

Decode the next HPACK header representation from data.

Returns (HpackResult, bytesConsumed).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |
| `table` | `&amp;DynamicTable!` |  |

**Returns:** `(HpackResult, usize)`

---

### <a id="decodeHeaderLimited"></a>`decodeHeaderLimited` `🔓 export`

> 📄 `hpack.vx` L396-467

```vex
export fn decodeHeaderLimited(data: str, table: &DynamicTable!, maxStringBytes: usize, maxDynamicTableSize: usize): (HpackResult, usize)
```

Decode one representation under explicit string and table bounds.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |
| `table` | `&amp;DynamicTable!` |  |
| `maxStringBytes` | `usize` |  |
| `maxDynamicTableSize` | `usize` |  |

**Returns:** `(HpackResult, usize)`

---

### <a id="decodeLiteral"></a>`decodeLiteral`

> 📄 `hpack.vx` L470-536

```vex
fn decodeLiteral(data: str, table: &DynamicTable!, prefixBits: u8, indexing: HpackIndexing, maxStringBytes: usize): (HpackResult, usize)
```

Decode a literal header field.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |
| `table` | `&amp;DynamicTable!` |  |
| `prefixBits` | `u8` |  |
| `indexing` | `HpackIndexing` |  |
| `maxStringBytes` | `usize` |  |

**Returns:** `(HpackResult, usize)`

---

### <a id="decodeStringLiteral"></a>`decodeStringLiteral`

> 📄 `hpack.vx` L538-576

```vex
fn decodeStringLiteral(data: str, maximum: usize): HpackStringResult
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |
| `maximum` | `usize` |  |

**Returns:** `HpackStringResult`

---

### <a id="decodeHeaderBlock"></a>`decodeHeaderBlock` `🔓 export`

> 📄 `hpack.vx` L580-586

```vex
export fn decodeHeaderBlock(data: str, table: &DynamicTable!): HpackBlockResult
```

Decode a complete HPACK header block.

Returns list of decoded headers.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |
| `table` | `&amp;DynamicTable!` |  |

**Returns:** `HpackBlockResult`

---

### <a id="decodeHeaderBlockLimited"></a>`decodeHeaderBlockLimited` `🔓 export`

> 📄 `hpack.vx` L590-670

```vex
export fn decodeHeaderBlockLimited(data: str, table: &DynamicTable!, limits: &HpackDecodeLimits): HpackBlockResult
```

Decode a complete block or return a typed terminal error. Partial header

lists are never reported as success.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |
| `table` | `&amp;DynamicTable!` |  |
| `limits` | `&amp;HpackDecodeLimits` |  |

**Returns:** `HpackBlockResult`

---

### <a id="staticLookupExact"></a>`staticLookupExact`

> 📄 `hpack.vx` L777-816

```vex
fn staticLookupExact(name: str, value: str): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `str` |  |
| `value` | `str` |  |

**Returns:** `usize`

---

### <a id="integerEncodedLength"></a>`integerEncodedLength`

> 📄 `hpack.vx` L818-828

```vex
fn integerEncodedLength(value: usize, prefixBits: u8): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `usize` |  |
| `prefixBits` | `u8` |  |

**Returns:** `usize`

---

### <a id="checkedEncodedAdd"></a>`checkedEncodedAdd`

> 📄 `hpack.vx` L830-833

```vex
fn checkedEncodedAdd(total: usize, amount: usize, maximum: usize): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `total` | `usize` |  |
| `amount` | `usize` |  |
| `maximum` | `usize` |  |

**Returns:** `usize`

---

### <a id="virtualLookupExact"></a>`virtualLookupExact`

> 📄 `hpack.vx` L835-850

```vex
fn virtualLookupExact(entries: &Vec<HpackVirtualEntry>, name: str, value: str): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `entries` | `&amp;Vec&lt;HpackVirtualEntry&gt;` |  |
| `name` | `str` |  |
| `value` | `str` |  |

**Returns:** `usize`

---

### <a id="virtualLookupName"></a>`virtualLookupName`

> 📄 `hpack.vx` L852-867

```vex
fn virtualLookupName(entries: &Vec<HpackVirtualEntry>, name: str): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `entries` | `&amp;Vec&lt;HpackVirtualEntry&gt;` |  |
| `name` | `str` |  |

**Returns:** `usize`

---

### <a id="virtualAdd"></a>`virtualAdd`

> 📄 `hpack.vx` L869-890

```vex
fn virtualAdd(entries: &Vec<HpackVirtualEntry>!, currentSize: &usize!, maximumSize: usize, name: str, value: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `entries` | `&amp;Vec&lt;HpackVirtualEntry&gt;!` |  |
| `currentSize` | `&amp;usize!` |  |
| `maximumSize` | `usize` |  |
| `name` | `str` |  |
| `value` | `str` |  |

---

### <a id="autoSensitiveName"></a>`autoSensitiveName`

> 📄 `hpack.vx` L892-895

```vex
fn autoSensitiveName(name: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `str` |  |

**Returns:** `bool`

---

### <a id="autoShouldIndex"></a>`autoShouldIndex`

> 📄 `hpack.vx` L897-902

```vex
fn autoShouldIndex(name: str, fieldBytes: usize, tableBytes: usize): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `str` |  |
| `fieldBytes` | `usize` |  |
| `tableBytes` | `usize` |  |

**Returns:** `bool`

---

### <a id="encodedStringBytes"></a>`encodedStringBytes`

> 📄 `hpack.vx` L904-909

```vex
fn encodedStringBytes(value: str, useHuffman: bool): (usize, bool, usize)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |
| `useHuffman` | `bool` |  |

**Returns:** `(usize, bool, usize)`

---

### <a id="writeIntegerAt"></a>`writeIntegerAt`

> 📄 `hpack.vx` L911-931

```vex
fn writeIntegerAt(out: &str!, offset: usize, value: usize, prefixBits: u8, prefixByte: u8): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;str!` |  |
| `offset` | `usize` |  |
| `value` | `usize` |  |
| `prefixBits` | `u8` |  |
| `prefixByte` | `u8` |  |

**Returns:** `usize`

---

### <a id="writeStringAt"></a>`writeStringAt`

> 📄 `hpack.vx` L933-948

```vex
fn writeStringAt(out: &str!, offset: usize, value: str, huffman: bool, payloadBytes: usize): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;str!` |  |
| `offset` | `usize` |  |
| `value` | `str` |  |
| `huffman` | `bool` |  |
| `payloadBytes` | `usize` |  |

**Returns:** `usize`

---

### <a id="tableLookupExact"></a>`tableLookupExact`

> 📄 `hpack.vx` L950-964

```vex
fn tableLookupExact(table: &DynamicTable, name: str, value: str): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `table` | `&amp;DynamicTable` |  |
| `name` | `str` |  |
| `value` | `str` |  |

**Returns:** `usize`

---

### <a id="encodeIndexedOnly"></a>`encodeIndexedOnly`

> 📄 `hpack.vx` L970-1034

```vex
fn encodeIndexedOnly(headers: &Vec<HpackHeader>, encoder: &HpackEncoder!, out: &str!, limits: &HpackEncodeLimits): Option<HpackEncodeResult>
```

Allocation-free common path for a warm connection whose field section is

already represented entirely by static/dynamic indices. It performs the
complete limit preflight before writing, preserving the encoder's
transactional output guarantee.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `headers` | `&amp;Vec&lt;HpackHeader&gt;` |  |
| `encoder` | `&amp;HpackEncoder!` |  |
| `out` | `&amp;str!` |  |
| `limits` | `&amp;HpackEncodeLimits` |  |

**Returns:** `Option&lt;HpackEncodeResult&gt;`

---

### <a id="encodeHeaderBlockLimited"></a>`encodeHeaderBlockLimited` `🔓 export`

> 📄 `hpack.vx` L1039-1245

```vex
export fn encodeHeaderBlockLimited(headers: &Vec<HpackHeader>, encoder: &HpackEncoder!, out: &str!, limits: &HpackEncodeLimits): HpackEncodeResult
```

Encode one complete HPACK field block transactionally. Every semantic and

capacity check runs before the first output write. The dynamic table and
pending SETTINGS update are committed only after encoding succeeds.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `headers` | `&amp;Vec&lt;HpackHeader&gt;` |  |
| `encoder` | `&amp;HpackEncoder!` |  |
| `out` | `&amp;str!` |  |
| `limits` | `&amp;HpackEncodeLimits` |  |

**Returns:** `HpackEncodeResult`

---

### <a id="encodeHeaderBlock"></a>`encodeHeaderBlock` `🔓 export`

> 📄 `hpack.vx` L1247-1252

```vex
export fn encodeHeaderBlock(headers: &Vec<HpackHeader>, encoder: &HpackEncoder!, out: &str!): HpackEncodeResult
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `headers` | `&amp;Vec&lt;HpackHeader&gt;` |  |
| `encoder` | `&amp;HpackEncoder!` |  |
| `out` | `&amp;str!` |  |

**Returns:** `HpackEncodeResult`

---

### <a id="parseFiberRequestInto"></a>`parseFiberRequestInto` `🔓 export`

> 📄 `fiber_request.vx` L73-75

```vex
export fn parseFiberRequestInto(buf: str, out: &FiberParsedRequest!): FiberRequestResult
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `str` |  |
| `out` | `&amp;FiberParsedRequest!` |  |

**Returns:** `FiberRequestResult`

---

### <a id="parseFiberRequestIntoWithLimits"></a>`parseFiberRequestIntoWithLimits` `🔓 export`

> 📄 `fiber_request.vx` L77-301

```vex
export fn parseFiberRequestIntoWithLimits(buf: str, out: &FiberParsedRequest!, limits: FiberRequestLimits): FiberRequestResult
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `buf` | `str` |  |
| `out` | `&amp;FiberParsedRequest!` |  |
| `limits` | `FiberRequestLimits` |  |

**Returns:** `FiberRequestResult`

---

### <a id="parseFiberRequest"></a>`parseFiberRequest` `🔓 export`

> 📄 `fiber_request.vx` L303-307

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

> 📄 `fiber_request.vx` L309-311

```vex
fn isHttp10(v: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `v` | `str` |  |

**Returns:** `bool`

---

### <a id="sequenceError"></a>`sequenceError`

> 📄 `h2_connection.vx` L361-363

```vex
fn sequenceError(message: str): H2ConnectionResult
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `message` | `str` |  |

**Returns:** `H2ConnectionResult`

---

### <a id="parseMethod"></a>`parseMethod`

> 📄 `request.vx` L59-82

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

> 📄 `request.vx` L95-99

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

### <a id="validateRequestFraming"></a>`validateRequestFraming`

> 📄 `request.vx` L205-230

```vex
fn validateRequestFraming(req: &ParserRequest): str
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&amp;ParserRequest` |  |

**Returns:** `str`

---

### <a id="parseRequest"></a>`parseRequest` `🔓 export`

> 📄 `request.vx` L243-307

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

> 📄 `request.vx` L310-312

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

### <a id="progress"></a>`progress`

> 📄 `chunked.vx` L73-75

```vex
fn progress(consumed: usize, decoded: usize): ChunkProgress
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `consumed` | `usize` |  |
| `decoded` | `usize` |  |

**Returns:** `ChunkProgress`

---

### <a id="validateTrailer"></a>`validateTrailer`

> 📄 `chunked.vx` L82-111

```vex
fn validateTrailer(line: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `line` | `str` |  |

**Returns:** `bool`

---

### <a id="parseResponse"></a>`parseResponse` `🔓 export`

> 📄 `response.vx` L121-177

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

> 📄 `huffman.vx` L29-289

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

> 📄 `huffman.vx` L297-308

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

> 📄 `huffman.vx` L318-353

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
| `out` | `&amp;str!` |  |

**Returns:** `usize`

---

### <a id="huffmanDecode"></a>`huffmanDecode` `🔓 export`

> 📄 `huffman.vx` L373-439

```vex
export fn huffmanDecode(input: str, inputLen: usize, out: &str!, outputCapacity: usize): HuffDecodeResult
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
| `out` | `&amp;str!` |  |
| `outputCapacity` | `usize` |  |

**Returns:** `HuffDecodeResult`

---

### <a id="matchHuffmanSymbol"></a>`matchHuffmanSymbol`

> 📄 `huffman.vx` L443-729

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

### <a id="requireValidHttpCapabilities"></a>`requireValidHttpCapabilities` `🔓 export`

> 📄 `capabilities.vx` L17-26

```vex
export fn requireValidHttpCapabilities()
```

**Type Parameters:**

- `const ACTIVE: u32`

---

### <a id="requireAsyncRoutes"></a>`requireAsyncRoutes` `🔓 export`

> 📄 `capabilities.vx` L28-33

```vex
export fn requireAsyncRoutes()
```

**Type Parameters:**

- `const ACTIVE: u32`

---

### <a id="requireRequestStreaming"></a>`requireRequestStreaming` `🔓 export`

> 📄 `capabilities.vx` L35-40

```vex
export fn requireRequestStreaming()
```

**Type Parameters:**

- `const ACTIVE: u32`

---

### <a id="requireWebSocket"></a>`requireWebSocket` `🔓 export`

> 📄 `capabilities.vx` L42-47

```vex
export fn requireWebSocket()
```

**Type Parameters:**

- `const ACTIVE: u32`

---

### <a id="requireResponseStreaming"></a>`requireResponseStreaming` `🔓 export`

> 📄 `capabilities.vx` L49-54

```vex
export fn requireResponseStreaming()
```

**Type Parameters:**

- `const ACTIVE: u32`

---

### <a id="admissionTryAcquire"></a>`admissionTryAcquire`

> 📄 `app.vx` L131-142

```vex
fn admissionTryAcquire(state: Ptr<AdmissionState!>): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `state` | `Ptr&lt;AdmissionState!&gt;` |  |

**Returns:** `bool`

---

### <a id="admissionRelease"></a>`admissionRelease`

> 📄 `app.vx` L144-152

```vex
fn admissionRelease(state: Ptr<AdmissionState!>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `state` | `Ptr&lt;AdmissionState!&gt;` |  |

---

### <a id="nextWsSessionId"></a>`nextWsSessionId`

> 📄 `app.vx` L154-158

```vex
fn nextWsSessionId(state: Ptr<WsSessionIdState!>): u64
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `state` | `Ptr&lt;WsSessionIdState!&gt;` |  |

**Returns:** `u64`

---

### <a id="asyncConnectionReturn"></a>`asyncConnectionReturn`

> 📄 `app.vx` L280-289

```vex
fn asyncConnectionReturn(transport: AsyncBodyTransport, admission: Box<AdmissionState>): AsyncConnectionReturn
```

Keep aggregate decomposition outside the coroutine frame. The async ABI

moves this function's complete result as one value, so no suspension point
needs a persistent per-field drop mask.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `transport` | `AsyncBodyTransport` |  |
| `admission` | `Box&lt;AdmissionState&gt;` |  |

**Returns:** `AsyncConnectionReturn`

---

### <a id="fullDeferred"></a>`fullDeferred`

> 📄 `app.vx` L355-360

```vex
fn fullDeferred(context: Ptr<FullWorkerContext>): &DeferredConnectionQueue!
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `context` | `Ptr&lt;FullWorkerContext&gt;` |  |

**Returns:** `&amp;DeferredConnectionQueue!`

---

### <a id="newFullConnectionState"></a>`newFullConnectionState`

> 📄 `app.vx` L505-527

```vex
fn newFullConnectionState(nowNs: u64, admission: Box<AdmissionState>): H1ConnectionState
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `nowNs` | `u64` |  |
| `admission` | `Box&lt;AdmissionState&gt;` |  |

**Returns:** `H1ConnectionState`

---

### <a id="newHttp1SyncConnectionState"></a>`newHttp1SyncConnectionState`

> 📄 `app.vx` L529-545

```vex
fn newHttp1SyncConnectionState(nowNs: u64, admission: Box<AdmissionState>): Http1SyncConnectionState
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `nowNs` | `u64` |  |
| `admission` | `Box&lt;AdmissionState&gt;` |  |

**Returns:** `Http1SyncConnectionState`

---

### <a id="classifyInitialProtocol"></a>`classifyInitialProtocol`

> 📄 `app.vx` L577-592

```vex
fn classifyInitialProtocol(input: str): i32
```

Classify only the first bytes owned by a fresh descriptor. A partial match

is retained up to the fixed 24-byte preface; after the first mismatch this
connection permanently commits to HTTP/1 and cannot switch protocols.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `input` | `str` |  |

**Returns:** `i32`

---

### <a id="envValueOrEmpty"></a>`envValueOrEmpty`

> 📄 `app.vx` L594-599

```vex
fn envValueOrEmpty(name: string): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` |  |

**Returns:** `string`

---

### <a id="envFlag"></a>`envFlag`

> 📄 `app.vx` L601-604

```vex
fn envFlag(name: string): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` |  |

**Returns:** `bool`

---

### <a id="staticFileHandler"></a>`staticFileHandler`

> 📄 `app.vx` L1053-1056

```vex
fn staticFileHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="acceptHttp1SyncBatch"></a>`acceptHttp1SyncBatch`

> 📄 `app.vx` L1673-1703

```vex
fn acceptHttp1SyncBatch(listenFd: i32, evLoop: &EventLoop!, active: &Vec<i32>!, states: &Map<i32, Http1SyncConnectionState>!, admission: &Box<AdmissionState>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `listenFd` | `i32` |  |
| `evLoop` | `&amp;EventLoop!` |  |
| `active` | `&amp;Vec&lt;i32&gt;!` |  |
| `states` | `&amp;Map&lt;i32, Http1SyncConnectionState&gt;!` |  |
| `admission` | `&amp;Box&lt;AdmissionState&gt;` |  |

---

### <a id="reapHttp1SyncConnections"></a>`reapHttp1SyncConnections`

> 📄 `app.vx` L1705-1732

```vex
fn reapHttp1SyncConnections(active: &Vec<i32>!, evLoop: &EventLoop!, states: &Map<i32, Http1SyncConnectionState>!, readTimeoutMs: i32, idleTimeoutMs: i32)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `active` | `&amp;Vec&lt;i32&gt;!` |  |
| `evLoop` | `&amp;EventLoop!` |  |
| `states` | `&amp;Map&lt;i32, Http1SyncConnectionState&gt;!` |  |
| `readTimeoutMs` | `i32` |  |
| `idleTimeoutMs` | `i32` |  |

---

### <a id="closeAllHttp1SyncConnections"></a>`closeAllHttp1SyncConnections`

> 📄 `app.vx` L1734-1744

```vex
fn closeAllHttp1SyncConnections(active: &Vec<i32>!, evLoop: &EventLoop!, states: &Map<i32, Http1SyncConnectionState>!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `active` | `&amp;Vec&lt;i32&gt;!` |  |
| `evLoop` | `&amp;EventLoop!` |  |
| `states` | `&amp;Map&lt;i32, Http1SyncConnectionState&gt;!` |  |

---

### <a id="flushAcceptedBatch"></a>`flushAcceptedBatch`

> 📄 `app.vx` L1862-1927

```vex
fn flushAcceptedBatch(pipe_write_fds: &[i32; 64], worker_penalty: &[i32; 64]!, dispatched_per_worker: &[i64; 64]!, num_workers: i32, rr_idx_in: i32, fd_batch: &[i32; 32], fd_batch_count: usize, dropped_fds: &i64 !, debug_pipe: bool, admission: Ptr<AdmissionState!>): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `pipe_write_fds` | `&amp;[i32; 64]` |  |
| `worker_penalty` | `&amp;[i32; 64]!` |  |
| `dispatched_per_worker` | `&amp;[i64; 64]!` |  |
| `num_workers` | `i32` |  |
| `rr_idx_in` | `i32` |  |
| `fd_batch` | `&amp;[i32; 32]` |  |
| `fd_batch_count` | `usize` |  |
| `dropped_fds` | `&amp;i64 !` |  |
| `debug_pipe` | `bool` |  |
| `admission` | `Ptr&lt;AdmissionState!&gt;` |  |

**Returns:** `i32`

---

### <a id="drainAsyncReturnWake"></a>`drainAsyncReturnWake`

> 📄 `app.vx` L1933-1937

```vex
fn drainAsyncReturnWake(fd: i32)
```

Drain completion wake bytes. The pipe is only a readiness edge; ownership

lives in `Channel&lt;AsyncConnectionReturn&gt;`, so token coalescing or EAGAIN on
a producer write cannot duplicate or lose a descriptor.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |

---

### <a id="acceptBatch"></a>`acceptBatch`

> 📄 `app.vx` L2772-2804

```vex
fn acceptBatch(listen_fd: i32, ev_loop: &EventLoop!, active_fds: &Vec<i32>!, h1_states: &Map<i32, H1ConnectionState>!, admission: &Box<AdmissionState>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `listen_fd` | `i32` |  |
| `ev_loop` | `&amp;EventLoop!` |  |
| `active_fds` | `&amp;Vec&lt;i32&gt;!` |  |
| `h1_states` | `&amp;Map&lt;i32, H1ConnectionState&gt;!` |  |
| `admission` | `&amp;Box&lt;AdmissionState&gt;` |  |

---

### <a id="syncH2Deadline"></a>`syncH2Deadline`

> 📄 `app.vx` L3300-3313

```vex
fn syncH2Deadline(state: &H1ConnectionState!, session: &H2TransportSession, nowNs: u64)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `state` | `&amp;H1ConnectionState!` |  |
| `session` | `&amp;H2TransportSession` |  |
| `nowNs` | `u64` |  |

---

### <a id="taskOwnedPart"></a>`taskOwnedPart`

> 📄 `app.vx` L3823-3827

```vex
fn taskOwnedPart(ctx: &Ctx!, value: str): str
```

Append one owned string to a task context and return the stable `str` view

into that storage. `taskOwnedCtx` reserves its complete part count before
calling this helper, so later appends cannot invalidate an earlier view.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |
| `value` | `str` |  |

**Returns:** `str`

---

### <a id="taskOwnedCtx"></a>`taskOwnedCtx`

> 📄 `app.vx` L3837-3897

```vex
fn taskOwnedCtx(source: &Ctx): Ctx
```

Detach request-visible state from Fiber's worker buffers before an async

route suspends. It copies only the request strings and route keys (never
response or worker scratch state); all published `str` views point into the
returned context's fixed-capacity owner vector.
Synchronous middlewares are intentionally not copied: an async route uses
its explicit `AsyncHandler` chain, otherwise a synchronous `next()` could
resume after a task-owned response has already crossed the transport.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `source` | `&amp;Ctx` |  |

**Returns:** `Ctx`

---

### <a id="populateRequestContext"></a>`populateRequestContext`

> 📄 `app.vx` L3913-3944

```vex
fn populateRequestContext(fd: i32, ctx: &Ctx!, parsed: &FiberParsedRequest!, raw_http1: str)
```

Populate only request metadata which is valid as soon as the HTTP/1 header

block completes. Both buffered dispatch and early streaming-body routing
use this function, preventing two parsers from disagreeing about route or
header identity.

**Type Parameters:**

- `const FEATURES: u32`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `ctx` | `&amp;Ctx!` |  |
| `parsed` | `&amp;FiberParsedRequest!` |  |
| `raw_http1` | `str` |  |

---

### <a id="runDirectApplication"></a>`runDirectApplication`

> 📄 `app.vx` L4116-4118

```vex
fn runDirectApplication(ctx: &Ctx!, handler: RequestHandler)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |
| `handler` | `RequestHandler` |  |

---

### <a id="isNonBlockingRetry"></a>`isNonBlockingRetry`

> 📄 `app.vx` L4213-4218

```vex
fn isNonBlockingRetry(rc: i64): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `rc` | `i64` |  |

**Returns:** `bool`

---

### <a id="effectiveTimeoutMs"></a>`effectiveTimeoutMs`

> 📄 `app.vx` L4220-4222

```vex
fn effectiveTimeoutMs(configuredMs: i32, fallbackMs: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `configuredMs` | `i32` |  |
| `fallbackMs` | `i32` |  |

**Returns:** `i32`

---

### <a id="maintenancePollTimeout"></a>`maintenancePollTimeout`

> 📄 `app.vx` L4224-4234

```vex
fn maintenancePollTimeout(readTimeoutMs: i32, idleTimeoutMs: i32): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `readTimeoutMs` | `i32` |  |
| `idleTimeoutMs` | `i32` |  |

**Returns:** `i32`

---

### <a id="timeoutExpired"></a>`timeoutExpired`

> 📄 `app.vx` L4236-4239

```vex
fn timeoutExpired(nowNs: u64, startedNs: u64, timeoutMs: i32): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `nowNs` | `u64` |  |
| `startedNs` | `u64` |  |
| `timeoutMs` | `i32` |  |

**Returns:** `bool`

---

### <a id="reapClosedConnections"></a>`reapClosedConnections`

> 📄 `app.vx` L4241-4312

```vex
fn reapClosedConnections(active_fds: &Vec<i32>!, ev_loop: &EventLoop!, h1_states: &Map<i32, H1ConnectionState>!, readTimeoutMs: i32, writeTimeoutMs: i32, idleTimeoutMs: i32)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `active_fds` | `&amp;Vec&lt;i32&gt;!` |  |
| `ev_loop` | `&amp;EventLoop!` |  |
| `h1_states` | `&amp;Map&lt;i32, H1ConnectionState&gt;!` |  |
| `readTimeoutMs` | `i32` |  |
| `writeTimeoutMs` | `i32` |  |
| `idleTimeoutMs` | `i32` |  |

---

### <a id="closeTrackedConnection"></a>`closeTrackedConnection`

> 📄 `app.vx` L4314-4321

```vex
fn closeTrackedConnection(fd: i32, ev_loop: &EventLoop!, active_fds: &Vec<i32>!, h1_states: &Map<i32, H1ConnectionState>!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `ev_loop` | `&amp;EventLoop!` |  |
| `active_fds` | `&amp;Vec&lt;i32&gt;!` |  |
| `h1_states` | `&amp;Map&lt;i32, H1ConnectionState&gt;!` |  |

---

### <a id="closeTrackedConnectionFor"></a>`closeTrackedConnectionFor`

> 📄 `app.vx` L4323-4365

```vex
fn closeTrackedConnectionFor(fd: i32, ev_loop: &EventLoop!, active_fds: &Vec<i32>!, h1_states: &Map<i32, ConnectionState<P>>!)
```

**Type Parameters:**

- `P`
- `const FEATURES: u32`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i32` |  |
| `ev_loop` | `&amp;EventLoop!` |  |
| `active_fds` | `&amp;Vec&lt;i32&gt;!` |  |
| `h1_states` | `&amp;Map&lt;i32, ConnectionState&lt;P&gt;&gt;!` |  |

---

### <a id="closeAllConnections"></a>`closeAllConnections`

> 📄 `app.vx` L4558-4568

```vex
fn closeAllConnections(active_fds: &Vec<i32>!, ev_loop: &EventLoop!, h1_states: &Map<i32, H1ConnectionState>!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `active_fds` | `&amp;Vec&lt;i32&gt;!` |  |
| `ev_loop` | `&amp;EventLoop!` |  |
| `h1_states` | `&amp;Map&lt;i32, H1ConnectionState&gt;!` |  |

---

### <a id="waitForWorkers"></a>`waitForWorkers`

> 📄 `app.vx` L4570-4578

```vex
fn waitForWorkers(done: &Channel<i32>, count: i32)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `done` | `&amp;Channel&lt;i32&gt;` |  |
| `count` | `i32` |  |

---

### <a id="activeRemoveFd"></a>`activeRemoveFd`

> 📄 `app.vx` L4580-4598

```vex
fn activeRemoveFd(active_fds: &Vec<i32>!, fd: i32): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `active_fds` | `&amp;Vec&lt;i32&gt;!` |  |
| `fd` | `i32` |  |

**Returns:** `bool`

---

### <a id="closeListenFds"></a>`closeListenFds`

> 📄 `app.vx` L4600-4617

```vex
fn closeListenFds(fds: &Vec<i32>)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fds` | `&amp;Vec&lt;i32&gt;` |  |

---

### <a id="defaultNotFound"></a>`defaultNotFound`

> 📄 `app.vx` L4619-4622

```vex
fn defaultNotFound(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="groupStaticFileHandler"></a>`groupStaticFileHandler`

> 📄 `group.vx` L254-257

```vex
fn groupStaticFileHandler(c: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="methodToId"></a>`methodToId`

> 📄 `router.vx` L38-47

```vex
fn methodToId(m: str): i32
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `m` | `str` |  |

**Returns:** `i32`

---

### <a id="asyncRouteMarker"></a>`asyncRouteMarker`

> 📄 `router.vx` L395-398

```vex
fn asyncRouteMarker(ctx: &Ctx!)
```

Marker retained in the radix tree for an async route. Fiber's connection

handoff recognizes the route metadata before this marker can execute. The
explicit failure is a defensive last resort if that invariant is violated;
silently falling back to a synchronous handler would be unsound.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |

---

### <a id="emptyCtx"></a>`emptyCtx`

> 📄 `ctx.vx` L473-512

```vex
fn emptyCtx(): Ctx
```

**Returns:** `Ctx`

---

### <a id="resetHttp1Common"></a>`resetHttp1Common`

> 📄 `ctx.vx` L544-577

```vex
fn resetHttp1Common(ctx: &Ctx!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |

---

### <a id="staticPathHasParentSegment"></a>`staticPathHasParentSegment`

> 📄 `ctx.vx` L1033-1046

```vex
fn staticPathHasParentSegment(path: str): bool
```

Detect only a complete `..` path component. Names such as `report..old`

are ordinary files and must not be rejected by a static server.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `str` |  |

**Returns:** `bool`

---

### <a id="pathIsWithinRoot"></a>`pathIsWithinRoot`

> 📄 `ctx.vx` L1051-1064

```vex
fn pathIsWithinRoot(root: str, candidate: str): bool
```

Canonical paths use native separators. The component boundary check avoids

treating `/srv/site-old` as a child of `/srv/site` and accepts a filesystem
root (`/` or `C:\\`) without a special allocation.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `root` | `str` |  |
| `candidate` | `str` |  |

**Returns:** `bool`

---

### <a id="streamRouteHandler"></a>`streamRouteHandler` `🔓 export`

> 📄 `ctx.vx` L1193-1208

```vex
export fn streamRouteHandler(c: &Ctx!)
```

Router stores this as the terminal Handler for dynamic endpoints. It keeps

stream producers inside the existing middleware chain rather than creating
a second dispatch path with subtly different auth/recovery semantics.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="wsRouteHandler"></a>`wsRouteHandler` `🔓 export`

> 📄 `ctx.vx` L1238-1243

```vex
export fn wsRouteHandler(c: &Ctx!)
```

Terminal marker used by Router for `App.ws` endpoints. It intentionally

never upgrades or touches the socket: middleware may still reject the
request, and App must first drain prior HTTP/1 output before it transfers
connection ownership to a worker-owned `WsSession`.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `c` | `&amp;Ctx!` |  |

---

### <a id="parseQueryStringInto"></a>`parseQueryStringInto`

> 📄 `ctx.vx` L1297-1336

```vex
fn parseQueryStringInto(qs: str, params: &Vec<QueryParam>!)
```

Parse "key1=val1&key2=val2" into offsets backed by Request.query.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `qs` | `str` |  |
| `params` | `&amp;Vec&lt;QueryParam&gt;!` |  |

---

### <a id="findQueryValue"></a>`findQueryValue`

> 📄 `ctx.vx` L1339-1364

```vex
fn findQueryValue(qs: str, wanted: str): str
```

Find one raw query/form value without building a temporary Vec.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `qs` | `str` |  |
| `wanted` | `str` |  |

**Returns:** `str`

---

### <a id="strContains"></a>`strContains`

> 📄 `ctx.vx` L1371-1392

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

> 📄 `ctx.vx` L1395-1408

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

> 📄 `ctx.vx` L1413-1465

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

> 📄 `ctx.vx` L1472-1493

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

> 📄 `ctx.vx` L1495-1504

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

> 📄 `ctx.vx` L1506-1516

```vex
fn getExtension(path: string): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` |  |

**Returns:** `string`

---

### <a id="ensureRoot"></a>`ensureRoot`

> 📄 `radix.vx` L72-86

```vex
fn ensureRoot(tree: &RadixTree!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `tree` | `&amp;RadixTree!` |  |

---

### <a id="cloneMiddlewareRange"></a>`cloneMiddlewareRange`

> 📄 `radix.vx` L202-212

```vex
fn cloneMiddlewareRange(tree: &RadixTree, node_idx: usize): Vec<Handler>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `tree` | `&amp;RadixTree` |  |
| `node_idx` | `usize` |  |

**Returns:** `Vec&lt;Handler&gt;`

---

### <a id="appendNode"></a>`appendNode`

> 📄 `radix.vx` L216-234

```vex
fn appendNode(tree: &RadixTree!, parent: usize, kind: i32, prefix: string, paramName: string): usize
```

Append one node while maintaining the compact child/sibling adjacency

lists. All SoA columns are extended together, preserving index identity.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `tree` | `&amp;RadixTree!` |  |
| `parent` | `usize` |  |
| `kind` | `i32` |  |
| `prefix` | `string` |  |
| `paramName` | `string` |  |

**Returns:** `usize`

---

### <a id="ensurePattern"></a>`ensurePattern`

> 📄 `radix.vx` L236-316

```vex
fn ensurePattern(tree: &RadixTree!, pattern: string): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `tree` | `&amp;RadixTree!` |  |
| `pattern` | `string` |  |

**Returns:** `usize`

---

### <a id="assignMatch"></a>`assignMatch`

> 📄 `radix.vx` L318-325

```vex
fn assignMatch(tree: &RadixTree, node_idx: usize, result: &MatchResult!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `tree` | `&amp;RadixTree` |  |
| `node_idx` | `usize` |  |
| `result` | `&amp;MatchResult!` |  |

---

### <a id="matchNode"></a>`matchNode`

> 📄 `radix.vx` L327-348

```vex
fn matchNode(tree: &RadixTree, node_idx: usize, path: str, pos: usize, result: &MatchResult!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `tree` | `&amp;RadixTree` |  |
| `node_idx` | `usize` |  |
| `path` | `str` |  |
| `pos` | `usize` |  |
| `result` | `&amp;MatchResult!` |  |

---

### <a id="matchChildrenOfKind"></a>`matchChildrenOfKind`

> 📄 `radix.vx` L350-436

```vex
fn matchChildrenOfKind(tree: &RadixTree, parent_idx: usize, wanted_kind: i32, path: str, cpos: usize, result: &MatchResult!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `tree` | `&amp;RadixTree` |  |
| `parent_idx` | `usize` |  |
| `wanted_kind` | `i32` |  |
| `path` | `str` |  |
| `cpos` | `usize` |  |
| `result` | `&amp;MatchResult!` |  |

---

### <a id="assignMatchInto"></a>`assignMatchInto`

> 📄 `radix.vx` L442-459

```vex
fn assignMatchInto(tree: &RadixTree, node_idx: usize, ctx: &Ctx!, result: &RadixMatch!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `tree` | `&amp;RadixTree` |  |
| `node_idx` | `usize` |  |
| `ctx` | `&amp;Ctx!` |  |
| `result` | `&amp;RadixMatch!` |  |

---

### <a id="matchNodeInto"></a>`matchNodeInto`

> 📄 `radix.vx` L461-483

```vex
fn matchNodeInto(tree: &RadixTree, node_idx: usize, path: str, pos: usize, ctx: &Ctx!, result: &RadixMatch!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `tree` | `&amp;RadixTree` |  |
| `node_idx` | `usize` |  |
| `path` | `str` |  |
| `pos` | `usize` |  |
| `ctx` | `&amp;Ctx!` |  |
| `result` | `&amp;RadixMatch!` |  |

---

### <a id="matchChildrenInto"></a>`matchChildrenInto`

> 📄 `radix.vx` L485-563

```vex
fn matchChildrenInto(tree: &RadixTree, parent_idx: usize, wanted_kind: i32, path: str, cpos: usize, ctx: &Ctx!, result: &RadixMatch!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `tree` | `&amp;RadixTree` |  |
| `parent_idx` | `usize` |  |
| `wanted_kind` | `i32` |  |
| `path` | `str` |  |
| `cpos` | `usize` |  |
| `ctx` | `&amp;Ctx!` |  |
| `result` | `&amp;RadixMatch!` |  |

---

### <a id="asyncPipelineNext"></a>`asyncPipelineNext` `🔓 export`

> 📄 `async_pipeline.vx` L47-52

```vex
export fn asyncPipelineNext(steps: Vec<AsyncHandler>): AsyncPipelineNext
```

Move a finalized handler sequence into a task-owned continuation.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `steps` | `Vec&lt;AsyncHandler&gt;` |  |

**Returns:** `AsyncPipelineNext`

---

### <a id="bufferedStreamResult"></a>`bufferedStreamResult`

> 📄 `h2_application.vx` L151-163

```vex
fn bufferedStreamResult(result: H2ApplicationBodyResult): H2BufferedStreamResult
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `result` | `H2ApplicationBodyResult` |  |

**Returns:** `H2BufferedStreamResult`

---

### <a id="lowerH2HeaderName"></a>`lowerH2HeaderName`

> 📄 `h2_application.vx` L414-422

```vex
fn lowerH2HeaderName(name: str): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `str` |  |

**Returns:** `string`

---

### <a id="isResponseFramingField"></a>`isResponseFramingField`

> 📄 `h2_application.vx` L424-431

```vex
fn isResponseFramingField(name: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `str` |  |

**Returns:** `bool`

---

### <a id="decimalString"></a>`decimalString`

> 📄 `h2_application.vx` L433-437

```vex
fn decimalString(value: u64): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `u64` |  |

**Returns:** `string`

---

### <a id="h2ApplicationResponse"></a>`h2ApplicationResponse` `🔓 export`

> 📄 `h2_application.vx` L442-495

```vex
export fn h2ApplicationResponse(ctx: &Ctx!): H2ApplicationResponseResult
```

Move a completed shared Fiber response into HTTP/2 field/body ownership.

HTTP/1-only framing is never copied from application headers: the protocol
owner receives one canonical content-length and decides HEADERS/DATA state.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |

**Returns:** `H2ApplicationResponseResult`

---

### <a id="h2StreamingResponseHead"></a>`h2StreamingResponseHead` `🔓 export`

> 📄 `h2_application.vx` L500-534

```vex
export fn h2StreamingResponseHead(head: ResponseStreamHead): H2ApplicationResponseResult
```

Translate protocol-neutral streaming metadata into one H2 field owner.

Unlike buffered responses, an open stream omits Content-Length entirely;
bodyless status/HEAD semantics still close on HEADERS without DATA.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `head` | `ResponseStreamHead` |  |

**Returns:** `H2ApplicationResponseResult`

---

### <a id="h2BodyResult"></a>`h2BodyResult`

> 📄 `h2_application.vx` L552-562

```vex
fn h2BodyResult(result: BodyResult): H2ApplicationBodyResult
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `result` | `BodyResult` |  |

**Returns:** `H2ApplicationBodyResult`

---

### <a id="ownedFieldValue"></a>`ownedFieldValue`

> 📄 `h2_application.vx` L618-621

```vex
fn ownedFieldValue(owner: &H2FieldOwner, fieldIndex: usize): str
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `owner` | `&amp;H2FieldOwner` |  |
| `fieldIndex` | `usize` |  |

**Returns:** `str`

---

### <a id="ownedFieldName"></a>`ownedFieldName`

> 📄 `h2_application.vx` L623-626

```vex
fn ownedFieldName(owner: &H2FieldOwner, fieldIndex: usize): str
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `owner` | `&amp;H2FieldOwner` |  |
| `fieldIndex` | `usize` |  |

**Returns:** `str`

---

### <a id="splitRequestTarget"></a>`splitRequestTarget`

> 📄 `h2_application.vx` L628-645

```vex
fn splitRequestTarget(ctx: &Ctx!, target: str)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ctx` | `&amp;Ctx!` |  |
| `target` | `str` |  |

---

### <a id="h2ApplicationRequest"></a>`h2ApplicationRequest` `🔓 export`

> 📄 `h2_application.vx` L650-736

```vex
export fn h2ApplicationRequest(fd: i64, streamId: u32, endStream: bool, kind: H2FieldSectionKind, info: H2FieldSectionInfo, fields: &!Vec<HpackHeader>, maxBodyBytes: usize): H2ApplicationRequestResult
```

Move one already-validated initial HTTP/2 request field section into its

H2 application owner. Every request/header view points into that pinned
owner; the protocol-neutral Ctx neither stores nor drops HTTP/2 types.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `streamId` | `u32` |  |
| `endStream` | `bool` |  |
| `kind` | `H2FieldSectionKind` |  |
| `info` | `H2FieldSectionInfo` |  |
| `fields` | `&amp;!Vec&lt;HpackHeader&gt;` |  |
| `maxBodyBytes` | `usize` |  |

**Returns:** `H2ApplicationRequestResult`

---

### <a id="checkedCreditSum"></a>`checkedCreditSum`

> 📄 `h2_session.vx` L111-114

```vex
fn checkedCreditSum(current: u32, increment: u32): Option<u32>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `current` | `u32` |  |
| `increment` | `u32` |  |

**Returns:** `Option&lt;u32&gt;`

---

### <a id="asyncBodyPipelineNext"></a>`asyncBodyPipelineNext` `🔓 export`

> 📄 `async_body.vx` L49-51

```vex
export fn asyncBodyPipelineNext(steps: Vec<AsyncBodyHandler>): AsyncBodyPipelineNext
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `steps` | `Vec&lt;AsyncBodyHandler&gt;` |  |

**Returns:** `AsyncBodyPipelineNext`

---

### <a id="bodyFramingError"></a>`bodyFramingError`

> 📄 `async_body.vx` L159-161

```vex
fn bodyFramingError(message: str): IoError
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `message` | `str` |  |

**Returns:** `IoError`

---

### <a id="asyncBodyTakeReusableTransport"></a>`asyncBodyTakeReusableTransport` `🔓 export`

> 📄 `async_body.vx` L261-278

```vex
export fn asyncBodyTakeReusableTransport(body: &AsyncRequestBody!): Option<AsyncBodyTransport>
```

Move a proven-complete stream and its exact pipeline suffix out together.

Failure leaves this body as the sole transport owner, so its ordinary Drop
path still closes exactly once.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `body` | `&amp;AsyncRequestBody!` |  |

**Returns:** `Option&lt;AsyncBodyTransport&gt;`

---

### <a id="protocolError"></a>`protocolError`

> 📄 `client.vx` L346-348

```vex
fn protocolError(message: str): IoError
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `message` | `str` |  |

**Returns:** `IoError`

---

### <a id="requestLimitError"></a>`requestLimitError`

> 📄 `client.vx` L350-352

```vex
fn requestLimitError(message: str): IoError
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `message` | `str` |  |

**Returns:** `IoError`

---

### <a id="headerNameIs"></a>`headerNameIs`

> 📄 `client.vx` L354-356

```vex
fn headerNameIs(name: str, expected: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `name` | `str` |  |
| `expected` | `str` |  |

**Returns:** `bool`

---

### <a id="validateContentDecoding"></a>`validateContentDecoding`

> 📄 `client.vx` L358-369

```vex
fn validateContentDecoding(decoding: &HttpContentDecoding): Result<(), IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `decoding` | `&amp;HttpContentDecoding` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="isOws"></a>`isOws`

> 📄 `client.vx` L371-371

```vex
fn isOws(valueByte: u8): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `valueByte` | `u8` |  |

**Returns:** `bool`

---

### <a id="appendContentEncodingValue"></a>`appendContentEncodingValue`

> 📄 `client.vx` L373-432

```vex
fn appendContentEncodingValue(value: str, formats: &Vec<CompressionFormat>!, maxLayers: usize): Result<(), IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |
| `formats` | `&amp;Vec&lt;CompressionFormat&gt;!` |  |
| `maxLayers` | `usize` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="contentEncodingFormats"></a>`contentEncodingFormats`

> 📄 `client.vx` L434-452

```vex
fn contentEncodingFormats(headers: &Headers, maxLayers: usize): Result<Vec<CompressionFormat>, IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `headers` | `&amp;Headers` |  |
| `maxLayers` | `usize` |  |

**Returns:** `Result&lt;Vec&lt;CompressionFormat&gt;, IoError&gt;`

---

### <a id="decodedString"></a>`decodedString`

> 📄 `client.vx` L454-461

```vex
fn decodedString(bytes: &Vec<u8>): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `bytes` | `&amp;Vec&lt;u8&gt;` |  |

**Returns:** `string`

---

### <a id="decodeCompressionFailure"></a>`decodeCompressionFailure`

> 📄 `client.vx` L463-476

```vex
fn decodeCompressionFailure(kind: CompressionErrorKind): IoError
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `kind` | `CompressionErrorKind` |  |

**Returns:** `IoError`

---

### <a id="decodeResponseContent"></a>`decodeResponseContent`

> 📄 `client.vx` L478-521

```vex
fn decodeResponseContent(response: &ClientResponse!, decoding: &HttpContentDecoding): Result<(), IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `response` | `&amp;ClientResponse!` |  |
| `decoding` | `&amp;HttpContentDecoding` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="validateClientConfig"></a>`validateClientConfig`

> 📄 `client.vx` L526-537

```vex
fn validateClientConfig(config: &HttpClientConfig): Result<(), IoError>
```

Validate static policy before a socket is opened. A zero limit is never an

undocumented "unbounded" mode, and the parser's fixed storage remains the
hard maximum for this HTTP/1 client.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `config` | `&amp;HttpClientConfig` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="validateRedirectPolicy"></a>`validateRedirectPolicy`

> 📄 `client.vx` L539-547

```vex
fn validateRedirectPolicy(redirectPolicy: &HttpRedirectPolicy): Result<(), IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `redirectPolicy` | `&amp;HttpRedirectPolicy` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="cloneApplicationHeaders"></a>`cloneApplicationHeaders`

> 📄 `client.vx` L549-557

```vex
fn cloneApplicationHeaders(headers: &Headers): Headers
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `headers` | `&amp;Headers` |  |

**Returns:** `Headers`

---

### <a id="cloneClientRequest"></a>`cloneClientRequest`

> 📄 `client.vx` L559-567

```vex
fn cloneClientRequest(request: &ClientRequest): ClientRequest
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `request` | `&amp;ClientRequest` |  |

**Returns:** `ClientRequest`

---

### <a id="headerCount"></a>`headerCount`

> 📄 `client.vx` L569-577

```vex
fn headerCount(headers: &Headers, name: str): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `headers` | `&amp;Headers` |  |
| `name` | `str` |  |

**Returns:** `usize`

---

### <a id="redirectStatus"></a>`redirectStatus`

> 📄 `client.vx` L579-582

```vex
fn redirectStatus(status: i32): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `status` | `i32` |  |

**Returns:** `bool`

---

### <a id="initialRequestUrl"></a>`initialRequestUrl`

> 📄 `client.vx` L584-598

```vex
fn initialRequestUrl(request: &ClientRequest): Result<URL, IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `request` | `&amp;ClientRequest` |  |

**Returns:** `Result&lt;URL, IoError&gt;`

---

### <a id="sameOrigin"></a>`sameOrigin`

> 📄 `client.vx` L600-604

```vex
fn sameOrigin(left: &URL, right: &URL): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `left` | `&amp;URL` |  |
| `right` | `&amp;URL` |  |

**Returns:** `bool`

---

### <a id="redirectRequestTarget"></a>`redirectRequestTarget`

> 📄 `client.vx` L606-614

```vex
fn redirectRequestTarget(target: &URL): string
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `target` | `&amp;URL` |  |

**Returns:** `string`

---

### <a id="removeRedirectBodyHeaders"></a>`removeRedirectBodyHeaders`

> 📄 `client.vx` L616-623

```vex
fn removeRedirectBodyHeaders(headers: &Headers!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `headers` | `&amp;Headers!` |  |

---

### <a id="removeCrossOriginCredentials"></a>`removeCrossOriginCredentials`

> 📄 `client.vx` L625-630

```vex
fn removeCrossOriginCredentials(headers: &Headers!)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `headers` | `&amp;Headers!` |  |

---

### <a id="prepareRedirect"></a>`prepareRedirect`

> 📄 `client.vx` L639-694

```vex
fn prepareRedirect(request: &ClientRequest, response: &ClientResponse, currentUrl: &URL, currentEndpoint: SocketAddr): Result<Option<RedirectStep>, IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `request` | `&amp;ClientRequest` |  |
| `response` | `&amp;ClientResponse` |  |
| `currentUrl` | `&amp;URL` |  |
| `currentEndpoint` | `SocketAddr` |  |

**Returns:** `Result&lt;Option&lt;RedirectStep&gt;, IoError&gt;`

---

### <a id="isSafeRequestTargetBytes"></a>`isSafeRequestTargetBytes`

> 📄 `client.vx` L696-707

```vex
fn isSafeRequestTargetBytes(value: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |

**Returns:** `bool`

---

### <a id="isRequestTarget"></a>`isRequestTarget`

> 📄 `client.vx` L712-721

```vex
fn isRequestTarget(method: str, value: str): bool
```

Validate the RFC 9112 request-target form selected by the method. This

client connects directly to an origin, so absolute-form belongs to a future
explicit proxy transport instead of being accepted accidentally.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `method` | `str` |  |
| `value` | `str` |  |

**Returns:** `bool`

---

### <a id="validateRequest"></a>`validateRequest`

> 📄 `client.vx` L723-762

```vex
fn validateRequest(request: &ClientRequest, config: &HttpClientConfig): Result<(), IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `request` | `&amp;ClientRequest` |  |
| `config` | `&amp;HttpClientConfig` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="reserveRequestBytes"></a>`reserveRequestBytes`

> 📄 `client.vx` L764-772

```vex
fn reserveRequestBytes(total: &usize!, add: usize, limit: usize): Result<(), IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `total` | `&amp;usize!` |  |
| `add` | `usize` |  |
| `limit` | `usize` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="encodeRequestHead"></a>`encodeRequestHead`

> 📄 `client.vx` L778-855

```vex
fn encodeRequestHead(request: &ClientRequest, config: &HttpClientConfig, output: &StringBuilder!, closeConnection: bool, bodyLength: usize): Result<(), IoError>
```

Encode the request line and complete header block for an exact body length.

Length accounting includes the body before allocation even though streamed
callers publish only this head. The encoder remains the sole owner of
Content-Length and connection framing.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `request` | `&amp;ClientRequest` |  |
| `config` | `&amp;HttpClientConfig` |  |
| `output` | `&amp;StringBuilder!` |  |
| `closeConnection` | `bool` |  |
| `bodyLength` | `usize` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="encodeRequest"></a>`encodeRequest`

> 📄 `client.vx` L858-872

```vex
fn encodeRequest(request: &ClientRequest, config: &HttpClientConfig, output: &StringBuilder!, closeConnection: bool): Result<(), IoError>
```

Encodes a complete buffered HTTP/1.1 request with a single owned buffer.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `request` | `&amp;ClientRequest` |  |
| `config` | `&amp;HttpClientConfig` |  |
| `output` | `&amp;StringBuilder!` |  |
| `closeConnection` | `bool` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="validateStreamingRequest"></a>`validateStreamingRequest`

> 📄 `client.vx` L874-881

```vex
fn validateStreamingRequest(request: &ClientRequest): Result<(), IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `request` | `&amp;ClientRequest` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="writeStreamingRequestBody"></a>`writeStreamingRequestBody` `⚡ async`

> 📄 `client.vx` L886-921

```vex
fn writeStreamingRequestBody(source: &R!, stream: &TcpStream, contentLength: usize, context: &Context): Result<(), IoError>where R: AsyncReader
```

Copy exactly one declared request body through a fixed scratch buffer.

Reads never over-consume the caller's source, every parked edge observes
the same Context, and premature EOF invalidates the enclosing transport.

**Type Parameters:**

- `R`

**Where:**

- `AsyncReader`: `AsyncReader`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `source` | `&amp;R!` |  |
| `stream` | `&amp;TcpStream` |  |
| `contentLength` | `usize` |  |
| `context` | `&amp;Context` |  |

**Returns:** `Result&lt;(), IoError&gt;where R: AsyncReader`

---

### <a id="validateResponseHeaders"></a>`validateResponseHeaders`

> 📄 `client.vx` L927-979

```vex
fn validateResponseHeaders(response: &ParsedResponse, config: &HttpClientConfig): Result<(), IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `response` | `&amp;ParsedResponse` |  |
| `config` | `&amp;HttpClientConfig` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="cloneHeaders"></a>`cloneHeaders`

> 📄 `client.vx` L981-990

```vex
fn cloneHeaders(headers: &ParserHeaders): Headers
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `headers` | `&amp;ParserHeaders` |  |

**Returns:** `Headers`

---

### <a id="bodyModeForResponse"></a>`bodyModeForResponse`

> 📄 `client.vx` L992-1004

```vex
fn bodyModeForResponse(response: &ParsedResponse, request: &ClientRequest): BodyMode
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `response` | `&amp;ParsedResponse` |  |
| `request` | `&amp;ClientRequest` |  |

**Returns:** `BodyMode`

---

### <a id="bodyByteLimitForResponse"></a>`bodyByteLimitForResponse`

> 📄 `client.vx` L1006-1011

```vex
fn bodyByteLimitForResponse(response: &ParsedResponse, config: &HttpClientConfig): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `response` | `&amp;ParsedResponse` |  |
| `config` | `&amp;HttpClientConfig` |  |

**Returns:** `usize`

---

### <a id="responseMustClose"></a>`responseMustClose`

> 📄 `client.vx` L1013-1024

```vex
fn responseMustClose(parsed: &ParsedResponse, reader: &BodyReader): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `parsed` | `&amp;ParsedResponse` |  |
| `reader` | `&amp;BodyReader` |  |

**Returns:** `bool`

---

### <a id="materializeResponse"></a>`materializeResponse`

> 📄 `client.vx` L1026-1039

```vex
fn materializeResponse(parsed: &ParsedResponse, body: &StringBuilder, connectionWillClose: bool): ClientResponse
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `parsed` | `&amp;ParsedResponse` |  |
| `body` | `&amp;StringBuilder` |  |
| `connectionWillClose` | `bool` |  |

**Returns:** `ClientResponse`

---

### <a id="materializeWorkspaceResponse"></a>`materializeWorkspaceResponse`

> 📄 `client.vx` L1044-1052

```vex
fn materializeWorkspaceResponse(parsed: &ParsedResponse, workspace: &ClientResponseWorkspace!, connectionWillClose: bool): ClientResponse
```

`ClientResponse` clones all data that escapes the decoder, allowing the

session-owned workspace to shed an exceptional body allocation before the
keep-alive connection becomes idle.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `parsed` | `&amp;ParsedResponse` |  |
| `workspace` | `&amp;ClientResponseWorkspace!` |  |
| `connectionWillClose` | `bool` |  |

**Returns:** `ClientResponse`

---

### <a id="materializeResponseHead"></a>`materializeResponseHead`

> 📄 `client.vx` L1054-1064

```vex
fn materializeResponseHead(parsed: &ParsedResponse, connectionWillClose: bool): ClientResponseHead
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `parsed` | `&amp;ParsedResponse` |  |
| `connectionWillClose` | `bool` |  |

**Returns:** `ClientResponseHead`

---

### <a id="consumeResponseBody"></a>`consumeResponseBody`

> 📄 `client.vx` L1074-1093

```vex
fn consumeResponseBody(reader: &BodyReader!, data: str, output: &StringBuilder!, maxBodyBytes: usize): Result<ResponseBodyStep, IoError>
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `reader` | `&amp;BodyReader!` |  |
| `data` | `str` |  |
| `output` | `&amp;StringBuilder!` |  |
| `maxBodyBytes` | `usize` |  |

**Returns:** `Result&lt;ResponseBodyStep, IoError&gt;`

---

### <a id="consumeResponseBodyInto"></a>`consumeResponseBodyInto` `⚡ async`

> 📄 `client.vx` L1098-1122

```vex
fn consumeResponseBodyInto(reader: &BodyReader!, data: str, scratch: &StringBuilder!, maxBodyBytes: usize, destination: &W, context: &Context): Result<ResponseBodyStep, IoError>where W: AsyncWriter
```

Decode one transport fragment into a bounded reusable scratch buffer, then

drain it through the caller's async writer. `BodyReader` keeps framing
state; this helper deliberately owns no response-sized storage.

**Type Parameters:**

- `W`

**Where:**

- `AsyncWriter`: `AsyncWriter`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `reader` | `&amp;BodyReader!` |  |
| `data` | `str` |  |
| `scratch` | `&amp;StringBuilder!` |  |
| `maxBodyBytes` | `usize` |  |
| `destination` | `&amp;W` |  |
| `context` | `&amp;Context` |  |

**Returns:** `Result&lt;ResponseBodyStep, IoError&gt;where W: AsyncWriter`

---

### <a id="retainBodySuffix"></a>`retainBodySuffix`

> 📄 `client.vx` L1127-1138

```vex
fn retainBodySuffix(source: str, consumed: usize, pending: &StringBuilder!): Result<(), IoError>
```

Retain only the exact transport suffix which `BodyReader` could not yet

classify. For chunked bodies this is bounded by decoder limits (chunk-size
line/trailer/CRLF); decoded payload is never copied into this buffer.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `source` | `str` |  |
| `consumed` | `usize` |  |
| `pending` | `&amp;StringBuilder!` |  |

**Returns:** `Result&lt;(), IoError&gt;`

---

### <a id="readResponseWithWorkspace"></a>`readResponseWithWorkspace` `⚡ async`

> 📄 `client.vx` L1145-1275

```vex
fn readResponseWithWorkspace(stream: &R, request: &ClientRequest, config: &HttpClientConfig, workspace: &ClientResponseWorkspace!, context: &Context): Result<ClientResponse, IoError>where R: AsyncReader
```

Reads exactly one final HTTP response. Interim 1xx responses are consumed

internally under an explicit count bound. A 101 upgrade or successful
CONNECT is rejected: this client owns and closes its TCP stream, so
returning either without a handoff API would falsely promise a usable
WebSocket/tunnel connection.

**Type Parameters:**

- `R`

**Where:**

- `AsyncReader`: `AsyncReader`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `stream` | `&amp;R` |  |
| `request` | `&amp;ClientRequest` |  |
| `config` | `&amp;HttpClientConfig` |  |
| `workspace` | `&amp;ClientResponseWorkspace!` |  |
| `context` | `&amp;Context` |  |

**Returns:** `Result&lt;ClientResponse, IoError&gt;where R: AsyncReader`

---

### <a id="readResponse"></a>`readResponse` `⚡ async`

> 📄 `client.vx` L1280-1286

```vex
fn readResponse(stream: &R, request: &ClientRequest, config: &HttpClientConfig, context: &Context): Result<ClientResponse, IoError>where R: AsyncReader
```

Stateless exchanges keep their workspace on the task frame. `HttpSession`

calls the workspace-aware primitive directly so its bounded allocations are
retained across safe sequential exchanges.

**Type Parameters:**

- `R`

**Where:**

- `AsyncReader`: `AsyncReader`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `stream` | `&amp;R` |  |
| `request` | `&amp;ClientRequest` |  |
| `config` | `&amp;HttpClientConfig` |  |
| `context` | `&amp;Context` |  |

**Returns:** `Result&lt;ClientResponse, IoError&gt;where R: AsyncReader`

---

### <a id="readResponseIntoWithWorkspace"></a>`readResponseIntoWithWorkspace` `⚡ async`

> 📄 `client.vx` L1293-1418

```vex
fn readResponseIntoWithWorkspace(stream: &R, request: &ClientRequest, config: &HttpClientConfig, destination: &W, workspace: &ClientResponseWorkspace!, context: &Context): Result<ClientResponseHead, IoError>where R: AsyncReader, W: AsyncWriter
```

Reads exactly one final HTTP response and streams decoded body bytes into

`destination`. Header storage remains bounded by `maxResponseHeaderBytes`;
body scratch is bounded by the fixed TCP read size and is reused for every
fragment. Like `send`, the caller supplies the cancellation/deadline
context used by every read and destination write.

**Type Parameters:**

- `R`
- `W`

**Where:**

- `AsyncReader`: `AsyncReader`
- `AsyncWriter`: `AsyncWriter`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `stream` | `&amp;R` |  |
| `request` | `&amp;ClientRequest` |  |
| `config` | `&amp;HttpClientConfig` |  |
| `destination` | `&amp;W` |  |
| `workspace` | `&amp;ClientResponseWorkspace!` |  |
| `context` | `&amp;Context` |  |

**Returns:** `Result&lt;ClientResponseHead, IoError&gt;where R: AsyncReader, W: AsyncWriter`

---

### <a id="readResponseInto"></a>`readResponseInto` `⚡ async`

> 📄 `client.vx` L1420-1428

```vex
fn readResponseInto(stream: &R, request: &ClientRequest, config: &HttpClientConfig, destination: &W, context: &Context): Result<ClientResponseHead, IoError>where R: AsyncReader, W: AsyncWriter
```

**Type Parameters:**

- `R`
- `W`

**Where:**

- `AsyncReader`: `AsyncReader`
- `AsyncWriter`: `AsyncWriter`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `stream` | `&amp;R` |  |
| `request` | `&amp;ClientRequest` |  |
| `config` | `&amp;HttpClientConfig` |  |
| `destination` | `&amp;W` |  |
| `context` | `&amp;Context` |  |

**Returns:** `Result&lt;ClientResponseHead, IoError&gt;where R: AsyncReader, W: AsyncWriter`

---

### <a id="sendFollowingWithResolver"></a>`sendFollowingWithResolver` `⚡ async`

> 📄 `client.vx` L1735-1801

```vex
fn sendFollowingWithResolver(client: &HttpClient, request: &ClientRequest, endpoint: SocketAddr, redirectPolicy: &HttpRedirectPolicy, resolver: &R, allowCrossOrigin: bool, context: &Context): Result<ClientResponse, IoError>where R: HttpRedirectResolver
```

**Type Parameters:**

- `R`

**Where:**

- `HttpRedirectResolver`: `HttpRedirectResolver`

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `client` | `&amp;HttpClient` |  |
| `request` | `&amp;ClientRequest` |  |
| `endpoint` | `SocketAddr` |  |
| `redirectPolicy` | `&amp;HttpRedirectPolicy` |  |
| `resolver` | `&amp;R` |  |
| `allowCrossOrigin` | `bool` |  |
| `context` | `&amp;Context` |  |

**Returns:** `Result&lt;ClientResponse, IoError&gt;where R: HttpRedirectResolver`

---

### <a id="parseRequestFromSocket"></a>`parseRequestFromSocket`

> 📄 `request.vx` L108-206

```vex
fn parseRequestFromSocket(fd: i64): Request
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |

**Returns:** `Request`

---

### <a id="parseRequest"></a>`parseRequest` `🔓 export`

> 📄 `request.vx` L209-211

```vex
export fn parseRequest(fd: i64): Request
```

Read and parse an HTTP request from a TCP socket fd.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |

**Returns:** `Request`

---

### <a id="respondText"></a>`respondText` `🔓 export`

> 📄 `response.vx` L183-186

```vex
export fn respondText(fd: i64, text: string)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `text` | `string` |  |

---

### <a id="respondJSON"></a>`respondJSON` `🔓 export`

> 📄 `response.vx` L188-191

```vex
export fn respondJSON(fd: i64, json: string)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `json` | `string` |  |

---

### <a id="respondError"></a>`respondError` `🔓 export`

> 📄 `response.vx` L193-197

```vex
export fn respondError(fd: i64, code: i32, message: string)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `code` | `i32` |  |
| `message` | `string` |  |

---

### <a id="respondRedirect"></a>`respondRedirect` `🔓 export`

> 📄 `response.vx` L199-204

```vex
export fn respondRedirect(fd: i64, location: string)
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `location` | `string` |  |

---

### <a id="writeDeadlineNs"></a>`writeDeadlineNs` `🔓 export`

> 📄 `response.vx` L214-223

```vex
export fn writeDeadlineNs(timeoutMs: i32): u64
```

Compute one saturating monotonic deadline for a complete response drain.

Internal streaming paths call this once and reuse it for every chunk; a
slow peer therefore cannot reset the timeout by accepting one chunk at a
time.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `timeoutMs` | `i32` |  |

**Returns:** `u64`

---

### <a id="sendAllUntil"></a>`sendAllUntil` `🔓 export`

> 📄 `response.vx` L229-257

```vex
export fn sendAllUntil(fd: i64, buf: Ptr<u8>, len: u64, deadlineNs: u64): i64
```

Drain bytes against a caller-owned absolute monotonic deadline.

This is the streaming primitive used by Fiber's multi-chunk paths. The
deadline applies to the entire response, not merely one `send()` retry.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `deadlineNs` | `u64` |  |

**Returns:** `i64`

---

### <a id="sendAllWithTimeout"></a>`sendAllWithTimeout` `🔓 export`

> 📄 `response.vx` L263-265

```vex
export fn sendAllWithTimeout(fd: i64, buf: Ptr<u8>, len: u64, timeoutMs: i32): i64
```

Drain a socket without allowing a permanently backpressured peer to pin the

worker forever. Non-positive timeouts use the production default rather
than disabling the safety bound. Returns -110 when the monotonic deadline
expires.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |
| `timeoutMs` | `i32` |  |

**Returns:** `i64`

---

### <a id="sendAll"></a>`sendAll` `🔓 export`

> 📄 `response.vx` L268-270

```vex
export fn sendAll(fd: i64, buf: Ptr<u8>, len: u64): i64
```

Drain using HTTP's production default write deadline.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `fd` | `i64` |  |
| `buf` | `Ptr&lt;u8&gt;` |  |
| `len` | `u64` |  |

**Returns:** `i64`

---

### <a id="appendChunkLength"></a>`appendChunkLength`

> 📄 `response.vx` L395-401

```vex
fn appendChunkLength(out: &StringBuilder!, length: u64)
```

Write one chunk length without constructing a temporary hexadecimal string.

The recursion is bounded to sixteen calls for a u64, and each digit is
written directly to StringBuilder's reusable storage.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;StringBuilder!` |  |
| `length` | `u64` |  |

---

### <a id="appendHttp1Chunk"></a>`appendHttp1Chunk` `🔓 export`

> 📄 `response.vx` L409-415

```vex
export fn appendHttp1Chunk(out: &StringBuilder!, data: str)
```

Append one non-empty HTTP/1 chunk to caller-owned reusable storage.

Empty data is a no-op; only `appendChunkTerminatorTo` is allowed to encode
the terminal zero-size chunk.
Append one non-empty HTTP/1 chunk without requiring a Response instance.
Dynamic writers use this free primitive so the hot path does not construct
any per-chunk response state.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;StringBuilder!` |  |
| `data` | `str` |  |

---

### <a id="appendHttp1ChunkTerminator"></a>`appendHttp1ChunkTerminator` `🔓 export`

> 📄 `response.vx` L423-425

```vex
export fn appendHttp1ChunkTerminator(out: &StringBuilder!)
```

Finish an HTTP/1 chunked body. This must be emitted exactly once after the

final non-empty chunk.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `out` | `&amp;StringBuilder!` |  |

---

### <a id="webSocketUpgradeResponse"></a>`webSocketUpgradeResponse` `🔓 export`

> 📄 `ws.vx` L127-129

```vex
export fn webSocketUpgradeResponse(req: &Request): Option<string>
```

Build the exact RFC 6455 `101 Switching Protocols` bytes after validation.

This is transport-neutral: blocking `WsConn` may write it immediately,
whereas Fiber queues it in its worker-owned non-blocking session.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&amp;Request` |  |

**Returns:** `Option&lt;string&gt;`

---

### <a id="webSocketUpgradeResponseWithProtocol"></a>`webSocketUpgradeResponseWithProtocol` `🔓 export`

> 📄 `ws.vx` L135-145

```vex
export fn webSocketUpgradeResponseWithProtocol(req: &Request, protocol: str): Option<string>
```

Build a validated RFC 6455 upgrade response selecting one client-offered

subprotocol. An empty selection preserves the ordinary extension-free
handshake. A non-empty value must be one exact, case-sensitive HTTP token
from the request; a server cannot invent or rewrite a protocol name.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&amp;Request` |  |
| `protocol` | `str` |  |

**Returns:** `Option&lt;string&gt;`

---

### <a id="webSocketUpgradeResponseFromValidatedKey"></a>`webSocketUpgradeResponseFromValidatedKey` `🔓 export`

> 📄 `ws.vx` L152-190

```vex
export fn webSocketUpgradeResponseFromValidatedKey(ws_key: str, protocol: str): Option<string>
```

Build the opening response from the small capability captured at the

validated HTTP/1 -&gt; WebSocket boundary. Fiber uses this after reclaiming
request-local arena storage, so no borrowed Request/header view escapes.
The key is still decoded here: misuse fails closed even though the caller
has already performed the complete RFC 6455 request validation.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `ws_key` | `str` |  |
| `protocol` | `str` |  |

**Returns:** `Option&lt;string&gt;`

---

### <a id="isValidUtf8"></a>`isValidUtf8`

> 📄 `ws.vx` L280-291

```vex
fn isValidUtf8(value: str): bool
```

RFC 6455 text and close-reason fields are UTF-8.  `decodeScalar` is the

canonical bounded decoder used by the Unicode package; its one-byte
replacement result represents malformed input, whereas a genuine U+FFFD
occupies three encoded bytes.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |

**Returns:** `bool`

---

### <a id="isValidCloseCode"></a>`isValidCloseCode`

> 📄 `ws.vx` L293-296

```vex
fn isValidCloseCode(code: u16): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `code` | `u16` |  |

**Returns:** `bool`

---

### <a id="isValidClosePayload"></a>`isValidClosePayload`

> 📄 `ws.vx` L298-304

```vex
fn isValidClosePayload(data: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |

**Returns:** `bool`

---

### <a id="isWebSocketUpgrade"></a>`isWebSocketUpgrade` `🔓 export`

> 📄 `ws.vx` L412-448

```vex
export fn isWebSocketUpgrade(req: &Request): bool
```

Check if a request is a WebSocket upgrade request.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&amp;Request` |  |

**Returns:** `bool`

---

### <a id="webSocketProtocolOffered"></a>`webSocketProtocolOffered` `🔓 export`

> 📄 `ws.vx` L453-478

```vex
export fn webSocketProtocolOffered(req: &Request, protocol: str): bool
```

Test whether the validated opening request offered one exact subprotocol.

RFC 6455 subprotocol identifiers are case-sensitive; HTTP header-name
matching remains case-insensitive.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&amp;Request` |  |
| `protocol` | `str` |  |

**Returns:** `bool`

---

### <a id="webSocketProtocolOccurrences"></a>`webSocketProtocolOccurrences`

> 📄 `ws.vx` L480-507

```vex
fn webSocketProtocolOccurrences(req: &Request, protocol: str): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&amp;Request` |  |
| `protocol` | `str` |  |

**Returns:** `usize`

---

### <a id="requestWebSocketProtocolsValid"></a>`requestWebSocketProtocolsValid`

> 📄 `ws.vx` L512-551

```vex
fn requestWebSocketProtocolsValid(req: &Request): bool
```

Validate the complete client subprotocol offer without allocating. Empty

elements, non-token bytes, duplicates, and lists beyond the hard count
bound reject the opening handshake before HTTP ownership is transferred.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&amp;Request` |  |

**Returns:** `bool`

---

### <a id="requestHeaderCount"></a>`requestHeaderCount`

> 📄 `ws.vx` L553-563

```vex
fn requestHeaderCount(req: &Request, name: str): usize
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&amp;Request` |  |
| `name` | `str` |  |

**Returns:** `usize`

---

### <a id="hasRequestHeaderToken"></a>`hasRequestHeaderToken`

> 📄 `ws.vx` L565-575

```vex
fn hasRequestHeaderToken(req: &Request, name: str, token: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `req` | `&amp;Request` |  |
| `name` | `str` |  |
| `token` | `str` |  |

**Returns:** `bool`

---

### <a id="containsHeaderToken"></a>`containsHeaderToken`

> 📄 `ws.vx` L577-594

```vex
fn containsHeaderToken(value: str, token: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |
| `token` | `str` |  |

**Returns:** `bool`

---

### <a id="wsSessionQueueUpgradeResponse"></a>`wsSessionQueueUpgradeResponse` `🔓 export`

> 📄 `session.vx` L142-146

```vex
export fn wsSessionQueueUpgradeResponse(session: &WsSession!, req: &Request): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `session` | `&amp;WsSession!` |  |
| `req` | `&amp;Request` |  |

**Returns:** `bool`

---

### <a id="wsSessionQueueValidatedUpgrade"></a>`wsSessionQueueValidatedUpgrade` `🔓 export`

> 📄 `session.vx` L148-152

```vex
export fn wsSessionQueueValidatedUpgrade(session: &WsSession!, key: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `session` | `&amp;WsSession!` |  |
| `key` | `str` |  |

**Returns:** `bool`

---

### <a id="isValidUtf8"></a>`isValidUtf8`

> 📄 `session.vx` L234-245

```vex
fn isValidUtf8(value: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` |  |

**Returns:** `bool`

---

### <a id="isValidCloseCode"></a>`isValidCloseCode`

> 📄 `session.vx` L247-250

```vex
fn isValidCloseCode(code: u16): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `code` | `u16` |  |

**Returns:** `bool`

---

### <a id="isValidClosePayload"></a>`isValidClosePayload`

> 📄 `session.vx` L252-258

```vex
fn isValidClosePayload(data: str): bool
```

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `str` |  |

**Returns:** `bool`

---

---

*Generated by vex-doc v2.0 • 2026-08-27*
