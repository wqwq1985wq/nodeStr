var renderListItem = require("../../component/RenderListItem");

var ServerItem = cc.Class({
    extends:renderListItem,

    properties: {
        lblName:cc.Label,
        stateImg:cc.Sprite,
        sImgs:[cc.SpriteFrame],
        nodeNew:cc.Node,
    },

    showData : function () {
        var d = this.data;
        if (d) {
            this.lblName.string = d.name;
            if (this.nodeNew)
                this.nodeNew.active = d.state == 5;
            this.stateImg.spriteFrame = this.sImgs[d.state - 1];
        }
    },
        
});

ServerItem.colors = [cc.color(255, 255, 255), cc.color(255, 255, 255), cc.color(255, 0, 0),cc.color(255, 255, 255), cc.color(71, 214, 60), cc.color(255, 255, 0)];
