const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportSetup = require('../config/passport-setup');
var pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';
var axios = require('axios');

 router.get('/google', passport.authenticate('google', {

   scope: ['https://www.googleapis.com/auth/contacts']

 }));


// router.get('/pokemon', function (req, res) {
//   axios.get(pokemonUrl)
//         .then(function (response) {
//           res.status(200).json(response.data.results[0].name);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
  
//  });
//https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=ya29.Glw7BqoanA8SCP1ANKP5e2EFm9omSDWi9KhtcLkrNTd4bUYMpVDdtvEG2Z3dihIQ6-iJxjWiZba__rHuvNrDPkUT3KPm8IquguWkdcbE1KX2qaTNeMiBNDPLy66KUA
   

module.exports = router;