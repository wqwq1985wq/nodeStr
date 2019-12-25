var i = require("../Config");
cc.Class({
    extends: cc.Component,
    properties: {
        isFitWidth:{ default:false, tooltip: "是否适配高宽，因为资源不足用放大处理，但是放大对scroll会有问题" },
    },
    ctor() {},
    onLoad() {
        if (1 == this.node.scaleY && i.Config.showHeight > this.node.height) {
            var t = i.Config.showHeight / this.node.height;
            if (this.isFitWidth) {
                this.node.width = this.node.width * t;
                for (var e = this.node.children,
                o = 0; o < e.length; o++) e[o].scaleX = e[o].scaleY = t;
            } else this.node.scaleY = this.node.scaleX = t;
        }
    },
});
