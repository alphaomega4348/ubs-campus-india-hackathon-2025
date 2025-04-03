const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  donation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookDonations',
    required: true
  },
  delivery_person_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeliveryPersons',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Delivered'],
    default: 'Pending'
  },
  tracking_id: {
    type: String,
    unique: true,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  proof_of_delivery: {
    type: String
  },
  image:{
    type:String,
  }
}, { timestamps: true });

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
