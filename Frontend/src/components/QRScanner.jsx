import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QRScanner = () => {
  const scannerRef = useRef(null);
  const hasStartedRef = useRef(false);
  const [result, setResult] = useState('');
  const [status, setStatus] = useState('');
  const [cameraAccess, setCameraAccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        if (navigator.permissions) {
          const permissionStatus = await navigator.permissions.query({ name: 'camera' });
          setCameraAccess(permissionStatus.state);
          if (permissionStatus.state === 'denied') {
            setStatus('❌ Camera access denied');
            return false;
          }
          permissionStatus.onchange = () => {
            setCameraAccess(permissionStatus.state);
          };
        } else {
          setCameraAccess('prompt');
        }
        return true;
      } catch (err) {
        console.error('Error checking camera permissions:', err);
        setStatus('❌ Error checking camera permissions');
        return false;
      }
    };

    const startScanner = async () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;

      const permissionOk = await checkCameraPermission();
      if (!permissionOk) return;

      try {
        const scanner = new Html5QrcodeScanner('qr-reader', { fps: 10, qrbox: 250 }, false);
        scanner.render(
          async (decodedText) => {
            if (decodedText && decodedText !== result) {
              setResult(decodedText);
              try {
                const token = localStorage.getItem('token');
                const res = await axios.post(
                  import.meta.env.VITE_BASE_URL + '/qr/mark',
                  { qrData: decodedText },
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                setStatus(`✅ ${res.data.message}`);
                 toast.success(`✅ ${res.data.message}`, { autoClose: 1400 });
                setTimeout(() => {
                  navigate('/dashboard');
                }, 1400);
              } catch (err) {
                setStatus(`❌ ${err.response?.data?.message || 'Error marking attendance'}`);
                toast.error(`❌ ${msg}`);
              }
            }
          },
        );

        scannerRef.current = scanner;
      } catch (err) {
        console.error('Error initializing scanner:', err);
        setStatus('❌ Failed to initialize QR scanner');
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((err) => {
          console.error('Clear error:', err);
        });
      }
    };
  }, [result]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-xl font-semibold text-blue-600 mb-4">
            Scan QR Code to Mark Attendance
          </h1>
          {cameraAccess === 'denied' ? (
            <p className="text-red-600 font-bold">
              Camera access denied. Please allow camera permissions to scan QR codes.
            </p>
          ) : (
            <div id="qr-reader" className="w-full" style={{ minHeight: '300px' }} />
          )}
          {status && <p className="mt-4 text-lg font-medium">{status}</p>}
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default QRScanner;
