
var _extends = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var a = arguments[t];
            for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i])
        }
        return e
    }, app = getApp(),
    locat = require("../../utils/Location.js"),
    util = require("../../utils/util.js"),
    status = require("../../utils/index.js"),
    wcache = require("../../utils/wcache.js");
Page({
    data: {
        payBtnLoading: !1,
        showConfirmModal: !1,
        receiverAddress: "",
        tuan_send_address: "",
        showGetPhone: !1,
        lou_meng_hao: "",
        pickUpAddress: "",
        disUserName: "",
        pickUpCommunityName: "",
        is_limit_distance_buy: 0,
        tabList: [{
            id: 0,
            name: "到点自提",
            dispatching: "pickup",
            enabled: !1
        }, {
            id: 1,
            name: "免费配送",
            dispatching: "tuanz_send",
            enabled: !1
        }, {
            id: 2,
            name: "快递配送",
            dispatching: "express",
            enabled: !1
        }],
        originTabList: [{
            id: 0,
            name: "到点自提",
            dispatching: "pickup"
        }, {
            id: 1,
            name: "免费配送",
            dispatching: "tuanz_send"
        }, {
            id: 2,
            name: "快递配送",
            dispatching: "express"
        }],
        tabIdx: 0,
        region: ["选择地址", "", ""],
        tot_price: 0,
        needAuth: !1,
        reduce_money: 0,
        hide_quan: !0,
        tuan_region: ["选择地址", "", ""],
        groupInfo: {
            group_name: "社区",
            owner_name: "团长",
            placeorder_tuan_name: "配送费",
            placeorder_trans_name: "快递费"
        },
        comment: "",
        is_yue_open: 0,
        can_yupay: 0,
        ck_yupay: 0,
        use_score: 0,
        commentArr: {}
    },
    canPay: !0,
    canPreSub: !0,
    onLoad: function(e) {
        var F = this;
        status.setGroupInfo().then(function(e) {
            F.setData({
                groupInfo: e
            })
        });
        var t = wx.getStorageSync("token"),
            a = wx.getStorageSync("community"),
            i = a.communityId;
        util.check_login() ? this.setData({
            needAuth: !1
        }) : (this.setData({
            needAuth: !0
        }), wx.hideTabBar());
        var o = e.is_limit || 0;
        this.setData({
            buy_type: e.type || "",
            soli_id: e.soli_id || "",
            pickUpAddress: a.fullAddress || "",
            pickUpCommunityName: a.communityName || "",
            disUserName: a.disUserName || ""
        }), wx.showLoading();
        var s = wx.getStorageSync("latitude2"),
            n = wx.getStorageSync("longitude2");

        function r() {
            app.util.request({
                url: "entry/wxapp/user",
                data: {
                    controller: "car.checkout",
                    token: t,
                    community_id: i,
                    buy_type: e.type,
                    soli_id: e.soli_id
                },
                dataType: "json",
                method: "POST",
                success: function(e) {
                    setTimeout(function() {
                        wx.hideLoading()
                    }, 1e3);
                    var t = e.data,
                        a = 0,
                        i = 0,
                        o = F.data.tabList,
                        s = [],
                        n = e.data,
                        r = n.delivery_express_name,
                        d = n.delivery_tuanzshipping_name,
                        c = n.delivery_ziti_name,
                        _ = n.delivery_diy_sort,
                        u = n.delivery_type_express,
                        l = n.delivery_type_tuanz,
                        h = n.delivery_type_ziti,
                        p = n.delivery_tuanz_money,
                        m = n.is_vip_card_member,
                        y = n.vipcard_save_money,
                        g = n.level_save_money,
                        f = n.is_open_vipcard_buy,
                        v = n.is_member_level_buy,
                        b = n.total_integral,
                        x = n.is_need_subscript,
                        w = n.need_subscript_template,
                        S = n.is_hexiao,
                        A = !1;
                    if (1 == f ? 1 != m && 1 == v && (A = !0) : 1 == v && (A = !0), 1 == u && (o[2].enabled = !0, i++), 1 == l && (o[1].enabled = !0, i++), 1 == h && (o[0].enabled = !0, i++), _) {
                        var k = _.split(",");
                        k[2] && o[k[2]] && o[k[2]].enabled && (a = k[2]), k[1] && o[k[1]] && o[k[1]].enabled && (a = k[1]), k[0] && o[k[0]] && o[k[0]].enabled && (a = k[0]), k.forEach(function(e) {
                            s.push(o[e])
                        })
                    }
                    r && (o[2].name = r), d && (o[1].name = d), c && (o[0].name = c);
                    1 == a || 2 == a && t.trans_free_toal;
                    var T = 0,
                        D = 0,
                        P = t.seller_goodss,
                        z = (Object.keys(P).length, {});
                    for (var I in P) z[I] = "";
                    var L = "";
                    for (var O in P) for (var j in 1 == P[O].show_voucher && (P[O].chose_vouche.id && (T = P[O].chose_vouche.id), P[O].chose_vouche.store_id && (D = P[O].chose_vouche.store_id), "[object Object]" == Object.prototype.toString.call(P[O].chose_vouche) && (L = P[O].chose_vouche)), P[O].goodsnum = Object.keys(P[O].goods).length, P[O].goods) 0 < P[O].goods[j].header_disc && P[O].goods[j].header_disc < 100 && (P[O].goods[j].header_disc = (P[O].goods[j].header_disc / 10).toFixed(1));
                    var N = {
                        is_hexiao: S,
                        loadover: !0,
                        commentArr: z,
                        sel_chose_vouche: L,
                        tabList: s,
                        is_limit_distance_buy: t.is_limit_distance_buy || 0,
                        tabIdx: a,
                        tabLength: i,
                        tuan_send_address: t.tuan_send_address,
                        is_open_order_message: t.is_open_order_message,
                        is_yue_open: t.is_yue_open,
                        can_yupay: t.can_yupay,
                        show_voucher: t.show_voucher,
                        current_distance: t.current_distance || "",
                        man_free_tuanzshipping: 1 * t.man_free_tuanzshipping || 0,
                        man_free_shipping: 1 * t.man_free_shipping || 0,
                        index_hide_headdetail_address: t.index_hide_headdetail_address || 0,
                        open_score_buy_score: t.open_score_buy_score || 0,
                        score: t.score || 0,
                        score_for_money: t.score_for_money || 0,
                        bue_use_score: t.bue_use_score || 0,
                        is_man_delivery_tuanz_fare: t.is_man_delivery_tuanz_fare,
                        fare_man_delivery_tuanz_fare_money: t.fare_man_delivery_tuanz_fare_money,
                        is_man_shipping_fare: t.is_man_shipping_fare,
                        fare_man_shipping_fare_money: t.fare_man_shipping_fare_money,
                        is_vip_card_member: m,
                        vipcard_save_money: y,
                        level_save_money: g,
                        is_open_vipcard_buy: f,
                        is_member_level_buy: v,
                        canLevelBuy: A,
                        total_integral: b || "",
                        is_need_subscript: x,
                        need_subscript_template: w
                    }, q = t.address,
                        C = t.tuan_send_address_info,
                        M = C.address || "选择位置";
                    "" != C.city_name && 3708 != C.city_id && "" != C.country_name && 3708 != C.country_id || (M = "选择位置"), N.tabAddress = [{
                        name: t.ziti_name || "",
                        mobile: t.ziti_mobile || ""
                    }, {
                        name: C.name || "",
                        mobile: C.telephone || "",
                        receiverAddress: M,
                        lou_meng_hao: C.lou_meng_hao || "",
                        region: [C.province_name || "", C.city_name || "", C.country_name || ""]
                    }, {
                        name: q.name || "",
                        mobile: q.telephone || "",
                        receiverAddress: q.address || "",
                        region: [q.province_name || "选择地址", q.city_name || "", q.country_name || ""]
                    }], F.setData(_extends({}, N, {
                        pick_up_time: e.data.pick_up_time,
                        pick_up_type: e.data.pick_up_type,
                        pick_up_weekday: e.data.pick_up_weekday,
                        addressState: !0,
                        is_integer: e.data.is_integer,
                        is_ziti: e.data.is_ziti,
                        pick_up_arr: e.data.pick_up_arr,
                        seller_goodss: e.data.seller_goodss,
                        seller_chose_id: T,
                        seller_chose_store_id: D,
                        goods: e.data.goods,
                        buy_type: e.data.buy_type,
                        yupay: e.data.can_yupay,
                        is_yue_open: e.data.is_yue_open,
                        yu_money: e.data.yu_money,
                        total_free: e.data.total_free,
                        trans_free_toal: e.data.trans_free_toal,
                        delivery_tuanz_money: e.data.delivery_tuanz_money,
                        reduce_money: e.data.reduce_money,
                        is_open_fullreduction: e.data.is_open_fullreduction,
                        cha_reduce_money: e.data.cha_reduce_money
                    }), function() {
                        F.calcPrice()
                    })
                }
            })
        }
        1 == o && s && n && console.log("---------is here ?-----------"), r()
    },
    authSuccess: function() {
        this.onLoad()
    },
    getReceiveMobile: function(e) {
        var t = e.detail;
        this.setData({
            t_ziti_mobile: t,
            showGetPhone: !1
        })
    },
    ck_wxpays: function() {
        this.setData({
            ck_yupay: 0
        })
    },
    ck_yupays: function() {
        this.setData({
            ck_yupay: 1
        })
    },
    scoreChange: function(e) {
        console.log("是否使用", e.detail.value);
        var t = this.data,
            a = 1 * t.score_for_money,
            i = 1 * t.tot_price,
            o = 1 * t.disAmount;
      console.log("score_for_money", a);
      console.log("tot_price", i);
      console.log("disAmount", o);    
        e.detail.value ? (i = (i - a).toFixed(2), o += a) : (i = (i + a).toFixed(2), o -= a), this.setData({
            use_score: e.detail.value ? 1 : 0,
            tot_price: i,
            disAmount: o.toFixed(2)
        })
    },
    needAuth: function() {
        this.setData({
            needAuth: !0
        })
    },
    close: function() {
        this.setData({
            showGetPhone: !1
        })
    },
    goOrderfrom: function() {
        var e = this.data,
            t = e.tabAddress,
            a = e.tabIdx,
            i = t[a].name,
            o = t[a].mobile,
            s = t[a].receiverAddress,
            n = t[a].region,
            r = t[a].receiverAddress,
            d = t[a].lou_meng_hao;
        if ("" == i) {
            this.setData({
                focus_name: !0
            });
            var c = "请填写收货人";
            return 0 == a && (c = "请填写提货人"), wx.showToast({
                title: c,
                icon: "none"
            }), !1
        }
        if ("" == o || !/^1(3|4|5|6|7|8|9)\d{9}$/.test(o)) return this.setData({
            focus_mobile: !0
        }), wx.showToast({
            title: "手机号码有误",
            icon: "none"
        }), !1;
        if (2 == a && "选择地址" == n[0]) return wx.showToast({
            title: "请选择所在地区",
            icon: "none"
        }), !1;
        if (2 == a && "" == s) return this.setData({
            focus_addr: !0
        }), wx.showToast({
            title: "请填写详细地址",
            icon: "none"
        }), !1;
        if (1 == a) {
            if ("选择位置" == r || "" == r) return wx.showToast({
                title: "请选择位置",
                icon: "none"
            }), !1;
            if ("" == d) return wx.showToast({
                title: "输入楼号门牌",
                icon: "none"
            }), !1
        }
        2 == a ? this.preSubscript() : this.conformOrder()
    },
    preSubscript: function() {
        var e = this;
        this.canPreSub && (this.canPreSub = !1, 1 == this.data.is_need_subscript ? this.subscriptionNotice().then(function() {
            e.prepay()
        }).
        catch (function() {
            e.prepay()
        }) : e.prepay())
    },
    prepay: function() {
        this.canPreSub = !0;
        var e = this.data,
            t = e.tabAddress,
            a = e.tabIdx;
        if (1 == e.is_limit_distance_buy && 1 == a) return wx.showModal({
            title: "提示",
            content: "离团长太远了，暂不支持下单",
            showCancel: !1,
            confirmColor: "#F75451"
        }), !1;
        if (this.canPay) {
            this.setData({
                payBtnLoading: !0
            }), this.canPay = !1;
            var o = this,
                i = this.data,
                s = wx.getStorageSync("token"),
                n = this.data,
                r = n.seller_chose_id,
                d = n.seller_chose_store_id,
                c = n.ck_yupay,
                _ = n.tabList,
                u = r,
                l = "";
            _.forEach(function(e) {
                e.id == a && (l = e.dispatching)
            });
            var h = i.commentArr,
                p = [];
            for (var m in h) p.push(h[m]);
            var y = p.join("@EOF@"),
                g = t[a].receiverAddress || "",
                f = t[a].region || [],
                v = t[a].name,
                b = t[a].mobile,
                x = t[a].lou_meng_hao || "",
                w = [];
            if (0 < u) {
                var S = d + "_" + u;
                w.push(S)
            }
            var A = "",
                k = "",
                T = "",
                D = "",
                P = "",
                z = "";
            1 == a ? (A = g, D = (k = f)[0], P = k[1], z = k[2]) : 2 == a && (T = g, D = f[0], P = f[1], z = f[2]);
            var I = wx.getStorageSync("community").communityId,
                L = wx.getStorageSync("latitude2"),
                O = wx.getStorageSync("longitude2"),
                j = this.data,
                N = j.use_score,
                q = j.buy_type,
                C = j.soli_id;
            wx.showLoading(), app.util.request({
                url: "entry/wxapp/user",
                data: {
                    controller: "car.sub_order",
                    token: s,
                    pay_method: "wxpay",
                    buy_type: q,
                    pick_up_id: I,
                    dispatching: l,
                    ziti_name: v,
                    quan_arr: w,
                    comment: y,
                    ziti_mobile: b,
                    latitude: L,
                    longitude: O,
                    ck_yupay: c,
                    tuan_send_address: A,
                    lou_meng_hao: x,
                    address_name: T,
                    province_name: D,
                    city_name: P,
                    country_name: z,
                    use_score: N,
                    soli_id: C
                },
                dataType: "json",
                method: "POST",
                success: function(t) {
                    wx.hideLoading();
                    var e = t.data.has_yupay || 0,
                        a = t.data.order_id,
                        i = {};
                    console.log("支付日志：", t), 0 == t.data.code ? (o.changeIndexList(), 1 == e ? (o.canPay = !0, "dan" == q || "pindan" == q || "integral" == q || "soitaire" == q ? t.data.is_go_orderlist <= 1 ? wx.redirectTo({
                        url: "/lionfish_comshop/pages/order/order?id=" + a + "&is_show=1"
                    }) : wx.redirectTo({
                        url: "/lionfish_comshop/pages/order/index?is_show=1"
                    }) : wx.redirectTo({
                        url: "/lionfish_comshop/moduleA/pin/share?id=" + a
                    })) : wx.requestPayment({
                        appId: t.data.appId,
                        timeStamp: t.data.timeStamp,
                        nonceStr: t.data.nonceStr,
                        package: t.data.package,
                        signType: t.data.signType,
                        paySign: t.data.paySign,
                        success: function(e) {
                            o.canPay = !0, "dan" == q || "pindan" == q || "integral" == q || "soitaire" == q ? t.data.is_go_orderlist <= 1 ? wx.redirectTo({
                                url: "/lionfish_comshop/pages/order/order?id=" + a + "&is_show=1"
                            }) : wx.redirectTo({
                                url: "/lionfish_comshop/pages/order/index?is_show=1"
                            }) : wx.redirectTo({
                                url: "/lionfish_comshop/moduleA/pin/share?id=" + a
                            })
                        },
                        fail: function(e) {
                            t.data.is_go_orderlist <= 1 ? wx.redirectTo({
                                url: "/lionfish_comshop/pages/order/order?id=" + a + "&?isfail=1"
                            }) : wx.redirectTo({
                                url: "/lionfish_comshop/pages/order/index?isfail=1"
                            })
                        }
                    })) : 1 == t.data.code ? (o.canPay = !0, wx.showModal({
                        title: "提示",
                        content: t.data.RETURN_MSG || "支付失败",
                        showCancel: !1,
                        confirmColor: "#F75451",
                        success: function(e) {
                            e.confirm && (t.data.is_go_orderlist <= 1 ? wx.redirectTo({
                                url: "/lionfish_comshop/pages/order/order?id=" + a + "&isfail=1"
                            }) : wx.redirectTo({
                                url: "/lionfish_comshop/pages/order/index?is_show=1&?isfail=1"
                            }))
                        }
                    })) : 2 == t.data.code ? (o.canPay = !0, 1 == t.data.is_forb && (i.btnDisable = !0, i.btnText = "已抢光"), wx.showToast({
                        title: t.data.msg,
                        icon: "none"
                    })) : console.log(t), o.setData(_extends({
                        btnLoading: !1,
                        payBtnLoading: !1
                    }, i))
                }
            })
        }
    },
    changeReceiverName: function(e) {
        var t = this.data,
            a = t.tabAddress,
            i = t.tabIdx,
            o = e.detail.value.trim();
        if (!(a[i].name = o)) {
            var s = "请填写收货人";
            0 == i && (s = "请填写提货人"), wx.showToast({
                title: s,
                icon: "none"
            })
        }
        return this.setData({
            tabAddress: a
        }), {
            value: o
        }
    },
    bindReceiverMobile: function(e) {
        var t = this.data,
            a = t.tabAddress,
            i = t.tabIdx,
            o = e.detail.value.trim();
        return a[i].mobile = o, this.setData({
            tabAddress: a
        }), {
            value: o
        }
    },
    changeReceiverAddress: function(e) {
        var t = this.data,
            a = t.tabAddress;
        return a[t.tabIdx].receiverAddress = e.detail.value.trim(), this.setData({
            tabAddress: a
        }), {
            value: e.detail.value.trim()
        }
    },
    changeTuanAddress: function(e) {
        var t = this.data,
            a = t.tabAddress;
        return a[t.tabIdx].lou_meng_hao = e.detail.value.trim(), this.setData({
            tabAddress: a
        }), {
            value: e.detail.value.trim()
        }
    },
    conformOrder: function() {
        this.setData({
            showConfirmModal: !0
        })
    },
    closeConfirmModal: function() {
        this.canPay = !0, this.setData({
            showConfirmModal: !1
        })
    },
    bindRegionChange: function(e) {
        var t = e.detail.value;
        t && this.checkOut(t[1]), this.setData({
            region: t
        })
    },
    checkOut: function(e) {
        var r = this,
            t = wx.getStorageSync("token"),
            a = wx.getStorageSync("community").communityId,
            i = wx.getStorageSync("latitude2"),
            o = wx.getStorageSync("longitude2"),
            s = this.data.buy_type,
            n = this.data.soli_id;
            console.log(i);console.log(o);
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "car.checkout",
                token: t,
                community_id: a,
                mb_city_name: e,
                latitude: i,
                longitude: o,
                buy_type: s,
                soli_id: n
            },
            dataType: "json",
            method: "POST",
            success: function(e) {
              console.log(e);
                if (1 == e.data.code) {
                    var t = e.data,
                        a = t.vipcard_save_money,
                        i = t.shop_buy_distance,
                        o = t.is_limit_distance_buy,
                        s = t.current_distance,
                        n = t.level_save_money;
                    1 == r.data.tabIdx && 1 == o && i < s && wx.showModal({
                        title: "提示",
                        content: "超出配送范围，请重新选择",
                        showCancel: !1,
                        confirmColor: "#F75451"
                    }), r.setData({
                        vipcard_save_money: a,
                        level_save_money: n,
                        is_limit_distance_buy: o || 0,
                        current_distance: s || "",
                        trans_free_toal: t.trans_free_toal,
                        is_man_delivery_tuanz_fare: t.is_man_delivery_tuanz_fare,
                        fare_man_delivery_tuanz_fare_money: t.fare_man_delivery_tuanz_fare_money,
                        is_man_shipping_fare: t.is_man_shipping_fare,
                        fare_man_shipping_fare_money: t.fare_man_shipping_fare_money
                    }, function() {
                        r.calcPrice()
                    })
                }
            }
        })
    },
    choseLocation: function() {
        var e = this.data,
            s = e.tabAddress,
            n = e.tabIdx,
            r = this;
        wx.chooseLocation({
            success: function(e) {
                console.log(e);
                var t = r.data.region,
                    a = e.name,
                    i = (e.address, null);

                function o() {
                    console.log("setData"), t && "市" != t[1] && r.checkOut(t[1]), s[n].region = t, s[n].receiverAddress = a, r.setData({
                        tabAddress: s
                    })
                }
                console.log("patt", i), locat.getGpsLocation(e.latitude, e.longitude).then(function(e) {
                    console.log("反推了", e), e && (t[0] = e.province, t[1] = e.city, t[2] = e.district, a || (a = e.street)), o()
                }), wcache.put("latitude2", e.latitude), wcache.put("longitude2", e.longitude)
            },
            fail: function(e) {
                console.log(e), "chooseLocation:fail auth deny" == e.errMsg && (console.log("无权限"), locat.checkGPS(app, locat.openSetting()))
            }
        })
    },
    getWxAddress: function() {
        var e = this.data,
            a = e.tabAddress,
            i = e.tabIdx,
            o = a[i].region || [],
            s = this;
        wx.getSetting({
            success: function(e) {
                console.log("vres.authSetting['scope.address']：", e.authSetting["scope.address"]), e.authSetting["scope.address"] ? wx.chooseAddress({
                    success: function(e) {
                        console.log("step1"), o[0] = e.provinceName || "选择地址", o[1] = e.cityName || "", o[2] = e.countyName || "";
                        var t = e.detailInfo;
                        a[i].name = e.userName, a[i].mobile = e.telNumber, a[i].region = o, a[i].receiverAddress = t, s.setData({
                            tabAddress: a
                        }), o && "市" != o[1] && s.checkOut(o[1])
                    },
                    fail: function(e) {
                        console.log("step4"), console.log(e)
                    }
                }) : 0 == e.authSetting["scope.address"] ? wx.openSetting({
                    success: function(e) {
                        console.log(e.authSetting)
                    }
                }) : (console.log("step2"), wx.chooseAddress({
                    success: function(e) {
                        console.log("step3"), o[0] = e.provinceName || "选择地址", o[1] = e.cityName || "", o[2] = e.countyName || "";
                        var t = e.detailInfo;
                        o && "市" != o[1] && s.checkOut(o[1]), a[i].name = e.userName, a[i].mobile = e.telNumber, a[i].region = o, a[i].receiverAddress = t, s.setData({
                            tabAddress: a
                        })
                    }
                }))
            }
        })
    },
    tabSwitch: function(e) {
        var t = 1 * e.currentTarget.dataset.idx;
        console.log(t);
        0 != t && wx.showToast({
            title: "配送变更，费用已变化",
            icon: "none"
        }), this.setData({
            tabIdx: t
        }, function() {
            this.calcPrice(1)
        })
    },
    show_voucher: function(e) {
        var t = e.currentTarget.dataset.seller_id,
            a = [],
            i = this.data.seller_chose_id,
            o = this.data.seller_chose_store_id,
            s = this.data.seller_goodss;
        for (var n in s) {
            s[n].store_info.s_id == t && (a = s[n].voucher_list, 0 == i && (i = s[n].chose_vouche.id || 0, o = s[n].chose_vouche.store_id || 0))
        }
        this.setData({
            ssvoucher_list: a,
            voucher_serller_id: t,
            seller_chose_id: i,
            seller_chose_store_id: o,
            hide_quan: !1
        })
    },
    chose_voucher_id: function(e) {
        wx.showLoading();
        var s = e.currentTarget.dataset.voucher_id,
            n = e.currentTarget.dataset.seller_id,
            r = this,
            t = wx.getStorageSync("token"),
            a = n + "_" + s,
            i = wx.getStorageSync("latitude2"),
            o = wx.getStorageSync("longitude2"),
            d = r.data.buy_type,
            c = this.data.soli_id,
            _ = wx.getStorageSync("community").communityId || "";
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "car.checkout",
                token: t,
                community_id: _,
                voucher_id: s,
                use_quan_str: a,
                buy_type: d,
                latitude: i,
                longitude: o,
                soli_id: c
            },
            dataType: "json",
            method: "POST",
            success: function(e) {
                if (wx.hideLoading(), 1 == e.data.code) {
                    var t = e.data.seller_goodss,
                        a = "";
                    for (var i in t) t[i].goodsnum = Object.keys(t[i].goods).length, "[object Object]" == Object.prototype.toString.call(t[i].chose_vouche) && (a = t[i].chose_vouche);
                    var o = e.data;
                    r.setData({
                        seller_goodss: t,
                        seller_chose_id: s,
                        seller_chose_store_id: n,
                        hide_quan: !0,
                        goods: o.goods,
                        buy_type: o.buy_type || "dan",
                        yupay: o.can_yupay,
                        is_yue_open: o.is_yue_open,
                        total_free: o.total_free,
                        sel_chose_vouche: a,
                        current_distance: o.current_distance || ""
                    }, function() {
                        r.calcPrice()
                    })
                }
            }
        })
    },
    closeCouponModal: function() {
        this.setData({
            hide_quan: !0
        })
    },
    calcPrice: function() {
      console.log(arguments);
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
            t = this.data,
            a = t.total_free,
            i = t.delivery_tuanz_money,
            o = t.trans_free_toal,
            s = t.tabIdx,
            n = t.goods,
            r = (t.is_open_vipcard_buy, t.is_member_level_buy, t.is_vip_card_member, t.canLevelBuy);
        a *= 1, i *= 1, o *= 1;
        var d = 0,
            c = 0,
            _ = 0,
            u = !0,
            l = !1,
            h = void 0;
        try {
            for (var p, m = Object.keys(n)[Symbol.iterator](); !(u = (p = m.next()).done); u = !0) {
                var y = n[p.value];
                c += y.total, r && y.is_mb_level_buy && (_ += 1 * y.total - 1 * y.level_total)
            }
        } catch (e) {
            l = !0, h = e
        } finally {
            try {
                !u && m.
                return &&m.
                return ()
            } finally {
                if (l) throw h
            }
        }
        console.log(c);
        var g = c;
        if (0 == s) d = a;
        else if (1 == s) {
            d = 0 == t.is_man_delivery_tuanz_fare ? i + a : a, g += i
        } else if (2 == s) {
            g += o, d = 0 == t.is_man_shipping_fare ? o + a : a
        }
        var f = t.use_score;
        f && (d -= 1 * t.score_for_money);
        var v;
        v = (g - 1 * d).toFixed(2), this.setData({
            total_all: g.toFixed(2),
            disAmount: v,
            tot_price: d.toFixed(2),
            total_goods_price: c.toFixed(2),
            levelAmount: _.toFixed(2)
        })
    },
    bindInputMessage: function(e) {
        var t = this.data.commentArr,
            a = e.currentTarget.dataset.idx,
            i = e.detail.value;
        t[a] = i, this.setData({
            commentArr: t
        })
    },
    changeIndexList: function() {
        var e = this.data.goods || [];
        0 < e.length && e.forEach(function(e) {
            0 == e.option.length && status.indexListCarCount(e.goods_id, 0)
        })
    },
    subscriptionNotice: function() {
        console.log("subscriptionNotice");
        var s = this;
        return new Promise(function(e, t) {
            var o = s.data.need_subscript_template,
                a = Object.keys(o).map(function(e) {
                    return o[e]
                });
            wx.requestSubscribeMessage ? a.length && wx.requestSubscribeMessage({
                tmplIds: a,
                success: function(t) {
                    var a = 1,
                        i = [];
                    Object.keys(o).forEach(function(e) {
                        "accept" == t[o[e]] ? i.push(e) : a = 0
                    }), i.length && s.addAccept(i), s.setData({
                        is_need_subscript: a
                    }), e()
                },
                fail: function() {
                    t()
                }
            }) : t()
        })
    },
    addAccept: function(e) {
        var t = wx.getStorageSync("token"),
            a = e.join(",");
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "user.collect_subscriptmsg",
                token: t,
                type: a
            },
            dataType: "json",
            method: "POST",
            success: function() {}
        })
    }
});