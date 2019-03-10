const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const nodemailer = require('nodemailer');
const connection = require('../server');
//to make sure that the API is working
router.get("/", (req, res) => {
  res.send("From The Login and Register API ");
});

//Login method:
router.post("/login", (req, res) => {
  //Getting the info from the frontend
  let userData = req.body;
  sqlQuery = "SELECT * FROM users WHERE username=?";
  connection.connection.query(sqlQuery, userData.username, function(err, results, fields) {
    //If there is a problem with the query:
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with query"
      });
    } else {
      //If a user exists with this username
      if (results.length == 1) {
        //If the email and the password are correct
        if (results[0].password === userData.password) {
          let payload = { username: results[0].username };
          let token = jwt.sign(payload, 'secretKey');
          res.status(200).send({token});
        }

        //If the password is incorrect
        else {
          res.status(401).json("Invalid password");

        }
      }

      //Invalid email
      else {
        res.status(401).json("Invalid username");
      }
    }
  });
});


//Register Method
router.post("/register", function (req, res) {
  //retrieving the info from the frontend:
  var userInfo = req.body;
  console.log(req.body)
  var user = {
    username: userInfo.username,
    password: userInfo.password,
    email: userInfo.email,
    image: userInfo.image,
    age: userInfo.age,
    followers: 0,
    following: 0,
  };
  connection.connection.query(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [user.username,user.email],
    (err, rows, fields) => {
      if (err) {
        res.json({
          code: 400,
          message: "there are some error with query"
        });
      }


      // if the username is already found in the database
      else if (rows.length == 1) {
        // if the email is already associated to a user in the database
         if(rows[0].email === userInfo.email){
          res.status(401).json("This email is already taken");
        }
        res.status(401).json("This username is already taken");
      }


      else {
        connection.connection.query("INSERT INTO users SET ?", user, function (
          err,
          results,
          fields) {
          if (err) throw err;
          else {
            let payload = { subject: results.user_id };
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({ token });
          }
        });
      }
    });
});

router.post("/forgot", (req, res) => {
 //Getting the info from the frontend
  let userEmail = req.body;
  console.log(userEmail)
  sqlQuery = "SELECT username, password FROM users WHERE email=?";
  connection.connection.query(sqlQuery, userEmail.email, function (err, results, fields) {
    //If there is a problem with the query:
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with query"
      });
    } else {
      //If a user exists with this email
      if (results.length == 1) {
        //If the email and the password are correct
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'hostlocal4200@gmail.com',
            pass: 'Localhost4200**'

          }
        });
        //Need to change message appropriatly
        var mailOptions = {
          from: 'hostlocal4200@gmail.com',
          to: userEmail.email,
          subject: 'Password Request',
          text: 'Hi ' + results[0].username + '! You recently requested a retrieval of your password from our website. We\'re happy to help.' +
            'The password associated with this account is: ' + results[0].password + '.\nRegards,\nThe Team.',
          html: 'Hi ' + '<strong>' + results[0].username + '</strong>' + '! You recently requested a retrieval of your password from our website. We\'re happy to help.' +
            'The password associated with this account is: <strong>' + results[0].password + '</strong>.<br>Regards,<br>The Team.'
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);

            res.status(200).json("Message has been sent");



          }
        });
      }
      //Invalid email
      else {
        res.status(401).send("Invalid email");

      }
    }
  });
});

// editProfile method
router.post("/editProfile", function(req,res) {
let userData = req.body;
userLogged = "Hampic"

sqlEditQuery = "Select user_id from users WHERE username = ?";
connection.connection.query(sqlEditQuery, userLogged, function(err,respond){
  if(err){
    res.json({
      code: 400,
      message: "Error from retrieving the user_id sql"});
  }
  else{
        Sqlfixing = "UPDATE users SET username = ? WHERE user_id = ?;";
        console.log("name: " + userData.username + " userLoggedIn id: "+ respond[0].user_id)
        connection.connection.query(Sqlfixing,[userData.username,respond[0].user_id], function(err, rows){
          if(err){
              res.json({
                      code: 400,
                      message: "Error from the query"});
          }
          else{

            res.status(200).send("hello i am good :) ");
          }
        })
  }
})


// if(userData.username.length == 0 ){
//   res.status(401).json("Empty field for the username form");
//   return;
// }

// if(userData.username == userLoggedIn){
//   res.status(401).json("Username entered is the same as the original username");
//   return;
// }


// connection.query(
//   "SELECT * FROM users WHERE username = ?"
//   [userData.username],
//   (err, rows, fields) => {
// if(err){
//   res.json({code: 400, message: "Error from the query"});
// }
// if(rows.length >=1){
// if (rows[0].username === userData.username){
//   // I will add for email, age, password
//   res.status(401).json("This username is already taken");
// }}

//else{

 //}

// else {
//   if (userData.usename != null) {
//   var sql1 = "INSERT INTO users (username) VALUES (userData.username)"
//   connection.query(sql1, function(err, results, fields){
//     if (err) throw err;
//     else{
//     if (row[0].username === userData.username){
//     userLoggedIN = userData.username;
//     res.staus(200).send("Profile information has been modified!.");
//   }}
//   });
// }
// // if - email
// // if - password
// // if - age
//    } });
//});
})

module.exports = router;

