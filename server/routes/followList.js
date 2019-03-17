const express = require("express");
const router = express.Router();
const connection = require('../server');

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

module.exports = router;
