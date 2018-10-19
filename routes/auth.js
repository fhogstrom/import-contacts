const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsforce = require('jsforce');
const fs = require('fs');
const flash = require('connect-flash');
const vcard = require('vcard-generator');



 router.post('/auth', urlencodedParser, function (req, serverRes) {
 
         const ACCOUNT = {
         username: req.body.username,
         password: req.body.password,
         securityToken: req.body.securityToken
         }

        
         const conn = new jsforce.Connection({
            instanceUrl : process.env.SALESFORCE_INSTANCE,
           });
        
           conn.login(ACCOUNT.username, ACCOUNT.password + ACCOUNT.securityToken, function (err, res) {
             if (err) { 
               serverRes.redirect('/');
               return console.error(' I am not working correctly ' + err);
              }
             conn.query('SELECT Id, Name FROM Account', function (err, res) {
               if (err) {
               return console.error(err);
              } else {
          
              const contact = [];
               for (let i = 0; i < res.records.length; i++) {
                const vcardContent = vcard.generate({
                  name: {
                    familyName: res.records[i].Name,
                    givenName: 'T' + i,
                    middleName: 'Philip',
            
                  },
                  formattedNames: [{
                    text:  res.records[i].Name,
                  }],
                  nicknames: [{
                    text: 'Phil',
                  }],
                  works: [{
                    organization: 'Biit oy',
                    title: 'CEO',
                    role: 'Executive',
                  }],
                  emails: [{
                    type: 'work',
                    text: 'test' + i +'@gmail.com',
                  }, {
                    type: 'home',
                    text: 'test' + i +'@gmail.com',
                  }],
                  phones: [{
                    type: 'work',
                    text: '1 (234) 567-890' + i,
                  }, {
                    text: '(123) 123-1234',
                  }, {
                    uri: 'tel:1234567890' + i,
                  }],
                  addresses: [{
                    type: 'work',
                    street: '123 Forbes Ave, Apt 1' + i,
                    locality: 'San Francisco' + i,
                    region: 'CA',
                    code: '12345',
                    country: 'USA',
                  }, {
                    type: 'home',
                    street: '456 Home St',
                    locality: 'Homeland',
                    region: 'CA',
                    code: '23456',
                    country: 'USA',
                  }]
                });
                 
                    contact.push(vcardContent);
                  
               }
              const manipulatedVcard = [];
               for (let i = 0; i < contact.length; i++) {
                const cleanedContacts = contact[i].replace(/BEGIN:VCARD/g, "\nBEGIN:VCARD");
                  manipulatedVcard.push(cleanedContacts);
                
                }
               const finalVcardFormat = manipulatedVcard.join("\n");
                    fs.appendFile(__dirname + '/contact-details.vcf', finalVcardFormat , 'utf8', function (err) {
                    if (err) {
                      console.log('Some error occured - file either not saved or corrupted file saved.');
                    } else {
                      console.log('It\'s saved!');
                      serverRes.redirect("/download");
                    }
                  });
                }
             });
         });
   });

   




module.exports = router;

