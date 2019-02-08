const { User, validate } = require('../models/User');
const { Company, validateCompany } = require('../models/Companies');
const _ = require('lodash');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');


module.exports = (app) => {

  // User Registrion *

  app.post('/api/userRegistreing', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');

    user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password']));
    const salt = await bcrypt.genSalt(10, (error, hash) => {
      if (error) res.status(400)

    });
    const hashPassword = await bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) res.status(400)
      user.password = hash;
      user.save();
    });



    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'firstName', 'lastName', 'email']));
  });



  // for Companies Regitstrion *

  app.post('/api/companyRegistreing', async (req, res) => {

    const { error } = validateCompany(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    let company = await Company.findOne({ email: req.body.email });
    if (company) return res.status(400).send('User already registered');
    console.log(req.body);
    company = new Company({
      companyName: req.body.companyName,
      email: req.body.email,
      password: req.body.password,
      sector: req.body.sector,
      CompanySpecialist: req.body.CompanySpecialist,
      isActive: req.body.isActive
    });
    const salt = await bcrypt.genSalt(10, (error, hash) => {
      if (error) res.status(400)

    });
    const hashPassword = await bcrypt.hash(company.password, salt, null, (error, hash) => {
      if (error) res.status(400)
      company.password = hash;
      company.save();
    });



    const token = company.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(company, ['_id', 'companytName', 'email']));
  });
};



