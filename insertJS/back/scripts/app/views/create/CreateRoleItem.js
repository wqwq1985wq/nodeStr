var i = require("../../component/RenderListItem");
var n = require("../../component/RoleSpine");
cc.Class({
    extends: i,
    properties: {
        role: n,
        selectNode: cc.Node,
        select:{
            set: function(t) {
                this.selectNode && (this.selectNode.active = t);
            },
            enumerable: !0,
            configurable: !0
        },
    },
    ctor() {},

    showData() {
        var t = this.data;
        t && this.role.setCreateClothes(t.sex, t.job, 0);
    },
});
