
			    "use strict";

			function t(t) {
			    return (t = t.toString())[1] ? t : "0" + t
			}
			module.exports = {
			    formatTime: function(e, r) {
			        var a = new Date(e),
			            o = new Date(r),
			            n = a.getMonth() + 1,
			            i = a.getDate(),
			            u = a.getHours(),
			            s = a.getMinutes(),
			            f = o.getHours(),
			            l = o.getMinutes();
			        return n + "月" + i + "日  " + [u, s].map(t).join(":") + "-" + [f, l].map(t).join(":")
			    },
			    formatDuration: function(e) {
			        var r = Math.floor(e / 3600);
			        e -= 3600 * r;
			        var a = Math.floor(e / 60);
			        return e -= 60 * a, [r, a, e].map(t).join(":")
			    },
			    formatLiveStat: function(t) {
			        var e = Object.assign({}, t);
			        for (var r in e) {
			            var a = +e[r];
			            a >= 1e4 && a < 99999500 ? a = parseFloat((a / 1e4).toFixed(1)) + "万" : a >= 99999500 && a <= 9999e8 ? a = parseFloat((a / 1e8).toFixed(1)) + "亿" : a > 9999e8 && (a = "9999亿+"), e[r] = a
			        }
			        return e
			    },
			    formatLiveStatSimulateWatch: function(t) {
			        var e = t;
			        return e >= 1e4 && e < 99999500 ? e = parseFloat((e / 1e4).toFixed(1)) + "万" : e >= 99999500 && e <= 9999e8 ? e = parseFloat((e / 1e8).toFixed(1)) + "亿" : e > 9999e8 && (e = "9999亿+"), e
			    },
			    formatLiveStatSimulateLike: function(t) {
			        var e = t;
			        return e >= 1e5 && e < 99999500 ? e = parseFloat((e / 1e4).toFixed(1)) + "万" : e >= 99999500 && e <= 9999e8 ? e = parseFloat((e / 1e8).toFixed(1)) + "亿" : e > 9999e8 && (e = "9999亿+"), e
			    },
			    delUrlParam: function(t, e) {
			        if (t) {
			            var r = t.substr(t.indexOf("?") + 1, t.length),
			                a = t.substr(0, t.indexOf("?")),
			                o = "",
			                n = [];
			            if ("" !== r) for (var i = r.split("&"), u = 0; u < i.length; u++) i[u].split("=")[0] !== e && n.push(i[u]);
			            return n.length > 0 && (o = "?" + n.join("&")), t = "" + a + o
			        }
			    }
			};