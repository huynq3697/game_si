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
                    break;
                case Constant.TYPE_WIN.MOT_DOI:
                    player_win = this.checkWinMotDoi(list_win_player);
                    break;
                case Constant.TYPE_WIN.HAI_DOI:
                    player_win = this.checkWinHaiDoi(list_win_player);
                    break;
                case Constant.TYPE_WIN.BA_CON:
                    player_win = this.checkWin_BaCon_BonCon_MunXau(list_win_player);
                    break;
                case Constant.TYPE_WIN.MUN_XAU:
                    player_win = this.checkWin_BaCon_BonCon_MunXau(list_win_player);
                    break;
                case Constant.TYPE_WIN.BON_CON:
                    player_win = this.checkWin_BaCon_BonCon_MunXau(list_win_player);
                    break;
                default:
                    break;
            }
            if (player_win) {
                player_win.isWin = true;
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
                max_win = max_win_arr;
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
                max_win = number_win;
                list_win_player = [listPlayer[i]];
            } else if (number_win == max_win) {
                list_win_player.push(listPlayer[i]);
            }
        }
        if (list_win_player.length == 1) {
            return list_win_player[0];
        } else {
            var listCardId1 = list_win_player[0].listCardId;
            var listCardId2 = list_win_player[1].listCardId;
            var data = Utils.Set.compare(listCardId1, listCardId2);
            if (data.diff12.length == 0 && data.diff21.length == 0) {
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
            winArr.splice(index_min_amount_win_arr, 1);
            var max_win_arr = Math.max.apply( Math, winArr );
            if (max_win_arr > max_win) {
                max_win = max_win_arr;
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

            var redDouble = Number(String(max_win) + String(Constant.TYPE_CARD.RED));
            if (!Utils.Array.isUnique(listCardId1, redDouble)) {
                if (list_win_player[0].listCardId.indexOf(redDouble) !== -1) {
                    return list_win_player[0];
                }
                return list_win_player[1];
            } else {
                var data = Utils.Set.compare(listCardId1, listCardId2);
                if (data.diff12.length == 0 && data.diff21.length == 0) {
                    return null;
                }

                var amountWinArr1 = cc.Global.countCardAmount(list_win_player[0].listCard)[1];
                var amountWinArr2 = cc.Global.countCardAmount(list_win_player[1].listCard)[1];
                var index_min_amount_win_arr1 = amountWinArr1.indexOf(1);
                var index_min_amount_win_arr2 = amountWinArr2.indexOf(1);
                var winArr1 = cc.Global.countCardAmount(list_win_player[0].listCard)[0];
                var winArr2 = cc.Global.countCardAmount(list_win_player[1].listCard)[0];
                var number_win_arr1 = winArr1[index_min_amount_win_arr1];
                var number_win_arr2 = winArr2[index_min_amount_win_arr2];
  
                if (Utils.Array.unique(listCardId1).length == 5) {
                    if (data.diff12.length == 1 && data.diff21.length == 1) {
                        if (number_win_arr1 > number_win_arr2) {
                            return list_win_player[0];
                        }
                        return list_win_player[1];
                    } else {
                        var index_bo_2_player_1 = (max_win == winArr1[amountWinArr1.indexOf(2)]) ? amountWinArr1.lastIndexOf(2) : amountWinArr1.indexOf(2);
                        var index_bo_2_player_2 = (max_win == winArr2[amountWinArr2.indexOf(2)]) ? amountWinArr2.lastIndexOf(2) : amountWinArr2.indexOf(2);
                        var max_bo_2_player_1 = winArr1[index_bo_2_player_1];
                        var max_bo_2_player_2 = winArr2[index_bo_2_player_2];
                        if (max_bo_2_player_1 > max_bo_2_player_2) {
                            return list_win_player[0];
                        } else {
                            return list_win_player[1];
                        }
                    }
                }

                if (Utils.Array.unique(listCardId1).length == 4) {
                    if (listCardId1.indexOf(10) !== -1 && listCardId2.indexOf(10) !== -1 && 
                    !Utils.Array.isUnique(listCardId1, 10) && !Utils.Array.isUnique(listCardId2, 10)) {
                        if (number_win_arr1 > number_win_arr2) {
                            return list_win_player[0];
                        }
                        return list_win_player[1];
                    } else {
                        winArr1.splice(index_min_amount_win_arr1, 1);
                        winArr2.splice(index_min_amount_win_arr2, 1);

                        var number_max1 = 0;
                        var number_max2 = 0;
                        for (var i = 0; i < winArr1.length; i++) {
                            if (winArr1[i] > number_max1 && winArr1[i] !== max_win) {
                                number_max1 = winArr1[i];
                            }
                        }
                        for (var i = 0; i < winArr2.length; i++) {
                            if (winArr2[i] > number_max2 && winArr2[i] !== max_win) {
                                number_max2 = winArr2[i];
                            }
                        }
                        if (number_max1 > number_max2) {
                            return list_win_player[0];
                        } else if (number_max1 < number_max2) {
                            return list_win_player[1];
                        } else {
                            redDouble1 = Number(String(number_max1) + String(Constant.TYPE_CARD.RED));
                            if (list_win_player[0].listCardId.indexOf(redDouble1) !== -1) {
                                return list_win_player[0];
                            } else {
                                return list_win_player[1];
                            }
                        }
                    }
                }
            }
            
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
    },

    checkDiTien (listPlayer, round) {
        if (round > Constant.ROUND.ROUND_2) {
            var max = 1;
            var listPlayerDiTien = [];
            var listCardNewTurn = [];

            for (var i = 0; i < listPlayer.length; i++) {
                listCardNewTurn.push(listPlayer[i].newCardId);
                if (listPlayer[i].listCardDiTien.length > max) {
                    max = listPlayer[i].listCardDiTien.length;
                    listPlayerDiTien = [listPlayer[i]];
                } else if (listPlayer[i].listCardDiTien.length == max) {
                    listPlayerDiTien.push(listPlayer[i]);
                }
            }

            if (listPlayerDiTien.length == 1) {
                return listPlayerDiTien[0];
            } else {
                var max_number_card = Math.max.apply( Math, listCardNewTurn );
                var amount_max_number_card = Utils.Array.getAmount(listCardNewTurn, max_number_card);
                if (max == 1) {
                    if (max_number_card == Constant.QUAN.TOT) {
                        for (var i = 0; i < listPlayer.length; i++) {
                            if (listPlayer[i].sttBoc == Constant.STT_BOC.BOC_DAU) {
                                return listPlayer[i];
                            }
                        }
                    } else if (amount_max_number_card == 1) {
                        var index_max_number_card = listCardNewTurn.indexOf(max_number_card);
                        return listPlayer[index_max_number_card];
                    } else {
                        var index_player1 = listCardNewTurn.indexOf(max_number_card);
                        var index_player2 = listCardNewTurn.lastIndexOf(max_number_card);
                        var player1 = listPlayer[index_player1];
                        var player2 = listPlayer[index_player2];
                        if (player1.sttBoc < player2.sttBoc) {
                            return player1;
                        } else {
                            return player2;
                        }
                    }
                } else  {
                    var max_bo = 1;
                    var list_player_max_bo = [];
                    for (var i = 0; i < listPlayerDiTien.length; i++) {
                        if (listPlayerDiTien[i].newCard > max_bo) {
                            max_bo = listPlayerDiTien[i].newCard;
                            list_player_max_bo = [listPlayerDiTien[i]];
                        } else if (listPlayerDiTien[i].newCard == max_bo) {
                            list_player_max_bo.push(listPlayerDiTien[i]);
                        }
                    }
                    if (max == 2) {
                        if (list_player_max_bo.length == 1) {
                            return list_player_max_bo[0];
                        } else {
                            var player1 = listPlayer[0];
                            var player2 = listPlayer[1];
                            if (max_bo == Constant.QUAN.TOT) {
                                if (player1.sttBoc < player2.sttBoc) {
                                    return player1;
                                } else {
                                    return player2;
                                }
                            } else {
                                var amount_1 = Utils.Array.getAmount(player1.listCardId, player1.newCardId);
                                if (amount_1 == 2) {
                                    if (player1.newCardId < player2.newCardId) {
                                        return player2;
                                    } else {
                                        return player1;
                                    }
                                } else {
                                    if (player1.sttBoc < player2.sttBoc) {
                                        return player1;
                                    } else {
                                        return player2;
                                    }
                                }
                            }
                        }
                    } else if (max == 3) {
                        return list_player_max_bo[0];
                    }
                }
            }
        }
        return false;
    },
};

module.exports = GameLogic;
