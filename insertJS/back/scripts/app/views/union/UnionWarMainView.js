var i = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,
    properties: {

    },
    ctor() {
        
    },
    onLoad() {},
    eventClose() {
        i.utils.closeView(this);
    },
});