const express = require('express');
const multer = require('multer');
const path = require('path');
const userModel = require('../models/userModel');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const updateProfileController = async (req, res) => {
  try {
    const { userId, name, email, phone, address, dueDate, weeksPregnant } = req.body;

    const updateData = {
      name,
      email,
      phone,
      address,
      dueDate,
      weeksPregnant,
    };

    if (req.file) {
      updateData.picture = req.file.filename;
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

router.post('/updateProfile', authMiddleware, upload.single('picture'), updateProfileController);

module.exports = router;