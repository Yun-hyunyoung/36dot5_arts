var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '36.5 Arts', name: getName(req.session.email)});
});

function getName(email) {
    if (email === undefined) return 'Guest';
    else return email;
}

module.exports = router;
