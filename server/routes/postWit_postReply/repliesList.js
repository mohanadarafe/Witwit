const express = require("express");
const router = express.Router();
const connection = require('../../server');


router.post('/repliesList', function (req, res) {
  replyInfo = req.body;

  retrieveRepliesSqlQuery = "SELECT * FROM replies where wit_id = ?";

  //Retrieving the list of replies for a specific wit:
  connection.connection.query(retrieveRepliesSqlQuery, replyInfo.wit_id,
     function(
       err,
       respond) {
            if (err) {
              res.status(400).json("There was a problem with the query to retrieve the list of replies");
            }
            else {
                res.status(200).send(respond);
            }
     })
})

module.exports = router
