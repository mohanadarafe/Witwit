const express = require("express");
const router = express.Router();
const connection = require("../../server");
const jwtToken = require('jwt-decode');
var userLoggedIN = null;

//Getting  current user info:
router.post("/userLoggedIn", (req,res)=>{
  userToken = req.body;
  var decoded = (jwtToken(userToken.token)).username;
  userLoggedIN = decoded;
  res.status(200).json({ userLoggedIN });
})

//Retrieving the info regarding the user searched:
router.post("/userInfo", (req, res) => {
  userInfo = req.body;

  var decoded = (jwtToken(userInfo.token)).username;
  userLoggedIN = decoded;

  defaultBoolValueSqlQuery  = "UPDATE users " +
                              "SET boolValue = false WHERE username = ?";

  updateUsersTableSqleQuery = "UPDATE users " +
                              "INNER JOIN following ON " +
                              "(following.username = ? AND following.follow_name like users.username) " +
                              "SET users.boolValue = true";

  retrieveUsersSqlQuery     = "SELECT * FROM users WHERE username=?"

  //Setting the boolValue to false (default value) before doing anything:
  connection.connection.query(defaultBoolValueSqlQuery,userInfo.username,
    function (
      err) {
          if (err) {
            res.status(400).json("Error in setting boolValue to its default value");
          }
          //Setting the boolValue of the user passed to the method to true:
          connection.connection.query(updateUsersTableSqleQuery,userLoggedIN,
            function(
              err) {
                  if (err) {
                    res.status(400).json("Error in changing the Value of boolValue");
                  }
          })
          connection.connection.query(retrieveUsersSqlQuery, userInfo.username,
            function(
              err,
              respond) {
                    if (err) {
                        res.status(400).json("Error in retrieving the chosen user info");
                    } else {
                            res.status(200).send(respond);
                    }
          });
      });
});

//Getting wits for the wits tab:
router.post('/wits', (req, res)=> {
  userInfo = req.body;

  getWitsSqlQuery = "Select * FROM events WHERE username = ?"

  //Retrieve the list of wits posted by a user:
  connection.connection.query(getWitsSqlQuery, userInfo.username,
    function(
      err,
      respond){
          if (err) {
            res.status(400).json("Error in retrieving the wits posted by a user");
          }else{
            res.status(200).send(respond);
          }
    })
})



router.post('/likedWits', (req, res) => {
  userData = req.body;

  defaultWitTableSqlQuery = "UPDATE events " +
                            "SET boolValue = false";

  updateWitTableSqleQuery = "UPDATE events " +
                            "INNER JOIN likes ON " +
                            "(events.wit_id = likes.wit_id AND likes.username = ?) " +
                            " SET events.boolValue =true";

  retrieveWitSqlQuery     = "Select * FROM events WHERE boolValue =1"

  //Setting the boolValue to false (Default Value) before doing anything:
  connection.connection.query(defaultWitTableSqlQuery,
    function (
      err) {
        if (err) {
            res.status(400).json("There is a problem in setting boolValue to false in the events table");
        }
  })
  //Setting the booValue to true if the user liked this wit:
  connection.connection.query(updateWitTableSqleQuery, userData.username,
    function (
      err) {
        if (err) {
            res.status(400).json("There is a problem in setting the boolValue to true in events table");
        }
        else {
            //Retrieve a list of wits that the user liked:
            connection.connection.query(retrieveWitSqlQuery,
              function(
                err,
                respond){
                    if(err){
                      res.status(400).json("There is a problem with retrieving the wits from the database");
                    }else {
                      res.status(200).send(respond);
                    }
              })
          }
    })
})


module.exports = router;



