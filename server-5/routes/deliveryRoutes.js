const express = require('express');
const upload = require("../middleware/multer"); 
const { start_transaction, complete_transaction, get_all_transactions, get_transactions_by_delivery_person, get_transactions_by_donor } = require('../controllers/deliveryController');

const router = express.Router();

router.post('/add-transaction', start_transaction);
router.post('/complete-transaction', upload.single("image"), complete_transaction);
router.get('/get-all-transactions',get_all_transactions)
router.get('/transactions/delivery-person/:delivery_person_id', get_transactions_by_delivery_person); 
router.get('/transactions/donor/:donation_id', get_transactions_by_donor);
module.exports = router;
