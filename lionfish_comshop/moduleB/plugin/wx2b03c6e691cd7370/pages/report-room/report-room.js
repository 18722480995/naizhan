
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
			        reportItems: [{
			            type: "低俗色情",
			            value: "value0",
			            checked: !1
			        }, {
			            type: "非法政治",
			            value: "value1",
			            checked: !1
			        }, {
			            type: "出售假冒禁售商品",
			            value: "value2",
			            checked: !1
			        }, {
			            type: "引导线下或其他平台交易",
			            value: "value3",
			            checked: !1
			        }, {
			            type: "侵权盗播",
			            value: "value4",
			            checked: !1
			        }, {
			            type: "长期空镜或换人直播",
			            value: "value5",
			            checked: !1
			        }, {
			            type: "其它",
			            value: "value6",
			            checked: !1
			        }]
			    },
			    methods: {
			        onLoad: function() {
			            this.countTopPadding()
			        },
			        onShow: function() {
			            this.uiGetPagePaddingTop()
			        },
			        countTopPadding: function() {
			            var e = wx.getSystemInfoSync();
			            this.setData({
			                statusBarHeight: e.statusBarHeight
			            })
			        },
			        uiGetPagePaddingTop: function() {
			            this.setData({
			                uiPagePaddingTop: (0, e.getPaddingTop)()
			            })
			        },
			        selectedReportReasonChange: function(e) {
			            var t = "",
			                a = e.detail.value;
			            this.data.reportItems.forEach(function(e) {
			                a === e.value && (t = e.type)
			            });
			            var o = this.getOpenerEventChannel();
			            wx.navigateTo({
			                url: "report-room-detail?livePlayerOptions=" + encodeURIComponent(this.data.livePlayerOptions),
			                events: {
			                    acceptDataFromReportRoomDetailPage: function(e) {
			                        o.emit("acceptDataFromReportRoomPage", {
			                            reportType: t,
			                            reportContent: e.reportContent
			                        })
			                    }
			                }
			            })
			        }
			    }
			});