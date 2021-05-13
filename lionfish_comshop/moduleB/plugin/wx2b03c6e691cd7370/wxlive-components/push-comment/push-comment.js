
			    "use strict";
			var t = wx.getAccountInfoSync().miniProgram.appId || "";
			Component({
			    properties: {
			        roomId: {
			            type: Number
			        },
			        maxlength: {
			            type: Number
			        },
			        placeholder: {
			            type: String,
			            value: ""
			        },
			        from: {
			            type: String,
			            value: ""
			        }
			    },
			    data: {
			        pushComment: "",
			        commentKeyboardHeight: 0,
			        isSendDisabled: !0,
			        isShow: !1
			    },
			    lifetimes: {
			        attached: function() {
			            this.inputAttach();
			            var e = wx.getStorageSync("pushCommentCache-" + t + "-" + this.data.roomId) || "";
			            this.setData({
			                pushComment: e,
			                isSendDisabled: !e
			            })
			        },
			        detached: function() {
			            this.inputDetached()
			        }
			    },
			    methods: {
			        inputAttach: function() {
			            var t = this;
			            setTimeout(function() {
			                t.setData({
			                    isShow: !0
			                })
			            }, 410)
			        },
			        inputDetached: function() {
			            this.setData({
			                isShow: !1
			            })
			        },
			        inputPushComment: function(t) {
			            var e = t.detail.value;
			            this.setData({
			                pushComment: e,
			                isSendDisabled: !e
			            })
			        },
			        bindKeyboardHeightChange: function(t) {
			            var e = t.detail.height > this.data.commentKeyboardHeight ? t.detail.height : this.data.commentKeyboardHeight;
			            this.setData({
			                commentKeyboardHeight: e
			            })
			        },
			        focusPushComment: function(t) {
			            var e = t.detail.value,
			                o = t.detail.height > this.data.commentKeyboardHeight ? t.detail.height : this.data.commentKeyboardHeight;
			            this.setData({
			                isSendDisabled: !e,
			                pushComment: e,
			                commentKeyboardHeight: o
			            }), this.triggerEvent("keyboardheightchange", {
			                commentKeyboardHeight: o
			            })
			        },
			        blurPushComment: function() {
			            this.triggerEvent("customevent", {
			                operatePushComment: !0,
			                showPushComment: !1
			            })
			        },
			        confirmPushComment: function() {
			            var e = this.data.pushComment;
			            e ? (this.setData({
			                pushComment: "",
			                isSendDisabled: !0
			            }), this.triggerEvent("customevent", {
			                confirmPushComment: !0,
			                operatePushComment: !0,
			                showPushComment: !0,
			                comment: e
			            }), wx.setStorageSync("pushCommentCache-" + t + "-" + this.data.roomId, "")) : wx.showToast({
			                title: "还没有输入评论哦",
			                icon: "none"
			            })
			        },
			        closePushComment: function() {
			            var e = this.data.pushComment;
			            wx.setStorageSync("pushCommentCache-" + t + "-" + this.data.roomId, e), this.inputDetached(), this.triggerEvent("customevent", {
			                operatePushComment: !0,
			                showPushComment: !1
			            })
			        }
			    }
			});