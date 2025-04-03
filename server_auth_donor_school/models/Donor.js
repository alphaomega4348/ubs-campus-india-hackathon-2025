const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password:{type:String,required:true},
  phone: { type: String, required: true },
  address: { type: String, required: true },
  donorType: { type: String, enum: ['individual', 'institution', 'publisher'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Donor', donorSchema);