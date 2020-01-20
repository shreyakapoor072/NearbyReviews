const express = require('express');
var router = express.Router();
const Product = require('../models/Product');

router.get('/',(req,res)=>{
    Product.find()
    .then(items => res.json(items));
})

router.post('/',(req,res)=>{
    const newproduct = new Product({
        name: req.body.name,
        pid: req.body.pid,
        price: req.body.price
    })

    newproduct.save()
    .then(prod => res.json(prod))
    .catch(err=>res.send(false))
})


module.exports = router;