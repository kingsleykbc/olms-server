const express = require('express');
const jwt = require('jsonwebtoken')
const api = express.Router();
const lawyer = require('../models/lawyersModel');
const config = require('../../config');

//Handle Login
api.post('/login', (req, res) => {
    const {email, password} = req.body;

    lawyer.findOne({ email:email, password:password  }).then((user) => {
        if(user){
            const token = jwt.sign({
                id: user._id,
                firstname: user.firstname
            }, config.jwtSecret);
            res.json({token});
        }else{
            res.status(401).json({form: 'Invalid Credentials'});
            console.log('Login Invalid')
        }
    });
});

module.exports = api;