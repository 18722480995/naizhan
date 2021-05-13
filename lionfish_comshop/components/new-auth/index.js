var util = require("../../utils/util.js"),
    location = require("../../utils/Location.js"),
    app = getApp();

Component({
    properties: {
        needAuth: {
            type: Boolean,
            value: !1
        },
        needPosition: {
            type: Boolean,
            value: !0
        },
        navBackUrl: {
            type: String,
            value: "",
            observer: function (t) {
                t && (app.globalData.navBackUrl = t);
            }
        }
    },
    attached: function () {
        this.getBg();
    },
    data: {
        btnLoading: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo")
    },
    methods: {
        getBg: function () {
            var o = this;
            app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "index.get_newauth_bg"
                },
                dataType: "json",
                success: function (t) {
                    if (o.setData({
                            loaded: !0
                        }), 0 == t.data.code) {
                        var e = t.data.data,
                            n = e.newauth_bg_image,
                            a = e.newauth_confirm_image,
                            i = e.newauth_cancel_image;
                        o.setData({
                            newauth_bg_image: n,
                            newauth_confirm_image: a,
                            newauth_cancel_image: i
                        });
                    }
                }
            });
        },
        close: function () {
            // console.log('取消按键');
            this.triggerEvent("cancel");
        },
        // 新增用户登录授权修改
        user_infos() {
            console.log('我点击了');
            let e = this;
            if (!this.data.btnLoading) {
                this.setData({
                    needAuth: false
                });
                console.log('到这里');
                wx.getUserProfile({
                    desc: '用于完善会员资料',
                    success: (t) => {
                        var n = t;
                        if ("getUserProfile:ok" === t.errMsg) {
                            console.log('进来了');
                            util.login_prosime(e.data.needPosition,t).then(function () {
                                console.log("授权成功"), e.setData({
                                    btnLoading: !1
                                }), wx.showToast({
                                    title: "登录成功",
                                    icon: "success",
                                    duration: 2e3
                                }), e.triggerEvent("authSuccess"), app.globalData.changedCommunity = !0, e.data.needPosition && location.getGps();
                            }).catch(function () {
                                e.triggerEvent("cancel"), console.log("授权失败");
                            })
                        } else {
                            wx.showToast({
                                title: "授权失败，为了完整体验，获取更多优惠活动，需要您的授权。",
                                icon: "none"
                            }), this.triggerEvent("cancel"), this.setData({
                                btnLoading: !1
                            })
                        }
                    },
                    fail() {

                    }
                })
                console.log('到这里66666');
            }
        },


        // 新增用户登录授权修改

        bindGetUserInfo: function (t) {
            console.log('我点击了啊', t);
            var e = this;
            console.error(e.data.needPosition, '测试login');
            if (!this.data.btnLoading) {
                var n = t.detail;
                this.setData({
                    btnLoading: !0
                }), "getUserInfo:ok" === n.errMsg ? util.login_prosime(e.data.needPosition).then(function () {
                    console.log("授权成功"), e.setData({
                        btnLoading: !1
                    }), wx.showToast({
                        title: "登录成功",
                        icon: "success",
                        duration: 2e3
                    }), e.triggerEvent("authSuccess"), app.globalData.changedCommunity = !0, e.data.needPosition && location.getGps();
                }).catch(function () {
                    e.triggerEvent("cancel"), console.log("授权失败");
                }) : (wx.showToast({
                    title: "授权失败，为了完整体验，获取更多优惠活动，需要您的授权。",
                    icon: "none"
                }), this.triggerEvent("cancel"), this.setData({
                    btnLoading: !1
                }));
            }
        },



        checkWxLogin: function () {
            return new Promise(function (a, i) {
                wx.getSetting({
                    success: function (n) {
                        if (!n.authSetting["scope.userInfo"]) return i({
                            authSetting: !1
                        });
                        wx.getStorage({
                            key: "token",
                            success: function (e) {
                                util.check_login_new().then(function (t) {
                                    return t ? a(!1) : (console.log("过期"), e ? a(e) : i(n));
                                });
                            },
                            fail: function (t) {
                                return i(t);
                            }
                        });
                    },
                    fail: function (t) {
                        return i(t);
                    }
                });
            });
        }
    }
});