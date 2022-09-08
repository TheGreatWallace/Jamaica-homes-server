const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination:(req,file, callBack)=>{
        callBack(null,file.originalname.split(ext)[0] + Date.now() + ext)
    }
})

var upload = multer({
    storage: storage,
    limits:{
        fieldSize:1024 * 15
    }
})

module.exports = upload;