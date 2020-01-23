const express = require('express');
var router = express.Router();
const Product = require('../models/Product');

router.get('/',(req,res)=>{
    Product.find()
    .then(items => res.json(items));
})

router.get('/:id',(req,res)=>{
    const id = req.params.id;
    Product.find({pid: id})
    .then(items => res.json(items));
})

router.post('/',(req,res)=>{
    const { name, pid, category, price, recentlyPurchasedUsers } = req.body;
    const newproduct = new Product({
        name,
        pid,
        price,
        category,
        recentlyPurchasedUsers
    })

    newproduct.save()
    .then(prod => res.json(prod))
    .catch(err=>res.send(false))
})


module.exports = router;