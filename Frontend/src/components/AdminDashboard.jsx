import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);
import AdminQRDisplay from "./AdminQRDisplay"
import Footer from './Footer';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [filters, setFilters] = useState({ student: '', room: '', date: '' });
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(import.meta.env.VITE_BASE_URL + '/admin/attendance', {
        headers: { Authorization: `Bearer ${token}` },
        params: filters
      });
      console.log(res.data);
      setAttendance(res.data);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [filters]);

  const handleCSVExport = () => {
    const csvContent = [
      ['Student', 'Room', 'Date', 'Check-in', 'Check-out'],
      ...attendance.map(a => [a.student.name, a.student.roomNumber, new Date(a.date).toLocaleDateString(), a.checkIn || '-', a.checkOut || '-'])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'attendance.csv');
  };

  const dailyCount = attendance.reduce((acc, a) => {
    const day = new Date(a.date).toLocaleDateString();
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  const checkInCount = attendance.filter(a => a.checkIn).length;
  const checkOutCount = attendance.filter(a => a.checkOut).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('name');
            toast.success('Logout successful!', {autoClose: 800});
            setTimeout(() => {
              navigate('/admin');
            }, 800);
          }}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-200"
        >
          Logout
        </button>
      </div>

      <AdminQRDisplay />

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Filter Attendance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            placeholder="Student Name"
            className="border p-2 rounded-md w-full"
            onChange={e => setFilters(f => ({ ...f, student: e.target.value }))}
          />
          <input
            placeholder="Room Number"
            className="border p-2 rounded-md w-full"
            onChange={e => setFilters(f => ({ ...f, room: e.target.value }))}
          />
          <input
            type="date"
            className="border p-2 rounded-md w-full"
            onChange={e => setFilters(f => ({ ...f, date: e.target.value }))}
          />
        </div>
      </div>


      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-2">Attendance Records</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded mb-2" onClick={handleCSVExport}>Export CSV</button>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Room</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Check-In</th>
                <th className="p-2 border">Check-Out</th>
              </tr>
            </thead>
            {attendance.length === 0 && !loading ? (
              <tbody>
                <tr>
                  <td colSpan="5" className="text-center p-4">No records found</td>
                </tr>
              </tbody>
            ) : null}
            <tbody>
              {loading ? <tr><td colSpan="5" className="text-center p-4">Loading...</td></tr> :
                attendance.map((a, i) => (
                  <tr key={i}>
                    <td className="p-2 border">{a.student.name}</td>
                    <td className="p-2 border">{a.student.room}</td>
                    <td className="p-2 border">{new Date(a.date).toLocaleDateString()}</td>
                    <td className="p-2 border">{a.checkIn ? new Date(a.checkIn).toLocaleTimeString() : '-'}</td>
                    <td className="p-2 border">{a.checkOut ? new Date(a.checkOut).toLocaleTimeString() : '-'}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Attendance Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full">
            <Bar
              data={{
                labels: Object.keys(dailyCount),
                datasets: [{
                  label: 'Attendance Count',
                  data: Object.values(dailyCount),
                  backgroundColor: 'rgba(54, 162, 235, 0.6)',
                }]
              }}
              options={{ responsive: true }}
            />
          </div>

          <div className="w-full">
            <Doughnut
              data={{
                labels: ['Checked In', 'Checked Out'],
                datasets: [{
                  data: [checkInCount, checkOutCount],
                  backgroundColor: ['#4CAF50', '#FF9800']
                }]
              }}
              options={{ responsive: true }}
            />
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;