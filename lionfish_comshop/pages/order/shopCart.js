
var util = require("../../utils/util.js"),
    status = require("../../utils/index.js"),
    a = require("../../utils/public"),
    app = getApp(),
    addFlag = 1;
Page({
    data: {
        allselect: !1,
        community_id: 0,
        allnum: 0,
        tablebar: 3,
        allcount: "0.00",
        recount: "0.00",
        carts: {},
        isEmpty: !1,
        needAuth: !1,
        cartNum: 0,
        isIpx: !1,
        disAmount: 0,
        totalAmount: 0,
        reduceNum: 0,
        tabIdx: 0,
        updateCart: 0,
        invalidCarts: {},
        tabList: []
    },
    onLoad: function(t) {
        wx.hideTabBar(), wx.showLoading()
    },
    authSuccess: function() {
        wx.reLaunch({
            url: "/lionfish_comshop/pages/order/shopCart"
        })
    },
    authModal: function() {
        this.data.needAuth && this.setData({
            showAuthModal: !this.data.showAuthModal
        })
    },
    onShow: function() {
        var s = this;
        util.check_login_new().then(function(t) {
            if (console.log(t), t) {
                var a = wx.getStorageSync("community").communityId || "";
                s.setData({
                    needAuth: !1,
                    isEmpty: !1,
                    tabbarRefresh: !0,
                    community_id: a,
                    isIpx: app.globalData.isIpx
                }), (0, status.cartNum)("", !0).then(function(t) {
                    0 == t.code && s.setData({
                        cartNum: t.data
                    })
                }), s.showCartGoods()
            } else s.setData({
                needAuth: !0,
                isEmpty: !0
            }), wx.hideLoading()
        })
    },
    showCartGoods: function() {
        var w = this,
            t = wx.getStorageSync("community").communityId;
        console.log("onshow购物车里面的community_id:"), w.setData({
            community_id: t
        });
        var a = wx.getStorageSync("token");
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "car.show_cart_goods",
                token: a,
                community_id: t,
                buy_type: "dan"
            },
            dataType: "json",
            success: function(t) {
                if (setTimeout(function() {
                    wx.hideLoading()
                }, 1e3), 0 == t.data.code) {
                    var a = t.data.mult_carts || [],
                        s = {}, e = w.data.tabIdx,
                        o = !1,
                        r = [{
                            id: 0,
                            name: "团长代收",
                            enabled: !1
                        }, {
                            id: 1,
                            name: "快递直发",
                            enabled: !1
                        }, {
                            id: 2,
                            name: "到店核销",
                            enabled: !1
                        }],
                        c = Object.keys(a),
                        i = c.length;
                    1 < i ? (o = !0, c.forEach(function(t) {
                        r[t].enabled = !0
                    }), s = a[e] || {}) : 1 == i && (s = a[e = c[0]] || {});
                    var n = !0;
                    0 != Object.keys(s).length && (n = !1, s = w.sortCarts(s));
                    var d = t.data,
                        l = d.man_free_tuanzshipping,
                        u = d.delivery_tuanz_money,
                        h = d.is_comunity_rest,
                        p = d.open_man_orderbuy,
                        m = d.man_orderbuy_money,
                        _ = d.is_show_guess_like,
                        g = d.is_open_vipcard_buy,
                        y = d.is_vip_card_member,
                        f = d.vipcard_save_money,
                        v = d.modify_vipcard_name,
                        x = d.is_member_level_buy,
                        k = d.level_save_money,
                        b = !1;
                    1 == g ? 1 != y && 1 == x && (b = !0) : 1 == x && (b = !0), w.setData({
                        carts: s,
                        mult_carts: a,
                        showTab: o,
                        isEmpty: n,
                        is_comunity_rest: h,
                        open_man_orderbuy: p,
                        man_orderbuy_money: 1 * m,
                        is_show_guess_like: _,
                        man_free_tuanzshipping: l,
                        delivery_tuanz_money: u,
                        is_open_vipcard_buy: g,
                        is_vip_card_member: y,
                        vipcard_save_money: f,
                        modify_vipcard_name: v,
                        is_member_level_buy: x,
                        canLevelBuy: b,
                        level_save_money: k,
                        tabList: r
                    }), w.xuan_func()
                } else w.setData({
                    needAuth: !0,
                    isEmpty: !0
                }), wx.hideTabBar()
            }
        })
    },
    onHide: function() {
        this.setData({
            tabbarRefresh: !1
        }), console.log("onHide")
    },
    sortCarts: function(a) {
        var o = 0,
            r = 0,
            c = 0,
            i = 0,
            n = {}, d = 0,
            t = function(s) {
                r = a[s].is_open_fullreduction, c = a[s].full_reducemoney, i = a[s].full_money, n[s] = {
                    id: a[s].id,
                    shopcarts: []
                };
                var t = a[s].shopcarts,
                    e = [];
                t.forEach(function(t, a) {
                    0 == t.can_buy || 0 == t.option_can_buy ? (n[s].shopcarts.push(t), d += 1) : (e.push(t), 1 == t.can_man_jian && o++)
                }), (a[s].shopcarts = e).sort(function(t, a) {
                    return t.can_man_jian < a.can_man_jian ? 1 : t.can_man_jian > a.can_man_jian ? -1 : 0
                })
            };
        for (var s in a) t(s);
        return this.setData({
            reduceNum: o,
            is_open_fullreduction: r,
            full_reducemoney: c,
            full_money: i,
            invalidCarts: n,
            hasInvalid: d
        }), a
    },
    xuan_func: function() {
        var t = 0,
            a = 0,
            s = 1,
            e = !1,
            o = 1,
            r = this.data;
        r.is_open_vipcard_buy, r.is_vip_card_member;
        for (var c in this.data.carts) {
            var i = 0;
            this.data.carts[c].goodstypeselect = 0, this.data.carts[c].goodstype = this.data.carts[c].shopcarts.length;
            for (var n = 0; n < this.data.carts[c].shopcarts.length; n++) {
                var d = this.data.carts[c].shopcarts[n];
                0 == d.isselect && 1 == d.can_buy && 1 == d.can_buy && 1 == d.option_can_buy && (s = 0), d.isselect && 1 == d.can_buy && 1 == d.can_buy && 1 == d.option_can_buy && (o = 0, i = this.calcVipPrice(i, d), this.data.carts[c].goodstypeselect++, t = parseInt(t) + parseInt(d.goodsnum)), 0 == d.can_buy && (d.isselect = !1)
            }
            this.data.carts[c].count = i.toFixed(2), a += i
        }
        1 == s && 0 == o && (e = !0), this.setData({
            allselect: e,
            allnum: t,
            allcount: a.toFixed(2),
            carts: this.data.carts
        }), this.calcAmount()
    },
    edit: function(t) {
        var a = parseInt(t.target.dataset.index);
        this.data.carts[a].caredit = "none", this.data.carts[a].finish = "inline";
        for (var s = 0; s < this.data.carts[a].shopcarts.length; s++) this.data.carts[a].shopcarts[s].edit = "none", this.data.carts[a].shopcarts[s].finish = "inline", this.data.carts[a].shopcarts[s].description = "onedit-description", this.data.carts[a].shopcarts[s].cartype = "block";
        this.setData({
            carts: this.data.carts
        })
    },
    finish: function(t) {
        var a = parseInt(t.target.dataset.index);
        this.data.carts[a].caredit = "inline", this.data.carts[a].finish = "none";
        for (var s = 0; s < this.data.carts[a].shopcarts.length; s++) this.data.carts[a].shopcarts[s].edit = "inline", this.data.carts[a].shopcarts[s].finish = "none", this.data.carts[a].shopcarts[s].description = "description", this.data.carts[a].shopcarts[s].cartype = "inline";
        this.setData({
            carts: this.data.carts
        })
    },
    goLink: function(t) {
        var a = t.currentTarget.dataset.link;
        wx.redirectTo({
            url: a
        })
    },
    goGoods: function(t) {
        var a = t.currentTarget.dataset.type;
        3 < getCurrentPages().length ? wx.redirectTo({
            url: "/Snailfish_shop/pages/goods/index?id=" + a
        }) : wx.navigateTo({
            url: "/Snailfish_shop/pages/goods/index?id=" + a
        })
    },
    shopselect: function(t) {
        var a = parseInt(t.target.dataset.index),
            s = this.data.allselect,
            e = 0,
            o = 0,
            r = 0;
        if (1 == this.data.carts[a].isselect) {
            s = this.data.carts[a].isselect = !1;
            for (var c = 0; c < this.data.carts[a].shopcarts.length; c++) 1 == this.data.carts[a].shopcarts[c].isselect && (this.data.carts[a].shopcarts[c].isselect = !1, e = parseInt(e) + parseInt(this.data.carts[a].shopcarts[c].goodsnum), this.data.carts[a].goodstypeselect = this.data.carts[a].goodstypeselect - 1);
            e = this.data.allnum - e, o = parseFloat(this.data.allcount) - parseFloat(this.data.carts[a].count), this.data.carts[a].count = "0.00", this.setData({
                carts: this.data.carts,
                allnum: e,
                allcount: o.toFixed(2),
                allselect: s
            })
        } else {
            var i = 0;
            this.data.carts[a].isselect = !0;
            for (c = 0; c < this.data.carts[a].shopcarts.length; c++) {
                var n = this.data.carts[a].shopcarts[c];
                0 == n.isselect && (n.isselect = !0, this.data.carts[a].goodstypeselect = this.data.carts[a].goodstypeselect + 1, e = parseInt(e) + parseInt(n.goodsnum), i = this.calcVipPrice(i, n)), r = this.calcVipPrice(r, n)
            }
            e = this.data.allnum + e, o = parseFloat(this.data.allcount) + i, this.data.carts[a].count = r.toFixed(2);
            var d = 1;
            for (var c in this.data.carts) for (var l = 0; l < this.data.carts[c].shopcarts.length; l++) 0 == this.data.carts[c].shopcarts[l].isselect && (d = 0);
            1 == d && (s = !0), this.setData({
                carts: this.data.carts,
                allnum: e,
                allcount: o.toFixed(2),
                allselect: s
            })
        }
        this.go_record()
    },
    goodsselect: function(t) {
        var a = parseInt(t.target.dataset.parentid),
            s = parseInt(t.target.dataset.index),
            e = this.data.allselect,
            o = this.data.carts[a].shopcarts[s];
        if (1 == o.isselect) {
            o.isselect = !1, e && (e = !1), this.data.carts[a].goodstypeselect = parseInt(this.data.carts[a].goodstypeselect) - 1, this.data.carts[a].goodstypeselect <= 0 && (this.data.carts[a].isselect = !1);
            var r = parseInt(this.data.allnum) - parseInt(o.goodsnum),
                c = this.calcVipPrice(this.data.allcount, o, "", "red"),
                i = this.calcVipPrice(this.data.carts[a].count, o, "", "red");
            this.data.carts[a].count = i.toFixed(2), this.setData({
                carts: this.data.carts,
                allnum: r,
                allcount: c.toFixed(2),
                allselect: e
            })
        } else {
            o.isselect = !0, this.data.carts[a].goodstypeselect = parseInt(this.data.carts[a].goodstypeselect) + 1, 0 < this.data.carts[a].goodstypeselect && (this.data.carts[a].isselect = !0);
            var n = 1;
            for (var d in this.data.carts) {
                console.log("in");
                for (var l = 0; l < this.data.carts[d].shopcarts.length; l++) 0 == this.data.carts[d].shopcarts[l].isselect && 1 == this.data.carts[d].shopcarts[l].can_buy && 1 == this.data.carts[d].shopcarts[l].option_can_buy && (n = 0)
            }
            1 == n && (e = !0);
            r = parseInt(this.data.allnum) + parseInt(o.goodsnum), c = this.calcVipPrice(this.data.allcount, o), i = this.calcVipPrice(this.data.carts[a].count, o);
            this.data.carts[a].count = i.toFixed(2), this.setData({
                carts: this.data.carts,
                allnum: r,
                allcount: c.toFixed(2),
                allselect: e
            })
        }
        this.go_record()
    },
    allselect: function(t) {
        var a = this.data.allselect;
        this.data.carts;
        if (a) {
            a = !1;
            var s = 0,
                e = 0;
            for (var o in this.data.carts) for (var r in this.data.carts[o].count = "0.00", this.data.carts[o].isselect = !1, this.data.carts[o].goodstypeselect = 0, this.data.carts[o].shopcarts) this.data.carts[o].shopcarts[r].isselect = !1;
            this.setData({
                carts: this.data.carts,
                allnum: s,
                allcount: e.toFixed(2),
                allselect: a
            })
        } else {
            a = !0;
            s = 0, e = 0;
            for (var o in this.data.carts) {
                var c = 0;
                this.data.carts[o].isselect = !0;
                var i = this.data.carts[o].shopcarts;
                for (var r in this.data.carts[o].goodstypeselect = i.length, i) 1 == i[r].can_buy && 1 == i[r].option_can_buy && (c = this.calcVipPrice(c, i[r]), s = parseInt(s) + parseInt(this.data.carts[o].shopcarts[r].goodsnum), i[r].isselect = !0);
                this.data.carts[o].count = c.toFixed(2), e += c
            }
            this.setData({
                carts: this.data.carts,
                allnum: s,
                allcount: e.toFixed(2),
                allselect: a
            })
        }
        this.go_record()
    },
    regoodsnum: function(t) {
        var a = parseInt(t.currentTarget.dataset.parentid),
            s = parseInt(t.currentTarget.dataset.index),
            e = this.data.updateCart,
            o = this.data.carts[a].shopcarts[s],
            r = this;
        if (1 == o.goodsnum) r.cofirm_del(a, s);
        else if (1 == o.isselect) {
            var c = parseInt(this.data.allnum) - 1,
                i = this.calcVipPrice(r.data.allcount, o, 1, "red"),
                n = this.calcVipPrice(this.data.carts[a].count, o, 1, "red");
            r.data.carts[a].count = n.toFixed(2), o.goodsnum = o.goodsnum - 1, this.setData({
                carts: this.data.carts,
                allnum: c,
                allcount: i.toFixed(2)
            })
        } else o.goodsnum = parseInt(o.goodsnum) - 1, this.setData({
            carts: this.data.carts
        });
        if ("" == o.goodstype) {
            var d = 1 * o.goodsnum,
                l = t.currentTarget.dataset.gid;
            status.indexListCarCount(l, d), r.setData({
                updateCart: e + 1
            })
        }
        r.go_record()
    },
    cofirm_del: function(l, u) {
        2 < arguments.length && void 0 !== arguments[2] && arguments[2];
        var h = this,
            p = this.data.updateCart;
        wx.showModal({
            title: "提示",
            content: "确定删除这件商品吗？",
            confirmColor: "#FF0000",
            success: function(t) {
                if (t.confirm) {
                    var a = h.data.carts[l].shopcarts[u];
                    if ("" == a.goodstype) {
                        var s = a.id;
                        status.indexListCarCount(s, 0), h.setData({
                            updateCart: p + 1
                        })
                    }
                    var e = a.key,
                        o = h.data.reduceNum;
                    if (1 == a.can_man_jian && (o--, h.setData({
                        reduceNum: o
                    }), console.log(o)), 1 == a.isselect) {
                        var r = h.data.allnum - 1,
                            c = h.calcVipPrice(h.data.allcount, a, 1, "red"),
                            i = h.calcVipPrice(h.data.carts[l].count, a, 1, "red");
                        if (h.data.carts[l].count = i.toFixed(2), h.data.carts[l].goodstype = h.data.carts[l].goodstype - 1, h.data.carts[l].goodstypeselect = h.data.carts[l].goodstypeselect - 1, 0 == h.data.carts[l].goodstype) {
                            var n = h.data.carts;
                            delete n[l], 0 == Object.keys(n).length && h.setData({
                                isEmpty: !0
                            })
                        } else h.data.carts[l].shopcarts.splice(u, 1), h.isAllSelect();
                        h.setData({
                            carts: h.data.carts,
                            allnum: r,
                            allcount: c.toFixed(2)
                        })
                    } else {
                        if (h.data.carts[l].goodstype = h.data.carts[l].goodstype - 1, 0 == h.data.carts[l].goodstype) {
                            var d = h.data.carts;
                            delete d[l], 0 == Object.keys(d).length && h.setData({
                                isEmpty: !0
                            })
                        } else h.data.carts[l].shopcarts.splice(u, 1);
                        h.setData({
                            carts: h.data.carts
                        })
                    }
                    h.del_car_goods(e), h.calcAmount()
                } else console.log("取消删除")
            }
        })
    },
    isAllSelect: function() {
        var t = 1,
            a = !1,
            s = this.data.carts,
            e = 0;
        for (var o in s) for (var r = 0; r < s[o].shopcarts.length; r++) 1 == s[o].shopcarts[r].can_buy && 1 == s[o].shopcarts[r].option_can_buy && (e = 1), 0 == s[o].shopcarts[r].isselect && 1 == s[o].shopcarts[r].can_buy && 1 == s[o].shopcarts[r].option_can_buy && (t = 0);
        1 == t && 1 == e && (a = !0), this.setData({
            allselect: a
        })
    },
    addgoodsnum: function(r) {
        if (0 != addFlag) {
            addFlag = 0;
            var c = parseInt(r.currentTarget.dataset.parentid),
                t = parseInt(r.currentTarget.dataset.index),
                i = this,
                n = this.data.carts[c].shopcarts[t],
                a = parseInt(n.max_quantity);
            if (1 == n.isselect) {
                var d = parseInt(this.data.allnum) + 1,
                    s = this.calcVipPrice(this.data.allcount, n, 1),
                    e = this.calcVipPrice(this.data.carts[c].count, n, 1);
                if (i.data.carts[c].count = e.toFixed(2), !(n.goodsnum < a)) {
                    addFlag = 1, n.goodsnum = a, d--;
                    var o = "最多购买" + a + "个";
                    return wx.showToast({
                        title: o,
                        icon: "none",
                        duration: 2e3
                    }), !1
                }
                n.goodsnum = parseInt(n.goodsnum) + 1, this.setData({
                    carts: this.data.carts,
                    allnum: d,
                    allcount: s.toFixed(2)
                })
            } else {
                if (!(parseInt(n.goodsnum) < a)) {
                    addFlag = 1;
                    o = "最多购买" + a + "个";
                    return wx.showToast({
                        title: o,
                        icon: "none",
                        duration: 2e3
                    }), !1
                }
                n.goodsnum = parseInt(n.goodsnum) + 1
            }
            var l = wx.getStorageSync("token"),
                u = [],
                h = [],
                p = (d = this.data.allnum, this.data.carts);
            for (var m in p) for (var _ in p[m].shopcarts) u.push(p[m].shopcarts[_].key), h.push(p[m].shopcarts[_].key + "_" + p[m].shopcarts[_].goodsnum);
            var g = this.data.updateCart || 0;
            app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "car.checkout_flushall",
                    token: l,
                    car_key: u,
                    community_id: i.data.community_id,
                    all_keys_arr: h
                },
                method: "POST",
                dataType: "json",
                success: function(t) {
                    if (0 == t.data.code) {
                        if (i.setData({
                            carts: i.data.carts
                        }), (0, status.cartNum)("", !0).then(function(t) {
                            0 == t.code && i.setData({
                                cartNum: t.data
                            })
                        }), "" == n.goodstype) {
                            var a = 1 * n.goodsnum,
                                s = r.currentTarget.dataset.gid;
                            status.indexListCarCount(s, a), i.setData({
                                updateCart: g + 1
                            })
                        }
                    } else {
                        if (n.goodsnum = parseInt(n.goodsnum) - 1, 1 == n.isselect) {
                            var e = i.calcVipPrice(i.data.allcount, n, 1, "red"),
                                o = i.calcVipPrice(i.data.carts[c].count, n, 1, "red");
                            i.data.carts[c].count = o.toFixed(2), d--, i.setData({
                                allnum: d,
                                allcount: e.toFixed(2)
                            })
                        }
                        i.setData({
                            carts: i.data.carts
                        }), wx.showToast({
                            title: t.data.msg,
                            icon: "none",
                            duration: 2e3
                        })
                    }
                    addFlag = 1, i.calcAmount()
                }
            })
        }
    },
    changeNumber: function(t) {
        if (!(Object.keys(this.data.carts).length <= 0)) {
            wx.hideLoading();
            var e = this,
                o = parseInt(t.currentTarget.dataset.parentid),
                r = parseInt(t.currentTarget.dataset.index),
                a = t.detail.value,
                c = e.count_goods(o, r),
                s = this.data.carts[o].shopcarts[r],
                i = s.goodsnum;
            console.log(a);
            var n = this.data.updateCart || 0;
            if (0 < a) {
                var d = parseInt(s.max_quantity);
                d < a && (a = d, wx.showToast({
                    title: "不能购买更多啦",
                    icon: "none"
                })), s.goodsnum = a, 1 == e.data.carts[o].shopcarts[r].isselect && (c = e.count_goods(o, r)), this.setData({
                    carts: this.data.carts,
                    allnum: c.allnum,
                    allcount: c.allcount
                });
                var l = wx.getStorageSync("token"),
                    u = [],
                    h = [],
                    p = (this.data.allnum, this.data.carts);
                for (var m in p) for (var _ in p[m].shopcarts) u.push(p[m].shopcarts[_].key), h.push(p[m].shopcarts[_].key + "_" + p[m].shopcarts[_].goodsnum);
                app.util.request({
                    url: "entry/wxapp/index",
                    data: {
                        controller: "car.checkout_flushall",
                        token: l,
                        car_key: u,
                        community_id: e.data.community_id,
                        all_keys_arr: h
                    },
                    method: "POST",
                    dataType: "json",
                    success: function(t) {
                        if (0 == t.data.code) {
                            if (e.setData({
                                carts: e.data.carts
                            }), (0, status.cartNum)("", !0).then(function(t) {
                                0 == t.code && e.setData({
                                    cartNum: t.data
                                })
                            }), "" == e.data.carts[o].shopcarts[r].goodstype) {
                                var a = 1 * e.data.carts[o].shopcarts[r].goodsnum,
                                    s = e.data.carts[o].shopcarts[r].id;
                                status.indexListCarCount(s, a), e.setData({
                                    updateCart: n + 1
                                })
                            }
                            e.go_record()
                        } else e.data.carts[o].shopcarts[r].goodsnum = i, 1 == e.data.carts[o].shopcarts[r].isselect && (c = e.count_goods(o, r)), e.setData({
                            carts: e.data.carts,
                            allnum: c.allnum,
                            allcount: c.allcount
                        }), wx.showToast({
                            title: t.data.msg,
                            icon: "none",
                            duration: 2e3
                        })
                    }
                })
            } else {
                wx.hideLoading(), (this.data.carts[o].shopcarts[r].goodsnum = 1) == e.data.carts[o].shopcarts[r].isselect && (c = e.count_goods(o, r)), this.setData({
                    carts: this.data.carts,
                    allnum: c.allnum,
                    allcount: c.allcount
                });
                l = wx.getStorageSync("token"), u = [], h = [], this.data.allnum, p = this.data.carts;
                for (var m in p) for (var _ in p[m].shopcarts) u.push(p[m].shopcarts[_].key), h.push(p[m].shopcarts[_].key + "_" + p[m].shopcarts[_].goodsnum);
                app.util.request({
                    url: "entry/wxapp/index",
                    data: {
                        controller: "car.checkout_flushall",
                        token: l,
                        car_key: u,
                        community_id: e.data.community_id,
                        all_keys_arr: h
                    },
                    method: "POST",
                    dataType: "json",
                    success: function(t) {
                        if (0 == t.data.code) {
                            if (e.setData({
                                carts: e.data.carts
                            }), (0, status.cartNum)("", !0).then(function(t) {
                                0 == t.code && e.setData({
                                    cartNum: t.data
                                })
                            }), "" == e.data.carts[o].shopcarts[r].goodstype) {
                                var a = 1 * e.data.carts[o].shopcarts[r].goodsnum,
                                    s = e.data.carts[o].shopcarts[r].id;
                                status.indexListCarCount(s, a), e.setData({
                                    updateCart: n + 1
                                })
                            }
                            e.go_record()
                        }
                    }
                }), e.cofirm_del(o, r)
            }
        }
    },
    count_goods: function(t, a) {
        var s = this,
            e = this.data.carts,
            o = 0,
            r = 0,
            c = !0,
            i = !1,
            n = void 0;
        try {
            for (var d, l = Object.keys(e)[Symbol.iterator](); !(c = (d = l.next()).done); c = !0) {
                e[d.value].shopcarts.forEach(function(t, a) {
                    t.isselect && (r = s.calcVipPrice(r, t), o += parseInt(t.goodsnum))
                })
            }
        } catch (t) {
            i = !0, n = t
        } finally {
            try {
                !c && l.
                return &&l.
                return ()
            } finally {
                if (i) throw n
            }
        }
        return {
            allnum: o,
            allcount: r.toFixed(2)
        }
    },
    delgoods: function(t) {
        var d = parseInt(t.target.dataset.parentid),
            l = parseInt(t.target.dataset.index),
            u = this;
        wx.showModal({
            title: "提示",
            content: "确定删除这件商品吗？",
            confirmColor: "#FF0000",
            success: function(t) {
                if (t.confirm) {
                    var a = u.data.carts[d].shopcarts[l],
                        s = a.key;
                    if (1 == a.isselect) {
                        var e = parseInt(u.data.allnum) - parseInt(a.goodsnum),
                            o = u.calcVipPrice(u.data.allcount, a, 1, "red"),
                            r = u.calcVipPrice(u.data.carts[d].count, a, 1, "red");
                        u.data.carts[d].count = r.toFixed(2), u.data.carts[d].goodstype = u.data.carts[d].goodstype - 1, u.data.carts[d].goodstypeselect = u.data.carts[d].goodstypeselect - 1, 0 == u.data.carts[d].goodstype && console.log(d), u.data.carts[d].shopcarts.splice(l, 1);
                        for (var c = 0, i = 0; i < u.data.carts.length; i++) for (var n = 0; n < u.data.carts[i].shopcarts.length; n++) c += u.data.carts[i].shopcarts[n].goodsnum;
                        e == c && (u.data.allselect = !0), u.setData({
                            carts: u.data.carts,
                            allnum: e,
                            allcount: o.toFixed(2),
                            allselect: u.data.allselect
                        })
                    } else {
                        u.data.carts[d].goodstype = u.data.carts[d].goodstype - 1, u.data.carts[d].goodstype, u.data.carts[d].shopcarts.splice(l, 1);
                        for (c = 0, i = 0; i < u.data.carts.length; i++) for (n = 0; n < u.data.carts[i].shopcarts.length; n++) c += u.data.carts[i].shopcarts[n].goodsnum;
                        u.data.allnum == c && (u.data.allselect = !0), u.setData({
                            carts: u.data.carts,
                            allselect: u.data.allselect
                        })
                    }
                    0 == u.data.carts[d].shopcarts.length && (delete u.data.carts[d], 0 == Object.keys(u.data.carts).length && u.setData({
                        carts: []
                    })), u.del_car_goods(s)
                }
            }
        }), this.go_record()
    },
    del_car_goods: function(t) {
        var a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
            s = wx.getStorageSync("token"),
            e = this,
            o = this.data.updateCart;
        console.log("del_car_goods:开始");
        var r = wx.getStorageSync("community").communityId;
        console.log("缓存中的：" + r), console.log("使用中的：" + e.data.community_id), app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "car.del_car_goods",
                carkey: t,
                community_id: e.data.community_id,
                token: s
            },
            method: "POST",
            dataType: "json",
            success: function(t) {
                0 == t.data.code && 1 != a && (0, status.cartNum)("", !0).then(function(t) {
                    0 == t.code && e.setData({
                        cartNum: t.data,
                        updateCart: o + 1
                    })
                })
            }
        })
    },
    delete: function(t) {
        var i = parseInt(t.currentTarget.dataset.parentid),
            n = parseInt(t.currentTarget.dataset.index),
            d = t.currentTarget.dataset.islost || 0,
            l = this;
        wx.showModal({
            title: "提示",
            content: "确认删除这件商品吗？",
            confirmColor: "#FF0000",
            success: function(t) {
                if (t.confirm) if (1 == d) {
                    var a = l.data,
                        s = a.hasInvalid,
                        e = a.invalidCarts;
                    console.log(i);
                    var o = e[i].shopcarts[n].key;
                    e[i].shopcarts.splice(n, 1), s -= 1, l.setData({
                        invalidCarts: e,
                        hasInvalid: s
                    }), l.del_car_goods(o, 1)
                } else {
                    var r = l.data.carts,
                        c = r[i].shopcarts[n].key;
                    r[i].shopcarts.splice(n, 1), l.setData({
                        carts: r
                    }), 0 == r[i].shopcarts.length && (delete r[i], 0 == Object.keys(r).length && l.setData({
                        carts: {}
                    })), l.del_car_goods(c)
                }
            }
        })
    },
    clearlose: function() {
        var e = this;
        wx.showModal({
            title: "提示",
            content: "确认清空失效商品吗？",
            confirmColor: "#FF0000",
            success: function(t) {
                if (t.confirm) {
                    var a = e.data.invalidCarts;
                    for (var s in a) {
                        a[s].shopcarts.forEach(function(t) {
                            var a = t.key;
                            e.del_car_goods(a, 1)
                        })
                    }
                    e.setData({
                        hasInvalid: 0,
                        invalidCarts: {}
                    })
                }
            }
        })
    },
    go_record: function() {
        var a = this,
            t = wx.getStorageSync("token"),
            s = [],
            e = [],
            o = (this.data.allnum, this.data.carts);
        for (var r in o) for (var c in o[r].shopcarts) o[r].shopcarts[c].isselect && s.push(o[r].shopcarts[c].key), e.push(o[r].shopcarts[c].key + "_" + o[r].shopcarts[c].goodsnum);
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "car.checkout_flushall",
                token: t,
                car_key: s,
                community_id: a.data.community_id,
                all_keys_arr: e
            },
            method: "POST",
            dataType: "json",
            success: function(t) {
                0 == t.data.code ? (0, status.cartNum)("", !0).then(function(t) {
                    0 == t.code && a.setData({
                        cartNum: t.data
                    })
                }) : wx.showToast({
                    title: t.data.msg,
                    icon: "none",
                    duration: 2e3
                })
            }
        }), a.calcAmount()
    },
    toorder: function() {
        var t = wx.getStorageSync("token"),
            a = [],
            s = [],
            e = this;
        if (0 < this.data.allnum) {
            var o = this.data.carts;
            for (var r in o) for (var c in o[r].shopcarts) o[r].shopcarts[c].isselect && a.push(o[r].shopcarts[c].key), s.push(o[r].shopcarts[c].key + "_" + o[r].shopcarts[c].goodsnum);
            app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "car.checkout_flushall",
                    token: t,
                    community_id: e.data.community_id,
                    car_key: a,
                    all_keys_arr: s
                },
                method: "POST",
                dataType: "json",
                success: function(t) {
                    if (0 == t.data.code) {
                        var a = t.data.data || 0;
                        wx.navigateTo({
                            url: "/lionfish_comshop/pages/order/placeOrder?type=dan&is_limit=" + a
                        })
                    } else e.showCartGoods(), wx.showToast({
                        title: t.data.msg,
                        icon: "none",
                        duration: 2e3
                    })
                }
            })
        } else wx.showModal({
            title: "提示",
            content: "请选择您要购买的商品",
            confirmColor: "#FF0000",
            success: function(t) {
                t.confirm
            }
        })
    },
    goindex: function() {
        wx.switchTab({
            url: "/lionfish_comshop/pages/index/index"
        })
    },
    calcAmount: function() {
        var t = this.data,
            o = t.is_open_vipcard_buy,
            r = t.is_vip_card_member,
            c = t.carts,
            i = t.delivery_tuanz_money,
            n = t.man_free_tuanzshipping,
            a = t.vipcard_save_money,
            d = t.canLevelBuy,
            s = t.level_save_money,
            e = t.allcount,
            l = 0,
            u = 0,
            h = 0,
            p = Object.getOwnPropertyNames(c),
            m = [],
            _ = 0,
            g = 0,
            y = 0,
            f = 0,
            v = 0;
        p.forEach(function(t, a) {
            var s = c[t];
            if (0 == (s.is_open_fullreduction || 0)) return !1;
            var e = s.shopcarts;
            _ = 1 * s.full_money, g = 1 * s.full_reducemoney, e.forEach(function(t) {
                t.isselect && t.can_man_jian && m.push(t), t.isselect && 0 < n && 0 < i && (1 == o && 1 == r && 1 == t.is_take_vipcard ? x += t.card_price * t.goodsnum * 1 : d && 1 == t.is_mb_level_buy ? x += t.levelprice * t.goodsnum * 1 : x += t.currntprice * t.goodsnum * 1), 1 == o && 1 == r && 1 == t.is_take_vipcard && t.isselect && (f += (t.currntprice - t.card_price) * t.goodsnum * 1), 1 == d && 1 == t.is_mb_level_buy && t.isselect && (v += (t.currntprice - t.levelprice) * t.goodsnum * 1)
            })
        });
        var x = 0;
        m.forEach(function(t) {
            t.isselect && t.can_man_jian && (1 == o && 1 == r && 1 == t.is_take_vipcard ? x += t.card_price * t.goodsnum * 1 : d && 1 == t.is_mb_level_buy ? x += t.levelprice * t.goodsnum * 1 : x += t.currntprice * t.goodsnum * 1)
        }), _ <= x ? u += g : h = _ - x, l = (1 * e - u).toFixed(2), 1 == o && 1 == r ? l = (l - 1 * a).toFixed(2) : d && (l = (l - 1 * s).toFixed(2));
        var k = 1 * (l = l <= 0 ? 0 : l) - this.data.man_orderbuy_money,
            b = 1 * e - f,
            w = 1 * e - v;
        console.log("deliveryGoodsTot", y);
        var D = 0;
        (y = l) < 1 * n && (D = 1 * n - y), this.setData({
            totalAmount: l,
            disAmount: u.toFixed(2),
            diffMoney: h.toFixed(2),
            canbuy_other: k.toFixed(2),
            diffDeliveryMoney: D.toFixed(2),
            vipFee: f.toFixed(2),
            vipTotal: b.toFixed(2),
            levelFee: v.toFixed(2),
            levelToTal: w.toFixed(2)
        })
    },
    calcVipPrice: function(t, a) {
        var s = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
            e = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "add",
            o = this.data,
            r = (o.is_open_vipcard_buy, o.is_vip_card_member, o.canLevelBuy, 0 < s ? s : parseFloat(a.goodsnum));
        return "red" === e && (r *= -1), (t = parseFloat(t)) + parseFloat(a.currntprice) * r
    },
    openSku: function(t) {
        var a = t.detail,
            s = a.actId,
            e = a.skuList;
        this.setData({
            addCar_goodsid: s
        });
        var o = e.list || [],
            r = [];
        if (0 < o.length) {
            for (var c = 0; c < o.length; c++) {
                var i = o[c].option_value[0],
                    n = {
                        name: i.name,
                        id: i.option_value_id,
                        index: c,
                        idx: 0
                    };
                r.push(n)
            }
            for (var d = "", l = 0; l < r.length; l++) l == r.length - 1 ? d += r[l].id : d = d + r[l].id + "_";
            var u = e.sku_mu_list[d];
            this.setData({
                sku: r,
                sku_val: 1,
                cur_sku_arr: u,
                skuList: a.skuList,
                visible: !0,
                showSku: !0
            })
        } else {
            var h = a.allData;
            this.setData({
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
            p.detail.formId = "the formId is a mock one", this.gocarfrom(p)
        }
    },
    gocarfrom: function(t) {
        wx.showLoading(), a.collectFormIds(t.detail.formId), this.goOrder()
    },
    goOrder: function() {
        var o = this;
        o.data.can_car && (o.data.can_car = !1);
        wx.getStorageSync("token");
        var t = wx.getStorageSync("community"),
            r = o.data.addCar_goodsid,
            a = t.communityId,
            s = o.data.sku_val,
            e = o.data.cur_sku_arr,
            c = "",
            i = o.data.updateCart;
        e && e.option_item_ids && (c = e.option_item_ids);
        var n = {
            goods_id: r,
            community_id: a,
            quantity: s,
            sku_str: c,
            buy_type: "dan",
            pin_id: 0,
            is_just_addcar: 1
        };
        util.addCart(n).then(function(t) {
            if (1 == t.showVipModal) {
                var a = t.data.pop_vipmember_buyimage;
                wx.hideLoading(), o.setData({
                    pop_vipmember_buyimage: a,
                    showVipModal: !0,
                    visible: !1
                })
            } else if (3 == t.data.code || 7 == t.data.code) wx.showToast({
                title: t.data.msg,
                icon: "none",
                duration: 2e3
            });
            else if (4 == t.data.code) wx.showToast({
                title: "您未登录",
                duration: 2e3,
                success: function() {
                    o.setData({
                        needAuth: !0,
                        isEmpty: !0
                    })
                }
            });
            else if (6 == t.data.code) {
                var s = t.data.max_quantity || "";
                0 < s && o.setData({
                    sku_val: s,
                    updateCart: i + 1
                });
                var e = t.data.msg;
                wx.showToast({
                    title: e,
                    icon: "none",
                    duration: 2e3
                })
            } else o.closeSku(), o.showCartGoods(), status.indexListCarCount(r, t.data.cur_count), (0, status.cartNum)(t.data.total), o.setData({
                cartNum: t.data.total,
                updateCart: i + 1
            }), wx.showToast({
                title: "已加入购物车",
                image: "../../images/addShopCart.png"
            })
        }).
        catch (function(t) {
            app.util.message(t || "请求失败", "", "error")
        })
    },
    selectSku: function(t) {
        var a = t.currentTarget.dataset.type.split("_"),
            s = this.data.sku,
            e = {
                name: a[3],
                id: a[2],
                index: a[0],
                idx: a[1]
            };
        s.splice(a[0], 1, e), this.setData({
            sku: s
        });
        for (var o = "", r = 0; r < s.length; r++) r == s.length - 1 ? o += s[r].id : o = o + s[r].id + "_";
        var c = this.data.skuList.sku_mu_list[o];
        this.setData({
            cur_sku_arr: c
        })
    },
    setNum: function(t) {
        var a = t.currentTarget.dataset.type,
            s = 1,
            e = 1 * this.data.sku_val;
        "add" == a ? s = e + 1 : "decrease" == a && 1 < e && (s = e - 1);
        var o = this.data.sku,
            r = this.data.skuList;
        if (0 < o.length) for (var c = "", i = 0; i < o.length; i++) i == o.length - 1 ? c += o[i].id : c = c + o[i].id + "_";
        0 < r.length ? s > r.sku_mu_list[c].canBuyNum && (s -= 1) : s > this.data.cur_sku_arr.canBuyNum && (s -= 1);
        this.setData({
            sku_val: s
        })
    },
    skuConfirm: function() {
        this.closeSku(), (0, status.cartNum)().then(function(t) {
            0 == t.code && that.setData({
                cartNum: t.data
            })
        })
    },
    closeSku: function() {
        this.setData({
            visible: 0,
            stopClick: !1
        })
    },
    changeTabs: function(t) {
        var a = this,
            s = t.currentTarget.dataset.idx || 0,
            e = this.data,
            o = e.tabIdx,
            r = e.carts,
            c = e.mult_carts;
        if (o != s) {
            c[o] = r, r = c[s];
            var i = !0;
            0 != Object.keys(r).length && (i = !1), this.setData({
                tabIdx: s,
                mult_carts: c,
                isEmpty: i,
                carts: r
            }, function() {
                a.xuan_func()
            })
        }
    },
    vipModal: function(t) {
        this.setData(t.detail)
    }
});