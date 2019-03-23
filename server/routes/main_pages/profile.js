const express = require("express");
const router = express.Router();
const connection = require('../../server');
const jwtToken = require('jwt-decode');
const jwt = require("jsonwebtoken");
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

  retrieveWitSqlQuery = "Select * FROM events WHERE boolValue =1";


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
router.post("/editUsername", function (req, res) {
  let userData = req.body;
  console.log("username: " + userData.username);
  console.log("userLogged: " + userLoggedIN);

  // editing the username
  if (userData.username != null) {

    // condition - if the username is already in the database (because it has to be a unique username)

    if (userData.username == userLoggedIN) {
      res.status(401).json("Username entered is the same as the original username");
      return;
    }

    sqlCheckQuery = "SELECT * FROM users WHERE username = ?";
    connection.connection.query(sqlCheckQuery, userData.username, function (err, result) {
      if (err) {
        res.json({
          code: 400,
          message: "Theres an error with the query"
        })
      } if (result.length == 1) {
        res.status(401).json("This username is already taken");
      }
    })



    sqlEditQuery = "Select user_id from users WHERE username = ?";
    connection.connection.query(sqlEditQuery, userLoggedIN, function (err, respond) {
      if (err) {
        res.json({
          code: 400,
          message: "Error from retrieving the user_id sql"
        });
      }

      else {
        sqlFixing = "UPDATE users SET username = ? WHERE user_id = ?";
        userId = respond[0].user_id;
        console.log("new name: " + userData.username + " userLoggedIn id: " + userId)
        connection.connection.query(sqlFixing, [userData.username, respond[0].user_id], function (err, rows) {
          if (err) {
            res.status(400).json(rows);
          }
          else {
            userLoggedIN = userData.username;
            console.log("new user logged in: " + userLoggedIN);
            let payload = { username: userLoggedIN };
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({ token });
          }
        })
      }
    })
  }
})

// password request method 
router.post("/editEmail", (req, res) => {
  let userData = req.body;
  if (userData.email != null) {

    sqlCheckQuery2 = "SELECT * FROM users WHERE email = ?";
    connection.connection.query(sqlCheckQuery2, [userData.email], function (err, result2) {
      if (err) {
        res.json({
          code: 400,
          message: "Theres an error with the query"
        })
      }
      else {
        if (result2.length == 1) {
          res.status(401).json("This email is already taken");
        }
      }
    })

    sqlEditEmail = "UPDATE users SET email = ? WHERE username = ?";
    console.log("email: " + userData.email);
    connection.connection.query(sqlEditEmail, [userData.email, userLoggedIN], function (err, rows) {
      if (err) {
        res.json({
          code: 400,
          message: "Error from the query"
        });
      } else {
        let payload = { username: userLoggedIN };
        let token = jwt.sign(payload, 'secretKey');
        res.status(200).send({ token });
      }

    })
  }


})

// age request method 
router.post("/editAge", (req, res) => {
  let userData = req.body;
  if (userData.age != null) {
    sqlEditAge = "UPDATE users SET age = ? WHERE username = ?";
    console.log("age: " + userData.age);
    console.log("user: " + userLoggedIN);
    connection.connection.query(sqlEditAge, [userData.age, userLoggedIN], function (err, rows) {
      if (err) {
        res.status(400).json(rows);

      } else {
        let payload = { username: userLoggedIN };
        let token = jwt.sign(payload, 'secretKey');
        res.status(200).send({ token });
      }

    })
  }


})

// reset password method
router.post("/resetPassword", (req, res) => {
  let userData = req.body;

  console.log("username: " + userData.username);
  console.log("userLogged: " + userLoggedIN);
  console.log("password: " + userData.password)

  var oldPassword = userData.oldPassword;
  var newPassword = userData.password;


  if (oldPassword != null) {
    //check if the password exist in the database
    sqlCheckQuery = "SELECT password from users WHERE username =?";
    console.log("Entered old password: " + oldPassword)
    connection.connection.query(sqlCheckQuery, userLoggedIN, function (err, result) {
      if (err) {
        res.status(400).json(result)
      }
      else {
        if (result != oldPassword) {
          res.status(401).json("Wrong password!");
        }
        else {
          res.status(200).json("Password confirmed!");

          if (newPassword != nil) {
            sqlNewPassQuery = "UPDATE password from users WHERE username = ?";
            console.log("Entered new password" + newPassword)
            connection.connection.query(sqlNewPassQuery, userLoggedIN, function (err, passResult) {
              if (err) {
                res.status(400).json(passResult)
              } else {
                res.status(200).json("Changed Password!");
              }
            })
          }
        }
      }
    })
  }



})


router.post("/User", (req, res) => {
  userToken = req.body
  var decoded = jwtToken(userToken.token).username;
  userLoggedIN = decoded
  res.status(200).json("Received token: " + userLoggedIN);

})

module.exports = router;
