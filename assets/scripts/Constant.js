var TYPE = cc.Enum({
    BLANK:0,
    BODY:1,
    HEAD:2
});
var STATE = cc.Enum({
    HIDE:0,
    SHOW:1
});
const PLACE = cc.Enum({
    HOME:47,
    VISITING:-47
});
module.exports = {
    TYPE:TYPE,
    STATE:STATE,
    PLACE:PLACE
};
