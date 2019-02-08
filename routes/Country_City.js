const {City} = require('../models/City');
const {Country} = require('../models/Country');

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

      app.get('/api/getcountry', (req,res) =>{
        Country.find({}, function(error,countres) {
            var map = {};
 
            countres.forEach(function(country) {
                map[country._id] = country;
            })
 
            res.send(map);
        })
     });

        // Get all city

        app.get('/api/getcity', (req,res) =>{
            City.find({}, function(error,result) {
                var map = {};
     
                result.forEach(function(city) {
                    map[city._id] = city;
                })
     
                res.send(map);
            })
         });
}