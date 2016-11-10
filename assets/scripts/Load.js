var App = require("App");
cc.Class({
    extends: cc.Component,

    properties: {
        nameEditBox:cc.EditBox,
    },

    // use this for initialization
    onLoad: function () {
        window.app = new App();
        app.globalSocket = io.connect("127.0.0.1:3000");
    },

    onBtnStart(){
        app.playerName = this.nameEditBox.string;
        app.globalSocket.emit("login",app.playerName);
        cc.director.loadScene("Menu");
    }
});
