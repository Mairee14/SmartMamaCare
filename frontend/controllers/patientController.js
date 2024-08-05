const Patient = require("../models/patientModel");

const getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.params.id });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOneAndUpdate(
      { userId: req.params.id },
      req.body,
      { new: true }
    );
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getPatientProfile, updatePatientProfile };
