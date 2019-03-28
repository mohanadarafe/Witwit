const EXPRESS     = require('express')
const ROUTER      = EXPRESS.Router()
const JWTTOKEN    = require('jwt-decode')

var connection    = require('../../server')
var userLoggedIN  = null

//Getting  current user info:
ROUTER.post('/userLoggedIn', (req,res)=>{
  var userToken = req.body;

  decoded       = (JWTTOKEN(userToken.token)).username;
  userLoggedIN  = decoded;

  res.status(200).json({ userLoggedIN });
})

//Retrieving the info regarding the user searched:
ROUTER.post('/userInfo', (req, res) => {
  var userInfo                  = req.body

  decoded                       = (JWTTOKEN(userInfo.token)).username
  userLoggedIN                  = decoded

  var defaultBoolValueSqlQuery  = 'UPDATE users ' +
                                  'SET boolValue = false WHERE username = ?'

  var updateUsersTableSqleQuery = 'UPDATE users ' +
                                  'INNER JOIN following ON ' +
                                  '(following.username = ? AND following.follow_name like users.username) ' +
                                  'SET users.boolValue = true'

  var retrieveUsersSqlQuery     = 'SELECT * FROM users WHERE username=?'

  //Setting the boolValue to false (default value) before doing anything:
  connection.connection.query(defaultBoolValueSqlQuery,userInfo.username,
    function (
      err) {
        if (err) {
          res.status(400).json("Error in setting boolValue to its default value")
        }

        //Setting the boolValue of the user passed to the method to true:
        connection.connection.query(updateUsersTableSqleQuery,userLoggedIN,
          function(
            err) {
              if (err) {
                res.status(400).json("Error in changing the Value of boolValue")
              }
          }
        )

        //getting if the user if followed by the current user
        connection.connection.query(retrieveUsersSqlQuery, userInfo.username,
          function(
            err,
            respond) {
              if (err) {
                res.status(400).json("Error in retrieving the chosen user info")
              } else {
                res.status(200).send(respond)
              }
          }
        )
      }
    )
})

//Getting wits for the wits tab:
ROUTER.post('/wits', (req, res)=> {
  var userInfo        = req.body;

  var getWitsSqlQuery = 'Select * FROM events WHERE username = ?';

  //Retrieve the list of wits posted by a user:
  connection.connection.query(getWitsSqlQuery, userInfo.username,
    function(
      err,
      respond){
        if (err) {
          res.status(400).json("Error in retrieving the wits posted by a user");
        } else {
          res.status(200).send(respond);
        }
    }
  )
})



ROUTER.post('/likedWits', (req, res) => {
  var userInfo                = req.body;

  decoded                     = (JWTTOKEN(userInfo.token)).username;
  userLoggedIN                = decoded;

  var defaultWitTableSqlQuery = 'UPDATE events ' +
                                'SET boolValue = false, boolValueUser = false'

  var updateWitTableSqleQuery = 'UPDATE events ' +
                                'INNER JOIN likes ON ' +
                                '(events.wit_id = likes.wit_id AND likes.username = ?) ' +
                                ' SET events.boolValue = true'

  var userLoggedInSqleQuery   = 'UPDATE events ' +
                                'INNER JOIN likes ON ' +
                                '(events.wit_id = likes.wit_id AND likes.username = ?) ' +
                                ' SET events.boolValueUser = true'

  var retrieveWitSqlQuery     = 'Select * FROM events WHERE boolValue =1'

  //Setting the boolValue to false (Default Value) before doing anything:
  connection.connection.query(defaultWitTableSqlQuery,
    function (
      err) {
        if (err) {
         res.status(400).json("There is a problem in setting boolValue to false in the events table")
        }
    }
  )
  connection.connection.query(userLoggedInSqleQuery, userLoggedIN,
  function(
    err) {
      if (err){
       res.status(400).json("There is a problem with userBoolValue")
      }
   }
  )

  //Setting the booValue to true if the user liked this wit:
  connection.connection.query(updateWitTableSqleQuery, userInfo.username,
    function (
      err) {
        if (err) {
         res.status(400).json("There is a problem in setting the boolValue to true in events table")
        }
    }
  )

    //Retrieve a list of wits that the user liked:
  connection.connection.query(retrieveWitSqlQuery,
    function(
      err,
      respond){
        if(err){
          res.status(400).json("There is a problem with retrieving the wits from the database")
        } else {
          res.status(200).send(respond);
        }
    }
  )
})

module.exports = ROUTER;
