const express = require('express');
const path= require('path');
const ejsLayouts= require('express-ejs-layouts');
const app = express();
onst 

//initial database
require('../db/mongoose')

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set('layout', './layouts/main');
app.set('views', path.join(__dirname + '/../views'));

//bodyparser
app(express.urlencoded({extended:true}));

//middleware
app.use('/', require('../middleware/views-variables'));


//routes
app.use(require('./web.js'));









module.exports= app;