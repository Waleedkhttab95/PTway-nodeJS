const mongoose = require('mongoose');

const {Schema} = mongoose;

const AcceptedSchema = new Schema({

    jobAd : {type: mongoose.Schema.Types.ObjectId, ref:'Job_Ad'},
     acceptedName :{type: mongoose.Schema.Types.ObjectId, ref:'User'},
});


const Accepted = mongoose.model('Accepted', AcceptedSchema);


exports.Accepted = Accepted;
