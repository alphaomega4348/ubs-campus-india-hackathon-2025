const jwt = require("jsonwebtoken");
const Delivery = require("../models/DeliveryModel");
const { uploadToCloudinary } = require("../utils/cloudinary");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const hbs = require("hbs");
const sendEmail = require("../utils/email");

const jwtsecret = process.env.JWT_SECRET;

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const loadTemplate = (templateName, replacements) => {
    const templatePath = path.join(__dirname, "../emailTemplate", templateName);

    if (!fs.existsSync(templatePath)) {
        throw new Error("Email template not found");
    }

    const source = fs.readFileSync(templatePath, "utf-8");
    const template = hbs.compile(source);
    return template(replacements);
};

const start_transaction = async (req, res) => {
    const { donation_id, delivery_person_id, reciever_id, reciever_email, reciever_name } = req.body;

    try {
        if (!donation_id || !delivery_person_id || !reciever_id || !reciever_email) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const existingTransaction = await Delivery.findOne({ donation_id });

        if (existingTransaction) {
            return res.status(400).json({ message: "A delivery transaction already exists" });
        }

        const tracking_id = jwt.sign({ donation_id, delivery_person_id, timestamp: Date.now() }, jwtsecret, { noTimestamp: true });
        const otp = generateOTP();

        const newTransaction = new Delivery({
            donation_id,
            delivery_person_id,
            tracking_id,
            otp,
            status: "In Progress",
            reciever_id,
        });

        const htmlTemplate = loadTemplate("otpTemplate.hbs", {
            title: "OTP VERIFICATION",
            username: reciever_name,
            otp,
            message: "Share this after receiving the book",
        });

        console.log("📤 Preparing to send email to:", reciever_email);

        await sendEmail({
            email: reciever_email.trim(),
            subject: "Your OTP for Delivery Confirmation",
            html: htmlTemplate,
        });

        await newTransaction.save();

        return res.status(201).json({ message: "Delivery transaction started successfully", transaction: newTransaction });

    } catch (error) {
        console.error("❌ Error in start_transaction:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const complete_transaction = async (req, res) => {
    try {
        const { otp, Id } = req.body;

        if (!otp || !Id) {
            return res.status(400).json({ message: "Missing required fields" });
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

        const optimizedImageBuffer = await sharp(req.file.buffer)
            .resize({ width: 800, height: 800, fit: "inside" })
            .toFormat("jpeg", { quality: 80 })
            .toBuffer();

        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString("base64")}`;

        const cloudResponse = await uploadToCloudinary(fileUri);

        transaction.status = "Delivered";
        transaction.image = cloudResponse.secure_url;
        await transaction.save();

        return res.status(200).json({ message: "Delivery marked as Delivered", transaction });

    } catch (error) {
        console.error("❌ Error in complete_transaction:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const get_all_transactions = async (req, res) => {
    try {
        const transactions = await Delivery.find();

        if (transactions.length === 0) {
            return res.status(404).json({ message: "No transactions found" });
        }

        return res.status(200).json({ transactions });

    } catch (error) {
        console.error("❌ Error in get_all_transactions:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const get_transactions_by_delivery_person = async (req, res) => {
    try {
        const { delivery_person_id } = req.params;

        if (!delivery_person_id) {
            return res.status(400).json({ message: "delivery_person_id is required" });
        }

        const transactions = await Delivery.find({ delivery_person_id });

        if (transactions.length === 0) {
            return res.status(404).json({ message: "No transactions found for this delivery person" });
        }

        return res.status(200).json({ transactions });

    } catch (error) {
        console.error("❌ Error in get_transactions_by_delivery_person:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const get_transactions_by_donor = async (req, res) => {
    try {
        const { donation_id } = req.params;

        if (!donation_id) {
            return res.status(400).json({ message: "donation_id is required" });
        }

        const transactions = await Delivery.find({ donation_id });

        if (transactions.length === 0) {
            return res.status(404).json({ message: "No transactions found for this donor" });
        }

        return res.status(200).json({ transactions });

    } catch (error) {
        console.error("❌ Error in get_transactions_by_donor:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { start_transaction, complete_transaction, get_all_transactions, get_transactions_by_delivery_person, get_transactions_by_donor };
