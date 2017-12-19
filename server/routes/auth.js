const express = require('express');
const router = express.Router();
const authContoller = require('../controllers/authController');


router.post('/signup', (req, res, next) => {
  let { username, password } = req.body;

  authContoller
    .registerNewUser({ username, password })
    .then(newUser => authContoller.authenticate(username, password))
    .then(authToken => res.json(authToken))
    .catch(err => res.status(400).json({ error: err }));
});

router.post('/login', function(req, res, next) {
  let { username, password } = req.body;

  authContoller
    .authenticate(username, password)
    .then(authToken => res.json(authToken))
    .catch(err => res.status(401).json({ error: err }));
});

module.exports = router;

