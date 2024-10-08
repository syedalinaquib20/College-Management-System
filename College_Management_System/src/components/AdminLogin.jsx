import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
    const [values, setValues] = useState({
        admin_email: '', 
        admin_password: '' 
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://college-management-system-0t6u.onrender.com/admin-login', values)
            .then(result => {
                console.log(result.data);  
                if (result.data && result.data.message) {
                    setSuccessMessage(result.data.message);
                    localStorage.setItem("Valid", true);
                    localStorage.setItem("AdminName", result.data.admin_name);
                    localStorage.setItem("adminId", result.data.admin_id);
                    localStorage.setItem("token", result.data.token);
                    setErrorMessage('');
                    setTimeout(() => {
                        const admin_id = localStorage.getItem('adminId');
                        navigate(`/auth/admin/dashboard/${admin_id}`);
                    }, 2000)
                } else {
                    setSuccessMessage("Event added successfully!"); 
                }
            })
            .catch(err => {
                console.error(err);
                setSuccessMessage('');
                if (err.response && err.response.data && err.response.data.message) {
                    setErrorMessage(err.response.data.message);
                } else {
                    setErrorMessage('An unexpected error occurred');
                }
            })
        };
    
    const handleBackToRegister = () => {
        navigate('/admin-register');
    };

    const back = () => {
        navigate('/');
    }

    return (
        <div className="min-h-screen w-full bg-gray-900 flex flex-col items-center justify-center">
            <div className="flex flex-col w-6/12 bg-cover bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-2xl mt-3 text-center">ADMIN LOGIN PAGE</h1>
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
                <form onSubmit={handleSubmit}>
                    <div className="mt-3">
                        <label className="block text-gray text-sm font-bold mt-3" htmlFor="admin_email">
                            Email: 
                        </label>
                        <input onChange={(e) => setValues({...values, admin_email: e.target.value})} className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            id="admin_email"
                            type="text"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mt-3">
                        <label className="block text-gray text-sm font-bold mt-3" htmlFor="admin_password">
                            Password: 
                        </label>
                        <input onChange={(e) => setValues({...values, admin_password: e.target.value})} className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            id="admin_password"
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex items-center justify-center mt-4" >
                        <button className="bg-gray-900 shadow appearance-none border rounded w-1/3 mt-2 py-2 px-3 text-white focus:outline-none focus:shadow-outline">
                            SIGN IN
                        </button>
                    </div>
                    <div className="flex flex-row justify-center mt-10">
                        <div className="items-center ml-12">
                                <button 
                                    type="button" 
                                    onClick={handleBackToRegister} 
                                    className="text-black py-2 px-40 border-none focus:outline-none focus:shadow-outline"
                                >
                                    Not have an account? <span className='underline'>Sign up</span>
                                </button>
                        </div>
                        <div className="ml-6">
                            <button 
                                    type="button" 
                                    onClick={back} 
                                    className="text-black py-2 px-0 border-none focus:outline-none focus:shadow-outline"
                                >
                                    <span className="underline">Back</span>
                            </button>
                        </div>        
                    </div>      
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
