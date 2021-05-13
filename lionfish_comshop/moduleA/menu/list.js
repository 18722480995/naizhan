var app = getApp(),
    util = require("../../utils/util.js");
Page({
    data: {
        loadMore: !0,
        classification: {
            tabs: [],
            activeIndex: 0
        }
    },
    pageNum: 1,
    onLoad: function(t) {
        this.gid = t.gid || "";
        var n = t.name || "";
        n && wx.setNavigationBarTitle({
            title: n
        }), this._doRefreshMasonry()
    },
    onShow: function() {
        var n = this;
        util.check_login_new().then(function(t) {
            n.setData({
                needAuth: !t
            })
        })
    },
    noLogin: function() {
        this.setData({
            needAuth: !0,
            showAuthModal: !0
        })
    },
    authSuccess: function() {
        var t = this;
        this.pageNum = 1, this.setData({
            loadMore: !0,
            showEmpty: 0,
            needAuth: !1,
            showAuthModal: !1
        }, function() {
            t._doRefreshMasonry()
        })
    },
    authModal: function() {
        return !this.data.needAuth || (this.setData({
            showAuthModal: !this.data.showAuthModal
        }), !1)
    },
    onPullDownRefresh: function() {
        var t = this;
        this.pageNum = 1, this.setData({
            loadMore: !0,
            showEmpty: 0
        }, function() {
            t.getInfo(), t._doRefreshMasonry()
        })
    },
    onReachBottom: function() {
        this.data.loadMore && this._doAppendMasonry()
    },
    _doRefreshMasonry: function() {
        var n = this;
        this.masonryListComponent = this.selectComponent("#masonry"), this.getData().then(function(t) {
            n.masonryListComponent.start(t).then(function() {})
        }).
        catch (function() {
            n.masonryListComponent.start([]).then(function() {})
        })
    },
    _doAppendMasonry: function() {
        var n = this;
        this.masonryListComponent = this.selectComponent("#masonry"), this.getData().then(function(t) {
            n.masonryListComponent.append(t).then(function() {
                console.log("refresh completed")
            })
        }).
        catch (function() {
            console.log("没有更多了")
        })
    },
    getData: function() {
        var o = this;
        return new Promise(function(e, a) {
            var s = o,
                t = wx.getStorageSync("token"),
                n = s.gid;
            wx.showLoading(), app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "recipe.get_recipe_list",
                    token: t,
                    gid: n,
                    pageNum: o.pageNum
                },
                dataType: "json",
                success: function(t) {
                    if (wx.stopPullDownRefresh(), 0 == t.data.code) {
                        var n = t.data.data;
                        s.pageNum++, e(n)
                    } else {
                        var o = {
                            loadMore: !1
                        };
                        1 == s.pageNum && (o.showEmpty = 1), s.setData(o), a("")
                    }
                    wx.hideLoading()
                }
            })
        })
    }
});