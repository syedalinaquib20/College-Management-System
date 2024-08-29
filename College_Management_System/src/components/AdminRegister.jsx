import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminRegister = () => {
    const [values, setValues] = useState({
        admin_name: '', 
        admin_email: '', 
        admin_password: '' 
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        console.log('Form values changed', values);
    }, [values]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://college-management-system-0t6u.onrender.com/admin-register', values)
            .then(result => {
                console.log(result);
                if (result.data && result.data.message) {
                    setSuccessMessage(result.data.message);
                } else {
                    setSuccessMessage("Registration successful!");
                }
                setErrorMessage('');
                setTimeout(() => {
                    navigate('/admin-login');
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
                    navigate('/admin-register');
                }, 2000);
            });
    };

    const handleBackToLogin = () => {
        navigate('/admin-login');
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
                            onChange={(e) => setValues({...values, admin_name : e.target.value})} 
                            className="bg-gray-200 shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-black focus:outline-none focus:shadow-outline" 
                            id="admin_name"
                            type="text"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div className="mt-3 flex justify-center">
                        <input 
                            onChange={(e) => setValues({...values, admin_email : e.target.value})} 
                            className="bg-gray-200 shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-black focus:outline-none focus:shadow-outline" 
                            id="admin_email"
                            type="text"
                            placeholder="Your Email"
                            required
                        />
                    </div>
                    <div className="mt-3 flex justify-center">
                        <input 
                            onChange={(e) => setValues({...values, admin_password : e.target.value})} 
                            className="bg-gray-200 shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-black focus:outline-none focus:shadow-outline" 
                            id="admin_password"
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
};

export default AdminRegister;
