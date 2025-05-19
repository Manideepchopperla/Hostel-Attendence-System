import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate();
  
  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    // Remove the token and role from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');

    toast.success('Logout Successful!', {autoClose: 800});
    
          setTimeout(() => {
          navigate('/');
        }, 800);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/')}>
          Hostel Attendance System
        </h1>
        <nav>
          <ul className="flex space-x-4">
            {!isLoggedIn ? (
              <>
                <li className="hidden md:flex space-x-4">
                  <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-lg shadow-md text-sm font-semibold"
                  >
                    Login
                  </button>
                </li>
                <li className="hidden md:flex space-x-4">
                  <button
                    className="px-6 py-3 text-black bg-white border border-gray-300 hover:border-none hover:bg-green-600 hover:text-white transition-colors duration-200 rounded-lg text-sm font-semibold"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 rounded-lg shadow-md text-sm font-semibold"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <ToastContainer />
    </header>
  );
};

export default Header;
