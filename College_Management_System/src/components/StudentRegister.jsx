import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const StudentRegister = () => {
    const [values, setValues] = useState({
        student_name: '', 
        student_email: '', 
        student_password: '' 
     })

     const navigate = useNavigate();

     useEffect(() => {
        console.log('Form values changed', values)
     }, [values]);
 
     const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/student-register', values)
            .then(result => {
                console.log(result);
                // Redirect to the student login page after successful registration
                navigate('/student-login');
            })
            .catch(err => console.log(err));
    };

  return (
    <div className="min-h-screen w-full bg-gray-200 flex flex-col items-center justify-center">
        <div className="flex flex-col md:w-6/12 lg:w-6/12 bg-cover bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl mt-3 text-center">CREATE ACCOUNT</h1>
            <form onSubmit={handleSubmit}>
                <div className="mt-3 flex justify-center">
                    <input onChange={(e) => setValues({...values, student_name : e.target.value})} className="shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                        id="student_name"
                        type="text"
                        placeholder="Your Name"
                        required
                    />
                </div>
                <div className="mt-3 flex justify-center">
                    <input onChange={(e) => setValues({...values, student_email : e.target.value})} className="shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                        id="student_email"
                        type="text"
                        placeholder="Your Email"
                        required
                    />
                </div>
                <div className="mt-3 flex justify-center">
                    <input onChange={(e) => setValues({...values, student_password : e.target.value})} className="shadow appearance-none border rounded md:w-3/4 mx-auto mt-2 py-4 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                        id="student_password"
                        type="password"
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="flex items-center justify-center mt-4" >
                    <button className="bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        SIGN UP
                    </button>
                </div>               
            </form>   
        </div>
    </div>
  )
}

export default StudentRegister
