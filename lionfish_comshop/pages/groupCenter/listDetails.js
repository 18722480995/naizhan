var _extends = Object.assign || function(t) {
        for (var e = 1; e < arguments.length; e++) {
            var a = arguments[e];
            for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o])
        }
        return t
    }, app = getApp();
Page({
    data: {
        isIpx: app.globalData.isIpx,
        list: [],
        state: 0,
        loadText: "加载中...",
        noData: 0,
        loadMore: !0
    },
    list_id: "",
    page: 1,
    onLoad: function(t) {
        var e = t.id || "",
            a = t.state || 0;
        e ? (this.setData({
            state: a
        }), wx.showLoading(), this.list_id = e, this.getData()) : wx.redirectTo({
            url: "/lionfish_comshop/pages/groupCenter/list"
        })
    },
    getData: function() {
        var o = this,
            t = this.list_id,
            e = wx.getStorageSync("token");
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "community.get_head_deliverygoods",
                token: e,
                list_id: t,
                page: this.page
            },
            dataType: "json",
            success: function(t) {
                if (wx.hideLoading(), 0 == t.data.code) {
                    var e = {}, a = t.data.data;
                    a.length < 20 && (e.noMore = !0), a = o.data.list.concat(a), o.page++, o.setData(_extends({
                        list: a
                    }, e))
                } else 1 == o.page && o.setData({
                    noData: 1
                }), o.setData({
                    loadMore: !1,
                    noMore: !1,
                    loadText: "没有更多记录了~"
                })
            },
            fail: function(t) {
                console.log(t), wx.hideLoading()
            }
        })
    },
    signAll: function() {
        var t = wx.getStorageSync("token"),
            e = this.list_id;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "community.sub_head_delivery",
                token: t,
                list_id: e
            },
            dataType: "json",
            success: function(t) {
                wx.hideLoading(), console.log(t), 0 == t.data.code ? (wx.showToast({
                    title: "收货成功",
                    icon: !1
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "/lionfish_comshop/pages/groupCenter/list"
                    })
                }, 2e3)) : wx.showToast({
                    title: "签收失败，请重试！",
                    icon: !1
                })
            },
            fail: function(t) {
                console.log(t), wx.hideLoading()
            }
        })
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        if (!this.data.loadMore) return !1;
        this.getData()
    }
});