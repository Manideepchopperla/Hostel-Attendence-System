import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminQRDisplay = () => {
  const [qr, setQr] = useState('');
  const [error, setError] = useState('');
  const [lastFetchDate, setLastFetchDate] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');

  const fetchQR = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(import.meta.env.VITE_BASE_URL + '/qr/generate', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQr(res.data.qr);
      setError('');
      setLastFetchDate(new Date().toLocaleDateString());
      setCopySuccess('');
    } catch (err) {
      console.error('Failed to load QR:', err);
      setError('❌ Could not load QR code');
    }
  };

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    if (lastFetchDate !== currentDate) {
      fetchQR();
    }
  }, [lastFetchDate]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(qr);
      setCopySuccess('✔️ QR code URL copied to clipboard!');
      setTimeout(() => setCopySuccess(''), 3000);
    } catch (err) {
      console.error('Failed to copy QR code URL:', err);
      setCopySuccess('❌ Failed to copy URL.');
      setTimeout(() => setCopySuccess(''), 3000);
    }
  };

  const openInNewTab = () => {
    if (!qr) return;
    window.open(qr, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="p-4 bg-white rounded shadow text-center max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Live QR Code for Attendance</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : qr ? (
        <>
          <img
            src={qr}
            alt="QR Code"
            className="mx-auto mb-4 cursor-pointer"
            onClick={openInNewTab}
          />
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Copy QR URL
          </button>
          {copySuccess && (
            <p className="mt-2 text-green-600 font-medium">{copySuccess}</p>
          )}
        </>
      ) : (
        <p>Loading QR...</p>
      )}
    </div>
  );
};

export default AdminQRDisplay;
