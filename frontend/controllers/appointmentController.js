const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModel");

const bookAppointmentController = async (req, res) => {
  try {
    const { userId, doctorId, date, time, notes } = req.body;

    console.log("Request Body:", req.body); // Log the incoming request data

    // Validate input data
    if (!userId || !doctorId || !date || !time) {
      console.error("Validation Error: Missing required fields");
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Create a new appointment
    const newAppointment = new appointmentModel({
      userId,
      doctorId,
      date,
      time,
      notes,
    });

    await newAppointment.save();
    console.log("New Appointment Created:", newAppointment);

    // Find the admin user
    const adminUser = await userModel.findOne({ isAdmin: true });
    if (adminUser) {
      const notifications = adminUser.notifications || [];
      notifications.push({
        type: "appointment-booking",
        message: `A new appointment has been booked by user ID: ${userId}`,
        data: {
          appointmentId: newAppointment._id,
          userId,
          doctorId,
          date,
          time,
        }
      });

      await userModel.findByIdAndUpdate(adminUser._id, { notifications });
      console.log("Admin User Updated with Notification:", adminUser);
    }

    res.status(201).send({
      success: true,
      message: "Appointment booked successfully",
      data: newAppointment
    });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error });
  }
};

module.exports = {
  bookAppointmentController,
};
