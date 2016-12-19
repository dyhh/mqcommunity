var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define("topic", {
    title: DataTypes.STRING,
    brief: DataTypes.STRING,
    content: DataTypes.TEXT,
    reply_count: DataTypes.INTEGER,
    visit_count: DataTypes.INTEGER,
    topic_type:DataTypes.STRING,
    author:DataTypes.STRING
  });

}
