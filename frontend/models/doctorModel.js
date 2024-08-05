const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model if needed
    required: true,
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  website: {
    type: String,
  },
  address: {
    type: String,
  },
  specialization: {
    type: String,
    required: [true, "Specialization is required"],
  },
  experience: {
    type: Number,
    required: [true, "Experience is required"],
  },
  feesPerConsultation: {
    type: Number,
    required: [true, "Fees per consultation is required"],
  },
  timings: {
    type: String,
    required: [true, "Timings are required"],
  },
});

const Doctor = mongoose.model("Doctors", doctorSchema);

module.exports = Doctor;
