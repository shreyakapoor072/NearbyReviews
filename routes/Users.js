const express = require('express');
var router = express.Router();
const Users = require('../models/Users');

router.get('/',(req,res)=>{
    Users.find()
    .then(items => res.json(items));
})

router.post('/',(req,res)=>{
    const { name, userId, email, lat, long, pincode, snapcash, rating } = req.body
    const newUser = new Users({
        name,
        userId,
        email,
        lat,
        long,
        pincode,
        snapcash,
        rating
    })

    newUser.save()
    .then(prod => res.json(prod))
    .catch(err=>res.send(false))
})

router.put('/:id', (req,res) => {
    const id = req.params.id;
    
    Users.findByIdAndUpdate({userId: id}, {snapcash: req.body.snapcash}, function(err, user){
        if (err) { 
            console.log("error"); 
        } else {
            console.log(user);
        }


    })
})


module.exports = router;