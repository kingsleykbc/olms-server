const express  = require('express');
const api  = express.Router();
const lawyer = require('../models/lawyersModel');
const validate = require('../validations/lawyersValidation');

//Get Lawyer
api.get('/lawyers/:id', (req,res) => {
    lawyer.findOne({_id:req.params.id}).then(
        (data)=>{res.json(data)}
    );
});

//Get all Lawyers
api.get('/lawyers', (req, res) => {
    lawyer.find({}).then(
        (data) => { res.json(data) }
    ).catch(
        (error)=>{console.log("Error retreiving Lawyers")}
    )
});

//Add Lawyer
api.post('/lawyers',(req,res)=>{
    const { errors, isValid } = validate.validateLawyers(req.body);

    if (isValid) { //Check Input Errors
        lawyer.findOne({ email: req.body.email }).then((user) => { //Ensure email is unique        
            if (user) { 
                errors.email = 'Email Already Taken';
                res.status(400).json(errors);
                console.log(user);
            }else{
                lawyer.create({
                    firstname: req.body.firstname,
                    middlename: req.body.middlename,
                    lastname: req.body.lastname,
                    phoneNumber: req.body.phonenumber,
                    email: req.body.email,
                    website: req.body.website,
                    businessType: req.body.business,
                    firm: req.body.firmname,
                    personalInfo: req.body.personalinfo,
                    password: req.body.password
                }).then(
                    (data) => { res.json(data) }
                )
            }
        });     
    }else{
        res.status(400).json(errors);
    } 
});

//Update Lawyer
api.put('/lawyers/:id',(req,res)=>{
    res.send({type:'UPDATE'});
});

//Update Lawyer
api.delete('/lawyers/:id', (req, res) => {
    res.send({ type: 'DELETE' });
});

//Send Request to lawyer
api.post('/lawyerRequest', (req, res) => {

});


module.exports = api;