const express = require('express');
const router5 = express.Router();
const connection = require('../server');
var userLoggedIN = null;
const jwtToken = require('jwt-decode');

router5.get('/followingList',(req,res)=> {
    var decoded = (jwtToken(userToken.token)).username;
    userLoggedIN = decoded;
  sqlQueryFollow = "SELECT follow_name FROM following where username = ? ";
  connection.connection.query(sqlQueryFollow,userLoggedIN, (err, resultss)=>{
    if(err){
      res.json({
        code: 400,
        message: "there are some error with query list follow"
      });
    }
    else{
      res.status(200).send(resultss);
    }
  })
})

//follow a user:
router5.post('/followUser', (req, res) => {
  //we will get the followedUser id(username) from the frontend:
  var followingInfo = req.body;
  var decoded = (jwtToken(followingInfo.token)).username;
  userLoggedIN = decoded;

  var follow = {
    username: followingInfo.userLoggedIN,
    followingUsername: followingInfo.username
  }
  console.log("username: "+ follow.username);
  console.log("followingUsername: "+ follow.followingUsername);
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



  connection.connection.query(
    //we can't follow a user more than once
    //query tested in database it's working
    "SELECT * FROM follower WHERE username = ? And follow_name = ? ",
    [follow.followingUsername, follow.username],
    (err, rows, fields) => {
      if (err) {
        res.json({
          code: 400,
          message: "there are some error with query"
        });
      }

      // if the userLoggedIn is already following the requested user found in the database
      //it will return a rows.length equal to 1. Put bigger than just to test it.
      else if (rows.length >= 1) {
        //updating the table of users by decreasing the userLoggedIn following number
        //and decreasing the number of followers for the followed user
        sqlQueryFollowingTable = "DELETE FROM following WHERE username= ? AND follow_name =?";
        sqlQueryFollowerTable = "DELETE FROM follower WHERE username =? AND follow_name =?"
        sqlQueryUpdateFollowing = "UPDATE users SET following = following - 1 WHERE username = ? "
        sqlQueryUpdateFollower = "UPDATE users SET followers = followers - 1 WHERE username = ? "

      }
      else if (rows.length == 0) {
        //updating the table of users by increasing the userLoggedIn following number
        //and increasinf the number of followers for the followed user
        sqlQueryFollowingTable = "INSERT INTO following VALUES (DEFAULT,?,?)"
        sqlQueryFollowerTable = "INSERT INTO follower VALUES(DEFAULT,?,?)"
        sqlQueryUpdateFollowing = "UPDATE users SET following = following + 1 WHERE username = ? "
        sqlQueryUpdateFollower = "UPDATE users SET followers = followers + 1 WHERE username = ? "
      }
        connection.connection.query(sqlQueryFollowingTable, [follow.username, follow.followingUsername], function (err, result) {
          if (err) {
            res.json({
              code: 400,
              message: "there are some error with the first query"
            });
          }
          else {
            //Insert in the likes table, the username who likes this post
            connection.connection.query(sqlQueryFollowerTable, [follow.followingUsername, follow.username], function (err, row) {
              if (err) {
                res.json({
                  code: 400,
                  message: "there are some error with the second query"
                });
              }


              else {
                connection.connection.query(sqlQueryUpdateFollowing, follow.username, function (err, row) {
                  if (err) {
                    res.json({
                      code: 400,
                      message: "there are some error with the third query"
                    });
                  } else {
                    connection.connection.query(sqlQueryUpdateFollower, follow.followingUsername, function (err, row) {
                      if (err) {
                        res.json({
                          code: 400,
                          message: "there are some error with the fourth query"
                        });
                      } else {
                        if(rows.length == 0)
                        res.status(200).json("Follow worked!");
                        else
                        res.status(200).json("Unfollow worked!");

                      }
                    })
                  }
                })
              }
            })
          }
        })
      
    })
})

module.exports = router5;
