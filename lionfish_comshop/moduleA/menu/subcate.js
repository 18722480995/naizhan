var app = getApp();
Page({
    data: {
        subCate: []
    },
    onLoad: function(t) {
        this.getCate()
    },
    getCate: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "recipe.get_recipe_categorylist"
            },
            dataType: "json",
            success: function(t) {
                if (0 == t.data.code) {
                    var a = t.data.data || [];
                    e.setData({
                        subCate: a
                    })
                }
            }
        })
    },
    goList: function(t) {
        var a = t.currentTarget.dataset.id || "",
            e = t.currentTarget.dataset.name || "";
        wx.navigateTo({
            url: "/lionfish_comshop/moduleA/menu/list?gid=" + a + "&name=" + e
        })
    }
});