var app = getApp(),
    status = require("../../utils/index.js"),
    util = require("../../utils/util.js");
Component({
    properties: {
        spuItem: {
            type: Object,
            value: {
                skuList: []
            },
            observer: function(t) {
                var a = t.skuList || [],
                    e = 0;
                "[object Array]" === Object.prototype.toString.call(a) ? a.length && (e = 1) : Object.keys(a).length && (e = 1), this.setData({
                    specs: e,
                    number: t.goods_total_count || 0
                })
            }
        },
        idx: {
            type: Number,
            value: -1
        },
        type: {
            type: Number,
            value: 0
        },
        hasIpt: {
            type: Boolean,
            value: !0
        },
        state: {
            type: Boolean,
            value: !1
        },
        needAuth: {
            type: Boolean,
            value: !1
        },
        soliId: {
            type: Number,
            value: 0
        }
    },
    data: {
        number: 0,
        placeholdeImg: app.globalData.placeholdeImg,
        specs: 0
    },
    methods: {
        handleSelect: function() {
            this.triggerEvent("onSelect", this.data.spuItem)
        },
        handleDelete: function() {
            this.triggerEvent("onSelect", this.data.idx)
        },
        showTip: function() {
            var t = this;
            wx.showToast({
                title: "多规格商品只能去购物车删除",
                icon: "none",
                complete: function() {
                    t.triggerEvent("showCart")
                }
            })
        },
        openSku: function() {
            this.data.needAuth ? this.triggerEvent("authModal", !0) : (this.setData({
                stopClick: !0,
                disabled: !1
            }), void 0 === this.data.spuItem.skuList.length ? (console.log("多规格"), this.triggerEvent("openSku", {
                actId: this.data.spuItem.actId,
                skuList: this.data.spuItem.skuList,
                promotionDTO: this.data.spuItem.promotionDTO,
                is_take_vipcard: this.data.spuItem.is_take_vipcard,
                is_mb_level_buy: this.data.spuItem.is_mb_level_buy,
                allData: {
                    spuName: this.data.spuItem.spuName,
                    skuImage: this.data.spuItem.skuImage,
                    actPrice: this.data.spuItem.actPrice,
                    canBuyNum: this.data.spuItem.spuCanBuyNum,
                    stock: this.data.spuItem.spuCanBuyNum,
                    marketPrice: this.data.spuItem.marketPrice
                }
            })) : this.addCart({
                value: 1,
                type: "plus"
            }))
        },
        changeNumber: function(t) {
            var a = t.detail;
            a && this.addCart(a)
        },
        outOfMax: function(t) {
            t.detail;
            var a = this.data.spuItem.spuCanBuyNum;
            this.data.number >= a && wx.showToast({
                title: "不能购买更多啦",
                icon: "none"
            })
        },
        addCart: function(t) {
            var a = wx.getStorageSync("token"),
                e = wx.getStorageSync("community"),
                d = this.data.spuItem.actId,
                s = this.data.soliId,
                i = e.communityId,
                n = this;
            if ("plus" == t.type) {
                var o = {
                    goods_id: d,
                    community_id: i,
                    quantity: 1,
                    sku_str: "",
                    buy_type: "soitaire",
                    pin_id: 0,
                    is_just_addcar: 1,
                    soli_id: s
                };
                util.addCart(o).then(function(t) {
                    if (1 == t.showVipModal) {
                        var a = t.data.pop_vipmember_buyimage;
                        n.triggerEvent("vipModal", {
                            pop_vipmember_buyimage: a,
                            showVipModal: !0,
                            visible: !1
                        })
                    } else {
                        if (3 == t.data.code) 0 < (t.data.max_quantity || "") && n.setData({
                            number: n.data.number
                        }), wx.showToast({
                            title: t.data.msg,
                            icon: "none",
                            duration: 2e3
                        });
                        else if (4 == t.data.code) n.setData({
                            needAuth: !0
                        }), n.triggerEvent("authModal", !0);
                        else if (6 == t.data.code || 7 == t.data.code) {
                            0 < (t.data.max_quantity || "") && n.setData({
                                number: n.data.number
                            });
                            var e = t.data.msg;
                            wx.showToast({
                                title: e,
                                icon: "none",
                                duration: 2e3
                            })
                        } else {
                            var s = t.data,
                                i = s.goods_total_count,
                                o = s.total,
                                u = s.cur_count;
                            n.setData({
                                number: u
                            }), wx.showToast({
                                title: "已加入购物车",
                                image: "../../images/addShopCart.png"
                            }), n.triggerEvent("changeCartNum", {
                                goods_total_count: i,
                                total: o,
                                goods_id: d
                            })
                        }
                    }
                })
            } else app.util.request({
                url: "entry/wxapp/user",
                data: {
                    controller: "car.reduce_car_goods",
                    token: a,
                    goods_id: d,
                    community_id: i,
                    quantity: 1,
                    sku_str: "",
                    buy_type: "soitaire",
                    pin_id: 0,
                    is_just_addcar: 1,
                    soli_id: s
                },
                dataType: "json",
                method: "POST",
                success: function(t) {
                    if (3 == t.data.code) wx.showToast({
                        title: t.data.msg,
                        icon: "none",
                        duration: 2e3
                    });
                    else if (4 == t.data.code) {
                        if (n.data.needAuth) return n.setData({
                            needAuth: !0
                        }), void n.triggerEvent("authModal", !0)
                    } else {
                        var a = t.data,
                            e = a.goods_total_count,
                            s = a.total,
                            i = a.cur_count;
                        n.setData({
                            number: i
                        }), n.triggerEvent("changeCartNum", {
                            goods_total_count: e,
                            total: s,
                            goods_id: d
                        })
                    }
                }
            })
        }
    }
});