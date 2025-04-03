const jwt = require('jsonwebtoken');
const Delivery = require('../models/DeliveryModel');
const { uploadToCloudinary, cloudinary } = require("../utils/cloudinary");
const sharp = require("sharp");

const jwtsecret = process.env.JWT_SECRET;

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const start_transaction = async (req, res) => {
    const { donation_id, delivery_person_id } = req.body;

    try { 
        if (!donation_id || !delivery_person_id) {
            return res.status(400).json({ message: "donation_id and delivery_person_id are required" });
        }

        const existingTransaction = await Delivery.findOne({ donation_id });

        if (existingTransaction) {
            return res.status(400).json({ message: "A delivery transaction for this book already exists" });
        }

        const tracking_id = jwt.sign({ donation_id, delivery_person_id, timestamp: Date.now() }, jwtsecret, { noTimestamp: true });
        const otp = generateOTP();

        const newTransaction = new Delivery({
            donation_id,
            delivery_person_id,
            tracking_id,
            otp,
            status: 'In Progress'
        });

        await newTransaction.save();

        return res.status(201).json({ message: "Delivery transaction started successfully", transaction: newTransaction });

    } catch (error) {
        console.error("Error in start_transaction:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const complete_transaction = async (req, res) => {
    try {
        const { otp, Id } = req.body;

        
        if (!otp || !Id) {
            return res.status(400).json({ message: "Missing required fields (OTP & Id)" });
        }

        const transaction = await Delivery.findById(Id);

        if (!transaction) {
            return res.status(404).json({ message: "No active transaction found." });
        }

        if (transaction.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Proof of delivery is required" });
        }

        // Optimize image before uploading
        const optimizedImageBuffer = await sharp(req.file.buffer)
            .resize({ width: 800, height: 800, fit: "inside" })
            .toFormat("jpeg", { quality: 80 })
            .toBuffer();

        // Convert image buffer to Base64 URI
        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString("base64")}`;

        // Upload to Cloudinary
        const cloudResponse = await uploadToCloudinary(fileUri);

        // Update transaction status
        transaction.status = "Delivered";
        transaction.image = cloudResponse.secure_url;
        await transaction.save();

        return res.status(200).json({ message: "Delivery marked as Delivered", transaction });

    } catch (error) {
        console.error("Error in complete_transaction:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { start_transaction, complete_transaction };
