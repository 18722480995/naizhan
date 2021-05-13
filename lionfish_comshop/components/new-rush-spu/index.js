var t = require("../../utils/public"),
    util = require("../../utils/util.js"),
    status = require("../../utils/index.js"),
    app = getApp();
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
            },
            observer: function(t) {
                var a = "/lionfish_comshop/pages/goods/goodsDetail?&id=" + t.actId;
                this.setData({
                    url: a
                })
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
        isShowListCount: {
            type: Number,
            value: 0
        },
        changeCarCount: {
            type: Boolean,
            value: !1,
            observer: function(t) {
                t && this.setData({
                    number: this.data.spuItem.car_count || 0
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
        },
        isShowListTimer: {
            type: Boolean,
            value: !0
        },
        showPickTime: {
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
        number: 0,
        url: ""
    },
    ready: function() {
        this.setData({
            number: this.data.spuItem.car_count || 0
        })
    },
    methods: {
        openSku: function() {
            this.data.needAuth ? this.triggerEvent("authModal", !0) : (console.log("step1"), this.setData({
                stopClick: !0,
                disabled: !1
            }), void 0 === this.data.spuItem.skuList.length ? this.triggerEvent("openSku", {
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
            }) : this.addCart({
                value: 1,
                type: "plus"
            }))
        },
        countDownEnd: function() {
            this.setData({
                actEnd: !0
            })
        },
        submit2: function(a) {
            (0, t.collectFormIds)(a.detail.formId)
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
                i = this.data.spuItem.actId,
                s = e.communityId,
                u = this;
            if ("plus" == t.type) {
                var o = {
                    goods_id: i,
                    community_id: s,
                    quantity: 1,
                    sku_str: "",
                    buy_type: "dan",
                    pin_id: 0,
                    is_just_addcar: 1
                };
                util.addCart(o).then(function(t) {
                    if (1 == t.showVipModal) {
                        var a = t.data.pop_vipmember_buyimage;
                        u.triggerEvent("vipModal", {
                            pop_vipmember_buyimage: a,
                            showVipModal: !0,
                            visible: !1
                        })
                    } else {
                        if (3 == t.data.code) 0 < (t.data.max_quantity || "") && u.setData({
                            number: u.data.number
                        }), wx.showToast({
                            title: t.data.msg,
                            icon: "none",
                            duration: 2e3
                        });
                        else if (4 == t.data.code) u.setData({
                            needAuth: !0
                        }), u.triggerEvent("authModal", !0);
                        else if (6 == t.data.code || 7 == t.data.code) {
                            0 < (t.data.max_quantity || "") && u.setData({
                                number: u.data.number
                            });
                            var e = t.data.msg;
                            wx.showToast({
                                title: e,
                                icon: "none",
                                duration: 2e3
                            })
                        } else u.triggerEvent("changeCartNum", t.data.total), u.setData({
                            number: t.data.cur_count
                        }), wx.showToast({
                            title: "已加入购物车",
                            image: "../../images/addShopCart.png"
                        }), status.indexListCarCount(i, t.data.cur_count)
                    }
                })
            } else app.util.request({
                url: "entry/wxapp/user",
                data: {
                    controller: "car.reduce_car_goods",
                    token: a,
                    goods_id: i,
                    community_id: s,
                    quantity: 1,
                    sku_str: "",
                    buy_type: "dan",
                    pin_id: 0,
                    is_just_addcar: 1
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
                        if (u.data.needAuth) return u.setData({
                            needAuth: !0
                        }), void u.triggerEvent("authModal", !0)
                    } else u.triggerEvent("changeCartNum", t.data.total), u.setData({
                        number: t.data.cur_count
                    }), status.indexListCarCount(i, t.data.cur_count)
                }
            })
        }
    }
});