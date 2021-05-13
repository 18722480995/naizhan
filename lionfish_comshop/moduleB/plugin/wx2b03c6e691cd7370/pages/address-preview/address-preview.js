
			    "use strict";
			var e = function(e) {
			    return e && e.__esModule ? e : {
			        default: e
			    }
			}(require("../../utils/wxapi.js")),
			    t = "denyAuthorizeLotteryAddress-" + (wx.getAccountInfoSync().miniProgram.appId || "");
			Component({
			    options: {
			        styleIsolation: "page-apply-shared"
			    },
			    properties: {
			        livePlayerOptions: String
			    },
			    data: {
			        address: "",
			        district: "",
			        phone: "",
			        postcode: "",
			        receive_name: "",
			        showAddressPreview: !0
			    },
			    methods: {
			        onLoad: function() {
			            var e = JSON.parse(decodeURIComponent(this.data.livePlayerOptions));
			            this.setData({
			                weapp_name: e.weapp_name,
			                address: e.address,
			                district: e.district,
			                phone: e.phone,
			                postcode: e.postcode,
			                receive_name: e.receive_name
			            })
			        },
			        modifyLotteryAddress: function() {
			            var o = this;
			            e.
			            default.chooseAddressForPlugin().then(function(e) {
			                var t = {
			                    address: e && e.provinceName + " " + e.cityName + " " + e.countyName || "",
			                    district: e && e.detailInfo || "",
			                    phone: e && e.telNumber || "",
			                    postcode: e && e.postalCode || "",
			                    receive_name: e && e.userName || ""
			                };
			                o.setData(t), o.getOpenerEventChannel().emit("acceptDataFromAddressPreviewPage", t)
			            }).
			            catch (function(a) {
			                console.error("选择收货地址 fail", a);
			                var n = wx.getStorageSync(t);
			                a.errMsg && a.errMsg.includes("cancel") || (n ? wx.showModal({
			                    content: "需要允许" + o.data.weapp_name + "小程序获取你的通信地址",
			                    confirmText: "前往设置",
			                    success: function(t) {
			                        t.confirm && e.
			                        default.openSettingForPlugin()
			                    }
			                }) : wx.setStorageSync(t, !0))
			            })
			        }
			    }
			});