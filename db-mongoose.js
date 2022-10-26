const mongoose = require('mongoose');
const Schema = mongoose.Schema;


mongoose.connect('mongodb://localhost:27017/node-project');

const Company = new Schema({
    slug: {
        type: String,
    },
    name: {
        type:String,
    }
});
const MyModel = mongoose.model('Company', Company);

async function findcompany() {
    const companies = await MyModel.find({});
    console.log(companies)

   
}
findcompany();

async function newCompany() {
    const company = new MyModel({
        name:'test',
        slug:'test'
    })
    await company.save();
}

newCompany();

