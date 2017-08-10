/**
 * Created by ss on 2017-07-06.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

var User = require('../models/user');
var Artwork = require('../models/artwork');



router.get('/', function(req, res) {
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
      res.render('all_artworks', { title: '36.5 Arts', nickname: users.nickname, session_email: req.session.email, artworks : artworks});
  });
    });



module.exports = router;
