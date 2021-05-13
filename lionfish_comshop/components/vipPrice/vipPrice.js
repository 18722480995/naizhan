Component({
    properties: {
        price: {
            type: null,
            value: "0",
            observer: function(e) {
                var t = e;
                "[object Array]" === Object.prototype.toString.call(e) && (t = e.join(".")), this.setData({
                    prePrice: t
                })
            }
        },
        type: {
            type: String,
            value: "0"
        }
    },
    data: {
        prePrice: 0
    }
});