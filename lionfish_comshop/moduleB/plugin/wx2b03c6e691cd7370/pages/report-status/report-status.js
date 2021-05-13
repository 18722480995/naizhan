
			    "use strict";
			var t = require("../../wxlive-components/logic/ui.js");
			Component({
			    options: {
			        styleIsolation: "page-apply-shared"
			    },
			    properties: {
			        path: String
			    },
			    data: {
			        uiPagePaddingTop: 0
			    },
			    methods: {
			        onLoad: function() {
			            (0, t.setNavFontColor)("#FFFFFF")
			        },
			        onShow: function() {
			            this.uiGetPagePaddingTop()
			        },
			        uiGetPagePaddingTop: function() {
			            this.setData({
			                uiPagePaddingTop: (0, t.getPaddingTop)()
			            })
			        },
			        completeReport: function() {
			            "reportCommentsPage" === this.data.path ? wx.navigateBack({
			                delta: 2
			            }) : "reportRoomPage" === this.data.path && wx.navigateBack({
			                delta: 3
			            })
			        }
			    }
			});