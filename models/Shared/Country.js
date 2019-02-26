const mongoose = require('mongoose');

const {Schema} = mongoose;

const countrySchema = new Schema({
key : {type:String},
countryName : String,


});


const Country = mongoose.model('Country', countrySchema);


exports.Country = Country;