function makeMap(e) {
    for (var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, a = e.split(","), s = a.length; s--;) t[a[s]] = !0;
    return t
}
var trustAttrs = makeMap("align,alt,app-id,appId,author,autoplay,border,cellpadding,cellspacing,class,color,colspan,controls,data-src,dir,face,height,href,id,ignore,loop,muted,name,path,poster,rowspan,size,span,src,start,style,type,unit-id,unitId,width,xmlns"),
    trustTags = makeMap("a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video"),
    blockTags = makeMap("address,article,aside,body,center,cite,footer,header,html,nav,pre,section"),
    ignoreTags = makeMap("area,base,basefont,canvas,circle,command,ellipse,embed,frame,head,iframe,input,isindex,keygen,line,link,map,meta,param,path,polygon,rect,script,source,svg,textarea,track,use,wbr"),
    richOnlyTags = makeMap("a,colgroup,fieldset,legend,sub,sup,table,tbody,td,tfoot,th,thead,tr"),
    selfClosingTags = makeMap("area,base,basefont,br,col,circle,ellipse,embed,frame,hr,img,input,isindex,keygen,line,link,meta,param,path,polygon,rect,source,track,use,wbr"),
    blankChar = makeMap(" , ,\t,\r,\n,\f"),
    userAgentStyles = {
        a: "color:#366092;word-break:break-all;padding:1.5px 0 1.5px 0",
        address: "font-style:italic",
        blockquote: "background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px",
        center: "text-align:center",
        cite: "font-style:italic",
        dd: "margin-left:40px",
        img: "max-width:100%",
        mark: "background-color:yellow",
        pre: "font-family:monospace;white-space:pre;overflow:scroll",
        s: "text-decoration:line-through",
        u: "text-decoration:underline"
    }, screenWidth = wx.getSystemInfoSync().screenWidth;

function bubbling(e) {
    for (var t = e._STACK.length; t--;) {
        if (richOnlyTags[e._STACK[t].name]) return !1;
        e._STACK[t].c = 1
    }
    return !0
}
wx.canIUse("editor") ? (makeMap("bdi,bdo,caption,rt,ruby,big,small,pre", trustTags), makeMap("bdi,bdo,caption,rt,ruby,pre", richOnlyTags), ignoreTags.rp = !0, blockTags.pre = void 0) : (blockTags.caption = !0, userAgentStyles.big = "display:inline;font-size:1.2em", userAgentStyles.small = "display:inline;font-size:0.8em"), module.exports = {
    highlight: null,
    LabelHandler: function(e, t) {
        var a = e.attrs;
        switch (a.style = t.CssHandler.match(e.name, a, e) + (a.style || ""), e.name) {
            case "div":
            case "p":
                a.align && (a.style = "text-align:" + a.align + ";" + a.style, a.align = void 0);
                break;
            case "img":
                a["data-src"] && (a.src = a.src || a["data-src"], a["data-src"] = void 0), a.width && parseInt(a.width) > screenWidth && (a.style += ";height:auto !important"), a.src && !a.ignore && (bubbling(t) ? a.i = (t._imgNum++).toString() : a.ignore = "T");
                break;
            case "a":
            case "ad":
                bubbling(t);
                break;
            case "font":
                if (a.color && (a.style = "color:" + a.color + ";" + a.style, a.color = void 0), a.face && (a.style = "font-family:" + a.face + ";" + a.style, a.face = void 0), a.size) {
                    var s = parseInt(a.size);
                    s < 1 ? s = 1 : 7 < s && (s = 7);
                    a.style = "font-size:" + ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"][s - 1] + ";" + a.style, a.size = void 0
                }
                break;
            case "video":
            case "audio":
                a.id ? t["_" + e.name + "Num"]++ : a.id = e.name + ++t["_" + e.name + "Num"], "video" == e.name && (a.width && (a.style = "width:" + parseFloat(a.width) + (a.width.includes("%") ? "%" : "px") + ";" + a.style, a.width = void 0), a.height && (a.style = "height:" + parseFloat(a.height) + (a.height.includes("%") ? "%" : "px") + ";" + a.style, a.height = void 0), 3 < t._videoNum && (e.lazyLoad = !0)), a.source = [], a.src && a.source.push(a.src), a.controls || a.autoplay || console.warn("存在没有 controls 属性的 " + e.name + " 标签，可能导致无法播放", e), bubbling(t);
                break;
            case "source":
                var r = t._STACK[t._STACK.length - 1];
                !r || "video" != r.name && "audio" != r.name || (r.attrs.source.push(a.src), r.attrs.src || (r.attrs.src = a.src))
        }
        var i = a.style.toLowerCase().split(";"),
            l = {};
        a.style = "";
        for (var n = 0, o = i.length; n < o; n++) {
            var c = i[n].split(":");
            if (2 == c.length) {
                var d = c[0].trim(),
                    g = c[1].trim();
                if (g.includes("url")) {
                    var u = g.indexOf("(");
                    if (-1 != u++) {
                        for (;
                        '"' == g[u] || "'" == g[u] || blankChar[g[u]];) u++;
                        "/" == g[u] && ("/" == g[u + 1] ? g = g.substring(0, u) + t._protocol + ":" + g.substring(u) : t._domain && (g = g.substring(0, u) + t._domain + g.substring(u)))
                    }
                } else g.includes("rpx") && (g = g.replace(/[0-9.]*rpx/g, function(e) {
                    return parseFloat(e) * screenWidth / 750 + "px"
                }));
                g.includes("-webkit") || g.includes("-moz") || g.includes("-ms") || g.includes("-o") || g.includes("safe") ? a.style += ";" + d + ":" + g : l[d] && !g.includes("import") && l[d].includes("import") || (l[d] = g)
            }
        }
        for (var d in "img" == e.name && l.width && l.width.includes("%") && parseInt(l.width) > screenWidth && (l.height = "auto !important"), l) a.style += ";" + d + ":" + l[d];
        a.style = a.style.substr(1), a.style || (a.style = void 0), t._useAnchor && a.id && bubbling(t)
    },
    trustAttrs: trustAttrs,
    trustTags: trustTags,
    blockTags: blockTags,
    ignoreTags: ignoreTags,
    selfClosingTags: selfClosingTags,
    blankChar: blankChar,
    userAgentStyles: userAgentStyles,
    screenWidth: screenWidth
};