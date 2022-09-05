const houseConfig = require('../config/db.config');
const userConfig = require('../config/user.config')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = houseConfig.url;
db.urls = userConfig.url
db.houses = require('../models/houses');
db.users = require('../models/users');


module.exports = db;