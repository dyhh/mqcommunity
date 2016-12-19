
var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define("user", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    truename: DataTypes.STRING,//真实姓名
    company:DataTypes.STRING, //所在公司
    position: DataTypes.STRING,//公司职位
    introduce: DataTypes.TEXT,//个人简介
    personalcharacter:DataTypes.STRING,//个性签名
    qq: DataTypes.STRING

  });
}
