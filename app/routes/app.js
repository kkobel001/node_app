const express = require('express');
const path= require('path');
const ejsLayouts= require('express-ejs-layouts');
const app = express();
const cookiesParser=require('cookie-parser');
const session= require('express-session'); 
const {sessionKeySecret}= require('./config');
const helmet = require('helmet');
const rateLimiterMiddleware = '../middleware/rate-limited-middleware.js';

//initial database
require('../db/mongoose')

//middleware session
app.use(session({
    secret:sessionKeySecret ,
    saveUninitialized:true,
    cookie: {maxAge:1000 *60 *60 *24 *3}, //3 day
    resave: false
}))

app.use(helmet({
    contentSecurityPolicy :{
        directives :{
            defaultSrc: ["'self"],
            scriptSrc: ["'self", "cdn.jsdelivr.net"],
            styleSrc: ["'self", "cdn.jsdelivr.net"]
        }
    }
}));
app.use(rateLimiterMiddleware);

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set('layout', './layouts/main');
app.set('views', path.join(__dirname + '/../views'));

//bodyparser
app.use(express.urlencoded({extended:true}));
app.use((cookiesParser));
app.use(express.json());

//middleware
app.use('/', require('../middleware/views-variables'));
app.use('/', require('../middleware/user-middleware'));
app.use('/admin', require('../middleware/auth'));





//routes
app.use('/api', require('./routes/api'));
app.use(require('./routes/web'));









module.exports= app;