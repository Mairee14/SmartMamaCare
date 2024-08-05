const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");

// register callback
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Registered Successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const { userId, name, email, phone, address, dueDate, weeksPregnant } = req.body;

    // Perform validation on the received data if needed

    // Update the user's profile in the database
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name, email, phone, address, dueDate, weeksPregnant },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const applyDoctorController = async (req, res) => {
  try {
    const { userId, firstName, lastName, email, phone, website, address, specialization, experience, feesPerConsultation, timings } = req.body;

    // Perform validation on the received data if needed
    if (!userId || !firstName || !lastName || !email || !phone || !specialization || !experience || !feesPerConsultation || !timings) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Create a new doctor profile
    const newDoctor = new doctorModel({
      userId,
      firstName,
      lastName,
      email,
      phone,
      website,
      address,
      specialization,
      experience,
      feesPerConsultation,
      timings,
      status: "pending" // Adding a status field to track the application status
    });

    await newDoctor.save();

    // Find the admin user
    const adminUser = await userModel.findOne({ isAdmin: true });
    if (adminUser) {
      const notifications = adminUser.notifications || [];
      notifications.push({
        type: "apply-doctor-request",
        message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a Doctor Account`,
        data: {
          doctorId: newDoctor._id,
          name: `${newDoctor.firstName} ${newDoctor.lastName}`,
          onclickPath: "/admin/doctors"
        }
      });

      await userModel.findByIdAndUpdate(adminUser._id, { notifications });
    }

    res.status(201).send({
      success: true,
      message: "Doctor Account applied successfully",
      data: newDoctor
    });
  } catch (error) {
    console.error('Error applying doctor:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error });
  }
};

// notifications controller
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    const seenNotifications = user.seenNotifications || [];
    seenNotifications.push(...user.notifications);
    user.notifications = [];
    user.seenNotifications = seenNotifications;
    
    const updatedUser = await user.save();
    
    res.status(200).send({
      success: true,
      message: "All notifications marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error });
  }
};

// delete notification
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Clear notifications and seen notifications
    user.notifications = [];
    user.seenNotifications = [];
    
    const updatedUser = await user.save();
    updatedUser.password = undefined;

    res.status(200).send({
      success: true,
      message: "Notifications deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({
      success: false,
      message: "Unable to delete all notifications",
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  updateProfileController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
};
