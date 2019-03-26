const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const JWTTOKEN = require('jwt-decode');

var connection = require('../../server');
var userLoggedIN = null;

//To get the userLoggedIn for during search:
ROUTER.post('/currentUser', function (req,res) {
    var userToken = req.body;

    decoded  = (JWTTOKEN(userToken.token)).username;
    userLoggedIN = decoded;

    res.status(200).json("valid user");
})

//Search:
ROUTER.post('/search', (req,res) => {
    var userInfo=req.body;

    decoded = (JWTTOKEN(userInfo.token)).username;
    userLoggedIN = decoded;

    //to make sure empty searches do not give all users
    if (userInfo.username==''){
      userInfo.username='~'
    }
    var setboolValueSqlQuery      = 'UPDATE users ' +
                                'SET boolValue = false';

    var setFollowingUsersSqlQuery = 'UPDATE users ' +
                                'INNER JOIN following ON ' +
                                '(following.username like ? AND following.follow_name like users.username) ' +
                                'SET users.boolValue = true';

    var getUsersInfoSqlQuery      = 'SELECT ' +
                                'username, user_id, image, age, followers, following, boolValue '+
                                'FROM users where username like "'+userInfo.username+'%"';

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
            }
      });

      //Retrieving the user info from the database:
      connection.connection.query(getUsersInfoSqlQuery,
        function(
          err,
          respond) {
              if (err) {
                res.status(400).json("There are some problem with query to retrieve the users information");
              } else {
                res.status(200).send(respond);
              }
      });
});

ROUTER.post('/dropDownList', (req,res) => {
  var userInfo        = req.body
      //to make sure empty searches do not give all users
      if (userInfo.username==''){
        userInfo.username='~'
      }

  var getUserSqlQuery = 'SELECT username FROM users WHERE username LIKE "'+userInfo.username+'%" '

  connection.connection.query(getUserSqlQuery,
  function(
    err,
    respond) {
      if (err) {
        res.status(400).json("There is a problem in finding the usernames")
      } else {
        res.status(200).send(respond)
      }
    }
  )
})

module.exports = ROUTER;
