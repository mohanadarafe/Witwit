const express = require("express");
const likeRouter = express.Router();
const jwtToken = require('jwt-decode');
const connection = require('../server');
var userLoggedIN = null;

//like a wit:
likeRouter.post('/likeWit', (req, res) => {
    witInfo = req.body;

    var decoded = (jwtToken(witInfo.token)).username;
    userLoggedIN = decoded;

    if(userLoggedIN === witInfo.username && witInfo.username !=null){
      res.status(401).json("user can't like their own wit");
      return;
    }
    updateWitInfoSqlQuery = "UPDATE events "+
                            "SET numOfLikes = numOfLikes + 1, "+
                            "boolvalue = true WHERE wit_id = ? ";

    insertLikeSqlQuery    = "INSERT INTO likes VALUES(DEFAULT,?,?)";

    //updating the table of events by increasing the likes number of this wit:
    connection.connection.query(updateWitInfoSqlQuery, witInfo.wit_id,
      function (
        err,
        result) {
            if (err) {
                res.satuts(400).json("there are some error with updating the wit info in the database");
            } else {
                //Insert in the likes table, the username who likes this post
                connection.connection.query(insertLikeSqlQuery, [witInfo.wit_id, userLoggedIN],
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

//unlike a wit:
likeRouter.post('/unlikeWit', (req, res) => {
  witInfo = req.body;

  var decoded = (jwtToken(witInfo.token)).username;
  userLoggedIN = decoded;

  updateWitSqlQuery  = "UPDATE events "+
                      "SET numOfLikes = numOfLikes - 1, " +
                      "boolValue = false WHERE wit_id = ?";

  removeLikeSqlQuery = "DELETE FROM likes WHERE wit_id =? AND username = ?";

  //updating the table of events by decreasing the likes number of this wit:
  connection.connection.query(updateWitSqlQuery, witInfo.wit_id, function (err, result) {
    if (err) {
     res.status(400).json("There are some problems with changing the wit info in the database");
    } else {
      //Deleting the username from the table of likes.
      connection.connection.query(sqlQuery3, [witInfo.wit_id, userLoggedIN],
        function (
          err,
          respond) {
              if (err) {
                res.status(400).json("There are some problem with removing like a wit from the database")
              } else {
                res.status(200).send(respond);
              }
        })
      }
    })
})

module.exports = router;
