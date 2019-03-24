const EXPRESS = require("express")
const ROUTER  = EXPRESS.Router()
const MULTER  = require('multer')

var connection = require('../../server')

var store = MULTER.diskStorage({
  destination:function(req,file,cb){
    cb(null,'../../uploads')
  },
  filename: function(req,file,cb){
    cb(null,Date.now()+'.'+ file.originalname)
  }
})


var upload = MULTER({storage:store}).single('file');

ROUTER.post('/upload',(req,res) => {
  upload(req,res,function(err){
    if(err){
      console.log(err);
      return res.status(501).json({error:err})
    }else{
      return res.json({originalname:req.file.originalname,uploadname:req.file.filename})
    }
  })
})

module.exports = ROUTER
