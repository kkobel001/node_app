const express = require('express');
const path= require('path');
const ejsLayouts= require('express-ejs-layouts');
const app = express();
const cookiesParser=require('cookie-parser');
const session= require('express-session'); 
const {sessionKeySecret}= require('./config');

//initial database
require('../db/mongoose')

//middleware session
app.use(session({
    secret:sessionKeySecret ,
    saveUninitialized:true,
    cookie: {maxAge:1000 *60 *60 *24 *3}, //3 day
    resave: false
}))

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set('layout', './layouts/main');
app.set('views', path.join(__dirname + '/../views'));

//bodyparser
app(express.urlencoded({extended:true}));
app((cookiesParser));

//middleware
app.use('/', require('../middleware/views-variables'));
app.use('/', require('../middleware/user-middleware'));



//routes
app.use(require('./web.js'));









module.exports= app;