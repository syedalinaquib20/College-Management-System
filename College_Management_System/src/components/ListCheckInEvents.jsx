import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const ListCheckInEvents = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const storedEvents = localStorage.getItem('checkInEvents');
        if (storedEvents) {
          setEvents(JSON.parse(storedEvents));
          setFilteredEvents(JSON.parse(storedEvents));
        } else {
          fetchCheckInEvents();
        }
      }, []);
    
      useEffect(() => {
        localStorage.setItem('checkInEvents', JSON.stringify(events));
      }, [events]);

    const fetchCheckInEvents = async () => {
        const token = localStorage.getItem('token');
        const student_id = localStorage.getItem('studentId');

        if (student_id) {
            try {
                const response = await axios.get(`https://college-management-system-r7p5.onrender.com/auth/student/student-list-check-in-events/${student_id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data);
                const sortedEvents = response.data.events.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
                setEvents(sortedEvents);
                setFilteredEvents(sortedEvents);
            } catch (error) {
                console.error(error);
                setErrorMessage('Failed to fetch the events');
            }
        } else {
            setErrorMessage('No student ID found');
        }
    };

    useEffect(() => {
        fetchCheckInEvents(); 
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
        fetchCheckInEvents();
        navigate(`/auth/student/dashboard-student/${student_id}`);
    }

    const handleCheckInDetails = (eventId) => {
        const token = localStorage.getItem('token');
        const student_id = localStorage.getItem('studentId');
        
        axios.put(`https://college-management-system-r7p5.onrender.com/auth/student/check-in-event/${student_id}/${eventId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(result => {
            if (result.data && result.data.message) {
                setSuccessMessage(result.data.message);
            } else {
                setSuccessMessage("Check in event successfully!");
            }
            setErrorMessage('');
            setTimeout(() => {
                navigate(`/auth/student/student-list-joined-events/${student_id}`);
            }, 2000);
        })
        .catch(err => {
            console.error('Error in Axios request:', err);
            setSuccessMessage('');
            if (err.response && err.response.data && err.response.data.message) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage('An unexpected error occurred');
            }
            setTimeout(() => {
                navigate(`/auth/student/student-list-check-in-events/${student_id}`);
            }, 2000);
        });
    }

    const handleCancelDetails = (eventId) => {
    const token = localStorage.getItem('token');
    const student_id = localStorage.getItem('studentId');

    axios.put(`https://college-management-system-r7p5.onrender.com/auth/student/cancel-event/${student_id}/${eventId}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(result => {
        if (result.data && result.data.message) {
            setSuccessMessage(result.data.message);
        } else {
            setSuccessMessage("Cancel event successfully!");
        }
        setErrorMessage('');
        setTimeout(() => {
            navigate(`/auth/student/student-list-available-events/${student_id}`);
        }, 2000);
    })
    .catch(err => {
        console.error('Error in Axios request:', err);
        setSuccessMessage('');
        if (err.response && err.response.data && err.response.data.message) {
            setErrorMessage(err.response.data.message);
        } else {
            setErrorMessage('An unexpected error occurred');
        }
        setTimeout(() => {
            navigate(`/auth/student/student-list-check-in-events/${student_id}`);
        }, 2000);
    });
};


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
                    <h1 className="text-2xl text-center text-black mb-4">List of Check in Events</h1>
                    {successMessage && (
                        <div className="bg-green-500 text-white p-4 rounded my-4">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="bg-red-500 text-white p-4 rounded mb-4">
                            {errorMessage}
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
                                    <th className="px-4 py-2">Action</th>
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
                                        <td className="border px-4 py-2 text-left">
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={() => handleCheckInDetails(event.event_id)}
                                                    className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-2 rounded mr-2"
                                                >
                                                    Check In
                                                </button>
                                                <button
                                                    onClick={() => handleCancelDetails(event.event_id)}
                                                    className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-2 rounded mr-2"
                                                >
                                                    Cancel
                                                </button>
                                            </div>    
                                        </td>
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

export default ListCheckInEvents;
