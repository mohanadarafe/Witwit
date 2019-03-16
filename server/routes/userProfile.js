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
  userData = req.body;
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
  connection.connection.query(sqlQueryWit, userData.username, function (err, answer) {
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
              message: "there are some error with sqlQueryRetrieve"
            });
          }
          else {
            res.status(200).send(result);
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

routerUserProfile.post('/postReply', (req, res) => {
  var replyInfo = req.body;
  var post = {
      token: replyInfo.token,
      reply: replyInfo.reply,
      wit_id: replyInfo.wit_id,
      numOfLikes: 0,
  }
  var decoded = (jwtToken(post.token)).username;
  userLoggedIN = decoded;
  console.log("Say hi to: "+ userLoggedIN);

// if (replyInfo.reply.length == 0) {
//   res.status(401).json("Can't post an empty reply !");
//       return;
//   }
  sqlQueryPostReply = "INSERT INTO replies VALUES(DEFAULT,?,?,?,DEFAULT,DEFAULT,DEFAULT)";

  connection.connection.query(sqlQueryPostReply,[post.wit_id,userLoggedIN,post.reply], function (
      err,
      results) {
          if (err) {
              res.json({
                code: 400,
                message: "there are some error with sqlQueryPostReply"
              });
          } else {
              res.status(200).send(results);
          }
      })
})

routerUserProfile.post('/repliesList', function (req, res) {
  replyListInfo = req.body;
  sqlQuery4 = "SELECT * FROM replies where wit_id = ?";
  connection.connection.query(sqlQuery4, replyListInfo.wit_id, (err, result) => {
    if (err) {
      res.json({
        code: 400,
        message: "replies list there are some error with the second query"
      });
    }
    else {
      if (result.length == 0) {
//If no one liked this post it will return 0;
        res.status(200).json(0);
      }
      else {
        res.status(200).send(result);
      }
    }

  })
})

routerUserProfile.post('/deleteComment', (req, res) => {
  deleteReplyInfo = req.body;
//Decreasing the likes number in the events table related to this wit:
  sqlQueryDelete = "DELETE FROM replies WHERE reply_id = ?";
  connection.connection.query(sqlQueryDelete, deleteReplyInfo.reply_id, function (err, result) {
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

routerUserProfile.post('/likeReply', (req, res) => {
  //we will get the reply_id from the frontend:
    replyInfo = req.body;
  //updating the table of replies by increasing the likes number of this wit:
    sqlQuery2 = "UPDATE replies SET numOfLikes = numOfLikes + 1, boolvalue = true WHERE reply_id = ? ";
    connection.connection.query(sqlQuery2, replyInfo.reply_id, function (err, result) {
      if (err) {
        res.json({
          code: 400,
          message: "there are some error with query"
        });
      } else {
  //Insert in the replyLikes table, the username who likes this post
        sqlQuery3 = "INSERT INTO replyLikes VALUES(DEFAULT,?,?)"
        connection.connection.query(sqlQuery3, [replyInfo.reply_id, userLoggedIN], function (err, row) {
          if (err) {
            res.json({
              code: 400,
              message: "there are some error with the second query"
            });
          } else {
            res.status(200).json("worked!");
          }
        })
      }
    })
  })

  routerUserProfile.post('/unlikeReply', (req, res) => {
  replyInfo = req.body;
  sqlQuery5 = "UPDATE replies SET numOfLikes = numOfLikes - 1, boolValue = false WHERE reply_id = ? ";
  connection.connection.query(sqlQuery5, replyInfo.reply_id, function (err, result) {
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with unlikeReply query"
      });
    } else {
      sqlQuery3 = "DELETE FROM replylikes WHERE reply_id =? AND username = ?"
      connection.connection.query(sqlQuery3, [replyInfo.reply_id, userLoggedIN], function (err, row) {
        if (err) {
          res.json({
            code: 400,
            message: "there are some error with the second query"
          });
        } else {
          res.status(200).json("unliking reply worked !!");
        }
      })
    }
  })
})

//liking a reply only once:
routerUserProfile.get('/likedReplies', (req, res) => {
  sqlQueryBefore = "UPDATE replies SET boolValue = false";
  console.log("Hello "+ userLoggedIN);
  connection.connection.query(sqlQueryBefore, userLoggedIN, function (err, respond) {
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with query"
      });
    }
  })
 sqlQueryReply = "UPDATE replies INNER JOIN replylikes ON (replies.reply_id = replylikes.reply_id AND replylikes.username = ?) SET replies.boolValue =true";
  connection.connection.query(sqlQueryReply, userLoggedIN, function (err, answer1) {
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with query"
      });
    }
    else {
      res.status(200).send(answer1);
    }
    })
})



module.exports = routerUserProfile;



