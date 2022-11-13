module.exports ={
    function(req, res, next) {
        res.locals.url= req.url;
        res.locals.errors= null;
        res.locals.errors= {};
        res.locals.query= req.query;
         next()
       }
}