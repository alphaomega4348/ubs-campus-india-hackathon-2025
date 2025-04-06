const express = require("express");
const {
  registerDonor,
  loginDonor,
  getDonors,
  getLoggedInDonor,
  verifyDonor,
} = require("../controllers/donarController");

const router = express.Router();

router.post('/donors/register', registerDonor);
router.post('/donors/login',loginDonor)
router.get('/donors/get-all',getDonors)
router.get("/me", verifyDonor, getLoggedInDonor); // ✅ protected route to get logged-in donor

module.exports = router;
