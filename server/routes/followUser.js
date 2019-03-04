const express = require('express');
const router5 = express.Router();
const sourceFile = require('./login_register');
var mySql = require('mysql');
const connection = require('../server');

//to make sure that the API is working
router5.get("/", (req, res) => {
    res.send("From The followUser API ");
   
  });



  //follow a user:
    router5.post('/followUser', (req, res) => {
    //we will get the followedUser id(username) from the frontend:
      var followingInfo = req.body;
      console.log(req.body);
      var follow = {
        username: userLoggedIN,
        followingUsername: followingInfo.username
    
    }

    //followingUsername is the name of the user that the userLoggedIN decided to follow
    //the name is passed by the frontend , so if nothing is returned then there is a problem
    if (followingInfo.username.length == 0) {
        res.status(401).json("Error with the follow user operation");
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
      else if (rows.length == 1) {
        res.status(401).json("You can't follow a user twice");
      }
        
    //updating the table of users by increasing the userLoggedIn following number
    //and increasinf the number of followers for the followed user
      sqlQuery4 = "INSERT INTO following VALUES (DEFAULT,?,?)"
      connection.connection.query(sqlQuery4, [follow.username, follow.followingUsername], function (err, result) {
        if (err) {
          res.json({
            code: 400,
            message: "there are some error with query"
          });
        } 
        else {
    //Insert in the likes table, the username who likes this post
          sqlQuery5 = "INSERT INTO follower VALUES(DEFAULT,?,?)"
          connection.connection.query(sqlQuery5, [follow.followingUsername, follow.username], function (err, row) {
            if (err) {
              res.json({
                code: 400,
                message: "there are some error with the second query"
              });
            } 
            
            
            else {
               sqlQuery6 ="UPDATE users SET following = following + 1 WHERE username = ? "
              connection.connection.query(sqlQuery6,  follow.username, function (err, row) {
                if (err) {
                  res.json({
                    code: 400,
                    message: "there are some error with the third query"
                  });
                } else{
                    sqlQuery7 ="UPDATE users SET followers = followers + 1 WHERE username = ? "
                    connection.connection.query(sqlQuery7,  follow.followingUsername, function (err, row) {
                        if (err) {
                          res.json({
                            code: 400,
                            message: "there are some error with the fourth query"
                          });
                        }else {   
                            res.status(200).json("worked!");
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
