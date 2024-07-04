import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import StudentLogin from './components/StudentLogin';
import StudentRegister from './components/StudentRegister';
import Dashboard from './components/Dashboard';
import './index.css';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  console.log('App component rendered');
  return (
    <Router>
      <Routes>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-register" element={<StudentRegister />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/auth/dashboard" element={<Dashboard />} />  
        </Route>
      
        <Route path="/" element={<div>Home Page</div>} /> 
      </Routes>
    </Router>
  );
};

export default App;
