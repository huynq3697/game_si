var Constant = require("Constant");
var PlayerController = require("PlayerController");
var Utils = require("Utils");
var GameLogic = require("GameLogic");
cc.Class({
    extends: cc.Component,

    properties: {
        player1: PlayerController, // my player
        player2: PlayerController,
        player3: PlayerController,
        player4: PlayerController,
        player5: PlayerController,
        noc: cc.Node,
        draw_card: cc.Prefab, // bai boc len
        card: cc.Prefab,
        showCardPrefab: cc.Prefab,
        endGamePrefab: cc.Prefab,
        btnBocBai: cc.Node,
        betMoney: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:
    ctor () {
        this.time_turn = 1;
        this.time_draw_card = 0.5;
        this.max_card_number = 5;
    },

    onLoad () {
        this.addEventListener();
    },

    start () {
        
    },

    onEnable () {
        this.onNewGame();
        this.onGameStart();
    },

    addEventListener () {
        this.node.on(Constant.EVENT.NEW_GAME, this.onNewGame, this);
        this.node.on(Constant.EVENT.GAME_START, this.onGameStart, this);
        this.node.on(Constant.EVENT.END_GAME, this.onEndGame, this);
        this.node.on(Constant.EVENT.SHOW_CARD, this.onShowCard, this);
    },

    onNewGame () {
        this.listPlayer = [];
        this.currPlayer = null;
        this.TURN = Constant.TURN.PLAYER_1;
        this.NEXT_TURN = null;
        this.ROUND = Constant.ROUND.ROUND_1;
        this.btnBocBai.active = false;
        this.resetPlayer();
        this.drawCardList = [10,10,10,10,10,20,20,21,21,30,30,31,31,40,40,41,41,50,50,51,51,60,60,61,61];
        this.betMoney.string = "Cược: " + Utils.Malicious.moneyWithFormat(cc.Global.BET_MONEY, ".");
    },

    onGameStart () {
        this.bocBai();
    },

    onEndGame () {
        // test
        // this.listPlayer[0].listCard = [4,2,2,6,6];
        // this.listPlayer[1].listCard = [1,3,3,6,6];
        // this.listPlayer[0].listCardId = [40,20,20,60,61];
        // this.listPlayer[1].listCardId = [10,30,30,60,61];
        var listPlayerResult = GameLogic.endGame(this.listPlayer);
        var endGame = this.node.getChildByName("EndGame");
        if (!endGame) {
            endGame = cc.instantiate(this.endGamePrefab);
            this.node.addChild(endGame, cc.macro.MAX_ZINDEX);
        }
        endGame.active = true;
        endGame.opacity = 255;
        var endGameJs = endGame.getComponent("EndGame");
        if (endGameJs) {
            endGameJs.createListResult(listPlayerResult);    
        }
    },

    bocBai () {
        this.btnBocBai.active = false;
        this.currPlayer = this.getCurrPlayer();
        if (this.checkMaxCardNumber()) { // chi duoc boc toi da 5 quan
            return;
        }
        this.TURN = this.NEXT_TURN;
        var draw_card = cc.instantiate(this.draw_card);
        draw_card.rotation = this.currPlayer.draw_card_rotate;
        this.node.addChild(draw_card);
        draw_card.position = this.noc.position;
        draw_card.runAction(cc.sequence(cc.moveTo(this.time_draw_card, this.currPlayer.node.position), cc.callFunc(function () {
            draw_card.destroy();
            if (this.currPlayer.listCard.length == 1) {
                this.currPlayer.face_down_card.active = true;
                this.setListCardPlayer(null);
            } else {
                var card = cc.instantiate(this.card);
                this.currPlayer.card_container.addChild(card);
                this.setListCardPlayer(card);
            }
            this.runTimeTurn();
        }.bind(this))));
    },

    onShowCard(event) {
        var player1 = this.getPlayerByID(Constant.TURN.PLAYER_1);
        var card = cc.instantiate(this.card);
        var cardJs = card.getComponent("card");
        cardJs.setInforCard(event.data);
        player1.addCardFaceUp(card);
        card.color = cc.Color.GRAY;
    },

    showCard (id) {
        if (this.currPlayer.player_id == Constant.TURN.PLAYER_1) {
            var showCard = this.node.getChildByName("ShowCard");
            if (!showCard) {
                showCard = cc.instantiate(this.showCardPrefab);
                this.node.addChild(showCard, cc.macro.MAX_ZINDEX - 1);
            }
            showCard.active = true;
            showCard.opacity = 255;
            var showCardJs = showCard.getComponent("ShowCard");
            showCardJs.setIcon(id);
        }
    },

    setListCardPlayer (card) {
        var id = Utils.Malicious.randomMinMax(0, this.drawCardList.length - 1, true);
        var value = String(this.drawCardList[id]).substring(0,1);
        this.currPlayer.updateListCard(value);
        this.currPlayer.updateListCardId(this.drawCardList[id]);
        if (card) {
            var cardJs = card.getComponent('card');
            cardJs.setInforCard(this.drawCardList[id]);
        } else {
            this.showCard(this.drawCardList[id]);
        }
        this.drawCardList.splice(id, 1);
        this.checkNextRound();
    },

    checkNextRound () {
        var isNextRound = true;
        for (var i = 0; i < this.listPlayer.length; i++) {
            if (this.listPlayer[i].listCard.length < this.ROUND) {
                isNextRound = false;
                break;
            }
        }
        if (isNextRound) {
            this.ROUND++;
        }
        return isNextRound;
    },

    checkDiTien () {
        
    },

    runTimeTurn () {
        if (this.TURN !== Constant.TURN.PLAYER_1) {
            this.scheduleOnce(function (){
                this.bocBai();
            }.bind(this), this.time_turn)
        } else {
            this.btnBocBai.active = (this.checkMaxCardNumber()) ? false : true;
        }
    },

    checkMaxCardNumber () {
        if (this.currPlayer.listCard.length == this.max_card_number) {
            this.scheduleOnce(function () {
                this.callEvent(Constant.EVENT.END_GAME);
            }.bind(this), 2);
            return true;
        }
        return false;
    },

    getCurrPlayer () {
        for (var i = 0; i < this.listPlayer.length; i++) {
            if (this.listPlayer[i].player_id == this.TURN) {
                this.NEXT_TURN = (i == this.listPlayer.length - 1) ? this.listPlayer[0].player_id : this.listPlayer[i+1].player_id;
                return this.listPlayer[i];
            };
        }
        return null;
    },

    getPlayerByID (id) {
        for (var i = 0; i < this.listPlayer.length; i++) {
            if (this.listPlayer[i].player_id == id) {
                return this.listPlayer[i];
            };
        }
        return null;
    },

    resetPlayer () {
        var list_player = [this.player1, this.player2, this.player3, this.player4, this.player5];
        for (var i = 0; i < list_player.length; i++) {
            list_player[i].reset();
            list_player[i].node.active = false;
        }

        switch (cc.Global.GAME_TYPE) {
            case 2:
                this.listPlayer = [this.player1, this.player4];
                break;
            case 3:
                this.listPlayer = [this.player1, this.player2, this.player4];
                break;
            case 4:
                this.listPlayer = [this.player1, this.player2, this.player4, this.player5];
                break;
            case 5:
                this.listPlayer = [this.player1, this.player2, this.player3, this.player4, this.player5];
                break;
            default:
                break;
        }

        for (var i = 0; i < this.listPlayer.length; i++) {
            this.listPlayer[i].node.active = true;
        }
    },

    onBtnBack () {
        this.callEvent(Constant.EVENT.ATIVE_HOME);
    },

    callEvent (event) {
        this.node.dispatchEvent(new cc.Event.EventCustom(event, true));
    }

    // update (dt) {},
});
