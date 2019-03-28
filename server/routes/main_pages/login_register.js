const EXPRESS    = require('express')
const JWT        = require('jsonwebtoken')
const ROUTER     = EXPRESS.Router()
const NODEMAILER = require('nodemailer')

var connection   = require('../../server')


//Login method:
ROUTER.post('/login', (req, res) => {
  var userData      = req.body

  var loginSqlQuery = 'SELECT * FROM users '+ 'WHERE username = ?'

  //Logging in the user to be able to use our website
  connection.connection.query(loginSqlQuery, userData.username,
    function(
      err,
      respond) {
        if (err) {
          res.status(400).json("there are some error with the login query")
        } else {

          //If a user exists with this username
          if (respond.length == 1) {
            if (respond[0].password === userData.password) {

              //Store it in the token so it can be used to retriev the current info of a user:
              let payload = { username: respond[0].username }
              let token = JWT.sign(payload, 'secretKey')
              res.status(200).send({token})
            } else {
              res.status(401).json("Invalid password")
            }
          } else {
            res.status(401).json("Invalid username")
          }
        }
    })
})


//Register Method
ROUTER.post('/register', function (req, res) {
  var userInfo = req.body

  var user = {
    username  : userInfo.username,
    password  : userInfo.password,
    email     : userInfo.email,
    image     : 'assets/images/' + (userInfo.image).substring(12),
    age       : userInfo.age,
    followers : 0,
    following : 0,
  }

  var registerSqlQuery   =  'SELECT * FROM users ' +
                            'WHERE username = ? OR email = ?'

  var insertUserSqlQuery =  'INSERT INTO users ' +
                            'SET ?'

  connection.connection.query(registerSqlQuery , [user.username,user.email],
    (err,
    respond) => {
      if (err) {
        res.status(400).json("there are some error with the register query")
      } else if (respond.length == 1) {

          // if the username is already found in the database
          if(respond[0].email === userInfo.email){
            res.status(401).json("This email is already taken")
          } else{
            res.status(401).json("This username is already taken")
          }
          }else {
             connection.connection.query(insertUserSqlQuery, user,
              function (
                err) {
               if (err) throw err;
                 else {
                   let payload = { username: user.username }
                   let token = JWT.sign(payload, 'secretKey')
                   res.status(200).send({ token })
                 }
              }
            )
          }
      }
  )
})


//Forget Password:
ROUTER.post('/forgot', (req, res) => {
  var userInfo = req.body

  var retrieveUserInfoSqlQuery = 'SELECT username, password FROM users WHERE email=?'

  connection.connection.query(retrieveUserInfoSqlQuery, userInfo.email,
    function
    (err,
    respond) {
      if (err) {
        res.status(400).json("there are some error with the forget password query");
      } else {

        //If a user exists with this email
        if (respond.length == 1) {
          var transporter = NODEMAILER.createTransport({
              service : 'gmail',
              auth    : {
                user: 'hostlocal4200@gmail.com',
                pass: 'Localhost4200**'
                }
              })
          var mailOptions = {
            from    : 'hostlocal4200@gmail.com',
            to      : userEmail.email,
            subject : 'Password Request',
            text    : 'Hi ' + respond[0].username + '! You recently requested a retrieval of your password' +
                      'from our website. We\'re happy to help. The password associated with this account is: ' +
                      respond[0].password + '.\nRegards,\nThe Team.',
            html    : 'Hi ' + '<strong>' + respond[0].username + '</strong>' + '! You recently requested' +
                      'a retrieval of your password from our website. We\'re happy to help.' +
                      'The password associated with this account is: <strong>' + respond[0].password +
                      '</strong>.<br>Regards,<br>The Team.'
          }
          transporter.sendMail(mailOptions,
            function(
              err) {
                if (err) {
                  res.status(400).send(err)
                } else {
                  res.status(200).json("Message has been sent")
                }
            }
          )
          } else {
            res.status(401).json("Invalid email")
          }
      }
  })
})

module.exports = ROUTER;

