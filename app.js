require('dotenv').config();

var path = require('path');

process.env.bundleURL = process.env.DEV ? 'http://localhost:8080' : '/build'
process.env.indexTemplate = path.join(__dirname, process.env.DEV ? '/public/src/index.ejs/' : '/public/build/index.html')

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var auth = require('./routes/auth');

var app = express();

// passport
var {User} = require('./models');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

passport.use(
  new Strategy(function(username, password, cb) { 
    User.forge({ username: username })
    .fetch()
    .then(user => {
      // slow because bcrypt is slow..
      return user && user.authenticate(password)
    })
    .then(user => {
      cb(null, user.toJSON())
    })
    .catch(() => { 
      cb(null, false)
    })
  })
);

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.forge({ username: username })
    .fetch()
    .then(user => {
      cb(null, user)
    })
    .catch(() => {
      cb(null, false)
    })
});

const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const JWTStrategy   = passportJWT.Strategy;

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.SECRET_KEY
    },
    (jwtPayload, cb) => {

      User.forge({ username: jwtPayload })
        .fetch()
        .then(user => {
          if (!user) {
            return cb(null, false)
          } else {
            return cb(null, user)
          }
        })
        .catch(err => {
          return cb(null, false);
        });

    }
));

app.set('view engine', 'html');
// view engine setup
app.engine('.html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', auth);
app.use('/', index);

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
