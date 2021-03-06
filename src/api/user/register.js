var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
var config = require('../config')
const user = require('../../models/user')
const express = require('express')
const router = express.Router();
router.post('/register',(req,res) =>{
    var hashedPassword = bcrypt.hashSync(req.body.password, 8)
    user.create({
        name : req.body.name,
        phone : req.body.phone,
        email : req.body.email,
        password :hashedPassword

    },
    function(err,user){
        if(err)
           return res.status(500).send("There was a problem in registering user")
        var token = jwt.sign({id: user._id},config.secret,{
            expiresIn:86400
        });
      res.status(200).send({auth:true, token: token})
    });
});
module.exports = router;