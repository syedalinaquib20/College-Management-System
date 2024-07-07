
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouteStudent = () => {
  const isAuthenticated = localStorage.getItem("Valid");

  return isAuthenticated ? <Outlet /> : <Navigate to="/student-login" />;
};

export default PrivateRouteStudent;
