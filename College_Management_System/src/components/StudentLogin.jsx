import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentLogin = () => {
    const [values, setValues] = useState({
        student_email: '', 
        student_password: '' 
     })

     const [successMessage, setSuccessMessage] = useState('');
     const [errorMessage, setErrorMessage] = useState(''); 

     const navigate = useNavigate();
 
     const handleSubmit = (event) => {
         event.preventDefault()
         axios.post('https://college-management-system-r7p5.onrender.com/student-login', values)
         .then(result => {
            console.log(result.data)
            if (result.data && result.data.message) {
                setSuccessMessage(result.data.message);
                localStorage.setItem("Valid", true) 
                localStorage.setItem("StudentName", result.data.student_name);
                localStorage.setItem("studentId", result.data.student_id);
                localStorage.setItem("token", result.data.token);            
            } else {
                setSuccessMessage("Event added successfully!");
            }
            setErrorMessage('');
            setTimeout(() => {
                const student_id = localStorage.getItem('studentId');
                navigate(`/auth/student/dashboard-student/${student_id}`);
            }, 2000)
         })
         .catch(err => {
            console.error(err);
            setSuccessMessage('');
            if (err.response && err.response.data && err.response.data.message) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage('An unexpected error occurred');
            }
            setTimeout(() => {
                window.location.reload();
            }, 2000)
        })
    }

     const handleBackToRegister = () => {
        navigate('/student-register');
    };

    const back = () => {
        navigate('/');
    }

  return (
    <div className="min-h-screen w-full bg-gray-900 flex flex-col items-center justify-center">
      <div className="flex flex-col w-6/12 bg-cover bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit}>
            <h1 className="text-2xl mt-3 text-center">STUDENT LOGIN PAGE</h1>
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

            <div className="mt-3">
                <label className="block text-gray text-sm font-bold mt-3" htmlFor="username">
                    Email: 
                </label>
                <input onChange={(e) => setValues({...
                values, student_email : e.target.value})} className="bg-gray-200 shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-black focus:outline-none focus:shadow-outline"
                    id="student_email"
                    type="text"
                    placeholder="Email"
                />
            </div>
            <div className="mt-3">
                <label className="block text-gray text-sm font-bold mt-3" htmlFor="password">
                    Password: 
                </label>
                <input onChange={(e) => setValues({...
                values, student_password : e.target.value})} className="bg-gray-200 shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-black focus:outline-none focus:shadow-outline"
                    id="student_password"
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
  )
}

export default StudentLogin;
