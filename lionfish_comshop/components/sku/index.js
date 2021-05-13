var _extends = Object.assign || function(t) {
        for (var a = 1; a < arguments.length; a++) {
            var e = arguments[a];
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
        }
        return t
    }, a = require("../../utils/public"),
    app = getApp(),
    util = require("../../utils/util.js");
Component({
    properties: {
        visible: {
            type: Boolean,
            value: !1,
            observer: function(t) {
                t && this.setData({
                    value: 1,
                    loading: !1
                })
            }
        },
        cur_sku_arr: {
            type: Object,
            value: {}
        },
        skuList: {
            type: Object,
            value: {}
        },
        sku_val: {
            type: Number,
            value: 1
        },
        sku: {
            type: Array,
            value: []
        },
        goodsid: {
            type: Number,
            value: 0
        },
        type: {
            type: Number,
            value: 0
        },
        buyType: {
            type: String,
            value: ""
        },
        soliId: {
            type: Number,
            value: 0
        },
        vipInfo: {
            type: Object,
            value: {
                is_open_vipcard_buy: 0,
                is_vip_card_member: 0,
                is_member_level_buy: 0
            }
        }
    },
    focusFlag: !1,
    data: {
        value: 1,
        loading: !1
    },
    methods: {
        close: function() {
            this.triggerEvent("cancel")
        },
        selectSku: function(t) {
            var a = t.currentTarget.dataset.type.split("_"),
                e = this.data,
                i = e.sku,
                s = e.cur_sku_arr,
                o = e.skuList,
                u = e.sku_val,
                r = {
                    name: a[3],
                    id: a[2],
                    index: a[0],
                    idx: a[1]
                };
            i.splice(a[0], 1, r);
            for (var n = "", d = 0; d < i.length; d++) d == i.length - 1 ? n += i[d].id : n = n + i[d].id + "_";
            var l = {};
            u > (s = Object.assign(s, o.sku_mu_list[n])).canBuyNum && (l.sku_val = s.canBuyNum, wx.showToast({
                title: "最多只能购买" + s.canBuyNum + "件",
                icon: "none"
            })), this.setData(_extends({
                cur_sku_arr: s,
                sku: i
            }, l))
        },
        setNum: function(t) {
            var a = t.currentTarget.dataset.type,
                e = 1,
                i = 1 * this.data.sku_val;
            "add" == a ? e = i + 1 : "decrease" == a && 1 < i && (e = i - 1);
            var s = this.data.sku,
                o = this.data.skuList;
            if (0 < s.length) for (var u = "", r = 0; r < s.length; r++) r == s.length - 1 ? u += s[r].id : u = u + s[r].id + "_";
            0 < o.length ? e > o.sku_mu_list[u].canBuyNum && (e -= 1) : e > this.data.cur_sku_arr.canBuyNum && (e -= 1);
            this.setData({
                sku_val: e
            })
        },
        gocarfrom: function(t) {
            wx.showLoading(), a.collectFormIds(t.detail.formId), this.goOrder()
        },
        goOrder: function() {
            var r = this,
                t = r.data;
            t.can_car && (t.can_car = !1);
            wx.getStorageSync("token");
            var a = wx.getStorageSync("community").communityId,
                n = t.goodsid,
                e = t.sku_val,
                i = t.cur_sku_arr,
                s = "";
            i && i.option_item_ids && (s = i.option_item_ids);
            var d = this.data.buyType ? this.data.buyType : "dan",
                o = this.data.soliId || "",
                u = {
                    goods_id: n,
                    community_id: a,
                    quantity: e,
                    sku_str: s,
                    buy_type: d,
                    pin_id: 0,
                    is_just_addcar: 1,
                    soli_id: o
                };
            util.addCart(u).then(function(t) {
                if (1 == t.showVipModal) {
                    var a = t.data.pop_vipmember_buyimage;
                    wx.hideLoading(), r.triggerEvent("vipModal", {
                        pop_vipmember_buyimage: a,
                        showVipModal: !0,
                        visible: !1
                    })
                } else if (3 == t.data.code || 7 == t.data.code) wx.showToast({
                    title: t.data.msg,
                    icon: "none",
                    duration: 2e3
                });
                else if ("integral" == d) if (6 == t.data.code) {
                    var e = t.data.msg;
                    wx.showToast({
                        title: e,
                        icon: "none",
                        duration: 2e3
                    })
                } else wx.navigateTo({
                    url: "/lionfish_comshop/pages/order/placeOrder?type=integral"
                });
                else if (4 == t.data.code) wx.showToast({
                    title: "您未登录",
                    duration: 2e3,
                    success: function() {
                        r.setData({
                            needAuth: !0
                        })
                    }
                });
                else if (6 == t.data.code) {
                    var i = t.data.max_quantity || "";
                    0 < i && r.setData({
                        sku_val: i
                    });
                    e = t.data.msg;
                    wx.showToast({
                        title: e,
                        icon: "none",
                        duration: 2e3
                    })
                } else {
                    if (r.close(), wx.hideLoading(), "soitaire" == d) {
                        var s = t.data,
                            o = s.goods_total_count,
                            u = s.total;
                        r.triggerEvent("changeCartNum", {
                            goods_total_count: o,
                            total: u,
                            goods_id: n
                        })
                    } else t.data.total && r.triggerEvent("changeCartNum", t.data.total);
                    wx.showToast({
                        title: "已加入购物车",
                        image: "../../images/addShopCart.png"
                    })
                }
            })
        },
        handleFocus: function() {
            this.focusFlag = !0
        },
        handleBlur: function(t) {
            var a = t.detail,
                e = parseInt(a.value);
            ("" == e || isNaN(e)) && this.setData({
                sku_val: 1
            })
        },
        changeNumber: function(t) {
            var a = this.data,
                e = a.cur_sku_arr,
                i = a.sku_val,
                s = 1 * e.stock,
                o = t.detail;
            if (this.focusFlag = !1, o) {
                var u = parseInt(o.value);
                s < (u = u < 1 ? 1 : u) ? (wx.showToast({
                    title: "最多只能购买" + s + "件",
                    icon: "none"
                }), i = s) : i = u
            }
            this.setData({
                sku_val: i
            })
        }
    }
});