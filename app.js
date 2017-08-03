var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var auth = require('./routes/auth');
var artwork = require('./routes/artwork');
var image = require('./routes/image');
var email = require('./routes/sendemail');
var board_list = require('./routes/board_list')
var ajax = require('./routes/ajax');
var all_artworks = require('./routes/all_artworks');
var app = express();

// express-session setup
var session = require('express-session');

app.use(session({
    secret: '!%@$#vistoria_secret#$@%!',
    resave: false,
    saveUninitialized: true
}));

// mongodb setup
var mongoose = require('mongoose');
var promise = mongoose.connect('mongodb://localhost/mydb', {
  useMongoClient: true
});

var db = mongoose.connection;
db.on('error', function() {
    console.error.bind(console, 'app.js: Mongodb connection error:');
    // 에러 처리
});
db.once('open', function() {
    // we're connected!
    console.log('connected successfully, port = 9000');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/email',email);
app.use('/', index);
app.use('/auth', auth);
app.use('/artwork', artwork);
app.use('/image', image);
app.use('/board_list',board_list);
app.use('/ajax',ajax);
app.use('/all_artworks',all_artworks);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
