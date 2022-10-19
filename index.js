const express = require('express');
const port=3000;
const path= require('path');
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));


app.get('/',(req,res) => {
    res.render('home', {
        title:"Strona główna"
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

    
        res.render(`company`, {
            name: company?.name,
            companies,
            title:company?.name ?? 'Brak wyników'
        });
   
        
})
app.get('*', (req,res)=> {
    res.render('errors/404')
});

app.listen(port);

