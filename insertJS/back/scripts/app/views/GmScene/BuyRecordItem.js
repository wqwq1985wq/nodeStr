var HomeData = require('HomeData');
var LocalData = require('LocalData');

cc.Class({
    extends: cc.Component,

    properties: {
    	txtTime: cc.Label,
    	txtDetail: cc.RichText,
    },

    onLoad: function(){

    },

    start:function() {

    },

    updateUI: function(data,state){
        this.data = data;

        this.txtTime.string = data.create_time;

        if (state == 1) {
        	this.txtDetail.string = "您购买了<color=#ff0000>"+data.diamond+"钻石</color>";
        }else if (state == 2) {
        	this.txtDetail.string = "您为<color=#ff0000>"+data.toname+"(ID:"+data.touid+")</c>充值了<color=#ff0000>"+data.diamond+"钻石</color>";
        };
        
    },

});