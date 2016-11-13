var Constant = require("Constant");
var STATE = Constant.STATE;
var TYPE = Constant.TYPE;
cc.Class({
    extends: cc.Component,

    properties: {
        picHide:cc.SpriteFrame,
        picBlank:cc.SpriteFrame,
        picBody:cc.SpriteFrame,
        picHead:cc.SpriteFrame,
        _state:STATE.HIDE,
        state:{
            set(value){
                if(value === STATE.HIDE){
                    this.getComponent(cc.Sprite).spriteFrame = this.picHide;
                }
                if(value === STATE.SHOW){
                    this.showType();
                }
            },
            get(){
                return this._state;
            },
        },
        type:TYPE.BLANK
    },

    // use this for initialization
    onLoad: function () {

    },

    showType(){
        switch(this.type){
            case TYPE.BLANK:
                this.getComponent(cc.Sprite).spriteFrame = this.picBlank;
                break;
            case TYPE.BODY:
                this.getComponent(cc.Sprite).spriteFrame = this.picBody;
                break;
            case TYPE.HEAD:
                this.getComponent(cc.Sprite).spriteFrame = this.picHead;
                break;
        }
    }
});
