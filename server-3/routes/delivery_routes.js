const express=require('express')
const { signup_partner, update_availability, getallpartners, get_partner_details, edit_partner_details, login_partner } = require('../controllers/delivery_patner_controller')

const router=express.Router()

router.post('/add-patner',signup_partner)
router.post('/change-availability/:id', update_availability);
router.get('/all-patners',getallpartners)
router.get('/partner/:id', get_partner_details);
router.put('/edit-partner/:id', edit_partner_details);
router.post('/login', login_partner);

module.exports=router