
var app = getApp(),WxParse = require("../../wxParse/wxParse.js");
Page({
    data: {
        list: ""
    },
    token: "",
    articleId: 0,
    onLoad: function(t) {
        var a = t.id || 0;
        this.articleId = a;
        var e = t.about || 0,
            i = wx.getStorageSync("token");
        this.token = i, wx.showLoading({
            title: "加载中"
        }), e ? this.get_about_us() : this.get_article()
    },
    get_article: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "article.get_article",
                token: e.token,
                id: e.articleId
            },
            dataType: "json",
            success: function(t) {
                if (wx.hideLoading(), 0 == t.data.code) {
                    var a = t.data.data;
                    var b = a.content;
                    var c = WxParse.wxParse("instructions", "html", b, e, 0);
                    e.setData({
                        article: c
                    }), wx.setNavigationBarTitle({
                        title: a.title
                    })
                }
            }
        })
    },
    get_about_us: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "user.get_about_us"
            },
            dataType: "json",
            success: function(t) {
                if (wx.hideLoading(), 0 == t.data.code) {
                    var a = t.data.data;
                    e.setData({
                        article: a
                    }), wx.setNavigationBarTitle({
                        title: "关于我们"
                    })
                }
            }
        })
    },
    onShareAppMessage: function() {}
});