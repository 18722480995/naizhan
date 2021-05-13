
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
			        roomImg: "",
			        roomTitle: "",
			        roomTime: "",
			        weappName: "",
			        showSubmitReport: !1,
			        reportItems: [{
			            name: "低俗色情",
			            value: "value0",
			            checked: !1
			        }, {
			            name: "非法政治",
			            value: "value1",
			            checked: !1
			        }, {
			            name: "出售假冒禁售商品",
			            value: "value2",
			            checked: !0
			        }, {
			            name: "引导线下或其他平台交易",
			            value: "value3",
			            checked: !1
			        }, {
			            name: "侵权盗播",
			            value: "value4",
			            checked: !1
			        }, {
			            name: "长期空镜或换人直播",
			            value: "value5",
			            checked: !1
			        }, {
			            name: "其它",
			            value: "value6",
			            checked: !1
			        }],
			        uploadFileNum: 0
			    },
			    methods: {
			        onLoad: function() {
			            (0, e.setNavFontColor)("#f7f7f7");
			            var t = JSON.parse(decodeURIComponent(this.data.livePlayerOptions));
			            this.setData({
			                roomImg: t.roomImg,
			                roomTitle: t.roomTitle,
			                roomTime: t.roomTime,
			                weappName: t.weappName,
			                selectFile: this.selectFile.bind(this),
			                uploadFile: this.uploadFile.bind(this)
			            }), this.countTopPadding()
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
			        bindReportContentInput: function(e) {
			            var t = e.detail.value;
			            t ? this.setData({
			                showSubmitReport: !0,
			                reportContent: t
			            }) : this.setData({
			                showSubmitReport: !1
			            })
			        },
			        uploadError: function(e) {
			            console.log("upload error", e.detail)
			        },
			        uploadSuccess: function(e) {
			            console.log("upload success", e.detail)
			        },
			        selectFile: function(e) {
			            console.log("files", e)
			        },
			        uploadFile: function(e) {
			            return console.log("upload files", e), new Promise(function(e, t) {
			                setTimeout(function() {
			                    t("some error")
			                }, 1e3)
			            })
			        },
			        submitReport: function() {
			            this.getOpenerEventChannel().emit("acceptDataFromReportRoomDetailPage", {
			                reportContent: this.data.reportContent
			            }), wx.navigateTo({
			                url: "../report-status/report-status?path=reportRoomPage"
			            })
			        }
			    }
			});