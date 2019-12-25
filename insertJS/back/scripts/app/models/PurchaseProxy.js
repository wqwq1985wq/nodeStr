var PurchaseProxy = function() {

    this.gift = null;
    this.PURCHASE_DATA_UPDATA = "PURCHASE_DATA_UPDATA";
    this.PURCHASE_IS_BUY = "PURCHASE_IS_BUY";
    this.limitBuy = !1;
    this._lastid = 0;

    this.ctor = function() {
        JsonHttp.subscribe(proto_sc.zchuodong.Gift, this.onUpGift, this);
    };
    this.onUpGift = function(t) {
        this.gift = t;
        facade.send(this.PURCHASE_DATA_UPDATA);
        this.limitBuy = !1;
    };
    this.setGiftNum = function(t, e) {
        t = 0 == t ? this._lastid : t;
        this._lastid = t;
        for (var o = 0; o < this.gift.length; o++)
            this.gift[o].id == t && (this.gift[o].limit += e);
        e > 0 && (this._lastid = 0);
        facade.send(this.PURCHASE_DATA_UPDATA);
    };
    this.sendOpenPrince = function() {
        JsonHttp.send(new proto_cs.huodong.hd6180Info());
    };
    this.sendBuy = function() {
        if (0 != this._lastid) {
            var t = new proto_cs.huodong.hd6180buy();
            t.id = this._lastid;
            JsonHttp.send(t);
            this._lastid = 0;
        }
    };
    this.hasRed = function() {
        var t = !1,
            e = this.gift.length;
        if (this.gift)
            for (var o = 0; o < e; o++) this.gift[o].limit > 0 && (t = !0);
        return t;
    };
}
exports.PurchaseProxy = PurchaseProxy;
