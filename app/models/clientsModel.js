const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Creating the Schema
let ClientSchema = new Schema({
    firstname: {
        type: String,
        required: [true]
    },
    middlename: {
        type: String,
    },
    lastname: {
        type: String,
        required: [true]
    },
    phoneNumber: {
        type: String,
        required: [true]
    },
    email: {
        type: String,
        required: [true]
    },
    password: {
        type: String,
        required: [true]
    },
    occupation: {
        type: String,
    },
    personalInfo: {
        type: String,
    },
    lawyerID:{
        type:String,
    }
});

//Initializing the Model
const Client = mongoose.model('Client', ClientSchema);
module.exports = Client;