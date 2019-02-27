const {Company} = require('../models/Companies/Companies');

module.exports = (app) =>{

app.put('/api/companyApproval',async(req,res)=>{

    await Company.updateOne({'_id': req.body.id},{
     $set : { isActive : true,}
    })
    res.status(200).send("Updated");

})
}