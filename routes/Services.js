const {UserInfo} = require('../models/Users/User_Info');
const {CompanyInfo} = require('../models/Companies/Company_Info');
const {Notification} = require('../models/Notification');
const {JobAd} = require('../models/Companies/Job_Ad');
const auth = require('../middleware/auth');

module.exports = (app) =>{

    
    app.post('/api/send/ad', async (req,res) =>{

        const country = req.body.country;
        const city = req.body.city;
        const jobAd = req.body.jobAd;


        const result = await UserInfo
        .find({country : country , city: city})
        .select("user");


        result.forEach(function(r) {
           new Notification({
            content : jobAd,
            user : r.user
           }).save();
        })

        res.status(200).send("Done .");
    });

    // Get all notifications ..

    app.get('/api/get/notifications', async (req,res) =>{
        const userId = req.query.userId;
       var result = [];
        const notifications = await Notification
        .find({user: userId})
        .select('-user');

        for(var i = 0 ; i<notifications.length ; i++){
             result += await JobAd
            .find({_id : notifications[i].content})
            .select("job_Name _id");
        }
       

        res.send(result);
    });
   
    // Get spicific notification ..

    app.get('/api/get/notification', async (req,res) =>{
        const jobId = req.query.jobId;

        const result = await JobAd
        .findById(jobId);

        res.send(result);
    })
}