const express = require("express");
const router = express.Router();
const connection = require("../server");
const jwtToken = require('jwt-decode');
var userLoggedIN = null;

//Getting user info:
router.post("/userLoggedIn", (req,res)=>{
  userToken = req.body;
  var decoded = (jwtToken(userToken.token)).username;
  userLoggedIN = decoded;
  res.status(200).json({ userLoggedIN });
})

//Retrieving the info regarding the user searched:
router.post("/userInfo", (req, res) => {
  userInfo = req.body;

  var decoded = (jwtToken(userInfo.token)).username;
  userLoggedIN = decoded;

  defaultBoolValueSqlQuery  = "UPDATE users " +
                              "SET boolValue = false WHERE username = ?";

  updateUsersTableSqleQuery = "UPDATE users " +
                              "INNER JOIN following ON " +
                              "(following.username = ? AND following.follow_name like users.username) " +
                              "SET users.boolValue = true";

  retrieveUsersSqlQuery     = "SELECT * FROM users WHERE username=?"

  //Setting the boolValue to false (default value) before doing anything:
  connection.connection.query(defaultBoolValueSqlQuery,userInfo.username,
    function (
      err) {
          if (err) {
            res.status(400).json("Error in setting boolValue to its default value");
          }
          //Setting the boolValue of the user passed to the method to true:
          connection.connection.query(updateUsersTableSqleQuery,userLoggedIN,
            function(
              err) {
                  if (err) {
                    res.status(400).json("Error in changing the Value of boolValue");
                  }
          })
          connection.connection.query(retrieveUsersSqlQuery, userInfo.username,
            function(
              err,
              respond) {
                    if (err) {
                        res.status(400).json("Error in retrieving the chosen user info");
                    } else {
                            res.status(200).send(respond);
                    }
          });
      });
});

//Getting wits for the wits tab:
router.post('/wits', (req, res)=> {
  user = req.body;

  getWitsSqlQuery = "Select * FROM events WHERE username = ?"

  //Retrieve the list of wits posted by a user:
  connection.connection.query(getWitsSqlQuery, user.username,
    function(
      err,
      respond){
          if (err) {
            res.status(400).json("Error in retrieving the wits posted by a user");
          }else{
            res.status(200).send(respond);
          }
    })
})



router.post('/likedWits', (req, res) => {
  userData = req.body;

  defaultWitTableSqlQuery = "UPDATE events " +
                            "SET boolValue = false";

  updateWitTableSqleQuery = "UPDATE events " +
                            "INNER JOIN likes ON " +
                            "(events.wit_id = likes.wit_id AND likes.username = ?) " +
                            " SET events.boolValue =true";

  retrieveWitSqlQuery     = "Select * FROM events WHERE boolValue =1"

  //Setting the boolValue to false (Default Value) before doing anything:
  connection.connection.query(sqlQueryBefore,
    function (
      err) {
        if (err) {
            res.status(400).json("There is a problem in setting boolValue to false in the events table");
        }
  })
  //Setting the booValue to true if the user liked this wit:
  connection.connection.query(updateWitTableSqleQuery, userData.username,
    function (
      err) {
        if (err) {
            res.status(400).json("There is a problem in setting the boolValue to true in events table");
        }
        else {
            //Retrieve a list of wits that the user liked:
            connection.connection.query(retrieveWitSqlQuery,
              function(
                err,
                respond){
                    if(err){
                      res.status(400).json("There is a problem with retrieving the wits from the database");
                    }else {
                      res.status(200).send(respond);
                    }
              })
          }
    })
})














//Have this method in delete : (DELETE)
router.post('/deleteWit', (req, res) => {
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
router.post('/getListFollowing', (req,res)=>{
  userData = req.body;

  getFollowingListSqlQuery = "Select follow_name from following where username =?";

  //Retrieve the list of users who are following a specific user:
  connection.connection.query(getFollowingListSqlQuery,userData.username,
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

//Get List of following of following:
//I dont think u need this method: (Delete):
router.post('/getListFollowingOfFollowing', (req,res)=>{
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
router.post('/getListFollowers', (req,res)=>{
  userData = req.body;

  sqlFollowing ="Select follow_name from follower where username =?";

  //Retrieving the list of users being followed by a specific user:
  connection.connection.query(sqlFollowing,userData.username,
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


// You have a similar method in post.js: (might delete):
router.post('/postReply', (req, res) => {
  var replyInfo = req.body;
  var post = {
      token: replyInfo.token,
      reply: replyInfo.reply,
      wit_id: replyInfo.wit_id,
      numOfLikes: 0,
  }
  var decoded = (jwtToken(post.token)).username;
  userLoggedIN = decoded;

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
//You have this method in list: (Delete):
router.post('/repliesList', function (req, res) {
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
//You have this method in delete.js :(Delete)
router.post('/deleteComment', (req, res) => {
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

//you have this method in like Reply: (Delete):
router.post('/likeReply', (req, res) => {
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
//you have this method in likeReply: (delete)
router.post('/unlikeReply', (req, res) => {
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

//You have this method in list.js: (delete):
router.get('/likedReplies', (req, res) => {
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



module.exports = router;



