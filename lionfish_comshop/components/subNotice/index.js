Component({
    properties: {
        visible: {
            type: Boolean,
            value: !1,
            observer: function(e) {
                var t = this;
                e && setTimeout(function() {
                    t.setData({
                        visible: !1
                    })
                }, 1e4)
            }
        },
        templateId: {
            type: Object,
            value: {}
        }
    },
    methods: {
        subscriptionNotice: function() {
            wx.vibrateShort();
            var e = this,
                o = this.data.templateId,
                t = Object.keys(o).map(function(e) {
                    return o[e]
                });
            wx.requestSubscribeMessage ? t.length && wx.requestSubscribeMessage({
                tmplIds: t,
                success: function(t) {
                    var s = [];
                    Object.keys(o).forEach(function(e) {
                        "accept" == t[o[e]] && s.push(e)
                    }), s.length && (e.addAccept(s), e.setData({
                        visible: !1
                    }))
                },
                fail: function(e) {
                    console.log(e), wx.showToast({
                        title: "订阅失败",
                        icon: "none"
                    })
                },
                complete: function(e) {
                    console.log(e)
                }
            }) : (wx.showModal({
                title: "提示",
                content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
            }), e.setData({
                visible: !1
            }))
        },
        addAccept: function(e) {
            var t = wx.getStorageSync("token"),
                s = e.join(",");
            getApp().util.request({
                url: "entry/wxapp/user",
                data: {
                    controller: "user.collect_subscriptmsg",
                    token: t,
                    type: s
                },
                dataType: "json",
                method: "POST",
                success: function(e) {
                    wx.showToast({
                        title: "订阅成功"
                    })
                }
            })
        }
    }
});