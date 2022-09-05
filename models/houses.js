const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//Define Collection and Schema


let Houses = new Schema({

    id: String,
    image: {
        data: Buffer,
        contentType: String
    },
    address: {
        type: String,
        required: true
        
    },
    description: {
        type: String,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    interior: {
        type: String
    },
    price: {
        type: String,
        required: true
    },
    landlord: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    }
},{
    collection: 'houses',
    timestamps: true
})

// Schema.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
//   });

module.exports = mongoose.model('Houses', Houses)