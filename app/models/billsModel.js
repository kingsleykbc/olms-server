const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Creating the Lawyer Schema
let BillSchema = new Schema({
    lawyerID: {
        type: String,
        required: [true]
    },
    clientID: {
        type: String,
        required:[true]
    },
    title: {
        type: String,
        required: [true]
    },
    dateAdded: {
        type: Date,
        default: new Date
    },
    deadline:{
        type:Date,
        required:[true]
    },
    comment: {
        type: String
    },
    amount: {
        type: Number,
        required: [true]
    },
});

//Initializing the Model
const Bill = mongoose.model('Bill', BillSchema);
module.exports = Bill;