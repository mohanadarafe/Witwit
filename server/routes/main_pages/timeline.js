const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const JWTTOKEN = require('jwt-decode');

var connection = require('../../server');
var userLoggedIN = null;

//revealing the posts:
ROUTER.post('/timeline', (req, res)=> {
  var userInfo = req.body;

  decoded = (JWTTOKEN(userInfo.token)).username;
  userLoggedIN = decoded;

  var timelineSqlQuery = 'Select * FROM events';

  connection.connection.query(timelineSqlQuery,
    function (
      err,
      respond) {
          if (err) {
           res.status(400).json("There are some problem retrieving wits from the database");
          }else{
          res.status(200).send(respond);
          }
  })
})

ROUTER.post('/timelineProfile', (req, res) => {
  var userInfo = req.body;

  decoded = (JWTTOKEN(userInfo.token)).username;
  userLoggedIN = decoded;

  var retrieveUserInfoSqlQuery = 'SELECT * FROM users WHERE username=?';

  connection.connection.query(retrieveUserInfoSqlQuery, userLoggedIN,
    function(
      err,
      respond) {
          if (err) {
           res.status(400).send("There is problem in retrieving user info from the database");
          }else {
           res.status(200).send(respond);
          }
    });
});

module.exports = ROUTER;