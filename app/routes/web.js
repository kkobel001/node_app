const express = require('express');
const router= new express.Router();
const CompanyController = require('../controllers/company-controller');
const PageController = require('../controllers/page-controller');



router.get('/',PageController.showhome),
router.get('/firmy', CompanyController.showCompanies),
router.get('/firmy/:name', CompanyController.showCompany),
router.get('/admin/firmy/dodaj', CompanyController.showCreateNewCompany),
router.post('/admin/firmy/dodaj', CompanyController.createNewCompany),
router.get('*',PageController.shownotfound),

module.exports= router;