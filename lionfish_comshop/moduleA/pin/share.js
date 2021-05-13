var app = getApp(),
    util = require("../../utils/util.js"),
    status = require("../../utils/index.js");
Page({
    data: {
        seconds: 0,
        surplus: 0,
        likeList: [],
        groupInfo: {
            group_name: "社区",
            owner_name: "团长"
        }
    },
    orderId: "",
    onLoad: function(t) {
        var e = this,
            o = t.id,
            a = t.share_id;
        "undefined" != a && 0 < t.share_id && wx.setStorageSync("share_id", a), status.setGroupInfo().then(function(t) {
            e.setData({
                groupInfo: t
            })
        }), console.log(o);
        var i = decodeURIComponent(t.scene);
        if ("undefined" != i && "" != i && (o = i), void 0 === o) return wx.showModal({
            title: "提示",
            content: "参数错误",
            showCancel: !1,
            confirmColor: "#F75451",
            success: function(t) {
                t.confirm && wx.redirectTo({
                    url: "/lionfish_comshop/pages/index/index"
                })
            }
        }), !1;
        this.orderId = o, this.getData(), this.getLikeList()
    },
    onShow: function() {
        var e = this;
        util.check_login_new().then(function(t) {
            t ? e.setData({
                needAuth: !1
            }) : e.setData({
                needAuth: !0
            })
        })
    },
    authSuccess: function() {
        var t = this;
        this.setData({
            needAuth: !1
        }, function() {
            t.getData()
        })
    },
    authModal: function() {
        return !this.data.needAuth || (this.setData({
            showAuthModal: !this.data.showAuthModal
        }), !1)
    },
    getData: function() {
        wx.showLoading();
        var k = this,
            t = wx.getStorageSync("token"),
            e = this.orderId;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "groupdo.group_info",
                token: t,
                order_id: e
            },
            dataType: "json",
            success: function(t) {
                if (wx.hideLoading(), 0 == t.data.code) {
                    var e = t.data.data,
                        o = e.order_goods,
                        a = e.goods_info,
                        i = e.options,
                        n = e.pin_info,
                        s = e.share_title,
                        r = e.pin_order_arr,
                        d = e.me_take_in,
                        u = e.is_me,
                        c = e.interface_get_time,
                        l = e.order_id,
                        m = e.order_type,
                        _ = e.pintuan_model_buy,
                        g = e.community_id,
                        p = e.hide_community_change_btn,
                        h = e.pintuan_show_community_info;
                    a.goods_id = o.goods_id;
                    var y = {
                        goods_id: o.goods_id,
                        pin_id: n.pin_id
                    }, f = Date.parse(new Date),
                        v = 1e3 * (n.end_time - c) + f,
                        w = a.pin_count - r.length;
                    util.getCommunityById(g).then(function(t) {
                        k.setData({
                            changeCommunity: t.data
                        })
                    }), 1 == _ && 0 == n.state && k.needCommunity(g, p, a), k.setData({
                        seconds: 0 < v ? v : 0,
                        order: y,
                        order_goods: o,
                        goods_info: a,
                        options: i,
                        pin_info: n,
                        share_title: s,
                        pin_order_arr: r,
                        me_take_in: d,
                        is_me: u,
                        interface_get_time: c,
                        order_id: l,
                        surplus: w,
                        order_type: m,
                        hide_community_change_btn: p || 0,
                        goodsComunityId: g,
                        pintuan_model_buy: _,
                        pintuan_show_community_info: h
                    })
                } else app.util.message("无数据", "/lionfish_comshop/moduleA/pin/index", "error")
            }
        })
    },
    needCommunity: function(a, i) {
        var t = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}, n = this;
        console.log("需要社区");
        var s = wx.getStorageSync("token"),
            r = t.is_all_sale || 0,
            d = wx.getStorageSync("community"),
            u = d && d.communityId || "";
        console.log("shareCommunityId", a), util.getCommunityById(a).then(function(t) {
            if (1 == t.open_danhead_model) {
                console.log(t);
                var e = t.default_head_info;
                app.globalData.community = e, app.globalData.changedCommunity = !0, wx.setStorage({
                    key: "community",
                    data: e
                }), n.setData({
                    community: e
                }), s && n.addhistory(e)
            } else if ("" != u && a) {
                if (console.log("currentCommunityId存在 比较社区"), u != a) {
                    console.log("currentCommunityId存在 社区不同");
                    var o = n.data.groupInfo;
                    if (console.log(i), 1 == i && 1 != r) return void app.util.message("您只能访问自己" + o.group_name, "/lionfish_comshop/moduleA/pin/index", "error", "知道了");
                    n.setData({
                        showChangeCommunity: !0,
                        changeCommunity: t.data,
                        community: d
                    })
                }
            } else s ? util.getCommunityInfo().then(function(t) {
                console.log("token存在 比较社区"), t.community_id && t.community_id != a && n.setData({
                    showChangeCommunity: !0,
                    community: d
                })
            }).
            catch (function(t) {
                console.log("step4 新人"), "" != Object.keys(t) && n.addhistory(t, !0)
            }) : (console.log("token不存在 存社区"), app.globalData.community = t, app.globalData.changedCommunity = !0, wx.setStorage({
                key: "community",
                data: t
            }), n.setData({
                community: t
            }))
        })
    },
    confrimChangeCommunity: function() {
        var t = this.data.changeCommunity,
            e = wx.getStorageSync("token");
        app.globalData.community = t, app.globalData.changedCommunity = !0, wx.setStorage({
            key: "community",
            data: t
        }), e && this.addhistory(t), this.setData({
            community: t,
            showChangeCommunity: !1
        }), console.log("用户点击确定")
    },
    cancelChangeCommunity: function() {
        var t = this.data,
            a = t.community,
            i = t.goods_info,
            e = t.groupInfo;
        1 == i.is_all_sale || wx.showModal({
            title: "提示",
            content: "此拼团在您所属" + e.group_name + "不可参与",
            showCancel: !1,
            confirmColor: "#ff5041",
            success: function(t) {
                if (t.confirm) {
                    var e = a && a.communityId || "",
                        o = i.goods_id;
                    app.util.request({
                        url: "entry/wxapp/index",
                        data: {
                            controller: "goods.check_goods_community_canbuy",
                            community_id: e,
                            goods_id: o
                        },
                        dataType: "json",
                        success: function(t) {
                            0 == t.data.code ? wx.redirectTo({
                                url: "/lionfish_comshop/moduleA/pin/goodsDetail?id=" + o
                            }) : wx.redirectTo({
                                url: "/lionfish_comshop/moduleA/pin/index"
                            })
                        }
                    })
                }
            }
        })
    },
    addhistory: function(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            o = t.communityId;
        console.log("addhistory");
        var a = wx.getStorageSync("token");
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "index.addhistory_community",
                community_id: o,
                token: a
            },
            dataType: "json",
            success: function(t) {
                e && (console.log("新人 社区"), app.util.request({
                    url: "entry/wxapp/index",
                    data: {
                        controller: "index.get_community_info",
                        community_id: o
                    },
                    dataType: "json",
                    success: function(t) {
                        if (0 == t.data.code) {
                            var e = t.data.data;
                            app.globalData.community = e, app.globalData.changedCommunity = !0, wx.setStorage({
                                key: "community",
                                data: e
                            })
                        }
                    }
                }))
            }
        })
    },
    getLikeList: function() {
        var i = this,
            t = (wx.getStorageSync("token"), this.orderId),
            e = wx.getStorageSync("community"),
            o = e && e.communityId || "";
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "group.pintuan_like_list",
                order_id: t,
                community_id: o
            },
            dataType: "json",
            success: function(t) {
                if (0 == t.data.code) {
                    var e = t.data,
                        o = e.is_show_order_guess_like,
                        a = e.list;
                    i.setData({
                        is_show_order_guess_like: o,
                        likeList: a || []
                    })
                } else console.log("猜你喜欢无数据")
            }
        })
    },
    goLink: function(t) {
        var e = getCurrentPages(),
            o = t.currentTarget.dataset.link;
        6 < e.length ? o && wx.redirectTo({
            url: o
        }) : o && wx.navigateTo({
            url: o
        })
    },
    preOpenSku: function() {
        var t = this.data,
            e = t.order,
            o = t.options,
            a = t.goods_info;
        e.buy_type = "pintuan", e.quantity = 1, this.setData({
            order: e
        });
        var i = o.list || [],
            n = [];
        if (0 < i.length) {
            for (var s = 0; s < i.length; s++) {
                var r = i[s].option_value[0],
                    d = {
                        name: r.name,
                        id: r.option_value_id,
                        index: s,
                        idx: 0
                    };
                n.push(d)
            }
            for (var u = "", c = 0; c < n.length; c++) c == n.length - 1 ? u += n[c].id : u = u + n[c].id + "_";
            var l = o.sku_mu_list[u];
            this.setData({
                sku: n,
                sku_val: 1,
                cur_sku_arr: l,
                skuList: o,
                visible: !0,
                showSku: !0,
                is_just_addcar: 0
            })
        } else {
            var m = a.danprice || "0.00",
                _ = a.pinprice || "0.00",
                g = {
                    skuImage: a.goods_images,
                    spuName: a.name,
                    actPrice: m.split("."),
                    pinprice: _.split(".")
                };
            this.setData({
                visible: !0,
                showSku: !0,
                is_just_addcar: 0,
                sku: [],
                sku_val: 1,
                cur_sku_arr: g,
                skuList: []
            }, function() {})
        }
    },
    openSku: function() {
        if (this.authModal()) {
            var t = this.data,
                e = t.goodsComunityId,
                o = t.groupInfo,
                a = t.goods_info;
            if (1 == this.data.pintuan_model_buy) {
                var i = wx.getStorageSync("community"),
                    n = i && i.communityId || "";
                "" != e && "" != n && e == n || 1 == a.is_all_sale ? this.preOpenSku() : app.util.message("此拼团在您所属" + o.group_name + "不可参与", "", "error")
            } else this.preOpenSku()
        }
    },
    goOrder: function() {
        var s = this;
        s.data.can_car && (s.data.can_car = !1);
        var t = this.data,
            e = t.order,
            o = t.cur_sku_arr,
            a = t.sku_val,
            i = e.goods_id,
            n = a,
            r = "",
            d = e.buy_type,
            u = e.pin_id,
            c = wx.getStorageSync("community").communityId || 0;
        o && o.option_item_ids && (r = o.option_item_ids);
        var l = {
            goods_id: i,
            community_id: c,
            quantity: n,
            sku_str: r,
            buy_type: d,
            pin_id: u,
            is_just_addcar: 0
        };
        util.addCart(l).then(function(t) {
            if (1 == t.showVipModal) {
                var e = t.data.pop_vipmember_buyimage;
                wx.hideLoading(), s.setData({
                    pop_vipmember_buyimage: e,
                    showVipModal: !0,
                    visible: !1
                })
            } else if (3 == t.data.code || 7 == t.data.code) wx.showToast({
                title: t.data.msg,
                icon: "none",
                duration: 2e3
            });
            else if (4 == t.data.code) wx.hideLoading(), s.setData({
                needAuth: !0,
                showAuthModal: !0,
                visible: !1
            });
            else if (6 == t.data.code) {
                var o = t.data.msg,
                    a = t.data.max_quantity || "";
                0 < a && s.setData({
                    sku_val: a
                }), wx.showToast({
                    title: o,
                    icon: "none",
                    duration: 2e3
                })
            } else {
                var i = getCurrentPages(),
                    n = "/lionfish_comshop/pages/order/placeOrder?type=" + d;
                3 < i.length ? wx.redirectTo({
                    url: n
                }) : wx.navigateTo({
                    url: n
                })
            }
        }).
        catch (function(t) {
            app.util.message(t || "请求失败", "", "error")
        })
    },
    selectSku: function(t) {
        var e = t.currentTarget.dataset.type.split("_"),
            o = this.data.sku,
            a = {
                name: e[3],
                id: e[2],
                index: e[0],
                idx: e[1]
            };
        o.splice(e[0], 1, a), this.setData({
            sku: o
        });
        for (var i = "", n = 0; n < o.length; n++) n == o.length - 1 ? i += o[n].id : i = i + o[n].id + "_";
        var s = this.data.skuList.sku_mu_list[i];
        this.setData({
            cur_sku_arr: s
        }), console.log(i)
    },
    setNum: function(t) {
        var e = t.currentTarget.dataset.type,
            o = 1,
            a = 1 * this.data.sku_val;
        "add" == e ? o = a + 1 : "decrease" == e && 1 < a && (o = a - 1);
        var i = this.data.sku,
            n = this.data.skuList;
        if (0 < i.length) for (var s = "", r = 0; r < i.length; r++) r == i.length - 1 ? s += i[r].id : s = s + i[r].id + "_";
        0 < n.length ? o > n.sku_mu_list[s].canBuyNum && (o -= 1) : o > this.data.cur_sku_arr.canBuyNum && (o -= 1);
        this.setData({
            sku_val: o
        })
    },
    gocarfrom: function(t) {
        wx.showLoading();
        var e = wx.getStorageSync("token");
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "user.get_member_form_id",
                token: e,
                from_id: t.detail.formId
            },
            dataType: "json",
            success: function(t) {}
        }), this.goOrder()
    },
    closeSku: function() {
        this.setData({
            visible: 0,
            stopClick: !1
        })
    },
    onShareAppMessage: function() {
        var t = wx.getStorageSync("member_id") || "",
            e = "lionfish_comshop/moduleA/pin/share?id=" + this.data.order_id + "&share_id=" + t,
            o = this.data,
            a = o.surplus,
            i = o.order_goods;
        return {
            title: 0 < a ? "还差" + a + "人！我" + i.price + "元团了" + i.name : "我" + i.price + "元团了" + i.name,
            path: e,
            success: function(t) {},
            fail: function(t) {}
        }
    },
  onShareTimeline: function () {
    var t = wx.getStorageSync("member_id") || "",
      e = "id=" + this.data.order_id + "&share_id=" + t,
      o = this.data,
      a = o.surplus,
      i = o.order_goods;
    return {
      title: 0 < a ? "还差" + a + "人！我" + i.price + "元团了" + i.name : "我" + i.price + "元团了" + i.name,
      query: e,
    }
  }
});