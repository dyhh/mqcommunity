var Sequelize = require('sequelize');
var sequelize = new Sequelize('mqcommunity', 'root', '123', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

  //导入模型
  var User = sequelize.import(__dirname+'/user');
  var Topic = sequelize.import(__dirname+'/topic');
  var Reply = sequelize.import(__dirname+'/reply');
  var Message = sequelize.import(__dirname+'/message');

   //建立模型关系
  User.hasMany(Topic, {foreignKey:'user_id', targetKey:'id', as:"utopic"});
  User.hasMany(Reply, {foreignKey:'user_id', targetKey:'id', as:'ureply'});
  User.hasMany(Message, {foreignKey:'user_id', targetKey:'id', as:'umessage'});
  Topic.hasMany(Reply, {foreignKey:'topic_id', targetKey:'id', as:'treply'});
  Message.belongsTo(Topic,{as:'Topic',foreignKey:'topic_id'});
  Topic.hasMany(Message, {foreignKey:'topic_id', targetKey:'id', as:'Messages'});




module.exports = {
  User: User,
  Topic: Topic,
  Reply: Reply,
  Message: Message,
  sequelize:sequelize
}

sequelize.sync();
