
			    "use strict";
			Component({
			    properties: {
			        from: {
			            type: String,
			            value: ""
			        },
			        openid: {
			            type: String,
			            value: ""
			        },
			        commentList: {
			            type: Array,
			            value: []
			        },
			        isScrollY: {
			            type: Boolean,
			            value: !0
			        },
			        commentScrollIntoView: {
			            type: String,
			            value: ""
			        },
			        newNotifyCount: {
			            type: Number
			        },
			        hasStaticHeight: {
			            type: Number,
			            value: 0
			        }
			    },
			    data: {
			        showNewNotify: !1,
			        showReportCommentList: [],
			        fetchCommentList: [],
			        avatarError: "https://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0"
			    },
			    observers: {
			        commentList: function(t) {
			            this.setData({
			                fetchCommentList: t
			            })
			        }
			    },
			    methods: {
			        handleAvatarError: function(t) {
			            if (t.detail.errMsg) {
			                var e = this.data.fetchCommentList;
			                e[t.target.dataset.index].avatar = this.data.avatarError, this.setData({
			                    fetchCommentList: e
			                })
			            }
			        },
			        scrollComment: function(t) {
			            !this.data.showNewNotify && t.detail.scrollHeight - t.detail.scrollTop > 300 && (this.setData({
			                showNewNotify: !0
			            }), this.triggerEvent("customevent", {
			                scrollComment: !0,
			                isScrollCommentToBottom: !1
			            }))
			        },
			        scrollCommentToBottom: function() {
			            this.setData({
			                showNewNotify: !1
			            }), this.triggerEvent("customevent", {
			                scrollComment: !0,
			                isScrollCommentToBottom: !0
			            })
			        },
			        clickNewNotify: function() {
			            this.setData({
			                showNewNotify: !1,
			                commentScrollIntoView: "comment" + this.data.fetchCommentList.length
			            }), this.triggerEvent("customevent", {
			                scrollComment: !0,
			                confirmNewNotify: !0
			            })
			        },
			        longPressComments: function(t) {
			            var e = [],
			                o = t.currentTarget.dataset.index;
			            e[o] = 0 !== o, this.setData({
			                showReportCommentList: e
			            })
			        },
			        reportComment: function(t) {
			            this.setData({
			                showReportCommentList: []
			            }), "player" === this.data.from && this.triggerEvent("customevent", {
			                confirmReportComment: !0,
			                avatar: t.currentTarget.dataset.avatar,
			                nickname: t.currentTarget.dataset.nickname,
			                content: t.currentTarget.dataset.content
			            }), "pusher" === this.data.from && this.triggerEvent("banuser", {
			                openid: t.currentTarget.dataset.openid
			            })
			        },
			        clickComments: function() {
			            this.setData({
			                showReportCommentList: []
			            })
			        }
			    }
			});