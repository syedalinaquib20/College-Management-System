import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { IoArrowBackSharp } from "react-icons/io5";

const UpdateEvent = () => {
    const { event_id } = useParams();
    const [values, setValues] = useState({
        event_name: '', 
        event_date: '', 
        event_place: '', 
        max_participants: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const back = () => {
        navigate("/auth/admin/admin-list-events");
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Fetch the current event data to pre-fill the form
        axios.get(`http://localhost:3000/auth/admin/event/${event_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const event = response.data.event;
            const formattedDate = new Date(event.event_date).toISOString().split('T')[0];
            setValues({
                event_name: event.event_name,
                event_date: formattedDate, 
                event_place: event.event_place,
                max_participants: event.max_participants
            });
        })
        .catch(err => {
            console.error('Error fetching event data:', err);
            setErrorMessage('Failed to fetch event data');
        });
    }, [event_id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const token = localStorage.getItem('token');
        const { event_name, event_date, event_place, max_participants } = values;

        axios.put(`http://localhost:3000/auth/admin/admin-update-event/${event_id}`, {
            event_name,
            event_date,
            event_place,
            max_participants
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(result => {
            console.log(result);
            if (result.data && result.data.message) {
                setSuccessMessage(result.data.message);
            } else {
                setSuccessMessage("Event updated successfully!");
            }
            setErrorMessage('');
            setTimeout(() => {
                navigate('/auth/admin/admin-list-events');
            }, 2000)
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
                navigate('/auth/admin/admin-list-events');
            }, 2000)
        })
    }

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
                <div className="flex flex-col md:w-6/12 bg-cover bg-white rounded-lg shadow-lg p-8">
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-2xl mt-3 text-center text-black">UPDATE EVENTS</h1>
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

                        <div className="mt-3 flex justify-center">
                            <input 
                                value={values.event_name}
                                disabled
                                className="bg-gray-400 shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                                id="event_name"
                                type="text"
                                placeholder="Event Name"
                                required
                            />
                        </div>
                        <div className="mt-3 flex justify-center">
                            <input 
                                value={values.event_date}
                                onChange={(e) => setValues({ ...values, event_date: e.target.value })} 
                                className="shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                                id="event_date"
                                type="date"
                                required
                            />
                        </div>
                        <div className="mt-3 flex justify-center">
                            <input 
                                value={values.event_place}
                                onChange={(e) => setValues({ ...values, event_place: e.target.value })} 
                                className="shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                                id="event_place"
                                type="text"
                                placeholder="Event Place"
                                required
                            />
                        </div>
                        <div className="mt-3 flex justify-center">
                            <input 
                                value={values.max_participants}
                                onChange={(e) => setValues({ ...values, max_participants: e.target.value })} 
                                className="shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                                id="participants"
                                type="number"
                                placeholder="100"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <button className="bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                UPDATE
                            </button>
                        </div>
                    </form>  
                </div> 
            </div>
        </div>
    );
}

export default UpdateEvent;
