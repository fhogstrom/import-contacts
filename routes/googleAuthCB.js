const express = require('express');
const router = express.Router();
const passport = require('passport');

//callback url for google to redirect to
router.get('/auth/login/google', 
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  res.redirect('/');
});

module.exports = router;

