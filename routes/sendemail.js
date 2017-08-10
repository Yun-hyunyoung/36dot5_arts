
 var express = require('express');
var router = express.Router();
var email 	= require("emailjs/email");
var fs = require("fs");

router.post('/sendemail', function(req, res) {

  var mail_text = req.body.mail_text
  var emailsend_id = fs.readFileSync('C:/Users/jinpy/Documents/36dot5/emailsend_id.txt',{encoding:'utf8'});
  var emailsend_password = fs.readFileSync('C:/Users/jinpy/Documents/36dot5/emailsend_password.txt',{encoding:'utf8'});

  var server 	= email.server.connect({

     user:   emailsend_id,
     password:emailsend_password,
     host:    "smtp.naver.com",
     port:    465,
     ssl:     true
  });

  // send the message and get a callback with an error or details of the message that was sent
  server.send({
     text:   mail_text,
     from:    "you <jinpyo0311@naver.com>",
     to:      "someone <jinpyo0311@gmail.com>",
     cc:      "",
     subject: "testing emailjs"
  }, function(err, message) { console.log(err || message); });
  res.redirect('/');
});

router.post('/requiremail', function(req, res) {

  var emailsend_id = fs.readFileSync('C:/Users/jinpy/Documents/36dot5/emailsend_id.txt',{encoding:'utf8'});
  var emailsend_password = fs.readFileSync('C:/Users/jinpy/Documents/36dot5/emailsend_password.txt',{encoding:'utf8'});

  var inquire_text = req.body.inquire_text
  var reply_email = req.body.reply_email
  var server 	= email.server.connect({
     user:    emailsend_id ,
     password: emailsend_password,
     host:    "smtp.gmail.com",
     port:    465,
     ssl:     true
  });

  // send the message and get a callback with an error or details of the message that was sent
  server.send({
     text:   inquire_text,
     from:    "you <36dot5do@gmail.com>",
     to:      "someone <36dot5do@gmail.com>",
     cc:      "",
     subject: reply_email + "님 으로부터 문의사항이 접수되었습니다."
  }, function(err, message) { console.log(err || message); });
  res.redirect('/');
});


module.exports = router;
