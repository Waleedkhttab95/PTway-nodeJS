const {Accepted } = require('../models/Companies/Accepted');
const mongoose = require('mongoose');
const {User} = require('../models/Users/User');

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
    const usernames = [];

const oneR = await Accepted.find({'jobAd': req.query.jobAd})
if(oneR){

    const AcceptedNames = oneR.map(x => x.acceptedName);
    const ids = oneR.map(x=> x._id);

    for(var i = 0 ; i < AcceptedNames.length ; i++) {

        const users = await User.findById( AcceptedNames[i]).select("firstName lastName -_id");
        usernames.push(users);
      }

      const username = usernames.map(x => x.firstName +' '+ x.lastName);

    
  res.status(200).json({
    AcceptedNames: AcceptedNames,
    username: username, 
    id: ids,
    count : oneR.length
  });
}

else
res.send("not found");
});
}