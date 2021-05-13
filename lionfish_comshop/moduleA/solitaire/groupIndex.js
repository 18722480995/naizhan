var _extends = Object.assign || function(t) {
        for (var a = 1; a < arguments.length; a++) {
            var e = arguments[a];
            for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
        }
        return t
    }, app = getApp();
Page({
    data: {
        list: [],
        loadText: "加载中...",
        noData: 0,
        loadMore: !0,
        keyword: ""
    },
    page: 1,
    onLoad: function(t) {
        this.getData()
    },
    onShow: function() {},
    getData: function() {
        var o = this;
        wx.showLoading();
        var t = wx.getStorageSync("token");
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "solitaire.get_head_solitairelist",
                token: t,
                page: this.page,
                keyword: this.data.keyword
            },
            dataType: "json",
            success: function(t) {
                if (wx.hideLoading(), 0 == t.data.code) {
                    var a = {}, e = t.data.data;
                    e.length < 20 && (a.noMore = !0), e = o.data.list.concat(e), o.page++, o.setData(_extends({
                        list: e
                    }, a))
                } else {
                    if (1 != t.data.code) return 2 == t.data.code ? void app.util.message("您还未登录", "switchTo:/lionfish_comshop/pages/index/index", "error") : void app.util.message(t.data.msg, "switchTo:/lionfish_comshop/pages/index/index", "error");
                    1 == o.page && o.setData({
                        noData: 1
                    }), o.setData({
                        loadMore: !1,
                        noMore: !1,
                        loadText: "没有更多记录了~"
                    })
                }
            }
        })
    },
    goResult: function(t) {
        var a = t.detail.value || "",
            e = this;
        this.page = 1, this.setData({
            list: [],
            loadText: "加载中...",
            noData: 0,
            loadMore: !0,
            keyword: a
        }, function() {
            e.getData()
        })
    },
    goDetails: function(t) {
        var a = t ? t.currentTarget.dataset.id : "";
        if (a) {
            var e = "/lionfish_comshop/moduleA/solitaire/groupDetails?id=" + a;
            3 < getCurrentPages().length ? wx.redirectTo({
                url: e
            }) : wx.navigateTo({
                url: e
            })
        }
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        if (!this.data.loadMore) return !1;
        this.getData()
    }
});