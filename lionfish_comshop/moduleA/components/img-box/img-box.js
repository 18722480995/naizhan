var app = getApp();
Component({
    properties: {
        item: {
            type: Object
        }
    },
    methods: {
        agree: function() {
            var e = this,
                a = this.data.item,
                t = wx.getStorageSync("token");
            app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "recipe.fav_recipe_do",
                    token: t,
                    id: a.id
                },
                dataType: "json",
                success: function(t) {
                    0 == t.data.code ? (wx.showToast({
                        title: "已喜欢~",
                        icon: "none"
                    }), a.fav_count = t.data.fav_count, a.has_fav = 1, e.setData({
                        item: a
                    })) : 1 == t.data.code ? e.triggerEvent("needAuth") : 2 == t.data.code && (a.fav_count = t.data.fav_count, a.has_fav = 0, e.setData({
                        item: a
                    }), wx.showToast({
                        title: "取消喜欢~",
                        icon: "none"
                    }))
                }
            })
        },
        goDetails: function(t) {
            var e = t.currentTarget.dataset.id || "",
                a = "/lionfish_comshop/moduleA/menu/details?id=" + e;
            3 < getCurrentPages().length ? e && wx.redirectTo({
                url: a
            }) : e && wx.navigateTo({
                url: a
            })
        }
    }
});