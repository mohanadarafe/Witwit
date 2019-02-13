const express = require("express");
const router3 = express.Router();
const sourceFile = require('./login_register')
var mySql = require("mysql");
const connection = require('../server');
<<<<<<< HEAD
=======


>>>>>>> ca7a8b406ffaba8ba6f381239bbce785a49021c0


//to make sure that the API is working 
router3.get("/", (req, res) => {
    res.send("From The timelineProfile API ");
  });


<<<<<<< HEAD
router3.get('/timelineProfile', (req, res) => {
  console.log(userLoggedIN);
  sqlQuery2 = "SELECT * FROM users WHERE username=?";
  connection.connection.query(sqlQuery2, userLoggedIN, function (err, results) {
=======
  router3.get('/timelineProfile', (req, res) => {
    sqlQuery2 = "SELECT * FROM users WHERE username = ?"
    connection.connection.query(sqlQuery2, userLoggedIN, function (err, results) {
>>>>>>> ca7a8b406ffaba8ba6f381239bbce785a49021c0
      if (err) {
        res.json({
          code: 400,
          message: "there are some error with query"
        });
      }
      else {
        if (results.length > 0) {
          res.status(200).send(results);
        }
        else {
          res.status(400).send("No user exists with this username");
        }
      }
      })
  })


  module.exports = router3
