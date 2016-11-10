cc.Class({
    extends: cc.Component,

    properties: {
        label:cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        let self = this;
        app.socket.on('selectRoom',function(msg){
            self.label.string += "\n"+msg["playerName"]+"selected"+msg["roomId"];
        });
    },

    onBtn1(){
        app.socket.emit('selectRoom','room1');
        app.roomSocket = io.connect("127.0.0.1:3000/room1");
        cc.director.loadScene("Game");
    },

    onBtn2(){
        app.socket.emit('selectRoom','room2');
        app.roomSocket = io.connect("127.0.0.1:3000/room2");
        cc.director.loadScene("Game");
    },

    onBtn3(){
        app.socket.emit('selectRoom','room3');
        app.roomSocket = io.connect("127.0.0.1:3000/room3");
        cc.director.loadScene("Game");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});