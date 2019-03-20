const express = require("express");
const router = express.Router();
const connection = require('../../server');
const jwtToken = require('jwt-decode');
var userLoggedIN = null;


//Edit the reply:
router.post('/editReply',(req,res)=>{
  replyInfo           = req.body

  var decoded         = (jwtToken(postInfo.token)).username;
  userLoggedIN        = decoded;

  UpdateReplySqlQuery = "Update replies SET reply = ? " +
                        "WHERE username = ? AND reply_id = ?";

  if ((replyInfo.reply).length ==0 ){
    res.status(401).json("The reply can't be empty");
    return;
  }

  //Editing the text of a reply in the database:
  connection.connection.query(UpdateReplySqlQuery,[replyInfo.reply, userLoggedIN, replyInfo.reply_id ],
    function(
      err) {
         if(err){
           res.status(400).json("There is an error in editing the reply")
         }
  })
})

//Retrieve the content of A reply to edit it:
router.post('/getReplyContent',(req,res) => {
  replyInfo                 = req.body

  getReplyContentSqlQuery   = "Select reply FROM replies WHERE reply_id = ?"

  //It will retrieve the content of a reply and send it to the frontend:
  connection.connection.query(getReplyContentSqlQuery,replyInfo.reply_id,
    function(
      err,
      respond ) {
          if(err){
            res.status(400).json("There are some problem in retrieving the content of the reply")
          }
          else {
            res.status(200).send(respond);
          }
    })
})

module.exports = router
