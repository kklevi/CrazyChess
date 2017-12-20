const express = require('express');
const path = require('path');
const dontenv = require('dotenv');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

dontenv.load();

require('./config/database');
const passport = require('./config/passport-config');

let index = require('./routes/index');
let users = require('./routes/users');
let auth = require('./routes/auth');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/auth', auth);
app.use('/users', users);

let socket = io => {
  io.on('connection', socket => {
    console.log('A user is connected');

    socket.on('add-message', msg => {
      console.log(`New message: ${ msg }`);
      io.emit('message', msg);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected.');
    });
  });
};

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

module.exports = { app, socket };