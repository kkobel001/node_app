const mongoose = require('mongoose');
const Schema = mongoose.Schema;


mongoose.connect('mongodb://localhost:27017/node-project');

const chechForbidenString = (value, forbidenString) => {
        if(value === forbidenString ) {
            throw new Error(`Nazwa ${forbidenString} jest zakazana`);
        }
}

const CompanySchema = new Schema({
    slug: {
        type: String,
        required: [true, 'Pole slug jest wymagane'],
        minLength:[3, 'Minimalna liczba znaków ot 3'],
        validate : value =>chechForbidenString(value, 'slug'),
        trim: true,
        // lowercase: true, 
    },
    name: {
        type:String,
        required: [true, 'Pole name jest wymagane'],

    },
    empoyesCount :{
        type:Number,
        min:1 
    }
});
CompanySchema.path('slug').set((value) => value.toLowerCase());


const MyModel = mongoose.model('Company', CompanySchema);

async function findcompany() {
    const companies = await MyModel.find({});
    console.log(companies)

   
}
findcompany();

async function newCompany() {
    const company = new MyModel({
        name:'kkk',
        slug:'       kkkKKK',
    })
    try {
        await company.save();

    } catch (e) {
        console.log('Cos poszło nie tak...');
        for (const key in e.errors){
            console.log(e.errors[key].message);


        }
    }
}

newCompany();

