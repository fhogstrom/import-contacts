const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportSetup = require('../config/passport-setup');


 router.get('/google', passport.authenticate('google', {
	accessType: 'offline',
    prompt: 'consent',
    session: false,
   scope: ['https://www.googleapis.com/auth/contacts','https://www.googleapis.com/auth/plus.login']

 }));




module.exports = router;