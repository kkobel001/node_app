const mongoose = require('mongoose');
const url  ='mongodb://localhost:27017/node-project';
const Company = require('./models/company');

mongoose.connect(url);


// async function findcompany() {
//     const companies = await Company.find({});
//     console.log(companies)

   
// }
// findcompany();

// async function newCompany() {
//     const company = new Company({
//         name:'kkk',
//         slug:'       kkkKKK',
//     })
//     try {
//         await company.save();

//     } catch (e) {
//         console.log('Cos poszło nie tak...');
//         for (const key in e.errors){
//             console.log(e.errors[key].message);


//         }
//     }
// }

// newCompany();

