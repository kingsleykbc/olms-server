const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Creating the Schema
let RequestSchema = new Schema({
    lawyerID: {
        type: String,
        required: [true]
    },
    clientID:{
        type: String,
        required: [true]
    }
});

//Initializing the Model
const Request = mongoose.model('Request', RequestSchema);
module.exports = Request;