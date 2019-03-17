const express = require('express');
const router = express.Router();
const connection = require('../../server');
const jwtToken = require('jwt-decode');
var userLoggedIN = null;

//Wits which the current user already liked:
router.post('/likedWits', (req, res) => {
  witInfo      = req.body;

  var decoded  = (jwtToken(witInfo.token)).username;
  userLoggedIN = decoded;

  defaultWitTableSqlQuery = "UPDATE events " +
                           "SET boolValue = false";

  updateWitTableSqleQuery = "UPDATE events " +
                            "INNER JOIN likes ON " +
                            "(events.wit_id = likes.wit_id AND likes.username = ?) " +
                            "SET events.boolValue =true";

  //Putthing the boolValue = false (Default value) in the wits table before doing anything:
  connection.connection.query(defaultWitTableSqlQuery, userLoggedIN,
    function (
      err) {
        if (err) {
           res.status(400).json("There some problem with putting the boolValue to false in the events table")
        }
    })

  //Change the value of boolValue to true in case if the user already liked a wit:
  connection.connection.query(updateWitTableSqleQuery, userLoggedIN,
    function (
      err,
      respond) {
        if (err) {
          res.status(400).json("There was a problem in changing the boolValue to true in the events table")
        }
        else {
          res.status(200).send(respond);
        }
    })
})

//Replies which the current user already liked:
router.post('/likedReplies', function(req, res) {
  replyInfo    = req.body;

  var decoded  = (jwtToken(replyInfo.token)).username;
  userLoggedIN = decoded;

  defaultRepliesTableSqlQuery = "UPDATE replies " +
                                "SET boolValue = false ";

  updateReplyTableSqleQuery   = "UPDATE replies " +
                                "INNER JOIN replylikes ON "+
                                "(replies.reply_id = replylikes.reply_id AND replylikes.username = ?) " +
                                "SET replies.boolValue =true";

  //Putthing the boolValue = false (Default value) in the replies table before doing anything:
  connection.connection.query(defaultRepliesTableSqlQuery, userLoggedIN,
    function (
      err) {
        if (err) {
          res.status(400).json("Problem with the query of setting boolValue to false");
        }
  })

  //Change the value of boolValue to true in case if the user already liked a reply:
  connection.connection.query(updateReplyTableSqleQuery, userLoggedIN,
    function (
      err,
      respond) {
          if (err) {
            res.status(400).json("Problem in inilizing boolValue to true in the replies table");
          } else {
            res.status(200).send(respond);
          }
  })
})

module.exports = router;
