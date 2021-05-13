var a = require("../utils/public"),
    app = getApp(),
    status = require("../utils/index.js"),
    util = require("../utils/util.js");
module.exports = {
    data: {
        visible: !1,
        stopClick: !1,
        updateCart: 0
    },
    authModal: function() {
        return (0 < arguments.length && void 0 !== arguments[0] && arguments[0]).detail && this.setData({
            needAuth: !0
        }), !this.data.needAuth || (this.setData({
            showAuthModal: !this.data.showAuthModal
        }), !1)
    },
    vipModal: function(t) {
        this.setData(t.detail)
    },
    openSku: function(t) {
        if (this.authModal()) {
            var a = this,
                i = t.detail,
                o = i.actId,
                s = i.skuList;
            a.setData({
                addCar_goodsid: o
            });
            var e = s.list || [],
                d = [];
            if (0 < e.length) {
                for (var u = 0; u < e.length; u++) {
                    var n = e[u].option_value[0],
                        r = {
                            name: n.name,
                            id: n.option_value_id,
                            index: u,
                            idx: 0
                        };
                    d.push(r)
                }
                for (var c = "", l = 0; l < d.length; l++) l == d.length - 1 ? c += d[l].id : c = c + d[l].id + "_";
                var _ = s.sku_mu_list[c];
                a.setData({
                    sku: d,
                    sku_val: 1,
                    cur_sku_arr: _,
                    skuList: i.skuList,
                    visible: !0,
                    showSku: !0
                })
            } else {
                var m = i.skuList;
                a.setData({
                    sku: [],
                    sku_val: 1,
                    skuList: [],
                    cur_sku_arr: m
                });
                var h = {
                    detail: {
                        formId: ""
                    }
                };
                h.detail.formId = "the formId is a mock one", a.gocarfrom(h)
            }
        }
    },
    gocarfrom: function(t) {
        wx.showLoading(), a.collectFormIds(t.detail.formId), this.goOrder()
    },
    goOrder: function() {
        var s = this,
            t = s.data;
        t.can_car && (t.can_car = !1);
        var a = wx.getStorageSync("community").communityId,
            e = t.addCar_goodsid,
            i = t.sku_val,
            o = t.cur_sku_arr,
            d = "",
            u = s.data.updateCart || 0;
        o && o.option_item_ids && (d = o.option_item_ids);
        var n = this.data.soli_info || "",
            r = n && n.id || "",
            c = this.data.buy_type || "dan",
            l = {
                goods_id: e,
                community_id: a,
                quantity: i,
                sku_str: d,
                buy_type: c,
                pin_id: 0,
                is_just_addcar: 1,
                soli_id: r
            };
        util.addCart(l).then(function(t) {
            if (1 == t.showVipModal) {
                wx.hideLoading();
                var a = t.data.pop_vipmember_buyimage;
                s.setData({
                    pop_vipmember_buyimage: a,
                    showVipModal: !0,
                    visible: !1
                })
            } else if (3 == t.data.code) wx.showToast({
                title: t.data.msg,
                icon: "none",
                duration: 2e3
            });
            else if (4 == t.data.code) wx.showToast({
                title: "您未登录",
                duration: 2e3,
                success: function() {
                    s.setData({
                        needAuth: !0
                    })
                }
            });
            else if (6 == t.data.code || 7 == t.data.code) {
                var i = t.data.max_quantity || "";
                0 < i && s.setData({
                    sku_val: i
                });
                var o = t.data.msg;
                wx.showToast({
                    title: o,
                    icon: "none",
                    duration: 2e3
                })
            } else {
                s.closeSku(), status.indexListCarCount(e, t.data.cur_count), s.setData({
                    cartNum: t.data.total || 0,
                    updateCart: u + 1
                }), wx.showToast({
                    title: "已加入购物车",
                    image: "../../images/addShopCart.png"
                })
            }
        })
    },
    changeCartNum: function(t) {
        var a = t.detail || 0;
        a && this.setData({
            cartNum: a
        })
    },
    closeSku: function() {
        this.setData({
            visible: !1,
            stopClick: !1
        })
    },
    changeNumber: function(t) {
        var a = t.detail;
        a && this.addCart(a)
    },
    outOfMax: function(t) {
        console.log(t);
        t.detail;
        var a = this.data.spuItem.spuCanBuyNum;
        this.data.number >= a && wx.showToast({
            title: "不能购买更多啦",
            icon: "none"
        })
    },
    addCart: function(t) {
        var d = t.idx,
            u = this.data.list,
            a = wx.getStorageSync("token"),
            i = wx.getStorageSync("community"),
            n = u[d].actId,
            o = i.communityId,
            s = this.data.soli_info || "",
            r = s && s.id || "",
            e = this.data.buy_type || "dan",
            c = this;
        if ("plus" == t.type) {
            var l = {
                goods_id: n,
                community_id: o,
                quantity: 1,
                sku_str: "",
                buy_type: e,
                pin_id: 0,
                is_just_addcar: 1,
                soli_id: r
            };
            util.addCart(l).then(function(t) {
                if (1 == t.showVipModal) {
                    var a = t.data.pop_vipmember_buyimage;
                    c.triggerEvent("vipModal", {
                        pop_vipmember_buyimage: a,
                        showVipModal: !0,
                        visible: !1
                    })
                } else if (3 == t.data.code) {
                    var i = t.data.max_quantity || "";
                    0 < (u[d].car_count = i) && c.setData({
                        list: u
                    }), wx.showToast({
                        title: t.data.msg,
                        icon: "none",
                        duration: 2e3
                    })
                } else if (6 == t.data.code || 7 == t.data.code) {
                    var o = t.data.max_quantity || "";
                    0 < (u[d].car_count = o) && c.setData({
                        cartNum: t.data.total || 0,
                        list: u
                    });
                    var s = t.data.msg;
                    wx.showToast({
                        title: s,
                        icon: "none",
                        duration: 2e3
                    })
                } else {
                    var e = t.data.total || 0;
                    0 < r && (e = t.data.goods_total_count || 0), u[d].car_count = t.data.cur_count, c.setData({
                        cartNum: e,
                        list: u
                    }), wx.showToast({
                        title: "已加入购物车",
                        image: "../../images/addShopCart.png"
                    }), status.indexListCarCount(n, t.data.cur_count)
                }
            })
        } else app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "car.reduce_car_goods",
                token: a,
                goods_id: n,
                community_id: o,
                quantity: 1,
                sku_str: "",
                buy_type: e,
                pin_id: 0,
                is_just_addcar: 1,
                soli_id: r
            },
            dataType: "json",
            method: "POST",
            success: function(t) {
                if (3 == t.data.code) wx.showToast({
                    title: t.data.msg,
                    icon: "none",
                    duration: 2e3
                });
                else {
                    var a = t.data.total || 0;
                    0 < r && (a = t.data.goods_total_count || 0), u[d].car_count = t.data.cur_count, c.setData({
                        list: u,
                        cartNum: a
                    }), status.indexListCarCount(n, t.data.cur_count)
                }
            }
        })
    }
};