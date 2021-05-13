Object.defineProperty(exports, "__esModule", {
    value: !0
});
var _createClass = function() {
    function i(t, s) {
        for (var e = 0; e < s.length; e++) {
            var i = s[e];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }
    return function(t, s, e) {
        return s && i(t.prototype, s), e && i(t, e), t
    }
}();

function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var s = 0, e = Array(t.length); s < t.length; s++) e[s] = t[s];
        return e
    }
    return Array.from(t)
}
function _classCallCheck(t, s) {
    if (!(t instanceof s)) throw new TypeError("Cannot call a class as a function")
}
var QR = require("./qrcode.js"),
    GD = require("./gradient.js"),
    Painter = function() {
        function e(t, s) {
            _classCallCheck(this, e), this.ctx = t, this.data = s, this.globalWidth = {}, this.globalHeight = {}
        }
        return _createClass(e, [{
            key: "paint",
            value: function(t) {
                this.style = {
                    width: this.data.width.toPx(),
                    height: this.data.height.toPx()
                }, this._background();
                var s = !0,
                    e = !1,
                    i = void 0;
                try {
                    for (var h, a = this.data.views[Symbol.iterator](); !(s = (h = a.next()).done); s = !0) {
                        var r = h.value;
                        this._drawAbsolute(r)
                    }
                } catch (t) {
                    e = !0, i = t
                } finally {
                    try {
                        !s && a.
                        return &&a.
                        return ()
                    } finally {
                        if (e) throw i
                    }
                }
                this.ctx.draw(!1, function() {
                    t()
                })
            }
        }, {
            key: "_background",
            value: function() {
                this.ctx.save();
                var t = this.style,
                    s = t.width,
                    e = t.height,
                    i = this.data.background;
                this.ctx.translate(s / 2, e / 2), this._doClip(this.data.borderRadius, s, e), i ? i.startsWith("#") || i.startsWith("rgba") || "transparent" === i.toLowerCase() ? (this.ctx.fillStyle = i, this.ctx.fillRect(-s / 2, -e / 2, s, e)) : GD.api.isGradient(i) ? (GD.api.doGradient(i, s, e, this.ctx), this.ctx.fillRect(-s / 2, -e / 2, s, e)) : this.ctx.drawImage(i, -s / 2, -e / 2, s, e) : (this.ctx.fillStyle = "#fff", this.ctx.fillRect(-s / 2, -e / 2, s, e)), this.ctx.restore()
            }
        }, {
            key: "_drawAbsolute",
            value: function(t) {
                switch (t.css && t.css.length && (t.css = Object.assign.apply(Object, _toConsumableArray(t.css))), t.type) {
                    case "image":
                        this._drawAbsImage(t);
                        break;
                    case "text":
                        this._fillAbsText(t);
                        break;
                    case "rect":
                        this._drawAbsRect(t);
                        break;
                    case "qrcode":
                        this._drawQRCode(t)
                }
            }
        }, {
            key: "_doClip",
            value: function(t, s, e) {
                if (t && s && e) {
                    var i = Math.min(t.toPx(), s / 2, e / 2);
                    this.ctx.globalAlpha = 0, this.ctx.fillStyle = "white", this.ctx.beginPath(), this.ctx.arc(-s / 2 + i, -e / 2 + i, i, 1 * Math.PI, 1.5 * Math.PI), this.ctx.lineTo(s / 2 - i, -e / 2), this.ctx.arc(s / 2 - i, -e / 2 + i, i, 1.5 * Math.PI, 2 * Math.PI), this.ctx.lineTo(s / 2, e / 2 - i), this.ctx.arc(s / 2 - i, e / 2 - i, i, 0, .5 * Math.PI), this.ctx.lineTo(-s / 2 + i, e / 2), this.ctx.arc(-s / 2 + i, e / 2 - i, i, .5 * Math.PI, 1 * Math.PI), this.ctx.closePath(), this.ctx.fill(), getApp().systemInfo && getApp().systemInfo.version <= "6.6.6" && "ios" === getApp().systemInfo.platform || this.ctx.clip(), this.ctx.globalAlpha = 1
                }
            }
        }, {
            key: "_doBorder",
            value: function(t, s, e) {
                if (t.css) {
                    var i = t.css,
                        h = i.borderRadius,
                        a = i.borderWidth,
                        r = i.borderColor;
                    if (a) {
                        this.ctx.save(), this._preProcess(t, !0);
                        var c = void 0;
                        c = h ? Math.min(h.toPx(), s / 2, e / 2) : 0;
                        var o = a.toPx();
                        this.ctx.lineWidth = o, this.ctx.strokeStyle = r || "black", this.ctx.beginPath(), this.ctx.arc(-s / 2 + c, -e / 2 + c, c + o / 2, 1 * Math.PI, 1.5 * Math.PI), this.ctx.lineTo(s / 2 - c, -e / 2 - o / 2), this.ctx.arc(s / 2 - c, -e / 2 + c, c + o / 2, 1.5 * Math.PI, 2 * Math.PI), this.ctx.lineTo(s / 2 + o / 2, e / 2 - c), this.ctx.arc(s / 2 - c, e / 2 - c, c + o / 2, 0, .5 * Math.PI), this.ctx.lineTo(-s / 2 + c, e / 2 + o / 2), this.ctx.arc(-s / 2 + c, e / 2 - c, c + o / 2, .5 * Math.PI, 1 * Math.PI), this.ctx.closePath(), this.ctx.stroke(), this.ctx.restore()
                    }
                }
            }
        }, {
            key: "_preProcess",
            value: function(t, s) {
                var e = 0,
                    i = void 0,
                    h = void 0;
                switch (t.type) {
                    case "text":
                        for (var a = t.text.split("\n"), r = 0; r < a.length; ++r) "" === a[r] && (a[r] = " ");
                        var c = "bold" === t.css.fontWeight ? "bold" : "normal";
                        t.css.fontSize = t.css.fontSize ? t.css.fontSize : "20rpx", this.ctx.font = "normal " + c + " " + t.css.fontSize.toPx() + "px " + (t.css.fontFamily ? t.css.fontFamily : "sans-serif");
                        for (var o = 0, l = [], n = 0; n < a.length; ++n) {
                            var x = this.ctx.measureText(a[n]).width,
                                d = t.css.width ? t.css.width.toPx() : x,
                                f = Math.ceil(x / d);
                            e = e < d ? d : e, o += f, l[n] = f
                        }
                        o = t.css.maxLines < o ? t.css.maxLines : o;
                        var g = t.css.lineHeight ? t.css.lineHeight.toPx() : t.css.fontSize.toPx();
                        i = g * o, h = {
                            lines: o,
                            lineHeight: g,
                            textArray: a,
                            linesArray: l
                        };
                        break;
                    case "image":
                        var u = getApp().systemInfo.pixelRatio ? getApp().systemInfo.pixelRatio : 2;
                        t.css && (t.css.width || (t.css.width = "auto"), t.css.height || (t.css.height = "auto")), !t.css || "auto" === t.css.width && "auto" === t.css.height ? (e = Math.round(t.sWidth / u), i = Math.round(t.sHeight / u)) : "auto" === t.css.width ? (i = t.css.height.toPx(), e = t.sWidth / t.sHeight * i) : "auto" === t.css.height ? (e = t.css.width.toPx(), i = t.sHeight / t.sWidth * e) : (e = t.css.width.toPx(), i = t.css.height.toPx());
                        break;
                    default:
                        if (!t.css.width || !t.css.height) return void console.error("You should set width and height");
                        e = t.css.width.toPx(), i = t.css.height.toPx()
                }
                var v = void 0;
                if (t.css && t.css.right) if ("string" == typeof t.css.right) v = this.style.width - t.css.right.toPx(!0);
                else {
                    var P = t.css.right;
                    v = this.style.width - P[0].toPx(!0) - this.globalWidth[P[1]] * (P[2] || 1)
                } else if (t.css && t.css.left) if ("string" == typeof t.css.left) v = t.css.left.toPx(!0);
                else {
                    var b = t.css.left;
                    v = b[0].toPx(!0) + this.globalWidth[b[1]] * (b[2] || 1)
                } else v = 0;
                var p = void 0;
                if (t.css && t.css.bottom) p = this.style.height - i - t.css.bottom.toPx(!0);
                else if (t.css && t.css.top) if ("string" == typeof t.css.top) p = t.css.top.toPx(!0);
                else {
                    var w = t.css.top;
                    p = w[0].toPx(!0) + this.globalHeight[w[1]] * (w[2] || 1)
                } else p = 0;
                var y = t.css && t.css.rotate ? this._getAngle(t.css.rotate) : 0;
                switch (t.css && t.css.align ? t.css.align : t.css && t.css.right ? "right" : "left") {
                    case "center":
                        this.ctx.translate(v, p + i / 2);
                        break;
                    case "right":
                        this.ctx.translate(v - e / 2, p + i / 2);
                        break;
                    default:
                        this.ctx.translate(v + e / 2, p + i / 2)
                }
                return this.ctx.rotate(y), !s && t.css && t.css.borderRadius && "rect" !== t.type && this._doClip(t.css.borderRadius, e, i), this._doShadow(t), t.id && (this.globalWidth[t.id] = e, this.globalHeight[t.id] = i), {
                    width: e,
                    height: i,
                    x: v,
                    y: p,
                    extra: h
                }
            }
        }, {
            key: "_doBackground",
            value: function(t) {
                this.ctx.save();
                var s = this._preProcess(t, !0),
                    e = s.width,
                    i = s.height,
                    h = t.css,
                    a = h.background,
                    r = h.padding,
                    c = [0, 0, 0, 0];
                if (r) {
                    var o = r.split(/\s+/);
                    if (1 === o.length) {
                        var l = o[0].toPx();
                        c = [l, l, l, l]
                    }
                    if (2 === o.length) {
                        var n = o[0].toPx(),
                            x = o[1].toPx();
                        c = [n, x, n, x]
                    }
                    if (3 === o.length) {
                        var d = o[0].toPx(),
                            f = o[1].toPx();
                        c = [d, f, o[2].toPx(), f]
                    }
                    if (4 === o.length) c = [o[0].toPx(), o[1].toPx(), o[2].toPx(), o[3].toPx()]
                }
                var g = e + c[1] + c[3],
                    u = i + c[0] + c[2];
                this._doClip(t.css.borderRadius, g, u), GD.api.isGradient(a) ? GD.api.doGradient(a, g, u, this.ctx) : this.ctx.fillStyle = a, this.ctx.fillRect(-g / 2, -u / 2, g, u), this.ctx.restore()
            }
        }, {
            key: "_drawQRCode",
            value: function(t) {
                this.ctx.save();
                var s = this._preProcess(t),
                    e = s.width,
                    i = s.height;
                QR.api.draw(t.content, this.ctx, -e / 2, -i / 2, e, i, t.css.background, t.css.color), this.ctx.restore(), this._doBorder(t, e, i)
            }
        }, {
            key: "_drawAbsImage",
            value: function(t) {
                if (t.url) {
                    this.ctx.save();
                    var s = this._preProcess(t),
                        e = s.width,
                        i = s.height,
                        h = t.sWidth,
                        a = t.sHeight,
                        r = 0,
                        c = 0,
                        o = e / i;
                    t.sWidth / t.sHeight <= o ? (a = h / o, c = Math.round((t.sHeight - a) / 2)) : (h = a * o, r = Math.round((t.sWidth - h) / 2)), t.css && "scaleToFill" === t.css.mode ? this.ctx.drawImage(t.url, -e / 2, -i / 2, e, i) : this.ctx.drawImage(t.url, r, c, h, a, -e / 2, -i / 2, e, i), this.ctx.restore(), this._doBorder(t, e, i)
                }
            }
        }, {
            key: "_fillAbsText",
            value: function(t) {
                if (t.text) {
                    t.css.background && this._doBackground(t), this.ctx.save();
                    var s = this._preProcess(t, t.css.background && t.css.borderRadius),
                        e = s.width,
                        i = s.height,
                        h = s.extra;
                    this.ctx.fillStyle = t.css.color || "black";
                    var a = h.lines,
                        r = h.lineHeight,
                        c = h.textArray,
                        o = h.linesArray;
                    if (t.id) {
                        for (var l = 0, n = 0; n < c.length; ++n) l = this.ctx.measureText(c[n]).width > l ? this.ctx.measureText(c[n]).width : l;
                        this.globalWidth[t.id] = e ? l < e ? l : e : l
                    }
                    for (var x = 0, d = 0; d < c.length; ++d) for (var f = Math.round(c[d].length / o[d]), g = 0, u = 0, v = 0; v < o[d] && !(a <= x); ++v) {
                        u = f;
                        for (var P = c[d].substr(g, u), b = this.ctx.measureText(P).width; g + u <= c[d].length && (e - b > t.css.fontSize.toPx() || e < b);) {
                            if (b < e) P = c[d].substr(g, ++u);
                            else {
                                if (P.length <= 1) break;
                                P = c[d].substr(g, --u)
                            }
                            b = this.ctx.measureText(P).width
                        }
                        if (g += P.length, x === a - 1 && (d < c.length - 1 || g < c[d].length)) {
                            for (; this.ctx.measureText(P + "...").width > e && !(P.length <= 1);) P = P.substring(0, P.length - 1);
                            P += "...", b = this.ctx.measureText(P).width
                        }
                        this.ctx.setTextAlign(t.css.textAlign ? t.css.textAlign : "left");
                        var p = void 0;
                        switch (t.css.textAlign) {
                            case "center":
                                p = 0;
                                break;
                            case "right":
                                p = e / 2;
                                break;
                            default:
                                p = -e / 2
                        }
                        var w = -i / 2 + (0 === x ? t.css.fontSize.toPx() : t.css.fontSize.toPx() + x * r);
                        x++, "stroke" === t.css.textStyle ? this.ctx.strokeText(P, p, w, b) : this.ctx.fillText(P, p, w, b);
                        var y = t.css.fontSize.toPx();
                        t.css.textDecoration && (this.ctx.beginPath(), /\bunderline\b/.test(t.css.textDecoration) && (this.ctx.moveTo(p, w), this.ctx.lineTo(p + b, w)), /\boverline\b/.test(t.css.textDecoration) && (this.ctx.moveTo(p, w - y), this.ctx.lineTo(p + b, w - y)), /\bline-through\b/.test(t.css.textDecoration) && (this.ctx.moveTo(p, w - y / 3), this.ctx.lineTo(p + b, w - y / 3)), this.ctx.closePath(), this.ctx.strokeStyle = t.css.color, this.ctx.stroke())
                    }
                    this.ctx.restore(), this._doBorder(t, e, i)
                }
            }
        }, {
            key: "_drawAbsRect",
            value: function(t) {
                this.ctx.save();
                var s = this._preProcess(t),
                    e = s.width,
                    i = s.height;
                GD.api.isGradient(t.css.color) ? GD.api.doGradient(t.css.color, e, i, this.ctx) : this.ctx.fillStyle = t.css.color;
                var h = t.css.borderRadius,
                    a = h ? Math.min(h.toPx(), e / 2, i / 2) : 0;
                this.ctx.beginPath(), this.ctx.arc(-e / 2 + a, -i / 2 + a, a, 1 * Math.PI, 1.5 * Math.PI), this.ctx.lineTo(e / 2 - a, -i / 2), this.ctx.arc(e / 2 - a, -i / 2 + a, a, 1.5 * Math.PI, 2 * Math.PI), this.ctx.lineTo(e / 2, i / 2 - a), this.ctx.arc(e / 2 - a, i / 2 - a, a, 0, .5 * Math.PI), this.ctx.lineTo(-e / 2 + a, i / 2), this.ctx.arc(-e / 2 + a, i / 2 - a, a, .5 * Math.PI, 1 * Math.PI), this.ctx.closePath(), this.ctx.fill(), this.ctx.restore(), this._doBorder(t, e, i)
            }
        }, {
            key: "_doShadow",
            value: function(t) {
                if (t.css && t.css.shadow) {
                    var s = t.css.shadow.replace(/,\s+/g, ",").split(" ");
                    4 < s.length ? console.error("shadow don't spread option") : (this.ctx.shadowOffsetX = parseInt(s[0], 10), this.ctx.shadowOffsetY = parseInt(s[1], 10), this.ctx.shadowBlur = parseInt(s[2], 10), this.ctx.shadowColor = s[3])
                }
            }
        }, {
            key: "_getAngle",
            value: function(t) {
                return Number(t) * Math.PI / 180
            }
        }]), e
    }();
exports.
default = Painter;