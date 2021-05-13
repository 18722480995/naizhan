var a = require("../utils/public"),
    app = getApp(),
    status = require("../utils/index.js"),
    util = require("../utils/util.js");
module.exports = {
    data: {
        visible: !1,
        stopClick: !1
    },
    vipModal: function(t) {
        this.setData(t.detail)
    },
    authModal: function() {
        return !this.data.needAuth || (this.setData({
            showAuthModal: !this.data.showAuthModal
        }), !1)
    },
    openSku: function(t) {
        if (this.authModal()) {
            var a = this,
                i = t.currentTarget.dataset.idx,
                o = this.data.list[i],
                e = o.actId,
                s = o.skuList;
            a.setData({
                addCar_goodsid: e
            });
            var d = s.list || [],
                u = [];
            if (0 < d.length) {
                for (var n = 0; n < d.length; n++) {
                    var r = d[n].option_value[0],
                        c = {
                            name: r.name,
                            id: r.option_value_id,
                            index: n,
                            idx: 0
                        };
                    u.push(c)
                }
                for (var l = "", _ = 0; _ < u.length; _++) _ == u.length - 1 ? l += u[_].id : l = l + u[_].id + "_";
                var m = s.sku_mu_list[l];
                a.setData({
                    sku: u,
                    sku_val: 1,
                    cur_sku_arr: m,
                    skuList: o.skuList,
                    visible: !0,
                    showSku: !0
                })
            } else {
                var h = o;
                a.setData({
                    sku: [],
                    sku_val: 1,
                    skuList: [],
                    cur_sku_arr: h
                });
                var p = {
                    detail: {
                        formId: ""
                    }
                };
                p.detail.formId = "the formId is a mock one", a.gocarfrom(p, i)
            }
        }
    },
    gocarfrom: function(t) {
        var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0;
        wx.showLoading(), a.collectFormIds(t.detail.formId), this.goOrder(i)
    },
    goOrder: function(e) {
        var s = this,
            t = s.data;
        t.can_car && (t.can_car = !1);
        wx.getStorageSync("token");
        var a = wx.getStorageSync("community").communityId,
            d = t.addCar_goodsid,
            i = t.sku_val,
            o = t.cur_sku_arr,
            u = t.list,
            n = "";
        o && o.option_item_ids && (n = o.option_item_ids);
        var r = {
            goods_id: d,
            community_id: a,
            quantity: i,
            sku_str: n,
            buy_type: "dan",
            pin_id: 0,
            is_just_addcar: 1
        };
        util.addCart(r).then(function(t) {
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
                u[e].car_count = t.data.cur_count || 0, s.setData({
                    cartNum: t.data.total || 0,
                    list: u
                }), s.closeSku(), status.indexListCarCount(d, t.data.cur_count), wx.showToast({
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
        console.log(t), wx.showToast({
            title: "不能购买更多啦",
            icon: "none"
        })
    },
    addCart: function(t) {
        var s = t.idx,
            d = this.data.list,
            a = wx.getStorageSync("token"),
            i = wx.getStorageSync("community"),
            u = d[s].actId,
            o = i.communityId,
            n = this;
        if ("plus" == t.type) {
            var e = {
                goods_id: u,
                community_id: o,
                quantity: 1,
                sku_str: "",
                buy_type: "dan",
                pin_id: 0,
                is_just_addcar: 1
            };
            util.addCart(e).then(function(t) {
                if (1 == t.showVipModal) {
                    var a = t.data.pop_vipmember_buyimage;
                    n.triggerEvent("vipModal", {
                        pop_vipmember_buyimage: a,
                        showVipModal: !0,
                        visible: !1
                    })
                } else if (3 == t.data.code) {
                    var i = t.data.max_quantity || "";
                    0 < (d[s].car_count = i) && n.setData({
                        list: d
                    }), wx.showToast({
                        title: t.data.msg,
                        icon: "none",
                        duration: 2e3
                    })
                } else if (6 == t.data.code || 7 == t.data.code) {
                    var o = t.data.max_quantity || "";
                    0 < (d[s].car_count = o) && n.setData({
                        cartNum: t.data.total || 0,
                        list: d
                    });
                    var e = t.data.msg;
                    wx.showToast({
                        title: e,
                        icon: "none",
                        duration: 2e3
                    })
                } else d[s].car_count = t.data.cur_count, n.setData({
                    cartNum: t.data.total || 0,
                    list: d
                }), wx.showToast({
                    title: "已加入购物车",
                    image: "../../images/addShopCart.png"
                }), status.indexListCarCount(u, t.data.cur_count)
            })
        } else app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "car.reduce_car_goods",
                token: a,
                goods_id: u,
                community_id: o,
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
                }) : (d[s].car_count = t.data.cur_count, n.setData({
                    list: d,
                    cartNum: t.data.total || 0
                }), status.indexListCarCount(u, t.data.cur_count))
            }
        })
    }
};