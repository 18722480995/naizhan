
			    "use strict";
			var t = function(t) {
			    if (isNaN(t)) return "-";
			    if (t <= 0) return "0";
			    var i = t,
			        e = parseInt(i / 86400);
			    i -= 86400 * e;
			    var n = parseInt(i / 3600);
			    i -= 3600 * n;
			    var o = parseInt(i / 60);
			    return i -= 60 * o, e > 0 ? e + "天" + n + "小时" : n > 0 ? n + "小时" + o + "分" : o > 0 ? o + "分" : i + "秒"
			}, i = null,
			    e = 100;
			Component({
			    properties: {
			        countdownTime: {
			            type: Number
			        },
			        countdownTimeContent: {
			            type: String,
			            value: ""
			        },
			        isSubscribe: {
			            type: Boolean
			        },
			        name: {
			            type: String,
			            value: ""
			        },
			        from: {
			            type: String,
			            value: ""
			        }
			    },
			    lifetimes: {
			        attached: function() {
			            "pusher" === this.data.from && (e = this.data.countdownTime, this.initCountdownTime())
			        },
			        detached: function() {
			            "pusher" === this.data.from && clearTimeout(i)
			        }
			    },
			    observers: {
			        countdownTime: function() {
			            "pusher" === this.data.from && (e = this.data.countdownTime) < 864e4 && this.initCountdownTime()
			        }
			    },
			    data: {
			        countdownTimeWording: ""
			    },
			    methods: {
			        initCountdownTime: function() {
			            var n = this;
			            if (clearTimeout(i), e > 0) {
			                var o = 60;
			                e <= 70 ? o = 1 : e <= 80 ? o = 5 : e > 86400 && (o = 1800), this.setData({
			                    countdownTimeWording: t(e)
			                }), i = setTimeout(function() {
			                    e -= o, n.initCountdownTime()
			                }, 1e3 * o)
			            } else {
			                if (0 === this.data.countdownTime) return;
			                this.setData({
			                    countdownTime: 0
			                })
			            }
			        },
			        clickSubscribe: function() {
			            this.triggerEvent("customevent", {
			                confirmSubscribe: !0,
			                isSubscribe: this.data.isSubscribe
			            })
			        },
			        clickInitateLive: function() {
			            this.triggerEvent("InitateLive", {})
			        }
			    }
			});