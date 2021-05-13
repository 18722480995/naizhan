var app = getApp(),
    util = require("../../utils/util.js"),
    a = require("../../utils/public"),
    status = require("../../utils/index.js");
Page({
    data: {
        cartNum: 0,
        showEmpty: !1,
        showLoadMore: !0,
        rushList: [],
        needAuth: !1
    },
    pageNum: 1,
    keyword: "",
    type: 0,
    good_ids: "",
    gid: 0,
    onLoad: function(t) {
        wx.showLoading(), this.keyword = t.keyword || "", this.type = t.type || 0, this.good_ids = t.good_ids || "", this.gid = t.gid || 0, this.getData()
    },
    onShow: function() {
        var e = this;
        util.check_login_new().then(function(t) {
            var a = !t;
            e.setData({
                needAuth: a
            }), t && (0, status.cartNum)("", !0).then(function(t) {
                0 == t.code && e.setData({
                    cartNum: t.data
                })
            })
        })
    },
    vipModal: function(t) {
        this.setData(t.detail)
    },
    getData: function() {
        if (!this.hasRefeshin) {
            this.hasRefeshin = !0;
            var o = this;
            o.setData({
                showLoadMore: !0,
                loadMore: !0,
                loadText: "加载中"
            });
            var t = wx.getStorageSync("token"),
                a = wx.getStorageSync("community"),
                e = this.keyword,
                s = this.type,
                i = this.good_ids,
                d = this.gid;
            app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "index.load_condition_goodslist",
                    token: t,
                    pageNum: o.pageNum,
                    head_id: a.communityId,
                    keyword: e,
                    type: s,
                    good_ids: i,
                    gid: d
                },
                dataType: "json",
                success: function(t) {
                    if (0 == t.data.code) {
                        var a = o.data.rushList.concat(t.data.list),
                            e = Date.parse(new Date) / 1e3;
                        for (var s in a) a[s].end_time < e && (a[s].actEnd = !0);
                        var i = {
                            full_money: t.data.full_money,
                            full_reducemoney: t.data.full_reducemoney,
                            is_open_fullreduction: t.data.is_open_fullreduction
                        };
                        o.pageNum += 1, o.hasRefeshin = !1, o.setData({
                            showLoadMore: !1,
                            rushList: a,
                            loadMore: !1,
                            cur_time: t.data.cur_time,
                            reduction: i
                        }), 0 == o.data.rushList.length && o.setData({
                            showEmpty: !0
                        })
                    } else 1 == t.data.code ? (1 == o.pageNum && 0 == o.data.rushList.length && o.setData({
                        showEmpty: !0
                    }), o.setData({
                        showLoadMore: !0,
                        loadMore: !1,
                        loadText: "没有更多了"
                    }), o.hasRefeshin = !0) : 2 == t.data.code && o.setData({
                        needAuth: !0
                    })
                },
                complete: function() {
                    wx.hideLoading()
                }
            })
        }
    },
    authSuccess: function() {
        var t = this;
        this.pageNum = 1, this.setData({
            showEmpty: !1,
            showLoadMore: !0,
            rushList: [],
            needAuth: !1
        }, function() {
            t.getData()
        })
    },
    authModal: function(t) {
        t.detail && this.setData({
            needAuth: !0
        }), this.data.needAuth && this.setData({
            showAuthModal: !this.data.showAuthModal
        })
    },
    openSku: function(t) {
        var a = this,
            e = t.detail,
            s = e.actId,
            i = e.skuList;
        a.setData({
            addCar_goodsid: s
        });
        var o = i.list || [],
            d = [];
        if (0 < o.length) {
            for (var u = 0; u < o.length; u++) {
                var n = o[u].option_value[0],
                    r = {
                        name: n.name,
                        id: n.option_value_id,
                        index: u,
                        idx: 0
                    };
                d.push(r)
            }
            for (var h = "", c = 0; c < d.length; c++) c == d.length - 1 ? h += d[c].id : h = h + d[c].id + "_";
            var l = i.sku_mu_list[h];
            a.setData({
                sku: d,
                sku_val: 1,
                cur_sku_arr: l,
                skuList: e.skuList,
                visible: !0,
                showSku: !0
            })
        } else {
            var _ = e.allData;
            a.setData({
                sku: [],
                sku_val: 1,
                skuList: [],
                cur_sku_arr: _
            });
            var g = {
                detail: {
                    formId: ""
                }
            };
            g.detail.formId = "the formId is a mock one", a.gocarfrom(g)
        }
    },
    gocarfrom: function(t) {
        wx.showLoading(), a.collectFormIds(t.detail.formId), this.goOrder()
    },
    goOrder: function() {
        var i = this;
        i.data.can_car && (i.data.can_car = !1);
        wx.getStorageSync("token");
        var t = wx.getStorageSync("community"),
            a = i.data.addCar_goodsid,
            e = t.communityId,
            s = i.data.sku_val,
            o = i.data.cur_sku_arr,
            d = "";
        o && o.option_item_ids && (d = o.option_item_ids);
        var u = {
            goods_id: a,
            community_id: e,
            quantity: s,
            sku_str: d,
            buy_type: "dan",
            pin_id: 0,
            is_just_addcar: 1
        };
        util.addCart(u).then(function(t) {
            if (1 == t.showVipModal) {
                var a = t.data.pop_vipmember_buyimage;
                wx.hideLoading(), i.setData({
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
                    i.setData({
                        needAuth: !0
                    })
                }
            });
            else if (6 == t.data.code) {
                var e = t.data.msg,
                    s = t.data.max_quantity || "";
                0 < s && i.setData({
                    sku_val: s
                }), wx.showToast({
                    title: e,
                    icon: "none",
                    duration: 2e3
                })
            } else {
                i.closeSku(), (0, status.cartNum)(t.data.total), i.setData({
                    cartNum: t.data.total
                }), wx.showToast({
                    title: "已加入购物车",
                    image: "../../images/addShopCart.png"
                })
            }
        }).
        catch (function(t) {
            app.util.message(t || "请求失败", "", "error")
        })
    },
    selectSku: function(t) {
        var a = t.currentTarget.dataset.type.split("_"),
            e = this.data.sku,
            s = {
                name: a[3],
                id: a[2],
                index: a[0],
                idx: a[1]
            };
        e.splice(a[0], 1, s), this.setData({
            sku: e
        });
        for (var i = "", o = 0; o < e.length; o++) o == e.length - 1 ? i += e[o].id : i = i + e[o].id + "_";
        var d = this.data.skuList.sku_mu_list[i];
        this.setData({
            cur_sku_arr: d
        }), console.log(i)
    },
    setNum: function(t) {
        var a = t.currentTarget.dataset.type,
            e = 1,
            s = 1 * this.data.sku_val;
        "add" == a ? e = s + 1 : "decrease" == a && 1 < s && (e = s - 1);
        var i = this.data.sku,
            o = this.data.skuList;
        if (0 < i.length) for (var d = "", u = 0; u < i.length; u++) u == i.length - 1 ? d += i[u].id : d = d + i[u].id + "_";
        0 < o.length ? e > o.sku_mu_list[d].canBuyNum && (e -= 1) : e > this.data.cur_sku_arr.canBuyNum && (e -= 1);
        this.setData({
            sku_val: e
        })
    },
    closeSku: function() {
        this.setData({
            visible: 0,
            stopClick: !1
        })
    },
    changeCartNum: function(t) {
        var a = t.detail;
        (0, status.cartNum)(this.setData({
            cartNum: a
        }))
    },
    onReachBottom: function() {
        console.log("这是我的底线"), this.getData()
    }
});