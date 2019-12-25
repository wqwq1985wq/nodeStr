var LocalData = require('LocalData');
module.exports={
	//格式 1-36 万 37-72 条 73-108 筒 109-112 红花 113-116 白花 117-120 千字 121-125 喜儿
	//pai_11 ~ pai_19 万
	//pai_21 ~ pai_29 条
	//pai_31 ~ pai_39 筒
	//pai_41 红花 pai_42 白花 pai_43 千字 
	//pai_44 pai_45 pai_46 pai_47 pai_48 喜儿
	getCardSpriteFrame : function(card){
		if (card <= 120) {
			var idx = Math.ceil(card/4);
			if (idx <= 9) {
				return "pai_1"+idx;
			}else if(idx <= 18){
				return "pai_2"+(idx-9);
			}else if(idx <= 27){
				return "pai_3"+(idx-18);
			}else if(idx <= 30){
				return "pai_4"+(idx-27);
			};
		}else{
			return "pai_4"+(card-120+3);
		};
	},

	getXCardSpriteFrame: function(card){
		if (card > 35) {
			card = 35;
		}else if (card <= 0) {
			card = 1;
		};
		if (card <= 9) {
			return "pai_1"+card;
		}else if (card <= 18) {
			return "pai_2"+(card-9);
		}else if (card <= 27) {
			return "pai_3"+(card-18);
		}else if (card <= 30) {
			return "pai_4"+(card-27);
		}else{
			return "pai_4"+(card-27);
		};
	},

	getCardWidthByScale: function(scale){
		return 76*scale;
	},

	getCardType: function(card){
		if (card <= 120) {
			return Math.ceil(card/4);
		};
		return card;
	},  

	getCardSpriteFrameByType: function(idx){
		if (idx <= 9) {
			return "pai_1"+idx;
		}else if(idx <= 18){
			return "pai_2"+(idx-9);
		}else if(idx <= 27){
			return "pai_3"+(idx-18);
		}else if(idx <= 30){
			return "pai_4"+(idx-27);
		}else{
			return "pai_4"+(idx-120+3);
		};
	},

	//(叫龙1、撂龙2、胡3、碰4、杠5、过6、暗杠11)
	getTriggerAudio: function(ctype,gender){
		var genderStr = "man";
		if (gender == 2) {
			genderStr = "woman";
		};
		if (ctype == 1) {
			return "resources/newImg/audio/lgmj/"+genderStr+"/"+LocalData.getLanguage()+"/"+genderStr+"_jiao.mp3";
		}else if (ctype == 2) {
			return "resources/newImg/audio/lgmj/"+genderStr+"/"+LocalData.getLanguage()+"/"+genderStr+"_liao.mp3";
		}else if (ctype == 3) {
			return "resources/newImg/audio/lgmj/"+genderStr+"/"+LocalData.getLanguage()+"/"+genderStr+"_hu.mp3";
		}else if (ctype == 4) {
			return "resources/newImg/audio/lgmj/"+genderStr+"/"+LocalData.getLanguage()+"/"+genderStr+"_peng.mp3";
		}else if (ctype == 5) {
			return "resources/newImg/audio/lgmj/"+genderStr+"/"+LocalData.getLanguage()+"/"+genderStr+"_gang.mp3";
		}else if (ctype == 7) {
			return "resources/newImg/audio/lgmj/"+genderStr+"/"+LocalData.getLanguage()+"/"+genderStr+"_buhua.mp3";
		}else if (ctype == 11) {
			return "resources/newImg/audio/lgmj/"+genderStr+"/"+LocalData.getLanguage()+"/"+genderStr+"_angang.mp3";
		}else if (ctype == 12) {
			return "resources/newImg/audio/lgmj/"+genderStr+"/"+LocalData.getLanguage()+"/"+genderStr+"_zimo.mp3";
		}else if (ctype == 13) {
			return "resources/newImg/audio/lgmj/"+genderStr+"/"+LocalData.getLanguage()+"/"+genderStr+"_duzi.mp3";
		}else if (ctype == 14) {
			return "resources/newImg/audio/lgmj/"+genderStr+"/"+LocalData.getLanguage()+"/"+genderStr+"_zhezhuang.mp3";
		};
	},

	//获取玩家胜利或失败音效
	getPlayerWinOrLoseAudio: function(win){
		if (win) {
			return "resources/newImg/audio/effect/win2.mp3";
		}else{
			return "resources/newImg/audio/effect/lose2.mp3";
		};
	},

	getCardAudio: function(card,gender){
		var genderStr = "man";
		if (gender == 2) {
			genderStr = "woman";
		};
		var ctype = this.getCardType(card);
		if (ctype <= 9) {
			return "resources/newImg/audio/lgmj/"+genderStr+"/"+LocalData.getLanguage()+"/"+genderStr+"1"+ctype+".mp3";
		}else if (ctype <= 18) {
			return "resources/newImg/audio/lgmj/"+genderStr+"/"+LocalData.getLanguage()+"/"+genderStr+"2"+(ctype-9)+".mp3";
		}else if (ctype <= 27) {
			return "resources/newImg/audio/lgmj/"+genderStr+"/"+LocalData.getLanguage()+"/"+genderStr+"3"+(ctype-18)+".mp3";
		}else if (ctype <= 30) {
			return "resources/newImg/audio/lgmj/"+genderStr+"/"+LocalData.getLanguage()+"/"+genderStr+"4"+(ctype-27)+".mp3";
		};
	},

	getInteractAudio: function(idx){
		if (idx == 1) {
			return "resources/newImg/audio/interact/bomb.mp3";
		}else if (idx == 2) {
			return "resources/newImg/audio/interact/brick.mp3";
		}else if (idx == 3) {
			return "resources/newImg/audio/interact/brick.mp3";
		}else if (idx == 4) {
			return "resources/newImg/audio/interact/egg.mp3";
		}else if (idx == 5) {
			return "resources/newImg/audio/interact/flower.mp3";
		}else if (idx == 6) {
			return "resources/newImg/audio/interact/kiss.mp3";
		}else if (idx == 7) {
			return "resources/newImg/audio/interact/brick.mp3";
		}else if (idx == 8) {
			return "resources/newImg/audio/interact/tomato.mp3";
		};
	},

	//格式化时间
	getMinSec: function(time){
		var min = Math.floor(time/60);
		var sec = time%60;
		if (min < 10) {
			min = "0"+min;
		}
		if (sec < 10) {
			sec = "0"+sec;
		};
		return min+":"+sec;
	}, 


	performWithDelay: function(node,callback,delay){
		var delay = cc.delayTime(delay);
		var sequence = cc.sequence(delay,cc.callFunc(callback));
		node.runAction(sequence);
		return sequence;
	},


	playAudio: function(path){
		cc.audioEngine.playEffect( cc.url.raw(path), false );
	},
};