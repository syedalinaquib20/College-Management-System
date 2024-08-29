import { useState, useEffect } from 'react';
import { FaCalendarPlus} from 'react-icons/fa';
import { MdEventSeat, MdAccountCircle } from 'react-icons/md';
import { IoAccessibilityOutline} from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem("AdminName");

    if (name) {
      setAdminName(name);
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Valid");
    localStorage.removeItem("AdminName");
    navigate("/admin-login");
  }

  const navigateTo = (path) => {
    const adminId = localStorage.getItem('adminId');
    if (adminId) {
      navigate(path.replace(':admin_id', adminId));
    } 
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <header className="bg-gray-700 text-white p-6 rounded-t-lg shadow-lg flex justify-between items-center">
        <h1 className="text-2xl">Welcome {adminName}</h1>
        <div className="bg-blue-600 py-3 px-3 text-center border rounded-lg hover:bg-blue-800">
          <button onClick={handleLogout} className="text-white bg-transparent flex items-center ml-auto">
            <IoIosLogOut className="w-6" />
            <span>Log out</span>
          </button>
        </div>
      </header>
  
      <div className="flex justify-center w-full mt-10 p-4">
        <div className="grid grid-cols-2 gap-8 w-full max-w-3xl">
          <div 
            onClick={() => navigateTo("/auth/admin/admin-add-events/:admin_id")}
            className="flex flex-col items-center bg-blue-600 text-white text-center border rounded-lg shadow-lg p-8 hover:bg-blue-800 space-y-2 cursor-pointer hover:shadow-xl transition transform hover:scale-105"
          >
            <FaCalendarPlus className="h-10 w-10" />
            <span className="text-xl">Add Events</span>
          </div>
          <div
            onClick={() => navigateTo("/auth/admin/admin-list-events/")}
            className="flex flex-col items-center bg-blue-600 text-white text-center border rounded-lg shadow-lg p-8 hover:bg-blue-800 space-y-2 cursor-pointer hover:shadow-xl transition transform hover:scale-105"
          >
            <MdEventSeat className="h-10 w-10" />
            <span className="text-xl">List of Events</span>
          </div>
          <div
            onClick={() => navigateTo("/auth/admin/update-password/:admin_id")}
            className="flex flex-col items-center bg-blue-600 text-white text-center border rounded-lg shadow-lg p-8 hover:bg-blue-800 space-y-2 cursor-pointer hover:shadow-xl transition transform hover:scale-105"
          >
            <MdAccountCircle className="h-10 w-10" />
            <span className="text-xl">Account Management</span>
          </div>
          <div
            onClick={() => navigateTo("/auth/admin/admin-list-students")}
            className="flex flex-col items-center bg-blue-600 text-white text-center border rounded-lg shadow-lg p-8 hover:bg-blue-800 space-y-2 cursor-pointer hover:shadow-xl transition transform hover:scale-105"
          >
            <IoAccessibilityOutline className="h-10 w-10" />
            <span className="text-xl">List of Registered Students</span>
          </div>     
        </div>
      </div>
    </div>
  );  
};

export default Dashboard;
