
var app = getApp();
Page({
    data: {
        xarray: ["点击选择退款理由", "商品有质量问题", "没有收到货", "商品少发漏发发错", "商品与描述不一致", "收到商品时有划痕或破损", "质疑假货", "其他"],
        index: 0,
        refund_type: 1,
        refund_imgs: [],
        complaint_mobile: "",
        refund_thumb_imgs: [],
        complaint_desc: "",
        order_id: 0,
        order_status_id: -1,
        complaint_name: "",
        ref_id: 0,
        complaint_money: 0,
        refund_money: 0,
        selArr: []
    },
    canRefund: !0,
    onLoad: function(e) {
        var t = e.id,
            a = e.order_goods_id,
            r = e.ref_id,
            n = this;
        this.setData({
            order_id: t || 0,
            order_goods_id: a || 0,
            ref_id: r || 0
        }, function() {
            n.getData()
        })
    },
    bindPickerChange: function(e) {
        this.setData({
            index: e.detail.value
        })
    },
    choseImg: function() {
        var o = this;
        if (3 <= this.data.refund_imgs.length) return wx.showToast({
            title: "最多三张图片",
            icon: "success",
            duration: 1e3
        }), !1;
        wx.chooseImage({
            count: 1,
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"],
            success: function(e) {
                var t = e.tempFilePaths;
                wx.showLoading({
                    title: "上传中"
                }), wx.uploadFile({
                    url: app.util.url("entry/wxapp/index", {
                        m: "lionfish_comshop",
                        controller: "goods.doPageUpload"
                    }),
                    filePath: t[0],
                    name: "upfile",
                    formData: {
                        name: t[0]
                    },
                    header: {
                        "content-type": "multipart/form-data"
                    },
                    success: function(e) {
                        wx.hideLoading();
                        var t = JSON.parse(e.data),
                            a = t.image_thumb,
                            r = t.image_o,
                            n = o.data.refund_imgs,
                            i = o.data.refund_thumb_imgs;
                        n.push(r), i.push(a), o.setData({
                            refund_thumb_imgs: i,
                            refund_imgs: n
                        })
                    }
                })
            }
        })
    },
    chose_type: function(e) {
        var t = e.currentTarget.dataset.rel;
        this.setData({
            refund_type: t
        })
    },
    cancle_img: function(e) {
        var t = e.currentTarget.dataset.sr,
            a = 0,
            r = this.data.refund_imgs,
            n = this.data.refund_thumb_imgs,
            i = [],
            o = [];
        for (var s in n) n[s] == t ? (console.log("find"), a = s) : o.push(n[s]);
        for (var s in r) s != a && i.push(r[s]);
        this.setData({
            refund_thumb_imgs: o,
            refund_imgs: i
        }), console.log(o.length), console.log(i.length)
    },
    wenti_input: function(e) {
        var t = e.detail.value;
        this.setData({
            complaint_desc: t
        })
    },
    mobile_input: function(e) {
        var t = e.detail.value;
        this.setData({
            complaint_mobile: t
        })
    },
    name_input: function(e) {
        var t = e.detail.value;
        this.setData({
            complaint_name: t
        })
    },
    refund_money_input: function(e) {
        var t = parseFloat(e.detail.value),
            a = this.data.refund_money,
            r = {};
        a < t && (wx.showToast({
            title: "最大退款金额为" + a,
            icon: "none",
            duration: 1e3
        }), t = a, r.refund_money = a), r.complaint_money = t || 0, this.setData(r)
    },
    sub_refund: function() {
        var t = this;
        if (t.canRefund) {
            var e = this.data,
                a = e.index,
                r = e.xarray,
                n = e.order_id,
                i = e.order_goods_id,
                o = e.refund_type,
                s = e.refund_imgs,
                d = e.complaint_desc,
                u = e.complaint_mobile,
                _ = e.total,
                c = e.complaint_name,
                l = e.complaint_money,
                f = e.ref_id,
                m = e.real_refund_quantity;
            if (l = parseFloat(l), m <= 0) return this.errorToast("请选择退款商品"), !1;
            if (0 == a) return this.errorToast("请选择问题类型"), !1;
            var p = r[a];
            if (l <= 0) return this.errorToast("请填写正确退款金额"), !1;
            if (_ < l && (l = _), "" == d) return this.errorToast("请填写正确问题描述"), !1;
            if ("" == c) return this.errorToast("请填写正确联系人"), !1;
            if ("" == u) return this.errorToast("请填写正确手机号"), !1;
            if (!/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(u)) return this.errorToast("请填写正确手机号"), !1;
            t.canRefund = !1;
            var h = wx.getStorageSync("token");
            app.util.request({
                url: "entry/wxapp/index",
                data: {
                    controller: "afterorder.refund_sub",
                    token: h,
                    ref_id: f,
                    order_id: n,
                    order_goods_id: i,
                    complaint_type: o,
                    complaint_images: s,
                    complaint_desc: d,
                    complaint_mobile: u,
                    complaint_reason: p,
                    complaint_money: l,
                    complaint_name: c,
                    real_refund_quantity: m
                },
                method: "POST",
                dataType: "json",
                success: function(e) {
                    if (wx.hideLoading(), t.canRefund = !0, 3 == e.data.code) wx.showToast({
                        title: "未登录",
                        icon: "loading",
                        duration: 1e3
                    });
                    else {
                        if (0 == e.data.code) return void wx.showToast({
                            title: e.data.msg,
                            icon: "success",
                            duration: 1e3
                        });
                        wx.showToast({
                            title: "申请成功",
                            icon: "success",
                            duration: 3e3,
                            success: function(e) {
                                wx.redirectTo({
                                    url: "/lionfish_comshop/pages/order/order?id=" + t.data.order_id
                                })
                            }
                        })
                    }
                }
            })
        }
    },
    errorToast: function(e) {
        wx.showToast({
            title: e,
            icon: "none",
            duration: 1e3
        })
    },
    getData: function() {
        var e = wx.getStorageSync("token"),
            b = this,
            t = this.data,
            a = t.order_id,
            r = t.order_goods_id,
            n = t.ref_id;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                controller: "afterorder.get_order_money",
                token: e,
                order_id: a,
                order_goods_id: r,
                ref_id: n
            },
            dataType: "json",
            success: function(e) {
                if (1 == e.data.code) {
                    var t = e.data,
                        a = t.order_goods,
                        r = t.order_status_id,
                        n = t.refund_image,
                        i = t.refund_info,
                        o = t.shipping_name,
                        s = t.shipping_tel,
                        d = t.total,
                        u = b.data.xarray,
                        _ = i.ref_name,
                        c = u.findIndex(function(e) {
                            return e == _
                        });
                    c = c <= 0 ? 0 : c;
                    var l = i.ref_description,
                        f = i.ref_mobile,
                        m = i.complaint_name,
                        p = i.ref_money,
                        h = a.quantity,
                        g = a.has_refund_quantity,
                        y = a.has_refund_money,
                        v = new Array(parseInt(h));
                    g = parseInt(g);
                    for (var x = 0; x < v.length; x++) v[x] = g <= x ? {
                        isselect: !0,
                        isrefund: !1
                    } : {
                        isselect: !0,
                        isrefund: !0
                    };
                    var w = (1 * d - 1 * y).toFixed(2),
                        T = parseInt(h) - g;
                    b.setData({
                        order_goods: a,
                        order_status_id: r,
                        refund_image: n,
                        refund_info: i,
                        shipping_name: o,
                        shipping_tel: s,
                        total: w,
                        index: c || 0,
                        complaint_desc: l || "",
                        complaint_mobile: f || s,
                        complaint_name: m || o,
                        complaint_money: p || w,
                        refund_money: p || w,
                        selArr: v,
                        real_refund_quantity: T
                    })
                } else e.data.code
            }
        })
    },
    goodsselect: function(e) {
        var t = e.target.dataset.idx,
            a = this.data,
            r = a.selArr,
            n = a.order_goods,
            i = a.total,
            o = {
                isselect: !r[t].isselect,
                isrefund: r[t].isrefund
            };
        r[t] = o;
        var s = 0;
        r.forEach(function(e) {
            e.isselect && !e.isrefund && (s += 1)
        });
        var d = n.price * s;
        i < d && (d = i), this.setData({
            selArr: r,
            real_refund_quantity: s,
            complaint_money: d,
            refund_money: d
        })
    }
});