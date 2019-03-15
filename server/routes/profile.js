const express = require("express");
const router4 = express.Router();
const connection = require('../server');
const jwtToken = require('jwt-decode');
var userLoggedIN = null;


//revealing his posts only.
router4.post("/profile", (req, res) => {

  userToken = req.body;
  var decoded = (jwtToken(userToken.token)).username;
  userLoggedIN = decoded;
           wits = "SELECT * FROM events WHERE username = ?";
            connection.connection.query(wits, userLoggedIN,  (err1, rowss)=> {
              if(err1) {
                res.json({
                  code: 400,
                  message: "there are some error with query"
                });
              }
              else{
                    if (rowss.length > 0) {
                      res.status(200).send(rowss);
                    }
                    else {
                      res.status(400).json("No wits to show");
                    }
              }
            })
    })

//Delete Wits:
    router4.post('/deleteWit', (req, res) => {
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
    router4.post('/getListFollowing', (req,res)=>{
      userToken = req.body;

      var decoded = (jwtToken(userToken.token)).username;
      userLoggedIN = decoded;

      sqlFollowing ="Select follow_name from following where username =?";
      connection.connection.query(sqlFollowing,userLoggedIN,function(err, respond){
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
    router4.post('/getListFollowingOfFollowing', (req,res)=>{
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
router4.post('/getListFollowers', (req,res)=>{
  userToken = req.body;

  var decoded = (jwtToken(userToken.token)).username;
  userLoggedIN = decoded;

  sqlFollowing ="Select follow_name from following where username =?";
  connection.connection.query(sqlFollowing,userLoggedIN,function(err, respond){
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

    module.exports = router4;
