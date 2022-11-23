const User = require("../db/models/user");

module.exports = async function (req,res,next){
    //downloads from files user not session
    const token= req.headers.authorization?.split(' ')[1];
    if (!token){
        res.sendStatus(403)
    }
    const user= await User.findOne({apiToken: token})
        if(!user){
             res.sendStatus(403)
        }
        req.user=user;
    next()
}