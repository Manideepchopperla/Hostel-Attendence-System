# 🏨 Hostel Attendance System

**GitHub Repository**: [Hostel Attendance System](https://github.com/Manideepchopperla/Hostel-Attendence-System)

## 🎯 Objective
Design and implement a full-stack hostel attendance monitoring system using the **MERN stack**, enabling:
- Secure student check-ins/check-outs
- Real-time attendance tracking
- Automated email alerts to caretakers for absentees

---

## ⚙️ Technology Stack

- **Frontend**: React.js, Tailwind CSS, React Toastify, React-chart.js-2  
- **Backend**: Node.js, Express.js, cors, JWT, Bcrypt.js  
- **Database**: MongoDB  
- **Utilities**:  
  - `nodemailer` – Email notifications  
  - `node-cron` – Scheduled email tasks  
  - `qrcode` – QR code generation  
  - `json2csv` – Exporting data to CSV  

---

## 🌐 Routes

### 👨‍🎓 Student
- `/` – Home Page  
- `/login` – Login  
- `/register` – Registration  
- `/dashboard` – Dashboard  
- `/history` – Attendance History  
- `/qr-scan` – QR Scanner  

### 👨‍💼 Admin (Caretaker)
- `/admin/` – Admin Login  
- `/admin/register` – Admin Registration  
- `/admin/dashboard` – Admin Dashboard  

---

## 🔑 Core Modules & Features

### 1. Student Module
- **Authentication**: Secure registration/login with JWT and bcrypt  
- **QR Attendance**: Scan daily-generated QR code for check-in/out  
- **Attendance Logs**: View personal attendance with timestamps  

### 2. Admin/Caretaker Module
- **Live QR Code**: Auto-generated daily QR codes (expires at 11:59 PM)  
- **Real-Time Monitoring**: Track check-in/out status  
- **Analytics Dashboard**: Charts showing attendance trends  
- **Filtering Options**: Search by name, room number, date range  
- **Email Alerts**:  
  - Automated at 8:00 PM  
  - Sends absentee list to caretaker via Nodemailer + Node Cron  
- **Data Export**: Download attendance data in CSV  

### 3. QR Attendance System
- Unique QR per day, expiring daily at 11:59 PM  
- Scanning triggers authenticated API call  

### 4. Analytics & Visualization
- Visualize daily attendance trends with React Chart.js 2  

### 5. Mobile-Responsive UI
- Built with Tailwind CSS  
- Responsive for both students and admins  
- Real-time feedback via toast notifications  

---

## 🔐 Security Measures

- JWT-based authentication with token expiration  
- Role-based access control (Student/Admin)  
- Protected APIs via middleware validation  

---

## 🚀 Project Setup

### 1. Clone Repository
```bash
git clone https://github.com/Manideepchopperla/Hostel-Attendence-System
cd Hostel-Attendence-System
```
### 2. Install Dependencies
```bash
cd Frontend
npm install

cd ../Backend
npm install
``` 
### 3. Build & Serve
```bash
# Build Frontend
cd Frontend
npm run build

# Delete old dist in Backend if exists, then:
# Move new dist folder to Backend

# Serve Backend
cd ../Backend
node server.js
```

Student App: http://localhost:3000

Admin Login: http://localhost:3000/admin

## 🗄️ MongoDB Setup

### 1. Create a MongoDB Database
- Sign up or log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- Create a new project and then a new cluster.
- Choose a free tier if you're just testing.

### 2. Configure Database Access
- Go to the "Database Access" section.
- Create a new database user with read and write access.
- Note down the username and password.

### 3. Whitelist Your IP Address
- In the "Network Access" section, add your current IP address to allow connections.

### 4. Get Your Connection String
- In the "Clusters" section, click on "Connect" and then "Connect your application".
- Copy the connection string provided.

### 5. Update Your Environment Variables
- Create a `.env` file in the root of the `Server` directory:
    ```bash
    MONGODB_URI=your_mongodb_connection_string
    PORT=3000
    JWT_SECRET=your_jwt_secret
    ALERT_EMAIL=your_email
    ALERT_PASSWORD=your_email_password
    ```
- Replace `your_mongo_connection_string` with the connection string you copied earlier, ensuring to replace `<username>` and `<password>` with your actual MongoDB username and password.

**Note:** Do not commit this file to the repository..

## Contact

For any inquiries, please reach out to:

- **Name:** Manideep Chopperla
- **Email:** [manideepchopperla1808@gmail.com](mailto:manideepchopperla1808@gmail.com)
- **GitHub:** [Manideepchopperla](https://github.com/Manideepchopperla)
