const {UserInfo} = require('../models/Users/User_Info');
const {CompanyInfo} = require('../models/Companies/Company_Info');
const {Notification} = require('../models/Notification');
const {endDate} = require('../models/Companies/EndDates');
const {JobAd} = require('../models/Companies/Job_Ad');
const {Contract} = require('../models/Companies/Contract');
const auth = require('../middleware/auth');
const dateTime = require('node-datetime');
const {Accepted } = require('../models/Companies/Accepted');



module.exports = (app) =>{

    app.post('/api/send/Jobad', async (req,res) =>{

              const job_skills = req.body.job_skills;
              const country=req.body.country;
              const city= req.body.city;
              const gender= req.body.gender;
              const  personal_Skills= req.body.personal_Skills;
              const public_Major = req.body.public_Major;
            const jobAd = req.body.jobAd;

        const result = await UserInfo
        .find({job_skills : job_skills , country: country,city: city
        ,gender: gender,personal_Skills: personal_Skills,public_Major: public_Major })
        .select("user");

        result.forEach(function(r) {
           new Notification({
            content : jobAd,
            user : r.user
           }).save();
        })

        res.status(200).send("Done .");
    });

    // Get all notifications content ..

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

    // Get all notifications ..

    app.get('/api/get/allnotifications', async (req,res) =>{
        const userId = req.query.userId;

        const notifications = await Notification
        .find({user: req.user._id})
        .select('-user');


        res.send(notifications);
    });
   
    // Get spicific notification ..

    app.get('/api/get/notification', async (req,res) =>{
        const notiId = req.query.notiId;

        const result = await Notification
        .findById(notiId);

        if(result.isRead = false){
            result.isRead = true;
            result.save();
        }

        res.send(result);
    })

    // Get last 4 notification

    app.get('/api/get/lastnotifcation', async (req,res) =>{
        //const userId = req.query.userId;

        const lastNotification = await Notification
        .find({user : req.user._id}).sort({date: -1}).limit(5);

        res.send(lastNotification);
    })

    // unread notificatoion
    app.get('/api/get/unread/notification', async (req,res) =>{
        //const userId = req.query.userId;

        const count = await Notification
        .find({user: req.user._id, isRead: false}).count();
        if(!count) count = 0;
        res.send(count);

    })

    // Start Job

    app.post('/api/start/job', async (req, res) => {

        Date.prototype.addDays = function (startDate,days) {
            var date = new Date(startDate);
            date.setDate(date.getDate() + days);
            return date;
        }

        const start_day = await JobAd.findById(req.body.jobAd_id);
        const contract_days = await Contract.findById(start_day.contract).select('days -_id');
        var Ed = new Date();
        Ed = Ed.addDays(start_day.startDate,contract_days.days);
        const workHours = start_day.work_hours * contract_days.days ; 
        new endDate({
             endDate: Ed,
             jobAd: req.body.jobAd_id,
             workHours: workHours
        }).save().then(user =>{
            res.send(user);
        })
        
    })
    app.post('/api/end/job', async (req,res) =>{
     
        Date.daysBetween = function( date1, date2 ) {
            //Get 1 day in milliseconds
            var one_day=1000*60*60*24;
          
            // Convert both dates to milliseconds
            var date1_ms = date1.getTime();
            var date2_ms = date2.getTime();
          
            // Calculate the difference in milliseconds
            var difference_ms = date2_ms - date1_ms;
              
            // Convert back to days and return
            return Math.round(difference_ms/one_day); 
          }
          
          const start_day = await JobAd.findById(req.body.jobAd_id);
          
          //Set the two dates
          var startD  = new Date(start_day.startDate); 
          var calcDate = new Date(startD.getFullYear() , startD.getMonth()-1, startD.getDate());
          var today= new Date();

          var endDate =  Date.daysBetween(calcDate, today);

          const workHours = start_day.work_hours * endDate ; 

          const current_user = await UserInfo.findOne({'user' : req.body.user});

          current_user.work_Hours += workHours;
          current_user.save();
          const deleteAccepted = await Accepted.findOneAndDelete({'acceptedName' : req.body.user, 'jobAd': req.body.jobAd_id});
          res.status(200).send("updated !");

    })
 
}