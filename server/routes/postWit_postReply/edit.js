const express = require("express");
const router = express.Router();
const connection = require('../../server');
const jwtToken = require('jwt-decode');
var userLoggedIN = null;

router.post('/editReply',(req,res)=>{
  replyInfo = req.body

  var decoded = (jwtToken(postInfo.token)).username;
  userLoggedIN = decoded;

  UpdateReplySqlQuery = "Update replies SET reply = ? " +
                        "WHERE username = ? AND reply_id = ?";
  //Editing the text of a reply:
  connection.connection.query(UpdateReplySqlQuery,[replyInfo.reply, userLoggedIN, replyInfo.reply_id ],
    function(
      err) {
         if(err){
           res.status(400).json("There is an error in editing the reply")
         }
  })
})

module.exports = router
