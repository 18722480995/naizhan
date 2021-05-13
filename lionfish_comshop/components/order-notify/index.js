var app = getApp(),
    ctime = null;
Component({
    externalClasses: ["i-class"],
    properties: {
        stopNotify: {
            type: Boolean,
            value: !0,
            observer: function(e) {
                e ? (clearInterval(ctime), ctime = null) : this._startReq()
            }
        }
    },
    data: {
        userInfo: "",
        hide: !1,
        order_id: 0
    },
    pageLifetimes: {
        hide: function() {
            console.log("notify hide"), clearInterval(ctime), ctime = null
        }
    },
    methods: {
        _startReq: function() {
            var e = this;
            ctime = setInterval(function() {
                e.getOrderNotify()
            }, 3e3)
        },
        getOrderNotify: function() {
            var o = this;
            app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "goods.notify_order"
                },
                dataType: "json",
                success: function(e) {
                    if (0 == e.data.code) {
                        var t = e.data.username,
                            a = e.data.avatar,
                            i = e.data.order_id,
                            r = {
                                username: t,
                                avatar: a
                            };
                        o.data.order_id != i ? (o.setData({
                            hide: !1,
                            userInfo: r,
                            order_id: i
                        }), setTimeout(function() {
                            o.setData({
                                hide: !0
                            })
                        }, 5e3)) : !o.data.hide && setTimeout(function() {
                            o.setData({
                                hide: !0
                            })
                        }, 5e3)
                    }
                }
            })
        }
    }
});