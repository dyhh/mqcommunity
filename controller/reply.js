var moment = require('moment');
var Sequelize = require('sequelize');
const User = require('../model').User;
const Topic = require('../model').Topic;
const Reply = require('../model').Reply;
const Message = require('../model').Message;
module.exports = {
  addreply: function(req, res, next){
    if(!req.params.id){
      next('该文章不存在或已被删除.');
      return;
    }

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
      return   Reply.build({
          "content": req.body.comment,
          "topic_id":req.params.id,
          "parentid":req.body.parentid,
          "pparentid":req.body.pparentid,
          "user_id": user_id,
          "replyer": repler
        }).save();
    }).then((reply)=>{
      if(reply.pparentid == null){
          reply.pparentid = reply.id;
          reply.save();
      }
      return  Message.build({
        "content": req.body.comment,
        "topic_id":req.params.id,
        "toname":req.body.toname,
        "user_id":req.body.toid,
        "replyer":reply.replyer,
        "parentid":req.body.parentid,
        "pparentid":req.body.pparentid,
        "ifreaded":'0'
      }).save();


      }).then((message)=>{
        if(message.pparentid == null){
            message.pparentid = message.id;
            message.save();
        }
          res.redirect( req.params.id);
      }).catch((err)=>{
      console.log(err);
       res.render('showtopic', {
        title: 'test' ,
        err:err
      });
    });
  },
  deletereply: function(req, res, next){
    Reply.findOne({
      where: {
        id:req.params.id
      }
    }).then((comment)=>{
      topicid = comment.topic_id;
      if(comment.parentid == null){
        Reply.findAll({
          where:{
            pparentid:comment.pparentid
          }
        }).then((comments)=>{
          comments.forEach(function(commentone){
            replyid = commentone.id;
            Reply.destroy({
              where :{
                  id : replyid
              }
            })
            Message.destroy({
              where :{
                  id : replyid
              }
            })
          })
        })
      }else{
        Reply.destroy({
          where :{
            id: comment.id
          }
        })
        Message.destroy({
          where :{
            id: comment.id
          }
        })
      }
     res.redirect('/showtopic/' + topicid);
    }).catch((err)=>{
      console.log(err);
      res.redirect('/showtopic/' + topicid);
    })
  }
}
