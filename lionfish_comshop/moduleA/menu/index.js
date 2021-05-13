var _extends = Object.assign || function(t) {
        for (var e = 1; e < arguments.length; e++) {
            var a = arguments[e];
            for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (t[i] = a[i])
        }
        return t
    }, app = getApp(),
    util = require("../../utils/util.js"),
    status = require("../../utils/index.js");
Page({
    data: {
        loadMore: !0,
        classification: {
            tabs: [],
            activeIndex: 0
        },
        tabTop: 0,
        showSubCate: !0
    },
    pageNum: 1,
    onLoad: function() {
        this.getInfo(), this._doRefreshMasonry()
    },
    onReady: function() {
        var e = this,
            t = wx.createSelectorQuery(),
            a = Math.round(app.globalData.systemInfo.windowWidth / 750 * 100) || 0;
        setTimeout(function() {
            t.select("#tab").boundingClientRect(function(t) {
                e.setData({
                    tabTop: t.top - a
                })
            }).exec()
        }, 1e3)
    },
    onShow: function() {
        var a = this;
        util.check_login_new().then(function(t) {
            var e = !t;
            a.setData({
                needAuth: e
            }), t && (0, status.cartNum)("", !0).then(function(t) {
                0 == t.code && a.setData({
                    cartNum: t.data
                })
            })
        })
    },
    onPageScroll: function(t) {
        if (t.scrollTop > this.data.tabTop) {
            if (this.data.tabFix) return;
            this.setData({
                oneFixed: "Fixed"
            })
        } else this.setData({
            oneFixed: ""
        })
    },
    noLogin: function() {
        this.setData({
            needAuth: !0,
            showAuthModal: !0
        })
    },
    authSuccess: function() {
        var t = this;
        this.pageNum = 1, this.setData({
            loadMore: !0,
            showEmpty: 0,
            needAuth: !1,
            showAuthModal: !1
        }, function() {
            t._doRefreshMasonry()
        })
    },
    authModal: function() {
        return !this.data.needAuth || (this.setData({
            showAuthModal: !this.data.showAuthModal
        }), !1)
    },
    classificationChange: function(t) {
        var e = this;
        this.pageNum = 1, this.setData({
            loadMore: !0,
            showEmpty: 0,
            "classification.activeIndex": t.detail.e,
            classificationId: t.detail.a
        }, function() {
            e._doRefreshMasonry()
        })
    },
    onPullDownRefresh: function() {
        var t = this;
        this.pageNum = 1, this.setData({
            loadMore: !0,
            showEmpty: 0
        }, function() {
            t.getInfo(), t._doRefreshMasonry()
        })
    },
    onReachBottom: function() {
        this.data.loadMore && this._doAppendMasonry()
    },
    _doRefreshMasonry: function() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "",
            e = this;
        this.masonryListComponent = this.selectComponent("#masonry"), this.getData(t).then(function(t) {
            e.masonryListComponent.start(t).then(function() {})
        }).
        catch (function() {
            e.masonryListComponent.start([]).then(function() {})
        })
    },
    _doAppendMasonry: function() {
        var e = this;
        this.masonryListComponent = this.selectComponent("#masonry"), this.getData().then(function(t) {
            e.masonryListComponent.append(t).then(function() {
                console.log("refresh completed")
            })
        }).
        catch (function() {
            console.log("没有更多了")
        })
    },
    getData: function() {
        var a = this,
            s = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "";
        return new Promise(function(i, o) {
            var n = a,
                t = wx.getStorageSync("token"),
                e = n.data.classificationId;
            wx.showLoading(), app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "recipe.get_recipe_list",
                    token: t,
                    gid: e,
                    pageNum: a.pageNum,
                    keyword: s
                },
                dataType: "json",
                success: function(t) {
                    if (wx.stopPullDownRefresh(), 0 == t.data.code) {
                        var e = t.data.data;
                        n.pageNum++, i(e)
                    } else {
                        var a = {
                            loadMore: !1
                        };
                        1 == n.pageNum && (a.showEmpty = 1), n.setData(a), o("")
                    }
                    wx.hideLoading()
                }
            })
        })
    },
    getInfo: function() {
        var h = this;
        wx.getStorageSync("token");
        wx.showLoading(), app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "recipe.get_index_info"
            },
            dataType: "json",
            success: function(t) {
                if (t.data.code) {
                    var e = t.data.code,
                        a = e.adv_arr,
                        i = e.cate_list,
                        o = e.is_open_recipe,
                        n = e.modify_recipe_name,
                        s = e.modify_recipe_share_title,
                        r = e.modify_vipcard_share_image;
                    if (1 != o) return void app.util.message("未开启功能", "switchTo:/lionfish_comshop/pages/index/index", "error");
                    wx.setNavigationBarTitle({
                        title: n || "菜谱"
                    });
                    var c = {
                        classification: {
                            activeIndex: 0
                        }
                    };
                    0 < i.length ? (i.unshift({
                        name: "全部",
                        id: 0
                    }), c.isShowClassification = !0, c.classification.tabs = i) : c.isShowClassification = !1, h.setData(_extends({
                        adv_arr: a || [],
                        modify_recipe_share_title: s,
                        modify_vipcard_share_image: r,
                        modify_recipe_name: n || "菜谱"
                    }, c))
                }
                wx.hideLoading()
            }
        })
    },
    goResult: function(t) {
        var e = this,
            a = t.detail.value.replace(/\s+/g, "");
        a ? (this.pageNum = 1, this.setData({
            loadMore: !0,
            showEmpty: 0
        }, function() {
            e._doRefreshMasonry(a)
        })) : wx.showToast({
            title: "请输入关键词",
            icon: "none"
        })
    },
    goBannerUrl: function(t) {
        var e = t.currentTarget.dataset.idx,
            a = this.data,
            i = a.adv_arr,
            o = a.needAuth;
        if (0 < i.length) {
            var n = i[e].link,
                s = i[e].linktype;
            if (util.checkRedirectTo(n, o)) return void this.authModal();
            if (0 == s) n && wx.navigateTo({
                url: "/lionfish_comshop/pages/web-view?url=" + encodeURIComponent(n)
            });
            else if (1 == s) - 1 != n.indexOf("lionfish_comshop/pages/index/index") || -1 != n.indexOf("lionfish_comshop/pages/order/shopCart") || -1 != n.indexOf("lionfish_comshop/pages/user/me") || -1 != n.indexOf("lionfish_comshop/pages/type/index") ? n && wx.switchTab({
                url: n
            }) : n && wx.navigateTo({
                url: n
            });
            else if (2 == s) {
                slider_list[e].appid && wx.navigateToMiniProgram({
                    appId: slider_list[e].appid,
                    path: n,
                    extraData: {},
                    envVersion: "release",
                    success: function(t) {},
                    fail: function(t) {
                        console.log(t)
                    }
                })
            }
        }
    },
    goLink: function(t) {
        if (this.authModal()) {
            var e = t.currentTarget.dataset.link;
            3 < getCurrentPages().length ? wx.redirectTo({
                url: e
            }) : wx.navigateTo({
                url: e
            })
        }
    },
    onShareAppMessage: function() {
        var t = wx.getStorageSync("member_id"),
            e = this.data;
        return {
            title: e.modify_recipe_share_title,
            path: "lionfish_comshop/moduleA/menu/index?share_id=" + t,
            imageUrl: e.modify_vipcard_share_image,
            success: function() {},
            fail: function() {}
        }
    },
  onShareTimeline: function () {
    var t = wx.getStorageSync("member_id"),
      e = this.data;
    return {
      title: e.modify_recipe_share_title,
      query: "share_id=" + t,
      imageUrl: e.modify_vipcard_share_image,
    }
  }
});