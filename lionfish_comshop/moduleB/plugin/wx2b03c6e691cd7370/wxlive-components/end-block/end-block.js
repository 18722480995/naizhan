
			    "use strict";
			Component({
			    properties: function(e, t, i) {
			        return t in e ? Object.defineProperty(e, t, {
			            value: i,
			            enumerable: !0,
			            configurable: !0,
			            writable: !0
			        }) : e[t] = i, e
			    }({
			        from: {
			            type: String,
			            value: ""
			        },
			        liveDuration: {
			            type: String,
			            value: ""
			        },
			        liveStat: {
			            type: Object,
			            value: {}
			        },
			        liveStatSimulateWatch: {
			            type: String
			        },
			        liveStatSimulateLike: {
			            type: String
			        }
			    }, "from", {
			        type: String,
			        value: ""
			    }),
			    data: {},
			    methods: {}
			});