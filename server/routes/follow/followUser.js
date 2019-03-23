const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const JWTTOKEN = require('jwt-decode');

var connection = require('../../server');
var userLoggedIN = null;

//follow a user:
ROUTER.post('/followUser', (req, res) => {
 var followingInfo = req.body;

 var decoded       = (JWTTOKEN(followingInfo.token)).username;
 userLoggedIN      = decoded;

  var checkUpFollowingSqlQuery = 'SELECT * FROM follower WHERE username = ? And follow_name = ? ';

  //User can't follow themselves:
  if (userLoggedIN == followingInfo.username) {
    res.status(401).json("You cannot follow yourself!");
    return;
  }
  //we can't follow a user more than once query tested in database it's working
  connection.connection.query(checkUpFollowingSqlQuery, [followingInfo.username, userLoggedIN],
    function (
      err,
      respond) {
          if (err) {
            res.status(400).json("There are a problem checking up the users in the database for following")
          }

          //if the userLoggedIn is already following the requested user found in the database
          //it will return a respond.length equal to 1. Put bigger than just to test it.
          else if (respond.length >= 1) {

            var followingTableSqlQuery  = 'DELETE FROM following WHERE username= ? AND follow_name =?';
            var followerTableSqlQuery   = 'DELETE FROM follower WHERE username =? AND follow_name =?';
            var updateFollowingSqlQuery = 'UPDATE users SET following = following - 1 WHERE username = ? ';
            var updateFollowerSqlQuery  = 'UPDATE users SET followers = followers - 1 WHERE username = ? ';

          }
          else if (respond.length == 0) {

            var followingTableSqlQuery   = 'INSERT INTO following VALUES (DEFAULT,?,?)';
            var followerTableSqlQuery    = 'INSERT INTO follower VALUES(DEFAULT,?,?)';
            var updateFollowingSqlQuery  = 'UPDATE users SET following = following + 1 WHERE username = ? ';
            var updateFollowerSqlQuery   = 'UPDATE users SET followers = followers + 1 WHERE username = ? ';

          }

          //insert the names in the following table (username and follow_name):
          connection.connection.query(followingTableSqlQuery, [userLoggedIN, followingInfo.username],
            function (
              err) {
                if (err) {
                  res.status(400).json("There is a problem with inserting the username in the following table")
                }
            }
          )

          //insert the names in the follower table (username and follow_name):
          connection.connection.query(followerTableSqlQuery, [followingInfo.username, userLoggedIN],
            function (
              err) {
                if (err) {
                  res.status(400).json("There is a problem with inserting the username in the follower table")
                }
            }
          )

          //increase the number of followings by for the username in the users table:
          connection.connection.query(updateFollowingSqlQuery, userLoggedIN,
            function (
              err) {
                if (err) {
                  res.status(400).json("There is a problem in updating the value of following in users table")
                }
            }
          )

          //increase the number of followings by for the username in the users table:
          connection.connection.query(updateFollowerSqlQuery, followingInfo.username,
            function (
              err) {
                if (err) {
                  res.status(400).json("There is a problem in updating the value of follwers in users table")
                }
            }
          )

          if (respond.length == 0){
              res.status(200).json("Follow worked!");
          } else {
              res.status(200).json("Unfollow worked!");
          }
    }
  )
})

module.exports = ROUTER;
