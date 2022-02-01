const express = require('express');
const api = express.Router();
const Case = require('../models/casesModel');
const validate = require('../validations/caseValidation');

//Get Cases
api.get('/cases/:lawyerId', (req, res) => {
    Case.find({lawyerId: req.params.lawyerId }).then(
        (data) => {res.json(data)}
    );
});

//Get Active Case
api.get('/activeCase/:caseKey', (req, res) => {
    Case.findOne({ key: req.params.caseKey }).then(
        (data) => { res.json(data) }
    );
});

//Get Client's case
api.get('/case/:clientID',(req,res)=>{
    Case.findOne({clients:req.params.clientID}).then(
        (clientCase) => { res.json(clientCase);}
    ).catch(
        error => {console.log("ERROR RETREIVING CASE", error)}
    );
});

//Insert Case
api.post('/cases',(req,res)=>{
    const { errors, isValid } = validate.validateCases(req.body);

    //Check Input Errors
    if (isValid) { 

        //EnsureCase ID is Unique 
        Case.findOne({ key: req.body.key }).then((ind) => {    
            if (ind) {
                errors.key = 'Case ID already Taken';
                res.status(400).json(errors);
                console.log(ind);

            } else {
                //If everything checks out, proceed to storing the data
                Case.create({
                    title: req.body.title,
                    key: req.body.key,
                    description: req.body.description,
                    dateAdded: new Date,
                    status: req.body.status,
                    lawyerId: req.body.lawyerId
                }).then(
                    (data) => { res.json(data) }
                ).catch(
                    (error)=>{res.status(400).json(error);}
                )
            }
        });
    } else {
        res.status(400).json(errors);
    } 
});

//Update a case
api.put('/cases/:caseID', (req, res) => {
    Case.findByIdAndUpdate({ _id: req.params.caseID}, req.body).then(
        (client) => {
            console.log("added")
            res.send({ client });
        }
    ).catch(
        (error) => {
            console.log(error)
            res.send(error);
        }
    )
});


module.exports = api;