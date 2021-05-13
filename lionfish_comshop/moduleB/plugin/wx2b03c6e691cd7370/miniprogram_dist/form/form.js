
			    "use strict";
			var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
			        return typeof e
			    } : function(e) {
			        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
			    };
			module.exports = function(t) {
			    function r(e) {
			        if (n[e]) return n[e].exports;
			        var u = n[e] = {
			            i: e,
			            l: !1,
			            exports: {}
			        };
			        return t[e].call(u.exports, u, u.exports, r), u.l = !0, u.exports
			    }
			    var n = {};
			    return r.m = t, r.c = n, r.d = function(e, t, n) {
			        r.o(e, t) || Object.defineProperty(e, t, {
			            enumerable: !0,
			            get: n
			        })
			    }, r.r = function(e) {
			        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
			            value: "Module"
			        }), Object.defineProperty(e, "__esModule", {
			            value: !0
			        })
			    }, r.t = function(t, n) {
			        if (1 & n && (t = r(t)), 8 & n) return t;
			        if (4 & n && "object" === (void 0 === t ? "undefined" : e(t)) && t && t.__esModule) return t;
			        var u = Object.create(null);
			        if (r.r(u), Object.defineProperty(u, "default", {
			            enumerable: !0,
			            value: t
			        }), 2 & n && "string" != typeof t) for (var i in t) r.d(u, i, function(e) {
			            return t[e]
			        }.bind(null, i));
			        return u
			    }, r.n = function(e) {
			        var t = e && e.__esModule ? function() {
			                return e.
			                default
			            } : function() {
			                return e
			            };
			        return r.d(t, "a", t), t
			    }, r.o = function(e, t) {
			        return Object.prototype.hasOwnProperty.call(e, t)
			    }, r.p = "", r(r.s = 2)
			}([function(e, t, r) {
			    Object.defineProperty(t, "__esModule", {
			        value: !0
			    }), t.diff = function(e, t) {
			        if (!e && t || e && !t) return !0;
			        for (var r in t) if (e[r] !== t[r]) return !0;
			        for (var n in e) if (e[n] !== t[n]) return !0;
			        return !1
			    }, t.diffObject = function(e, t) {
			        if (!e && t) return t;
			        if (!t && e) return e;
			        var r = {}, n = !1;
			        for (var u in t) e[u] !== t[u] && (n = !0, r[u] = t[u]);
			        for (var i in e) e[i] !== t[i] && (n = !0, r[i] = t[i]);
			        return n ? r : null
			    }
			}, , function(e, t, r) {
			    function n(e) {
			        e.data.prop && (this.data.formItems[e.data.prop] = e), e.setInForm && e.setInForm(), this.data.firstItem || (this.data.firstItem = e), this.data.firstItem
			    }
			    function u(e) {
			        e.data.prop && delete this.data.formItems[e.data.prop]
			    }
			    Object.defineProperty(t, "__esModule", {
			        value: !0
			    });
			    var i = r(3),
			        o = r(0);
			    Component({
			        properties: {
			            models: {
			                type: Object,
			                value: {},
			                observer: "_modelChange"
			            },
			            rules: {
			                type: Array,
			                value: [],
			                observer: "_rulesChange"
			            },
			            extClass: {
			                type: Boolean,
			                value: ""
			            }
			        },
			        data: {
			            errors: {},
			            formItems: {},
			            firstItem: null
			        },
			        relations: {
			            "../cell/cell": {
			                type: "descendant",
			                linked: n,
			                unlinked: u
			            },
			            "../checkbox-group/checkbox-group": {
			                type: "descendant",
			                linked: n,
			                unlinked: u
			            }
			        },
			        attached: function() {
			            this.initRules(), this.formValidator = new i.
			            default (this.data.models, this.data.newRules)
			        },
			        methods: {
			            initRules: function(e) {
			                var t = {};
			                return (e || this.data.rules).forEach(function(e) {
			                    e.name && e.rules && (t[e.name] = e.rules || [])
			                }), this.setData({
			                    newRules: t
			                }), t
			            },
			            _modelChange: function(e, t, r) {
			                var n = this;
			                if (!this.isInit) return this.isInit = !0, e;
			                this.formValidator.setModel(e), this.isInit = !0;
			                var u = o.diffObject(t, e);
			                return u && function() {
			                    var e = !0,
			                        t = [],
			                        r = {};
			                    for (var i in u)! function(i) {
			                        n.formValidator.validateField(i, u[i], function(n, u) {
			                            u && u[i] && (t.push(u[i]), r[i] = u[i]), e = n
			                        })
			                    }(i);
			                    n._showErrors(u, r), n.triggerEvent(e ? "success" : "fail", e ? {
			                        trigger: "change"
			                    } : {
			                        errors: t,
			                        trigger: "change"
			                    })
			                }(), e
			            },
			            _rulesChange: function(e) {
			                var t = this.initRules(e);
			                return this.formValidator && this.formValidator.setRules(t), e
			            },
			            _showAllErrors: function(e) {
			                for (var t in this.data.newRules) this._showError(t, e && e[t])
			            },
			            _showErrors: function(e, t) {
			                for (var r in e) this._showError(r, t && t[r])
			            },
			            _showError: function(e, t) {
			                var r = this.data.formItems[e];
			                r && r.data.showError && r.setError(t)
			            },
			            validate: function(e) {
			                var t = this;
			                return this.formValidator.validate(function(r, n) {
			                    t._showAllErrors(n);
			                    var u = t.handleErrors(n);
			                    t.triggerEvent(r ? "success" : "fail", r ? {
			                        trigger: "validate"
			                    } : {
			                        errors: u,
			                        trigger: "validate"
			                    }), e && e(r, u)
			                })
			            },
			            validateField: function(e, t) {
			                var r = this,
			                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function(e) {
			                        arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
			                    };
			                return this.formValidator.validateField(e, t, function(t, u) {
			                    r._showError(e, u);
			                    var i = r.handleErrors(u);
			                    r.triggerEvent(t ? "success" : "fail", t ? {
			                        trigger: "validate"
			                    } : {
			                        errors: i,
			                        trigger: "validate"
			                    }), n && n(t, i)
			                })
			            },
			            handleErrors: function(e) {
			                if (e) {
			                    var t = [];
			                    return this.data.rules.forEach(function(r) {
			                        e[r.name] && (e.name = r.name, t.push(e[r.name]))
			                    }), t
			                }
			                return e
			            },
			            addMethod: function(e, t) {
			                return this.formValidator.addMethod(e, t)
			            }
			        }
			    }), t.
			    default = i.
			    default
			}, function(e, t, r) {
			    function n(e, t) {
			        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			    }
			    Object.defineProperty(t, "__esModule", {
			        value: !0
			    });
			    var u = r(4),
			        i = r(0),
			        o = Object.prototype.toString,
			        a = function(e, t) {
			            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
			                n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
			                i = "";
			            for (var o in e) if ("validator" !== o && "name" !== o && "message" !== o) {
			                var a = void 0 !== e.validator ? e.validator : u.
			                default [o];
			                if ("function" == typeof a && (i = a({
			                    name: e.name,
			                    message: e.message
			                }, t, r, n))) return i
			            }
			            return i
			        }, F = function() {
			            function e(t, r) {
			                n(this, e), this.models = t, this.rules = r, this.errors = {}
			            }
			            return e.prototype.validate = function(e) {
			                var t = this;
			                return new Promise(function(r) {
			                    var n = 0,
			                        u = 0,
			                        o = t.errors,
			                        a = t.models,
			                        F = !1;
			                    for (var s in t.rules)! function(e) {
			                        ! function(r) {
			                            var s = o[r];
			                            t._innerValidateField(e, a[r], function(e, t) {
			                                n++, e || u++, i.diff(s, t) && (o[r] = t, F = !0)
			                            })
			                        }(e)
			                    }(s);
			                    Object.keys(o).forEach(function(e) {
			                        o[e] || delete o[e]
			                    }), r({
			                        isValid: !u,
			                        errors: u ? o : void 0
			                    }), e && e(!u, u ? o : void 0)
			                })
			            }, e.prototype.validateField = function(e, t) {
			                var r = this,
			                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function(e) {
			                        arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
			                    };
			                return new Promise(function(u) {
			                    r._innerValidateField(e, t, function(t, o) {
			                        var a = {};
			                        a[e] = o, u({
			                            valid: t,
			                            error: t ? void 0 : o
			                        }), n(t, t ? void 0 : a);
			                        var F = r.errors[e];
			                        i.diff(F, o) && (o || delete r.errors[e], r.errors[e] = o)
			                    })
			                })
			            }, e.prototype._innerValidateField = function(e, t) {
			                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function(e) {
			                        arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
			                    }, n = this.rules[e];
			                if (!n) return console.warn("[form-validtor] rule name " + e + " not exists."), void r(!0);
			                "function" == typeof t && (r = t, t = void 0);
			                var u = !1,
			                    i = this.models;
			                if ("[object Array]" === o.call(n)) n.forEach(function(n) {
			                    n.name = e;
			                    var o = a(n, t || i[e], n.param, i);
			                    return !o || (u = !0, r(!1, o ? {
			                        message: o,
			                        rule: n
			                    } : void 0), !1)
			                }), r(!u);
			                else {
			                    var F = n;
			                    F.name = e;
			                    var s = a(F, t || i[e], F.param, i),
			                        f = s ? {
			                            message: s,
			                            rule: F
			                        } : void 0;
			                    s && (u = !0), r(!u, f)
			                }
			            }, e.prototype.addMethod = function(e, t) {
			                u.
			                default [e] = t
			            }, e.prototype.setModel = function(e) {
			                this.models = e
			            }, e.prototype.setRules = function(e) {
			                this.rules = e
			            }, e
			        }();
			    t.
			    default = F
			}, function(e, t, r) {
			    Object.defineProperty(t, "__esModule", {
			        value: !0
			    });
			    var n = r(5),
			        u = {
			            required: "%s必填",
			            minlength: "长度最少为%s",
			            maxlength: "长度最大为%s",
			            rangelength: "长度在%s和%s之间",
			            bytelength: "最多只能输入%s个字",
			            min: "值最小为%s",
			            max: "值最大为%s",
			            range: "值的范围为%s和%s之间",
			            mobile: "请输入正确的手机号",
			            email: "请输入正确的电子邮件",
			            url: "请输入正确的URL地址",
			            equalTo: "值和字段%s不相等"
			        };
			    t.
			    default = {
			        required: function(e, t, r, i) {
			            if (!t) return n.sprintf(e.message || u.required, e.name)
			        },
			        minlength: function(e, t, r) {
			            if ((t = t || "").length < r) return n.sprintf(e.message || u.minlength, r)
			        },
			        maxlength: function(e, t, r) {
			            if ((t = t || "").length > r) return n.sprintf(e.message || u.maxlength, r)
			        },
			        rangelength: function(e, t, r) {
			            if ((t = t || "").length > r[1] || t.length < r[0]) return n.sprintf(e.message || u.rangelength, r[0], r[1])
			        },
			        min: function(e, t, r) {
			            if (t < r) return n.sprintf(e.message || u.min, r)
			        },
			        max: function(e, t, r) {
			            if (t > r) return n.sprintf(e.message || u.max, r)
			        },
			        range: function(e, t, r) {
			            if (t < r[0] || t > r[1]) return n.sprintf(e.message || u.range, r[0], r[1])
			        },
			        mobile: function(e, t) {
			            if (11 !== (t = t || "").length) return n.sprintf(e.message || u.mobile)
			        },
			        email: function(e, t) {
			            if (!/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)) return n.sprintf(e.message || u.email)
			        },
			        url: function(e, t) {
			            if (!/^(https?|s?ftp|weixin):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)) return e.message || u.url
			        },
			        equalTo: function(e, t, r, i) {
			            if (t !== i[r]) return n.sprintf(e.message || u.equalTo, e.name)
			        },
			        bytelength: function(e, t, r, i) {
			            if (t.replace(/[^\x00-\xff]/g, "**").length > r) return n.sprintf(e.message || u.bytelength, r)
			        }
			    }
			}, function(e, t, r) {
			    Object.defineProperty(t, "__esModule", {
			        value: !0
			    }), t.sprintf = function() {
			        for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
			        var n = void 0,
			            u = t[0] || "",
			            i = void 0,
			            o = void 0,
			            a = t.length - 1;
			        if (a < 1) return u;
			        for (n = 1; n < a + 1;) u = u.replace(/%s/, "{#" + n + "#}"), n++;
			        for (u.replace("%s", ""), n = 1;;) {
			            if (void 0 === (i = t[n])) break;
			            o = new RegExp("{#" + n + "#}", "g"), u = u.replace(o, i), n++
			        }
			        return u
			    }
			}]);