const mongoose = require('mongoose');

const {Schema} = mongoose;

const sectorSchema = new Schema({
key : {type:String},
sectorName : String
});


const Sector = mongoose.model('Sectors', sectorSchema);


exports.Sector = Sector;
