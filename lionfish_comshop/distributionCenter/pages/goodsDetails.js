var _extends = Object.assign || function(t) {
        for (var a = 1; a < arguments.length; a++) {
            var e = arguments[a];
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
        }
        return t
    }, app = getApp(),
    util = require("../../utils/util.js");
Page({
    data: {
        currentTab: 0,
        pageSize: 10,
        navList: [{
            name: "全部",
            status: "-1"
        }, {
            name: "待结算",
            status: "0"
        }, {
            name: "已结算",
            status: "1"
        }, {
            name: "已失效",
            status: "2"
        }],
        list: [],
        loadText: "加载中...",
        info: {},
        noData: 0,
        loadMore: !0,
        stateArr: ["待结算", "已结算", "已失效"]
    },
    page: 1,
    onLoad: function(t) {
        this.getInfo(), this.getData()
    },
    getInfo: function() {
        wx.showLoading();
        var t = wx.getStorageSync("token"),
            a = this;
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "distribution.get_commission_info",
                token: t
            },
            dataType: "json",
            success: function(t) {
                wx.hideLoading(), 0 == t.data.code ? a.setData({
                    info: t.data.data
                }) : wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && (console.log("用户点击确定"), wx.reLaunch({
                            url: "/lionfish_comshop/pages/user/me"
                        }))
                    }
                })
            }
        })
    },
    getData: function() {
        var n = this,
            t = wx.getStorageSync("token"),
            a = this.data.currentTab,
            e = this.data.navList[a].status;
        wx.showLoading(), app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "distribution.listorder_list",
                token: t,
                state: e,
                page: this.page
            },
            dataType: "json",
            success: function(t) {
                if (0 == t.data.code) {
                    var a = {}, e = t.data.data;
                    e.length < 6 && (a.noMore = !0), e = n.data.list.concat(e), n.page++, n.setData(_extends({
                        list: e
                    }, a))
                } else 1 == n.page && n.setData({
                    noData: 1
                }), n.setData({
                    loadMore: !1,
                    noMore: !1,
                    loadText: "没有更多记录了~"
                });
                wx.hideLoading()
            }
        })
    },
    getCurrentList: function() {
        if (!this.data.loadMore) return !1;
        this.getData(), this.setData({
            isHideLoadMore: !1
        })
    },
    onReachBottom: function() {
        this.getCurrentList()
    },
    bindChange: function(t) {
        var a = this;
        this.page = 1, this.setData({
            currentTab: t,
            list: [],
            noData: 0,
            loadMore: !0,
            loadText: "加载中..."
        }, function() {
            console.log("我变啦"), a.getData()
        })
    },
    switchNav: function(t) {
        var a = this;
        if (this.data.currentTab === 1 * t.target.dataset.current) return !1;
        var e = 1 * t.target.dataset.current;
        this.setData({
            currentTab: e
        }, function() {
            a.bindChange(e)
        })
    },
    handleTipDialog: function() {
        this.setData({
            showTipDialog: !this.data.showTipDialog
        })
    }
});