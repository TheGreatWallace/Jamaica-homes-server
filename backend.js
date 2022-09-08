const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const housesRoute = require('./routes/housesRoute');
const usersRoute = require('./routes/usersRoute');
const cookieParser = require('cookie-parser');
const db = require('./models');
const multer = require('multer');
const fs = require('fs')
require('dotenv/config')



//Mongoose connection Setup
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });



  //Multer Setup
  const storage = multer.diskStorage({
    destination : function (req,file,cb) {
        if(!fs.existsSync(__dirname+'/temp'))
        {
            fs.mkdirSync(__dirname+'/temp')
        }
        cb(null , './temp')
    },
    filename : function(req,file,cb) {
        cb(null , file.houseImage );
    }
})

const upload = multer({storage : storage})

app.get('/upload' , upload.single('file') , async(req,res)=> {
  console.log('Files=====>' , req.file)
  res.json({status : 'ok' , data : req.files})
})

//Express App
app.use(cookieParser('secREt$#code$%3245'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var corsOptions = {
    origin: "*"
  };
app.use(cors(corsOptions));


//Setting Route Middleware
app.use('/api/v1/houses', housesRoute);
app.use('/api/v1/users', usersRoute);

// app.use(cookieParser());
//  app.use(session({ 
//      secret: 'secREt$#code$%3245',
//      resave: false,
//      saveUninitialized: true,
//      cookie: { maxAge: 100000 }\
//  }))


//Setting Port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log(`Listening on Port ${port}...`))