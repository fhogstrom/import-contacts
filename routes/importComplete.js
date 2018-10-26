const express = require('express');
const router = express.Router();
const fs = require('fs');



function deleteFile (file) { 
  fs.unlink(file, function (err) {
      if (err) {
          console.error(err.toString());
      } else {
          console.warn(file + ' deleted');
      }
  });
}


router.get('/download', function (req, res) {
     res.download(__dirname + '/employee-contact-details.vcf', 'biit-employee.vcf', function (err) {
          if (err) {
           console.log("Some error occured while attempting to download this file");
          } else {
          deleteFile(__dirname + '/employee-contact-details.vcf');
           console.log("Download was successful");
           res.redirect('/');
          }
     });
  });

module.exports = router;