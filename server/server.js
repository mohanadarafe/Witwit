const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var mySql = require('mysql')

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

app.use(cors())
app.use(bodyParser.json())

//To be able to use the routes:
const loginRegisterApi = require('./routes/login_register')
app.use('/routes/login_register', loginRegisterApi)

const timelineApi = require('./routes/timeline')
app.use('/routes/timeline', timelineApi)

const timelineProfileApi = require('./routes/timelineProfile')
app.use('/routes/timelineProfile', timelineProfileApi)

const profileAPI = require('./routes/profile')
app.use('/routes/profile', profileAPI)

const followUserAPI = require('./routes/followUser')
app.use('/routes/followUser', followUserAPI)

const searchEngineAPI = require('./routes/searchEngine')
app.use('/routes/searchEngine', searchEngineAPI)

const userProfileAPI = require('./routes/userProfile')
app.use('/routes/userProfile', userProfileAPI)

//To make sure the server is working:
app.get('/', (req, res) => {
  res.send("I am the server ")
})

//To connect to the database:
connection.connect(function (err) {
  if (err) throw err;
})

//To use the specific port:
app.listen(PORT, function () {})

exports.connection = connection
