var authMiddleware = require('../middleware/auth');
var util = require('utility');
const User = require('../model').User;
module.exports = {
  showLogin: function(req, res, next) {
      if(req.session.islogin){
          res.locals.islogin=req.session.islogin;
      }

      if(req.cookies.islogin){
          req.session.islogin=req.cookies.islogin;
      }

      res.render('login', {
        title: '用户登录' ,
        username:res.locals.islogin,
        err:null,
      });
  },
  login:function(req, res) {
    console.log(req.body);
    User.findOne({
      where: {
        $or:{username:req.body.loginname, email:req.body.loginname , phone:req.body.loginname},
        password: util.md5(req.body.password)
      }
    }).then((user)=>{
      if(user){
        authMiddleware.login(user, req, res);
        res.redirect('/home');
      } else {
        return Promise.reject("该用户不存在，请检查用户名或密码是否输入正确！");
      }
    })
    .catch((err)=>{
      res.render('login', {
        title: '用户登录' ,
        username:res.locals.islogin,
        err:err
      });
    })
  },
  logout: function(req, res) {
      authMiddleware.logout(req, res)
      res.redirect('/');
  }
}
