const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const deliveryPartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    location: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"]
    },
    type: {
        type: String,
        enum: ["NGO", "Local Volunteer"],
        required: true
    }
}, { timestamps: true });


const DeliveryPartner = mongoose.model('DeliveryPartner', deliveryPartnerSchema);

module.exports = DeliveryPartner;
