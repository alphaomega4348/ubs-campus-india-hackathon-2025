const express = require('express');
const { registerDonor, loginDonor, getDonors } = require('../controllers/donarController');

const router = express.Router();

router.post('/donors/register', registerDonor);
router.post('/donors/login',loginDonor)
router.get('/donors/get-all',getDonors)

module.exports = router; // ✅ FIXED!
