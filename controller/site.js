var moment = require('moment');
var sequelize = require('../model').sequelize;
module.exports = {
  index:function(req, res) {
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    sequelize.query(`SELECT * from topics order by id desc limit 10`,
      { type: sequelize.QueryTypes.SELECT }).then((alltopics)=>{
        alltopics.forEach(function(topic){
          topic.createdAt1 = moment(topic.createdAt).format('YYYY-MM-DD');
        })
        res.render('index', {
          title: '论坛主页',
           username: res.locals.islogin,
           unreadmess: req.session.unreadmess,
           alltopics : alltopics
         });
      })
  },
  home: function(req, res){
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    sequelize.query(`SELECT * from topics order by id desc limit 10`,
      { type: sequelize.QueryTypes.SELECT }).then((alltopics)=>{
        alltopics.forEach(function(topic){
          topic.createdAt1 = moment(topic.createdAt).format('YYYY-MM-DD');
        })
        res.render('home', {
          title: '论坛主页',
           username: res.locals.islogin,
           unreadmess: req.session.unreadmess,
           alltopics : alltopics
         });
      })
  },
  fitness :function(req,res){
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    sequelize.query(`SELECT * from topics where topic_type="健身交流" order by id desc limit 10 `,
      { type: sequelize.QueryTypes.SELECT }).then((allfitnesss)=>{
        allfitnesss.forEach(function(fitness){
          fitness.createdAt1 = moment(fitness.createdAt).format('YYYY-MM-DD');
        })
        res.render('fitness', {
           title: '健身交流',
           username: res.locals.islogin,
           unreadmess: req.session.unreadmess,
           allfitnesss : allfitnesss
         });
      })
  },
  healthy :function(req,res){
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    sequelize.query(`SELECT * from topics where topic_type="营养与健康"  order by id desc limit 10`,
      { type: sequelize.QueryTypes.SELECT }).then((allhealthys)=>{
        allhealthys.forEach(function(healthy){
          healthy.createdAt1 = moment(healthy.createdAt).format('YYYY-MM-DD');
        })
        res.render('healthy', {
           title: '营养与健康',
           username: res.locals.islogin,
           unreadmess: req.session.unreadmess,
           allhealthys : allhealthys
         });
      })
  }

}
