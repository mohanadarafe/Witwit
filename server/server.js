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


//To be able to use the APIs:

//To be able to use the login-register API
const loginRegisterApi = require('./routes/login_register')
app.use('/routes/login_register', loginRegisterApi)

//To be able to use the timeline API
const timelineApi = require('./routes/timeline')
app.use('/routes/timeline', timelineApi)

//To be able to use the witPost API
const witPostApi = require('./routes/witPost')
app.use('/routes/witPost', witPostApi)

//To be able to use the timelineProfile API
const timelineProfileApi = require('./routes/timelineProfile')
app.use('/routes/timelineProfile', timelineProfileApi)


//To make sure the server is working : will be displayed by typing on the web 'http://localhost:3002/'
app.get('/', (req, res) => {
  res.send("I am the server ")
})



//To make sure that the database is connected
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to DB")
  connection.query("Select * from users", function (err, result) {
    if (err) throw err;
    console.log(result);
  })
})

//To make sure that the server is working and on which port : will be displayed in the terminal
app.listen(PORT, function () {
  console.log("The server is working on port: " + PORT)
})

exports.connection = connection
