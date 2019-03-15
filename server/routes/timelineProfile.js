const express = require("express");
const router3 = express.Router();
const connection = require("../server");
const jwtToken = require('jwt-decode');
var userLoggedIN = null;

router3.post("/timelineProfile", (req, res) => {
  userToken = req.body;
    var decoded = (jwtToken(userToken.token)).username;
    userLoggedIN = decoded;
  sqlQueryTimelineProfile = "SELECT * FROM users WHERE username=?";
  connection.connection.query(sqlQueryTimelineProfile, userLoggedIN, function(err, results) {
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
