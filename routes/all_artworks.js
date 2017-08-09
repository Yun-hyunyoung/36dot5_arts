/**
 * Created by ss on 2017-07-06.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

var User = require('../models/user');
var Artwork = require('../models/artwork');



router.get('/all_artworks', function(req, res) {

        res.render('all_artworks');
    });

module.exports = router;
