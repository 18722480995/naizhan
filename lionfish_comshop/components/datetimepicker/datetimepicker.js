function _defineProperty(t, a, s) {
    return a in t ? Object.defineProperty(t, a, {
        value: s,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = s, t
}
Component({
    behaviors: ["wx://form-field"],
    externalClasses: ["i-class"],
    properties: {
        format: {
            type: String
        },
        name: {
            type: String
        },
        placeholder: {
            type: String
        }
    },
    data: {},
    lifetimes: {
        attached: function() {
            var t = new Date,
                a = t.getFullYear(),
                s = t.getMonth() + 1,
                i = t.getDate(),
                e = t.getHours(),
                r = t.getMinutes(),
                h = t.getSeconds();
            this.setData({
                chooseYear: a
            }), this.initColumn(s), 2 == s && this.setData({
                days: this.data.multiArray[2]
            });
            var d = s < 10 ? "0" + s : s,
                o = i < 10 ? "0" + i : i,
                n = e < 10 ? "0" + e : e,
                u = r < 10 ? "0" + r : r,
                m = h < 10 ? "0" + h : h,
                y = this.data.years.indexOf(a + ""),
                l = this.data.months.indexOf(d + ""),
                f = this.data.days.indexOf(o + ""),
                p = this.data.hours.indexOf(n + ""),
                c = this.data.minutes.indexOf(u + ""),
                A = this.data.seconds.indexOf(m + ""),
                v = [],
                M = [],
                D = this.properties.format;
            "yyyy-MM-dd" == D && (v = [y, l, f], a + "-" + d + "-" + o, M = [this.data.years, this.data.months, this.data.days]), "HH:mm:ss" == D && (v = [p, c, A], n + ":" + u + ":" + m, M = [this.data.hours, this.data.minutes, this.data.seconds]), "yyyy-MM-dd HH:mm" == D && (v = [y, l, f, p, c], a + "-" + d + "-" + o + " " + n + ":" + u, M = [this.data.years, this.data.months, this.data.days, this.data.hours, this.data.minutes]), "yyyy-MM-dd HH:mm:ss" == D && (v = [y, l, f, p, c, A], a + "-" + d + "-" + o + " " + n + ":" + u + ":" + m, M = [this.data.years, this.data.months, this.data.days, this.data.hours, this.data.minutes, this.data.seconds]), this.setData({
                multiIndex: v,
                multiArray: M,
                curMonth: s,
                chooseYear: a
            })
        }
    },
    methods: {
        bindPickerChange: function(t) {
            this.setData({
                multiIndex: t.detail.value
            });
            var a = this.data.multiIndex,
                s = this.properties.format,
                i = "";
            "yyyy-MM-dd" == s && (i = this.data.multiArray[0][a[0]] + "-" + this.data.multiArray[1][a[1]] + "-" + this.data.multiArray[2][a[2]]);
            "HH:mm:ss" == s && (i = this.data.multiArray[0][a[0]] + ":" + this.data.multiArray[1][a[1]] + ":" + this.data.multiArray[2][a[2]]);
            "yyyy-MM-dd HH:mm" == s && (i = this.data.multiArray[0][a[0]] + "-" + this.data.multiArray[1][a[1]] + "-" + this.data.multiArray[2][a[2]] + " " + this.data.multiArray[3][a[3]] + ":" + this.data.multiArray[4][a[4]]);
            "yyyy-MM-dd HH:mm:ss" == s && (i = this.data.multiArray[0][a[0]] + "-" + this.data.multiArray[1][a[1]] + "-" + this.data.multiArray[2][a[2]] + " " + this.data.multiArray[3][a[3]] + ":" + this.data.multiArray[4][a[4]] + ":" + this.data.multiArray[5][a[5]]);
            this.setData({
                value: i
            }), this.triggerEvent("dateTimePicker", i)
        },
        initColumn: function(t) {
            for (var a = [], s = [], i = [], e = [], r = [], h = [], d = 2019; d <= 2099; d++) a.push(d + "");
            for (var o = 1; o <= 12; o++) o < 10 && (o = "0" + o), s.push(o + "");
            if (1 == t || 3 == t || 5 == t || 7 == t || 8 == t || 10 == t || 12 == t) for (var n = 1; n <= 31; n++) n < 10 && (n = "0" + n), i.push(n + "");
            if (4 == t || 6 == t || 9 == t || 11 == t) for (var u = 1; u <= 30; u++) u < 10 && (u = "0" + u), i.push(u + "");
            2 == t && this.setFebDays();
            for (var m = 0; m <= 23; m++) m < 10 && (m = "0" + m), e.push(m + "");
            for (var y = 0; y <= 59; y++) y < 10 && (y = "0" + y), r.push(y + "");
            for (var l = 0; l <= 59; l++) l < 10 && (l = "0" + l), h.push(l + "");
            this.setData({
                years: a,
                months: s,
                days: i,
                hours: e,
                minutes: r,
                seconds: h
            })
        },
        bindPickerColumnChange: function(t) {
            if (0 == t.detail.column && "HH:mm:ss" != this.properties.format) {
                var a = this.data.multiArray[t.detail.column][t.detail.value];
                this.setData({
                    chooseYear: a
                }), "02" != this.data.curMonth && "02" != this.data.chooseMonth || this.setFebDays()
            }
            if (1 == t.detail.column && "HH:mm:ss" != this.properties.format) {
                var s = parseInt(this.data.multiArray[t.detail.column][t.detail.value]),
                    i = [];
                if (1 == s || 3 == s || 5 == s || 7 == s || 8 == s || 10 == s || 12 == s) {
                    for (var e = 1; e <= 31; e++) e < 10 && (e = "0" + e), i.push("" + e);
                    this.setData(_defineProperty({}, "multiArray[2]", i))
                } else if (4 == s || 6 == s || 9 == s || 11 == s) {
                    for (var r = 1; r <= 30; r++) r < 10 && (r = "0" + r), i.push("" + r);
                    this.setData(_defineProperty({}, "multiArray[2]", i))
                } else 2 == s && this.setFebDays()
            }
            var h = {
                multiArray: this.data.multiArray,
                multiIndex: this.data.multiIndex
            };
            h.multiIndex[t.detail.column] = t.detail.value, this.setData(h)
        },
        setFebDays: function() {
            var t = parseInt(this.data.chooseYear),
                a = [];
            if (t % (t % 100 ? 4 : 400)) {
                for (var s, i = 1; i <= 28; i++) i < 10 && (i = "0" + i), a.push("" + i);
                this.setData((_defineProperty(s = {}, "multiArray[2]", a), _defineProperty(s, "chooseMonth", "02"), s))
            } else {
                for (var e, r = 1; r <= 29; r++) r < 10 && (r = "0" + r), a.push("" + r);
                this.setData((_defineProperty(e = {}, "multiArray[2]", a), _defineProperty(e, "chooseMonth", "02"), e))
            }
        }
    }
});