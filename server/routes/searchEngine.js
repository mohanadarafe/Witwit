const express = require('express');
const router6 = express.Router();
const sourceFile = require('./login_register');
var mySql = require('mysql');
const connection = require('../server');

//to make sure that the API is working
router6.get("/", (req, res) => {
    res.send("From The searchEngine API");
   
  });

router6.post('/search', (req,res) => {
    var userInfo=req.body;
    var sqlQuery='SELECT username, user_id, image, age, followers, following FROM users where username like "%'+userInfo.username+'%"'
    connection.connection.query(sqlQuery, function(err, results) {
        if (err) {
          res.json({
            code: 400,
            message: "there are some error with query"
          });
        } else {
          if (results.length > 0) {
            res.status(200).send(results);
            console.log(results)
          } else {
            res.status(400).send("No user exists with this username");
          }
        }
      });
       // res.status(200).send(JSON.stringify(userMatch));
        //console.log(userMatch)
    });

module.exports = router6;
