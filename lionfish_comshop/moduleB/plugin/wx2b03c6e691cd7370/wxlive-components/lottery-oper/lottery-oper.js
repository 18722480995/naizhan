
			    "use strict";
			Component({
			    properties: {
			        from: {
			            type: String,
			            value: "pusher"
			        },
			        type: {
			            type: String,
			            value: "unstart"
			        },
			        participateType: {
			            type: Number,
			            value: 0
			        },
			        isParticipate: {
			            type: Boolean,
			            value: !1
			        },
			        participateNum: {
			            type: Number,
			            value: 0
			        },
			        luckName: {
			            type: String,
			            value: ""
			        },
			        luckNum: {
			            type: Number,
			            value: 0
			        },
			        mySelfOpenid: {
			            type: String
			        },
			        mySelfLuckMen: {
			            type: Object,
			            value: {}
			        },
			        curLuckMen: {
			            type: Array,
			            value: []
			        },
			        historyLuckMen: {
			            type: Array,
			            value: []
			        },
			        obtainType: {
			            type: Number,
			            value: 0
			        },
			        remark: {
			            type: String,
			            value: ""
			        },
			        countTime: {
			            type: String,
			            value: ""
			        },
			        showCountTime: {
			            type: Boolean,
			            value: !1
			        },
			        endLotteryAnimation: {
			            type: Boolean,
			            value: !1
			        },
			        isFillAddress: {
			            type: Boolean,
			            value: !1
			        },
			        isHistoryFillAddress: {
			            type: Array,
			            value: []
			        },
			        isCancelLottery: {
			            type: Boolean,
			            value: !1
			        }
			    },
			    methods: {
			        startLottery: function() {
			            this.triggerEvent("customevent", {
			                showLotteryOper: !0,
			                confirmStartLottery: !0
			            })
			        },
			        cancelLottery: function() {
			            this.triggerEvent("customevent", {
			                showLotteryOper: !0,
			                confirmCancelLottery: !0
			            })
			        },
			        closeLotteryOper: function() {
			            this.triggerEvent("customevent", {
			                confirmCloseLotteryOper: !0,
			                showLotteryOper: !1
			            })
			        },
			        clickComment: function() {
			            this.triggerEvent("customevent", {
			                confirmClickCommentWithLottery: !0,
			                showLotteryOper: !1,
			                operatePushComment: !0,
			                showPushComment: !0
			            })
			        },
			        clickLike: function() {
			            this.triggerEvent("customevent", {
			                confirmClickLikeWithLottery: !0,
			                showLotteryOper: !1
			            })
			        },
			        clickResultList: function() {
			            this.setData({
			                type: "result-list"
			            }), this.triggerEvent("customevent", {
			                confirmClickLotteryList: !0,
			                showLotteryOper: !0
			            })
			        },
			        clipboardLotteryToken: function(t) {
			            wx.setClipboardData({
			                data: t.currentTarget.dataset.token,
			                success: function() {
			                    console.log("clipboard token", t.currentTarget.dataset.token)
			                },
			                fail: function() {
			                    wx.showToast({
			                        title: "复制失败",
			                        icon: "none",
			                        duration: 1500,
			                        mask: !1
			                    })
			                }
			            }), this.triggerEvent("customevent", {
			                confirmClipboardLotteryToken: !0,
			                showLotteryOper: !0
			            })
			        },
			        fillLotteryAddress: function() {
			            this.triggerEvent("customevent", {
			                confirmFillLotteryAddress: !0
			            })
			        },
			        fillHistoryLotteryAddress: function(t) {
			            this.setData({
			                type: "result-list"
			            });
			            var e = t.currentTarget.dataset.id,
			                r = t.currentTarget.dataset.index;
			            this.triggerEvent("customevent", {
			                lotteryId: e,
			                index: r,
			                confirmFillHistoryLotteryAddress: !0
			            })
			        },
			        viewLotteryAddress: function(t) {
			            var e = t.currentTarget.dataset.id;
			            this.triggerEvent("customevent", {
			                lotteryId: e,
			                confirmViewLotteryAddress: !0
			            })
			        },
			        viewHistoryLotteryAddress: function(t) {
			            this.setData({
			                type: "result-list"
			            });
			            var e = t.currentTarget.dataset.id,
			                r = t.currentTarget.dataset.index;
			            this.triggerEvent("customevent", {
			                lotteryId: e,
			                index: r,
			                confirmViewHistoryLotteryAddress: !0
			            })
			        }
			    }
			});