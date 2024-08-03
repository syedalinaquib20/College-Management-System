import { useState, useEffect } from 'react';
import { FaCalendarPlus} from 'react-icons/fa';
import { MdEventSeat, MdAccountCircle } from 'react-icons/md';
import { IoAccessibilityOutline, IoAccessibility } from "react-icons/io5";
import { TbFileReport } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import BarChart from './BarChart';
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

  const navigateAddEvents = () => {
    navigate("/auth/admin/admin-add-events");
  }

  const navigateListEvents = () => {
    navigate("/auth/admin/admin-list-events")
  }

  const navigateListStudents = () => {
    navigate("/auth/admin/admin-list-students")
  }

  const data = {
    labels: ['Event 1', 'Event 2', 'Event 3', 'Event 4', 'Event 5'], 
    datasets: [
      {
        label: 'Number of Participants', 
        data: [12, 19, 3, 5, 2], 
        backgroundColor: '#2563EB', 
        borderColor: '#2563EB', 
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true, 
        text: "List of Events", 
        position: 'bottom', 
        padding: {
          top: 15, 
        }, 
        font: {
          size: 16, 
          weight: "bold", 
        },
        color: '#ffffff'
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <header className="bg-gray-700 text-white p-6 rounded-t-lg shadow-lg flex justify-between items-center">
        <h1 className="text-2xl text-center">Welcome {adminName}</h1>
        <div className="bg-blue-600 py-3 px-3 text-center border rounded-lg hover:bg-blue-800">
          <button onClick={handleLogout} className="text-white bg-transparent flex items-center ml-auto">
          <IoIosLogOut className="w-6"/>
          <span>Log out</span>
          </button>
        </div>
      </header>
      <div className="flex justify-center w-full mt-6 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full lg:w-3/4">
          <div className="bg-blue-600 p-4 text-center border rounded-lg hover:bg-blue-800">
            <button onClick = {navigateAddEvents} className="text-white px-2 py-1 flex items-center justify-center space-x-2 w-full rounded-lg bg-transparent">
              <FaCalendarPlus className="h-5 w-5" />
              <span>Add Events</span>
            </button>
          </div>
          <div className="bg-blue-600 p-4 text-center border rounded-lg hover:bg-blue-800">
            <button onClick={navigateListEvents} className="text-white px-2 py-1 flex items-center justify-center space-x-2 w-full rounded-lg bg-transparent">
              <MdEventSeat className="h-5 w-5" />
              <span>List of Events</span>
            </button>
          </div>
          <div className="bg-blue-600 p-4 text-center border rounded-lg hover:bg-blue-800">
            <button onClick={navigateListStudents} className="text-white px-2 py-1 flex items-center justify-center space-x-2 w-full rounded-lg bg-transparent">
              <IoAccessibilityOutline className="h-5 w-5" />
              <span>List of Registered Students</span>
            </button>
          </div>
          <div className="bg-blue-600 p-4 text-center border rounded-lg hover:bg-blue-800">
            <button className="text-white px-2 py-1 flex items-center justify-center space-x-2 w-full rounded-lg bg-transparent">
              <MdAccountCircle className="h-5 w-5" />
              <span>Account Management</span>
            </button>
          </div>
          <div className="bg-blue-600 p-4 text-center border rounded-lg hover:bg-blue-800">
            <button className="text-white px-2 py-1 flex items-center justify-center space-x-2 w-full rounded-lg bg-transparent">
              <TbFileReport className="h-5 w-5" />
              <span>Print Report</span>
            </button>
          </div>
          <div className="bg-blue-600 p-4 text-center border rounded-lg hover:bg-blue-800">
            <button className="text-white px-2 py-1 flex items-center justify-center space-x-2 w-full rounded-lg bg-transparent">
              <IoAccessibility className="h-5 w-5" />
              <span>List of Qualified Students</span>
            </button>
          </div>
          <div className="flex justify-center w-full mt-6 p-4 col-span-full">
            <div className="w-full lg:w-3/4 h-96">
              <BarChart data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
