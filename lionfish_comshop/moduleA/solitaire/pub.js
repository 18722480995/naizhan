var _extends = Object.assign || function(t) {
        for (var e = 1; e < arguments.length; e++) {
            var i = arguments[e];
            for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (t[a] = i[a])
        }
        return t
    }, app = getApp(),
    util = require("../../utils/util.js"),
    chooseFlag = !0,
    myDate = new Date;
Page({
    data: {
        begin_time: "",
        end_time: "",
        noteMaxLen: 500,
        imgGroup: [],
        goods: [],
        type: 0,
        title: "",
        content: ""
    },
    onLoad: function(t) {
        this.getData()
    },
    onShow: function() {},
    titleInput: function(t) {
        var e = t.detail.value;
        this.setData({
            title: e
        })
    },
    beginTimePicker: function(t) {
        this.setData({
            begin_time: t.detail
        })
    },
    endTimePicker: function(t) {
        this.setData({
            end_time: t.detail
        })
    },
    contentInput: function(t) {
        var e = t.detail.value,
            i = parseInt(e.length);
        i > this.data.noteMaxLen || this.setData({
            currentNoteLen: i,
            limitNoteLen: this.data.noteMaxLen - i,
            content: e
        })
    },
    chooseImage: function() {
        chooseFlag = !1
    },
    changeImg: function(t) {
        chooseFlag = t.detail.len === t.detail.value.length, this.setData({
            imgGroup: t.detail.value
        })
    },
    deleteGoods: function(t) {
        var e = t.detail;
        console.log(e);
        var i = this.data.goods; - 1 != e && (i.splice(e, 1), this.setData({
            goods: i
        }))
    },
    getData: function() {
        var t = wx.getStorageSync("token"),
            e = this;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "solitaire.get_solitaire_headinfo",
                token: t
            },
            dataType: "json",
            success: function(t) {
                if (0 != t.data.code) return 1 == t.data.code ? void app.util.message("您还未登录", "switchTo:/lionfish_comshop/pages/index/index", "error") : void app.util.message(t.data.msg, "switchTo:/lionfish_comshop/pages/index/index", "error");
                e.setData({
                    community: t.data.data || ""
                })
            }
        })
    },
    subForm: function() {
        var t = this.data,
            e = t.title,
            i = t.content,
            a = t.begin_time,
            o = t.end_time,
            n = t.imgGroup,
            s = t.goods;
        if ("" != e) if ("" != i) if (n.length <= 0) wx.showToast({
            title: "请上传接龙图片",
            icon: "none"
        });
        else if (s.length <= 0) wx.showToast({
            title: "请选择商品",
            icon: "none"
        });
        else {
            var l = [];
            s.forEach(function(t) {
                l.push(t.gid)
            });
            var r = l.join(","),
                c = wx.getStorageSync("token"),
                d = {
                    title: e,
                    content: i,
                    begin_time: a,
                    end_time: o,
                    images_list: n.join(","),
                    goods_list: r,
                    token: c
                };
            app.util.request({
                url: "entry/wxapp/index",
                data: _extends({
                    controller: "solitaire.sub_head_solitaire"
                }, d),
                dataType: "json",
                success: function(t) {
                    0 == t.data.code ? app.util.message("提交成功", "redirect:/lionfish_comshop/moduleA/solitaire/groupIndex", "success") : app.util.message(t.data.msg || "提交失败", "", "error")
                }
            })
        } else wx.showToast({
            title: "请输入内容",
            icon: "none"
        });
        else wx.showToast({
            title: "请输入标题",
            icon: "none"
        })
    }
});