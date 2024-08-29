import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminRegister = () => {
    const [values, setValues] = useState({
        admin_name: '', 
        admin_email: '', 
        admin_password: '' 
    });

    const navigate = useNavigate();

    useEffect(() => {
        console.log('Form values changed', values);
    }, [values]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://college-management-system-0t6u.onrender.com/admin-register', values)
            .then(result => {
                console.log(result);
                // Redirect to the admin login page after successful registration
                navigate('/admin-login');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="min-h-screen w-full bg-gray-200 flex flex-col items-center justify-center">
            <div className="flex flex-col md:w-6/12 lg:w-6/12 bg-cover bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-2xl mt-3 text-center">CREATE ACCOUNT</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mt-3 flex justify-center">
                        <input 
                            onChange={(e) => setValues({ ...values, admin_name: e.target.value })} 
                            className="shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                            id="admin_name"
                            type="text"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div className="mt-3 flex justify-center">
                        <input 
                            onChange={(e) => setValues({ ...values, admin_email: e.target.value })} 
                            className="shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                            id="admin_email"
                            type="text"
                            placeholder="Your Email"
                            required
                        />
                    </div>
                    <div className="mt-3 flex justify-center">
                        <input 
                            onChange={(e) => setValues({ ...values, admin_password: e.target.value })} 
                            className="shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                            id="admin_password"
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <button className="bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            SIGN UP
                        </button>
                    </div>
                </form>   
            </div>
        </div>
    );
};

export default AdminRegister;
