var _createClass = function() {
    function e(t, s) {
        for (var i = 0; i < s.length; i++) {
            var e = s[i];
            e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(t, e.key, e)
        }
    }
    return function(t, s, i) {
        return s && e(t.prototype, s), i && e(t, i), t
    }
}();

function _classCallCheck(t, s) {
    if (!(t instanceof s)) throw new TypeError("Cannot call a class as a function")
}
var config = require("./config.js"),
    CssHandler = function() {
        function s() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            _classCallCheck(this, s), this.styles = Object.assign({}, t)
        }
        return _createClass(s, [{
            key: "getStyle",
            value: function(t) {
                var i = "";
                return t = t.replace(/<[sS][tT][yY][lL][eE][\s\S]*?>([\s\S]*?)<\/[sS][tT][yY][lL][eE][\s\S]*?>/g, function(t, s) {
                    return i += s, ""
                }), this.styles = new CssParser(i, this.styles).parse(), t
            }
        }, {
            key: "match",
            value: function(t, s) {
                var i, e = (i = this.styles[t]) ? i + ";" : "";
                if (s.class) for (var a = s.class.split(" "), h = 0; h < a.length; h++)(i = this.styles["." + a[h]]) && (e += i + ";");
                return (i = this.styles["#" + s.id]) && (e += i + ";"), e
            }
        }]), s
    }();
module.exports = CssHandler;
var CssParser = function() {
    function e(t, s) {
        for (var i in _classCallCheck(this, e), this.data = t, this.res = s, config.userAgentStyles) s[i] ? s[i] = config.userAgentStyles[i] + ";" + s[i] : s[i] = config.userAgentStyles[i];
        this._comma = !1, this._floor = 0, this._i = 0, this._list = [], this._start = 0, this._state = this.Space
    }
    return _createClass(e, [{
        key: "parse",
        value: function() {
            for (var t = this.data.length; this._i < t; this._i++) this._state(this.data[this._i]);
            return this.res
        }
    }, {
        key: "Space",
        value: function(t) {
            "." == t || "#" == t || "a" <= t && t <= "z" || "A" <= t && t <= "Z" ? (this._start = this._i, this._state = this.StyleName) : "/" == t && "*" == this.data[this._i + 1] ? this.Comment() : config.blankChar[t] || ";" == t || (this._state = this.Ignore)
        }
    }, {
        key: "Comment",
        value: function() {
            this._i = this.data.indexOf("*/", this._i) + 1, this._i || (this._i = this.data.length), this._state = this.Space
        }
    }, {
        key: "Ignore",
        value: function(t) {
            "{" == t ? this._floor++ : "}" != t || --this._floor || (this._list = [], this._state = this.Space)
        }
    }, {
        key: "StyleName",
        value: function(t) {
            config.blankChar[t] ? (this._start != this._i && this._list.push(this.data.substring(this._start, this._i)), this._state = this.NameSpace) : "{" == t ? (this._list.push(this.data.substring(this._start, this._i)), this._start = this._i + 1, this.Content()) : "," == t ? (this._list.push(this.data.substring(this._start, this._i)), this._start = this._i + 1, this._comma = !0) : (t < "a" || "z" < t) && (t < "A" || "Z" < t) && (t < "0" || "9" < t) && "." != t && "#" != t && "-" != t && "_" != t && (this._state = this.Ignore)
        }
    }, {
        key: "NameSpace",
        value: function(t) {
            "{" == t ? (this._start = this._i + 1, this.Content()) : "," == t ? (this._comma = !0, this._start = this._i + 1, this._state = this.StyleName) : config.blankChar[t] || (this._comma ? (this._state = this.StyleName, this._start = this._i--, this._comma = !1) : this._state = this.Ignore)
        }
    }, {
        key: "Content",
        value: function() {
            this._i = this.data.indexOf("}", this._i), -1 == this._i && (this._i = this.data.length);
            for (var t, s = this.data.substring(this._start, this._i), i = this._list.length; t = this._list[--i];) this.res[t] ? this.res[t] += ";" + s : this.res[t] = s;
            this._list = [], this._state = this.Space
        }
    }]), e
}();