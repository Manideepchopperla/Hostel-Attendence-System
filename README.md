Project Title:
Hostel Attendance System

GitHub Link : https://github.com/Manideepchopperla/InHouse_Intern

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



Project Setup
    1. Clone the Repository
        git clone https://github.com/Manideepchopperla/InHouse_Intern
        cd InHouse_Intern

    Install dependencies:
        cd Frontend
        npm install

        cd ../Backend
        npm install

    Start the development server:

        Build the frontend :
            cd Frontend
            npm run build
            (if there is a dist folder in the Backend Folder, then delete the dist folder).
            Move this generated dist folder in Frontend to Backend folder

        Serve the Backend :
            cd ../Backend
            node server.js

    Open your browser and navigate to http://localhost:3000 to view the app.
    For Admin Login Page navigate to http://localhost:3000/admin.

MongoDB Setup
    1. Create a MongoDB Database :
        Sign up or log in to MongoDB Atlas.
        Create a new project and then a new cluster.
        Choose a free tier if you're just testing.

    2. Configure Database Access :
        Go to the "Database Access" section.
        Create a new database user with read and write access.
        Note down the username and password.

    3. Whitelist Your IP Address :
        In the "Network Access" section, add your current IP address to allow connections.

    4. Get Your Connection String :
        In the "Clusters" section, click on "Connect" and then "Connect your application".
        Copy the connection string provided.

    5. Update Your Environment Variables :
        Create a .env file in the root of the Backend directory:
            MONGODB_URI=your_mongodb_connection_string
            PORT=3000
            JWT_SECRET=your_jwt_secret
            ALERT_EMAIL = Email Id from which you want to send the list of absentees to the caretaker
            ALERT_PASSWORD = ALERT_EMAIL_PASSWORD

            Replace your_mongo_connection_string with the connection string you copied earlier, ensuring to replace <username> and <password> with your actual MongoDB username and password.

Contact :
    For any inquiries, please reach out to:

    Name: Manideep Chopperla
    Email: manideepchopperla1808@gmail.com
    GitHub: Manideepchopperla