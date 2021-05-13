Component({
    externalClasses: ["i-class", "i-btn"],
    properties: {
        visible: {
            type: Boolean,
            value: !1
        },
        text: String,
        confirmText: {
            type: String,
            value: "确定"
        },
        showCancel: {
            type: Boolean,
            value: !0
        }
    },
    methods: {
        confirm: function() {
            this.triggerEvent("confirm")
        },
        cancel: function() {
            this.triggerEvent("cancel")
        },
        close: function() {
            this.triggerEvent("cancel")
        }
    }
});