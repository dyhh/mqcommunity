var moment = require('moment');
var sequelize = require('../model').sequelize;
const User = require('../model').User;
const Topic = require('../model').Topic;
const Reply = require('../model').Reply;
const Message = require('../model').Message;
module.exports = {
  showMessage: function(req, res, next){
    User.findOne({
      where: {
        username:req.session.username
      }
    }).then((user)=>{
      if(user){
        user_id = user.id;
        repler = user.username;
      }else{
        return Promise.reject("请先登录！");
      }
    }).then(()=>{
    sequelize.query(`SELECT * from messages where toname = "${req.session.username}" and ifreaded = "0" `,
      { type: sequelize.QueryTypes.SELECT }).then((unreadmess)=>{
        if(unreadmess){
          sequelize.query(
            `SELECT messages.replyer,messages.createdAt,messages.content,messages.id,messages.topic_id,messages.user_id,messages.parentid,messages.pparentid,topics.title from messages,topics where messages.topic_id = topics.id and toname = "${req.session.username}"` ,
            { type: sequelize.QueryTypes.SELECT }).then((mymessages)=> {
            if(mymessages){
              mymessages.forEach(function(mymessage){
                mymessage.createdAt1 = moment(mymessage.createdAt).format('YYYY-MM-DD');
              })
              sequelize.query(  `update messages set ifreaded="1" where ifreaded="0" and toname="${req.session.username}"`,
              {type: sequelize.QueryTypes.update}).then((updatemessages)=>{
                res.render('message' , {
                  title: '我的消息' ,
                  unreadmess:unreadmess,
                  mymessages: mymessages,
                  username : req.session.username
                });
              })
            }else{
              return Promise.reject("当前没有您的消息");
            }
          })
        }
      })
    })
  },
  addmessage: function(req, res, next){
    sequelize.query(`insert into messages values("DEFAULT" ,"${req.body.comment}","0","${req.body.toname}","${req.session.username}","${req.body.parentid}","${req.body.pparentid}", "${moment().format('YYYY-MM-DD HH:mm:SS')}", "${moment().format('YYYY-MM-DD HH:mm:SS')}","${user_id}","${req.body.topic_id}")`,
      { type: sequelize.QueryTypes.INSERT }).then((message)=> {
        sequelize.query(`insert into replies values("DEFAULT","${req.body.comment}","${req.session.username}","${req.body.parentid}","${req.body.pparentid}","${moment().format('YYYY-MM-DD HH:mm:SS')}","${moment().format('YYYY-MM-DD HH:mm:SS')}","${user_id}","${req.body.topic_id}")`,
        { type:sequelize.QueryTypes.INSERT}).then((newreply)=>{
            res.redirect('/message');
        })
    }).catch((err)=>{
      res.redirect('/message');
    })
  }
}
