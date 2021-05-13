
			    "use strict";
			var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
			        return typeof t
			    } : function(t) {
			        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			    };
			! function(t, e) {
			    for (var s in e) t[s] = e[s]
			}(exports, function(e) {
			    function s(t) {
			        if (i[t]) return i[t].exports;
			        var a = i[t] = {
			            i: t,
			            l: !1,
			            exports: {}
			        };
			        return e[t].call(a.exports, a, a.exports, s), a.l = !0, a.exports
			    }
			    var i = {};
			    return s.m = e, s.c = i, s.d = function(t, e, i) {
			        s.o(t, e) || Object.defineProperty(t, e, {
			            enumerable: !0,
			            get: i
			        })
			    }, s.r = function(t) {
			        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
			            value: "Module"
			        }), Object.defineProperty(t, "__esModule", {
			            value: !0
			        })
			    }, s.t = function(e, i) {
			        if (1 & i && (e = s(e)), 8 & i) return e;
			        if (4 & i && "object" == (void 0 === e ? "undefined" : t(e)) && e && e.__esModule) return e;
			        var a = Object.create(null);
			        if (s.r(a), Object.defineProperty(a, "default", {
			            enumerable: !0,
			            value: e
			        }), 2 & i && "string" != typeof e) for (var r in e) s.d(a, r, function(t) {
			            return e[t]
			        }.bind(null, r));
			        return a
			    }, s.n = function(t) {
			        var e = t && t.__esModule ? function() {
			                return t.
			                default
			            } : function() {
			                return t
			            };
			        return s.d(e, "a", e), e
			    }, s.o = function(t, e) {
			        return Object.prototype.hasOwnProperty.call(t, e)
			    }, s.p = "", s(s.s = 1)
			}([function(t, e, s) {
			    function i(t, e) {
			        for (var s = 0; s < e.length; s++) {
			            var i = e[s];
			            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
			        }
			    }
			    function a(t, e, s) {
			        return e in t ? Object.defineProperty(t, e, {
			            value: s,
			            enumerable: !0,
			            configurable: !0,
			            writable: !0
			        }) : t[e] = s, t
			    }
			    function r(t) {
			        if ("function" == typeof this["on".concat(t)]) {
			            for (var e = arguments.length, s = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++) s[i - 1] = arguments[i];
			            this["on".concat(t)].apply(this, s)
			        }
			    }
			    function n(t) {
			        this.readyState = t, r.call(this, "readystatechange")
			    }
			    function o() {}
			    function h(t) {
			        return "canvas" === t ? {
			            getContext: function() {
			                return {
			                    fillRect: o
			                }
			            }
			        } : "img" === t ? function(t) {
			            if (void 0 === t.createImage) return {};
			            var e = t.createImage();
			            return e.addEventListener = e.addEventListener || function(t, s) {
			                "load" === t ? e.onload = function() {
			                    setTimeout(s, 0)
			                } : "error" === t && (e.onerror = s)
			            }, e
			        }(this) : void 0
			    }
			    function l(t, e) {
			        return function(s) {
			            return e.call(t, Array.from(s))
			        }
			    }
			    function p(t, e) {
			        return function() {
			            return e.call(t)
			        }
			    }
			    function f(t, e, s) {
			        var i = t[e];
			        Object.defineProperty(t, e, {
			            get: function() {
			                return s(t, i)
			            },
			            configurable: !0,
			            enumerable: !0
			        })
			    }
			    var c = new WeakMap,
			        m = new WeakMap,
			        d = new WeakMap,
			        u = new WeakMap,
			        g = new WeakMap,
			        v = function() {
			            function t() {
			                ! function(t, e) {
			                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
			                }(this, t), a(this, "onabort", null), a(this, "onerror", null), a(this, "onload", null), a(this, "onloadstart", null), a(this, "onprogress", null), a(this, "ontimeout", null), a(this, "onloadend", null), a(this, "onreadystatechange", null), a(this, "readyState", 0), a(this, "response", null), a(this, "responseText", null), a(this, "responseType", ""), a(this, "responseXML", null), a(this, "status", 0), a(this, "statusText", ""), a(this, "upload", {}), a(this, "withCredentials", !1), d.set(this, {
			                    "content-type": "application/x-www-form-urlencoded"
			                }), u.set(this, {})
			            }
			            var e, s;
			            return e = t, (s = [{
			                key: "abort",
			                value: function() {
			                    var t = g.get(this);
			                    t && t.abort()
			                }
			            }, {
			                key: "getAllResponseHeaders",
			                value: function() {
			                    var t = u.get(this);
			                    return Object.keys(t).map(function(e) {
			                        return "".concat(e, ": ").concat(t[e])
			                    }).join("\n")
			                }
			            }, {
			                key: "getResponseHeader",
			                value: function(t) {
			                    return u.get(this)[t]
			                }
			            }, {
			                key: "open",
			                value: function(e, s) {
			                    m.set(this, e), c.set(this, s), n.call(this, t.OPENED)
			                }
			            }, {
			                key: "overrideMimeType",
			                value: function() {}
			            }, {
			                key: "send",
			                value: function() {
			                    var e = this,
			                        s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
			                    if (this.readyState !== t.OPENED) throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.");
			                    wx.request({
			                        data: s,
			                        url: c.get(this),
			                        method: m.get(this),
			                        header: d.get(this),
			                        success: function(s) {
			                            var i = s.data,
			                                a = s.statusCode,
			                                o = s.header;
			                            if ("string" != typeof i && !(i instanceof ArrayBuffer)) try {
			                                i = JSON.stringify(i)
			                            } catch (t) {}
			                            if (e.status = a, u.set(e, o), r.call(e, "loadstart"), n.call(e, t.HEADERS_RECEIVED), n.call(e, t.LOADING), e.response = i, i instanceof ArrayBuffer) {
			                                e.responseText = "";
			                                for (var h = new Uint8Array(i), l = h.byteLength, p = 0; p < l; p++) e.responseText += String.fromCharCode(h[p])
			                            } else e.responseText = i;
			                            n.call(e, t.DONE), r.call(e, "load"), r.call(e, "loadend")
			                        },
			                        fail: function(t) {
			                            var s = t.errMsg; - 1 !== s.indexOf("abort") ? r.call(e, "abort") : r.call(e, "error", s), r.call(e, "loadend")
			                        }
			                    })
			                }
			            }, {
			                key: "setRequestHeader",
			                value: function(t, e) {
			                    var s = d.get(this);
			                    s[t] = e, d.set(this, s)
			                }
			            }]) && i(e.prototype, s), t
			        }();
			    a(v, "UNSEND", 0), a(v, "OPENED", 1), a(v, "HEADERS_RECEIVED", 2), a(v, "LOADING", 3), a(v, "DONE", 4), s.d(e, "b", function() {
			        return _
			    }), s.d(e, "a", function() {
			        return b
			    });
			    var y = wx.getSystemInfoSync(),
			        b = {};
			    b.window = {
			        devicePixelRatio: y.pixelRatio
			    }, b.document = b.window.document = {
			        body: {},
			        createElement: h
			    }, b.navigator = b.window.navigator = {
			        userAgent: ""
			    }, XMLHttpRequest = v;
			    var _ = function(t) {
			        var e = b.window,
			            s = b.document;
			        e.requestAnimationFrame = t.requestAnimationFrame.bind(t), e.cancelAnimationFrame = t.cancelAnimationFrame.bind(t), s.createElement = h.bind(t);
			        var i = t.getContext("2d");
			        i.canvas || (i.canvas = t), f(i, "setLineDash", l), f(i, "fill", p)
			    }
			}, function(e, s, i) {
			    i.r(s),
			    function(e) {
			        function a(e) {
			            return (a = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
			                return void 0 === e ? "undefined" : t(e)
			            } : function(e) {
			                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e)
			            })(e)
			        }
			        var r = i(0),
			            n = r.a.window,
			            o = r.a.document,
			            h = r.a.navigator;
			        void 0 !== h && function(t, s) {
			            "object" === a(e) && e.exports ? e.exports = function() {
			                return s(t)
			            } : (t.lottie = function() {
			                return s(t)
			            }, t.bodymovin = t.lottie)
			        }(n || {}, function(t) {
			            function e(t) {
			                t && Math.round
			            }
			            function s(t, e, s, i) {
			                this.type = t, this.currentTime = e, this.totalTime = s, this.direction = i < 0 ? -1 : 1
			            }
			            function i(t, e, s) {
			                this.type = t, this.direction = e < 0 ? -1 : 1, this.fps = s || 0
			            }
			            function n(t, e, s, i) {
			                this.type = t, this.currentLoop = s, this.totalLoops = e, this.direction = i < 0 ? -1 : 1
			            }
			            function l(t, e, s) {
			                this.type = t, this.firstFrame = e, this.totalFrames = s
			            }
			            function p(t, e) {
			                this.type = t, this.target = e
			            }
			            function f(t, e) {
			                this.type = "renderFrameError", this.nativeError = t, this.currentTime = e
			            }
			            function c(t) {
			                this.type = "configError", this.nativeError = t
			            }
			            function m(t, e, s) {
			                var i, a, r, n, o, h, l, p;
			                switch (h = s * (1 - e), l = s * (1 - (o = 6 * t - (n = Math.floor(6 * t))) * e), p = s * (1 - (1 - o) * e), n % 6) {
			                    case 0:
			                        i = s, a = p, r = h;
			                        break;
			                    case 1:
			                        i = l, a = s, r = h;
			                        break;
			                    case 2:
			                        i = h, a = s, r = p;
			                        break;
			                    case 3:
			                        i = h, a = l, r = s;
			                        break;
			                    case 4:
			                        i = p, a = h, r = s;
			                        break;
			                    case 5:
			                        i = s, a = h, r = l
			                }
			                return [i, a, r]
			            }
			            function d(t, e, s) {
			                var i, a = Math.max(t, e, s),
			                    r = Math.min(t, e, s),
			                    n = a - r,
			                    o = 0 === a ? 0 : n / a,
			                    h = a / 255;
			                switch (a) {
			                    case r:
			                        i = 0;
			                        break;
			                    case t:
			                        i = e - s + n * (e < s ? 6 : 0), i /= 6 * n;
			                        break;
			                    case e:
			                        i = s - t + 2 * n, i /= 6 * n;
			                        break;
			                    case s:
			                        i = t - e + 4 * n, i /= 6 * n
			                }
			                return [i, o, h]
			            }
			            function u(t, e) {
			                var s = d(255 * t[0], 255 * t[1], 255 * t[2]);
			                return s[1] += e, s[1] > 1 ? s[1] = 1 : s[1] <= 0 && (s[1] = 0), m(s[0], s[1], s[2])
			            }
			            function g(t, e) {
			                var s = d(255 * t[0], 255 * t[1], 255 * t[2]);
			                return s[2] += e, s[2] > 1 ? s[2] = 1 : s[2] < 0 && (s[2] = 0), m(s[0], s[1], s[2])
			            }
			            function v(t, e) {
			                var s = d(255 * t[0], 255 * t[1], 255 * t[2]);
			                return s[0] += e / 360, s[0] > 1 ? s[0] -= 1 : s[0] < 0 && (s[0] += 1), m(s[0], s[1], s[2])
			            }
			            function y() {}
			            function b(t) {
			                return Array.apply(null, {
			                    length: t
			                })
			            }
			            function _(t) {
			                return o.createElement(t)
			            }
			            function k() {}
			            function x(t, e) {
			                var s, i, a = t.length;
			                for (s = 0; s < a; s += 1) for (var r in i = t[s].prototype) i.hasOwnProperty(r) && (e.prototype[r] = i[r])
			            }
			            function P() {
			                this.c = !1, this._length = 0, this._maxLength = 8, this.v = b(this._maxLength), this.o = b(this._maxLength), this.i = b(this._maxLength)
			            }
			            function D() {}
			            function C() {}
			            function T() {}
			            function S() {}
			            function w() {
			                this._length = 0, this._maxLength = 4, this.shapes = b(this._maxLength)
			            }
			            function M(t, e, s, i) {
			                this.elem = t, this.frameId = -1, this.dataProps = b(e.length), this.renderer = s, this.k = !1, this.dashStr = "", this.dashArray = Dt("float32", e.length ? e.length - 1 : 0), this.dashoffset = Dt("float32", 1), this.initDynamicPropertyContainer(i);
			                var a, r, n = e.length || 0;
			                for (a = 0; a < n; a += 1) r = It.getProp(t, e[a].v, 0, 0, this), this.k = r.k || this.k, this.dataProps[a] = {
			                    n: e[a].n,
			                    p: r
			                };
			                this.k || this.getValue(!0), this._isAnimated = this.k
			            }
			            function F(t, e, s) {
			                this.data = e, this.c = Dt("uint8c", 4 * e.p);
			                var i = e.k.k[0].s ? e.k.k[0].s.length - 4 * e.p : e.k.k.length - 4 * e.p;
			                this.o = Dt("float32", i), this._cmdf = !1, this._omdf = !1, this._collapsable = this.checkCollapsable(), this._hasOpacity = i, this.initDynamicPropertyContainer(s), this.prop = It.getProp(t, e.k, 1, null, this), this.k = this.prop.k, this.getValue(!0)
			            }
			            function A(t, e, s) {
			                this._isFirstFrame = !0, this._hasMaskedPath = !1, this._frameId = -1, this._textData = t, this._renderType = e, this._elem = s, this._animatorsData = b(this._textData.a.length), this._pathData = {}, this._moreOptions = {
			                    alignment: {}
			                }, this.renderedLetters = [], this.lettersChangedFlag = !1, this.initDynamicPropertyContainer(s)
			            }
			            function I(t, e, s) {
			                var i = {
			                    propType: !1
			                }, a = It.getProp,
			                    r = e.a;
			                this.a = {
			                    r: r.r ? a(t, r.r, 0, kt, s) : i,
			                    rx: r.rx ? a(t, r.rx, 0, kt, s) : i,
			                    ry: r.ry ? a(t, r.ry, 0, kt, s) : i,
			                    sk: r.sk ? a(t, r.sk, 0, kt, s) : i,
			                    sa: r.sa ? a(t, r.sa, 0, kt, s) : i,
			                    s: r.s ? a(t, r.s, 1, .01, s) : i,
			                    a: r.a ? a(t, r.a, 1, 0, s) : i,
			                    o: r.o ? a(t, r.o, 0, .01, s) : i,
			                    p: r.p ? a(t, r.p, 1, 0, s) : i,
			                    sw: r.sw ? a(t, r.sw, 0, 0, s) : i,
			                    sc: r.sc ? a(t, r.sc, 1, 0, s) : i,
			                    fc: r.fc ? a(t, r.fc, 1, 0, s) : i,
			                    fh: r.fh ? a(t, r.fh, 0, 0, s) : i,
			                    fs: r.fs ? a(t, r.fs, 0, .01, s) : i,
			                    fb: r.fb ? a(t, r.fb, 0, .01, s) : i,
			                    t: r.t ? a(t, r.t, 0, 0, s) : i
			                }, this.s = Wt.getTextSelectorProp(t, e.s, s), this.s.t = e.s.t
			            }
			            function L(t, e, s, i, a, r) {
			                this.o = t, this.sw = e, this.sc = s, this.fc = i, this.m = a, this.p = r, this._mdf = {
			                    o: !0,
			                    sw: !! e,
			                    sc: !! s,
			                    fc: !! i,
			                    m: !0,
			                    p: !0
			                }
			            }
			            function E(t, e) {
			                this._frameId = ct, this.pv = "", this.v = "", this.kf = !1, this._isFirstFrame = !0, this._mdf = !1, this.data = e, this.elem = t, this.comp = this.elem.comp, this.keysIndex = 0, this.canResize = !1, this.minimumFontSize = 1, this.effectsSequence = [], this.currentData = {
			                    ascent: 0,
			                    boxWidth: this.defaultBoxWidth,
			                    f: "",
			                    fStyle: "",
			                    fWeight: "",
			                    fc: "",
			                    j: "",
			                    justifyOffset: "",
			                    l: [],
			                    lh: 0,
			                    lineWidths: [],
			                    ls: "",
			                    of: "",
			                    s: "",
			                    sc: "",
			                    sw: 0,
			                    t: 0,
			                    tr: 0,
			                    sz: 0,
			                    ps: null,
			                    fillColorAnim: !1,
			                    strokeColorAnim: !1,
			                    strokeWidthAnim: !1,
			                    yOffset: 0,
			                    finalSize: 0,
			                    finalText: [],
			                    finalLineHeight: 0,
			                    __complete: !1
			                }, this.copyData(this.currentData, this.data.d.k[0].s), this.searchProperty() || this.completeTextData(this.currentData)
			            }
			            function R() {}
			            function O(e, s) {
			                this.animationItem = e, this.renderConfig = {
			                    clearAnimation: !(!s || void 0 === s.clearAnimation) && s.clearAnimation,
			                    transformPerformance: s && void 0 !== s.transformPerformance ? s.transformPerformance : "default",
			                    clearCanvas: !s || void 0 === s.clearCanvas || s.clearCanvas,
			                    context: s && s.context || null,
			                    progressiveLoad: s && s.progressiveLoad || !1,
			                    preserveAspectRatio: s && s.preserveAspectRatio || "xMidYMid meet",
			                    imagePreserveAspectRatio: s && s.imagePreserveAspectRatio || "xMidYMid slice",
			                    className: s && s.className || ""
			                }, this.renderConfig.dpr = s && s.dpr || 1, this.animationItem.wrapper && (this.renderConfig.dpr = s && s.dpr || t.devicePixelRatio || 1), this.renderedFrame = -1, this.globalData = {
			                    frameNum: -1,
			                    _mdf: !1,
			                    renderConfig: this.renderConfig,
			                    currentGlobalAlpha: -1
			                }, this.contextData = new tt, this.elements = [], this.pendingElements = [], this.transformMat = new St, this.completeLayers = !1, this.rendererType = "canvas"
			            }
			            function N(t, e, s) {
			                this.data = t, this.element = e, this.globalData = s, this.storedData = [], this.masksProperties = this.data.masksProperties || [], this.maskElement = null;
			                var i, a = this.globalData.defs,
			                    r = this.masksProperties ? this.masksProperties.length : 0;
			                this.viewData = b(r), this.solidPath = "";
			                var n, o, h, l, p, f, c, m = this.masksProperties,
			                    d = 0,
			                    u = [],
			                    g = Pt(),
			                    v = "clipPath",
			                    y = "clip-path";
			                for (i = 0; i < r; i++) if (("a" !== m[i].mode && "n" !== m[i].mode || m[i].inv || 100 !== m[i].o.k || m[i].o.x) && (v = "mask", y = "mask"), "s" != m[i].mode && "i" != m[i].mode || 0 !== d ? l = null : ((l = createNS("rect")).setAttribute("fill", "#ffffff"), l.setAttribute("width", this.element.comp.data.w || 0), l.setAttribute("height", this.element.comp.data.h || 0), u.push(l)), n = createNS("path"), "n" != m[i].mode) {
			                    var _;
			                    if (d += 1, n.setAttribute("fill", "s" === m[i].mode ? "#000000" : "#ffffff"), n.setAttribute("clip-rule", "nonzero"), 0 !== m[i].x.k ? (v = "mask", y = "mask", c = It.getProp(this.element, m[i].x, 0, null, this.element), _ = Pt(), (p = createNS("filter")).setAttribute("id", _), (f = createNS("feMorphology")).setAttribute("operator", "erode"), f.setAttribute("in", "SourceGraphic"), f.setAttribute("radius", "0"), p.appendChild(f), a.appendChild(p), n.setAttribute("stroke", "s" === m[i].mode ? "#000000" : "#ffffff")) : (f = null, c = null), this.storedData[i] = {
			                        elem: n,
			                        x: c,
			                        expan: f,
			                        lastPath: "",
			                        lastOperator: "",
			                        filterId: _,
			                        lastRadius: 0
			                    }, "i" == m[i].mode) {
			                        h = u.length;
			                        var k = createNS("g");
			                        for (o = 0; o < h; o += 1) k.appendChild(u[o]);
			                        var x = createNS("mask");
			                        x.setAttribute("mask-type", "alpha"), x.setAttribute("id", g + "_" + d), x.appendChild(n), a.appendChild(x), k.setAttribute("mask", "url(" + ft + "#" + g + "_" + d + ")"), u.length = 0, u.push(k)
			                    } else u.push(n);
			                    m[i].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[i] = {
			                        elem: n,
			                        lastPath: "",
			                        op: It.getProp(this.element, m[i].o, 0, .01, this.element),
			                        prop: Ot.getShapeProp(this.element, m[i], 3),
			                        invRect: l
			                    }, this.viewData[i].prop.k || this.drawPath(m[i], this.viewData[i].prop.v, this.viewData[i])
			                } else this.viewData[i] = {
			                    op: It.getProp(this.element, m[i].o, 0, .01, this.element),
			                    prop: Ot.getShapeProp(this.element, m[i], 3),
			                    elem: n,
			                    lastPath: ""
			                }, a.appendChild(n);
			                for (this.maskElement = createNS(v), r = u.length, i = 0; i < r; i += 1) this.maskElement.appendChild(u[i]);
			                d > 0 && (this.maskElement.setAttribute("id", g), this.element.maskedElement.setAttribute(y, "url(" + ft + "#" + g + ")"), a.appendChild(this.maskElement)), this.viewData.length && this.element.addRenderableComponent(this)
			            }
			            function V() {}
			            function z() {}
			            function q() {}
			            function j() {}
			            function W() {}
			            function Y(t, e) {
			                this.elem = t, this.pos = e
			            }
			            function B() {
			                this.sequences = {}, this.sequenceList = [], this.transform_key_count = 0
			            }
			            function X(t, e, s, i) {
			                this.styledShapes = [], this.tr = [0, 0, 0, 0, 0, 0];
			                var a = 4;
			                "rc" == e.ty ? a = 5 : "el" == e.ty ? a = 6 : "sr" == e.ty && (a = 7), this.sh = Ot.getShapeProp(t, e, a, t);
			                var r, n, o = s.length;
			                for (r = 0; r < o; r += 1) s[r].closed || (n = {
			                    transforms: i.addTransformSequence(s[r].transforms),
			                    trNodes: []
			                }, this.styledShapes.push(n), s[r].elements.push(n))
			            }
			            function H() {}
			            function G(t, e, s) {
			                this.initFrame(), this.initBaseData(t, e, s), this.initFrame(), this.initTransform(t, e, s), this.initHierarchy()
			            }
			            function K() {}
			            function J() {}
			            function Z() {}
			            function U(t, e, s) {
			                this.assetData = e.getAssetData(t.refId), this.initElement(t, e, s), this.sourceRect = {
			                    top: 0,
			                    left: 0,
			                    width: this.assetData.w,
			                    height: this.assetData.h
			                }
			            }
			            function Q(t, e, s) {
			                this.initElement(t, e, s)
			            }
			            function $(t, e, s) {
			                this.initElement(t, e, s)
			            }
			            function tt() {
			                this.saved = [], this.cArrPos = 0, this.cTr = new St, this.cO = 1;
			                var t;
			                for (this.savedOp = Dt("float32", 15), t = 0; t < 15; t += 1) this.saved[t] = Dt("float32", 16);
			                this._length = 15
			            }
			            function et() {}
			            function st(t, e, s) {
			                this.assetData = e.getAssetData(t.refId), this.img = e.imageLoader.getImage(this.assetData), this.initElement(t, e, s)
			            }
			            function it(t, e, s) {
			                this.completeLayers = !1, this.layers = t.layers, this.pendingElements = [], this.elements = b(this.layers.length), this.initElement(t, e, s), this.tm = t.tm ? It.getProp(this, t.tm, 0, e.frameRate, this) : {
			                    _placeholder: !0
			                }
			            }
			            function at(t, e) {
			                this.data = t, this.element = e, this.masksProperties = this.data.masksProperties || [], this.viewData = b(this.masksProperties.length);
			                var s, i = this.masksProperties.length,
			                    a = !1;
			                for (s = 0; s < i; s++) "n" !== this.masksProperties[s].mode && (a = !0), this.viewData[s] = Ot.getShapeProp(this.element, this.masksProperties[s], 3);
			                this.hasMasks = a, a && this.element.addRenderableComponent(this)
			            }
			            function rt(t, e, s) {
			                this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.itemsData = [], this.prevViewData = [], this.shapeModifiers = [], this.processedElements = [], this.transformsManager = new B, this.initElement(t, e, s)
			            }
			            function nt(t, e, s) {
			                this.initElement(t, e, s)
			            }
			            function ot(t, e, s) {
			                this.textSpans = [], this.yOffset = 0, this.fillColorAnim = !1, this.strokeColorAnim = !1, this.strokeWidthAnim = !1, this.stroke = !1, this.fill = !1, this.justifyOffset = 0, this.currentRender = null, this.renderType = "canvas", this.values = {
			                    fill: "rgba(0,0,0,0)",
			                    stroke: "rgba(0,0,0,0)",
			                    sWidth: 0,
			                    fValue: ""
			                }, this.initElement(t, e, s)
			            }
			            function ht() {}
			            function lt() {}
			            function pt() {
			                Zt.searchAnimations()
			            }
			            var ft = "",
			                ct = -999999,
			                mt = !0,
			                dt = [],
			                ut = (/^((?!chrome|android).)*safari/i.test(h.userAgent), Math.round, Math.pow),
			                gt = Math.sqrt,
			                vt = (Math.abs, Math.floor),
			                yt = (Math.max, Math.min),
			                bt = {};
			            ! function() {
			                var t, e = ["abs", "acos", "acosh", "asin", "asinh", "atan", "atanh", "atan2", "ceil", "cbrt", "expm1", "clz32", "cos", "cosh", "exp", "floor", "fround", "hypot", "imul", "log", "log1p", "log2", "log10", "max", "min", "pow", "random", "round", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "trunc", "E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"],
			                    s = e.length;
			                for (t = 0; t < s; t += 1) bt[e[t]] = Math[e[t]]
			            }(), bt.random = Math.random, bt.abs = function(t) {
			                if ("object" === a(t) && t.length) {
			                    var e, s = b(t.length),
			                        i = t.length;
			                    for (e = 0; e < i; e += 1) s[e] = Math.abs(t[e]);
			                    return s
			                }
			                return Math.abs(t)
			            };
			            var _t = 150,
			                kt = Math.PI / 180;
			            e(!1);
			            var xt, Pt = (xt = 0, function() {
			                return "__lottie_element_" + ++xt
			            });
			            ! function() {
			                var t, e, s = [];
			                for (t = 0; t < 256; t += 1) e = t.toString(16), s[t] = 1 == e.length ? "0" + e : e
			            }(), y.prototype = {
			                triggerEvent: function(t, e) {
			                    if (this._cbs[t]) for (var s = this._cbs[t].length, i = 0; i < s; i++) this._cbs[t][i](e)
			                },
			                addEventListener: function(t, e) {
			                    return this._cbs[t] || (this._cbs[t] = []), this._cbs[t].push(e),
			                    function() {
			                        this.removeEventListener(t, e)
			                    }.bind(this)
			                },
			                removeEventListener: function(t, e) {
			                    if (e) {
			                        if (this._cbs[t]) {
			                            for (var s = 0, i = this._cbs[t].length; s < i;) this._cbs[t][s] === e && (this._cbs[t].splice(s, 1), s -= 1, i -= 1), s += 1;
			                            this._cbs[t].length || (this._cbs[t] = null)
			                        }
			                    } else this._cbs[t] = null
			                }
			            };
			            var Dt = "function" == typeof Uint8ClampedArray && "function" == typeof Float32Array ? function(t, e) {
			                    return "float32" === t ? new Float32Array(e) : "int16" === t ? new Int16Array(e) : "uint8c" === t ? new Uint8ClampedArray(e) : void 0
			                } : function(t, e) {
			                    var s, i = 0,
			                        a = [];
			                    switch (t) {
			                        case "int16":
			                        case "uint8c":
			                            s = 1;
			                            break;
			                        default:
			                            s = 1.1
			                    }
			                    for (i = 0; i < e; i += 1) a.push(s);
			                    return a
			                };
			            k.prototype = {
			                addDynamicProperty: function(t) {
			                    -1 === this.dynamicProperties.indexOf(t) && (this.dynamicProperties.push(t), this.container.addDynamicProperty(this), this._isAnimated = !0)
			                },
			                iterateDynamicProperties: function() {
			                    this._mdf = !1;
			                    var t, e = this.dynamicProperties.length;
			                    for (t = 0; t < e; t += 1) this.dynamicProperties[t].getValue(), this.dynamicProperties[t]._mdf && (this._mdf = !0)
			                },
			                initDynamicPropertyContainer: function(t) {
			                    this.container = t, this.dynamicProperties = [], this._mdf = !1, this._isAnimated = !1
			                }
			            };
			            var Ct, Tt = (Ct = {
			                0: "source-over",
			                1: "multiply",
			                2: "screen",
			                3: "overlay",
			                4: "darken",
			                5: "lighten",
			                6: "color-dodge",
			                7: "color-burn",
			                8: "hard-light",
			                9: "soft-light",
			                10: "difference",
			                11: "exclusion",
			                12: "hue",
			                13: "saturation",
			                14: "color",
			                15: "luminosity"
			            }, function(t) {
			                return Ct[t] || ""
			            }),
			                St = function() {
			                    function t() {
			                        return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this
			                    }
			                    function e(t) {
			                        if (0 === t) return this;
			                        var e = w(t),
			                            s = M(t);
			                        return this._t(e, -s, 0, 0, s, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
			                    }
			                    function s(t) {
			                        if (0 === t) return this;
			                        var e = w(t),
			                            s = M(t);
			                        return this._t(1, 0, 0, 0, 0, e, -s, 0, 0, s, e, 0, 0, 0, 0, 1)
			                    }
			                    function i(t) {
			                        if (0 === t) return this;
			                        var e = w(t),
			                            s = M(t);
			                        return this._t(e, 0, s, 0, 0, 1, 0, 0, -s, 0, e, 0, 0, 0, 0, 1)
			                    }
			                    function a(t) {
			                        if (0 === t) return this;
			                        var e = w(t),
			                            s = M(t);
			                        return this._t(e, -s, 0, 0, s, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
			                    }
			                    function r(t, e) {
			                        return this._t(1, e, t, 1, 0, 0)
			                    }
			                    function n(t, e) {
			                        return this.shear(F(t), F(e))
			                    }
			                    function o(t, e) {
			                        var s = w(e),
			                            i = M(e);
			                        return this._t(s, i, 0, 0, -i, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, F(t), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(s, -i, 0, 0, i, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
			                    }
			                    function h(t, e, s) {
			                        return s || 0 === s || (s = 1), 1 === t && 1 === e && 1 === s ? this : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, s, 0, 0, 0, 0, 1)
			                    }
			                    function l(t, e, s, i, a, r, n, o, h, l, p, f, c, m, d, u) {
			                        return this.props[0] = t, this.props[1] = e, this.props[2] = s, this.props[3] = i, this.props[4] = a, this.props[5] = r, this.props[6] = n, this.props[7] = o, this.props[8] = h, this.props[9] = l, this.props[10] = p, this.props[11] = f, this.props[12] = c, this.props[13] = m, this.props[14] = d, this.props[15] = u, this
			                    }
			                    function p(t, e, s) {
			                        return s = s || 0, 0 !== t || 0 !== e || 0 !== s ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, s, 1) : this
			                    }
			                    function f(t, e, s, i, a, r, n, o, h, l, p, f, c, m, d, u) {
			                        var g = this.props;
			                        if (1 === t && 0 === e && 0 === s && 0 === i && 0 === a && 1 === r && 0 === n && 0 === o && 0 === h && 0 === l && 1 === p && 0 === f) return g[12] = g[12] * t + g[15] * c, g[13] = g[13] * r + g[15] * m, g[14] = g[14] * p + g[15] * d, g[15] = g[15] * u, this._identityCalculated = !1, this;
			                        var v = g[0],
			                            y = g[1],
			                            b = g[2],
			                            _ = g[3],
			                            k = g[4],
			                            x = g[5],
			                            P = g[6],
			                            D = g[7],
			                            C = g[8],
			                            T = g[9],
			                            S = g[10],
			                            w = g[11],
			                            M = g[12],
			                            F = g[13],
			                            A = g[14],
			                            I = g[15];
			                        return g[0] = v * t + y * a + b * h + _ * c, g[1] = v * e + y * r + b * l + _ * m, g[2] = v * s + y * n + b * p + _ * d, g[3] = v * i + y * o + b * f + _ * u, g[4] = k * t + x * a + P * h + D * c, g[5] = k * e + x * r + P * l + D * m, g[6] = k * s + x * n + P * p + D * d, g[7] = k * i + x * o + P * f + D * u, g[8] = C * t + T * a + S * h + w * c, g[9] = C * e + T * r + S * l + w * m, g[10] = C * s + T * n + S * p + w * d, g[11] = C * i + T * o + S * f + w * u, g[12] = M * t + F * a + A * h + I * c, g[13] = M * e + F * r + A * l + I * m, g[14] = M * s + F * n + A * p + I * d, g[15] = M * i + F * o + A * f + I * u, this._identityCalculated = !1, this
			                    }
			                    function c() {
			                        return this._identityCalculated || (this._identity = !(1 !== this.props[0] || 0 !== this.props[1] || 0 !== this.props[2] || 0 !== this.props[3] || 0 !== this.props[4] || 1 !== this.props[5] || 0 !== this.props[6] || 0 !== this.props[7] || 0 !== this.props[8] || 0 !== this.props[9] || 1 !== this.props[10] || 0 !== this.props[11] || 0 !== this.props[12] || 0 !== this.props[13] || 0 !== this.props[14] || 1 !== this.props[15]), this._identityCalculated = !0), this._identity
			                    }
			                    function m(t) {
			                        for (var e = 0; e < 16;) {
			                            if (t.props[e] !== this.props[e]) return !1;
			                            e += 1
			                        }
			                        return !0
			                    }
			                    function d(t) {
			                        var e;
			                        for (e = 0; e < 16; e += 1) t.props[e] = this.props[e]
			                    }
			                    function u(t) {
			                        var e;
			                        for (e = 0; e < 16; e += 1) this.props[e] = t[e]
			                    }
			                    function g(t, e, s) {
			                        return {
			                            x: t * this.props[0] + e * this.props[4] + s * this.props[8] + this.props[12],
			                            y: t * this.props[1] + e * this.props[5] + s * this.props[9] + this.props[13],
			                            z: t * this.props[2] + e * this.props[6] + s * this.props[10] + this.props[14]
			                        }
			                    }
			                    function v(t, e, s) {
			                        return t * this.props[0] + e * this.props[4] + s * this.props[8] + this.props[12]
			                    }
			                    function y(t, e, s) {
			                        return t * this.props[1] + e * this.props[5] + s * this.props[9] + this.props[13]
			                    }
			                    function b(t, e, s) {
			                        return t * this.props[2] + e * this.props[6] + s * this.props[10] + this.props[14]
			                    }
			                    function _(t) {
			                        var e = this.props[0] * this.props[5] - this.props[1] * this.props[4],
			                            s = this.props[5] / e,
			                            i = -this.props[1] / e,
			                            a = -this.props[4] / e,
			                            r = this.props[0] / e,
			                            n = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / e,
			                            o = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / e;
			                        return [t[0] * s + t[1] * a + n, t[0] * i + t[1] * r + o, 0]
			                    }
			                    function k(t) {
			                        var e, s = t.length,
			                            i = [];
			                        for (e = 0; e < s; e += 1) i[e] = _(t[e]);
			                        return i
			                    }
			                    function x(t, e, s) {
			                        var i = Dt("float32", 6);
			                        if (this.isIdentity()) i[0] = t[0], i[1] = t[1], i[2] = e[0], i[3] = e[1], i[4] = s[0], i[5] = s[1];
			                        else {
			                            var a = this.props[0],
			                                r = this.props[1],
			                                n = this.props[4],
			                                o = this.props[5],
			                                h = this.props[12],
			                                l = this.props[13];
			                            i[0] = t[0] * a + t[1] * n + h, i[1] = t[0] * r + t[1] * o + l, i[2] = e[0] * a + e[1] * n + h, i[3] = e[0] * r + e[1] * o + l, i[4] = s[0] * a + s[1] * n + h, i[5] = s[0] * r + s[1] * o + l
			                        }
			                        return i
			                    }
			                    function P(t, e, s) {
			                        return this.isIdentity() ? [t, e, s] : [t * this.props[0] + e * this.props[4] + s * this.props[8] + this.props[12], t * this.props[1] + e * this.props[5] + s * this.props[9] + this.props[13], t * this.props[2] + e * this.props[6] + s * this.props[10] + this.props[14]]
			                    }
			                    function D(t, e) {
			                        if (this.isIdentity()) return t + "," + e;
			                        var s = this.props;
			                        return Math.round(100 * (t * s[0] + e * s[4] + s[12])) / 100 + "," + Math.round(100 * (t * s[1] + e * s[5] + s[13])) / 100
			                    }
			                    function C() {
			                        for (var t = 0, e = this.props, s = "matrix3d("; t < 16;) s += A(1e4 * e[t]) / 1e4, s += 15 === t ? ")" : ",", t += 1;
			                        return s
			                    }
			                    function T(t) {
			                        return t < 1e-6 && t > 0 || t > -1e-6 && t < 0 ? A(1e4 * t) / 1e4 : t
			                    }
			                    function S() {
			                        var t = this.props;
			                        return "matrix(" + T(t[0]) + "," + T(t[1]) + "," + T(t[4]) + "," + T(t[5]) + "," + T(t[12]) + "," + T(t[13]) + ")"
			                    }
			                    var w = Math.cos,
			                        M = Math.sin,
			                        F = Math.tan,
			                        A = Math.round;
			                    return function() {
			                        this.reset = t, this.rotate = e, this.rotateX = s, this.rotateY = i, this.rotateZ = a, this.skew = n, this.skewFromAxis = o, this.shear = r, this.scale = h, this.setTransform = l, this.translate = p, this.transform = f, this.applyToPoint = g, this.applyToX = v, this.applyToY = y, this.applyToZ = b, this.applyToPointArray = P, this.applyToTriplePoints = x, this.applyToPointStringified = D, this.toCSS = C, this.to2dCSS = S, this.clone = d, this.cloneFromProps = u, this.equals = m, this.inversePoints = k, this.inversePoint = _, this._t = this.transform, this.isIdentity = c, this._identity = !0, this._identityCalculated = !1, this.props = Dt("float32", 16), this.reset()
			                    }
			                }();
			            ! function(t, e) {
			                function s(t) {
			                    var e, s = t.length,
			                        i = this,
			                        a = 0,
			                        r = i.i = i.j = 0,
			                        n = i.S = [];
			                    for (s || (t = [s++]); a < h;) n[a] = a++;
			                    for (a = 0; a < h; a++) n[a] = n[r = m & r + t[a % s] + (e = n[a])], n[r] = e;
			                    i.g = function(t) {
			                        for (var e, s = 0, a = i.i, r = i.j, n = i.S; t--;) e = n[a = m & a + 1], s = s * h + n[m & (n[a] = n[r = m & r + e]) + (n[r] = e)];
			                        return i.i = a, i.j = r, s
			                    }
			                }
			                function i(t, e) {
			                    return e.i = t.i, e.j = t.j, e.S = t.S.slice(), e
			                }
			                function r(t, e) {
			                    for (var s, i = t + "", a = 0; a < i.length;) e[m & a] = m & (s ^= 19 * e[m & a]) + i.charCodeAt(a++);
			                    return n(e)
			                }
			                function n(t) {
			                    return String.fromCharCode.apply(0, t)
			                }
			                var o = this,
			                    h = 256,
			                    l = "random",
			                    p = e.pow(h, 6),
			                    f = e.pow(2, 52),
			                    c = 2 * f,
			                    m = h - 1;
			                e["seed" + l] = function(m, d, u) {
			                    var g = [],
			                        v = r(function t(e, s) {
			                            var i, r = [],
			                                n = a(e);
			                            if (s && "object" == n) for (i in e) try {
			                                r.push(t(e[i], s - 1))
			                            } catch (t) {}
			                            return r.length ? r : "string" == n ? e : e + "\0"
			                        }((d = !0 === d ? {
			                            entropy: !0
			                        } : d || {}).entropy ? [m, n(t)] : null === m ? function() {
			                            try {
			                                var e = new Uint8Array(h);
			                                return (o.crypto || o.msCrypto).getRandomValues(e), n(e)
			                            } catch (e) {
			                                var s = o.navigator,
			                                    i = s && s.plugins;
			                                return [+new Date, o, i, o.screen, n(t)]
			                            }
			                        }() : m, 3), g),
			                        y = new s(g),
			                        b = function() {
			                            for (var t = y.g(6), e = p, s = 0; t < f;) t = (t + s) * h, e *= h, s = y.g(1);
			                            for (; t >= c;) t /= 2, e /= 2, s >>>= 1;
			                            return (t + s) / e
			                        };
			                    return b.int32 = function() {
			                        return 0 | y.g(4)
			                    }, b.quick = function() {
			                        return y.g(4) / 4294967296
			                    }, b.double = b, r(n(y.S), t), (d.pass || u || function(t, s, a, r) {
			                        return r && (r.S && i(r, y), t.state = function() {
			                            return i(y, {})
			                        }), a ? (e[l] = t, s) : t
			                    })(b, v, "global" in d ? d.global : this == e, d.state)
			                }, r(e.random(), t)
			            }([], bt);
			            var wt = function() {
			                function t(t, e) {
			                    return 1 - 3 * e + 3 * t
			                }
			                function e(t, e) {
			                    return 3 * e - 6 * t
			                }
			                function s(t) {
			                    return 3 * t
			                }
			                function i(i, a, r) {
			                    return ((t(a, r) * i + e(a, r)) * i + s(a)) * i
			                }
			                function a(i, a, r) {
			                    return 3 * t(a, r) * i * i + 2 * e(a, r) * i + s(a)
			                }
			                function r(t) {
			                    this._p = t, this._mSampleValues = p ? new Float32Array(h) : new Array(h), this._precomputed = !1, this.get = this.get.bind(this)
			                }
			                var n = {
			                    getBezierEasing: function(t, e, s, i, a) {
			                        var n = a || ("bez_" + t + "_" + e + "_" + s + "_" + i).replace(/\./g, "p");
			                        if (o[n]) return o[n];
			                        var h = new r([t, e, s, i]);
			                        return o[n] = h, h
			                    }
			                }, o = {}, h = 11,
			                    l = 1 / (h - 1),
			                    p = "function" == typeof Float32Array;
			                return r.prototype = {
			                    get: function(t) {
			                        var e = this._p[0],
			                            s = this._p[1],
			                            a = this._p[2],
			                            r = this._p[3];
			                        return this._precomputed || this._precompute(), e === s && a === r ? t : 0 === t ? 0 : 1 === t ? 1 : i(this._getTForX(t), s, r)
			                    },
			                    _precompute: function() {
			                        var t = this._p[0],
			                            e = this._p[1],
			                            s = this._p[2],
			                            i = this._p[3];
			                        this._precomputed = !0, t === e && s === i || this._calcSampleValues()
			                    },
			                    _calcSampleValues: function() {
			                        for (var t = this._p[0], e = this._p[2], s = 0; s < h; ++s) this._mSampleValues[s] = i(s * l, t, e)
			                    },
			                    _getTForX: function(t) {
			                        for (var e = this._p[0], s = this._p[2], r = this._mSampleValues, n = 0, o = 1, p = h - 1; o !== p && r[o] <= t; ++o) n += l;
			                        var f = n + (t - r[--o]) / (r[o + 1] - r[o]) * l,
			                            c = a(f, e, s);
			                        return c >= .001 ? function(t, e, s, r) {
			                            for (var n = 0; n < 4; ++n) {
			                                var o = a(e, s, r);
			                                if (0 === o) return e;
			                                e -= (i(e, s, r) - t) / o
			                            }
			                            return e
			                        }(t, f, e, s) : 0 === c ? f : function(t, e, s, a, r) {
			                            var n, o, h = 0;
			                            do {
			                                (n = i(o = e + (s - e) / 2, a, r) - t) > 0 ? s = o : e = o
			                            } while (Math.abs(n) > 1e-7 && ++h < 10);
			                            return o
			                        }(t, n, n + l, e, s)
			                    }
			                }, n
			            }();
			            ! function() {
			                for (var e = 0, s = ["ms", "moz", "webkit", "o"], i = 0; i < s.length && !t.requestAnimationFrame; ++i) t.requestAnimationFrame = t[s[i] + "RequestAnimationFrame"], t.cancelAnimationFrame = t[s[i] + "CancelAnimationFrame"] || t[s[i] + "CancelRequestAnimationFrame"];
			                t.requestAnimationFrame || (t.requestAnimationFrame = function(t, s) {
			                    var i = (new Date).getTime(),
			                        a = Math.max(0, 16 - (i - e)),
			                        r = setTimeout(function() {
			                            t(i + a)
			                        }, a);
			                    return e = i + a, r
			                }), t.cancelAnimationFrame || (t.cancelAnimationFrame = function(t) {
			                    clearTimeout(t)
			                })
			            }();
			            var Mt = function() {
			                function t(t, e, s, i, a, r) {
			                    var n = t * i + e * a + s * r - a * i - r * t - s * e;
			                    return n > -.001 && n < .001
			                }
			                function e(t) {
			                    this.segmentLength = 0, this.points = new Array(t)
			                }
			                function s(t, e) {
			                    this.partialLength = t, this.point = e
			                }
			                function i(t, e) {
			                    var s = e.percents,
			                        i = e.lengths,
			                        a = s.length,
			                        r = vt((a - 1) * t),
			                        n = t * e.addedLength,
			                        o = 0;
			                    if (r === a - 1 || 0 === r || n === i[r]) return s[r];
			                    for (var h = i[r] > n ? -1 : 1, l = !0; l;) if (i[r] <= n && i[r + 1] > n ? (o = (n - i[r]) / (i[r + 1] - i[r]), l = !1) : r += h, r < 0 || r >= a - 1) {
			                        if (r === a - 1) return s[r];
			                        l = !1
			                    }
			                    return s[r] + (s[r + 1] - s[r]) * o
			                }
			                Math;
			                var a, r = function(t, e, s, i) {
			                    var a, r, n, o, h, l, p = _t,
			                        f = 0,
			                        c = [],
			                        m = [],
			                        d = Jt.newElement();
			                    for (n = s.length, a = 0; a < p; a += 1) {
			                        for (h = a / (p - 1), l = 0, r = 0; r < n; r += 1) o = ut(1 - h, 3) * t[r] + 3 * ut(1 - h, 2) * h * s[r] + 3 * (1 - h) * ut(h, 2) * i[r] + ut(h, 3) * e[r], c[r] = o, null !== m[r] && (l += ut(c[r] - m[r], 2)), m[r] = c[r];
			                        l && (f += l = gt(l)), d.percents[a] = h, d.lengths[a] = f
			                    }
			                    return d.addedLength = f, d
			                }, n = (a = {}, function(i, r, n, o) {
			                    var h = (i[0] + "_" + i[1] + "_" + r[0] + "_" + r[1] + "_" + n[0] + "_" + n[1] + "_" + o[0] + "_" + o[1]).replace(/\./g, "p");
			                    if (!a[h]) {
			                        var l, p, f, c, m, d, u, g = _t,
			                            v = 0,
			                            y = null;
			                        2 === i.length && (i[0] != r[0] || i[1] != r[1]) && t(i[0], i[1], r[0], r[1], i[0] + n[0], i[1] + n[1]) && t(i[0], i[1], r[0], r[1], r[0] + o[0], r[1] + o[1]) && (g = 2);
			                        var _ = new e(g);
			                        for (f = n.length, l = 0; l < g; l += 1) {
			                            for (u = b(f), m = l / (g - 1), d = 0, p = 0; p < f; p += 1) c = ut(1 - m, 3) * i[p] + 3 * ut(1 - m, 2) * m * (i[p] + n[p]) + 3 * (1 - m) * ut(m, 2) * (r[p] + o[p]) + ut(m, 3) * r[p], u[p] = c, null !== y && (d += ut(u[p] - y[p], 2));
			                            v += d = gt(d), _.points[l] = new s(d, u), y = u
			                        }
			                        _.segmentLength = v, a[h] = _
			                    }
			                    return a[h]
			                }),
			                    o = Dt("float32", 8);
			                return {
			                    getSegmentsLength: function(t) {
			                        var e, s = Kt.newElement(),
			                            i = t.c,
			                            a = t.v,
			                            n = t.o,
			                            o = t.i,
			                            h = t._length,
			                            l = s.lengths,
			                            p = 0;
			                        for (e = 0; e < h - 1; e += 1) l[e] = r(a[e], a[e + 1], n[e], o[e + 1]), p += l[e].addedLength;
			                        return i && h && (l[e] = r(a[e], a[0], n[e], o[0]), p += l[e].addedLength), s.totalLength = p, s
			                    },
			                    getNewSegment: function(t, e, s, a, r, n, h) {
			                        var l, p = i(r = r < 0 ? 0 : r > 1 ? 1 : r, h),
			                            f = i(n = n > 1 ? 1 : n, h),
			                            c = t.length,
			                            m = 1 - p,
			                            d = 1 - f,
			                            u = m * m * m,
			                            g = p * m * m * 3,
			                            v = p * p * m * 3,
			                            y = p * p * p,
			                            b = m * m * d,
			                            _ = p * m * d + m * p * d + m * m * f,
			                            k = p * p * d + m * p * f + p * m * f,
			                            x = p * p * f,
			                            P = m * d * d,
			                            D = p * d * d + m * f * d + m * d * f,
			                            C = p * f * d + m * f * f + p * d * f,
			                            T = p * f * f,
			                            S = d * d * d,
			                            w = f * d * d + d * f * d + d * d * f,
			                            M = f * f * d + d * f * f + f * d * f,
			                            F = f * f * f;
			                        for (l = 0; l < c; l += 1) o[4 * l] = Math.round(1e3 * (u * t[l] + g * s[l] + v * a[l] + y * e[l])) / 1e3, o[4 * l + 1] = Math.round(1e3 * (b * t[l] + _ * s[l] + k * a[l] + x * e[l])) / 1e3, o[4 * l + 2] = Math.round(1e3 * (P * t[l] + D * s[l] + C * a[l] + T * e[l])) / 1e3, o[4 * l + 3] = Math.round(1e3 * (S * t[l] + w * s[l] + M * a[l] + F * e[l])) / 1e3;
			                        return o
			                    },
			                    getPointInSegment: function(t, e, s, a, r, n) {
			                        var o = i(r, n),
			                            h = 1 - o;
			                        return [Math.round(1e3 * (h * h * h * t[0] + (o * h * h + h * o * h + h * h * o) * s[0] + (o * o * h + h * o * o + o * h * o) * a[0] + o * o * o * e[0])) / 1e3, Math.round(1e3 * (h * h * h * t[1] + (o * h * h + h * o * h + h * h * o) * s[1] + (o * o * h + h * o * o + o * h * o) * a[1] + o * o * o * e[1])) / 1e3]
			                    },
			                    buildBezierData: n,
			                    pointOnLine2D: t,
			                    pointOnLine3D: function(e, s, i, a, r, n, o, h, l) {
			                        if (0 === i && 0 === n && 0 === l) return t(e, s, a, r, o, h);
			                        var p, f = Math.sqrt(Math.pow(a - e, 2) + Math.pow(r - s, 2) + Math.pow(n - i, 2)),
			                            c = Math.sqrt(Math.pow(o - e, 2) + Math.pow(h - s, 2) + Math.pow(l - i, 2)),
			                            m = Math.sqrt(Math.pow(o - a, 2) + Math.pow(h - r, 2) + Math.pow(l - n, 2));
			                        return (p = f > c ? f > m ? f - c - m : m - c - f : m > c ? m - c - f : c - f - m) > -1e-4 && p < 1e-4
			                    }
			                }
			            }(),
			                Ft = function() {
			                    function t(t, e) {
			                        for (var s = 0, i = e.length; s < i;) {
			                            if (e[s].id === t) return e[s].layers.__used ? JSON.parse(JSON.stringify(e[s].layers)) : (e[s].layers.__used = !0, e[s].layers);
			                            s += 1
			                        }
			                    }
			                    function e(t) {
			                        var i, a, r;
			                        for (i = t.length - 1; i >= 0; i -= 1) if ("sh" == t[i].ty) if (t[i].ks.k.i) s(t[i].ks.k);
			                        else for (r = t[i].ks.k.length, a = 0; a < r; a += 1) t[i].ks.k[a].s && s(t[i].ks.k[a].s[0]), t[i].ks.k[a].e && s(t[i].ks.k[a].e[0]);
			                        else "gr" == t[i].ty && e(t[i].it)
			                    }
			                    function s(t) {
			                        var e, s = t.i.length;
			                        for (e = 0; e < s; e += 1) t.i[e][0] += t.v[e][0], t.i[e][1] += t.v[e][1], t.o[e][0] += t.v[e][0], t.o[e][1] += t.v[e][1]
			                    }
			                    function i(t, e) {
			                        var s = e ? e.split(".") : [100, 100, 100];
			                        return t[0] > s[0] || !(s[0] > t[0]) && (t[1] > s[1] || !(s[1] > t[1]) && (t[2] > s[2] || !(s[2] > t[2]) && void 0))
			                    }
			                    function a(t, e) {
			                        0 !== t.t.a.length || "m" in t.t.p || (t.singleShape = !0)
			                    }
			                    var r, n = function() {
			                        function t(t) {
			                            var e, s, i, a = t.length;
			                            for (e = 0; e < a; e += 1) 5 === t[e].ty && (s = t[e], i = void 0, i = s.t.d, s.t.d = {
			                                k: [{
			                                    s: i,
			                                    t: 0
			                                }]
			                            })
			                        }
			                        var e = [4, 4, 14];
			                        return function(s) {
			                            if (i(e, s.v) && (t(s.layers), s.assets)) {
			                                var a, r = s.assets.length;
			                                for (a = 0; a < r; a += 1) s.assets[a].layers && t(s.assets[a].layers)
			                            }
			                        }
			                    }(),
			                        o = (r = [4, 7, 99], function(t) {
			                            if (t.chars && !i(r, t.v)) {
			                                var e, a, n, o, h, l = t.chars.length;
			                                for (e = 0; e < l; e += 1) if (t.chars[e].data && t.chars[e].data.shapes) for (n = (h = t.chars[e].data.shapes[0].it).length, a = 0; a < n; a += 1)(o = h[a].ks.k).__converted || (s(h[a].ks.k), o.__converted = !0)
			                            }
			                        }),
			                        h = function() {
			                            function t(e) {
			                                var s, i, a, r = e.length;
			                                for (s = 0; s < r; s += 1) if ("gr" === e[s].ty) t(e[s].it);
			                                else if ("fl" === e[s].ty || "st" === e[s].ty) if (e[s].c.k && e[s].c.k[0].i) for (a = e[s].c.k.length, i = 0; i < a; i += 1) e[s].c.k[i].s && (e[s].c.k[i].s[0] /= 255, e[s].c.k[i].s[1] /= 255, e[s].c.k[i].s[2] /= 255, e[s].c.k[i].s[3] /= 255), e[s].c.k[i].e && (e[s].c.k[i].e[0] /= 255, e[s].c.k[i].e[1] /= 255, e[s].c.k[i].e[2] /= 255, e[s].c.k[i].e[3] /= 255);
			                                else e[s].c.k[0] /= 255, e[s].c.k[1] /= 255, e[s].c.k[2] /= 255, e[s].c.k[3] /= 255
			                            }
			                            function e(e) {
			                                var s, i = e.length;
			                                for (s = 0; s < i; s += 1) 4 === e[s].ty && t(e[s].shapes)
			                            }
			                            var s = [4, 1, 9];
			                            return function(t) {
			                                if (i(s, t.v) && (e(t.layers), t.assets)) {
			                                    var a, r = t.assets.length;
			                                    for (a = 0; a < r; a += 1) t.assets[a].layers && e(t.assets[a].layers)
			                                }
			                            }
			                        }(),
			                        l = function() {
			                            function t(e) {
			                                var s, i, a;
			                                for (s = e.length - 1; s >= 0; s -= 1) if ("sh" == e[s].ty) if (e[s].ks.k.i) e[s].ks.k.c = e[s].closed;
			                                else for (a = e[s].ks.k.length, i = 0; i < a; i += 1) e[s].ks.k[i].s && (e[s].ks.k[i].s[0].c = e[s].closed), e[s].ks.k[i].e && (e[s].ks.k[i].e[0].c = e[s].closed);
			                                else "gr" == e[s].ty && t(e[s].it)
			                            }
			                            function e(e) {
			                                var s, i, a, r, n, o, h = e.length;
			                                for (i = 0; i < h; i += 1) {
			                                    if ((s = e[i]).hasMask) {
			                                        var l = s.masksProperties;
			                                        for (r = l.length, a = 0; a < r; a += 1) if (l[a].pt.k.i) l[a].pt.k.c = l[a].cl;
			                                        else for (o = l[a].pt.k.length, n = 0; n < o; n += 1) l[a].pt.k[n].s && (l[a].pt.k[n].s[0].c = l[a].cl), l[a].pt.k[n].e && (l[a].pt.k[n].e[0].c = l[a].cl)
			                                    }
			                                    4 === s.ty && t(s.shapes)
			                                }
			                            }
			                            var s = [4, 4, 18];
			                            return function(t) {
			                                if (i(s, t.v) && (e(t.layers), t.assets)) {
			                                    var a, r = t.assets.length;
			                                    for (a = 0; a < r; a += 1) t.assets[a].layers && e(t.assets[a].layers)
			                                }
			                            }
			                        }();
			                    return {
			                        completeData: function(i, r) {
			                            i.__complete || (h(i), n(i), o(i), l(i), function i(r, n, o) {
			                                var h, l, p, f, c, m, d = r.length;
			                                for (l = 0; l < d; l += 1) if ("ks" in (h = r[l]) && !h.completed) {
			                                    if (h.completed = !0, h.tt && (r[l - 1].td = h.tt), h.hasMask) {
			                                        var u = h.masksProperties;
			                                        for (f = u.length, p = 0; p < f; p += 1) if (u[p].pt.k.i) s(u[p].pt.k);
			                                        else for (m = u[p].pt.k.length, c = 0; c < m; c += 1) u[p].pt.k[c].s && s(u[p].pt.k[c].s[0]), u[p].pt.k[c].e && s(u[p].pt.k[c].e[0])
			                                    }
			                                    0 === h.ty ? (h.layers = t(h.refId, n), i(h.layers, n, o)) : 4 === h.ty ? e(h.shapes) : 5 == h.ty && a(h)
			                                }
			                            }(i.layers, i.assets, r), i.__complete = !0)
			                        }
			                    }
			                }(),
			                At = function() {
			                    function t(t, e) {
			                        var s = _("span");
			                        s.style.fontFamily = e;
			                        var i = _("span");
			                        i.innerHTML = "giItT1WQy@!-/#", s.style.position = "absolute", s.style.left = "-10000px", s.style.top = "-10000px", s.style.fontSize = "300px", s.style.fontVariant = "normal", s.style.fontStyle = "normal", s.style.fontWeight = "normal", s.style.letterSpacing = "0", s.appendChild(i), o.body.appendChild(s);
			                        var a = i.offsetWidth;
			                        return i.style.fontFamily = t + ", " + e, {
			                            node: i,
			                            w: a,
			                            parent: s
			                        }
			                    }
			                    function e(t, e) {
			                        var s = createNS("text");
			                        return s.style.fontSize = "100px", s.setAttribute("font-family", e.fFamily), s.setAttribute("font-style", e.fStyle), s.setAttribute("font-weight", e.fWeight), s.textContent = "1", e.fClass ? (s.style.fontFamily = "inherit", s.setAttribute("class", e.fClass)) : s.style.fontFamily = e.fFamily, t.appendChild(s), _("canvas").getContext("2d").font = e.fWeight + " " + e.fStyle + " 100px " + e.fFamily, s
			                    }
			                    var s = {
			                        w: 0,
			                        size: 0,
			                        shapes: []
			                    }, i = [];
			                    i = i.concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]);
			                    var a = function() {
			                        this.fonts = [], this.chars = null, this.typekitLoaded = 0, this.isLoaded = !1, this.initTime = Date.now()
			                    };
			                    return a.getCombinedCharacterCodes = function() {
			                        return i
			                    }, a.prototype.addChars = function(t) {
			                        if (t) {
			                            this.chars || (this.chars = []);
			                            var e, s, i, a = t.length,
			                                r = this.chars.length;
			                            for (e = 0; e < a; e += 1) {
			                                for (s = 0, i = !1; s < r;) this.chars[s].style === t[e].style && this.chars[s].fFamily === t[e].fFamily && this.chars[s].ch === t[e].ch && (i = !0), s += 1;
			                                i || (this.chars.push(t[e]), r += 1)
			                            }
			                        }
			                    }, a.prototype.addFonts = function(s, i) {
			                        if (s) {
			                            if (this.chars) return this.isLoaded = !0, void(this.fonts = s.list);
			                            var a, r = s.list,
			                                n = r.length,
			                                h = n;
			                            for (a = 0; a < n; a += 1) {
			                                var l, p, f = !0;
			                                if (r[a].loaded = !1, r[a].monoCase = t(r[a].fFamily, "monospace"), r[a].sansCase = t(r[a].fFamily, "sans-serif"), r[a].fPath) {
			                                    if ("p" === r[a].fOrigin || 3 === r[a].origin) {
			                                        if ((l = o.querySelectorAll('style[f-forigin="p"][f-family="' + r[a].fFamily + '"], style[f-origin="3"][f-family="' + r[a].fFamily + '"]')).length > 0 && (f = !1), f) {
			                                            var c = _("style");
			                                            c.setAttribute("f-forigin", r[a].fOrigin), c.setAttribute("f-origin", r[a].origin), c.setAttribute("f-family", r[a].fFamily), c.type = "text/css", c.innerHTML = "@font-face {font-family: " + r[a].fFamily + "; font-style: normal; src: url('" + r[a].fPath + "');}", i.appendChild(c)
			                                        }
			                                    } else if ("g" === r[a].fOrigin || 1 === r[a].origin) {
			                                        for (l = o.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'), p = 0; p < l.length; p++) - 1 !== l[p].href.indexOf(r[a].fPath) && (f = !1);
			                                        if (f) {
			                                            var m = _("link");
			                                            m.setAttribute("f-forigin", r[a].fOrigin), m.setAttribute("f-origin", r[a].origin), m.type = "text/css", m.rel = "stylesheet", m.href = r[a].fPath, o.body.appendChild(m)
			                                        }
			                                    } else if ("t" === r[a].fOrigin || 2 === r[a].origin) {
			                                        for (l = o.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'), p = 0; p < l.length; p++) r[a].fPath === l[p].src && (f = !1);
			                                        if (f) {
			                                            var d = _("link");
			                                            d.setAttribute("f-forigin", r[a].fOrigin), d.setAttribute("f-origin", r[a].origin), d.setAttribute("rel", "stylesheet"), d.setAttribute("href", r[a].fPath), i.appendChild(d)
			                                        }
			                                    }
			                                } else r[a].loaded = !0, h -= 1;
			                                r[a].helper = e(i, r[a]), r[a].cache = {}, this.fonts.push(r[a])
			                            }
			                            0 === h ? this.isLoaded = !0 : setTimeout(this.checkLoadedFonts.bind(this), 100)
			                        } else this.isLoaded = !0
			                    }, a.prototype.getCharData = function(t, e, i) {
			                        for (var a = 0, r = this.chars.length; a < r;) {
			                            if (this.chars[a].ch === t && this.chars[a].style === e && this.chars[a].fFamily === i) return this.chars[a];
			                            a += 1
			                        }
			                        return ("string" == typeof t && 13 !== t.charCodeAt(0) || !t) && console && console.warn && console.warn("Missing character from exported characters list: ", t, e, i), s
			                    }, a.prototype.getFontByName = function(t) {
			                        for (var e = 0, s = this.fonts.length; e < s;) {
			                            if (this.fonts[e].fName === t) return this.fonts[e];
			                            e += 1
			                        }
			                        return this.fonts[0]
			                    }, a.prototype.measureText = function(t, e, s) {
			                        var i = this.getFontByName(e),
			                            a = t.charCodeAt(0);
			                        return i.cache[a + 1] * s
			                    }, a.prototype.checkLoadedFonts = function() {
			                        var t, e, s, i = this.fonts.length,
			                            a = i;
			                        for (t = 0; t < i; t += 1) this.fonts[t].loaded ? a -= 1 : "n" === this.fonts[t].fOrigin || 0 === this.fonts[t].origin ? this.fonts[t].loaded = !0 : (e = this.fonts[t].monoCase.node, s = this.fonts[t].monoCase.w, e.offsetWidth !== s ? (a -= 1, this.fonts[t].loaded = !0) : (e = this.fonts[t].sansCase.node, s = this.fonts[t].sansCase.w, e.offsetWidth !== s && (a -= 1, this.fonts[t].loaded = !0)), this.fonts[t].loaded && (this.fonts[t].sansCase.parent.parentNode.removeChild(this.fonts[t].sansCase.parent), this.fonts[t].monoCase.parent.parentNode.removeChild(this.fonts[t].monoCase.parent)));
			                        0 !== a && Date.now() - this.initTime < 5e3 ? setTimeout(this.checkLoadedFonts.bind(this), 20) : setTimeout(function() {
			                            this.isLoaded = !0
			                        }.bind(this), 0)
			                    }, a.prototype.loaded = function() {
			                        return this.isLoaded
			                    }, a
			                }(),
			                It = function() {
			                    function t(t, s) {
			                        var i, a = this.offsetTime;
			                        "multidimensional" === this.propType && (i = Dt("float32", this.pv.length));
			                        for (var r, n, o, h, l, p, f, c, m = s.lastIndex, d = m, u = this.keyframes.length - 1, g = !0; g;) {
			                            if (r = this.keyframes[d], n = this.keyframes[d + 1], d === u - 1 && t >= n.t - a) {
			                                r.h && (r = n), m = 0;
			                                break
			                            }
			                            if (n.t - a > t) {
			                                m = d;
			                                break
			                            }
			                            d < u - 1 ? d += 1 : (m = 0, g = !1)
			                        }
			                        var v, y = n.t - a,
			                            b = r.t - a;
			                        if (r.to) {
			                            r.bezierData || (r.bezierData = Mt.buildBezierData(r.s, n.s || r.e, r.to, r.ti));
			                            var _ = r.bezierData;
			                            if (t >= y || t < b) {
			                                var k = t >= y ? _.points.length - 1 : 0;
			                                for (h = _.points[k].point.length, o = 0; o < h; o += 1) i[o] = _.points[k].point[o]
			                            } else {
			                                r.__fnct ? c = r.__fnct : (c = wt.getBezierEasing(r.o.x, r.o.y, r.i.x, r.i.y, r.n).get, r.__fnct = c), l = c((t - b) / (y - b));
			                                var x, P = _.segmentLength * l,
			                                    D = s.lastFrame < t && s._lastKeyframeIndex === d ? s._lastAddedLength : 0;
			                                for (f = s.lastFrame < t && s._lastKeyframeIndex === d ? s._lastPoint : 0, g = !0, p = _.points.length; g;) {
			                                    if (D += _.points[f].partialLength, 0 === P || 0 === l || f === _.points.length - 1) {
			                                        for (h = _.points[f].point.length, o = 0; o < h; o += 1) i[o] = _.points[f].point[o];
			                                        break
			                                    }
			                                    if (P >= D && P < D + _.points[f + 1].partialLength) {
			                                        for (x = (P - D) / _.points[f + 1].partialLength, h = _.points[f].point.length, o = 0; o < h; o += 1) i[o] = _.points[f].point[o] + (_.points[f + 1].point[o] - _.points[f].point[o]) * x;
			                                        break
			                                    }
			                                    f < p - 1 ? f += 1 : g = !1
			                                }
			                                s._lastPoint = f, s._lastAddedLength = D - _.points[f].partialLength, s._lastKeyframeIndex = d
			                            }
			                        } else {
			                            var C, T, S, w, M;
			                            if (u = r.s.length, v = n.s || r.e, this.sh && 1 !== r.h) t >= y ? (i[0] = v[0], i[1] = v[1], i[2] = v[2]) : t <= b ? (i[0] = r.s[0], i[1] = r.s[1], i[2] = r.s[2]) : function(t, e) {
			                                var s = e[0],
			                                    i = e[1],
			                                    a = e[2],
			                                    r = e[3],
			                                    n = Math.atan2(2 * i * r - 2 * s * a, 1 - 2 * i * i - 2 * a * a),
			                                    o = Math.asin(2 * s * i + 2 * a * r),
			                                    h = Math.atan2(2 * s * r - 2 * i * a, 1 - 2 * s * s - 2 * a * a);
			                                t[0] = n / kt, t[1] = o / kt, t[2] = h / kt
			                            }(i, function(t, e, s) {
			                                var i, a, r, n, o, h = [],
			                                    l = t[0],
			                                    p = t[1],
			                                    f = t[2],
			                                    c = t[3],
			                                    m = e[0],
			                                    d = e[1],
			                                    u = e[2],
			                                    g = e[3];
			                                return (a = l * m + p * d + f * u + c * g) < 0 && (a = -a, m = -m, d = -d, u = -u, g = -g), 1 - a > 1e-6 ? (i = Math.acos(a), r = Math.sin(i), n = Math.sin((1 - s) * i) / r, o = Math.sin(s * i) / r) : (n = 1 - s, o = s), h[0] = n * l + o * m, h[1] = n * p + o * d, h[2] = n * f + o * u, h[3] = n * c + o * g, h
			                            }(e(r.s), e(v), (t - b) / (y - b)));
			                            else for (d = 0; d < u; d += 1) 1 !== r.h && (t >= y ? l = 1 : t < b ? l = 0 : (r.o.x.constructor === Array ? (r.__fnct || (r.__fnct = []), r.__fnct[d] ? c = r.__fnct[d] : (C = void 0 === r.o.x[d] ? r.o.x[0] : r.o.x[d], T = void 0 === r.o.y[d] ? r.o.y[0] : r.o.y[d], S = void 0 === r.i.x[d] ? r.i.x[0] : r.i.x[d], w = void 0 === r.i.y[d] ? r.i.y[0] : r.i.y[d], c = wt.getBezierEasing(C, T, S, w).get, r.__fnct[d] = c)) : r.__fnct ? c = r.__fnct : (C = r.o.x, T = r.o.y, S = r.i.x, w = r.i.y, c = wt.getBezierEasing(C, T, S, w).get, r.__fnct = c), l = c((t - b) / (y - b)))), v = n.s || r.e, M = 1 === r.h ? r.s[d] : r.s[d] + (v[d] - r.s[d]) * l, "multidimensional" === this.propType ? i[d] = M : i = M
			                        }
			                        return s.lastIndex = m, i
			                    }
			                    function e(t) {
			                        var e = t[0] * kt,
			                            s = t[1] * kt,
			                            i = t[2] * kt,
			                            a = Math.cos(e / 2),
			                            r = Math.cos(s / 2),
			                            n = Math.cos(i / 2),
			                            o = Math.sin(e / 2),
			                            h = Math.sin(s / 2),
			                            l = Math.sin(i / 2);
			                        return [o * h * n + a * r * l, o * r * n + a * h * l, a * h * n - o * r * l, a * r * n - o * h * l]
			                    }
			                    function s() {
			                        var t = this.comp.renderedFrame - this.offsetTime,
			                            e = this.keyframes[0].t - this.offsetTime,
			                            s = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
			                        if (!(t === this._caching.lastFrame || this._caching.lastFrame !== p && (this._caching.lastFrame >= s && t >= s || this._caching.lastFrame < e && t < e))) {
			                            this._caching.lastFrame >= t && (this._caching._lastKeyframeIndex = -1, this._caching.lastIndex = 0);
			                            var i = this.interpolateValue(t, this._caching);
			                            this.pv = i
			                        }
			                        return this._caching.lastFrame = t, this.pv
			                    }
			                    function i(t) {
			                        var e;
			                        if ("unidimensional" === this.propType) e = t * this.mult, f(this.v - e) > 1e-5 && (this.v = e, this._mdf = !0);
			                        else for (var s = 0, i = this.v.length; s < i;) e = t[s] * this.mult, f(this.v[s] - e) > 1e-5 && (this.v[s] = e, this._mdf = !0), s += 1
			                    }
			                    function a() {
			                        if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length) if (this.lock) this.setVValue(this.pv);
			                        else {
			                            this.lock = !0, this._mdf = this._isFirstFrame;
			                            var t, e = this.effectsSequence.length,
			                                s = this.kf ? this.pv : this.data.k;
			                            for (t = 0; t < e; t += 1) s = this.effectsSequence[t](s);
			                            this.setVValue(s), this._isFirstFrame = !1, this.lock = !1, this.frameId = this.elem.globalData.frameId
			                        }
			                    }
			                    function r(t) {
			                        this.effectsSequence.push(t), this.container.addDynamicProperty(this)
			                    }
			                    function n(t, e, s, n) {
			                        this.propType = "unidimensional", this.mult = s || 1, this.data = e, this.v = s ? e.k * s : e.k, this.pv = e.k, this._mdf = !1, this.elem = t, this.container = n, this.comp = t.comp, this.k = !1, this.kf = !1, this.vel = 0, this.effectsSequence = [], this._isFirstFrame = !0, this.getValue = a, this.setVValue = i, this.addEffect = r
			                    }
			                    function o(t, e, s, n) {
			                        this.propType = "multidimensional", this.mult = s || 1, this.data = e, this._mdf = !1, this.elem = t, this.container = n, this.comp = t.comp, this.k = !1, this.kf = !1, this.frameId = -1;
			                        var o, h = e.k.length;
			                        for (this.v = Dt("float32", h), this.pv = Dt("float32", h), Dt("float32", h), this.vel = Dt("float32", h), o = 0; o < h; o += 1) this.v[o] = e.k[o] * this.mult, this.pv[o] = e.k[o];
			                        this._isFirstFrame = !0, this.effectsSequence = [], this.getValue = a, this.setVValue = i, this.addEffect = r
			                    }
			                    function h(e, n, o, h) {
			                        this.propType = "unidimensional", this.keyframes = n.k, this.offsetTime = e.data.st, this.frameId = -1, this._caching = {
			                            lastFrame: p,
			                            lastIndex: 0,
			                            value: 0,
			                            _lastKeyframeIndex: -1
			                        }, this.k = !0, this.kf = !0, this.data = n, this.mult = o || 1, this.elem = e, this.container = h, this.comp = e.comp, this.v = p, this.pv = p, this._isFirstFrame = !0, this.getValue = a, this.setVValue = i, this.interpolateValue = t, this.effectsSequence = [s.bind(this)], this.addEffect = r
			                    }
			                    function l(e, n, o, h) {
			                        this.propType = "multidimensional";
			                        var l, f, c, m, d, u = n.k.length;
			                        for (l = 0; l < u - 1; l += 1) n.k[l].to && n.k[l].s && n.k[l].e && (f = n.k[l].s, c = n.k[l].e, m = n.k[l].to, d = n.k[l].ti, (2 === f.length && (f[0] !== c[0] || f[1] !== c[1]) && Mt.pointOnLine2D(f[0], f[1], c[0], c[1], f[0] + m[0], f[1] + m[1]) && Mt.pointOnLine2D(f[0], f[1], c[0], c[1], c[0] + d[0], c[1] + d[1]) || 3 === f.length && (f[0] !== c[0] || f[1] !== c[1] || f[2] !== c[2]) && Mt.pointOnLine3D(f[0], f[1], f[2], c[0], c[1], c[2], f[0] + m[0], f[1] + m[1], f[2] + m[2]) && Mt.pointOnLine3D(f[0], f[1], f[2], c[0], c[1], c[2], c[0] + d[0], c[1] + d[1], c[2] + d[2])) && (n.k[l].to = null, n.k[l].ti = null), f[0] === c[0] && f[1] === c[1] && 0 === m[0] && 0 === m[1] && 0 === d[0] && 0 === d[1] && (2 === f.length || f[2] === c[2] && 0 === m[2] && 0 === d[2]) && (n.k[l].to = null, n.k[l].ti = null));
			                        this.effectsSequence = [s.bind(this)], this.keyframes = n.k, this.offsetTime = e.data.st, this.k = !0, this.kf = !0, this._isFirstFrame = !0, this.mult = o || 1, this.elem = e, this.container = h, this.comp = e.comp, this.getValue = a, this.setVValue = i, this.interpolateValue = t, this.frameId = -1;
			                        var g = n.k[0].s.length;
			                        for (this.v = Dt("float32", g), this.pv = Dt("float32", g), l = 0; l < g; l += 1) this.v[l] = p, this.pv[l] = p;
			                        this._caching = {
			                            lastFrame: p,
			                            lastIndex: 0,
			                            value: Dt("float32", g)
			                        }, this.addEffect = r
			                    }
			                    var p = ct,
			                        f = Math.abs;
			                    return {
			                        getProp: function(t, e, s, i, a) {
			                            var r;
			                            if (e.k.length) if ("number" == typeof e.k[0]) r = new o(t, e, i, a);
			                            else switch (s) {
			                                case 0:
			                                    r = new h(t, e, i, a);
			                                    break;
			                                case 1:
			                                    r = new l(t, e, i, a)
			                            } else r = new n(t, e, i, a);
			                            return r.effectsSequence.length && a.addDynamicProperty(r), r
			                        }
			                    }
			                }(),
			                Lt = function() {
			                    function t(t, e, s) {
			                        if (this.elem = t, this.frameId = -1, this.propType = "transform", this.data = e, this.v = new St, this.pre = new St, this.appliedTransformations = 0, this.initDynamicPropertyContainer(s || t), e.p && e.p.s ? (this.px = It.getProp(t, e.p.x, 0, 0, this), this.py = It.getProp(t, e.p.y, 0, 0, this), e.p.z && (this.pz = It.getProp(t, e.p.z, 0, 0, this))) : this.p = It.getProp(t, e.p || {
			                            k: [0, 0, 0]
			                        }, 1, 0, this), e.rx) {
			                            if (this.rx = It.getProp(t, e.rx, 0, kt, this), this.ry = It.getProp(t, e.ry, 0, kt, this), this.rz = It.getProp(t, e.rz, 0, kt, this), e.or.k[0].ti) {
			                                var i, a = e.or.k.length;
			                                for (i = 0; i < a; i += 1) e.or.k[i].to = e.or.k[i].ti = null
			                            }
			                            this.or = It.getProp(t, e.or, 1, kt, this), this.or.sh = !0
			                        } else this.r = It.getProp(t, e.r || {
			                            k: 0
			                        }, 0, kt, this);
			                        e.sk && (this.sk = It.getProp(t, e.sk, 0, kt, this), this.sa = It.getProp(t, e.sa, 0, kt, this)), this.a = It.getProp(t, e.a || {
			                            k: [0, 0, 0]
			                        }, 1, 0, this), this.s = It.getProp(t, e.s || {
			                            k: [100, 100, 100]
			                        }, 1, .01, this), e.o ? this.o = It.getProp(t, e.o, 0, .01, t) : this.o = {
			                            _mdf: !1,
			                            v: 1
			                        }, this._isDirty = !0, this.dynamicProperties.length || this.getValue(!0)
			                    }
			                    return t.prototype = {
			                        applyToMatrix: function(t) {
			                            var e = this._mdf;
			                            this.iterateDynamicProperties(), this._mdf = this._mdf || e, this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && t.skewFromAxis(-this.sk.v, this.sa.v), this.r ? t.rotate(-this.r.v) : t.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? t.translate(this.px.v, this.py.v, -this.pz.v) : t.translate(this.px.v, this.py.v, 0) : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
			                        },
			                        getValue: function(t) {
			                            if (this.elem.globalData.frameId !== this.frameId) {
			                                if (this._isDirty && (this.precalculateMatrix(), this._isDirty = !1), this.iterateDynamicProperties(), this._mdf || t) {
			                                    if (this.v.cloneFromProps(this.pre.props), this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r && this.appliedTransformations < 4 ? this.v.rotate(-this.r.v) : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.autoOriented) {
			                                        var e, s, i = this.elem.globalData.frameRate;
			                                        if (this.p && this.p.keyframes && this.p.getValueAtTime) this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (e = this.p.getValueAtTime((this.p.keyframes[0].t + .01) / i, 0), s = this.p.getValueAtTime(this.p.keyframes[0].t / i, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (e = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / i, 0), s = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - .05) / i, 0)) : (e = this.p.pv, s = this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - .01) / i, this.p.offsetTime));
			                                        else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
			                                            e = [], s = [];
			                                            var a = this.px,
			                                                r = this.py;
			                                            a._caching.lastFrame + a.offsetTime <= a.keyframes[0].t ? (e[0] = a.getValueAtTime((a.keyframes[0].t + .01) / i, 0), e[1] = r.getValueAtTime((r.keyframes[0].t + .01) / i, 0), s[0] = a.getValueAtTime(a.keyframes[0].t / i, 0), s[1] = r.getValueAtTime(r.keyframes[0].t / i, 0)) : a._caching.lastFrame + a.offsetTime >= a.keyframes[a.keyframes.length - 1].t ? (e[0] = a.getValueAtTime(a.keyframes[a.keyframes.length - 1].t / i, 0), e[1] = r.getValueAtTime(r.keyframes[r.keyframes.length - 1].t / i, 0), s[0] = a.getValueAtTime((a.keyframes[a.keyframes.length - 1].t - .01) / i, 0), s[1] = r.getValueAtTime((r.keyframes[r.keyframes.length - 1].t - .01) / i, 0)) : (e = [a.pv, r.pv], s[0] = a.getValueAtTime((a._caching.lastFrame + a.offsetTime - .01) / i, a.offsetTime), s[1] = r.getValueAtTime((r._caching.lastFrame + r.offsetTime - .01) / i, r.offsetTime))
			                                        }
			                                        this.v.rotate(-Math.atan2(e[1] - s[1], e[0] - s[0]))
			                                    }
			                                    this.data.p && this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
			                                }
			                                this.frameId = this.elem.globalData.frameId
			                            }
			                        },
			                        precalculateMatrix: function() {
			                            if (!this.a.k && (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations = 1, !this.s.effectsSequence.length)) {
			                                if (this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.appliedTransformations = 2, this.sk) {
			                                    if (this.sk.effectsSequence.length || this.sa.effectsSequence.length) return;
			                                    this.pre.skewFromAxis(-this.sk.v, this.sa.v), this.appliedTransformations = 3
			                                }
			                                if (this.r) {
			                                    if (this.r.effectsSequence.length) return;
			                                    this.pre.rotate(-this.r.v), this.appliedTransformations = 4
			                                } else this.rz.effectsSequence.length || this.ry.effectsSequence.length || this.rx.effectsSequence.length || this.or.effectsSequence.length || (this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.appliedTransformations = 4)
			                            }
			                        },
			                        autoOrient: function() {}
			                    }, x([k], t), t.prototype.addDynamicProperty = function(t) {
			                        this._addDynamicProperty(t), this.elem.addDynamicProperty(t), this._isDirty = !0
			                    }, t.prototype._addDynamicProperty = k.prototype.addDynamicProperty, {
			                        getTransformProperty: function(e, s, i) {
			                            return new t(e, s, i)
			                        }
			                    }
			                }();
			            P.prototype.setPathData = function(t, e) {
			                this.c = t, this.setLength(e);
			                for (var s = 0; s < e;) this.v[s] = Xt.newElement(), this.o[s] = Xt.newElement(), this.i[s] = Xt.newElement(), s += 1
			            }, P.prototype.setLength = function(t) {
			                for (; this._maxLength < t;) this.doubleArrayLength();
			                this._length = t
			            }, P.prototype.doubleArrayLength = function() {
			                this.v = this.v.concat(b(this._maxLength)), this.i = this.i.concat(b(this._maxLength)), this.o = this.o.concat(b(this._maxLength)), this._maxLength *= 2
			            }, P.prototype.setXYAt = function(t, e, s, i, a) {
			                var r;
			                switch (this._length = Math.max(this._length, i + 1), this._length >= this._maxLength && this.doubleArrayLength(), s) {
			                    case "v":
			                        r = this.v;
			                        break;
			                    case "i":
			                        r = this.i;
			                        break;
			                    case "o":
			                        r = this.o
			                }(!r[i] || r[i] && !a) && (r[i] = Xt.newElement()), r[i][0] = t, r[i][1] = e
			            }, P.prototype.setTripleAt = function(t, e, s, i, a, r, n, o) {
			                this.setXYAt(t, e, "v", n, o), this.setXYAt(s, i, "o", n, o), this.setXYAt(a, r, "i", n, o)
			            }, P.prototype.reverse = function() {
			                var t = new P;
			                t.setPathData(this.c, this._length);
			                var e = this.v,
			                    s = this.o,
			                    i = this.i,
			                    a = 0;
			                this.c && (t.setTripleAt(e[0][0], e[0][1], i[0][0], i[0][1], s[0][0], s[0][1], 0, !1), a = 1);
			                var r, n = this._length - 1,
			                    o = this._length;
			                for (r = a; r < o; r += 1) t.setTripleAt(e[n][0], e[n][1], i[n][0], i[n][1], s[n][0], s[n][1], r, !1), n -= 1;
			                return t
			            };
			            var Et, Rt, Ot = function() {
			                function t(t, e, s) {
			                    var i, a, r, n, o, h, l, p, f, c = s.lastIndex,
			                        m = this.keyframes;
			                    if (t < m[0].t - this.offsetTime) i = m[0].s[0], r = !0, c = 0;
			                    else if (t >= m[m.length - 1].t - this.offsetTime) i = m[m.length - 1].s ? m[m.length - 1].s[0] : m[m.length - 2].e[0], r = !0;
			                    else {
			                        for (var d, u, g = c, v = m.length - 1, y = !0; y && (d = m[g], !((u = m[g + 1]).t - this.offsetTime > t));) g < v - 1 ? g += 1 : y = !1;
			                        if (c = g, !(r = 1 === d.h)) {
			                            if (t >= u.t - this.offsetTime) p = 1;
			                            else if (t < d.t - this.offsetTime) p = 0;
			                            else {
			                                var b;
			                                d.__fnct ? b = d.__fnct : (b = wt.getBezierEasing(d.o.x, d.o.y, d.i.x, d.i.y).get, d.__fnct = b), p = b((t - (d.t - this.offsetTime)) / (u.t - this.offsetTime - (d.t - this.offsetTime)))
			                            }
			                            a = u.s ? u.s[0] : d.e[0]
			                        }
			                        i = d.s[0]
			                    }
			                    for (h = e._length, l = i.i[0].length, s.lastIndex = c, n = 0; n < h; n += 1) for (o = 0; o < l; o += 1) f = r ? i.i[n][o] : i.i[n][o] + (a.i[n][o] - i.i[n][o]) * p, e.i[n][o] = f, f = r ? i.o[n][o] : i.o[n][o] + (a.o[n][o] - i.o[n][o]) * p, e.o[n][o] = f, f = r ? i.v[n][o] : i.v[n][o] + (a.v[n][o] - i.v[n][o]) * p, e.v[n][o] = f
			                }
			                function e() {
			                    var t = this.comp.renderedFrame - this.offsetTime,
			                        e = this.keyframes[0].t - this.offsetTime,
			                        s = this.keyframes[this.keyframes.length - 1].t - this.offsetTime,
			                        i = this._caching.lastFrame;
			                    return i !== h && (i < e && t < e || i > s && t > s) || (this._caching.lastIndex = i < t ? this._caching.lastIndex : 0, this.interpolateShape(t, this.pv, this._caching)), this._caching.lastFrame = t, this.pv
			                }
			                function s() {
			                    this.paths = this.localShapeCollection
			                }
			                function i(t) {
			                    (function(t, e) {
			                        if (t._length !== e._length || t.c !== e.c) return !1;
			                        var s, i = t._length;
			                        for (s = 0; s < i; s += 1) if (t.v[s][0] !== e.v[s][0] || t.v[s][1] !== e.v[s][1] || t.o[s][0] !== e.o[s][0] || t.o[s][1] !== e.o[s][1] || t.i[s][0] !== e.i[s][0] || t.i[s][1] !== e.i[s][1]) return !1;
			                        return !0
			                    })(this.v, t) || (this.v = Ht.clone(t), this.localShapeCollection.releaseShapes(), this.localShapeCollection.addShape(this.v), this._mdf = !0, this.paths = this.localShapeCollection)
			                }
			                function a() {
			                    if (this.elem.globalData.frameId !== this.frameId) if (this.effectsSequence.length) if (this.lock) this.setVValue(this.pv);
			                    else {
			                        this.lock = !0, this._mdf = !1;
			                        var t, e = this.kf ? this.pv : this.data.ks ? this.data.ks.k : this.data.pt.k,
			                            s = this.effectsSequence.length;
			                        for (t = 0; t < s; t += 1) e = this.effectsSequence[t](e);
			                        this.setVValue(e), this.lock = !1, this.frameId = this.elem.globalData.frameId
			                    } else this._mdf = !1
			                }
			                function r(t, e, i) {
			                    this.propType = "shape", this.comp = t.comp, this.container = t, this.elem = t, this.data = e, this.k = !1, this.kf = !1, this._mdf = !1;
			                    var a = 3 === i ? e.pt.k : e.ks.k;
			                    this.v = Ht.clone(a), this.pv = Ht.clone(this.v), this.localShapeCollection = Gt.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.reset = s, this.effectsSequence = []
			                }
			                function n(t) {
			                    this.effectsSequence.push(t), this.container.addDynamicProperty(this)
			                }
			                function o(t, i, a) {
			                    this.propType = "shape", this.comp = t.comp, this.elem = t, this.container = t, this.offsetTime = t.data.st, this.keyframes = 3 === a ? i.pt.k : i.ks.k, this.k = !0, this.kf = !0;
			                    var r = this.keyframes[0].s[0].i.length;
			                    this.keyframes[0].s[0].i[0].length, this.v = Ht.newElement(), this.v.setPathData(this.keyframes[0].s[0].c, r), this.pv = Ht.clone(this.v), this.localShapeCollection = Gt.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.lastFrame = h, this.reset = s, this._caching = {
			                        lastFrame: h,
			                        lastIndex: 0
			                    }, this.effectsSequence = [e.bind(this)]
			                }
			                var h = -999999;
			                r.prototype.interpolateShape = t, r.prototype.getValue = a, r.prototype.setVValue = i, r.prototype.addEffect = n, o.prototype.getValue = a, o.prototype.interpolateShape = t, o.prototype.setVValue = i, o.prototype.addEffect = n;
			                var l = function() {
			                    function t(t, e) {
			                        this.v = Ht.newElement(), this.v.setPathData(!0, 4), this.localShapeCollection = Gt.newShapeCollection(), this.paths = this.localShapeCollection, this.localShapeCollection.addShape(this.v), this.d = e.d, this.elem = t, this.comp = t.comp, this.frameId = -1, this.initDynamicPropertyContainer(t), this.p = It.getProp(t, e.p, 1, 0, this), this.s = It.getProp(t, e.s, 1, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertEllToPath())
			                    }
			                    return t.prototype = {
			                        reset: s,
			                        getValue: function() {
			                            this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertEllToPath())
			                        },
			                        convertEllToPath: function() {
			                            var t = this.p.v[0],
			                                e = this.p.v[1],
			                                s = this.s.v[0] / 2,
			                                i = this.s.v[1] / 2,
			                                a = 3 !== this.d,
			                                r = this.v;
			                            r.v[0][0] = t, r.v[0][1] = e - i, r.v[1][0] = a ? t + s : t - s, r.v[1][1] = e, r.v[2][0] = t, r.v[2][1] = e + i, r.v[3][0] = a ? t - s : t + s, r.v[3][1] = e, r.i[0][0] = a ? t - .5519 * s : t + .5519 * s, r.i[0][1] = e - i, r.i[1][0] = a ? t + s : t - s, r.i[1][1] = e - .5519 * i, r.i[2][0] = a ? t + .5519 * s : t - .5519 * s, r.i[2][1] = e + i, r.i[3][0] = a ? t - s : t + s, r.i[3][1] = e + .5519 * i, r.o[0][0] = a ? t + .5519 * s : t - .5519 * s, r.o[0][1] = e - i, r.o[1][0] = a ? t + s : t - s, r.o[1][1] = e + .5519 * i, r.o[2][0] = a ? t - .5519 * s : t + .5519 * s, r.o[2][1] = e + i, r.o[3][0] = a ? t - s : t + s, r.o[3][1] = e - .5519 * i
			                        }
			                    }, x([k], t), t
			                }(),
			                    p = function() {
			                        function t(t, e) {
			                            this.v = Ht.newElement(), this.v.setPathData(!0, 0), this.elem = t, this.comp = t.comp, this.data = e, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), 1 === e.sy ? (this.ir = It.getProp(t, e.ir, 0, 0, this), this.is = It.getProp(t, e.is, 0, .01, this), this.convertToPath = this.convertStarToPath) : this.convertToPath = this.convertPolygonToPath, this.pt = It.getProp(t, e.pt, 0, 0, this), this.p = It.getProp(t, e.p, 1, 0, this), this.r = It.getProp(t, e.r, 0, kt, this), this.or = It.getProp(t, e.or, 0, 0, this), this.os = It.getProp(t, e.os, 0, .01, this), this.localShapeCollection = Gt.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertToPath())
			                        }
			                        return t.prototype = {
			                            reset: s,
			                            getValue: function() {
			                                this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertToPath())
			                            },
			                            convertStarToPath: function() {
			                                var t, e, s, i, a = 2 * Math.floor(this.pt.v),
			                                    r = 2 * Math.PI / a,
			                                    n = !0,
			                                    o = this.or.v,
			                                    h = this.ir.v,
			                                    l = this.os.v,
			                                    p = this.is.v,
			                                    f = 2 * Math.PI * o / (2 * a),
			                                    c = 2 * Math.PI * h / (2 * a),
			                                    m = -Math.PI / 2;
			                                m += this.r.v;
			                                var d = 3 === this.data.d ? -1 : 1;
			                                for (this.v._length = 0, t = 0; t < a; t += 1) {
			                                    s = n ? l : p, i = n ? f : c;
			                                    var u = (e = n ? o : h) * Math.cos(m),
			                                        g = e * Math.sin(m),
			                                        v = 0 === u && 0 === g ? 0 : g / Math.sqrt(u * u + g * g),
			                                        y = 0 === u && 0 === g ? 0 : -u / Math.sqrt(u * u + g * g);
			                                    u += +this.p.v[0], g += +this.p.v[1], this.v.setTripleAt(u, g, u - v * i * s * d, g - y * i * s * d, u + v * i * s * d, g + y * i * s * d, t, !0), n = !n, m += r * d
			                                }
			                            },
			                            convertPolygonToPath: function() {
			                                var t, e = Math.floor(this.pt.v),
			                                    s = 2 * Math.PI / e,
			                                    i = this.or.v,
			                                    a = this.os.v,
			                                    r = 2 * Math.PI * i / (4 * e),
			                                    n = -Math.PI / 2,
			                                    o = 3 === this.data.d ? -1 : 1;
			                                for (n += this.r.v, this.v._length = 0, t = 0; t < e; t += 1) {
			                                    var h = i * Math.cos(n),
			                                        l = i * Math.sin(n),
			                                        p = 0 === h && 0 === l ? 0 : l / Math.sqrt(h * h + l * l),
			                                        f = 0 === h && 0 === l ? 0 : -h / Math.sqrt(h * h + l * l);
			                                    h += +this.p.v[0], l += +this.p.v[1], this.v.setTripleAt(h, l, h - p * r * a * o, l - f * r * a * o, h + p * r * a * o, l + f * r * a * o, t, !0), n += s * o
			                                }
			                                this.paths.length = 0, this.paths[0] = this.v
			                            }
			                        }, x([k], t), t
			                    }(),
			                    f = function() {
			                        function t(t, e) {
			                            this.v = Ht.newElement(), this.v.c = !0, this.localShapeCollection = Gt.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.elem = t, this.comp = t.comp, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), this.p = It.getProp(t, e.p, 1, 0, this), this.s = It.getProp(t, e.s, 1, 0, this), this.r = It.getProp(t, e.r, 0, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertRectToPath())
			                        }
			                        return t.prototype = {
			                            convertRectToPath: function() {
			                                var t = this.p.v[0],
			                                    e = this.p.v[1],
			                                    s = this.s.v[0] / 2,
			                                    i = this.s.v[1] / 2,
			                                    a = yt(s, i, this.r.v),
			                                    r = a * (1 - .5519);
			                                this.v._length = 0, 2 === this.d || 1 === this.d ? (this.v.setTripleAt(t + s, e - i + a, t + s, e - i + a, t + s, e - i + r, 0, !0), this.v.setTripleAt(t + s, e + i - a, t + s, e + i - r, t + s, e + i - a, 1, !0), 0 !== a ? (this.v.setTripleAt(t + s - a, e + i, t + s - a, e + i, t + s - r, e + i, 2, !0), this.v.setTripleAt(t - s + a, e + i, t - s + r, e + i, t - s + a, e + i, 3, !0), this.v.setTripleAt(t - s, e + i - a, t - s, e + i - a, t - s, e + i - r, 4, !0), this.v.setTripleAt(t - s, e - i + a, t - s, e - i + r, t - s, e - i + a, 5, !0), this.v.setTripleAt(t - s + a, e - i, t - s + a, e - i, t - s + r, e - i, 6, !0), this.v.setTripleAt(t + s - a, e - i, t + s - r, e - i, t + s - a, e - i, 7, !0)) : (this.v.setTripleAt(t - s, e + i, t - s + r, e + i, t - s, e + i, 2), this.v.setTripleAt(t - s, e - i, t - s, e - i + r, t - s, e - i, 3))) : (this.v.setTripleAt(t + s, e - i + a, t + s, e - i + r, t + s, e - i + a, 0, !0), 0 !== a ? (this.v.setTripleAt(t + s - a, e - i, t + s - a, e - i, t + s - r, e - i, 1, !0), this.v.setTripleAt(t - s + a, e - i, t - s + r, e - i, t - s + a, e - i, 2, !0), this.v.setTripleAt(t - s, e - i + a, t - s, e - i + a, t - s, e - i + r, 3, !0), this.v.setTripleAt(t - s, e + i - a, t - s, e + i - r, t - s, e + i - a, 4, !0), this.v.setTripleAt(t - s + a, e + i, t - s + a, e + i, t - s + r, e + i, 5, !0), this.v.setTripleAt(t + s - a, e + i, t + s - r, e + i, t + s - a, e + i, 6, !0), this.v.setTripleAt(t + s, e + i - a, t + s, e + i - a, t + s, e + i - r, 7, !0)) : (this.v.setTripleAt(t - s, e - i, t - s + r, e - i, t - s, e - i, 1, !0), this.v.setTripleAt(t - s, e + i, t - s, e + i - r, t - s, e + i, 2, !0), this.v.setTripleAt(t + s, e + i, t + s - r, e + i, t + s, e + i, 3, !0)))
			                            },
			                            getValue: function(t) {
			                                this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertRectToPath())
			                            },
			                            reset: s
			                        }, x([k], t), t
			                    }();
			                return {
			                    getShapeProp: function(t, e, s) {
			                        var i;
			                        return 3 === s || 4 === s ? i = (3 === s ? e.pt : e.ks).k.length ? new o(t, e, s) : new r(t, e, s) : 5 === s ? i = new f(t, e) : 6 === s ? i = new l(t, e) : 7 === s && (i = new p(t, e)), i.k && t.addDynamicProperty(i), i
			                    },
			                    getConstructorFunction: function() {
			                        return r
			                    },
			                    getKeyframedConstructorFunction: function() {
			                        return o
			                    }
			                }
			            }(),
			                Nt = (Rt = {}, (Et = {}).registerModifier = function(t, e) {
			                    Rt[t] || (Rt[t] = e)
			                }, Et.getModifier = function(t, e, s) {
			                    return new Rt[t](e, s)
			                }, Et);
			            D.prototype.initModifierProperties = function() {}, D.prototype.addShapeToModifier = function() {}, D.prototype.addShape = function(t) {
			                if (!this.closed) {
			                    t.sh.container.addDynamicProperty(t.sh);
			                    var e = {
			                        shape: t.sh,
			                        data: t,
			                        localShapeCollection: Gt.newShapeCollection()
			                    };
			                    this.shapes.push(e), this.addShapeToModifier(e), this._isAnimated && t.setAsAnimated()
			                }
			            }, D.prototype.init = function(t, e) {
			                this.shapes = [], this.elem = t, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e), this.frameId = ct, this.closed = !1, this.k = !1, this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
			            }, D.prototype.processKeys = function() {
			                this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties())
			            }, x([k], D), x([D], C), C.prototype.initModifierProperties = function(t, e) {
			                this.s = It.getProp(t, e.s, 0, .01, this), this.e = It.getProp(t, e.e, 0, .01, this), this.o = It.getProp(t, e.o, 0, 0, this), this.sValue = 0, this.eValue = 0, this.getValue = this.processKeys, this.m = e.m, this._isAnimated = !! this.s.effectsSequence.length || !! this.e.effectsSequence.length || !! this.o.effectsSequence.length
			            }, C.prototype.addShapeToModifier = function(t) {
			                t.pathsData = []
			            }, C.prototype.calculateShapeEdges = function(t, e, s, i, a) {
			                var r = [];
			                e <= 1 ? r.push({
			                    s: t,
			                    e: e
			                }) : t >= 1 ? r.push({
			                    s: t - 1,
			                    e: e - 1
			                }) : (r.push({
			                    s: t,
			                    e: 1
			                }), r.push({
			                    s: 0,
			                    e: e - 1
			                }));
			                var n, o, h = [],
			                    l = r.length;
			                for (n = 0; n < l; n += 1) {
			                    var p, f;
			                    (o = r[n]).e * a < i || o.s * a > i + s || (p = o.s * a <= i ? 0 : (o.s * a - i) / s, f = o.e * a >= i + s ? 1 : (o.e * a - i) / s, h.push([p, f]))
			                }
			                return h.length || h.push([0, 0]), h
			            }, C.prototype.releasePathsData = function(t) {
			                var e, s = t.length;
			                for (e = 0; e < s; e += 1) Kt.release(t[e]);
			                return t.length = 0, t
			            }, C.prototype.processShapes = function(t) {
			                var e, s, i;
			                if (this._mdf || t) {
			                    var a = this.o.v % 360 / 360;
			                    if (a < 0 && (a += 1), (e = (this.s.v > 1 ? 1 : this.s.v < 0 ? 0 : this.s.v) + a) > (s = (this.e.v > 1 ? 1 : this.e.v < 0 ? 0 : this.e.v) + a)) {
			                        var r = e;
			                        e = s, s = r
			                    }
			                    e = 1e-4 * Math.round(1e4 * e), s = 1e-4 * Math.round(1e4 * s), this.sValue = e, this.eValue = s
			                } else e = this.sValue, s = this.eValue;
			                var n, o, h, l, p, f, c = this.shapes.length,
			                    m = 0;
			                if (s === e) for (n = 0; n < c; n += 1) this.shapes[n].localShapeCollection.releaseShapes(), this.shapes[n].shape._mdf = !0, this.shapes[n].shape.paths = this.shapes[n].localShapeCollection;
			                else if (1 === s && 0 === e || 0 === s && 1 === e) {
			                    if (this._mdf) for (n = 0; n < c; n += 1) this.shapes[n].pathsData.length = 0, this.shapes[n].shape._mdf = !0
			                } else {
			                    var d, u, g = [];
			                    for (n = 0; n < c; n += 1) if ((d = this.shapes[n]).shape._mdf || this._mdf || t || 2 === this.m) {
			                        if (h = (i = d.shape.paths)._length, f = 0, !d.shape._mdf && d.pathsData.length) f = d.totalShapeLength;
			                        else {
			                            for (l = this.releasePathsData(d.pathsData), o = 0; o < h; o += 1) p = Mt.getSegmentsLength(i.shapes[o]), l.push(p), f += p.totalLength;
			                            d.totalShapeLength = f, d.pathsData = l
			                        }
			                        m += f, d.shape._mdf = !0
			                    } else d.shape.paths = d.localShapeCollection;
			                    var v, y = e,
			                        b = s,
			                        _ = 0;
			                    for (n = c - 1; n >= 0; n -= 1) if ((d = this.shapes[n]).shape._mdf) {
			                        for ((u = d.localShapeCollection).releaseShapes(), 2 === this.m && c > 1 ? (v = this.calculateShapeEdges(e, s, d.totalShapeLength, _, m), _ += d.totalShapeLength) : v = [
			                            [y, b]
			                        ], h = v.length, o = 0; o < h; o += 1) {
			                            y = v[o][0], b = v[o][1], g.length = 0, b <= 1 ? g.push({
			                                s: d.totalShapeLength * y,
			                                e: d.totalShapeLength * b
			                            }) : y >= 1 ? g.push({
			                                s: d.totalShapeLength * (y - 1),
			                                e: d.totalShapeLength * (b - 1)
			                            }) : (g.push({
			                                s: d.totalShapeLength * y,
			                                e: d.totalShapeLength
			                            }), g.push({
			                                s: 0,
			                                e: d.totalShapeLength * (b - 1)
			                            }));
			                            var k = this.addShapes(d, g[0]);
			                            if (g[0].s !== g[0].e) {
			                                if (g.length > 1) if (d.shape.paths.shapes[d.shape.paths._length - 1].c) {
			                                    var x = k.pop();
			                                    this.addPaths(k, u), k = this.addShapes(d, g[1], x)
			                                } else this.addPaths(k, u), k = this.addShapes(d, g[1]);
			                                this.addPaths(k, u)
			                            }
			                        }
			                        d.shape.paths = u
			                    }
			                }
			            }, C.prototype.addPaths = function(t, e) {
			                var s, i = t.length;
			                for (s = 0; s < i; s += 1) e.addShape(t[s])
			            }, C.prototype.addSegment = function(t, e, s, i, a, r, n) {
			                a.setXYAt(e[0], e[1], "o", r), a.setXYAt(s[0], s[1], "i", r + 1), n && a.setXYAt(t[0], t[1], "v", r), a.setXYAt(i[0], i[1], "v", r + 1)
			            }, C.prototype.addSegmentFromArray = function(t, e, s, i) {
			                e.setXYAt(t[1], t[5], "o", s), e.setXYAt(t[2], t[6], "i", s + 1), i && e.setXYAt(t[0], t[4], "v", s), e.setXYAt(t[3], t[7], "v", s + 1)
			            }, C.prototype.addShapes = function(t, e, s) {
			                var i, a, r, n, o, h, l, p, f = t.pathsData,
			                    c = t.shape.paths.shapes,
			                    m = t.shape.paths._length,
			                    d = 0,
			                    u = [],
			                    g = !0;
			                for (s ? (o = s._length, p = s._length) : (s = Ht.newElement(), o = 0, p = 0), u.push(s), i = 0; i < m; i += 1) {
			                    for (h = f[i].lengths, s.c = c[i].c, r = c[i].c ? h.length : h.length + 1, a = 1; a < r; a += 1) if (d + (n = h[a - 1]).addedLength < e.s) d += n.addedLength, s.c = !1;
			                    else {
			                        if (d > e.e) {
			                            s.c = !1;
			                            break
			                        }
			                        e.s <= d && e.e >= d + n.addedLength ? (this.addSegment(c[i].v[a - 1], c[i].o[a - 1], c[i].i[a], c[i].v[a], s, o, g), g = !1) : (l = Mt.getNewSegment(c[i].v[a - 1], c[i].v[a], c[i].o[a - 1], c[i].i[a], (e.s - d) / n.addedLength, (e.e - d) / n.addedLength, h[a - 1]), this.addSegmentFromArray(l, s, o, g), g = !1, s.c = !1), d += n.addedLength, o += 1
			                    }
			                    if (c[i].c && h.length) {
			                        if (n = h[a - 1], d <= e.e) {
			                            var v = h[a - 1].addedLength;
			                            e.s <= d && e.e >= d + v ? (this.addSegment(c[i].v[a - 1], c[i].o[a - 1], c[i].i[0], c[i].v[0], s, o, g), g = !1) : (l = Mt.getNewSegment(c[i].v[a - 1], c[i].v[0], c[i].o[a - 1], c[i].i[0], (e.s - d) / v, (e.e - d) / v, h[a - 1]), this.addSegmentFromArray(l, s, o, g), g = !1, s.c = !1)
			                        } else s.c = !1;
			                        d += n.addedLength, o += 1
			                    }
			                    if (s._length && (s.setXYAt(s.v[p][0], s.v[p][1], "i", p), s.setXYAt(s.v[s._length - 1][0], s.v[s._length - 1][1], "o", s._length - 1)), d > e.e) break;
			                    i < m - 1 && (s = Ht.newElement(), g = !0, u.push(s), o = 0)
			                }
			                return u
			            }, Nt.registerModifier("tm", C), x([D], T), T.prototype.initModifierProperties = function(t, e) {
			                this.getValue = this.processKeys, this.rd = It.getProp(t, e.r, 0, null, this), this._isAnimated = !! this.rd.effectsSequence.length
			            }, T.prototype.processPath = function(t, e) {
			                var s = Ht.newElement();
			                s.c = t.c;
			                var i, a, r, n, o, h, l, p, f, c, m, d, u, g = t._length,
			                    v = 0;
			                for (i = 0; i < g; i += 1) a = t.v[i], n = t.o[i], r = t.i[i], a[0] === n[0] && a[1] === n[1] && a[0] === r[0] && a[1] === r[1] ? 0 !== i && i !== g - 1 || t.c ? (o = 0 === i ? t.v[g - 1] : t.v[i - 1], l = (h = Math.sqrt(Math.pow(a[0] - o[0], 2) + Math.pow(a[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0, p = d = a[0] + (o[0] - a[0]) * l, f = u = a[1] - (a[1] - o[1]) * l, c = p - .5519 * (p - a[0]), m = f - .5519 * (f - a[1]), s.setTripleAt(p, f, c, m, d, u, v), v += 1, o = i === g - 1 ? t.v[0] : t.v[i + 1], l = (h = Math.sqrt(Math.pow(a[0] - o[0], 2) + Math.pow(a[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0, p = c = a[0] + (o[0] - a[0]) * l, f = m = a[1] + (o[1] - a[1]) * l, d = p - .5519 * (p - a[0]), u = f - .5519 * (f - a[1]), s.setTripleAt(p, f, c, m, d, u, v), v += 1) : (s.setTripleAt(a[0], a[1], n[0], n[1], r[0], r[1], v), v += 1) : (s.setTripleAt(t.v[i][0], t.v[i][1], t.o[i][0], t.o[i][1], t.i[i][0], t.i[i][1], v), v += 1);
			                return s
			            }, T.prototype.processShapes = function(t) {
			                var e, s, i, a, r, n, o = this.shapes.length,
			                    h = this.rd.v;
			                if (0 !== h) for (s = 0; s < o; s += 1) {
			                    if ((r = this.shapes[s]).shape.paths, n = r.localShapeCollection, r.shape._mdf || this._mdf || t) for (n.releaseShapes(), r.shape._mdf = !0, e = r.shape.paths.shapes, a = r.shape.paths._length, i = 0; i < a; i += 1) n.addShape(this.processPath(e[i], h));
			                    r.shape.paths = r.localShapeCollection
			                }
			                this.dynamicProperties.length || (this._mdf = !1)
			            }, Nt.registerModifier("rd", T), x([D], S), S.prototype.initModifierProperties = function(t, e) {
			                this.getValue = this.processKeys, this.c = It.getProp(t, e.c, 0, null, this), this.o = It.getProp(t, e.o, 0, null, this), this.tr = Lt.getTransformProperty(t, e.tr, this), this.so = It.getProp(t, e.tr.so, 0, .01, this), this.eo = It.getProp(t, e.tr.eo, 0, .01, this), this.data = e, this.dynamicProperties.length || this.getValue(!0), this._isAnimated = !! this.dynamicProperties.length, this.pMatrix = new St, this.rMatrix = new St, this.sMatrix = new St, this.tMatrix = new St, this.matrix = new St
			            }, S.prototype.applyTransforms = function(t, e, s, i, a, r) {
			                var n = r ? -1 : 1,
			                    o = i.s.v[0] + (1 - i.s.v[0]) * (1 - a),
			                    h = i.s.v[1] + (1 - i.s.v[1]) * (1 - a);
			                t.translate(i.p.v[0] * n * a, i.p.v[1] * n * a, i.p.v[2]), e.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), e.rotate(-i.r.v * n * a), e.translate(i.a.v[0], i.a.v[1], i.a.v[2]), s.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), s.scale(r ? 1 / o : o, r ? 1 / h : h), s.translate(i.a.v[0], i.a.v[1], i.a.v[2])
			            }, S.prototype.init = function(t, e, s, i) {
			                for (this.elem = t, this.arr = e, this.pos = s, this.elemsData = i, this._currentCopies = 0, this._elements = [], this._groups = [], this.frameId = -1, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e[s]); s > 0;) s -= 1, this._elements.unshift(e[s]);
			                this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
			            }, S.prototype.resetElements = function(t) {
			                var e, s = t.length;
			                for (e = 0; e < s; e += 1) t[e]._processed = !1, "gr" === t[e].ty && this.resetElements(t[e].it)
			            }, S.prototype.cloneElements = function(t) {
			                t.length;
			                var e = JSON.parse(JSON.stringify(t));
			                return this.resetElements(e), e
			            }, S.prototype.changeGroupRender = function(t, e) {
			                var s, i = t.length;
			                for (s = 0; s < i; s += 1) t[s]._render = e, "gr" === t[s].ty && this.changeGroupRender(t[s].it, e)
			            }, S.prototype.processShapes = function(t) {
			                var e, s, i, a, r;
			                if (this._mdf || t) {
			                    var n, o = Math.ceil(this.c.v);
			                    if (this._groups.length < o) {
			                        for (; this._groups.length < o;) {
			                            var h = {
			                                it: this.cloneElements(this._elements),
			                                ty: "gr"
			                            };
			                            h.it.push({
			                                a: {
			                                    a: 0,
			                                    ix: 1,
			                                    k: [0, 0]
			                                },
			                                nm: "Transform",
			                                o: {
			                                    a: 0,
			                                    ix: 7,
			                                    k: 100
			                                },
			                                p: {
			                                    a: 0,
			                                    ix: 2,
			                                    k: [0, 0]
			                                },
			                                r: {
			                                    a: 1,
			                                    ix: 6,
			                                    k: [{
			                                        s: 0,
			                                        e: 0,
			                                        t: 0
			                                    }, {
			                                        s: 0,
			                                        e: 0,
			                                        t: 1
			                                    }]
			                                },
			                                s: {
			                                    a: 0,
			                                    ix: 3,
			                                    k: [100, 100]
			                                },
			                                sa: {
			                                    a: 0,
			                                    ix: 5,
			                                    k: 0
			                                },
			                                sk: {
			                                    a: 0,
			                                    ix: 4,
			                                    k: 0
			                                },
			                                ty: "tr"
			                            }), this.arr.splice(0, 0, h), this._groups.splice(0, 0, h), this._currentCopies += 1
			                        }
			                        this.elem.reloadShapes()
			                    }
			                    for (r = 0, i = 0; i <= this._groups.length - 1; i += 1) n = r < o, this._groups[i]._render = n, this.changeGroupRender(this._groups[i].it, n), r += 1;
			                    this._currentCopies = o;
			                    var l = this.o.v,
			                        p = l % 1,
			                        f = l > 0 ? Math.floor(l) : Math.ceil(l),
			                        c = (this.tr.v.props, this.pMatrix.props),
			                        m = this.rMatrix.props,
			                        d = this.sMatrix.props;
			                    this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset();
			                    var u, g, v = 0;
			                    if (l > 0) {
			                        for (; v < f;) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), v += 1;
			                        p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, p, !1), v += p)
			                    } else if (l < 0) {
			                        for (; v > f;) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0), v -= 1;
			                        p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -p, !0), v -= p)
			                    }
			                    for (i = 1 === this.data.m ? 0 : this._currentCopies - 1, a = 1 === this.data.m ? 1 : -1, r = this._currentCopies; r;) {
			                        if (g = (s = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props).length, e[e.length - 1].transform.mProps._mdf = !0, e[e.length - 1].transform.op._mdf = !0, e[e.length - 1].transform.op.v = this.so.v + (this.eo.v - this.so.v) * (i / (this._currentCopies - 1)), 0 !== v) {
			                            for ((0 !== i && 1 === a || i !== this._currentCopies - 1 && -1 === a) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), this.matrix.transform(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]), this.matrix.transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8], d[9], d[10], d[11], d[12], d[13], d[14], d[15]), this.matrix.transform(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]), u = 0; u < g; u += 1) s[u] = this.matrix.props[u];
			                            this.matrix.reset()
			                        } else for (this.matrix.reset(), u = 0; u < g; u += 1) s[u] = this.matrix.props[u];
			                        v += 1, r -= 1, i += a
			                    }
			                } else for (r = this._currentCopies, i = 0, a = 1; r;) s = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props, e[e.length - 1].transform.mProps._mdf = !1, e[e.length - 1].transform.op._mdf = !1, r -= 1, i += a
			            }, S.prototype.addShape = function() {}, Nt.registerModifier("rp", S), w.prototype.addShape = function(t) {
			                this._length === this._maxLength && (this.shapes = this.shapes.concat(b(this._maxLength)), this._maxLength *= 2), this.shapes[this._length] = t, this._length += 1
			            }, w.prototype.releaseShapes = function() {
			                var t;
			                for (t = 0; t < this._length; t += 1) Ht.release(this.shapes[t]);
			                this._length = 0
			            }, M.prototype.getValue = function(t) {
			                if ((this.elem.globalData.frameId !== this.frameId || t) && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf = this._mdf || t, this._mdf)) {
			                    var e = 0,
			                        s = this.dataProps.length;
			                    for (e = 0; e < s; e += 1) "o" != this.dataProps[e].n ? this.dashArray[e] = this.dataProps[e].p.v : this.dashoffset[0] = this.dataProps[e].p.v
			                }
			            }, x([k], M), F.prototype.comparePoints = function(t, e) {
			                for (var s = 0, i = this.o.length / 2; s < i;) {
			                    if (Math.abs(t[4 * s] - t[4 * e + 2 * s]) > .01) return !1;
			                    s += 1
			                }
			                return !0
			            }, F.prototype.checkCollapsable = function() {
			                if (this.o.length / 2 != this.c.length / 4) return !1;
			                if (this.data.k.k[0].s) for (var t = 0, e = this.data.k.k.length; t < e;) {
			                    if (!this.comparePoints(this.data.k.k[t].s, this.data.p)) return !1;
			                    t += 1
			                } else if (!this.comparePoints(this.data.k.k, this.data.p)) return !1;
			                return !0
			            }, F.prototype.getValue = function(t) {
			                if (this.prop.getValue(), this._mdf = !1, this._cmdf = !1, this._omdf = !1, this.prop._mdf || t) {
			                    var e, s, i, a = 4 * this.data.p;
			                    for (e = 0; e < a; e += 1) s = e % 4 == 0 ? 100 : 255, i = Math.round(this.prop.v[e] * s), this.c[e] !== i && (this.c[e] = i, this._cmdf = !t);
			                    if (this.o.length) for (a = this.prop.v.length, e = 4 * this.data.p; e < a; e += 1) s = e % 2 == 0 ? 100 : 1, i = e % 2 == 0 ? Math.round(100 * this.prop.v[e]) : this.prop.v[e], this.o[e - 4 * this.data.p] !== i && (this.o[e - 4 * this.data.p] = i, this._omdf = !t);
			                    this._mdf = !t
			                }
			            }, x([k], F);
			            var Vt = function(t, e, s, i) {
			                if (0 === e) return "";
			                var a, r = t.o,
			                    n = t.i,
			                    o = t.v,
			                    h = " M" + i.applyToPointStringified(o[0][0], o[0][1]);
			                for (a = 1; a < e; a += 1) h += " C" + i.applyToPointStringified(r[a - 1][0], r[a - 1][1]) + " " + i.applyToPointStringified(n[a][0], n[a][1]) + " " + i.applyToPointStringified(o[a][0], o[a][1]);
			                return s && e && (h += " C" + i.applyToPointStringified(r[a - 1][0], r[a - 1][1]) + " " + i.applyToPointStringified(n[0][0], n[0][1]) + " " + i.applyToPointStringified(o[0][0], o[0][1]), h += "z"), h
			            }, zt = function() {
			                function t() {
			                    this.loadedAssets += 1, this.loadedAssets === this.totalImages && this.imagesLoadedCb && this.imagesLoadedCb(null)
			                }
			                function e(t) {
			                    var e = function(t, e, s) {
			                        var i = "";
			                        if (t.e) i = t.p;
			                        else if (e) {
			                            var a = t.p; - 1 !== a.indexOf("images/") && (a = a.split("/")[1]), i = e + a
			                        } else i = s, i += t.u ? t.u : "", i += t.p;
			                        return i
			                    }(t, this.assetsPath, this.path),
			                        s = _("img");
			                    s.crossOrigin = "anonymous", s.addEventListener("load", this._imageLoaded.bind(this), !1), s.addEventListener("error", function() {
			                        i.img = h, this._imageLoaded()
			                    }.bind(this), !1), s.src = e;
			                    var i = {
			                        img: s,
			                        assetData: t
			                    };
			                    return i
			                }
			                function s(t, e) {
			                    this.imagesLoadedCb = e;
			                    var s, i = t.length;
			                    for (s = 0; s < i; s += 1) t[s].layers || (this.totalImages += 1, this.images.push(this._createImageData(t[s])))
			                }
			                function i(t) {
			                    this.path = t || ""
			                }
			                function a(t) {
			                    this.assetsPath = t || ""
			                }
			                function r(t) {
			                    for (var e = 0, s = this.images.length; e < s;) {
			                        if (this.images[e].assetData === t) return this.images[e].img;
			                        e += 1
			                    }
			                }
			                function n() {
			                    this.imagesLoadedCb = null, this.images.length = 0
			                }
			                function o() {
			                    return this.totalImages === this.loadedAssets
			                }
			                var h = function() {
			                    var t = _("canvas");
			                    t.width = 1, t.height = 1;
			                    var e = t.getContext("2d");
			                    return e.fillStyle = "rgba(0,0,0,0)", e.fillRect(0, 0, 1, 1), t
			                }();
			                return function() {
			                    this.loadAssets = s, this.setAssetsPath = a, this.setPath = i, this.loaded = o, this.destroy = n, this.getImage = r, this._createImageData = e, this._imageLoaded = t, this.assetsPath = "", this.path = "", this.totalImages = 0, this.loadedAssets = 0, this.imagesLoadedCb = null, this.images = []
			                }
			            }(),
			                qt = (function() {
			                    var t = {
			                        maskType: !0
			                    };
			                    (/MSIE 10/i.test(h.userAgent) || /MSIE 9/i.test(h.userAgent) || /rv:11.0/i.test(h.userAgent) || /Edge\/\d./i.test(h.userAgent)) && (t.maskType = !1)
			                }(), function() {
			                    var t = {};
			                    t.createFilter = function(t) {
			                        var e = createNS("filter");
			                        return e.setAttribute("id", t), e.setAttribute("filterUnits", "objectBoundingBox"), e.setAttribute("x", "0%"), e.setAttribute("y", "0%"), e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), e
			                    }, t.createAlphaToLuminanceFilter = function() {
			                        var t = createNS("feColorMatrix");
			                        return t.setAttribute("type", "matrix"), t.setAttribute("color-interpolation-filters", "sRGB"), t.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"), t
			                    }
			                }(), function() {
			                    function t(t) {
			                        return t.response && "object" === a(t.response) ? t.response : t.response && "string" == typeof t.response ? JSON.parse(t.response) : t.responseText ? JSON.parse(t.responseText) : void 0
			                    }
			                    return {
			                        load: function(e, s, i) {
			                            for (var a = 0; a < ie.length; a++) if (ie[a].path === e) return void s(ie[a].data);
			                            var r, n = new XMLHttpRequest;
			                            n.open("GET", e, !0);
			                            try {
			                                n.responseType = "json"
			                            } catch (t) {}
			                            n.send(), n.onreadystatechange = function() {
			                                if (4 == n.readyState) if (200 == n.status) r = t(n), ie.push({
			                                    path: e,
			                                    data: r
			                                }), s(r);
			                                else try {
			                                    r = t(n), ie.push({
			                                        path: e,
			                                        data: r
			                                    }), s(r)
			                                } catch (t) {
			                                    i && i(t)
			                                }
			                            }
			                        }
			                    }
			                }());
			            A.prototype.searchProperties = function() {
			                var t, e, s = this._textData.a.length,
			                    i = It.getProp;
			                for (t = 0; t < s; t += 1) e = this._textData.a[t], this._animatorsData[t] = new I(this._elem, e, this);
			                this._textData.p && "m" in this._textData.p ? (this._pathData = {
			                    f: i(this._elem, this._textData.p.f, 0, 0, this),
			                    l: i(this._elem, this._textData.p.l, 0, 0, this),
			                    r: this._textData.p.r,
			                    m: this._elem.maskManager.getMaskProperty(this._textData.p.m)
			                }, this._hasMaskedPath = !0) : this._hasMaskedPath = !1, this._moreOptions.alignment = i(this._elem, this._textData.m.a, 1, 0, this)
			            }, A.prototype.getMeasures = function(t, e) {
			                if (this.lettersChangedFlag = e, this._mdf || this._isFirstFrame || e || this._hasMaskedPath && this._pathData.m._mdf) {
			                    this._isFirstFrame = !1;
			                    var s, i, a, r, n, o, h, l, p, f, c, m, d, y, b, _, k, x, P, D = this._moreOptions.alignment.v,
			                        C = this._animatorsData,
			                        T = this._textData,
			                        S = this.mHelper,
			                        w = (this._renderType, this.renderedLetters.length),
			                        M = (this.data, t.l);
			                    if (this._hasMaskedPath) {
			                        if (P = this._pathData.m, !this._pathData.n || this._pathData._mdf) {
			                            var F, A = P.v;
			                            for (this._pathData.r && (A = A.reverse()), n = {
			                                tLength: 0,
			                                segments: []
			                            }, r = A._length - 1, _ = 0, a = 0; a < r; a += 1) F = Mt.buildBezierData(A.v[a], A.v[a + 1], [A.o[a][0] - A.v[a][0], A.o[a][1] - A.v[a][1]], [A.i[a + 1][0] - A.v[a + 1][0], A.i[a + 1][1] - A.v[a + 1][1]]), n.tLength += F.segmentLength, n.segments.push(F), _ += F.segmentLength;
			                            a = r, P.v.c && (F = Mt.buildBezierData(A.v[a], A.v[0], [A.o[a][0] - A.v[a][0], A.o[a][1] - A.v[a][1]], [A.i[0][0] - A.v[0][0], A.i[0][1] - A.v[0][1]]), n.tLength += F.segmentLength, n.segments.push(F), _ += F.segmentLength), this._pathData.pi = n
			                        }
			                        if (n = this._pathData.pi, o = this._pathData.f.v, c = 0, f = 1, l = 0, p = !0, y = n.segments, o < 0 && P.v.c) for (n.tLength < Math.abs(o) && (o = -Math.abs(o) % n.tLength), f = (d = y[c = y.length - 1].points).length - 1; o < 0;) o += d[f].partialLength, (f -= 1) < 0 && (f = (d = y[c -= 1].points).length - 1);
			                        m = (d = y[c].points)[f - 1], b = (h = d[f]).partialLength
			                    }
			                    r = M.length, s = 0, i = 0;
			                    var I, E, R, O, N = 1.2 * t.finalSize * .714,
			                        V = !0;
			                    R = C.length;
			                    var z, q, j, W, Y, B, X, H, G, K, J, Z, U, Q = -1,
			                        $ = o,
			                        tt = c,
			                        et = f,
			                        st = -1,
			                        it = "",
			                        at = this.defaultPropsArray;
			                    if (2 === t.j || 1 === t.j) {
			                        var rt = 0,
			                            nt = 0,
			                            ot = 2 === t.j ? -.5 : -1,
			                            ht = 0,
			                            lt = !0;
			                        for (a = 0; a < r; a += 1) if (M[a].n) {
			                            for (rt && (rt += nt); ht < a;) M[ht].animatorJustifyOffset = rt, ht += 1;
			                            rt = 0, lt = !0
			                        } else {
			                            for (E = 0; E < R; E += 1)(I = C[E].a).t.propType && (lt && 2 === t.j && (nt += I.t.v * ot), (z = C[E].s.getMult(M[a].anIndexes[E], T.a[E].s.totalChars)).length ? rt += I.t.v * z[0] * ot : rt += I.t.v * z * ot);
			                            lt = !1
			                        }
			                        for (rt && (rt += nt); ht < a;) M[ht].animatorJustifyOffset = rt, ht += 1
			                    }
			                    for (a = 0; a < r; a += 1) {
			                        if (S.reset(), Y = 1, M[a].n) s = 0, i += t.yOffset, i += V ? 1 : 0, o = $, V = !1, this._hasMaskedPath && (f = et, m = (d = y[c = tt].points)[f - 1], b = (h = d[f]).partialLength, l = 0), U = K = Z = it = "", at = this.defaultPropsArray;
			                        else {
			                            if (this._hasMaskedPath) {
			                                if (st !== M[a].line) {
			                                    switch (t.j) {
			                                        case 1:
			                                            o += _ - t.lineWidths[M[a].line];
			                                            break;
			                                        case 2:
			                                            o += (_ - t.lineWidths[M[a].line]) / 2
			                                    }
			                                    st = M[a].line
			                                }
			                                Q !== M[a].ind && (M[Q] && (o += M[Q].extra), o += M[a].an / 2, Q = M[a].ind), o += D[0] * M[a].an / 200;
			                                var pt = 0;
			                                for (E = 0; E < R; E += 1)(I = C[E].a).p.propType && ((z = C[E].s.getMult(M[a].anIndexes[E], T.a[E].s.totalChars)).length ? pt += I.p.v[0] * z[0] : pt += I.p.v[0] * z), I.a.propType && ((z = C[E].s.getMult(M[a].anIndexes[E], T.a[E].s.totalChars)).length ? pt += I.a.v[0] * z[0] : pt += I.a.v[0] * z);
			                                for (p = !0; p;) l + b >= o + pt || !d ? (k = (o + pt - l) / h.partialLength, j = m.point[0] + (h.point[0] - m.point[0]) * k, W = m.point[1] + (h.point[1] - m.point[1]) * k, S.translate(-D[0] * M[a].an / 200, -D[1] * N / 100), p = !1) : d && (l += h.partialLength, (f += 1) >= d.length && (f = 0, y[c += 1] ? d = y[c].points : P.v.c ? (f = 0, d = y[c = 0].points) : (l -= h.partialLength, d = null)), d && (m = h, b = (h = d[f]).partialLength));
			                                q = M[a].an / 2 - M[a].add, S.translate(-q, 0, 0)
			                            } else q = M[a].an / 2 - M[a].add, S.translate(-q, 0, 0), S.translate(-D[0] * M[a].an / 200, -D[1] * N / 100, 0);
			                            for (M[a].l, E = 0; E < R; E += 1)(I = C[E].a).t.propType && (z = C[E].s.getMult(M[a].anIndexes[E], T.a[E].s.totalChars), 0 === s && 0 === t.j || (this._hasMaskedPath ? z.length ? o += I.t.v * z[0] : o += I.t.v * z : z.length ? s += I.t.v * z[0] : s += I.t.v * z));
			                            for (M[a].l, t.strokeWidthAnim && (X = t.sw || 0), t.strokeColorAnim && (B = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]), t.fillColorAnim && t.fc && (H = [t.fc[0], t.fc[1], t.fc[2]]), E = 0; E < R; E += 1)(I = C[E].a).a.propType && ((z = C[E].s.getMult(M[a].anIndexes[E], T.a[E].s.totalChars)).length ? S.translate(-I.a.v[0] * z[0], -I.a.v[1] * z[1], I.a.v[2] * z[2]) : S.translate(-I.a.v[0] * z, -I.a.v[1] * z, I.a.v[2] * z));
			                            for (E = 0; E < R; E += 1)(I = C[E].a).s.propType && ((z = C[E].s.getMult(M[a].anIndexes[E], T.a[E].s.totalChars)).length ? S.scale(1 + (I.s.v[0] - 1) * z[0], 1 + (I.s.v[1] - 1) * z[1], 1) : S.scale(1 + (I.s.v[0] - 1) * z, 1 + (I.s.v[1] - 1) * z, 1));
			                            for (E = 0; E < R; E += 1) {
			                                if (I = C[E].a, z = C[E].s.getMult(M[a].anIndexes[E], T.a[E].s.totalChars), I.sk.propType && (z.length ? S.skewFromAxis(-I.sk.v * z[0], I.sa.v * z[1]) : S.skewFromAxis(-I.sk.v * z, I.sa.v * z)), I.r.propType && (z.length ? S.rotateZ(-I.r.v * z[2]) : S.rotateZ(-I.r.v * z)), I.ry.propType && (z.length ? S.rotateY(I.ry.v * z[1]) : S.rotateY(I.ry.v * z)), I.rx.propType && (z.length ? S.rotateX(I.rx.v * z[0]) : S.rotateX(I.rx.v * z)), I.o.propType && (z.length ? Y += (I.o.v * z[0] - Y) * z[0] : Y += (I.o.v * z - Y) * z), t.strokeWidthAnim && I.sw.propType && (z.length ? X += I.sw.v * z[0] : X += I.sw.v * z), t.strokeColorAnim && I.sc.propType) for (G = 0; G < 3; G += 1) z.length ? B[G] = B[G] + (I.sc.v[G] - B[G]) * z[0] : B[G] = B[G] + (I.sc.v[G] - B[G]) * z;
			                                if (t.fillColorAnim && t.fc) {
			                                    if (I.fc.propType) for (G = 0; G < 3; G += 1) z.length ? H[G] = H[G] + (I.fc.v[G] - H[G]) * z[0] : H[G] = H[G] + (I.fc.v[G] - H[G]) * z;
			                                    I.fh.propType && (H = z.length ? v(H, I.fh.v * z[0]) : v(H, I.fh.v * z)), I.fs.propType && (H = z.length ? u(H, I.fs.v * z[0]) : u(H, I.fs.v * z)), I.fb.propType && (H = z.length ? g(H, I.fb.v * z[0]) : g(H, I.fb.v * z))
			                                }
			                            }
			                            for (E = 0; E < R; E += 1)(I = C[E].a).p.propType && (z = C[E].s.getMult(M[a].anIndexes[E], T.a[E].s.totalChars), this._hasMaskedPath ? z.length ? S.translate(0, I.p.v[1] * z[0], -I.p.v[2] * z[1]) : S.translate(0, I.p.v[1] * z, -I.p.v[2] * z) : z.length ? S.translate(I.p.v[0] * z[0], I.p.v[1] * z[1], -I.p.v[2] * z[2]) : S.translate(I.p.v[0] * z, I.p.v[1] * z, -I.p.v[2] * z));
			                            if (t.strokeWidthAnim && (K = X < 0 ? 0 : X), t.strokeColorAnim && (J = "rgb(" + Math.round(255 * B[0]) + "," + Math.round(255 * B[1]) + "," + Math.round(255 * B[2]) + ")"), t.fillColorAnim && t.fc && (Z = "rgb(" + Math.round(255 * H[0]) + "," + Math.round(255 * H[1]) + "," + Math.round(255 * H[2]) + ")"), this._hasMaskedPath) {
			                                if (S.translate(0, -t.ls), S.translate(0, D[1] * N / 100 + i, 0), T.p.p) {
			                                    x = (h.point[1] - m.point[1]) / (h.point[0] - m.point[0]);
			                                    var ft = 180 * Math.atan(x) / Math.PI;
			                                    h.point[0] < m.point[0] && (ft += 180), S.rotate(-ft * Math.PI / 180)
			                                }
			                                S.translate(j, W, 0), o -= D[0] * M[a].an / 200, M[a + 1] && Q !== M[a + 1].ind && (o += M[a].an / 2, o += t.tr / 1e3 * t.finalSize)
			                            } else {
			                                switch (S.translate(s, i, 0), t.ps && S.translate(t.ps[0], t.ps[1] + t.ascent, 0), t.j) {
			                                    case 1:
			                                        S.translate(M[a].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[M[a].line]), 0, 0);
			                                        break;
			                                    case 2:
			                                        S.translate(M[a].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[M[a].line]) / 2, 0, 0)
			                                }
			                                S.translate(0, -t.ls), S.translate(q, 0, 0), S.translate(D[0] * M[a].an / 200, D[1] * N / 100, 0), s += M[a].l + t.tr / 1e3 * t.finalSize
			                            }
			                            at = [S.props[0], S.props[1], S.props[2], S.props[3], S.props[4], S.props[5], S.props[6], S.props[7], S.props[8], S.props[9], S.props[10], S.props[11], S.props[12], S.props[13], S.props[14], S.props[15]], U = Y
			                        }
			                        w <= a ? (O = new L(U, K, J, Z, it, at), this.renderedLetters.push(O), w += 1, this.lettersChangedFlag = !0) : (O = this.renderedLetters[a], this.lettersChangedFlag = O.update(U, K, J, Z, it, at) || this.lettersChangedFlag)
			                    }
			                }
			            }, A.prototype.getValue = function() {
			                this._elem.globalData.frameId !== this._frameId && (this._frameId = this._elem.globalData.frameId, this.iterateDynamicProperties())
			            }, A.prototype.mHelper = new St, A.prototype.defaultPropsArray = [], x([k], A), L.prototype.update = function(t, e, s, i, a, r) {
			                this._mdf.o = !1, this._mdf.sw = !1, this._mdf.sc = !1, this._mdf.fc = !1, this._mdf.m = !1, this._mdf.p = !1;
			                var n = !1;
			                return this.o !== t && (this.o = t, this._mdf.o = !0, n = !0), this.sw !== e && (this.sw = e, this._mdf.sw = !0, n = !0), this.sc !== s && (this.sc = s, this._mdf.sc = !0, n = !0), this.fc !== i && (this.fc = i, this._mdf.fc = !0, n = !0), this.m !== a && (this.m = a, this._mdf.m = !0, n = !0), !r.length || this.p[0] === r[0] && this.p[1] === r[1] && this.p[4] === r[4] && this.p[5] === r[5] && this.p[12] === r[12] && this.p[13] === r[13] || (this.p = r, this._mdf.p = !0, n = !0), n
			            }, E.prototype.defaultBoxWidth = [0, 0], E.prototype.copyData = function(t, e) {
			                for (var s in e) e.hasOwnProperty(s) && (t[s] = e[s]);
			                return t
			            }, E.prototype.setCurrentData = function(t) {
			                t.__complete || this.completeTextData(t), this.currentData = t, this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth, this._mdf = !0
			            }, E.prototype.searchProperty = function() {
			                return this.searchKeyframes()
			            }, E.prototype.searchKeyframes = function() {
			                return this.kf = this.data.d.k.length > 1, this.kf && this.addEffect(this.getKeyframeValue.bind(this)), this.kf
			            }, E.prototype.addEffect = function(t) {
			                this.effectsSequence.push(t), this.elem.addDynamicProperty(this)
			            }, E.prototype.getValue = function(t) {
			                if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length || t) {
			                    this.currentData.t = this.data.d.k[this.keysIndex].s.t;
			                    var e = this.currentData,
			                        s = this.keysIndex;
			                    if (this.lock) this.setCurrentData(this.currentData);
			                    else {
			                        this.lock = !0, this._mdf = !1;
			                        var i, a = this.effectsSequence.length,
			                            r = t || this.data.d.k[this.keysIndex].s;
			                        for (i = 0; i < a; i += 1) r = s !== this.keysIndex ? this.effectsSequence[i](r, r.t) : this.effectsSequence[i](this.currentData, r.t);
			                        e !== r && this.setCurrentData(r), this.pv = this.v = this.currentData, this.lock = !1, this.frameId = this.elem.globalData.frameId
			                    }
			                }
			            }, E.prototype.getKeyframeValue = function() {
			                for (var t = this.data.d.k, e = this.elem.comp.renderedFrame, s = 0, i = t.length; s <= i - 1 && (t[s].s, !(s === i - 1 || t[s + 1].t > e));) s += 1;
			                return this.keysIndex !== s && (this.keysIndex = s), this.data.d.k[this.keysIndex].s
			            }, E.prototype.buildFinalText = function(t) {
			                for (var e, s = At.getCombinedCharacterCodes(), i = [], a = 0, r = t.length; a < r;) e = t.charCodeAt(a), -1 !== s.indexOf(e) ? i[i.length - 1] += t.charAt(a) : e >= 55296 && e <= 56319 && (e = t.charCodeAt(a + 1)) >= 56320 && e <= 57343 ? (i.push(t.substr(a, 2)), ++a) : i.push(t.charAt(a)), a += 1;
			                return i
			            }, E.prototype.completeTextData = function(t) {
			                t.__complete = !0;
			                var e, s, i, a, r, n, o, h = this.elem.globalData.fontManager,
			                    l = this.data,
			                    p = [],
			                    f = 0,
			                    c = l.m.g,
			                    m = 0,
			                    d = 0,
			                    u = 0,
			                    g = [],
			                    v = 0,
			                    y = 0,
			                    b = h.getFontByName(t.f),
			                    _ = 0,
			                    k = b.fStyle ? b.fStyle.split(" ") : [],
			                    x = "normal",
			                    P = "normal";
			                for (s = k.length, e = 0; e < s; e += 1) switch (k[e].toLowerCase()) {
			                    case "italic":
			                        P = "italic";
			                        break;
			                    case "bold":
			                        x = "700";
			                        break;
			                    case "black":
			                        x = "900";
			                        break;
			                    case "medium":
			                        x = "500";
			                        break;
			                    case "regular":
			                    case "normal":
			                        x = "400";
			                        break;
			                    case "light":
			                    case "thin":
			                        x = "200"
			                }
			                t.fWeight = b.fWeight || x, t.fStyle = P, t.finalSize = t.s, t.finalText = this.buildFinalText(t.t), s = t.finalText.length, t.finalLineHeight = t.lh;
			                var D, C = t.tr / 1e3 * t.finalSize;
			                if (t.sz) for (var T, S, w = !0, M = t.sz[0], F = t.sz[1]; w;) {
			                    T = 0, v = 0, s = (S = this.buildFinalText(t.t)).length, C = t.tr / 1e3 * t.finalSize;
			                    var A = -1;
			                    for (e = 0; e < s; e += 1) D = S[e].charCodeAt(0), i = !1, " " === S[e] ? A = e : 13 !== D && 3 !== D || (v = 0, i = !0, T += t.finalLineHeight || 1.2 * t.finalSize), h.chars ? (o = h.getCharData(S[e], b.fStyle, b.fFamily), _ = i ? 0 : o.w * t.finalSize / 100) : _ = h.measureText(S[e], t.f, t.finalSize), v + _ > M && " " !== S[e] ? (-1 === A ? s += 1 : e = A, T += t.finalLineHeight || 1.2 * t.finalSize, S.splice(e, A === e ? 1 : 0, "\r"), A = -1, v = 0) : (v += _, v += C);
			                    T += b.ascent * t.finalSize / 100, this.canResize && t.finalSize > this.minimumFontSize && F < T ? (t.finalSize -= 1, t.finalLineHeight = t.finalSize * t.lh / t.s) : (t.finalText = S, s = t.finalText.length, w = !1)
			                }
			                v = -C, _ = 0;
			                var I, L = 0;
			                for (e = 0; e < s; e += 1) if (i = !1, D = (I = t.finalText[e]).charCodeAt(0), " " === I ? a = " " : 13 === D || 3 === D ? (L = 0, g.push(v), y = v > y ? v : y, v = -2 * C, a = "", i = !0, u += 1) : a = t.finalText[e], h.chars ? (o = h.getCharData(I, b.fStyle, h.getFontByName(t.f).fFamily), _ = i ? 0 : o.w * t.finalSize / 100) : _ = h.measureText(a, t.f, t.finalSize), " " === I ? L += _ + C : (v += _ + C + L, L = 0), p.push({
			                    l: _,
			                    an: _,
			                    add: m,
			                    n: i,
			                    anIndexes: [],
			                    val: a,
			                    line: u,
			                    animatorJustifyOffset: 0
			                }), 2 == c) {
			                    if (m += _, "" === a || " " === a || e === s - 1) {
			                        for ("" !== a && " " !== a || (m -= _); d <= e;) p[d].an = m, p[d].ind = f, p[d].extra = _, d += 1;
			                        f += 1, m = 0
			                    }
			                } else if (3 == c) {
			                    if (m += _, "" === a || e === s - 1) {
			                        for ("" === a && (m -= _); d <= e;) p[d].an = m, p[d].ind = f, p[d].extra = _, d += 1;
			                        m = 0, f += 1
			                    }
			                } else p[f].ind = f, p[f].extra = 0, f += 1;
			                if (t.l = p, y = v > y ? v : y, g.push(v), t.sz) t.boxWidth = t.sz[0], t.justifyOffset = 0;
			                else switch (t.boxWidth = y, t.j) {
			                    case 1:
			                        t.justifyOffset = -t.boxWidth;
			                        break;
			                    case 2:
			                        t.justifyOffset = -t.boxWidth / 2;
			                        break;
			                    default:
			                        t.justifyOffset = 0
			                }
			                t.lineWidths = g;
			                var E, R, O = l.a;
			                n = O.length;
			                var N, V, z = [];
			                for (r = 0; r < n; r += 1) {
			                    for ((E = O[r]).a.sc && (t.strokeColorAnim = !0), E.a.sw && (t.strokeWidthAnim = !0), (E.a.fc || E.a.fh || E.a.fs || E.a.fb) && (t.fillColorAnim = !0), V = 0, N = E.s.b, e = 0; e < s; e += 1)(R = p[e]).anIndexes[r] = V, (1 == N && "" !== R.val || 2 == N && "" !== R.val && " " !== R.val || 3 == N && (R.n || " " == R.val || e == s - 1) || 4 == N && (R.n || e == s - 1)) && (1 === E.s.rn && z.push(V), V += 1);
			                    l.a[r].s.totalChars = V;
			                    var q, j = -1;
			                    if (1 === E.s.rn) for (e = 0; e < s; e += 1) j != (R = p[e]).anIndexes[r] && (j = R.anIndexes[r], q = z.splice(Math.floor(Math.random() * z.length), 1)[0]), R.anIndexes[r] = q
			                }
			                t.yOffset = t.finalLineHeight || 1.2 * t.finalSize, t.ls = t.ls || 0, t.ascent = b.ascent * t.finalSize / 100
			            }, E.prototype.updateDocumentData = function(t, e) {
			                e = void 0 === e ? this.keysIndex : e;
			                var s = this.copyData({}, this.data.d.k[e].s);
			                s = this.copyData(s, t), this.data.d.k[e].s = s, this.recalculate(e), this.elem.addDynamicProperty(this)
			            }, E.prototype.recalculate = function(t) {
			                var e = this.data.d.k[t].s;
			                e.__complete = !1, this.keysIndex = 0, this._isFirstFrame = !0, this.getValue(e)
			            }, E.prototype.canResizeFont = function(t) {
			                this.canResize = t, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this)
			            }, E.prototype.setMinimumFontSize = function(t) {
			                this.minimumFontSize = Math.floor(t) || 1, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this)
			            };
			            var jt, Wt = function() {
			                function t(t, e) {
			                    this._currentTextLength = -1, this.k = !1, this.data = e, this.elem = t, this.comp = t.comp, this.finalS = 0, this.finalE = 0, this.initDynamicPropertyContainer(t), this.s = It.getProp(t, e.s || {
			                        k: 0
			                    }, 0, 0, this), this.e = "e" in e ? It.getProp(t, e.e, 0, 0, this) : {
			                        v: 100
			                    }, this.o = It.getProp(t, e.o || {
			                        k: 0
			                    }, 0, 0, this), this.xe = It.getProp(t, e.xe || {
			                        k: 0
			                    }, 0, 0, this), this.ne = It.getProp(t, e.ne || {
			                        k: 0
			                    }, 0, 0, this), this.a = It.getProp(t, e.a, 0, .01, this), this.dynamicProperties.length || this.getValue()
			                }
			                var e = Math.max,
			                    s = Math.min,
			                    i = Math.floor;
			                return t.prototype = {
			                    getMult: function(t) {
			                        this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
			                        var a = wt.getBezierEasing(this.ne.v / 100, 0, 1 - this.xe.v / 100, 1).get,
			                            r = 0,
			                            n = this.finalS,
			                            o = this.finalE,
			                            h = this.data.sh;
			                        if (2 == h) r = a(r = o === n ? t >= o ? 1 : 0 : e(0, s(.5 / (o - n) + (t - n) / (o - n), 1)));
			                        else if (3 == h) r = a(r = o === n ? t >= o ? 0 : 1 : 1 - e(0, s(.5 / (o - n) + (t - n) / (o - n), 1)));
			                        else if (4 == h) o === n ? r = 0 : (r = e(0, s(.5 / (o - n) + (t - n) / (o - n), 1))) < .5 ? r *= 2 : r = 1 - 2 * (r - .5), r = a(r);
			                        else if (5 == h) {
			                            if (o === n) r = 0;
			                            else {
			                                var l = o - n,
			                                    p = -l / 2 + (t = s(e(0, t + .5 - n), o - n)),
			                                    f = l / 2;
			                                r = Math.sqrt(1 - p * p / (f * f))
			                            }
			                            r = a(r)
			                        } else 6 == h ? (o === n ? r = 0 : (t = s(e(0, t + .5 - n), o - n), r = (1 + Math.cos(Math.PI + 2 * Math.PI * t / (o - n))) / 2), r = a(r)) : (t >= i(n) && (r = t - n < 0 ? 1 - (n - t) : e(0, s(o - t, 1))), r = a(r));
			                        return r * this.a.v
			                    },
			                    getValue: function(t) {
			                        this.iterateDynamicProperties(), this._mdf = t || this._mdf, this._currentTextLength = this.elem.textProperty.currentData.l.length || 0, t && 2 === this.data.r && (this.e.v = this._currentTextLength);
			                        var e = 2 === this.data.r ? 1 : 100 / this.data.totalChars,
			                            s = this.o.v / e,
			                            i = this.s.v / e + s,
			                            a = this.e.v / e + s;
			                        if (i > a) {
			                            var r = i;
			                            i = a, a = r
			                        }
			                        this.finalS = i, this.finalE = a
			                    }
			                }, x([k], t), {
			                    getTextSelectorProp: function(e, s, i) {
			                        return new t(e, s, i)
			                    }
			                }
			            }(),
			                Yt = function(t, e, s, i) {
			                    var a = 0,
			                        r = t,
			                        n = b(r);
			                    return {
			                        newElement: function() {
			                            return a ? n[a -= 1] : e()
			                        },
			                        release: function(t) {
			                            a === r && (n = Bt.double(n), r *= 2), s && s(t), n[a] = t, a += 1
			                        }
			                    }
			                }, Bt = {
			                    double: function(t) {
			                        return t.concat(b(t.length))
			                    }
			                }, Xt = Yt(8, function() {
			                    return Dt("float32", 2)
			                }),
			                Ht = ((jt = Yt(4, function() {
			                    return new P
			                }, function(t) {
			                    var e, s = t._length;
			                    for (e = 0; e < s; e += 1) Xt.release(t.v[e]), Xt.release(t.i[e]), Xt.release(t.o[e]), t.v[e] = null, t.i[e] = null, t.o[e] = null;
			                    t._length = 0, t.c = !1
			                })).clone = function(t) {
			                    var e, s = jt.newElement(),
			                        i = void 0 === t._length ? t.v.length : t._length;
			                    for (s.setLength(i), s.c = t.c, e = 0; e < i; e += 1) s.setTripleAt(t.v[e][0], t.v[e][1], t.o[e][0], t.o[e][1], t.i[e][0], t.i[e][1], e);
			                    return s
			                }, jt),
			                Gt = function() {
			                    var t = {
			                        newShapeCollection: function() {
			                            return e ? i[e -= 1] : new w
			                        },
			                        release: function(t) {
			                            var a, r = t._length;
			                            for (a = 0; a < r; a += 1) Ht.release(t.shapes[a]);
			                            t._length = 0, e === s && (i = Bt.double(i), s *= 2), i[e] = t, e += 1
			                        }
			                    }, e = 0,
			                        s = 4,
			                        i = b(s);
			                    return t
			                }(),
			                Kt = Yt(8, function() {
			                    return {
			                        lengths: [],
			                        totalLength: 0
			                    }
			                }, function(t) {
			                    var e, s = t.lengths.length;
			                    for (e = 0; e < s; e += 1) Jt.release(t.lengths[e]);
			                    t.lengths.length = 0
			                }),
			                Jt = Yt(8, function() {
			                    return {
			                        addedLength: 0,
			                        percents: Dt("float32", _t),
			                        lengths: Dt("float32", _t)
			                    }
			                });
			            R.prototype.checkLayers = function(t) {
			                var e, s, i = this.layers.length;
			                for (this.completeLayers = !0, e = i - 1; e >= 0; e--) this.elements[e] || (s = this.layers[e]).ip - s.st <= t - this.layers[e].st && s.op - s.st > t - this.layers[e].st && this.buildItem(e), this.completeLayers = !! this.elements[e] && this.completeLayers;
			                this.checkPendingElements()
			            }, R.prototype.createItem = function(t) {
			                switch (t.ty) {
			                    case 2:
			                        return this.createImage(t);
			                    case 0:
			                        return this.createComp(t);
			                    case 1:
			                        return this.createSolid(t);
			                    case 3:
			                        return this.createNull(t);
			                    case 4:
			                        return this.createShape(t);
			                    case 5:
			                        return this.createText(t);
			                    case 13:
			                        return this.createCamera(t)
			                }
			                return this.createNull(t)
			            }, R.prototype.createCamera = function() {
			                throw new Error("You're using a 3d camera. Try the html renderer.")
			            }, R.prototype.buildAllItems = function() {
			                var t, e = this.layers.length;
			                for (t = 0; t < e; t += 1) this.buildItem(t);
			                this.checkPendingElements()
			            }, R.prototype.includeLayers = function(t) {
			                this.completeLayers = !1;
			                var e, s, i = t.length,
			                    a = this.layers.length;
			                for (e = 0; e < i; e += 1) for (s = 0; s < a;) {
			                    if (this.layers[s].id == t[e].id) {
			                        this.layers[s] = t[e];
			                        break
			                    }
			                    s += 1
			                }
			            }, R.prototype.setProjectInterface = function(t) {
			                this.globalData.projectInterface = t
			            }, R.prototype.initItems = function() {
			                this.globalData.progressiveLoad || this.buildAllItems()
			            }, R.prototype.buildElementParenting = function(t, e, s) {
			                for (var i = this.elements, a = this.layers, r = 0, n = a.length; r < n;) a[r].ind == e && (i[r] && !0 !== i[r] ? (s.push(i[r]), i[r].setAsParent(), void 0 !== a[r].parent ? this.buildElementParenting(t, a[r].parent, s) : t.setHierarchy(s)) : (this.buildItem(r), this.addPendingElement(t))), r += 1
			            }, R.prototype.addPendingElement = function(t) {
			                this.pendingElements.push(t)
			            }, R.prototype.searchExtraCompositions = function(t) {
			                var e, s = t.length;
			                for (e = 0; e < s; e += 1) if (t[e].xt) {
			                    var i = this.createComp(t[e]);
			                    this.globalData.projectInterface.registerComposition(i)
			                }
			            }, R.prototype.setupGlobalData = function(t, e) {
			                this.globalData.fontManager = new At, this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, e), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.imageLoader = this.animationItem.imagePreloader, this.globalData.frameId = 0, this.globalData.frameRate = t.fr, this.globalData.nm = t.nm, this.globalData.compSize = {
			                    w: t.w,
			                    h: t.h
			                }
			            }, x([R], O), O.prototype.createShape = function(t) {
			                return new rt(t, this.globalData, this)
			            }, O.prototype.createText = function(t) {
			                return new ot(t, this.globalData, this)
			            }, O.prototype.createImage = function(t) {
			                return new st(t, this.globalData, this)
			            }, O.prototype.createComp = function(t) {
			                return new it(t, this.globalData, this)
			            }, O.prototype.createSolid = function(t) {
			                return new nt(t, this.globalData, this)
			            }, O.prototype.createNull = function(t) {
			                return new G(t, this.globalData, this)
			            }, O.prototype.ctxTransform = function(t) {
			                if (1 !== t[0] || 0 !== t[1] || 0 !== t[4] || 1 !== t[5] || 0 !== t[12] || 0 !== t[13]) if (this.renderConfig.clearCanvas) {
			                    this.transformMat.cloneFromProps(t);
			                    var e = this.contextData.cTr.props;
			                    this.transformMat.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]), this.contextData.cTr.cloneFromProps(this.transformMat.props);
			                    var s = this.contextData.cTr.props;
			                    "high" === se ? this.canvasContext.setTransform(parseFloat(s[0].toFixed(2)), s[1] + .5 << 0, s[4] + .5 << 0, parseFloat(s[5].toFixed(2)), s[12] + .5 << 0, s[13] + .5 << 0) : this.canvasContext.setTransform(s[0], s[1], s[4], s[5], s[12], s[13]), this.animationItem.renderer.contextData.cTr.transformX = s[12], this.animationItem.renderer.contextData.cTr.transformY = s[13]
			                } else this.canvasContext.transform(t[0], t[1], t[4], t[5], t[12], t[13])
			            }, O.prototype.ctxOpacity = function(t) {
			                if (!this.renderConfig.clearCanvas) return this.canvasContext.globalAlpha *= t < 0 ? 0 : t, void(this.globalData.currentGlobalAlpha = this.contextData.cO);
			                this.contextData.cO *= t < 0 ? 0 : t, this.globalData.currentGlobalAlpha !== this.contextData.cO && (this.canvasContext.globalAlpha = this.contextData.cO, this.globalData.currentGlobalAlpha = this.contextData.cO)
			            }, O.prototype.reset = function() {
			                this.renderConfig.clearCanvas ? this.contextData.reset() : this.canvasContext.restore()
			            }, O.prototype.save = function(t) {
			                if (this.renderConfig.clearCanvas) {
			                    t && this.canvasContext.save();
			                    var e = this.contextData.cTr.props;
			                    this.contextData._length <= this.contextData.cArrPos && this.contextData.duplicate();
			                    var s, i = this.contextData.saved[this.contextData.cArrPos];
			                    for (s = 0; s < 16; s += 1) i[s] = e[s];
			                    this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO, this.contextData.cArrPos += 1
			                } else this.canvasContext.save()
			            }, O.prototype.restore = function(t) {
			                if (this.renderConfig.clearCanvas) {
			                    t && (this.canvasContext.restore(), this.globalData.blendMode = "source-over"), this.contextData.cArrPos -= 1;
			                    var e, s = this.contextData.saved[this.contextData.cArrPos],
			                        i = this.contextData.cTr.props;
			                    for (e = 0; e < 16; e += 1) i[e] = s[e];
			                    this.canvasContext.setTransform(s[0], s[1], s[4], s[5], s[12], s[13]), s = this.contextData.savedOp[this.contextData.cArrPos], this.contextData.cO = s, this.globalData.currentGlobalAlpha !== s && (this.canvasContext.globalAlpha = s, this.globalData.currentGlobalAlpha = s)
			                } else this.canvasContext.restore()
			            }, O.prototype.configAnimation = function(t) {
			                this.animationItem.wrapper ? (this.animationItem.container = _("canvas"), this.animationItem.container.style.width = "100%", this.animationItem.container.style.height = "100%", this.animationItem.container.style.transformOrigin = this.animationItem.container.style.mozTransformOrigin = this.animationItem.container.style.webkitTransformOrigin = this.animationItem.container.style["-webkit-transform"] = "0px 0px 0px", this.animationItem.wrapper.appendChild(this.animationItem.container), this.canvasContext = this.animationItem.container.getContext("2d"), this.renderConfig.className && this.animationItem.container.setAttribute("class", this.renderConfig.className)) : this.canvasContext = this.renderConfig.context, this.data = t, this.layers = t.layers, this.transformCanvas = {
			                    w: t.w,
			                    h: t.h,
			                    sx: 0,
			                    sy: 0,
			                    tx: 0,
			                    ty: 0
			                }, this.setupGlobalData(t, o.body), this.globalData.canvasContext = this.canvasContext, this.globalData.renderer = this, this.globalData.isDashed = !1, this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.globalData.transformCanvas = this.transformCanvas, this.elements = b(t.layers.length), this.updateContainerSize()
			            }, O.prototype.updateContainerSize = function() {
			                var t, e, s, i;
			                if (this.reset(), this.animationItem.wrapper && this.animationItem.container ? (t = this.animationItem.wrapper.offsetWidth, e = this.animationItem.wrapper.offsetHeight, this.animationItem.container.setAttribute("width", t * this.renderConfig.dpr), this.animationItem.container.setAttribute("height", e * this.renderConfig.dpr)) : (t = this.canvasContext.canvas.width * this.renderConfig.dpr, e = this.canvasContext.canvas.height * this.renderConfig.dpr), -1 !== this.renderConfig.preserveAspectRatio.indexOf("meet") || -1 !== this.renderConfig.preserveAspectRatio.indexOf("slice")) {
			                    var a = this.renderConfig.preserveAspectRatio.split(" "),
			                        r = a[1] || "meet",
			                        n = a[0] || "xMidYMid",
			                        o = n.substr(0, 4),
			                        h = n.substr(4);
			                    s = t / e, (i = this.transformCanvas.w / this.transformCanvas.h) > s && "meet" === r || i < s && "slice" === r ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = t / (this.transformCanvas.w / this.renderConfig.dpr)) : (this.transformCanvas.sx = e / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr)), this.transformCanvas.tx = "xMid" === o && (i < s && "meet" === r || i > s && "slice" === r) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) / 2 * this.renderConfig.dpr : "xMax" === o && (i < s && "meet" === r || i > s && "slice" === r) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) * this.renderConfig.dpr : 0, this.transformCanvas.ty = "YMid" === h && (i > s && "meet" === r || i < s && "slice" === r) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) / 2 * this.renderConfig.dpr : "YMax" === h && (i > s && "meet" === r || i < s && "slice" === r) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) * this.renderConfig.dpr : 0
			                } else "none" == this.renderConfig.preserveAspectRatio ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.tx = 0, this.transformCanvas.ty = 0) : (this.transformCanvas.sx = this.renderConfig.dpr, this.transformCanvas.sy = this.renderConfig.dpr, this.transformCanvas.tx = 0, this.transformCanvas.ty = 0);
			                this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1], this.ctxTransform(this.transformCanvas.props), this.canvasContext.beginPath(), this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h), this.canvasContext.closePath(), this.canvasContext.clip(), this.renderFrame(this.renderedFrame, !0)
			            }, O.prototype.destroy = function() {
			                var t;
			                for (this.renderConfig.clearCanvas && (this.animationItem.wrapper.innerHTML = ""), t = (this.layers ? this.layers.length : 0) - 1; t >= 0; t -= 1) this.elements[t] && this.elements[t].destroy();
			                this.elements.length = 0, this.globalData.canvasContext = null, this.animationItem.container = null, this.destroyed = !0
			            }, O.prototype.renderFrame = function(t, e) {
			                if ((this.renderedFrame !== t || !0 !== this.renderConfig.clearCanvas || e) && !this.destroyed && -1 !== t) {
			                    this.renderedFrame = t, this.globalData.frameNum = t - this.animationItem._isFirstFrame, this.globalData.frameId += 1, this.globalData._mdf = !this.renderConfig.clearCanvas || e, this.globalData.projectInterface.currentFrame = t;
			                    var s, i = this.layers.length;
			                    for (this.completeLayers || this.checkLayers(t), s = 0; s < i; s++)(this.completeLayers || this.elements[s]) && this.elements[s].prepareFrame(t - this.layers[s].st);
			                    if (this.globalData._mdf) {
			                        for (!0 === this.renderConfig.clearCanvas || this.save(), s = i - 1; s >= 0; s -= 1)(this.completeLayers || this.elements[s]) && this.elements[s].renderFrame();
			                        !0 !== this.renderConfig.clearCanvas && this.restore()
			                    }
			                }
			            }, O.prototype.buildItem = function(t) {
			                var e = this.elements;
			                if (!e[t] && 99 != this.layers[t].ty) {
			                    var s = this.createItem(this.layers[t], this, this.globalData);
			                    e[t] = s
			                }
			            }, O.prototype.checkPendingElements = function() {
			                for (; this.pendingElements.length;) this.pendingElements.pop().checkParenting()
			            }, O.prototype.hide = function() {
			                this.animationItem.container.style.display = "none"
			            }, O.prototype.show = function() {
			                this.animationItem.container.style.display = "block"
			            }, N.prototype.getMaskProperty = function(t) {
			                return this.viewData[t].prop
			            }, N.prototype.renderFrame = function(t) {
			                var e, s = this.element.finalTransform.mat,
			                    i = this.masksProperties.length;
			                for (e = 0; e < i; e++) if ((this.viewData[e].prop._mdf || t) && this.drawPath(this.masksProperties[e], this.viewData[e].prop.v, this.viewData[e]), (this.viewData[e].op._mdf || t) && this.viewData[e].elem.setAttribute("fill-opacity", this.viewData[e].op.v), "n" !== this.masksProperties[e].mode && (this.viewData[e].invRect && (this.element.finalTransform.mProp._mdf || t) && (this.viewData[e].invRect.setAttribute("x", -s.props[12]), this.viewData[e].invRect.setAttribute("y", -s.props[13])), this.storedData[e].x && (this.storedData[e].x._mdf || t))) {
			                    var a = this.storedData[e].expan;
			                    this.storedData[e].x.v < 0 ? ("erode" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "erode", this.storedData[e].elem.setAttribute("filter", "url(" + ft + "#" + this.storedData[e].filterId + ")")), a.setAttribute("radius", -this.storedData[e].x.v)) : ("dilate" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "dilate", this.storedData[e].elem.setAttribute("filter", null)), this.storedData[e].elem.setAttribute("stroke-width", 2 * this.storedData[e].x.v))
			                }
			            }, N.prototype.getMaskelement = function() {
			                return this.maskElement
			            }, N.prototype.createLayerSolidPath = function() {
			                var t = "M0,0 ";
			                return t += " h" + this.globalData.compSize.w, t += " v" + this.globalData.compSize.h, t += " h-" + this.globalData.compSize.w, t += " v-" + this.globalData.compSize.h + " "
			            }, N.prototype.drawPath = function(t, e, s) {
			                var i, a, r = " M" + e.v[0][0] + "," + e.v[0][1];
			                for (a = e._length, i = 1; i < a; i += 1) r += " C" + e.o[i - 1][0] + "," + e.o[i - 1][1] + " " + e.i[i][0] + "," + e.i[i][1] + " " + e.v[i][0] + "," + e.v[i][1];
			                if (e.c && a > 1 && (r += " C" + e.o[i - 1][0] + "," + e.o[i - 1][1] + " " + e.i[0][0] + "," + e.i[0][1] + " " + e.v[0][0] + "," + e.v[0][1]), s.lastPath !== r) {
			                    var n = "";
			                    s.elem && (e.c && (n = t.inv ? this.solidPath + r : r), s.elem.setAttribute("d", n)), s.lastPath = r
			                }
			            }, N.prototype.destroy = function() {
			                this.element = null, this.globalData = null, this.maskElement = null, this.data = null, this.masksProperties = null
			            }, V.prototype = {
			                initHierarchy: function() {
			                    this.hierarchy = [], this._isParent = !1, this.checkParenting()
			                },
			                setHierarchy: function(t) {
			                    this.hierarchy = t
			                },
			                setAsParent: function() {
			                    this._isParent = !0
			                },
			                checkParenting: function() {
			                    void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent, [])
			                }
			            }, z.prototype = {
			                initFrame: function() {
			                    this._isFirstFrame = !1, this.dynamicProperties = [], this._mdf = !1
			                },
			                prepareProperties: function(t, e) {
			                    var s, i = this.dynamicProperties.length;
			                    for (s = 0; s < i; s += 1)(e || this._isParent && "transform" === this.dynamicProperties[s].propType) && (this.dynamicProperties[s].getValue(), this.dynamicProperties[s]._mdf && (this.globalData._mdf = !0, this._mdf = !0))
			                },
			                addDynamicProperty: function(t) {
			                    -1 === this.dynamicProperties.indexOf(t) && this.dynamicProperties.push(t)
			                }
			            }, q.prototype = {
			                initTransform: function() {
			                    this.finalTransform = {
			                        mProp: this.data.ks ? Lt.getTransformProperty(this, this.data.ks, this) : {
			                            o: 0
			                        },
			                        _matMdf: !1,
			                        _opMdf: !1,
			                        mat: new St
			                    }, this.data.ao && (this.finalTransform.mProp.autoOriented = !0), this.data.ty
			                },
			                renderTransform: function() {
			                    if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame, this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame, this.hierarchy) {
			                        var t, e = this.finalTransform.mat,
			                            s = 0,
			                            i = this.hierarchy.length;
			                        if (!this.finalTransform._matMdf) for (; s < i;) {
			                            if (this.hierarchy[s].finalTransform.mProp._mdf) {
			                                this.finalTransform._matMdf = !0;
			                                break
			                            }
			                            s += 1
			                        }
			                        if (this.finalTransform._matMdf) for (t = this.finalTransform.mProp.v.props, e.cloneFromProps(t), s = 0; s < i; s += 1) t = this.hierarchy[s].finalTransform.mProp.v.props, e.transform(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15])
			                    }
			                },
			                globalToLocal: function(t) {
			                    var e = [];
			                    e.push(this.finalTransform);
			                    for (var s = !0, i = this.comp; s;) i.finalTransform ? (i.data.hasMask && e.splice(0, 0, i.finalTransform), i = i.comp) : s = !1;
			                    var a, r, n = e.length;
			                    for (a = 0; a < n; a += 1) r = e[a].mat.applyToPointArray(0, 0, 0), t = [t[0] - r[0], t[1] - r[1], 0];
			                    return t
			                },
			                mHelper: new St
			            }, j.prototype = {
			                initRenderable: function() {
			                    this.isInRange = !1, this.hidden = !1, this.isTransparent = !1, this.renderableComponents = []
			                },
			                addRenderableComponent: function(t) {
			                    -1 === this.renderableComponents.indexOf(t) && this.renderableComponents.push(t)
			                },
			                removeRenderableComponent: function(t) {
			                    -1 !== this.renderableComponents.indexOf(t) && this.renderableComponents.splice(this.renderableComponents.indexOf(t), 1)
			                },
			                prepareRenderableFrame: function(t) {
			                    this.checkLayerLimits(t)
			                },
			                checkTransparency: function() {
			                    this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && (this.isTransparent = !0, this.hide()) : this.isTransparent && (this.isTransparent = !1, this.show())
			                },
			                checkLayerLimits: function(t) {
			                    this.data.ip - this.data.st <= t && this.data.op - this.data.st > t ? !0 !== this.isInRange && (this.globalData._mdf = !0, this._mdf = !0, this.isInRange = !0, this.show()) : !1 !== this.isInRange && (this.globalData._mdf = !0, this.isInRange = !1, this.hide())
			                },
			                renderRenderable: function() {
			                    var t, e = this.renderableComponents.length;
			                    for (t = 0; t < e; t += 1) this.renderableComponents[t].renderFrame(this._isFirstFrame)
			                },
			                sourceRectAtTime: function() {
			                    return {
			                        top: 0,
			                        left: 0,
			                        width: 100,
			                        height: 100
			                    }
			                },
			                getLayerSize: function() {
			                    return 5 === this.data.ty ? {
			                        w: this.data.textData.width,
			                        h: this.data.textData.height
			                    } : {
			                        w: this.data.width,
			                        h: this.data.height
			                    }
			                }
			            }, x([j, function(t) {
			                function e() {}
			                return e.prototype = t, e
			            }({
			                initElement: function(t, e, s) {
			                    this.initFrame(), this.initBaseData(t, e, s), this.initTransform(t, e, s), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide()
			                },
			                hide: function() {
			                    this.hidden || this.isInRange && !this.isTransparent || ((this.baseElement || this.layerElement).style.display = "none", this.hidden = !0)
			                },
			                show: function() {
			                    this.isInRange && !this.isTransparent && (this.data.hd || ((this.baseElement || this.layerElement).style.display = "block"), this.hidden = !1, this._isFirstFrame = !0)
			                },
			                renderFrame: function() {
			                    this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1))
			                },
			                renderInnerContent: function() {},
			                prepareFrame: function(t) {
			                    this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.checkTransparency()
			                },
			                destroy: function() {
			                    this.innerElem = null, this.destroyBaseElement()
			                }
			            })], W), B.prototype = {
			                addTransformSequence: function(t) {
			                    var e, s = t.length,
			                        i = "_";
			                    for (e = 0; e < s; e += 1) i += t[e].transform.key + "_";
			                    var a = this.sequences[i];
			                    return a || (a = {
			                        transforms: [].concat(t),
			                        finalTransform: new St,
			                        _mdf: !1
			                    }, this.sequences[i] = a, this.sequenceList.push(a)), a
			                },
			                processSequence: function(t, e) {
			                    for (var s, i = 0, a = t.transforms.length, r = e; i < a && !e;) {
			                        if (t.transforms[i].transform.mProps._mdf) {
			                            r = !0;
			                            break
			                        }
			                        i += 1
			                    }
			                    if (r) for (t.finalTransform.reset(), i = a - 1; i >= 0; i -= 1) s = t.transforms[i].transform.mProps.v.props, t.finalTransform.transform(s[0], s[1], s[2], s[3], s[4], s[5], s[6], s[7], s[8], s[9], s[10], s[11], s[12], s[13], s[14], s[15]);
			                    t._mdf = r
			                },
			                processSequences: function(t) {
			                    var e, s = this.sequenceList.length;
			                    for (e = 0; e < s; e += 1) this.processSequence(this.sequenceList[e], t)
			                },
			                getNewKey: function() {
			                    return "_" + this.transform_key_count++
			                }
			            }, X.prototype.setAsAnimated = function() {
			                this._isAnimated = !0
			            }, H.prototype = {
			                checkMasks: function() {
			                    if (!this.data.hasMask) return !1;
			                    for (var t = 0, e = this.data.masksProperties.length; t < e;) {
			                        if ("n" !== this.data.masksProperties[t].mode && !1 !== this.data.masksProperties[t].cl) return !0;
			                        t += 1
			                    }
			                    return !1
			                },
			                initExpressions: function() {
			                    this.layerInterface = LayerExpressionInterface(this), this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
			                    var t = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);
			                    this.layerInterface.registerEffectsInterface(t), 0 === this.data.ty || this.data.xt ? this.compInterface = CompExpressionInterface(this) : 4 === this.data.ty ? (this.layerInterface.shapeInterface = ShapeExpressionInterface(this.shapesData, this.itemsData, this.layerInterface), this.layerInterface.content = this.layerInterface.shapeInterface) : 5 === this.data.ty && (this.layerInterface.textInterface = TextExpressionInterface(this), this.layerInterface.text = this.layerInterface.textInterface)
			                },
			                setBlendMode: function() {
			                    var t = Tt(this.data.bm);
			                    (this.baseElement || this.layerElement).style["mix-blend-mode"] = t
			                },
			                initBaseData: function(t, e, s) {
			                    this.globalData = e, this.comp = s, this.data = t, this.layerId = Pt(), this.data.sr || (this.data.sr = 1), this.effectsManager = new lt(this.data, this, this.dynamicProperties)
			                },
			                getType: function() {
			                    return this.type
			                },
			                sourceRectAtTime: function() {}
			            }, G.prototype.prepareFrame = function(t) {
			                this.prepareProperties(t, !0)
			            }, G.prototype.renderFrame = function() {}, G.prototype.getBaseElement = function() {
			                return null
			            }, G.prototype.destroy = function() {}, G.prototype.sourceRectAtTime = function() {}, G.prototype.hide = function() {}, x([H, q, V, z], G), K.prototype = {
			                addShapeToModifiers: function(t) {
			                    var e, s = this.shapeModifiers.length;
			                    for (e = 0; e < s; e += 1) this.shapeModifiers[e].addShape(t)
			                },
			                isShapeInAnimatedModifiers: function(t) {
			                    for (var e = this.shapeModifiers.length; 0 < e;) if (this.shapeModifiers[0].isAnimatedWithShape(t)) return !0;
			                    return !1
			                },
			                renderModifiers: function() {
			                    if (this.shapeModifiers.length) {
			                        var t, e = this.shapes.length;
			                        for (t = 0; t < e; t += 1) this.shapes[t].sh.reset();
			                        for (t = (e = this.shapeModifiers.length) - 1; t >= 0; t -= 1) this.shapeModifiers[t].processShapes(this._isFirstFrame)
			                    }
			                },
			                lcEnum: {
			                    1: "butt",
			                    2: "round",
			                    3: "square"
			                },
			                ljEnum: {
			                    1: "miter",
			                    2: "round",
			                    3: "bevel"
			                },
			                searchProcessedElement: function(t) {
			                    for (var e = this.processedElements, s = 0, i = e.length; s < i;) {
			                        if (e[s].elem === t) return e[s].pos;
			                        s += 1
			                    }
			                    return 0
			                },
			                addProcessedElement: function(t, e) {
			                    for (var s = this.processedElements, i = s.length; i;) if (s[i -= 1].elem === t) return void(s[i].pos = e);
			                    s.push(new Y(t, e))
			                },
			                prepareFrame: function(t) {
			                    this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange)
			                }
			            }, J.prototype.initElement = function(t, e, s) {
			                this.lettersChangedFlag = !0, this.initFrame(), this.initBaseData(t, e, s), this.textProperty = new E(this, t.t, this.dynamicProperties), this.textAnimator = new A(t.t, this.renderType, this), this.initTransform(t, e, s), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide(), this.textAnimator.searchProperties(this.dynamicProperties)
			            }, J.prototype.prepareFrame = function(t) {
			                this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(), this.textProperty._isFirstFrame = !1, this.textProperty._mdf = !1)
			            }, J.prototype.createPathShape = function(t, e) {
			                var s, i, a = e.length,
			                    r = "";
			                for (s = 0; s < a; s += 1) i = e[s].ks.k, r += Vt(i, i.i.length, !0, t);
			                return r
			            }, J.prototype.updateDocumentData = function(t, e) {
			                this.textProperty.updateDocumentData(t, e)
			            }, J.prototype.canResizeFont = function(t) {
			                this.textProperty.canResizeFont(t)
			            }, J.prototype.setMinimumFontSize = function(t) {
			                this.textProperty.setMinimumFontSize(t)
			            }, J.prototype.applyTextPropertiesToMatrix = function(t, e, s, i, a) {
			                switch (t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0), e.translate(0, -t.ls, 0), t.j) {
			                    case 1:
			                        e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[s]), 0, 0);
			                        break;
			                    case 2:
			                        e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[s]) / 2, 0, 0)
			                }
			                e.translate(i, a, 0)
			            }, J.prototype.buildColor = function(t) {
			                return "rgb(" + Math.round(255 * t[0]) + "," + Math.round(255 * t[1]) + "," + Math.round(255 * t[2]) + ")"
			            }, J.prototype.emptyProp = new L, J.prototype.destroy = function() {}, x([H, q, V, z, W], Z), Z.prototype.initElement = function(t, e, s) {
			                this.initFrame(), this.initBaseData(t, e, s), this.initTransform(t, e, s), this.initRenderable(), this.initHierarchy(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), !this.data.xt && e.progressiveLoad || this.buildAllItems(), this.hide()
			            }, Z.prototype.prepareFrame = function(t) {
			                if (this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.isInRange || this.data.xt) {
			                    if (this.tm._placeholder) this.renderedFrame = t / this.data.sr;
			                    else {
			                        var e = this.tm.v;
			                        e === this.data.op && (e = this.data.op - 1), this.renderedFrame = e
			                    }
			                    var s, i = this.elements.length;
			                    for (this.completeLayers || this.checkLayers(this.renderedFrame), s = i - 1; s >= 0; s -= 1)(this.completeLayers || this.elements[s]) && (this.elements[s].prepareFrame(this.renderedFrame - this.layers[s].st), this.elements[s]._mdf && (this._mdf = !0))
			                }
			            }, Z.prototype.renderInnerContent = function() {
			                var t, e = this.layers.length;
			                for (t = 0; t < e; t += 1)(this.completeLayers || this.elements[t]) && this.elements[t].renderFrame()
			            }, Z.prototype.setElements = function(t) {
			                this.elements = t
			            }, Z.prototype.getElements = function() {
			                return this.elements
			            }, Z.prototype.destroyElements = function() {
			                var t, e = this.layers.length;
			                for (t = 0; t < e; t += 1) this.elements[t] && this.elements[t].destroy()
			            }, Z.prototype.destroy = function() {
			                this.destroyElements(), this.destroyBaseElement()
			            }, x([H, q, V, z, W], U), U.prototype.createContent = function() {
			                var t = this.globalData.getAssetsPath(this.assetData);
			                this.innerElem = createNS("image"), this.innerElem.setAttribute("width", this.assetData.w + "px"), this.innerElem.setAttribute("height", this.assetData.h + "px"), this.innerElem.setAttribute("preserveAspectRatio", this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio), this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.innerElem)
			            }, U.prototype.sourceRectAtTime = function() {
			                return this.sourceRect
			            }, x([U], Q), Q.prototype.createContent = function() {
			                var t = createNS("rect");
			                t.setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.layerElement.appendChild(t)
			            }, x([H, q, K, V, z, W], $), tt.prototype.duplicate = function() {
			                var t = 2 * this._length,
			                    e = this.savedOp;
			                this.savedOp = Dt("float32", t), this.savedOp.set(e);
			                var s = 0;
			                for (s = this._length; s < t; s += 1) this.saved[s] = Dt("float32", 16);
			                this._length = t
			            }, tt.prototype.reset = function() {
			                this.cArrPos = 0, this.cTr.reset(), this.cO = 1
			            }, (et.prototype = {
			                createElements: function() {},
			                initRendererElement: function() {},
			                createContainerElements: function() {
			                    this.canvasContext = this.globalData.canvasContext, this.renderableEffectsManager = new ht(this)
			                },
			                createContent: function() {},
			                setBlendMode: function() {
			                    var t = this.globalData;
			                    if (t.blendMode !== this.data.bm) {
			                        t.blendMode = this.data.bm;
			                        var e = Tt(this.data.bm);
			                        t.canvasContext.globalCompositeOperation = e
			                    }
			                },
			                createRenderableComponents: function() {
			                    this.maskManager = new at(this.data, this)
			                },
			                hideElement: function() {
			                    this.hidden || this.isInRange && !this.isTransparent || (this.hidden = !0)
			                },
			                showElement: function() {
			                    this.isInRange && !this.isTransparent && (this.hidden = !1, this._isFirstFrame = !0, this.maskManager._isFirstFrame = !0)
			                },
			                renderFrame: function() {
			                    if (!this.hidden && !this.data.hd) {
			                        this.renderTransform(), this.renderRenderable(), this.setBlendMode();
			                        var t = 0 === this.data.ty;
			                        this.globalData.renderer.save(t), this.globalData.renderer.ctxTransform(this.finalTransform.mat.props), this.globalData.renderer.ctxOpacity(this.finalTransform.mProp.o.v), this.renderInnerContent(), this.globalData.renderer.restore(t), this.maskManager.hasMasks && this.globalData.renderer.restore(!0), this._isFirstFrame && (this._isFirstFrame = !1)
			                    }
			                },
			                destroy: function() {
			                    this.canvasContext = null, this.data = null, this.globalData = null, this.maskManager.destroy()
			                },
			                mHelper: new St
			            }).hide = et.prototype.hideElement, et.prototype.show = et.prototype.showElement, x([H, q, et, V, z, j], st), st.prototype.initElement = $.prototype.initElement, st.prototype.prepareFrame = U.prototype.prepareFrame, st.prototype.createContent = function() {
			                if (this.img.width && (this.assetData.w !== this.img.width || this.assetData.h !== this.img.height)) {
			                    var t = _("canvas");
			                    t.width = this.assetData.w, t.height = this.assetData.h;
			                    var e, s, i = t.getContext("2d"),
			                        a = this.img.width,
			                        r = this.img.height,
			                        n = a / r,
			                        o = this.assetData.w / this.assetData.h,
			                        h = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio;
			                    n > o && "xMidYMid slice" === h || n < o && "xMidYMid slice" !== h ? e = (s = r) * o : s = (e = a) / o, i.drawImage(this.img, (a - e) / 2, (r - s) / 2, e, s, 0, 0, this.assetData.w, this.assetData.h), this.img = t
			                }
			            }, st.prototype.renderInnerContent = function(t) {
			                this.canvasContext.drawImage(this.img, 0, 0), this.canvasContext.img = this.img
			            }, st.prototype.destroy = function() {
			                this.img = null
			            }, x([O, Z, et], it), it.prototype.renderInnerContent = function() {
			                var t, e = this.canvasContext;
			                for (e.beginPath(), e.moveTo(0, 0), e.lineTo(this.data.w, 0), e.lineTo(this.data.w, this.data.h), e.lineTo(0, this.data.h), e.lineTo(0, 0), e.clip(), t = this.layers.length - 1; t >= 0; t -= 1)(this.completeLayers || this.elements[t]) && this.elements[t].renderFrame()
			            }, it.prototype.destroy = function() {
			                var t;
			                for (t = this.layers.length - 1; t >= 0; t -= 1) this.elements[t] && this.elements[t].destroy();
			                this.layers = null, this.elements = null
			            }, at.prototype.renderFrame = function() {
			                if (this.hasMasks) {
			                    var t, e, s, i, a = this.element.finalTransform.mat,
			                        r = this.element.canvasContext,
			                        n = this.masksProperties.length;
			                    for (r.beginPath(), t = 0; t < n; t++) if ("n" !== this.masksProperties[t].mode) {
			                        this.masksProperties[t].inv && (r.moveTo(0, 0), r.lineTo(this.element.globalData.compSize.w, 0), r.lineTo(this.element.globalData.compSize.w, this.element.globalData.compSize.h), r.lineTo(0, this.element.globalData.compSize.h), r.lineTo(0, 0)), i = this.viewData[t].v, e = a.applyToPointArray(i.v[0][0], i.v[0][1], 0), r.moveTo(e[0], e[1]);
			                        var o, h = i._length;
			                        for (o = 1; o < h; o++) s = a.applyToTriplePoints(i.o[o - 1], i.i[o], i.v[o]), r.bezierCurveTo(s[0], s[1], s[2], s[3], s[4], s[5]);
			                        s = a.applyToTriplePoints(i.o[o - 1], i.i[0], i.v[0]), r.bezierCurveTo(s[0], s[1], s[2], s[3], s[4], s[5])
			                    }
			                    this.element.globalData.renderer.save(!0), r.clip()
			                }
			            }, at.prototype.getMaskProperty = N.prototype.getMaskProperty, at.prototype.destroy = function() {
			                this.element = null
			            }, x([H, q, et, K, V, z, j], rt), rt.prototype.initElement = W.prototype.initElement, rt.prototype.transformHelper = {
			                opacity: 1,
			                _opMdf: !1
			            }, rt.prototype.dashResetter = [], rt.prototype.createContent = function() {
			                this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, [])
			            }, rt.prototype.createStyleElement = function(t, e) {
			                var s = {
			                    data: t,
			                    type: t.ty,
			                    preTransforms: this.transformsManager.addTransformSequence(e),
			                    transforms: [],
			                    elements: [],
			                    closed: !0 === t.hd
			                }, i = {};
			                if ("fl" == t.ty || "st" == t.ty ? (i.c = It.getProp(this, t.c, 1, 255, this), i.c.k || (s.co = "rgb(" + vt(i.c.v[0]) + "," + vt(i.c.v[1]) + "," + vt(i.c.v[2]) + ")")) : "gf" !== t.ty && "gs" !== t.ty || (i.s = It.getProp(this, t.s, 1, null, this), i.e = It.getProp(this, t.e, 1, null, this), i.h = It.getProp(this, t.h || {
			                    k: 0
			                }, 0, .01, this), i.a = It.getProp(this, t.a || {
			                    k: 0
			                }, 0, kt, this), i.g = new F(this, t.g, this)), i.o = It.getProp(this, t.o, 0, .01, this), "st" == t.ty || "gs" == t.ty) {
			                    if (s.lc = this.lcEnum[t.lc] || "round", s.lj = this.ljEnum[t.lj] || "round", 1 == t.lj && (s.ml = t.ml), i.w = It.getProp(this, t.w, 0, null, this), i.w.k || (s.wi = i.w.v), t.d) {
			                        var a = new M(this, t.d, "canvas", this);
			                        i.d = a, i.d.k || (s.da = i.d.dashArray, s.do = i.d.dashoffset[0])
			                    }
			                } else s.r = 2 === t.r ? "evenodd" : "nonzero";
			                return this.stylesList.push(s), i.style = s, i
			            }, rt.prototype.createGroupElement = function(t) {
			                return {
			                    it: [],
			                    prevViewData: []
			                }
			            }, rt.prototype.createTransformElement = function(t) {
			                return {
			                    transform: {
			                        opacity: 1,
			                        _opMdf: !1,
			                        key: this.transformsManager.getNewKey(),
			                        op: It.getProp(this, t.o, 0, .01, this),
			                        mProps: Lt.getTransformProperty(this, t, this)
			                    }
			                }
			            }, rt.prototype.createShapeElement = function(t) {
			                var e = new X(this, t, this.stylesList, this.transformsManager);
			                return this.shapes.push(e), this.addShapeToModifiers(e), e
			            }, rt.prototype.reloadShapes = function() {
			                this._isFirstFrame = !0;
			                var t, e = this.itemsData.length;
			                for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
			                for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []), e = this.dynamicProperties.length, t = 0; t < e; t += 1) this.dynamicProperties[t].getValue();
			                this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame)
			            }, rt.prototype.addTransformToStyleList = function(t) {
			                var e, s = this.stylesList.length;
			                for (e = 0; e < s; e += 1) this.stylesList[e].closed || this.stylesList[e].transforms.push(t)
			            }, rt.prototype.removeTransformFromStyleList = function() {
			                var t, e = this.stylesList.length;
			                for (t = 0; t < e; t += 1) this.stylesList[t].closed || this.stylesList[t].transforms.pop()
			            }, rt.prototype.closeStyles = function(t) {
			                var e, s = t.length;
			                for (e = 0; e < s; e += 1) t[e].closed = !0
			            }, rt.prototype.searchShapes = function(t, e, s, i, a) {
			                var r, n, o, h, l, p, f = t.length - 1,
			                    c = [],
			                    m = [],
			                    d = [].concat(a);
			                for (r = f; r >= 0; r -= 1) {
			                    if ((h = this.searchProcessedElement(t[r])) ? e[r] = s[h - 1] : t[r]._shouldRender = i, "fl" == t[r].ty || "st" == t[r].ty || "gf" == t[r].ty || "gs" == t[r].ty) h ? e[r].style.closed = !1 : e[r] = this.createStyleElement(t[r], d), c.push(e[r].style);
			                    else if ("gr" == t[r].ty) {
			                        if (h) for (o = e[r].it.length, n = 0; n < o; n += 1) e[r].prevViewData[n] = e[r].it[n];
			                        else e[r] = this.createGroupElement(t[r]);
			                        this.searchShapes(t[r].it, e[r].it, e[r].prevViewData, i, d)
			                    } else "tr" == t[r].ty ? (h || (p = this.createTransformElement(t[r]), e[r] = p), d.push(e[r]), this.addTransformToStyleList(e[r])) : "sh" == t[r].ty || "rc" == t[r].ty || "el" == t[r].ty || "sr" == t[r].ty ? h || (e[r] = this.createShapeElement(t[r])) : "tm" == t[r].ty || "rd" == t[r].ty ? (h ? (l = e[r]).closed = !1 : ((l = Nt.getModifier(t[r].ty)).init(this, t[r]), e[r] = l, this.shapeModifiers.push(l)), m.push(l)) : "rp" == t[r].ty && (h ? (l = e[r]).closed = !0 : (l = Nt.getModifier(t[r].ty), e[r] = l, l.init(this, t, r, e), this.shapeModifiers.push(l), i = !1), m.push(l));
			                    this.addProcessedElement(t[r], r + 1)
			                }
			                for (this.removeTransformFromStyleList(), this.closeStyles(c), f = m.length, r = 0; r < f; r += 1) m[r].closed = !0
			            }, rt.prototype.renderInnerContent = function() {
			                this.transformHelper.opacity = 1, this.transformHelper._opMdf = !1, this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame), this.renderShape(this.transformHelper, this.shapesData, this.itemsData, !0)
			            }, rt.prototype.renderShapeTransform = function(t, e) {
			                (t._opMdf || e.op._mdf || this._isFirstFrame) && (e.opacity = t.opacity, e.opacity *= e.op.v, e._opMdf = !0)
			            }, rt.prototype.drawLayer = function() {
			                var t, e, s, i, a, r, n, o, h, l = this.stylesList.length,
			                    p = this.globalData.renderer,
			                    f = this.globalData.canvasContext;
			                for (t = 0; t < l; t += 1) if (("st" !== (o = (h = this.stylesList[t]).type) && "gs" !== o || 0 !== h.wi) && h.data._shouldRender && 0 !== h.coOp && 0 !== this.globalData.currentGlobalAlpha) {
			                    for (p.save(), r = h.elements, "st" === o || "gs" === o ? (f.strokeStyle = "st" === o ? h.co : h.grd, f.lineWidth = h.wi, f.lineCap = h.lc, f.lineJoin = h.lj, f.miterLimit = h.ml || 0) : f.fillStyle = "fl" === o ? h.co : h.grd, p.ctxOpacity(h.coOp), "st" !== o && "gs" !== o && f.beginPath(), p.ctxTransform(h.preTransforms.finalTransform.props), s = r.length, e = 0; e < s; e += 1) {
			                        for ("st" !== o && "gs" !== o || (f.beginPath(), h.da && (f.setLineDash(h.da), f.lineDashOffset = h.do)), a = (n = r[e].trNodes).length, i = 0; i < a; i += 1) "m" == n[i].t ? f.moveTo(n[i].p[0], n[i].p[1]) : "c" == n[i].t ? f.bezierCurveTo(n[i].pts[0], n[i].pts[1], n[i].pts[2], n[i].pts[3], n[i].pts[4], n[i].pts[5]) : f.closePath();
			                        "st" !== o && "gs" !== o || (f.stroke(), h.da && f.setLineDash(this.dashResetter))
			                    }
			                    "st" !== o && "gs" !== o && f.fill(h.r), p.restore()
			                }
			            }, rt.prototype.renderShape = function(t, e, s, i) {
			                var a, r;
			                for (r = t, a = e.length - 1; a >= 0; a -= 1) "tr" == e[a].ty ? (r = s[a].transform, this.renderShapeTransform(t, r)) : "sh" == e[a].ty || "el" == e[a].ty || "rc" == e[a].ty || "sr" == e[a].ty ? this.renderPath(e[a], s[a]) : "fl" == e[a].ty ? this.renderFill(e[a], s[a], r) : "st" == e[a].ty ? this.renderStroke(e[a], s[a], r) : "gf" == e[a].ty || "gs" == e[a].ty ? this.renderGradientFill(e[a], s[a], r) : "gr" == e[a].ty ? this.renderShape(r, e[a].it, s[a].it) : e[a].ty;
			                i && this.drawLayer()
			            }, rt.prototype.renderStyledShape = function(t, e) {
			                if (this._isFirstFrame || e._mdf || t.transforms._mdf) {
			                    var s, i, a, r = t.trNodes,
			                        n = e.paths,
			                        o = n._length;
			                    r.length = 0;
			                    var h = t.transforms.finalTransform;
			                    for (a = 0; a < o; a += 1) {
			                        var l = n.shapes[a];
			                        if (l && l.v) {
			                            for (i = l._length, s = 1; s < i; s += 1) 1 === s && r.push({
			                                t: "m",
			                                p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
			                            }), r.push({
			                                t: "c",
			                                pts: h.applyToTriplePoints(l.o[s - 1], l.i[s], l.v[s])
			                            });
			                            1 === i && r.push({
			                                t: "m",
			                                p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
			                            }), l.c && i && (r.push({
			                                t: "c",
			                                pts: h.applyToTriplePoints(l.o[s - 1], l.i[0], l.v[0])
			                            }), r.push({
			                                t: "z"
			                            }))
			                        }
			                    }
			                    t.trNodes = r
			                }
			            }, rt.prototype.renderPath = function(t, e) {
			                if (!0 !== t.hd && t._shouldRender) {
			                    var s, i = e.styledShapes.length;
			                    for (s = 0; s < i; s += 1) this.renderStyledShape(e.styledShapes[s], e.sh)
			                }
			            }, rt.prototype.renderFill = function(t, e, s) {
			                var i = e.style;
			                (e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + vt(e.c.v[0]) + "," + vt(e.c.v[1]) + "," + vt(e.c.v[2]) + ")"), (e.o._mdf || s._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * s.opacity)
			            }, rt.prototype.renderGradientFill = function(t, e, s) {
			                var i = e.style;
			                if (!i.grd || e.g._mdf || e.s._mdf || e.e._mdf || 1 !== t.t && (e.h._mdf || e.a._mdf)) {
			                    var a = this.globalData.canvasContext,
			                        r = e.s.v,
			                        n = e.e.v;
			                    if (1 === t.t) c = a.createLinearGradient(r[0], r[1], n[0], n[1]);
			                    else var o = Math.sqrt(Math.pow(r[0] - n[0], 2) + Math.pow(r[1] - n[1], 2)),
			                        h = Math.atan2(n[1] - r[1], n[0] - r[0]),
			                        l = o * (e.h.v >= 1 ? .99 : e.h.v <= -1 ? -.99 : e.h.v),
			                        p = Math.cos(h + e.a.v) * l + r[0],
			                        f = Math.sin(h + e.a.v) * l + r[1],
			                        c = a.createRadialGradient(p, f, 0, r[0], r[1], o);
			                    var m, d = t.g.p,
			                        u = e.g.c,
			                        g = 1;
			                    for (m = 0; m < d; m += 1) e.g._hasOpacity && e.g._collapsable && (g = e.g.o[2 * m + 1]), c.addColorStop(u[4 * m] / 100, "rgba(" + u[4 * m + 1] + "," + u[4 * m + 2] + "," + u[4 * m + 3] + "," + g + ")");
			                    i.grd = c
			                }
			                i.coOp = e.o.v * s.opacity
			            }, rt.prototype.renderStroke = function(t, e, s) {
			                var i = e.style,
			                    a = e.d;
			                a && (a._mdf || this._isFirstFrame) && (i.da = a.dashArray, i.do = a.dashoffset[0]), (e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + vt(e.c.v[0]) + "," + vt(e.c.v[1]) + "," + vt(e.c.v[2]) + ")"), (e.o._mdf || s._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * s.opacity), (e.w._mdf || this._isFirstFrame) && (i.wi = e.w.v)
			            }, rt.prototype.destroy = function() {
			                this.shapesData = null, this.globalData = null, this.canvasContext = null, this.stylesList.length = 0, this.itemsData.length = 0
			            }, x([H, q, et, V, z, j], nt), nt.prototype.initElement = $.prototype.initElement, nt.prototype.prepareFrame = U.prototype.prepareFrame, nt.prototype.renderInnerContent = function() {
			                var t = this.canvasContext;
			                t.fillStyle = this.data.sc, t.fillRect(0, 0, this.data.sw, this.data.sh)
			            }, x([H, q, et, V, z, j, J], ot), ot.prototype.tHelper = _("canvas").getContext("2d"), ot.prototype.buildNewText = function() {
			                var t = this.textProperty.currentData;
			                this.renderedLetters = b(t.l ? t.l.length : 0);
			                var e = !1;
			                t.fc ? (e = !0, this.values.fill = this.buildColor(t.fc)) : this.values.fill = "rgba(0,0,0,0)", this.fill = e;
			                var s = !1;
			                t.sc && (s = !0, this.values.stroke = this.buildColor(t.sc), this.values.sWidth = t.sw);
			                var i, a, r = this.globalData.fontManager.getFontByName(t.f),
			                    n = t.l,
			                    o = this.mHelper;
			                this.stroke = s, this.values.fValue = t.finalSize + "px " + this.globalData.fontManager.getFontByName(t.f).fFamily, a = t.finalText.length;
			                var h, l, p, f, c, m, d, u, g, v, y = this.data.singleShape,
			                    _ = t.tr / 1e3 * t.finalSize,
			                    k = 0,
			                    x = 0,
			                    P = !0,
			                    D = 0;
			                for (i = 0; i < a; i += 1) {
			                    for (l = (h = this.globalData.fontManager.getCharData(t.finalText[i], r.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily)) && h.data || {}, o.reset(), y && n[i].n && (k = -_, x += t.yOffset, x += P ? 1 : 0, P = !1), d = (c = l.shapes ? l.shapes[0].it : []).length, o.scale(t.finalSize / 100, t.finalSize / 100), y && this.applyTextPropertiesToMatrix(t, o, n[i].line, k, x), g = b(d), m = 0; m < d; m += 1) {
			                        for (f = c[m].ks.k.i.length, u = c[m].ks.k, v = [], p = 1; p < f; p += 1) 1 == p && v.push(o.applyToX(u.v[0][0], u.v[0][1], 0), o.applyToY(u.v[0][0], u.v[0][1], 0)), v.push(o.applyToX(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToY(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToX(u.i[p][0], u.i[p][1], 0), o.applyToY(u.i[p][0], u.i[p][1], 0), o.applyToX(u.v[p][0], u.v[p][1], 0), o.applyToY(u.v[p][0], u.v[p][1], 0));
			                        v.push(o.applyToX(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToY(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToX(u.i[0][0], u.i[0][1], 0), o.applyToY(u.i[0][0], u.i[0][1], 0), o.applyToX(u.v[0][0], u.v[0][1], 0), o.applyToY(u.v[0][0], u.v[0][1], 0)), g[m] = v
			                    }
			                    y && (k += n[i].l, k += _), this.textSpans[D] ? this.textSpans[D].elem = g : this.textSpans[D] = {
			                        elem: g
			                    }, D += 1
			                }
			            }, ot.prototype.renderInnerContent = function() {
			                var t, e, s, i, a, r, n = this.canvasContext;
			                this.finalTransform.mat.props, n.font = this.values.fValue, n.lineCap = "butt", n.lineJoin = "miter", n.miterLimit = 4, this.data.singleShape || this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
			                var o, h = this.textAnimator.renderedLetters,
			                    l = this.textProperty.currentData.l;
			                e = l.length;
			                var p, f, c = null,
			                    m = null,
			                    d = null;
			                for (t = 0; t < e; t += 1) if (!l[t].n) {
			                    if ((o = h[t]) && (this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(o.p), this.globalData.renderer.ctxOpacity(o.o)), this.fill) {
			                        for (o && o.fc ? c !== o.fc && (c = o.fc, n.fillStyle = o.fc) : c !== this.values.fill && (c = this.values.fill, n.fillStyle = this.values.fill), i = (p = this.textSpans[t].elem).length, this.globalData.canvasContext.beginPath(), s = 0; s < i; s += 1) for (r = (f = p[s]).length, this.globalData.canvasContext.moveTo(f[0], f[1]), a = 2; a < r; a += 6) this.globalData.canvasContext.bezierCurveTo(f[a], f[a + 1], f[a + 2], f[a + 3], f[a + 4], f[a + 5]);
			                        this.globalData.canvasContext.closePath(), this.globalData.canvasContext.fill()
			                    }
			                    if (this.stroke) {
			                        for (o && o.sw ? d !== o.sw && (d = o.sw, n.lineWidth = o.sw) : d !== this.values.sWidth && (d = this.values.sWidth, n.lineWidth = this.values.sWidth), o && o.sc ? m !== o.sc && (m = o.sc, n.strokeStyle = o.sc) : m !== this.values.stroke && (m = this.values.stroke, n.strokeStyle = this.values.stroke), i = (p = this.textSpans[t].elem).length, this.globalData.canvasContext.beginPath(), s = 0; s < i; s += 1) for (r = (f = p[s]).length, this.globalData.canvasContext.moveTo(f[0], f[1]), a = 2; a < r; a += 6) this.globalData.canvasContext.bezierCurveTo(f[a], f[a + 1], f[a + 2], f[a + 3], f[a + 4], f[a + 5]);
			                        this.globalData.canvasContext.closePath(), this.globalData.canvasContext.stroke()
			                    }
			                    o && this.globalData.renderer.restore()
			                }
			            }, ht.prototype.renderFrame = function() {};
			            var Zt = function() {
			                function e(t) {
			                    for (var e = 0, s = t.target; e < m;) f[e].animation === s && (f.splice(e, 1), e -= 1, m -= 1, s.isPaused || a()), e += 1
			                }
			                function s(t, e) {
			                    if (!t) return null;
			                    for (var s = 0; s < m;) {
			                        if (f[s].elem == t && null !== f[s].elem) return f[s].animation;
			                        s += 1
			                    }
			                    var i = new ae;
			                    return r(i, t), i.setData(t, e), i
			                }
			                function i() {
			                    d += 1, l()
			                }
			                function a() {
			                    d -= 1, ee && f[Ut] && e({
			                        target: f[Ut].animation
			                    })
			                }
			                function r(t, s) {
			                    t.addEventListener("destroy", e), t.addEventListener("_active", i), t.addEventListener("_idle", a), f.push({
			                        elem: s,
			                        animation: t
			                    }), m += 1
			                }
			                function n(e) {
			                    for (var s = 0; s < Qt.length; s += 1) Qt[s].clearRect(0, 0, $t[s], te[s]);
			                    var i, a = e - c;
			                    for (i = 0; i < m; i += 1) Ut = i, f[i] && f[i].animation && f[i].animation.advanceTime(a);
			                    c = e, f && 0 !== f.length && d && !g ? t.requestAnimationFrame(n) : u = !0
			                }
			                function h(e) {
			                    c = e, t.requestAnimationFrame(n)
			                }
			                function l() {
			                    !g && d && u && (t.requestAnimationFrame(h), u = !1)
			                }
			                var p = {}, f = [],
			                    c = 0,
			                    m = 0,
			                    d = 0,
			                    u = !0,
			                    g = !1;
			                return p.registerAnimation = s, p.loadAnimation = function(t) {
			                    var e = new ae;
			                    return r(e, null), e.setParams(t), e
			                }, p.setSpeed = function(t, e) {
			                    var s;
			                    for (s = 0; s < m; s += 1) f[s].animation.setSpeed(t, e)
			                }, p.setDirection = function(t, e) {
			                    var s;
			                    for (s = 0; s < m; s += 1) f[s].animation.setDirection(t, e)
			                }, p.play = function(t) {
			                    var e;
			                    for (e = 0; e < m; e += 1) f[e].animation.play(t)
			                }, p.pause = function(t) {
			                    var e;
			                    for (e = 0; e < m; e += 1) f[e].animation.pause(t)
			                }, p.stop = function(t) {
			                    var e;
			                    for (e = 0; e < m; e += 1) f[e].animation.stop(t)
			                }, p.togglePause = function(t) {
			                    var e;
			                    for (e = 0; e < m; e += 1) f[e].animation.togglePause(t)
			                }, p.searchAnimations = function(t, e) {
			                    var i, a = [].concat([].slice.call(o.getElementsByClassName("lottie")), [].slice.call(o.getElementsByClassName("bodymovin"))),
			                        r = a.length;
			                    for (i = 0; i < r; i += 1) e && a[i].setAttribute("data-bm-type", e), s(a[i], t)
			                }, p.resize = function() {
			                    var t;
			                    for (t = 0; t < m; t += 1) f[t].animation.resize()
			                }, p.goToAndStop = function(t, e, s) {
			                    var i;
			                    for (i = 0; i < m; i += 1) f[i].animation.goToAndStop(t, e, s)
			                }, p.destroy = function(t) {
			                    var e;
			                    for (e = m - 1; e >= 0; e -= 1) f[e].animation.destroy(t)
			                }, p.freeze = function() {
			                    g = !0
			                }, p.unfreeze = function() {
			                    g = !1, l()
			                }, p.getRegisteredAnimations = function() {
			                    var t, e = f.length,
			                        s = [];
			                    for (t = 0; t < e; t += 1) s.push(f[t].animation);
			                    return s
			                }, p
			            }(),
			                Ut = 0,
			                Qt = [],
			                $t = [],
			                te = [],
			                ee = !1,
			                se = "default",
			                ie = [],
			                ae = function() {
			                    this._cbs = [], this.name = "", this.path = "", this.isLoaded = !1, this.currentFrame = 0, this.currentRawFrame = 0, this.totalFrames = 0, this.frameRate = 0, this.frameMult = 0, this.playSpeed = 1, this.playDirection = 1, this.playCount = 0, this.animationData = {}, this.assets = [], this.isPaused = !0, this.autoplay = !1, this.loop = !0, this.renderer = null, this.animationID = Pt(), this.assetsPath = "", this.timeCompleted = 0, this.segmentPos = 0, this.subframeEnabled = mt, this.segments = [], this._idle = !0, this._completedLoop = !1, this.projectInterface = {}, this.imagePreloader = new zt, this.renderAnimationTime = 0, this.renderFrameNum = 0
			                };
			            x([y], ae), ae.prototype.setParams = function(t) {
			                ee = t.clearAnimation, se = t.transformPerformance, t.context && (this.context = t.context), (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container), this.renderer = new O(this, t.rendererSettings), this.renderer.setProjectInterface(this.projectInterface), this.animType = "canvas", "" === t.loop || null === t.loop || (!1 === t.loop ? this.loop = !1 : !0 === t.loop ? this.loop = !0 : this.loop = parseInt(t.loop)), this.autoplay = !("autoplay" in t) || t.autoplay, this.name = t.name ? t.name : "", this.autoloadSegments = !t.hasOwnProperty("autoloadSegments") || t.autoloadSegments, this.assetsPath = t.assetsPath, t.animationData ? this.configAnimation(t.animationData) : t.path && (-1 !== t.path.lastIndexOf("\\") ? this.path = t.path.substr(0, t.path.lastIndexOf("\\") + 1) : this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1), this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1), this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")), qt.load(t.path, this.configAnimation.bind(this), function() {
			                    this.trigger("data_failed")
			                }.bind(this)))
			            }, ae.prototype.setData = function(t, e) {
			                var s = {
			                    wrapper: t,
			                    animationData: e ? "object" === a(e) ? e : JSON.parse(e) : null
			                }, i = t.attributes;
			                s.path = i.getNamedItem("data-animation-path") ? i.getNamedItem("data-animation-path").value : i.getNamedItem("data-bm-path") ? i.getNamedItem("data-bm-path").value : i.getNamedItem("bm-path") ? i.getNamedItem("bm-path").value : "", s.animType = i.getNamedItem("data-anim-type") ? i.getNamedItem("data-anim-type").value : i.getNamedItem("data-bm-type") ? i.getNamedItem("data-bm-type").value : i.getNamedItem("bm-type") ? i.getNamedItem("bm-type").value : i.getNamedItem("data-bm-renderer") ? i.getNamedItem("data-bm-renderer").value : i.getNamedItem("bm-renderer") ? i.getNamedItem("bm-renderer").value : "canvas";
			                var r = i.getNamedItem("data-anim-loop") ? i.getNamedItem("data-anim-loop").value : i.getNamedItem("data-bm-loop") ? i.getNamedItem("data-bm-loop").value : i.getNamedItem("bm-loop") ? i.getNamedItem("bm-loop").value : "";
			                "" === r || (s.loop = "false" !== r && ("true" === r || parseInt(r)));
			                var n = i.getNamedItem("data-anim-autoplay") ? i.getNamedItem("data-anim-autoplay").value : i.getNamedItem("data-bm-autoplay") ? i.getNamedItem("data-bm-autoplay").value : !i.getNamedItem("bm-autoplay") || i.getNamedItem("bm-autoplay").value;
			                s.autoplay = "false" !== n, s.name = i.getNamedItem("data-name") ? i.getNamedItem("data-name").value : i.getNamedItem("data-bm-name") ? i.getNamedItem("data-bm-name").value : i.getNamedItem("bm-name") ? i.getNamedItem("bm-name").value : "", "false" === (i.getNamedItem("data-anim-prerender") ? i.getNamedItem("data-anim-prerender").value : i.getNamedItem("data-bm-prerender") ? i.getNamedItem("data-bm-prerender").value : i.getNamedItem("bm-prerender") ? i.getNamedItem("bm-prerender").value : "") && (s.prerender = !1), this.setParams(s)
			            }, ae.prototype.includeLayers = function(t) {
			                t.op > this.animationData.op && (this.animationData.op = t.op, this.totalFrames = Math.floor(t.op - this.animationData.ip));
			                var e, s, i = this.animationData.layers,
			                    a = i.length,
			                    r = t.layers,
			                    n = r.length;
			                for (s = 0; s < n; s += 1) for (e = 0; e < a;) {
			                    if (i[e].id == r[s].id) {
			                        i[e] = r[s];
			                        break
			                    }
			                    e += 1
			                }
			                if ((t.chars || t.fonts) && (this.renderer.globalData.fontManager.addChars(t.chars), this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)), t.assets) for (a = t.assets.length, e = 0; e < a; e += 1) this.animationData.assets.push(t.assets[e]);
			                this.animationData.__complete = !1, Ft.completeData(this.animationData, this.renderer.globalData.fontManager), this.renderer.includeLayers(t.layers), this.loadNextSegment()
			            }, ae.prototype.loadNextSegment = function() {
			                var t = this.animationData.segments;
			                if (!t || 0 === t.length || !this.autoloadSegments) return this.trigger("data_ready"), void(this.timeCompleted = this.totalFrames);
			                var e = t.shift();
			                this.timeCompleted = e.time * this.frameRate;
			                var s = this.path + this.fileName + "_" + this.segmentPos + ".json";
			                this.segmentPos += 1, qt.load(s, this.includeLayers.bind(this), function() {
			                    this.trigger("data_failed")
			                }.bind(this))
			            }, ae.prototype.loadSegments = function() {
			                this.animationData.segments || (this.timeCompleted = this.totalFrames), this.loadNextSegment()
			            }, ae.prototype.imagesLoaded = function() {
			                this.trigger("loaded_images"), this.checkLoaded()
			            }, ae.prototype.preloadImages = function() {
			                this.imagePreloader.setAssetsPath(this.assetsPath), this.imagePreloader.setPath(this.path), this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this))
			            }, ae.prototype.configAnimation = function(t) {
			                if (this.renderer) try {
			                    this.animationData = t, this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip), this.renderer.configAnimation(t), t.assets || (t.assets = []), this.assets = this.animationData.assets, this.frameRate = this.animationData.fr, this.firstFrame = Math.round(this.animationData.ip), this.frameMult = this.animationData.fr / 1e3, this.renderer.searchExtraCompositions(t.assets), this.trigger("config_ready"), this.preloadImages(), this.loadSegments(), this.updaFrameModifier(), this.waitForFontsLoaded(), Qt.push(this.renderer.canvasContext), $t.push(this.renderer.transformCanvas.w), te.push(this.renderer.transformCanvas.h)
			                } catch (t) {
			                    this.triggerConfigError(t)
			                }
			            }, ae.prototype.waitForFontsLoaded = function() {
			                this.renderer && (this.renderer.globalData.fontManager.loaded() ? this.checkLoaded() : setTimeout(this.waitForFontsLoaded.bind(this), 20))
			            }, ae.prototype.checkLoaded = function() {
			                this.isLoaded || !this.renderer.globalData.fontManager.loaded() || !this.imagePreloader.loaded() && "canvas" === this.renderer.rendererType || (this.isLoaded = !0, Ft.completeData(this.animationData, this.renderer.globalData.fontManager), this.renderer.initItems(), setTimeout(function() {
			                    this.trigger("DOMLoaded")
			                }.bind(this), 0), this.gotoFrame(), this.autoplay && this.play())
			            }, ae.prototype.resize = function() {
			                this.renderer.updateContainerSize()
			            }, ae.prototype.setSubframe = function(t) {
			                this.subframeEnabled = !! t
			            }, ae.prototype.gotoFrame = function() {
			                this.currentFrame = this.subframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame, this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted), this.trigger("enterFrame"), this.renderFrame()
			            }, ae.prototype.renderFrame = function() {
			                if (!1 !== this.isLoaded) try {
			                    this.renderer.renderFrame(this.currentFrame + this.firstFrame)
			                } catch (t) {
			                    this.triggerRenderFrameError(t)
			                }
			            }, ae.prototype.play = function(t) {
			                t && this.name != t || !0 === this.isPaused && (this.isPaused = !1, this._idle && (this._idle = !1, this.trigger("_active")))
			            }, ae.prototype.pause = function(t) {
			                t && this.name != t || !1 === this.isPaused && (this.isPaused = !0, this._idle = !0, this.trigger("_idle"))
			            }, ae.prototype.togglePause = function(t) {
			                t && this.name != t || (!0 === this.isPaused ? this.play() : this.pause())
			            }, ae.prototype.stop = function(t) {
			                t && this.name != t || (this.pause(), this.playCount = 0, this._completedLoop = !1, this.setCurrentRawFrameValue(0))
			            }, ae.prototype.goToAndStop = function(t, e, s) {
			                s && this.name != s || (e ? this.setCurrentRawFrameValue(t) : this.setCurrentRawFrameValue(t * this.frameModifier), this.pause())
			            }, ae.prototype.goToAndPlay = function(t, e, s) {
			                this.goToAndStop(t, e, s), this.play()
			            }, ae.prototype.advanceTime = function(t) {
			                if (!0 !== this.isPaused && !1 !== this.isLoaded) {
			                    this.renderAnimationTime += Math.max(t, 16), this.renderFrameNum += 1;
			                    var e = this.currentRawFrame + t * this.frameModifier,
			                        s = !1;
			                    if (e >= this.totalFrames - 1 && this.frameModifier > 0 ? this.loop && this.playCount !== this.loop ? e >= this.totalFrames ? (this.playCount += 1, this.checkSegments(e % this.totalFrames) || (this.setCurrentRawFrameValue(e % this.totalFrames), this._completedLoop = !0, this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(e) : this.checkSegments(e > this.totalFrames ? e % this.totalFrames : 0) || (s = !0, e = this.totalFrames - 1) : e < 0 ? this.checkSegments(e % this.totalFrames) || (!this.loop || this.playCount-- <= 0 && !0 !== this.loop ? (s = !0, e = 0) : (this.setCurrentRawFrameValue(this.totalFrames + e % this.totalFrames), this._completedLoop ? this.trigger("loopComplete") : this._completedLoop = !0)) : this.setCurrentRawFrameValue(e), s) {
			                        var i = Math.round(this.renderFrameNum / this.renderAnimationTime * 1e3);
			                        this.renderAnimationTime = 0, this.renderFrameNum = 0, this.setCurrentRawFrameValue(e), this.pause(), this.trigger("complete", i)
			                    }
			                }
			            }, ae.prototype.adjustSegment = function(t, e) {
			                this.playCount = 0, t[1] < t[0] ? (this.frameModifier > 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), this.timeCompleted = this.totalFrames = t[0] - t[1], this.firstFrame = t[1], this.setCurrentRawFrameValue(this.totalFrames - .001 - e)) : t[1] > t[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), this.timeCompleted = this.totalFrames = t[1] - t[0], this.firstFrame = t[0], this.setCurrentRawFrameValue(.001 + e)), this.trigger("segmentStart")
			            }, ae.prototype.setSegment = function(t, e) {
			                var s = -1;
			                this.isPaused && (this.currentRawFrame + this.firstFrame < t ? s = t : this.currentRawFrame + this.firstFrame > e && (s = e - t)), this.firstFrame = t, this.timeCompleted = this.totalFrames = e - t, -1 !== s && this.goToAndStop(s, !0)
			            }, ae.prototype.playSegments = function(t, e) {
			                if (e && (this.segments.length = 0), "object" === a(t[0])) {
			                    var s, i = t.length;
			                    for (s = 0; s < i; s += 1) if (t[s][2] && "object" === a(t[s][2])) {
			                        var r;
			                        r = t[s][2].duration && t[s][2].duration > 0 ? Math.floor(t[s][2].duration * this.frameRate / Math.abs(t[s][1] - t[s][0])) : t[s][2].times && t[s][2].times > 0 ? Math.floor(t[s][2].times) : 1;
			                        for (var n = 0; n < r; n++) this.segments.push(t[s])
			                    } else this.segments.push(t[s])
			                } else this.segments.push(t);
			                this.segments.length && e && this.adjustSegment(this.segments.shift(), 0), this.isPaused && this.play()
			            }, ae.prototype.resetSegments = function(t) {
			                this.segments.length = 0, this.segments.push([this.animationData.ip, this.animationData.op]), t && this.checkSegments(0)
			            }, ae.prototype.checkSegments = function(t) {
			                return !!this.segments.length && (this.adjustSegment(this.segments.shift(), t), !0)
			            }, ae.prototype.destroy = function(t) {
			                t && this.name != t || !this.renderer || (this.renderer.destroy(), this.imagePreloader.destroy(), this.trigger("destroy"), this._cbs = null, this.onEnterFrame = this.onLoopComplete = this.onComplete = this.onSegmentStart = this.onDestroy = null, this.renderer = null)
			            }, ae.prototype.setCurrentRawFrameValue = function(t) {
			                this.currentRawFrame = t, this.gotoFrame()
			            }, ae.prototype.setSpeed = function(t) {
			                this.playSpeed = t, this.updaFrameModifier()
			            }, ae.prototype.setDirection = function(t) {
			                this.playDirection = t < 0 ? -1 : 1, this.updaFrameModifier()
			            }, ae.prototype.updaFrameModifier = function() {
			                this.frameModifier = this.frameMult * this.playSpeed * this.playDirection
			            }, ae.prototype.getPath = function() {
			                return this.path
			            }, ae.prototype.getAssetsPath = function(t) {
			                var e = "";
			                if (t.e) e = t.p;
			                else if (this.assetsPath) {
			                    var s = t.p; - 1 !== s.indexOf("images/") && (s = s.split("/")[1]), e = this.assetsPath + s
			                } else e = this.path, e += t.u ? t.u : "", e += t.p;
			                return e
			            }, ae.prototype.getAssetData = function(t) {
			                for (var e = 0, s = this.assets.length; e < s;) {
			                    if (t == this.assets[e].id) return this.assets[e];
			                    e += 1
			                }
			            }, ae.prototype.hide = function() {
			                this.renderer.hide()
			            }, ae.prototype.show = function() {
			                this.renderer.show()
			            }, ae.prototype.getDuration = function(t) {
			                return t ? this.totalFrames : this.totalFrames / this.frameRate
			            }, ae.prototype.trigger = function(t) {
			                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
			                if (this._cbs && this._cbs[t]) switch (t) {
			                    case "enterFrame":
			                        this.triggerEvent(t, new s(t, this.currentFrame, this.totalFrames, this.frameModifier));
			                        break;
			                    case "loopComplete":
			                        this.triggerEvent(t, new n(t, this.loop, this.playCount, this.frameMult));
			                        break;
			                    case "complete":
			                        this.triggerEvent(t, new i(t, this.frameMult, e));
			                        break;
			                    case "segmentStart":
			                        this.triggerEvent(t, new l(t, this.firstFrame, this.totalFrames));
			                        break;
			                    case "destroy":
			                        this.triggerEvent(t, new p(t, this));
			                        break;
			                    default:
			                        this.triggerEvent(t)
			                }
			                "enterFrame" === t && this.onEnterFrame && this.onEnterFrame.call(this, new s(t, this.currentFrame, this.totalFrames, this.frameMult)), "loopComplete" === t && this.onLoopComplete && this.onLoopComplete.call(this, new n(t, this.loop, this.playCount, this.frameMult)), "complete" === t && this.onComplete && this.onComplete.call(this, new i(t, this.frameMult, e)), "segmentStart" === t && this.onSegmentStart && this.onSegmentStart.call(this, new l(t, this.firstFrame, this.totalFrames)), "destroy" === t && this.onDestroy && this.onDestroy.call(this, new p(t, this))
			            }, ae.prototype.triggerRenderFrameError = function(t) {
			                var e = new f(t, this.currentFrame);
			                this.triggerEvent("error", e), this.onError && this.onError.call(this, e)
			            }, ae.prototype.triggerConfigError = function(t) {
			                var e = new c(t, this.currentFrame);
			                this.triggerEvent("error", e), this.onError && this.onError.call(this, e)
			            };
			            var re = {};
			            re.play = Zt.play, re.pause = Zt.pause, re.setLocationHref = function(t) {
			                ft = t
			            }, re.togglePause = Zt.togglePause, re.setSpeed = Zt.setSpeed, re.setDirection = Zt.setDirection, re.stop = Zt.stop, re.searchAnimations = pt, re.registerAnimation = Zt.registerAnimation, re.loadAnimation = function(t) {
			                if (["wrapper", "container"].forEach(function(e) {
			                    if (e in t) throw new Error("Not support '".concat(e, "' parameter in miniprogram version of lottie."))
			                }), "string" == typeof t.path && !/^https?\:\/\//.test(t.path)) throw new Error("The 'path' is only support http protocol.");
			                if (!t.rendererSettings || !t.rendererSettings.context) throw new Error("Parameter 'rendererSettings.context' should be a CanvasRenderingContext2D.");
			                return t.renderer = "canvas", Zt.loadAnimation(t)
			            }, re.setSubframeRendering = function(t) {
			                mt = t
			            }, re.resize = Zt.resize, re.goToAndStop = Zt.goToAndStop, re.destroy = Zt.destroy, re.setQuality = function(t) {
			                if ("string" == typeof t) switch (t) {
			                    case "high":
			                        _t = 200;
			                        break;
			                    case "medium":
			                        _t = 50;
			                        break;
			                    case "low":
			                        _t = 10
			                } else !isNaN(t) && t > 1 && (_t = t);
			                e(!(_t >= 50))
			            }, re.inBrowser = function() {
			                return void 0 !== h
			            }, re.installPlugin = function(t, e) {
			                "events" === t && (dt = ["touchstart", "touchmove", "touchend", "touchcancel", "longtap"])
			            }, re.freeze = Zt.freeze, re.unfreeze = Zt.unfreeze, re.setup = r.b, re.triggerEvents = function(t, e, s) {
			                if (dt && dt.includes(t)) {
			                    var i = 3 * e.touches[0].x,
			                        a = 3 * e.touches[0].y;
			                    console.log("triggerEvents", i, a);
			                    for (var r = Zt.getRegisteredAnimations(), n = 0; n < r.length; n += 1) {
			                        var o = r[n],
			                            h = o.renderer.contextData.cTr.transformX,
			                            l = o.renderer.contextData.cTr.transformY,
			                            p = o.renderer.canvasContext.img.width,
			                            f = o.renderer.canvasContext.img.height;
			                        console.log("registeredAnimations length", r.length), console.log(i, a, h, l, p, f), i >= h && i <= h + p && a >= l && a <= l + f && (o.stop(), s.goToAndPlay(0))
			                    }
			                }
			            }, re.getRegisteredAnimations = Zt.getRegisteredAnimations, re.__getFactory = function(t) {
			                switch (t) {
			                    case "propertyFactory":
			                        return It;
			                    case "shapePropertyFactory":
			                        return Ot;
			                    case "matrix":
			                        return St
			                }
			            }, re.version = "5.5.9";
			            var ne = setInterval(function() {
			                "complete" === o.readyState && (clearInterval(ne), pt())
			            }, 100);
			            return re
			        }), s.
			        default = n.lottie
			    }.call(this, i(2)(e))
			}, function(t, e) {
			    t.exports = function(t) {
			        if (!t.webpackPolyfill) {
			            var e = Object.create(t);
			            e.children || (e.children = []), Object.defineProperty(e, "loaded", {
			                enumerable: !0,
			                get: function() {
			                    return e.l
			                }
			            }), Object.defineProperty(e, "id", {
			                enumerable: !0,
			                get: function() {
			                    return e.i
			                }
			            }), Object.defineProperty(e, "exports", {
			                enumerable: !0
			            }), e.webpackPolyfill = 1
			        }
			        return e
			    }
			}]));