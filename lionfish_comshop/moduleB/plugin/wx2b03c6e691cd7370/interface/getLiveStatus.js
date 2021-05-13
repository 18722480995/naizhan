
			    "use strict";

			function e(e) {
			    return e && e.__esModule ? e : {
			        default: e
			    }
			}
			var t = e(require("../wxlive-components/logic/config.js")),
			    r = e(require("../wxlive-components/logic/request.js")),
			    i = 6e4,
			    n = wx.getAccountInfoSync().miniProgram.appId || "";
			module.exports = {
			    getLiveStatus: function(e) {
			        return new Promise(function(o, u) {
			            if (e) {
			                var s = e.room_id,
			                    c = +wx.getStorageSync("prevRequestTime-" + n + "-" + s) || 0,
			                    a = Date.now();
			                a - c >= i && (wx.setStorageSync("prevRequestTime-" + n + "-" + s, a), r.
			                default.getLiveStatus({
			                    room_id: s
			                }).then(function(e) {
			                    o({
			                        liveStatus: +e.live_status
			                    })
			                }).
			                catch (function(e) {
			                    if (2e4 === (e.err_code && +e.err_code || +e.errMsg.split(":")[2])) u("传入的房间id有误");
			                    else {
			                        var r = +e.inner_ret || null;
			                        u(r === t.
			                        default.OPERATEWXDATA_CODE.TIMEOUT ? "网络超时" : r === t.
			                        default.OPERATEWXDATA_CODE.NO_CONCENT ? "获取数据失败" : "系统异常")
			                    }
			                }))
			            } else u("传入的房间id有误")
			        })
			    }
			};