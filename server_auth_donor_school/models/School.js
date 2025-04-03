const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  area: {
    type: String,
    enum: ['Urban', 'Rural', 'Metropolitan'],
    required: true
  },
  totalStudents: { type: Number, required: true },
  totalBooks: { type: Number, required: true }
}, { timestamps: true });
module.exports = mongoose.model('School', schoolSchema);