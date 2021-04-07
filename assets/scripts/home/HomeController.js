var Constant = require("Constant");
cc.Class({
    extends: cc.Component,

    properties: {
        btn_2player: cc.Node,
        btn_3player: cc.Node,
        btn_4player: cc.Node,
        btn_5player: cc.Node,
    },

    // onLoad () {},

    start () {

    },

    onBtnClick (e) {
        switch (e.target) {
            case this.btn_2player:
                cc.Global.GAME_TYPE = 2;
                break;
            case this.btn_3player:
                cc.Global.GAME_TYPE = 3;
                break;
            case this.btn_4player:
                cc.Global.GAME_TYPE = 4;
                break;
            case this.btn_5player:
                cc.Global.GAME_TYPE = 5;
                break;
            default:
                break;
        }
        this.callEvent(Constant.EVENT.ATIVE_GAME);
    },

    callEvent (event) {
        this.node.dispatchEvent(new cc.Event.EventCustom(event, true));
    }

    // update (dt) {},
});
