import { useAuth } from '../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;