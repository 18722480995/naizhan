var app = getApp();
Component({
    properties: {
        currentIdx: {
            type: Number,
            value: 0,
            observer: function(e) {
                if (e) {
                    var t = this.data.tabbar;
                    for (var a in t.list) t.list[a].selected = !1, a == e && (t.list[a].selected = !0);
                    this.setData({
                        tabbar: t
                    })
                }
            }
        },
        cartNum: {
            type: Number,
            value: 0
        },
        tabbarRefresh: {
            type: Boolean,
            value: !1,
            observer: function(e) {
                e && this.getTabbar()
            }
        },
        needAuth: {
            type: Boolean,
            value: !1
        }
    },
    attached: function() {
        var e = wx.getSystemInfoSync().model;
        (-1 < e.indexOf("iPhone X") || -1 < e.indexOf("unknown<iPhone")) && this.setData({
            isIpx: !0
        }), this.getTabbar()
    },
    data: {
        isIpx: !1,
        tabbar: {
            backgroundColor: "#fff",
            color: "#707070",
            selectedColor: "#ff5344",
            list: [{
                pagePath: "/lionfish_comshop/pages/index/index",
                text: "",
                iconPath: "",
                selectedIconPath: "",
                selected: !0
            }, {
                pagePath: "/lionfish_comshop/pages/type/index",
                text: "",
                iconPath: "",
                selectedIconPath: "",
                selected: !1
            }, {
                pagePath: "",
                text: "",
                iconPath: "",
                selectedIconPath: "",
                selected: !1
            }, {
                pagePath: "/lionfish_comshop/pages/order/shopCart",
                text: "",
                iconPath: "",
                selectedIconPath: "",
                selected: !1
            }, {
                pagePath: "/lionfish_comshop/pages/user/me",
                text: "",
                iconPath: "",
                selectedIconPath: "",
                selected: !1
            }]
        },
        open_tabbar_type: 0,
        open_tabbar_out_weapp: 0,
        cartNum: 0,
        tabbar_out_appid: "",
        tabbar_out_link: "",
        tabbar_out_type: 0
    },
    methods: {
        getTabbar: function() {
            var p = this;
            app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "index.get_tabbar"
                },
                dataType: "json",
                success: function(e) {
                    if (0 == e.data.code) {
                        var t = e.data.data,
                            a = p.data.tabbar;
                        a.list[0].text = t.t1 || "首页", a.list[0].iconPath = t.i1 || "/lionfish_comshop/images/icon-tab-index.png", a.list[0].selectedIconPath = t.s1 || "/lionfish_comshop/images/icon-tab-index-active.png", a.list[1].text = t.t4 || "分类", a.list[1].iconPath = t.i4 || "/lionfish_comshop/images/icon-tab-type.png", a.list[1].selectedIconPath = t.s4 || "/lionfish_comshop/images/icon-tab-type-active.png", a.list[2].text = t.t5, a.list[2].iconPath = t.i5, a.list[2].selectedIconPath = t.s5, a.list[3].text = t.t2 || "购物车", a.list[3].iconPath = t.i2 || "/lionfish_comshop/images/icon-tab-shop.png", a.list[3].selectedIconPath = t.s2 || "/lionfish_comshop/images/icon-tab-shop-active.png", a.list[4].text = t.t3 || "我的", a.list[4].iconPath = t.i3 || "/lionfish_comshop/images/icon-tab-me.png", a.list[4].selectedIconPath = t.s3 || "/lionfish_comshop/images/icon-tab-me-active.png";
                        var o = e.data.open_tabbar_type || 0,
                            i = e.data.open_tabbar_out_weapp || 0,
                            s = e.data.tabbar_out_appid,
                            n = e.data.tabbar_out_link,
                            l = e.data.tabbar_out_type;
                        a.selectedColor = e.data.wepro_tabbar_selectedColor || "#F75451", p.setData({
                            tabbar: a,
                            open_tabbar_type: o,
                            open_tabbar_out_weapp: i,
                            tabbar_out_appid: s,
                            tabbar_out_link: n,
                            tabbar_out_type: l
                        })
                    } else p.setData({
                        hideTabbar: !0
                    })
                }
            })
        },
        goWeapp: function() {
            var e = this.data.tabbar_out_appid,
                t = this.data.tabbar_out_link,
                a = this.data.tabbar_out_type;
            if (0 == a) wx.navigateTo({
                url: "/lionfish_comshop/pages/web-view?url=" + encodeURIComponent(t)
            });
            else if (1 == a) {
                -1 != ["/lionfish_comshop/pages/index/index", "/lionfish_comshop/pages/order/shopCart", "/lionfish_comshop/pages/user/me", "/lionfish_comshop/pages/type/index"].indexOf(t) ? wx.switchTab({
                    url: t
                }) : -1 != ["/lionfish_comshop/moduleA/solitaire/index", "/lionfish_comshop/moduleA/video/index", "/lionfish_comshop/moduleA/menu/index", "/lionfish_comshop/moduleA/pin/index"].indexOf(t) ? "/lionfish_comshop/moduleA/solitaire/index" == t && this.data.needAut ? this.triggerEvent("authModal", !0) : wx.redirectTo({
                    url: t
                }) : wx.navigateTo({
                    url: t
                })
            } else if (2 == a) e && wx.navigateToMiniProgram({
                appId: e,
                path: t,
                extraData: {},
                envVersion: "release",
                success: function(e) {
                    console.log(e)
                }
            });
            else if (3 == a) {
                wx.redirectTo({
                    url: "/lionfish_comshop/moduleA/pin/index"
                })
            } else if (4 == a) {
                wx.redirectTo({
                    url: "/lionfish_comshop/moduleA/menu/index"
                })
            } else if (5 == a) {
                wx.redirectTo({
                    url: "/lionfish_comshop/moduleA/video/index"
                })
            } else if (6 == a) if (this.data.needAuth) this.triggerEvent("authModal", !0);
            else {
                wx.redirectTo({
                    url: "/lionfish_comshop/moduleA/solitaire/index"
                })
            } else if (7 == a) {
                wx.redirectTo({
                    url: "/lionfish_comshop/moduleB/live/index"
                })
            }
        }
    }
});