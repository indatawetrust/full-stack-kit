require('dotenv').config();

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {User} = require('../models')
const authPassportJWT = require('../middlewares/authPassportJWT')

router.post('/login', function(req, res) {

  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        ok: false
      });
    }

    req.login(user, {session: false}, err => {
      if (err) {
        res.status(400).json({
          ok: false
        });
      }

      const token = jwt.sign(user.username, process.env.SECRET_KEY);

      return res.json({
        ok: true,
        token
      });
    });
  })(req, res);

});

router.post('/register', function(req, res) {

  const {username, password} = req.body

  User.forge({ username: username })
    .fetch()
    .then(function (user) {

      if (!user) {
        user = new User({ username: username, password: password })

        user
        .save()
        .then(() => {
          res.json({
            ok: true
          })
        })
      } else {
        res.status(400).json({
          ok: false
        })
      }

    })
    .catch((err) => {

      res.status(400).json({
        ok: err
      })

    })

});

router.get('/control', authPassportJWT, function (req, res, next) {

  res.json({
    ok: true
  })

});

module.exports = router;
