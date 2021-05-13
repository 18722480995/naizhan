var app = getApp(),
    util = require("../../utils/util.js"),
    status = require("../../utils/index.js");
Page({
    mixins: [require("../../mixin/compoentCartMixin.js")],
    data: {
        info: {},
        fmShow: !0,
        canvasWidth: 375,
        canvasHeight: 300
    },
    gid: 0,
    goodsImg: "",
    imageUrl: "",
    onLoad: function(t) {
        var a = t.id || "";
        this.gid = a, this.getData(a)
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
    onReady: function(t) {
        this.videoContext = wx.createVideoContext("myVideo")
    },
    authSuccess: function() {
        var t = this,
            a = this.gid;
        this.setData({
            needAuth: !1,
            showAuthModal: !1
        }, function() {
            t.getData(a)
        })
    },
    vipModal: function(t) {
        this.setData(t.detail)
    },
    imageLoad: function(t) {
        var a = util.imageUtil(t);
        this.setData({
            imageSize: a
        })
    },
    btnPlay: function() {
        this.setData({
            fmShow: !1
        }), this.videoContext.play()
    },
    videEnd: function() {
        this.setData({
            fmShow: !0
        })
    },
    endPlay: function() {
        this.videoContext.pause(), this.setData({
            fmShow: !0
        })
    },
    getData: function(t) {
        var e = this,
            a = wx.getStorageSync("token"),
            i = wx.getStorageSync("community").communityId || "";
        wx.showLoading(), app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "recipe.get_recipe_detail",
                token: a,
                id: t,
                head_id: i
            },
            dataType: "json",
            success: function(t) {
                if (0 == t.data.code) {
                    var a = t.data.data || {};
                  a.content = a.content.replace('< img ', '< img style="max-width:100%;height:auto;display:block;margin:10px 0;"');
                    e.setData({
                        info: a
                    }, function() {
                        var t = a.images;
                        a.video && t && status.download(t + "?imageView2/1/w/500/h/400").then(function(t) {
                            e.goodsImg = t.tempFilePath, e.drawImg()
                        })
                    })
                }
                wx.hideLoading()
            }
        })
    },
    agree: function() {
        if (this.authModal()) {
            var a = this,
                e = this.data.info,
                t = wx.getStorageSync("token");
            app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "recipe.fav_recipe_do",
                    token: t,
                    id: e.id
                },
                dataType: "json",
                success: function(t) {
                    0 == t.data.code ? (wx.showToast({
                        title: "已喜欢~",
                        icon: "none"
                    }), e.fav_count = t.data.fav_count, e.has_fav = 1, a.setData({
                        info: e
                    })) : 1 == t.data.code ? a.setData({
                        needAuth: !0
                    }) : 2 == t.data.code && (e.fav_count = t.data.fav_count, e.has_fav = 0, a.setData({
                        info: e
                    }), wx.showToast({
                        title: "取消喜欢~",
                        icon: "none"
                    }))
                }
            })
        }
    },
    goLink: function(t) {
        var a = t.currentTarget.dataset.link;
        app.util.navTo(a)
    },
    drawImg: function() {
        var a = this;
        wx.createSelectorQuery().select(".canvas-img").boundingClientRect(function() {
            var t = wx.createCanvasContext("myCanvas");
            t.drawImage(a.goodsImg, 0, 0, status.getPx(375), status.getPx(300)), t.drawImage("../../images/play.png", status.getPx(127.5), status.getPx(70), status.getPx(120), status.getPx(120)), t.save(), t.draw(!1, a.checkCanvas())
        }).exec()
    },
    checkCanvas: function() {
        var a = this;
        setTimeout(function() {
            wx.canvasToTempFilePath({
                canvasId: "myCanvas",
                success: function(t) {
                    t.tempFilePath ? a.imageUrl = t.tempFilePath : a.drawImg(), console.log("我画完了")
                },
                fail: function(t) {
                    a.drawImg()
                }
            })
        }, 500)
    },
    onShareAppMessage: function() {
        var t = this.data.info,
            a = wx.getStorageSync("community"),
            e = t.id,
            i = (a.communityId, t.recipe_name),
            n = "lionfish_comshop/moduleA/menu/details?id=" + e + "&share_id=" + wx.getStorageSync("member_id") + "&community_id=&{community_id}";
        return console.log("分享地址：", n), {
            title: i,
            path: n,
            imageUrl: this.imageUrl,
            success: function(t) {},
            fail: function(t) {}
        }
    },
  onShareTimeline: function () {
    var t = this.data.info,
      a = wx.getStorageSync("community"),
      e = t.id,
      i = (a.communityId, t.recipe_name),
      n = "id=" + e + "&share_id=" + wx.getStorageSync("member_id") + "&community_id=&{community_id}";
    return console.log("分享地址：", n), {
      title: i,
      query: n,
      imageUrl: this.imageUrl,
    }
  }
});