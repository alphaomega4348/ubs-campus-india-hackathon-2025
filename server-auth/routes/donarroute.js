const express = require('express');
const { registerDonor, loginDonor, getDonors } = require('../controllers/donarController');

const router = express.Router();

router.post('/donors/register', registerDonor);
router.post('/donors/logn',loginDonor)
router.get('/donars/get-all',getDonors)

module.exports = router; // ✅ FIXED!
