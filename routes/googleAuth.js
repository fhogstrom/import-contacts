const express = require('express');
const router = express.Router();
const passport = require('passport');

 //callback url for google to redirect to
router.get('/auth/login/google', passport.authenticate('google', {
	successRedirect:'/profile',
	failureRedirect:'/'
}), function (req, res, next)  {
	res.redirect('/');
	next();
 });
   
    
module.exports = router;

