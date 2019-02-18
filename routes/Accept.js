const {Accepted } = require('../models/Companies/Accepted');
const mongoose = require('mongoose');

module.exports = (app) =>{
    app.post('/api/postAccBody',(req,res)=>{
        new Accepted  ({
            jobAd : req.body.jobAd ,
            acceptedName : req.body.acceptedName
}).save()
.then(result=>{res.send(result);})
});

app.get('/api/getAllData',async (req,res)=>{
    const result = await Accepted.find();
    res.send(result);
});

app.get('/api/getOneData',async(req,res)=>{
const oneR = await Accepted.findOne({'jobAd': req.query.jobAd})
if(oneR)
res.send(oneR);
else
res.send("notfound");
});
}