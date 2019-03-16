const express = require("express");
const routerUserProfile = express.Router();
const connection = require("../server");
const jwtToken = require('jwt-decode');
var userLoggedIN = null;

//Getting user info:
routerUserProfile.post("/userLoggedIn", (req,res)=>{
  userToken = req.body;
  var decoded = (jwtToken(userToken.token)).username;
  userLoggedIN = decoded;
  res.status(200).json(userLoggedIN);
})

routerUserProfile.post("/userInfo", (req, res) => {
  userInfo = req.body;
  console.log(userInfo.username);
  sqlQueryTimelineProfile = "SELECT * FROM users WHERE username=?";
  connection.connection.query(sqlQueryTimelineProfile, userInfo.username, function(err, results) {
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with query"
      });
    } else {
      if (results.length > 0) {
        res.status(200).send(results);
      } else {
        res.status(400).send("No user exists with this username");
      }
    }
  });
});

routerUserProfile.post('/wits', (req, res)=> {
  user = req.body;

  sqlTimelineQuery = "Select * FROM events WHERE username = ?"
  connection.connection.query(sqlTimelineQuery, user.username, (err, answer)=>{
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with query"
      });
    }
    else if(answer.length ==0) {
      res.status(200).json("No wits to show");
    }
    else{
      res.status(200).send(answer);
    }
  })
})

routerUserProfile.post('/likedWits', (req, res) => {
  searchedUser = req.body;
  sqlQueryBefore = "UPDATE events SET boolValue = false";
  connection.connection.query(sqlQueryBefore, function (err, respond) {
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with query"
      });
    }
  })
 sqlQueryWit = "UPDATE events INNER JOIN likes ON (events.wit_id = likes.wit_id AND likes.username = ?) SET events.boolValue =true";
  connection.connection.query(sqlQueryWit, userLoggedIN, function (err, answer) {
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with query"
      });
    }
    else {
      sqlQueryRetrieve = "Select * FROM events WHERE boolValue =1"
      connection.connection.query(sqlQueryRetrieve,(err,result)=>{
          if(err){
            res.json({
              code: 400,
              message: "there are some error with query"
            });
          }
          else if (result.length >0) {
            res.status(200).send(result);
          }
          else{
            res.status(200).json("no Likes");
          }
      })
    }
    })
})














//Delete Wits:
routerUserProfile.post('/deleteWit', (req, res) => {
  witInfo = req.body;
//Decreasing the likes number in the events table related to this wit:
  sqlQueryDelete = "DELETE FROM events WHERE wit_id = ?";
  connection.connection.query(sqlQueryDelete, witInfo.wit_id, function (err, result) {
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with query"
      });
    } else {
      res.status(200).json("worked!");
    }
  })
})


//Get List of Following:
routerUserProfile.post('/getListFollowing', (req,res)=>{
  userData = req.body;
  sqlFollowing ="Select follow_name from following where username =?";
  connection.connection.query(sqlFollowing,userData.username,function(err, respond){
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with query"
      });
    }
    else if(respond.length ==0){
      res.status(200).json("You don't have any followings");
    }
    else{
      res.status(200).send(respond);
    }
  })
})

//Get List of following of following:
routerUserProfile.post('/getListFollowingOfFollowing', (req,res)=>{
  userInfo = req.body;
  sqlFollowing ="Select follow_name from follower where username =?";
  connection.connection.query(sqlFollowing,userInfo.username,function(err, respond){
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with query"
      });
    }
    else if(respond.length ==0){
      res.status(200).json("You don't have any followers");
    }
    else{
      res.status(200).send(respond);
    }
  })
})

//Get the list of Followers:
routerUserProfile.post('/getListFollowers', (req,res)=>{
  userData = req.body;


  sqlFollowing ="Select follow_name from following where username =?";
  connection.connection.query(sqlFollowing,userData.username,function(err, respond){
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with query"
      });
    }
    else if(respond.length ==0){
      res.status(200).json("You don't have any followings");
    }
    else{
      res.status(200).send(respond);
    }
  })
})

module.exports = routerUserProfile;



