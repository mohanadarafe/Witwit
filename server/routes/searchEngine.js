const express = require('express');
const router = express.Router();
const connection = require('../server');
const jwtToken = require('jwt-decode');
var userLoggedIN = null;

//To get the userLoggedIn for during search:
router.post('/currentUser', function (req,res) {
    userToken = req.body;
    var decoded = (jwtToken(userToken.token)).username;
    userLoggedIN = decoded;
    res.status(200).json("valid user");
})

//Search:
router.post('/search', (req,res) => {
    var userInfo=req.body;
    console.log("username: "+ userInfo.username);

    var decoded = (jwtToken(userInfo.token)).username;
    userLoggedIN = decoded;

    //to make sure empty searches do not give all users
    if (userInfo.username==''){
      userInfo.username="~"
    }
    setboolValueSqlQuery      = "UPDATE users " +
                                "SET boolValue = false";

    setFollowingUsersSqlQuery = "UPDATE users " +
                                "INNER JOIN following ON "+
                                "(following.username like ? AND following.follow_name like users.username) " +
                                "SET users.boolValue = true";

    getUsersInfoSqlQuery      = 'SELECT ' +
                                'username, user_id, image, age, followers, following, boolValue '+
                                'FROM users where username like ?';

  //set the boolValue to false for all the users:
  connection.connection.query(setboolValueSqlQuery,
    function(
      err) {
        if (err) {
        res.status(400).json("There are some problem with query for setting boolValue to false");
        }
    })

    //set the boolValue to true if the current user is following them:
    connection.connection.query(setFollowingUsersSqlQuery , userLoggedIN,
       function(
         err) {
            if (err) {
              res.status(400).json("There are some problem with query for finding current user's followers");
            } else{

                //Retrieving the user info from the database:
                connection.connection.query(getUsersInfoSqlQuery, userInfo.username,
                  function(
                    err,
                    respond) {
                          if (err) {
                            res.status(400).json("There are some problem with query to retrieve the users information");
                          } else {
                              res.status(200).send(respond);
                          }
                  });
              }
        })
});

module.exports = router;
