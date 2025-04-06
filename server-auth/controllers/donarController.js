const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Donor = require("../models/donarModel");

// ✅ Register Donor
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

    const hashedPassword = await bcrypt.hash(password, 10);
    const donor = new Donor({ name, email, phone, address, donorType, password: hashedPassword });

    await donor.save();

    res.status(201).json({ message: "Donor registered successfully", donor });
  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Login Donor & Set JWT Cookie
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

    // ✅ Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // use true if you're on HTTPS
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      donor: {
        name: donor.name,
        email: donor.email,
        donorType: donor.donorType,
        phone: donor.phone,
        address: donor.address,
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Middleware to verify token from cookie
const verifyDonor = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized: No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.donorId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// ✅ Route to get current logged-in donor
const getLoggedInDonor = async (req, res) => {
  try {
    const donor = await Donor.findById(req.donorId).select("-password");
    if (!donor) {
      return res.status(404).json({ error: "Donor not found" });
    }
    res.json(donor);
  } catch (error) {
    console.error("❌ Get Logged-In Donor Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Donors (Admin)
const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find().select("-password");
    res.status(200).json(donors);
  } catch (error) {
    console.error("❌ Get Donors Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerDonor,
  loginDonor,
  getDonors,
  getLoggedInDonor,
  verifyDonor,
};
