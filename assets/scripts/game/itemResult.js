
cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        card: cc.Prefab,
        resultLabel: cc.Label,
        playerNameLabel: cc.Label,
    },

    // onLoad () {},

    start () {

    },

    setInfor (data) {
        this.setResultLabel(data);
        this.setPlayerName(data.player_id);
        this.createListCard(data.listCardId);
    },

    createListCard (listCard) {
        this.content.removeAllChildren();
        for (var i = 0; i < listCard.length; i++) {
            var card = cc.instantiate(this.card);
            card.rotation = 0;
            var cardJs = card.getComponent("card");
            cardJs.setInforCard(listCard[i]);
            this.content.addChild(card);
        }
    },

    setPlayerName (id) {
        this.playerNameLabel.string = (id == 1) ? "Tôi" : "Player " + id;
    },

    setResultLabel (data) {
        if (data.isDraw) {
            this.resultLabel.string = "Hòa";
            this.resultLabel.node.color = cc.Color.WHITE;
        } else {
            if (data.isWin) {
                this.resultLabel.string = "Thắng";
                this.resultLabel.node.color = cc.Color.YELLOW;
            } else {
                this.resultLabel.string = "Thua";
                this.resultLabel.node.color = cc.Color.RED;
            }
        }
    }

    // update (dt) {},
});
