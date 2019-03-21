var EXPRESS = require("express");
var ROUTER = EXPRESS.Router();
var JWTTOKEN = require('jwt-decode');
var CONNECTION = require('../../server');
var userLoggedIN = null;

var followingNameSqlQuery = 'Select follow_name from following where username =?';

//Get the list of followings of any user:
ROUTER.post('/getListFollowing', (req, res)=>{
  userData = req.body;

  //Retrieve the list of users who are following a specific user:
  CONNECTION.CONNECTION.query(followingNameSqlQuery, userData.username,
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
ROUTER.post('/getMyListFollowing', (req, res)=>{
  userInfo = req.body;

  var decoded = (JWTTOKEN(userInfo.token)).username;
  userLoggedIN = decoded;

  //Retrieve the list of users who are following a specific user:
  CONNECTION.CONNECTION.query(followingNameSqlQuery, userLoggedIN,
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

module.exports = ROUTER;
