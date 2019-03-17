const express = require("express");
const router = express.Router();
const jwtToken = require('jwt-decode');
const connection = require('../server');
var userLoggedIN = null;

//Get the list of followings of any user:
router.post('/getListFollowing', (req,res)=>{
  userData = req.body;

  getFollowingListSqlQuery = "Select follow_name from following where username =?";

  //Retrieve the list of users who are following a specific user:
  connection.connection.query(getFollowingListSqlQuery,userData.username,
    function(
      err,
      respond){
          if (err) {
            res.status(400).json("Error in retrieving the list of users following a user");
          }else{
            res.status(200).send(respond);
          }
  })
})

//Get List of Following of the current User:
router.post('/getMyListFollowing', (req,res)=>{
  userInfo = req.body;

  var decoded = (jwtToken(userInfo.token)).username;
  userLoggedIN = decoded;

  sqlFollowing ="Select follow_name from following where username =?";

  //Retrieve the list of users who are following a specific user:
  connection.connection.query(sqlFollowing,userLoggedIN,
    function(
      err,
      respond){
          if (err) {
            res.status(400).json("")
          } else{
            res.status(200).send(respond);
          }
  })
})

module.exports = router;
