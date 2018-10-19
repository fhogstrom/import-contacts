const express = require('express');
const router = express.Router();
const jsforce = require('jsforce');
const fs = require('fs');


router.get('/', function (req, res) {
  res.render('index');
});





module.exports = router;