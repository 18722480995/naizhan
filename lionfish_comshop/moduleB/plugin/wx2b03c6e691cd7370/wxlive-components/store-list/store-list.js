
			    "use strict";
			Component({
			    properties: {
			        from: {
			            type: String,
			            value: ""
			        },
			        type: {
			            type: String,
			            value: ""
			        },
			        showStoreList: {
			            type: Boolean,
			            value: !1
			        },
			        storeRankList: {
			            type: Array,
			            value: []
			        },
			        storeList: {
			            type: Array,
			            value: []
			        },
			        storeListStatus: {
			            type: String,
			            value: ""
			        },
			        height: {
			            type: Number,
			            value: 0
			        }
			    },
			    lifetimes: {
			        ready: function() {
			            this.setData({
			                fadeIn: !0
			            })
			        },
			        detached: function() {
			            this.setData({
			                fadeIn: !1
			            })
			        }
			    },
			    data: {
			        fadeIn: !1,
			        allStoreList: []
			    },
			    observers: {
			        storeRankList: function(t) {
			            this.setData({
			                allStoreList: t.concat(this.data.storeList)
			            })
			        },
			        storeList: function(t) {
			            this.setData({
			                allStoreList: this.data.storeRankList.concat(t)
			            })
			        }
			    },
			    methods: {
			        clickViewGoods: function(t) {
			            this.triggerEvent("customevent", {
			                confirmViewGoods: !0,
			                goods_id: t.currentTarget.dataset.id,
			                showStoreList: !0
			            })
			        },
			        closeStore: function() {
			            this.setData({
			                showStoreList: !1
			            }), this.triggerEvent("customevent", {
			                showStoreList: !1
			            })
			        }
			    }
			});