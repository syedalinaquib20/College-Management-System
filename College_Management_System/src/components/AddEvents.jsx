import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoArrowBackSharp } from "react-icons/io5";

const AddEvents = () => {
    const [values, setValues] = useState({
        event_name: '', 
        event_date: '', 
        event_place: '', 
        event_type: '', // Initialize with an empty string
        max_participants: ''
    });

    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [points, setPoints] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        switch (values.event_type.toLowerCase()) {
            case 'jpk': 
            case 'mpp': 
                setPoints(3);
                break;
            case 'faculty': 
                setPoints(2);
                break;
            case 'club': 
                setPoints(1);
                break;
            default: 
                setPoints(0);
        }
    }, [values.event_type])

    const back = () => {
        navigate("/auth/admin/dashboard");
    }

    useEffect(() => {
        console.log("Form values changed", values);
    }, [values]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('event_name', values.event_name);
        formData.append('event_date', values.event_date);
        formData.append('event_place', values.event_place);
        formData.append('event_type', values.event_type);
        formData.append('max_participants', values.max_participants);
        if (file) {
            formData.append('event_picture', file);
        }

        // Get the authentication token from localStorage
        const token = localStorage.getItem('token');

        axios.post('https://college-management-system-0t6u.onrender.com/auth/admin/admin-add-events', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', 
                'Authorization': `Bearer ${token}`
            }
        })
        .then(result => {
            console.log(result);
            if (result.data && result.data.message) {
                setSuccessMessage(result.data.message);
            } else {
                setSuccessMessage("Event added successfully!");
            }
            setErrorMessage('');
            setTimeout(() => {
                navigate('/auth/admin/dashboard/:id');
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
                navigate('/auth/admin/dashboard/:id');
            }, 20000)
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
                <div className="flex flex-col md:w-6/12 bg-cover bg-white rounded-lg shadow-lg py-3">
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-2xl mt-3 text-center text-black">ADD EVENTS</h1>
                        {successMessage && (
                            <div className="bg-green-500 text-white p-4 rounded my-4 mx-auto text-center w-fit">
                                {successMessage}
                            </div>
                        )}

                        {errorMessage && (
                            <div className="bg-red-500 text-white p-4 rounded my-4 mx-auto text-center w-fit">
                                {errorMessage}
                            </div>
                        )}

                        <div className="mt-3 flex justify-center">
                            <input 
                                onChange={(e) => setValues({ ...values, event_name: e.target.value })} 
                                className="shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                                id="event_name"
                                type="text"
                                placeholder="Event Name"
                                required
                            />
                        </div>
                        <div className="mt-3 flex justify-center">
                            <input 
                                onChange={(e) => setValues({ ...values, event_date: e.target.value })} 
                                className="shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                                id="event_date"
                                type="date"
                                required
                            />
                        </div>
                        <div className="mt-3 flex justify-center">
                            <input 
                                onChange={(e) => setValues({ ...values, event_place: e.target.value })} 
                                className="shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                                id="event_place"
                                type="text"
                                placeholder="Event Place"
                                required
                            />
                        </div>
                        <div className="mt-3 flex justify-center">
                            <select 
                                onChange={(e) => setValues({ ...values, event_type: e.target.value })} 
                                className="shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                                id="event_type"
                                required
                            >
                                <option value="">Select Event Type</option>
                                <option value="JPK">JPK</option>
                                <option value="MPP">MPP</option>
                                <option value="Faculty">Faculty</option>
                                <option value="Club">Club</option>
                            </select>
                        </div>
                        <div className="mt-3 flex justify-center">
                            <input 
                                onChange={(e) => setValues({ ...values, max_participants: e.target.value })} 
                                className="shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                                id="max_participants"
                                type="number"
                                placeholder="Maximum Participants"
                                required
                            />
                        </div>
                        <div className="mt-3 flex justify-center">
                            <input 
                                onChange={(e) => setFile(e.target.files[0])} 
                                className="shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                                id="event_picture"
                                type="file"
                            />
                        </div>
                        <div className="absolute top--2 right-90 text-white rounded p-2">
                            <p className="text-sm">Points: {points}</p>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <button className="bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                ADD EVENTS
                            </button>
                        </div>
                    </form>  
                </div> 
            </div>
        </div>
    );
}

export default AddEvents;
