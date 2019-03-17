const express = require("express");
const router = express.Router();
const connection = require("../server");
const jwtToken = require('jwt-decode');
var userLoggedIN = null;

router.post("/timelineProfile", (req, res) => {
  userInfo = req.body;

  var decoded = (jwtToken(userInfo.token)).username;
  userLoggedIN = decoded;

  retrieveUserInfoSqlQuery = "SELECT * FROM users WHERE username=?";

  connection.connection.query(retrieveUserInfoSqlQuery, userLoggedIN,
    function(
      err,
      respond) {
          if (err) {
              res.status(400).send("There is problem in retrieving user info from the database");
          } else {
              res.status(200).send(respond);
          }
    });
});

module.exports = router;
