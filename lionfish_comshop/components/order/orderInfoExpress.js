Component({
    properties: {
        order: {
            type: Object,
            observer: function(e) {
                var a = e && e.order && e.order_info.shipping_tel || "";
                if (a) {
                    var t = (a = "" + a).replace(a.substring(3, 7), "****");
                    this.setData({
                        tel: t
                    })
                }
            }
        },
        showNickname: {
            type: Boolean,
            default: !1
        },
        hidePhone: {
            type: Number,
            default: 0
        },
        groupInfo: {
            type: Object,
            default: {
                group_name: "社区",
                owner_name: "团长",
                delivery_ziti_name: "到点自提",
                delivery_tuanzshipping_name: "团长配送",
                delivery_express_name: "快递配送"
            }
        }
    },
    data: {
        isCalling: !1
    },
    methods: {
        callTelphone: function(e) {
            var a = this;
            this.data.isCalling || (this.data.isCalling = !0, wx.makePhoneCall({
                phoneNumber: e.currentTarget.dataset.phone,
                complete: function() {
                    a.data.isCalling = !1
                }
            }))
        },
        goExpress: function() {
            var e = this.data.order.order_info.order_id;
            wx.navigateTo({
                url: "/lionfish_comshop/pages/order/goods_express?id=" + e
            })
        }
    }
});