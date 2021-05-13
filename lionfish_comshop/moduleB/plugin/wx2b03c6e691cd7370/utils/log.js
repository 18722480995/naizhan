
			    "use strict";

			function e(e) {
			    if (Array.isArray(e)) {
			        for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
			        return i
			    }
			    return Array.from(e)
			}
			function t(e, t) {
			    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}
			var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
			        return typeof e
			    } : function(e) {
			        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
			    }, o = function() {
			        function e(e, t) {
			            for (var i = 0; i < t.length; i++) {
			                var o = t[i];
			                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
			            }
			        }
			        return function(t, i, o) {
			            return i && e(t.prototype, i), o && e(t, o), t
			        }
			    }(),
			    n = wx.getLogManager ? wx.getLogManager() : null,
			    s = function(e) {
			        try {
			            n && n.info.apply(null, e)
			        } catch (e) {
			            console.log("old log error", e)
			        }
			    }, r = {
			        DEBUG: 1,
			        INFO: 2,
			        WARN: 4,
			        ERROR: 8
			    }, a = {
			        ANDROID: 1,
			        IOS: 2
			    }, l = {
			        WEAPP: 1
			    }, g = "",
			    f = function(e) {
			        return function() {
			            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
			            return new Promise(function(i) {
			                var o = t.complete;
			                return t.complete = function(e) {
			                    o && o(e), i(e)
			                }, e.call(wx, t)
			            })
			        }
			    }(wx.operateWXData),
			    u = function(e, t) {
			        if ("string" != typeof e) return 0;
			        var i = 0,
			            o = void 0,
			            n = void 0,
			            s = void 0;
			        if ("utf-16" === (t = t ? t.toLowerCase() : "utf8") || "utf16" === t) for (n = 0, s = e.length; n < s; n++) i += (o = e.charCodeAt(n)) <= 65535 ? 2 : 4;
			        else for (n = 0, s = e.length; n < s; n++) i += (o = e.charCodeAt(n)) <= 127 ? 1 : o <= 2047 ? 2 : o <= 65535 ? 3 : 4;
			        return i
			    }, c = null,
			    h = !1,
			    d = function() {
			        function n() {
			            var e = this,
			                i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
			            t(this, n), this.systemInfo = wx.getSystemInfoSync(), this.opt = {}, this.opt.level = r.INFO, g = i.appid, this._hasNoPermission = void 0 === i.hasPermission || !i.hasPermission, this.isRotate = void 0 === i.isRotate || !! i.isRotate, this.msgList = {}, this.filterList = {}, this.sizeList = {}, this.levelList = {}, this._uploadList = [], this._logInfo = {}, this._logInfo.level = 0, this._logInfo.version = 2, this._logInfo.source = l.WEAPP, this._logInfo.platform = "ios" === this.systemInfo.platform ? a.IOS : a.ANDROID, this._logInfo.libraryVersion = this.systemInfo.SDKVersion, this._logInfo.clientVersion = this.systemInfo.version, this.exceedSizeList = {}, this.analyzeList = {}, this.MaxSize = 10240, this.MaxLogCount = 200, this._logCacheBeforeLogConfig = [], setTimeout(function() {
			                e._getLogConfig()
			            }, 300)
			        }
			        return o(n, [{
			            key: "_getLogConfig",
			            value: function(t, i) {
			                var o = this;
			                return f({
			                    apiName: "GetUploadSetting",
			                    reqData: {}
			                }).then(function(n) {
			                    if (n.rawData) try {
			                        var a = JSON.parse(n.rawData);
			                        o.MaxSize = 1024 * a.MaxLogSize, a.MaxLogCount && (o.MaxLogCount = a.MaxLogCount), o._logInfo.id = a.UserUin, a.OpenId && (o.traceid = a.OpenId + "_" + parseInt(Date.now() / 1e3, 10)), a.Debug && a.Debug.MaxSize && a.Debug.ExpireTime > Date.now() / 1e3 && (o.isDebugMode = !0, o.MaxSize = 1024 * a.Debug.MaxSize, o.opt.level = r.DEBUG, a.Debug.MaxLogCount && (o.MaxLogCount = a.Debug.MaxLogCount));
			                        var l = o._logCacheBeforeLogConfig || [];
			                        o._logCacheBeforeLogConfig = [], l.forEach(function(t) {
			                            o._baseLog.apply(o, [t.key, t.path].concat(e(t.args)))
			                        }), t && o.upload(i)
			                    } catch (e) {
			                        o._hasNoPermission = !0, o._logCacheBeforeLogConfig = []
			                    } else o._hasNoPermission = !0, o._logCacheBeforeLogConfig = [];
			                    s(["GetUploadSetting success log", n])
			                }).
			                catch (function(e) {
			                    e.errMsg && e.errMsg.indexOf("fail invalid scope") >= 0 && (o._hasNoPermission = !0, o._logCacheBeforeLogConfig = []), console.error("getwxalogsetting err", e), o._getConfigFail = !0, s(["GetUploadSetting error", e.errMsg])
			                })
			            }
			        }, {
			            key: "_checkSize",
			            value: function(e, t) {
			                var i = 0;
			                if (!t || !t.length) return !0;
			                if (!e) return !0;
			                t.forEach(function(e) {
			                    i += u(e)
			                }), this.sizeList[e] = this.sizeList[e] || 0;
			                var o = this.sizeList[e];
			                return o + i > this.MaxSize ? i : (this.sizeList[e] = o + i, !0)
			            }
			        }, {
			            key: "_baseLog",
			            value: function(e, t) {
			                for (var o = arguments.length, n = Array(o > 2 ? o - 2 : 0), a = 2; a < o; a++) n[a - 2] = arguments[a];
			                try {
			                    if (!n.length) return;
			                    if (this._hasNoPermission) return;
			                    if (!this._logInfo.id) return void this._logCacheBeforeLogConfig.push({
			                        key: e,
			                        path: t,
			                        args: n
			                    });
			                    var l = r[e.toUpperCase()] || 0;
			                    if (l < this.opt.level) return;
			                    var g = n.map(function(e) {
			                        var t = void 0 === e ? "undefined" : i(e),
			                            o = void 0,
			                            n = "";
			                        if ("function" === t && (o = "function(){}"), "undefined" === t) o = "<Undefined>";
			                        else if ("object" === t) {
			                            n = Object.prototype.toString.call(e), n = n.replace(/^\[object |\]$/g, "");
			                            try {
			                                o = "Error" === n ? e.stack : JSON.stringify(e)
			                            } catch (e) {
			                                n = "Error", o = e.message
			                            }
			                        } else e += "";
			                        return o || e
			                    }),
			                        f = this._checkSize(t, g);
			                    u(g.join("")) >= 5120 && console.warn("UserLog:fail single log exceed size", 5120);
			                    var c = (this.msgList[t] || []).length >= this.MaxLogCount;
			                    c || !0 !== f ? this.isRotate ? (this.upload(t), this._addLogMsg(g, t, l)) : c ? console.warn("UserLog:fail log count exceed max count " + this.MaxLogCount) : (console.warn("UserLog:fail log size exceed maxsize " + this.MaxSize + " will be discard at page " + t + "."), this.exceedSizeList[t] = this.exceedSizeList[t] || 0, this.exceedSizeList[t] || this._addLogMsg(["UserLog:fail Log Size " + f + " Exceed."], t, r.WARN), this.exceedSizeList[t] += f) : this._addLogMsg(g, t, l), s(g)
			                } catch (e) {
			                    console.log("log error", e)
			                }
			            }
			        }, {
			            key: "_addLogMsg",
			            value: function(e, t, i) {
			                if (!h && i) {
			                    var o = t;
			                    if (o) {
			                        this.msgList[o] = this.msgList[o] || [];
			                        var n = this.msgList[o][0],
			                            s = new Date,
			                            r = Math.ceil(+s / 1e3),
			                            a = [n ? r - (n.t || n[0]) : r, e, i, s.getMilliseconds()];
			                        if (!this.msgList[o].length) {
			                            var l = (new Date).getTimezoneOffset();
			                            a.push(l)
			                        }
			                        this.msgList[o].push(a), this.levelList[o] = this.levelList[o] || 0, this.levelList[o] = this.levelList[o] | i
			                    }
			                }
			            }
			        }, {
			            key: "OperateWxUploadLog",
			            value: function(e, t) {
			                if (!h) return f({
			                    apiName: "UploadByApi",
			                    reqData: {
			                        interface: "weapplog",
			                        data: JSON.stringify(e)
			                    }
			                }).then(function(e) {
			                    t && t(!0)
			                }).
			                catch (function(e) {
			                    console.error("webapi_uploadwxalog err", e), e && 1e4 == +e.err_code && (h = !0), t && t(!1)
			                });
			                console.log("Upload fail, Exceed today upload log max count.")
			            }
			        }, {
			            key: "stat",
			            value: function(e) {
			                return e ? this.sizeList[e] || 0 : 0
			            }
			        }, {
			            key: "_hasUploadInterval",
			            value: function() {
			                return !(this._isUploading || Date.now() - this._lastUploadTime < 1e3)
			            }
			        }, {
			            key: "upload",
			            value: function(e) {
			                var t = this;
			                if (e) {
			                    var i = t.msgList[e] || [];
			                    if (i && i.length) {
			                        t.msgList[e] = [];
			                        var o = this.levelList[e] || r.DEBUG;
			                        this.levelList[e] = 0;
			                        t.sizeList[e];
			                        t.sizeList[e] = 0;
			                        var n = t._logInfo;
			                        n.level = o, t.exceedSizeList[e] = 0, this._logInfo.timestamp = Math.ceil(Date.now() / 1e3), t._logInfo = Object.assign({}, this._logInfo), n.msg = JSON.stringify(i), n.analyze = JSON.stringify(this.analyzeList[e] || {}), this.analyzeList[e] = {}, n.appid = g, n.url = e, this.traceid && (n.traceid = this.traceid), n.device = this.systemInfo.model + " " + this.systemInfo.system, n.filter1 = this.filterList[e] || "", this.filterList[e] = "", this._hasUploadInterval() ? (t._isUploading = !0, this.uploadAllMsg(n)) : this._uploadList.push(n)
			                    }
			                }
			            }
			        }, {
			            key: "uploadAllMsg",
			            value: function(e) {
			                var t = this;
			                this.OperateWxUploadLog(e, function(e) {
			                    t._isUploading = !1, t._lastUploadTime = Date.now(), e && t._uploadList.length && (c && clearTimeout(c), c = setTimeout(function() {
			                        c = null, t.uploadAllMsg(t._uploadList.shift())
			                    }, 1e3))
			                })
			            }
			        }, {
			            key: "setFilterMsg",
			            value: function(e, t) {
			                return "string" != typeof t && (t = JSON.stringify(t)), u(t) > 2048 ? (console.log("UserLog set fileter msg fail, exceed max size", 2048), !1) : (this.filterList[e] = t, !0)
			            }
			        }, {
			            key: "setAnalyze",
			            value: function(e, t) {
			                this.analyzeList[e] = t
			            }
			        }, {
			            key: "addFilterMsg",
			            value: function(e, t) {
			                "string" != typeof t && (t = JSON.stringify(t));
			                var i = this.filterList[e] || "";
			                this.setFilterMsg(e, i + (i ? " " : "") + t)
			            }
			        }, {
			            key: "getTraceId",
			            value: function() {
			                return this.traceid || ""
			            }
			        }]), n
			    }(),
			    p = null;
			module.exports = function() {
			    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.page,
			        i = {
			            debug: function() {
			                var e;
			                if (p) {
			                    for (var i = arguments.length, o = Array(i), n = 0; n < i; n++) o[n] = arguments[n];
			                    return (e = p)._baseLog.apply(e, ["debug", t].concat(o))
			                }
			            },
			            info: function() {
			                var e;
			                if (p) {
			                    for (var i = arguments.length, o = Array(i), n = 0; n < i; n++) o[n] = arguments[n];
			                    return (e = p)._baseLog.apply(e, ["info", t].concat(o))
			                }
			            },
			            warn: function() {
			                var e;
			                if (p) {
			                    for (var i = arguments.length, o = Array(i), n = 0; n < i; n++) o[n] = arguments[n];
			                    return (e = p)._baseLog.apply(e, ["warn", t].concat(o))
			                }
			            },
			            error: function() {
			                var e;
			                if (p) {
			                    for (var i = arguments.length, o = Array(i), n = 0; n < i; n++) o[n] = arguments[n];
			                    return (e = p)._baseLog.apply(e, ["error", t].concat(o))
			                }
			            },
			            stat: function() {
			                if (p) return p.stat(t)
			            },
			            setFilterMsg: function(e) {
			                if (p) return p.setFilterMsg(t, e)
			            },
			            addFilterMsg: function(e) {
			                if (p) return p.addFilterMsg(t, e)
			            },
			            in : function(e) {
			                e && e.route && (t = e.route)
			            },
			            upload: function() {
			                p && p.upload(t)
			            },
			            setAnalyze: function(e) {
			                p && p.setAnalyze(t, e)
			            }
			        };
			    return p ? i : (p = new d({
			        appid: e.appid,
			        hasPermission: e.hasPermission
			    }), i)
			};