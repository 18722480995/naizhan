var app = getApp(),
    util = require("../../utils/util.js"),
    status = require("../../utils/index.js");
Page({
    data: {},
    onLoad: function(t) {
        status.setNavBgColor();
        var e = this;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "community.get_apply_page"
            },
            dataType: "json",
            success: function(t) {
              console.log(t);
                if (0 == t.data.code) {
                    console.log(t);
                    var a = t.data.data || "";
                    e.setData({
                      article: a.replace('< img ', '< img style="max-width:100%;height:auto;display:block;margin:10px 0;"')
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