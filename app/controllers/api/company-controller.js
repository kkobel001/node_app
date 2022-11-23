const Company = require('../../db/models/company');

class CompanyController {

    async showCompanies(req,res) {
        const companies = await Company.find();
        res.json(companies)

    }

    async create (req,res) {
        const company = new Comapny({
            name: req.body.name,
            slug: req.body.slug,
            empoyesCount : req.body.empoyesCount,
            user:req.body.user,
            // user: req.session.user._id, //currently user
        })
        try {
            await company.save();
            res.status(201).json(company);
    }
        catch(e) {
           res.status(422).json({errors:e.errors})
        }
        
    }
    async edit(req,res){
        const {slug} = req.params;
        const company = await Company.findOne({slug:slug});
        //zmiana 
        if ( req.body.name) company.name=req.body.name;
        if ( req.body.slug) company.slug =req.body.slug;
        if ( req.body.empoyesCount) company.empoyesCount= req.body.empoyesCount;
        company.image=req.file.filename;

        try {
            await company.save();
            res.status(200).json(company);
        }
        catch(e) {
            res.status(422).json({errors:e.errors})

        }
    }
    async delete(req,res){
        const slug = req.params;      
        const company = await Company.findOne({slug:slug});

        try{
            await Company.deleteOne({slug:slug});     
            res.status(204).send();
        }
        catch(e) {
            res.status(422).json({errors:e.errors})
        }   


    }

}

module.exports= new CompanyController;