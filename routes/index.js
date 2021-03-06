var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    User.find({artworks: {$exists: true}}, {artworks: true}, function (err, users) {
        var artworks = [];
        for (var i = 0; i < users.length; i++){
            var artwork = users[i].artworks;
            for (var j = 0; j < artwork.length; j++){
                artworks[artworks.length] = artwork[j];
            }
        }

        artworks.sort(function (a, b) {
            return b.regist_date - a.regist_date;
        });


        console.log(req.session.email);
        res.render('index', { title: '36.5 Arts', nickname: users.nickname, session_email: req.session.email, artworks : artworks});
    });
});
router.get('/clause',function(req, res){
  res.render('clause');
});
router.get('/introduce',function(req, res){
  res.render('introduce');
});
router.get('/inquire',function(req, res){
  res.render('inquire',{  title: 'Express',
    session_email: req.session.email
});
});
module.exports = router;
