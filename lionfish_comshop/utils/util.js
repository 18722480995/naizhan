var _extends = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
    }
    return e
};

function getdomain() {
    var e = getApp();
    return e.siteInfo.uniacid + "_" + e.siteInfo.siteroot
}

function api() {
    return "https://mall.shiziyu888.com/dan/"
}

function check_login() {
    var e = wx.getStorageSync("token"),
        t = wx.getStorageSync("member_id");
    return !!(e && null != t && 0 < t.length)
}

function check_login_new() {
    var n = wx.getStorageSync("token"),
        o = wx.getStorageSync("member_id");
    return new Promise(function (e, t) {
        wx.checkSession({
            success: function () {
                console.log("checkSession 未过期"), n && null != o && 0 < o.length ? e(!0) : e(!1)
            },
            fail: function () {
                console.log("checkSession 过期"), e(!1)
            }
        })
    })
}

function checkRedirectTo(e, t) {
    var n = !1;
    if (t) {
        -1 !== ["/lionfish_comshop/pages/groupCenter/apply", "/lionfish_comshop/pages/supply/apply", "/lionfish_comshop/pages/user/charge", "/lionfish_comshop/pages/order/index", "/lionfish_comshop/moduleA/solitaire/index"].indexOf(e) && (n = !0)
    }
    return n
}



function login(o) {
    console.error(o, '我是进入的o1111111111111111');
    var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
        a = getApp(),
        r = wx.getStorageSync("share_id");
    null == r && (r = "0"), wx.login({
        success: function (e) {
            e.code && (console.log(e.code), a.util.request({
                url: "entry/wxapp/user",
                data: {
                    controller: "user.applogin",
                    code: e.code
                },
                dataType: "json",
                success: function (n) {
                    console.log(n), wx.setStorage({
                            key: "token",
                            data: n.data.token
                        }),

                        // 修改
                        // wx.getUserProfile({
                        //     desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                        //     success: (e) => {
                        //         var t = e.userInfo;
                        //         wx.setStorage({
                        //             key: "userInfo",
                        //             data: t
                        //         }), console.log(e.userInfo), a.util.request({
                        //             url: "entry/wxapp/user",
                        //             data: {
                        //                 controller: "user.applogin_do",
                        //                 token: n.data.token,
                        //                 share_id: r,
                        //                 nickName: e.userInfo.nickName,
                        //                 avatarUrl: e.userInfo.avatarUrl,
                        //                 encrypteddata: e.encryptedData,
                        //                 iv: e.iv
                        //             },
                        //             method: "post",
                        //             dataType: "json",
                        //             success: function (e) {
                        //                 console.error('我进入的是第一个呢');
                        //                 wx.setStorage({
                        //                     key: "member_id",
                        //                     data: e.data.member_id
                        //                 }), wx.showToast({
                        //                     title: "资料已更新",
                        //                     icon: "success",
                        //                     duration: 2e3,
                        //                     success: function () {
                        //                         o && 0 < o.length && (1 == i ? wx.switchTab({
                        //                             url: o
                        //                         }) : wx.redirectTo({
                        //                             url: o
                        //                         }))
                        //                     }
                        //                 })
                        //             }
                        //         })
                        //     }
                        // })
                    // 修改



                    wx.getUserInfo({
                        success: function(e) {
                            var t = e.userInfo;
                            wx.setStorage({
                                key: "userInfo",
                                data: t
                            }), console.log(e.userInfo), a.util.request({
                                url: "entry/wxapp/user",
                                data: {
                                    controller: "user.applogin_do",
                                    token: n.data.token,
                                    share_id: r,
                                    nickName: e.userInfo.nickName,
                                    avatarUrl: e.userInfo.avatarUrl,
                                    encrypteddata: e.encryptedData,
                                    iv: e.iv
                                },
                                method: "post",
                                dataType: "json",
                                success: function(e) {
                                    console.error('我进入的是第一个呢');
                                    wx.setStorage({
                                        key: "member_id",
                                        data: e.data.member_id
                                    }), wx.showToast({
                                        title: "资料已更新",
                                        icon: "success",
                                        duration: 2e3,
                                        success: function() {
                                            o && 0 < o.length && (1 == i ? wx.switchTab({
                                                url: o
                                            }) : wx.redirectTo({
                                                url: o
                                            }))
                                        }
                                    })
                                }
                            })
                        },
                        fail: function(e) {}
                    })


                }
            }))
        }
    })
}

