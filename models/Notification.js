const mongoose = require('mongoose');

const {Schema} = mongoose;

const notificationSchema = new Schema({

 content : {type: mongoose.Schema.Types.ObjectId, ref:'Job_Ad'},
 user : {type: mongoose.Schema.Types.ObjectId, ref:'User'},
 date : {type: Date, default: Date.now()}
});


const Notification = mongoose.model('Notifications', notificationSchema);


exports.Notification = Notification;