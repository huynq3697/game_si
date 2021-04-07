var Constant = require("Constant");
cc.Class({
    extends: cc.Component,

    properties: {
        home: cc.Node,
        game: cc.Node,
    },

    onLoad () {
        cc.Global.instanceCardAtlas();
        this.addEventListener();
        this.onActiveHome();
    },

    start () {
        
    },

    addEventListener () {
        this.node.on(Constant.EVENT.ATIVE_HOME, this.onActiveHome, this);
        this.node.on(Constant.EVENT.ATIVE_GAME, this.onActiveGame, this);
    },

    onActiveHome () {
        this.home.active = true;
        this.game.active = false;
    },

    onActiveGame () {
        this.home.active = false;
        this.game.active = true;
    },
    
    // update (dt) {},
});
