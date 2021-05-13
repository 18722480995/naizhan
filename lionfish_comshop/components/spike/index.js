var app = getApp();
Component({
    properties: {
        refresh: {
            type: Boolean,
            value: !1,
            observer: function(t) {
                var e = this;
                t && this.setData({
                    pageNum: 1,
                    noMore: !1,
                    list: []
                }, function() {
                    e.getData()
                })
            }
        },
        clearTimer: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        disabled: !1,
        list: [],
        pageNum: 1,
        noMore: !1,
        rushEndTime: 0
    },
    methods: {
        getData: function() {
            var t = wx.getStorageSync("token"),
                i = this,
                e = wx.getStorageSync("community");
            app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "index.load_spikebuy_goodslist",
                    token: t,
                    pageNum: i.data.pageNum,
                    head_id: e.communityId
                },
                dataType: "json",
                success: function(t) {
                    if (0 == t.data.code) {
                        var e = i.data.list.concat(t.data.list),
                            a = i.getTime(e);
                        console.log(a), i.setData({
                            list: e,
                            rushEndTime: a
                        })
                    } else i.setData({
                        noMore: !0
                    })
                }
            })
        },
        getMore: function() {
            if (!this.data.noMore) {
                var t = this,
                    e = t.data.pageNum + 1;
                console.log(e), this.setData({
                    pageNum: e
                }, function() {
                    t.getData()
                })
            }
        },
        openSku: function(t) {
            var e = t.currentTarget.dataset.idx;
            this.setData({
                disabled: !1
            });
            var a = this.data.list[e];
            this.triggerEvent("openSku", {
                actId: a.actId,
                skuList: a.skuList,
                promotionDTO: a.promotionDTO || "",
                is_take_vipcard: a.is_take_vipcard,
                is_mb_level_buy: a.is_mb_level_buy,
                allData: {
                    spuName: a.spuName,
                    skuImage: a.skuImage,
                    actPrice: a.actPrice,
                    canBuyNum: a.spuCanBuyNum,
                    stock: a.spuCanBuyNum,
                    marketPrice: a.marketPrice
                }
            })
        },
        getTime: function(t) {
            var e = 0;
            return 0 === (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0) && t.map(function(t) {
                t.end_time *= 1e3, e = t.end_time > e ? t.end_time : e
            }), e
        }
    }
});