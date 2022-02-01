const express = require('express');
const api = express.Router();
const bill = require('../models/billsModel');

//Get all bills of a lawyer
api.get('/bills/:lawyerID', (req, res) => {
    bill.find({ lawyerID: req.params.lawyerID }).then(
        (bills) => {
            res.json(bills)
        }
    ).catch(
        (error) => {
            console.log("Error retreiving bills : ", error);
        }
    );
});

//Add a bill
api.post('/bills/:lawyerID',(req,res)=>{
    bill.create({
        lawyerID: req.params.lawyerID,
        clientID: req.body.clientID,
        title: req.body.title,
        deadline: new Date(req.body.deadline),
        comment: req.body.comment,
        amount: req.body.amount,   
    }).then(
        bill =>{
            res.json(bill);
        }
    ).catch(
        error => {
            console.log("Error adding Bill", error)
        }
    )
});

//Get a client's bill
api.get('/bill/:clientID',(req,res)=>{
    bill.findOne({clientID:req.params.clientID}).then(
        clientBill =>{
            res.json(clientBill);
        }
    ).catch(
        error =>{
            console.log("ERROR RETREIVING BILL",error);
        }
    )
});

module.exports = api;