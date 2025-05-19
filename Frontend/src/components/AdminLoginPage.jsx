import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from '../AdminHeader';
import Footer from './Footer';
import { toast, ToastContainer } from 'react-toastify';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const checkUser=()=>{
    if(localStorage.getItem('token')){
        const role = localStorage.getItem('role');
        console.log(role);
        if (role === 'admin') {
            navigate('/admin/dashboard');
        }
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(import.meta.env.VITE_BASE_URL +'/auth/admin/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success('Login successful!', {autoClose: 800});
      setTimeout(() => {
      navigate('/admin/dashboard');
    }, 800);
      
      
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AdminHeader />
    <div className="flex items-center justify-center h-[80vh] ">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-blue-700">Admin Login</h2>
        <form onSubmit={handleLogin} className="mt-6">
          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-sm font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
          <p className="mt-4 text-sm text-center">
            Don't have an account?{' '}
            <a href="/admin/register" className="text-blue-600 hover:underline">
              Register here
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

export default AdminLoginPage;
