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


const app = express()
exports.app = app;

//cors is used because the BackEnd and the FrontEnd are running on two different ports
//CORS (Cross-Origin Resource Sharing) is a way for the server to say
//“I will accept your request, even though you came from a different origin.”
app.use(cors())
app.use(bodyParser.json())


//To be able to use the APIs:

//To be able to use the login-register API
const loginRegisterApi = require('./routes/login_register')
app.use('/routes/login_register', loginRegisterApi)

//To be able to use the timeline API
const timelineApi = require('./routes/timeline')
app.use('/routes/timeline', timelineApi)


//To be able to use the timelineProfile API
const timelineProfileApi = require('./routes/timelineProfile')
app.use('/routes/timelineProfile', timelineProfileApi)

//to be able to use the Profile API
const profileAPI = require('./routes/profile')
app.use('/routes/profile', profileAPI)

//to be able to use the followUser API
const followUserAPI = require('./routes/followUser')
app.use('/routes/followUser', followUserAPI)

//to be able to use the searchEngine API
const searchEngineAPI = require('./routes/searchEngine')
app.use('/routes/searchEngine', searchEngineAPI)

//To make sure the server is working : will be displayed by typing on the web 'http://localhost:3002/'
app.get('/', (req, res) => {
  res.send("I am the server ")
})



//To make sure that the database is connected
connection.connect(function (err) {
  if (err) throw err;
})

//To make sure that the server is working and on which port : will be displayed in the terminal
app.listen(PORT, function () {
  //console.log("The server is working on port: " + PORT)
})

exports.connection = connection
