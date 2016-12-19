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
  App :function(req,res){
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    sequelize.query(`SELECT * from topics where topic_type="移动端测试" order by id desc limit 10 `,
      { type: sequelize.QueryTypes.SELECT }).then((allapptopics)=>{
        allapptopics.forEach(function(apptopic){
          apptopic.createdAt1 = moment(apptopic.createdAt).format('YYYY-MM-DD');
        })
        res.render('App', {
           title: '移动端性能测试',
           username: res.locals.islogin,
           unreadmess: req.session.unreadmess,
           allapptopics : allapptopics
         });
      })
  },
  Performance :function(req,res){
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    sequelize.query(`SELECT * from topics where topic_type="性能测试"  order by id desc limit 10`,
      { type: sequelize.QueryTypes.SELECT }).then((allperformancetopics)=>{
        allperformancetopics.forEach(function(performancetopic){
          performancetopic.createdAt1 = moment(performancetopic.createdAt).format('YYYY-MM-DD');
        })
        res.render('Performance', {
           title: '性能测试',
           username: res.locals.islogin,
           unreadmess: req.session.unreadmess,
           allperformancetopics : allperformancetopics
         });
      })
  },
  Examples :function(req,res){
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    sequelize.query(`SELECT * from topics where topic_type="案例分享"  order by id desc limit 10`,
      { type: sequelize.QueryTypes.SELECT }).then((allexamples)=>{
        allexamples.forEach(function(example){
          example.createdAt1 = moment(example.createdAt).format('YYYY-MM-DD');
        })
        res.render('Examples', {
           title: '案例分享',
           username: res.locals.islogin,
           unreadmess: req.session.unreadmess,
           allexamples : allexamples
         });
      })
  },

}
