const mongoose = require('mongoose');

const {Schema} = mongoose;

const candidatesSchema = new Schema({

 candidateName : {type: mongoose.Schema.Types.ObjectId, ref:'User'},
 jobAd : {type: mongoose.Schema.Types.ObjectId, ref:'Job_Ad'},
 key : {type:String}
});


const Candidate = mongoose.model('Candidates', candidatesSchema);


exports.Candidate = Candidate;
