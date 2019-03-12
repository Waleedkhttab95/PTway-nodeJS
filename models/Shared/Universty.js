const mongoose = require('mongoose');

const {Schema} = mongoose;

const universtySchema = new Schema({
key : {type:String},
universtyName : String,

});


const Universty = mongoose.model('Universty', universtySchema);


exports.Universty = Universty;