var util = require("we7/resource/js/util.js"),
    timeQueue = require("lionfish_comshop/utils/timeQueue");
require("lionfish_comshop/utils//mixins.js"), App({
    onLaunch: function (t) {
        wx.hideTabBar();
        var e = wx.getStorageSync("userInfo");
        this.globalData.userInfo = e;
        var o = wx.getStorageSync("community");
        this.globalData.hasDefaultCommunity = !!o, this.globalData.community = o, this.globalData.systemInfo = wx.getSystemInfoSync();
        var a = this.globalData.systemInfo.model;
        this.globalData.isIpx = -1 < a.indexOf("iPhone X") || -1 < a.indexOf("unknown<iPhone"), this.globalData.timer = new timeQueue.
        default, this.getConfig()
    },
    onShow: function (t) {
        this.getUpdate()
    },
    onHide: function () {},
    util: util,
    userInfo: {
        sessionid: null
    },
    globalData: {
        systemInfo: {},
        isIpx: !1,
        userInfo: {},
        canGetGPS: !0,
        city: {},
        community: {},
        location: {},
        hasDefaultCommunity: !0,
        historyCommunity: [],
        changedCommunity: !1,
        disUserInfo: {},
        changeCity: "",
        timer: 0,
        formIds: [],
        community_id: "",
        placeholdeImg: "",
        cartNum: 0,
        cartNumStamp: 0,
        common_header_backgroundimage: "",
        appLoadStatus: 1,
        goodsListCarCount: [],
        typeCateId: 0,
        navBackUrl: "",
        isblack: 0
    },
    getUpdate: function () {
        if (wx.canIUse("getUpdateManager")) {
            var e = wx.getUpdateManager();
            e.onCheckForUpdate(function (t) {
                t.hasUpdate && (e.onUpdateReady(function () {
                    wx.showModal({
                        title: "更新提示",
                        content: "新版本已经准备好，是否马上重启小程序？",
                        success: function (t) {
                            t.confirm && e.applyUpdate()
                        }
                    })
                }), e.onUpdateFailed(function () {
                    wx.showModal({
                        title: "已经有新版本了哟~",
                        content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
                    })
                }))
            })
        } else wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        })
    },
    getConfig: function () {
        var t = wx.getStorageSync("token");
        t && util.request({
            url: "entry/wxapp/user",
            data: {
                controller: "index.get_firstload_msg",
                token: t,
                m: "lionfish_comshop"
            },
            method: "post",
            dataType: "json",
            success: function (t) {
                if (0 == t.data.code) {
                    var e = t.data,
                        o = e.new_head_id,
                        a = e.default_head_info;
                    0 < o && Object.keys(a).length && wx.setStorageSync("community", a)
                }
            }
        })
    },
    siteInfo: require("siteinfo.js")
});