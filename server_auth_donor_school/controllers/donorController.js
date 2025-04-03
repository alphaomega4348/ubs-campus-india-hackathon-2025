const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Donor = require("../models/Donor");

// Register Donor
const registerDonor = async (req, res) => {
  try {
    const { name, email, phone, address, donorType, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingDonor = await Donor.findOne({ email });
    if (existingDonor) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const donor = new Donor({ 
      name, 
      email, 
      phone, 
      address, 
      donorType, 
      password: hashedPassword 
    });

    await donor.save();

    const token = jwt.sign({ id: donor._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ 
      message: "Donor registered successfully", 
      donor: { 
        _id: donor._id, 
        name: donor.name, 
        email: donor.email, 
        phone: donor.phone, 
        address: donor.address, 
        donorType: donor.donorType
      }, 
      token 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Donor Login
const loginDonor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const donor = await Donor.findOne({ email });
    if (!donor) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: donor._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ 
      message: "Login successful", 
      donor: { 
        _id: donor._id, 
        name: donor.name, 
        email: donor.email, 
        phone: donor.phone, 
        address: donor.address, 
        donorType: donor.donorType
      }, 
      token 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Donors
const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find().select("-password"); // Exclude password field
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerDonor, loginDonor, getDonors };
