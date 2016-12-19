var moment = require('moment');
var sequelize = require('../model').sequelize;
const User = require('../model').User;
const Topic = require('../model').Topic;
const Reply = require('../model').Reply;
const Message = require('../model').Message;
module.exports = {
  showTopic: function(req, res, next) {
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }

    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    if(!req.params.id){
      next('该文章不存在或已被删除.');
      return;
    }

    Topic.findOne({
        where:{
          id : req.params.id
        }
    }).then((topic)=>{
      if(topic){
        user_id = topic.user_id;
        topicid = topic.id;
        User.findOne({
            where:{
              id: user_id
            }
        }).then((author)=>{
          Reply.findAll({
            where :{
              topic_id : topicid
            }
          }).then((replies)=>{
            topic.updatedAt1 = moment(topic.updatedAt).format('YYYY-MM-DD');
            id = topic.id;
            replies.forEach(function(reply){
              reply.createdAt1 = moment(reply.createdAt).format('YYYY-MM-DD');
            })
            sequelize.query(`SELECT * from messages where toname = "${req.session.username}" and ifreaded = "0" `,
            { type: sequelize.QueryTypes.SELECT }).then((unreadmess)=>{
                res.render('showtopic' , {
                  title: topic.title ,
                  author : author,
                  topic : topic,
                  replies: replies,
                  username : req.session.username,
                  unreadmess : unreadmess
                });
          })
          })
        })
    }
      else{
        return Promise.reject("该文章不存在或已被删除！");
      }
    }).catch(next);

  }
  ,addtopic: function(req, res, next) {
    User.findOne({
      where: {
        username:req.session.username
      }
    }).then((user)=>{
      if(user){
        user_id = user.id;
      }else{
        return Promise.reject("请先登录！");
      }
    }).then(()=>{
      return   Topic.build({
          "title": req.body.title,
          "brief": req.body.brief,
          "content": req.body.content,
          "topic_type":req.body.topic_type,
          "user_id":user_id,
          "author":req.session.username
        }).save();
    }).then((topic)=>{
        res.redirect('showtopic/' + topic.id);
    }).catch((err)=>{
      res.render('addtopic', {
        title: '写文章' ,
        err:err
      });
    });

  },
  showAddtopic: function(req, res, next){
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }

    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }

    if(!req.session.username){
      next('need login.');
      return;
    }
    User.findOne({
      where: {
        username: req.session.username
      }
    }).then((user)=>{
      if(user){
        sequelize.query(`SELECT * from messages where toname = "${req.session.username}" and ifreaded = "0" `,
        { type: sequelize.QueryTypes.SELECT }).then((unreadmess)=>{
        res.render('addtopic', {
          title: '写文章' ,
          username : req.session.username,
          unreadmess : unreadmess,
          err: null
        });
      })
      } else {
        return Promise.reject("请先登录！");
      }
    })
    .catch((err)=>{
      next('need login.')
    })
  },
  showEdittopic:function(req, res, next){
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }

    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }

    if(!req.session.username){
      next('need login.');
      return;
    }
    Topic.findOne({
        where:{
          id : req.params.id
        }
    }).then((topic)=>{
      if(topic){
        id = topic.id;
        sequelize.query(`SELECT * from messages where toname = "${req.session.username}" and ifreaded = "0" `,
        { type: sequelize.QueryTypes.SELECT }).then((unreadmess)=>{
        res.render('edittopic', {
          title: topic.title ,
          username : req.session.username,
          topic : topic,
          unreadmess : unreadmess,
          err: null
        });
      })
      }else {
        return Promise.reject("请先登录！");
      }
    }).catch((err)=>{
      console.log(err);
      next('need login.')
    })
  },
  edittopic:function(req, res, next){
    Topic.findOne({
      where: {
        id:req.params.id
      }
    }).then((topic)=>{
      if(topic){
        topic.topic_type = req.body.topic_type;
        topic.title = req.body.title;
        topic.content = req.body.content;
        return topic.save();
      }else{
        return Promise.reject({'user':'该文章不存在或已被删除'});
      }
    }).then((topic)=>{
      res.redirect('/showtopic/' + topic.id);
    }).catch((err)=>{
        res.render('edittopic', {
        title: topic.title ,
        username: req.session.username,
        err:err
      });
    });
  },
  deletetopic:function(req, res, err){
    Topic.findOne({
      where: {
        id:req.params.id
      }
    }).then((topic)=>{
      if(topic){
        topicid = topic.id;
        Reply.findAll({
          where:{
            topic_id : topicid
          }
        }).then((topicreplies)=>{
          if(topicreplies){
            topicreplies.forEach(function(topicreply){
              replyid = topicreply.id;
              Reply.destroy({
                where :{
                    id : replyid
                }
              })
            })
          }
        }).then(()=>{
          Topic.destroy({
              where :{
                  id : topicid
              }
          })
          res.redirect('/personal');
        })
      }else{
        return Promise.reject('该文章已删除或不存在');
      }
    }).catch((err)=>{
      console.log(err);
  })
 }
}
