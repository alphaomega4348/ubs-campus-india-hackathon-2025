const express = require('express');
// const { registerSchool, getSchools } = require('../controllers/schoolController');
const { registerDonor, getDonors, loginDonor } = require('../controllers/donorController');

const router = express.Router();

// Donor Routes
router.post('/donors/register', registerDonor);

router.post('/donors/login', loginDonor);          
router.get('/donors', getDonors);                 
router.get('/donors/:id', getDonors);  


module.exports = router;