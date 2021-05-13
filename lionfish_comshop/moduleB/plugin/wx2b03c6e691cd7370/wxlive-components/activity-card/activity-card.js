
			    "use strict";
			var e = function(e) {
			    return e && e.__esModule ? e : {
			        default: e
			    }
			}(require("../logic/live-logic.js")),
			    a = "isLivePlayerPluginAuthorize-" + (wx.getAccountInfoSync().miniProgram.appId || "");
			Component({
			    properties: {
			        type: {
			            type: String,
			            value: ""
			        },
			        openid: {
			            type: String,
			            value: ""
			        },
			        systemTriggerBarrageList: {
			            type: Array,
			            value: []
			        }
			    },
			    data: {
			        fadeIn: !1,
			        allSystemTriggerBarrageList: [],
			        systemTriggerBarrageItem: {},
			        systemTriggerBarrageAnimationTime: 2e3,
			        systemTriggerBarrageFadeInInterval: "",
			        systemTriggerBarrageFadeOutInterval: ""
			    },
			    observers: {
			        systemTriggerBarrageList: function(e) {
			            var a = this,
			                r = [],
			                t = [],
			                g = this.data.allSystemTriggerBarrageList.concat(e || []);
			            g.forEach(function(e) {
			                "store" === e.type && r.push(e)
			            }), g.forEach(function(e) {
			                "store" !== e.type && r.push(e)
			            }), r.forEach(function(e) {
			                e.openid === a.data.openid && (e.myself = !0, t.push(e))
			            }), r.forEach(function(e) {
			                e.myself || t.push(e)
			            }), this.data.allSystemTriggerBarrageList = t
			        }
			    },
			    ready: function() {
			        this.updateSystemTriggerBarrage()
			    },
			    detached: function() {
			        clearInterval(this.data.systemTriggerBarrageFadeInInterval), clearInterval(this.data.systemTriggerBarrageFadeOutInterval)
			    },
			    methods: {
			        updateSystemTriggerBarrage: function() {
			            var r = this;
			            clearInterval(r.data.systemTriggerBarrageFadeInInterval), r.data.systemTriggerBarrageFadeInInterval = setInterval(function() {
			                var t = r.data.allSystemTriggerBarrageList;
			                if (t.length > 0) {
			                    var g = t[0],
			                        i = g.nickname,
			                        s = g.openid;
			                    wx.getStorageSync(a) || s !== r.data.openid ? (i && (i = "store" === g.type ? e.
			                    default.encryptNickname(i) : i), g.nickname = i, r.setData({
			                        fadeIn: !0,
			                        systemTriggerBarrageItem: g
			                    }), t.shift(), r.data.allSystemTriggerBarrageList = t, clearInterval(r.data.systemTriggerBarrageFadeOutInterval), r.data.systemTriggerBarrageFadeOutInterval = setInterval(function() {
			                        r.setData({
			                            fadeIn: !1
			                        }, function() {
			                            r.updateSystemTriggerBarrage()
			                        })
			                    }, r.data.systemTriggerBarrageAnimationTime)) : (t.shift(), r.updateSystemTriggerBarrage())
			                } else r.updateSystemTriggerBarrage()
			            }, r.data.systemTriggerBarrageAnimationTime)
			        }
			    }
			});