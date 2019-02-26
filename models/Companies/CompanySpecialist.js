const mongoose = require('mongoose');

const {Schema} = mongoose;

const specialistSchema = new Schema({
    key : {type:String},
    specialistName : String
});


const CompanySpecialist = mongoose.model('Specialists', specialistSchema);


exports.CompanySpecialist = CompanySpecialist;
