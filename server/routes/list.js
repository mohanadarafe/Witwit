const express = require("express");
const router = express.Router();
const connection = require('../server');

router.post('/witLikesList', function (req, res) {
  witInfo = req.body;

  retrieveWitLikesSqlQuery = "SELECT username FROM likes where wit_id = ?";

  //Retrieve the list of likes for a specific wit:
  connection.connection.query(retrieveWitLikesSqlQuery, witInfo.wit_id,
    function(
      err,
      result) {
          if (err) {
            res.status(400).json("There was a problem in retrieving the list of likes for a wit");
          }
          else {
              res.status(200).send(result);
          }
    })
})


router.post('/repliesList', function (req, res) {
  replyInfo = req.body;

  retrieveRepliesSqlQuery = "SELECT * FROM replies where wit_id = ?";

  //Retrieving the list of replies for a specific wit:
  connection.connection.query(retrieveRepliesSqlQuery, replyInfo.wit_id,
     function(
       err,
       respond) {
            if (err) {
              res.status(400).json("There was a problem with the query to retrieve the list of replies");
            }
            else {
                res.status(200).send(respond);
            }
     })
})

router.post('/replyLikesList', function (req, res) {
  replyInfo = req.body;

  retrieveReplyListSqlQuery = "SELECT * FROM replylikes where reply_id = ?";

  //Retrieve the list of like for a specific reply:
  connection.connection.query(retrieveReplyListSqlQuery, replyInfo.reply_id,
    function(
      err,
      respond) {
          if (err) {
            res.status(400).json("There is a problem in retrieving the list of likes for a reply from database");
          }
          else {
              res.status(200).send(respond);
          }
    })
})

module.exports = router;
