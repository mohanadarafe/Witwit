const express = require("express");
const router4 = express.Router();
const connection = require('../server');
const jwtToken = require('jwt-decode');
var userLoggedIN = null;
//to make sure that the API is working
router4.get("/", (req, res) => {
    res.send("From The Profile API ");

  });



  //revealing his posts only.
router4.post("/profile", (req, res) => {

  userToken = req.body;

  if(userLoggedIN==null){
    var decoded = (jwtToken(userToken.token)).username;
    userLoggedIN = decoded;
  }
           wits = "SELECT * FROM events WHERE username = ?";
            connection.connection.query(wits, userLoggedIN,  (err1, rowss)=> {
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
    })

    router4.post('/deleteWit', (req, res) => {
      witInfo = req.body;
    //Decreasing the likes number in the events table related to this wit:
      sqlQueryDelete = "DELETE FROM events WHERE wit_id = ?";
      connection.connection.query(sqlQueryDelete, witInfo.wit_id, function (err, result) {
        if (err) {
          res.json({
            code: 400,
            message: "there are some error with query"
          });
        } else {
          res.status(200).json("worked!");
        }
      })
    })

    module.exports = router4;
