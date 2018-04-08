const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const utils = require('./utils');

const localSignupStrategy = require('./passport/localSignup');
const localLoginStrategy = require('./passport/localLogin');

const authCheckMiddleware = require('./middlewares/authCheck');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(utils.enableCors);

app.use(passport.initialize());

passport.use('localSignup', localSignupStrategy);
passport.use('localLogin', localLoginStrategy);

app.use('/api', authCheckMiddleware);

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

module.exports = app;