function login_prosime(needPosition, userFile) {
    console.log(userFile); //因为无法手动触发所以调用传参 上面的userFile 也是传参的参数
    var o = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
    return new Promise(function (t, n) {
        getCode().then(function (e) {
            console.error('进来了111');
            wxGetUserInfo(o, e, userFile).then(function (e) {
                t(e)
            }).
            catch(function (e) {
                console.error('进来了2222');

                console.log(e), n(e)
            })
        })
    })
}

function getCode() {
    return new Promise(function (t, n) {
        var o = getApp();
        wx.login({
            success: function (e) {
                e.code ? (console.log(e.code), o.util.request({
                    url: "entry/wxapp/user",
                    data: {
                        controller: "user.applogin",
                        code: e.code
                    },
                    dataType: "json",
                    success: function (e) {
                        t(e.data.token), wx.setStorage({
                            key: "token",
                            data: e.data.token
                        })
                    }
                })) : n(e.errMsg)
            }
        })
    })
}

function wxGetUserInfo(r, s, userFile) {
    var userFileT = userFile.userInfo;
    var userFileE = userFile;
    return new Promise(function (n, t) {
        // console.error(userFile, '测试数据');
        // let userFile = userFile; //新增

        var o = getApp(),
            i = wx.getStorageSync("share_id");
        null == i && (i = "0");
        var e = wx.getStorageSync("community"),
            a = e && (e.communityId || 0);
        e && wx.setStorageSync("lastCommunity", e),


            // 修改





            // t = userFile.userInfo;
            wx.setStorage({
                key: "userInfo",
                data: userFileT
            }), console.log(e.userInfo), o.util.request({
                url: "entry/wxapp/user",
                data: {
                    controller: "user.applogin_do",
                    token: s,
                    share_id: i,
                    nickName: userFileE.userInfo.nickName,
                    avatarUrl: userFileE.userInfo.avatarUrl,
                    encrypteddata: userFileE.encryptedData,
                    iv: userFileE.iv,
                    community_id: a
                },
                method: "post",
                dataType: "json",
                success: function (e) {
                    console.error('我进入的是第二个呢');

                    1 == (e.data.isblack || 0) ? (o.globalData.isblack = 1, wx.removeStorageSync("token"), wx.switchTab({
                        url: "/lionfish_comshop/pages/index/index"
                    })) : (wx.setStorage({
                        key: "member_id",
                        data: e.data.member_id
                    }), console.log("needPosition", r), r && getCommunityInfo()), n(e)
                }
            })






        // 修改

        // wx.getUserInfo({
        //     success: function (e) {
        //         var t = e.userInfo;
        //         wx.setStorage({
        //             key: "userInfo",
        //             data: t
        //         }), console.log(e.userInfo), o.util.request({
        //             url: "entry/wxapp/user",
        //             data: {
        //                 controller: "user.applogin_do",
        //                 token: s,
        //                 share_id: i,
        //                 nickName: e.userInfo.nickName,
        //                 avatarUrl: e.userInfo.avatarUrl,
        //                 encrypteddata: e.encryptedData,
        //                 iv: e.iv,
        //                 community_id: a
        //             },
        //             method: "post",
        //             dataType: "json",
        //             success: function (e) {
        //                 console.error('我进入的是第二个呢');

        //                 1 == (e.data.isblack || 0) ? (o.globalData.isblack = 1, wx.removeStorageSync("token"), wx.switchTab({
        //                     url: "/lionfish_comshop/pages/index/index"
        //                 })) : (wx.setStorage({
        //                     key: "member_id",
        //                     data: e.data.member_id
        //                 }), console.log("needPosition", r), r && getCommunityInfo()), n(e)
        //             }
        //         })
        //     },
        //     fail: function (e) {
        //         t(e)
        //     }
        // })


    })
}

function stringToJson(e) {
    return JSON.parse(e)
}

function jsonToString(e) {
    return JSON.stringify(e)
}

