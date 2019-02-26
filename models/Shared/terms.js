const mongoose = require('mongoose');
const {Schema} = mongoose;
const terms = new Schema({
 key : {type:String},
 term : {type:String}
});

const term = mongoose.model('myTerm', terms );
exports.term = term;
