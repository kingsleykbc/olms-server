const mongoose  = require('mongoose');
let Schema  = mongoose.Schema;

//Creating the Schema
let LawyerSchema  = new Schema({
    firstname: {
        type:String,
        required:[true]
    },
    middlename: {
        type:String,
        required:[false]
    },
    lastname:  {
        type:String,
        required: [true]
    },
    phoneNumber:{
        type:String,
        required: [true]
    },
    email: {
        type: String,
        required: [true]
    },
    password:{
        type: String,
        required:[true]
    },
    website: {
        type: String,
    },
    businessType: {
        type: String,
        required:[true]
    },
    firm: {
        type: String,
    },
    personalInfo: {
        type: String,
    }
});

//Initializing the Model
const Lawyer = mongoose.model('Lawyer', LawyerSchema);
module.exports = Lawyer;