! function() {
    var t = {
        isGradient: function(t) {
            return !(!t || !t.startsWith("linear") && !t.startsWith("radial"))
        },
        doGradient: function(t, a, r, n) {
            t.startsWith("linear") ? function(t, a, r, n) {
                for (var e = function(t, a, r) {
                    var n = t.match(/([-]?\d{1,3})deg/),
                        e = n && n[1] ? parseFloat(n[1]) : 0,
                        i = void 0;
                    switch (e) {
                        case 0:
                            i = [0, -r / 2, 0, r / 2];
                            break;
                        case 90:
                            i = [a / 2, 0, -a / 2, 0];
                            break;
                        case -90:
                            i = [-a / 2, 0, a / 2, 0];
                            break;
                        case 180:
                            i = [0, r / 2, 0, -r / 2];
                            break;
                        case -180:
                            i = [0, -r / 2, 0, r / 2];
                            break;
                        default:
                            var s = 0,
                                l = 0;
                            s = 0 < n[1] && n[1] < 90 ? a / 2 - (a / 2 * Math.tan((90 - n[1]) * Math.PI * 2 / 360) - r / 2) * Math.sin(2 * (90 - n[1]) * Math.PI * 2 / 360) / 2 : -180 < n[1] && n[1] < -90 ? -a / 2 + (a / 2 * Math.tan((90 - n[1]) * Math.PI * 2 / 360) - r / 2) * Math.sin(2 * (90 - n[1]) * Math.PI * 2 / 360) / 2 : 90 < n[1] && n[1] < 180 ? a / 2 + (-a / 2 * Math.tan((90 - n[1]) * Math.PI * 2 / 360) - r / 2) * Math.sin(2 * (90 - n[1]) * Math.PI * 2 / 360) / 2 : -a / 2 - (-a / 2 * Math.tan((90 - n[1]) * Math.PI * 2 / 360) - r / 2) * Math.sin(2 * (90 - n[1]) * Math.PI * 2 / 360) / 2, l = Math.tan((90 - n[1]) * Math.PI * 2 / 360) * s, i = [s, -l, -s, l]
                    }
                    return i
                }(r, t, a), i = n.createLinearGradient(e[0], e[1], e[2], e[3]), s = r.match(/linear-gradient\((.+)\)/)[1], l = h(s.substring(s.indexOf(",") + 1)), o = 0; o < l.colors.length; o++) i.addColorStop(l.percents[o], l.colors[o]);
                n.fillStyle = i
            }(a, r, t, n) : t.startsWith("radial") && function(t, a, r, n) {
                for (var e = h(r.match(/radial-gradient\((.+)\)/)[1]), i = n.createCircularGradient(0, 0, t < a ? a / 2 : t / 2), s = 0; s < e.colors.length; s++) i.addColorStop(e.percents[s], e.colors[s]);
                n.fillStyle = i
            }(a, r, t, n)
        }
    };

    function h(t) {
        var a = t.substring(0, t.length - 1).split("%,"),
            r = [],
            n = [],
            e = !0,
            i = !1,
            s = void 0;
        try {
            for (var l, o = a[Symbol.iterator](); !(e = (l = o.next()).done); e = !0) {
                var h = l.value;
                r.push(h.substring(0, h.lastIndexOf(" ")).trim()), n.push(h.substring(h.lastIndexOf(" "), h.length) / 100)
            }
        } catch (t) {
            i = !0, s = t
        } finally {
            try {
                !e && o.
                return &&o.
                return ()
            } finally {
                if (i) throw s
            }
        }
        return {
            colors: r,
            percents: n
        }
    }
    module.exports = {
        api: t
    }
}();