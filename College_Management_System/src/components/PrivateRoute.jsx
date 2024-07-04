import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("Valid");

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin-login" />;
};

export default PrivateRoute;
