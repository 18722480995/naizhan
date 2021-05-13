var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };

function isValidUrl(t) {
    return /(ht|f)tp(s?):\/\/([^ \\/]*\.)+[^ \\/]*(:[0-9]+)?\/?/.test(t)
}
function equal(t, e) {
    if (t === e) return !0;
    if (t && e && "object" == (void 0 === t ? "undefined" : _typeof(t)) && "object" == (void 0 === e ? "undefined" : _typeof(e))) {
        var r, n, o, i = Array.isArray(t),
            f = Array.isArray(e);
        if (i && f) {
            if ((n = t.length) != e.length) return !1;
            for (r = n; 0 != r--;) if (!equal(t[r], e[r])) return !1;
            return !0
        }
        if (i != f) return !1;
        var u = t instanceof Date,
            a = e instanceof Date;
        if (u != a) return !1;
        if (u && a) return t.getTime() == e.getTime();
        var l = t instanceof RegExp,
            y = e instanceof RegExp;
        if (l != y) return !1;
        if (l && y) return t.toString() == e.toString();
        var s = Object.keys(t);
        if ((n = s.length) !== Object.keys(e).length) return !1;
        for (r = n; 0 != r--;) if (!Object.prototype.hasOwnProperty.call(e, s[r])) return !1;
        for (r = n; 0 != r--;) if (!equal(t[o = s[r]], e[o])) return !1;
        return !0
    }
    return t != t && e != e
}
module.exports = {
    isValidUrl: isValidUrl,
    equal: equal
};