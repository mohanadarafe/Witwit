const express = require('express');
const router6 = express.Router();
const sourceFile = require('./login_register');
var mySql = require('mysql');
const connection = require('../server');

//to make sure that the API is working
router6.get("/", (req, res) => {
    res.send("From The searchEngine API");
   
  });

router6.get('/search',function(req,res){
    res.send("You made it to search")
    var userInfo=req.body;
    connection.connection.query('SELECT username, user_id, email, image, age, followers, following FROM users where username like "%'+userInfo.username+'%"',
    function(err, userMatch, fields) {
        if (err) throw err;
        res.end(JSON.stringify(userMatch));
        console.log(userMatch)
    });
});

module.exports = router6;
