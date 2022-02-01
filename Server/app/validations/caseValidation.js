const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');

exports.validateCases = function (data) {
    let errors = {};

    if (Validator.isEmpty(data.title)) {
        errors.title = "You need to Input the title of the case";
    }
    if (Validator.isEmpty(data.key)) {
        errors.title = "This Case needs to have a Key";
    }
    if (Validator.isEmpty(data.description)) {
        errors.title = "You need to give a breif description about this case";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
