const {Candidate} = require('../models/Companies/Candidates');
const {User} = require('../models/Users/User');

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
  const usernames = [];
const Bresult = await Candidate.find({'jobAd':req.query.jobAd})
if (!Bresult) return res.status(401).send('notFound')
const candidateNames = Bresult.map(x => x.candidateName);
const ids = Bresult.map(x=> x._id);

  for(var i = 0 ; i < candidateNames.length ; i++) {
    const users = await User.findById( candidateNames[i]).select("firstName lastName -_id")
    console.log(users);
    usernames.push(users);
  }
  
  const username = usernames.map(x => x.firstName +' '+ x.lastName);

  res.status(200).json({
    candidateNames: candidateNames,
    username: username, 
    id: ids,
    count : Bresult.length
  });




});
}//endofapp