const EXPRESS    = require('express');
const ROUTER     = EXPRESS.Router();
const JWTTOKEN   = require('jwt-decode');

var connection = require('../../server');
var userLoggedIN = null;

//like a wit:
ROUTER.post('/likeWit', (req, res) => {
  var witInfo = req.body;

  var decoded = (JWTTOKEN(witInfo.token)).username;
  userLoggedIN = decoded;


  var updateWitSqlQuery   = 'UPDATE events '+
                            'SET numOfLikes = numOfLikes + 1, '+
                            'boolvalue = true WHERE wit_id = ? ';

  var insertLikeSqlQuery  = 'INSERT INTO likes VALUES(DEFAULT,?,?,?)';

  var retrieveImageSqlQuery = 'select image FROM users where username = ?'

  if(userLoggedIN === witInfo.username && witInfo.username !=null){
    res.status(401).json("user can't like their own wit");
    return;
  }

  //updating the table of events by increasing the likes number of this wit:
  connection.connection.query(updateWitSqlQuery, witInfo.wit_id,
    function (
      err) {
        if (err) {
          res.satuts(400).json("there are some error with updating the wit info in the database");
        }
    }
  )

  connection.connection.query(retrieveImageSqlQuery,userLoggedIN,
    function (
      err,
      result) {
        if (err){
          res.status(400).json("There are some error in getting the image like reply")
        }
        else{
          userImage = result[0].image
          //Insert in the likes table, the username who likes this post
          connection.connection.query(insertLikeSqlQuery, [witInfo.wit_id, userLoggedIN,userImage],
            function (
              err,
              respond) {
                if (err) {
                    res.status(400).json("There are some problem with Inserting like a wit in the database");
                } else {
                    res.status(200).send(respond);
                }
            }
          )
        }
      }
    )
})

//unlike a wit:
ROUTER.post('/unlikeWit', (req, res) => {
  var witInfo = req.body;

  var decoded = (JWTTOKEN(witInfo.token)).username;
  userLoggedIN = decoded;

  var updateWitDelSqlQuery  = 'UPDATE events '+
                          'SET numOfLikes = numOfLikes - 1, ' +
                          'boolValue = false WHERE wit_id = ?';

  var removeLikeSqlQuery    = 'DELETE FROM likes WHERE wit_id =? AND username = ?';

  if(userLoggedIN === witInfo.username && witInfo.username !=null){
    res.status(401).json("user can't unlike their own wit");
    return;
  }

  //updating the table of events by decreasing the likes number of this wit:
  connection.connection.query(updateWitDelSqlQuery, witInfo.wit_id,
    function (
      err) {
        if (err) {
          res.status(400).json("There are some problems with changing the wit info in the database");
        }
    }
  )

  //Deleting the username from the table of likes.
  connection.connection.query(removeLikeSqlQuery, [witInfo.wit_id, userLoggedIN],
    function (
      err,
      respond) {
        if (err) {
          res.status(400).json("There are some problem with removing like a wit from the database")
        } else {
          res.status(200).send(respond);
        }
    }
  )
})

module.exports = ROUTER;
