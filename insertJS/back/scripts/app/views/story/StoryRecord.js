var i = require("./StoryBigItem");
var n = require("./StoryGroupItem");
var l = require("../../utils/Utils");
var r = require("../../Initializer");
var a = require("../../utils/UIUtils");
cc.Class({
    extends: cc.Component,
    properties: {
        leftBtn:cc.Button,
        rightBtn:cc.Button,
        lblName:cc.Label,
        bigItem:i,
        context:cc.Node,
        groupItem:n,
        scorll:cc.ScrollView,
    },

    ctor(){
        this.curIndex = 0;
        this.bmaps = [];
        this.bigItems = [];
        this._isShowStory = false;
    },
    onLoad() {
        this.curIndex = 0;
        this.bigItems.push(this.bigItem);
        this.bigItem.node.active = !1;
        this.groupItem.node.active = !1;
        var t = r.playerProxy.userData.bmap;
        a.uiUtils.scaleRepeat(this.leftBtn.node, 0.95, 1.05);
        a.uiUtils.scaleRepeat(this.rightBtn.node, 0.95, 1.05);
        this.rightBtn.node.active = this.leftBtn.node.active = t > 10;
        facade.subscribe("STORY_END_RECORD", this.onStoryEnd, this);
        this.showIndex();
    },
    onStoryEnd() {
        this._isShowStory = !1;
    },
    showIndex() {
        this.bmaps = [];
        this.groupItem.node.active = !1;
        var t = 10 * this.curIndex + 1,
        e = r.playerProxy.userData.bmap,
        o = e > 10 * (this.curIndex + 1) ? 10 * (this.curIndex + 1) : e,
        n = i18n.t("STORY_DATA_ZHANG", {
            f: 10 * this.curIndex + 1,
            s: e > 10 * (this.curIndex + 1) ? 10 * (this.curIndex + 1) : e
        });
        this.lblName.string = e > 10 ? n: i18n.t("STORY_DATA_RECORD");
        for (var l = t; l <= o; l++) {
            var a = localcache.getItem(localdb.table_bigPve, l);
            this.bmaps.push(a);
        }
        for (l = 0; l < this.bigItems.length; l++) this.bigItems[l].node.active = !1;
        for (l = 0; l < this.bmaps.length; l++) if (this.bigItems.length > l) {
            this.bigItems[l].data = this.bmaps[l];
            this.bigItems[l].node.active = !0;
        } else {
            var s = cc.instantiate(this.bigItem.node),
            c = s.getComponent(i);
            this.bigItems.push(c);
            this.context.addChild(s);
            c.data = this.bmaps[l];
        }
        this.scheduleOnce(this.onDelayScroll, 0.3);
    },
    onDelayScroll() {
        this.scorll.scrollToTop();
    },
    onClickBig(t, e) {
        var o = e.data;
        this.groupItem.node.active = this.groupItem.data != o;
        var i = this.bmaps.indexOf(o);
        this.groupItem.node.removeFromParent(!1);
        this.context.addChild(this.groupItem.node);
        this.groupItem.node.setSiblingIndex(i + 1);
        this.groupItem.data = o;
    },
    onClickCurIndex(t, e) {
        var o = parseInt(e),
        i = r.playerProxy.userData.bmap;
        i = Math.floor((i - 1) / 10);
        this.curIndex += o;
        this.curIndex = this.curIndex < 0 ? 0 : this.curIndex;
        this.curIndex = this.curIndex > i ? i: this.curIndex;
        this.leftBtn.interactable = this.curIndex > 0;
        this.rightBtn.interactable = this.curIndex < i;
        this.showIndex();
    },
    onClickMid(t, e) {
        if (!this._isShowStory) {
            r.playerProxy.storyIds = [];
            this._isShowStory = !0;
            var o = e.data;
            if (null == o.mname) {
                var i = e.data;
                0 != (n = i.bossStoryId) && r.playerProxy.getStoryData(n) && r.playerProxy.addStoryId(n);
                0 != (n = i.endStoryId) && r.playerProxy.getStoryData(n) && r.playerProxy.addStoryId(n);
            } else {
                var n;
                0 != (n = o.storyId) && r.playerProxy.getStoryData(n) && r.playerProxy.addStoryId(n);
                0 != (n = localcache.getItem(localdb.table_smallPve, o.id).endStoryId) && r.playerProxy.getStoryData(n) && r.playerProxy.addStoryId(n);
            }
            r.playerProxy.storyIds.length > 0 && l.utils.openPrefabView("StoryView", !1, {
                type: 99
            });
        }
    },
    onClickClost() {
        r.playerProxy.storyIds = [];
        l.utils.closeView(this);
    },
});
