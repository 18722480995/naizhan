
			    "use strict";
			var t = function(t) {
			    return t && t.__esModule ? t : {
			        default: t
			    }
			}(require("../lottie-miniprogram/miniprogram_dist/index.js")),
			    n = wx.getSystemInfoSync() || {};
			Component({
			    properties: {
			        from: {
			            type: String,
			            value: "pusher"
			        },
			        type: {
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
			        showEndIcon: {
			            type: Boolean,
			            value: !1
			        },
			        firstStartLotteryAnimation: {
			            type: Boolean,
			            value: !1
			        },
			        nextStartLotteryAnimation: {
			            type: Boolean,
			            value: !1
			        },
			        endLotteryAnimation: {
			            type: Boolean,
			            value: !1
			        }
			    },
			    data: {
			        canvas: ""
			    },
			    ready: function() {
			        "player" === this.data.from && this.createLotteryAnimation()
			    },
			    observers: {
			        showEndIcon: function(t) {},
			        firstStartLotteryAnimation: function(t) {
			            t && this.playLotteryAnimation()
			        },
			        nextStartLotteryAnimation: function(t) {
			            t && this.playLotteryAnimation()
			        },
			        endLotteryAnimation: function(t) {
			            t && this.playLotteryAnimation()
			        }
			    },
			    methods: {
			        isSupportLotteryAnimation: function() {
			            var t = n.platform,
			                e = n.version,
			                i = void 0 === e ? "" : e;
			            return i = i.split("."), ("android" === t || "ios" === t) && +("" + i[0] + i[1] + i[2]) >= 707 || "windows" === t && +("" + i[0] + i[1] + i[2]) >= 271
			        },
			        createLotteryAnimation: function() {
			            var n = this;
			            if (this.isSupportLotteryAnimation()) {
			                var e = new t.
			                default.
			                default;
			                this.createSelectorQuery().selectAll("#lottery__canvas").node(function(t) {
			                    var i = t[0].node,
			                        o = i.getContext("2d");
			                    i.width = 2 * i._width, i.height = 2 * i._height, n.data.canvas = i, e.setup(i);
			                    var a = e.loadAnimation({
			                        loop: !1,
			                        autoplay: !1,
			                        renderer: "canvas",
			                        path: "https://cdn.jsdelivr.net/gh/youbaowu/lottiefiles@v1.0/lottery/lottery.json",
			                        rendererSettings: {
			                            context: o
			                        }
			                    });
			                    n.lotteryAnimation = a
			                }).exec()
			            }
			        },
			        playLotteryAnimation: function() {
			            var t = this;
			            this.isSupportLotteryAnimation() && this.lotteryAnimation && (this.data.canvas.width = 2 * this.data.canvas._width, this.data.canvas.height = 2 * this.data.canvas._height, this.data.firstStartLotteryAnimation ? (this.lotteryAnimation.playSegments([0, 55], !0), this.lotteryAnimation.onComplete = function() {
			                t.setData({
			                    firstStartLotteryAnimation: !1
			                })
			            }) : this.data.nextStartLotteryAnimation ? (this.lotteryAnimation.playSegments([
			                [122, 144],
			                [0, 55]
			            ], !0), this.lotteryAnimation.onComplete = function() {
			                t.setData({
			                    nextStartLotteryAnimation: !1
			                })
			            }) : this.data.endLotteryAnimation && (this.lotteryAnimation.playSegments([
			                [56, 95, {
			                    duration: 5
			                }],
			                [96, 121]
			            ], !0), this.lotteryAnimation.onComplete = function() {
			                t.setData({
			                    endLotteryAnimation: !1
			                })
			            }))
			        },
			        clickLottery: function() {
			            this.triggerEvent("customevent", {
			                confirmClickLottery: !0,
			                showLotteryOper: !0
			            })
			        }
			    }
			});