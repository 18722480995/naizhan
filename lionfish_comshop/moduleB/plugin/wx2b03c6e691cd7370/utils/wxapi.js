
			    "use strict";

			function n() {
			    return wx.getSystemInfoSync() || {}
			}
			module.exports = {
			    showToast: function(n) {
			        wx.showToast({
			            title: n,
			            icon: "none",
			            duration: 2e3
			        })
			    },
			    navigateBack: function() {
			        wx.navigateBack({
			            delta: 1
			        })
			    },
			    getSystemInfoSync: n,
			    checkWeChatVersion: function() {
			        var o = n(),
			            t = o.platform,
			            e = o.version,
			            i = void 0 === e ? "" : e;
			        i = i.split("."), ("android" === t || "ios" === t) && +("" + i[0] + i[1] + i[2]) < 707 || "windows" === t && +("" + i[0] + i[1] + i[2]) < 271 ? wx.showModal({
			            title: "建议升级",
			            content: "由于微信版本过低，只能观看直播",
			            showCancel: !1,
			            confirmText: "我知道了"
			        }) : "android" !== t && "ios" !== t && "windows" !== t && wx.showModal({
			            title: "",
			            content: "目前只有Android/iOS/Windows等平台支持观看直播，其他平台暂不支持",
			            showCancel: !1,
			            confirmText: "我知道了"
			        })
			    },
			    pingDomain: function(n) {
			        return new Promise(function(o, t) {
			            var e = n.split("/");
			            e = e[2] ? e[0] + "//" + e[2] : "", wx.request({
			                url: e,
			                success: function(n) {
			                    o(n)
			                },
			                fail: function(n) {
			                    t(n)
			                }
			            })
			        })
			    },
			    authorize: function() {
			        return new Promise(function(n, o) {
			            wx.getNativeUserInfo && "function" == typeof wx.getNativeUserInfo ? wx.getNativeUserInfo({
			                success: function(o) {
			                    n(o)
			                },
			                fail: function(n) {
			                    o(n)
			                }
			            }) : (wx.showModal({
			                title: "建议升级",
			                content: "由于微信版本过低，无法打开授权弹框",
			                showCancel: !1,
			                confirmText: "我知道了"
			            }), o({
			                errMsg: "not support"
			            }))
			        })
			    },
			    chooseAddressForPlugin: function() {
			        return new Promise(function(n, o) {
			            wx.chooseAddressForPlugin && "function" == typeof wx.chooseAddressForPlugin ? wx.chooseAddressForPlugin({
			                success: function(o) {
			                    n(o)
			                },
			                fail: function(n) {
			                    o(n)
			                }
			            }) : (wx.showModal({
			                title: "建议升级",
			                content: "由于微信版本过低，无法填写地址",
			                showCancel: !1,
			                confirmText: "我知道了"
			            }), o({
			                errMsg: "not support"
			            }))
			        })
			    },
			    openSettingForPlugin: function() {
			        return new Promise(function(n, o) {
			            wx.openSettingForPlugin && "function" == typeof wx.openSettingForPlugin ? wx.openSettingForPlugin({
			                success: function(o) {
			                    n(o)
			                },
			                fail: function(n) {
			                    o(n)
			                }
			            }) : (wx.showModal({
			                title: "建议升级",
			                content: "由于微信版本过低，无法打开设置页",
			                showCancel: !1,
			                confirmText: "我知道了"
			            }), o({
			                errMsg: "not support"
			            }))
			        })
			    },
			    reLaunch: function(n) {
			        wx.reLaunch && "function" == typeof wx.reLaunch && wx.reLaunch({
			            url: n
			        })
			    },
			    reportPerformance: function(n, o) {
			        var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
			        wx.reportPerformance && "function" == typeof wx.reportPerformance && wx.reportPerformance(n, o, t)
			    }
			};