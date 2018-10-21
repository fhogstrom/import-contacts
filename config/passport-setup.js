const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const Keys = require('./keys');
const fs = require('fs');
const GoogleContacts = require("google-contacts-crud");

let clientID =  Keys.google.clientID;
let clientSecret =  Keys.google.clientSecret;
const googleContacts = new GoogleContacts(clientID, clientSecret);

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
        name :'Phil heath', 
        display_name: 'Phil heath',  
        email       : 'fht@gmail.com',
        is_primary  : true,                     
        contact_type: 'other',
        phoneNumber: '9898989899', 
        company: 'Google',           
        headers     :{
            'GData-Version': '3.0',
            'User-Agent'   : 'SomeAgent'
        },
//         fullmetadata: 
//    { id: '4343545345345', 
//      title: 'Developer',
//      gd$name: 'Phil heath',
//      gContact$nickname: Phil heath,
//      gContact$occupation: 'Developer',
//      gd$organization: 'Google',
//      gd$email: 'test@gmail.com',
//      gd$phoneNumber: '9898989899',
//      gd$structuredPostalAddress: 'Helsingintie'
   
//     }
    };

    // googleContacts.getContacts(function (error,contact) {
       // console.log(contact)
      //});
   

        googleContacts.addContact(createData, function (error, contact) {
            if (error) {
                console.log(error);
            } else {
                console.log(contact + "was added");
                // deleteFile(__dirname + '/contact-details.json');
            }
        });
    })
)

// function deleteFile (file) { 
//     fs.unlink(file, function (err) {
//         if (err) {
//             console.error(err.toString());
//         } else {
//             console.warn(file + ' deleted');
//         }
//     });
//   }
