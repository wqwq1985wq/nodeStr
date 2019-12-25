var HomeData = require('HomeData');
var ShopData = require('ShopData');
var ViewCommon = require('ViewCommon');
var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');

cc.Class({
    extends: cc.Component,

    properties: {
    	txtPrice: cc.Label,
    	txtDiamond: cc.Label,
    	imgDiamond: cc.Sprite,
    	imgExtra: cc.Node,
    	txtExtra: cc.Label,

    	atlasShop:cc.SpriteAtlas,
    },

    onLoad: function(){
    	this.registerMsg();
    },

    onDestroy: function(){
        this.unRegisterMsg();
    },

    registerMsg: function(){

    },

    unRegisterMsg: function(){

    },

    updateUI:function(data,i){
    	this.idx = i;
    	this.data = data;
    	this.txtPrice.string = this.data.price+"元";
    	this.txtDiamond.string = this.data.num+"钻石";
    	this.txtExtra.string = this.data.extra+"钻石";
    	this.imgDiamond.spriteFrame = this.atlasShop.getSpriteFrame(this.getShopIcon(i));
    },

    getShopIcon:function(i){
    	return "games-res-csmj-images-market-diamond_0"+(i+1);
    },

    start:function() {

    },

});