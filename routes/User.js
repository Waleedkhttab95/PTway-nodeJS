const {User} = require('../models/Users/User');

module.exports = (app) => {

    app.get('/api/get/user', async (req,res) =>{
        const id = req.query.id;

        const user = await User.findById(id);

        const fullName = user.firstName +' '+ user.lastName;

        res.status(200).json({
            userName: fullName
          
          });
    })
}