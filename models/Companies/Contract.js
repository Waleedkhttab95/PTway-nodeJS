const mongoose = require('mongoose');

const {Schema} = mongoose;

const contractSchema = new Schema({
key : {type:String},
contractName : String,
days : Number
});


const Contract = mongoose.model('Contracts', contractSchema);


exports.Contract = Contract;
