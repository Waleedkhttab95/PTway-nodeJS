const mongoose = require('mongoose');

const {Schema} = mongoose;

const personalSkillsSchema = new Schema({

skillName : String
});


const Skills = mongoose.model('Skills', personalSkillsSchema);


exports.Skills = Skills;
