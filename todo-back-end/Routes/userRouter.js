    const express = require("express");
    const router = express.Router();
    const bcrypt = require('bcrypt')
    const jwt = require('jsonwebtoken')
    const Users = require('../Models/user');
    const secretKey = '653trgd87uiaewfiugrw8o4yr'
    const authMiddleware = require('../middlewares/authMiddleware')
    router.post('/register', async(req, res) =>{
        const user = await Users.findOne({email: req.body.email})
        if(user) return res.status(403).json({user, "message": "User already Exists"})

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new Users({...req.body, password:hashedPassword})
        await newUser.save()
        res.json({newUser, "message" : "Registered Successfully"})
    } )


router.post('/login', async(req, res) =>{
    const user = await Users.findOne({email : req.body.email});
    if(!user) return res.status(403).json({ "message": "User not exists" })
     const isMatch = await bcrypt.compare(req.body.password, user.password)
    if(!isMatch){
        return res.status(403).json({"message" : "Password Incorrect"})
    }
    const token = await jwt.sign({id: user.id}, secretKey , {expiresIn: "1h"} )
    res.status(200).json({user,token, "message": "Login Successfull"})
})

module.exports = router