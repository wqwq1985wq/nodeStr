cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: '游戏1',
        lblVer:cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        // this.label.string = this.text;
        this.lblVer.string ="v " + cc.zy.zyConfig.version
    },

    // called every frame
    update: function (dt) {

    },
    onClickGame2:function()
    {
        cc.zy.zyUtils.enterGame("game3","game2UpdateView")
    },
    onClickBack:function()
    {
    },
    onClickXxl:function()
    {
        cc.zy.zyUtils.enterGame("xxl","game2UpdateView")
    },
});
