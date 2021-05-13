var app = getApp(),
    util = require("../../utils/util.js");
Page({
    data: {
        currentTab: 0,
        scekillTimeList: [],
        endTime: 1e4,
        list: [],
        clearTimer: !1
    },
    secTime: "",
    seckill_share_title: "",
    seckill_share_image: "",
    onLoad: function(e) {
        this.secTime = e.time || ""
    },
    onShow: function() {
        var t = this;
        util.check_login_new().then(function(e) {
            t.setData({
                needAuth: !e
            })
        }), this.loadPage()
    },
    onHide: function() {
        this.setData({
            clearTimer: !1
        })
    },
    loadPage: function() {
        this.getInfo()
    },
    authSuccess: function() {
        var e = this;
        this.setData({
            showEmpty: !1,
            needAuth: !1,
            showAuthModal: !1
        }, function() {
            e.loadPage()
        })
    },
    authModal: function() {
        return !this.data.needAuth || (this.setData({
            showAuthModal: !this.data.showAuthModal
        }), !1)
    },
    getInfo: function() {
        var m = this;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "scekill.get_scekill_info"
            },
            dataType: "json",
            success: function(e) {
                if (0 == e.data.code) {
                    var t = e.data.data,
                        i = (t.seckill_is_open, t.scekill_time_arr),
                        a = t.seckill_page_title,
                        s = t.seckill_bg_color,
                        l = t.seckill_share_title,
                        n = t.seckill_share_image;
                    wx.setNavigationBarTitle({
                        title: a || "限时秒杀"
                    });
                    var o = (new Date).getHours();
                    console.log("当前时间:", o);
                    var c = i || [],
                        r = [],
                        u = 0;
                    if (c.length) {
                        if (c.forEach(function(e, t) {
                            var i = {};
                            e == o ? (i.state = 1, i.desc = "疯抢中", u = t) : e < o ? (i.state = 0, i.desc = "已开抢") : (i.state = 2, i.desc = "即将开抢"), i.timeStr = (e < 10 ? "0" + e : e) + ":00", i.seckillTime = e, r.push(i)
                        }), "" != m.secTime) {
                            var d = c.findIndex(function(e) {
                                return e == m.secTime
                            });
                            0 < d && (u = d)
                        }
                        m.getSecKillGoods(c[u])
                    }
                    var h = new Date((new Date).toLocaleDateString()).getTime() + 60 * (1 * c[u] + 1) * 60 * 1e3;
                    console.log(m);
                    m.seckill_share_title = l, m.seckill_share_image = n, m.setData({
                        scekillTimeList: r,
                        seckill_bg_color: s,
                        currentTab: u,
                        endTime: h
                    })
                }
            }
        })
    },
    handleClick: function(e) {
        var t = this,
            i = e.currentTarget.dataset.index,
            a = this.data.scekillTimeList,
            s = new Date((new Date).toLocaleDateString()).getTime(),
            l = a[i],
            n = 0;
        1 == l.state ? n = s + 60 * (1 * l.seckillTime + 1) * 60 * 1e3 : 2 == l.state && (n = s + 1 * l.seckillTime * 60 * 60 * 1e3 + 1), this.setData({
            list: [],
            currentTab: i,
            endTime: n,
            clearTimer: !0
        }, function() {
            t.getSecKillGoods(l.seckillTime)
        })
    },
    getSecKillGoods: function(e) {
        wx.showLoading();
        var a = this,
            t = wx.getStorageSync("community"),
            i = wx.getStorageSync("token");
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "index.load_gps_goodslist",
                token: i,
                pageNum: 1,
                head_id: t.communityId,
                seckill_time: e,
                is_seckill: 1,
                per_page: 1e4
            },
            dataType: "json",
            success: function(e) {
                if (wx.stopPullDownRefresh(), wx.hideLoading(), 0 == e.data.code) {
                    var t = e.data.list || [],
                        i = !1;
                    0 == (t = a.transTime(t)).length && (i = !0), a.setData({
                        list: t,
                        clearTimer: !1,
                        showEmpty: i
                    })
                } else a.setData({
                    clearTimer: !1,
                    showEmpty: !0
                })
            }
        })
    },
    transTime: function(e) {
        return 0 === (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0) && e.map(function(e) {
            e.end_time *= 1e3, e.actEnd = e.end_time <= (new Date).getTime()
        }), e
    },
    endCurSeckill: function() {
        this.loadPage()
    },
    onPullDownRefresh: function() {
        this.loadPage()
    },
    onShareAppMessage: function() {
        var e = wx.getStorageSync("member_id");
        return {
            title: this.seckill_share_title,
            path: "lionfish_comshop/moduleA/seckill/list?share_id=" + e,
            imageUrl: this.seckill_share_image,
            success: function() {},
            fail: function() {}
        }
    }
});