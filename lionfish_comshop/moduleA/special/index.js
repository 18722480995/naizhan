var app = getApp(),
    util = require("../../utils/util.js"),
    status = require("../../utils/index.js");
Page({
    mixins: [require("../../mixin/cartMixin.js")],
    data: {
        list: [],
        info: {},
        cartNum: 0,
        needAuth: !1
    },
    specialId: 0,
    onLoad: function(e) {
        var t = e.id || 0;
        this.specialId = t, "undefined" != e.share_id && 0 < e.share_id && wx.setStorageSync("share_id", e.share_id), this.getData(t)
    },
    authSuccess: function() {
        this.getData(this.specialId), this.setData({
            needAuth: !1
        })
    },
    getData: function(e) {
        wx.showLoading();
        var t = wx.getStorageSync("token"),
            l = this,
            i = wx.getStorageSync("community");
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "marketing.get_special",
                token: t,
                head_id: i.communityId,
                id: e
            },
            dataType: "json",
            success: function(e) {
                if (wx.hideLoading(), 0 == e.data.code) {
                    var t = e.data.list,
                        i = e.data.data,
                        a = e.data.ishow_special_share_btn || 0;
                    wx.setNavigationBarTitle({
                        title: i.special_title || "专题"
                    });
                    var n = e.data,
                        s = n.full_money,
                        o = n.full_reducemoney,
                        c = n.is_open_fullreduction,
                        d = (n.is_open_vipcard_buy, n.is_vip_card_member, n.is_member_level_buy, {
                            full_money: s,
                            full_reducemoney: o,
                            is_open_fullreduction: c
                        }),
                        u = 0 == t.length;
                    l.setData({
                        list: t,
                        info: i,
                        ishowShareBtn: a,
                        noData: u,
                        reduction: d
                    })
                } else 1 == e.data.code ? wx.showModal({
                    title: "提示",
                    content: e.data.msg,
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && wx.switchTab({
                            url: "/lionfish_comshop/pages/index/index"
                        })
                    }
                }) : 2 == e.data.code && l.setData({
                    needAuth: !0
                })
            }
        })
    },
    onShow: function() {
        var i = this,
            a = this;
        util.check_login_new().then(function(e) {
            if (e) i.setData({
                needAuth: !1
            }), (0, status.cartNum)("", !0).then(function(e) {
                0 == e.code && a.setData({
                    cartNum: e.data
                })
            });
            else {
                var t = i.specialId;
                i.setData({
                    needAuth: !0,
                    navBackUrl: "/lionfish_comshop/pages/supply/index?id=" + t
                })
            }
        })
    },
    onPullDownRefresh: function() {},
    onShareAppMessage: function(e) {
        var t = this.data.info.special_title || "活动专题",
            i = wx.getStorageSync("member_id");
        return {
            title: t,
            path: "lionfish_comshop/moduleA/special/index?id=" + this.specialId + "&share_id=" + i,
            success: function(e) {},
            fail: function(e) {}
        }
    },
  onShareTimeline: function (e) {
    var t = this.data.info.special_title || "活动专题",
      i = wx.getStorageSync("member_id");
    return {
      title: t,
      query: "id=" + this.specialId + "&share_id=" + i,
      success: function (e) { },
      fail: function (e) { }
    }
  }
});