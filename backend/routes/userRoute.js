const express = require('express');
const User = require('../models/userModel');
const router = express.Router();

const loginUser = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Server Error:', error); // Detailed error logging
    res.status(500).json({ error: 'Server error' });
  }
};

router.post('/login/check', loginUser);

module.exports = router;
