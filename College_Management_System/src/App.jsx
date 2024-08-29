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
import ListEvents from './components/ListEvents';
import UpdateEvent from './components/UpdateEvent';
import ListStudents from './components/ListStudents';
import UpdateStudentEvent from './components/UpdateStudentEvent';
import HomePage from './components/HomePage';
import ListAvailableEvents from './components/ListAvailableEvents';
import ListJoinedEvents from './components/ListJoinedEvents';
import ListCheckInEvents from './components/ListCheckInEvents';
import ManageAccount from './components/ManageAccount';
import StudentJoinEvent from './components/StudentJoinEvent';
import ManageAccountAdmin from './components/ManageAccountAdmin';

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
          <Route path="/auth/admin/dashboard/:admin_id" element={<Dashboard />} /> 
          <Route path="/auth/admin/admin-add-events/:admin_id" element={<AddEvents />} /> 
          <Route path="/auth/admin/admin-list-events/:admin_id" element={<ListEvents />} />
          <Route path="/auth/admin/admin-update-event/:event_id" element={<UpdateEvent />} />
          <Route path="/auth/admin/admin-update-student-event/:student_id" element={<UpdateStudentEvent />} />
          <Route path="/auth/admin/admin-list-students" element={<ListStudents />} /> 
          <Route path="/auth/admin/update-password/:id" element={<ManageAccountAdmin />}/>   
        </Route>

        <Route element={<PrivateRouteStudent />}>
          <Route path="/auth/student/dashboard-student/:student_id" element={<DashboardStudent />} />  
          <Route path="/auth/student/student-list-available-events/:student_id" element={<ListAvailableEvents />} />
          <Route path="/auth/student/student-list-joined-events/:student_id" element={<ListJoinedEvents/>} />
          <Route path="/auth/student/student-list-check-in-events/:student_id" element={<ListCheckInEvents/>} />
          <Route path="/auth/student/update-password/:id" element={<ManageAccount/>} />
          <Route path="/auth/student/join-event/:student_id/:event_id" element={<StudentJoinEvent />} />
        </Route>
      
        <Route path="/" element={<HomePage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
