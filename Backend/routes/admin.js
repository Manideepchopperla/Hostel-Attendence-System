const express = require('express');
const router = express.Router();
const {  adminOnly } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Attendance = require("../models/Attendance")
const mongoose = require('mongoose');

// Get filtered attendance records for admin dashboard
router.get('/attendance', adminOnly, async (req, res) => {
  try {
    const { student = '', room = '', date } = req.query;

    // Build user filter first
    const userFilter = { role: 'student' };

    if (student?.trim()) {
      userFilter.$or = [
        { name: new RegExp(student.trim(), 'i') },
        { _id: mongoose.Types.ObjectId.isValid(student.trim()) ? mongoose.Types.ObjectId(student.trim()) : null }
      ];
    }

    if (room) {
      userFilter.roomNumber = new RegExp(room, 'i');
    }

    // Find matching students
    const matchedUsers = await User.find(userFilter).select('_id name roomNumber');

    const userIds = matchedUsers.map(u => u._id);

    // Build attendance filter
    const attendanceFilter = { user: { $in: userIds } };

    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      attendanceFilter.date = { $gte: start, $lte: end };
    }

    // Fetch attendance and populate user details
    const attendanceRecords = await Attendance.find(attendanceFilter)
      .populate('user', 'name roomNumber') 
      .sort({ date: -1 });

    // Format response for frontend
    const response = attendanceRecords.map(record => ({
      _id: record._id,
      date: record.date,
      checkIn: record.checkIn,
      checkOut: record.checkOut,
      student: {
        _id: record.user._id,
        name: record.user.name,
        room: record.user.roomNumber,
      },
    }));

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch attendance records' });
  }
});

module.exports = router;
