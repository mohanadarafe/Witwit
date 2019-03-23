const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const JWTTOKEN = require('jwt-decode');

var connection = require('../../server');
var userLoggedIN = null;


//Get the list of followings of any user:
ROUTER.post('/getListFollowing', (req, res)=>{
  var userData = req.body;

  var followingNameSqlQuery = 'Select follow_name from following where username =?';

  //Retrieve the list of users who are following a specific user:
  connection.connection.query(followingNameSqlQuery, userData.username,
    function(
      err,
      respond){
          if (err) {
            res.status(400).json("Error in retrieving the list of users following a user");
          } else {
            res.status(200).send(respond);
          }
    }
  )
})

//Get List of Following of the current User:
ROUTER.post('/getMyListFollowing', (req, res)=>{
  var userInfo = req.body;

  var decoded = (JWTTOKEN(userInfo.token)).username;
  userLoggedIN = decoded;

  var followingNameSqlQuery = 'Select follow_name from following where username =?';

  //Retrieve the list of users who are following a specific user:
  connection.connection.query(followingNameSqlQuery, userLoggedIN,
    function(
      err,
      respond){
          if (err) {
            res.status(400).json("")
          } else {
            res.status(200).send(respond);
          }
    }
  )
})

module.exports = ROUTER;
