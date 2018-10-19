const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const Keys = require('./keys');
const fs = require('fs');
var path = require("path")

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
    

    var credentials    = {
      access_token : accessToken,
      expiry_date  : 36000,               
      refresh_token: rtoken,
      token_type   : "Bearer"
    };
    googleContacts.setUserCredentials(credentials);
  
    var createData = {
        name :'Test User', // Default is ''
        display_name: 'Test 123',  // Default is ''
        email       : 'test@gmail.com',
        is_primary  : true,                     // Default is true
        contact_type: 'work',                  // Default is other.
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

  
     fs.readFile(path.join(__dirname, '../routes/contact-details.vcf'), 'utf8', function (err,data) {
         if (err) {
           return console.log(err);
         }
         console.log(data);
         googleContacts.addContact(data, function (error,contact) {
             if (error) {
                 console.log(error);
             } else {
                 console.log(contact + "was added");
             }
           });
       });
    //  googleContacts.getContacts(function (error,contact) {
    //      if (error) {
    //          console.log(error);

    //      } else {

    //          for (var i = 0; i < contact.length; i++) {
    //              console.log(contact[i].fullmetadata);
    //          }
    //      }
    //    });

 
          
        
    })
)


