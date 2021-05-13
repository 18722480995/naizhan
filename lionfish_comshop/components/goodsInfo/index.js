Component({
    properties: {
        order: {
            type: Object
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
        }
    }
});