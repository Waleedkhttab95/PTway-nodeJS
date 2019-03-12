const mongoose = require('mongoose');
const {Schema} = mongoose;

const publicMajorSchema = new Schema({
key : {type:String},
majorName : String
});

const publicMajor = mongoose.model('Public_Major', publicMajorSchema);

module.exports.publicMajor = publicMajor
