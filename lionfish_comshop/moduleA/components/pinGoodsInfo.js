Component({
    externalClasses: ["i-class", "i-class-identity"],
    properties: {
        isOrder: {
            type: Boolean,
            value: !1
        },
        goodsInfo: {
            type: Object,
            value: {
                danprice: "0.00",
                goods_images: "",
                name: "",
                pin_count: "2",
                pinprice: "0.00",
                productprice: "0.00",
                seller_count: 0,
                subtitle: "",
                me_is_head: 1
            },
            observer: function(e) {
                var i;
                i = e && e.price && (1 * e.price).toFixed(2) || 0, this.setData({
                    price: i
                })
            }
        },
        me_is_head: {
            type: Boolean,
            value: !1
        }
    },
    methods: {
        goDetail: function() {
            var e = this.data,
                i = e.isOrder,
                o = e.goodsInfo.goods_id || "";
            if (o && !i) {
                var t = "/lionfish_comshop/moduleA/pin/goodsDetail?id=" + o;
                3 < getCurrentPages().length ? wx.redirectTo({
                    url: t
                }) : wx.navigateTo({
                    url: t
                })
            }
        }
    }
});