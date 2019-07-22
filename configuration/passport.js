const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwtSecret = require('./jwtSecret').secret
const User = require('../models').User

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
opts.secretOrKey = jwtSecret

/**
  * Interceptor that manages user session by a jwt token
  */
passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
  User.findOne({
    where: {
      email: jwtPayload.email
    }
  }).then(user => {
    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  }).catch(error => {
    return done(error, false)
  })
}))

module.exports = passport
