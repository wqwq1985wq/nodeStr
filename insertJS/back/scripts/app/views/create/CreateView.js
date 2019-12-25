var i = require("../../component/List");
var n = require("../../Initializer");
var l = require("../../utils/Utils");
var r = require("../../utils/UIUtils");
var a = require("../../models/CreateProxy");
var s = require("../../component/RoleSpine");
var c = require("../../utils/ApiUtils");
var _ = require("../../Config");

cc.Class({
    extends: cc.Component,
    properties: {
        editName: cc.EditBox,
        list: i,
        animation: cc.Animation,
        btnFemale: cc.Button,
        btnMale: cc.Button,
        spine: s,
        face: cc.Sprite,
        faces: [cc.SpriteFrame],
        lblName: cc.Label,
        nodeFace: cc.Node,
    },

    ctor() {
        this.femaleData = new Array();
        this.maleData = new Array();
        this.count = 3;
        this.faceStr = ["zhengchang", "beishang", "jianyi", "kaixin"];
        this.soundStr = ["", "001", "002", "003"];
    },

    onLoad() {
        var t = this;
        // this.editName.placeholder = i18n.t("COMMON_INPUT_TXT");
        l.utils.setCanvas();
        l.utils.setWaitUI();
        for (var e = this,
        o = localcache.getItem(localdb.table_officer, 0), i = this.count; i > 0; i--) {
            this.femaleData.push(new a.CreateData(2, i, o.shizhuang));
            this.maleData.push(new a.CreateData(1, i, o.shizhuang));
        }
        for (i = 0; _.Config.addShowCreateHeadId && i < _.Config.addShowCreateHeadId.length; i++) this.femaleData.push(new a.CreateData(2, _.Config.addShowCreateHeadId[i], o.shizhuang));
        this.list.selectHandle = function(o) {
            if (null != o) {
                e.spine.setCreateClothes(o.sex, o.job, 0);
                // e.spine.setClothes(o.sex, o.job, 0, clothes);
                e.spine.actionString(t.faceStr[0]);
            } else {
                e.list.selectIndex = 0;
                l.alertUtil.alert18n("CREATE_UNOPEN");
            }
        };
        this.onClickRandom();
        this.onClickSex(null, 2);
        facade.subscribe(n.createProxy.CREATE_RANDOM_NAME, this.update_Name, this);
        facade.subscribe("USER_DATA_OVER", this.onRoleData, this);
        l.utils.showEffect(this, 0);
        this.spine.actionString(this.faceStr[0]);
        cc.sys.isMobile ? this.node.parent.on(cc.Node.EventType.TOUCH_START, this.onClick, this, !0) : this.node.parent.on(cc.Node.EventType.MOUSE_DOWN, this.onClick, this, !0);
    },

    onClickSex(t, e) {
        var o = parseInt(e);
        this.face.node.active = 2 == o;
        this.btnFemale.interactable = 2 != o;
        this.list.data = 2 == o ? this.femaleData: this.maleData;
        var i = this.list.data.length,
        n = this.list.selectIndex;
        n = -1 == n ? Math.floor(Math.random() * i) : n > i ? i - 1 : n;
        this.list.selectIndex = n;
    },

    onClickFace() {
        if (this.face.node.active) {
            for (var t = Math.floor(Math.random() * this.faces.length), e = 0; e < 10 && this.face.spriteFrame == this.faces[t]; e++) t = Math.floor(Math.random() * this.faces.length);
            var o = this.soundStr[t];
            l.stringUtil.isBlank(o) || l.audioManager.playSound((this.btnFemale.interactable ? "m": "w") + o, !0, !0);
            this.face.spriteFrame = this.faces[t];
            this.spine.actionString(this.faceStr[t]);
        } else this.spine.actionString(this.faceStr[0]);
    },

    onClickRandom() {
        n.createProxy.sendRandomName();
    },

    onClickCreate() {
        if (l.stringUtil.isBlank(this.editName.string)) l.alertUtil.alert(i18n.t("CREATE_IS_LIMIT"));
        else {
            var t = this.list.selectData;
            n.createProxy.sendCreate(t.sex, t.job, this.editName.string);
        }
    },

    onRoleData() {
        if (!l.stringUtil.isBlank(n.playerProxy.userData.name)) {
            cc.director.loadScene("PreloadScene");
            c.apiUtils.createSuccess();
            if(_.Config.login_by_sdk)
            {
                c.apiUtils.callSMethod3("finshCreateRole");
            }
            var recordStep = new proto_cs.user.recordSteps();
            recordStep.stepId = 8;
            JsonHttp.send(recordStep, function() {
            });
        }
    },

    onTestChange() {
        this.lblName.string = this.editName.string;
    },

    onClickClost() {},

    update_Name() {
        this.lblName.string = this.editName.string = n.createProxy.randomName;
    },

    onClick(t) {
        r.clickEffectUtils.showEffect(t);
        l.audioManager.playClickSound();
    },

    onDestroy() {
        l.utils.clearLayer();
    },
});
