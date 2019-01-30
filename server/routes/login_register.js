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
//i am just tryig osmething
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
router.post("/register", function(req, res, next) {
  //retrieving the info from the frontend:
  let userInfo = req.body;
  var user = {
    username: userInfo.username,
    password: userInfo.password,
    email: userInfo.email,
    image: userInfo.image,
    gender: userInfo.gender,
    age: userInfo.age,
    followers: 0,
    following: 0,
    birthday: null
  };
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    user.email,
    (err, rows, fields) => {
      if (rows.length == 1) {
        res.status(401).send("This email already has an account");
      } else {
        if (user.username != "" && user.password != "" && user.email != "") {
          connection.query("INSERT INTO users SET ?", user, function(
            err,
            results,
            fields
          ) {
            if (err) throw err;
           // res.status(200).send(results);
          });
        } else {
          let payload = { subject: rows.user_id };
          let token = jwt.sign(payload, 'secretKey');
          res.status(200).send({token});
          // res.status(401).send("No Information");
        }
      }
    }
  );
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
