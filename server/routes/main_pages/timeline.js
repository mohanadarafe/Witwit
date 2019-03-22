const express = require("express");
const router = express.Router();
const jwtToken = require('jwt-decode');
const connection = require('../../server');
var userLoggedIN = null;

//revealing the posts.
router.post('/timeline', (req, res)=> {
  userInfo = req.body;

  var decoded = (jwtToken(userInfo.token)).username;
  userLoggedIN = decoded;

  sqlTimelineQuery = "Select * FROM events"

  connection.connection.query(sqlTimelineQuery,
    function (
      err,
      respond) {
          if (err) {
            res.status(400).json("There are some problem retrieving wits from the database");
          }else{
            res.status(200).send(respond);
          }
  })
})

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



