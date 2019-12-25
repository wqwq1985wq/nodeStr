var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');
var ClientSocket = require('ClientSocket');
var BattleData = require('BattleData');

module.exports={
    registerMsg: function()
    {   
        this.init();

    	EventEmitter.on(SocketID.SYNC_CARDSINFO,this.onSyncCardsInfo,this);

        EventEmitter.on(SocketID.SYNC_ZHUANG,this.onSyncZhuang,this);

        EventEmitter.on(SocketID.SYNC_PLAYER_ZHUANG,this.onSyncPlayerZhuang,this);

        EventEmitter.on(SocketID.ROOM_LEAVE,this.onRoomLeave,this);

        EventEmitter.on(SocketID.ROUND_OVER,this.onRoundOver,this);

        EventEmitter.on(SocketID.SYNC_PLAYANIM,this.onSyncPlayAnim,this);

        EventEmitter.on(SocketID.CARD_RECORD_BY_ID,this.onCardRecordById,this);

        EventEmitter.on(SocketID.SEND_MSG,this.onSendMsg,this);

        EventEmitter.on(SocketID.SEND_INTERACTMSG,this.onSendInteractMsg,this);

        EventEmitter.on(SocketID.SEND_CARD,this.onSendCard,this);
    },

    init: function(){
    	this.cardsInfo = null;
    	this.baseCardsInfo = null;
    	this.playerCardsInfo = null;

        this.reqShareRecord = false;
    },

    onSendCard: function(data){
        EventEmitter.emit("Client"+SocketID.SEND_CARD,data);
    },

    onSyncPlayAnim: function(data){
        EventEmitter.emit("Client"+SocketID.SYNC_PLAYANIM,data);
    },

    onRoundOver: function(data){
        this.init();
        EventEmitter.emit("Client"+SocketID.ROUND_OVER,data);
    },

    onSyncZhuang: function(data)
    {
        EventEmitter.emit("Client"+SocketID.SYNC_ZHUANG);

        this.excuteZhuangOverData(data.info.zhuang_over);
    },

    excuteZhuangOverData: function(zhuang_over)
    {
        this.cardsInfo.base_cards.zhuang_over = zhuang_over;
        this.updateCardsInfo();

        if (this.baseCardsInfo.zhuang_over) {
            //这里来处理是否要播放喜牌动画
            for (var i = 0; i < this.playerCardsInfo.length; i++) {
                var pInfo = this.playerCardsInfo[i];
                if (pInfo.xi_cards && pInfo.xi_cards.length > 0) {
                    var params = new Array();
                    params.pos = pInfo.pos;
                    params.delay = true;
                    EventEmitter.emit("PlayXiAnimEvent",params);
                };

                if (pInfo.pos == this.baseCardsInfo.turn_pos) {
                    var arr = new Array();
                    arr.num = 1;
                    arr.pos = pInfo.pos;
                    arr.cards = new Array();
                    arr.cards.push(pInfo.hand_cards[pInfo.hand_cards.length-1]);
                    EventEmitter.emit("GetCardsEvent",arr);
                };
            };
        }

        EventEmitter.emit("Client"+SocketID.SYNC_CARDSINFO,this.baseCardsInfo.zhuang_over);
    },

    onSyncPlayerZhuang: function(data)
    {
        var info = data.info;
        this.cardsInfo.player_cards[info.pos-1].zhuang = info.zhuang;
        this.updateCardsInfo();

        EventEmitter.emit("Client"+SocketID.SYNC_PLAYER_ZHUANG,info);

        EventEmitter.emit("Client"+SocketID.SYNC_CARDSINFO);
    },

    //拆分cardsInfo
    updateCardsInfo: function(){
        this.baseCardsInfo = this.cardsInfo.base_cards;
        this.playerCardsInfo = this.cardsInfo.player_cards;
        this.playerCardsInfo.sort(function(a,b){
            return a.pos - b.pos;
        });
    },

    onSyncCardsInfo: function(data){
        if (data.cards_info.str_type == "all") {
            this.cardsInfo = data.cards_info;
        }else{
            var pcards = data.cards_info.player_cards;
            pcards.sort(function(a,b){
                return a.pos - b.pos;
            });
            for (var i = 0; i < pcards.length; i++) {
                for (var key in pcards[i]) {
                    if (pcards[i].hasOwnProperty(key) == true) {
                        this.cardsInfo.player_cards[i][key] = pcards[i][key];
                    };
                };
            };
            
        }

        this.excuteCardsMsg(data.cards_info.record_data);

        this.updateCardsInfo();

    	EventEmitter.emit("Client"+SocketID.SYNC_CARDSINFO);
    },

    onCardRecordById: function(data){
        BattleData.enterRecordRoom(data,this.reqShareRecord);


        this.recordCardsInfo = JSON.parse(data['records']['record_msg']);
        this.recordSteps = this.recordCardsInfo['steps'];
        this.curRecordStep = 0;
        this.maxRecordStep = this.recordSteps.length;

        this.cardsInfo = this.recordCardsInfo['base_data'];
        this.updateCardsInfo();

        if (this.reqShareRecord) {
            this.reqShareRecord = false;
            EventEmitter.emit("Client"+SocketID.CARD_RECORD_BY_ID,data);
        }else{
            EventEmitter.emit("Client"+SocketID.SYNC_CARDSINFO);
        };
    },

    onSendMsg: function(data){
        EventEmitter.emit("Client"+SocketID.SEND_MSG,data);
    },

    onSendInteractMsg: function(data){
        EventEmitter.emit("Client"+SocketID.SEND_INTERACTMSG,data);
    },

    excuteCardsMsg: function(info){
        if (info.hasOwnProperty('turn_pos')) {
            this.cardsInfo.base_cards.turn_pos = info['turn_pos'];
        };

        if (info.hasOwnProperty('newcard_pos')) {
            this.cardsInfo.base_cards.newcard_pos = info['newcard_pos'];
        };

        if (info.hasOwnProperty('trigger_pos')) {
            this.cardsInfo.base_cards.trigger_pos = info['trigger_pos'];
        };

        if (info.hasOwnProperty('trigger_card')) {
            this.cardsInfo.base_cards.trigger_card = info['trigger_card'];
        };

        if (info.hasOwnProperty('first_send')) {
            this.cardsInfo.base_cards.first_send = info['first_send'];
        };

        if (info.hasOwnProperty('pg_cards')) {
            var pgCards = info['pg_cards'];
            this.cardsInfo.player_cards[pgCards.pos-1].pg_cards.push(pgCards.cards);
        };

        if (info.hasOwnProperty('rm_handcards')) {
            var rmCards = info['rm_handcards'];
            var handCards = this.cardsInfo.player_cards[rmCards.pos-1].hand_cards;
            this.cardsInfo.player_cards[rmCards.pos-1].hand_cards = this.clearArrByArr(handCards,rmCards.cards);
        };

        if (info.hasOwnProperty('rm_outcards')) {
            var rmOutCards = info['rm_outcards'];
            var outCards = this.cardsInfo.player_cards[rmOutCards.pos-1].out_cards;
            this.cardsInfo.player_cards[rmOutCards.pos-1].out_cards = this.clearArrByArr(outCards,rmOutCards.cards);
        };

        if (info.hasOwnProperty('add_cards')) {
            var addCards = info['add_cards'];
            if (addCards['cards'] instanceof Array) {
                var unUsedCards = this.cardsInfo.base_cards.unused_cards;
                unUsedCards = this.clearArrByArr(unUsedCards,addCards['cards']);

                var handCards = this.cardsInfo.player_cards[addCards.pos-1].hand_cards;
                var xiCards = this.cardsInfo.player_cards[addCards.pos-1].xi_cards;

                var addNum = 0;
                var newCards = new Array();

                var newXiCards = new Array();
                for (var i = 0; i < addCards.cards.length; i++) {
                    if (addCards.cards[i] > 120) {
                        var anim = new Array();
                        anim.data = new Array();
                        anim.data.data = new Array();
                        anim.data.data.anim_type = 7;
                        anim.data.data.pos = addCards.pos;
                        this.onSyncPlayAnim(anim);

                        xiCards.push(addCards.cards[i]);

                        newXiCards.push(addCards.cards[i]);
                    }else{
                        addNum = addNum + 1;
                        handCards.push(addCards.cards[i]);
                        newCards.push(addCards.cards[i]);
                    };
                };
                this.cardsInfo.player_cards[addCards.pos-1].hand_cards = handCards;
                this.cardsInfo.player_cards[addCards.pos-1].xi_cards = xiCards;

                var arr = new Array();
                arr.num = addNum;
                arr.pos = addCards.pos;
                arr.cards = newCards;
                EventEmitter.emit("GetCardsEvent",arr);

                if (newXiCards.length > 0) {
                    var xiArr = new Array();
                    xiArr.pos = addCards.pos;
                    xiArr.cards = newXiCards;
                    EventEmitter.emit("GetXiCardsEvent",xiArr);
                };

            };
        };

        if (info.hasOwnProperty('pg_cards_add')) {
            var pgCardsAdd = info['pg_cards_add'];
            var pgCards = this.cardsInfo.player_cards[pgCardsAdd.pos-1].pg_cards;
            for (var i = 0; i < pgCards.length; i++) {
                if (pgCards[i].pg_type == 3) {
                    var type1 = Math.ceil(pgCards[i].cards[0]/4);
                    var type2 = Math.ceil(pgCardsAdd.card/4);
                    if (type1 == type2) {
                        pgCards[i].cards.push(pgCardsAdd.card);
                        pgCards[i].pg_type = 4;
                        break;
                    };
                };
            };
            this.cardsInfo.player_cards[pgCardsAdd.pos-1].pg_cards = pgCards;
        };

        if (info.hasOwnProperty('pg_cards_chg')) {
            var pgCardsChg = info['pg_cards_chg'];
            var pgCards = this.cardsInfo.player_cards[pgCardsChg.pos-1].pg_cards;
            for (var i = 0; i < pgCards.length; i++) {
                if (pgCards[i].pg_type == 1) {
                    var type1 = Math.ceil(pgCards[i].cards[0]/4);
                    var type2 = Math.ceil(pgCardsChg.card/4);
                    if (type1 == type2) {
                        pgCards[i].pg_type = 2;
                        break;
                    };
                };
            };
            this.cardsInfo.player_cards[pgCardsChg.pos-1].pg_cards = pgCards;
        };

        if (info.hasOwnProperty('add_outcards')) {
            var addOutCards = info['add_outcards'];
            this.cardsInfo.player_cards[addOutCards.pos-1].out_cards = this.cardsInfo.player_cards[addOutCards.pos-1].out_cards.concat(addOutCards.cards);
            //出牌音效
            if (BattleData.isCardRecord()) {
                for (var i = 0; i < addOutCards.cards.length; i++) {
                    var d = new Array();
                    d['card'] = addOutCards.cards[i];
                    d['pos'] = addOutCards.pos;
                    EventEmitter.emit("Client"+SocketID.SEND_CARD,d);
                };
            };

        };
    },

    excuteRecordStepMsg: function(){
        if (this.curRecordStep >= this.maxRecordStep) {
                
            return;
        };
        this.curRecordMsg = this.recordSteps[this.curRecordStep];
        this.curRecordStep = this.curRecordStep + 1;

        if (this.curRecordMsg['zhuang_over']) {
            this.excuteZhuangOverData(this.curRecordMsg['zhuang_over']);
        }else if (this.curRecordMsg['zhuang']) {
            this.cardsInfo.player_cards[this.curRecordMsg.pos-1].zhuang = this.curRecordMsg['zhuang'];
            this.updateCardsInfo();
            this.excuteRecordStepMsg();
            // EventEmitter.emit("Client"+SocketID.SYNC_CARDSINFO);
        }else if (this.curRecordMsg['hu_info']) {
            var data = new Array();
            data.data = this.curRecordMsg;
            EventEmitter.emit(SocketID.ROUND_OVER,data);
        }else{
            //动画相关
            if (this.curRecordMsg['anims']) {
                var anim = new Array();
                anim.data = new Array();
                anim.data.data = this.curRecordMsg['anims'];
                this.onSyncPlayAnim(anim);
            };

            this.excuteCardsMsg(this.curRecordMsg);

            this.updateCardsInfo();
            EventEmitter.emit("Client"+SocketID.SYNC_CARDSINFO);
        };
    },

    getCardsInfo: function(){
    	return this.cardsInfo;
    },

    getBaseCardsInfo: function(){
    	return this.baseCardsInfo;
    },

    getPlayerCardsInfo: function(){
    	return this.playerCardsInfo;
    },

    getUIPos: function(pos){
        var myPos = BattleData.getMyPlayerInfo().pos;
        var deltaPos = pos - myPos;
        if (deltaPos < 0) {
            deltaPos = deltaPos + 3;
        };
        return deltaPos;
    },

    onRoomLeave: function(){
        this.init();
    },

    //-------------------------本地处理数据
    clearArrByArr: function(arr1,arr2){
        for (var i = arr1.length - 1; i >= 0; i--) {
            if (arr2.indexOf(arr1[i]) > -1) {
                arr1.splice(i,1);
            };
        };
        return arr1;
    },
};