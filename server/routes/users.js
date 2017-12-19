const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/secret',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    console.log('CURRENT USER:', req.user);
    res.json({ message: 'Success! You cannot see this without token' });
  });
module.exports = router;
