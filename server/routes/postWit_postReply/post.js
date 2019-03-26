const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const JWTTOKEN = require('jwt-decode');

var connection = require('../../server');
var userLoggedIN = null;

//post a wit:
ROUTER.post('/postWit', (req, res) => {
  var postInfo = req.body;

  decoded      = (JWTTOKEN(postInfo.token)).username;
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

  var insertWitSqlQuery = 'INSERT INTO events SET ?';

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
ROUTER.post('/postReply', (req, res) => {
  var replyInfo = req.body;

  decoded       = (JWTTOKEN(replyInfo.token)).username;
  userLoggedIN = decoded;

  var post = {
      username    : userLoggedIN,
      reply       : replyInfo.reply,
      wit_id      : replyInfo.wit_id,
      numOfLikes  : 0,
  }

  var insertReplyQuery = 'INSERT INTO replies SET ?';

  connection.connection.query(insertReplyQuery, post, 
    function (
      err,
      results) {
          if (err) {
              res.satuts(400).send("There are some error with the sql of adding a reply");
          } else {
              res.status(200).send(results);
          }
      })
})

module.exports = ROUTER;
