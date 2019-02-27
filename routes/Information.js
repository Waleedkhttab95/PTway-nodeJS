const { UserInfo } = require('../models/Users/User_Info');
const { CompanyInfo } = require('../models/Companies/Company_Info');
const auth = require('../middleware/auth');
const file = require('../middleware/file');

module.exports = (app) => {
    //post user information
    app.post('/api/postuserinfo', (req, res) => {
        const url = req.protocol + '://' + req.get("host");     
        new UserInfo({
            user: req.body.user,
            country: req.body.country,
            study_status: req.body.study_status,
            study_degree: req.body.study_degree,
            imagePath: url + "/images/" + req.file.filename,
            education_degree: req.body.education_degree,
            gender: req.body.gender,
            mobile: req.body.mobile,
            birthDate: req.body.birthDate,
            city: req.body.city,
            Education_level: req.body.Education_level,
            public_Major: req.body.public_Major,
            spicifc_Major: req.body.spicifc_Major,
            languages: req.body.languages,
            skills: req.body.skills,
            personal_Skills: req.body.personal_Skills,
            hoppies: req.body.hoppies,
            social_Status: req.body.social_Status,
            about: req.body.about,
            personal_web: req.body.personal_web,
            facebook: req.body.facebook,
            twitter: req.body.twitter,
            instagram: req.body.instagram,
            linkedin: req.body.linkedin,
        }).save()
            .then(user => {
                res.send(user);
            });
    })


    //post company information
    app.post('/api/postcompanyinfo', auth, (req, res) => {
        const url = req.protocol + '://' + req.get("host");     

        new CompanyInfo({
            company: req.user._id,
            country: req.body.country,
            address: req.body.address,
            info: req.body.info,
            imagePath: url + "/images/" + req.file.filename,
            vision: req.body.vision,
            message: req.body.message,
            city: req.body.city,
            personal_web: req.body.personal_web,
            facebook: req.body.facebook,
            twitter: req.body.twitter,
            instagram: req.body.instagram,
            linkedin: req.body.linkedin,
        }).save()
            .then(company => {
                res.send(company);
            });
    })

    //Get user info by ID
    app.get('/api/getuserinfo', auth, async (req, res) => {
        const id = req.query.id;
        const info = await UserInfo.findOne({ 'user': id });
        if (!info) return res.status(401).send('not found');
        res.send(info);
    })

    //Get company info by CompanyID
    app.get('/api/getcompanyinfo', auth, async (req, res) => {
        const id = req.query.id;
        const info = await CompanyInfo.findOne({ 'company': id });
        if (!info) return res.status(401).send('not found');
        res.send(info);
    })

    app.put('/api/put/userinfo', async (req, res) => {
        const id = req.body.user;
        let imPath = req.body.imagePath;
        if(req.file) {
          const url = req.protocol + '://' + req.get("host");
          imPath= url + "/images/" + req.file.filename
        }

        const info = await UserInfo.updateOne({ 'user': id },
            {
                $set: {
                    country: req.body.country,
                    study_status: req.body.study_status,
                    study_degree: req.body.study_degree,
                    education_degree: req.body.education_degree,
                    gender: req.body.gender,
                    imagePath: imPath,
                    mobile: req.body.mobile,
                    birthDate: req.body.birthDate,
                    city: req.body.city,
                    Education_level: req.body.Education_level,
                    public_Major: req.body.public_Major,
                    spicifc_Major: req.body.spicifc_Major,
                    languages: req.body.languages,
                    skills: req.body.skills,
                    personal_Skills: req.body.personal_Skills,
                    hoppies: req.body.hoppies,
                    social_Status: req.body.social_Status,
                    about: req.body.about,
                    personal_web: req.body.personal_web,
                    facebook: req.body.facebook,
                    twitter: req.body.twitter,
                    instagram: req.body.instagram,
                    linkedin: req.body.linkedin,
                }
            }
        )//condition
        if (!info) return res.status(401).send('not found');
        res.status(200).send("Updated");
    })

    app.put('/api/put/companyinfo', async (req,res) => {
        const id = req.body.company;
        let imPath = req.body.imagePath;
        if(req.file) {
          const url = req.protocol + '://' + req.get("host");
          imPath= url + "/images/" + req.file.filename
        }

        const companyId = await CompanyInfo.updateOne({'company': id },
            {
                
                $set: {
                    
                    country: req.body.country,
                    address: req.body.address,
                    info: req.body.info,
                    vision: req.body.vision,
                    imagePath: imPath,
                    message: req.body.message,
                    city: req.body.city,
                    personal_web: req.body.personal_web,
                    facebook: req.body.facebook,
                    twitter: req.body.twitter,
                    instagram: req.body.instagram,
                    linkedin: req.body.linkedin,
                }
            })
        res.status(200).send("Updated");
    })
}