var Constant = {};

Constant.EVENT = {
    ATIVE_HOME: "ATIVE_HOME",
    ATIVE_GAME: "ATIVE_GAME",

    NEW_GAME: "NEW_GAME",
    GAME_START: "GAME_START",
    END_GAME: "END_GAME",
    SHOW_CARD: "SHOW_CARD",
};

Constant.TURN = {
    PLAYER_1: 1,
    PLAYER_2: 2,
    PLAYER_3: 3,
    PLAYER_4: 4,
    PLAYER_5: 5,
};

Constant.POINT = {
    TOT: 1,
    MA_DEN: 2,
    MA_DO: 3,
    PHAO_DEN: 4,
    PHAO_DO: 5,
    XE_DEN: 6,
    XE_DO: 7,
    TUONG_DEN: 8,
    TUONG_DO: 9,
    SY_DEN: 10,
    SY_DO: 11,
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

Constant.TYPE_CARD = {
    BLACK: 0,
    RED: 1,
};
module.exports = Constant;