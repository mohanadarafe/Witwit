const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const nodemailer = require('nodemailer');
var mySql = require("mysql");
var connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "witwit"
});
//to make sure that the API is working 
router.get("/", (req, res) => {
  res.send("From The Login and Register API ");
});

//Login method:
router.post("/login", (req, res) => {
  //Getting the info from the frontend
  let userData = req.body;
  sqlQuery = "SELECT * FROM users WHERE username=?";
  connection.query(sqlQuery, userData.username, function(err, results, fields) {
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
          let payload = { subject: results.user_id };
          let token = jwt.sign(payload, 'secretKey');
          res.status(200).send({token});
        }

        //If the password is incorrect
        else {
          res.status(401).send("Invalid password");
        }
      }

      //Invalid email
      else {
        res.status(401).send("Invalid username");
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
    birthday: null
  };
  connection.query(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [user.username,user.email],
    (err, rows, fields) => {
      if (err) {
        res.json({
          code: 400,
          message: "there are some error with query"
        });
      }
      else if (rows.length == 1) {
        res.status(401).send("The email or username already exists");
      }
      else {
        connection.query("INSERT INTO users SET ?", user, function (
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
  let userEmail = req.body.email;
  sqlQuery = "SELECT email, password FROM users WHERE email=?";
  connection.query(sqlQuery, userEmail, function(err, results, fields) {
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
        var transporter = nodemailer.createTransport({
          service: 'hotmail',
          //Need to get default email for this later
          auth: {
            user: '@hotmail.com',
            pass: 'password'
          }
        });
        //Need to change message appropriatly
        var mailOptions = {
          from: '@hotmail.com',
          to: results[0].email,
          subject: 'Sending Email using Node.js',
          text: 'That was easy!\n'+results[0].password+' is your password!'
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
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

module.exports = router;
