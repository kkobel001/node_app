const express = require('express');
const router= new express.Router();
const CompanyController = require('../controllers/api/company-controller');

router.get('/companies',CompanyController.showCompanies);
router.post('/companies',CompanyController.create);
router.put('/companies/:slug',CompanyController.edit);
router.delete('/companies/:slug',CompanyController.delete);





module.exports=router;