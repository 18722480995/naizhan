var app = getApp(),
    util = require("../../utils/util.js");
Page({
    data: {
        canPay: !1,
        money: "",
        onFocus: !1,
        accountMoney: 0,
        chargetype_list: [],
        activeTypeId: ""
    },
    rech_id: 0,
    onLoad: function(t) {
        this.getAccountMoney()
    },
    onShow: function() {
        util.check_login() || wx.redirectTo({
            url: "/lionfish_comshop/pages/user/me"
        })
    },
    getAccountMoney: function() {
        var t = wx.getStorageSync("token"),
            i = this;
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "user.get_account_money",
                token: t
            },
            dataType: "json",
            success: function(t) {
                if (0 == t.data.code) {
                    var e = t.data,
                        a = e.member_charge_publish,
                        n = e.chargetype_list;
                    i.setData({
                        accountMoney: e.data,
                        chargetype_list: n,
                      member_charge_publish: a.replace('< img ', '< img style="max-width:100%;height:auto;display:block;margin:10px 0;"')
                    })
                } else 1 == t.data.code && wx.redirectTo({
                    url: "/lionfish_comshop/pages/user/me"
                })
            }
        })
    },
    getMoney: function(t) {
        var e = t.detail.value;
        e ? this.setData({
            canPay: !0
        }) : this.setData({
            canPay: !1
        });
        var a = e;
        this.setData({
            money: a
        })
    },
    wxcharge: function() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
            e = 0;
        if (0 < t) e = t;
        else {
            e = this.data.money;
            if (!/^\d+(\.\d+)?$/.test(e)) return wx.showToast({
                title: "请输入正确的金额",
                icon: "none"
            }), !1
        }
        var a = parseFloat(e).toFixed(2) || 0,
            n = wx.getStorageSync("token"),
            i = this;
        i.data.canPay && app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "car.wxcharge",
                token: n,
                money: a,
                rech_id: i.rech_id
            },
            dataType: "json",
            success: function(t) {
                wx.requestPayment({
                    appId: t.data.appId,
                    timeStamp: t.data.timeStamp,
                    nonceStr: t.data.nonceStr,
                    package: t.data.package,
                    signType: t.data.signType,
                    paySign: t.data.paySign,
                    success: function(t) {
                        i.setData({
                            canPay: !1,
                            activeTypeId: 0
                        }), i.getAccountMoney(), i.rech_id = 0, wx.showToast({
                            icon: "none",
                            title: "充值成功"
                        }), setTimeout(function() {
                            wx.reLaunch({
                                url: "/lionfish_comshop/pages/user/me"
                            })
                        }, 2e3)
                    },
                    fail: function(t) {
                        0 < i.rech_id && (i.setData({
                            canPay: !1,
                            activeTypeId: 0
                        }), i.rech_id = 0), wx.showToast({
                            icon: "none",
                            title: "充值失败，请重试！"
                        })
                    }
                })
            }
        })
    },
    bindIptFocus: function() {
        this.rech_id = 0, this.setData({
            onFocus: !0,
            activeTypeId: 0,
            money: "",
            canPay: !1
        })
    },
    bindIptBlur: function() {
        this.setData({
            onFocus: !1
        })
    },
    goCharge: function(t) {
        var e = this,
            a = this.data.chargetype_list,
            n = t.currentTarget.dataset.idx,
            i = a[n].id,
            c = a[n].money;
        this.rech_id = i, this.setData({
            canPay: !0
        }, function() {
            e.wxcharge(c)
        })
    },
    selChargeType: function(t) {
        var e = this.data.chargetype_list,
            a = t.currentTarget.dataset.idx,
            n = e[a].id || 0,
            i = e[a].money;
        this.rech_id = n, this.setData({
            activeTypeId: n,
            money: i,
            canPay: !0
        })
    }
});