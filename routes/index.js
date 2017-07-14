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
        console.log(artworks);
        console.log(req.session.email);
        res.render('index', { title: '36.5 Arts', session_email: req.session.email, artworks : artworks});
    });
});

module.exports = router;
