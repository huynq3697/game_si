var DataManager = require("DataManager");
var Utils = require("Utils");
var Constant = require("Constant");
cc.Class({
    extends: cc.Component,

    properties: {
        card_container: cc.Node,
        face_down_card: cc.Node,
        face_up_card: cc.Node,
        player_id: cc.Number = 0,
        draw_card_rotate: cc.Number = 0,
        money: cc.Label,
        bet_money_total_label: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.listCard = [];
        this.listCardId = [];
        this.isWin = false;
        this.isDraw = false;
        this.isStop = false;
        this.sttBoc = Constant.STT_BOC.BOC_DAU;
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
        this.sttBoc = 0;
        this.setBetMoneyTotal();
        this.setInfor();
    },

    setBetMoneyTotal (money) {
        if (money > 0) {
            this.bet_money_total_label.node.active = true;
            this.bet_money_total_label.string = Utils.Malicious.moneyWithFormat(money, ".");
        } else {
            this.bet_money_total_label.node.active = false;
            this.bet_money_total_label.string = 0;
        }
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
