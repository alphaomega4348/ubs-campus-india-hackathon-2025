const Donor = require('../models/Donor');

exports.registerDonor = async (req, res) => {
  try {
    const { name, email, phone, address, donorType } = req.body;
    const donor = new Donor({ name, email, phone, address, donorType });
    await donor.save();
    res.status(201).json({ message: 'Donor registered successfully', donor });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};