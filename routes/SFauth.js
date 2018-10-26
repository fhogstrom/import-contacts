const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsforce = require('jsforce');
const fs = require('fs');
const vcard = require('vcard-generator');




 router.post('/auth', urlencodedParser, function (req, serverRes) {
 
         const ACCOUNT = {
         username: req.body.username.trim(),
         password: req.body.password.trim(),
         securityToken: req.body.securityToken.trim()
         }

        
         const conn = new jsforce.Connection({
            instanceUrl : process.env.SALESFORCE_INSTANCE,
           });
        
           conn.login(ACCOUNT.username, ACCOUNT.password + ACCOUNT.securityToken, function (err, res) {
             if (err) { 
               serverRes.redirect('/');
               return console.error(' I am not working correctly ' + err);
              }
             conn.query('SELECT Id,  Name,Address__c,City__c,SFL5__Primary_Skill__c, Mobile__c, Resource_email__c FROM SFL5__SFL5_Resource__c WHERE User__c IN (SELECT Id FROM User WHERE IsActive = TRUE)' , function (err, res) {
               if (err) {
               return console.error(err);
              } else {

                const employees = res.records.filter(function (details) {
                  if (details.Mobile__c !== null) {
                    const cleanedMobileNumber = details.Mobile__c.replace(/\D/g, '');
                    if (details.Mobile__c.startsWith('0')) {
                      details.Mobile__c = "+358" + cleanedMobileNumber.substr(1);
                    } else if (details.Mobile__c.startsWith('+')) {
                      details.Mobile__c = '+' + cleanedMobileNumber;
                    }
                    return true;
                  }
                });
                
                const employeesVcard = [];
                for (let i = 0; i < employees.length; i++) {
                const vcardContent = vcard.generate({
                  name: {
                    familyName: employees[i].Name,
                  },
                  works: [{
                    organization: 'Biit Oy',
                    title: employees[i].SFL5__Primary_Skill__c,
                    role: employees[i].SFL5__Primary_Skill__c
                  }],
                  emails: [{
                    type: 'Work',
                    text: employees[i].Resource_email__c,
                  },
                   {
                    type: 'Work',
                    text: employees[i].Resource_email__c
                  }],
                  phones: [{
                    type: 'Work',
                    text: employees[i].Mobile__c
                  }],
                  addresses: [{
                    type: 'Home address',
                    street: employees[i].Address__c,
                    locality: employees[i].City__c.toUpperCase(),
                    country: 'Finland',
                  }]
                 });
                 employeesVcard.push(vcardContent);
                }
                

                const manipulatedVcard = [];
                for (let x = 0; x < employeesVcard.length; x++) {
                var res = employeesVcard[x].replace(/BEGIN:VCARD/g, "\nBEGIN:VCARD");
                manipulatedVcard.push(res);
                    }

                const finalEmployeeFormat = manipulatedVcard.join("\n");
             
                    fs.appendFile(__dirname + '/employee-contact-details.vcf', finalEmployeeFormat , 'utf8', function (err) {
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

