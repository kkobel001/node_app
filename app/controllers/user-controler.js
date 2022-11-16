const User = require('../db/models/company');



class UserController {

    showRegister(req,res){
        res.render('pages/auth/register');
    }
   async register(req,res) {
    const user= new UserController({
        email: req.body.email,
        password:req.body.password,
    })
    try {
        // await user.save();
        res.redirect('/zaloguj');
    }
    catch(e) {
        res.redner('pages/auth/register', {
            errors:e.errors,
            from : req.body
        })
    }
    
 }

    showLogin(req,res){
        res.render('pages/auth/login');
    }

    async login(req,res) {

        try{
            const user = await User.findOne({email: req.body.email});
            if(!user) {
               throw new Error('Email not found')
                 }
                 const isValidPassword = user.comperePassword(req.body.password);
                      if(!isValidPassword) {
                        throw new Error('Password not valid')
             }
             //login
            req.session.user ={
                _id: user._id,
                email:user.email,
            };
            res.redirect('/');
            }
            catch(error){
                return  res.render('pages/ath/login', {
                    form: req.body,
                    errors:true,
                })
            }
        }
}

module.exports= new UserController();