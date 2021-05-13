var _Page, _extends = Object.assign || function(t) {
        for (var e = 1; e < arguments.length; e++) {
            var o = arguments[e];
            for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a])
        }
        return t
    };

function _defineProperty(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t
}
var app = getApp();
Page((_defineProperty(_Page = {
    data: {
        showGoodsModal: !1,
        showCommentModal: !1,
        pid: 0,
        showShareModal: !1,
        list: [],
        loadText: "加载中...",
        noData: 0,
        loadMore: !0,
        orderList: [],
        noOrderMore: !1,
        noOrderData: 0
    },
    imagePath: "",
    options: "",
    page: 1,
    orderPage: 1,
    onLoad: function(t) {
        (this.options = t).id || 0 || app.util.message("参数错误", "redirect:/lionfish_comshop/moduleA/solitaire/groupIndex", "error")
    },
    initFn: function() {
        var t = this,
            e = this.options && this.options.id || 0;
        this.page = 1, this.setData({
            list: [],
            loadText: "加载中...",
            noData: 0,
            loadMore: !0
        }, function() {
            e && t.getData(e), t.getCommentList()
        })
    },
    onShow: function() {
        var t = this.options && this.options.id || 0;
        t && this.getData(t), this.getCommentList(), this.getOrderList()
    },
    onHide: function() {
        this.setData({
            clearTime: !0
        })
    },
    getData: function(t) {
        var e = wx.getStorageSync("token"),
            p = this;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "solitaire.get_solitaire_detail",
                id: t,
                token: e,
                is_head: 1
            },
            dataType: "json",
            success: function(t) {
                if (0 != t.data.code) return 2 == t.data.code ? void app.util.message("您还未登录", "switchTo:/lionfish_comshop/pages/index/index", "error") : void app.util.message(t.data.msg, "redirect:/lionfish_comshop/moduleA/solitaire/groupIndex", "error");
                var e = t.data,
                    o = e.head_data,
                    a = e.soli_info,
                    i = e.solitaire_target,
                    n = e.solitaire_target_takemember,
                    s = e.solitaire_target_takemoney,
                    r = e.solitaire_target_type,
                    d = 1 * s - 1 * a.soli_total_money,
                    l = 1 * n - 1 * a.order_count;

                p.setData({
                    community: o || "",
                    soli_info: a,
                    solitaire_target: i,
                    solitaire_target_takemember: n,
                    solitaire_target_takemoney: s,
                    solitaire_target_type: r,
                    diffMoney: d,
                    diffMember: l,
                    clearTime: !1
                }, function() {
                    p.drawImg(o, a)
                })
            }
        })
    },
    showImgPrev: function(t) {
        var e = t ? t.currentTarget.dataset.idx : "",
            o = this.data.soli_info.images_list || [];
        wx.previewImage({
            current: o[e],
            urls: o
        })
    },
    handleGoodsModal: function() {
        this.setData({
            showGoodsModal: !this.data.showGoodsModal
        })
    },
    handleCommentModal: function() {
        this.setData({
            showCommentModal: !this.data.showCommentModal,
            pid: 0
        })
    },
    subComment: function(t) {
        var e = this.data,
            l = e.soli_info,
            p = e.pid,
            c = l.id || "",
            h = t.detail.value.content || "";
        if ("" != h) {
            var g = this,
                o = wx.getStorageSync("token");
            app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "solitaire.sub_solipost",
                    soli_id: c,
                    content: h,
                    pid: p,
                    token: o
                },
                dataType: "json",
                success: function(t) {
                    if (0 == t.data.code) {
                        var e = t.data,
                            o = e.post_id,
                            a = e.cur_time,
                            i = wx.getStorageSync("userInfo"),
                            n = g.data.list;
                        if (0 != p) {
                            var s = {
                                id: o,
                                pid: p,
                                username: i.nickName,
                                content: h
                            }, r = n.findIndex(function(t) {
                                return t.id == p
                            }); - 1 !== r && n[r].reply.push(s)
                        } else {
                            var d = {
                                id: o,
                                soli_id: c,
                                pid: p,
                                username: i.nickName,
                                avatar: i.avatarUrl,
                                content: h,
                                fav_count: 0,
                                addtime: a,
                                reply: [],
                                is_agree: !1
                            };
                            n.unshift(d)
                        }
                        l.comment_total = 1 * l.comment_total + 1, g.setData({
                            soli_info: l,
                            list: n,
                            content: "",
                            showCommentModal: !1,
                            noData: 0
                        }), app.util.message(t.data.msg || "留言成功", "", "success")
                    } else app.util.message(t.data.msg || "留言失败", "", "error")
                }
            })
        } else wx.showToast({
            title: "请输入内容",
            icon: "none"
        })
    },
    replyComment: function(t) {
        var e = t.currentTarget.dataset.id || "";
        this.setData({
            showCommentModal: !this.data.showCommentModal,
            pid: e
        })
    },
    deleteComment: function(t) {
        var n = this,
            o = t.currentTarget.dataset.id || "",
            s = t.currentTarget.dataset.idx || "";
        o && wx.showModal({
            title: "操作提示",
            content: "确认删除此留言？",
            confirmColor: "#ff5041",
            success: function(t) {
                if (t.confirm) {
                    wx.showLoading({
                        title: "删除中..."
                    });
                    var e = wx.getStorageSync("token");
                    app.util.request({
                        url: "entry/wxapp/index",
                        data: {
                            controller: "solitaire.delete_comment",
                            id: o,
                            token: e
                        },
                        dataType: "json",
                        success: function(t) {
                            if (wx.hideLoading(), 0 == t.data.code) {
                                var e = n.data,
                                    o = e.list,
                                    a = e.soli_info;
                                o.splice(s, 1);
                                var i = !1;
                                0 == o.length && (i = !0), a.comment_total = 1 * a.comment_total - 1, n.setData({
                                    list: o,
                                    soli_info: a,
                                    noData: i
                                }), wx.showToast({
                                    title: t.data.msg || "删除成功",
                                    icon: "none"
                                })
                            } else {
                                if (2 == t.data.code) return void app.util.message("您还未登录", "switchTo:/lionfish_comshop/pages/index/index", "error");
                                app.util.message(t.data.msg || "删除失败", "", "error")
                            }
                        }
                    })
                }
            }
        })
    },
    favComment: function(t) {
        var a = this,
            e = this.data.soli_info.id || "",
            o = t ? t.currentTarget.dataset.post_id : "",
            i = t ? t.currentTarget.dataset.idx : 0,
            n = wx.getStorageSync("token");
        o && app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "solitaire.fav_soli_post",
                soli_id: e,
                post_id: o,
                token: n
            },
            dataType: "json",
            success: function(t) {
                if (0 == t.data.code) if (1 == t.data.do) {
                    var e = a.data.list;
                    e[i].is_agree = !0, e[i].fav_count = 1 * e[i].fav_count + 1, a.setData({
                        list: e
                    })
                } else {
                    var o = a.data.list;
                    o[i].is_agree = !1, o[i].fav_count = 1 * o[i].fav_count - 1, a.setData({
                        list: o
                    })
                } else 1 == t.data.code ? a.setData({
                    needAuth: !0,
                    showAuthModal: !0
                }) : wx.showToast({
                    title: t.data.msg || "点赞失败",
                    icon: "none"
                })
            }
        })
    },
    endSolitaire: function(t) {
        var o = this,
            a = o.data.soli_info,
            i = a.id;
        i && wx.showModal({
            title: "操作提示",
            content: "确认终止此接龙吗？",
            confirmColor: "#ff5041",
            success: function(t) {
                if (t.confirm) {
                    wx.showLoading({
                        title: "提交中..."
                    });
                    var e = wx.getStorageSync("token");
                    app.util.request({
                        url: "entry/wxapp/index",
                        data: {
                            controller: "solitaire.end_solitaire",
                            id: i,
                            token: e
                        },
                        dataType: "json",
                        success: function(t) {
                            if (wx.hideLoading(), 0 == t.data.code) a.end = 1, o.setData({
                                soli_info: a
                            }), wx.showToast({
                                title: t.data.msg || "接龙已终止",
                                icon: "none"
                            });
                            else {
                                if (2 == t.data.code) return void app.util.message("您还未登录", "switchTo:/lionfish_comshop/pages/index/index", "error");
                                app.util.message(t.data.msg || "操作失败", "", "error")
                            }
                        }
                    })
                }
            }
        })
    },
    drawImg: function(t, e) {
        var o = e.images_list,
            a = e.qrcode_image,
            i = e.content.replace(/<\/?.+?>/g, ""),
            n = [],
            s = 300;
        o.length && (n.push({
            type: "image",
            url: o[0],
            css: {
                width: "442px",
                height: "300px",
                top: "230px",
                left: "36px",
                rotate: "0",
                borderRadius: "",
                borderWidth: "",
                borderColor: "",
                shadow: "",
                mode: "scaleToFill"
            }
        }), s = 0), this.setData({
            template: {
                width: "514px",
                height: 710 - s + "px",
                background: "#fff",
                views: [{
                    type: "image",
                    url: t.avatar,
                    css: {
                        width: "46px",
                        height: "46px",
                        top: "25px",
                        left: "36px",
                        rotate: "0",
                        borderRadius: "3px",
                        borderWidth: "",
                        borderColor: "#000000",
                        shadow: "",
                        mode: "scaleToFill"
                    }
                }, {
                    type: "text",
                    text: t.head_name,
                    css: {
                        color: "#000000",
                        background: "",
                        width: "385px",
                        height: "20.02px",
                        top: "30px",
                        left: "96px",
                        rotate: "0",
                        borderRadius: "",
                        borderWidth: "",
                        borderColor: "#000000",
                        shadow: "",
                        padding: "0px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        maxLines: "1",
                        lineHeight: "20.202000000000005px",
                        textStyle: "fill",
                        textDecoration: "none",
                        fontFamily: "",
                        textAlign: "left"
                    }
                }, {
                    type: "text",
                    text: t.community_name,
                    css: {
                        color: "#999999",
                        background: "",
                        width: "385px",
                        height: "17.16px",
                        top: "52px",
                        left: "96px",
                        rotate: "0",
                        borderRadius: "",
                        borderWidth: "",
                        borderColor: "#000000",
                        shadow: "",
                        padding: "0px",
                        fontSize: "12px",
                        fontWeight: "normal",
                        maxLines: "1",
                        lineHeight: "17.316000000000003px",
                        textStyle: "fill",
                        textDecoration: "none",
                        fontFamily: "",
                        textAlign: "left"
                    }
                }, {
                    type: "text",
                    text: i,
                    css: {
                        color: "#666666",
                        background: "",
                        width: "442px",
                        height: "52.181999999999995px",
                        top: "158px",
                        left: "36px",
                        rotate: "0",
                        borderRadius: "",
                        borderWidth: "",
                        borderColor: "#000000",
                        shadow: "",
                        padding: "0px",
                        fontSize: "18px",
                        fontWeight: "normal",
                        maxLines: "2",
                        lineHeight: "25.974000000000004px",
                        textStyle: "fill",
                        textDecoration: "none",
                        fontFamily: "",
                        textAlign: "left"
                    }
                }, {
                    type: "text",
                    text: e.solitaire_name,
                    css: {
                        color: "#000000",
                        background: "",
                        width: "442px",
                        height: "42.89999999999999px",
                        top: "95px",
                        left: "36px",
                        rotate: "0",
                        borderRadius: "",
                        borderWidth: "",
                        borderColor: "#000000",
                        shadow: "",
                        padding: "0px",
                        fontSize: "30px",
                        fontWeight: "normal",
                        maxLines: "1",
                        lineHeight: "43.290000000000006px",
                        textStyle: "fill",
                        textDecoration: "none",
                        fontFamily: "",
                        textAlign: "left"
                    }
                }, {
                    type: "text",
                    text: "一群人正在赶来接龙",
                    css: {
                        color: "#999999",
                        background: "",
                        width: "442px",
                        height: "22.88px",
                        top: 595 - s + "px",
                        left: "204px",
                        rotate: "0",
                        borderRadius: "",
                        borderWidth: "",
                        borderColor: "#000000",
                        shadow: "",
                        padding: "0px",
                        fontSize: "16px",
                        fontWeight: "normal",
                        maxLines: "2",
                        lineHeight: "23.088000000000005px",
                        textStyle: "fill",
                        textDecoration: "none",
                        fontFamily: "",
                        textAlign: "left"
                    }
                }, {
                    type: "text",
                    text: "长按识别或扫码参与",
                    css: {
                        color: "#999999",
                        background: "",
                        width: "442px",
                        height: "22.88px",
                        top: 630 - s + "px",
                        left: "204px",
                        rotate: "0",
                        borderRadius: "",
                        borderWidth: "",
                        borderColor: "#000000",
                        shadow: "",
                        padding: "0px",
                        fontSize: "16px",
                        fontWeight: "normal",
                        maxLines: "2",
                        lineHeight: "23.088000000000005px",
                        textStyle: "fill",
                        textDecoration: "none",
                        fontFamily: "",
                        textAlign: "left"
                    }
                }, {
                    type: "image",
                    url: a,
                    css: {
                        width: "120px",
                        height: "120px",
                        top: 560 - s + "px",
                        left: "356px",
                        rotate: "0",
                        borderRadius: "",
                        borderWidth: "",
                        borderColor: "#000000",
                        shadow: "",
                        mode: "scaleToFill"
                    }
                }].concat(n)
            }
        })
    },
    onImgOK: function(t) {
        this.imagePath = t.detail.path, this.setData({
            image: this.imagePath
        })
    },
    saveImage: function() {
        var e = this;
        wx.saveImageToPhotosAlbum({
            filePath: this.imagePath,
            success: function(t) {
                e.setData({
                    showShareModal: !1
                }), wx.showToast({
                    title: "保存成功！"
                })
            },
            fail: function(t) {
                wx.showToast({
                    title: "保存失败，请重试！",
                    icon: "none"
                })
            }
        })
    },
    handleShareModal: function() {
        this.setData({
            showShareModal: !this.data.showShareModal
        })
    }
}, "handleGoodsModal", function(t) {
    if (this.data.showGoodsModal) this.setData({
        showGoodsModal: !1,
        goodsModalList: []
    });
    else {
        var e = t ? t.currentTarget.dataset.idx : "",
            o = this.data.orderList[e].goodslist || [];
        this.setData({
            showGoodsModal: !0,
            goodsModalList: o
        })
    }
}), _defineProperty(_Page, "getCommentList", function() {
    var a = this,
        t = this.options && this.options.id || 0,
        e = wx.getStorageSync("token");
    wx.showLoading(), app.util.request({
        url: "entry/wxapp/index",
        data: {
            controller: "solitaire.get_comment_list",
            page: this.page,
            token: e,
            id: t
        },
        dataType: "json",
        success: function(t) {
            if (wx.hideLoading(), 0 == t.data.code) {
                var e = {}, o = t.data.data;
                o.length < 20 && (e.noMore = !0), o = a.data.list.concat(o), a.page++, a.setData(_extends({
                    list: o
                }, e))
            } else 1 == t.data.code && (1 == a.page && a.setData({
                noData: 1
            }), a.setData({
                loadMore: !1,
                noMore: !1,
                loadText: "没有更多记录了~"
            }))
        }
    })
}), _defineProperty(_Page, "onReachBottom", function() {
    if (!this.data.loadMore) return !1;
    this.getCommentList()
}), _defineProperty(_Page, "getOrderList", function() {
    var n = this,
        t = this.options && this.options.id || 0;
    wx.showLoading(), app.util.request({
        url: "entry/wxapp/index",
        data: {
            controller: "solitaire.get_soli_order_list",
            page: this.orderPage,
            id: t,
            size: 5
        },
        dataType: "json",
        success: function(t) {
            if (wx.hideLoading(), 0 == t.data.code) {
                var e = {}, o = t.data.data;
                o.length < 5 && (e.noOrderMore = !0);
                var a = n.data.orderList.concat(o);
                n.orderPage++, n.setData(_extends({
                    orderList: a
                }, e))
            } else if (1 == t.data.code) {
                var i = {};
                1 == n.orderPage && (i.noOrderData = 1), n.setData(_extends({
                    noOrderMore: !0
                }, i))
            }
        }
    })
}), _defineProperty(_Page, "getMoreOrder", function() {
    this.data.noOrderMore || this.getOrderList()
}), _defineProperty(_Page, "onShareAppMessage", function() {
    var t = wx.getStorageSync("member_id") || "",
        e = this.data.soli_info || "";
    return {
        title: e.solitaire_name || "",
        path: "lionfish_comshop/moduleA/solitaire/details?id=" + e.id + "&share_id=" + t,
        success: function(t) {},
        fail: function(t) {}
    }
}), _Page));