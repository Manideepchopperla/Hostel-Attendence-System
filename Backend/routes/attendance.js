const express = require('express');
const Attendance = require('../models/Attendance');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/history', protect, async (req, res) => {
  try {
    const history = await Attendance.find({ user: req.user._id }).sort({ date: -1 });
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;






// router.post('/check-in', protect, async (req, res) => {
//   try {
//     const today = new Date().setHours(0, 0, 0, 0);
//     const existing = await Attendance.findOne({ user: req.user._id, date: today });

//     if (existing && existing.checkIn) {
//       return res.status(400).json({ message: 'Already checked in' });
//     }

//     const attendance = existing || new Attendance({ user: req.user._id, date: today });
//     attendance.checkIn = new Date();
//     await attendance.save();

//     res.status(200).json(attendance);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.post('/check-out', protect, async (req, res) => {
//   try {
//     const today = new Date().setHours(0, 0, 0, 0);
//     const attendance = await Attendance.findOne({ user: req.user._id, date: today });

//     if (!attendance || !attendance.checkIn) {
//       return res.status(400).json({ message: 'Check-in first' });
//     }
//     if (attendance.checkOut) {
//       return res.status(400).json({ message: 'Already checked out' });
//     }

//     attendance.checkOut = new Date();
//     await attendance.save();

//     res.status(200).json(attendance);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
