const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
require('dotenv').load();

const User = require('../models/User');


let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_SECRET
};


let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  User
    .findById(jwt_payload.sub._id)
    .then(user => next(null, user || false));
});

passport.use(strategy);


module.exports = passport;
