const {Candidate} = require('../models/Companies/Candidates');

module.exports = (app) =>{
 app.post('/api/postBodyC',(req,res)=>{
   new Candidate({
    candidateName : req.body.candidateName ,
    jobAd : req.body.jobAd
   }).save()
.then (result => {res.send(result);})
});

app.get('/api/getCandites',async (req,res)=>{
    const result = await Candidate.find();
    res.send(result);
});

app.get('/api/getOneCandi',async(req,res)=>{
const Bresult = await Candidate.find({'jobAd':req.query.jobAd})
if (!Bresult) return res.status(401).send('notFound')
const candidateNames = Bresult.map(x => x.candidateName);
const ids = Bresult.map(x=> x._id);
res.status(200).json({
  candidateNames: candidateNames,
  id: ids,
  count : Bresult.length
});
});
}//endofapp