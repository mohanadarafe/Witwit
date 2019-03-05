const express = require('express');
const router6 = express.Router();
const connection = require('../server');
const jwtToken = require('jwt-decode');
var userLoggedIn = null;

//to make sure that the API is working
router6.get("/", (req, res) => {
    res.send("From The searchEngine API");
  });
router6.post('/currentUser', (req,res)=>{
  userToken = req.body;
  userLoggedIn= null;

  if(userLoggedIn==null){
    var decoded = (jwtToken(userToken.token)).username;
    userLoggedIn = decoded;
  }
  console.log(userLoggedIn);
  res.status(200).json("valid user");
})

router6.post('/search', (req,res) => {
    var userInfo=req.body;
    userLoggedIn = "Hampic";
    //to make sure empty searches do not give all users
    if (userInfo.username==''){
      userInfo.username="~"
    }
    sqlQueryBefore = "UPDATE users SET boolValue = false";
  connection.connection.query(sqlQueryBefore, function (err, respond) {
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with query"
      });
    }
  })
    sqlQueryWit = "UPDATE users INNER JOIN following ON (users.username like ? AND following.username like ? AND following.follow_name like ?) SET users.boolValue =true ";
    connection.connection.query(sqlQueryWit,[userInfo.username,userLoggedIn,userInfo.username], function(err, results) {
      if (err) {
        res.json({
          code: 400,
          message: "there are some error with query"
        });
      }
        else{
          console.log(results);
            connection.connection.query
    var sqlQuery='SELECT username, user_id, image, age, followers, following, boolValue FROM users where username like "%'+userInfo.username+'%"'
    connection.connection.query(sqlQuery, function(err, results) {
        if (err) {
          res.json({
            code: 400,
            message: "there are some error with query"
          });
        } else {
          if (results.length > 0) {
            console.log(results)
            res.status(400).send(results);
          } else {
            res.status(400).send("No user exists with this username");
          }
        }
      });
    }
  })// res.status(200).send(JSON.stringify(userMatch));
        //console.log(userMatch)
    });

module.exports = router6;
