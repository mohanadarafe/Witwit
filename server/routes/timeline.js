const express = require("express");
const router1 = express.Router();
const sourceFile = require('./login_register')

//YOU can use it dirctly : use userLoggedIN
var mySql = require("mysql");
const connection = require('../server');

router1.get('/timeline', (req, res) => {
  sqlQuery1 = "SELECT follow_name FROM following WHERE username = ?"

  connection.connection.query(sqlQuery1, userLoggedIN, function (err, results) {
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with query"
      });
    }
    console.log(results);
    res.status(200).send(results);
  })
})

module.exports = router1;
