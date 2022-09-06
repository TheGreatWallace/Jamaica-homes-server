const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//Define Collection and Schema


let Users =  Schema({
    
    username: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    country: {
        required: false,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: {
        required: false,
        type: String,
        enum: ['Admin', 'User']
    }},{
        collection: 'users',
})
 

module.exports = mongoose.model('Users', Users)