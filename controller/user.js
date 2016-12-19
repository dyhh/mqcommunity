var authMiddleware = require('../middleware/auth');
var moment = require('moment');
var sequelize = require('../model').sequelize;
const User = require('../model').User;
const Topic = require('../model').Topic;
const Reply = require('../model').Reply;
const Message = require('../model').Message;
var util = require('utility');

module.exports = {
  register: function(req, res, next) {
      User.findOne({
        where: {
          email:req.body.email
        }
      }).then((data)=>{
        if(data){
          return Promise.reject({'email':'该邮箱已经注册'});
          //res.redirect('/reg');
        }
      }).then(()=>{
        return User.findOne({
          where: {
            username:req.body.username
          }
        })
      }).then((data)=>{
        if(data){
          return Promise.reject({'username':'该用户名已经注册'});
        //  res.redirect('/reg');
        }
      }).then(()=>{
        return   User.build({
            "username": req.body.username,
            "password": util.md5(req.body.password1),
            "email":req.body.email
          }).save();
      }).then((user)=>{
        authMiddleware.login(user,req, res);
        res.redirect('/home');

      }).catch((err)=>{
        res.render('reg', {
          title: '用户注册' ,
          err:err
        });
      });
    },
  showRegister: function(req, res){
      res.render('reg',{title:'用户注册',err:null});
  },
  showPersonal: function(req, res, next) {
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
        user.createdAt1 = moment(user.createAt).format('YYYY-MM-DD');
        userid = user.id;
        Topic.findAll({
            order: 'id DESC' ,
            where: {
              user_id : userid
            }
        }).then((topics)=>{
          if(topics){
            topics.forEach(function(topic){
              topic.createdAt1 = moment(topic.createAt).format('YYYY-MM-DD');
            })
            Reply.findAll({
              order: 'id DESC' ,
              where: {
                user_id : userid
              }
            }).then((myreplies)=>{
              myreplies.forEach(function(myreply){
                myreply.createdAt1 = moment(myreply.createdAt1).format('YYYY-MM-DD');
              })
              sequelize.query(`SELECT * from messages where toname = "${req.session.username}" and ifreaded = "0" `,
              { type: sequelize.QueryTypes.SELECT }).then((unreadmess)=>{
                res.render('personal', {
                  title: '个人信息页' ,
                  username : req.session.username,
                  user : user,
                  topics : topics,
                  myreplies : myreplies,
                  unreadmess : unreadmess,
                });
              })
            })
          }
        })
      } else {
        return Promise.reject("请先登录！");
      }
    })
    .catch((err)=>{
      next('need login.')
    })
  },
  showEditpersonal: function(req, res, next) {
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
        res.render('editpersonal', {
          title: '修改个人信息' ,
          username : req.session.username,
          user : user,
          unreadmess : unreadmess,
          err: null
        });
      })
      } else {
        return Promise.reject("请先登录！");
      }
    }).catch((err)=>{
      next('need login.')
    })
  },
  editpersonal: function(req, res, next){
    User.findOne({
      where: {
        username:req.session.username
      }
    }).then((user)=>{
      if(user){
        user.truename = req.body.truename;
        user.phone = req.body.phone;
        user.company = req.body.company;
        user.position = req.body.position;
        user.introduce = req.body.introduce;
        user.personalcharacter = req.body.personalcharacter;
        user.qq = req.body.qq;
        return user.save();
      }else{
          return Promise.reject({'user':'该用户不存在'});
      }
    }).then(()=>{
      res.redirect('/personal');
    }).catch((err)=>{
        res.render('editpersonal', {
        title: '修改个人信息' ,
        err:err
      });
    });

  },
  showEditpassword: function(req, res, next) {
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
        res.render('editpassword', {
          title: '修改密码' ,
          username : req.session.username,
          unreadmess :unreadmess,
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
  editpassword: function(req, res, next){
    User.findOne({
      where: {
        username:req.session.username,
        password: util.md5(req.body.password)
      }
    }).then((user)=>{
      if(user){
        user.password = util.md5(req.body.password1);
        return user.save();
      }else{
          return Promise.reject({'password':'原始密码输入错误'});
      }
    }).then(()=>{
        authMiddleware.logout(req, res);
        res.redirect('/login');
    }).catch((err)=>{
        res.render('editpassword', {
        title: '修改密码' ,
        err:err
      });
    });

  },
  showLostpassword: function(req, res) {
    res.render('lostpassword',{title:'忘记密码',err:null});
  },
  lostpassword: function(req, res, next){
    User.findOne({
      where: {
        email:req.body.email
      }
    }).then((user)=>{
      if(user){
        user.password = util.md5(req.body.password1);
        return user.save();
      }else{
          return Promise.reject({'password':'该邮箱未注册'});
      }
    }).then(()=>{
        res.redirect('/login');
    }).catch((err)=>{
        res.render('editpassword', {
        title: '修改密码' ,
        err:err
      });
    });

  }
};
