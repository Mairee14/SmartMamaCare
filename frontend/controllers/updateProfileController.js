const updateProfileController = async (req, res) => {
    try {
      const { userId, name, email, phone, address, dueDate, weeksPregnant } = req.body;
      
      // Perform validation on the received data if needed
      
      // Update the user's profile in the database
      const updatedUser = await User.findByIdAndUpdate(
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
  
  module.exports = {
    loginController,
    registerController,
    authController,
    updateProfileController, // Add this line
  };