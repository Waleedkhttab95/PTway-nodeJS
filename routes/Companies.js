const {Sector} = require('../models/Sector');
const {CompanySpecialist} = require('../models/CompanySpecialist');
const {Project} = require('../models/Project');
const {JobAd} = require('../models/Job_Ad');
const {Contract} = require('../models/Contract');
module.exports = (app) => {

    // Add Company Sector
    app.post('/api/postsector', (req,res) =>{
    
        new Sector({
            sectorName: req.body.sectorName
        }).save()
        .then(result =>{
            res.send(result);
        })

    });

    // add company specialization

    app.post('/api/postspec', (req,res) =>{

        new CompanySpecialist({
            specialistName: req.body.specialistName
        }).save()
        .then(result =>{
            res.send(result);
        })

    });

    // Get all sectors

    app.get('/api/getsectors', (req,res) =>{
        
       Sector.find({}, function(error,sectors) {
           var map = {};

           sectors.forEach(function(sector) {
               map[sector._id] = sector;
           })

           res.send(map);
       })
    });

     // Get all specialization

     app.get('/api/getspec', (req,res) =>{
        CompanySpecialist.find({}, function(error,specs) {
            var map = {};
 
            specs.forEach(function(spec) {
                map[spec._id] = spec;
            })
 
            res.send(map);
        })
     });

     // POST PROJECT 
        app.post('/api/postproject', (req,res) =>{
            new Project({
                projectName: req.body.projectName,
                projectDescription : req.body.projectDescription,
                

            }).save()
            .then(result =>{
                res.send(result);
            });

        });

          // POST job Ad 
          app.post('/api/postjob', (req,res) =>{
            new JobAd({
                

            }).save()
            .then(result =>{
                res.send(result);
            });

        });

          // Get all projects

     app.get('/api/getprojects', (req,res) =>{
        Project.find({}, function(error,projects) {
            var map = {};
 
            projects.forEach(function(project) {
                map[project._id] = project;
            })
 
            res.send(map);
        })
     });


       // Get all jobs Ad 

       app.get('/api/getjobs', (req,res) =>{
        JobAd.find({}, function(error,jobs) {
            var map = {};
 
            jobs.forEach(function(job) {
                map[job._id] = job;
            })
 
            res.send(map);
        })
     });

        //Get project by Id
        app.get('/api/getproject', async (req,res) =>{
            const id = req.query.id;
          
           const project= await Project.findById(id);
            if(!project) return res.status(401).send('not found');
            res.send(project);
        });

        
        //Get job by Id
        app.get('/api/getjob', async (req,res) =>{
            const id = req.query.id;
          
           const job= await JobAd.findById(id);
            if(!job) return res.status(401).send('not found');
            res.send(job);
        });

        //Post Contract

        app.post('/api/postcontract', (req,res) =>{
           
            new Contract({
                contractName: req.body.contractName
            }).save()
            .then(result =>{
                res.send(result);
            })
    
        });

            // Get all contracts

     app.get('/api/getcontracts', (req,res) =>{
        Contract.find({}, function(error,contracts) {
            var map = {};
 
            contracts.forEach(function(contract) {
                map[contract._id] = contract;
            })
 
            res.send(map);
        })
     });

        //DELETE project by Id
        app.delete('/api/deleteproject', async (req,res) =>{
            const id = req.query.id;
          
           const project= await Project.findByIdAndDelete(id);
            if(!project) return res.status(401).send('not found');
            res.send(project);
        });

        //DELETE job by Id
        app.delete('/api/deletejob', async (req,res) =>{
            const id = req.query.id;
          
           const job= await JobAd.findByIdAndDelete(id);
            if(!job) return res.status(401).send('not found');
            res.send(job);
        });

         

}
    