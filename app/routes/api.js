const express = require('express');
const router= new express.Router();
const CompanyController = require('../controllers/api/company-controller');
const AuthController = require('../controllers/api/auth-controller');
const apiAuthMiddleware = require('../middleware/is-auth.api');

router.get('/companies',CompanyController.showCompanies);
router.post('/companies',apiAuthMiddleware , CompanyController.create);
router.put('/companies/:slug',apiAuthMiddleware, CompanyController.edit);
router.delete('/companies/:slug',apiAuthMiddleware,CompanyController.delete);


router.post('/login',AuthController.login);






module.exports=router;