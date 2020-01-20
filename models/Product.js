const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    pid:{
        type:String
    },
    price:{
        type: Number
    }
})

module.exports =  mongoose.model('product',productSchema);