var status = require("../../utils/index.js");
Component({
    properties: {
        community: {
            type: Object,
            value: {
                head_id: 0,
                community_name: "团长",
                head_name: "社区",
                avatar: ""
            }
        },
        showShare: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        groupInfo: {
            group_name: "社区",
            owner_name: "团长"
        }
    },
    attached: function() {
        var t = this;
        status.setGroupInfo().then(function(e) {
            t.setData({
                groupInfo: e
            })
        })
    },
    methods: {
        shareQuan: function() {
            this.triggerEvent("share")
        }
    }
});