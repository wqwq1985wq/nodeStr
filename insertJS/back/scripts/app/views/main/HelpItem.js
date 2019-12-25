cc.Class({
    extends: cc.Component,
    properties: {
        helpId:0
    },
    // ctor() {
    //     this.helpId = 0;
    // },
    onClickHelp() {
        0 != this.helpId && facade.send("GUIDE_HELP", this.helpId);
    },
});
