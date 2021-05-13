var _extends = Object.assign || function(t) {
        for (var a = 1; a < arguments.length; a++) {
            var e = arguments[a];
            for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
        }
        return t
    }, app = getApp(),
    util = require("../../utils/util.js"),
    status = require("../../utils/index.js");
Page({
    data: {
        list: [],
        loadText: "加载中...",
        noData: 0,
        loadMore: !0,
        groupInfo: {
            group_name: "社区",
            owner_name: "团长"
        }
    },
    page: 1,
    onLoad: function(t) {
        var a = this;
        status.setGroupInfo().then(function(t) {
            a.setData({
                groupInfo: t
            })
        });
        var e = t.share_id,
            o = t.community_id;
        this.options = t, "undefined" != e && 0 < e && wx.setStorageSync("share_id", e), this.compareCommunity(o), this.getData(o)
    },
    initFn: function(t) {
        var a = this;
        this.page = 1, this.setData({
            list: [],
            loadText: "加载中...",
            noData: 0,
            loadMore: !0
        }, function() {
            a.getData(t)
        })
    },
    compareCommunity: function(i) {
        var s = this,
            r = wx.getStorageSync("community"),
            u = r.communityId || "",
            d = wx.getStorageSync("token");
        i && util.getCommunityById(i).then(function(t) {
            var a = t.hide_community_change_btn,
                e = t.default_head_info;
            if (1 == t.open_danhead_model) {
                if (app.globalData.community = e, app.globalData.changedCommunity = !0, wx.setStorage({
                    key: "community",
                    data: e
                }), d && util.addhistory(e), i != e.communityId) {
                    var o = s.data.groupInfo;
                    return void app.util.message("您只能访问自己" + o.group_name, "switchTo:/lionfish_comshop/pages/index/index", "error", "知道了")
                }
            } else if ("" != u && i) {
                if (console.log("currentCommunityId存在 比较社区"), u != i) {
                    console.log("currentCommunityId存在 社区不同");
                    var n = s.data.groupInfo;
                    if (1 == a) return console.log("禁止切换"), void app.util.message("您只能访问自己" + n.group_name, "switchTo:/lionfish_comshop/pages/index/index", "error", "知道了");
                    s.setData({
                        hide_community_change_btn: a,
                        showChangeCommunity: !! t.data,
                        changeCommunity: t.data,
                        currentCommunity: r
                    })
                }
            } else d ? util.getCommunityInfo().then(function(t) {
                console.log("token存在 比较社区"), t.community_id && t.community_id != i && s.setData({
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
            a = wx.getStorageSync("token");
        app.globalData.community = t, app.globalData.changedCommunity = !0, wx.setStorage({
            key: "community",
            data: t
        }), a && util.addhistory(t), this.initFn(t.communityId), this.setData({
            showChangeCommunity: !1
        }), console.log("用户点击确定")
    },
    cancelChangeCommunity: function() {
        var t = this.data.currentCommunity.communityId || "";
        t && this.initFn(t)
    },
    onShow: function() {
        var a = this;
        util.check_login_new().then(function(t) {
            t ? (0, status.cartNum)("", !0).then(function(t) {
                a.setData({
                    cartNum: t.data
                })
            }) : a.setData({
                needAuth: !0
            })
        })
    },
    getData: function(t) {
        var s = this;
        (wx.showLoading(), t) || (t = wx.getStorageSync("community").communityId || "");
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "solitaire.get_head_index_solitairelist",
                head_id: t,
                page: this.page
            },
            dataType: "json",
            success: function(t) {
                wx.stopPullDownRefresh(), wx.hideLoading();
                var a = t.data.showTabbar;
                if (0 == t.data.code) {
                    var e = {}, o = t.data.data,
                        n = t.data.head_data;
                    o.length < 20 && (e.noMore = !0), o = s.data.list.concat(o), s.page++, s.setData(_extends({
                        list: o
                    }, e, {
                        head_data: n,
                        showTabbar: a
                    }))
                } else if (1 == t.data.code) {
                    var i = t.data.head_data || "";
                    1 == s.page && s.setData({
                        noData: 1
                    }), s.setData({
                        loadMore: !1,
                        noMore: !1,
                        head_data: i,
                        loadText: "没有更多记录了~",
                        showTabbar: a
                    })
                } else if (2 != t.data.code) return 3 == t.data.code ? void app.util.message(t.data.msg, "/lionfish_comshop/pages/position/community", "error") : void app.util.message(t.data.msg, "", "error")
            }
        })
    },
    goDetails: function(t) {
        var a = t ? t.currentTarget.dataset.id : "";
        if (a) {
            var e = "/lionfish_comshop/moduleA/solitaire/details?id=" + a;
            3 < getCurrentPages().length ? wx.redirectTo({
                url: e
            }) : wx.navigateTo({
                url: e
            })
        }
    },
    showImgPrev: function(t) {
        var a = t ? t.currentTarget.dataset.idx : "",
            e = t ? t.currentTarget.dataset.sidx : "",
            o = this.data.list[e].images_list;
        wx.previewImage({
            current: o[a],
            urls: o
        })
    },
    onPullDownRefresh: function() {
        var t = this;
        this.page = 1, this.setData({
            list: [],
            loadText: "加载中...",
            noData: 0,
            loadMore: !0
        }, function() {
            t.getData()
        })
    },
    onReachBottom: function() {
        if (!this.data.loadMore) return !1;
        this.getData()
    },
    onShareAppMessage: function() {
        var t = wx.getStorageSync("community").communityId || "";
        return {
            title: "",
            path: "lionfish_comshop/moduleA/solitaire/index?share_id=" + (wx.getStorageSync("member_id") || "") + "&community_id=" + t,
            success: function(t) {},
            fail: function(t) {}
        }
    }
});