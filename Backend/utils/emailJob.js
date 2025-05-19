const cron = require('node-cron');
const nodemailer = require('nodemailer');
const Attendance = require('../models/Attendance');
const User = require('../models/User');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ALERT_EMAIL,
    pass: process.env.ALERT_PASSWORD,
  },
});

module.exports = function startEmailJob() {
  // Runs every day at 8:00 PM
  cron.schedule('0 20 * * *', async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const allStudents = await User.find({ role: 'student' });
    const marked = await Attendance.find({ date: today });
    const markedIds = marked.map((a) => a.user.toString());

    const absentees = allStudents.filter((student) => !markedIds.includes(student._id.toString()));

    if (absentees.length === 0) return;

    const emails = 'caretaker@example.com';
    const message = `Absent Students for ${today.toDateString()}\n\n` +
      absentees.map((s) => `${s.name} (${s.email}) - Room ${s.roomNumber}`).join('\n');

    await transporter.sendMail({
      from: process.env.ALERT_EMAIL,
      to: emails,
      subject: 'Hostel Absentees Notification',
      text: message,
    });

    console.log('Absentee email sent');
  });
};