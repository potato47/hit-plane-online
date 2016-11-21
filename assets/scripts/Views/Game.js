let Constant = require("Constant");
const STATE = Constant.STATE;
const TYPE = Constant.TYPE;
const PLACE = Constant.PLACE;
const GAME_STATE = cc.Enum({

});
cc.Class({
    extends: cc.Component,

    properties: {
        colNum: 0,
        rowNum: 0,
        tiles: [],
        tilesLayout: cc.Node,
        tilePrefab: cc.Prefab,
    },

    // use this for initialization
    onLoad: function() {
        this.turn = PLACE.HOME;
        this.tileWidth = this.tilesLayout.width / this.colNum;
        for (let y = 0; y < this.rowNum; y++) {
            for (let x = 0; x < this.colNum; x++) {
                let tile = cc.instantiate(this.tilePrefab);
                this.tilesLayout.addChild(tile);
                tile.width = this.tileWidth;
                tile.height = this.tileWidth;
                tile.position = cc.p(x * this.tileWidth, y * this.tileWidth);
                tile.tag = y * this.colNum + x;
                this.addTouchEvent(tile);
                this.tiles.push(tile);
            }
        }
        let self = this;
        app.roomSocket.on('click tile', function(data) {
            self.clickTile(data.place, self.tiles[data.tileTag]);
        });
        this.initPlanePos();
    },

    initPlanePos() {
        this.tiles[84].getComponent("Tile").type = TYPE.HEAD;
        this.tiles[53].getComponent("Tile").type = TYPE.BODY;
        this.tiles[54].getComponent("Tile").type = TYPE.BODY;
        this.tiles[55].getComponent("Tile").type = TYPE.BODY;
        this.tiles[64].getComponent("Tile").type = TYPE.BODY;
        this.tiles[72].getComponent("Tile").type = TYPE.BODY;
        this.tiles[73].getComponent("Tile").type = TYPE.BODY;
        this.tiles[74].getComponent("Tile").type = TYPE.BODY;
        this.tiles[75].getComponent("Tile").type = TYPE.BODY;
        this.tiles[76].getComponent("Tile").type = TYPE.BODY;
    },

    addTouchEvent(tile) {
        let self = this;
        tile.on('touchend', function(e) {
            if (self.turn === app.place && tile.getComponent("Tile").state === STATE.HIDE) {
                self.clickTile(app.place, tile);
                app.roomSocket.emit("others", {
                    type: 'click tile',
                    data: {
                        place: app.place,
                        tileTag: tile.tag,
                    }
                });
            }
        });
    },

    clickTile(place, tile) {
        tile.getComponent("Tile").state = STATE.SHOW;
        if (tile.getComponent("Tile").type === TYPE.BLANK) {
            cc.log(place + " hit nothing--||\nnow is " + (-place) + " turn");
        } else if (tile.getComponent("Tile").type === TYPE.BODY) {
            cc.log(place + " hit the plane body!!!\nnow is " + (-place) + " turn");
        } else if (tile.getComponent("Tile").type === TYPE.HEAD) {
            cc.log(place + " win!!!");
        }
        this.turn = -this.turn;
        cc.log(app.place + ":" + this.turn);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});