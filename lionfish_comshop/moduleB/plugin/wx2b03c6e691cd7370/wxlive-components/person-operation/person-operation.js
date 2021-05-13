
			    "use strict";
			var t = function(t) {
			    return t && t.__esModule ? t : {
			        default: t
			    }
			}(require("../lottie-miniprogram/miniprogram_dist/index.js")),
			    e = wx.getSystemInfoSync() || {}, i = "isLivePlayerPluginAuthorize-" + (wx.getAccountInfoSync().miniProgram.appId || ""),
			    n = "https://cdn.jsdelivr.net/gh/youbaowu/lottiefiles@v1.0";
			Component({
			    properties: {
			        from: {
			            type: String,
			            value: ""
			        },
			        type: {
			            type: String,
			            value: ""
			        },
			        liveStatSimulateLike: {
			            type: String
			        },
			        leftLotteryTime: {
			            type: Number,
			            value: 0
			        },
			        participateType: {
			            type: Number,
			            value: 0
			        }
			    },
			    data: {
			        likeAnimationJson: [n + "/like/like/like.json", n + "/like/star/star.json", n + "/like/gift/gift.json", n + "/like/smile/smile.json", n + "/like/heart/heart.json"],
			        lottie: "",
			        context: ""
			    },
			    ready: function() {
			        this.isSupportLikeAnimation() && "player" === this.data.from && "end" !== this.data.type && this.createLikeAnimation()
			    },
			    methods: {
			        randomFrom: function(t, e) {
			            return Math.floor(Math.random() * (e - t + 1) + t)
			        },
			        isSupportLikeAnimation: function() {
			            var t = e.platform,
			                i = e.version,
			                n = void 0 === i ? "" : i;
			            return n = n.split("."), ("android" === t || "ios" === t) && +("" + n[0] + n[1] + n[2]) >= 707 || "windows" === t && +("" + n[0] + n[1] + n[2]) >= 271
			        },
			        createLikeAnimation: function() {
			            var e = this,
			                i = new t.
			            default.
			            default;
			            this.createSelectorQuery().selectAll("#person-operation__player__like-canvas").node(function(t) {
			                var n = t[0].node,
			                    o = n.getContext("2d");
			                n.width = 3 * n._width, n.height = 3 * n._height, i.setup(n), e.data.likeAnimationJson.forEach(function(t) {
			                    i.loadAnimation({
			                        loop: !1,
			                        autoplay: !1,
			                        renderer: "canvas",
			                        path: t.jsonPath,
			                        clearAnimation: !0,
			                        transformPerformance: "high",
			                        rendererSettings: {
			                            context: o
			                        }
			                    })
			                }), e.data.lottie = i, e.data.context = o
			            }).exec()
			        },
			        renderAnimation: function() {
			            var t = this,
			                e = this.data.lottie,
			                i = this.data.context;
			            if (e && i) {
			                var n = this.data.likeAnimationJson[this.randomFrom(1, this.data.likeAnimationJson.length) - 1];
			                e.loadAnimation({
			                    loop: !1,
			                    autoplay: !0,
			                    renderer: "canvas",
			                    path: n,
			                    clearAnimation: !0,
			                    transformPerformance: "high",
			                    rendererSettings: {
			                        context: i
			                    }
			                }).onComplete = function(e) {
			                    var i = Math.round(+e.fps);
			                    t.triggerEvent("customevent", {
			                        reportAnimationFPS: !0,
			                        animationFPS: i
			                    })
			                }
			            }
			        },
			        clickLike: function() {
			            this.isSupportLikeAnimation() && (0 === this.data.participateType || this.data.leftLotteryTime <= 0 || wx.getStorageSync(i) ? (this.renderAnimation(), this.triggerEvent("customevent", {
			                confirmClickLike: !0
			            })) : this.triggerEvent("customevent", {
			                confirmClickLikeWithoutAuthorize: !0
			            }))
			        },
			        clickComment: function() {
			            this.triggerEvent("customevent", {
			                operatePushComment: !0,
			                showPushComment: !0
			            })
			        },
			        clickStore: function() {
			            this.triggerEvent("customevent", {
			                showStoreList: !0
			            }), this.triggerEvent("store", {
			                showStoreList: !0
			            })
			        },
			        clickSetting: function() {
			            this.triggerEvent("setting", {})
			        }
			    }
			});