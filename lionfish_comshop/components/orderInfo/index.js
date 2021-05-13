Component({
    properties: {
        orderInfo: {
            type: Object,
            observer: function(t) {
                var o = 1 * t.real_total,
                    e = (t.total, parseFloat(o) - parseFloat(t.shipping_fare)),
                    a = parseFloat(t.voucher_credit) + parseFloat(t.fullreduction_money);
                a = e < a ? e : a, this.setData({
                    goodsTotal: e.toFixed(2),
                    disAmount: a.toFixed(2)
                })
            }
        },
        order_goods_list: {
            type: Array,
            observer: function(t) {
                var a = 0;
                t && t.length && t.forEach(function(t) {
                    var o = 1 * t.total,
                        e = 1 * t.old_total;
                    1 != t.is_level_buy && 1 != t.is_vipcard_buy || (a += e - o)
                }), this.setData({
                    levelAmount: a.toFixed(2)
                })
            }
        },
        ordername: {
            type: String,
            value: "订单"
        }
    },
    data: {
        disAmount: 0,
        goodsTotal: 0
    }
});