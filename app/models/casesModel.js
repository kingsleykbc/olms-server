const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Creating the Schema
let CaseSchema = new Schema({
    title: {
        type: String,
        required: [true]
    },
    key: {
        type: String,
        required: [true]
    },
    description:{
        type: String,
        required:[true]
    },
    files: {
        type: Array,
        required: [false]
    },
    dateAdded:{
        type:String,
        required: [true]
    },
    clients: {
        type: Array,
        required: [false]
    },
    lawyerId:{
        type:String,
        required: [false]
    },
    status:{
        type:String,
        required:[true]
    }
});

//Initializing the Model
const Case = mongoose.model('Case', CaseSchema);
module.exports = Case;