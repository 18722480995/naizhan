var _extends = Object.assign || function(t) {
        for (var e = 1; e < arguments.length; e++) {
            var a = arguments[e];
            for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o])
        }
        return t
    }, app = getApp(),
    util = require("../../utils/util.js"),
    status = require("../../utils/index.js");
Page({
    data: {
        rushList: [],
        loadText: "加载中...",
        noData: 0,
        loadMore: !0,
        shareInfo: ""
    },
    pageNum: 1,
    onLoad: function(t) {
        this.getData(), this.getInfo()
    },
    onShow: function() {
        var a = this;
        util.check_login_new().then(function(t) {
            var e = !t;
            a.setData({
                needAuth: e
            }), t && (0, status.cartNum)("", !0).then(function(t) {
                0 == t.code && a.setData({
                    cartNum: t.data
                })
            })
        })
    },
    getInfo: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "goods.get_video_list_share"
            },
            dataType: "json",
            success: function(t) {
                0 == t.data.code && e.setData({
                    shareInfo: t.data.data
                })
            }
        })
    },
    getData: function() {
        var t = wx.getStorageSync("token"),
            n = this,
            e = wx.getStorageSync("community");
        wx.showLoading(), app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "index.load_gps_goodslist",
                token: t,
                pageNum: n.pageNum,
                head_id: e.communityId,
                per_page: 12,
                is_video: 1
            },
            dataType: "json",
            success: function(t) {
                if (0 == t.data.code) {
                    var e, a = {}, o = t.data;
                    o.list.length < 12 && (a.noMore = !0), e = n.data.rushList.concat(o.list), n.pageNum++, n.setData(_extends({
                        rushList: e,
                        tip: ""
                    }, a))
                } else 1 == t.data.code ? (1 == n.pageNum && n.setData({
                    noData: 1
                }), n.setData({
                    loadMore: !1,
                    noMore: !1,
                    loadText: "没有更多记录了~"
                })) : 2 == t.data.code && n.setData({
                    needAuth: !0
                })
            },
            complete: function() {
                wx.hideLoading()
            }
        })
    },
    onReachBottom: function() {
        if (!this.data.loadMore) return !1;
        this.getData()
    },
    onShareAppMessage: function() {
        var t = this.data.shareInfo,
            e = t.share_title || "视频",
            a = t.share_poster || "";
        return {
            title: e,
            path: "lionfish_comshop/moduleA/video/index?share_id=" + wx.getStorageSync("member_id"),
            imageUrl: a,
            success: function(t) {},
            fail: function(t) {}
        }
    }
});