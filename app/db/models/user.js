const e = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const {validateEmail} = require('../validators')


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase:true,
        trim: true,
        unique: [true,'Ten adres email jest juz zajęty'],
        validate : [validateEmail, 'Email nie jest prawidłowy'],
    },
    password : {
        type:String,
        required: true,
        minLength: [4, 'haslo powinno posiadc min 4 znaki']

    }
})
userSchema.post('save', function(error, doc, next) {
    if (erorr.code ===11000) {
        erorr.errors ={ email: {message:'Taki email jest juz zajęty'}};
    }
    next(error);
})


userSchema.pre('save', function(next) {
    const user = this;
    const salt =  bcrypt.genSaltSync(10);
    const hash =  bcrypt.hashSync(value, salt);
    user.password=hash;
    next();
})

const Uder = mongoose. model('User', userSchema);

module.exports=User;