
var app = getApp(),
    util = require("../../utils/util.js"),
    status = require("../../utils/index.js");
Page({
    data: {},
    onLoad: function(t) {
        status.setNavBgColor();
        var s = this;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "supply.get_apply_page"
            },
            dataType: "json",
            success: function(t) {
                var a = t.data.supply_diy_name || "供应商";
                if (wx.setNavigationBarTitle({
                    title: a
                }), s.setData({
                    supply_diy_name: a
                }), 0 == t.data.code) {
                    console.log(t);
                    var e = t.data.data || "";
                    s.setData({
                      article: e.replace('< img ', '< img style="max-width:100%;height:auto;display:block;margin:10px 0;"')
                    })
                }
            }
        })
    },
    onShow: function() {
        var a = this;
        util.check_login_new().then(function(t) {
            a.setData({
                needAuth: !t
            })
        })
    },
    authModal: function() {
        return !this.data.needAuth || (this.setData({
            showAuthModal: !this.data.showAuthModal
        }), !1)
    },
    authSuccess: function() {
        this.setData({
            needAuth: !1,
            showAuthModal: !1
        })
    },
    goLink: function(t) {
        if (this.authModal()) {
            var a = t.currentTarget.dataset.link;
            3 < getCurrentPages().length ? wx.redirectTo({
                url: a
            }) : wx.navigateTo({
                url: a
            })
        }
    },
    onShareAppMessage: function() {}
});