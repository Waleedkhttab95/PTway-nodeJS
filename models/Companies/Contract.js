const mongoose = require('mongoose');

const {Schema} = mongoose;

const contractSchema = new Schema({

contractName : String
});


const Contract = mongoose.model('Contracts', contractSchema);


exports.Contract = Contract;
