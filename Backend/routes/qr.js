const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const jwt = require('jsonwebtoken');
const {protect, adminOnly } = require('../middleware/authMiddleware');
const Attendance = require('../models/Attendance');
const QRCodeModel = require('../models/QRCodeModel');

// Generate QR Code (valid for 10 mins)
router.get('/generate', adminOnly, async (req, res) => {
  try {
    const currentDate = new Date();
    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);

    // Check if a QR code already exists for today
    let qrCodeEntry = await QRCodeModel.findOne({ date: { $gte: startOfDay, $lte: endOfDay } });


    if (!qrCodeEntry) {
      // Generate a new QR code
      const payload = { timestamp: Date.now() };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
      const qr = await QRCode.toDataURL(token);

      // Save the new QR code to the database
      qrCodeEntry = new QRCodeModel({ qr, date: currentDate });
      await qrCodeEntry.save();
    }

    res.status(200).json({ qr: qrCodeEntry.qr });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Scan QR Code and mark attendance
router.post('/mark', protect, async (req, res) => {
  try {
    const { qrData } = req.body;
    const decoded = jwt.verify(qrData, process.env.JWT_SECRET);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let attendance = await Attendance.findOne({ user: req.user._id, date: today });
    if (!attendance) {
      attendance = new Attendance({ user: req.user._id, date: today, checkIn: new Date() });
    } else {
      if (!attendance.checkIn) attendance.checkIn = new Date();
      else if (!attendance.checkOut) attendance.checkOut = new Date();
      else return res.status(400).json({ message: 'Already checked in and out today' });
    }

    await attendance.save();
    await attendance.populate('user', 'name email roomNumber role');
    
    res.status(200).json({ message: 'Attendance marked', attendance });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired QR code' });
  }
});

module.exports = router;