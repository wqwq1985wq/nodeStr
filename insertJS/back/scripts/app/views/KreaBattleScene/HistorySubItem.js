var ViewCommon = require('ViewCommon');
var BattleNetHelper = require('BattleNetHelper');
var LoginData = require('LoginData');
var PlayerData = require('PlayerData');
var CardData = require('CardData');

cc.Class({
    extends: cc.Component,

    properties: {
        txtRound: cc.Label,
        txtRecordNum: cc.Label,
        txtName1: cc.Label,
        txtName2: cc.Label,
        txtName3: cc.Label,
        txtScore1: cc.Label,
        txtScore2: cc.Label,
        txtScore3: cc.Label,
    },

    onLoad: function(){
     	

    },

    start:function() {

    },

    updateUI: function(data,idx){
    	this.data = data;
    	var roomInfo = JSON.parse(data['room_info']);
        var roomBaseInfo = roomInfo['roomBaseInfo'];
        this.txtRound.string = "局数："+(idx+1)+"/"+roomBaseInfo.times;

        this.recordId = parseInt(data['record_id'])+idx+1;

        this.txtRecordNum.string = "回放码："+(parseInt(data['record_id'])+idx+1);

        var scoreInfo = JSON.parse(data['score_info']);
        var roundInfo = scoreInfo['round_score'][idx];
        for (var i = 0; i < roundInfo.length; i++) {
            this['txtScore'+(i+1)].string = roundInfo[i];
        };

        var roomPlayerInfo = roomInfo['roomPlayerInfo'];
        for (var i = 0; i < roomPlayerInfo.length; i++) {
            var pinfo = roomPlayerInfo[i];
            this['txtName'+pinfo.pos].string = pinfo.pdata.name+"（ID："+pinfo.pdata.id+"）";
        };
    },

    onWatchCallback: function(){
    	BattleNetHelper.reqRecordById(this.recordId);
    },

    onShareCallback: function(){
        if (CardData.reqShareRecord) {
            return;
        };
        CardData.reqShareRecord = true;
        BattleNetHelper.reqShareRecordById(this.recordId);

        // if (LoginData.GamePlatform == 2) {
        //     var self = this;
        //     var path = cc.url.raw("resources/newImg/share/share2.jpg");
        //     if (cc.loader.md5Pipe) {
        //         path = cc.loader.md5Pipe.transformURL(path);
        //     }
        //     wx.shareAppMessage({
        //             title:PlayerData.getPlayerData().name+"分享了一局比赛，点击可以进入查看",
        //             query:"scene=HomeScene&share_type=huifang&watch_id="+this.recordId,
        //             imageUri:path,
        //             success: function(e){
        //                 ViewCommon.showAlertDlg("分享成功！");
        //             },
        //             fail: function(e){
        //                 ViewCommon.showAlertDlg("分享失败！");
        //             }
        //         });
        // }else{
        //     ViewCommon.showAlertDlg("分享成功！");
        // }
    },

});