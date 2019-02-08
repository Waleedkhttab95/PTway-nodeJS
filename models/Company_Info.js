const mongoose = require('mongoose');

const {Schema} = mongoose;

const company_infoSchema = new Schema({
    company:{type: mongoose.Schema.Types.ObjectId, ref:'companies'},
    country:  {type: mongoose.Schema.Types.ObjectId, ref:'Country'},

    address: {
        type:String,
        required:true
      
    },
   
    
    city: {type: mongoose.Schema.Types.ObjectId, ref:'City'},
    
  
    info: {
        type:String,
        required:true
      
    },
    vision: {
        type:String,
        required:true
      
    },
    
    message: {
        type:String,
        required:true
      
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

const CompanyInfo = mongoose.model('company_info', company_infoSchema);


exports.CompanyInfo = CompanyInfo;


