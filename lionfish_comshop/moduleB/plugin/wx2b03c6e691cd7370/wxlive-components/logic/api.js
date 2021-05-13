
			    "use strict";

			function e(e) {
			    var r = function e(r, n, i) {
			        var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 3;
			        wx.operateWXData({
			            apiName: "LiveRoute",
			            reqData: i,
			            success: function(e) {
			                r(e)
			            },
			            fail: function(u) {
			                if (o -= 1, "get_message" !== i.action && o > 0) setTimeout(function() {
			                    e(r, n, i, o)
			                }, 1e3);
			                else {
			                    if (u) {
			                        if (u.errMsg && !u.err_code) {
			                            var s = u.errMsg,
			                                a = t.
			                            default.ROOM_ERROR_CODE;
			                            Object.keys(a).forEach(function(e) {
			                                var r = a[e];
			                                s.indexOf(r) > 0 && (u.err_code = r)
			                            })
			                        }
			                    } else u = {
			                        errMsg: "response is null",
			                        err_code: -8888888,
			                        inner_ret: -8888888
			                    };
			                    n(u)
			                }
			            }
			        })
			    };
			    return new Promise(function(t, n) {
			        r(t, n, e)
			    })
			}
			function r() {
			    return new Promise(function(e) {
			        setTimeout(function() {
			            return e({
			                inner_ret: t.
			                default.OPERATEWXDATA_CODE.SYSTEM_ERROR,
			                errmsg: "wx.operateWXData timeout"
			            })
			        }, t.
			        default.REQUEST_DEFAULT_TIMEOUT)
			    })
			}
			Object.defineProperty(exports, "__esModule", {
			    value: !0
			});
			var t = function(e) {
			    return e && e.__esModule ? e : {
			        default: e
			    }
			}(require("config.js"));
			exports.
			default = {
			    liveRoutePromise: function(t) {
			        return Promise.race([e(t), r()])
			    }
			};