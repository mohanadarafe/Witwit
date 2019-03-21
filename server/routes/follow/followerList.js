var EXPRESS = require("express");
var ROUTER = EXPRESS.Router();
var JWTTOKEN = require('jwt-decode');
var CONNECTION = require('../../server');
var userLoggedIN = null;

var followerNameSqlQuery = 'Select follow_name from follower where username =?';

//Get the follower list of the any user:
ROUTER.post('/getListFollowers', (req, res)=>{
  var userData = req.body;
 
  //Retrieving the list of users being followed by a specific user:
  CONNECTION.CONNECTION.query(followerNameSqlQuery, userData.username,
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
ROUTER.post('/getListMyFollowers', (req, res)=>{
  var userInfo = req.body;

  var decoded = (JWTTOKEN(userInfo.token)).username;
  userLoggedIN = decoded;

  //Retrieve the list of my following (current user):
  CONNECTION.CONNECTION.query(followerNameSqlQuery, userLoggedIN,
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


module.exports = ROUTER;
