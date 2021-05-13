var _extends = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var a = arguments[t];
            for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (e[o] = a[o])
        }
        return e
    }, util = require("../../utils/util.js"),
    status = require("../../utils/index.js"),
    wcache = require("../../utils/wcache.js"),
    app = getApp();
Page({
    data: {
        tablebar: 4,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        theme_type: "",
        add_mo: 0,
        is_show_on: 0,
        level_name: "",
        member_level_is_open: 0,
        is_yue_open: 0,
        needAuth: !1,
        opencommiss: 0,
        inputValue: 0,
        getfocus: !1,
        showguess: !0,
        items: [],
        auditStatus: 5,
        isShowCoder: !1,
        myCoderList: [],
        qrcodebase64: "",
        setInter: null,
        copyright: "",
        common_header_backgroundimage: "",
        enabled_front_supply: 0,
        cartNum: 0,
        is_show_about_us: 0,
        groupInfo: {
            group_name: "社区",
            owner_name: "团长"
        },
        is_show_score: 0,
        showGetPhone: !1,
        user_tool_icons: {},
        community: ""
    },
    isCalling: !1,
    onLoad: function(e) {
        wx.hideTabBar();
        var t = this;
        status.setNavBgColor(), status.setGroupInfo().then(function(e) {
            t.setData({
                groupInfo: e
            })
        }), wx.showLoading()
    },
    getMemberInfo: function() {
        var e = wx.getStorageSync("token");
        this.getCommunityInfo();
        var g = this;
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "user.get_user_info",
                token: e
            },
            dataType: "json",
            success: function(e) {
                if (setTimeout(function() {
                    wx.hideLoading()
                }, 1e3), 0 == e.data.code) {
                    var t = !1;
                    1 != e.data.is_show_auth_mobile || e.data.data.telephone || (t = !0);
                    var a = e.data.data || "",
                        o = {};
                    if (a) {
                        if (a.member_level_info && (a.member_level_info.discount = (a.member_level_info.discount / 10).toFixed(1)), 0 < e.data.commiss_level) {
                            var s = 1 * e.data.commiss_share_member_update,
                                i = 1 * e.data.share_member_count,
                                n = 1 * e.data.commiss_share_member_update - 1 * e.data.share_member_count,
                                r = 0;
                            1 == a.is_writecommiss_form && (r = 1) == a.comsiss_flag && (r = 0 == a.comsiss_state ? 1 : 2), o = {
                                formStatus: r,
                                commiss_level: e.data.commiss_level,
                                commiss_sharemember_need: e.data.commiss_sharemember_need,
                                commiss_share_member_update: s,
                                commiss_biaodan_need: e.data.commiss_biaodan_need,
                                share_member_count: i,
                                today_share_member_count: e.data.today_share_member_count,
                                yestoday_share_member_count: e.data.yestoday_share_member_count,
                                need_num_update: n
                            }
                        }
                    } else o.needAuth = !0;
                    var u = e.data,
                        _ = u.is_supply,
                        c = u.is_open_vipcard_buy,
                        m = u.modify_vipcard_name,
                        d = u.is_vip_card_member,
                        h = u.modify_vipcard_logo,
                        l = u.isopen_signinreward,
                        p = u.show_signinreward_icon;
                    g.setData(_extends({}, o, {
                        member_info: a,
                        is_supply: _ || 0,
                        showGetPhone: t,
                        is_open_vipcard_buy: c || 0,
                        modify_vipcard_name: m || "会员",
                        is_vip_card_member: d || 0,
                        modify_vipcard_logo: h,
                        show_signinreward_icon: p,
                        isopen_signinreward: l
                    }))
                } else g.setData({
                    needAuth: !0
                }), wx.hideTabBar(), wx.setStorage({
                    key: "member_id",
                    data: null
                })
            }
        })
    },
    getCommunityInfo: function() {
        var t = this,
            e = wx.getStorageSync("community");
        e ? e.head_mobile ? t.setData({
            community: e
        }) : util.getCommunityById(e.communityId).then(function(e) {
            t.setData({
                community: e.data
            })
        }) : wx.getStorageSync("token") && util.getCommunityInfo().then(function(e) {
            t.setData({
                community: e
            })
        })
    },
    getCopyright: function() {
        var v = this;
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "user.get_copyright"
            },
            dataType: "json",
            success: function(e) {
                if (0 == e.data.code) {
                    var t = e.data,
                        a = t.enabled_front_supply,
                        o = t.is_open_yue_pay,
                        s = t.is_show_score,
                        i = t.user_order_menu_icons,
                        n = t.close_community_apply_enter,
                        r = t.user_tool_icons,
                        u = t.ishow_user_loginout_btn,
                        _ = t.commiss_diy_name,
                        c = t.supply_diy_name,
                        m = t.user_service_switch,
                        d = t.fetch_coder_type,
                        h = t.show_user_pin,
                        l = t.common_header_backgroundimage,
                        p = t.is_show_about_us,
                        g = t.show_user_change_comunity,
                        f = t.open_danhead_model,
                        w = t.default_head_info,
                        b = t.is_open_solitaire,
                        y = {};
                    1 == f && (y.community = w), _ = _ || "分销", c = c || "供应商", wcache.put("commiss_diy_name", _), wcache.put("supply_diy_name", c), v.setData(_extends({
                        copyright: t.data || "",
                        common_header_backgroundimage: l || "",
                        is_show_about_us: p || 0,
                        enabled_front_supply: a,
                        is_open_yue_pay: o,
                        is_show_score: s,
                        user_order_menu_icons: i || {},
                        commiss_diy_name: _,
                        close_community_apply_enter: n || 0,
                        user_tool_icons: r || {},
                        ishow_user_loginout_btn: u || 0,
                        supply_diy_name: c,
                        user_service_switch: m,
                        fetch_coder_type: d || 0,
                        show_user_pin: h,
                        show_user_change_comunity: g,
                        open_danhead_model: f,
                        is_open_solitaire: b
                    }, y))
                }
            }
        })
    },
    authSuccess: function() {
        var t = this;
        wx.showLoading(), t.setData({
            needAuth: !1,
            showAuthModal: !1,
            tabbarRefresh: !0
        }), (0, status.cartNum)("", !0).then(function(e) {
            0 == e.code && t.setData({
                cartNum: e.data
            })
        }), t.getMemberInfo()
    },
    authModal: function() {
        return !this.data.needAuth || (this.setData({
            showAuthModal: !this.data.showAuthModal
        }), !1)
    },
    goToGroup: function() {
        5 === this.data.auditStatus ? wx.navigateTo({
            url: "/lionfish_comshop/pages/groupCenter/index"
        }) : wx.navigateTo({
            url: "/lionfish_comshop/pages/groupCenter/apply"
        })
    },
    bindGetUserInfo: function(o) {
        var s = this;
        if ("getUserInfo:ok" === o.detail.errMsg) {
            var e = Object.assign({}, wx.getStorageSync("userInfo"), {
                avatarUrl: o.detail.userInfo.avatarUrl,
                nickName: o.detail.userInfo.nickName
            }),
                t = o.detail.userInfo,
                a = t.nickName,
                i = t.avatarUrl;
            app.globalData.userInfo = e, wx.setStorage({
                key: "userInfo",
                data: e
            }), this.setData({
                userInfo: e
            }), wx.showToast({
                title: "资料已更新",
                icon: "none",
                duration: 2e3
            }), a && app.util.request({
                url: "entry/wxapp/user",
                data: {
                    controller: "user.update_user_info",
                    token: wx.getStorageSync("token"),
                    nickName: a,
                    avatarUrl: i
                },
                dataType: "json",
                success: function(e) {
                    if (0 == e.data.code) {
                        var t = s.data.member_info,
                            a = Object.assign({}, t, {
                                avatar: o.detail.userInfo.avatarUrl,
                                username: o.detail.userInfo.nickName
                            });
                        s.setData({
                            member_info: a
                        })
                    }
                }
            })
        } else wx.showToast({
            title: "资料更新失败。",
            icon: "none"
        })
    },
    previewImage: function(e) {
        var t = e.target.dataset.src;
        t && wx.previewImage({
            current: t,
            urls: [t]
        })
    },
    goLink2: function(e) {
        if (this.authModal()) {
            var t = e.currentTarget.dataset.link;
            3 < getCurrentPages().length ? wx.redirectTo({
                url: t
            }) : wx.navigateTo({
                url: t
            })
        }
    },
    onShow: function() {
        var t = this;
        util.check_login_new().then(function(e) {
            e ? (t.setData({
                needAuth: !1,
                tabbarRefresh: !0
            }), (0, status.cartNum)("", !0).then(function(e) {
                0 == e.code && t.setData({
                    cartNum: e.data
                })
            })) : (t.setData({
                needAuth: !0
            }), wx.hideLoading())
        }), t.getCopyright(), t.getMemberInfo()
    },
    onHide: function() {
        this.setData({
            tabbarRefresh: !1
        })
    },
    getReceiveMobile: function(e) {
        wx.showToast({
            icon: "none",
            title: "授权成功"
        }), this.setData({
            showGetPhone: !1
        })
    },
    close: function() {
        this.setData({
            showGetPhone: !1
        })
    },
    closeDistribution: function() {
        this.setData({
            showDistribution: !1
        })
    },
    goDistribution: function() {
        var e = this.data.member_info;
        0 == e.comsiss_flag ? this.distributionNext() : 0 == e.comsiss_state ? this.distributionNext() : wx.navigateTo({
            url: "/lionfish_comshop/distributionCenter/pages/me"
        })
    },
    distributionNext: function() {
        if (1 == this.data.commiss_sharemember_need) {
            console.log("需要分享");
            wx.navigateTo({
                url: "/lionfish_comshop/distributionCenter/pages/recruit"
            })
        } else if (1 == this.data.commiss_biaodan_need) console.log("需要表单"), wx.navigateTo({
            url: "/lionfish_comshop/distributionCenter/pages/recruit"
        });
        else {
            var e = 0,
                t = this.data.member_info;
            1 == t.comsiss_flag && (e = 0 == t.comsiss_state ? 1 : 2);
            var a = "/lionfish_comshop/distributionCenter/pages/recruit";
            2 == e && (a = "/lionfish_comshop/distributionCenter/pages/me"), wx.navigateTo({
                url: a
            })
        }
    },
    goNext: function(e) {
        console.log(e);
        var t = 0,
            a = this.data.member_info;
        1 == a.comsiss_flag && (t = 0 == a.comsiss_state ? 1 : 2);
        var o = e.currentTarget.dataset.type;
        "share" == o ? wx.navigateTo({
            url: "/lionfish_comshop/distributionCenter/pages/share"
        }) : "commiss" == o ? 2 == t ? wx.navigateTo({
            url: "/lionfish_comshop/distributionCenter/pages/me"
        }) : wx.navigateTo({
            url: "/lionfish_comshop/distributionCenter/pages/recruit"
        }) : "form" == o && (2 == t ? wx.navigateTo({
            url: "/lionfish_comshop/distributionCenter/pages/me"
        }) : wx.navigateTo({
            url: "/lionfish_comshop/distributionCenter/pages/recruit"
        }))
    },
    loginOut: function() {
        wx.removeStorageSync("community"), wx.removeStorage({
            key: "token",
            success: function(e) {
                wx.reLaunch({
                    url: "/lionfish_comshop/pages/user/me"
                })
            }
        })
    },
    toggleFetchCoder: function() {
        this.authModal() && this.setData({
            isShowCoder: !this.data.isShowCoder
        })
    },
    callTelphone: function(e) {
        var t = this,
            a = e.currentTarget.dataset.phone;
        a && (this.isCalling || (this.isCalling = !0, wx.makePhoneCall({
            phoneNumber: a,
            complete: function() {
                t.isCalling = !1
            }
        })))
    }
});