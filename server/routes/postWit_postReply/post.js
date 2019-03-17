const express = require("express");
const router = express.Router();
const jwtToken = require('jwt-decode');
const connection = require('../../server');
var userLoggedIN = null;

//post a wit:
router.post('/postWit', (req, res) => {
  var postInfo = req.body;

  var decoded = (jwtToken(postInfo.token)).username;
  userLoggedIN = decoded;

  var post  = {
          username     : userLoggedIN,
          wit          : postInfo.wit,
          boolValue    : false,
          numOfLikes   : 0,
          numOfReplies : 0
  }

  if (postInfo.wit.length > 120){
      res.status(401).json("Too long wit");
      return;
  }
  if (postInfo.wit.length == 0) {
      res.status(401).json("Empty wit");
      return;
  }

  insertWitSqlQuery = "INSERT INTO events SET ?";

  //adding a new wit inside the database:
  connection.connection.query(insertWitSqlQuery, post,
    function (
      err,
      results) {
          if (err) {
            res.status(400).json("There are some error with the sql of adding wit ")
          } else {
              res.status(200).send(results);
          }
      })
})

//oost a reply:
router.post('/postReply', (req, res) => {
  var replyInfo = req.body;

  var decoded  = (jwtToken(replyInfo.token)).username;
  userLoggedIN = decoded;

  var post = {
      username    : userLoggedIN,
      reply       : replyInfo.reply,
      wit_id      : replyInfo.wit_id,
      numOfLikes  : 0,
  }

  insertReplyQuery = "INSERT INTO replies SET ?"

  connection.connection.query(insertReplyQuery, post, function (
      err,
      results) {
          if (err) {
              res.satuts(400).send("There are some error with the sql of adding a reply")
          } else {
              res.status(200).send(results);
          }
      })
})

module.exports = router;
