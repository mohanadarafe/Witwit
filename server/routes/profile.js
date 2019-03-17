const express = require("express");
const router = express.Router();
const connection = require('../server');
const jwtToken = require('jwt-decode');
var userLoggedIN = null;


//revealing his posts only.
router.post("/profile", (req, res) => {
  userToken = req.body;

  var decoded = (jwtToken(userToken.token)).username;
  userLoggedIN = decoded;

  retrieveWitsSqlQuery = "SELECT * FROM events WHERE username = ?";

      //Retrieve the wits posted by the current user:
      connection.connection.query(retrieveWitsSqlQuery, userLoggedIN,
          (err,
          respond)=> {
                if(err) {
                  res.status(400).json("There is a problem in retrieving the wits of the current user");
                }
                else{
                  res.status(200).send(respond);
                }
        })
})

//Delete Wits:
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
//Can delete got it in the following list:
router.post('/getListFollowing', (req,res)=>{
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
          res.status(200).send(respond);
        }
        else{
          res.status(200).send(respond);
        }
      })
    })

//Get List of following of following:
//(Uselesss):
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
//have it in the follower list file:
router.post('/getListFollowers', (req,res)=>{
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

//keep:
router.post('/likedWitsTab', (req, res) => {
  userInfo = req.body;

  var decoded = (jwtToken(userInfo.token)).username;
  userLoggedIN = decoded;

  defaultWitTableSqlQuery = "UPDATE events " +
                            "SET boolValue = false";

  updateWitTableSqleQuery = "UPDATE events " +
                            "INNER JOIN likes ON " +
                            "(events.wit_id = likes.wit_id AND likes.username = ?) " +
                            "SET events.boolValue =true";

  retrieveWitSqlQuery     = "Select * FROM events WHERE boolValue =1";


  connection.connection.query(defaultWitTableSqlQuery, userLoggedIN,
    function (
      err) {
          if (err) {
            res.satuts(400).json("There is a problem in putting the default Value for boolValue in events table");
          }
  })
  connection.connection.query(updateWitTableSqleQuery, userLoggedIN,
    function (
      err) {
          if (err) {
            res.status(400).json("There is a problem in setting the value for boolValue in events table");
          }
          else {

            connection.connection.query(retrieveWitSqlQuery,
              function (
                err,
                respond) {
                    if(err){
                      res.status(400).json("There was a problem in retrieving the wits which the user liked");
                    } else{
                      res.status(200).send(respond);
                    }
              })
            }
    })
})

//chris:
router.post("/editProfile", function(req,res) {
  let userData = req.body;
  console.log("username: " + userData.username);
  console.log("userLogged: "+ userLoggedIN);

  // DONT FORGET TO MODIFY THE TOKEN AS WELL (self reminder!)

  // editing the username
  if(userData.username != null){

       // condition - if the username is already in the database (because it has to be a unique username)

       if(userData.username == userLoggedIN){
        res.status(401).json("Username entered is the same as the original username");
        return;
      }

    sqlCheckQuery = "SELECT * FROM users WHERE username = ?";
    connection.connection.query(sqlCheckQuery,userData.username, function(err,result){
      if(err) {
        res.json ({
          code:  400,
          message: "Theres an error with the query"
        })
      }if(result.length==1){
        res.status(401).json("This username is already taken");
      }
    })



  sqlEditQuery = "Select user_id from users WHERE username = ?";
  connection.connection.query(sqlEditQuery, userLoggedIN, function(err,respond){
    if(err){
      res.json({
        code: 400,
        message: "Error from retrieving the user_id sql"});
    }

    else{
          Sqlfixing = "UPDATE users  WHERE user_id = ? SET username = ?";
          userId =respond[0].user_id;
          console.log("name: " + userData.username + " userLoggedIn id: "+ userId)
          connection.connection.query(Sqlfixing,[respond[0].user_id,userData.username], function(err, rows){
            if(err){
                res.status(400).json(rows);
            }
            else{
              userLoggedIN = userData.name;
              res.status(200).send("The username was modified!");
            }
          })
    }
  })
  }

  // editing the email

   // condition - if the username is already in the database (because it has to be a unique username)
  if(userData.email != null){

    sqlCheckQuery2 = "SELECT * FROM users WHERE email = ?";
    connection.connection.query(sqlCheckQuery2,[userData.email], function(err,result2){
      if(err) {
        res.json ({
          code:  400,
          message: "Theres an error with the query"
        })
      }
      else{
        if(result2.length == 1){
          res.status(401).json("This email is already taken");
        }
      }
    })

    sqlEditEmail = "UPDATE users SET email = ? WHERE username = ?";
    console.log("email: "+userData.email);
    connection.connection.query(sqlEditEmail,[userData.email,userLoggedIN], function(err,rows){
      if(err){
        res.json ({
          code: 400,
          message: "Error from the query"});
        }else{
              res.status(200).send("The email was modified!")
          }

        })
      }

      // editing the age
  if(userData.age != null){
    sqlEditAge = "UPDATE users SET age = ?";
    console.log("age: "+userData.age);
    connection.connection.query(sqlEditAge,[userData.age], function(err,rows){
      if(err){
        res.json ({
          code: 400,
          message: "Error from the query"});
        }else{
              res.status(200).send("The age was modified!")
          }

        })
      }

  // if password ??? Not sure yet if im doing it here


  })

    module.exports = router;
