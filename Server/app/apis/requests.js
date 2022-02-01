const express = require('express');
const api = express.Router();
const Request = require('../models/requestsModel');
const Client = require('../models/clientsModel');

//Send Request to a lawyer
api.post('/lawyerRequest', (req, res) => {
    Request.findOne({ clientID: req.body.clientID, lawyerID: req.body.lawyerID }).then(
        (request) => {
            //Check to see if request has been made before
            if (!request) {
                Request.create(req.body).then(
                    (data) => {
                        res.json(data);
                    }
                )
            }
        }
    )

});

//Get all the requests made by a particular client
api.get('/lawyerRequests/:clientID', (req, res) => {
    Request.find({ clientID: req.params.clientID }).then(
        (requests) => {
            res.json(requests);
        }
    )

});

//Delete a Request
api.delete('/lawyerRequests/:reqID',(req,res)=>{
    Request.findByIdAndRemove(req.params.reqID).then(
        (data)=>{
            res.send('Successfully rejected');
        }
    );
});

//Get all requests made to a lawyer and return the datails of the clients who made the requests
api.get('/getClientRequests/:lawyerID', (req, res) => {
    var response = [];
    Request.find({ lawyerID: req.params.lawyerID }).then(
        (requests) => {
            var counter = requests.length; //Initialize counter to determine if its time to send JSON response
            requests.forEach(element => {
                getClientbyID(element.clientID).then(
                    (client)=>{
                        response.push({client,request:element});    
                        counter--;
                        if(counter <= 0){
                            //If the Loop has ended, send the response
                            res.json(response); 
                        }                   
                    }
                )
            });
            
        }
    );
});

//Function to retreive the client details by their IDs
function getClientbyID(id) {
    return Client.findOne({ _id: id })
}



module.exports = api;