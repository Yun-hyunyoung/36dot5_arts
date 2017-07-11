/**
 * Created by ss on 2017-07-06.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

var User = require('../models/user');
var Artwork = require('../models/artwork');

router.get('/regist', function (req, res) {
    res.render('artwork/regist', { title: '36.5 Arts' });
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
        var imgPath = artwork.image;
        fs.rename(imgPath, imgPath.replace('temp', 'image'));
        res.redirect('/');
    });
});

module.exports = router;