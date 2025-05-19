import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import QRScanner from './components/QRScanner';
import AttendanceHistory from './components/AttendanceHistory';
// import AdminStudents from './components/AdminStudents';
// import AdminSummary from './components/AdminSummary';
import RegisterPage from './components/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLoginPage from './components/AdminLoginPage';
import AdminRegisterPage from './components/AdminRegisterPage';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/admin/" element={<AdminLoginPage />} />
          <Route exact path="/admin/register" element={<AdminRegisterPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/qr-scan" element={<ProtectedRoute><QRScanner /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><AttendanceHistory /></ProtectedRoute>} />

        </Routes>
      </Router>
      
    </>
  );
}

export default App;