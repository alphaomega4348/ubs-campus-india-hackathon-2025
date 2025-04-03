const express = require('express');
const { registerSchool, loginSchool, getAllSchools } = require('../controllers/schoolController');

const router = express.Router();

router.post('/schools/register', registerSchool);
router.post('/schools/login', loginSchool);
router.get('/schools/get-all', getAllSchools);

module.exports = router;
