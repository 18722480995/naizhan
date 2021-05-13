var _extends = Object.assign || function(t) {
        for (var e = 1; e < arguments.length; e++) {
            var r = arguments[e];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
        }
        return t
    };

function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var e = 0, r = Array(t.length); e < t.length; e++) r[e] = t[e];
        return r
    }
    return Array.from(t)
}
Component({
    properties: {
        intervalWidth: {
            type: String,
            value: "20rpx"
        }
    },
    data: {
        items: [],
        stopMasonry: !1
    },
    methods: {
        append: function(t) {
            return "[object Array]" !== Object.prototype.toString.call(t) ? (console.error("[masonry]参数类型错误，渲染失败"), !1) : (this.setData({
                stopMasonry: !1
            }), this._refresh(t))
        },
        delete: function(t, e) {
            var r = this.data.items;
            if (t < e && t < r.length - 1) {
                var n = e - t,
                    o = r.splice(t, n);
                this._refresh(o)
            } else console.error("[masonry]初始下标异常，删除失败！")
        },
        updateItem: function(t, e) {
            var r = this.data.items;
            e <= r.length - 1 ? this.setData({
                items: [].concat(_toConsumableArray(r.slice(0, e)), [Object.assign(r[e], t)], _toConsumableArray(r.slice(e + 1)))
            }) : console.error("[masonry]下标越界，修改失败！")
        },
        deleteItem: function(t) {
            var e = this.data.items;
            if (t <= e.length - 1) {
                var r = e.splice(t, 1);
                this._refresh(r)
            } else console.error("[masonry]下标越界，删除失败！")
        },
        start: function(t) {
            return "[object Array]" !== Object.prototype.toString.call(t) ? (console.error("[masonry]参数类型错误，渲染失败"), !1) : (this.setData({
                items: [],
                stopMasonry: !1
            }), this._refresh(t))
        },
        stop: function() {
            this.setData({
                stopMasonry: !0,
                items: []
            })
        },
        _refresh: function(r) {
            var n = this,
                t = wx.createSelectorQuery(). in (this);
            return this.columnNodes = t.selectAll("#left-col-inner, #right-col-inner"), new Promise(function(t, e) {
                n._render(r, 0, function() {
                    t()
                })
            })
        },
        _render: function(s, a, i) {
            var c = this;
            s.length > a && !this.data.stopMasonry ? this.columnNodes.boundingClientRect().exec(function(t) {
                var e = s[a],
                    r = t[0],
                    n = r[0].height,
                    o = r[1].height;
                c.setData({
                    items: [].concat(_toConsumableArray(c.data.items), [_extends({}, e, {
                        columnPosition: n <= o ? "left" : "right"
                    })])
                }, function() {
                    c._render(s, ++a, i)
                })
            }) : i && i()
        },
        needAuth: function() {
            this.triggerEvent("needAuth")
        }
    }
});