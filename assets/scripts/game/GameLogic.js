var Constant = require("Constant");
var Utils = require("Utils");
var GameLogic = {
    endGame (listPlayer) {
        var type_win = Constant.TYPE_WIN.MOT_CON;
        var list_win_player = [];
        for (var i = 0; i < listPlayer.length; i++) {
            var winArr = cc.Global.countCardAmount(listPlayer[i].listCard)[1];
            var type;
            var max_win = Math.max.apply( Math, winArr );
            switch (winArr.length) {
                case 1:
                    type = Constant.TYPE_WIN.NAM_CON;
                    break;
                case 4:
                    type = Constant.TYPE_WIN.MOT_DOI;
                    break;
                case 5:
                    type = Constant.TYPE_WIN.MOT_CON;
                    break;
                case 2:
                    if (max_win == 4) {
                        type = Constant.TYPE_WIN.BON_CON;
                    } else {
                        type = Constant.TYPE_WIN.MUN_XAU;
                    }
                    break;
                case 3:
                    if (max_win == 3) {
                        type = Constant.TYPE_WIN.BA_CON;
                    } else {
                        type = Constant.TYPE_WIN.HAI_DOI;
                    }
                    break;
                default:
                    break;
            }

            // var typeWinArr = Object.values(Constant.TYPE_WIN);
            if (type > type_win) {
                type_win = type;
                list_win_player = [listPlayer[i]];
            } else if (type == type_win) {
                list_win_player.push(listPlayer[i]);
            }
        }

        if (list_win_player.length == 1) {
            list_win_player[0].isWin = true;
        } else {
            var player_win = list_win_player[0];
            switch (type_win) {
                case Constant.TYPE_WIN.MOT_CON:
                    player_win = this.checkWinMotCon(list_win_player);
                    if (player_win) {
                        player_win.isWin = true;
                    }
                    break;
                case Constant.TYPE_WIN.MOT_DOI:
                    player_win = this.checkWinMotDoi(list_win_player);
                    if (player_win) {
                        player_win.isWin = true;
                    }
                    break;
                case Constant.TYPE_WIN.HAI_DOI:
                    player_win = this.checkWinHaiDoi(list_win_player);
                    player_win.isWin = true;
                    break;
                case Constant.TYPE_WIN.BA_CON:
                    player_win = this.checkWin_BaCon_BonCon_MunXau(list_win_player);
                    player_win.isWin = true;
                    break;
                case Constant.TYPE_WIN.MUN_XAU:
                    player_win = this.checkWin_BaCon_BonCon_MunXau(list_win_player);
                    player_win.isWin = true;
                    break;
                case Constant.TYPE_WIN.BON_CON:
                    player_win = this.checkWin_BaCon_BonCon_MunXau(list_win_player);
                    player_win.isWin = true;
                    break;
                default:
                    break;
            }
        }
        return listPlayer;
    },

    checkWinMotCon (listPlayer) {
        var max_win = 1;
        var list_win_player = [];
        for (var i = 0; i < listPlayer.length; i++) {
            var winArr = cc.Global.countCardAmount(listPlayer[i].listCardId)[0];
            var max_win_arr = Math.max.apply( Math, winArr );
            if (max_win_arr > max_win) {
                list_win_player = [listPlayer[i]];
            } else if (max_win_arr == max_win) {
                list_win_player.push(listPlayer[i]);
            }
        }
        if (list_win_player.length == 1) {
            return list_win_player[0];
        } else {
            var listCardId1 = list_win_player[0].listCardId;
            var listCardId2 = list_win_player[1].listCardId;
            var data = Utils.Set.compare(listCardId1, listCardId2);
            if (data.diff12.length == 0 || data.diff21.length == 0) {
                return null;
            } else {
                var max_number_1 = Math.max.apply( Math, data.diff12 );
                var max_number_2 = Math.max.apply( Math, data.diff21 );
                if (max_number_1 > max_number_2) {
                    return list_win_player[0];
                } else {
                    return list_win_player[1];
                }
            }
        }
    },
    checkWinMotDoi (listPlayer) {
        var max_win = 1;
        var list_win_player = [];
        for (var i = 0; i < listPlayer.length; i++) {
            var amountWinArr = cc.Global.countCardAmount(listPlayer[i].listCard)[1];
            var max_amount_win_arr = Math.max.apply( Math, amountWinArr );
            var index_max_amount_win_arr = amountWinArr.indexOf(max_amount_win_arr);
            var winArr = cc.Global.countCardAmount(listPlayer[i].listCard)[0];
            var number_win = winArr[index_max_amount_win_arr];
            if (number_win > max_win) {
                list_win_player = [listPlayer[i]];
            } else if (max_win_arr == max_win) {
                list_win_player.push(listPlayer[i]);
            }
        }
        if (list_win_player.length == 1) {
            return list_win_player[0];
        } else {
            var listCardId1 = list_win_player[0].listCardId;
            var listCardId2 = list_win_player[1].listCardId;
            var data = Utils.Set.compare(listCardId1, listCardId2);
            if (data.diff12.length == 0 || data.diff21.length == 0) {
                return null;
            } else {
                var max_number_1 = Math.max.apply( Math, data.diff12 );
                var max_number_2 = Math.max.apply( Math, data.diff21 );
                if (max_number_1 > max_number_2) {
                    return list_win_player[0];
                } else {
                    return list_win_player[1];
                }
            }
        }
    },
    checkWinHaiDoi (listPlayer) {
        var max_win = 1;
        var list_win_player = [];
        for (var i = 0; i < listPlayer.length; i++) {
            var amountWinArr = cc.Global.countCardAmount(listPlayer[i].listCard)[1];
            var index_min_amount_win_arr = amountWinArr.indexOf(1);
            var winArr = cc.Global.countCardAmount(listPlayer[i].listCard)[0];
            winArr = winArr.splice(index_min_amount_win_arr, 1);
            var max_win_arr = Math.max.apply( Math, winArr );
            if (max_win_arr > max_win) {
                list_win_player = [listPlayer[i]];
            } else if (max_win_arr == max_win) {
                list_win_player.push(listPlayer[i]);
            }
        }

        if (list_win_player.length == 1) {
            return list_win_player[0];
        } else {
            var redDouble = Number(String(max_win) + String(Constant.TYPE_CARD.RED));
            if (list_win_player[0].listCardId.indexOf(redDouble) !== -1) {
                return list_win_player[0];
            }
            return list_win_player[1];
        }
    },
    checkWin_BaCon_BonCon_MunXau (listWinPlayer) {
        var max_win = 1;
        var player_win;
        for (var i = 0; i < listWinPlayer.length; i++) {
            var amountWinArr = cc.Global.countCardAmount(listWinPlayer[i].listCard)[1];
            var max_amount_win_arr = Math.max.apply( Math, amountWinArr );
            var index_max_amount_win_arr = amountWinArr.indexOf(max_amount_win_arr);
            var winArr = cc.Global.countCardAmount(listWinPlayer[i].listCard)[0];
            var number_win = winArr[index_max_amount_win_arr];
            if (number_win > max_win) {
                max_win = number_win;
                player_win = listWinPlayer[i];
            }
        }
        return player_win;
    }
};

module.exports = GameLogic;
