const {City} = require('../models/Shared/City');
const {Country} = require('../models/Shared/Country');

module.exports = (app) => {

    // Post Country

    app.post('/api/postcountry', (req,res) =>{
        new Country({
            countryName: req.body.countryName
        }).save()
        .then(result =>{
            res.send(result);
        })

    })

    // post City

    app.post('/api/postcity', (req,res) =>{
        
        new City({
            cityName: req.body.cityName,
            country: req.body.countryId
        }).save()
        .then(result =>{
            res.send(result);
        })

    })

      // Get all countres

      app.get('/api/getcountry', async(req,res) =>{
         
        const Con = await Country.find()
        res.send(Con);
        })


        // Get all city

        app.get('/api/getcity', async (req,res) =>{
            const cityy = await City.find();
            res.send(cityy);
            })
        
}