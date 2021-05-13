
			    "use strict";
			Object.defineProperty(exports, "__esModule", {
			    value: !0
			});
			var _ = {
			    SYSTEM_ERROR: -1,
			    TIMEOUT: -2,
			    NO_CONCENT: -3
			}, E = {
			    ROOM_FLAG_NORMAL: 1,
			    ROOM_FLAG_BAN_COMMENT: 2
			}, T = {
			    LIVE_STATUS_LIVE: 101,
			    LIVE_STATUS_NOT_START: 102,
			    LIVE_STATUS_END: 103,
			    LIVE_STATUS_FORBID: 104,
			    LIVE_STATUS_PAUSE: 105,
			    LIVE_STATUS_ERROR: 106
			}, O = {
			    RTMP: 1,
			    HTTP_FLV: 2,
			    HTTPS_FLV: 3,
			    HTTP_HLS: 4,
			    HTTPS_HLS: 5
			}, R = {
			    ROOM_MM_ERR_PEOPLE_LIMIT: 11009,
			    ROOM_MM_ERR_DELETE: 11006,
			    ROOM_MM_ERR_BIZ_INVALID_SCOPE: -12001,
			    ROOM_MM_ERR_ROOMID: 11001,
			    ROOM_MM_ERR_END_LOTTERY: 22007,
			    ROOM_MM_ERR_EXPIRE: -9999901
			}, I = {
			    SHOW_LIMIT_NUMBER: 100,
			    SHOW_NEWMSG_LIMIT_NUMBER: 300,
			    SHOW_NEWMSG_NUMBER: 99,
			    FRESH_TIME: 700,
			    SHOW_SECOND_NUMBER: 20,
			    PUSH_COMMENT_HIT_FREQ_LIMIT: 20
			}, S = {
			    ERR_COMMENT_PUSH: 13e3,
			    ERR_COMMENT_HIT_KEYWORD_INTERCEPT: 13001,
			    ERR_COMMENT_HIT_FREQ_LIMIT: 13002
			}, M = {
			    LOADING: "loading",
			    NORMAL: "normal",
			    ERROR: "error"
			}, L = {
			    PRICE_TYPE_FIXED_PRICE: 1,
			    PRICE_TYPE_RANGE: 2,
			    PRICE_TYPE_DISCOUNT: 3
			}, A = {
			    GOODS_FLAG_NORMAL: 1,
			    GOODS_FLAG_DELETE_BY_USER: 2,
			    GOODS_FLAG_DELETE_BY_AUDIT: 3
			}, N = {
			    LOTTERY_NOT_PUSH: 1,
			    LOTTERY_PUSHED: 2,
			    LOTTERY_RUNNING: 3,
			    LOTTERY_FINISHED: 4,
			    LOTTERY_ERROR: 5
			}, P = {
			    LOTTERY_COMMENT: 0,
			    LOTTERY_LIKE: 1
			}, D = {
			    LOTTERY_OBTAIN_ADDRESS: 0,
			    LOTTERY_OBTAIN: 1
			}, U = {
			    SHARE: 1,
			    SUBSCRIBE: 2,
			    PREVIEW: 3,
			    SEARCH: 4,
			    WECHAT_PRO: 7,
			    ADDRESS: 8
			}, C = {
			    VIDEO_BITRATE: 101005,
			    AUDIO_BITRATE: 101006,
			    VIDEO_FPS: 101007,
			    NET_SPEED: 101008,
			    NET_JITTER: 101009,
			    HAS_NET_JITTER: 101011,
			    VIDEO_CATON: 101012,
			    SLOW_SPEED: 101013,
			    SETDATA_TIME: 102010,
			    LOTTIE_LIKE_ANIMATION_FPS: 102014,
			    CANVAS_LIKE_ANIMATION_FPS: 102015,
			    WXS_LIKE_ANIMATION_FPS: 102016
			};
			exports.
			default = {
			    PLUGIN_APPID: "wx2b03c6e691cd7370",
			    LIVE_ROOM_FLAG: E,
			    LIVE_STATUS_CODE: T,
			    PLAY_URL_TYPE: O,
			    ROOM_ERROR_CODE: R,
			    COUNT_DOWN_TIME: 1e3,
			    LONG_POLLING_TIME: 5e3,
			    REQUEST_DEFAULT_TIMEOUT: 1e4,
			    COMMENT: I,
			    COMMENT_ERROR_CODE: S,
			    STORE_LIST_STATUS: M,
			    GOODS_PRICE_TYPE: L,
			    GOODS_FLAG: A,
			    LOTTERY_STATUS: N,
			    LOTTERY_PARTIPATE_TYPE: P,
			    LOTTERY_OBTAIN_TYPE: D,
			    SCENE_TYPE: U,
			    TEST_SPEED_REPORT_ID: C,
			    OPERATEWXDATA_CODE: _
			};