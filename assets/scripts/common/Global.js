var Constant = require("Constant");
cc.Global = cc.Global || {};
cc.Global.GAME_TYPE = 2; // game type bang may thi tuong ung vs so nguoi choi
cc.Global.instanceCardAtlas = function (cb) {
    if (!cc.Global.CardAtlas) {
        cc.resources.load("images/card", cc.SpriteAtlas, function (completedCount, totalCount, item) {
        }, function (err, data) {
            if (!err) {
                cc.Global.CardAtlas = data;
            }
        });
    }
}
cc.Global.getCardSpriteFrame = function (id) {
    if (cc.Global.CardAtlas) {
        id = String(id);
        var type = (id.substring(1,2) == Constant.TYPE_CARD.BLACK) ? Constant.TYPE_CARD.BLACK : Constant.TYPE_CARD.RED;
        var afterName = (type == Constant.TYPE_CARD.RED) ? "a" : "";
        var cardName = id.substring(0,1) + afterName;
        var spriteFrame = cc.Global.CardAtlas.getSpriteFrame(cardName);
        if (spriteFrame) {
            return spriteFrame;
        }
    }
    return null;
}
cc.Global.countCardAmount = function (arr) {
    var a = [], b = [], prev;
    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }
    
    return [a, b];
}