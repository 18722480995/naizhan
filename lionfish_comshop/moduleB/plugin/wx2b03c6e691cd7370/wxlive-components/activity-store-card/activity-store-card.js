
			    "use strict";
			Component({
			    properties: {
			        avatar: {
			            type: String,
			            value: ""
			        },
			        title: {
			            type: String,
			            value: ""
			        },
			        priceType: {
			            type: Number,
			            value: 1
			        },
			        price: {
			            type: String,
			            value: ""
			        },
			        price2: {
			            type: String,
			            value: ""
			        },
			        url: {
			            type: String,
			            value: ""
			        },
			        from: {
			            type: String,
			            value: ""
			        }
			    },
			    methods: {
			        clickViewPushGoods: function() {
			            this.triggerEvent("customevent", {
			                confirmViewPushGoods: !0
			            })
			        }
			    }
			});