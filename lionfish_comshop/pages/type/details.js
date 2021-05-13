var app = getApp(),
    util = require("../../utils/util.js"),
    status = require("../../utils/index.js");
Page({
    mixins: [require("../../mixin/compoentCartMixin.js")],
    data: {
        loadMore: !0,
        loadText: "加载中...",
        rushList: [],
        cartNum: 0,
        showEmpty: !1
    },
    $data: {
        id: 0,
        pageNum: 1
    },
    onLoad: function(t) {
        var a = t.id || "";
        (this.$data.id = a) ? this.getData() : wx.showToast({
            title: "参数错误",
            icon: "none"
        }, function() {
            wx.switchTab({
                url: "/lionfish_comshop/pages/index/index"
            })
        })
    },
    onShow: function() {
        var e = this;
        util.check_login_new().then(function(t) {
            var a = !t;
            e.setData({
                needAuth: a
            }), t && (0, status.cartNum)("", !0).then(function(t) {
                0 == t.code && e.setData({
                    cartNum: t.data
                })
            })
        })
    },
    authSuccess: function() {
        var t = this;
        this.$data.pageNum = 1, this.setData({
            loadMore: !0,
            loadText: "加载中...",
            rushList: [],
            showEmpty: !1,
            needAuth: !1
        }, function() {
            t.getData()
        })
    },
    getData: function() {
        var r = this;
        return new Promise(function(d, t) {
            var a = wx.getStorageSync("token"),
                e = wx.getStorageSync("community"),
                i = r.$data.id;
            wx.showLoading(), app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "index.load_cate_goodslist",
                    token: a,
                    head_id: e.communityId,
                    gid: i
                },
                dataType: "json",
                success: function(t) {
                    if (wx.hideLoading(), 0 == t.data.code) {
                        var a = t.data,
                            e = a.full_money,
                            i = a.full_reducemoney,
                            n = a.is_open_fullreduction,
                            o = a.list,
                            s = a.is_show_cate_tabbar,
                            u = {
                                full_money: e,
                                full_reducemoney: i,
                                is_open_fullreduction: n
                            }, c = {
                                rushList: r.data.rushList.concat(o),
                                pageEmpty: !1,
                                reduction: u,
                                loadOver: !0,
                                is_show_cate_tabbar: s
                            };
                        0 == o.length && (c.showEmpty = !0), wx.setNavigationBarTitle({
                            title: o.length && o[0].cate_info.name || ""
                        }), c.loadText = r.data.loadMore ? "加载中..." : "没有更多商品了~", r.setData(c, function() {
                            r.$data.pageNum += 1
                        })
                    } else 1 == t.data.code && wx.showModal({
                        title: "提示",
                        content: t.data.msg || "无数据",
                        showCancel: !1,
                        success: function() {
                            wx.navigateBack()
                        }
                    });
                    d(t)
                }
            })
        })
    },
    changeCartNum: function(t) {
        var a = t.detail;
        (0, status.cartNum)(this.setData({
            cartNum: a
        }))
    },
    onReachBottom: function() {
        console.log("这是我的底线")
    },
    onShareAppMessage: function(t) {
        var a = this.data.cate_info.name || "分类列表",
            e = wx.getStorageSync("member_id");
        return {
            title: a,
            path: "lionfish_comshop/pages/type/details?id=" + this.$data.id + "&share_id=" + e,
            success: function(t) {},
            fail: function(t) {}
        }
    },
  onShareTimeline: function (t) {
    var a = this.data.cate_info.name || "分类列表",
      e = wx.getStorageSync("member_id");
    return {
      title: a,
      query: "id=" + this.$data.id + "&share_id=" + e,
      success: function (t) { },
      fail: function (t) { }
    }
  }
});