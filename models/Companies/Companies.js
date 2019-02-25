const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const {Schema} = mongoose;

const companySchema = new Schema({

companyName: {
    type:String,
    required: true,
    maxlength: 50,
    unique: false
},
email: {
    type:String,
    required: true,
    minlength: 5,
    maxlength: 255
},
password: {
    type:String,
    required: true,
    unique: false
},
sector: {type: mongoose.Schema.Types.ObjectId, ref:'Sectors'},
CompanySpecialist: {type: mongoose.Schema.Types.ObjectId, ref:'Specialists'},
isActive : {
    type: Boolean , 
    default: true
}
});

companySchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, keys.jwtKey);

    return token;
}
const Company = mongoose.model('companies', companySchema);

// function validateCompany(company) {
//     const Schema = {
//         companyName: Joi.string().max(50).required(),
//         email: Joi.string().min(5).max(255).required().email(),
//         password: Joi.string().min(5).required(),
//     };

//     return Joi.validate(company, Schema);
// }
exports.Company = Company;
//exports.validateCompany = validateCompany;