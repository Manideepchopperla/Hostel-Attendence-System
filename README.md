Project Title:
Hostel Attendance System

GitHub Link : [https://github.com/Manideepchopperla/Hostel-Attendence-System](https://github.com/Manideepchopperla/Hostel-Attendence-System)

Objective:
To design and implement a full-stack hostel attendance monitoring system using the MERN stack, enabling secure student check-ins/check-outs, real-time attendance tracking, automated alerts for hostel administration(caretakers) Regarding Absentees.

Technology Stack:
Frontend: React.js, Tailwind CSS, React Toastify, React-chart.js-2

Backend: Node.js, Express.js, cors, JWT, Bcrypt.js

Database: MongoDB

Utilities: Nodemailer (email alerts), Node Cron(Scheduling task for automated email sending), QR code (for generating QR Code), json2csv(for exporting the attendance list in to CSV).

PATHS/Routes :
    1. Student : 
        HomePage - / 
        LoginPage - /login
        RegistrationPage - /register
        DashBoard - /dashboard
        Attendance History - /history
        Attendance QR Scanner - /qr-scan
    2. Admin : 
        LoginPage - /admin/
        RegistrationPage - /admin/register
        Dashboard - /admin/dashboard

Core Modules & Features:
1. Student Module
Registration & Login:
Secure signup/login functionality with hashed passwords using JWT and bcrypt. Only verified users can access the dashboard.

Attendance Logging:
Students scan a daily dynamic QR code (unique for every day) displayed at the hostel entrance to mark check-in and checkout timestamps.

History Dashboard:
Students can view personal attendance logs with timestamps like at what time they check-in and check-out.

2. Admin/Caretaker Module
Admin Dashboard:
Accessible only by caretakers.

Auto Generate a Live QR Code For Attendance EveryDay. 

Real-time student check-in/check-out status.

Graphical summaries (daily trends regarding no of Check in's).

Filters & Search:
Powerful filters to locate records by:

Student name 

Date range

Room number

Alerts & Notifications:

Automated email alerts via Nodemailer and Node-Cron are sent when students misses his check-in on the Day, the list of students names are send to the Caretaker Via Email at 8:00 PM to inform the Absentees Names to the Caretaker.


Data Export:
Attendance records can be exported in CSV format for further processing or reporting.

3. QR Code Attendance System
QR codes are generated daily and expires at 23:59 Hrs / 11:59 PM.

Students scan it using their mobile device in his Dashboard, triggering an authenticated API call to log attendance.

4. Analytics & Visualization
Integrated React Chart.js 2 for Daily attendance patterns.

5. Mobile-Responsive UI 
Tailwind CSS used to ensure consistent experience across devices

Fully responsive dashboards for both students and admins

Toast notifications enhance real-time feedback for all actions

Security Measures:
JWT-based authentication with token expiration

Role-based access control (student vs. admin)

API protection with token validation middleware

Contact :
    For any inquiries, please reach out to:

    Name: Manideep Chopperla
    Email: manideepchopperla1808@gmail.com
    GitHub: Manideepchopperla
