const mongoose = require('mongoose');
const {schema} = require('../Shared/Public_Major');
const {Schema} = mongoose;

const user_infoSchema = new Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref:'users', required:true},
    key : {type:String},
    fullName: {type:String},
    work_Hours: {
        type: Number,
        default: 0
    },
    country: {type: mongoose.Schema.Types.ObjectId, ref:'Country'}
    ,
    
    study_status: {
        type:String,
        required:true
       
    },
    study_degree:{
    type: String,
    required:true
    },
    imagePath: String,
    education_degree:{
        type: String,
        required:true
        },
    
    
    gender: {
        type:String,
        required:true
      
    },
    mobile: {
        type:String,
        required:true
    },
    birthDate: {
        type:Date,
        required:true
      
    },
    
    city: {type: mongoose.Schema.Types.ObjectId, ref:'City'},
    
  
    Education_level: {
        type:String,
        required:true
      
    },
    
    public_Major: {type: mongoose.Schema.Types.ObjectId, ref:'Public_Major'},

    spMajor: {type: mongoose.Schema.Types.ObjectId, ref:'SpMajor'},
    languages: {
        type:String,
        required:true
      
    },
    skills: {
        type:String,
        required:true
      
    },
    
    personal_Skills: {
        type:String,
        required:true
      
    },
    hoppies: {
        type:String,
        required:true
      
    },
    universty: {
        type: mongoose.Schema.Types.ObjectId, ref:'Universty'
    },
    companies: [{ type: mongoose.Schema.Types.ObjectId, ref:'companies'}],
    social_Status: {
        type:String,
        required:true
      
    },
    about: {
        type:String
      
    },
    
personal_web:{
    type: String
    },
    
    facebook: {
        type: String
    },
    twitter: {
        type:String
    },
    
    instagram: {
        type:String
    },
    
    linkedin: {
        type: String
    }
});

const UserInfo = mongoose.model('user_info', user_infoSchema);


exports.UserInfo = UserInfo;


