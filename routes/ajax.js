var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.post('/ajax', function (req, res) {
    console.log('1POST 방식으로 서버 호출됨');
    var inputEmail = req.body.msg;
    var msg='사용중인 e-mail입니다.';
    var msg2="사용가능한 e-mail입니다.";
    User.findOne({email: inputEmail}, function (err, user) {
        if(user){
          return res.send({result:true, msg:msg});
        }else{
          return res.send({result:false, msg:msg2});
        }

    });
});

module.exports = router;
