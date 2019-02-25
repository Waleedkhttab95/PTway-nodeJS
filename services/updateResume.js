const cron = require('node-cron');
const dateTime = require('node-datetime');
const {endDate} = require('../models/Companies/EndDates');
const {Accepted } = require('../models/Companies/Accepted');
const {UserInfo} = require('../models/Users/User_Info');


module.exports = () =>{
    cron.schedule(' 00 00 00 * * *',async () =>{
        var dt = dateTime.create();
        var today = dt.format('Y-m-d ');
  
        const end_date = await endDate.find({'endDate' : today});
        if(end_date) {
            for(var i = 0 ; i< end_date.length ; i++){
                const users = await Accepted.find({'jobAd' : end_date[i].jobAd}).select('acceptedName -_id');
                
                for(var j =0 ; j < users.length ; j++) {
                    const current_user = await UserInfo.findOne({'user' : users[j].acceptedName});
                  
                     current_user.work_Hours = end_date[i].workHours;
                     current_user.save();
                }
             
    
            }
        }
   
    });
// 00 00 00 * * *
}
   