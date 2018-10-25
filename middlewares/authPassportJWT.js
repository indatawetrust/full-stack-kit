const passport = require('passport')

module.exports = (req, res, next) => {

  passport.authenticate('jwt', {session: false}, (err, user, info) => {

    if (err || !user) {
      res.json({
        ok: false
      })
    } else if (!err && user) {
      req.user = user
      next();
    }

  })(req, res)

}
