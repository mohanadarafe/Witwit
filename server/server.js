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

app.use(cors('*'))
app.use(bodyParser.json())

//To be able to use the routes:
const loginRegisterApi = require('./routes/main_pages/login_register')
app.use('/routes/main_pages/login_register', loginRegisterApi)

const timelineApi = require('./routes/main_pages/timeline')
app.use('/routes/main_pages/timeline', timelineApi)

const profileAPI = require('./routes/main_pages/profile')
app.use('/routes/main_pages/profile', profileAPI)

const followUserAPI = require('./routes/follow/followUser')
app.use('/routes/follow/followUser', followUserAPI)

const searchEngineAPI = require('./routes/main_pages/searchEngine')
app.use('/routes/main_pages/searchEngine', searchEngineAPI)

const userProfileAPI = require('./routes/main_pages/userProfile')
app.use('/routes/main_pages/userProfile', userProfileAPI)


//new Apis:

const postApi      = require('./routes/postWit_postReply/post')
app.use('/routes/postWit_postReply/post',postApi);

const likeWitApi   = require('./routes/like/likeWit')
app.use('/routes/like/likeWit',likeWitApi)

const likeListApi  = require('./routes/like/likeList')
app.use('/routes/like/likeList',likeListApi);

const checkLikeApi = require ('./routes/like/likeCheck')
app.use('/routes/like/likeCheck',checkLikeApi)

const deleteApi    = require('./routes/postWit_postReply/delete')
app.use('/routes/postWit_postReply/delete',deleteApi)

const repliesListApi = require('./routes/postWit_postReply/repliesList')
app.use('/routes/postWit_postReply/repliesList',repliesListApi)

const likeReplyApi   = require('./routes/like/likeReply')
app.use('/routes/like/likeReply',likeReplyApi)

const followersApi  = require ('./routes/follow/followerList')
app.use('/routes/follow/followerList',followersApi)

const followingApi  = require('./routes/follow/followingList')
app.use('/routes/follow/followingList',followingApi)

const editApi       = require('./routes/postWit_postReply/edit')
app.use('/routes/postWit_postReply/edit', editApi)

const fileUploadApi  = require('./routes/main_pages/fileUpload')
app.use('/routes/main_pages/fileUpload',fileUploadApi)
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
