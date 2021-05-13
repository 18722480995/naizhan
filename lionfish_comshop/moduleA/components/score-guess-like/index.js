function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e
}
var util = require("../../../utils/util.js");
Component({
    externalClasses: ["i-class"],
    properties: {
        item: {
            type: Object,
            value: {}
        }
    },
    data: {
        disabled: !1
    },
    methods: {
        openSku: function() {
            this.setData({
                disabled: !1
            });
            var e = this.data.item;
            void 0 === e.skuList.length ? this.triggerEvent("openSku", {
                actId: e.actId,
                skuList: e.skuList,
                promotionDTO: e.promotionDTO || "",
                allData: {
                    spuName: e.spuName,
                    skuImage: e.skuImage,
                    actPrice: e.actPrice,
                    canBuyNum: e.spuCanBuyNum,
                    stock: e.spuCanBuyNum,
                    marketPrice: e.marketPrice
                }
            }) : this.addCart({
                value: 1,
                type: "plus"
            })
        },
        addCart: function(e) {
            wx.showLoading();
            var t = wx.getStorageSync("community"),
                a = this.data.item.actId,
                i = t.communityId;
            if ("plus" == e.type) {
                var o = _defineProperty({
                    goods_id: a,
                    community_id: i,
                    quantity: 1,
                    sku_str: "",
                    buy_type: "dan",
                    pin_id: 0,
                    is_just_addcar: 1
                }, "buy_type", "integral");
                util.addCart(o).then(function(e) {
                    if (wx.hideLoading(), 1 == e.showVipModal) {
                        var t = e.data.pop_vipmember_buyimage;
                        that.triggerEvent("vipModal", {
                            pop_vipmember_buyimage: t,
                            showVipModal: !0,
                            visible: !1
                        })
                    } else if (3 == e.data.code || 7 == e.data.code) wx.showToast({
                        title: e.data.msg,
                        icon: "none",
                        duration: 2e3
                    });
                    else if (6 == e.data.code) {
                        var a = e.data.msg;
                        wx.showToast({
                            title: a,
                            icon: "none",
                            duration: 2e3
                        })
                    } else wx.navigateTo({
                        url: "/lionfish_comshop/pages/order/placeOrder?type=integral"
                    })
                })
            }
        }
    }
});