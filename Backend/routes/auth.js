const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password, roomNumber } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password, roomNumber });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/admin/register', async (req, res) => {
  const { name, email, password} = req.body;
  try {
    const userExists = await Admin.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await Admin.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;

