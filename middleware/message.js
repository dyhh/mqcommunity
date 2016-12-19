var sequelize = require('../model').sequelize;

module.exports = {
  getUnreadMessages: function(req, res, next){

    if(!req.session.username){
      req.session.unreadmess = {
        length: 0
      }
      next();
      return;
    }
    if(!req.session.unreadmess || req.session.unreadmess.expire < new Date().getTime()){
      sequelize.query(`SELECT count(*) from messages where toname = "${req.session.username}" and ifreaded = "0" `,
        { type: sequelize.QueryTypes.SELECT }).then((results)=>{
          req.session.unreadmess = {
            length: results[0]['count(*)'],
            expire: new Date().getTime()+1000*2
          };
          next();
        });
    } else {
      next();
    }

  }
}
