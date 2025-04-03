const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const School = require("../models/schoolModel");

// 📌 Register a School
const registerSchool = async (req, res) => {
    try {
        const { name, address, email, area, totalStudents, password } = req.body;

        // Check if the school already exists
        const existingSchool = await School.findOne({ email });
        if (existingSchool) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const school = new School({ 
            name, 
            address, 
            email, 
            area, 
            totalStudents, 
            totalBooks: 0, // Default to 0 books
            password: hashedPassword 
        });

        await school.save();

        res.status(201).json({ message: "School registered successfully", school });
    } catch (error) {
        console.error("❌ Register School Error:", error);
        res.status(500).json({ error: error.message });
    }
};

const loginSchool = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log("📥 Login Request:", req.body); // Debugging log

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find school by email
        const school = await School.findOne({ email });

        if (!school) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        console.log("🔑 Hashed Password in DB:", school.password);

        // Ensure password exists in database
        if (!school.password) {
            return res.status(500).json({ error: "Password not stored correctly" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, school.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: school._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ message: "Login successful", token, school });
    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// 📌 Get All Schools
const getAllSchools = async (req, res) => {
    try {
        const schools = await School.find().select("-password"); // Exclude passwords
        res.status(200).json({ success: true, schools });
    } catch (error) {
        console.error("❌ Get Schools Error:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerSchool, loginSchool, getAllSchools };
