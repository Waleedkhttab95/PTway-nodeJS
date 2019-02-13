const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const auth = require('../middleware/auth');
const { Company ,validateCompany} = require('../models/Companies/Companies');
const Joi = require('joi');


module.exports = (app) =>{
    app.get('/auth/google',passport.authenticate('google',{
        scope: ['profile','email']
    }))
    
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send("");
    });
    app.get('/api/current_user', (req,res) =>{
        res.send(req.user);
    });

    // for user
    app.post('/api/login', async (req, res) => {
        
        const {error} = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        

      let user = await  User.findOne({email: req.body.email});
      if (!user) return res.status(400).send('Invalid email or password');
        
       const validPassword= await bcrypt.compare(req.body.password, user.password,(error,result) =>{

        if (!result) return res.status(400).send('Invalid email or password');
      const token = user.generateAuthToken();
        res.send(token);
       });
       
     });

     app.get('/api/currentuser',auth, async (req,res) =>{
         const user = await User.findById(req.user._id).select('-password');
         res.send(user);
     })

     // for company 

     app.post('/api/com_login', async (req, res) => {
        
        const {error} = validateCompany(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        

      let company = await  Company.findOne({email: req.body.email});
      if (!company) return res.status(400).send('Invalid email or password');
        
       const validPassword= await bcrypt.compare(req.body.password, company.password,(error,result) =>{

        if (!result) return res.status(400).send('Invalid email or password');
      const token = company.generateAuthToken();
        res.send(token);
       });
       
     });

     app.get('/api/currentcompany',auth, async (req,res) =>{
        const company = await Company.findById(req.user._id).select('-password');
        res.send(company);
    })

     function validate(req) {
        const Schema = {
     
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(5).required(),
        };
    
        return Joi.validate(req, Schema);
    }
};

