/**
 * Created by ss on 2017-07-06.
 */
var express = require('express');
var router = express.Router();

router.get('/regist', function (req, res) {
    res.render('../artwork/regist', { title: '36.5 Arts' });
});

router.post('/regist', function (req, res) {
    hasher({password: req.body.password}, function (err, pass, salt, hash) {
        var user = new User();
        user.email = req.body.email;
        user.password = hash;
        user.salt = salt;
        user.type = req.body.type;
        user.major = req.body.major;

        user.save(function (err) {
            if(err){
                console.log(err);
                res.redirect('/');
            }
            req.session.email = user.email;
            res.redirect('/');
        })
    });
});

router.get('/login', function (req, res) {
    res.render('login', { title: '36.5 Arts' });
});

router.post('/login', function (req, res) {
    var inputEmail = req.body.email;

    User.findOne({email: inputEmail}, function (err, user) {
        if(err) return res.status(500).send({error: 'database find failure'});
        if(!user) return res.status(404).send({error: 'user not found'});

        var inputPassword = req.body.password;
        hasher({password:inputPassword, salt:user.salt}, function (err, pass, salt, hash) {
            if(hash === user.password){
                req.session.email = user.email;
                res.redirect('/');
            }else{
                res.redirect('/auth/login');
            }
        });
    })
});

router.get('/logout', function (req, res) {
    if(req.session.email){
        req.session.destroy(function (err) {
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
        })
    }else{
        res.redirect('/');
    }
});

module.exports = router;