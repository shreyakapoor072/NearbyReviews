const express = require('express');
var router = express.Router();
const Users = require('../models/Users');

router.get('/',(req,res)=>{
    Users.find()
    .then(items => res.json(items));
})

router.post('/',(req,res)=>{
    const { name, userId, email, lat, long, pincode } = req.body
    const newUser = new Users({
        name,
        userId,
        email,
        lat,
        long,
        lat,
        pincode,
    })

    newUser.save()
    .then(prod => res.json(prod))
    .catch(err=>res.send(false))
})


module.exports = router;