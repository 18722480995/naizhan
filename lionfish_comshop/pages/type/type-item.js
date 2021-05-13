var app = getApp(),
    t = require("../../utils/public"),
    status = require("../../utils/index.js"),
    util = require("../../utils/util.js");
Component({
    properties: {
        spuItem: {
            type: Object,
            value: {
                spuId: "",
                skuId: "",
                spuImage: "",
                spuName: "",
                endTime: 0,
                beginTime: "",
                actPrice: ["", ""],
                marketPrice: ["", ""],
                spuCanBuyNum: "",
                soldNum: "",
                actId: "",
                limitMemberNum: "",
                limitOrderNum: "",
                serverTime: "",
                isLimit: !1,
                skuList: [],
                spuDescribe: "",
                is_take_fullreduction: 0,
                label_info: "",
                car_count: 0
            }
        },
        isPast: {
            type: Boolean,
            value: !1
        },
        actEnd: {
            type: Boolean,
            value: !1
        },
        reduction: {
            type: Object,
            value: {
                full_money: "",
                full_reducemoney: "",
                is_open_fullreduction: 0
            }
        },
        changeCarCount: {
            type: Boolean,
            value: !1,
            observer: function(t) {
                t && this.setData({
                    number: this.data.spuItem.car_count
                })
            }
        },
        needAuth: {
            type: Boolean,
            value: !1
        },
        is_open_vipcard_buy: {
            type: Number,
            value: 0
        },
        canLevelBuy: {
            type: Boolean,
            value: !1
        }
    },
    attached: function() {
        this.setData({
            placeholdeImg: app.globalData.placeholdeImg
        })
    },
    data: {
        disabled: !1,
        placeholdeImg: "",
        number: 0
    },
    ready: function() {
        this.setData({
            number: this.data.spuItem.car_count || 0
        })
    },
    methods: {
        openSku: function() {
            if (this.data.needAuth) this.triggerEvent("authModal", !0);
            else {
                console.log("step1"), this.setData({
                    stopClick: !0,
                    disabled: !1
                });
                var t = this.data.spuItem;
                void 0 === t.skuList.length ? this.triggerEvent("openSku", {
                    actId: t.actId,
                    skuList: t.skuList,
                    promotionDTO: t.promotionDTO,
                    is_mb_level_buy: t.is_mb_level_buy,
                    is_take_vipcard: t.is_take_vipcard,
                    allData: {
                        spuName: t.spuName,
                        skuImage: t.skuImage,
                        actPrice: t.actPrice,
                        canBuyNum: t.spuCanBuyNum,
                        stock: t.spuCanBuyNum,
                        marketPrice: t.marketPrice
                    }
                }) : this.addCart({
                    value: 1,
                    type: "plus"
                })
            }
        },
        countDownEnd: function() {
            this.setData({
                actEnd: !0
            })
        },
        submit2: function(e) {
            (0, t.collectFormIds)(e.detail.formId)
        },
        changeNumber: function(t) {
            var e = t.detail;
            e && this.addCart(e)
        },
        outOfMax: function(t) {
            t.detail;
            var e = this.data.spuItem.spuCanBuyNum;
            this.data.number >= e && wx.showToast({
                title: "不能购买更多啦",
                icon: "none"
            })
        },
        addCart: function(t) {
            var e = wx.getStorageSync("token"),
                a = wx.getStorageSync("community"),
                u = this.data.spuItem.actId,
                i = a.communityId,
                s = this;
            if ("plus" == t.type) {
                var o = {
                    goods_id: u,
                    community_id: i,
                    quantity: 1,
                    sku_str: "",
                    buy_type: "dan",
                    pin_id: 0,
                    is_just_addcar: 1
                };
                util.addCart(o).then(function(t) {
                    if (1 == t.showVipModal) {
                        var e = t.data.pop_vipmember_buyimage;
                        s.triggerEvent("vipModal", {
                            pop_vipmember_buyimage: e,
                            showVipModal: !0,
                            visible: !1
                        })
                    } else if (3 == t.data.code) wx.showToast({
                        title: t.data.msg,
                        icon: "none",
                        duration: 2e3
                    });
                    else {
                        if (4 == t.data.code) return void s.triggerEvent("authModal", !0);
                        if (6 == t.data.code || 7 == t.data.code) {
                            var a = t.data.max_quantity || "";
                            0 < a && s.setData({
                                number: a
                            });
                            var i = t.data.msg;
                            wx.showToast({
                                title: i,
                                icon: "none",
                                duration: 2e3
                            })
                        } else s.triggerEvent("changeCartNum", t.data.total), s.setData({
                            number: t.data.cur_count
                        }), wx.showToast({
                            title: "已加入购物车",
                            image: "../../images/addShopCart.png"
                        }), status.indexListCarCount(u, t.data.cur_count)
                    }
                })
            } else app.util.request({
                url: "entry/wxapp/user",
                data: {
                    controller: "car.reduce_car_goods",
                    token: e,
                    goods_id: u,
                    community_id: i,
                    quantity: 1,
                    sku_str: "",
                    buy_type: "dan",
                    pin_id: 0,
                    is_just_addcar: 1
                },
                dataType: "json",
                method: "POST",
                success: function(t) {
                    3 == t.data.code ? wx.showToast({
                        title: t.data.msg,
                        icon: "none",
                        duration: 2e3
                    }) : (s.triggerEvent("changeCartNum", t.data.total), s.setData({
                        number: t.data.cur_count
                    }), status.indexListCarCount(u, t.data.cur_count))
                }
            })
        }
    }
});