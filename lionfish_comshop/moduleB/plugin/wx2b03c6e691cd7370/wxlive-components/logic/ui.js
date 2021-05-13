
			    "use strict";

			function t() {
			    return wx.getMenuButtonBoundingClientRect()
			}
			function e() {
			    return wx.getSystemInfoSync().statusBarHeight + 44
			}
			function n() {
			    return wx.getSystemInfoSync().model.indexOf("iPhone X") >= 0
			}
			function o(t) {
			    wx.setNavigationBarColor({
			        frontColor: "#000000",
			        backgroundColor: t
			    })
			}
			function r() {
			    try {
			        return wx.getSystemInfoSync().windowWidth
			    } catch (t) {
			        return 0
			    }
			}
			function i() {
			    try {
			        return wx.getSystemInfoSync().windowHeight
			    } catch (t) {
			        return 0
			    }
			}
			function u() {
			    try {
			        return "ios" === wx.getSystemInfoSync().platform
			    } catch (t) {
			        return 0
			    }
			}
			Object.defineProperty(exports, "__esModule", {
			    value: !0
			}), module.exports = {
			    getMenuButtonBoundingPosition: t,
			    getPaddingTop: e,
			    isIPhoneX: n,
			    setNavFontColor: o,
			    getScreenWidth: r,
			    getScreenHeight: i,
			    isIos: u
			}, exports.
			default = {
			    getMenuButtonBoundingPosition: t,
			    getPaddingTop: e,
			    isIPhoneX: n,
			    setNavFontColor: o,
			    getScreenWidth: r,
			    getScreenHeight: i,
			    isIos: u
			};