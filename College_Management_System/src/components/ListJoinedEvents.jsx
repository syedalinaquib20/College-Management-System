import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const ListJoinedEvents = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const navigate = useNavigate();

    useEffect(() => {
        const storedEvents = localStorage.getItem('joinedEvents');
        if (storedEvents) {
          setEvents(JSON.parse(storedEvents));
          setFilteredEvents(JSON.parse(storedEvents));
        } else {
          fetchJoinedEvents();
        }
      }, []);
    
      useEffect(() => {
        localStorage.setItem('joinedEvents', JSON.stringify(events));
      }, [events]);

    const fetchJoinedEvents = async () => {
        try {
            const token = localStorage.getItem('token');
            const student_id = localStorage.getItem('studentId');
        
            if (student_id) {
                const response = await axios.get(`https://college-management-system-r7p5.onrender.com/auth/student/student-list-joined-events/${student_id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const sortedEvents = response.data.events.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
                setEvents(sortedEvents);
                setFilteredEvents(sortedEvents);
            } else {
                setError('No student ID found');
            }
        } catch (error) {
            console.error(error);
            setError('Failed to fetch the events');
        }
    };

    useEffect(() => {
        fetchJoinedEvents();
    }, [navigate]);
    
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFilteredEvents(events.filter(event => 
            event.event_name.toLowerCase().includes(value.toLowerCase())
        ));
        setCurrentPage(1);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const back = () => {
        const student_id = localStorage.getItem('studentId');
        fetchJoinedEvents();
        navigate(`/auth/student/dashboard-student/${student_id}`);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <header className="bg-gray-700 text-white p-6 rounded-t-lg shadow-lg flex justify-between items-center w-full">
                <div className="flex justify-end w-full">
                    <button onClick={back} className="text-white bg-blue-600 py-3 px-3 border rounded-lg hover:bg-blue-800 flex items-center">
                    <IoArrowBackSharp className="w-6"/>
                    <span>Back</span>
                    </button>
                </div>
            </header>
            <div className="flex justify-center items-center flex-grow mt-4">
                <div className="flex flex-col w-full md:w-11/12 lg:w-9/12 bg-cover bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-2xl text-center text-black mb-4">List of Joined Events</h1>
                    {error && (
                        <div className="bg-red-500 text-white p-4 rounded mb-4">
                            {error}
                        </div>
                    )}
                    <input 
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 focus:outline-none focus:shadow-outline"
                    />
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white text-black text-left mt-2">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Event Name</th>
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Place</th>
                                    <th className="px-4 py-2">Event Type</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Points Allocated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(event => (
                                    <tr key={event.event_id}>
                                        <td className="border px-4 py-2 text-left whitespace-nowrap">{event.event_name}</td>
                                        <td className="border px-4 py-2 text-left whitespace-nowrap">{formatDate(event.event_date)}</td>
                                        <td className="border px-4 py-2 text-left whitespace-nowrap">{event.event_place}</td>
                                        <td className="border px-4 py-2 text-left whitespace-nowrap">{event.event_type}</td>
                                        <td className="border px-4 py-2 text-left whitespace-nowrap">{event.status}</td>
                                        <td className="border px-4 py-2 text-left whitespace-nowrap">{event.points_allocated}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button 
                            onClick={() => paginate(currentPage - 1)} 
                            disabled={currentPage === 1}
                            className="text-black underline px-1 py-3"
                        >
                           Previous 
                        </button>
                        <span className="text-black">{`Page ${currentPage} of ${totalPages}`}</span>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="text-black underline px-1 py-3"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListJoinedEvents;
