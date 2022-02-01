const express = require('express');
const api = express.Router();
const todo = require('../models/toDoModel');

//Create a new todo
api.post('/todo/:lawyerID',(req,res)=>{
    todo.create({
        item: req.body.item,
        lawyerID: req.params.lawyerID
    }).then(
        item => {
            res.json(item);
        }
    ).catch(
        error => {
            console.log("Error adding to-do", error);
        }
    )
});

//Get all the todos
api.get('/todo/:lawyerID',(req,res)=>{
    todo.find({ lawyerID: req.params.lawyerID}).then(
        todos =>{
            res.json(todos);
        }
    ).catch(
        errors =>{
            console.log("Error retreiving the Todos", errors);
        }
    )
});

//Delete ToDo
api.delete('/todo/:todoID',(req,res)=>{
    todo.findByIdAndRemove(req.params.todoID).then(
        todo =>{
            res.json(todo);
        }
    ).catch(
        error =>{
            console.log("Error deleting ToDo", error);
        }
    );
});

module.exports = api;