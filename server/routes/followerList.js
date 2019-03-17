const express = require("express");
const router = express.Router();
const jwtToken = require('jwt-decode');
const connection = require('../server');
var userLoggedIN = null;

//Get the follower list of the any user:
router.post('/getListFollowers', (req,res)=>{
  userData = req.body;

  sqlFollowing ="Select follow_name from follower where username =?";

  //Retrieving the list of users being followed by a specific user:
  connection.connection.query(sqlFollowing,userData.username,
    function(
      err,
      respond){
          if (err) {
            res.status(400).json("Error in retrieving the list of users followed by a user");
          } else{
            res.status(200).send(respond);
          }
  })
})

//Get the follower list of the current user:
router.post('/getListMyFollowers', (req,res)=>{
  userInfo = req.body;

  var decoded = (jwtToken(userInfo.token)).username;
  userLoggedIN = decoded;

  getListFollowingSqlQuery ="Select follow_name from follower where username =?";

  //Retrieve the list of my following (current user):
  connection.connection.query(getListFollowingSqlQuery,userLoggedIN,
    function(
      err,
      respond){
          if (err) {
            res.status(400).json("Error in retrieving my list of following (current user)");
          } else{
            res.status(200).send(respond);
          }
    })
})


module.exports = router;
