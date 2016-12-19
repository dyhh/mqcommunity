var express = require('express');
var router = express.Router();


var userController = require('../controller/user');
var siteController = require('../controller/site');
var signController = require('../controller/sign');

var topicController = require('../controller/topic');
var replyController = require('../controller/reply');

var messageController = require('../controller/message');
var messageMiddleware = require('../middleware/message');
var authMiddleware = require('../middleware/auth');


/* GET home page. */
router.get('/', siteController.index);
router.get('/home', authMiddleware.needLogin, messageMiddleware.getUnreadMessages, siteController.index);
router.get('/App',  messageMiddleware.getUnreadMessages,siteController.App);
router.get('/Performance',  messageMiddleware.getUnreadMessages,siteController.Performance);
router.get('/Examples',  messageMiddleware.getUnreadMessages,siteController.Examples);

router.route('/login')
    .get(signController.showLogin)
    .post(signController.login);

router.get('/logout', signController.logout);

router.route('/reg')
    .get(userController.showRegister)
    .post(userController.register);

router.route('/personal')
    .get(userController.showPersonal);

router.route('/editpassword')
    .get(userController.showEditpassword)
    .post(userController.editpassword);

router.route('/editpersonal')
    .get(userController.showEditpersonal)
    .post(userController.editpersonal);

router.route('/lostpassword')
    .get(userController.showLostpassword)
    .post(userController.lostpassword);

router.route('/addtopic')
    .get(topicController.showAddtopic)
    .post(topicController.addtopic);

router.route('/showtopic/:id')
    .get(topicController.showTopic)
    .post(replyController.addreply);

router.route('/edittopic/:id')
    .get(topicController.showEdittopic)
    .post(topicController.edittopic);

router.route('/deletetopic/:id')
    .get(topicController.deletetopic);

router.route('/deletereply/:id')
    .get(replyController.deletereply);

router.route('/message')
    .get(authMiddleware.needLogin, messageController.showMessage)
    .post(authMiddleware.needLogin, messageController.addmessage);


module.exports = router;
