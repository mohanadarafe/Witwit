const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const JWTTOKEN = require('jwt-decode');

var connection = require('../../server');
var userLoggedIN = null;

//Wits which the current user already liked:
ROUTER.post('/likedWits', (req, res) => {
  var witInfo      = req.body;

  var decoded  = (JWTTOKEN(witInfo.token)).username;
  userLoggedIN = decoded;

  var defaultWitTableSqlQuery = 'UPDATE events ' +
                                'SET boolValue = false';

  var updateWitTableSqlQuery = 'UPDATE events ' +
                                'INNER JOIN likes ON ' +
                                '(events.wit_id = likes.wit_id AND likes.username = ?) ' +
                                'SET events.boolValue =true';

  //Put the boolValue = false (Default value) to change its value according to the user logged in:
  connection.connection.query(defaultWitTableSqlQuery,
    function (
      err) {
        if (err) {
           res.status(400).json("There some problem with putting the boolValue to false in the events table")
        }
    }
  )

  //Change the value of boolValue to true in case if the user already liked a wit:
  connection.connection.query(updateWitTableSqlQuery, userLoggedIN,
    function (
      err,
      respond) {
        if (err) {
          res.status(400).json("There was a problem in changing the boolValue to true in the events table")
        } else {
          res.status(200).send(respond);
        }
    }
  )
})

//Replies which the current user already liked:
ROUTER.post('/likedReplies', function(req, res) {
  var replyInfo    = req.body;

  var decoded  = (JWTTOKEN(replyInfo.token)).username;
  userLoggedIN = decoded;

  var defaultRepliesTableSqlQuery = 'UPDATE replies ' +
                                    'SET boolValue = false ';

  var updateReplyTableSqlQuery   = 'UPDATE replies ' +
                                    'INNER JOIN replylikes ON '+
                                    '(replies.reply_id = replylikes.reply_id AND replylikes.username = ?) ' +
                                    'SET replies.boolValue =true';

  //Put the boolValue = false (Default value) to change its value according to the user logged in:
  connection.connection.query(defaultRepliesTableSqlQuery,
    function (
      err) {
        if (err) {
          res.status(400).json("Problem with the query of setting boolValue to false");
        }
    }
  )

  //Change the value of boolValue to true in case if the user already liked a reply:
  connection.connection.query(updateReplyTableSqlQuery, userLoggedIN,
    function (
      err,
      respond) {
          if (err) {
            res.status(400).json("Problem in inilizing boolValue to true in the replies table");
          } else {
            res.status(200).send(respond);
          }
    }
  )
})

module.exports = ROUTER;
