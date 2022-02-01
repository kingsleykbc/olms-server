console.time('test');
const express  = require ('express');
const bodyparser  = require('body-parser');
const fs  = require('fs');
const cors = require("cors");
const config  = require('./config');

//Apis
const lawyers = require('./app/apis/lawyers');
const lawyersLogin = require('./app/apis/lawyersLogin');
const cases = require('./app/apis/cases');
const clients = require('./app/apis/clients');
const requests = require('./app/apis/requests');
const todo = require('./app/apis/todo');
const bills = require('./app/apis/bills');

const app = express();

//Connect to Mongodb
config.connect();

//Middlewares
app.use(cors());
app.use(function(req,res,next) {
    console.log(req.ip,req.method,req.statusCode);
    
    next();
})

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

//Use API's
app.use(bills);
app.use(requests);
app.use(cases);
app.use(lawyers);
app.use(lawyersLogin);
app.use(clients);
app.use(todo);


//Port Page
app.get('/',(req,res)=>{
    res.send('App running on port '+config.port);
})

//Test
app.post('/test', (req, res) => {
    res.send('App test running on port ' + config.port);
})

//use the config.port to use your port number
app.listen (config.port,function(){
    console.log("app running on port " + config.port);
})
console.timeEnd('test');