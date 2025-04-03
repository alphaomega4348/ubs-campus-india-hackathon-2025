const express = require('express');
const upload = require("../middleware/multer"); 
const { start_transaction, complete_transaction } = require('../controllers/deliveryController');

const router = express.Router();

router.post('/add-transaction', start_transaction);
router.post('/complete-transaction', upload.single("image"), complete_transaction);

module.exports = router;
