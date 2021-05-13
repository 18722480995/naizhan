var app = getApp();
Page({
    data: {
        is_heng: 1
    },
    onLoad: function(o) {
        var t = o.id || "";
        this.get_goods_details(t)
    },
    onShow: function() {},
    goDetails: function() {
        var o = this.data.goods.id || "";
        o && wx.redirectTo({
            url: "/lionfish_comshop/pages/goods/goodsDetail?id=" + o
        })
    },
    get_goods_details: function(o) {
        var a = this;
        if (!o) return wx.hideLoading(), wx.showModal({
            title: "提示",
            content: "参数错误",
            showCancel: !1,
            confirmColor: "#F75451",
            success: function(o) {
                o.confirm && wx.redirectTo({
                    url: "/lionfish_comshop/pages/index/index"
                })
            }
        }), !1;
        var t = wx.getStorageSync("token"),
            i = wx.getStorageSync("community").communityId || "";
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "goods.get_goods_detail",
                token: t,
                id: o,
                community_id: i
            },
            dataType: "json",
            success: function(o) {
                wx.hideLoading();
                var t = o.data.data && o.data.data.goods || "";
                t && 0 != t.length && "" != Object.keys(t) || wx.showModal({
                    title: "提示",
                    content: "该商品不存在，回首页",
                    showCancel: !1,
                    confirmColor: "#F75451",
                    success: function(o) {
                        o.confirm && wx.switchTab({
                            url: "/lionfish_comshop/pages/index/index"
                        })
                    }
                }), a.currentOptions = o.data.data.options, a.setData({
                    goods: t,
                    options: o.data.data.options,
                    order: {
                        goods_id: o.data.data.goods.goods_id,
                        pin_id: o.data.data.pin_id
                    },
                    share_title: t.share_title,
                    goods_image: o.data.data.goods_image
                })
            }
        })
    },
    onShareAppMessage: function() {
        var o = wx.getStorageSync("community"),
            t = this.data.goods,
            a = o.communityId,
            i = this.data.share_title,
            e = wx.getStorageSync("member_id"),
            d = "lionfish_comshop/pages/video/detail?id=" + t.id + "&share_id=" + e + "&community_id=" + a,
            s = this.data.goods.goods_share_image;
        return console.log("商品分享地址：", d), {
            title: i,
            path: d,
            imageUrl: s,
            success: function(o) {},
            fail: function(o) {}
        }
    }
});