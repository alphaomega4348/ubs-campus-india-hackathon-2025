const express = require('express');
const { registerSchool, getSchools } = require('../controllers/schoolController');
const { registerDonor, getDonors } = require('../controllers/donorController');

const router = express.Router();

// School Routes
router.post('/schools/register', registerSchool);
router.get('/schools', getSchools);

// Donor Routes
router.post('/donors/register', registerDonor);
router.get('/donors', getDonors);

module.exports = router;