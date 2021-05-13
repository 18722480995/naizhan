var app = getApp();
Page({
    onLoad: function(a) {
        var i = a.type || "";
        if (!i) return wx.showModal({
            title: "提示",
            content: "参数错误",
            showCancel: !1,
            confirmColor: "#F75451",
            success: function(a) {
                a.confirm && wx.navigateBack()
            }
        }), !1;
        wx.setNavigationBarTitle({
            title: {
                vipcard: "权益规则",
                pintuan: "拼团规则",
                signin: "活动规则",
                solitaire: "接龙规则"
            }[i] || "规则"
        }), wx.showLoading(), this.getData(i)
    },
    getData: function(t) {
        wx.showLoading();
        var a = wx.getStorageSync("token"),
            e = this;
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                controller: {
                    vipcard: "vipcard.get_vipcard_baseinfo",
                    pintuan: "group.pintuan_slides",
                    signin: "signinreward.get_signinreward_baseinfo",
                    solitaire: "solitaire.get_rule"
                }[t],
                token: a
            },
            dataType: "json",
            success: function(a) {
                if (wx.hideLoading(), 0 == a.data.code) {
                    var i = "";
                    if ("vipcard" == t) i = a.data.data.vipcard_buy_pagenotice;
                    else if ("pintuan" == t) {
                        i = a.data.pintuan_publish
                    } else if ("signin" == t) {
                        i = a.data.data.signinreward_pagenotice
                    } else if ("solitaire" == t) {
                        i = a.data.solitaire_notice
                    }
                    e.setData({
                      article: i.replace('< img ', '< img style="max-width:100%;height:auto;display:block;margin:10px 0;"')
                    })
                }
            }
        })
    }
});