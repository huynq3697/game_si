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
        this.listCardUp = [];
        this.listCardUpId = [];
        this.newCardId = null;
        this.newCard = null;
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
        this.listCardUp = [];
        this.listCardUpId = [];
        this.listCardDiTien = [];
        this.newCardId = null;
        this.newCard = null;
        this.isWin = false;
        this.isDraw = false;
        this.sttBoc = Constant.STT_BOC.BOC_DAU;
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

    updateListCardUp (id, value) {
        this.newCardId = Number(id);
        this.newCard = Number(value);
        this.listCardUp.push(Number(value));
        this.listCardUpId.push(Number(id));
        this.setListCardDiTien();
    },

    setListCardDiTien () {
        this.listCardDiTien = [];
        if (this.listCardUp.length == 1) {
            this.listCardDiTien = this.listCardUp;
        } else {
            var newCardValue = this.listCardUp[this.listCardUp.length - 1];
            var amount = Utils.Array.getAmount(this.listCardUp, newCardValue);
            for (var i = 0; i < amount; i++) {
                this.listCardDiTien.push(newCardValue);
            }
        }
        
    },

    addCardFaceUp (node) {
        this.face_up_card.addChild(node);
    }

    // update (dt) {},
});
