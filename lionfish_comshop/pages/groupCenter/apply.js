var util = require("../../utils/util.js"),
    status = require("../../utils/index.js"),
    locat = require("../../utils/Location.js"),
    app = getApp(),
    clearTime = null;
Page({
    data: {
        pass: -2,
        canSubmit: !1,
        region: ["选择地址", "", ""],
        addr_detail: "",
        lon_lat: "",
        focus_mobile: !1,
        showCountDown: !0,
        timeStamp: 60,
        apply_complete: !1,
        wechat: "",
        needAuth: !1,
        member_info: {
            is_head: 0
        },
        groupInfo: {
            group_name: "社区",
            owner_name: "团长"
        }
    },
    community_id: "",
    bindRegionChange: function(t) {
        this.setData({
            region: t.detail.value.replace(/^\s*|\s*$/g, "")
        })
    },
    inputAddress: function(t) {
        this.setData({
            addr_detail: t.detail.value.replace(/^\s*|\s*$/g, "")
        })
    },
    inputCommunity: function(t) {
        this.setData({
            community_name: t.detail.value.replace(/^\s*|\s*$/g, "")
        })
    },
    inputMobile: function(t) {
        this.setData({
            mobile_detail: t.detail.value.replace(/^\s*|\s*$/g, "")
        })
    },
    inputRealName: function(t) {
        this.setData({
            head_name: t.detail.value.replace(/^\s*|\s*$/g, "")
        })
    },
    inputWechat: function(t) {
        this.setData({
            wechat: t.detail.value.replace(/^\s*|\s*$/g, "")
        })
    },
    chose_location: function() {
        var d = this;
        wx.chooseLocation({
            success: function(t) {
                var e = t.longitude + "," + t.latitude,
                    a = t.address,
                    n = d.data.region,
                    i = "",
                    o = a,
                    s = new RegExp("(.*?省)(.*?市)(.*?区)", "g"),
                    c = s.exec(o);
                null == c && null == (c = (s = new RegExp("(.*?省)(.*?市)(.*?市)", "g")).exec(o)) ? null != (c = (s = new RegExp("(.*?省)(.*?市)(.*县)", "g")).exec(o)) && (n[0] = c[1], n[1] = c[2], n[2] = c[3], i = a.replace(c[0], "")) : (n[0] = c[1], n[1] = c[2], n[2] = c[3], i = a.replace(c[0], ""));
                var u = i + t.name,
                    r = u,
                    l = "";
                locat.getGpsLocation(t.latitude, t.longitude).then(function(t) {
                    (l = t) && (n[0] = l.province, n[1] = l.city, n[2] = l.district, r = u || l.street), d.setData({
                        region: n,
                        lon_lat: e,
                        addr_detail: r
                    })
                }), "省" == n[0] && wx.showToast({
                    title: "请重新选择省市区",
                    icon: "none"
                })
            },
            fail: function(t) {
                console.log("地址获取失败", t)
            }
        })
    },
    subscriptionNotice: function() {
        console.log("subscriptionNotice");
        var o = this;
        return new Promise(function(t, e) {
            var i = o.data.need_subscript_template,
                a = Object.keys(i).map(function(t) {
                    return i[t]
                });
            wx.requestSubscribeMessage ? a.length && wx.requestSubscribeMessage({
                tmplIds: a,
                success: function(e) {
                    var a = 1,
                        n = [];
                    Object.keys(i).forEach(function(t) {
                        "accept" == e[i[t]] ? n.push(t) : a = 0
                    }), n.length && o.addAccept(n), o.setData({
                        is_need_subscript: a
                    }), t()
                },
                fail: function() {
                    e()
                }
            }) : e()
        })
    },
    addAccept: function(t) {
        var e = wx.getStorageSync("token"),
            a = t.join(",");
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "user.collect_subscriptmsg",
                token: e,
                type: a
            },
            dataType: "json",
            method: "POST",
            success: function() {}
        })
    },
    submit: function() {
        if (this.authModal()) {
            var t = this,
                e = wx.getStorageSync("token"),
                a = this.data.region[0],
                n = this.data.region[1],
                i = this.data.region[2],
                o = this.data.addr_detail,
                s = this.data.community_name,
                c = this.data.mobile_detail,
                u = this.data.lon_lat,
                r = this.data.head_name,
                l = this.data.wechat;
            if ("" == r || void 0 === r) return wx.showToast({
                title: "请填写姓名",
                icon: "none"
            }), !1;
            if ("" == c || !/^1(3|4|5|6|7|8|9)\d{9}$/.test(c)) return this.setData({
                focus_mobile: !0
            }), wx.showToast({
                title: "手机号码有误",
                icon: "none"
            }), !1;
            if ("" == l || void 0 === l) return wx.showToast({
                title: "请填写微信号",
                icon: "none"
            }), !1;
            if ("" == s || void 0 === s) return wx.showToast({
                title: "请填写小区名称",
                icon: "none"
            }), !1;
            if ("省" == a && "市" == n && "区" == i) return wx.showToast({
                title: "请选择地区",
                icon: "none"
            }), !1;
            if ("" == u || void 0 === u) return wx.showToast({
                title: "请选择地图位置",
                icon: "none"
            }), !1;
            if ("" == o || void 0 === o) return wx.showToast({
                title: "请填写详细地址",
                icon: "none"
            }), !1;
            var d = {
                province_name: a,
                city_name: n,
                area_name: i,
                lon_lat: u,
                addr_detail: o,
                community_name: s,
                mobile: c,
                head_name: r,
                wechat: l,
                controller: "community.sub_community_head",
                token: e,
                community_id: this.community_id
            };
            1 == this.data.is_need_subscript ? this.subscriptionNotice().then(function() {
                t.preSubmit(d)
            }).
            catch (function() {
                t.preSubmit(d)
            }) : t.preSubmit(d)
        }
    },
    preSubmit: function(t) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/user",
            data: t,
            method: "post",
            dataType: "json",
            success: function(t) {
                0 == t.data.code ? (wx.showToast({
                    title: "提交成功，等待审核",
                    icon: "none",
                    duration: 2e3
                }), e.setData({
                    apply_complete: !0
                })) : e.setData({
                    needAuth: !0
                })
            }
        })
    },
    onLoad: function(t) {
        var a = this;
        status.setNavBgColor(), status.setGroupInfo().then(function(t) {
            var e = t && t.owner_name || "团长";
            a.setData({
                groupInfo: t
            }), wx.setNavigationBarTitle({
                title: e + "申请"
            })
        });
        var e = decodeURIComponent(t.scene);
        "undefined" != e && (this.community_id = e), this.getUserInfo(), this.checkSubscript()
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
    authModal: function() {
        return !this.data.needAuth || (this.setData({
            showAuthModal: !this.data.showAuthModal
        }), !1)
    },
    authSuccess: function() {
        var t = this;
        this.setData({
            needAuth: !1
        }, function() {
            t.getUserInfo()
        })
    },
    getUserInfo: function() {
        var a = this,
            t = wx.getStorageSync("token");
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "user.get_user_info",
                token: t
            },
            dataType: "json",
            success: function(t) {
                if (0 == t.data.code) {
                    var e = t.data.data || {
                        is_head: 0
                    };
                    1 == e.is_head && app.util.message("您已通过审核", "/lionfish_comshop/pages/groupCenter/index", "error"), a.setData({
                        member_info: e
                    })
                } else a.setData({
                    needAuth: !0
                })
            }
        })
    },
    applyAgain: function() {
        var t = this.data.member_info;
        t.is_head = 0, this.setData({
            member_info: t
        })
    },
    countDown: function() {
        var a = this;
        clearInterval(clearTime), clearTime = setInterval(function() {
            var t = a.data.timeStamp,
                e = a.data.showCountDown;
            0 < t ? t-- : (e = !0, clearInterval(clearTime), t = 60), a.setData({
                showCountDown: e,
                timeStamp: t
            })
        }, 1e3)
    },
    checkSubscript: function() {
        var i = this,
            t = wx.getStorageSync("token");
        t && app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "community.check_head_subscriptapply",
                token: t
            },
            dataType: "json",
            success: function(t) {
                if (0 == t.data.code) {
                    var e = t.data,
                        a = e.is_need_subscript,
                        n = e.need_subscript_template;
                    i.setData({
                        is_need_subscript: a,
                        need_subscript_template: n
                    })
                }
            }
        })
    }
});