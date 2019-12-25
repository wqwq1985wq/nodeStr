cc.Class({
    extends: cc.Component,

    properties: {
    	txtAudioId: 1,
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        var audioMng = cc.find('AudioMng');
        if (audioMng) {
            audioMng = audioMng.getComponent('AudioMng');
        }
        function onTouchDown (event) {
            if (audioMng) audioMng.playButton(self.txtAudioId);

        }
        function onTouchUp (event) {

        }
        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);
    }
});
