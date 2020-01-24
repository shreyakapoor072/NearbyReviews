const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
    name:{
        type:String
    },
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String
    },
    lat: {
        type: Number
    },
    long: {
        type: Number
    },
    snapcash: {
        type: Number
    },
    likes: {
        type: Number
    },
    pincode: {
        type: Number
    }

})

module.exports =  mongoose.model('user',userSchema);