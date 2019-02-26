const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');



require('./models/Users/User');
require('./services/passport');

 mongoose.connect(keys.mongoURI)
const app = express();

app.use(express.json());
app.use(
  cookieSession({
      maxAge: 30 * 24 * 60 *60*1000,
      keys: [keys.cookieKey]
  })  
);





app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);
require('./routes/Registretion')(app);
require('./routes/Companies')(app);
require('./routes/Country_City')(app);
require('./routes/Information')(app);
require('./routes/admin')(app);
require('./routes/Services')(app);
require('./services/updateResume')();







app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});
const PORT = process.env.PORT || 5000;
app.listen(PORT);