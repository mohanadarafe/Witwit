const express = require("express");
const likeRouter = express.Router();
const jwtToken = require('jwt-decode');
const connection = require('../server');
var userLoggedIN = null;


likeRouter.post('/likeReply', (req, res) => {
  replyInfo = req.body;

  var decoded = (jwtToken(replyInfo.token)).username;
  userLoggedIN = decoded;


  updateReplyInfoSqlQuery = "UPDATE replies " +
                            "SET numOfLikes = numOfLikes + 1, "+
                            "boolvalue = true WHERE reply_id = ? ";
  insertLikeReplySqlQuery = "INSERT INTO replyLikes VALUES(DEFAULT,?,?)";

  //updating the table of replies by increasing the likes number of this reply:
  connection.connection.query(updateReplyInfoSqlQuery, replyInfo.reply_id,
     function (
       err,
       result) {
          if (err) {
            res.status(400).json("There are some problem with updating the reply info in the database");
          } else {
              //Insert in the replyLikes table, the username who likes this post
              connection.connection.query(insertLikeReplySqlQuery, [replyInfo.reply_id, userLoggedIN],
                function (
                  err,
                  respond) {
                      if (err) {
                        res.status(400).json("There are some problem with Inserting like a wit in the database");
                      } else {
                        res.status(200).send(respond);
                      }
                })
          }
    })
})

likeRouter.post('/unlikeReply', (req, res) => {
replyInfo = req.body;

var decoded = (jwtToken(replyInfo.token)).username;
userLoggedIN = decoded;

updateReplySqlQuery     = "UPDATE replies " +
                          "SET numOfLikes = numOfLikes - 1, " +
                          "boolValue = false WHERE reply_id = ? ";

removeLikeReplySqlQuery = "DELETE FROM replylikes WHERE reply_id =? AND username = ?";

//updating the table of replies by decreasing the likes number of this reply:
connection.connection.query(updateReplySqlQuery, replyInfo.reply_id,
  function (
    err,
    result) {
        if (err) {
          res.status(400).json("There some problem with updating the reply info in the replies table");
        } else {
          //Remove from the replyLikes table, the user with this username who liked this post
          connection.connection.query(removeLikeReplySqlQuery, [replyInfo.reply_id, userLoggedIN],
            function (
              err,
              respond) {
                  if (err) {
                    res.status(400).json("There are problem with deleting the like from likesReply table");
                  } else {
                    res.status(200).send(respond);
                  }
            })
        }
  })
})

module.exports = router;
