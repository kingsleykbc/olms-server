const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let toDoSchema = new Schema({

item:{
    type:String,
    required:[true]
},
lawyerID:{
    type:String,
    required:[true]
},
timeAdded:{
    type: Date,
    default: new Date()
}

});

//Initializing the Model
const Todo = mongoose.model('Todo', toDoSchema);
module.exports = Todo;