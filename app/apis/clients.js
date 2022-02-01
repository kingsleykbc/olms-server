const express = require('express');
const jwt = require('jsonwebtoken')
const api = express.Router();
const client = require('../models/clientsModel');
const config = require('../../config');
const validate = require('../validations/clientsValidation');

//Get a Client
api.get('/clients/:id', (req, res) => {
    client.findOne({ _id: req.params.id }).then(
        (data) => { res.json(data) }
    );
});

//Get all Clients of a lawyer
api.get('/getClients/:lawID', (req, res) => {
    client.find({ lawyerID: req.params.lawID }).then(
        (clients) => {
            res.json({clients})
        }
    ).catch(
        (error) => {
            console.log("Error in getting Users : ", error);
        }
    );
});

//Client SignUp
api.post('/clients',(req,res)=>{
    const { errors, isValid } = validate.validateClients(req.body);

    if (isValid) { 
        //Find a client with a similar email
        client.findOne({ email: req.body.email }).then((user) => { 
            if (user) {
                errors.email = 'Email Already Taken';
                res.status(400).json(errors);
                console.log(user);
            } else {
                client.create({
                    firstname: req.body.firstname,
                    middlename: req.body.middlename,
                    lastname: req.body.lastname,
                    phoneNumber: req.body.phonenumber,
                    email: req.body.email,
                    occupation: req.body.occupation,
                    personalInfo: req.body.personalinfo,
                    password: req.body.password,
                }).then(
                    (data) => { res.json(data) }
                ).catch(
                    (error)=>{ console.log("adding error", error)}
                )
            }
        }).catch(
            (error)=>{console.log('error checking email',error)}
        );
    } else {
        res.status(400).json(errors);
    } 
});

//Client Login
api.post('/clientLogin', (req, res) => {
    const {email, password} = req.body;

    client.findOne({ email:email, password:password  }).then((user) => {
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

//Update a Client
api.put('/clients/:clientID', (req, res) => {
    client.findByIdAndUpdate({ _id: req.params.clientID }, req.body).then(
        (client) => {
            res.send(client.firstname);
        }
    ).catch(
        (error) => {
            console.log(error)
        }
    )
});

module.exports = api;