import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom';

const StudentJoinEvent = () => {
    const { event_id } = useParams(); 
    const [values, setValues] = useState({
        event_name: '', 
        event_date: '', 
        event_place: '',
        max_participants: '', 
        current_participants: '', 
        status: '', 
        event_type: '', 
        points_allocated: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get(`https://college-management-system-r7p5.onrender.com/auth/student/student-event/${event_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => {
            const event = response.data.event;
            setValues({
                event_name: event.event_name,
                event_date: new Date(event.event_date).toLocaleDateString('en-GB'),
                event_place: event.event_place,
                max_participants: event.max_participants, 
                current_participants: event.current_participants,
                status: event.status, 
                event_type: event.event_type, 
                points_allocated: event.points_allocated
            });
        })
        .catch(err => {
            if (axios.isCancel(err)) {
                console.log('Request canceled', err.message);
            } else {
                console.error('Error fetching event data:', err);
                setErrorMessage('Failed to fetch event data');
            }
        });
    }, [event_id]);

    const handleJoinEvent = (event) => { 
        event.preventDefault();
    
        const token = localStorage.getItem('token');
        const student_id = localStorage.getItem('studentId'); 
    
        axios.post(`https://college-management-system-r7p5.onrender.com/auth/student/join-event/${student_id}/${event_id}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(result => {
            if (result.data && result.data.message) {
                setSuccessMessage(result.data.message);
            } else {
                setSuccessMessage("Joined event successfully!");
            }
            setErrorMessage('');
            setTimeout(() => {
                navigate('/auth/student/student-list-check-in-events/:student_id');
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
                navigate('/auth/student/student-list-available-events');
            }, 2000);
        });
    };

    const back = () => {
        navigate("/auth/student/dashboard-student");
    };

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
                    <h1 className="text-2xl text-center text-black mb-4">EVENT DETAILS</h1>
                    {successMessage && (
                        <div className="bg-green-500 text-white p-4 rounded my-4">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="bg-red-500 text-white p-4 rounded my-4">
                            {errorMessage}
                        </div>
                    )}
                    
                    <form onSubmit={handleJoinEvent}>
                        <table className="min-w-full bg-white text-black text-left mt-2">
                            <tbody>
                                <tr>
                                    <td className="border px-4 py-2 font-bold">Event Name</td>
                                    <td className="border px-4 py-2 text-left whitespace-nowrap">{values.event_name}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2 font-bold">Date</td>
                                    <td className="border px-4 py-2">{values.event_date}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2 font-bold">Place</td>
                                    <td className="border px-4 py-2">{values.event_place}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2 font-bold">Max Participants</td>
                                    <td className="border px-4 py-2">{values.max_participants}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2 font-bold">Current Participants</td>
                                    <td className="border px-4 py-2">{values.current_participants}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2 font-bold">Event Type</td>
                                    <td className="border px-4 py-2">{values.event_type}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2 font-bold">Status</td>
                                    <td className="border px-4 py-2">{values.status}</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2 font-bold">Points Allocated</td>
                                    <td className="border px-4 py-2">{values.points_allocated}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className="border-none px-4 pt-2 text-center">
                                        {values.status !== 'pending' && (
                                            <button 
                                                type="submit"
                                                className="w-1/6 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 mt-2 rounded"
                                            >
                                                Join
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default StudentJoinEvent;
