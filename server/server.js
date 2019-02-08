const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var mySql = require('mysql')
//The port for our backend server
const PORT = 3002

//creating a connection to our database:
var connection = mySql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '',
  database: 'witwit'
})
app = express()
app.use(cors())
app.use(bodyParser.json())
//To be able to use the login-register API
const loginRegisterApi = require('./routes/login_register')
app.use('/routes/login_register', loginRegisterApi)

const timelineApi = require('./routes/timeline')
app.use('/routes/timeline', timelineApi)

//To make suer it is wokring and on which port:
app.get('/', (req, res) => {
  res.send("I am the server ")
})

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to DB")
  connection.query("Select * from users", function (err, result) {
    if (err) throw err;
    console.log(result);
  })
})

app.listen(PORT, function () {
  console.log("The server is working on port: " + PORT)
})

exports.connection = connection
