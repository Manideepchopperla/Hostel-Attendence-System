import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const AttendanceHistory = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(import.meta.env.VITE_BASE_URL + '/attendance/history', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecords(res.data);
      } catch (err) {
        setError('Failed to load attendance history');
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-grow w-screen m-5 mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Attendance History</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Check-in Time</th>
                <th className="px-4 py-2 border">Check-out Time</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(records) && records.map((record) => (
                <tr key={record._id} className="text-center">
                  <td className="px-4 py-2 border">{new Date(record.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border">{record.checkIn || '-'}</td>
                  <td className="px-4 py-2 border">{record.checkOut || '-'}</td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-4 py-4 text-gray-500 text-center">No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AttendanceHistory;
