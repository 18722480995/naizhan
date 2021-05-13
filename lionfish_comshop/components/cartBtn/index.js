Component({
    externalClasses: ["i-class"],
    properties: {
        cartNum: {
            type: Number,
            default: 0
        }
    },
    methods: {
        goCart: function() {
            wx.switchTab({
                url: "/lionfish_comshop/pages/order/shopCart"
            })
        }
    }
});