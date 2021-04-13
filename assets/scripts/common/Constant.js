var Constant = {};

Constant.EVENT = {
    ATIVE_HOME: "ATIVE_HOME",
    ATIVE_GAME: "ATIVE_GAME",

    NEW_GAME: "NEW_GAME",
    GAME_START: "GAME_START",
    END_GAME: "END_GAME",
    SHOW_CARD: "SHOW_CARD",
    SET_WIN_PLAYER: "SET_WIN_PLAYER",
};

Constant.TURN = {
    PLAYER_1: 1,
    PLAYER_2: 2,
    PLAYER_3: 3,
    PLAYER_4: 4,
    PLAYER_5: 5,
};

Constant.ROUND = {
    ROUND_1: 1,
    ROUND_2: 2,
    ROUND_3: 3,
    ROUND_4: 4,
    ROUND_5: 5,
};

Constant.ROUND_STATUS = {
    BOC_BAI: 1,
    DI_TIEN: 2,
};

Constant.TYPE_WIN = {
    MOT_CON: 1,   
    MOT_DOI: 2,   
    HAI_DOI: 2.5, 
    BA_CON: 3,    
    MUN_XAU: 3.5, // truong hop 3 con va 1 doi
    BON_CON: 4,   
    NAM_CON: 5,   
};

Constant.STT_BOC = {
    BOC_DAU: 1,   
    BOC_HAI: 2,   
    BOC_BA: 3, 
    BOC_TU: 4, 
    BOC_NAM: 5, 
};

Constant.TYPE_CARD = {
    BLACK: 0,
    RED: 1,
};
module.exports = Constant;