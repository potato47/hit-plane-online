var PLACE = require("Constant").PLACE;
var App = cc.Class({

    properties: {
        globalSocket:{
            default:{}
        },
        roomSocket:{
            default:{}
        },
        place:{
            type:PLACE,
            default:PLACE.HOME
        },
        playerName:"",
        oppoName:""  //对手姓名
    },

    ctor(){

    }

});

module.exports = App;