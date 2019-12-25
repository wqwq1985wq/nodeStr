// 卡类型
var CardType = cc.Enum({
    Jiang : 1,
    Hand  : 2,
    Xi    : 3,
    Pg    : 4,//碰 杠
});

//卡牌的状态
var CardState = cc.Enum({
	Null : 1,		//NULL
	WaitZhuang : 2, //等待买庄
	Zhuang : 3,     //买完庄
});

//操作类型
var ManageType = cc.Enum({
	Jiao : 1,		//叫牌
	Long : 2,		//撂龙
	Hu   : 3,       //胡牌
	Gang : 4,		//杠牌
	Peng : 5,		//碰牌
	Guo  : 6,		//过牌
	Ting : 7,		//天听
});

//碰牌区类型
var PgType = cc.Enum({
	Jiao : 1,		//叫牌
	Long : 2,		//撂龙
	Peng : 3,		//碰牌
	ShowGang : 4,	//明杠
	AnGang : 5,		//暗杠
});

module.exports={
    CardType : CardType,

    CardState : CardState,

    ManageType : ManageType,

    PgType : PgType,
};