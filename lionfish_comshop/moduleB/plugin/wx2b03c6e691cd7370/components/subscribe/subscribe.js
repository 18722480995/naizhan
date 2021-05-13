
			    "use strict";

			function t(t) {
			    return t && t.__esModule ? t : {
			        default: t
			    }
			}
			var e = t(require("../../wxlive-components/logic/api.js")),
			    a = t(require("../../wxlive-components/logic/config.js")),
			    i = t(require("../../wxlive-components/logic/request.js")),
			    o = t(require("../../utils/wxapi.js")),
			    s = null,
			    n = !1;
			Component({
			    properties: {
			        roomId: {
			            type: Number
			        }
			    },
			    data: {
			        showSubscribe: !0,
			        roomStaticInfo: {
			            end_time: ""
			        }
			    },
			    detached: function() {
			        clearInterval(s)
			    },
			    pageLifetimes: {
			        show: function() {
			            this.getRoomStaticInfo()
			        },
			        hide: function() {
			            clearInterval(s)
			        }
			    },
			    methods: {
			        getRoomStaticInfo: function() {
			            var t = this;
			            i.
			            default.getRoomStaticInfo({
			                room_id: t.data.roomId
			            }).then(function(e) {
			                t.data.roomStaticInfo = e, t.setData({
			                    isSubscribe: !! +e.is_subscribe
			                }), t.getLiveStatus()
			            }).
			            catch (function(e) {
			                t.setData({
			                    showSubscribe: !1
			                })
			            })
			        },
			        getLiveStatus: function() {
			            var t = this;
			            i.
			            default.getLiveStatus({
			                room_id: t.data.roomId
			            }).then(function(e) {
			                var i = +e.live_status;
			                e.timestamp > t.data.roomStaticInfo.end_time && i === a.
			                default.LIVE_STATUS_CODE.LIVE_STATUS_NOT_START ? (t.setData({
			                    showSubscribe: !1
			                }), clearInterval(s)) : (t.setData({
			                    showSubscribe: i === a.
			                    default.LIVE_STATUS_CODE.LIVE_STATUS_NOT_START
			                }), clearInterval(s), s = setInterval(function() {
			                    t.getLiveStatus()
			                }, 6e4))
			            }).
			            catch (function(e) {
			                t.setData({
			                    showSubscribe: !1
			                }), clearInterval(s), s = setInterval(function() {
			                    t.getLiveStatus()
			                }, 6e4)
			            })
			        },
			        clickSubscribe: function() {
			            if (!n) {
			                n = !0;
			                var t = this,
			                    i = t.data.roomId,
			                    s = t.data.isSubscribe;
			                if (s) {
			                    var u = {
			                        action: "unsubscribe",
			                        room_id: i,
			                        content: "",
			                        plugin_appid: a.
			                        default.PLUGIN_APPID,
			                        timestamp: Date.now()
			                    };
			                    e.
			                    default.liveRoutePromise(u).then(function() {
			                        t.setData({
			                            isSubscribe: !s
			                        }), n = !1, o.
			                        default.showToast("取消成功")
			                    }).
			                    catch (function() {
			                        n = !1, o.
			                        default.showToast("取消失败")
			                    })
			                } else {
			                    var c = {
			                        action: "subscribe",
			                        room_id: i,
			                        content: "",
			                        plugin_appid: a.
			                        default.PLUGIN_APPID,
			                        timestamp: Date.now()
			                    };
			                    e.
			                    default.liveRoutePromise(c).then(function(e) {
			                        t.setData({
			                            isSubscribe: !s
			                        }), n = !1, o.
			                        default.showToast("订阅成功")
			                    }).
			                    catch (function() {
			                        n = !1, o.
			                        default.showToast("订阅失败")
			                    })
			                }
			            }
			        }
			    }
			});