const express = require('express');
const router= new express.Router();
const CompanyController = require('../controllers/company-controller');
const UserController = require('../controllers/user-controler');
const PageController = require('../controllers/page-controller');



router.get('/',PageController.showhome),
router.get('/firmy', CompanyController.showCompanies),
router.get('/firmy/:name', CompanyController.showCompany),

router.get('/zarejestruj', UserController.showRegister),
router.post('/zarejestruj', UserController.register),
router.get('/zaloguj', UserController.showLogin),
router.post('/zaloguj', UserController.login),




router.get('admin/firmy/:name/edytuj', CompanyController.showEditCompanyForm),
router.get('/admin/firmy/dodaj', CompanyController.showCreateNewCompany),
router.post('/admin/firmy/dodaj', CompanyController.createNewCompany),
router.post('admin/firmy/:name/edytuj', CompanyController.editCompany),
router.get('admin/firmy/:name/usun', CompanyController.deleteCompany),

router.get('*',PageController.shownotfound),

module.exports= router;