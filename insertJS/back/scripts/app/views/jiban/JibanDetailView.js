var i = require("../../component/List");
var n = require("../../component/UrlLoad");
var l = require("../../utils/Utils");
var r = require("../../component/JiBanShow");
var a = require("../../utils/UIUtils");
var s = require("../../Initializer");
cc.Class({
    extends: cc.Component,
    properties: {
        itemList: i,
        spec_1: n,
        spec_2: n,
        roleUrl: n,
        nameUrl: n,
        lblJbValue: cc.Label,
        jibanShow: r,
        tipNode: cc.Node,
    },
    ctor() {
        this._obj = null;
        this._curId = 0;
        this._curData = null;
    },
    onLoad() {
        facade.subscribe("STORY_SELECT", this.storyEnd, this);
        facade.subscribe("STORY_END", this.storyEnd, this);
        facade.subscribe(s.jibanProxy.UPDATE_JIBAN, this.showData, this);
        this._obj = this.node.openParam;
        this.showData();
    },
    showData() {
        if (this._obj.heroid) {
            this._curId = this._obj.heroid;
            var t = s.jibanProxy.getHeroJbLv(this._curId),
            e = localcache.getItem(localdb.table_hero, this._curId);
            this.spec_1.url = a.uiHelps.getLangSp(e.spec[0]);
            e.spec.length > 1 && (this.spec_2.url = a.uiHelps.getLangSp(e.spec[1]));
            this.spec_2.node.active = e.spec.length > 1;
            this.roleUrl.url = a.uiHelps.getServantSpine(this._curId);
            this.nameUrl.url = a.uiHelps.getStoryRoleName(this._curId);
            var o = s.jibanProxy.getHeroJbLv(this._curId).level % 1e3,
            i = s.jibanProxy.getHeroNextJb(this._curId, o),
            n = s.jibanProxy.getHeroJbLv(this._curId),
            l = s.jibanProxy.getHeroJB(this._curId);
            this.lblJbValue.string = i18n.t("COMMON_NUM", {
                f: l,
                s: i ? i.yoke: n.yoke
            });
            this.jibanShow.setValue(5, t.level % 1e3);
            this.itemList.data = s.jibanProxy.getJbItemList(this._curId);
            this.tipNode.active = 0 == s.jibanProxy.getJbItemList(this._curId).length;
        }
    },
    onClick(t, e) {
        var o = e.data,
        i = localcache.getItem(localdb.table_heropve, o.id);
        this._curData = i;
        if (i) if (l.stringUtil.isBlank(i.storyId)) {
            this.storyEnd();
            l.alertUtil.alert18n("SERVANT_JIBAN_STORY_NOT_FIND");
        } else if (!l.stringUtil.isBlank(i.storyId) && s.playerProxy.getStoryData(i.storyId)) {
            s.playerProxy.addStoryId(i.storyId);
            l.utils.openPrefabView("StoryView", !1, {
                type: s.jibanProxy.isOverStory(i.id) ? 3 : 0
            });
        }
    },
    storyEnd() {
        var t = this._curData;
        null != t && (s.jibanProxy.isOverStory(t.id) || s.jibanProxy.saveHeroStory(t.id));
    },
    onClickClose() {
        l.utils.closeView(this, !0);
    },
});
