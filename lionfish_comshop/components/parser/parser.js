var document, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, cache = getApp().parserCache = {}, config = require("./libs/config.js"),
    CssHandler = require("./libs/CssHandler.js");
try {
    document = require("./libs/document.js")
} catch (t) {}
var fs = wx.getFileSystemManager ? wx.getFileSystemManager() : null,
    parseHtml = require("./libs/MpHtmlParser.js"),
    showAnimation = wx.createAnimation({
        timingFunction: "ease"
    }).opacity(1).step().export();

function hash(t) {
    for (var e = t.length, i = 5381; e--;) i += (i << 5) + t.charCodeAt(e);
    return i
}
Component({
    properties: {
        html: {
            type: null,
            observer: function(t) {
                if (this._refresh) return this._refresh = !1;
                this.setContent(t, !0)
            }
        },
        autosetTitle: {
            type: Boolean,
            value: !0
        },
        autopause: {
            type: Boolean,
            value: !0
        },
        domain: String,
        gestureZoom: Boolean,
        lazyLoad: Boolean,
        selectable: Boolean,
        tagStyle: Object,
        showWithAnimation: Boolean,
        useAnchor: Boolean,
        useCache: Boolean
    },
    relations: {
        "../parser-group/parser-group": {
            type: "ancestor"
        }
    },
    created: function() {
        this.imgList = [], this.imgList.setItem = function(t, e) {
            var i = this;
            if (e.includes("base64")) {
                var s = (this[t] = e).match(/data:image\/(\S+?);base64,(\S+)/);
                if (!s) return;
                var a = wx.env.USER_DATA_PATH + "/" + Date.now() + "." + s[1];
                fs && fs.writeFile({
                    filePath: a,
                    data: s[2],
                    encoding: "base64",
                    success: function() {
                        return i[t] = a
                    }
                })
            } else if (this.includes(e)) {
                if ("http" != e.substring(0, 4)) return this[t] = e;
                for (var n = "", o = 0; o < e.length && (n += .5 < Math.random() ? e[o].toUpperCase() : e[o], "/" != e[o] || "/" == e[o - 1] || "/" == e[o + 1]); o++);
                n += e.substring(o + 1), this[t] = n
            } else this[t] = e
        }, this.imgList.each = function(t) {
            for (var e = 0; e < this.length; e++) {
                var i = t(this[e], e, this);
                i && this.setItem(e, i)
            }
        }, this._refresh = !1
    },
    detached: function() {
        this.imgList.each(function(t) {
            t && t.includes(wx.env.USER_DATA_PATH) && fs && fs.unlink({
                filePath: t
            })
        })
    },
    methods: {
        navigateTo: function(e) {
            var i = this;
            if (e.fail = e.fail || function() {}, !this.data.useAnchor) return e.fail({
                errMsg: "Use-anchor attribute is disabled"
            });
            this.createSelectorQuery().select("#root" + (e.id ? ">>>#" + e.id : "")).boundingClientRect().selectViewport().scrollOffset().exec(function(t) {
                if (!t[0]) return i.group ? i.group.navigateTo(i.i, e) : e.fail({
                    errMsg: "Label not found"
                });
                wx.pageScrollTo({
                    scrollTop: t[1].scrollTop + t[0].top,
                    success: e.success,
                    fail: e.fail
                })
            })
        },
        getText: function() {
            var n = "";
            return function t(e) {
                if (e) for (var i, s = 0; i = e[s++];) if ("text" == i.type) n += i.text;
                else if ("br" == i.type) n += "\n";
                else {
                    var a = "p" == i.name || "div" == i.name || "tr" == i.name || "li" == i.name || "h" == i.name[0] && "0" < i.name[1] && i.name[1] < "7";
                    a && n && "\n" != n[n.length - 1] && (n += "\n"), t(i.children), a && "\n" != n[n.length - 1] ? n += "\n" : "td" != i.name && "th" != i.name || (n += "\t")
                }
            }(this.data.html), n.replace(/&nbsp;/g, " ")
        },
        getVideoContext: function(t) {
            if (!t) return this.videoContexts;
            for (var e = this.videoContexts.length; e--;) if (this.videoContexts[e].id == t) return this.videoContexts[e];
            return null
        },
        setContent: function(t, e) {
            var i = this,
                s = {
                    controls: {}
                };
            if (this.data.showWithAnimation && (s.showAnimation = showAnimation), t) if ("string" == typeof t) {
                if (this.data.useCache) {
                    var a = hash(t);
                    cache[a] ? s.html = cache[a] : (s.html = parseHtml(t, this.data), cache[a] = s.html)
                } else s.html = parseHtml(t, this.data);
                this.triggerEvent("parse", s.html)
            } else if (t.constructor == Array) {
                if (t.length && "Parser" != t[0].PoweredBy) {
                    var n = {
                        _imgNum: 0,
                        _videoNum: 0,
                        _audioNum: 0,
                        _domain: this.data.domain,
                        _protocol: this.data.domain && this.data.domain.includes("://") ? this.data.domain.split("://")[0] : "http",
                        _STACK: [],
                        CssHandler: new CssHandler(this.data.tagStyle)
                    };
                    ! function t(e) {
                        for (var i, s = 0; i = e[s++];) if ("text" != i.type) {
                            for (var a in i.attrs = i.attrs || {}, i.attrs) config.trustAttrs[a] ? "string" != typeof i.attrs[a] && (i.attrs[a] = i.attrs[a].toString()) : i.attrs[a] = void 0;
                            config.LabelHandler(i, n), config.blockTags[i.name] ? i.name = "div" : config.trustTags[i.name] || (i.name = "span"), i.children && i.children.length ? (n._STACK.push(i), t(i.children), n._STACK.pop()) : i.children = void 0
                        }
                    }(t), s.html = t
                }
                e || (s.html = t)
            } else {
                if ("object" != (void 0 === t ? "undefined" : _typeof(t)) || !t.nodes) return console.warn("错误的 html 类型：" + (void 0 === t ? "undefined" : _typeof(t)));
                s.html = t.nodes, console.warn("错误的 html 类型：object 类型已废弃，请直接将 html 设置为 object.nodes")
            } else {
                if (e) return;
                s.html = ""
            }
            this._refresh = !! s.html, this.setData(s), this.imgList.length = 0, this.videoContexts = [], document && (this.document = new document("html", s.html || t, this));
            for (var o = this.selectAllComponents("#root,#root>>>._node"), r = function() {
                var t = o[h];
                for (t._top = i, l = !! t._observer, c = t.data.nodes.length; u = t.data.nodes[--c];) u.c || ("img" == u.name ? (u.attrs.src && u.attrs.i && i.imgList.setItem(u.attrs.i, u.attrs.src), l || (l = !0, i.data.lazyLoad && t.createIntersectionObserver ? (wx.nextTick || setTimeout)(function() {
                    t._observer = t.createIntersectionObserver(), t._observer.relativeToViewport({
                        top: 1e3,
                        bottom: 1e3
                    }).observe("._img", function() {
                        t.setData({
                            imgLoad: !0
                        }), t._observer.disconnect(), t._observer = void 0
                    })
                }, 50) : t.setData({
                    imgLoad: !0
                }))) : "video" == u.name ? ((m = wx.createVideoContext(u.attrs.id, t)).id = u.attrs.id, i.videoContexts.push(m)) : "audio" == u.name && u.attrs.autoplay ? wx.createAudioContext(u.attrs.id, t).play() : "title" == u.name && i.data.autosetTitle && "text" == u.children[0].type && u.children[0].text && wx.setNavigationBarTitle({
                    title: u.children[0].text
                }))
            }, h = o.length; h--;) {
                var l, c, u, m;
                r()
            }(wx.nextTick || setTimeout)(function() {
                i.createSelectorQuery().select("#root").boundingClientRect(function(t) {
                    i.width = t.width, i.triggerEvent("ready", t)
                }).exec()
            }, 50)
        },
        _tap: function(t) {
            if (this.data.gestureZoom && t.timeStamp - this.lastTime < 300) {
                if (this.zoomIn) this.animation.translateX(0).scale(1).step(), wx.pageScrollTo({
                    scrollTop: (t.detail.y - t.currentTarget.offsetTop + this.initY) / 2 - t.touches[0].clientY,
                    duration: 400
                });
                else {
                    var e = t.detail.x - t.currentTarget.offsetLeft;
                    this.initY = t.detail.y - t.currentTarget.offsetTop, this.animation = wx.createAnimation({
                        transformOrigin: e + "px " + this.initY + "px 0",
                        timingFunction: "ease-in-out"
                    }), this.animation.scale(2).step(), this.translateMax = e / 2, this.translateMin = (e - this.width) / 2, this.translateX = 0
                }
                this.zoomIn = !this.zoomIn, this.setData({
                    showAnimation: this.animation.export()
                })
            }
            this.lastTime = t.timeStamp
        },
        _touchstart: function(t) {
            1 == t.touches.length && (this.initX = this.lastX = t.touches[0].pageX)
        },
        _touchmove: function(t) {
            var e = t.touches[0].pageX - this.lastX;
            if (this.zoomIn && 1 == t.touches.length && 20 < Math.abs(e)) {
                if (this.lastX = t.touches[0].pageX, this.translateX <= this.translateMin && e < 0 || this.translateX >= this.translateMax && 0 < e) return;
                this.translateX += e * Math.abs(this.lastX - this.initX) * .05, this.translateX < this.translateMin && (this.translateX = this.translateMin), this.translateX > this.translateMax && (this.translateX = this.translateMax), this.animation.translateX(this.translateX).step(), this.setData({
                    showAnimation: this.animation.export()
                })
            }
        }
    }
});