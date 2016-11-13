var Constant = require("Constant");
var STATE = Constant.STATE;
var TYPE = Constant.TYPE;
var PLACE = Constant.PLACE;
cc.Class({
    extends: cc.Component,

    properties: {
        turn:PLACE.HOME,
        colNum:0,
        rowNum:0,
        tiles:[],
        tilesLayout:cc.Node,
        tilePrefab:cc.Prefab,
    },

    // use this for initialization
    onLoad: function () {
        this.tileWidth = this.tilesLayout.width/this.colNum;
         for(let y=0;y<this.rowNum;y++){
            for(let x=0;x<this.colNum;x++){
                let tile = cc.instantiate(this.tilePrefab);
                this.tilesLayout.addChild(tile);                
                tile.width = this.tileWidth;
                tile.height = this.tileWidth;
                tile.position = cc.p(x*this.tileWidth,y*this.tileWidth);
                tile.tag = y*this.colNum + x;
                this.addTouchEvent(tile);
                this.tiles.push(tile);
            }
        }
        let self = this;
        app.homeSocket.on('change turn',function(msg){
            self.turn = -self.turn;
        });
        app.homeSocket.on('click tile',function(msg){
            this.tiles[tag].getComponent("Tile").state = STATE.SHOW;
        });
    },

    addTouchEvent(tile){
        let self = this;
        tile.on('touchend',function(e){
            if(self.turn === app.place && tile.getComponent("Tile").state === STATE.HIDE){
                self.turn = -self.turn;
                tile.getComponent("Tile").state = STATE.SHOW;
                app.homeSocket.emit('change turn');
                app.homeSocket.emit('click tile',tile.tag);
            }
        });
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
