var util = require("../../utils/util.js"),
    app = getApp();
Page({
    data: {
        qrcode: ""
    },
    onLoad: function(t) {
        util.check_login() || wx.switchTab({
            url: "/lionfish_comshop/pages/user/me"
        }), wx.showLoading()
    },
    getData: function() {
        var t = wx.getStorageSync("token"),
            e = this;
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "community.get_community_zhitui_qrcode",
                token: t
            },
            dataType: "json",
            success: function(t) {
                wx.hideLoading(), 0 == t.data.code ? e.setData({
                    qrcode: t.data.qrcode
                }) : wx.switchTab({
                    url: "/lionfish_comshop/pages/user/me"
                })
            }
        })
    },
    preImg: function(t) {
        var e = this.data.qrcode;
        wx.previewImage({
            current: e,
            urls: [e]
        })
    },
    onShow: function() {
        this.getData()
    }
});