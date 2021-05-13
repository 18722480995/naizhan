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
    vipModal: function(t) {
        this.setData(t.detail)
    },
    authModal: function() {
        return (0 < arguments.length && void 0 !== arguments[0] && arguments[0]).detail && this.setData({
            needAuth: !0
        }), !this.data.needAuth || (this.setData({
            showAuthModal: !this.data.showAuthModal
        }), !1)
    },
    openSku: function(t) {
        if (this.authModal()) {
            var a = this,
                e = t.detail,
                i = e.actId,
                s = e.skuList;
            a.setData({
                addCar_goodsid: i
            });
            var o = s.list || [],
                r = [];
            if (0 < o.length) {
                for (var d = 0; d < o.length; d++) {
                    var u = o[d].option_value[0],
                        n = {
                            name: u.name,
                            id: u.option_value_id,
                            index: d,
                            idx: 0
                        };
                    r.push(n)
                }
                for (var l = "", c = 0; c < r.length; c++) c == r.length - 1 ? l += r[c].id : l = l + r[c].id + "_";
                var h = s.sku_mu_list[l];
                a.setData({
                    sku: r,
                    sku_val: 1,
                    cur_sku_arr: h,
                    skuList: e.skuList,
                    visible: !0,
                    showSku: !0
                })
            } else {
                var _ = e.skuList;
                a.setData({
                    sku: [],
                    sku_val: 1,
                    skuList: [],
                    cur_sku_arr: _
                });
                var p = {
                    detail: {
                        formId: ""
                    }
                };
                p.detail.formId = "the formId is a mock one", a.gocarfrom(p)
            }
        }
    },
    gocarfrom: function(t) {
        wx.showLoading(), a.collectFormIds(t.detail.formId), this.goOrder()
    },
    goOrder: function() {
        var i = this,
            t = i.data;
        t.can_car && (t.can_car = !1);
        wx.getStorageSync("token");
        var a = wx.getStorageSync("community").communityId,
            e = t.addCar_goodsid,
            s = t.sku_val,
            o = t.cur_sku_arr,
            r = "";
        o && o.option_item_ids && (r = o.option_item_ids);
        var d = {
            goods_id: e,
            community_id: a,
            quantity: s,
            sku_str: r,
            buy_type: "integral",
            pin_id: 0,
            is_just_addcar: 1
        };
        util.addCart(d).then(function(t) {
            if (1 == t.showVipModal) {
                var a = t.data.pop_vipmember_buyimage;
                i.triggerEvent("vipModal", {
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
                var e = t.data.msg;
                wx.showToast({
                    title: e,
                    icon: "none",
                    duration: 2e3
                })
            } else {
                i.closeSku(), 3 < getCurrentPages().length ? wx.redirectTo({
                    url: "/lionfish_comshop/pages/order/placeOrder?type=integral"
                }) : wx.navigateTo({
                    url: "/lionfish_comshop/pages/order/placeOrder?type=integral"
                })
            }
        })
    },
    closeSku: function() {
        this.setData({
            visible: !1,
            stopClick: !1
        })
    }
};