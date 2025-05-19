const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth');
const attendanceRoutes = require('./routes/attendance');
const adminRoutes = require('./routes/admin');
const qrRoutes = require('./routes/qr');
const emailJob = require('./utils/emailJob');
const exportRoutes = require('./routes/export');
const cors = require('cors')
const path = require("path");
const { fileURLToPath } = require('url');

const app = express()
dotenv.config()

app.use(express.static(path.join(__dirname, "dist")));

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err))


app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/qr', qrRoutes);
app.use('/api/export', exportRoutes);

// Start daily absentee email job
emailJob()

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});


const PORT = process.env.PORT|| 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))