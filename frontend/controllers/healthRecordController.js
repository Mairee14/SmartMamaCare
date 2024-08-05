const userModel = require("../models/userModel");

const addHealthRecord = async (req, res) => {
  try {
    const { userId, date, weight, bloodPressure, fetalHeartRate, symptoms } = req.body;
    
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.healthRecords.push({ date, weight, bloodPressure, fetalHeartRate, symptoms });
    await user.save();

    res.status(200).json({ success: true, message: 'Health record added successfully' });
  } catch (error) {
    console.error('Error adding health record:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getHealthRecords = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user.healthRecords });
  } catch (error) {
    console.error('Error fetching health records:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  addHealthRecord,
  getHealthRecords,
};