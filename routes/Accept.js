const {Accepted } = require('../models/Companies/Accepted');
const mongoose = require('mongoose');

module.exports = (app) =>{
    app.post('/api/postAcc',(req,res)=>{
        new Accepted  ({
            jobAd : req.body.jobAd ,
            acceptedName : req.body.acceptedName
}).save()
.then(result=>{res.send(result);})
});

app.get('/api/getAllAccepts',async (req,res)=>{
    const result = await Accepted.find();
    res.send(result);
});

app.get('/api/getOneAccepted',async(req,res)=>{
const oneR = await Accepted.find({'jobAd': req.query.jobAd})
if(oneR)
res.send(oneR);
else
res.send("not found");
});
}