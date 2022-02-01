const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');

//All client data validations
exports.validateClients = function (data) {
    let errors = {};

    if (Validator.isEmpty(data.firstname)) {
        errors.firstname = "Firstname required";
    }
    if (Validator.isNumeric(data.firstname)) {
        errors.phonenumber = "Name cannot be a number";
    }
    if (Validator.isEmpty(data.lastname)) {
        errors.lastname = "Lastname required";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "This field is required";
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Invalid Email";
    }
    if (Validator.isEmpty(data.phonenumber)) {
        errors.phonenumber = "Phone number required";
    } else {
        if (!Validator.isNumeric(data.phonenumber)) {
            errors.phonenumber = "phonenumber must be a number";
        }
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "password required";
    }
    if (Validator.isEmpty(data.passwordRe)) {
        errors.passwordRe = "You need to re-type your password";
    } else {
        if (!Validator.equals(data.password, data.passwordRe)) {
            errors.passwordRe = 'Passwords dont match'
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

