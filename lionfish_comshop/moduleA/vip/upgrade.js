var _Page, _extends = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var a = arguments[t];
            for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i])
        }
        return e
    };

function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e
}
var app = getApp(),
    util = require("../../utils/util.js");
Page((_defineProperty(_Page = {
    mixins: [require("../../mixin/compoentCartMixin.js")],
    data: {
        classification: {
            tabs: [],
            activeIndex: 0
        },
        rushList: [],
        loadMore: !0,
        loadText: "加载中...",
        loadOver: !1,
        showEmpty: !1
    },
    pageNum: 1,
    onLoad: function(e) {
        this.getData(), this.getList()
    },
    authSuccess: function() {
        wx.showLoading(), this.pageNum = 1, this.setData({
            needAuth: !1,
            showAuthModal: !1,
            classification: {
                tabs: [],
                activeIndex: 0
            },
            rushList: [],
            loadMore: !0,
            loadText: "加载中...",
            loadOver: !1,
            showEmpty: !1
        })
    }
}, "authSuccess", function() {
    var e = "/lionfish_comshop/moduleA/vip/upgrade";
    app.globalData.navBackUrl = e, wx.redirectTo({
        url: e
    })
}), _defineProperty(_Page, "onShow", function() {
    var t = this;
    util.check_login_new().then(function(e) {
        e || t.setData({
            needAuth: !0
        })
    })
}), _defineProperty(_Page, "getData", function() {
    wx.showLoading();
    var e = wx.getStorageSync("token"),
        g = this;
    app.util.request({
        url: "entry/wxapp/user",
        data: {
            controller: "vipcard.get_vipcard_baseinfo",
            token: e
        },
        dataType: "json",
        success: function(e) {
            if (wx.hideLoading(), 0 == e.data.code) {
                var t = e.data.data,
                    a = t.member_info,
                    i = t.card_equity_list,
                    o = t.card_list,
                    n = t.is_open_vipcard_buy,
                    s = t.modify_vipcard_name,
                    r = t.is_vip_card_member,
                    c = t.vipcard_unopen_headbg,
                    d = t.vipcard_effect_headbg,
                    u = t.vipcard_afterefect_headbg,
                    l = (t.vipcard_buy_pagenotice, t.vipcard_equity_notice),
                    p = (t.is_show_vipgoods, t.category_list);
                wx.setNavigationBarTitle({
                    title: s || "会员中心"
                });
                var _ = {
                    classification: {}
                };
                0 < (p = p || []).length ? (p.unshift({
                    name: "全部",
                    id: 0
                }), _.isShowClassification = !0, _.classification.tabs = p) : _.isShowClassification = !1, o.map(function(e) {
                    var t = e.expire_day.split(".");
                    return e.expire_day = t[0]
                }), g.setData(_extends({
                    member_info: a,
                    card_equity_list: i,
                    card_list: o,
                    is_open_vipcard_buy: n,
                    modify_vipcard_name: s,
                    is_vip_card_member: r,
                    vipcard_unopen_headbg: c,
                    vipcard_effect_headbg: d,
                    vipcard_afterefect_headbg: u,
                    vipcard_equity_notice: l,
                    del_vip_day: e.data.del_vip_day || ""
                }, _))
            } else app.util.message("未登录", "switchTo:/lionfish_comshop/pages/user/me", "error")
        }
    })
}), _defineProperty(_Page, "choosecard", function(e) {
    this.setData({
        selectid: e.currentTarget.dataset.id
    })
}), _defineProperty(_Page, "submitpay", function(e) {
    if (wx.getStorageSync("token")) {
        var t = this.data.selectid,
            a = wx.getStorageSync("token");
        if (null == t) return wx.showToast({
            icon: "none",
            title: "请选择要开通的会员类型"
        });
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "vipcard.wxcharge",
                token: a,
                rech_id: t
            },
            dataType: "json",
            success: function(e) {
                wx.requestPayment({
                    appId: e.data.appId,
                    timeStamp: e.data.timeStamp,
                    nonceStr: e.data.nonceStr,
                    package: e.data.package,
                    signType: e.data.signType,
                    paySign: e.data.paySign,
                    success: function(e) {
                        wx.showToast({
                            title: "支付成功",
                            icon: "none",
                            duration: 2e3,
                            success: function() {
                                setTimeout(function() {
                                    wx.switchTab({
                                        url: "/lionfish_comshop/pages/user/me"
                                    })
                                }, 2e3)
                            }
                        })
                    },
                    fail: function(e) {
                        wx.showToast({
                            icon: "none",
                            title: "支付失败，请重试！"
                        })
                    }
                })
            }
        })
    } else this.setData({
        needAuth: !0
    })
}), _defineProperty(_Page, "classificationChange", function(e) {
    console.log(e.detail.e), wx.showLoading();
    var t = this;
    this.pageNum = 1, this.setData({
        rushList: [],
        loadMore: !0,
        loadText: "加载中...",
        loadOver: !1,
        showEmpty: !1,
        "classification.activeIndex": e.detail.e,
        classificationId: e.detail.a
    }, function() {
        t.getList()
    })
}), _defineProperty(_Page, "getList", function() {
    var c = this,
        e = wx.getStorageSync("token"),
        t = c.data.classificationId,
        a = wx.getStorageSync("community").communityId || 0;
    app.util.request({
        url: "entry/wxapp/index",
        data: {
            controller: "vipcard.get_vipgoods_list",
            pageNum: this.pageNum,
            gid: t,
            token: e,
            head_id: a
        },
        dataType: "json",
        success: function(e) {
            if (wx.hideLoading(), wx.stopPullDownRefresh(), 0 == e.data.code) {
                var t = c.data.rushList,
                    a = {}, i = e.data.list;
                1 == c.pageNum && 0 == i.length && (a.showEmpty = !0);
                var o = t.concat(i),
                    n = e.data,
                    s = {
                        full_money: n.full_money,
                        full_reducemoney: n.full_reducemoney,
                        is_open_fullreduction: n.is_open_fullreduction
                    };
                a.rushList = o, a.reduction = s, a.loadOver = !0, a.loadText = c.data.loadMore ? "加载中..." : "没有更多商品了~", c.setData(a, function() {
                    c.pageNum += 1
                })
            } else if (1 == e.data.code) {
                var r = {
                    loadMore: !1
                };
                1 == c.pageNum && (r.showEmpty = !0), c.setData(r)
            } else 2 == e.data.code && c.setData({
                needAuth: !0
            })
        }
    })
}), _defineProperty(_Page, "onReachBottom", function() {
    console.log("这是我的底线"), this.data.loadMore && (this.setData({
        loadOver: !1
    }), this.getList())
}), _Page));