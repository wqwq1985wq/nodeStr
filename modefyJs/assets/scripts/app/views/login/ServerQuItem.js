var renderListItem = require("../../component/RenderListItem");cc.zy.zyConfig.
var labelShadow = require("../../component/LabelShadow");
var config = require("../../../Config");
var utils = require("../../utils/Utils");

cc.Class({
    extends:renderListItem,

    properties: {
        lblName:labelShadow,
    },

    showData : function () {
        var d = this.data;
        if (d) {
            if (cc.zy.zyConfig.isNewServerList && !utils.stringUtil.isBlank(d.name)) {
                this.lblName.string = d.name;
            }
            else {
                this.lblName.string = i18n.t("LOGIN_SERVER_ID", { s: d.min, e: d.max });
            }
        }
    },

});