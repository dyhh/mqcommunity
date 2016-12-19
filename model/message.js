var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define("message", {
    content: DataTypes.STRING,//消息的内容
    ifreaded:DataTypes.BOOLEAN, //消失是否被读，已读为true
    toname: DataTypes.STRING,//被回复消息的用户名
    replyer:DataTypes.STRING,//消息来源的用户名
    parentid : DataTypes.INTEGER, //匹配消息的父id
    pparentid : DataTypes.INTEGER //匹配消息的根元素id
  });
}
