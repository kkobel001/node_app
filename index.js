const express = require('express');
const port=3000;
const path= require('path');
const ejsLayouts= require('express-ejs-layouts');
const app = express();



app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set('layout', './layouts/main');
app.set('views', path.join(__dirname + '/views'));


app.get('/',(req,res) => {
    res.render('pages/home', {
        title:"Strona główna",
        url: req.url,
    });
})

// app.get('/', (req,res)=> {
//     res.send('Hello ');
    
// })
// app.get('/kontakt', (req,res)=> {
//     res.send('Kontakt');
// })
debugger 
app.get('/firmy/:name', (req,res)=> {
    const {name} = req.params;
    const companies=[
        {slug:'booking', name: "booking.com"},
        {slug:'vinted', name: "vined.com"},
    ]
    const company = companies.find(x=> x.slug === name);

    
        res.render('pages/company', {
            name: company?.name,
            companies,
            title:company?.name ?? 'Brak wyników',
            url: req.url,

        });
   
        
})
app.get('*', (req,res)=> {
    res.render('errors/404', {
        title: 'Nie znaleziono',
        layout: 'layouts/minimalistic',
        url: req.url,

    })
});

app.listen(port);
