const jwt = require('jsonwebtoken');
const moment = require('moment');
require('dotenv').load();

const User = require('../models/User');


function generateToken ( user ) {
  var payload = {
    sub: user,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix()
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET);
}


function registerNewUser ( user ) {
  return new User({...user}).save();
};


function findUserByUsername  ( username ) {
  return User.findOne({ username: username }).exec();
};


function authenticate ( username, password ) {
  let errMessage = 'Invalid username/password';

  return findUserByUsername(username)
    .then(user => user || Promise.reject(errMessage))
    .then(user => new Promise((resolve, reject) => {
      user.comparePassword(password, (err, isMatch) => {
        if(!isMatch) {
          reject(errMessage);
        } else {
          resolve({ message: 'OK', token: generateToken(user), user: user });
        }
      })
    }));
};

module.exports = {
  registerNewUser,
  findUserByUsername,
  authenticate
};
