var utils = require("../utils/Utils");
cc.Class({
    extends: cc.Component,
    properties: {
        url:{
            get: function() {
                return this._url;
            },
            set: function(t) {
                if (this._url != t) {
                    this._url = t;
                    this.onChangeUrl();
                }
            },
            enumerable: !0,
            configurable: !0
        },
    },

    ctor() {
        this._url = "";
        this._res = null;
        this.content = null;
        this.loadHandle = null;
        this.target = null;
    },

    onDestroy() {
        this.loadHandle = null;
        this.target = null;
        this.reset();
        this.clearRes();
    },

    reset() {
        this._url = null;
        if (null != this.content) {
            this.content.removeFromParent(!0);
            this.content.destroy();
            this.content = null;
        } else {
            if (null == this.node) return;
            var t = this.node.getComponent(cc.Sprite);
            null != t && null != t.spriteFrame && (t.spriteFrame = null);
        }
        this.clearRes();
    },

    clearRes() {
        // if (this._res) {
        //     utils.utils.releaseAsset(this._res);
        //     this._res = null;
        // }
    },

    onChangeUrl() {
        var t = this,
        e = this._url;
        if (null != e && 0 != e.length) {
            this._url = e;
            this.reset(); 
            - 1 != e.indexOf("res/") ? cc.loader.loadRes(e, cc.SpriteFrame,
            function(o, i) {
                if (null == o && null != i) {
                    t._res = t._url = e;
                    // utils.utils.saveAssets(i);

                    t.node && (t.node.getComponent(cc.Sprite).spriteFrame = i);
                    null != t.loadHandle && t.loadHandle.apply(t.target);
                } else cc.warn(JSON.stringify(o));
            }) : -1 != e.indexOf("prefabs/") ? cc.loader.loadRes(e,
            function(o, i) {
                if (null == o && null != i) {
                    t.node && t.node.childrenCount > 0 && t.reset();
                    t._res = t._url = e;
                    // utils.utils.saveAssets(t._res);

                    var n = cc.instantiate(i);
                    t.content = n;
                    t.node && t.node.addChild(n);
                    null != t.loadHandle && t.loadHandle.apply(t.target);
                } else cc.warn(JSON.stringify(o));
            }) : -1 != e.indexOf("http") && cc.loader.load(e,
            function(o, i) {
                if (null != i) {
                    t._res = t._url = e;
                    var n = new cc.SpriteFrame(i);
                    t.node && (t.node.getComponent(cc.Sprite).spriteFrame = n);
                    null != t.loadHandle && t.loadHandle.apply(t.target);
                } else cc.warn(JSON.stringify(o));
            });
        } else this.reset();
    },
});
