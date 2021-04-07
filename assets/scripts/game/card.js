var Constant = require("Constant");
cc.Class({
    extends: cc.Component,

    properties: {
        icon: cc.Sprite,
    },


    onLoad () {
        this.card_id = 0;
        this.value = 0;
    },

    start () {

    },

    setInforCard(id) {
        this.card_id = id;
        id = String(id);
        this.value = id.substring(0,1);
        var spriteFrame = cc.Global.getCardSpriteFrame(id);
        if (spriteFrame) {
            this.icon.spriteFrame = spriteFrame;
        }
    }

    // update (dt) {},
});
