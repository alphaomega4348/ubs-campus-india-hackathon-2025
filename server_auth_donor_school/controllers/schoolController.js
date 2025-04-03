const School = require('../models/School');

// Controller to register a school
exports.registerSchool = async (req, res) => {
  try {
    const { name, address, email } = req.body;
    const school = new School({ name, address, email });
    await school.save();
    res.status(201).json({ message: 'School registered successfully', school });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to get all schools
exports.getSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};