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
}

module.exports= new UserController();