const {Candidate} = require('../models/Companies/Candidates');

module.exports = (app) =>{
 app.post('/api/postBodyC',(req,res)=>{
   new Candidate({
    candidateName : req.body.candidateName ,
    jobAd : req.body.jobAd
   }).save()
.then (result => {res.send(result);})
});

app.get('/api/getCandiBody',async (req,res)=>{
    const result = await Candidate.find();
    res.send(result);
});

app.get('/api/getOneCandi',async(req,res)=>{
const Bresult = await Candidate.findOne({'jobAd':req.query.jobAd})
if (!Bresult) return res.status(401).send('notFound')
res.send(Bresult);
});
}//endofapp