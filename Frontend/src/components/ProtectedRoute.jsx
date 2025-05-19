import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const ProtectedRoute = ({ children, admin = false }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/" />;

  try {
    const user = jwtDecode(token);
    if (admin && !user.isAdmin) return <Navigate to="/dashboard" />;
    return children;
  } catch (error) {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
