
			    "use strict";

			function t(t) {
			    return t && t.__esModule ? t : {
			        default: t
			    }
			}
			Object.defineProperty(exports, "__esModule", {
			    value: !0
			});
			var e = t(require("api.js")),
			    a = t(require("config.js"));
			exports.
			default = {
			    getRoomStaticInfo: function(t) {
			        var r = t.room_id,
			            n = t.source,
			            o = t.room_appid;
			        return new Promise(function(t, i) {
			            var s = {
			                action: "get_static_info",
			                room_id: r,
			                content: "",
			                plugin_appid: "pusher" === n ? o : a.
			                default.PLUGIN_APPID,
			                room_appid: o,
			                timestamp: Date.now()
			            };
			            e.
			            default.liveRoutePromise(s).then(function(e) {
			                if (e && e.respData && e.respData.data) {
			                    var r = JSON.parse(e.respData.data);
			                    t(r)
			                } else i({
			                    inner_ret: a.
			                    default.OPERATEWXDATA_CODE.NO_CONTENT,
			                    errmsg: "no res.respData.data",
			                    response: e
			                })
			            }).
			            catch (function(t) {
			                i(t)
			            })
			        })
			    },
			    getRoomDynamicInfo: function(t) {
			        var r = t.room_id,
			            n = t.content,
			            o = t.source,
			            i = t.room_appid;
			        return new Promise(function(t, s) {
			            var p = {
			                action: "get_message",
			                room_id: r,
			                content: JSON.stringify(n),
			                plugin_appid: "pusher" === o ? i : a.
			                default.PLUGIN_APPID,
			                room_appid: i,
			                timestamp: Date.now()
			            };
			            e.
			            default.liveRoutePromise(p).then(function(e) {
			                if (e && e.respData && e.respData.data) {
			                    var r = JSON.parse(e.respData.data);
			                    t(r)
			                } else s({
			                    inner_ret: a.
			                    default.OPERATEWXDATA_CODE.NO_CONTENT,
			                    errmsg: "no res.respData.data",
			                    response: e
			                })
			            }).
			            catch (function(t) {
			                s(t)
			            })
			        })
			    },
			    getRoomEndInfo: function(t) {
			        var r = t.room_id,
			            n = t.source,
			            o = t.room_appid;
			        return new Promise(function(t, i) {
			            var s = {
			                action: "get_end_info",
			                room_id: r,
			                content: "",
			                plugin_appid: "pusher" === n ? o : a.
			                default.PLUGIN_APPID,
			                room_appid: o,
			                timestamp: Date.now()
			            };
			            e.
			            default.liveRoutePromise(s).then(function(e) {
			                if (e && e.respData && e.respData.data) {
			                    var r = JSON.parse(e.respData.data);
			                    t(r)
			                } else i({
			                    inner_ret: a.
			                    default.OPERATEWXDATA_CODE.NO_CONTENT,
			                    errmsg: "no res.respData.data",
			                    response: e
			                })
			            }).
			            catch (function(t) {
			                i(t)
			            })
			        })
			    },
			    getLiveStatus: function(t) {
			        var r = t.room_id;
			        return new Promise(function(t, n) {
			            var o = {
			                action: "get_live_info",
			                room_id: r,
			                content: "",
			                plugin_appid: a.
			                default.PLUGIN_APPID,
			                timestamp: Date.now()
			            };
			            e.
			            default.liveRoutePromise(o).then(function(e) {
			                if (e && e.respData && e.respData.data) {
			                    var r = JSON.parse(e.respData.data);
			                    t(r)
			                } else n({
			                    inner_ret: a.
			                    default.OPERATEWXDATA_CODE.NO_CONTENT,
			                    errmsg: "no res.respData.data",
			                    response: e
			                })
			            }).
			            catch (function(t) {
			                n(t)
			            })
			        })
			    },
			    startLottery: function(t) {
			        var r = t.room_id,
			            n = t.content,
			            o = t.room_appid;
			        return new Promise(function(t, i) {
			            var s = {
			                action: "start_lottery",
			                room_id: r,
			                content: n,
			                plugin_appid: o,
			                room_appid: o,
			                timestamp: Date.now()
			            };
			            e.
			            default.liveRoutePromise(s).then(function(e) {
			                e && e.respData && e.respData.data ? t(e) : i({
			                    inner_ret: a.
			                    default.OPERATEWXDATA_CODE.NO_CONTENT,
			                    errmsg: "no res.respData.data",
			                    response: e
			                })
			            }).
			            catch (function(t) {
			                i(t)
			            })
			        })
			    },
			    endLottery: function(t) {
			        var r = t.room_id,
			            n = t.content,
			            o = t.room_appid;
			        return new Promise(function(t, i) {
			            var s = {
			                action: "end_lottery",
			                room_id: r,
			                content: n,
			                plugin_appid: o,
			                room_appid: o,
			                timestamp: Date.now()
			            };
			            e.
			            default.liveRoutePromise(s).then(function(e) {
			                e && e.respData && e.respData.data ? t(e) : i({
			                    inner_ret: a.
			                    default.OPERATEWXDATA_CODE.NO_CONTENT,
			                    errmsg: "no res.respData.data",
			                    response: e
			                })
			            }).
			            catch (function(t) {
			                i(t)
			            })
			        })
			    },
			    cancelLottery: function(t) {
			        var r = t.room_id,
			            n = t.content,
			            o = t.room_appid;
			        return new Promise(function(t, i) {
			            var s = {
			                action: "cancel_lottery",
			                room_id: r,
			                content: n,
			                plugin_appid: o,
			                room_appid: o,
			                timestamp: Date.now()
			            };
			            e.
			            default.liveRoutePromise(s).then(function(e) {
			                e && e.respData && e.respData.data ? t(e) : i({
			                    inner_ret: a.
			                    default.OPERATEWXDATA_CODE.NO_CONTENT,
			                    errmsg: "no res.respData.data",
			                    response: e
			                })
			            }).
			            catch (function(t) {
			                i(t)
			            })
			        })
			    },
			    getLotteryById: function(t) {
			        var r = t.room_id,
			            n = t.content,
			            o = t.source,
			            i = t.room_appid;
			        return new Promise(function(t, s) {
			            var p = {
			                action: "get_lottery_by_id",
			                room_id: r,
			                content: n,
			                plugin_appid: "pusher" === o ? i : a.
			                default.PLUGIN_APPID,
			                room_appid: i,
			                timestamp: Date.now()
			            };
			            e.
			            default.liveRoutePromise(p).then(function(e) {
			                if (e && e.respData && e.respData.data) {
			                    var r = JSON.parse(e.respData.data);
			                    t(r)
			                } else s({
			                    inner_ret: a.
			                    default.OPERATEWXDATA_CODE.NO_CONTENT,
			                    errmsg: "no res.respData.data",
			                    response: e
			                })
			            }).
			            catch (function(t) {
			                s(t)
			            })
			        })
			    },
			    getLotteryResult: function(t) {
			        var r = t.room_id,
			            n = t.content,
			            o = t.source,
			            i = t.room_appid;
			        return new Promise(function(t, s) {
			            var p = {
			                action: "get_lottery_result",
			                room_id: r,
			                content: n,
			                plugin_appid: "pusher" === o ? i : a.
			                default.PLUGIN_APPID,
			                room_appid: i,
			                timestamp: Date.now()
			            };
			            e.
			            default.liveRoutePromise(p).then(function(e) {
			                if (e && e.respData && e.respData.data) {
			                    var r = JSON.parse(e.respData.data);
			                    t(r)
			                } else s({
			                    inner_ret: a.
			                    default.OPERATEWXDATA_CODE.NO_CONTENT,
			                    errmsg: "no res.respData.data",
			                    response: e
			                })
			            }).
			            catch (function(t) {
			                s(t)
			            })
			        })
			    },
			    getParticipated: function(t) {
			        var r = t.room_id,
			            n = t.content;
			        return new Promise(function(t, o) {
			            var i = {
			                action: "ask_participated",
			                room_id: r,
			                content: n,
			                plugin_appid: a.
			                default.PLUGIN_APPID,
			                timestamp: Date.now()
			            };
			            e.
			            default.liveRoutePromise(i).then(function(e) {
			                e && e.respData && e.respData.data ? t(e.respData.data) : o({
			                    inner_ret: a.
			                    default.OPERATEWXDATA_CODE.NO_CONTENT,
			                    errmsg: "no res.respData.data",
			                    response: e
			                })
			            }).
			            catch (function(t) {
			                o(t)
			            })
			        })
			    },
			    fillLotteryAddress: function(t) {
			        var r = t.room_id,
			            n = t.content;
			        return new Promise(function(t, o) {
			            var i = {
			                action: "fill_lottery_address",
			                room_id: r,
			                content: JSON.stringify(n),
			                plugin_appid: a.
			                default.PLUGIN_APPID,
			                timestamp: Date.now()
			            };
			            e.
			            default.liveRoutePromise(i).then(function(e) {
			                e && e.respData && e.respData.data ? t(e.respData.data) : o({
			                    inner_ret: a.
			                    default.OPERATEWXDATA_CODE.NO_CONTENT,
			                    errmsg: "no res.respData.data",
			                    response: e
			                })
			            }).
			            catch (function(t) {
			                o(t)
			            })
			        })
			    },
			    mmdataReport: function(t) {
			        var r = t.room_id,
			            n = t.content,
			            o = t.source,
			            i = t.room_appid;
			        return new Promise(function(t, s) {
			            var p = {
			                action: "report_data",
			                room_id: r,
			                content: JSON.stringify(n),
			                plugin_appid: "pusher" === o ? i : a.
			                default.PLUGIN_APPID,
			                room_appid: i,
			                timestamp: Date.now()
			            };
			            e.
			            default.liveRoutePromise(p).then(function(e) {
			                t(e)
			            }).
			            catch (function(t) {
			                s(t)
			            })
			        })
			    }
			};