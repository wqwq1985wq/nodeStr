var i = require("../../component/RenderListItem");
var n = require("../../utils/Utils");
var l = require("../../Initializer");
var r = require("../../component/UrlLoad");
var a = require("../../utils/UIUtils");
cc.Class({
    extends: i,
    properties: {
        lblname:cc.Label,
        lblCost:cc.Label,
        icon:r,
        iconArr:[cc.SpriteFrame],
        costIcon:cc.Sprite,
        btnSelect:cc.Button,
        eff:cc.Node,
    },
    showData() {
        var t = this._data;
        if (t) {
            this.lblname.string = t.name;
            this.lblCost.string = "" + t.money;
            this.icon.url = a.uiHelps.getChuXingIcon(t.id);
            this.costIcon.spriteFrame = this.iconArr[1 == t.type ? 0 : 1];
            var e = !1;
            1 == t.type ? (e = l.playerProxy.userData.cash >= t.money) : 2 == t.type && (e = l.playerProxy.userData.food >= t.money);
            this.btnSelect.interactable = e;
            this.eff.active = t.id > 5;
        }
    },
    onClickRender() {
        var t = this._data;
        l.sonProxy.lilianData.travel = t.id;
        n.utils.closeNameView("child/ChildLilianTravelSelect");
        facade.send("CHILD_LI_LIAN_SELECT_UPDATE");
    },
});
