const EXPRESS= require('express');
const ROUTER = EXPRESS.Router();
const JWTTOKEN = require('jwt-decode');

var connection = require('../../server');
var userLoggedIN = null;

//Edit the reply:
ROUTER.post('/editReply',(req,res)=>{
  var replyInfo   = req.body

  decoded         = (JWTTOKEN(replyInfo.token)).username;
  userLoggedIN    = decoded;

  var updateReplySqlQuery = 'Update replies SET reply = ? ' +
                        'WHERE username = ? AND reply_id = ?';

  if ((replyInfo.reply).length ==0 ){
    res.status(401).json("The reply can't be empty");
    return;
  }

  //Editing the text of a reply in the database:
  connection.connection.query(updateReplySqlQuery, [replyInfo.reply,userLoggedIN,replyInfo.reply_id],
    function(
      err,
      respond) {
         if(err){
           res.status(400).json("There is an error in editing the reply");
         }
         else {
           res.status(200).send(respond);
         }
  })
})

//Retrieve the content of A reply to edit it:
ROUTER.post('/getReplyContent',(req,res) => {
  var replyInfo                 = req.body;

  var getReplyContentSqlQuery   = 'Select reply FROM replies WHERE reply_id = ?';

  //It will retrieve the content of a reply and send it to the frontend:
  connection.connection.query(getReplyContentSqlQuery, replyInfo.reply_id,
    function(
      err,
      respond ) {
          if(err){
            res.status(400).json("There are some problem in retrieving the content of the reply");
          }
          else {
            res.status(200).send(respond);
          }
    })
})

module.exports = ROUTER
