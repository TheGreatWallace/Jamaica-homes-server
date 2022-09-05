const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const housesRoute = require('./routes/housesRoute');
const usersRoute = require('./routes/usersRoute');
const db = require('./models');
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


//Express App
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var corsOptions = {
    origin: "*"
  };
app.use(cors(corsOptions));


//Setting Route Middleware
app.use('/api/Jamaica-Homes', housesRoute);
app.use('/api/Jamaica-Homes', usersRoute);

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