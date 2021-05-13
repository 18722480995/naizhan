
			    "use strict";
			var e = "18391",
			    t = wx.getAccountInfoSync().miniProgram.appId || "",
			    n = "wx2b03c6e691cd7370",
			    i = wx.getAccountInfoSync().plugin.version,
			    a = wx.getSystemInfoSync() || {}, l = wx.getEnterOptionsSync && wx.getEnterOptionsSync().scene || -1,
			    y = {
			        wifi: "1",
			        "2g": "2",
			        "3g": "3",
			        "4g": "4",
			        "5g": "5",
			        other: "6"
			    }, p = {
			        ios: "1",
			        android: "2",
			        windows: "3",
			        mac: "4",
			        other: "-1"
			    };
			module.exports = {
			    getMmdataConfig: function() {
			        var v = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
			            actionType: "",
			            subActionType: "",
			            reserves: "",
			            livePlayId: "",
			            liveState: "",
			            goodsId: "",
			            count: "",
			            timestamp2: "",
			            roomId: "",
			            liveType: "",
			            networkType: "",
			            livePlayStatus: "",
			            scene: "",
			            lotteryId: "",
			            videoCaton: "",
			            videoFPS: "",
			            netJitter: "",
			            netSpeed: "",
			            lottieFPS: ""
			        };
			        return {
			            logid: e,
			            items: [{
			                type: "string",
			                value: ""
			            }, {
			                type: "int32",
			                value: "0"
			            }, {
			                type: "int32",
			                value: "" + (y[v.networkType] || 0)
			            }, {
			                type: "int32",
			                value: "0"
			            }, {
			                type: "int32",
			                value: "" + (v.roomId || 0)
			            }, {
			                type: "int32",
			                value: "" + (v.liveType || 1)
			            }, {
			                type: "int32",
			                value: "" + (v.liveState || 0)
			            }, {
			                type: "int32",
			                value: "0"
			            }, {
			                type: "int32",
			                value: "0"
			            }, {
			                type: "int32",
			                value: "0"
			            }, {
			                type: "int32",
			                value: "0"
			            }, {
			                type: "int32",
			                value: "0"
			            }, {
			                type: "int32",
			                value: "" + (v.subActionType || 0)
			            }, {
			                type: "int32",
			                value: "" + (v.reserves || 0)
			            }, {
			                type: "int32",
			                value: "0"
			            }, {
			                type: "int32",
			                value: "0"
			            }, {
			                type: "string",
			                value: "" + a.model
			            }, {
			                type: "int32",
			                value: "" + (v.count || 1)
			            }, {
			                type: "int32",
			                value: "0"
			            }, {
			                type: "int32",
			                value: "" + (v.timestamp2 || 0)
			            }, {
			                type: "int32",
			                value: "" + (v.actionType || 0)
			            }, {
			                type: "int32",
			                value: "0"
			            }, {
			                type: "string",
			                value: "" + v.goodsId
			            }, {
			                type: "string",
			                value: "" + t
			            }, {
			                type: "string",
			                value: "" + v.livePlayId
			            }, {
			                type: "int32",
			                value: "" + (p[a.platform] || 0)
			            }, {
			                type: "string",
			                value: "" + a.version
			            }, {
			                type: "string",
			                value: "" + a.brand
			            }, {
			                type: "string",
			                value: "" + (wx.getSystemInfoSync() || {}).language
			            }, {
			                type: "string",
			                value: "" + i
			            }, {
			                type: "string",
			                value: "" + v.livePlayStatus
			            }, {
			                type: "string",
			                value: "" + n
			            }, {
			                type: "int32",
			                value: "" + v.scene
			            }, {
			                type: "string",
			                value: ""
			            }, {
			                type: "int32",
			                value: "" + v.lotteryId
			            }, {
			                type: "int32",
			                value: "" + l
			            }, {
			                type: "int32",
			                value: "" + v.videoCaton
			            }, {
			                type: "int32",
			                value: "" + v.videoFPS
			            }, {
			                type: "int32",
			                value: "" + v.netJitter
			            }, {
			                type: "int32",
			                value: "" + v.netSpeed
			            }, {
			                type: "int32",
			                value: "" + v.lottieFPS
			            }, {
			                type: "int32",
			                value: "0"
			            }, {
			                type: "int32",
			                value: "0"
			            }, {
			                type: "int32",
			                value: "0"
			            }]
			        }
			    }
			};