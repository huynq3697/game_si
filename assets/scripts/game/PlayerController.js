
cc.Class({
    extends: cc.Component,

    properties: {
        card_container: cc.Node,
        face_down_card: cc.Node,
        face_up_card: cc.Node,
        player_id: cc.Number = 0,
        draw_card_rotate: cc.Number = 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.listCard = [];
    },

    start () {

    },

    reset () {
        this.card_container.removeAllChildren();
        this.face_up_card.removeAllChildren();
        this.face_down_card.active = false;
        this.listCard = [];
    },

    updateListCard (id) {
        this.listCard.push(id);
    },

    addCardFaceUp (node) {
        this.face_up_card.addChild(node);
    }

    // update (dt) {},
});
