module.exports = {
  needLogin: function(req, res, next){
    if(req.session.islogin){
      if(req.session.islogin){
          res.locals.islogin=req.session.islogin;
      }

      if(req.cookies.islogin){
          req.session.islogin=req.cookies.islogin;
      }
      next();
    } else{
      next('need login');
    }
  },
  login: function(user, req, res){
    req.session.islogin = user.username;
    req.session.username = user.username;
    res.locals.islogin= req.session.islogin;
    res.cookie('islogin',res.locals.islogin,{maxAge:60000});
  },
  logout: function(req, res){
    res.clearCookie('islogin');
    req.session.destroy();
  }
}
