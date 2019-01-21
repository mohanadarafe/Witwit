const express = require('express')
const router = express.Router()
var mySql = require('mysql')
var connection = mySql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'witwit'
})

router.get('/', (req, res) => {
  res.send("From The Login and Register API ")
})
router.get('/lolo', (req, res) => {
  connection.query('SELECT * FROM users', (err, rows) => {
    if (err) throw err;

    console.log('Data received from Db:\n');
    console.log(rows);
  })
})


//Login method:

router.post('/login', (req, res) => {
  let userData = req.body
  console.log(reg.email)
  sqlQuery = 'SELECT * FROM users WHERE email=?'
  connection.query(sqlQuery, [userData.email] , function (err, results, fields) {
    if (err) {
      res.json({
        code: 400,
        message: 'there are some error with query'
      })
    } else {
      console.log(results)
    }


  })
})

router.post('/register', function (req, res, next) {
  //let queryVar = 'INSERT INTO users(user_id,username,password,email,image,gender,age,followers,following,birthday,sign_up_time) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
  let userInfo = req.body;
  var user = {
    username: userInfo.username,
    password: userInfo.password,
    email: userInfo.email,
    image: userInfo.image,
    gender: userInfo.gender,
    age: userInfo.age,
    followers: 0,
    following: 0,
    birthday: null
  }
  connection.query("INSERT INTO users SET ?", user, function (err, results, fields) {
    if (err) throw err;
   // console.log(result);
    res.send(results)
  })
});

module.exports = router
