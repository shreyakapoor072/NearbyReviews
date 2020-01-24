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

router.put('/snapcash/:rid/:uid', (req,res) => {
    const rid  = req.params.rid;
    const uid = req.params.uid;

    
    Users.findOneAndUpdate({userId: rid}, {snapcash: req.body.reviewerSC + 2}).then((err, user)=>{
        if (err) { 
            console.log("error"); 
        } else {
            console.log(user);
        }
    }).then(() => {
        Users.findOneAndUpdate({userId: uid}, {snapcash: req.body.userSC - 2}).then((err, user) => {
            if (err) { 
                console.log("error"); 
            } else {
                console.log(user);
            }
        }).then(() => res.json({status: 'true'}));
    })

    
})


module.exports = router;