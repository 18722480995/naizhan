var _extends = Object.assign || function(t) {
        for (var e = 1; e < arguments.length; e++) {
            var a = arguments[e];
            for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n])
        }
        return t
    }, app = getApp();
Page({
    data: {
        tabs: [{
            id: 0,
            name: "社区商品"
        }, {
            id: 1,
            name: "仅快递"
        }],
        currentIdx: 0,
        list: [],
        loadText: "加载中...",
        noData: 0,
        loadMore: !0,
        checkedAll: !1,
        checkedCount: 0
    },
    page: 1,
    onLoad: function(t) {
        var e = t.type || 0,
            a = this;
        this.setData({
            currentIdx: e
        }, function() {
            a.getData()
        })
    },
    onShow: function() {},
    changeTabs: function(t) {
        var e = this,
            a = t.currentTarget.dataset.type || 0;
        this.page = 1, this.setData({
            currentIdx: a,
            list: [],
            noData: 0,
            showEmpty: !1,
            loadMore: !0,
            loadOver: !1
        }, function() {
            e.getData()
        })
    },
    getData: function() {
        var n = this,
            t = wx.getStorageSync("token");
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "solitaire.search_head_goodslist",
                token: t,
                page: this.page,
                is_only_express: this.data.currentIdx
            },
            dataType: "json",
            success: function(t) {
                if (wx.hideLoading(), 0 == t.data.code) {
                    var e = {}, a = t.data.data;
                    a.length < 20 && (e.noMore = !0), a = n.data.list.concat(a), n.page++, n.setData(_extends({
                        list: a
                    }, e, {
                        checkedAll: !1
                    }))
                } else {
                    if (1 != t.data.code) return 2 == t.data.code ? void app.util.message("您还未登录", "switchTo:/lionfish_comshop/pages/index/index", "error") : void app.util.message(t.data.msg, "switchTo:/lionfish_comshop/pages/index/index", "error");
                    1 == n.page && n.setData({
                        noData: 1
                    }), n.setData({
                        loadMore: !1,
                        noMore: !1,
                        loadText: "没有更多记录了~"
                    })
                }
            }
        })
    },
    selectGoods: function(t) {
        var e = t.currentTarget.dataset.type || 0,
            a = this.data.currentIdx,
            n = getCurrentPages(),
            o = n[n.length - 2],
            r = o.data.goods || [],
            c = t.detail;
        if (0 == e) {
            if (0 < r.length) - 1 === r.findIndex(function(t) {
                return t.gid == c.gid
            }) && r.push(c);
            else r.push(c)
        } else {
            for (var i = (this.data.list || []).filter(function(t) {
                return 1 == t.checked
            }), s = r.concat(i), d = new Map, h = 0; h < s.length; h++) {
                var l = s[h].gid,
                    u = s[h];
                d.has(l), d.set(l, u)
            }
            var g = [],
                f = !0,
                p = !1,
                v = void 0;
            try {
                for (var x, k = d[Symbol.iterator](); !(f = (x = k.next()).done); f = !0) {
                    var y = x.value;
                    console.log(y[1]), g.push(y[1])
                }
            } catch (t) {
                p = !0, v = t
            } finally {
                try {
                    !f && k.
                    return &&k.
                    return ()
                } finally {
                    if (p) throw v
                }
            }
            r = g
        }
        o.setData({
            goods: r,
            type: a
        }), wx.navigateBack({
            delta: 1
        })
    },
    checkboxChange: function(t) {
        var e = t.currentTarget.dataset.type,
            a = t.currentTarget.dataset.index,
            n = this.data.list,
            o = this.data.checkedAll;
        if ("all" === e) {
            var r = 0;
            o ? n.forEach(function(t) {
                t.checked = 0
            }) : (n.forEach(function(t) {
                t.checked = 1
            }), r = n.length), this.setData({
                checkedCount: r,
                list: n,
                checkedAll: !o
            })
        } else if ("item" === e) {
            n.forEach(function(t, e) {
                a == e && (t.checked ? t.checked = 0 : t.checked = 1)
            });
            var c = 0;
            n.forEach(function(t) {
                t.checked && c++
            }), this.setData({
                checkedCount: c,
                list: n,
                checkedAll: c == n.length
            })
        }
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        if (!this.data.loadMore) return !1;
        this.getData()
    }
});