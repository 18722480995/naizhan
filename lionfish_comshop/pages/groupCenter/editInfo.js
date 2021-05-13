var _extends = Object.assign || function(e) {
        for (var i = 1; i < arguments.length; i++) {
            var n = arguments[i];
            for (var t in n) Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t])
        }
        return e
    }, app = getApp();
Page({
    data: {
        tixian_money: "",
        final_money: 0,
        sxfee: 0,
        type: 1,
        items: [{
            name: "1",
            value: "余额",
            show: !0,
            checked: !1
        }, {
            name: "2",
            value: "微信零钱",
            show: !0,
            checked: !1
        }, {
            name: "3",
            value: "支付宝",
            show: !0,
            checked: !1
        }, {
            name: "4",
            value: "银行卡",
            show: !0,
            checked: !1
        }]
    },
    canTixian: !0,
    onLoad: function(e) {
        var i = wx.getStorageSync("token"),
            _ = this;
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "community.get_community_info",
                token: i
            },
            dataType: "json",
            success: function(e) {
                if (0 == e.data.code) {
                    var i = e.data,
                        n = _.data.items,
                        t = i.community_info;
                    0 == t.head_commiss_tixianway_yuer && (n[0].show = !1), 0 == t.head_commiss_tixianway_weixin && (n[1].show = !1), 0 == t.head_commiss_tixianway_alipay && (n[2].show = !1), 0 == t.head_commiss_tixianway_bank && (n[3].show = !1);
                    for (var a = _.data.type, o = 0; o < n.length; o++) if (n[o].show) {
                        n[o].checked = !0, a = n[o].name;
                        break
                    }
                    var s = i.head_commiss_tixian_publish,
                        m = "" != s,
                        c = e.data,
                        r = c.is_need_subscript,
                        u = c.need_subscript_template;
                    _.setData({
                      head_commiss_tixian_publish: s.replace('< img ', '< img style="max-width:100%;height:auto;display:block;margin:10px 0;"'),
                        member_info: i.member_info,
                        community_info: i.community_info,
                        commission_info: i.commission_info,
                        community_tixian_fee: i.community_tixian_fee,
                        community_min_money: i.community_min_money,
                        items: n,
                        type: a,
                        hasTixianPublish: m,
                        is_need_subscript: r,
                        need_subscript_template: u
                    })
                } else wx.reLaunch({
                    url: "/lionfish_comshop/pages/user/me"
                })
            }
        })
    },
    bindTixianMoneyInput: function(e) {
        var i = this.data.commission_info.money,
            n = e.detail.value;
        i < n && wx.showToast({
            title: "本次最大可提现" + i + "元",
            icon: "none"
        });
        var t = (n * (100 - this.data.community_tixian_fee) / 100).toFixed(2),
            a = (n - t).toFixed(2);
        this.setData({
            tixian_money: n,
            final_money: t,
            sxfee: a
        })
    },
    getAll: function() {
        var e = this.data.commission_info.money,
            i = (e * (100 - this.data.community_tixian_fee) / 100).toFixed(2),
            n = (e - i).toFixed(2);
        this.setData({
            tixian_money: e,
            final_money: i,
            sxfee: n
        })
    },
    formSubmit: function(e) {
        var i = e.detail.value,
            n = 0,
            t = this.data.type,
            a = [{}, {}, {
                bankusername: "微信真实姓名"
            }, {
                bankusername: "支付宝真实姓名",
                bankaccount: "支付宝账户"
            }, {
                bankname: "银行卡名称",
                bankusername: "持卡人姓名",
                bankaccount: "银行卡账户"
            }];
        for (var o in i) {
            if (i[o] = i[o].replace(/(^\s*)|(\s*$)/g, ""), !i[o]) {
                var s = a[t][o];
                wx.showToast({
                    title: "请输入" + (s || "正确的表单内容"),
                    icon: "none"
                }), n = 1;
                break
            }
            if ("money" == o && 1 * i[o] <= 0) return void wx.showToast({
                title: "请输入正确的金额",
                icon: "none"
            })
        }
        if (console.log(n), 1 != n) {
            i.type = t, console.log(i);
            var m = this.data,
                c = parseFloat(m.tixian_money),
                r = m.commission_info.money,
                u = parseFloat(m.community_min_money);
            if ("" == c || c < u) return wx.showToast({
                title: "最小提现" + u + "元",
                icon: "none"
            }), !1;
            if (r < c) {
                wx.showToast({
                    title: "本次最大可提现" + r + "元",
                    icon: "none"
                });
                var _ = (r * (100 - m.community_tixian_fee) / 100).toFixed(2),
                    h = (r - _).toFixed(2);
                return this.setData({
                    tixian_money: r,
                    final_money: _,
                    sxfee: h
                }), !1
            }
            if (this.canTixian) {
                this.canTixian = !1;
                var d = wx.getStorageSync("token"),
                    l = this;
                wx.showLoading(), app.util.request({
                    url: "entry/wxapp/user",
                    data: _extends({
                        controller: "community.tixian_community_info",
                        token: d
                    }, i),
                    dataType: "json",
                    success: function(e) {
                        0 == e.data.code ? wx.showToast({
                            title: "提现成功，等待审核",
                            icon: "none",
                            duration: 2e3,
                            mask: !0,
                            success: function() {
                                wx.redirectTo({
                                    url: "/lionfish_comshop/pages/groupCenter/cashList"
                                })
                            }
                        }) : wx.showToast({
                            title: "提现失败",
                            icon: "none",
                            duration: 2e3,
                            mask: !0
                        }), setTimeout(function() {
                            l.canTixian = !0
                        }, 500)
                    }
                })
            }
        }
    },
    radioChange: function(e) {
        this.setData({
            type: e.detail.value
        })
    }
});