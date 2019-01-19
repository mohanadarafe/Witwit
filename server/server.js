const express = require('express')
const bodyParser = require('body-parser')

const PORT = 3002
const app = express()
const loginRegisterApi = require('./routes/login_register')
app.use(bodyParser.json())
app.use('/login_register', loginRegisterApi)
app.get('/', (req, res) => {
  res.send("I am the server")
})

app.listen(PORT, function () {
  console.log("The server is working on port: " + PORT)
})
