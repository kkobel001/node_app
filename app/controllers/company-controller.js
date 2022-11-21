const Company = require('../db/models/company');

class CompanyController {

   async showCompanies(req,res){
        const {q,sort, countmin, countmax } = req.query;
        
        const page= req.query.page || 1; //która jest strona
        const perPage=2;  //ile chce wyników wyświetlic

        //search
        const where ={};
        if (q) {where.name ={$regex: q || '', $options : 'i'}}
        //filter
        if (countmin || countmax ) {
            where.employeesCount={};
            if (countmin)  where.employeesCount.$gte = countmin;
            if (countmax)  where.employeesCount.$lte = countmax;
            // where.employeesCount = { $gte: countmin || 0}
        }

        let query =  Company.find(where); //sort.find
       
        //paginantion
        query=query.skip((page-1)*perPage);
        query=query.limit(perPage);


        //sort
        if (sort) {
           const  s = sort.split('|')
            query = query.sort({ [s[0]]: s[1] });
        }
        //downloading comapnies
        const companies= await query.populate('user').exec();
        const resultsPageCount= await Company.find(where).count(); // ilosc wynikow
        const pagesCount =  Math.ceil(resultsPageCount / perPage); //ilosc stron)

        res.render('pages/companies/companies', {
            companies,
            page,
            pagesCount,
            resultsPageCount

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
            user: req.session.user._id, //currently user
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
    // post -zapisuja sie zmienione pliki
    async editCompany(req,res) {
        const {name} = req.params;
        const company = await Company.findOne({slug:name});
        //zmiana 
        company.name=req.body.name;
        company.slug =req.body.slug;
        company.empoyesCount= req.body.empoyesCount;
        company.image=req.file.filename;

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
