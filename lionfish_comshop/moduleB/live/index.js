var app = getApp(),
    util = require("../../utils/util.js"),
    status = require("../../utils/index.js");
Page({
    data: {
        roomInfo: [],
        loadText: "加载中...",
        noData: !1,
        loadMore: !0,
        live_status_tip: {
            101: "直播中",
            102: "未开始",
            103: "已结束",
            104: "禁播",
            105: "暂停中",
            106: "异常",
            107: "已过期"
        }
    },
    page: 1,
    onLoad: function(a) {
        this.getData()
    },
    onShow: function() {
        var t = this;
        util.check_login_new().then(function(a) {
            a ? (0, status.cartNum)("", !0).then(function(a) {
                t.setData({
                    cartNum: a.data
                })
            }) : t.setData({
                needAuth: !0
            })
        })
    },
    getData: function() {
        var i = this;
        wx.showLoading(), app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "livevideo.get_roominfo",
                page: this.page
            },
            dataType: "json",
            success: function(a) {
              console.log(a);
                if (wx.hideLoading(), 0 == a.data.code) {
                    var t = a.data.data || [],
                        o = {};
                    o.showTabbar = a.data.showTabbar, t.length < 10 && (o.noMore = !0, o.loadMore = !1);
                    var e = i.data.roomInfo;
                    e = e.concat(t), o.roomInfo = e, i.page++, i.setData(o)
                } else {
                    var n = {};
                    1 == i.page && (n.noData = !0), n.showTabbar = a.data.showTabbar, n.loadMore = !1, i.setData(n)
                }
            }
        })
    },
    goLive: function(a) {
        var t = a.currentTarget.dataset.roomid;
        t && wx.navigateTo({
            url: "plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=" + t
        })
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.data.loadMore && this.getData()
    },
});