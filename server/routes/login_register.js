const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const nodemailer = require('nodemailer');
const connection = require('../server');

const http = require("http");
const path = require("path");
const fs = require("fs");


//Login method:
router.post("/login", (req, res) => {
  let userData = req.body;

  loginSqlQuery = "SELECT * FROM users "+
                  "WHERE username = ?";

  connection.connection.query(loginSqlQuery,userData.username,
    function(
      err,
      results) {
            if (err) {
                  res.status(400).json("there are some error with the login query");
            } else {
                //If a user exists with this username
                if (results.length == 1) {
                    if (results[0].password === userData.password) {
                        let payload = { username: results[0].username };
                        let token = jwt.sign(payload, 'secretKey');
                        res.status(200).send({token});
                    } else {
                      res.status(401).json("Invalid password");
                    }
                } else {
                    res.status(401).json("Invalid username");
                }
            }
      });
});


//Register Method
router.post("/register", function (req, res) {
  var userInfo = req.body;
  var user = {
    username  : userInfo.username,
    password  : userInfo.password,
    email     : userInfo.email,
    image     : userInfo.image,
    age       : userInfo.age,
    followers : 0,
    following : 0,
  };

  RegisterSqlQuery   =  "SELECT * FROM users " +
                        "WHERE username = ? OR email = ?";
  InsertUserSqlQuery =  "INSERT INTO users " +
                        "SET ?";

  connection.connection.query(RegisterSqlQuery , [user.username,user.email],
    (err,
    rows) => {
        if (err) {
            res.status(400).json("there are some error with the register query");
        } else if (rows.length == 1) {
           // if the username is already found in the database
                  if(rows[0].email === userInfo.email){
                      res.status(401).json("This email is already taken");
                  } else{
                      res.status(401).json("This username is already taken");
                  }
          }else {
              connection.connection.query(InsertUserSqlQuery, user, function (
                err,
                results) {
                      if (err) throw err;
                      else {
                          let payload = { username: user.username };
                          let token = jwt.sign(payload, 'secretKey');
                          res.status(200).send({ token });
                      }
                });
          }
      });
});


//Forget Passwod:
router.post("/forgot", (req, res) => {
  let userInfo = req.body;

  retrieveUserInfoSqlQuery = "SELECT username, password FROM users WHERE email=?";

  connection.connection.query(retrieveUserInfoSqlQuery, userInfo.email, function
    (err,
    results) {
        if (err) {
          res.status(400).json("there are some error with the forget password query");
        } else {
      //If a user exists with this email
            if (results.length == 1) {
                  const transporter = nodemailer.createTransport({
                              service: 'gmail',
                              auth: {
                                      user: 'hostlocal4200@gmail.com',
                                      pass: 'Localhost4200**'
                                    }
                  });
                  var mailOptions = {
                      from: 'hostlocal4200@gmail.com',
                      to: userEmail.email,
                      subject: 'Password Request',
                      text: 'Hi ' + results[0].username + '! You recently requested a retrieval of your password' +
                            'from our website. We\'re happy to help. The password associated with this account is: ' +
                            results[0].password + '.\nRegards,\nThe Team.',
                      html: 'Hi ' + '<strong>' + results[0].username + '</strong>' + '! You recently requested' +
                            'a retrieval of your password from our website. We\'re happy to help.' +
                            'The password associated with this account is: <strong>' + results[0].password +
                            '</strong>.<br>Regards,<br>The Team.'
                  };
                  transporter.sendMail(mailOptions,
                      function(
                        error,
                         info) {
                                if (error) {
                                     console.log(error);
                                } else {
                                     console.log('Email sent: ' + info.response);
                                      res.status(200).json("Message has been sent");
                                }
                      });
            } else {
                res.status(401).json("Invalid email");
              }
      }
  });
});

//I can't find a way to make this work. 
// I have a ERR_CONNECITON_REFUSED when registering.
/*

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: '../../img/uploads',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}



// Public Folder
router.use(express.static('../../img'));

router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('index', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('register.component', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('index', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});

*/


module.exports = router;

