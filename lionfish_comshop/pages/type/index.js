var _extends = Object.assign || function(t) {
        for (var a = 1; a < arguments.length; a++) {
            var e = arguments[a];
            for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
        }
        return t
    }, app = getApp(),
    a = require("../../utils/public"),
    status = require("../../utils/index.js"),
    util = require("../../utils/util.js"),
    wcache = require("../../utils/wcache.js");
Page({
    data: {
        cartNum: 0,
        rushCategoryData: {
            tabs: [],
            activeIndex: 0
        },
        rushList: [],
        categoryScrollBarTop: 0,
        resetScrollBarTop: 50,
        loadMore: !0,
        loadText: "加载中...",
        scrollViewHeight: 0,
        isFirstCategory: !0,
        isLastCategory: !1,
        pageEmpty: !1,
        active_sub_index: 0,
        needPosition: !0,
        groupInfo: {
            group_name: "社区",
            owner_name: "团长"
        }
    },
    $data: {
        options: {},
        rushCategoryId: "",
        pageNum: 1,
        actIds: [],
        loading: !0,
        isScrollTop: !0,
        isScrollBottom: !1,
        scrollInfo: null,
        isSetCategoryScrollBarTop: !0,
        touchStartPos: {
            pageX: 0,
            pageY: 0
        },
        rushList: []
    },
    isFirst: 0,
    onLoad: function(i) {
        wx.showLoading(), wx.hideTabBar(), status.setNavBgColor(), status.setGroupInfo().then(function(t) {
            s.setData({
                groupInfo: t
            })
        });
        var t = app.globalData.isIpx,
            s = this;
        if (this.getScrollViewHeight(), this.setData({
            subCateHeight: this.getPx(44),
            isIpx: !! t
        }), console.log("options", i), i && 0 != Object.keys(i).length) {
            var r = wx.getStorageSync("community"),
                n = r.communityId || "";
            "undefined" != (s.$data.options = i).share_id && 0 < i.share_id && wcache.put("share_id", i.share_id), "undefined" != i.community_id && 0 < i.community_id && app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "index.get_community_info",
                    community_id: i.community_id
                },
                dataType: "json",
                success: function(t) {
                    var a = wx.getStorageSync("token");
                    if (0 == t.data.code) {
                        var e = t.data.data,
                            o = t.data.hide_community_change_btn;
                        i.community_id != n && ("" == n ? (wcache.put("community", e), s.setData({
                            needPosition: !1
                        })) : s.setData({
                            showChangeCommunity: !0,
                            changeCommunity: e,
                            community: r,
                            hide_community_change_btn: o
                        }))
                    }
                    a && s.addhistory()
                }
            })
        }
        this.$data.rushCategoryId = app.globalData.typeCateId || 0, app.globalData.typeCateId = 0
    },
    onShow: function() {
        var s = this;
        s.$data.pageNum = 1, s.setData({
            rushCategoryData: {
                tabs: [],
                activeIndex: 0
            },
            rushList: [],
            categoryScrollBarTop: 0,
            resetScrollBarTop: 50,
            loadMore: !0,
            loadText: "加载中...",
            isFirstCategory: !0,
            isLastCategory: !1,
            pageEmpty: !1,
            active_sub_index: 0,
            tabbarRefresh: !0
        }, function() {
            console.log(s.isFirst), s.get_cate_list().then(function() {
                if (1 <= s.isFirst && (s.$data.rushCategoryId = app.globalData.typeCateId || s.$data.rushCategoryId || 0, console.log("typeCateId", s.$data.rushCategoryId), app.globalData.typeCateId = 0, s.$data.rushCategoryId)) {
                    var t = s.data.rushCategoryData,
                        a = t.tabs,
                        e = s.$data.rushCategoryId;
                    t.activeIndex = a.findIndex(function(t) {
                        return t.id == e
                    }) || 0, s.setData({
                        rushCategoryData: t
                    }, function() {
                        s.setCategory(t.activeIndex)
                    })
                }
            })
        }), util.check_login_new().then(function(t) {
            if (t) {
                if ((0, status.cartNum)("", !0).then(function(t) {
                    0 == t.code && s.setData({
                        cartNum: t.data
                    })
                }), 1 <= s.isFirst) {
                    var a = app.globalData.goodsListCarCount,
                        o = s.data.rushList;
                    if (0 < a.length && 0 < o.length) {
                        var i = !1;
                        a.forEach(function(a) {
                            var t = o.findIndex(function(t) {
                                return t.actId == a.actId
                            });
                            if (-1 != t && 0 === o[t].skuList.length) {
                                var e = 1 * a.num;
                                o[t].car_count = 0 <= e ? e : 0, i = !0
                            }
                        }), s.setData({
                            rushList: o,
                            changeCarCount: i
                        })
                    }
                }
            } else s.setData({
                needAuth: !0
            })
        }), s.isFirst++
    },
    authSuccess: function() {
        this.$data = _extends({}, this.$data, {
            options: {},
            rushCategoryId: "",
            pageNum: 1,
            actIds: [],
            loading: !0,
            isScrollTop: !0,
            isScrollBottom: !1,
            scrollInfo: null,
            isSetCategoryScrollBarTop: !0,
            touchStartPos: {
                pageX: 0,
                pageY: 0
            }
        });
        var t = this;
        this.setData({
            needAuth: !1,
            showAuthModal: !1,
            rushList: [],
            categoryScrollBarTop: 0,
            resetScrollBarTop: 50,
            loadMore: !0,
            loadText: "加载中...",
            isFirstCategory: !0,
            isLastCategory: !1,
            pageEmpty: !1,
            active_sub_index: 0
        }, function() {
            t.get_cate_list().then(function() {
                t.initPageData()
            })
        })
    },
    authModal: function(t) {
        t.detail && this.setData({
            needAuth: !0
        }), this.data.needAuth && this.setData({
            showAuthModal: !this.data.showAuthModal
        })
    },
    vipModal: function(t) {
        this.setData(t.detail)
    },
    confrimChangeCommunity: function() {
        var t = this,
            a = this.data.changeCommunity;
        app.globalData.community = a, wcache.put("community", a), this.setData({
            showChangeCommunity: !1,
            needPosition: !1
        }, function() {
            t.addhistory()
        })
    },
    closeChangeCommunity: function() {
        this.setData({
            showChangeCommunity: !1
        })
    },
    goSelectCommunity: function() {
        wx.redirectTo({
            url: "/lionfish_comshop/pages/position/community"
        })
    },
    addhistory: function() {
        var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
            t = 0;
        0 == a ? t = wx.getStorageSync("community").communityId || "" : t = a;
        console.log("history community_id=" + t);
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
                0 != a && (o.getHistoryCommunity(), console.log("addhistory+id", a))
            }
        })
    },
    getHistoryCommunity: function() {
        var i = this,
            t = wx.getStorageSync("token");
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "index.load_history_community",
                token: t
            },
            dataType: "json",
            success: function(t) {
                if (0 == t.data.code) {
                    console.log("getHistoryCommunity");
                    var a = t.data.list;
                    0 != Object.keys(a).length && 0 != a.communityId || !0;
                    var e = a && a.fullAddress && a.fullAddress.split("省");
                    a = Object.assign({}, a, {
                        address: e[1]
                    }), wcache.put("community", a), app.globalData.community = a
                } else {
                    var o = i.options;
                    void 0 !== o && o.community_id && (console.log("新人加入分享进来的社区id:", i.options), i.addhistory(o.community_id))
                }
            }
        })
    },
    onPullDownRefresh: function() {
        this.initPageData()
    },
    initPageData: function() {
        var t = this;
        this.setData({
            isFirstCategory: !0,
            isLastCategory: !1,
            rushList: [],
            resetScrollBarTop: 50
        }, function() {
            t.getHotList()
        })
    },

    scrollBottom: function() {
        var t = this.$data;
        t.loading || (t.loading = !0, this.getHotList())
    },

    touchstart: function(t) {
        if (t.changedTouches && t.changedTouches[0]) {
            var a = t.changedTouches[0],
                e = a.pageX,
                o = a.pageY;
            this.$data.touchStartPos = {
                pageX: e,
                pageY: o
            }
        }
    },

    touchend: function(t) {
        var a = this;
        if (t.changedTouches && t.changedTouches[0]) {
            var e = t.changedTouches[0],
                o = e.pageX,
                i = e.pageY,
                s = this.$data.touchStartPos,
                r = s.pageX,
                n = s.pageY,
                d = this.$data,
                u = d.isScrollTop,
                c = d.isScrollBottom,
                l = d.scrollInfo,
                h = (this.data.rushCategoryData, o - r),
                g = i - n;
            if (Math.abs(g) > Math.abs(h)) if (0 < g) {
                if (!u) return;
                if (this.setData({
                    resetScrollBarTop: 50
                }), 50 < g) {
                    var p = this.data.rushCategoryData.activeIndex - 1;
                    if (p < 0) return;
                    this.setData({
                        resetScrollBarTop: 50
                    }, function() {
                        // a.setCategory(p)
                    })
                }
            } else {
                if (!c || !this.data.canNext) return;
                if (g < -50) {
                    var y = this.data.rushCategoryData,
                        m = y.activeIndex + 1;
                    if (m >= y.tabs.length || !this.$data.scrollInfo) return;
                    this.setData({
                        resetScrollBarTop: l.scrollTop
                    }, function() {
                        // a.setCategory(m)
                    })
                }
            } else l && l.scrollTop < 50 && this.setData({
                resetScrollBarTop: 50
            })
        }
    },

    scroll: function(t) {
        var a = t.detail,
            e = a.scrollTop,
            o = a.scrollHeight,
            i = this.data,
            s = i.scrollViewHeight,
            r = i.loadMore;
        this.$data.scrollInfo = a, this.$data.isScrollTop = e <= 49, 
        this.$data.isScrollBottom = !r && o - e - s <= 10
    },

    getScrollViewHeight: function() {
        var a = this;
        wx.createSelectorQuery().select(".search-bar").boundingClientRect(function(t) {
            t.height && a.setData({
                scrollViewHeight: wx.getSystemInfoSync().windowHeight - t.height
            })
        }).exec()
    },
    changeCategory: function(t) {
        var a = t.currentTarget.dataset.index;
        console.log(a), a !== this.data.rushCategoryData.activeIndex && this.setCategory(a)
    },

    setCategory: function(t) {
        var a = this,
            e = this.data.rushCategoryData,
            o = e.tabs[t] || {}, i = this.data.scrollViewHeight;
        this.$data.rushCategoryId = o.id || null, this.$data.pageNum = 1, this.$data.isSetCategoryScrollBarTop = !1;
        var s = !t,
            r = t == e.tabs.length - 1;
        this.setData({
            "rushCategoryData.activeIndex": t,
            resetScrollBarTop: 50,
            categoryScrollBarTop: 50 * t - (i - 50) / 2,
            rushList: [],
            canNext: !1,
            isFirstCategory: s,
            isLastCategory: r,
            active_sub_index: 0,
            showDrop: !1
        }, function() {
            a.getHotList()
        })
    },

    getHotList: function() {
        var a = this,
            e = this.$data.rushCategoryId;
        this.$data.loading = !0, 
        this.reqPromise().then(function() {
            wx.stopPullDownRefresh()
        }).catch (function() {
            var t = {};
            e || (t.pageEmpty = !0),
             a.$data.loading = !1, 
             a.setData(t), 
             wx.stopPullDownRefresh()
        })
    },

    reqPromise: function() {
        var m = this;
        return new Promise(function(p, t) {
            var a = wx.getStorageSync("token"),
                e = wx.getStorageSync("community"),
                y = m.$data.rushCategoryId;
            app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "index.load_gps_goodslist",
                    token: a,
                    pageNum: m.$data.pageNum,
                    head_id: e.communityId,
                    gid: y,
                    per_page: 30
                },
                dataType: "json",
                success: function(t) {

                    console.log(t,"load_gps_goodslist")

                    if (0 == t.data.code) {
                        var a = t.data.list,
                            e = {};
                        a.length < 30 && (e.loadMore = !1, e.canNext = !0);
                        var o = m.data.rushList.concat(a),
                            i = t.data,
                            s = i.full_money,
                            r = i.full_reducemoney,
                            n = i.is_open_fullreduction,
                            d = i.is_open_vipcard_buy,
                            u = i.is_vip_card_member,
                            c = i.is_member_level_buy,
                            l = {
                                full_money: s,
                                full_reducemoney: r,
                                is_open_fullreduction: n
                            }, h = !1;
                        1 == d ? 1 != u && 1 == c && (h = !0) : 1 == c && (h = !0), (e = _extends({}, e, {
                            rushList: o,
                            pageEmpty: !1,
                            cur_time: t.data.cur_time,
                            reduction: l,
                            rushCategoryData: m.data.rushCategoryData,
                            is_open_vipcard_buy: d || 0,
                            is_vip_card_member: u,
                            is_member_level_buy: c,
                            canLevelBuy: h
                        })).vipInfo = {
                            is_open_vipcard_buy: d,
                            is_vip_card_member: u,
                            is_member_level_buy: c
                        }, 
                        1 == m.$data.pageNum && (e.resetScrollBarTop = 51), 
                        e.loadText = m.data.loadMore ? "加载中..." : "没有更多商品了~", 
                        m.$data.isSetCategoryScrollBarTop && (e.categoryScrollBarTop = 50 * e.rushCategoryData.activeIndex - (m.data.scrollViewHeight - 50) / 2),
                        m.setData(e, function() {
                            m.$data.loading = !1, 
                            m.$data.pageNum += 1, 
                            !y && e.rushCategoryData.tabs && e.rushCategoryData.tabs[0] && (
                                m.$data.rushCategoryId = e.rushCategoryData.tabs[0].id
                            )
                        })

                    } else if (1 == t.data.code) {
                        var g = {
                            loadMore: !1,
                            canNext: !0
                        };
                        1 == m.$data.pageNum && (console.log("无数据"), g.pageEmpty = !0), m.setData(g)
                    } else 2 == t.data.code && m.setData({
                        needAuth: !0
                    });
                    p(t)
                }
            })
        })
    },












    getPx: function(t) {
        return Math.round(app.globalData.systemInfo.windowWidth / 375 * t)
    },
    goResult: function(t) {
        var a = t.detail.value.replace(/\s+/g, "");
        a ? wx.navigateTo({
            url: "/lionfish_comshop/pages/type/result?keyword=" + a
        }) : wx.showToast({
            title: "请输入关键词",
            icon: "none"
        })
    },
    onHide: function() {
        this.setData({
            tabbarRefresh: !1,
            changeCarCount: !1
        })
    },
    showDrop: function() {
        this.setData({
            showDrop: !this.data.showDrop
        })
    },
    get_cate_list: function() {
        var d = this;
        return new Promise(function(n, a) {
            app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "goods.get_category_list",
                    is_type_show: 1
                },
                dataType: "json",
                success: function(t) {
                    if (0 == t.data.code) {
                        var a = t.data.data || [];
                        if (0 == a.length) return wx.hideLoading(), void d.setData({
                            noCateList: !0
                        });
                        var e = d.$data.rushCategoryId || a && a[0] && a[0].id || 0,
                            o = 0;
                        d.$data.rushCategoryId && (o = a.findIndex(function(t) {
                            return t.id == d.$data.rushCategoryId
                        })), d.$data.rushCategoryId = e;
                        var i = {
                            tabs: a,
                            activeIndex: o
                        }, s = !i.activeIndex,
                            r = i.activeIndex == i.tabs.length - 1;
                        d.setData({
                            rushCategoryData: i,
                            isFirstCategory: s,
                            isLastCategory: r
                        }, function() {
                            wx.hideLoading()
                        })
                    }
                    n()
                },
                fail: function(t) {
                    a(t)
                }
            })
        })
    },
    change_sub_cate: function(t) {
        var a = this.data.rushCategoryData,
            e = a.tabs,
            o = a.activeIndex,
            i = t.currentTarget.dataset.idx,
            s = e[o].id,
            r = t.currentTarget.dataset.id || s,
            n = this.getPx(64) * i;
        console.log(n);
        var d = this;
        d.$data.pageNum = 1, d.$data.rushCategoryId = r, d.setData({
            showDrop: !1,
            active_cate_id: r,
            active_sub_index: i,
            rushList: [],
            scrollLeft: n,
            showEmpty: !1,
            loadMore: !0,
            loadText: "加载中",
            resetScrollBarTop: 50
        }, function() {
            d.getHotList()
        })
    },
    show_search: function() {
        wx.navigateTo({
            url: "/lionfish_comshop/pages/type/search"
        })
    },
    openSku: function(t) {
        var a = t.detail,
            e = a.actId,
            o = a.skuList;
        this.setData({
            addCar_goodsid: e
        });
        var i = o.list || [],
            s = [];
        if (0 < i.length) {
            for (var r = 0; r < i.length; r++) {
                var n = i[r].option_value[0],
                    d = {
                        name: n.name,
                        id: n.option_value_id,
                        index: r,
                        idx: 0
                    };
                s.push(d)
            }
            for (var u = "", c = 0; c < s.length; c++) c == s.length - 1 ? u += s[c].id : u = u + s[c].id + "_";
            var l = o.sku_mu_list[u] || {};
            l.is_mb_level_buy = a.is_mb_level_buy || 0, l.is_take_vipcard = a.is_take_vipcard || 0, this.setData({
                sku: s,
                sku_val: 1,
                cur_sku_arr: l,
                skuList: a.skuList,
                visible: !0,
                showSku: !0
            })
        } else {
            var h = a.allData;
            this.setData({
                sku: [],
                sku_val: 1,
                skuList: [],
                cur_sku_arr: h
            });
            var g = {
                detail: {
                    formId: ""
                }
            };
            g.detail.formId = "the formId is a mock one", this.gocarfrom(g)
        }
    },
    gocarfrom: function(t) {
        wx.showLoading(), a.collectFormIds(t.detail.formId), this.goOrder()
    },
    goOrder: function() {
        var i = this;
        i.data.can_car && (i.data.can_car = !1);
        wx.getStorageSync("token");
        var t = wx.getStorageSync("community"),
            a = i.data.addCar_goodsid,
            e = t.communityId,
            o = i.data.sku_val,
            s = i.data.cur_sku_arr,
            r = "";
        s && s.option_item_ids && (r = s.option_item_ids);
        var n = {
            goods_id: a,
            community_id: e,
            quantity: o,
            sku_str: r,
            buy_type: "dan",
            pin_id: 0,
            is_just_addcar: 1
        };
        util.addCart(n).then(function(t) {
            if (1 == t.showVipModal) {
                var a = t.data.pop_vipmember_buyimage;
                wx.hideLoading(), i.setData({
                    pop_vipmember_buyimage: a,
                    showVipModal: !0,
                    visible: !1
                })
            } else if (3 == t.data.code) wx.showToast({
                title: t.data.msg,
                icon: "none",
                duration: 2e3
            });
            else if (4 == t.data.code) wx.showToast({
                title: "您未登录",
                duration: 2e3,
                success: function() {
                    i.setData({
                        needAuth: !0
                    })
                }
            });
            else if (6 == t.data.code || 7 == t.data.code) {
                var e = t.data.msg,
                    o = t.data.max_quantity || "";
                0 < o && i.setData({
                    sku_val: o
                }), wx.showToast({
                    title: e,
                    icon: "none",
                    duration: 2e3
                })
            } else {
                i.closeSku(), (0, status.cartNum)(t.data.total), i.setData({
                    cartNum: t.data.total
                }), wx.showToast({
                    title: "已加入购物车",
                    image: "../../images/addShopCart.png"
                })
            }
        })
    },
    selectSku: function(t) {
        var a = t.currentTarget.dataset.type.split("_"),
            e = this.data.sku,
            o = {
                name: a[3],
                id: a[2],
                index: a[0],
                idx: a[1]
            };
        e.splice(a[0], 1, o), this.setData({
            sku: e
        });
        for (var i = "", s = 0; s < e.length; s++) s == e.length - 1 ? i += e[s].id : i = i + e[s].id + "_";
        var r = this.data.skuList.sku_mu_list[i];
        this.setData({
            cur_sku_arr: r
        }), console.log(i)
    },
    setNum: function(t) {
        var a = t.currentTarget.dataset.type,
            e = 1,
            o = 1 * this.data.sku_val;
        "add" == a ? e = o + 1 : "decrease" == a && 1 < ku_val && (e = o - 1);
        var i = this.data.sku,
            s = this.data.skuList;
        if (0 < i.length) for (var r = "", n = 0; n < i.length; n++) n == i.length - 1 ? r += i[n].id : r = r + i[n].id + "_";
        0 < s.length ? e > s.sku_mu_list[r].canBuyNum && (e -= 1) : e > this.data.cur_sku_arr.canBuyNum && (e -= 1);
        this.setData({
            sku_val: e
        })
    },
    closeSku: function() {
        this.setData({
            visible: 0,
            stopClick: !1
        })
    },
    changeCartNum: function(t) {
        var a = t.detail;
        (0, status.cartNum)(this.setData({
            cartNum: a
        }))
    },
    onShareAppMessage: function() {
        var t = wx.getStorageSync("community").communityId || "",
            a = wx.getStorageSync("member_id") || "";
        return console.log("lionfish_comshop/pages/type/index?community_id=" + t + "&share_id=" + a), {
            path: "lionfish_comshop/pages/type/index?community_id=" + t + "&share_id=" + a,
            success: function() {},
            fail: function() {}
        }
    }
});