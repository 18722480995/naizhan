var util = require("../../utils/util.js"),
    status = require("../../utils/index.js"),
    app = getApp();
Page({
    data: {
        list: [],
        noMore: !1
    },
    token: "",
    pageNum: 1,
    onLoad: function(t) {
        status.setNavBgColor();
        var a = wx.getStorageSync("token");
        this.token = a, this.get_list()
    },
    get_list: function() {
        var s = this;
        wx.showLoading(), app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "article.get_article_list",
                token: this.token,
                page: this.pageNum
            },
            dataType: "json",
            success: function(t) {
                if (wx.hideLoading(), 0 == t.data.code) {
                    var a = s.data.list,
                        e = t.data.data,
                        i = {};
                    e.length < 30 && (i.noMore = !0), e = e.concat(a), i.list = e, s.pageNum++, s.setData(i)
                } else {
                    var o = {
                        noMore: !0
                    };
                    1 == s.page && (o.noData = !0), s.setData(o)
                }
            }
        })
    },
    onReachBottom: function() {
        this.data.noMore || this.get_list()
    }
});