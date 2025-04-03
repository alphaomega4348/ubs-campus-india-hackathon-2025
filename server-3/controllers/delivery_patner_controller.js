const DeliveryPartner = require('../models/delivery_patner');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const dotenvcong=require('dotenv')
dotenvcong.config()
const signup_partner = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, location, mobile, availability, type } = req.body;

        if (!name || !email || !password || !confirmPassword || !location || !mobile || !type) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(mobile)) {
            return res.status(400).json({ message: "Invalid mobile number. It must be a 10-digit number." });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }

        const validTypes = ["NGO", "Local Volunteer"];
        if (!validTypes.includes(type)) {
            return res.status(400).json({ message: "Invalid type. Must be 'NGO' or 'Local Volunteer'." });
        }

        const existingPartner = await DeliveryPartner.findOne({ $or: [{ email }, { mobile }] });
        if (existingPartner) {
            return res.status(400).json({ message: "Email or mobile number already in use." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newPartner = new DeliveryPartner({
            name,
            email,
            password: hashedPassword,
            location,
            mobile,
            type,
            availability: availability !== undefined ? availability : true
        });

        await newPartner.save();

        // 🔐 Generate JWT Token
        const token = jwt.sign(
            { id: newPartner._id, email: newPartner.email, type: newPartner.type },
            process.env.JWT_SECRET,
            { expiresIn: "7d" } 
        );

        return res.status(201).json({
            message: "Signup successful",
            token, // Sending the token
            partner: {
                _id: newPartner._id,
                name: newPartner.name,
                email: newPartner.email,
                location: newPartner.location,
                mobile: newPartner.mobile,
                type: newPartner.type,
                availability: newPartner.availability,
                createdAt: newPartner.createdAt
            }
        });

    } catch (error) {
        console.error("Error signing up delivery partner:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const login_partner = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🔍 Check if both email & password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // 🔍 Validate email format
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        // 🔍 Find user by email
        const partner = await DeliveryPartner.findOne({ email });
        if (!partner) {
            return res.status(404).json({ message: "User not found. Please sign up." });
        }

        // 🔑 Compare passwords
        const isMatch = await bcrypt.compare(password, partner.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password." });
        }

        // 🔐 Generate JWT Token
        const token = jwt.sign(
            { id: partner._id, email: partner.email, type: partner.type },
            process.env.JWT_SECRET,
            { expiresIn: "7d" } // Token valid for 7 days
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            partner: {
                _id: partner._id,
                name: partner.name,
                email: partner.email,
                location: partner.location,
                mobile: partner.mobile,
                type: partner.type,
                availability: partner.availability,
                createdAt: partner.createdAt
            }
        });

    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const update_availability = async (req, res) => {
    try {
        const { mobile, availability } = req.body;

        if (!mobile || availability === undefined) {
            return res.status(400).json({ message: "Mobile number and availability status are required." });
        }

        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(mobile)) {
            return res.status(400).json({ message: "Invalid mobile number. It must be a 10-digit number." });
        }

        const partner = await DeliveryPartner.findOne({ mobile });
        if (!partner) {
            return res.status(404).json({ message: "Delivery partner not found." });
        }

        partner.availability = availability;
        await partner.save();

        return res.status(200).json({ message: "Availability updated successfully", partner });

    } catch (error) {
        console.error("Error updating availability:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};




const getallpartners = async (req, res) => {
    try {
        const partners = await DeliveryPartner.find({}, '-password'); 

        if (partners.length === 0) {
            return res.status(404).json({ message: "No delivery partners found." });
        }

        return res.status(200).json({ message: "Delivery partners retrieved successfully", partners });

    } catch (error) {
        console.error("Error fetching delivery partners:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const get_partner_details = async (req, res) => {
    try {
        const { id, email } = req.query;

        if (!id && !email) {
            return res.status(400).json({ message: "Provide either ID or email to fetch details." });
        }

        let partner;
        if (id) {
            partner = await DeliveryPartner.findById(id, '-password'); 
        } else {
            partner = await DeliveryPartner.findOne({ email }, '-password');
        }

        if (!partner) {
            return res.status(404).json({ message: "Delivery partner not found." });
        }

        return res.status(200).json({ message: "Partner details retrieved successfully", partner });

    } catch (error) {
        console.error("Error fetching partner details:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const edit_partner_details = async (req, res) => {
    try {
        const { id } = req.params; // Partner ID from URL params
        const { name, email, location, mobile, type, availability } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Partner ID is required." });
        }

        let partner = await DeliveryPartner.findById(id);
        if (!partner) {
            return res.status(404).json({ message: "Delivery partner not found." });
        }

        // 📝 Validate new email if provided
        if (email) {
            const emailRegex = /^\S+@\S+\.\S+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: "Invalid email format." });
            }

            const emailExists = await DeliveryPartner.findOne({ email, _id: { $ne: id } });
            if (emailExists) {
                return res.status(400).json({ message: "Email is already in use." });
            }
        }

        // 📞 Validate new mobile number if provided
        if (mobile) {
            const mobileRegex = /^\d{10}$/;
            if (!mobileRegex.test(mobile)) {
                return res.status(400).json({ message: "Invalid mobile number. It must be a 10-digit number." });
            }

            const mobileExists = await DeliveryPartner.findOne({ mobile, _id: { $ne: id } });
            if (mobileExists) {
                return res.status(400).json({ message: "Mobile number is already in use." });
            }
        }

        // ✅ Update only the fields provided
        partner.name = name || partner.name;
        partner.email = email || partner.email;
        partner.location = location || partner.location;
        partner.mobile = mobile || partner.mobile;
        partner.type = type || partner.type;
        partner.availability = availability !== undefined ? availability : partner.availability;

        await partner.save();

        return res.status(200).json({
            message: "Partner details updated successfully",
            partner
        });

    } catch (error) {
        console.error("Error updating partner details:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = {signup_partner,update_availability,getallpartners,get_partner_details,edit_partner_details,login_partner};
