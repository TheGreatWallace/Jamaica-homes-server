const multer = require('multer');
const path = require('path');

// let storage = multer.diskStorage({
//     destination:(req,file, callBack)=>{
//         callBack(null,file.originalname.split(ext)[0] + Date.now() + ext)
//     }
// })

// var upload = multer({
//     storage: storage,
//     limits:{
//         fieldSize:1024 * 15
//     }
// })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

module.exports = upload;