const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const {Schema} = mongoose;

const userSchema = new Schema({
googleId: String,
firstName: {
    type:String,
    required: true,
    maxlength: 50,
    unique: false
},
lastName: {
    type:String,
    required: true,
    maxlength: 50,
    unique: false
},
email: {
    type:String,
    required: true,
    minlength: 5,
    maxlength: 255
},
password: {
    type:String,
    required: true,
    unique: false
},
isAdmin:Boolean
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, keys.jwtKey);

    return token;
}
const User = mongoose.model('users', userSchema);

function validateUser(user) {
    const Schema = {
        firstName: Joi.string().max(50).required(),
        lastName: Joi.string().max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).required(),
    };

    return Joi.validate(user, Schema);
}
exports.User = User;
exports.validate = validateUser;