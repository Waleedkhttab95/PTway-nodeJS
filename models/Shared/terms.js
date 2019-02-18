const mongoose = require('mongoose');
const {Schema} = mongoose;
const terms = new Schema({
 term : {type:String}
});

const term = mongoose.model('myTerm', terms );
exports.term = term;
