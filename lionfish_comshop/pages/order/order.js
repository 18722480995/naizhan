
var util = require("../../utils/util.js"),
    app = getApp(),
    status = require("../../utils/index.js");

function count_down(e, t) {
    var o = Math.floor(t / 1e3),
        a = o / 3600 / 24,
        r = Math.floor(a),
        n = o / 3600 - 24 * r,
        i = Math.floor(n),
        s = o / 60 - 1440 * r - 60 * i,
        d = Math.floor(s),
        c = o - 86400 * r - 3600 * i - 60 * d;
    e.setData({
        endtime: {
            days: r,
            hours: fill_zero_prefix(i),
            minutes: fill_zero_prefix(d),
            seconds: fill_zero_prefix(c),
            show_detail: 1
        }
    }), t <= 0 ? e.setData({
        changeState: 1,
        endtime: {
            days: "00",
            hours: "00",
            minutes: "00",
            seconds: "00"
        }
    }) : setTimeout(function() {
        count_down(e, t -= 1e3)
    }, 1e3)
}
function fill_zero_prefix(e) {
    return e < 10 ? "0" + e : e
}
Page({
    mixins: [require("../../mixin/compoentCartMixin.js")],
    data: {
        endtime: {
            days: "00",
            hours: "00",
            minutes: "00",
            seconds: "00"
        },
        cancelOrderVisible: !1,
        orderSkuResps: [],
        tablebar: 4,
        navState: 0,
        theme_type: "",
        loadover: !1,
        pingtai_deal: 0,
        is_show: !1,
        order: {},
        common_header_backgroundimage: "",
        isShowModal: !1,
        userInfo: {},
        groupInfo: {
            group_name: "社区",
            owner_name: "团长",
            delivery_ziti_name: "到点自提",
            delivery_tuanzshipping_name: "团长配送",
            delivery_express_name: "快递配送"
        },
        is_show_guess_like: 1,
        showRefundModal: !1
    },
    is_show_tip: "",
    timeOut: function() {
        console.log("计时完成")
    },
    options: "",
    canCancel: !0,
    isFirst: 1,
    onLoad: function(e) {
        var u = this;
        u.options = e;
        var t = wx.getStorageSync("userInfo");
        t && (t.shareNickName = 3 < t.nickName.length ? t.nickName.substr(0, 3) + "..." : t.nickName), status.setGroupInfo().then(function(e) {
            u.setData({
                groupInfo: e
            })
        }), util.check_login() ? this.setData({
            needAuth: !1
        }) : this.setData({
            needAuth: !0
        }), u.setData({
            common_header_backgroundimage: app.globalData.common_header_backgroundimage,
            userInfo: t
        });
        var o = wx.getStorageSync("token");
        wx.hideShareMenu(), wx.showLoading();
        var _ = e && e.is_show || 0,
            a = e && e.isfail || "";
        null != (this.is_show_tip = _) && 1 == _ || wx.showLoading(), null != a && 1 == a && wx.showToast({
            title: "支付失败",
            icon: "none"
        }), app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "order.order_info",
                token: o,
                id: e.id
            },
            dataType: "json",
            method: "POST",
            success: function(e) {
                if (setTimeout(function() {
                    wx.hideLoading()
                }, 1e3), 0 == e.data.code) {
                    var t = e.data.data.order_info;
                    if (null != _ && 1 == _ && "integral" == t.type) wx.showToast({
                        title: "兑换成功"
                    });
                    else if (null != _ && 1 == _) if (1 == e.data.order_pay_after_share) {
                        var o = e.data.data.share_img;
                        u.setData({
                            share_img: o,
                            isShowModal: !0
                        })
                    } else wx.showToast({
                        title: "支付成功"
                    });
                    if (3 == t.order_status_id) {
                        var a = 1e3 * (t.over_buy_time - t.cur_time);
                        0 < a ? count_down(u, a) : 1 == t.open_auto_delete && u.setData({
                            changeState: 1
                        })
                    }
                    var r = e.data,
                        n = r.pingtai_deal,
                        i = r.order_refund,
                        s = r.order_can_del_cancle,
                        d = r.is_hidden_orderlist_phone,
                        c = r.is_show_guess_like,
                        l = r.user_service_switch;
                    u.setData({
                        order: e.data.data,
                        pingtai_deal: n,
                        order_refund: i,
                        order_can_del_cancle: s,
                        loadover: !0,
                        is_show: 1,
                        hide_lding: !0,
                        is_hidden_orderlist_phone: d || 0,
                        is_show_guess_like: c || 0,
                        user_service_switch: l || 1
                    }), u.hide_lding()
                } else 2 == e.data.code && u.setData({
                    needAuth: !0
                })
            }
        })
    },
    onShow: function() {
        console.log(this.isFirst, "onShow", this.options.id), 1 < this.isFirst && this.reload_data(), this.isFirst++
    },
    onHide: function() {
        console.log("order Hide")
    },
    authSuccess: function() {
        this.onLoad(this.options)
    },
    reload_data: function() {
        console.log("reload_data--", this.options.id);
        var a = this,
            e = wx.getStorageSync("token"),
            t = this.options.id || "";
        t && app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "order.order_info",
                token: e,
                id: t
            },
            dataType: "json",
            method: "POST",
            success: function(e) {
                var t = e.data.data.order_info;
                if (3 == t.order_status_id) {
                    var o = 1e3 * (t.over_buy_time - t.cur_time);
                    0 < o ? count_down(a, o) : a.setData({
                        changeState: 1
                    })
                }
                a.setData({
                    order: e.data.data,
                    pingtai_deal: e.data.pingtai_deal,
                    order_refund: e.data.order_refund,
                    loadover: !0,
                    is_show: 1,
                    hide_lding: !0
                })
            }
        })
    },
    receivOrder: function(e) {
        var t = e.currentTarget.dataset.type || "",
            o = wx.getStorageSync("token"),
            a = this;
        wx.showModal({
            title: "提示",
            content: "确认收到",
            confirmColor: "#F75451",
            success: function(e) {
                e.confirm && app.util.request({
                    url: "entry/wxapp/index",
                    data: {
                        controller: "order.receive_order",
                        token: o,
                        order_id: t
                    },
                    dataType: "json",
                    success: function(e) {
                        0 == e.data.code && (wx.showToast({
                            title: "收货成功",
                            icon: "success",
                            duration: 1e3
                        }), a.reload_data())
                    }
                })
            }
        })
    },
    cancelSubmit: function(e) {
        var t = e.detail.formId,
            o = wx.getStorageSync("token");
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "user.get_member_form_id",
                token: o,
                from_id: t
            },
            dataType: "json",
            success: function(e) {}
        })
    },
    payNowSubmit: function(e) {
        var t = e.detail.formId,
            o = wx.getStorageSync("token");
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "user.get_member_form_id",
                token: o,
                from_id: t
            },
            dataType: "json",
            success: function(e) {}
        })
    },
    callDialog: function(e) {
        var t = e.currentTarget.dataset.type || "",
            o = wx.getStorageSync("token");
        wx.showModal({
            title: "取消支付",
            content: "好不容易挑出来，确定要取消吗？",
            confirmColor: "#F75451",
            success: function(e) {
                e.confirm && app.util.request({
                    url: "entry/wxapp/index",
                    data: {
                        controller: "order.cancel_order",
                        token: o,
                        order_id: t
                    },
                    dataType: "json",
                    success: function(e) {
                        wx.showToast({
                            title: "取消成功",
                            icon: "success",
                            complete: function() {
                                wx.redirectTo({
                                    url: "/lionfish_comshop/pages/order/index"
                                })
                            }
                        })
                    }
                })
            }
        })
    },
    applyForService: function(e) {
        var t = e.currentTarget.dataset.type || "",
            o = e.currentTarget.dataset.order_goods_id;
        wx.getStorageSync("token");
        t && wx.redirectTo({
            url: "/lionfish_comshop/pages/order/refund?id=" + t + "&order_goods_id=" + o
        })
    },
    payNow: function(e) {
        var t = e.currentTarget.dataset.type || "",
            o = wx.getStorageSync("token");
        t && app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "car.wxpay",
                token: o,
                order_id: t
            },
            dataType: "json",
            method: "POST",
            success: function(e) {
                0 == e.data.code ? wx.requestPayment({
                    appId: e.data.appId,
                    timeStamp: e.data.timeStamp,
                    nonceStr: e.data.nonceStr,
                    package: e.data.package,
                    signType: e.data.signType,
                    paySign: e.data.paySign,
                    success: function(e) {
                        wx.redirectTo({
                            url: "/lionfish_comshop/pages/order/order?id=" + t + "&is_show=1"
                        })
                    },
                    fail: function(e) {
                        console.log(e)
                    }
                }) : 2 == e.data.code && wx.showToast({
                    title: e.data.msg,
                    icon: "none"
                })
            }
        })
    },
    hide_lding: function() {
        wx.hideLoading(), this.setData({
            is_show: !0
        })
    },
    call_mobile: function(e) {
        var t = e.currentTarget.dataset.mobile;
        wx.makePhoneCall({
            phoneNumber: t
        })
    },
    goComment: function(e) {
        var t = e.currentTarget.dataset.type,
            o = e.currentTarget.dataset.order_goods_id,
            a = e.currentTarget.dataset.goods_id;
        3 < getCurrentPages().length ? wx.redirectTo({
            url: "/lionfish_comshop/pages/order/evaluate?id=" + t + "&goods_id=" + a + "&order_goods_id=" + o
        }) : wx.navigateTo({
            url: "/lionfish_comshop/pages/order/evaluate?id=" + t + "&goods_id=" + a + "&order_goods_id=" + o
        })
    },
    gokefu: function(e) {
        var t = e.currentTarget.dataset.s_id;
        this.data.goods, this.data.seller_info;
        3 < getCurrentPages().length ? wx.redirectTo({
            url: "/pages/im/index?id=" + t
        }) : wx.navigateTo({
            url: "/pages/im/index?id=" + t
        })
    },
    goRefund: function(e) {
        var t = e.currentTarget.dataset.id || 0;
        t && (3 < getCurrentPages().length ? wx.redirectTo({
            url: "/lionfish_comshop/pages/order/refunddetail?id=" + t
        }) : wx.navigateTo({
            url: "/lionfish_comshop/pages/order/refunddetail?id=" + t
        }))
    },
    closeModal: function(e) {
        var t = {};
        1 == (e.currentTarget.dataset.type || 0) ? t.showRefundModal = !1 : t.isShowModal = !1, this.setData(t)
    },
    cancelOrder: function(a) {
        var r = this;
        this.canCancel && wx.showModal({
            title: "取消订单并退款",
            content: "取消订单后，款项将原路退回到您的支付账户；详情请查看退款进度。",
            confirmText: "取消订单",
            confirmColor: "#ff5344",
            cancelText: "再等等",
            cancelColor: "#666666",
            success: function(e) {
                if (e.confirm) {
                    r.canCancel = !1;
                    var t = a.currentTarget.dataset.type,
                        o = wx.getStorageSync("token");
                    app.util.request({
                        url: "entry/wxapp/index",
                        data: {
                            controller: "order.del_cancle_order",
                            token: o,
                            order_id: t
                        },
                        dataType: "json",
                        method: "POST",
                        success: function(e) {
                            0 == e.data.code ? wx.showModal({
                                title: "提示",
                                content: "取消订单成功",
                                showCancel: !1,
                                confirmColor: "#ff5344",
                                success: function(e) {
                                    e.confirm && wx.redirectTo({
                                        url: "/lionfish_comshop/pages/order/index"
                                    })
                                }
                            }) : (r.canCancel = !0, wx.showToast({
                                title: e.data.msg || "取消订单失败",
                                icon: "none"
                            }))
                        }
                    }), console.log("用户点击确定")
                } else e.cancel && (r.canCancel = !0, console.log("用户点击取消"))
            }
        })
    },
    showRefundInfo: function(e) {
        var t = e.currentTarget.dataset.idx;
        if (0 < e.currentTarget.dataset.hasrefund) {
            var o = this.data.order.order_goods_list[t];
            this.setData({
                showRefundModal: !0,
                refundGoodsInfo: o
            })
        }
    },
    onShareAppMessage: function(e) {
        var t = this.data.order.order_info.order_id || "",
            o = this.data.order.order_goods_list[0].goods_share_image,
            a = this.data.share_img;
        if (t && 1 == this.is_show_tip) return {
            title: "@" + this.data.order.order_info.ziti_name + this.data.groupInfo.owner_name + "，我是" + this.data.userInfo.shareNickName + "，刚在你这里下单啦！！！",
            path: "lionfish_comshop/pages/order/shareOrderInfo?order_id=" + t,
            imageUrl: a || o
        }
    }
});