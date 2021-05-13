var util = require("../../utils/util.js"),
    app = getApp();
Component({
    properties: {
        spuItem: {
            type: Object,
            value: {
                spuId: "",
                skuId: "",
                spuImage: "",
                spuName: "",
                endTime: 0,
                beginTime: "",
                actPrice: ["", ""],
                marketPrice: ["", ""],
                spuCanBuyNum: "",
                soldNum: "",
                actId: "",
                limitMemberNum: "",
                limitOrderNum: "",
                serverTime: "",
                isLimit: !1,
                skuList: [],
                spuDescribe: "",
                is_take_fullreduction: 0,
                label_info: "",
                car_count: 0
            },
            observer: function(e) {
                var t = e.soldNum + 1 * e.spuCanBuyNum,
                    a = parseInt(e.soldNum / t * 100) || 0;
                this.setData({
                    precent: a
                })
            }
        },
        actEnd: {
            type: Boolean,
            value: !1
        },
        needAuth: {
            type: Boolean,
            value: !1
        },
        theme: {
            type: Number,
            value: 0
        },
        begin: {
            type: Number,
            value: 1
        }
    },
    attached: function() {
        this.setData({
            placeholdeImg: app.globalData.placeholdeImg
        })
    },
    data: {
        disabled: !1,
        placeholdeImg: "",
        precent: 0
    },
    methods: {
        openSku: function() {
            wx.navigateTo({
                url: "/lionfish_comshop/pages/goods/goodsDetail?id=" + this.data.spuItem.actId
            }), console.log("抢购")
        }
    }
});