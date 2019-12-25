var i = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,
    properties: {

    },
    ctor() {
        
    },
    onClickClost() {
        i.utils.closeView(this);
    },
});
