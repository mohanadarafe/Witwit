const express = require("express");
const router3 = express.Router();
const sourceFile = require("./login_register");
var mySql = require("mysql");
const connection = require("../server");
const jwtToken = require('jwt-decode');
var userLoggedIN = null;
//to make sure that the API is working
router3.get("/", (req, res) => {
  res.send("From The timelineProfile API ");
  userToken = req.body;
  if(userLoggedIN==null){
    var decoded = (jwtToken(userToken.token)).username;
    userLoggedIN = decoded;
  }
});


router3.post("/timelineProfile", (req, res) => {
  userToken = req.body;
  if(userLoggedIN==null){
    var decoded = (jwtToken(userToken.token)).username;
    userLoggedIN = decoded;
<<<<<<< Updated upstream
  }
  sqlQuery2 = "SELECT * FROM users WHERE username=?";
  connection.connection.query(sqlQuery2, userLoggedIN, function(err, results) {
=======
    console.log("userLoggedIn username: " + userLoggedIN);
  sqlQueryTimelineProfile = "SELECT * FROM users WHERE username=?";
  connection.connection.query(sqlQueryTimelineProfile, userLoggedIN, function(err, results) {
>>>>>>> Stashed changes
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with query"
      });
    } else {
      if (results.length > 0) {
        res.status(200).send(results);
      } else {
        res.status(400).send("No user exists with this username");
      }
    }
  });
});

module.exports = router3;