function imageUtil(e) {
    var o = {},
        i = e.detail.width,
        a = e.detail.height,
        r = a / i;
    return wx.getSystemInfo({
        success: function (e) {
            var t = e.windowWidth,
                n = e.windowHeight;
            r < n / t ? (o.imageWidth = t, o.imageHeight = t * a / i) : (o.imageHeight = n, o.imageWidth = n * i / a)
        }
    }), o
}
var formatTime = function (e) {
        var t = e.getFullYear(),
            n = e.getMonth() + 1,
            o = e.getDate(),
            i = e.getHours(),
            a = e.getMinutes(),
            r = e.getSeconds();
        return [t, n, o].map(formatNumber).join("/") + " " + [i, a, r].map(formatNumber).join(":")
    },
    formatNumber = function (e) {
        return (e = e.toString())[1] ? e : "0" + e
    },
    getCommunityInfo = function () {
        var o = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
            i = getApp(),
            t = wx.getStorageSync("token");
        return new Promise(function (n, e) {
            i.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "index.load_history_community",
                    token: t
                },
                dataType: "json",
                success: function (e) {
                    if (0 == e.data.code) {
                        var t = e.data.list;
                        0 < Object.keys(t).length || 0 != t.communityId ? (wx.setStorageSync("community", t), i.globalData.community = t, n(t)) : n("")
                    } else 1 == e.data.code ? (console.log(o), check_login() && void 0 === o.communityId ? (wx.redirectTo({
                        url: "/lionfish_comshop/pages/position/community"
                    }), n("")) : n(o)) : n("")
                }
            })
        })
    },
    getCommunityById = function (n) {
        return new Promise(function (t, e) {
            getApp().util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "index.get_community_info",
                    community_id: n
                },
                dataType: "json",
                success: function (e) {
                    0 == e.data.code && t(e.data)
                }
            })
        })
    },
    addhistory = function (e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            n = e.communityId;
        console.log("addhistory");
        var o = wx.getStorageSync("token");
        getApp().util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "index.addhistory_community",
                community_id: n,
                token: o
            },
            dataType: "json",
            success: function (e) {
                t && (console.log("新人 社区"), app.util.request({
                    url: "entry/wxapp/index",
                    data: {
                        controller: "index.get_community_info",
                        community_id: n
                    },
                    dataType: "json",
                    success: function (e) {
                        if (0 == e.data.code) {
                            var t = e.data.data;
                            app.globalData.community = t, app.globalData.changedCommunity = !0, wx.setStorage({
                                key: "community",
                                data: t
                            })
                        }
                    }
                }))
            }
        })
    },
    getWxVersion = function () {
        return wx.getSystemInfoSync().SDKVersion
    },
    wxCompareVersion = function (e, t) {
        e = e.split("."), t = t.split(".");
        for (var n = Math.max(e.length, t.length); e.length < n;) e.push("0");
        for (; t.length < n;) t.push("0");
        for (var o = 0; o < n; o++) {
            var i = parseInt(e[o]),
                a = parseInt(t[o]);
            if (a < i) return 1;
            if (i < a) return -1
        }
        return 0
    },
    addCart = function (n) {
        return new Promise(function (i, t) {
            var e = wx.getStorageSync("token");
            getApp().util.request({
                url: "entry/wxapp/user",
                data: _extends({
                    controller: "car.add",
                    token: e
                }, n),
                dataType: "json",
                method: "POST",
                success: function (e) {
                    if (7 == e.data.code) {
                        var t = e.data,
                            n = t.has_image,
                            o = t.pop_vipmember_buyimage;
                        1 == n && o && (e.showVipModal = 1, e.data.pop_vipmember_buyimage = o), i(e)
                    } else i(e)
                },
                fail: function (e) {
                    t(e)
                }
            })
        })
    };
module.exports = {
    formatTime: formatTime,
    login: login,
    check_login: check_login,
    api: api,
    getdomain: getdomain,
    imageUtil: imageUtil,
    jsonToString: jsonToString,
    stringToJson: stringToJson,
    login_prosime: login_prosime,
    getCommunityInfo: getCommunityInfo,
    check_login_new: check_login_new,
    checkRedirectTo: checkRedirectTo,
    getCommunityById: getCommunityById,
    addhistory: addhistory,
    wxGetUserInfo: wxGetUserInfo,
    getWxVersion: getWxVersion,
    wxCompareVersion: wxCompareVersion,
    addCart: addCart
};