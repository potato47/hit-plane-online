var Constant = require("Constant");
var PLACE = Constant.PLACE;
cc.Class({
    extends: cc.Component,

    properties: {
        label:cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        let self = this;
        // app.globalSocket.on('selectRoom',function(msg){
        //     self.label.string += "\n"+msg["playerName"]+"selected"+msg["roomId"];
        // });

    },

    onBtn1(){
        app.globalSocket.emit('selectRoom','room1');
        app.roomSocket = io.connect("127.0.0.1:3000/room1");
        app.roomSocket.on('assign place',function(msg){
            if(msg===1){
                app.place = PLACE.HOME;
            }
            if(msg===2){
                app.place = PLACE.VISITING;
            }
            cc.log(app.place);
            cc.director.loadScene("Game");
        });
    },

    onBtn2(){
        app.globalSocket.emit('selectRoom','room2');
        app.roomSocket = io.connect("127.0.0.1:3000/room2");
        cc.director.loadScene("Game");
    },

    onBtn3(){
        app.globalSocket.emit('selectRoom','room3');
        app.roomSocket = io.connect("127.0.0.1:3000/room3");
        cc.director.loadScene("Game");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
