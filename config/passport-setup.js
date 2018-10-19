const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const Keys = require('./keys');
var axios = require('axios');
let clientID =  '955803517264-tk1er3u9m574udsu27o57adv3sccgag3.apps.googleusercontent.com'
let clientSecret =  'Q02JHWtyqpLnYC7stcilKu5u'
var GoogleContacts = require("google-contacts-crud");
var googleContacts = new GoogleContacts(clientID, clientSecret);
passport.use(
    new GoogleStrategy({
        callbackURL: 'http://localhost:3000/auth/login/google',
        clientID: clientID,
        clientSecret: clientSecret
    }, (accessToken, rtoken, profile, done) => {
      console.log(accessToken,rtoken)
    var credentials    = {
      access_token : accessToken,
      expiry_date  : 36000,               
      refresh_token: rtoken,
      token_type   : "Bearer"
    };
    googleContacts.setUserCredentials(credentials);
    var count=0;
    var createData = {
        name :'Test User', // Default is ''
        display_name: 'Test 123',  // Default is ''
        email       : 'test@gmail.com',
        is_primary  : true,                     // Default is true
        contact_type: 'other',                  // Default is other.
        phoneNumber: '9898989899',                  // Default is other.
        headers     :{
            'GData-Version': '3.0',
            'User-Agent'   : 'SomeAgent'
        },
        extended_property: [                    // Optional
            {name: 'custom_key_2', value: 'custom_value_2'},
            {name: 'custom_key_2', value: 'custom_value_2'}
        ]
    };
   
// to get the list of contacts


//   googleContacts.getContacts(function (error,contact) {
//   console.log(error)
//   // console.log(contact)
// });
  googleContacts.addContact(createData, function (error,contact) {
    console.log(error,'errr')
    console.log(contact)
  });


       
   // axios.get("https://www.google.com/m8/feeds/contacts/default/full?alt=json&access_token=" + accessToken + "&max-results=700&v=3.0")
   //       .then(function (response) {
   //         console.log(response.data);
   //       })
   //       .catch(function (error) {
   //           console.log(error,'from here');
   //       });
          
        
    })
)


