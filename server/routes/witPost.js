const express = require('express');
const router2 = express.Router();
const sourceFile = require('./login_register');
const cors = require("cors");

var mySql = require('mysql');
const connection = require('../server');

router2.post('/witPost', (req, res) => {
    var postInfo = req.body;
    var post = {
        username: userLoggedIN,
        wit: postInfo.wit,
        boolValue: false,
        numOfLikes: 0,
        numOfReplies: 0
    }
  if (postInfo.wit.length == 0) {
    res.status(401).json("Empty wit");
        return;
        
    }
    sqlQuery1 = "INSERT INTO events SET ?"

    connection.connection.query(sqlQuery1, post, function (
        err,
        results) {
            if (err) {
                res.json({
                  code: 400,
                  message: "there are some error with query"
                });
            } else {
                res.status(200).send(results);
            }
        })
})
module.exports = router2
