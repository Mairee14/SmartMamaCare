const express = require('express');
const router = express.Router();
const { bookAppointmentController } = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/api/v1/appointments/book', authMiddleware, bookAppointmentController);

module.exports = router;
