const express = require("express");
const router4 = express.Router();
const sourceFile = require('./login_register')
//YOU can use it dirctly : use userLoggedIN
var mySql = require("mysql");
const connection = require('../server');

//to make sure that the API is working
router4.get("/", (req, res) => {
    res.send("From The Profile API ");
   
  });

 

  //revealing his posts only.
router4.get("/profile", (req, res) => {
        
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

    module.exports = router4;