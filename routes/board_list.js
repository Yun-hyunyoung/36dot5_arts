var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Board = require('../models/board');
var Comment = require('../models/comment');

/* GET home page. */
router.get('/board_list', function(req, res, next) {
  Board.find({}, function(err, board) {

    res.render('board_list', {
      title: 'Express',
      board: board,
      session_email: req.session.email,
      artworks: '1',
      nickname: 'd'
    });
  });
});
/* Write board page */
router.get('/write', function(req, res, next) {
  res.render('write', {
    title: '글쓰기',
    session_email: req.session.email,
    artworks: '1',
    nickname: 'd'
  });
});
/* board insert mongo */
router.post('/write', function(req, res) {
  var board = new Board();
  board.title = req.body.title;
  board.contents = req.body.contents;
  board.author = req.body.author;

  board.save(function(err) {
    if (err) {
      console.log(err);
      res.redirect('board_list');
    }
    res.redirect('board_list');
  });
});

/* board find by id */
router.get('/:id', function(req, res) {
  Board.findOne({
    _id: req.params.id
  }, function(err, board) {
    res.render('board', {
      title: 'Board',
      board: board,
      session_email: req.session.email,
      artworks: '1',
      nickname: 'd'
    });
  })
});

/* comment insert mongo*/
router.post('/comment', function(req, res) {
  var comment = new Comment();
  comment.contents = req.body.contents;
  comment.author = req.body.author;

  Board.findOneAndUpdate({
    _id: req.body.id
  }, {
    $push: {
      comments: comment
    }
  }, function(err, board) {
    if (err) {
      console.log(err);
      res.redirect('/');
    }
    res.redirect('/board_list/' + req.body.id);
  });
});
module.exports = router;
