const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = Schema({
    name:{
        type:String,
        required:true,
    },
    category: {
        type: String
    },
    pid:{
        type:String
    },
    price:{
        type: Number
    },
    recentlyPurchasedUsers: [Number]
})

module.exports =  mongoose.model('product',productSchema);