var _extends = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    }
    return t;
}, util = require("../../utils/util.js"), status = require("../../utils/index.js"), WxParse = require("../../wxParse/wxParse.js"), app = getApp(), detailClearTime = null;

function count_down(t, a) {
    var e = Math.floor(a / 1e3), o = e / 3600 / 24, s = Math.floor(o), i = e / 3600 - 24 * s, n = Math.floor(i), d = e / 60 - 1440 * s - 60 * n, r = Math.floor(d), c = e - 86400 * s - 3600 * n - 60 * r;
    if (t.setData({
        endtime: {
            days: fill_zero_prefix(s),
            hours: fill_zero_prefix(n),
            minutes: fill_zero_prefix(r),
            seconds: fill_zero_prefix(c),
            show_detail: 1
        }
    }), a <= 0) return clearTimeout(detailClearTime), detailClearTime = null, 0 == t.data.goods.over_type && t.authSuccess(), 
    void t.setData({
        endtime: {
            days: "00",
            hours: "00",
            minutes: "00",
            seconds: "00"
        }
    });
    detailClearTime = setTimeout(function() {
        count_down(t, a -= 1e3);
    }, 1e3);
}

function fill_zero_prefix(t) {
    return t < 10 ? "0" + t : t;
}

Page({
    data: {
        needAuth: !1,
        goodsIndex: 1,
        goods_id: 0,
        endtime: {
            days: "00",
            hours: "00",
            minutes: "00",
            seconds: "00"
        },
        is_share_html: !0,
        stickyFlag: !1,
        showSkeleton: !0,
        imageSize: {
            imageWidth: "100%",
            imageHeight: 600
        },
        cartNum: 0,
        noIns: !1,
        index_bottom_image: "",
        hideModal: !0,
        shareImgUrl: "",
        goods_details_middle_image: "",
        is_show_buy_record: 0,
        stopNotify: !0,
        iconArr: {
            home: "",
            car: ""
        },
        canvasWidth: 375,
        canvasHeight: 300,
        fmShow: !0,
        relative_goods_list: [],
        needPosition: !1,
        groupInfo: {
            group_name: "社区",
            owner_name: "团长"
        }
    },
    $data: {
        stickyFlag: !1,
        id: "",
        scene: "",
        community_id: 0
    },
    imageUrl: "",
    goodsImg: "",
    currentOptions: [],
    focusFlag: !1,
    onLoad: function(e) {
        app.globalData.navBackUrl = "";
        var o = this;
        status.setNavBgColor(), status.setGroupInfo().then(function(t) {
            o.setData({
                groupInfo: t
            });
        }), status.setIcon().then(function(t) {
            o.setData({
                iconArr: t
            });
        });
        var t = decodeURIComponent(e.scene);
        if ("undefined" !== t) {
            var a = t.split("_");
            e.id = a[0], e.share_id = a[1], e.community_id = a[2];
        }
        "undefined" != e.share_id && 0 < e.share_id && wx.setStorage({
            key: "share_id",
            data: e.share_id
        });
        var s = e.type || "";
        this.$data.id = e.id, this.$data.community_id = e.community_id, this.$data.scene = e.scene;
        var i = {
            canvasWidth: app.globalData.systemInfo.windowWidth,
            canvasHeight: .8 * app.globalData.systemInfo.windowWidth,
            buy_type: s,
            goods_id: e.id
        }, n = wx.getStorageSync("community"), d = n && n.communityId || "";
        if (wx.showLoading(), "undefined" != e.community_id && 0 < e.community_id && "integral" != s) if (d) console.log("step3 本地社区存在"), 
        this.paramHandle(e, n); else {
            e.community_id, util.getCommunityInfo().then(function(t) {
                console.log("step1 分享来的社区", t), o.paramHandle(e, t);
            }).catch(function(t) {
                console.log("step4 新人"), "" != Object.keys(t) && util.addhistory(t, !0);
            });
        } else util.getCommunityById(0).then(function(t) {
            if (console.log("没有分享社区直接访问", t), 1 == t.open_danhead_model) {
                var a = t.default_head_info;
                console.log("default_head_info", a), app.globalData.community = a, n && n.communityId != a.communityId && (app.globalData.changedCommunity = !0), 
                util.addhistory(a), wx.setStorage({
                    key: "community",
                    data: a
                }), o.setData({
                    community: a
                }), o.get_goods_details(e.id, a, "");
            } else util.getCommunityInfo().then(function(t) {
                t ? (o.setData({
                    community: t
                }), o.get_goods_details(e.id, "", t.communityId)) : (o.setData({
                    community: n
                }), o.get_goods_details(e.id, "", d));
            });
        });
        o.setData(i), this.get_instructions();
    },
    paramHandle: function(s) {
        var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "";
        console.log("step2");
        var n = this, d = s.id, r = s.community_id;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "index.get_community_info",
                community_id: r
            },
            dataType: "json",
            success: function(t) {
                if (0 == t.data.code) {
                    var a = t.data.data;
                    console.log(a);
                    var e = i.communityId;
                    if (1 == t.data.open_danhead_model) {
                        var o = t.data.default_head_info;
                        app.globalData.community = o, i && i.communityId != o.communityId && (app.globalData.changedCommunity = !0), 
                        util.addhistory(o), wx.setStorage({
                            key: "community",
                            data: o
                        }), n.setData({
                            community: o
                        }), n.get_goods_details(d, o, "");
                    } else e == r || "" == a ? (console.log("step5 分享与本地相同"), wx.setStorageSync("community", a), 
                    n.setData({
                        community: a
                    }), n.get_goods_details(s.id, "", r)) : e ? (n.setData({
                        showChangeCommunity: !0,
                        changeCommunity: a,
                        community: i
                    }), n.get_goods_details(s.id, "", e)) : n.setData({
                        changeCommunity: a
                    }, function() {
                        n.confrimChangeCommunity();
                    });
                }
            }
        });
    },
    get_goods_details: function(t) {
        var a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "", S = arguments[2], N = this;
        if (!t) return wx.hideLoading(), wx.showModal({
            title: "提示",
            content: "参数错误",
            showCancel: !1,
            confirmColor: "#F75451",
            success: function(t) {
                t.confirm && wx.redirectTo({
                    url: "/lionfish_comshop/pages/index/index"
                });
            }
        }), !1;
        var e = wx.getStorageSync("token");
        a && (S = a.communityId), app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "goods.get_goods_detail",
                token: e,
                id: t,
                community_id: S
            },
            dataType: "json",
            success: function(t) {
                setTimeout(function() {
                    wx.hideLoading();
                }, 1e3);
                var a = t.data.data, e = a.goods, o = a.is_can_headsales;
                if (e && 0 != e.length && "" != Object.keys(e) || wx.showModal({
                    title: "提示",
                    content: "该商品不存在，回首页",
                    showCancel: !1,
                    confirmColor: "#F75451",
                    success: function(t) {
                        t.confirm && wx.switchTab({
                            url: "/lionfish_comshop/pages/index/index"
                        });
                    }
                }), 0 == o && N.$data.community_id == S) {
                    var s = N.data.groupInfo;
                    app.util.message("此商品在您所属" + s.group_name + "不可参与", "switchTo:/lionfish_comshop/pages/index/index", "error");
                }
                var i = t.data.comment_list;
                i.map(function(t) {
                    3 < 14 * t.content.length / app.globalData.systemInfo.windowWidth && (t.showOpen = !0), 
                    t.isOpen = !0;
                });
                var n = t.data.data.goods_image, d = [];
                n.forEach(function(t) {
                    d.push(t.image);
                });
                var r = t.data.isopen_community_group_share || 0, c = t.data.group_share_info, u = t.data.data.relative_goods_list || [], l = [];
                "[object Object]" == Object.prototype.toString.call(u) && 0 < Object.keys(u).length ? Object.keys(u).forEach(function(t) {
                    l.push(u[t]);
                }) : l = u;
                var m = t.data, g = m.is_need_subscript, _ = m.need_subscript_template, h = m.is_open_vipcard_buy, f = m.modify_vipcard_name, p = m.is_vip_card_member, y = m.modify_vipcard_logo, x = m.is_member_level_buy, w = e.price || 0, v = e.card_price || 0;
                e.feePrice = (w - v).toFixed(2);
                var b = t.data.data, k = b.is_commiss_mb, P = b.commiss_mb_money, I = b.is_goods_head_mb, T = b.goods_head_money;
                N.currentOptions = t.data.data.options, N.setData({
                    order_comment_count: t.data.order_comment_count,
                    comment_list: i,
                    goods: e,
                    options: t.data.data.options,
                    order: {
                        goods_id: t.data.data.goods.goods_id,
                        pin_id: t.data.data.pin_id
                    },
                    share_title: e.share_title,
                    buy_record_arr: t.data.data.buy_record_arr,
                    goods_image: t.data.data.goods_image,
                    goods_image_length: t.data.data.goods_image.length,
                    service: e.tag,
                    showSkeleton: !1,
                    is_comunity_rest: t.data.is_comunity_rest,
                    prevImgArr: d,
                    open_man_orderbuy: t.data.open_man_orderbuy,
                    man_orderbuy_money: t.data.man_orderbuy_money,
                    goodsdetails_addcart_bg_color: t.data.goodsdetails_addcart_bg_color || "linear-gradient(270deg, #f9c706 0%, #feb600 100%)",
                    goodsdetails_buy_bg_color: t.data.goodsdetails_buy_bg_color || "linear-gradient(90deg, #ff5041 0%, #ff695c 100%)",
                    isopen_community_group_share: r,
                    group_share_info: c,
                    relative_goods_list: l,
                    needPosition: !!S,
                    is_close_details_time: t.data.is_close_details_time || 0,
                    is_open_vipcard_buy: h || 0,
                    modify_vipcard_name: f,
                    is_vip_card_member: p || 0,
                    modify_vipcard_logo: y,
                    is_commiss_mb: k,
                    commiss_mb_money: P,
                    is_goods_head_mb: I,
                    goods_head_money: T,
                    is_member_level_buy: x,
                    is_need_subscript: g,
                    need_subscript_template: _,
                    is_can_headsales: o
                }, function() {
                    var t = e.goods_share_image;
                    if (t) console.log("draw分享图"), status.download(t + "?imageView2/1/w/500/h/400").then(function(t) {
                        N.goodsImg = t.tempFilePath, N.drawImgNoPrice();
                    }); else {
                        console.log("draw价格");
                        var a = e.image_thumb;
                        status.download(a + "?imageView2/1/w/500/h/400").then(function(t) {
                            N.goodsImg = t.tempFilePath, N.drawImg();
                        });
                    }
                }), 1 == t.data.is_comunity_rest && wx.showModal({
                    title: "温馨提示",
                    content: N.data.groupInfo.owner_name + "休息中，欢迎下次光临!",
                    showCancel: !1,
                    confirmColor: "#F75451",
                    confirmText: "好的",
                    success: function(t) {}
                });
                var D = 0;
                0 < (D = 0 == e.over_type ? 1e3 * (e.begin_time - t.data.data.cur_time) : 1e3 * (e.end_time - t.data.data.cur_time)) && count_down(N, D);
                var C = t.data.data.goods.description;
                WxParse.wxParse("article", "html", C, N, 0, app.globalData.systemInfo);
            }
        });
    },
    confrimChangeCommunity: function() {
        var t = this.data.changeCommunity, a = wx.getStorageSync("token");
        app.globalData.community = t, app.globalData.changedCommunity = !0, wx.setStorage({
            key: "community",
            data: t
        }), a && util.addhistory(t), this.setData({
            community: t,
            showChangeCommunity: !1
        }), this.get_goods_details(this.data.goods_id, t, t.communityId), console.log("用户点击确定");
    },
    cancelChangeCommunity: function() {
        var t = this.data, a = t.is_can_headsales, e = t.groupInfo;
        0 == a && app.util.message("此商品在您所属" + e.group_name + "不可参与", "switchTo:/lionfish_comshop/pages/index/index", "error"), 
        console.log("取消切换");
    },
    authSuccess: function() {
        var t = this.$data.id, a = this.$data.scene, e = "/lionfish_comshop/pages/goods/goodsDetail?id=" + t + "&community_id=" + this.$data.community_id + "&scene=" + a;
        app.globalData.navBackUrl = e;
        var o = wx.getStorageSync("community"), s = this.data.needPosition;
        o && (s = !1), s || wx.redirectTo({
            url: e
        });
    },
    authModal: function() {
        return !this.data.needAuth || (this.setData({
            showAuthModal: !this.data.showAuthModal
        }), !1);
    },
    imageLoad: function(t) {
        var a = util.imageUtil(t);
        this.setData({
            imageSize: a
        });
    },
    get_instructions: function() {
        var e = this, t = this.$data.id;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "goods.get_instructions",
                goods_id: t
            },
            dataType: "json",
            success: function(t) {
                if (0 == t.data.code) {
                    var a = t.data.data.value;
                    WxParse.wxParse("instructions", "html", a, e, 25), "" == a && e.setData({
                        noIns: !0
                    }), e.setData({
                        index_bottom_image: t.data.data.index_bottom_image,
                        goods_details_middle_image: t.data.data.goods_details_middle_image,
                        is_show_buy_record: t.data.data.is_show_buy_record,
                        order_notify_switch: t.data.data.order_notify_switch,
                        is_show_comment_list: t.data.data.is_show_comment_list,
                        goods_details_price_bg: t.data.data.goods_details_price_bg,
                        isShowContactBtn: t.data.data.index_service_switch || 0,
                        goods_industrial_switch: t.data.data.goods_industrial_switch || 0,
                        goods_industrial: t.data.data.goods_industrial || "",
                        is_show_ziti_time: t.data.data.is_show_ziti_time || 0,
                        hide_community_change_btn: t.data.data.hide_community_change_btn || 0,
                        is_show_goodsdetails_communityinfo: t.data.data.is_show_goodsdetails_communityinfo || 0
                    });
                }
            }
        });
    },
    returnTop: function() {
        this.stickyFlag = !1, this.setData({
            stickyFlag: !1
        }), wx.pageScrollTo({
            scrollTop: 0,
            duration: 500
        });
    },
    addToCart: function(t) {
        if (this.authModal()) {
            var a = t.detail.formId, e = wx.getStorageSync("token");
            app.util.request({
                url: "entry/wxapp/user",
                data: {
                    controller: "user.get_member_form_id",
                    token: e,
                    from_id: a
                },
                dataType: "json",
                success: function(t) {}
            }), this.setData({
                is_just_addcar: 1
            }), this.openSku();
        }
    },
    openSku: function() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null;
        if (this.authModal()) {
            var a = this, e = this.data.is_just_addcar;
            if (t) {
                var o = t.detail, s = o.actId, i = o.skuList;
                e = 1;
            } else s = this.data.goods_id, i = this.currentOptions;
            a.setData({
                addCar_goodsid: s
            });
            var n = i.list || [], d = [];
            if (0 < n.length) {
                for (var r = 0; r < n.length; r++) {
                    var c = n[r].option_value[0], u = {
                        name: c.name,
                        id: c.option_value_id,
                        index: r,
                        idx: 0
                    };
                    d.push(u);
                }
                for (var l = "", m = 0; m < d.length; m++) m == d.length - 1 ? l += d[m].id : l = l + d[m].id + "_";
                var g = i.sku_mu_list[l];
                a.setData({
                    sku: d,
                    sku_val: 1,
                    cur_sku_arr: g,
                    skuList: i,
                    visible: !0,
                    showSku: !0,
                    is_just_addcar: e
                });
            } else if (t) {
                var _ = o.allData;
                a.setData({
                    sku: [],
                    sku_val: 1,
                    skuList: [],
                    cur_sku_arr: _,
                    is_just_addcar: e
                });
                var h = {
                    detail: {
                        formId: ""
                    }
                };
                h.detail.formId = "the formId is a mock one", a.gocarfrom(h);
            } else {
                var f = this.data.goods, p = f.card_price || "0.00", y = f.levelprice || "0.00", x = {
                    canBuyNum: f.total,
                    spuName: f.goodsname,
                    actPrice: f.actPrice,
                    marketPrice: f.marketPrice,
                    stock: f.total,
                    skuImage: f.image_thumb,
                    card_price: p,
                    levelprice: y
                };
                a.setData({
                    sku: [],
                    sku_val: 1,
                    cur_sku_arr: x,
                    skuList: [],
                    visible: !0,
                    showSku: !0
                });
            }
        }
    },
    gocarfrom: function(t) {
        this.data.is_just_addcar;
        wx.showLoading();
        var a = wx.getStorageSync("token");
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "user.get_member_form_id",
                token: a,
                from_id: t.detail.formId
            },
            dataType: "json",
            success: function(t) {}
        }), this.goOrder();
    },
    closeSku: function() {
        this.setData({
            visible: 0,
            stopClick: !1
        });
    },
    goOrder: function() {
        var i = this;
        if (i.data.can_car && (i.data.can_car = !1), 1 == this.data.open_man_orderbuy && 0 == this.data.is_just_addcar) {
            var t = 1 * this.data.man_orderbuy_money, a = this.data.sku_val, e = this.data.cur_sku_arr, o = e.actPrice[0] + "." + e.actPrice[1];
            if (console.log(1 * o * a), 1 * o * a < t) return wx.showToast({
                title: "满" + t + "元可下单！",
                icon: "none"
            }), !1;
        }
        wx.getStorageSync("token");
        var s = wx.getStorageSync("community"), n = i.data.addCar_goodsid, d = s.communityId, r = i.data.sku_val, c = i.data.cur_sku_arr, u = "", l = i.data.is_just_addcar;
        c && c.option_item_ids && (u = c.option_item_ids);
        var m = this.data.buy_type ? this.data.buy_type : "dan", g = {
            goods_id: n,
            community_id: d,
            quantity: r,
            sku_str: u,
            buy_type: m,
            pin_id: 0,
            is_just_addcar: l
        };
        util.addCart(g).then(function(t) {
            if (1 == t.showVipModal) {
                var a = t.data.pop_vipmember_buyimage;
                wx.hideLoading(), i.setData({
                    pop_vipmember_buyimage: a,
                    showVipModal: !0,
                    visible: !1
                });
            } else if (3 == t.data.code || 7 == t.data.code) wx.showToast({
                title: t.data.msg,
                icon: "none",
                duration: 2e3
            }); else if ("integral" == m) if (6 == t.data.code) {
                var e = t.data.msg;
                wx.showToast({
                    title: e,
                    icon: "none",
                    duration: 2e3
                });
            } else wx.navigateTo({
                url: "/lionfish_comshop/pages/order/placeOrder?type=integral"
            }); else if (4 == t.data.code) wx.hideLoading(), i.setData({
                needAuth: !0,
                showAuthModal: !0,
                visible: !1
            }); else if (6 == t.data.code) {
                e = t.data.msg;
                var o = t.data.max_quantity || "";
                0 < o && i.setData({
                    sku_val: o
                }), wx.showToast({
                    title: e,
                    icon: "none",
                    duration: 2e3
                });
            } else if (1 == l) i.closeSku(), wx.showToast({
                title: "已加入购物车",
                image: "../../images/addShopCart.png"
            }), app.globalData.cartNum = t.data.total, i.setData({
                cartNum: t.data.total
            }), status.indexListCarCount(n); else {
                var s = t.data.is_limit_distance_buy;
                3 < getCurrentPages().length ? wx.redirectTo({
                    url: "/lionfish_comshop/pages/order/placeOrder?type=dan&is_limit=" + s
                }) : wx.navigateTo({
                    url: "/lionfish_comshop/pages/order/placeOrder?type=dan&is_limit=" + s
                });
            }
        }).catch(function(t) {
            app.util.message(t || "请求失败", "", "error");
        });
    },
    vipModal: function(t) {
        this.setData(t.detail);
    },
    selectSku: function(t) {
        var a = t.currentTarget.dataset.type.split("_"), e = this.data, o = e.sku, s = e.skuList, i = e.sku_val, n = {
            name: a[3],
            id: a[2],
            index: a[0],
            idx: a[1]
        };
        o.splice(a[0], 1, n);
        for (var d = "", r = 0; r < o.length; r++) r == o.length - 1 ? d += o[r].id : d = d + o[r].id + "_";
        var c = s.sku_mu_list[d], u = {};
        (i = i || 1) > c.canBuyNum && (u.sku_val = c.canBuyNum, wx.showToast({
            title: "最多只能购买" + c.canBuyNum + "件",
            icon: "none"
        })), this.setData(_extends({
            cur_sku_arr: c,
            sku: o
        }, u)), console.log(d);
    },
    submit: function(t) {
        var a = t.detail.formId, e = wx.getStorageSync("token");
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "user.get_member_form_id",
                token: e,
                from_id: a
            },
            dataType: "json",
            success: function(t) {}
        });
    },
    balance: function(t) {
        this.authModal() && (this.setData({
            is_just_addcar: 0
        }), this.openSku());
    },
    setNum: function(t) {
        var a = t.currentTarget.dataset.type, e = 1, o = 1 * this.data.sku_val;
        "add" == a ? e = o + 1 : "decrease" == a && 1 < o && (e = o - 1);
        var s = this.data.sku, i = this.data.skuList;
        if (0 < s.length) for (var n = "", d = 0; d < s.length; d++) d == s.length - 1 ? n += s[d].id : n = n + s[d].id + "_";
        0 < i.length ? e > i.sku_mu_list[n].canBuyNum && (e -= 1) : e > this.data.cur_sku_arr.canBuyNum && (e -= 1);
        this.setData({
            sku_val: e
        });
    },
    scrollImagesChange: function(t) {
        this.videoContext.pause(), this.setData({
            fmShow: !0,
            goodsIndex: t.detail.current + 1
        });
    },
    share_handler: function() {
        this.setData({
            is_share_html: !1
        });
    },
    hide_share_handler: function() {
        this.setData({
            is_share_html: !0
        });
    },
    share_quan: function() {
        if (this.authModal()) {
            wx.showLoading({
                title: "获取中"
            });
            var t = wx.getStorageSync("token"), a = wx.getStorageSync("community"), e = this.data.order.goods_id, o = a.communityId, s = this;
            app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "goods.get_user_goods_qrcode",
                    token: t,
                    community_id: o,
                    goods_id: e
                },
                dataType: "json",
                success: function(t) {
                    if (0 == t.data.code) {
                        setTimeout(function() {
                            wx.hideLoading();
                        }, 2e3);
                        var a = t.data.image_path;
                        wx.getImageInfo({
                            src: a,
                            success: function(t) {
                                var a = t.path;
                                wx.saveImageToPhotosAlbum({
                                    filePath: a,
                                    success: function(t) {
                                        wx.showToast({
                                            title: "图片保存成功，可以分享了",
                                            icon: "none",
                                            duration: 2e3
                                        }), s.setData({
                                            is_share_html: !0
                                        });
                                    }
                                });
                            }
                        });
                    } else s.setData({
                        needAuth: !0
                    });
                }
            });
        }
    },
    onShow: function() {
        var a = this;
        util.check_login_new().then(function(t) {
            t ? (0, status.cartNum)("", !0).then(function(t) {
                0 == t.code && a.setData({
                    cartNum: t.data
                });
            }) : a.setData({
                needAuth: !0
            });
        }), this.setData({
            stopNotify: !1
        });
    },
    onReady: function(t) {
        this.videoContext = wx.createVideoContext("myVideo");
    },
    onHide: function() {
        this.setData({
            stopNotify: !0
        }), console.log("详情页hide", this.data.stopNotify);
    },
    onUnload: function() {
        console.log("onUnload"), this.setData({
            stopNotify: !0
        }), console.log("详情页unload", this.data.stopNotify), detailClearTime = null, clearTimeout(detailClearTime);
    },
    get_share_img: function() {
        if (this.authModal()) if (wx.showLoading(), "" != this.data.shareImgUrl) wx.hideLoading(), 
        this.setData({
            hideModal: !1,
            is_share_html: !0
        }); else {
            var t = wx.getStorageSync("token"), a = wx.getStorageSync("community"), e = this.data.goods_id, o = a.communityId, s = this;
            app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "goods.get_user_goods_qrcode",
                    token: t,
                    community_id: o,
                    goods_id: e
                },
                dataType: "json",
                success: function(t) {
                    if (0 == t.data.code) {
                        wx.hideLoading();
                        var a = t.data.image_path;
                        wx.previewImage({
                            current: a,
                            urls: [ a ]
                        });
                    } else s.setData({
                        needAuth: !0
                    });
                }
            });
        }
    },
    closeShareModal: function() {
        this.setData({
            hideModal: !0
        });
    },
    bindOpen: function(t) {
        var a = t.currentTarget.dataset.idx;
        if (console.log(a), this.data.comment_list[a].isOpen) {
            this.data.comment_list[a].isOpen = !1;
            var e = this.data.comment_list;
            this.setData({
                comment_list: e
            });
        } else {
            this.data.comment_list[a].isOpen = !0;
            e = this.data.comment_list;
            this.setData({
                comment_list: e
            });
        }
    },
    saveThumb: function(t) {
        wx.showLoading();
        var e = this, a = this.data.shareImgUrl;
        wx.getImageInfo({
            src: a,
            success: function(t) {
                var a = t.path;
                a && wx.saveImageToPhotosAlbum({
                    filePath: a,
                    success: function(t) {
                        console.log(t), wx.hideLoading(), wx.showToast({
                            title: "已保存相册",
                            icon: "none",
                            duration: 2e3
                        }), e.setData({
                            hideModal: !0
                        });
                    },
                    fail: function(t) {
                        wx.hideLoading(), console.log(t), "saveImageToPhotosAlbum:fail:auth denied" === t.errMsg && wx.openSetting({
                            success: function(t) {
                                t.authSetting["scope.writePhotosAlbum"] ? console.log("获取权限成功，再次点击图片保存到相册") : console.log("获取权限失败");
                            }
                        });
                    }
                });
            }
        });
    },
    drawImgNoPrice: function() {
        var a = this;
        wx.createSelectorQuery().select(".canvas-img").boundingClientRect(function() {
            var t = wx.createCanvasContext("myCanvas");
            t.drawImage(a.goodsImg, 0, 0, status.getPx(375), status.getPx(300)), a.data.goods.video && t.drawImage("../../images/play.png", status.getPx(127.5), status.getPx(90), status.getPx(120), status.getPx(120)), 
            t.save(), t.restore(), t.draw(!1, a.checkCanvasNoPrice());
        }).exec();
    },
    checkCanvasNoPrice: function() {
        var a = this;
        setTimeout(function() {
            wx.canvasToTempFilePath({
                canvasId: "myCanvas",
                success: function(t) {
                    t.tempFilePath ? a.imageUrl = t.tempFilePath : a.drawImgNoPrice(), console.log("我画完了");
                },
                fail: function(t) {
                    a.drawImgNoPrice();
                }
            });
        }, 500);
    },
    drawImg: function() {
        var t = this.data.endtime, c = (0 < t.days ? t.days + "天" : "") + t.hours + ":" + t.minutes + ":" + t.seconds, u = this;
        wx.createSelectorQuery().select(".canvas-img").boundingClientRect(function() {
            var t = wx.createCanvasContext("myCanvas");
            t.font = "28px Arial";
            var a = t.measureText("￥").width + 2, e = t.measureText(u.data.goods.price_front + "." + u.data.goods.price_after).width;
            t.font = "17px Arial";
            var o = t.measureText("￥" + u.data.goods.productprice).width + 3, s = t.measureText("累计销售 " + u.data.goods.seller_count).width, i = t.measureText("· 剩余" + u.data.goods.total + " ").width + 10;
            t.font = "18px Arial";
            var n = 0 == u.data.goods.over_type ? "距开始" : "距结束", d = t.measureText(n).width, r = t.measureText(c).width + 10;
            t.drawImage(u.goodsImg, 0, 0, status.getPx(375), status.getPx(300)), t.drawImage("../../images/shareBottomBg.png", status.getPx(0), status.getPx(225), status.getPx(375), status.getPx(75)), 
            u.data.goods.video && t.drawImage("../../images/play.png", status.getPx(127.5), status.getPx(70), status.getPx(120), status.getPx(120)), 
            t.save(), status.drawText(t, {
                color: "#ffffff",
                size: 28,
                textAlign: "left"
            }, "￥", status.getPx(6), status.getPx(267), status.getPx(a)), status.drawText(t, {
                color: "#ffffff",
                size: 28,
                textAlign: "left"
            }, u.data.goods.price_front + "." + u.data.goods.price_after, status.getPx(a), status.getPx(267), status.getPx(e)), 
            t.restore(), t.save(), t.restore(), t.save(), (0, status.drawText)(t, {
                color: "#ffffff",
                size: 15,
                textAlign: "left"
            }, "￥" + u.data.goods.productprice, (0, status.getPx)(a + e + 10), (0, status.getPx)(267), (0, 
            status.getPx)(o)), t.restore(), t.save(), (0, status.drawText)(t, {
                color: "#ffffff",
                size: 17,
                textAlign: "left"
            }, "累计销售" + u.data.goods.seller_count, (0, status.getPx)(10), (0, status.getPx)(290), (0, 
            status.getPx)(s)), t.restore(), t.save(), (0, status.drawText)(t, {
                color: "#ffffff",
                size: 17,
                textAlign: "left"
            }, "· 剩余" + u.data.goods.total, (0, status.getPx)(s + 10), (0, status.getPx)(290), (0, 
            status.getPx)(i)), t.restore(), t.save(), t.beginPath(), t.setStrokeStyle("white"), 
            t.moveTo((0, status.getPx)(a + e + 10), (0, status.getPx)(261)), t.lineTo((0, status.getPx)(a + e + o + 15), (0, 
            status.getPx)(261)), t.stroke(), t.restore(), t.save(), (0, status.drawText)(t, {
                color: "#F8E71C",
                size: 18,
                textAlign: "center"
            }, n, (0, status.getPx)(318), (0, status.getPx)(260), (0, status.getPx)(d)), t.restore(), 
            t.save(), (0, status.drawText)(t, {
                color: "#F8E71C",
                size: 18,
                textAlign: "center"
            }, c, (0, status.getPx)(315), (0, status.getPx)(288), (0, status.getPx)(r)), t.restore(), 
            t.draw(!1, u.checkCanvas());
        }).exec();
    },
    checkCanvas: function() {
        var a = this;
        setTimeout(function() {
            wx.canvasToTempFilePath({
                canvasId: "myCanvas",
                success: function(t) {
                    t.tempFilePath ? a.imageUrl = t.tempFilePath : a.drawImg(), console.log("我画完了");
                },
                fail: function(t) {
                    a.drawImg();
                }
            });
        }, 500);
    },
    previewImg: function(t) {
        var a = t.currentTarget.dataset.idx || 0, e = this.data.prevImgArr;
        wx.previewImage({
            current: e[a],
            urls: e
        });
    },
    btnPlay: function() {
        this.setData({
            fmShow: !1
        }), this.videoContext.play();
    },
    videEnd: function() {
        this.setData({
            fmShow: !0
        });
    },
    endPlay: function() {
        this.videoContext.pause(), this.setData({
            fmShow: !0
        });
    },
    showGroupCode: function() {
        var t = this.data.group_share_info.share_wxcode || "";
        t && wx.previewImage({
            current: t,
            urls: [ t ]
        });
    },
    changeCommunity: function() {
        if (0 == this.data.hide_community_change_btn) {
            var t = this.$data.id, a = this.$data.scene, e = "/lionfish_comshop/pages/goods/goodsDetail?id=" + t + "&community_id=" + this.$data.community_id + "&scene=" + a;
            app.globalData.navBackUrl = e, wx.redirectTo({
                url: "/lionfish_comshop/pages/position/community"
            });
        }
    },
    changeCartNum: function(t) {
        var a = t.detail;
        (0, status.cartNum)(this.setData({
            cartNum: a
        }));
    },
    goLink: function(t) {
        if (this.authModal()) {
            var a = t.currentTarget.dataset.link;
            3 < getCurrentPages().length ? wx.redirectTo({
                url: a
            }) : wx.navigateTo({
                url: a
            });
        }
    },
    handleFocus: function() {
        this.focusFlag = !0;
    },
    handleBlur: function(t) {
        var a = t.detail, e = parseInt(a.value);
        ("" == e || isNaN(e)) && this.setData({
            sku_val: 1
        });
    },
    changeNumber: function(t) {
        var a = this.data, e = a.cur_sku_arr, o = a.sku_val, s = 1 * e.stock, i = t.detail;
        if (this.focusFlag = !1, i) {
            var n = parseInt(i.value);
            s < (n = n < 1 ? 1 : n) ? (wx.showToast({
                title: "最多只能购买" + s + "件",
                icon: "none"
            }), o = s) : o = n;
        }
        this.setData({
            sku_val: o
        });
    },
    onShareAppMessage: function() {
        var t = wx.getStorageSync("community"), a = (this.data.goods_id, t.communityId), e = this.data.share_title, o = wx.getStorageSync("member_id"), s = "lionfish_comshop/pages/goods/goodsDetail?id=" + this.data.goods_id + "&share_id=" + o + "&community_id=" + a, i = this.data.goods.goods_share_image;
        console.log("商品分享地址："), console.log(s);
        return this.setData({
            is_share_html: !0,
            hideModal: !0
        }), {
            title: e,
            path: s,
            imageUrl: i || this.imageUrl,
            success: function(t) {},
            fail: function(t) {}
        };
    },
  onShareTimeline: function () {
    var t = wx.getStorageSync("community"), a = (this.data.goods_id, t.communityId), e = this.data.share_title, o = wx.getStorageSync("member_id"), s = "id=" + this.data.goods_id + "&share_id=" + o + "&community_id=" + a, i = this.data.goods.goods_share_image;
    return this.setData({
      is_share_html: !0,
      hideModal: !0
    }), {
        title: e,
        query: s,
        imageUrl: i || this.imageUrl,
      };
  }
});