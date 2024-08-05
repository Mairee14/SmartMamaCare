const express = require("express");
const {
  loginController,
  registerController,
  authController,
  updateProfileController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController
} = require("../controllers/userController");
const { addHealthRecord, getHealthRecords } = require("../controllers/healthRecordController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Auth routes
router.post("/login", loginController);
router.post("/register", registerController);
router.post('/getUserData', authMiddleware, authController);

// Profile routes
router.post('/updateProfile', authMiddleware, updateProfileController);
router.post('/apply-doctor', authMiddleware, applyDoctorController);

// Notification routes
router.post('/get-all-notification', authMiddleware, getAllNotificationController);
router.post('/delete-all-notifications', authMiddleware, deleteAllNotificationController);

// Health record routes
router.post('/health-record', authMiddleware, addHealthRecord);
router.get('/health-records/:userId', authMiddleware, getHealthRecords);

module.exports = router;