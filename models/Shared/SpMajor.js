const mongoose = require('mongoose');

const {Schema} = mongoose;

const spMajorSchema = new Schema({
key : {type:String},
public_Major: {type: mongoose.Schema.Types.ObjectId, ref:'Public_Major'},
majorName : String
});

const spMajor = mongoose.model('SpMajor', spMajorSchema);

module.exports.spMajor = spMajor;
