import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleScan = () => {
    navigate('/qr-scan');
  };

  const handleHistory = () => {
    navigate('/history');
  };

  const user = localStorage.getItem('name');
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Welcome to Hostel Dashboard
        </h1>
        <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
            Mark Your Attendance,<span className='font-bold text-red-600 text-2xl'> {user}</span>!
          </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            onClick={handleScan}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Mark Attendance (QR)
          </button>
          <button
            onClick={handleHistory}
            className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            View Attendance History
          </button>
        </div>

      </div>
    </div>
    </div>
  );
};

export default Dashboard;
