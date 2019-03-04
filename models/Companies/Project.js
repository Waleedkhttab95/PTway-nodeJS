const mongoose = require('mongoose');

const {Schema} = mongoose;

const projectSchema = new Schema({
key : {type:String},
company:{type: mongoose.Schema.Types.ObjectId, ref:'companies'},
projectName : {type: String , required:true},
projectDescription : {type:String, required: true},
status : {type: Boolean , default: true},
date : {type: Date , default: Date.now()}
});


const Project = mongoose.model('Projects', projectSchema);


exports.Project = Project;