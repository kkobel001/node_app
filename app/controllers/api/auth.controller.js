const Company = require('../../db/models/company');


class AuthController {
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
            res.status(200).json({apiToken:user.apiToken});
            }
            catch(error){
                res.status(401)

            }
        }
}

module.exports= new AuthController();