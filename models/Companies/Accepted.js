const mongoose = require('mongoose');

const {Schema} = mongoose;

const AcceptedSchema = new Schema({

    jobAd : {type: mongoose.Schema.Types.ObjectId, ref:'Job_Ad'},
     acceptedName :{type: mongoose.Schema.Types.ObjectId, ref:'User'},
});


const Candidate = mongoose.model('Candidates', candidatesSchema);


exports.Candidate = Candidate;
