const mongoose = require('mongoose');

const {Schema} = mongoose;

const endDateSchema = new Schema({

endDate : {type: Date },
jobAd : {type: mongoose.Schema.Types.ObjectId, ref:'Job_Ad'},
workHours: {type: Number}
});


const endDate = mongoose.model('endDates', endDateSchema);


exports.endDate = endDate;