var app = getApp();
Component({
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        carts: {
            type: Object || Array,
            value: {}
        },
        soliId: {
            type: Number,
            value: 0
        },
        stitle: {
            type: String,
            value: "已选商品"
        }
    },
    data: {
        token: "",
        community: ""
    },
    attached: function() {
        var t = wx.getStorageSync("token"),
            a = wx.getStorageSync("community");
        this.setData({
            token: t,
            community: a
        })
    },
    methods: {
        changeNumber: function(t) {
            var a = this,
                o = t.currentTarget.dataset.cartid,
                e = t.currentTarget.dataset.gidx,
                r = t.detail.value;
            if (0 == r) this.cofirm_del(o, e);
            else {
                var s = a.data.carts,
                    n = s[o].shopcarts[e].goodsnum;
                s[o].shopcarts[e].goodsnum = r, this.setData({
                    carts: s
                }, function() {
                    a.go_record().then(function() {
                        a.triggerEvent("changeCart", s)
                    }).
                    catch (function() {
                        s[o].shopcarts[e].goodsnum = n, a.setData({
                            carts: s
                        })
                    })
                })
            }
        },
        handleModal: function() {
            console.log("关闭购物车弹窗"), this.triggerEvent("hideModal")
        },
        cofirm_del: function(e, r) {
            var s = this;
            wx.showModal({
                title: "提示",
                content: "确定删除这件商品吗？",
                confirmColor: "#FF0000",
                success: function(t) {
                    if (t.confirm) {
                        var a = s.data.carts,
                            o = a[e].shopcarts[r].key;
                        a[e].shopcarts.splice(r, 1), s.setData({
                            carts: a
                        }), s.del_car_goods(o)
                    } else console.log("取消删除")
                }
            })
        },
        del_car_goods: function(t) {
            var a = this;
            console.log("del_car_goods:开始");
            var o = this.data,
                e = o.token,
                r = o.community.communityId;
            app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "car.del_car_goods",
                    carkey: t,
                    community_id: r,
                    token: e
                },
                method: "POST",
                dataType: "json",
                success: function(t) {
                    0 == t.data.code && a.triggerEvent("changeCart", a.data.carts)
                }
            })
        },
        go_record: function() {
            var h = this;
            return new Promise(function(a, o) {
                var t = h.data,
                    e = t.carts,
                    r = t.token,
                    s = t.community,
                    n = t.soliId,
                    c = [],
                    i = [],
                    d = s.communityId;
                for (var u in e) for (var l in e[u].shopcarts) c.push(e[u].shopcarts[l].key), i.push(e[u].shopcarts[l].key + "_" + e[u].shopcarts[l].goodsnum);
                app.util.request({
                    url: "entry/wxapp/index",
                    data: {
                        controller: "car.checkout_flushall",
                        token: r,
                        car_key: c,
                        community_id: d,
                        all_keys_arr: i,
                        buy_type: "soitaire",
                        soli_id: n
                    },
                    method: "POST",
                    dataType: "json",
                    success: function(t) {
                        0 == t.data.code ? a() : (wx.showToast({
                            title: t.data.msg,
                            icon: "none",
                            duration: 2e3
                        }), o())
                    }
                })
            })
        }
    }
});