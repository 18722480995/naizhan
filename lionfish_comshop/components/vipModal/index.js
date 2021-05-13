Component({
    properties: {
        visible: {
            type: Boolean,
            value: !1
        },
        imgUrl: {
            type: String,
            value: ""
        }
    },
    methods: {
        goUrl: function() {
            wx.navigateTo({
                url: "/lionfish_comshop/moduleA/vip/upgrade"
            })
        },
        closeModal: function() {
            this.setData({
                visible: !1
            })
        }
    }
});