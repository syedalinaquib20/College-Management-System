import { useState, useEffect } from 'react';
import { FaCalendarPlus} from 'react-icons/fa';
import { MdEventSeat, MdAccountCircle, MdEmojiEvents,MdOutlineEmojiEvents } from 'react-icons/md';
import { VscActivateBreakpoints } from "react-icons/vsc";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardStudent = () => {
  const [studentName, setStudentName] = useState('');
  const [statistics, setStatistics] = useState({
    joinedEvents: [], 
    checkInEvents: [], 
    points: 0,
  });

  useEffect(() => {
    const name = localStorage.getItem("StudentName");
    const studentId = localStorage.getItem("studentId");

    if (name) {
      setStudentName(name);
    }

  if (studentId) {  
      const token = localStorage.getItem("token");
      axios.get(`http://localhost:3000/auth/student/student/${studentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setStatistics(response.data);
      })
      .catch(error => {
        console.error("Error fetching statistics", error);
      })
    }
  }, [])

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Valid");
    localStorage.removeItem("StudentName");
    localStorage.removeItem("studentId");
    navigate("/student-login");
  }

  const navigateListJoinedEvents = () => {
    navigate("/auth/student/student-list-joined-events");
  }

  const navigateListEvents = () => {
    navigate("/auth/student/student-list-available-events")
  }

  const navigateAccountManagement = () => {
    navigate("/auth/student/student-account-management")
  }

  const navigateCheckInEvents = () => {
    navigate("/auth/student/student-check-in-events")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <header className="bg-gray-700 text-white p-6 rounded-t-lg shadow-lg flex justify-between items-center">
        <h1 className="text-2xl text-center">Welcome {studentName}</h1>
        <div className="bg-blue-600 py-3 px-3 text-center border rounded-lg hover:bg-blue-800">
          <button onClick={handleLogout} className="text-white bg-transparent flex items-center ml-auto">
          <IoIosLogOut className="w-6"/>
          <span>Log out</span>
          </button>
        </div>
      </header>

      <div className="flex justify-center mt-8">
        <div className="flex justify-center space-x-4 text-lg bg-gray-700 p-4 rounded-lg w-fit gap-8 ">
          <div className="flex items-center gap-2">
              <MdEmojiEvents className="h-8 w-10"/>
              <span className="text-xl">Joined Events: {statistics.joinedEvents.length}</span>
          </div>
          <div className="flex items-center gap-2">
              <MdOutlineEmojiEvents className="h-8 w-10" />
              <span className="text-xl">Check-In Events: {statistics.checkInEvents.length}</span>
          </div>
          <div className="flex items-center gap-2">
              <VscActivateBreakpoints className="h-8 w-10" />
              <span className="text-xl">Points: {statistics.points}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full mt-10 p-4">
        <div className="grid grid-cols-2 gap-8 w-full max-w-3xl">
          <div 
              onClick = {navigateListJoinedEvents}
              className="flex flex-col items-center bg-blue-600 text-white text-center border rounded-lg shadow-lg p-8 hover:bg-blue-800 space-y-2 cursor-pointer hover:shadow-xl transition transform hover:scale-105"
          >
              <FaCalendarPlus className="h-10 w-10" />
              <span className="text-xl">List Joined Events</span>   
          </div>
          <div
              onClick = {navigateListEvents}
              className="flex flex-col items-center bg-blue-600 text-white text-center border rounded-lg shadow-lg p-8 hover:bg-blue-800 space-y-2 cursor-pointer hover:shadow-xl transition transform hover:scale-105"
          >
              <MdEventSeat className="h-10 w-10" />
              <span className="text-xl">List of Available Events</span>
          </div>
          <div
              onClick={navigateAccountManagement}
              className="flex flex-col items-center bg-blue-600 text-white text-center border rounded-lg shadow-lg p-8 hover:bg-blue-800 space-y-2 cursor-pointer hover:shadow-xl transition transform hover:scale-105"
          >
              <MdAccountCircle className="h-10 w-10" />
              <span className="text-xl">Account Management</span>
          </div>
          <div
              onClick={navigateCheckInEvents}
              className="flex flex-col items-center bg-blue-600 text-white text-center border rounded-lg shadow-lg p-8 hover:bg-blue-800 space-y-2 cursor-pointer hover:shadow-xl transition transform hover:scale-105"
          >
              <MdAccountCircle className="h-10 w-10" />
              <span className="text-xl">Check-In Events</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStudent;
