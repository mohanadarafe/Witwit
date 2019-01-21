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

router.post('/register', function (req, res, next) {
  let queryVar = 'INSERT INTO users(user_id,username,password,email,image,gender,age,followers,following,birthday,sign_up_time) VALUES(?,?,?,?,?,?,?,?,?,?,?';
  let userInfo = req.body;
  var datetime = new Date();
  console.log(datetime);
  var user = {
    username: "mo",
    password: "123",
    email: "ham@gmail.com",
    image: "ham",
    gender: "koko",
    age: 3,
    followers: 4,
    following: 0,
    birthday: date,
  }
  let todo1 = ["ham", "ham", "ham", "ham", "ham", 5, 4, 4, date, date]
  let todo = [2, userInfo.username, userInfo.password, userInfo.email, userInfo.image, userInfo.gender, userInfo.age, userInfo.followers, userInfo.following, date, date]
  connection.query("INSERT INTO users SET ?", user, function (err, results, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result)
  })
});

router.post('/lol', function (req, res) {
  var date = new Date()


  //The retrieved info from the frontend:
  let users = req.body
  

  
  connection.query('INSERT INTO users (user_id,username,password,email,image,gender,age,followers,following,birthday,sign_up_time)  VALUES ?', user, function (error, results, fields) {
  if (error) {
    res.json({
      code: 400,
      message: 'there are some error with query'
    })
  } else {
    res.json({
      code: 200,
      data: results,
      message: 'user registered sucessfully'
    })
  }
  });
})

module.exports = router
