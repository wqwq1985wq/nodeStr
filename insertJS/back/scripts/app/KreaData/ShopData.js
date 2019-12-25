var EventEmitter = require('EventEmitter');
var SocketID = require('SocketID');
var ClientSocket = require('ClientSocket');
var ViewCommon = require('ViewCommon');
var ErrorData = require('ErrorData');
var BattleNetHelper = require('BattleNetHelper');

var ShopCfg = [
	{
		num:6,
		extra: 0,
		price: 6,
	},
	{
		num:30,
		extra: 1,
		price: 30,
	},
	{
		num:68,
		extra: 4,
		price: 68,
	},
	{
		num:118,
		extra: 11,
		price: 118,
	},
	{
		num:198,
		extra: 25,
		price: 198,
	},
	{
		num:348,
		extra: 58,
		price: 348,
	},
	
];

module.exports={
	ShopCfg: ShopCfg,

    registerMsg: function()
    {
    	this.init();
    },

    init: function(){

    },
    
};