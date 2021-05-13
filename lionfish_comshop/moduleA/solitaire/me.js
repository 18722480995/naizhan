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
        loadMore: !0
    },
    page: 1,
    onLoad: function(t) {
        this.getData()
    },
    onShow: function() {},
    authSuccess: function() {
        var t = this,
            a = this;
        this.page = 1, this.setData({
            list: [],
            loadText: "加载中...",
            noData: 0,
            loadMore: !0,
            needAuth: !1
        }, function() {
            a.getData(t.specialId)
        })
    },
    getData: function() {
        var o = this,
            t = wx.getStorageSync("token");
        wx.showLoading(), app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "solitaire.get_member_solitairelist",
                token: t,
                page: this.page
            },
            dataType: "json",
            success: function(t) {
                if (wx.stopPullDownRefresh(), wx.hideLoading(), 0 == t.data.code) {
                    var a = {}, e = t.data.data;
                    e.length < 20 && (a.noMore = !0), e = o.data.list.concat(e), o.page++, o.setData(_extends({
                        list: e
                    }, a))
                } else if (1 == t.data.code) 1 == o.page && o.setData({
                    noData: 1
                }), o.setData({
                    loadMore: !1,
                    noMore: !1,
                    loadText: "没有更多记录了~"
                });
                else {
                    if (2 != t.data.code) return void app.util.message(t.data.msg, "", "error");
                    o.setData({
                        needAuth: !0,
                        showAuthModal: !0
                    })
                }
            }
        })
    },
    goDetails: function(t) {
        var a = t ? t.currentTarget.dataset.id : "";
        if (a) {
            var e = "/lionfish_comshop/moduleA/solitaire/details?id=" + a;
            3 < getCurrentPages().length ? wx.redirectTo({
                url: e
            }) : wx.navigateTo({
                url: e
            })
        }
    },
    showImgPrev: function(t) {
        var a = t ? t.currentTarget.dataset.idx : "",
            e = t ? t.currentTarget.dataset.sidx : "",
            o = this.data.list[e].images_list;
        wx.previewImage({
            current: o[a],
            urls: o
        })
    },
    onPullDownRefresh: function() {
        var t = this;
        this.page = 1, this.setData({
            list: [],
            loadText: "加载中...",
            noData: 0,
            loadMore: !0
        }, function() {
            t.getData()
        })
    },
    onReachBottom: function() {
        if (!this.data.loadMore) return !1;
        this.getData()
    }
});