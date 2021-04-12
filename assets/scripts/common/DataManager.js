var Signal = require('Signal');
var UserData = {
    userData : null,    

    removeUserData() {
        cc.sys.localStorage.removeItem('userData');
    },

    saveUserData() {
       // console.log("JSON.stringify(this.userData)   " + JSON.stringify(this.userData));
        cc.sys.localStorage.setItem('userData', JSON.stringify(this.userData));
    },
    getUserData() {
        if(this.userData){
            return this.userData;
        }
        var userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
        if (userData) {
            this.userData = userData;
            return userData;
        }
        else {
            var userData = {
                isSound: false,
                isMusic: false, // nhac nen
                isVibration: false,     
                name: "You",          
                money: 100000,
                chosenTable:0,
                chosenStick:0,
                avatar:0,
                tableActive:[0],
                stickActive:[0],
                freeSpin: { status: true, timestamp: null },
                language: "",
                listPlayer: this.getListPlayer()
            };
            cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
            this.userData = userData;
            return this.userData;
        }
    },

    getListPlayer () {
        var listPlayer = [
            {
                id: 1,
                money: 100000,
                name: "You",
                avatar: 1,
            },
            {
                id: 2,
                money: 200000,
                name: "Teemo",
                avatar: 2,
            },
            {
                id: 3,
                money: 300000,
                name: "Garen",
                avatar: 3,
            },
            {
                id: 4,
                money: 400000,
                name: "Zed",
                avatar: 4,
            },
            {
                id: 5,
                money: 500000,
                name: "Lux",
                avatar: 5,
            },
        ];
        return listPlayer;
    },

    getPlayerById (id) {
        var listPlayer = this.getUserData().listPlayer;
        for (var i = 0; i < listPlayer.length; i++) {
            if (listPlayer[i].id == id) {
                return listPlayer[i];
            }
        }
        return null;
    },

    setPlayer (player) {
        var listPlayer = this.getUserData().listPlayer;
        for (var i = 0; i < listPlayer.length; i++) {
            if (listPlayer[i].id == player.id) {
                listPlayer[i] = player;
                break;
            }
        }
        this.saveUserData(); 
    },

    getUserMoney(){
        return this.getUserData().money;
    },

    addUserMoney(money){
        this.getUserData().money += money;
        this.saveUserData();        
        signalUpdateUserInfo.dispatch();
    },

    getFreeSpin(){
        return this.getUserData().freeSpin;
    },

    setFreeSpin(data){
        this.getUserData().freeSpin = data;
        this.saveUserData();
    },

    getSound(){
        return this.getUserData().isSound;
    },

    setSound(isSound){
        this.getUserData().isSound = isSound;
        this.saveUserData();
    },

    getMusic(){
        return this.getUserData().isMusic;
    },

    setMusic(isMusic){
        this.getUserData().isMusic = isMusic;
        this.saveUserData();
    },

    getLanguage(){
        return this.getUserData().language;
    },

    setLanguage(language){
        this.getUserData().language = language;
        this.saveUserData();
    },

    getUserName(){
        return this.getUserData().name;
    },

    setUserName(name){
        this.getUserData().name = name;
        this.saveUserData();
        
        signalUpdateUserInfo.dispatch();
    },

    getUserAvatar(){
        return this.getUserData().avatar;
    },

    setUserAtavar(index){
        this.getUserData().avatar = index;
        this.saveUserData();
        
        signalUpdateUserInfo.dispatch();
    },

    getCurrentStick(){
        return this.getUserData().chosenStick;
    },

    setCurrentStick(index){
        this.getUserData().chosenStick = index;
        this.saveUserData();
    },

    getStickActive(){
        let stickActive = this.getUserData().stickActive;
        if(!this.getUserData().stickActive){
            this.getUserData().stickActive = [0];
            this.saveUserData();
            return this.getUserData().stickActive;
        }
        return stickActive;
    },
    
    addStickActive(index){
       // console.log("this.getUserData().stickActive   " + JSON.stringify(this.getUserData().stickActive));
        if(!this.getUserData().stickActive){
            this.getUserData().stickActive = [0];            
        }
        this.getUserData().stickActive.push(index);
       // console.log("TEST  " + JSON.stringify(this.getUserData().stickActive));
        this.saveUserData();
       // console.log("this.getUserData().stickActive   " + JSON.stringify(this.getUserData().stickActive));
    },


    getCurrentTable(){
        return this.getUserData().chosenTable;
    },

    setCurrentTable(index){
        this.getUserData().chosenTable = index;
        this.saveUserData();
    },

    getTableActive(){
        let tableActive = this.getUserData().tableActive;
        if(!this.getUserData().tableActive){
            this.getUserData().tableActive = [0];
            this.saveUserData();
            return this.getUserData().tableActive;
        }
        return tableActive;
    },
    
    addTableActive(index){
        if(!this.getUserData().tableActive){
            this.getUserData().tableActive = [0];            
        }
        this.getUserData().tableActive.push(index);
        this.saveUserData();
    },

}


var signalUpdateUserInfo = new Signal.Signal();

var MoneyConfig = {
    DAILY:1000000,
    DAILY_GIFT: [
        500000,1000000,2000000,3000000,4000000
    ],
    ADS:1000000,
}

module.exports = {
    UserData: UserData,
    MoneyConfig: MoneyConfig,
    signalUpdateUserInfo: signalUpdateUserInfo,
}