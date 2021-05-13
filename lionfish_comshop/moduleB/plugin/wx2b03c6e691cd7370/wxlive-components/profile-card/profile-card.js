
			    "use strict";
			var t = require("../logic/ui.js"),
			    e = null,
			    i = null,
			    n = function(t) {
			        return t < 10 ? "0" + t : String(t)
			    }, a = function(t) {
			        t = Number(t);
			        var e = Math.floor(t / 3600),
			            i = Math.floor((t - 3600 * e) / 60),
			            a = Math.floor(t - 3600 * e - 60 * i);
			        return n(e) + ":" + n(i) + ":" + n(a)
			    };
			Component({
			    properties: {
			        weappImg: {
			            type: String,
			            value: ""
			        },
			        weappName: {
			            type: String,
			            value: ""
			        },
			        liveStat: {
			            type: Object,
			            value: {
			                watch_pv: 0
			            }
			        },
			        liveStatSimulateWatch: {
			            type: String
			        },
			        from: {
			            type: String,
			            value: ""
			        },
			        watchSecond: {
			            type: Number
			        },
			        isSubscribe: {
			            type: Boolean,
			            value: !1
			        },
			        status: {
			            type: String,
			            value: "ready"
			        }
			    },
			    data: {
			        endBtnDisabled: !0,
			        rightPosition: 0,
			        navigationTitleWidth: "7em"
			    },
			    observers: {
			        watchSecond: function(t) {
			            e && clearTimeout(e), this.initWatchTime(t)
			        },
			        status: function(t) {
			            var e = this;
			            t === i && "recording" === t || ("recording" === t ? (i = t, this.setData({
			                endBtnDisabled: !0
			            }), setTimeout(function() {
			                e.setData({
			                    endBtnDisabled: !1
			                })
			            }, 5e3)) : i = t)
			        }
			    },
			    lifetimes: {
			        ready: function() {
			            var e = (0, t.getScreenWidth)();
			            if (e) {
			                var i = "pusher" === this.data.from && "recording" === this.data.status ? e - 260 - 49 - 5 + "px" : e - 260 - 5 + "px";
			                this.setData({
			                    navigationTitleWidth: i
			                })
			            }
			        }
			    },
			    methods: {
			        initWatchTime: function(t) {
			            var i = this,
			                n = a(t);
			            this.setData({
			                watchTimeStr: n
			            }), e = setTimeout(function() {
			                i.initWatchTime(t + 1)
			            }, 1e3)
			        },
			        clickProfileModal: function() {
			            this.triggerEvent("customevent", {
			                showProfileModal: !0
			            })
			        },
			        clickSubscribe: function() {
			            this.triggerEvent("customevent", {
			                confirmSubscribe: !0,
			                isSubscribe: this.data.isSubscribe
			            })
			        },
			        onClickEndLive: function() {
			            this.data.endBtnDisabled || this.triggerEvent("EndLive", {})
			        }
			    }
			});