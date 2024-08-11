import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentRegister = () => {
    const [values, setValues] = useState({
        student_name: '', 
        student_email: '', 
        student_password: '', 
        student_gender: 'Male' 
     });

     const [successMessage, setSuccessMessage] = useState('');
     const [errorMessage, setErrorMessage] = useState('');

     const navigate = useNavigate();

     useEffect(() => {
        console.log('Form values changed', values);
     }, [values]);

     const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/student-register', values)
            .then(result => {
                console.log(result);
                if (result.data && result.data.message) {
                    setSuccessMessage(result.data.message);
                } else {
                    setSuccessMessage("Registration successful!");
                }
                setErrorMessage('');
                setTimeout(() => {
                    navigate('/student-login');
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
                    navigate('/student-register');
                }, 2000);
            });
    };

    const handleBackToLogin = () => {
        navigate('/student-login');
    };

    return (
        <div className="min-h-screen w-full bg-gray-900 flex flex-col items-center justify-center">
            <div className="flex flex-col md:w-6/12 lg:w-6/12 bg-cover bg-white rounded-lg shadow-lg p-8">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-2xl mt-3 text-center">CREATE ACCOUNT</h1>
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
                            onChange={(e) => setValues({...values, student_name : e.target.value})} 
                            className="bg-gray-200 shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-black focus:outline-none focus:shadow-outline" 
                            id="student_name"
                            type="text"
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div className="mt-3 flex justify-center">
                        <input 
                            onChange={(e) => setValues({...values, student_email : e.target.value})} 
                            className="bg-gray-200 shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-black focus:outline-none focus:shadow-outline" 
                            id="student_email"
                            type="text"
                            placeholder="Your Email"
                            required
                        />
                    </div>
                    <div className="mt-3 flex justify-center">
                        <select 
                            onChange={(e) => setValues({...values, student_gender : e.target.value})} 
                            className="bg-gray-200 shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-black focus:outline-none focus:shadow-outline" 
                            id="student_gender"
                            required
                            value={values.student_gender}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="mt-3 flex justify-center">
                        <input 
                            onChange={(e) => setValues({...values, student_password : e.target.value})} 
                            className="bg-gray-200 shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-black focus:outline-none focus:shadow-outline" 
                            id="student_password"
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-center mt-8">
                        <button className="bg-gray-900 shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-white focus:outline-none focus:shadow-outline">
                            SIGN UP
                        </button>
                    </div>
                    <div className="flex items-center justify-center mt-10">
                        <button 
                            type="button" 
                            onClick={handleBackToLogin} 
                            className="text-black py-2 px-4 border-none focus:outline-none focus:shadow-outline"
                        >
                            Have already an account? <span className="underline">Login here</span>
                        </button>
                    </div>                            
                </form>   
            </div>
        </div>
    );
}

export default StudentRegister;
