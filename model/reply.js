
var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define("reply", {
    content: DataTypes.STRING,
    replyer: DataTypes.STRING,
    parentid : DataTypes.INTEGER,
    pparentid : DataTypes.INTEGER
  });
}
