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
});

/* board delete by id */
router.post('/delete', function(req, res) {
  User.update({'email' : req.body.email_id},{$pull: {'artworks':{'_id':req.body.artwork_id}}}, function (err, user) {
    console.log(req.body.email_id);
    console.log(req.body.artwork_id);
      res.redirect("/")
    });
  });

module.exports = router;
