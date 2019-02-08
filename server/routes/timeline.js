const express = require("express");
const router1 = express.Router();
const sourceFile = require('./login_register')
//YOU can use it dirctly : use userLoggedIN
var mySql = require("mysql");
const connection = require('../server');

//revealing the posts. 
router1.get('/timeline', (req, res) => {
  sqlQuery1 = "SELECT * FROM events WHERE username IN (SELECT follow_name AND username FROM following WHERE username = ?)"
  connection.connection.query(sqlQuery1, userLoggedIN, function (err, results) {
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
        res.status(400).send("No wits to show");
      }
    }
    })
})
//likes of a wit:
router1.post('/like', (req, res) => {
  witInfo = req.body;
  console.log("hello" + witInfo.wit_id);
  sqlQuery2 = "UPDATE events SET numOfLikes = numOfLikes + 1 WHERE wit_id = ? ";
  connection.connection.query(sqlQuery2, witInfo.wit_id, function (err, result) {
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with query"
      });
    } else {
      
      sqlQuery3 = "INSERT INTO likes VALUES(DEFAULT,?,?)"
      connection.connection.query(sqlQuery3, [witInfo.wit_id, userLoggedIN], function (err, row) {
        if (err) {
          res.json({
            code: 400,
            message: "there are some error with the second query"
          });
        } else {
          res.status(200).send("worked!");
        }
      })
    }
  })
})

//Disliking if the user already liked it:
router1.post('/unlike', (req, res) => {
  witInfo = req.body;
  console.log("hello" + witInfo.wit_id);
  sqlQuery2 = "UPDATE events SET numOfLikes = numOfLikes - 1 WHERE wit_id = ? ";
  connection.connection.query(sqlQuery2, witInfo.wit_id, function (err, result) {
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with query"
      });
    } else {

      sqlQuery3 = "DELETE FROM likes WHERE wit_id =?"
      connection.connection.query(sqlQuery3, witInfo.wit_id, function (err, row) {
        if (err) {
          res.json({
            code: 400,
            message: "there are some error with the second query"
          });
        } else {
          res.status(200).send("worked!");
        }
      })
    }
  })
})
module.exports = router1;
