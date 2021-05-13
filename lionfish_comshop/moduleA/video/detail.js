var app = getApp();
Page({
    data: {
        is_heng: 1,
        rushList: [],
        current: 0
    },
    onLoad: function(t) {
        var o = t.id || "";
        o ? (this.getData(o), this.get_goods_details(o)) : wx.showModal({
            title: "提示",
            content: "参数错误",
            showCancel: !1,
            success: function(t) {
                t.confirm && wx.redirectTo({
                    url: "/lionfish_comshop/pages/index/index"
                })
            }
        })
    },
    onShow: function() {},
    goDetails: function() {
        var t = this.data.goods.id || "";
        t && wx.redirectTo({
            url: "/lionfish_comshop/pages/goods/goodsDetail?id=" + t
        })
    },
    get_goods_details: function(t) {
        var e = this;
        if (!t) return wx.hideLoading(), wx.showModal({
            title: "提示",
            content: "参数错误",
            showCancel: !1,
            confirmColor: "#F75451",
            success: function(t) {
                t.confirm && wx.redirectTo({
                    url: "/lionfish_comshop/pages/index/index"
                })
            }
        }), !1;
        var o = wx.getStorageSync("token"),
            a = wx.getStorageSync("community").communityId || "";
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "goods.get_goods_detail",
                token: o,
                id: t,
                community_id: a
            },
            dataType: "json",
            success: function(t) {
                wx.hideLoading();
                var o = t.data.data && t.data.data.goods || "";
                o && 0 != o.length && "" != Object.keys(o) || wx.showModal({
                    title: "提示",
                    content: "该商品不存在，回首页",
                    showCancel: !1,
                    confirmColor: "#F75451",
                    success: function(t) {
                        t.confirm && wx.switchTab({
                            url: "/lionfish_comshop/pages/index/index"
                        })
                    }
                }), e.currentOptions = t.data.data.options, e.setData({
                    goods: o,
                    options: t.data.data.options,
                    order: {
                        goods_id: t.data.data.goods.goods_id,
                        pin_id: t.data.data.pin_id
                    },
                    share_title: o.share_title,
                    goods_image: t.data.data.goods_image
                })
            }
        })
    },
    getData: function(a) {
        var t = wx.getStorageSync("token"),
            i = this,
            o = wx.getStorageSync("community");
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "index.load_gps_goodslist",
                token: t,
                pageNum: 1,
                head_id: o.communityId,
                per_page: 1e4,
                is_video: 1
            },
            dataType: "json",
            success: function(t) {
                if (0 == t.data.code) {
                    var o = t.data.list || [],
                        e = o.findIndex(function(t) {
                            return t.actId == a
                        });
                    i.setData({
                        rushList: o,
                        current: e
                    })
                }
            }
        })
    },
    changeSubject: function(t) {
        var o = this.data.rushList;
        if (t < 0 || o.length <= 1) wx.showToast({
            title: "没有上一个视频了~",
            icon: "none",
            duration: 2e3
        });
        else {
            if (console.log(t), t > o.length - 1) return void wx.showToast({
                title: "没有下一个视频了~",
                icon: "none",
                duration: 2e3
            });
            t = t || 0, this.setData({
                current: t
            }), this.get_goods_details(o[t].actId)
        }
    },
    pre: function() {
        this.changeSubject(1 * this.data.current - 1)
    },
    next: function() {
        this.changeSubject(1 * this.data.current + 1)
    },
    onShareAppMessage: function() {
        var t = wx.getStorageSync("community"),
            o = this.data.goods,
            e = (t.communityId, this.data.share_title),
            a = wx.getStorageSync("member_id"),
            i = "lionfish_comshop/moduleA/video/detail?id=" + o.id + "&share_id=" + a,
            n = this.data.goods.goods_share_image;
        return console.log("商品分享地址：", i), {
            title: e,
            path: i,
            imageUrl: n,
            success: function(t) {},
            fail: function(t) {}
        }
    },
  onShareTimeline: function () {
    var t = wx.getStorageSync("community"),
      o = this.data.goods,
      e = (t.communityId, this.data.share_title),
      a = wx.getStorageSync("member_id"),
      i = "id=" + o.id + "&share_id=" + a,
      n = this.data.goods.goods_share_image;
    return {
      title: e,
      query: i,
      imageUrl: n,
    }
  }
});