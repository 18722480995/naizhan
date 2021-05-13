
			    "use strict";

			function t(t) {
			    return t && t.__esModule ? t : {
			        default: t
			    }
			}
			var e = t(require("../wxlive-components/logic/api.js")),
			    o = t(require("../wxlive-components/logic/config.js")),
			    a = t(require("../wxlive-components/logic/request.js")),
			    i = t(require("../wxlive-components/logic/live-logic.js")),
			    r = t(require("../wxlive-components/logic/ui.js")),
			    s = t(require("../utils/util.js")),
			    n = t(require("../utils/wxapi.js")),
			    d = t(require("../utils/log.js")),
			    c = t(require("../mmdata/mmdata.js")),
			    l = n.
			default.getSystemInfoSync(), u = wx.getAccountInfoSync().plugin.version, m = wx.getAccountInfoSync().miniProgram.appId || "", f = "denyAuthorizeLotteryAddress-" + m, T = "authorizeTimestamp-" + m, S = "authorizeAvatar-" + m, _ = "authorizeNickName-" + m, y = "isLivePlayerPluginAuthorize-" + m, p = "", h = !1, g = !0, L = !0, I = !1, E = !0, v = !1, D = 0, A = 0, w = 0, P = null, R = null, C = null, O = null, M = null, U = [], N = !0, V = !0, b = null, k = !1, x = 0, B = !1, F = 0, H = !1, G = "", J = !1, W = void 0;
			Component({
			    options: {
			        styleIsolation: "page-apply-shared"
			    },
			    properties: {
			        room_id: Number,
			        close_picture_in_picture_mode: Number,
			        type: Number
			    },
			    data: {
			        room_id: 0,
			        roomStaticInfo: {
			            room_id: "",
			            room_img: "",
			            room_title: "",
			            weapp_img: "",
			            weapp_name: "",
			            anchor_img: "",
			            anchor_name: "",
			            user_img: "",
			            user_name: "",
			            openid: "",
			            home_page: "",
			            play_url_list: "",
			            timestamp: "",
			            slow_interval: "",
			            fast_interval: "",
			            start_time: "",
			            end_time: "",
			            system_msg: "",
			            comments: [],
			            is_subscribe: 0,
			            is_min_window: 1
			        },
			        showGobackHome: !1,
			        showProfileModal: !1,
			        showPushComment: !1,
			        showStoreList: !1,
			        showStorePush: !1,
			        showLotteryIcon: !1,
			        showEndLotteryIcon: !1,
			        showLotteryOper: !1,
			        showLotteryCountTime: !1,
			        showLivePlayer: !1,
			        showLoading: !1,
			        isLivePlaying: !1,
			        livePlayUrl: "",
			        pictureInPictureMode: ["push", "pop"],
			        closePictureInPictureMode: !1,
			        liveDuration: "",
			        server_time: "",
			        isRoomBan: !1,
			        isUserBan: !1,
			        curLiveStatusCode: o.
			        default.LIVE_STATUS_CODE.LIVE_STATUS_NOT_START,
			        allLiveStatusCode: o.
			        default.LIVE_STATUS_CODE,
			        isSubscribe: !1,
			        showCountdownTime: !1,
			        countdownTime: 0,
			        countdownTimeContent: "",
			        isGetRoomDynamicInfoSuccess: !1,
			        isNetworkDisconnection: !1,
			        toast: "",
			        topToast: "",
			        systemTriggerBarrageList: [],
			        allCommentList: [],
			        commentList: [],
			        commentScrollIntoView: "",
			        newNotifyCount: 0,
			        globalSysMsgVersion: 0,
			        roomSysMsgVersion: 0,
			        lotteryVersion: 0,
			        lotteryId: 0,
			        lotteryType: "",
			        historyLotteryLuckMen: [],
			        curLotteryLuckMen: [],
			        mySelfLotteryLuckMen: {},
			        lotteryCountTime: "",
			        leftLotteryTime: 0,
			        lotteryPush: {},
			        lotteryParticipateNum: 0,
			        isParticipateLottery: !1,
			        isFillLotteryAddress: !1,
			        isHistoryFillLotteryAddress: [],
			        isTriggerLotteryAddress: !1,
			        isTriggerHistoryLotteryAddress: !1,
			        firstStartLotteryAnimation: !1,
			        nextStartLotteryAnimation: !1,
			        endLotteryAnimation: !1,
			        isScrollCommentToBottom: !0,
			        storeList: [],
			        storeListGoodVersion: 0,
			        storeListStatus: o.
			        default.STORE_LIST_STATUS.LOADING,
			        storePush: {},
			        storePushVersion: 0,
			        storeRankList: [],
			        isIPhoneX: !1,
			        commentKeyboardHeight: 0,
			        windowHeight: 0
			    },
			    methods: {
			        onLoad: function() {
			            var t = this.data.type;
			            this.setData({
			                room_id: this.data.room_id,
			                showGobackHome: t > 0,
			                showStoreList: t === o.
			                default.SCENE_TYPE.PREVIEW,
			                isIPhoneX: r.
			                default.isIPhoneX(),
			                windowHeight: wx.getSystemInfoSync().windowHeight
			            }), wx.setKeepScreenOn({
			                keepScreenOn: !0
			            }), wx.showShareMenu({
			                withShareTicket: !0
			            }), n.
			            default.checkWeChatVersion(), this.countEndStoreListEndBlockSize(), this.getNetworkType(), this.onNetworkStatusChange(), this.createLivePlayerContext(), this.getRoomStaticInfo()
			        },
			        onShow: function() {
			            v || (U = [], M = Date.now(), N = !0, V = !0, k = !0, b = Date.now(), this.enterRoom()), E = !0, this.data.lotteryVersion = 0, this.data.lotteryId = 0, clearInterval(R), R = setInterval(this.freshTime.bind(this), o.
			            default.COUNT_DOWN_TIME), !L && this.getRoomDynamicInfo()
			        },
			        onHide: function() {
			            this.clear()
			        },
			        onUnload: function() {
			            v = !1, this.clear()
			        },
			        clear: function() {
			            L = !1, E = !1, clearInterval(R), clearInterval(P), clearInterval(C), clearTimeout(O), v || (W && W.upload(), this.leaveMmdataReport())
			        },
			        enterMmdataReport: function() {
			            if (N) {
			                N = !1;
			                var t = [this.getMmdataConfig({
			                    actionType: 1,
			                    livePlayId: this.data.livePlayUrl,
			                    timestamp2: this.data.server_time,
			                    count: 1,
			                    livePlayStatus: "start"
			                })];
			                a.
			                default.mmdataReport({
			                    room_id: this.data.room_id,
			                    content: {
			                        data_list: t
			                    }
			                })
			            }
			        },
			        leaveMmdataReport: function() {
			            var t = this;
			            if (V) {
			                V = !1, U.push({
			                    actionType: 1,
			                    livePlayId: this.data.livePlayUrl,
			                    timestamp2: this.data.server_time,
			                    count: 1,
			                    livePlayStatus: "end"
			                });
			                var e = U.map(function(e) {
			                    return t.getMmdataConfig(e)
			                });
			                a.
			                default.mmdataReport({
			                    room_id: this.data.room_id,
			                    content: {
			                        data_list: e
			                    }
			                })
			            }
			        },
			        getMmdataConfig: function(t) {
			            return c.
			            default.getMmdataConfig({
			                actionType: t.actionType || "",
			                subActionType: t.subActionType || "",
			                reserves: t.reserves || "",
			                livePlayId: t.livePlayId && s.
			                default.delUrlParam(s.
			                default.delUrlParam(t.livePlayId, "txSecret"), "txTime") + "&timestamp=" + b || "",
			                liveState: this.data.curLiveStatusCode,
			                goodsId: t.goodsId || "",
			                count: t.count || 1,
			                timestamp2: t.timestamp2 || "",
			                roomId: this.data.room_id,
			                networkType: p,
			                livePlayStatus: t.livePlayStatus || "",
			                scene: this.data.type,
			                lotteryId: t.lotteryId || "",
			                videoCaton: t.videoCaton || "",
			                videoFPS: t.videoFPS || "",
			                netJitter: t.netJitter || "",
			                netSpeed: t.netSpeed || "",
			                lottieFPS: t.lottieFPS || ""
			            })
			        },
			        addReportData: function(t) {
			            var e = t.actionType,
			                o = t.subActionType,
			                a = t.reserves,
			                i = t.goodsId,
			                r = t.lotteryId,
			                s = t.videoCaton,
			                n = t.videoFPS,
			                d = t.netJitter,
			                c = t.netSpeed,
			                l = t.lottieFPS,
			                u = !0;
			            U.forEach(function(t) {
			                t.actionType === e && t.subActionType === o && t.reserves === a && t.goodsId === i && t.lotteryId === r && t.videoCaton === s && t.videoFPS === n && t.netJitter === d && t.netSpeed === c && t.lottieFPS === l && (t.count += 1, u = !1)
			            }), u && U.push({
			                actionType: e,
			                subActionType: o,
			                reserves: a,
			                goodsId: i,
			                lotteryId: r,
			                videoCaton: s,
			                videoFPS: n,
			                netJitter: d,
			                netSpeed: c,
			                lottieFPS: l,
			                count: 1
			            })
			        },
			        countEndStoreListEndBlockSize: function() {
			            var t = this.data.isIPhoneX ? 36 : 0,
			                e = r.
			            default.getScreenHeight() - 177 - t, o = .6 * e - 48, a = .4 * e;
			            this.setData({
			                uiStoreListHeight: o,
			                uiEndBlockListHeight: a,
			                uiEndBlockListBottom: .6 * e + 20
			            })
			        },
			        onShareAppMessage: function(t) {
			            v = !0, this.shareRoom(), this.addReportData({
			                actionType: 3,
			                subActionType: 8,
			                reserves: "menu" === t.from ? 1 : 2
			            });
			            var e = this.data.roomStaticInfo,
			                a = e.room_title,
			                i = e.anchor_img,
			                r = "";
			            return r = this.data.curLiveStatusCode === o.
			            default.LIVE_STATUS_CODE.LIVE_STATUS_NOT_START ? "即将直播：" + a : this.data.curLiveStatusCode === o.
			            default.LIVE_STATUS_CODE.LIVE_STATUS_END ? a : "正在直播：" + a, {
			                title: r,
			                path: "plugin-private://" + o.
			                default.PLUGIN_APPID + "/pages/live-player-plugin?room_id=" + this.data.room_id + "&type=1&openid=" + this.data.roomStaticInfo.openid + "&close_picture_in_picture_mode=" + this.data.closePictureInPictureMode,
			                imageUrl: i
			            }
			        },
			        getRoomStaticInfo: function() {
			            var t = this;
			            a.
			            default.getRoomStaticInfo({
			                room_id: t.data.room_id
			            }).then(function(e) {
			                console.log("getRoomStaticInfo success", e);
			                var a = "";
			                e.play_url_list && e.play_url_list.forEach(function(t) {
			                    t.type === o.
			                    default.PLAY_URL_TYPE.HTTPS_FLV && (a = t.url.includes("?") ? t.url + "&openid=" + e.openid : t.url + "?openid=" + e.openid)
			                });
			                var i = [],
			                    r = void 0;
			                e.system_msg && ((r = JSON.parse(e.system_msg)).official = !0, i.push(r));
			                var s = [],
			                    n = [];
			                (e.comments && e.comments.list || []).forEach(function(t) {
			                    if (t.msg_content) {
			                        var e = JSON.parse(t.msg_content);
			                        s.push({
			                            avatar: e.avatar,
			                            nickname: e.nickname,
			                            content: e.content,
			                            openid: e.openid,
			                            msgId: t.msg_id
			                        }), n.push(t.msg_id)
			                    }
			                }), t.data.commentMsgIdList = n, s.sort(function(t, e) {
			                    return t.msgId - e.msgId
			                });
			                var d = i.concat(s);
			                t.setData({
			                    closePictureInPictureMode: !! t.data.close_picture_in_picture_mode || !+e.is_min_window,
			                    isSubscribe: !! +e.is_subscribe,
			                    roomStaticInfo: e,
			                    livePlayUrl: a,
			                    allCommentList: d,
			                    commentList: d
			                }, function() {
			                    t.setData({
			                        commentScrollIntoView: "comment" + d.length
			                    })
			                }), t.getRoomDynamicInfo()
			            }).
			            catch (function(e) {
			                console.error("getRoomStaticInfo fail", e);
			                var a = +e.err_code;
			                if (a === o.
			                default.ROOM_ERROR_CODE.ROOM_MM_ERR_DELETE) wx.showModal({
			                    title: "该直播已删除",
			                    confirmText: "我知道了",
			                    showCancel: !1,
			                    success: function(t) {
			                        t.confirm && n.
			                        default.navigateBack()
			                    }
			                });
			                else if (a === o.
			                default.ROOM_ERROR_CODE.ROOM_MM_ERR_PEOPLE_LIMIT) t.setData({
			                    topToast: "直播间已满，请稍后再来"
			                });
			                else if (a === o.
			                default.ROOM_ERROR_CODE.ROOM_MM_ERR_BIZ_INVALID_SCOPE) t.setData({
			                    topToast: "该小程序涉嫌违规"
			                });
			                else if (a === o.
			                default.ROOM_ERROR_CODE.ROOM_MM_ERR_ROOMID) wx.showModal({
			                    title: "传入的直播房间id有误",
			                    confirmText: "我知道了",
			                    showCancel: !1,
			                    success: function(t) {
			                        t.confirm && n.
			                        default.navigateBack()
			                    }
			                });
			                else if (!t.data.isNetworkDisconnection) {
			                    var i = +e.inner_ret || null;
			                    i === o.
			                    default.OPERATEWXDATA_CODE.TIMEOUT ? n.
			                    default.showToast("网络超时，请重新进入房间") : i === o.
			                    default.OPERATEWXDATA_CODE.NO_CONCENT ? n.
			                    default.showToast("获取数据失败，请重新进入房间") : n.
			                    default.showToast("系统异常，请重新进入房间")
			                }
			            })
			        },
			        getRoomDynamicInfo: function() {
			            var t = this,
			                e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
			                i = [];
			            (JSON.stringify(U).length > 5120 || U.length > 20 || Date.now() >= M + 3e5) && (U.push({
			                actionType: 1,
			                livePlayId: this.data.livePlayUrl,
			                timestamp2: this.data.server_time,
			                count: 1
			            }), i = U.map(function(e) {
			                return t.getMmdataConfig(e)
			            }), U = [], M = Date.now());
			            var r = Date.now();
			            x = Math.round(e / 1e3);
			            var s = this,
			                n = {
			                    room_id: s.data.room_id,
			                    content: {
			                        comment: 1,
			                        barrage: 1,
			                        push_version: s.data.storePushVersion,
			                        good_version: s.data.storeListGoodVersion,
			                        room_sys_msg_version: s.data.roomSysMsgVersion,
			                        global_sys_msg_version: s.data.globalSysMsgVersion,
			                        lottery_version: s.data.lotteryVersion,
			                        lottery_id: s.data.lotteryId,
			                        watch_time_increment: x,
			                        plugin_version: u,
			                        report_data: JSON.stringify({
			                            data_list: i
			                        })
			                    }
			                };
			            a.
			            default.getRoomDynamicInfo(n).then(function(t) {
			                console.log("getRoomDynamicInfo success", t), W || (W = s.getLog( !! t.is_white)), W && W.info("getRoomDynamicInfo success", {
			                    systemInfo: l,
			                    g_curNetworkType: p,
			                    liveStatusCode: t.live_info.status_code,
			                    stat: t.stat,
			                    pushMsg: t.push_msg,
			                    isBan: t.is_ban,
			                    lottery_version: s.data.lotteryVersion,
			                    lottery_id: s.data.lotteryId,
			                    watch_time_increment: x,
			                    reportDataLength: JSON.stringify(n).length,
			                    appid: m,
			                    roomId: s.data.room_id,
			                    pluginVersion: u
			                }), s.updateSystemTriggerBarrageData(t), s.updateCommentData(t), s.updateStoreData(t), s.updateLotteryData(t), s.updateAudienceData(t);
			                var e = Math.min(t.settings.fast_interval && 1e3 * t.settings.fast_interval || 5e3, 5e3);
			                clearInterval(C), C = setInterval(function() {
			                    var t = 0;
			                    (s.data.curLiveStatusCode === o.
			                    default.LIVE_STATUS_CODE.LIVE_STATUS_LIVE || I) && (t = Date.now() - r), s.getRoomDynamicInfo(t)
			                }, e)
			            }).
			            catch (function(t) {
			                console.error("getRoomDynamicInfo fail", t), W && W.error("getRoomDynamicInfo fail", t), h = !0, s.setData({
			                    storeListStatus: o.
			                    default.STORE_LIST_STATUS.ERROR
			                });
			                var e = Math.min(s.data.roomStaticInfo.slow_interval && 1e3 * s.data.roomStaticInfo.slow_interval || 1e4, 1e4);
			                clearInterval(C), C = setInterval(function() {
			                    var t = 0;
			                    (s.data.curLiveStatusCode === o.
			                    default.LIVE_STATUS_CODE.LIVE_STATUS_LIVE || I) && (t = Date.now() - r), s.getRoomDynamicInfo(t)
			                }, e)
			            })
			        },
			        updateSystemTriggerBarrageData: function(t) {
			            if (t && t.live_info.status_code !== o.
			            default.LIVE_STATUS_CODE.LIVE_STATUS_NOT_START && t.live_info.status_code !== o.
			            default.LIVE_STATUS_CODE.LIVE_STATUS_END) {
			                var e = this,
			                    a = i.
			                default.getSystemTriggerBarrage({
			                    roomDynamicInfo: t,
			                    systemTriggerBarrageMsgIdList: e.data.systemTriggerBarrageMsgIdList
			                }), r = a.systemTriggerBarrageList, s = a.systemTriggerBarrageMsgIdList;
			                e.data.systemTriggerBarrageMsgIdList = s, e.setData({
			                    systemTriggerBarrageList: r
			                })
			            }
			        },
			        updateCommentData: function(t) {
			            if (t && t.live_info.status_code !== o.
			            default.LIVE_STATUS_CODE.LIVE_STATUS_END) {
			                var e = i.
			                default.getComment({
			                    roomDynamicInfo: t,
			                    commentMsgIdList: this.data.commentMsgIdList,
			                    globalSysMsgVersion: this.data.globalSysMsgVersion,
			                    roomSysMsgVersion: this.data.roomSysMsgVersion
			                }), a = e.commentList, r = e.commentMsgIdList, s = e.showCommentsCount, n = e.globalSysMsgVersion, d = e.roomSysMsgVersion;
			                if (a.length > 0) {
			                    var c = this.data.allCommentList.concat(a),
			                        l = c.length;
			                    l >= o.
			                    default.COMMENT.SHOW_NEWMSG_LIMIT_NUMBER && (c = this.data.isScrollCommentToBottom ? c.slice(l - o.
			                    default.COMMENT.SHOW_NEWMSG_LIMIT_NUMBER, l) : c.slice(0, o.
			                    default.COMMENT.SHOW_NEWMSG_LIMIT_NUMBER)), this.data.allCommentList = c, this._updateCommentData({
			                        allCommentList: c,
			                        commentMsgIdList: r,
			                        showCommentsCount: s,
			                        globalSysMsgVersion: n,
			                        roomSysMsgVersion: d
			                    })
			                }
			            }
			        },
			        _updateCommentData: function(t) {
			            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
			                a = this,
			                i = t.allCommentList,
			                r = t.commentMsgIdList,
			                s = t.showCommentsCount,
			                n = t.globalSysMsgVersion,
			                d = t.roomSysMsgVersion,
			                c = i.length;
			            s > o.
			            default.COMMENT.SHOW_SECOND_NUMBER ? e += o.
			            default.COMMENT.SHOW_SECOND_NUMBER : e += o.
			            default.COMMENT.SHOW_SECOND_NUMBER / 5, e = Math.min(s, e);
			            var l = Math.max(0, a.data.newNotifyCount),
			                u = {};
			            if (a.data.isScrollCommentToBottom) {
			                var m = i.slice(Math.max(0, c - o.
			                default.COMMENT.SHOW_LIMIT_NUMBER), c),
			                    f = m.length - s + e;
			                u = {
			                    commentList: m.slice(0, f),
			                    newNotifyCount: 0,
			                    globalSysMsgVersion: n,
			                    roomSysMsgVersion: d
			                }
			            } else {
			                var T = c - s + e;
			                u = {
			                    commentList: i.slice(0, T),
			                    newNotifyCount: l + e,
			                    globalSysMsgVersion: n,
			                    roomSysMsgVersion: d
			                }
			            }
			            a.data.commentMsgIdList = r, a.setData(u, function() {
			                a.data.isScrollCommentToBottom && a.setData({
			                    commentScrollIntoView: "comment" + a.data.commentList.length
			                }), e < s && (a.data.newNotifyCount -= e, clearTimeout(O), O = setTimeout(function() {
			                    a._updateCommentData(t, e)
			                }, o.
			                default.COMMENT.FRESH_TIME))
			            })
			        },
			        updateStoreData: function(t) {
			            if (t) {
			                var e = this,
			                    a = i.
			                default.getStoreInfo({
			                    roomDynamicInfo: t,
			                    appid: m,
			                    room_id: e.data.room_id
			                }).storeList;
			                e.setData({
			                    storeList: a,
			                    storeListStatus: o.
			                    default.STORE_LIST_STATUS.NORMAL
			                }), this.data.showStoreList && a.forEach(function(a) {
			                    e.addReportData({
			                        actionType: 4,
			                        subActionType: 15,
			                        reserves: t.live_info.status_code === o.
			                        default.LIVE_STATUS_CODE.LIVE_STATUS_END ? 2 : 3,
			                        goodsId: a.goods_id
			                    })
			                });
			                var r = void 0,
			                    s = wx.getStorageSync("storePushGoodsId-" + m + "-" + e.data.room_id);
			                a.forEach(function(t) {
			                    s === t.goods_id && (r = t)
			                });
			                var n = +wx.getStorageSync("storePushTimestamp-" + m + "-" + e.data.room_id) || 0;
			                r && t.timestamp - n <= t.settings.push_interval ? (e.setData({
			                    showStorePush: !0,
			                    storePush: r,
			                    storePushVersion: wx.getStorageSync("storePushVersion-" + m + "-" + e.data.room_id),
			                    storeListStatus: o.
			                    default.STORE_LIST_STATUS.NORMAL
			                }), e.addReportData({
			                    actionType: 4,
			                    subActionType: 15,
			                    reserves: 1,
			                    goodsId: r.goods_id
			                })) : e.setData({
			                    showStorePush: !1,
			                    storeListStatus: o.
			                    default.STORE_LIST_STATUS.NORMAL
			                })
			            }
			        },
			        updateLotteryData: function(t) {
			            if (t) {
			                var e = this,
			                    r = i.
			                default.getLotteryInfo({
			                    roomDynamicInfo: t
			                }), s = r.lotteryVersion, n = r.lotteryId;
			                console.log("lotteryId", n), n > 0 && e.getLotteryById(n).then(function(t) {
			                    console.log("获取抽奖信息 succ:", t), W && W.info("获取抽奖信息 succ:", {
			                        lotteryId: n,
			                        lotteryPush: t
			                    });
			                    var i = +t.status;
			                    if (i === o.
			                    default.LOTTERY_STATUS.LOTTERY_FINISHED || e.data.curLiveStatusCode === o.
			                    default.LIVE_STATUS_CODE.LIVE_STATUS_END) e.setData({
			                        lotteryVersion: s,
			                        lotteryId: n,
			                        lotteryPush: t,
			                        leftLotteryTime: 0,
			                        showEndLotteryIcon: !0
			                    }), e.getLotteryResult(n);
			                    else {
			                        w = t.end_time;
			                        var r = "" + t.duration,
			                            d = "00",
			                            c = w - e.data.server_time;
			                        c > 0 && (c > 60 * t.duration ? e.data.server_time += c - 60 * t.duration : (r = Math.floor(c / 60 % 60).toString(), d = (c % 60).toString()), clearInterval(P), P = setInterval(e.endLotteryCountTime.bind(e), o.
			                        default.COUNT_DOWN_TIME));
			                        var l = 60 * t.duration - (w - e.data.server_time),
			                            u = "";
			                        e.data.isTriggerHistoryLotteryAddress ? u = "result-list" : i === o.
			                        default.LOTTERY_STATUS.LOTTERY_RUNNING ? u = c <= 0 ? "error" : "collect" : i === o.
			                        default.LOTTERY_STATUS.LOTTERY_ERROR && (u = "error"), e.setData({
			                            showLotteryIcon: !0,
			                            showLotteryOper: e.data.showLotteryOper,
			                            showLotteryCountTime: "error" !== u,
			                            lotteryType: u,
			                            leftLotteryTime: c,
			                            lotteryCountTime: e.data.lotteryCountTime ? e.data.lotteryCountTime : (r[1] ? r : "0" + r) + ":" + (d[1] ? d : "0" + d),
			                            lotteryVersion: s,
			                            lotteryId: n,
			                            lotteryPush: t,
			                            isParticipateLottery: !1,
			                            firstStartLotteryAnimation: l < 8 && !e.data.showLotteryIcon,
			                            nextStartLotteryAnimation: l < 8 && e.data.showLotteryIcon,
			                            endLotteryAnimation: !1
			                        }), a.
			                        default.getLotteryResult({
			                            room_id: e.data.room_id,
			                            content: n
			                        }).then(function(t) {
			                            W && W.info("获取中奖记录 succ:", t), e.setData({
			                                historyLotteryLuckMen: t.history || [],
			                                isHistoryFillLotteryAddress: []
			                            })
			                        }), e.addReportData({
			                            actionType: 4,
			                            subActionType: 20,
			                            lotteryId: n
			                        }), e.data.showLotteryOper && "error" === u && e.addReportData({
			                            actionType: 4,
			                            subActionType: 29,
			                            lotteryId: n
			                        })
			                    }
			                    e.getParticipated(n)
			                })
			            }
			        },
			        updateAudienceData: function(t) {
			            if (t) {
			                var e = this,
			                    i = t.live_info.status_code;
			                i === o.
			                default.LIVE_STATUS_CODE.LIVE_STATUS_PAUSE || i === o.
			                default.LIVE_STATUS_CODE.LIVE_STATUS_ERROR ? h = !0 : h && (h = !1, e.setData({
			                    showLoading: !0
			                }), a.
			                default.getRoomStaticInfo({
			                    room_id: e.data.room_id
			                }).then(function(t) {
			                    W && W.info("getRoomStaticInfo success", t), t.play_url_list && t.play_url_list.forEach(function(a) {
			                        if (a.type === o.
			                        default.PLAY_URL_TYPE.HTTPS_FLV) {
			                            var i = a.url.includes("?") ? a.url + "&openid=" + t.openid : a.url + "?openid=" + t.openid;
			                            e.setData({
			                                livePlayUrl: i
			                            })
			                        }
			                    })
			                })), e.data.leftLotteryTime < 0 && (i === o.
			                default.LIVE_STATUS_CODE.LIVE_STATUS_FORBID || i === o.
			                default.LIVE_STATUS_CODE.LIVE_STATUS_PAUSE) && (clearInterval(P), e.setData({
			                    showLotteryIcon: !0,
			                    showLotteryOper: !1,
			                    showLotteryCountTime: !1,
			                    lotteryType: "error"
			                }));
			                var r = {
			                    isGetRoomDynamicInfoSuccess: !0,
			                    server_time: t.timestamp,
			                    lotteryParticipateNum: t.lottery_size || 0,
			                    liveStat: s.
			                    default.formatLiveStat(t.stat),
			                    isRoomBan: t.live_info.flag === o.
			                    default.LIVE_ROOM_FLAG.ROOM_FLAG_BAN_COMMENT,
			                    isUserBan: !! t.is_ban,
			                    toast: i === o.
			                    default.LIVE_STATUS_CODE.LIVE_STATUS_PAUSE ? "直播暂停，请稍后..." : e.data.toast,
			                    topToast: i === o.
			                    default.LIVE_STATUS_CODE.LIVE_STATUS_FORBID ? "因涉嫌违规，直播将禁播20分钟" : e.data.topToast
			                };
			                e.data.isGetRoomDynamicInfoSuccess || (W && W.info("getRoomStaticInfo success", e.data.roomStaticInfo), n.
			                default.pingDomain(e.data.livePlayUrl).then(function(t) {
			                    return W && W.info("ping " + e.data.livePlayUrl + " success", t)
			                }).
			                catch (function(t) {
			                    return W && W.error("ping " + e.data.livePlayUrl + " fail", t)
			                })), e.data.curLiveStatusCode !== i && (r.curLiveStatusCode = i), (i === o.
			                default.LIVE_STATUS_CODE.LIVE_STATUS_PAUSE || i === o.
			                default.LIVE_STATUS_CODE.LIVE_STATUS_FORBID || e.data.showLotteryOper) && (r.showPushComment = !1);
			                var d = 0,
			                    c = "liveStatSimulateWatch-" + m + "-" + e.data.room_id,
			                    l = parseInt(wx.getStorageSync(c)) || 0;
			                "number" == typeof l && isNaN(l) && (l = 0), k ? (k = !1, d = Math.max(+t.stat.watch_pv + 1, +l + 1)) : d = Math.max(+t.stat.watch_pv, +l), r.liveStatSimulateWatch = s.
			                default.formatLiveStatSimulateWatch(d), wx.setStorageSync(c, d);
			                var u = "liveStatSimulateLike-" + m + "-" + e.data.room_id,
			                    f = parseInt(wx.getStorageSync(u)) || 0;
			                "number" == typeof f && isNaN(f) && (f = 0);
			                var T = Math.max(+t.stat.like, +f);
			                r.orgLiveStatSimulateLike = T, r.liveStatSimulateLike = s.
			                default.formatLiveStatSimulateLike(T), wx.setStorageSync(u, T), e.setData(r, function() {
			                    t.timestamp > e.data.roomStaticInfo.end_time && i === o.
			                    default.LIVE_STATUS_CODE.LIVE_STATUS_NOT_START ? (wx.showModal({
			                        title: "该直播已删除",
			                        confirmText: "我知道了",
			                        showCancel: !1,
			                        success: function(t) {
			                            t.confirm && n.
			                            default.navigateBack()
			                        }
			                    }), clearInterval(C)) : i === o.
			                    default.LIVE_STATUS_CODE.LIVE_STATUS_END ? (e.setData({
			                        endLotteryAnimation: !1,
			                        showLoading: !1,
			                        toast: "",
			                        topToast: "",
			                        liveDuration: s.
			                        default.formatDuration(t.live_info.live_time.finish_time - t.live_info.live_time.start_time)
			                    }), e.getRoomEndInfo(), e.leaveMmdataReport()) : i === o.
			                    default.LIVE_STATUS_CODE.LIVE_STATUS_LIVE && (clearInterval(R), e.enterMmdataReport())
			                })
			            }
			        },
			        getLog: function(t) {
			            return (0, d.
			            default)({
			                appid: o.
			                default.PLUGIN_APPID,
			                page: "/pages/live-player-plugin",
			                hasPermission: t
			            })
			        },
			        getUserInfo: function(t) {
			            return "avatar" === t ? wx.getStorageSync(S) || this.data.roomStaticInfo.user_img + "/" : "nickname" === t ? wx.getStorageSync(_) || this.data.roomStaticInfo.user_name : void 0
			        },
			        navigateBack: function() {
			            !this.data.closePictureInPictureMode && this.addReportData({
			                actionType: 6,
			                subActionType: 1,
			                reserves: this.data.showGobackHome ? 3 : 2
			            })
			        },
			        gobackHome: function() {
			            var t = this.data.roomStaticInfo && this.data.roomStaticInfo.home_page || "";
			            "/" !== t[0] && (t = "/" + t), n.
			            default.reLaunch(t)
			        },
			        shareRoom: function() {
			            var t = this,
			                a = wx.getStorageSync(y),
			                i = {
			                    avatar: t.getUserInfo("avatar"),
			                    nickname: t.getUserInfo("nickname"),
			                    openid: t.data.roomStaticInfo.openid,
			                    content: "分享直播",
			                    type: "share"
			                }, r = {
			                    action: "share",
			                    room_id: t.data.room_id,
			                    content: a ? JSON.stringify(i) : "",
			                    plugin_appid: o.
			                    default.PLUGIN_APPID,
			                    timestamp: Date.now()
			                };
			            e.
			            default.liveRoutePromise(r).then(function(e) {
			                W && W.info("share succ", e);
			                var o = JSON.parse(e.respData.data),
			                    r = t.data.systemTriggerBarrageMsgIdList || [];
			                r.push(o.msg_id), t.data.systemTriggerBarrageMsgIdList = r, a && t.setData({
			                    systemTriggerBarrageList: [i]
			                })
			            }).
			            catch (function(t) {
			                W && W.error("share fail", t), n.
			                default.showToast("分享失败")
			            })
			        },
			        subscribeRoom: function(t) {
			            if (!B) {
			                B = !0;
			                var a = this;
			                if (a.addReportData({
			                    actionType: 3,
			                    subActionType: t ? 7 : 6
			                }), t) {
			                    var i = {
			                        action: "unsubscribe",
			                        room_id: a.data.room_id,
			                        content: "",
			                        plugin_appid: o.
			                        default.PLUGIN_APPID,
			                        timestamp: Date.now()
			                    };
			                    e.
			                    default.liveRoutePromise(i).then(function(e) {
			                        W && W.info("unsubscribe succ", e), a.setData({
			                            isSubscribe: !t
			                        }), B = !1, n.
			                        default.showToast("取消成功")
			                    }).
			                    catch (function(t) {
			                        W && W.error("unsubscribe fail", t), B = !1, n.
			                        default.showToast("取消失败")
			                    })
			                } else {
			                    var r = wx.getStorageSync(y),
			                        s = {
			                            avatar: a.getUserInfo("avatar"),
			                            nickname: a.getUserInfo("nickname"),
			                            openid: a.data.roomStaticInfo.openid,
			                            content: "订阅直播",
			                            type: "subscribe"
			                        }, d = {
			                            action: "subscribe",
			                            room_id: a.data.room_id,
			                            content: r ? JSON.stringify(s) : "",
			                            plugin_appid: o.
			                            default.PLUGIN_APPID,
			                            timestamp: Date.now()
			                        };
			                    e.
			                    default.liveRoutePromise(d).then(function(e) {
			                        W && W.info("subscribe succ", e);
			                        var o = JSON.parse(e.respData.data),
			                            i = a.data.systemTriggerBarrageMsgIdList || [];
			                        i.push(o.msg_id), a.data.systemTriggerBarrageMsgIdList = i, r ? a.setData({
			                            isSubscribe: !t,
			                            systemTriggerBarrageList: [s]
			                        }) : a.setData({
			                            isSubscribe: !t
			                        }), B = !1, n.
			                        default.showToast("订阅成功")
			                    }).
			                    catch (function(t) {
			                        W && W.error("subscribe fail", t), B = !1, n.
			                        default.showToast("订阅失败")
			                    })
			                }
			            }
			        },
			        enterRoom: function() {
			            var t = this,
			                a = wx.getStorageSync(y),
			                i = {
			                    avatar: t.getUserInfo("avatar"),
			                    nickname: t.getUserInfo("nickname"),
			                    openid: t.data.roomStaticInfo.openid,
			                    content: "进入直播间",
			                    type: "enter"
			                }, r = {
			                    action: "enter",
			                    room_id: t.data.room_id,
			                    content: a ? JSON.stringify(i) : "",
			                    plugin_appid: o.
			                    default.PLUGIN_APPID,
			                    timestamp: Date.now()
			                };
			            e.
			            default.liveRoutePromise(r).then(function(e) {
			                W && W.info("enter success", e);
			                var o = JSON.parse(e.respData.data),
			                    r = t.data.systemTriggerBarrageMsgIdList || [];
			                r.push(o.msg_id), t.data.systemTriggerBarrageMsgIdList = r, a && t.setData({
			                    systemTriggerBarrageList: [i]
			                })
			            }).
			            catch (function(t) {
			                W && W.error("enter err", t)
			            })
			        },
			        viewGoods: function(t) {
			            var a = this,
			                i = wx.getStorageSync(y),
			                r = {
			                    avatar: a.getUserInfo("avatar"),
			                    nickname: a.getUserInfo("nickname"),
			                    openid: a.data.roomStaticInfo.openid,
			                    content: "正在去买",
			                    type: "store"
			                }, s = {
			                    action: "view_good",
			                    room_id: a.data.room_id,
			                    content: i ? JSON.stringify({
			                        good_id: t,
			                        msg: JSON.stringify(r)
			                    }) : JSON.stringify({
			                        good_id: t,
			                        msg: ""
			                    }),
			                    plugin_appid: o.
			                    default.PLUGIN_APPID,
			                    timestamp: Date.now()
			                };
			            v = !1, e.
			            default.liveRoutePromise(s).then(function(t) {
			                W && W.info("view good success", t);
			                var e = JSON.parse(t.respData.data),
			                    o = a.data.systemTriggerBarrageMsgIdList || [];
			                o.push(e.msg_id), a.data.systemTriggerBarrageMsgIdList = o, i && a.setData({
			                    systemTriggerBarrageList: [r]
			                })
			            }).
			            catch (function(t) {
			                W && W.error("view good fail", t)
			            })
			        },
			        reportRoom: function() {
			            var t = this,
			                a = t.data.roomStaticInfo,
			                i = {
			                    weappName: a.weapp_name,
			                    roomTitle: a.room_title,
			                    roomTime: s.
			                    default.formatTime(1e3 * a.start_time, 1e3 * a.end_time),
			                    roomImg: a.room_img
			                };
			            v = !0, t.addReportData({
			                actionType: 4,
			                subActionType: 1
			            }), t.exitPictureInPicture(), wx.navigateTo({
			                url: "report-room/report-room?livePlayerOptions=" + encodeURIComponent(JSON.stringify(i)),
			                events: {
			                    acceptDataFromReportRoomPage: function(i) {
			                        var r = {
			                            weappAppId: m,
			                            roomId: t.data.room_id,
			                            reportNickname: t.getUserInfo("nickname"),
			                            reportOpenid: a.openid,
			                            reportContent: i.reportContent,
			                            reportType: i.reportType
			                        }, s = {
			                            action: "report_room",
			                            room_id: t.data.room_id,
			                            content: JSON.stringify(r),
			                            plugin_appid: o.
			                            default.PLUGIN_APPID,
			                            timestamp: Date.now()
			                        };
			                        e.
			                        default.liveRoutePromise(s).then(function(t) {
			                            W && W.info("report room success", t), n.
			                            default.showToast("投诉成功")
			                        }).
			                        catch (function(t) {
			                            W && W.error("report room fail", t), n.
			                            default.showToast("投诉失败")
			                        })
			                    }
			                }
			            })
			        },
			        reportComment: function(t) {
			            var a = this;
			            v = !0, a.addReportData({
			                actionType: 4,
			                subActionType: 2
			            }), a.exitPictureInPicture(), wx.navigateTo({
			                url: "report-comments/report-comments?livePlayerOptions=" + encodeURIComponent(JSON.stringify(t)),
			                events: {
			                    acceptDataFromReportCommentsPage: function(i) {
			                        var r = {
			                            commentNickname: t.nickname,
			                            commentContent: t.content,
			                            reportOpenid: a.data.roomStaticInfo.openid,
			                            reportNickname: a.getUserInfo("nickname"),
			                            reportType: i.reportType
			                        }, s = {
			                            action: "report_comment",
			                            room_id: a.data.room_id,
			                            content: JSON.stringify(r),
			                            plugin_appid: o.
			                            default.PLUGIN_APPID,
			                            timestamp: Date.now()
			                        };
			                        e.
			                        default.liveRoutePromise(s).then(function(t) {
			                            W && W.info("report comment success", t), n.
			                            default.showToast("投诉成功")
			                        }).
			                        catch (function(t) {
			                            W && W.error("report comment fail", t), n.
			                            default.showToast("投诉失败")
			                        })
			                    }
			                }
			            })
			        },
			        setLike: function() {
			            var t = this;
			            t.addReportData({
			                actionType: 3,
			                subActionType: 1
			            });
			            var a = !1;
			            1 === t.data.lotteryPush.participate_type && t.data.leftLotteryTime > 2 && (a = !0);
			            var i = "liveStatSimulateLike-" + m + "-" + t.data.room_id,
			                r = parseInt(wx.getStorageSync(i)) || 0;
			            "number" == typeof r && isNaN(r) && (r = 0);
			            var n = Math.max(+t.data.orgLiveStatSimulateLike + 1, +r + 1);
			            r = s.
			            default.formatLiveStatSimulateLike(n), wx.setStorageSync(i, n), a ? t.setData({
			                liveStatSimulateLike: r,
			                isParticipateLottery: !0
			            }) : t.setData({
			                liveStatSimulateLike: r
			            }), F += 1, H || (H = !0, setTimeout(function() {
			                var i = {
			                    action: "like",
			                    room_id: t.data.room_id,
			                    content: a ? JSON.stringify({
			                        like_cnt: F,
			                        lottery_id: t.data.lotteryId
			                    }) : JSON.stringify({
			                        like_cnt: F
			                    }),
			                    plugin_appid: o.
			                    default.PLUGIN_APPID,
			                    timestamp: Date.now()
			                };
			                F = 0, H = !1, e.
			                default.liveRoutePromise(i).then(function(t) {
			                    W && W.info("setLike succ", t)
			                }).
			                catch (function(t) {
			                    W && W.error("setLike fail", t)
			                })
			            }, o.
			            default.LIKE_GATHER_REQUEST_TIME))
			        },
			        pushComment: function(t) {
			            if (t) {
			                var a = this;
			                a.addReportData({
			                    actionType: 3,
			                    subActionType: 2
			                });
			                var i = a.data.pushCommentTimeList || [];
			                if (i.push(Date.now()), i.length === o.
			                default.COMMENT.PUSH_COMMENT_HIT_FREQ_LIMIT) {
			                    if (i[i.length - 1] - i[0] < 6e4) return n.
			                    default.showToast("操作太过频繁，请1分钟后再试"), void i.shift();
			                    i.shift()
			                }
			                a.data.pushCommentTimeList = i;
			                var r = !1;
			                0 === a.data.lotteryPush.participate_type && a.data.leftLotteryTime > 2 && (r = !0);
			                var s = a.data.roomStaticInfo.openid,
			                    d = Date.now(),
			                    c = {
			                        avatar: a.getUserInfo("avatar"),
			                        nickname: a.getUserInfo("nickname"),
			                        id: s + "_" + d,
			                        openid: s,
			                        content: t,
			                        lottery_id: r ? a.data.lotteryId : 0
			                    };
			                if (a.data.isUserBan) n.
			                default.showToast("评论能力已被限制");
			                else {
			                    var l = {
			                        action: "comment",
			                        room_id: a.data.room_id,
			                        content: JSON.stringify(c),
			                        plugin_appid: o.
			                        default.PLUGIN_APPID,
			                        timestamp: d
			                    };
			                    e.
			                    default.liveRoutePromise(l).then(function(e) {
			                        W && W.info("pushComment success", t, e);
			                        var i = JSON.parse(e.respData.data),
			                            s = a.data.commentMsgIdList || [];
			                        s.push(i.msg_id), a.data.commentMsgIdList = s;
			                        var n = a.data.allCommentList || [];
			                        n.push(c);
			                        var d = n.length;
			                        n = n.slice(Math.max(0, d - o.
			                        default.COMMENT.SHOW_LIMIT_NUMBER), d), a.data.allCommentList = n, r ? a.setData({
			                            commentList: n,
			                            isParticipateLottery: !0
			                        }, function() {
			                            a.setData({
			                                commentScrollIntoView: "comment" + n.length
			                            })
			                        }) : a.setData({
			                            commentList: n
			                        }, function() {
			                            a.setData({
			                                commentScrollIntoView: "comment" + n.length
			                            })
			                        })
			                    }).
			                    catch (function(e) {
			                        W && W.error("pushComment fail", t, e);
			                        var i = a.data.allCommentList || [],
			                            r = +e.err_code;
			                        if (r === o.
			                        default.COMMENT_ERROR_CODE.ERR_COMMENT_PUSH) n.
			                        default.showToast("写评论失败");
			                        else if (r === o.
			                        default.COMMENT_ERROR_CODE.ERR_COMMENT_HIT_KEYWORD_INTERCEPT) {
			                            i.push({
			                                avatar: a.getUserInfo("avatar"),
			                                nickname: a.getUserInfo("nickname"),
			                                content: "******"
			                            });
			                            var s = i.length;
			                            i = i.slice(Math.max(0, s - o.
			                            default.COMMENT.SHOW_LIMIT_NUMBER), s), a.setData({
			                                commentList: i
			                            })
			                        } else r === o.
			                        default.COMMENT_ERROR_CODE.ERR_COMMENT_HIT_FREQ_LIMIT && n.
			                        default.showToast("操作太过频繁，请1分钟后再试")
			                    })
			                }
			            }
			        },
			        getRoomEndInfo: function() {
			            var t = this,
			                e = t.data.room_id;
			            a.
			            default.getRoomEndInfo({
			                room_id: e
			            }).then(function(a) {
			                W && W.info("getRoomEndInfo success", i);
			                var i = a.goods;
			                (i = i.filter(function(t) {
			                    return !t.flag || t.flag === o.
			                    default.GOODS_FLAG.GOODS_FLAG_NORMAL
			                })).forEach(function(o) {
			                    o.url && (o.url = "/" + o.url.replace(/(.html|.htm)/i, ""), o.url = o.url.includes("?") ? o.url + "&room_id=" + e : o.url + "?room_id=" + e), o.price = o.price % 100 == 0 ? o.price / 100 : (o.price / 100).toFixed(2), o.price2 = o.price2 % 100 == 0 ? o.price2 / 100 : (o.price2 / 100).toFixed(2), t.addReportData({
			                        actionType: 4,
			                        subActionType: 15,
			                        reserves: 2,
			                        goodsId: o.goods_id
			                    })
			                }), t.setData({
			                    storeRankList: i.splice(0, 3)
			                })
			            }).
			            catch (function(e) {
			                W && W.error("getRoomEndInfo fail", e), !t.data.isNetworkDisconnection && n.
			                default.showToast("接口请求失败")
			            })
			        },
			        getLotteryById: function(t) {
			            var e = this;
			            return new Promise(function(o, i) {
			                a.
			                default.getLotteryById({
			                    room_id: e.data.room_id,
			                    content: t
			                }).then(function(t) {
			                    t.participate_type = +t.participate_type, t.obtain_type = +t.obtain_type, o(t)
			                }).
			                catch (function(t) {
			                    i(t)
			                })
			            })
			        },
			        getLotteryResult: function(t) {
			            var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
			                r = this;
			            a.
			            default.getLotteryResult({
			                room_id: r.data.room_id,
			                content: t
			            }).then(function(a) {
			                console.log("获取抽奖结果 succ:", a), W && W.info("获取抽奖结果 succ:", a);
			                var s = a.current && a.current.luckmen || [],
			                    n = a.history || [],
			                    d = {}, c = r.data.isParticipateLottery,
			                    l = void 0,
			                    u = r.data.roomStaticInfo.openid,
			                    m = r.data.curLiveStatusCode;
			                if (m === o.
			                default.LIVE_STATUS_CODE.LIVE_STATUS_END) {
			                    var f = !1;
			                    if (s.forEach(function(t) {
			                        t.openid === u && (f = !0)
			                    }), n.forEach(function(t) {
			                        t.luckmen.forEach(function(t) {
			                            t.openid === u && (f = !0)
			                        })
			                    }), !f) return void r.setData({
			                        showLotteryIcon: !1,
			                        showLotteryOper: !1,
			                        showCountdownTime: !1
			                    })
			                }
			                if (r.data.leftLotteryTime < 0 && (m === o.
			                default.LIVE_STATUS_CODE.LIVE_STATUS_FORBID || m === o.
			                default.LIVE_STATUS_CODE.LIVE_STATUS_PAUSE)) l = r.data.type === o.
			                default.SCENE_TYPE.ADDRESS ? "result-list" : "error", r.setData({
			                    showLotteryIcon: !0,
			                    showLotteryOper: e || r.data.type === o.
			                    default.SCENE_TYPE.ADDRESS,
			                    showLotteryCountTime: !1,
			                    lotteryType: l
			                }), r.addReportData({
			                    actionType: 4,
			                    subActionType: 20,
			                    lotteryId: t
			                });
			                else if (s.concat(n).length > 0) {
			                    s.forEach(function(t) {
			                        t.openid === u ? (c = !0, t.isLuckMen = !0, d = t) : (t.nickname = i.
			                        default.encryptNickname(t.nickname), t.headimg = t.headimg && t.headimg.replace(/\\/g, ""))
			                    }), d.headimg = r.getUserInfo("avatar");
			                    for (var T = 0; T < s.length; T++) s[T].isLuckMen && s.unshift(s.splice(T, 1)[0]);
			                    r.setData({
			                        showLotteryIcon: !0,
			                        showLotteryOper: e || r.data.type === o.
			                        default.SCENE_TYPE.ADDRESS,
			                        showLotteryCountTime: !1,
			                        lotteryType: r.data.isTriggerHistoryLotteryAddress || r.data.type === o.
			                        default.SCENE_TYPE.ADDRESS ? "result-list" : "result",
			                        isParticipateLottery: c,
			                        isFillLotteryAddress: !1,
			                        mySelfLotteryLuckMen: d,
			                        curLotteryLuckMen: s,
			                        historyLotteryLuckMen: n,
			                        isHistoryFillLotteryAddress: []
			                    }), r.addReportData({
			                        actionType: 4,
			                        subActionType: 20,
			                        lotteryId: t
			                    })
			                } else r.data.lotteryType === o.
			                default.LOTTERY_STATUS.LOTTERY_FINISHED ? r.setData({
			                    showLotteryIcon: !1,
			                    showLotteryOper: !1
			                }) : (r.setData({
			                    showLotteryIcon: !0,
			                    showLotteryOper: e || r.data.type === o.
			                    default.SCENE_TYPE.ADDRESS,
			                    showLotteryCountTime: !1,
			                    curLotteryLuckMen: [],
			                    lotteryType: r.data.isTriggerHistoryLotteryAddress || r.data.type === o.
			                    default.SCENE_TYPE.ADDRESS ? "result-list" : "result"
			                }), r.addReportData({
			                    actionType: 4,
			                    subActionType: 20,
			                    lotteryId: t
			                }));
			                e && ("error" === l ? r.addReportData({
			                    actionType: 4,
			                    subActionType: 29,
			                    lotteryId: t
			                }) : 0 === s.length ? r.addReportData({
			                    actionType: 4,
			                    subActionType: 30,
			                    reserves: 4,
			                    lotteryId: t
			                }) : c ? r.addReportData({
			                    actionType: 4,
			                    subActionType: 30,
			                    reserves: d.isLuckMen ? 1 : 2,
			                    lotteryId: t
			                }) : r.addReportData({
			                    actionType: 4,
			                    subActionType: 30,
			                    reserves: 3,
			                    lotteryId: t
			                }))
			            }).
			            catch (function(o) {
			                W && W.error("获取抽奖结果 err:", o), r.setData({
			                    showLotteryIcon: !0,
			                    showLotteryOper: e,
			                    showLotteryCountTime: !1,
			                    lotteryType: "error"
			                }), e && r.addReportData({
			                    actionType: 4,
			                    subActionType: 29,
			                    lotteryId: t
			                })
			            })
			        },
			        getParticipated: function(t) {
			            var e = this;
			            a.
			            default.getParticipated({
			                room_id: e.data.room_id,
			                content: t
			            }).then(function(t) {
			                W && W.info("获取观众是否参与某次抽奖 succ", t), e.setData({
			                    isParticipateLottery: !+t
			                })
			            })
			        },
			        fillLotteryAddress: function() {
			            var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
			                e = arguments[1],
			                o = arguments[2],
			                i = this;
			            t ? i.setData({
			                isTriggerLotteryAddress: !0,
			                isTriggerHistoryLotteryAddress: !0
			            }) : i.setData({
			                isTriggerLotteryAddress: !0,
			                isTriggerHistoryLotteryAddress: !1
			            }), v = !0, i.exitPictureInPicture(), n.
			            default.chooseAddressForPlugin().then(function(r) {
			                W && W.info("chooseAddress", r);
			                var s = {
			                    lottery_id: e || i.data.lotteryId,
			                    address: {
			                        receive_name: r && r.userName || "",
			                        address: r && r.provinceName + " " + r.cityName + " " + r.countyName || "",
			                        district: r && r.detailInfo || "",
			                        postcode: r && r.postalCode || "",
			                        phone: r && r.telNumber || ""
			                    }
			                };
			                if (t) {
			                    var n = [];
			                    n[o] = !0, i.setData({
			                        isHistoryFillLotteryAddress: n
			                    })
			                } else i.setData({
			                    isFillLotteryAddress: !0
			                });
			                a.
			                default.fillLotteryAddress({
			                    room_id: i.data.room_id,
			                    content: s
			                }).then(function(t) {
			                    W && W.info("填写地址 succ", t)
			                }).
			                catch (function(e) {
			                    if (W && W.error("填写地址 fail", e), t) {
			                        var a = [];
			                        a[o] = !1, i.setData({
			                            isHistoryFillLotteryAddress: a
			                        })
			                    } else i.setData({
			                        isFillLotteryAddress: !1
			                    })
			                })
			            }).
			            catch (function(t) {
			                W && W.error("选择收货地址 fail", t);
			                var e = wx.getStorageSync(f);
			                t.errMsg && t.errMsg.includes("cancel") || t.errMsg && t.errMsg.includes("not support") || (e ? wx.showModal({
			                    content: "需要允许" + i.data.roomStaticInfo.weapp_name + "小程序获取你的通信地址",
			                    confirmText: "前往设置",
			                    success: function(t) {
			                        t.confirm && n.
			                        default.openSettingForPlugin()
			                    }
			                }) : wx.setStorageSync(f, !0))
			            })
			        },
			        viewLotteryAddress: function() {
			            var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
			                e = arguments[1],
			                o = arguments[2],
			                i = this;
			            t ? i.setData({
			                isTriggerLotteryAddress: !0,
			                isTriggerHistoryLotteryAddress: !0
			            }) : i.setData({
			                isTriggerLotteryAddress: !0,
			                isTriggerHistoryLotteryAddress: !1
			            }), v = !0, a.
			            default.getLotteryResult({
			                room_id: i.data.room_id,
			                content: e
			            }).then(function(r) {
			                console.log("查看地址 succ:", r), W && W.info("查看地址 succ", r), (r.history || []).forEach(function(r) {
			                    r.id === e && (r.luckmen || []).forEach(function(r) {
			                        if (r.openid === i.data.roomStaticInfo.openid) {
			                            i.exitPictureInPicture();
			                            var s = r.address || {}, n = {
			                                weapp_name: i.data.roomStaticInfo.weapp_name,
			                                address: s.address || "",
			                                district: s.district || "",
			                                phone: s.phone || "",
			                                postcode: s.postcode || "",
			                                receive_name: s.receive_name || ""
			                            };
			                            wx.navigateTo({
			                                url: "address-preview/address-preview?livePlayerOptions=" + encodeURIComponent(JSON.stringify(n)),
			                                events: {
			                                    acceptDataFromAddressPreviewPage: function(r) {
			                                        var s = {
			                                            lottery_id: e,
			                                            address: r
			                                        };
			                                        if (t) {
			                                            var n = [];
			                                            n[o] = !0, i.setData({
			                                                isHistoryFillLotteryAddress: n
			                                            })
			                                        } else i.setData({
			                                            isFillLotteryAddress: !0
			                                        });
			                                        a.
			                                        default.fillLotteryAddress({
			                                            room_id: i.data.room_id,
			                                            content: s
			                                        }).then(function(t) {
			                                            W && W.info("修改地址 succ", t)
			                                        }).
			                                        catch (function(e) {
			                                            if (W && W.error("修改地址 fail", e), t) {
			                                                var a = [];
			                                                a[o] = !1, i.setData({
			                                                    isHistoryFillLotteryAddress: a
			                                                })
			                                            } else i.setData({
			                                                isFillLotteryAddress: !1
			                                            })
			                                        })
			                                    }
			                                }
			                            })
			                        }
			                    })
			                })
			            }).
			            catch (function(t) {
			                W && W.error("查看地址 fail", t)
			            })
			        },
			        freshTime: function() {
			            if (this.data.roomStaticInfo && this.data.server_time) {
			                D = Math.max(this.data.server_time, D) + 1;
			                var t = "",
			                    e = this.data.roomStaticInfo.start_time - D,
			                    o = Math.floor(e / 3600 / 24),
			                    a = Math.floor(e / 3600 % 24),
			                    i = Math.floor(e / 60 % 60),
			                    r = e % 60;
			                e <= 0 ? (clearInterval(R), this.setData({
			                    showCountdownTime: !0,
			                    countdownTime: e
			                }), this.getNetworkType()) : e > 864e4 ? this.setData({
			                    showCountdownTime: !1
			                }) : (t = o > 0 ? a > 0 ? o + "天" + a + "小时" : o + "天" : a > 0 ? i > 0 ? a + "小时" + i + "分钟" : a + "小时" : i > 0 ? i + "分钟" : r + "秒", this.setData({
			                    showCountdownTime: !0,
			                    countdownTime: e,
			                    countdownTimeContent: t
			                }))
			            }
			        },
			        endLotteryCountTime: function() {
			            var t = this;
			            if (w && t.data.server_time) {
			                A = Math.max(t.data.server_time, A) + 1;
			                var e = w - A,
			                    a = t.data.lotteryId;
			                if (t.data.curLiveStatusCode === o.
			                default.LIVE_STATUS_CODE.LIVE_STATUS_END) clearInterval(P), t.setData({
			                    leftLotteryTime: 0,
			                    firstStartLotteryAnimation: !1,
			                    nextStartLotteryAnimation: !1,
			                    endLotteryAnimation: !1
			                }), t.getLotteryResult(a, !0);
			                else if (e > 0) {
			                    var i = Math.floor(e / 60 % 60).toString(),
			                        r = (e % 60).toString();
			                    t.setData({
			                        leftLotteryTime: e,
			                        lotteryCountTime: (i[1] ? i : "0" + i) + ":" + (r[1] ? r : "0" + r),
			                        showLotteryCountTime: !0
			                    })
			                } else clearInterval(P), t.setData({
			                    leftLotteryTime: e,
			                    lotteryCountTime: "",
			                    showLotteryCountTime: !1,
			                    firstStartLotteryAnimation: !1,
			                    nextStartLotteryAnimation: !1,
			                    endLotteryAnimation: !0
			                }), setTimeout(function() {
			                    t.getLotteryById(a).then(function(e) {
			                        W && W.info("抽奖时间结束后获取抽奖信息 succ:", {
			                            lotteryId: a,
			                            lotteryPush: e
			                        }), e.status === o.
			                        default.LOTTERY_STATUS.LOTTERY_FINISHED ? t.getLotteryResult(a, !0) : (t.setData({
			                            showLotteryIcon: !0,
			                            showLotteryOper: !0,
			                            showLotteryCountTime: !1,
			                            lotteryType: "error"
			                        }), t.addReportData({
			                            actionType: 4,
			                            subActionType: 29,
			                            lotteryId: a
			                        }))
			                    })
			                }, 5e3)
			            }
			        },
			        bindKeyboardHeightChange: function(t) {
			            this.setData({
			                commentKeyboardHeight: t.detail.commentKeyboardHeight
			            })
			        },
			        bindCustomEvent: function(t) {
			            W && W.info("bindCustomEvent", t.detail);
			            var e = this;
			            if (e.data.isNetworkDisconnection) n.
			            default.showToast("当前无网络");
			            else if (t.detail.showPushComment && e.data.isRoomBan) n.
			            default.showToast("该直播已关闭评论功能");
			            else {
			                var o = +wx.getStorageSync(T) || 0;
			                (t.detail.showPushComment || t.detail.confirmClickLikeWithoutAuthorize && 1 === e.data.lotteryPush.participate_type) && (0 === o || Date.now() > o + 864e5) ? n.
			                default.authorize().then(function(o) {
			                    W && W.info("authorize confirm", o);
			                    var a = o ? JSON.parse(o.respData.data).avatarUrl : e.data.roomStaticInfo.user_img + "/",
			                        i = o ? JSON.parse(o.respData.data).nickName : e.data.roomStaticInfo.user_name;
			                    wx.setStorageSync(S, a), wx.setStorageSync(_, i), wx.setStorageSync(T, Date.now()), wx.setStorageSync(y, !0), !t.detail.confirmClickLikeWithoutAuthorize && e.handlerCustomEvent(t), e.addReportData({
			                        actionType: 2,
			                        subActionType: 1
			                    })
			                }).
			                catch (function(t) {
			                    W && W.error("authorize cancel", t), wx.setStorageSync(T, 0), wx.setStorageSync(y, !1), e.addReportData({
			                        actionType: 2,
			                        subActionType: 2
			                    })
			                }) : e.handlerCustomEvent(t)
			            }
			        },
			        handlerCustomEvent: function(t) {
			            if (t.detail.reportAnimationFPS) {
			                var e = +t.detail.animationFPS;
			                n.
			                default.reportPerformance(o.
			                default.TEST_SPEED_REPORT_ID.LOTTIE_LIKE_ANIMATION_FPS, e, [m, this.data.room_id]), this.addReportData({
			                    actionType: 5,
			                    subActionType: 5,
			                    lottieFPS: e
			                })
			            }
			            if (t.detail.confirmCloseLotteryOper && this.setData({
			                lotteryType: "result-list" === this.data.lotteryType ? "result" : this.data.lotteryType,
			                isTriggerLotteryAddress: !1,
			                isTriggerHistoryLotteryAddress: !1
			            }), t.detail.confirmClickLottery && this.addReportData({
			                actionType: 4,
			                subActionType: 21,
			                lotteryId: this.data.lotteryId
			            }), (t.detail.confirmClickCommentWithLottery || t.detail.confirmClickLikeWithLottery) && this.addReportData({
			                actionType: 4,
			                subActionType: 22,
			                lotteryId: this.data.lotteryId
			            }), t.detail.confirmClickLotteryList && (this.setData({
			                isTriggerLotteryAddress: !0,
			                isTriggerHistoryLotteryAddress: !0
			            }), this.addReportData({
			                actionType: 4,
			                subActionType: 23,
			                lotteryId: this.data.lotteryId
			            })), t.detail.confirmClipboardLotteryToken && this.addReportData({
			                actionType: 4,
			                subActionType: 24,
			                lotteryId: this.data.lotteryId
			            }), t.detail.confirmFillLotteryAddress && (this.addReportData({
			                actionType: 4,
			                subActionType: 25,
			                lotteryId: this.data.lotteryId
			            }), this.fillLotteryAddress()), t.detail.confirmFillHistoryLotteryAddress && (this.addReportData({
			                actionType: 4,
			                subActionType: 25,
			                lotteryId: this.data.lotteryId
			            }), this.fillLotteryAddress(!0, t.detail.lotteryId, t.detail.index)), t.detail.confirmViewLotteryAddress && (this.addReportData({
			                actionType: 4,
			                subActionType: 25,
			                lotteryId: this.data.lotteryId
			            }), this.viewLotteryAddress(!1, this.data.lotteryId)), t.detail.confirmViewHistoryLotteryAddress && (this.addReportData({
			                actionType: 4,
			                subActionType: 25,
			                lotteryId: this.data.lotteryId
			            }), this.viewLotteryAddress(!0, t.detail.lotteryId, t.detail.index)), t.detail.showStoreList && (this.addReportData({
			                actionType: 4,
			                subActionType: 13
			            }), this.addReportData({
			                actionType: 4,
			                subActionType: 14
			            })), t.detail.operatePushComment || t.detail.showProfileModal) {
			                var a = !! t.detail.showPushComment;
			                a && (this.addReportData({
			                    actionType: 4,
			                    subActionType: 5,
			                    reserves: 1
			                }), this.addReportData({
			                    actionType: 4,
			                    subActionType: 5,
			                    reserves: 2
			                })), this.setData({
			                    showPushComment: a
			                })
			            }
			            if (t.detail.confirmPushComment && (this.addReportData({
			                actionType: 4,
			                subActionType: 5,
			                reserves: 3
			            }), this.pushComment(t.detail.comment)), t.detail.confirmSubscribe) {
			                var i = !! t.detail.isSubscribe;
			                this.subscribeRoom(i)
			            }
			            if (t.detail.confirmReportRoom && this.reportRoom(), t.detail.confirmReportComment && this.reportComment({
			                avatar: t.detail.avatar,
			                nickname: t.detail.nickname,
			                content: t.detail.content
			            }), t.detail.confirmClickLike && this.setLike(), t.detail.confirmViewGoods) {
			                var r = this.data.curLiveStatusCode,
			                    s = t.detail.goods_id;
			                this.addReportData({
			                    actionType: 4,
			                    subActionType: 16,
			                    reserves: r === o.
			                    default.LIVE_STATUS_CODE.LIVE_STATUS_END ? 2 : 3,
			                    goodsId: s
			                }), this.data.closePictureInPictureMode || r !== o.
			                default.LIVE_STATUS_CODE.LIVE_STATUS_LIVE && r !== o.
			                default.LIVE_STATUS_CODE.LIVE_STATUS_ERROR && r !== o.
			                default.LIVE_STATUS_CODE.LIVE_STATUS_PAUSE || this.addReportData({
			                    actionType: 6,
			                    subActionType: 1,
			                    reserves: 1
			                }), this.viewGoods(s)
			            }
			            if (t.detail.confirmViewPushGoods) {
			                var d = this.data.curLiveStatusCode,
			                    c = this.data.storePush.goods_id;
			                this.addReportData({
			                    actionType: 4,
			                    subActionType: 16,
			                    reserves: 1,
			                    goodsId: c
			                }), this.data.closePictureInPictureMode || d !== o.
			                default.LIVE_STATUS_CODE.LIVE_STATUS_LIVE && d !== o.
			                default.LIVE_STATUS_CODE.LIVE_STATUS_ERROR && d !== o.
			                default.LIVE_STATUS_CODE.LIVE_STATUS_PAUSE || this.addReportData({
			                    actionType: 6,
			                    subActionType: 1,
			                    reserves: 1
			                }), this.viewGoods(c)
			            }
			            t.detail.scrollComment ? t.detail.confirmNewNotify || t.detail.isScrollCommentToBottom ? this.setData({
			                isScrollCommentToBottom: !0,
			                newNotifyCount: 0
			            }) : this.setData({
			                isScrollCommentToBottom: !1
			            }) : t.detail.confirmClickLike || t.detail.reportAnimationFPS || this.setData({
			                showProfileModal: !! t.detail.showProfileModal,
			                showStoreList: !! t.detail.showStoreList,
			                showLotteryOper: !! t.detail.showLotteryOper
			            })
			        },
			        getNetworkType: function() {
			            var t = this;
			            g && (g = !1, wx.getNetworkType({
			                success: function(e) {
			                    var a = "isConfirmViewLivePlayerWithoutWifi-" + m + "-" + t.data.room_id,
			                        i = wx.getStorageSync(a) || !1;
			                    "none" === (p = e.networkType) ? (t.setData({
			                        isNetworkDisconnection: !0,
			                        toast: t.data.curLiveStatusCode === o.
			                        default.LIVE_STATUS_CODE.LIVE_STATUS_PAUSE ? "直播暂停，请稍后..." : "无法连接到网络，请确认网络连接后重试"
			                    }), g = !0) : "wifi" === p || i || t.data.curLiveStatusCode !== o.
			                    default.LIVE_STATUS_CODE.LIVE_STATUS_LIVE ? (t.setData({
			                        showLivePlayer: !0,
			                        isNetworkDisconnection: !1,
			                        toast: t.data.curLiveStatusCode === o.
			                        default.LIVE_STATUS_CODE.LIVE_STATUS_PAUSE ? "直播暂停，请稍后..." : ""
			                    }), g = !0) : (t.setData({
			                        showLivePlayer: !1
			                    }), wx.showModal({
			                        title: "流量提醒",
			                        content: "你目前处于非WiFi环境，是否继续观看直播？",
			                        confirmText: "继续",
			                        success: function(e) {
			                            e.confirm ? (i = !0, wx.setStorageSync(a, !0), t.setData({
			                                showLivePlayer: !0,
			                                isNetworkDisconnection: !1,
			                                toast: t.data.curLiveStatusCode === o.
			                                default.LIVE_STATUS_CODE.LIVE_STATUS_PAUSE ? "直播暂停，请稍后..." : ""
			                            })) : (i = !1, wx.setStorageSync(a, !1), n.
			                            default.navigateBack()), g = !0
			                        }
			                    }))
			                },
			                fail: function() {
			                    t.setData({
			                        isNetworkDisconnection: !1,
			                        toast: t.data.curLiveStatusCode === o.
			                        default.LIVE_STATUS_CODE.LIVE_STATUS_PAUSE ? "直播暂停，请稍后..." : ""
			                    }), g = !0
			                }
			            }))
			        },
			        onNetworkStatusChange: function() {
			            var t = this;
			            wx.onNetworkStatusChange(function(e) {
			                var a = e.isConnected;
			                p = e.networkType, a && "none" !== p ? "wifi" !== p ? (t.setData({
			                    isNetworkDisconnection: !1,
			                    showCountdownTime: !1,
			                    toast: t.data.curLiveStatusCode === o.
			                    default.LIVE_STATUS_CODE.LIVE_STATUS_PAUSE ? "直播暂停，请稍后..." : ""
			                }), n.
			                default.showToast("当前处于非WiFi环境，请注意流量消耗")) : t.setData({
			                    isNetworkDisconnection: !1,
			                    showCountdownTime: !1,
			                    toast: t.data.curLiveStatusCode === o.
			                    default.LIVE_STATUS_CODE.LIVE_STATUS_PAUSE ? "直播暂停，请稍后..." : ""
			                }) : t.setData({
			                    isNetworkDisconnection: !0,
			                    showCountdownTime: !1,
			                    toast: t.data.curLiveStatusCode === o.
			                    default.LIVE_STATUS_CODE.LIVE_STATUS_PAUSE ? "直播暂停，请稍后..." : "无法连接到网络，请确认网络连接后重试"
			                })
			            })
			        },
			        createLivePlayerContext: function() {
			            var t = this;
			            J || (J = !0, (G = wx.createLivePlayerContext("live-player-context", t)).onEnterPictureInPicture && G.onEnterPictureInPicture(function(t) {
			                W && W.info("onEnterPictureInPicture", t), I = !0
			            }), G.onLeavePictureInPicture && G.onLeavePictureInPicture(function(e) {
			                W && W.info("onLeavePictureInPicture", e), I = !1, setTimeout(function() {
			                    t.addReportData({
			                        actionType: 6,
			                        subActionType: 2,
			                        reserves: E ? 1 : 2
			                    })
			                }, 5e3)
			            }))
			        },
			        exitPictureInPicture: function() {
			            G && G.exitPictureInPicture && G.exitPictureInPicture()
			        },
			        onLivePlayerStateChange: function(t) {
			            var e = this;
			            W && W.info("onLivePlayerStateChange", t.detail);
			            var a = t.detail.code;
			            if (2001 === a || 2007 === a) this.setData({
			                showLoading: !(this.data.curLiveStatusCode === o.
			                default.LIVE_STATUS_CODE.LIVE_STATUS_PAUSE || this.data.curLiveStatusCode === o.
			                default.LIVE_STATUS_CODE.LIVE_STATUS_FORBID),
			                isNetworkDisconnection: !1,
			                toast: this.data.curLiveStatusCode === o.
			                default.LIVE_STATUS_CODE.LIVE_STATUS_PAUSE ? "直播暂停，请稍后..." : ""
			            });
			            else if (2004 === a) setTimeout(function() {
			                e.setData({
			                    showLoading: !1,
			                    isLivePlaying: !0,
			                    isNetworkDisconnection: !1,
			                    toast: e.data.curLiveStatusCode === o.
			                    default.LIVE_STATUS_CODE.LIVE_STATUS_PAUSE ? "直播暂停，请稍后..." : ""
			                })
			            }, 1e3);
			            else if (-2301 === a) this.setData({
			                showLoading: !1,
			                isNetworkDisconnection: !1,
			                toast: this.data.curLiveStatusCode === o.
			                default.LIVE_STATUS_CODE.LIVE_STATUS_PAUSE ? "直播暂停，请稍后..." : "直播加载失败，请稍后重试"
			            });
			            else if (2104 === a) this.setData({
			                showLoading: !1,
			                isNetworkDisconnection: !1,
			                toast: this.data.curLiveStatusCode === o.
			                default.LIVE_STATUS_CODE.LIVE_STATUS_PAUSE ? "直播暂停，请稍后..." : ""
			            }), n.
			            default.showToast("当前网络较差");
			            else if (2105 === a) {
			                var i = t.detail.message,
			                    r = +i.substring(10, i.length - 2);
			                r > 0 && (W && W.setAnalyze({
			                    videoCaton: r
			                }), n.
			                default.reportPerformance(o.
			                default.TEST_SPEED_REPORT_ID.VIDEO_CATON, r, [m, this.data.room_id]), this.addReportData({
			                    actionType: 5,
			                    subActionType: 1,
			                    videoCaton: r
			                }))
			            }
			        },
			        onLivePlayerNetStatus: function(t) {
			            var e = t.detail.info,
			                a = +e.videoBitrate,
			                i = +e.audioBitrate,
			                r = +e.videoFPS,
			                s = +e.netSpeed,
			                d = Math.abs(+e.netJitter);
			            W && W.info("onLivePlayerNetStatus", e), W && W.setAnalyze(e), a && n.
			            default.reportPerformance(o.
			            default.TEST_SPEED_REPORT_ID.VIDEO_BITRATE, a, [m, this.data.room_id]), i && n.
			            default.reportPerformance(o.
			            default.TEST_SPEED_REPORT_ID.AUDIO_BITRATE, i, [m, this.data.room_id]), r && n.
			            default.reportPerformance(o.
			            default.TEST_SPEED_REPORT_ID.VIDEO_FPS, r, [m, this.data.room_id]), d && n.
			            default.reportPerformance(o.
			            default.TEST_SPEED_REPORT_ID.HAS_NET_JITTER, d, [m, this.data.room_id]), s && n.
			            default.reportPerformance(o.
			            default.TEST_SPEED_REPORT_ID.NET_SPEED, s, [m, this.data.room_id]), s > 0 && s < 300 && n.
			            default.reportPerformance(o.
			            default.TEST_SPEED_REPORT_ID.SLOW_SPEED, s, [m, this.data.room_id]), r && this.addReportData({
			                actionType: 5,
			                subActionType: 2,
			                videoFPS: r
			            }), d && this.addReportData({
			                actionType: 5,
			                subActionType: 3,
			                netJitter: d
			            }), s && this.addReportData({
			                actionType: 5,
			                subActionType: 4,
			                netSpeed: s
			            })
			        },
			        onLivePlayerRenderError: function(t) {
			            W && W.error("onLivePlayerRenderError", t)
			        }
			    }
			});