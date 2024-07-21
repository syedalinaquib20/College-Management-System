import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import StudentLogin from './components/StudentLogin';
import StudentRegister from './components/StudentRegister';
import Dashboard from './components/Dashboard';
import DashboardStudent from './components/DashboardStudent'
import './index.css';
import PrivateRoute from './components/PrivateRoute';
import PrivateRouteStudent from './components/PrivateRouteStudent';
import AddEvents from './components/AddEvents';

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
          <Route path="/auth/admin/dashboard" element={<Dashboard />} /> 
          <Route path="/auth/admin/admin-add-events" element={<AddEvents />} />  
        </Route>

        <Route element={<PrivateRouteStudent />}>
          <Route path="/auth/student/dashboard-student" element={<DashboardStudent />} />  
        </Route>
      
        <Route path="/" element={<div>Home Page</div>} /> 
      </Routes>
    </Router>
  );
};

export default App;
