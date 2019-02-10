const express = require("express");
const router3 = express.Router();
const sourceFile = require('./login_register')
var mySql = require("mysql");
const connection = require('../server');
userLoggedIN = 'Robert';



//to make sure that the API is working 
router3.get("/", (req, res) => {
    res.send("From The timelineProfile API ");
  });


  router3.get('/timelineProfile', (req, res) => {
    sqlQuery2 = "SELECT * FROM users WHERE username = 'Robert'"
    connection.connection.query(sqlQuery2, userLoggedIN, function (err, results) {
      if (err) {
        res.json({
          code: 400,
          message: "there are some error with query"
        });
      }
      else {
        if (results.length > 0) {
          res.status(200).send(results);
        }
        else {
          res.status(400).send("No user exists with this username");
        }
      }
      })
  })
  



  module.exports = router3