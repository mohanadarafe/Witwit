const express = require("express");
const router = express.Router();
const connection = require('../server');


//Deleting a wit:
router.post('/deleteWit', (req, res) => {
  witInfo = req.body;

  sqlQueryDelete = "DELETE FROM events WHERE wit_id = ?";

  //Deleting from the tables the rows that contains this wit_id:
  connection.connection.query(sqlQueryDelete, witInfo.wit_id,
    function (
      err,
      respond) {
          if (err) {
            res.status(400).json("There are problem for deleting a wit")
          } else {
            res.status(200).send(respond);
          }
  })
})

//Deleting a reply:
router.post('/deleteReply', function(req, res) {
  replyInfo = req.body;

  sqlQueryDelete = "DELETE FROM replies WHERE reply_id = ?";

  //Deleting from the tables the rows that contains this reply_id:
  connection.connection.query(sqlQueryDelete, replyInfo.reply_id,
    function (
      err,
      respond) {
          if (err) {
            res.status(400).json("There was a problem with deleting this reply from the databse");
          } else {
            res.status(200).send(respond);
          }
     })
})

module.exports = router;
