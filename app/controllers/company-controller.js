const Company = require('../db/models/company');
const Comapny = require('../db/models/company');

class CompanyController {

   async showCompanies(req,res){
        const {q} = req.query;
        let companies= await Company.find({name:{$regex: q, $options : 'i'}});

        res.render('pages/companies/companies', {
            companies,
        });
    }

    async showCompany(req,res){
        const {name} = req.params;
        const company = await Company.findOne({ slug:name});
        
         res.render('pages/companies/company', {
             name: company?.name,
             title:company?.name ?? 'Brak wyników',
          });     
        }

      showCreateNewCompany(req,res) {
        res.render('pages/companies/createNewCompany')
     }   

    async createNewCompany(req,res) {
        console.log(req.body);
        const company = new Comapny({
            name: req.body.name,
            slug: req.body.slug,
            empoyesCount : req.body.empoyesCount,
        })
        try {
            await company.save();
            res.redirect('/firmy');
        }
        catch(e) {
            res.redner('pages/companies/createNewCompany', {
                errors:e.errors,
                from : req.body
            })
        }
        
     }
     //wczytuja sie pliki
    async showEditCompanyForm(req,res) {
        const {name} = req.params;
        const company = await Company.findOne({slug:name});

        res.render('pages/companies/editCompany', {
            form:company
        })
     }   
    // post zapisuja sie zmienione pliki
    async editCompany(req,res) {
        const {name} = req.params;
        const company = await Company.findOne({slug:name});
        //zmiana 
        company.name=req.body.name;
        company.slug =req.body.slug;
        company.empoyesCount= req.body.empoyesCount;

        try {
            await company.save();
            res.redirect('/firmy');
        }
        catch(e) {
            res.redner('pages/companies/createNewCompany', {
                errors:e.errors,
                from : req.body
            })
        }
        
     }
     async deleteCompany(req,res){
        const name = req.params;      
        try{
            await Company.deleteOne({slug:name});     
            res.redirect('/firmy');
        }
        catch(e) {
            res.sendStatus(204);
        }   
     }
}
module.exports = new CompanyController();
