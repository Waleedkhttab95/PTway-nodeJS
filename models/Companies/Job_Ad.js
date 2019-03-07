const mongoose = require('mongoose');

const {Schema} = mongoose;

const adSchema = new Schema({
   key : {type:String},
   contract: {type: mongoose.Schema.Types.ObjectId, ref:'Contracts', required:true},
   project: {type: mongoose.Schema.Types.ObjectId, ref:'Projects'},
   job_Name: {type: String , required:true},
   job_skills: {type: mongoose.Schema.Types.ObjectId, ref:'Specialists'},
   country:  {type: mongoose.Schema.Types.ObjectId, ref:'Country'},
   city: {type: mongoose.Schema.Types.ObjectId, ref:'City'},
  // study_status: {type:String,  required:true},
  // education_degree:{type: String, required:true},
   public_Major: {type:String,required:true},
  // spicifc_Major: {type:String, required:true},
   work_hours: {type:String, required:true},
   work_days: {type:String},
   salary: {type:String, required:true},
   gender: {type:String,required:true},  
   startDate: {type: Date, required:true},
  // languages: {type:String,required:true},
  // job_Responsibility: {type:String,required:true},
   personal_Skills: {type: String, required: true},
   required_Number:{type:Number,required:true},
  // start_Date: {type: Date, required: true},
  // age_From : {type:Number,required:true},
  // age_To : {type:Number,required:true}
});


const JobAd = mongoose.model('JobAds', adSchema);


exports.JobAd = JobAd;