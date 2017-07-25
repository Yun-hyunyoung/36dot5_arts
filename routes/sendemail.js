
 var express = require('express');
var router = express.Router();
var email 	= require("emailjs/email");


router.post('/sendemail', function(req, res) {

  var mail_text = req.body.mail_text

  var server 	= email.server.connect({
     user:    "jinpyo0311",
     password:"Wksvy124@",
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

module.exports = router;
