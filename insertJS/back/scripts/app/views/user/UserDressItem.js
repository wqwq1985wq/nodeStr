var i = require("../../component/RenderListItem");
var n = require("../../component/UrlLoad");
var l = require("../../utils/ShaderUtils");
var r = require("../../Initializer");
var a = require("../../utils/UIUtils");
cc.Class({
    extends: i,
    properties: {
        select:{
            set: function(t) {
                var e = this._data;
                this.nodeSelect.active = t && (null == e || 0 != e.id);
            },
            enumerable: !0,
            configurable: !0
        },
        nodeLock:cc.Node,
        nodeGold:cc.Node,
        lblGold:cc.Label,
        url:n,
        lblName:cc.Label,
        img:cc.Sprite,
        img2:cc.Sprite,
        btn:cc.Button,
        itemUrl:n,
        nodeGoldImg:cc.Node,
        nodeSelect:cc.Node,
        propimg:n,
        lblProp:cc.Label,
        lblOut:cc.Label,
        nodeProp:cc.Node,
        nodeRemove:cc.Node,
    },

    onLoad() {
        this.addBtnEvent(this.btn);
    },
    showData() {
        var t = this._data;
        if (t) {
            var e = r.playerProxy.isUnlockCloth(t.id);
            l.shaderUtils.setImageGray(this.img, !e);
            l.shaderUtils.setImageGray(this.img2, !e);
            this.lblName.string = t.name;
            this.nodeRemove && (this.nodeRemove.active = !1);
            this.lblOut && (this.lblOut.string = t.text);
            if (0 == t.id) {
                this.url.url = "";
                this.nodeRemove.active = !0;
                this.nodeProp.active = this.nodeLock.active = this.nodeGoldImg.active = this.nodeGold.active = this.itemUrl.node.active = !1;
                return;
            }
            this.nodeProp.active = t.prop && t.prop.length > 0;
            if (t.prop && t.prop.length > 0) if (1 == t.prop_type) {
                this.lblProp.string = "+" + t.prop[0].value;
                this.propimg.url = a.uiHelps.getLangSp(t.prop[0].prop);
            } else {
                this.lblProp.string = "+" + t.prop[0].value / 100 + "%";
                this.propimg.url = a.uiHelps.getClotheProImg(t.prop_type, t.prop[0].prop);
            }
            var o = t.money.itemid;
            this.lblOut && (this.lblOut.node.active = null == o);
            this.nodeGold.active = !e && 2 == t.unlock;
            this.nodeLock.active = !e && 1 == t.unlock;
            this.nodeGold.active = null != this.lblOut || this.nodeGold.active;
            this.lblGold.string = t.money.count ? t.money.count + "": "";
            this.itemUrl.node.active = o && 1 != o;
            this.nodeGoldImg.active = 1 == o;
            this.itemUrl.node.active && (this.itemUrl.url = a.uiHelps.getItemSlot(o));
            var i = t.model.split("|");
            this.url.url = a.uiHelps.getRolePart(i[0]);
        }
    },
});
