
cc.Class({
    extends: cc.Component,

    properties: {
        card_container: cc.Node,
        face_down_card: cc.Node,
        player_id: cc.Number = 0,
        draw_card_rotate: cc.Number = 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.cardNumber = 0;
        this.listCard = [];
    },

    start () {

    },

    reset () {
        this.card_container.removeAllChildren();
        this.face_down_card.active = false;
        this.cardNumber = 0;
        this.listCard = [];
    },

    updateCardNumber () {
        this.cardNumber++;
    },

    updateListCard (id) {
        this.listCard.push(id);
    }

    // update (dt) {},
});
