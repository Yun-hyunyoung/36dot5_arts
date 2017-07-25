/**
 * Created by ss on 2017-07-06.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

var User = require('../models/user');
var Artwork = require('../models/artwork');

router.get('/regist', function (req, res) {
    res.render('artwork/regist', { title: '36.5 Arts', session_email: req.session.email });
});

router.post('/regist', function (req, res) {
    var artwork = new Artwork();
    artwork.title = req.body.title;
    artwork.material = req.body.material;
    artwork.medium = req.body.medium;
    artwork.width = req.body.width;
    artwork.height = req.body.height;
    artwork.depth = req.body.depth;
    artwork.keyword = req.body.keyword;

    //image를 File로 모델화 시킬 필요가 있음?
    artwork.image = req.body.filePath;

    artwork.description = req.body.description;
    artwork.price = req.body.price;
    artwork.category = req.body.category;
    artwork.address = req.body.address;
    artwork.packaging = req.body.packaging;

    User.findOneAndUpdate({email : req.session.email}, { $push: { artworks : artwork}}, function (err, user) {
        if(err){
            console.log(err);
            res.redirect('/');
        }
        // move file temp to image
        var imgPath = 'temp\\' + artwork.image;
        fs.rename(imgPath, imgPath.replace('temp', 'public/images/artworks'));
        res.redirect('/');
    });
});

router.get('/:id', function (req, res) {
    /*User.findOne({artworks : { $elemMatch: {_id : req.params.id}}}, {nickname: true, artworks : { $elemMatch: {_id : req.params.id}}}, function (err, user) {
        var artwork = user.artworks[0];
        console.log(artwork);
        User.find({nickname : user.nickname, artworks : {$ne : {_id : req.params.id}}}, function (err, artworks) {
            console.log(artworks.artworks);
            res.render('artwork', {title: '36.5 Arts', nickname: user.nickname, artwork: artwork, session_email: req.session.email});
        });
    });*/
    /*User.findOne({artworks : { $elemMatch: {_id : req.params.id}}}, function (err, user) {
       console.log(user);
       console.log(user.artworks);
       var artworks = user.artworks;
       var curr_artwork = undefined;
       var other_artworks = [];
       for(var i = 0; i < artworks.length; i++){
           console.log(artworks[i]._id + ' / ' + req.params.id);
           if (artworks[i]._id === req.params.id) curr_artwork = artworks[i];
           else other_artworks[other_artworks.length] = artworks[i];
       }
       console.log(curr_artwork);
        console.log(other_artworks);
    });*/
    User.findOne({artworks : { $elemMatch: {_id : req.params.id}}}, function (err, user) {
        var artworks = user.artworks;
        var curr_artworks = undefined;
        var other_artworks = [];
        if(artworks.length == 1) curr_artworks = artworks[0];
        else{
            for (var i = 0; i < artworks.length; i++){
                if (artworks[i]._id.toString() === req.params.id) curr_artworks = artworks[i];
                else other_artworks[other_artworks.length] = artworks[i];
            }
        }
        console.log(other_artworks);
        res.render('artwork', {title: '36.5 Arts', nickname: user.nickname, artwork: curr_artworks, other_artworks: other_artworks, session_email: req.session.email});
    });
})

module.exports = router;