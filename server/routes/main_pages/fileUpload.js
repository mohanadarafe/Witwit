const EXPRESS = require('express')
const ROUTER  = EXPRESS.Router()
const MULTER  = require('multer')


var storage = MULTER.diskStorage({
  destination : function(req,file,cb){
    cb(null,'../src/assets/images')
  },
  filename: function(req,file,cb){
    cb(null, file.originalname)
  }

})

var upload = MULTER({storage:storage})

ROUTER.post('/upload',upload.single('userImage'),function(req,res){
  res.status(200).json("res");
})

module.exports = ROUTER;
