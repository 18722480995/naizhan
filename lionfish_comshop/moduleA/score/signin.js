var _extends = Object.assign || function(a) {
        for (var t = 1; t < arguments.length; t++) {
            var e = arguments[t];
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (a[n] = e[n])
        }
        return a
    }, util = require("../../utils/util.js"),
    app = getApp();
Page({
    mixins: [require("../../mixin/scoreCartMixin.js")],
    data: {
        info: {},
        dayScore: [],
        showSignModal: !1,
        list: [],
        loadText: "加载中...",
        noData: 0,
        loadMore: !0
    },
    page: 1,
    onLoad: function() {
        wx.showLoading(), this.getData(), this.getList()
    },
    onShow: function() {
        var t = this;
        util.check_login_new().then(function(a) {
            a || t.setData({
                needAuth: !0
            })
        })
    },
    vipModal: function(a) {
        this.setData(a.detail)
    },
    authSuccess: function() {
        var a = this;
        a.page = 1, this.setData({
            needAuth: !1,
            showAuthModal: !1,
            list: [],
            loadText: "加载中...",
            noData: 0,
            loadMore: !0
        }, function() {
            a.getData(), a.getList()
        })
    },
    authModal: function() {
        return !this.data.needAuth || (this.setData({
            showAuthModal: !this.data.showAuthModal
        }), !1)
    },
    getData: function() {
        var a = wx.getStorageSync("token"),
            n = this;
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "signinreward.get_signinreward_baseinfo",
                token: a
            },
            dataType: "json",
            success: function(a) {
                if (wx.hideLoading(), 0 == a.data.code) {
                    var t = a.data.data || {}, e = [];
                    e.push(t.signinreward_day1_score || 0), e.push(t.signinreward_day2_score || 0), e.push(t.signinreward_day3_score || 0), e.push(t.signinreward_day4_score || 0), e.push(t.signinreward_day5_score || 0), e.push(t.signinreward_day6_score || 0), e.push(t.signinreward_day7_score || 0), 1 != t.isopen_signinreward && app.util.message("未开启签到送积分功能", "switchTo:/lionfish_comshop/pages/index/index", "error"), n.setData({
                        info: a.data.data || {},
                        dayScore: e
                    })
                } else n.setData({
                    needAuth: !0
                })
            }
        })
    },
    signIn: function() {
        if (this.authModal()) {
            var a = wx.getStorageSync("token"),
                o = this;
            app.util.request({
                url: "entry/wxapp/user",
                data: {
                    controller: "signinreward.sub_signin",
                    token: a
                },
                dataType: "json",
                success: function(a) {
                    if (wx.hideLoading(), 0 == a.data.code) {
                        var t = a.data,
                            e = t.score,
                            n = t.continuity_day,
                            i = t.reward_socre,
                            s = o.data.info;
                        s.score = e, s.today_is_signin = 1, s.has_continuity_day = n, s.show_day_arr[n - 1].is_signin = 1, o.setData({
                            info: s,
                            showSignModal: !0,
                            reward_socre: i
                        })
                    } else app.util.message(a.data.msg || "签到失败", "", "success")
                }
            })
        }
    },
    goLink: function(a) {
        if (this.authModal()) {
            var t = a.currentTarget.dataset.link;
            3 < getCurrentPages().length ? wx.redirectTo({
                url: t
            }) : wx.navigateTo({
                url: t
            })
        }
    },
    handleTipModal: function() {
        this.setData({
            showSignModal: !this.data.showSignModal
        })
    },
    getList: function() {
        var a = wx.getStorageSync("token"),
            i = this,
            t = wx.getStorageSync("community");
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "signinreward.load_sign_goodslist",
                token: a,
                pageNum: this.page,
                is_random: 1,
                head_id: t.communityId
            },
            dataType: "json",
            success: function(a) {
                if (0 == a.data.code) {
                    var t = {}, e = a.data.list;
                    e.length < 10 && (t.noMore = !0), e = i.data.list.concat(e), i.page++, i.setData(_extends({
                        list: e
                    }, t))
                } else {
                    var n = {};
                    1 == i.page && (n.noData = 1), i.setData(_extends({
                        loadMore: !1,
                        noMore: !1,
                        loadText: "没有更多记录了~"
                    }, n))
                }
            }
        })
    },
    onReachBottom: function() {
        if (!this.data.loadMore) return !1;
        this.getList()
    },
    onShareAppMessage: function() {
        var a = this.data.info,
            t = a.signinreward_share_title,
            e = a.signinreward_share_image,
            n = "lionfish_comshop/moduleA/score/signin?share_id=" + wx.getStorageSync("member_id");
        return console.log("签到分享地址：", n), {
            title: t,
            path: n,
            imageUrl: e,
            success: function(a) {},
            fail: function(a) {}
        }
    }
});