const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//Define Collection and Schema


let Users = new Schema({
    
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String,
        enum: ['admin', 'user']
    }},{
        collection: 'users',
})
 

module.exports = mongoose.model('Users', Users)