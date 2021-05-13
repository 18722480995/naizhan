
var app = getApp(),
    status = require("../../utils/index.js");
Page({
    data: {
        order: [],
        groupInfo: {
            group_name: "社区",
            owner_name: "团长"
        }
    },
    onLoad: function(a) {
        var e = this;
        status.setGroupInfo().then(function(a) {
            e.setData({
                groupInfo: a
            })
        });
        var o = a.order_id || 0;
        null != o && o || wx.redirectTo({
            url: "/lionfish_comshop/pages/index/index"
        }), wx.showLoading(), this.getData(o)
    },
    onShow: function() {},
    getData: function(a) {
        var i = this;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "order.order_share_info",
                id: a,
                is_share: 1
            },
            dataType: "json",
            method: "POST",
            success: function(a) {
                if (wx.hideLoading(), 0 == a.data.code) {
                    var e = a.data.data,
                        o = e.order_info || "";
                    if (o) {
                        var t = o.shipping_name,
                            r = o.shipping_address;
                        t = i.formatData(t, 2), r = i.formatData(r, 6), e.order_info.shipping_name = t, e.order_info.shipping_address = r
                    }
                    i.setData({
                        order: e
                    })
                } else app.util.message(a.data.msg || "请求出错", "", "error")
            }
        })
    },
    goGoodsDetails: function(a) {
        var e = a.currentTarget.dataset.id || 0,
            o = this.data.order.order_info.head_id || "";
        wx.navigateTo({
            url: "/lionfish_comshop/pages/goods/goodsDetail?id=" + e + "&community_id=" + o
        })
    },
    formatData: function(a, e) {
        return e = 3 < (a += "").length ? e : 1, a.length > e ? a.substr(0, a.length - e) + new Array(e + 1).join("*") : a
    }
});