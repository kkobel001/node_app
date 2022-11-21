const path= require('path');
const multer= require('multer');
const store= multer.diskStorage({
    destination: function(req,res,cb){
        cb(null, 'public/uploads/');
    },
    filename: function(req,file,cb){
        const name=Date.now()+path.extname(file.originalname);
        cb(null,name)
    }
})
const upload=multer({storage});

module.exports=upload;