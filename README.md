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

## Screenshots
 ### Home Page : 
<img src="https://github.com/user-attachments/assets/21c9e845-d6b4-4d54-85a8-4cd6d8822ed3" width="90%" >

### Student Login and signUp Page : 
<img src="https://github.com/user-attachments/assets/bddcdb68-ff4a-4af4-a054-60a94b7d3289" width="45%" >
<img src="https://github.com/user-attachments/assets/341c3c67-6677-4002-80ba-f9b637ff564a" width="45%" >

### Admin Login and signUp Page : 
<img src="https://github.com/user-attachments/assets/0eea7a52-5f75-4c2b-a78b-f4de8288ad63" width="45%" >
<img src="https://github.com/user-attachments/assets/d54ce547-00e2-4161-86bc-76d71fb2a69b" width="45%" >

### Student Dashboard : 
<img src="https://github.com/user-attachments/assets/a8d680b2-d835-4882-a10e-91bb9f27ab54" width="45%" >
<img src="https://github.com/user-attachments/assets/c3c1e994-bad7-4cb0-a624-09bbb91771f1" width="45%" >
<img src="https://github.com/user-attachments/assets/2dabbf21-47c1-4cf3-9079-f7faabdce189" width="45%" >

### Admin Dashboard : 
<img src="https://github.com/user-attachments/assets/2ad47bcc-07ed-4b39-b88a-9a48549846c1" width="45%" >
<img src="https://github.com/user-attachments/assets/2bda1253-f890-435f-8799-60f1b8af2957" width="45%" >
<img src="https://github.com/user-attachments/assets/e9d3092d-ea90-4478-b9d6-55692d07eced" width="45%" >





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
