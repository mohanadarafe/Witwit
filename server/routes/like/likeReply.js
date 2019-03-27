const EXPRESS    = require('express')
const ROUTER     = EXPRESS.Router()
const JWTTOKEN   = require('jwt-decode')

var connection   = require('../../server')
var userLoggedIN = null

//like a reply:
ROUTER.post('/likeReply', (req, res) => {
  var replyInfo             = req.body

  var decoded               = (JWTTOKEN(replyInfo.token)).username
  userLoggedIN              = decoded


  var updateReplySqlQuery   = 'UPDATE replies ' +
                              'SET numOfLikes = numOfLikes + 1, '+
                              'boolvalue = true WHERE reply_id = ? '

  var likeReplySqlQuery     = 'INSERT INTO replyLikes VALUES(DEFAULT,?,?,?)'

  var retrieveImageSqlQuery = 'select image FROM users where username = ?'


  //updating the table of replies by increasing the likes number of this reply because we will add a new like:
  connection.connection.query(updateReplySqlQuery, replyInfo.reply_id,
    function (
      err) {
        if (err) {
          res.status(400).json("There are some problem with updating the reply info in the database")
        }
    }
  )

  //Insert in the replyLikes table, the username who likes this post
  connection.connection.query(retrieveImageSqlQuery,userLoggedIN,
    function (
      err,
      result) {
        if (err){
          res.status(400).json("There are some error in getting the image like reply")
        }
        else{
          userImage = result[0].image

          //Storing the image path in the replies table (to make it accessable by the frontend)
          connection.connection.query(likeReplySqlQuery, [replyInfo.reply_id, userLoggedIN , userImage],
            function (
              err,
              respond) {
                if (err) {
                  res.status(400).json("There are some problem with Inserting like a reply in the database")
                } else {
                  res.status(200).send(respond)
                }
            }
          )
        }

    }
  )

})

//unlike a reply:
ROUTER.post('/unlikeReply', (req, res) => {
  var replyInfo                  = req.body

  var decoded                    = (JWTTOKEN(replyInfo.token)).username
  userLoggedIN                   = decoded

  var updateReplyDelSqlQuery     = 'UPDATE replies ' +
                                   'SET numOfLikes = numOfLikes - 1, ' +
                                   'boolValue = false WHERE reply_id = ? '

  var removeLikeReplySqlQuery    = 'DELETE FROM replylikes WHERE reply_id =? AND username = ?'

  //updating the table of replies by decreasing the likes number of this reply:
  connection.connection.query(updateReplyDelSqlQuery, replyInfo.reply_id,
    function (
      err) {
        if (err) {
          res.status(400).json("There some problem with updating the reply info in the replies table")
        }
    }
  )

  //Remove from the replyLikes table, the user with this username who liked this post
  connection.connection.query(removeLikeReplySqlQuery, [replyInfo.reply_id, userLoggedIN],
    function (
      err,
      respond) {
        if (err) {
          res.status(400).json("There are problem with deleting the like from likesReply table")
        } else {
          res.status(200).send(respond)
        }
    }
  )
})

module.exports = ROUTER;
