
			    "use strict";
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
			        isSubscribe: {
			            type: Boolean
			        },
			        roomTitle: {
			            type: String,
			            value: ""
			        },
			        anchorName: {
			            type: String,
			            value: ""
			        },
			        from: {
			            type: String,
			            value: ""
			        }
			    },
			    methods: {
			        closeProfileModal: function() {
			            this.triggerEvent("customevent", {
			                showProfileModal: !1
			            })
			        },
			        clickSubscribe: function() {
			            this.triggerEvent("customevent", {
			                confirmSubscribe: !0,
			                isSubscribe: this.data.isSubscribe,
			                showProfileModal: !0
			            })
			        },
			        clickReportRoom: function() {
			            this.triggerEvent("customevent", {
			                confirmReportRoom: !0,
			                showProfileModal: !0
			            })
			        }
			    }
			});