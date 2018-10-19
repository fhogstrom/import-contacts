const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const Keys = require('./keys');
var axios = require('axios');


passport.use(
    new GoogleStrategy({
        callbackURL: 'http://localhost:3000/auth/login/google',
        clientID: '<clientID>',
        clientSecret: '<clientSecret>'
    }, (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
       console.log(profile);
       
   axios.get("https://www.google.com/m8/feeds/contacts/default/full?alt=json&access_token=" + accessToken + "&max-results=700&v=3.0")
         .then(function (response) {
           console.log(response);
         })
         .catch(function (error) {
             console.log(error);
         });
          
        
    })
)


