
			    "use strict";
			var e = require("../../wxlive-components/logic/ui.js");
			Component({
			    options: {
			        styleIsolation: "page-apply-shared"
			    },
			    properties: {
			        livePlayerOptions: String
			    },
			    data: {
			        uiPagePaddingTop: 0,
			        showSubmitReport: !1,
			        reportCommentAvatar: "",
			        reportCommentNickname: "",
			        reportCommentContent: "",
			        reportItems: [{
			            type: "低俗色情",
			            value: "value0",
			            checked: !1
			        }, {
			            type: "有害信息",
			            value: "value1",
			            checked: !1
			        }, {
			            type: "垃圾营销",
			            value: "value2",
			            checked: !1
			        }, {
			            type: "侵犯人身权益",
			            value: "value3",
			            checked: !1
			        }, {
			            type: "其它",
			            value: "value4",
			            checked: !1
			        }],
			        currentReportItem: ""
			    },
			    methods: {
			        onLoad: function() {
			            var t = JSON.parse(decodeURIComponent(this.data.livePlayerOptions));
			            (0, e.setNavFontColor)("#f7f7f7"), this.setData({
			                reportCommentAvatar: t.avatar,
			                reportCommentNickname: t.nickname,
			                reportCommentContent: t.content
			            })
			        },
			        onShow: function() {
			            this.uiGetPagePaddingTop()
			        },
			        uiGetPagePaddingTop: function() {
			            this.setData({
			                uiPagePaddingTop: (0, e.getPaddingTop)()
			            })
			        },
			        selectedReportReasonChange: function(e) {
			            this.setData({
			                showSubmitReport: !0,
			                reportItem: e.detail.value
			            })
			        },
			        submitReport: function() {
			            var e = "",
			                t = this.data.reportItem;
			            this.data.reportItems.forEach(function(a) {
			                t === a.value && (e = a.type)
			            }), this.getOpenerEventChannel().emit("acceptDataFromReportCommentsPage", {
			                reportType: e
			            }), wx.navigateTo({
			                url: "../report-status/report-status?path=reportCommentsPage"
			            })
			        }
			    }
			});