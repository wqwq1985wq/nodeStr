/*************************
//登录相关数据类，数据存储
*************************/
function LoginProxy() {
    //数据定义
    this.deskList = [];
    this.info = null;
    this.deskInfo = null;

    this.ctor = function () {
        //测试协议，和后端连接后写实际数据
        // JsonHttp.subscribe(proto_sc.hanlin.ting, this.onDeskList, this);
        // JsonHttp.subscribe(proto_sc.hanlin.info, this.onInfo, this);
        // JsonHttp.subscribe(proto_sc.hanlin.desk, this.onDesk, this);
        // JsonHttp.subscribe(proto_sc.hanlin.win, this.onWin, this);
        this.listObj = new Map();
        for (let index = 0; index < 10; index++) {
            let item1 = {}
            item1.id = index
            item1.name = `${index}区s${index*10}-s${index*10+5}服`
            item1.state = index %3
            item1.url = `testUrl${index}.php`
            
        }


    };

    this.clearData = function () {
        this.deskList = null;
        this.info = null;
        this.deskInfo = null;
    };
    this.pick = function (pickId) {
        if (this.listObj[pickId] == null) {
            return;
        }
        this._pickId = pickId;
        cc.zy.zyConfig.url = this.pickServer.url;
        cc.zy.zyConfig.servername = this.pickServer.name;
        cc.zy.zyConfig.serId = this.pickServer.id;
        facade.send(this.LOGIN_PICK_SERVER);
    };
////////////////////////测试数据
    this.onDeskList = function (p) {
        if (this.deskList == null) {
            this.deskList = p;
        }
        else {
            cc.zy.zyUtils.copyList(this.deskList, p);
        }
        facade.send("ACADEMY_LIST_UPDATE");
    };

    this.onInfo = function (p) {
        this.info = p;
        facade.send("ACADEMY_PERSON_INFO_UPDATE");
    };

    this.onDesk = function (p) {
        this.deskInfo = p;
        facade.send("ACADEMY_DESK_INFO_UPDATE");
    };

    this.onWin = function (p) {
        if (p.tif) {
            if (p.tif.win == 0) {
                cc.zy.zyUtils.openPrefabView("academy/FailPop");
            }
            else if (p.tif.win == 1) {
                cc.zy.zyUtils.openPrefabView("academy/WinPop");
            }
        }
        if (p.tim) {
            cc.zy.zyUtils.openPrefabView("academy/AcademyPopView");
        }
        if (p.fang) {
            cc.zy.zyUtils.openPrefabView("acdemy/AcdemyEnd", null, p.fang);
        }
        if (p.find) {
            facade.send("ACADEMY_FIND_UNDATE", p.find);
        }
        if (p.upskill) {
            cc.zy.zyUtils.openPrefabView("academy/UpSkillView", null, p.upskill);
            facade.send("ACADEMY_SKILL_UPDATE");
        }
    };
	
	
    /**
     * 刷新大厅
     */
    this.sendRefreshList = function () {
        JsonHttp.send(new proto_cs.hanlin.listinfo(), function () {
            cc.zy.zyUtils.openPrefabView("academy/AcademyView");
        });
    };
    /**
     * 新建房间
     */
    this.sendCreate = function () {
        JsonHttp.send(new proto_cs.hanlin.opendesk(), function () {
            cc.zy.zyUtils.openPrefabView("academy/AcademyInside");
        });
    };
    /**
     * 进入房间
     */
    this.sendInto = function (fuid) {
        var p = new proto_cs.hanlin.comein();
        p.fuid = fuid;
        JsonHttp.send(p, function () {
            cc.zy.zyUtils.openPrefabView("academy/AcademyInside");
        });
    };
    /**
     *
     * @param fuid 加入空位置
     * @param rid
     */
    this.sendJoin = function (fuid, rid) {
        var p = new proto_cs.hanlin.sitdown();
        p.fuid = fuid;
        p.rid = rid;
        JsonHttp.send(p);
    };
    /**
     *
     * @param fuid 踢人
     * @param rid
     * @param uid
     */
    this.sendKick = function (fuid, rid, uid) {
        var p = new proto_cs.hanlin.ti();
        p.fuid = fuid;
        p.rid = rid;
        p.uid = uid;
        JsonHttp.send(p);
    };
    /**
     *
     * @param fuid 查询房间
     */
    this.sendFind = function (fuid) {
        var p = new proto_cs.hanlin.find();
        p.fuid = fuid;
        JsonHttp.send(p);
    };
    /**
     * 升级技能
     */
    this.sendUpSkill = function () {
        JsonHttp.send(new proto_cs.hanlin.upskill());
    };
    /**
     *
     * @param fuid 保护玩家
     * @param rid
     * @param uid
     */
    this.sendProtect = function (fuid, rid, uid) {
        var p = new proto_cs.hanlin.suoding();
        p.fuid = fuid;
        p.rid = rid;
        p.uid = uid;
        JsonHttp.send(p);
    };
}

exports.LoginProxy = new LoginProxy();
