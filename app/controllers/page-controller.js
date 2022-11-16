class PageController {
   showhome(req,res) {
        res.render('pages/home', {
            title:"Strona główna",
        });

      
    }
    shownotfound(req,res) {
        res.render('errors/404', {
            title: 'Nie znaleziono',
            layout: 'layouts/minimalistic',
    
        })
    }
}

module.exports= new PageController();