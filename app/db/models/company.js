const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {chechForbidenString} = require('../validators');
// const User = require('./user');

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
    },
    user : {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    image: String
});
CompanySchema.path('slug').set((value) => value.toLowerCase());


const Company = mongoose.model('Company', CompanySchema);


module.exports =Company; 