var BattleNetHelper = require('BattleNetHelper')
var BattleData = require('BattleData');
var SocketID = require('SocketID');
var PlayerData = require('PlayerData');
var EventEmitter = require('EventEmitter');
var ViewCommon = require('ViewCommon');

cc.Class({
    extends: cc.Component,

    properties: {
        txtScore1: cc.Label,
        txtScore2: cc.Label,
        pnl1: cc.Node,
        pnl2: cc.Node,
        imgDi: cc.Node,
        pnlContent: cc.Node,
        pnlScrollView:cc.ScrollView,
        pnlSubContent: cc.Node,

        txtEmpty: cc.Node,

        prefabItem: cc.Prefab,
        prefabSubItem: cc.Prefab,

        prefabShareDlg: cc.Prefab,

        prefabWatchDlg: cc.Prefab,
    },

    onLoad: function(){
        this.spawnCount = 3;
        this.spacing = 10;
        this.bufferZone = 300;
        this.items = [];

        this.updateTimer = 0;
        this.updateInterval = 0.2;
        this.lastContentPosY = 0;

        this.pnlMid = this.node.getChildByName("pnlMid");
        if (this.pnlMid) {
            ViewCommon.playDlgAction(this.pnlMid);
        };
        
     	this.pnl1.active = true;
        this.pnl2.active = false;
        this.txtEmpty.active = false;

        this.imgBg = this.node.getChildByName("imgBg");
        if (this.imgBg) {
            this.imgBg.setContentSize(cc.winSize.width,cc.winSize.height);
        };
        this.node.setContentSize(cc.winSize.width,cc.winSize.height);
		this.node.on("touchend", this.onTouchEnded, this);

        this.registerMsg();
        BattleNetHelper.reqRecord();
    },

    onDestroy: function(){
        this.unRegisterMsg();
    },

    registerMsg: function(){
        EventEmitter.on("Client"+SocketID.CARD_RECORD,this.updateUI,this);

        EventEmitter.on("Client"+SocketID.CARD_RECORD_BY_ID,this.onCardRecordById,this);
    },

    unRegisterMsg: function(){
        EventEmitter.off("Client"+SocketID.CARD_RECORD,this.updateUI,this);

        EventEmitter.off("Client"+SocketID.CARD_RECORD_BY_ID,this.onCardRecordById,this);
    },

    onCardRecordById: function(data){
        var recordCardsInfo = JSON.parse(data['records']['record_msg']);
        var recordSteps = recordCardsInfo['steps'];
        var maxRecordStep = recordSteps.length;
        for (var i = recordSteps.length - 1; i >= 0; i--) {
            var recordMsg = recordSteps[i];
            if (recordMsg['hu_info']) {
                var msg = new Array();
                msg.data = recordMsg;
                msg.id = data['records']['record_id'];
                this.onShareCallback(msg);
                break;
            };
        };
    },

    onShareCallback:function(data){
        if (this.btlShareDlg) {
            return;
        };

        this.btlShareDlg = cc.instantiate(this.prefabShareDlg);
        this.btlShareDlg.position = cc.v2(0,0);
        this.btlShareDlg.getComponent('BattleOverShareDlg').updateUI(data,true);
        this.btlShareDlg.getComponent('BattleOverShareDlg').setCallback(function(){
                    if (this.btlShareDlg) {
                        this.btlShareDlg.destroy();
                        this.btlShareDlg = null;
                    };
                }.bind(this));
        this.node.addChild(this.btlShareDlg,100);
    },

    updateUI: function(data){
        this.records = data;

        this.totalCount = this.records.length;

        this.pnlContent.height = this.totalCount * (130+this.spacing) + this.spacing;

        if (this.records.length > 0) {
            this.txtEmpty.active = false;
        }else{
            this.txtEmpty.active = true;
        };

        var todayScore = 0;
        var nearScore = 0;

        for (var i = 0; i < this.records.length; i++) {

            var record = this.records[i];

            if (i < this.spawnCount) {
                var item = cc.instantiate(this.prefabItem);
                this.pnlContent.addChild(item);
                item.setPosition(0,-130*(0.5+i)-this.spacing*(i+1));
                item.getComponent("HistoryItem").updateUI(record,i);
                item.getComponent("HistoryItem").setCallback(this.onSubItemCallback.bind(this));
                this.items.push(item);
            };

            var isSame = this.isSameDay(record['create_time']);

            var scoreInfo = JSON.parse(record['score_info']);
            var roomScore = scoreInfo['room_score'];
            if (record['player1'] == PlayerData.getPlayerId()) {
                nearScore = nearScore + roomScore[0];
                if (isSame) {
                    todayScore = todayScore + roomScore[0];
                };
            }else if (record['player2'] == PlayerData.getPlayerId()) {
                nearScore = nearScore + roomScore[1];
                if (isSame) {
                    todayScore = todayScore + roomScore[1];
                };
            }else if (record['player3'] == PlayerData.getPlayerId()) {
                nearScore = nearScore + roomScore[2];
                if (isSame) {
                    todayScore = todayScore + roomScore[2];
                };
            };
        };

        this.txtScore1.string = todayScore;
        this.txtScore2.string = nearScore;
    },

    getPositionInView: function (item) {
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.pnlScrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },

    update: function(dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return;
        this.updateTimer = 0;
        let items = this.items;
        let buffer = this.bufferZone;
        let isDown = this.pnlScrollView.content.y < this.lastContentPosY;
        let offset = (130 + this.spacing) * items.length;
        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                if (viewPos.y < -buffer && items[i].y + offset < 0) {
                    items[i].setPositionY(items[i].y + offset );
                    let item = items[i].getComponent('HistoryItem');
                    let idx = item.idx - items.length;
                    item.updateUI(this.records[idx], idx);
                }
            } else {
                if (viewPos.y > buffer && items[i].y - offset > -this.pnlContent.height) {
                    items[i].setPositionY(items[i].y - offset );
                    let item = items[i].getComponent('HistoryItem');
                    let idx = item.idx + items.length;
                    item.updateUI(this.records[idx], idx);
                }
            }
        }

        this.lastContentPosY = this.pnlScrollView.content.y;
    },

    isSameDay: function(create_time){
        var myDate = new Date();
        var hisDate = new Date(create_time);
        if (myDate.getMonth() == hisDate.getMonth() &&
            myDate.getDate() == hisDate.getDate()) {
            return true;
        };
        return false;
    },

    onSubItemCallback: function(data){
        this.pnl1.active = false;
        this.pnl2.active = true;

        this.createSubItems(data);
    },

    createSubItems: function(data){
        var scoreInfo = JSON.parse(data['score_info']);
        var roundInfo = scoreInfo['round_score'];
        for (var i = 0; i < roundInfo.length; i++) {
            var item = cc.instantiate(this.prefabSubItem);
            this.pnlSubContent.addChild(item);
            item.getComponent("HistorySubItem").updateUI(data,i);
        };
    },

    onTouchEnded: function(event){
    	if (!cc.rectContainsPoint(this.imgDi.getBoundingBoxToWorld(),cc.p(event.getLocation()))) {
    		this.node.destroy();
    	};
    },

    onWatchCallback: function(){
        var dlg = cc.instantiate(this.prefabWatchDlg);
        this.node.addChild(dlg);
        dlg.position = cc.p(0,0);
    },

    onCloseCallback: function(){
        this.node.destroy();
    },

    onBackCallback: function(){
        this.pnlSubContent.removeAllChildren();
        this.pnl2.active = false;
        this.pnl1.active = true;
    },

    start:function() {

    },

});
