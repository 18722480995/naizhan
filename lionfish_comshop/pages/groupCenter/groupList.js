var _extends = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var a = arguments[t];
            for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (e[r] = a[r])
        }
        return e
    }, page = 1,
    app = getApp(),
    status = require("../../utils/index.js");
Page({
    data: {
        currentTab: 0,
        pageSize: 10,
        navList: [{
            name: "全部",
            id: "0"
        }, {
            name: "待配送",
            id: "1"
        }, {
            name: "待签收",
            id: "2"
        }, {
            name: "待提货",
            id: "3"
        }, {
            name: "已完成",
            id: "4"
        }],
        loadText: "",
        disUserId: "",
        no_order: 0,
        page: 1,
        hide_tip: !0,
        order: [],
        tip: "正在加载",
        searchfield: [{
            field: "ordersn",
            name: "订单号"
        }, {
            field: "member",
            name: "会员昵称"
        }, {
            field: "address",
            name: "配送联系人"
        }, {
            field: "mobile",
            name: "下单手机号"
        }, {
            field: "location",
            name: "配送地址"
        }, {
            field: "goodstitle",
            name: "商品标题"
        }],
        fieldIdx: 0,
        groupInfo: {
            group_name: "社区",
            owner_name: "团长"
        }
    },
    searchOBj: {},
    onLoad: function(e) {
        var t = this;
        status.setGroupInfo().then(function(e) {
            t.setData({
                groupInfo: e
            })
        }), page = 1;
        var a = 0;
        null != e && (a = e.tab), this.setData({
            currentTab: a
        }), this.getData(a)
    },
    onShow: function() {},
    bindFiledChange: function(e) {
        this.setData({
            fieldIdx: e.detail.value
        })
    },
    searchByKey: function(e) {
        var t = this,
            a = this.data,
            r = a.searchfield[a.fieldIdx].field,
            n = e.detail.value || "";
        this.searchOBj = {
            keyword: n,
            searchfield: r
        }, this.setData({
            page: 1,
            order: []
        }, function() {
            t.getData()
        })
    },
    callPhone: function(e) {
        var t = e.currentTarget.dataset.phone;
        t && wx.makePhoneCall({
            phoneNumber: t
        })
    },
    switchNav: function(e) {
        if (this.data.currentTab === 1 * e.currentTarget.dataset.id) return !1;
        this.setData({
            currentTab: 1 * e.currentTarget.dataset.id,
            page: 1,
            order: []
        }), this.getData()
    },
    getData: function() {
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), this.setData({
            isHideLoadMore: !0
        }), this.data.no_order = 1;
        var o = this,
            e = wx.getStorageSync("token"),
            t = this.data.currentTab,
            a = -1;
        1 == t ? a = 1 : 2 == t ? a = 14 : 3 == t ? a = 4 : 4 == t && (a = 6), app.util.request({
            url: "entry/wxapp/index",
            data: _extends({
                controller: "order.orderlist",
                is_tuanz: 1,
                token: e,
                page: o.data.page,
                order_status: a
            }, this.searchOBj),
            dataType: "json",
            success: function(e) {
                var t = e.data,
                    a = {
                        open_aftersale: t.open_aftersale,
                        open_aftersale_time: t.open_aftersale_time
                    };
                if (0 != e.data.code) return o.setData(_extends({
                    isHideLoadMore: !0
                }, a)), wx.hideLoading(), !1;
                console.log(o.data.page);
                var r = e.data.data,
                    n = o.data.order.concat(r);
                o.setData(_extends({
                    order: n,
                    hide_tip: !0,
                    no_order: 0
                }, a)), wx.hideLoading()
            }
        })
    },
    sign_one: function(e) {
        var n = this,
            o = e.currentTarget.dataset.order_id,
            t = wx.getStorageSync("token");
        wx.showModal({
            title: "提示",
            content: "确认提货",
            confirmColor: "#F75451",
            success: function(e) {
                e.confirm && app.util.request({
                    url: "entry/wxapp/index",
                    data: {
                        controller: "order.sign_dan_order",
                        token: t,
                        order_id: o
                    },
                    dataType: "json",
                    success: function(e) {
                        wx.showToast({
                            title: "签收成功",
                            duration: 1e3
                        });
                        var t = n.data.order,
                            a = [];
                        for (var r in t) t[r].order_id != o && a.push(t[r]);
                        n.setData({
                            order: a
                        })
                    }
                })
            }
        })
    },
    goOrderDetail: function(e) {
        var t = e.currentTarget.dataset.order_id;
        wx.navigateTo({
            url: "/lionfish_comshop/pages/groupCenter/groupDetail?groupOrderId=" + t
        })
    },
    onReachBottom: function() {
        if (1 == this.data.no_order) return !1;
        this.data.page += 1, this.getData(), this.setData({
            isHideLoadMore: !1
        })
    },
    handleTipDialog: function(e) {
        var t = e.currentTarget.dataset.type || 0;
        this.setData({
            showTipDialog: !this.data.showTipDialog,
            fen_type: t
        })
    }
});