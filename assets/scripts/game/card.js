var Constant = require("Constant");
cc.Class({
    extends: cc.Component,

    properties: {
        cardAtlas: cc.SpriteAtlas,
        icon: cc.Sprite,
    },


    onLoad () {
        this.card_id = 0;
        this.type = Constant.TYPE_CARD.RED;
        this.value = 0;
    },

    start () {

    },

    setInforCard(id) {
        this.card_id = id;
        id = String(id);
        this.value = id.substring(0,1);
        this.type = (id.substring(1,2) == Constant.TYPE_CARD.BLACK) ? Constant.TYPE_CARD.BLACK : Constant.TYPE_CARD.RED;
        var afterName = (this.type == Constant.TYPE_CARD.RED) ? "a" : "";
        var cardName = id.substring(0,1) + afterName;
        var spriteFrame = this.cardAtlas.getSpriteFrame(cardName);
        if (spriteFrame) {
            this.icon.spriteFrame = spriteFrame;
        }
    }

    // update (dt) {},
});
