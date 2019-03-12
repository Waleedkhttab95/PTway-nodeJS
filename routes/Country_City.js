const {City} = require('../models/Shared/City');
const {Country} = require('../models/Shared/Country');
const {spMajor} = require('../models/Shared/SpMajor');
const {publicMajor} = require('../models/Shared/Public_Major');
const {Universty} = require('../models/Shared/Universty');
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

    app.post('/api/post/major', (req,res) =>{
        new publicMajor({
            key: req.body.key,
            majorName: req.body.majorName
            }).save()
            .then(result =>{
                res.send(result);
    
        })
    })

    app.post('/api/post/spMajor', (req,res) =>{
        new spMajor({
            key: req.body.key,
            majorName: req.body.majorName,
            public_Major: req.body.public_Major
            }).save()
            .then(result =>{
                res.send(result);
    
        })
    })

    
    app.post('/api/post/universty', (req,res) =>{
        new Universty({
            key: req.body.key,
            universtyName: req.body.universtyName
            }).save()
            .then(result =>{
                res.send(result);
    
        })
    })

    // get all universty
    app.get('/api/get/universty', async(req,res) =>{
        const uni = await Universty.find()
        res.send(uni);
    })

    // get all majors
    
    app.get('/api/get/majors', async(req,res) =>{
        const result = await publicMajor.find()
        res.send(result);
    })

    // get spMajor
    app.get('/api/get/spMajors', async(req,res) =>{

        const result = await spMajor.find({'public_Major' : req.query.id})
        res.send(result);
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