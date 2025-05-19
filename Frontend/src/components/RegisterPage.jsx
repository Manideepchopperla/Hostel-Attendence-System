import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roomNumber: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const checkUser  = () => {
    if (localStorage.getItem('token')) {
      const role = localStorage.getItem('role');
      if (role === 'student') {
        navigate('/dashboard');
      }
    }
  }

  useEffect(() => {
    checkUser ();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(import.meta.env.VITE_BASE_URL + '/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('name', res.data.user.name);
      toast.success('Registration successful!', {autoClose: 800});

      setTimeout(() => {
      navigate('/dashboard');
    }, 800);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex items-center justify-center h-[85vh] ">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-center text-green-700">Student Registration</h2>
          <form onSubmit={handleRegister} className="mt-6">
            {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

            <div className="mb-4">
              <label className="block mb-1 text-sm font-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-semibold">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-1 text-sm font-semibold">Room Number</label>
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
            >
              Register
            </button>
            <p className="mt-4 text-sm text-center">
              Already have an account?{' '}
              <a href="/login" className="text-green-600 hover:underline">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
      <Footer /> 
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
