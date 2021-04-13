
var Constant = require("Constant");
cc.Class({
    extends: cc.Component,

    properties: {
        icon: cc.Sprite,
        cardAtlas: cc.SpriteAtlas,
    },

    onLoad () {
        this.card_id = 0;
    },

    start () {

    },

    setIcon (id) {
        this.card_id = id;
        var spriteFrame = cc.Global.getCardSpriteFrame(id);
        if (spriteFrame) {
            this.icon.spriteFrame = spriteFrame;
        }
    },

    onBtnClose () {
        this.node.runAction(cc.sequence(cc.fadeOut(1.0), cc.callFunc(function () {
            this.node.active = false;
            cc.Global.callEvent(Constant.EVENT.SHOW_CARD, this.card_id);
        }.bind(this))));
    },
    // update (dt) {},
});
