const {term } = require('../models/Shared/terms');
const mongoose = require('mongoose');
module.exports = (app) =>{
    app.post('/api/postTerm',(req,res)=>{
        new term({
            term : req.body.term,
        }).save()
     .then (result => {res.send(result);})
     });
     
     app.get('/api/getTerm',async (req,res)=>{
         const result = await term.find();
         res.send(result);
     });
     

}