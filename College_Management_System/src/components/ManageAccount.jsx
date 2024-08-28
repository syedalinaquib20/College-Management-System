import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { IoArrowBackSharp } from "react-icons/io5";

const ManageAccount = () => {
    const [values, setValues] = useState({
        student_name: '', 
        current_password: '', 
        new_password: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const back = () => {
        const student_id = localStorage.getItem('studentId');
        navigate(`/auth/student/dashboard-student/${student_id}`);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const studentId = localStorage.getItem('studentId');  

        axios.get(`https://college-management-system-r7p5.onrender.com/auth/student/account-management/${studentId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const student = response.data.student;
            setValues({
                student_name: student.student_name,
                current_password: '', 
                new_password: ''
            });
        })
        .catch(err => {
            console.error('Error fetching student data:', err);
            setErrorMessage('Failed to fetch student data');
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const token = localStorage.getItem('token');
        const studentId = localStorage.getItem('studentId');

        axios.put(`https://college-management-system-r7p5.onrender.com/auth/student/update-password/${studentId}`, {
            current_password: values.current_password,
            new_password: values.new_password
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(result => {
            if (result.data && result.data.message) {
                setSuccessMessage(result.data.message);
            } else {
                setSuccessMessage("Password updated successfully!");
            }
            setErrorMessage('');
            setTimeout(() => {
                navigate('/auth/student/dashboard-student/:id');
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
                navigate('/auth/student/dashboard-student');
            }, 2000);
        });
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
                <div className="flex flex-col md:w-6/12 bg-cover bg-white rounded-lg shadow-lg p-8">
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-2xl mt-3 text-center text-black">ACCOUNT MANAGEMENT</h1>
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
                                value={values.student_name}
                                disabled
                                className="bg-gray-400 shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                                id="student_name"
                                type="text"
                                placeholder="Student Name"
                                required
                            />
                        </div>
                        <div className="mt-3 flex justify-center">
                            <input 
                                value={values.current_password}
                                onChange={(e) => setValues({ ...values, current_password: e.target.value })} 
                                className="shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                                id="current_password"
                                type="password"
                                placeholder="Current Password"
                                required
                            />
                        </div>
                        <div className="mt-3 flex justify-center">
                            <input 
                                value={values.new_password}
                                onChange={(e) => setValues({ ...values, new_password: e.target.value })} 
                                className="shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                                id="new_password"
                                type="password"
                                placeholder="New Password"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <button className="bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                UPDATE PASSWORD
                            </button>
                        </div>
                    </form>  
                </div> 
            </div>
        </div>
    );
};

export default ManageAccount;
