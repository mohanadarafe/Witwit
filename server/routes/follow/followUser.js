const express = require('express');
const router = express.Router();
const connection = require('../../server');
var userLoggedIN = null;
const jwtToken = require('jwt-decode');

//follow a user:
router.post('/followUser', (req, res) => {
  var followingInfo = req.body;

 var decoded       = (jwtToken(followingInfo.token)).username;
 userLoggedIN      = decoded;

  var follow        = {
    username          : userLoggedIN,
    followingUsername : followingInfo.username
  }

  CheckUpFollowingSqlQuery = "SELECT * FROM follower WHERE username = ? And follow_name = ? "


  //followingUsername is the name of the user that the userLoggedIN decided to follow
  //the name is passed by the frontend , so if nothing is returned then there is a problem
  if (followingInfo.username.length == 0) {
    res.status(401).json("Error with the follow user operation");
    return;
  }
  if (follow.username == follow.followingUsername) {
    res.status(401).json("You cannot follow yourself!");
    return;
  }
  //we can't follow a user more than once query tested in database it's working
  connection.connection.query(CheckUpFollowingSqlQuery, [follow.followingUsername, follow.username],
    function (
      err,
      respond) {
          if (err) {
            res.status(400).json("There are a problem checking up the users in the database for following")
          }

          //if the userLoggedIn is already following the requested user found in the database
          //it will return a respond.length equal to 1. Put bigger than just to test it.
          else if (respond.length >= 1) {

            sqlQueryFollowingTable  = "DELETE FROM following WHERE username= ? AND follow_name =?";
            sqlQueryFollowerTable   = "DELETE FROM follower WHERE username =? AND follow_name =?"
            sqlQueryUpdateFollowing = "UPDATE users SET following = following - 1 WHERE username = ? "
            sqlQueryUpdateFollower  = "UPDATE users SET followers = followers - 1 WHERE username = ? "

          }
          else if (respond.length == 0) {

            sqlQueryFollowingTable  = "INSERT INTO following VALUES (DEFAULT,?,?)"
            sqlQueryFollowerTable   = "INSERT INTO follower VALUES(DEFAULT,?,?)"
            sqlQueryUpdateFollowing = "UPDATE users SET following = following + 1 WHERE username = ? "
            sqlQueryUpdateFollower  = "UPDATE users SET followers = followers + 1 WHERE username = ? "
          }

          //insert the names in the following table (username and follow_name):
          connection.connection.query(sqlQueryFollowingTable, [follow.username, follow.followingUsername],
              function (
                err) {
                  if (err) {
                    res.status(400).send("There is a problem with inserting the username in the following table")
                  }
              })

          //insert the names in the follower table (username and follow_name):
          connection.connection.query(sqlQueryFollowerTable, [follow.followingUsername, follow.username],
              function (
                err) {
                  if (err) {
                    res.status(400).json("There is a problem with inserting the username in the follower table")
                  }
              });

          //increasing the number of followings by for the username in the users table:
          connection.connection.query(sqlQueryUpdateFollowing, follow.username,
              function (
                err) {
                  if (err) {
                    res.status(400).json("There is a problem in updating the value of following in users table")
                  }
              })
          //increasing the number of followings by for the username in the users table:
          connection.connection.query(sqlQueryUpdateFollower, follow.followingUsername,
             function (
                err) {
                  if (err) {
                    res.status(400).json("There is a problem in updating the value of follwers in users table")
                  }
              })

          if (respond.length == 0){
              res.status(200).json("Follow worked!");
          } else {
              res.status(200).json("Unfollow worked!");
          }
    })
})

module.exports = router;
