var _extends = Object.assign || function(t) {
        for (var e = 1; e < arguments.length; e++) {
            var o = arguments[e];
            for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a])
        }
        return t
    }, app = getApp(),
    WxParse = require("../../wxParse/wxParse.js"),
    util = require("../../utils/util.js"),
    status = require("../../utils/index.js");
Page({
    mixins: [require("../../mixin/compoentCartMixin.js")],
    data: {
        showGoodsModal: !1,
        showCommentModal: !1,
        showCartModal: !1,
        pid: 0,
        hideGoods: !0,
        buy_type: "soitaire",
        groupInfo: {
            group_name: "社区",
            owner_name: "团长"
        },
        showShareModal: !1,
        list: [],
        loadText: "加载中...",
        noData: 0,
        loadMore: !0,
        isIpx: app.globalData.isIpx,
        orderList: [],
        noOrderMore: !1,
        noOrderData: 0,
        myOrderList: [],
        noMyOrderMore: !1,
        noMyOrderData: !1
    },
    imagePath: "",
    options: "",
    page: 1,
    soli_id: 0,
    orderPage: 1,
    isFirst: 1,
    myOrderPage: 1,
    canCancel: !0,
    onLoad: function(t) {
        var e = this;
        status.setGroupInfo().then(function(t) {
            e.setData({
                groupInfo: t
            })
        });
        var o = decodeURIComponent(t.scene);
        if ("undefined" !== o) {
            var a = o.split("_");
            t.id = a[0], t.share_id = a[1]
        }
        var i = t.id,
            n = t.share_id;
        this.options = t, "undefined" != n && 0 < n && wx.setStorageSync("share_id", n), i || app.util.message("参数错误", "redirect:/lionfish_comshop/moduleA/solitaire/index", "error"), this.soli_id = i
    },
    initFn: function() {
        var t = this,
            e = this.options && this.options.id || 0;
        this.page = 1, this.setData({
            list: [],
            loadText: "加载中...",
            noData: 0,
            loadMore: !0
        }, function() {
            e && t.getData(e), t.getCommentList()
        })
    },
    onShow: function() {
        var e = this,
            t = this.options && this.options.id || 0;
        t && this.getData(t), this.getCommentList(), this.getOrderList(), this.getMyOrderList(), util.check_login_new().then(function(t) {
            t ? e.showCartGoods().
            catch (function() {
                console.log("购物车为空")
            }) : e.setData({
                needAuth: !0
            })
        })
    },
    onHide: function() {
        this.setData({
            clearTime: !0
        })
    },
    authSuccess: function() {
        this.setData({
            needAuth: !1
        });
        var t = this.data.community;
        console.log("authSuccess"), this.compareCommunity(t), this.visiteRecord()
    },
    getData: function(t) {
        var h = wx.getStorageSync("token"),
            u = this;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "solitaire.get_solitaire_detail",
                id: t,
                token: h
            },
            dataType: "json",
            success: function(t) {
                if (0 == t.data.code) {
                    var e = t.data,
                        o = e.head_data,
                        a = e.soli_info,
                        i = e.solitaire_target,
                        n = e.solitaire_target_takemember,
                        r = e.solitaire_target_takemoney,
                        s = e.solitaire_target_type,
                        d = a.content;
                    WxParse.wxParse("article", "html", d, u, 0, app.globalData.systemInfo);
                    var l = 1 * r - 1 * a.soli_total_money,
                        c = 1 * n - 1 * a.order_count;
                    1 == u.isFirst && (u.compareCommunity(o), u.drawImg(o, a), h && u.visiteRecord()), u.setData({
                        community: o || "",
                        soli_info: a,
                        solitaire_target: i,
                        solitaire_target_takemember: n,
                        solitaire_target_takemoney: r,
                        solitaire_target_type: s,
                        diffMoney: l,
                        diffMember: c,
                        clearTime: !1
                    }, function() {
                        u.isFirst++
                    })
                } else app.util.message(t.data.msg, "redirect:/lionfish_comshop/moduleA/solitaire/index", "error")
            }
        })
    },
    showImgPrev: function(t) {
        var e = t ? t.currentTarget.dataset.idx : "",
            o = this.data.soli_info.images_list || "";
        wx.previewImage({
            current: o[e],
            urls: o
        })
    },
    compareCommunity: function(t) {
        var n = this,
            r = wx.getStorageSync("community"),
            s = r.communityId || "",
            d = wx.getStorageSync("token"),
            l = t.head_id || "";
        l && util.getCommunityById(l).then(function(t) {
            var e = t.hide_community_change_btn,
                o = t.default_head_info;
            if (1 == t.open_danhead_model) {
                if (app.globalData.community = o, app.globalData.changedCommunity = !0, wx.setStorage({
                    key: "community",
                    data: o
                }), d && util.addhistory(o), l != o.communityId) {
                    var a = n.data.groupInfo;
                    return void app.util.message("您只能访问自己" + a.group_name, "redirect:/lionfish_comshop/moduleA/solitaire/index", "error", "知道了")
                }
            } else if ("" != s && l) {
                if (console.log("currentCommunityId存在 比较社区"), s != l) {
                    console.log("currentCommunityId存在 社区不同");
                    var i = n.data.groupInfo;
                    if (1 == e) return console.log("禁止切换"), void app.util.message("您只能访问自己" + i.group_name, "redirect:/lionfish_comshop/moduleA/solitaire/index", "error", "知道了");
                    n.setData({
                        hide_community_change_btn: e,
                        showChangeCommunity: !! t.data,
                        changeCommunity: t.data,
                        currentCommunity: r
                    })
                }
            } else d ? util.getCommunityInfo().then(function(t) {
                console.log("token存在 比较社区"), t.community_id && t.community_id != l && n.setData({
                    showChangeCommunity: !0,
                    currentCommunity: t
                })
            }).
            catch (function(t) {
                console.log("step4 新人"), "" != Object.keys(t) && util.addhistory(t, !0)
            }) : (console.log("token不存在 存社区"), app.globalData.community = t.data, app.globalData.changedCommunity = !0, wx.setStorage({
                key: "community",
                data: t.data
            }))
        })
    },
    confrimChangeCommunity: function() {
        var t = this.data.changeCommunity,
            e = wx.getStorageSync("token");
        app.globalData.community = t, app.globalData.changedCommunity = !0, wx.setStorage({
            key: "community",
            data: t
        }), e && util.addhistory(t), this.setData({
            showChangeCommunity: !1
        }), console.log("用户点击确定")
    },
    cancelChangeCommunity: function() {
        var t = this.data.groupInfo;
        wx.showModal({
            title: "提示",
            content: "此接龙在您所属" + t.group_name + "不可参与",
            showCancel: !1,
            confirmColor: "#ff5041",
            success: function(t) {
                t.confirm && wx.switchTab({
                    url: "/lionfish_comshop/pages/index/index"
                })
            }
        })
    },
    handleGoodsModal: function() {
        this.setData({
            showGoodsModal: !this.data.showGoodsModal
        })
    },
    handleCommentModal: function() {
        this.setData({
            showCommentModal: !this.data.showCommentModal
        })
    },
    changeCartNum: function(t) {
        var e = t.detail,
            o = e.goods_total_count,
            a = e.goods_id,
            i = this.data.soli_info || "",
            n = i.goods_list || [],
            r = n.findIndex(function(t) {
                return t.actId == a
            }); - 1 !== r && (this.showCartGoods().
        catch (function() {
            console.log("购物车为空")
        }), n[r].goods_total_count = o || 0, i.goods_list = n, this.setData({
            soli_info: i
        }))
    },
    handleCartModal: function() {
        console.log("购物车弹窗");
        var t = this;
        this.data.showCartModal ? this.setData({
            showCartModal: !1
        }) : this.showCartGoods().then(function() {
            t.setData({
                showCartModal: !0
            })
        }).
        catch (function() {
            console.log("购物车为空")
        })
    },
    showCartGoods: function() {
        var s = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0],
            d = this;
        return new Promise(function(n, r) {
            var t = wx.getStorageSync("token"),
                e = d.soli_id || "",
                o = wx.getStorageSync("community").communityId || "";
            e && wx.showLoading(), app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "car.show_cart_goods",
                    token: t,
                    soli_id: e,
                    community_id: o,
                    buy_type: "soitaire"
                },
                dataType: "json",
                success: function(t) {
                    if (wx.hideLoading(), 0 == t.data.code) {
                        var e = t.data.carts;
                        if (0 == Object.keys(e).length) d.setData({
                            cartNum: 0
                        }), r(t);
                        else {
                            var o = d.countCartNum(e),
                                a = o.cartNum,
                                i = o.totMoney;
                            s && d.setData({
                                carts: e,
                                cartNum: a,
                                totMoney: i
                            }), n()
                        }
                    } else 5 == t.data.code ? d.setData({
                        needAuth: !0,
                        showAuthModal: !0
                    }) : console.log(t)
                }
            })
        })
    },
    countCartNum: function(a) {
        var i = 0,
            n = 0;
        return Object.keys(a).forEach(function(o) {
            Object.keys(a[o].shopcarts).forEach(function(t) {
                var e = 1 * a[o].shopcarts[t].goodsnum;
                i += e, n += a[o].shopcarts[t].currntprice * e
            })
        }), n = n.toFixed(2), {
            cartNum: i,
            totMoney: n
        }
    },
    changeCart: function(t) {
        var e = this.options && this.options.id || 0,
            o = t.detail,
            a = this.countCartNum(o),
            i = a.cartNum,
            n = a.totMoney;
        e && this.setData({
            clearTime: !0,
            carts: o,
            cartNum: i,
            totMoney: n
        }), this.getData(e)
    },
    subComment: function(t) {
        var e = this.data,
            s = e.soli_info,
            d = e.pid,
            l = s.id || "",
            c = t.detail.value.content || "";
        if ("" != c) {
            var h = this,
                o = wx.getStorageSync("token");
            app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "solitaire.sub_solipost",
                    soli_id: l,
                    content: c,
                    pid: d,
                    token: o
                },
                dataType: "json",
                success: function(t) {
                    if (0 == t.data.code) {
                        var e = t.data,
                            o = e.post_id,
                            a = e.cur_time,
                            i = wx.getStorageSync("userInfo"),
                            n = {
                                id: o,
                                soli_id: l,
                                pid: d,
                                username: i.nickName,
                                avatar: i.avatarUrl,
                                content: c,
                                fav_count: 0,
                                addtime: a,
                                reply: [],
                                is_agree: !1
                            }, r = h.data.list;
                        r.unshift(n), s.comment_total = 1 * s.comment_total + 1, h.setData({
                            soli_info: s,
                            list: r,
                            content: "",
                            showCommentModal: !1,
                            noData: 0
                        }), app.util.message(t.data.msg || "留言成功", "", "success")
                    } else app.util.message(t.data.msg || "留言失败", "", "error")
                }
            })
        } else wx.showToast({
            title: "请输入内容",
            icon: "none"
        })
    },
    visiteRecord: function() {
        var t = this.soli_id || "",
            e = wx.getStorageSync("token");
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "solitaire.send_visite_record",
                soli_id: t,
                token: e
            },
            dataType: "json",
            success: function(t) {}
        })
    },
    favComment: function(t) {
        var a = this,
            e = this.data.soli_info.id || "",
            o = t ? t.currentTarget.dataset.post_id : "",
            i = t ? t.currentTarget.dataset.idx : 0,
            n = wx.getStorageSync("token");
        o && app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "solitaire.fav_soli_post",
                soli_id: e,
                post_id: o,
                token: n
            },
            dataType: "json",
            success: function(t) {
                if (0 == t.data.code) if (1 == t.data.do) {
                    var e = a.data.list;
                    e[i].is_agree = !0, e[i].fav_count = 1 * e[i].fav_count + 1, a.setData({
                        list: e
                    })
                } else {
                    var o = a.data.list;
                    o[i].is_agree = !1, o[i].fav_count = 1 * o[i].fav_count - 1, a.setData({
                        list: o
                    })
                } else 1 == t.data.code ? a.setData({
                    needAuth: !0,
                    showAuthModal: !0
                }) : wx.showToast({
                    title: t.data.msg || "点赞失败",
                    icon: "none"
                })
            }
        })
    },
    handleMoreGoods: function() {
        this.setData({
            hideGoods: !this.data.hideGoods
        })
    },
    goPlaceOrder: function() {
        var e = this.data.soli_info;
        this.showCartGoods(!1).then(function() {
            var t = "/lionfish_comshop/pages/order/placeOrder?type=soitaire&soli_id=" + (e.id || "");
            wx.navigateTo({
                url: t
            })
        }).
        catch (function() {
            wx.showToast({
                title: "请先选择商品！",
                icon: "none"
            })
        })
    },
    getCommentList: function() {
        var a = this,
            t = this.options && this.options.id || 0,
            e = wx.getStorageSync("token");
        wx.showLoading(), app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "solitaire.get_comment_list",
                page: this.page,
                token: e,
                id: t
            },
            dataType: "json",
            success: function(t) {
                if (wx.hideLoading(), 0 == t.data.code) {
                    var e = {}, o = t.data.data;
                    o.length < 20 && (e.noMore = !0), o = a.data.list.concat(o), a.page++, a.setData(_extends({
                        list: o
                    }, e))
                } else 1 == t.data.code && (1 == a.page && a.setData({
                    noData: 1
                }), a.setData({
                    loadMore: !1,
                    noMore: !1,
                    loadText: "没有更多记录了~"
                }))
            }
        })
    },
    getMyOrderList: function() {
        console.log("getMyOrderList");
        var i = this,
            t = this.options && this.options.id || 0,
            e = wx.getStorageSync("token");
        e && wx.showLoading(), app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "order.orderlist",
                page: this.myOrderPage,
                token: e,
                soli_id: t
            },
            dataType: "json",
            success: function(t) {
                if (wx.hideLoading(), 0 == t.data.code) {
                    var e = {}, o = t.data.data;
                    o.length < 6 && (e.noMyOrderMore = !0), o = i.data.myOrderList.concat(o), i.myOrderPage++, i.setData(_extends({
                        myOrderList: o
                    }, e))
                } else if (1 == t.data.code) {
                    var a = {
                        noMyOrderMore: !0
                    };
                    1 == i.myOrderPage && (a.noMyOrderData = 1), i.setData(a)
                }
            }
        })
    },
    getMoreMyOrder: function() {
        this.data.noMyOrderMore || this.getMyOrderList()
    },
    cancelOrder: function(i) {
        var n = this;
        this.canCancel && wx.showModal({
            title: "取消订单并退款",
            content: "取消订单后，款项将原路退回到您的支付账户；详情请查看退款进度。",
            confirmText: "取消订单",
            confirmColor: "#ff5344",
            cancelText: "再等等",
            cancelColor: "#666666",
            success: function(t) {
                if (t.confirm) {
                    n.canCancel = !1;
                    var e = i.currentTarget.dataset.type,
                        o = i.currentTarget.dataset.index,
                        a = wx.getStorageSync("token");
                    app.util.request({
                        url: "entry/wxapp/index",
                        data: {
                            controller: "order.del_cancle_order",
                            token: a,
                            order_id: e
                        },
                        dataType: "json",
                        method: "POST",
                        success: function(t) {
                            0 == t.data.code ? wx.showModal({
                                title: "提示",
                                content: "取消订单成功",
                                showCancel: !1,
                                confirmColor: "#ff5344",
                                success: function(t) {
                                    if (t.confirm) {
                                        var e = n.data.myOrderList;
                                        e[o].order_status_id = 5, n.setData({
                                            myOrderList: e
                                        })
                                    }
                                }
                            }) : (n.canCancel = !0, wx.showToast({
                                title: t.data.msg || "取消订单失败",
                                icon: "none"
                            }))
                        }
                    }), console.log("用户点击确定")
                } else t.cancel && (n.canCancel = !0, console.log("用户点击取消"))
            }
        })
    },
    callTelphone: function(t) {
        var e = t.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: e
        })
    },
    getOrderList: function() {
        var n = this,
            t = this.options && this.options.id || 0;
        wx.showLoading(), app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "solitaire.get_soli_order_list",
                page: this.orderPage,
                id: t,
                size: 6
            },
            dataType: "json",
            success: function(t) {
                if (wx.hideLoading(), 0 == t.data.code) {
                    var e = {}, o = t.data.data;
                    o.length < 6 && (e.noOrderMore = !0);
                    var a = n.data.orderList.concat(o);
                    n.orderPage++, n.setData(_extends({
                        orderList: a
                    }, e))
                } else if (1 == t.data.code) {
                    var i = {};
                    1 == n.orderPage && (i.noOrderData = 1), n.setData(_extends({
                        noOrderMore: !0
                    }, i))
                }
            }
        })
    },
    getMoreOrder: function() {
        this.data.noOrderMore || this.getOrderList()
    },
    onReachBottom: function() {
        if (!this.data.loadMore) return !1;
        this.getCommentList()
    },
    drawImg: function(t, e) {
        var o = e.images_list,
            a = e.qrcode_image,
            i = e.content.replace(/&lt;\/?.+?&gt;/g, ""),
            n = [],
            r = 300;
        o.length && (n.push({
            type: "image",
            url: o[0],
            css: {
                width: "442px",
                height: "300px",
                top: "230px",
                left: "36px",
                rotate: "0",
                borderRadius: "",
                borderWidth: "",
                borderColor: "",
                shadow: "",
                mode: "scaleToFill"
            }
        }), r = 0), this.setData({
            template: {
                width: "514px",
                height: 710 - r + "px",
                background: "#fff",
                views: [{
                    type: "image",
                    url: t.avatar,
                    css: {
                        width: "46px",
                        height: "46px",
                        top: "25px",
                        left: "36px",
                        rotate: "0",
                        borderRadius: "3px",
                        borderWidth: "",
                        borderColor: "#000000",
                        shadow: "",
                        mode: "scaleToFill"
                    }
                }, {
                    type: "text",
                    text: t.head_name,
                    css: {
                        color: "#000000",
                        background: "",
                        width: "385px",
                        height: "20.02px",
                        top: "30px",
                        left: "96px",
                        rotate: "0",
                        borderRadius: "",
                        borderWidth: "",
                        borderColor: "#000000",
                        shadow: "",
                        padding: "0px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        maxLines: "1",
                        lineHeight: "20.202000000000005px",
                        textStyle: "fill",
                        textDecoration: "none",
                        fontFamily: "",
                        textAlign: "left"
                    }
                }, {
                    type: "text",
                    text: t.community_name,
                    css: {
                        color: "#999999",
                        background: "",
                        width: "385px",
                        height: "17.16px",
                        top: "52px",
                        left: "96px",
                        rotate: "0",
                        borderRadius: "",
                        borderWidth: "",
                        borderColor: "#000000",
                        shadow: "",
                        padding: "0px",
                        fontSize: "12px",
                        fontWeight: "normal",
                        maxLines: "1",
                        lineHeight: "17.316000000000003px",
                        textStyle: "fill",
                        textDecoration: "none",
                        fontFamily: "",
                        textAlign: "left"
                    }
                }, {
                    type: "text",
                    text: i,
                    css: {
                        color: "#666666",
                        background: "",
                        width: "442px",
                        height: "52.181999999999995px",
                        top: "158px",
                        left: "36px",
                        rotate: "0",
                        borderRadius: "",
                        borderWidth: "",
                        borderColor: "#000000",
                        shadow: "",
                        padding: "0px",
                        fontSize: "18px",
                        fontWeight: "normal",
                        maxLines: "2",
                        lineHeight: "25.974000000000004px",
                        textStyle: "fill",
                        textDecoration: "none",
                        fontFamily: "",
                        textAlign: "left"
                    }
                }, {
                    type: "text",
                    text: e.solitaire_name,
                    css: {
                        color: "#000000",
                        background: "",
                        width: "442px",
                        height: "42.89999999999999px",
                        top: "95px",
                        left: "36px",
                        rotate: "0",
                        borderRadius: "",
                        borderWidth: "",
                        borderColor: "#000000",
                        shadow: "",
                        padding: "0px",
                        fontSize: "30px",
                        fontWeight: "normal",
                        maxLines: "1",
                        lineHeight: "43.290000000000006px",
                        textStyle: "fill",
                        textDecoration: "none",
                        fontFamily: "",
                        textAlign: "left"
                    }
                }, {
                    type: "text",
                    text: "一群人正在赶来接龙",
                    css: {
                        color: "#999999",
                        background: "",
                        width: "442px",
                        height: "22.88px",
                        top: 595 - r + "px",
                        left: "204px",
                        rotate: "0",
                        borderRadius: "",
                        borderWidth: "",
                        borderColor: "#000000",
                        shadow: "",
                        padding: "0px",
                        fontSize: "16px",
                        fontWeight: "normal",
                        maxLines: "2",
                        lineHeight: "23.088000000000005px",
                        textStyle: "fill",
                        textDecoration: "none",
                        fontFamily: "",
                        textAlign: "left"
                    }
                }, {
                    type: "text",
                    text: "长按识别或扫码参与",
                    css: {
                        color: "#999999",
                        background: "",
                        width: "442px",
                        height: "22.88px",
                        top: 630 - r + "px",
                        left: "204px",
                        rotate: "0",
                        borderRadius: "",
                        borderWidth: "",
                        borderColor: "#000000",
                        shadow: "",
                        padding: "0px",
                        fontSize: "16px",
                        fontWeight: "normal",
                        maxLines: "2",
                        lineHeight: "23.088000000000005px",
                        textStyle: "fill",
                        textDecoration: "none",
                        fontFamily: "",
                        textAlign: "left"
                    }
                }, {
                    type: "image",
                    url: a,
                    css: {
                        width: "120px",
                        height: "120px",
                        top: 560 - r + "px",
                        left: "356px",
                        rotate: "0",
                        borderRadius: "",
                        borderWidth: "",
                        borderColor: "#000000",
                        shadow: "",
                        mode: "scaleToFill"
                    }
                }].concat(n)
            }
        })
    },
    onImgOK: function(t) {
        this.imagePath = t.detail.path, this.setData({
            image: this.imagePath
        })
    },
    saveImage: function() {
        var e = this;
        wx.saveImageToPhotosAlbum({
            filePath: this.imagePath,
            success: function(t) {
                e.setData({
                    showShareModal: !1
                }), wx.showToast({
                    title: "保存成功！"
                })
            },
            fail: function(t) {
                wx.showToast({
                    title: "保存失败，请重试！",
                    icon: "none"
                })
            }
        })
    },
    handleShareModal: function(t) {
        var e = {};
        "order" == (t ? t.currentTarget.dataset.type : "") ? e.showOrderModal = !this.data.showOrderModal : e.showShareModal = !this.data.showShareModal, this.setData(e)
    },
    onShareAppMessage: function() {
        var t = wx.getStorageSync("member_id") || "",
            e = this.data.soli_info || "";
        return {
            title: e.solitaire_name || "",
            path: "lionfish_comshop/moduleA/solitaire/details?id=" + e.id + "&share_id=" + t,
            success: function(t) {},
            fail: function(t) {}
        }
    }
});