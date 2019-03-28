const EXPRESS   = require('express')
const ROUTER    = EXPRESS.Router()

var connection  = require('../../server')

//Get the list of wit's likes:
ROUTER.post('/witLikesList', function (req, res) {
  var witInfo          = req.body

  var witLikesSqlQuery = 'SELECT * FROM likes where wit_id = ?'

  //Retrieve the list of likes for a specific wit:
  connection.connection.query(witLikesSqlQuery, witInfo.wit_id,
    function(
      err,
      respond) {
        if (err) {
          res.status(400).json("There was a problem in retrieving the list of likes for a wit")
        } else {
          res.status(200).send(respond)
        }
    }
  )
})

//Get the list of reply's likes
ROUTER.post('/replyLikesList', function (req, res) {
  var replyInfo         = req.body

  var replyListSqlQuery = 'SELECT * FROM replylikes where reply_id = ?'

  //Retrieve the list of like for a specific reply:
  connection.connection.query(replyListSqlQuery, replyInfo.reply_id,
    function(
      err,
      respond) {
        if (err) {
          res.status(400).json("There is a problem in retrieving the list of likes for a reply from database");
        } else {
          res.status(200).send(respond);
        }
    }
  )
})

module.exports = ROUTER;
