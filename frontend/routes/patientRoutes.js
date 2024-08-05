const express = require('express');
const router = express.Router();
const { getPatientProfile, updatePatientProfile } = require('../controllers/patientController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/:id', authMiddleware, getPatientProfile);
router.put('/:id', authMiddleware, updatePatientProfile);

module.exports = router;
