const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const JWTTOKEN = require('jwt-decode');
const JWT = require("jsonwebtoken");

var connection = require('../../server');
var userLoggedIN = null;


//revealing his posts only.
ROUTER.post('/profile', (req, res) => {
  var userToken = req.body;

  var decoded = (JWTTOKEN(userToken.token)).username;
  userLoggedIN = decoded;

  var retrieveWitsSqlQuery = 'SELECT * FROM events WHERE username = ?';

  //Retrieve the wits posted by the current user:
  connection.connection.query(retrieveWitsSqlQuery, userLoggedIN,
    (err,
      respond) => {
      if (err) {
       res.status(400).json("There is a problem in retrieving the wits of the current user");
      }
      else {
       res.status(200).send(respond);
      }
    })
})

// Retrieving wits liked by the current user:
ROUTER.post('/likedWitsTab', (req, res) => {
  var userInfo = req.body;

  var decoded = (JWTTOKEN(userInfo.token)).username;
  userLoggedIN = decoded;

  var defaultWitTableSqlQuery = 'UPDATE events ' +
                                'SET boolValue = false';

  var updateWitTableSqlQuery = 'UPDATE events ' +
                               'INNER JOIN likes ON ' +
                               '(events.wit_id = likes.wit_id AND likes.username = ?) ' +
                               'SET events.boolValue =true';

  var retrieveWitSqlQuery = 'Select * FROM events WHERE boolValue =1';


  connection.connection.query(defaultWitTableSqlQuery, userLoggedIN,
    function (
      err) {
      if (err) {
        res.status(400).json("There is a problem in putting the default Value for boolValue in events table");
      }
    })
  connection.connection.query(updateWitTableSqlQuery, userLoggedIN,
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
            if (err) {
              res.status(400).json("There was a problem in retrieving the wits which the user liked");
            } else {
              res.status(200).send(respond);
            }
          })
      }
    })
})

// username request method 
ROUTER.post('/editUsername', function (req, res) {
  let userData = req.body;

  // editing the username
  if (userData.username != null) {

    // condition - if the username is already in the database (because it has to be a unique username)
    if (userData.username == userLoggedIN) {
      res.status(401).json("Username entered is the same as the original username");
      return;
    }

    //checks if the username exists in the database
    var sqlCheckSqlQuery = 'SELECT * FROM users WHERE username = ?';

    connection.connection.query(sqlCheckSqlQuery, userData.username,
      function (err, result) {
        if (err) {
          res.json({
            code: 400,
            message: "There is a problem retrieving the username in the database"
          })
        }
        if (result.length == 1) {
          res.status(401).json("This username is already taken");
        }
      })

    //selects the id of the username in the database
    sqlEditQuery = "Select user_id from users WHERE username = ?";

    connection.connection.query(sqlEditQuery, userLoggedIN,
      function (err, respond) {
        if (err) {
          res.json({
            code: 400,
            message: "Error from retrieving the user_id sql"
          });
        }
        else {

          // changes the username in the database
          sqlFixing = "UPDATE users SET username = ? WHERE user_id = ?";

          userId = respond[0].user_id;

          connection.connection.query(sqlFixing, [userData.username, respond[0].user_id],
            function (err, rows) {
              if (err) {
                res.json({
                  code: 400,
                  message: "Error from updating the username in the sql"
                });
              }
              else {
                userLoggedIN = userData.username;
                let payload = { username: userLoggedIN };
                let token = JWT.sign(payload, 'secretKey');
                res.status(200).send({ token });
              }
            })
        }
      })
  }
})

// password request method 
ROUTER.post("/editEmail", (req, res) => {
  let userData = req.body;

  if (userData.email != null) {

    //checks if the email exists in the database
    sqlCheckQuery2 = "SELECT * FROM users WHERE email = ?";

    connection.connection.query(sqlCheckQuery2, [userData.email],
      function (err, result) {
        if (err) {
          res.json({
            code: 400,
            message: "There is a problem retrieving the email in the database"
          })
        }
        else {
          if (result.length == 1) {
            res.status(401).json("This email is already taken");
          }
        }
      })

    // changes the email in the database
    sqlEditEmail = "UPDATE users SET email = ? WHERE username = ?";

    connection.connection.query(sqlEditEmail, [userData.email, userLoggedIN],
      function (err, respond) {
        if (err) {
          res.json({
            code: 400,
            message: "Error from updating the email in the sql"
          });
        } else {
          let payload = { username: userLoggedIN };
          let token = JWT.sign(payload, 'secretKey');
          res.status(200).send({ token });
        }
      })
  }
})

// age request method 
ROUTER.post("/editAge", (req, res) => {
  let userData = req.body;

  if (userData.age != null) {

    // changes the age in the database
    sqlEditAge = "UPDATE users SET age = ? WHERE username = ?";

    connection.connection.query(sqlEditAge, [userData.age, userLoggedIN],
      function (err) {
        if (err) {
          res.json({
            code: 400,
            message: "Error from updating the age in the sql"
          });
        } else {
          let payload = { username: userLoggedIN };
          let token = JWT.sign(payload, 'secretKey');
          res.status(200).send({ token });
        }
      })
  }
})

// reset password method
ROUTER.post("/resetPassword", (req, res) => {
  let userData = req.body;

  var oldPassword = userData.oldPassword;
  var newPassword = userData.password;

  if (oldPassword != null) {

    //check if the password exists in the database
    sqlCheckQuery = "SELECT password from users WHERE username = ?";

    connection.connection.query(sqlCheckQuery, userLoggedIN,
      function (err, result) {
        if (err) {
          res.status(400).json("Error from retrieving the password from sql")
        }
        else {
          password_sql = result[0].password
          if (password_sql != oldPassword) {
            res.status(401).json("Wrong password");
          }
          else {
            if (newPassword != null) {
              // changes the password in the database
              sqlNewPassQuery = "UPDATE users SET password = ? WHERE username = ?";

              connection.connection.query(sqlNewPassQuery, [newPassword, userLoggedIN],
                function (err, passResult) {
                  if (err) {
                    res.status(400).json("There was a problem updating the password in the query");
                  } else {
                    res.status(200).send(passResult);
                  }
                })
            }
          }
        }
      })
  }
}
)

// send token request 
ROUTER.post("/User", (req, res) => {
  userToken = req.body

  var decoded = JWTTOKEN(userToken.token).username;

  userLoggedIN = decoded

  res.status(200).json("Received token: " + userLoggedIN);
})

module.exports = ROUTER;
