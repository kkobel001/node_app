const express = require('express');
const port=3000;

const app = express();

app.get('/', (req,res)=> {
    res.send('Hello express');
})
app.get('/kontakt', (req,res)=> {
    res.send('Kontakt');
})

app.get('/firmy/:name', (req,res)=> {
    const {name} = req.params;
    const companies=[
        {slug:'booking', name: "booking.com"},
        {slug:'vinted', name: "vined.com"},
    ]
    const company = companies.find(x=> x.slug === name);
    if(company) {
        res.send(`Nazwa firmy ${company.name}`)
    } 
    else {
        res.send(`Firma nie istnieje`)
    }
        
})
app.listen(port);

