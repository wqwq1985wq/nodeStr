var HomeData = require('HomeData');
var LocalData = require('LocalData');

cc.Class({
    extends: cc.Component,

    properties: {
    	imgNoSee: cc.Node,
    	imgSee: cc.Node,
    	txtTitle: cc.Label,
    },

    onLoad: function(){

    },

    start:function() {

    },

    updateUI: function(data,func){
    	this.func = func;
        this.data = data;

        this.imgNoSee.active = this.data.is_get == 0;
        this.imgSee.active = this.data.is_get == 1;
        this.txtTitle.string = this.data.title;
    },

    onSeeCallback: function(){
    	this.func(this.data);
    },

});