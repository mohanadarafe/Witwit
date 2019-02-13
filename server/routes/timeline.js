const express = require("express");
const router1 = express.Router();
const sourceFile = require('./login_register')
//YOU can use it dirctly : use userLoggedIN
var mySql = require("mysql");
const connection = require('../server');

//revealing the posts. 
router1.get('/timeline', (req, res) => {
//First checking if the user is following anyone. if he doesn't then we will only display his own post on the timeline if he has any:
  sqlQuery1_temp = "Select following FROM users Where username =?";
  connection.connection.query(sqlQuery1_temp, userLoggedIN, (err, row) => {
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with query"
      });
    }
    else {
 //if it has followings: then we will display the wits of his followings and his.
      if (row[0].following > 0) {
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
              res.status(400).json("No wits to show");
            }
          }
        })
      }
      else {
//Otherwise we will show only his:
        sqlQuery_no_following = "SELECT * FROM events WHERE username = ?";
        connection.connection.query(sqlQuery_no_following, userLoggedIN,  (err1, rowss)=> {
          if(err1) {
            res.json({
              code: 400,
              message: "there are some error with query"
            });
          }
          else{
                if (rowss.length > 0) {
                  res.status(200).send(rowss);
                }
                else {
                  res.status(400).json("No wits to show");
                }
          }
        })
      }
    }
  })
})


router1.get('/likedWits', (req, res) => {
  sqlQueryBefore = "UPDATE events SET boolValue = false";
  connection.connection.query(sqlQueryBefore, userLoggedIN, function (err, respond) {
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with query"
      });
    }
  })
 sqlQueryWit = "UPDATE events INNER JOIN likes ON (events.wit_id = likes.wit_id AND likes.username = ?) SET events.boolValue =true";
  connection.connection.query(sqlQueryWit, userLoggedIN, function (err, answer) {
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with query"
      });
    }
    else {
      res.status(200).send(answer);
    }
    })
})


//likes of a wit:
router1.post('/like', (req, res) => {
//we will get the wit_id from the frontend:
  witInfo = req.body;
//updating the table of events by increasing the likes number of this wit:
  sqlQuery2 = "UPDATE events SET numOfLikes = numOfLikes + 1, boolvalue = true WHERE wit_id = ? ";
  connection.connection.query(sqlQuery2, witInfo.wit_id, function (err, result) {
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with query"
      });
    } else {
//Insert in the likes table, the username who likes this post
      sqlQuery3 = "INSERT INTO likes VALUES(DEFAULT,?,?)"
      connection.connection.query(sqlQuery3, [witInfo.wit_id, userLoggedIN], function (err, row) {
        if (err) {
          res.json({
            code: 400,
            message: "there are some error with the second query"
          });
        } else {
          res.status(200).json("worked!");
        }
      })
    }
  })
})


//Disliking if the user already liked it:
router1.post('/unlike', (req, res) => {
  witInfo = req.body;
//Decreasing the likes number in the events table related to this wit:
  sqlQuery5 = "UPDATE events SET numOfLikes = numOfLikes - 1, boolValue = false WHERE wit_id = ? ";
  connection.connection.query(sqlQuery5, witInfo.wit_id, function (err, result) {
    if (err) {
      res.json({
        code: 400,
        message: "there are some error with query"
      });
    } else {
//Deleting the username from the table of likes.
      sqlQuery3 = "DELETE FROM likes WHERE wit_id =? AND username = ?"
      connection.connection.query(sqlQuery3, [witInfo.wit_id, userLoggedIN], function (err, row) {
        if (err) {
          res.json({
            code: 400,
            message: "there are some error with the second query"
          });
        } else {
          res.status(200).json("unlikeing post worked YOU HAPPY !!");
        }
      })
    }
  })
})

//Sending the list of the users name who like this post:
router1.post('/likesList', function (req, res) {
  witInfo = req.body;
  console.log(req.body);
  sqlQuery4 = "SELECT username FROM likes where wit_id = ?";
  connection.connection.query(sqlQuery4, witInfo.wit_id, (err, result) => {
    if (err) {
      res.json({
        code: 400,
        message: "liked list there are some error with the second query"
      });
    }
    else {
      if (result.length == 0) {
//If no one liked this post it will return 0;
        res.status(200).json(0);
      }
      else {
        res.status(200).send(result);
      }
    }

  })
})
module.exports = router1;

