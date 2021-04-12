var DataManager = require("DataManager");
var Utils = require("Utils");
cc.Class({
    extends: cc.Component,

    properties: {
        card_container: cc.Node,
        face_down_card: cc.Node,
        face_up_card: cc.Node,
        player_id: cc.Number = 0,
        draw_card_rotate: cc.Number = 0,
        money: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.listCard = [];
        this.listCardId = [];
        this.isWin = false;
        this.isDraw = false;
        this.isStop = false;
    },

    start () {

    },

    reset () {
        this.card_container.removeAllChildren();
        this.face_up_card.removeAllChildren();
        this.face_down_card.active = false;
        this.listCard = [];
        this.listCardId = [];
        this.isWin = false;
        this.isDraw = false;
        this.setInfor();
    },

    setInfor () {
        var data = DataManager.UserData.getPlayerById(this.player_id);
        this.setMoney(data.money);
    },

    setMoney (money) {
        this.money.string = Utils.Malicious.moneyWithFormat(money, ".");
    },

    updateListCard (id) {
        this.listCard.push(Number(id));
    },

    updateListCardId (id) {
        this.listCardId.push(Number(id));
    },

    addCardFaceUp (node) {
        this.face_up_card.addChild(node);
    }

    // update (dt) {},
});
