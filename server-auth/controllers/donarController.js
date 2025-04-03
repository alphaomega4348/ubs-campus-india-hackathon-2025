const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Donor = require("../models/donarModel");

const registerDonor = async (req, res) => {
    try {
      console.log("📥 Request Body:", req.body);
  
      const { name, email, phone, address, donorType, password, confirmPassword } = req.body;
      
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
  
      const existingDonor = await Donor.findOne({ email });
      if (existingDonor) {
        return res.status(400).json({ error: "Email already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const donor = new Donor({ name, email, phone, address, donorType, password: hashedPassword });
  
      await donor.save();
  
      res.status(201).json({ message: "Donor registered successfully", donor });
    } catch (error) {
      console.error("❌ Register Error:", error); // Log error
      res.status(500).json({ error: error.message });
    }
  };

  const loginDonor = async (req, res) => {
    try {
        console.log("📥 Login Request Body:", req.body);
        
        const { email, password } = req.body;
        
        // Check if donor exists
        const donor = await Donor.findOne({ email });
        if (!donor) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Compare entered password with hashed password in DB
        const isMatch = await bcrypt.compare(password, donor.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: donor._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ message: "Login successful", token, donor });
    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ error: error.message });
    }
};

const getDonors = async (req, res) => {
    try {
        const donors = await Donor.find().select("-password"); // Exclude passwords
        res.status(200).json(donors);
    } catch (error) {
        console.error("❌ Get Donors Error:", error);
        res.status(500).json({ error: error.message });
    }
};
  

module.exports={registerDonor,loginDonor,getDonors}