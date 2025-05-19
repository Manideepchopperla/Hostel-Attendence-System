const express = require('express');
const router = express.Router();
const { Parser } = require('json2csv');
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const {  adminOnly } = require('../middleware/authMiddleware');

router.get('/csv', adminOnly, async (req, res) => {
  try {
    const records = await Attendance.find().populate('user', 'name email roomNumber');
    const data = records.map(r => ({
      name: r.user.name,
      email: r.user.email,
      room: r.user.roomNumber,
      date: r.date.toDateString(),
      checkIn: r.checkIn ? r.checkIn.toTimeString() : 'N/A',
      checkOut: r.checkOut ? r.checkOut.toTimeString() : 'N/A'
    }));

    const parser = new Parser();
    const csv = parser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('attendance.csv');
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ message: 'Failed to export CSV', err });
  }
});

module.exports = router;