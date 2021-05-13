
			    "use strict";
			Object.defineProperty(exports, "__esModule", {
			    value: !0
			});
			var e = function(e) {
			    return e && e.__esModule ? e : {
			        default: e
			    }
			}(require("config.js"));
			exports.
			default = {
			    getSystemTriggerBarrage: function(e) {
			        var t = e.roomDynamicInfo,
			            s = e.systemTriggerBarrageMsgIdList;
			        if (!t || !t.barrages) return {
			            systemTriggerBarrageList: [],
			            systemTriggerBarrageMsgIdList: []
			        };
			        var n = [],
			            r = s || [];
			        return (t.barrages.list || []).forEach(function(e) {
			            if (e.msg_content && !r.includes(e.msg_id)) {
			                var t = JSON.parse(e.msg_content);
			                n.push({
			                    avatar: t.avatar,
			                    nickname: t.nickname,
			                    openid: t.openid,
			                    content: t.content,
			                    type: t.type
			                }), r.push(e.msg_id)
			            }
			        }), {
			            systemTriggerBarrageList: n,
			            systemTriggerBarrageMsgIdList: r
			        }
			    },
			    getComment: function(e) {
			        var t = e.roomDynamicInfo,
			            s = e.commentMsgIdList,
			            n = e.globalSysMsgVersion,
			            r = e.roomSysMsgVersion,
			            u = [],
			            o = s || [],
			            a = t.global_msg && t.global_msg.version || n;
			        if (t.global_msg && t.global_msg.msg && a !== n) {
			            var i = JSON.parse(t.global_msg.msg);
			            u.push({
			                avatar: i.avatar,
			                nickname: i.nickname,
			                content: i.content,
			                official: !0
			            })
			        }
			        var g = t.system_msg && t.system_msg.list && t.system_msg.list.length > 0 && t.system_msg.list[0].msg_id || r;
			        t.system_msg && t.system_msg.list && t.system_msg.list.length > 0 && g !== r && (t.system_msg && t.system_msg.list || []).forEach(function(e) {
			            if (e.msg_content && !o.includes(e.msg_id)) {
			                var t = JSON.parse(e.msg_content);
			                u.push({
			                    avatar: t.avatar,
			                    nickname: t.nickname,
			                    content: t.content,
			                    official: !0
			                }), o.push(e.msg_id)
			            }
			        });
			        var m = 0,
			            c = [];
			        return (t.comments && t.comments.list || []).forEach(function(e) {
			            if (e.msg_content && !o.includes(e.msg_id)) {
			                var t = JSON.parse(e.msg_content);
			                c.push({
			                    avatar: t.avatar,
			                    nickname: t.nickname,
			                    openid: t.openid,
			                    content: t.content,
			                    msgId: e.msg_id
			                }), o.push(e.msg_id), m++
			            }
			        }), c.sort(function(e, t) {
			            return e.msgId - t.msgId
			        }), u = u.concat(c), {
			            commentList: u,
			            commentMsgIdList: o,
			            showCommentsCount: m,
			            globalSysMsgVersion: a,
			            roomSysMsgVersion: g
			        }
			    },
			    getStoreInfo: function(t) {
			        var s = t.roomDynamicInfo,
			            n = t.appid,
			            r = t.room_id,
			            u = s.push_msg && s.push_msg.list || [],
			            o = s.goods && s.goods.goods || [];
			        o.forEach(function(e) {
			            e.url && (e.url = "/" + e.url.replace(/(.html|.htm)/i, ""), e.url = e.url.includes("?") ? e.url + "&room_id=" + r : e.url + "?room_id=" + r), e.price = e.price % 100 == 0 ? e.price / 100 : (e.price / 100).toFixed(2), e.price2 = e.price2 % 100 == 0 ? e.price2 / 100 : (e.price2 / 100).toFixed(2)
			        }), o = o.filter(function(t) {
			            return !t.flag || t.flag === e.
			            default.GOODS_FLAG.GOODS_FLAG_NORMAL
			        });
			        var a = 0,
			            i = 0,
			            g = void 0;
			        return u.length > 0 && u[0].msg_content && (a = JSON.parse(u[0].msg_content).goods_id, i = u[0].msg_id, g = u[0].timestamp), i > 0 && (wx.setStorageSync("storePushGoodsId-" + n + "-" + r, a), wx.setStorageSync("storePushVersion-" + n + "-" + r, i), wx.setStorageSync("storePushTimestamp-" + n + "-" + r, g)), {
			            storeList: o
			        }
			    },
			    getLotteryInfo: function(e) {
			        var t = e.roomDynamicInfo,
			            s = t.lottery_msg && t.lottery_msg.list || [],
			            n = 0,
			            r = 0;
			        if (s.length > 0 && s[0].msg_content) {
			            var u = JSON.parse(s[0].msg_content);
			            n = +s[0].msg_id, r = +u.id
			        }
			        return {
			            lotteryVersion: n,
			            lotteryId: r
			        }
			    },
			    encryptNickname: function(e) {
			        var t = "";
			        return 1 === (e = e.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, "")).length ? t = e : 2 === e.length ? t = e[0] + "*" : 3 === e.length ? t = e[0] + "*" + e[2] : e.length >= 4 && (t = e[0] + "**" + e[e.length - 1]), t
			    }
			};