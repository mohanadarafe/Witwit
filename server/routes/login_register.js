const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send("From The Login and Register API ")
})



module.exports = router
