const EXPRESS = require('express')
const BODYPARSER = require('body-parser')
const CORS = require('cors')
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

const APP = EXPRESS()
exports.app = APP;

APP.use(CORS('*'))
APP.use(BODYPARSER.json())



//To be able to use the routes:
const LOGINREGISTERAPI = require('./routes/main_pages/login_register')
APP.use('/routes/main_pages/login_register', LOGINREGISTERAPI)

const TIMELINEAPI = require('./routes/main_pages/timeline')
APP.use('/routes/main_pages/timeline', TIMELINEAPI)

const PROFILEAPI = require('./routes/main_pages/profile')
APP.use('/routes/main_pages/profile', PROFILEAPI)

const FOLLOWUSERAPI = require('./routes/follow/followUser')
APP.use('/routes/follow/followUser', FOLLOWUSERAPI)

const SEARCHENGINEAPI = require('./routes/main_pages/searchEngine')
APP.use('/routes/main_pages/searchEngine', SEARCHENGINEAPI)

const USERPROFILEAPI = require('./routes/main_pages/userProfile')
APP.use('/routes/main_pages/userProfile', USERPROFILEAPI)


//new Apis:

const POSTAPI      = require('./routes/postWit_postReply/post')
APP.use('/routes/postWit_postReply/post',POSTAPI);

const LIKEWITAPI   = require('./routes/like/likeWit')
APP.use('/routes/like/likeWit',LIKEWITAPI)

const LIKELISTAPI  = require('./routes/like/likeList')
APP.use('/routes/like/likeList',LIKELISTAPI);

const CHECKLISTAPI = require ('./routes/like/likeCheck')
APP.use('/routes/like/likeCheck',CHECKLISTAPI)

const DELETEAPI    = require('./routes/postWit_postReply/delete')
APP.use('/routes/postWit_postReply/delete',DELETEAPI)

const REPLIESLISTAPI = require('./routes/postWit_postReply/repliesList')
APP.use('/routes/postWit_postReply/repliesList',REPLIESLISTAPI)

const LIKEREPLYAPI   = require('./routes/like/likeReply')
APP.use('/routes/like/likeReply',LIKEREPLYAPI)

const FOLLOWERSAPI  = require ('./routes/follow/followerList')
APP.use('/routes/follow/followerList',FOLLOWERSAPI)

const FOLLOWINGAPI  = require('./routes/follow/followingList')
APP.use('/routes/follow/followingList',FOLLOWINGAPI)

const EDITAPI       = require('./routes/postWit_postReply/edit')
APP.use('/routes/postWit_postReply/edit', EDITAPI)

const FILEUPLOADAPI  = require('./routes/main_pages/fileUpload')
APP.use('/routes/main_pages/fileUpload',FILEUPLOADAPI)
//To make sure the server is working:
APP.get('/', (req, res) => {
  res.send("I am the server ")
})

//To connect to the database:
connection.connect(function (err) {
  if (err) throw err;
})

//To use the specific port:
APP.listen(PORT, function () {})

exports.connection = connection
