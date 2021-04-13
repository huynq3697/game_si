var Constant = require("Constant");
var DataManager = require("DataManager");
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
            this.setMoneyPlayer(listPlayer[i], listPlayer);
        }
    },
    setMoneyPlayer (player, listPlayer) {
        if (!player.isDraw) {
            var money = (player.isWin) ? cc.Global.BET_MONEY * ( listPlayer.length - 1 ): - cc.Global.BET_MONEY;
            var playerData = DataManager.UserData.getPlayerById(player.player_id);
            playerData.money += money;
            DataManager.UserData.setPlayer(playerData);
        }
    },

    checkDraw (listPlayer) {
        for (var i = 0; i < listPlayer.length; i++) {
            if (listPlayer[i].isWin == true) {
                return false;
            }
        }
        return true;
    },

    onBtnClose () {
        this.node.runAction(cc.sequence(cc.fadeOut(1.0), cc.callFunc(function () {
            this.node.active = false;
            cc.Global.callEvent(Constant.EVENT.NEW_GAME, null);
            cc.Global.callEvent(Constant.EVENT.GAME_START, null);
        }.bind(this))));
    },

    // update (dt) {},
});
