var app = getApp(),
    status = require("../../utils/index.js");
Page({
    data: {
        waitSendNum: 0,
        waitSignNum: 0,
        waitPickNum: 0,
        completeNum: 0,
        disUserId: "",
        communityName: "",
        communityId: "",
        distribution: "",
        estimate: "",
        lastMonth: "",
        isShow: !0,
        currentTab: 0,
        show_on_one: 0,
        dialogShow: 0,
        effectValidOrderNum: 0,
        groupInfo: {
            group_name: "社区",
            owner_name: "团长"
        }
    },
    onLoad: function(t) {
        var o = this;
        status.setGroupInfo().then(function(t) {
            var e = t && t.owner_name || "团长";
            wx.setNavigationBarTitle({
                title: e + "中心"
            }), o.setData({
                groupInfo: t
            })
        }), this.loadPage()

    },
    loadPage: function() {
        var e = this;
        status.loadStatus().then(function() {
            var t = app.globalData.appLoadStatus;
            0 == t && wx.redirectTo({
                url: "/lionfish_comshop/pages/user/me"
            }), e.setData({
                appLoadStatus: t,
                community: app.globalData.community
            })
        }), this.load_community_data()
    },
    load_community_data: function() {
        var t = wx.getStorageSync("token"),
            c = this;
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "community.get_community_info",
                token: t
            },
            dataType: "json",
            success: function(t) {
                if (0 == t.data.code) {
                    var e = t.data,
                        o = e.commission_info;
                    o.mix_total_money = o.mix_total_money.toFixed(2);
                    var a = t.data,
                        n = a.head_today_pay_money,
                        i = a.today_add_head_member,
                        r = a.today_after_sale_order_count,
                        s = a.today_invite_head_member,
                        u = a.is_open_solitaire;
                    c.setData({
                        member_info: e.member_info,
                        community_info: e.community_info,
                        commission_info: o,
                        total_order_count: e.total_order_count || 0,
                        total_member_count: e.total_member_count || 0,
                        today_order_count: e.today_order_count || 0,
                        today_effect_order_count: e.today_effect_order_count || 0,
                        today_pay_order_count: e.today_pay_order_count || 0,
                        today_pre_total_money: e.today_pre_total_money || 0,
                        waitSendNum: e.wait_send_count || 0,
                        waitSignNum: e.wait_qianshou_count || 0,
                        waitPickNum: e.wait_tihuo_count || 0,
                        completeNum: e.has_success_count || 0,
                        open_community_addhexiaomember: e.open_community_addhexiaomember,
                        open_community_head_leve: e.open_community_head_leve,
                        head_today_pay_money: n,
                        today_add_head_member: i,
                        today_after_sale_order_count: r,
                        today_invite_head_member: s,
                        is_open_solitaire: u
                    })
                } else wx.reLaunch({
                    url: "/lionfish_comshop/pages/user/me"
                })
            }
        })
    },
    goScan: function() {
        wx.scanCode({
            success: function(t) {
                console.log(t), "WX_CODE" == t.scanType && "" != t.path && wx.navigateTo({
                    url: "/" + t.path
                })
            }
        })
    },
    onShow: function() {
        var t = this.data.show_on_one,
            e = wx.getStorageSync("commiss_diy_name") || "分销";
        0 < t && this.load_community_data(), this.setData({
            show_on_one: 1,
            commiss_diy_name: e
        })
    },
    goOrder: function(t) {
        var e = t.currentTarget.dataset.status;
        wx.navigateTo({
            url: "/lionfish_comshop/pages/groupCenter/groupList?tab=" + e
        })
    },
    goEdit: function() {
        wx.navigateTo({
            url: "/lionfish_comshop/pages/groupCenter/setting?id=" + this.data.community_info.id
        })
    },
    switchNav: function(t) {
        if (this.data.currentTab === 1 * t.target.dataset.current) return !1;
        this.setData({
            currentTab: 1 * t.target.dataset.current
        })
    },
    bindChange: function(t) {
        this.setData({
            currentTab: 1 * t.detail.current
        });
        for (var e = 0; e < 4; e++) this.data.currentTab === e && this.setData({
            effectEstimate: this.data.effectList[e].estimate,
            effectSettle: this.data.effectList[e].settle,
            effectValidOrderNum: this.data.effectList[e].validOrderNum
        })
    },
    changeMycommunion: function() {
        var t = this.data.community_info.id;
        console.log(t);
        var e = wx.getStorageSync("token"),
            o = this;
        void 0 !== t && app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "index.addhistory_community",
                community_id: t,
                token: e
            },
            dataType: "json",
            success: function(t) {
                console.log("s1"), o.getCommunityInfo().then(function() {
                    console.log("s2"), app.globalData.changedCommunity = !0, wx.switchTab({
                        url: "/lionfish_comshop/pages/index/index"
                    })
                })
            }
        })
    },
    getCommunityInfo: function() {
        return new Promise(function(o, t) {
            var e = wx.getStorageSync("token");
            app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "index.load_history_community",
                    token: e
                },
                dataType: "json",
                success: function(t) {
                    if (0 == t.data.code) {
                        var e = t.data.list;
                        0 < Object.keys(e).length || 0 != e.communityId ? (wx.setStorageSync("community", e), app.globalData.community = e, o(e)) : o("")
                    }
                }
            })
        })
    }
});