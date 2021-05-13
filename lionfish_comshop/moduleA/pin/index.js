var util = require("../../utils/util.js"),
    status = require("../../utils/index.js"),
    app = getApp();
Page({
    data: {
        classification: {
            tabs: [],
            activeIndex: 0
        },
        slider_list: [],
        pintuan_show_type: 0,
        loadMore: !0,
        loadText: "加载中...",
        loadOver: !1,
        showEmpty: !1,
        rushList: [],
        isIpx: app.globalData.isIpx
    },
    pageNum: 1,
    onLoad: function(t) {
        this.initFn()
    },
    initFn: function() {
        wx.showLoading(), this.getTabs(), this.getData()
    },
    authSuccess: function() {
        var t = this;
        this.pageNum = 1, this.setData({
            classification: {
                tabs: [],
                activeIndex: 0
            },
            slider_list: [],
            pintuan_show_type: 0,
            loadMore: !0,
            loadText: "加载中...",
            loadOver: !1,
            showEmpty: !1,
            rushList: []
        }, function() {
            t.initFn()
        })
    },
    authModal: function() {
        return !this.data.needAuth || (this.setData({
            showAuthModal: !this.data.showAuthModal
        }), !1)
    },
    getTabs: function() {
        var l = this;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "group.pintuan_slides"
            },
            dataType: "json",
            success: function(t) {
                if (0 == t.data.code) {
                    var a = t.data,
                        e = a.category_list,
                        i = a.pintuan_show_type,
                        n = a.slider_list,
                        s = a.pintuan_index_share_title,
                        o = a.pintuan_index_share_img,
                        u = {
                            classification: {}
                        };
                    u.slider_list = n || [], u.pintuan_show_type = i, u.pintuan_index_share_title = s || "", u.pintuan_index_share_img = o || "";
                    0 < (e = e || []).length ? (e.unshift({
                        name: "推荐",
                        id: 0
                    }), u.isShowClassification = !0, u.classification.tabs = e) : u.isShowClassification = !1, l.setData(u)
                }
            }
        })
    },
    onShow: function() {
        var a = this;
        (0, status.cartNum)("", !0).then(function(t) {
            0 == t.code && a.setData({
                cartNum: t.data
            })
        })
    },
    classificationChange: function(t) {
        console.log(t.detail.e), wx.showLoading();
        var a = this;
        this.pageNum = 1, this.setData({
            rushList: [],
            showEmpty: !1,
            "classification.activeIndex": t.detail.e,
            classificationId: t.detail.a
        }, function() {
            a.getData()
        })
    },
    getData: function() {
        var d = this,
            t = wx.getStorageSync("token"),
            a = d.data.classificationId,
            r = wx.getStorageSync("community").communityId || 0;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "group.get_pintuan_list",
                pageNum: this.pageNum,
                gid: a,
                token: t,
                head_id: r
            },
            dataType: "json",
            success: function(t) {
                if (wx.hideLoading(), wx.stopPullDownRefresh(), 0 == t.data.code) {
                    var a = d.data.rushList;
                    1 == d.pageNum && (a = []);
                    var e = {}, i = t.data.list;
                    1 == d.pageNum && 0 == i.length && (e.showEmpty = !0);
                    var n = a.concat(i),
                        s = t.data,
                        o = {
                            full_money: s.full_money,
                            full_reducemoney: s.full_reducemoney,
                            is_open_fullreduction: s.is_open_fullreduction
                        }, u = s.pintuan_model_buy || 0;
                    e.rushList = n, e.reduction = o, e.loadOver = !0, e.loadText = d.data.loadMore ? "加载中..." : "没有更多商品了~", 1 == (e.pintuan_model_buy = u) && (e.needPosition = !0, !r && d.needCommunity()), d.setData(e, function() {
                        d.pageNum += 1
                    })
                } else if (1 == t.data.code) {
                    var l = {
                        loadMore: !1
                    };
                    1 == d.pageNum && (l.showEmpty = !0), d.setData(l)
                } else 2 == t.data.code && d.setData({
                    needAuth: !0
                })
            }
        })
    },
    needCommunity: function() {
        var t = wx.getStorageSync("token"),
            a = this;
        console.log("需要社区"), t && util.getCommunityInfo().then(function(t) {
            a.pageNum = 1, a.setData({
                loadMore: !0,
                loadText: "加载中...",
                loadOver: !1,
                showEmpty: !1,
                rushList: []
            }, function() {
                a.getData()
            })
        })
    },
    goBannerUrl: function(t) {
        var a = t.currentTarget.dataset.idx,
            e = this.data,
            i = e.slider_list,
            n = e.needAuth;
        if (0 < i.length) {
            var s = i[a].link,
                o = i[a].linktype;
            if (util.checkRedirectTo(s, n)) return void this.authModal();
            if (0 == o) s && wx.navigateTo({
                url: "/lionfish_comshop/pages/web-view?url=" + encodeURIComponent(s)
            });
            else if (1 == o) - 1 != s.indexOf("lionfish_comshop/pages/index/index") || -1 != s.indexOf("lionfish_comshop/pages/order/shopCart") || -1 != s.indexOf("lionfish_comshop/pages/user/me") || -1 != s.indexOf("lionfish_comshop/pages/type/index") ? s && wx.switchTab({
                url: s
            }) : s && wx.navigateTo({
                url: s
            });
            else if (2 == o) {
                i[a].appid && wx.navigateToMiniProgram({
                    appId: i[a].appid,
                    path: s,
                    extraData: {},
                    envVersion: "release",
                    success: function(t) {},
                    fail: function(t) {
                        console.log(t)
                    }
                })
            }
        }
    },
    onPullDownRefresh: function() {
        var t = this;
        this.pageNum = 1, this.setData({
            loadMore: !0,
            loadText: "加载中...",
            loadOver: !1,
            showEmpty: !1,
            rushList: []
        }, function() {
            t.getData()
        })
    },
    onReachBottom: function() {
        console.log("这是我的底线"), this.data.loadMore && (this.setData({
            loadOver: !1
        }), this.getData())
    },
    onShareAppMessage: function() {
        var t = wx.getStorageSync("member_id"),
            a = this.data;
        return {
            title: a.pintuan_index_share_title,
            path: "lionfish_comshop/moduleA/pin/index?share_id=" + t,
            imageUrl: a.pintuan_index_share_img,
            success: function() {},
            fail: function() {}
        }
    },
  onShareTimeline: function () {
    var t = wx.getStorageSync("member_id"),
      a = this.data;
    return {
      title: a.pintuan_index_share_title,
      query: "share_id=" + t,
      imageUrl: a.pintuan_index_share_img,
    }
  }
});