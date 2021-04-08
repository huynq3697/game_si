var Constant = require("Constant");
cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        itemResult: cc.Prefab,
    },

    // onLoad () {},

    start () {

    },

    createListResult (listPlayer) {
        this.content.removeAllChildren();
        var isDraw = this.checkDraw(listPlayer);
        for (var i = 0; i < listPlayer.length; i++) {
            listPlayer[i].isDraw = isDraw;
            var itemResult = cc.instantiate(this.itemResult);
            var itemResultJs = itemResult.getComponent("itemResult");
            itemResultJs.setInfor(listPlayer[i]);
            this.content.addChild(itemResult);
        }
    },

    checkDraw (listPlayer) {
        for (var i = 0; i < listPlayer.length; i++) {
            if (listPlayer.isWin == true) {
                return false;
            }
        }
        return true;
    },

    onBtnClose () {
        this.node.runAction(cc.sequence(cc.fadeOut(1.0), cc.callFunc(function () {
            this.node.active = false;
            this.callEvent(Constant.EVENT.NEW_GAME);
            this.callEvent(Constant.EVENT.GAME_START);
        }.bind(this))));
    },

    callEvent (event) {
        this.node.dispatchEvent(new cc.Event.EventCustom(event, true));
    },

    // update (dt) {},
});
